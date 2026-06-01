const allowedScenes = new Set([
  'korean-baseball-broadcast',
  'tokyo-night-street',
  'japanese-sakura-street',
  'kpop-concert-audience',
  'hong-kong-retro-portrait',
  'european-football-stand',
]);

function json(res, status, payload) {
  res.status(status).json(payload);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  const { sceneSlug, ratio = '4:5', imageToken = 'browser-session-image' } = req.body || {};

  if (!sceneSlug || !allowedScenes.has(sceneSlug)) {
    return json(res, 400, {
      ok: false,
      error: 'invalid_scene',
      message: 'sceneSlug is required and must be a supported scene.',
    });
  }

  const generationId = `gen_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

  return json(res, 200, {
    ok: true,
    version: '0.8.0',
    mode: 'mock-generation-api',
    generation: {
      id: generationId,
      sceneSlug,
      ratio,
      imageToken,
      status: 'preview_ready',
      previewWatermark: true,
      hdUnlocked: false,
      previewUrl: null,
      hdUrl: null,
      provider: 'mock',
      createdAt: new Date().toISOString(),
    },
    next: {
      unlockEndpoint: '/api/unlock',
      orderEndpoint: '/api/orders',
    },
  });
}
