import './globals.css';

export const metadata = {
  title: 'SceneShot AI v0.7｜AI 场景写真生成工具',
  description: '上传照片，选择场景，生成带水印预览，并解锁高清无水印图片。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
