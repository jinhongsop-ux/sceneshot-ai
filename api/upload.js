function json(res, status, payload) {
  res.status(status).json(payload);
}

const MAX_SIZE_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  const { fileName = 'upload.jpg', mimeType = 'image/jpeg', size = 0, userId = 'guest' } = req.body || {};
  const numericSize = Number(size || 0);

  if (!ALLOWED_TYPES.has(mimeType)) {
    return json(res, 400, {
      ok: false,
      error: 'unsupported_file_type',
      message: 'Only image/jpeg, image/png and image/webp are supported.',
    });
  }

  if (numericSize > MAX_SIZE_BYTES) {
    return json(res, 413, {
      ok: false,
      error: 'file_too_large',
      message: 'Image must be smaller than 8MB in the MVP upload flow.',
    });
  }

  const uploadId = `upl_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
  const imageToken = `mock_storage:${uploadId}`;
  const storageProvider = process.env.BLOB_READ_WRITE_TOKEN ? 'vercel-blob-ready' : 'mock-token-storage';

  return json(res, 200, {
    ok: true,
    version: '1.0.0',
    mode: 'upload-token-api',
    upload: {
      id: uploadId,
      userId,
      fileName,
      mimeType,
      size: numericSize,
      imageToken,
      imageUrl: null,
      storageProvider,
      status: 'uploaded_token_created',
      createdAt: new Date().toISOString(),
    },
    next: {
      generateEndpoint: '/api/generate',
      imageToken,
    },
    note: 'This endpoint creates a storage-ready image token. Configure Vercel Blob or R2 later to persist the real file behind the same contract.',
  });
}
