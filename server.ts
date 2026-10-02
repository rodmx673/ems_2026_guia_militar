import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { runAssistant, getModel, isGroqConfigured } from './src/server/assistantCore';

dotenv.config({ path: '.env.local', quiet: true });
dotenv.config({ quiet: true });

const PORT = Number(process.env.PORT ?? 3001);

const app = express();
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ ok: true, groqConfigured: isGroqConfigured(), model: getModel() });
});

app.post('/api/assistant', async (req: Request, res: Response) => {
  const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown';
  const result = await runAssistant(req.body, ip);
  res.status(result.status).json(result.body);
});

app.listen(PORT, () => {
  console.log(`[server] EMS 2026 assistant API on http://localhost:${PORT}`);
  console.log(`[server] model: ${getModel()}`);
  console.log(
    `[server] GROQ_API_KEY: ${isGroqConfigured() ? 'configurada' : 'AUSENTE (el asistente usara el fallback local)'}`
  );
});