<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# EMS 2026 Workbook — Sargento 1/o.

Plataforma de estudio para el Curso de Formación de Sargento 1/o. de Infantería y
Fusileros Paracaidistas (SEDENA). React 19 + Vite + TypeScript + Tailwind 4.

## Requisitos

- Node.js 20+
- Una API key de Groq (https://console.groq.com/keys)

## Configuración

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Crea `.env.local` a partir de `.env.example` y pega tu clave:

   ```bash
   GROQ_API_KEY="gsk_..."
   GROQ_MODEL="openai/gpt-oss-120b"
   PORT=3001
   ```

   `.env.local` está en `.gitignore`. **Nunca** prefixes la clave con `VITE_`:
   las variables `VITE_*` se inyectan en el bundle del navegador y la clave
   quedaría pública para cualquiera que abra las DevTools.

3. Levanta la API y el frontend a la vez:

   ```bash
   npm run dev:all
   ```

   - Frontend: http://localhost:3000
   - API del asistente: http://localhost:3001

   O por separado, en dos terminales: `npm run dev` y `npm run server`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Solo el frontend (Vite, puerto 3000) |
| `npm run server` | Solo la API del asistente (`tsx server.ts`, puerto 3001) |
| `npm run dev:all` | Ambos, con logs prefijados por proceso |
| `npm run lint` | `tsc --noEmit` |
| `npm run build` | Build de producción a `dist/` |
| `npm run preview` | Sirve el build de producción |

## Cómo funciona el asistente

El navegador **nunca** habla directo con Groq. `AssistantView` hace `POST` a
`/api/assistant`.

1. `src/server/assistantCore.ts` recibe la consulta (rate limit, validación,
   retrieval, llamada a Groq).
2. `src/data/doctrineRetrieval.ts` recupera los artículos relevantes del corpus
   local (`KNOWLEDGE_BASE` + `ARTICLE_REVIEW_DATA`) con scoring léxico.
3. Se manda ese contexto a Groq con un system prompt que prohíbe responder fuera
   del compendio y exige citar el artículo exacto.
4. Si Groq falla, no hay clave, o expira el rate limit (20 req/min por IP), el
   cliente cae automáticamente al matcher local determinista.

La lógica vive en `assistantCore.ts` para no duplicarse: `server.ts` la monta en
Express para dev, y `api/assistant.ts` + `api/health.ts` exponen el mismo núcleo
como funciones serverless para Vercel.

Comprueba el estado con `GET /api/health`.

## Despliegue en Vercel

El proyecto tiene dos piezas y Vercel las maneja por separado:

| Pieza | En dev | En Vercel |
| --- | --- | --- |
| Frontend | Vite en `:3000` | Estático desde `dist/` |
| API del asistente | `server.ts` (Express) en `:3001` | Funciones serverless en `api/` |

`vercel.json` fija `buildCommand: npm run build`, `outputDirectory: dist` y una regla
de reescritura que manda cualquier ruta a `index.html` (SPA) **excepto** `/api/`,
que se resuelve a las funciones. El proxy `/api` de `vite.config.ts` solo aplica
en dev; en producción las funciones sirven ese path directamente.

### Variables de entorno

Se configuran en **Settings → Environment Variables** del proyecto en Vercel.
Aplícalas a **Production**, **Preview** y **Development** si quieres que el
asistente funcione en los deploys de preview.

| Variable | Requerida | Valor por defecto | Notas |
| --- | --- | --- | --- |
| `GROQ_API_KEY` | **Sí** | — | Sin ella, `/api/assistant` devuelve `503` y el cliente cae al matcher local. Sin prefijo `VITE_`. |
| `GROQ_MODEL` | No | `openai/gpt-oss-120b` | Cualquier modelo disponible en tu cuenta. |
| `GROQ_TIMEOUT_MS` | No | `25000` | Timeout de la llamada a Groq. |
| `RATE_LIMIT_MAX` | No | `20` | Consultas por minuto y por IP. |
| `PORT` | No | `3001` | **Ignorado en Vercel.** Vercel asigna el puerto de la función. |

`GEMINI_API_KEY` y `APP_URL` quedan en `.env.example` por compatibilidad con el
origen del proyecto (AI Studio), pero el código actual no las usa.

### Importante: rota la clave de Groq

La clave de desarrollo circuló en texto plano durante la sesión de trabajo y debe
considerarse filtrada. Genera una nueva en https://console.groq.com/keys, revoca
la anterior, y pon **solo** la nueva en Vercel.

### Sobre el rate limit en serverless

El limitador de `assistantCore.ts` vive en memoria del proceso. En Vercel cada
instancia tiene su propia memoria y se reinicia en cold starts, así que **no es
una cuota dura**: frena ráfagas pero un usuario puede dispersar consultas entre
instancias. Si necesitas un límite real, usa Vercel KV o Upstash Redis.

### Comprobación tras desplegar

```bash
curl https://TU-DOMINIO/api/health
# {"ok":true,"groqConfigured":true,"model":"openai/gpt-oss-120b"}
```

`groqConfigured: true` confirma que la variable llegó a la función. Si sale
`false`, la clave no se cargó.