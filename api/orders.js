const packs = {
  single: { name: '单张体验包', amount: 2.99, unlocks: 1 },
  starter: { name: '三张尝鲜包', amount: 5.99, unlocks: 3 },
};

function json(res, status, payload) {
  res.status(status).json(payload);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  const { pack = 'single', userId = 'guest', channel = 'mock-alipay' } = req.body || {};
  const selected = packs[pack];

  if (!selected) {
    return json(res, 400, {
      ok: false,
      error: 'invalid_pack',
      message: 'pack must be single or starter.',
    });
  }

  const orderId = `ord_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

  return json(res, 200, {
    ok: true,
    version: '0.8.0',
    mode: 'mock-order-api',
    order: {
      id: orderId,
      userId,
      pack,
      name: selected.name,
      amount: selected.amount,
      currency: 'CNY',
      unlocks: selected.unlocks,
      channel,
      status: 'paid',
      payUrl: null,
      createdAt: new Date().toISOString(),
    },
    note: 'Mock paid status. Replace this with Alipay sandbox/precreate flow later.',
  });
}
