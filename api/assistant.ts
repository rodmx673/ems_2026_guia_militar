import { runAssistant } from '../src/server/assistantCore';

interface NodeReq {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface NodeRes {
  status(code: number): NodeRes;
  setHeader(name: string, value: string): void;
  json(payload: unknown): void;
}

function clientKey(req: NodeReq): string {
  const fwd = req.headers?.['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
  const real = req.headers?.['x-real-ip'];
  if (typeof real === 'string' && real.length > 0) return real;
  return req.socket?.remoteAddress ?? 'unknown';
}

export default async function handler(req: NodeReq, res: NodeRes) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido.', code: 'method_not_allowed' });
  }

  const result = await runAssistant(req.body, clientKey(req));
  return res.status(result.status).json(result.body);
}