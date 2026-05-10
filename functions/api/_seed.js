import { getStore } from './_store.js';

export function seedData() {
  const store = getStore();

  // Only seed once
  if (store.scenes.size > 0) return;

  // Scenes
  const scenes = [
    {
      slug: 'korean-baseball-broadcast',
      name: 'Korean Baseball Broadcast',
      name_zh: '韩国棒球直播风格',
      category: 'sports',
      description: 'Transform your selfie into a Korean baseball stadium broadcast screenshot',
      description_zh: '把自拍变成仿佛被体育直播镜头捕捉到的韩国棒球赛现场照片',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: true,
      prompt_template: 'A realistic Korean baseball stadium broadcast camera screenshot. The person in the photo is shown as if captured by a live sports broadcast camera at a Korean baseball game. Stadium lights, crowd in background, sports broadcast overlay style. High energy, candid feel.',
    },
    {
      slug: 'executive-office',
      name: 'Executive Office',
      name_zh: '精英办公室风格',
      category: 'professional',
      description: 'Professional headshot in a luxury executive office setting',
      description_zh: '在豪华办公室环境中拍摄的专业头像',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: false,
      prompt_template: 'Professional portrait in a luxury executive office with floor-to-ceiling windows, city skyline view, modern furniture, warm lighting. Corporate headshot style, confident pose.',
    },
    {
      slug: 'cyberpunk-city',
      name: 'Cyberpunk City',
      name_zh: '赛博朋克城市',
      category: 'fantasy',
      description: 'Neon-lit cyberpunk cityscape portrait',
      description_zh: '霓虹灯下的赛博朋克城市肖像',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: false,
      prompt_template: 'Portrait in a neon-lit cyberpunk city at night. Holographic billboards, rain-slicked streets, futuristic clothing, dramatic purple and blue lighting.',
    },
    {
      slug: 'mountain-summit',
      name: 'Mountain Summit',
      name_zh: '山顶日出',
      category: 'adventure',
      description: 'Golden hour portrait at a mountain summit',
      description_zh: '山顶金色时刻的肖像',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: false,
      prompt_template: 'Portrait at a mountain summit during golden hour. Dramatic mountain peaks, clouds below, warm sunlight, adventure gear, epic landscape photography style.',
    },
    {
      slug: 'morning-coffee',
      name: 'Morning Coffee',
      name_zh: '早晨咖啡时光',
      category: 'lifestyle',
      description: 'Cozy morning coffee shop portrait',
      description_zh: '温馨的早晨咖啡店肖像',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: false,
      prompt_template: 'Cozy portrait in a sunlit coffee shop. Latte art, warm wood interior, morning light through windows, relaxed casual outfit, lifestyle photography.',
    },
    {
      slug: 'power-lift',
      name: 'Power Lift',
      name_zh: '力量举铁',
      category: 'fitness',
      description: 'Dramatic gym power lifting moment',
      description_zh: '健身房力量训练的精彩瞬间',
      preview_image_url: '',
      base_cost: 1,
      hd_unlock_cost: 1,
      is_active: true,
      is_featured: false,
      prompt_template: 'Dramatic gym portrait during a power lift. Dramatic lighting, sweat glistening, motivational atmosphere, fitness photography style, low angle.',
    },
  ];

  scenes.forEach(s => {
    const id = store.generateId('scene');
    store.scenes.set(id, { id, ...s, created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  });

  // Pricing packages
  const packages = [
    {
      slug: 'single-experience',
      name: '单张体验包',
      amount_cny: 1.99,
      unlock_count: 1,
      description: '解锁 1 张高清无水印',
      is_featured: false,
      is_active: true,
    },
    {
      slug: 'triple-taste',
      name: '三张尝鲜包',
      amount_cny: 5.99,
      unlock_count: 3,
      description: '解锁 3 张高清无水印',
      is_featured: true,
      is_active: true,
    },
    {
      slug: 'standard-pack',
      name: '标准包',
      amount_cny: 9.90,
      unlock_count: 10,
      description: '8 次高清解锁 / 或 10 次标准生成',
      is_featured: false,
      is_active: true,
    },
    {
      slug: 'creator-pack',
      name: '创作者包',
      amount_cny: 19.90,
      unlock_count: 25,
      description: '20+ 次高清解锁',
      is_featured: false,
      is_active: true,
    },
  ];

  packages.forEach(p => {
    const id = store.generateId('pkg');
    store.pricingPackages.set(id, { id, ...p });
  });
}
