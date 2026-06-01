import { getSceneBySlug, toPublicScene } from '../../lib/scenes';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sceneSlug, aspectRatio = '4:5' } = req.body || {};
  const scene = getSceneBySlug(sceneSlug);

  if (!scene) {
    return res.status(404).json({ error: 'Scene not found' });
  }

  // v0.7 scaffold: hiddenPromptTemplate stays server-side here.
  // A future provider call should use scene.hiddenPromptTemplate and uploaded image storage URL.
  return res.status(200).json({
    generation: {
      id: `gen_${Date.now()}`,
      scene: toPublicScene(scene),
      aspectRatio,
      status: 'preview_ready',
      isUnlocked: false,
      previewWatermark: true,
      unlockPrice: scene.priceSingle,
      createdAt: new Date().toISOString()
    }
  });
}
