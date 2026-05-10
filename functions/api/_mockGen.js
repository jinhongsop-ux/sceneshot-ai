// Mock image generation service
// Replace this module with real AI API integration later

const SCENE_GRADIENTS = {
  'korean-baseball-broadcast': { from: '#1e3a5f', to: '#4a90d9', label: 'Korean Baseball' },
  'executive-office': { from: '#2c1810', to: '#8b6914', label: 'Executive Office' },
  'cyberpunk-city': { from: '#0a0020', to: '#7b2ff7', label: 'Cyberpunk' },
  'mountain-summit': { from: '#1a0a2e', to: '#f4a261', label: 'Mountain Summit' },
  'morning-coffee': { from: '#3e2723', to: '#d4a574', label: 'Morning Coffee' },
  'power-lift': { from: '#1a1a2e', to: '#e94560', label: 'Power Lift' },
};

function createMockSvg(gradient, isWatermarked) {
  const wm = isWatermarked
    ? `<text x="300" y="380" font-family="sans-serif" font-size="28" fill="rgba(255,255,255,0.35)" text-anchor="middle" transform="rotate(-30 300 300)">SceneShot AI Preview</text>`
    : '';
  return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${gradient.from}"/><stop offset="100%" style="stop-color:${gradient.to}"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><text x="300" y="280" font-family="sans-serif" font-size="24" fill="rgba(255,255,255,0.8)" text-anchor="middle">${gradient.label}</text><text x="300" y="320" font-family="sans-serif" font-size="16" fill="rgba(255,255,255,0.5)" text-anchor="middle">Mock Result for MVP</text>${wm}</svg>`)}`;
}

// Designed to be replaceable: swap this function for real AI API
export function generateImageForScene(sceneSlug) {
  const gradient = SCENE_GRADIENTS[sceneSlug] || { from: '#333', to: '#666', label: 'Unknown' };
  return {
    watermarked_url: createMockSvg(gradient, true),
    hd_url: createMockSvg(gradient, false),
  };
}
