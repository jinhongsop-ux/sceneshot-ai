const scenes = [
  {
    slug: 'korean-baseball-broadcast',
    title: '韩国棒球直播风格',
    hot: true,
    price: 2.99,
    bundle: 5.99,
    description: '上传自拍，生成像被韩国棒球赛直播镜头捕捉到的看球现场照片。',
    subtitle: '像真的被体育直播拍到，适合小红书、抖音和朋友圈晒图。',
    tags: ['爆款', '女生适合', '直播感', '韩国棒球'],
  },
  {
    slug: 'tokyo-night-street',
    title: '东京夜景街拍',
    hot: true,
    price: 2.99,
    bundle: 5.99,
    description: '把普通自拍变成东京街头霓虹夜景里的电影感街拍。',
    subtitle: '适合头像、朋友圈九宫格、旅行感虚拟照片。',
    tags: ['夜景', '东京', '街拍'],
  },
  {
    slug: 'japanese-sakura-street',
    title: '日本樱花街拍',
    hot: true,
    price: 2.99,
    bundle: 5.99,
    description: '上传一张照片，获得春日樱花街道里的清透日系写真。',
    subtitle: '轻旅行感、春日感、适合女生头像。',
    tags: ['樱花', '日系', '春日'],
  },
];

export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    version: '0.7.0',
    scenes,
  });
}
