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
`/api/assistant`; Vite hace proxy de `/api` al servidor Express durante el dev.

1. `server.ts` recibe la consulta.
2. `src/data/doctrineRetrieval.ts` recupera los artículos relevantes del corpus
   local (`KNOWLEDGE_BASE` + `ARTICLE_REVIEW_DATA`) con scoring léxico.
3. Se manda ese contexto a Groq con un system prompt que prohíbe responder fuera
   del compendio y exige citar el artículo exacto.
4. Si Groq falla, no hay clave, o expira el rate limit (20 req/min por IP), el
   cliente cae automáticamente al matcher local determinista.

Comprueba el estado con `GET /api/health`.

## Despliegue

El build de `dist/` es estático, pero el asistente **requiere** `server.ts`
corriendo y `GROQ_API_KEY` en el entorno del servidor. Si lo sirves como sitio
estático puro, el asistente opera en modo local. `metadata.json` declara
`MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`, que es el escenario contemplado.