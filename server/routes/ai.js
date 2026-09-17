import express from 'express';

const router = express.Router();

// Concurrency limiter (simple semaphore)
let concurrent = 0;
const MAX_CONCURRENT = parseInt(process.env.AI_MAX_CONCURRENT || '3', 10);

// Simple per-user rate limiter (token bucket)
const RATE_LIMIT_PER_MIN = parseInt(process.env.AI_RATE_LIMIT_PER_MIN || '60', 10);
const buckets = new Map(); // key -> {tokens, lastRefill}

function refillBucket(key) {
  const now = Date.now();
  const entry = buckets.get(key) || { tokens: RATE_LIMIT_PER_MIN, lastRefill: now };
  const elapsed = now - entry.lastRefill;
  const refill = Math.floor(elapsed / 60000) * RATE_LIMIT_PER_MIN;
  if (refill > 0) {
    entry.tokens = Math.min(RATE_LIMIT_PER_MIN, entry.tokens + refill);
    entry.lastRefill = now;
  }
  buckets.set(key, entry);
  return entry;
}

router.post('/chat', async (req, res) => {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
  const model = process.env.AI_MODEL || process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
  if (!apiKey) return res.status(500).json({ error: 'AI_API_KEY no configurada en el servidor' });

  const messages = req.body?.messages;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Se requieren mensajes en formato array' });

  const key = req.userId ? `user:${req.userId}` : `ip:${req.ip}`;

  // Rate limit
  const bucket = refillBucket(key);
  if (bucket.tokens <= 0) {
    return res.status(429).json({ error: 'Límite de peticiones a la API de IA alcanzado. Intenta más tarde.' });
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);

  // Concurrency limit
  if (concurrent >= MAX_CONCURRENT) {
    return res.status(429).json({ error: 'Servidor ocupado procesando otras peticiones. Intenta en unos segundos.' });
  }

  concurrent += 1;
  try {
    const resp = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages }),
    });

    const data = await resp.json().catch(() => null);
    if (!resp.ok) {
      const err = data?.error?.message || resp.statusText || 'Error en la API de IA';
      return res.status(502).json({ error: err, details: data });
    }

    return res.json(data);
  } catch (error) {
    console.error('AI proxy error:', error);
    return res.status(500).json({ error: 'Error interno al comunicarse con la API de IA' });
  } finally {
    concurrent = Math.max(0, concurrent - 1);
  }
});

export default router;
