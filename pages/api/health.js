export default function handler(req, res) {
  return res.status(200).json({
    ok: true,
    app: 'SceneShot AI',
    version: '0.7.0',
    runtime: 'nextjs-api-routes',
    timestamp: new Date().toISOString()
  });
}
