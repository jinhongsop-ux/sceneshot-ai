export function GET() {
  return Response.json({
    ok: true,
    app: 'SceneShot AI',
    version: '0.7.0',
    mode: 'nextjs-api-scaffold',
  });
}
