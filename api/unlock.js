function json(res, status, payload) {
  res.status(status).json(payload);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  const { generationId, orderId = null, userId = 'guest' } = req.body || {};

  if (!generationId) {
    return json(res, 400, {
      ok: false,
      error: 'missing_generation_id',
      message: 'generationId is required.',
    });
  }

  return json(res, 200, {
    ok: true,
    version: '0.8.0',
    mode: 'mock-unlock-api',
    unlock: {
      id: `unlock_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
      userId,
      generationId,
      orderId,
      status: 'unlocked',
      hdUnlocked: true,
      watermarkRemoved: true,
      hdUrl: null,
      createdAt: new Date().toISOString(),
    },
    note: 'Mock unlock result. Replace with DB state update and HD file authorization later.',
  });
}
