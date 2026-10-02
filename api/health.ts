import { getModel, isGroqConfigured } from '../src/server/assistantCore';

interface NodeReq {
  method?: string;
}

interface NodeRes {
  status(code: number): NodeRes;
  setHeader(name: string, value: string): void;
  json(payload: unknown): void;
}

export default function handler(req: NodeReq, res: NodeRes) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido.', code: 'method_not_allowed' });
  }

  return res.status(200).json({ ok: true, groqConfigured: isGroqConfigured(), model: getModel() });
}