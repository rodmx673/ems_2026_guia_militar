import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { retrieveDoctrine, buildDoctrineContext } from './src/data/doctrineRetrieval';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT ?? 3001);
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? '';
const GROQ_MODEL = process.env.GROQ_MODEL ?? 'openai/gpt-oss-120b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_TIMEOUT_MS = Number(process.env.GROQ_TIMEOUT_MS ?? 25000);
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX ?? 20);

const app = express();
app.use(express.json({ limit: '64kb' }));

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const SYSTEM_PROMPT = `Eres el Asistente Doctrinal del Compendio EMS 2026 para el Curso de Formación de Sargento 1/o. de Infantería y Fuerza Aérea Fusilero Paracaidista (SEDENA, México).

Reglas obligatorias:
1. Responde EXCLUSIVAMENTE con la información presente en el CONTEXTO DOCTRINAL proporcionado. Es la única fuente autorizada.
2. Cita siempre el artículo y la ley exactos (por ejemplo "Ley de Disciplina, Art. 24"). Si el contexto no trae fundamento legal, dilo.
3. Si el contexto es insuficiente para responder, indícalo con claridad y sugiere qué tema del compendio revisar. NUNCA inventes artículos, plazos, penas ni cifras.
4. Idioma: español de México. Trata al usuario como "cursante". Tono militar, sobrio y directo. Sin emojis.
5. Sé conciso y operativo: primero la respuesta, luego el fundamento, y de ser útil un ejemplo práctico de servicio.
6. Contrasta distinciones delicadas (Oficial vs. Tropa, con/sin perjuicio del servicio, etc.) porque son las que más se confunden en el examen.`;

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    ok: true,
    groqConfigured: Boolean(GROQ_API_KEY),
    model: GROQ_MODEL
  });
});

app.post('/api/assistant', async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';

  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Demasiadas consultas. Espera un minuto.', code: 'rate_limited' });
  }

  if (!GROQ_API_KEY) {
    return res.status(503).json({
      error: 'GROQ_API_KEY no configurada en el servidor.',
      code: 'missing_api_key'
    });
  }

  const { query, history } = req.body ?? {};

  if (typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Campo "query" requerido.', code: 'bad_request' });
  }

  const trimmed = query.trim().slice(0, 1000);

  const chunks = retrieveDoctrine(trimmed);
  const doctrineContext = buildDoctrineContext(chunks);

  const priorTurns: { role: string; content: string }[] = Array.isArray(history)
    ? history
        .filter(
          (m: unknown): m is { role: string; content: string } =>
            !!m &&
            typeof (m as { role?: unknown }).role === 'string' &&
            typeof (m as { content?: unknown }).content === 'string'
        )
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];

  const userContent = doctrineContext
    ? `CONTEXTO DOCTRINAL (fuente única autorizada):\n${doctrineContext}\n\nCONSULTA DEL CURSANTE:\n${trimmed}`
    : `No se encontró contexto en el compendio para esta consulta.\n\nCONSULTA DEL CURSANTE:\n${trimmed}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GROQ_TIMEOUT_MS);

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...priorTurns,
          { role: 'user', content: userContent }
        ]
      })
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text().catch(() => '');
      console.error(`[groq] ${groqRes.status} ${groqRes.statusText} :: ${detail.slice(0, 500)}`);
      return res.status(502).json({
        error: `Groq respondió ${groqRes.status}.`,
        code: 'upstream_error'
      });
    }

    const payload = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const answer = payload.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return res.status(502).json({ error: 'Groq devolvió una respuesta vacía.', code: 'empty_response' });
    }

    return res.json({
      answer,
      legalBasis: chunks[0]?.source,
      sources: chunks.map((c) => ({ source: c.source, category: c.category })),
      mode: 'llm',
      model: GROQ_MODEL,
      grounded: chunks.length > 0
    });
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    console.error('[groq] request failed:', err instanceof Error ? err.message : err);
    return res.status(504).json({
      error: aborted ? 'Groq excedió el tiempo de espera.' : 'No se pudo contactar a Groq.',
      code: aborted ? 'timeout' : 'network_error'
    });
  } finally {
    clearTimeout(timer);
  }
});

app.listen(PORT, () => {
  console.log(`[server] EMS 2026 assistant API on http://localhost:${PORT}`);
  console.log(`[server] model: ${GROQ_MODEL}`);
  console.log(`[server] GROQ_API_KEY: ${GROQ_API_KEY ? 'configurada' : 'AUSENTE (el asistente usara el fallback local)'}`);
});