import { publicScenes } from '../../../lib/scenes';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    ok: true,
    version: '0.7.0',
    scenes: publicScenes(),
  });
}
