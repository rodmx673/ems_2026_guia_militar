import { retrieveDoctrine, buildDoctrineContext } from '../data/doctrineRetrieval';

export interface AssistantSuccessBody {
  answer: string;
  legalBasis?: string;
  sources: { source: string; category: string }[];
  mode: 'llm';
  model: string;
  grounded: boolean;
}

export interface AssistantErrorBody {
  error: string;
  code: string;
}

export type AssistantResult =
  | { status: 200; body: AssistantSuccessBody }
  | { status: number; body: AssistantErrorBody };

export interface AssistantEnv {
  GROQ_API_KEY?: string;
  GROQ_MODEL?: string;
  GROQ_TIMEOUT_MS?: string;
  RATE_LIMIT_MAX?: string;
}

const DEFAULT_MODEL = 'openai/gpt-oss-120b';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_TIMEOUT_MS = 25_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const DEFAULT_RATE_LIMIT_MAX = 20;

const SYSTEM_PROMPT = `Eres el Asistente Doctrinal del Compendio EMS 2026 para el Curso de Formación de Sargento 1/o. de Infantería y Fuerza Aérea Fusilero Paracaidista (SEDENA, México).

Reglas obligatorias:
1. Responde EXCLUSIVAMENTE con la información presente en el CONTEXTO DOCTRINAL proporcionado. Es la única fuente autorizada.
2. Cita siempre el artículo y la ley exactos (por ejemplo "Ley de Disciplina, Art. 24"). Si el contexto no trae fundamento legal, dilo.
3. Si el contexto es insuficiente para responder, indícalo con claridad y sugiere qué tema del compendio revisar. NUNCA inventes artículos, plazos, penas ni cifras.
4. Idioma: español de México. Trata al usuario como "cursante". Tono militar, sobrio y directo. Sin emojis.
5. Sé conciso y operativo: primero la respuesta, luego el fundamento, y de ser útil un ejemplo práctico de servicio.
6. Contrasta distinciones delicadas (Oficial vs. Tropa, con/sin perjuicio del servicio, etc.) porque son las que más se confunden en el examen.`;

export function getModel(env: AssistantEnv = process.env): string {
  return env.GROQ_MODEL || DEFAULT_MODEL;
}

export function isGroqConfigured(env: AssistantEnv = process.env): boolean {
  return Boolean(env.GROQ_API_KEY);
}

// Best-effort in-process limiter. On serverless this resets on cold start and is
// per-instance, so it throttles bursts but is not a hard quota.
const hits = new Map<string, number[]>();

function rateLimited(key: string, max: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

function sanitizeHistory(history: unknown): { role: string; content: string }[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m: unknown): m is { role: string; content: string } =>
        !!m &&
        typeof (m as { role?: unknown }).role === 'string' &&
        typeof (m as { content?: unknown }).content === 'string'
    )
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-6)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

export async function runAssistant(
  body: unknown,
  clientKey: string,
  env: AssistantEnv = process.env
): Promise<AssistantResult> {
  const max = Number(env.RATE_LIMIT_MAX ?? DEFAULT_RATE_LIMIT_MAX) || DEFAULT_RATE_LIMIT_MAX;

  if (rateLimited(clientKey, max)) {
    return {
      status: 429,
      body: { error: 'Demasiadas consultas. Espera un minuto.', code: 'rate_limited' }
    };
  }

  const apiKey = env.GROQ_API_KEY;
  if (!apiKey) {
    return {
      status: 503,
      body: { error: 'GROQ_API_KEY no configurada en el servidor.', code: 'missing_api_key' }
    };
  }

  const { query, history } = (body ?? {}) as { query?: unknown; history?: unknown };

  if (typeof query !== 'string' || !query.trim()) {
    return { status: 400, body: { error: 'Campo "query" requerido.', code: 'bad_request' } };
  }

  const trimmed = query.trim().slice(0, 1000);
  const model = getModel(env);

  const chunks = retrieveDoctrine(trimmed);
  const doctrineContext = buildDoctrineContext(chunks);

  const priorTurns = sanitizeHistory(history);

  const userContent = doctrineContext
    ? `CONTEXTO DOCTRINAL (fuente única autorizada):\n${doctrineContext}\n\nCONSULTA DEL CURSANTE:\n${trimmed}`
    : `No se encontró contexto en el compendio para esta consulta.\n\nCONSULTA DEL CURSANTE:\n${trimmed}`;

  const timeoutMs = Number(env.GROQ_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
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
      return { status: 502, body: { error: `Groq respondió ${groqRes.status}.`, code: 'upstream_error' } };
    }

    const payload = (await groqRes.json()) as { choices?: { message?: { content?: string } }[] };
    const answer = payload.choices?.[0]?.message?.content?.trim();

    if (!answer) {
      return { status: 502, body: { error: 'Groq devolvió una respuesta vacía.', code: 'empty_response' } };
    }

    return {
      status: 200,
      body: {
        answer,
        legalBasis: chunks[0]?.source,
        sources: chunks.map((c) => ({ source: c.source, category: c.category })),
        mode: 'llm',
        model,
        grounded: chunks.length > 0
      }
    };
  } catch (err) {
    const aborted = err instanceof Error && err.name === 'AbortError';
    console.error('[groq] request failed:', err instanceof Error ? err.message : err);
    return {
      status: 504,
      body: {
        error: aborted ? 'Groq excedió el tiempo de espera.' : 'No se pudo contactar a Groq.',
        code: aborted ? 'timeout' : 'network_error'
      }
    };
  } finally {
    clearTimeout(timer);
  }
}