export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    app: 'SceneShot AI',
    version: '0.7.0',
    mode: 'vercel-serverless-api',
    timestamp: new Date().toISOString(),
  });
}
