const scenes = [
  {
    id: 'scene_kbb',
    slug: 'korean-baseball-broadcast',
    title: '韩国棒球直播风格',
    salesSubtitle: '上传自拍，生成像被韩国棒球赛直播镜头捕捉到的现场照片。',
    description: '像真的被体育直播拍到，适合小红书、抖音和朋友圈晒图。',
    tags: ['爆款', '女生适合', '直播感', '韩国棒球'],
    priceSingle: 2.99,
    priceBundle: 5.99,
    unlockSingle: 1,
    unlockBundle: 3,
    isTrending: true,
    gradient: 'linear-gradient(135deg,#25122e,#f65f9a 55%,#ffe9ac)',
    bestInputPhotoTips: ['正脸或半身照效果最好', '光线清晰', '避免多人合照', '不要遮挡脸部'],
    hiddenPromptTemplate: 'Create a realistic Korean baseball broadcast crowd-shot scene using the uploaded portrait as the main person. Keep face identity stable, make it look like a live sports camera captured her in the audience.',
    hiddenNegativePrompt: 'extra fingers, distorted face, duplicate person, text artifacts, watermark, low quality'
  },
  {
    id: 'scene_tokyo',
    slug: 'tokyo-night-street',
    title: '东京夜景街拍',
    salesSubtitle: '把普通自拍变成东京街头霓虹夜景里的电影感街拍。',
    description: '适合头像、朋友圈九宫格、旅行感虚拟照片。',
    tags: ['夜景', '东京', '街拍', '氛围感'],
    priceSingle: 2.99,
    priceBundle: 5.99,
    unlockSingle: 1,
    unlockBundle: 3,
    isTrending: true,
    gradient: 'linear-gradient(135deg,#15192e,#6257ff 48%,#ff93cb)',
    bestInputPhotoTips: ['半身照效果更自然', '面部清晰', '服装轮廓明显'],
    hiddenPromptTemplate: 'Transform the uploaded portrait into a cinematic Tokyo neon night street photo, realistic lens, urban atmosphere, stable identity.',
    hiddenNegativePrompt: 'cartoon, low quality, deformed face, extra limbs, text artifacts'
  },
  {
    id: 'scene_sakura',
    slug: 'japanese-sakura-street',
    title: '日本樱花街拍',
    salesSubtitle: '上传一张照片，获得春日樱花街道里的清透日系写真。',
    description: '轻旅行感、春日感、适合女生头像和生活方式内容。',
    tags: ['樱花', '日系', '春日', '旅行感'],
    priceSingle: 2.99,
    priceBundle: 5.99,
    unlockSingle: 1,
    unlockBundle: 3,
    isTrending: true,
    gradient: 'linear-gradient(135deg,#ffd6e8,#fff5fb 45%,#9bd8b8)',
    bestInputPhotoTips: ['浅色衣服更容易出片', '表情自然', '单人照片优先'],
    hiddenPromptTemplate: 'Place the uploaded portrait into a soft Japanese sakura street photo, natural spring light, realistic casual snapshot.',
    hiddenNegativePrompt: 'overexposed, face changed, extra hands, blurry, watermark'
  },
  {
    id: 'scene_kpop',
    slug: 'kpop-concert-audience',
    title: 'K-pop 演唱会观众席',
    salesSubtitle: '生成仿佛你在演唱会内场被灯光照亮的追星现场照片。',
    description: '舞台灯、荧光棒、人群光海，强烈社交传播感。',
    tags: ['K-pop', '追星', '演唱会', '闪光灯'],
    priceSingle: 2.99,
    priceBundle: 5.99,
    unlockSingle: 1,
    unlockBundle: 3,
    isTrending: true,
    gradient: 'linear-gradient(135deg,#1d1036,#a855f7 45%,#22d3ee)',
    bestInputPhotoTips: ['脸部不要过暗', '避免复杂背景', '自拍或半身照均可'],
    hiddenPromptTemplate: 'Create a realistic K-pop concert audience photo from the uploaded portrait, stage lighting, crowd glow, stable identity.',
    hiddenNegativePrompt: 'bad anatomy, strange hands, face mismatch, text, watermark'
  }
];

export function getAllScenesInternal() {
  return scenes;
}

export function getSceneBySlug(slug) {
  return scenes.find((scene) => scene.slug === slug) || null;
}

export function toPublicScene(scene) {
  const {
    hiddenPromptTemplate,
    hiddenNegativePrompt,
    ...publicScene
  } = scene;
  return publicScene;
}

export function getPublicScenes() {
  return scenes.map(toPublicScene);
}
