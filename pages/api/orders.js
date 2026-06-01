export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { packageType = 'single', generationId = null } = req.body || {};
  const packages = {
    single: { name: '单张体验包', amount: 2.99, unlockCount: 1 },
    bundle3: { name: '三张尝鲜包', amount: 5.99, unlockCount: 3 }
  };
  const selected = packages[packageType] || packages.single;

  return res.status(200).json({
    order: {
      id: `ord_${Date.now()}`,
      ...selected,
      generationId,
      status: 'paid_mock',
      provider: 'mock_alipay_placeholder',
      createdAt: new Date().toISOString()
    }
  });
}
