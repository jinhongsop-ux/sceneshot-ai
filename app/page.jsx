import { publicScenes } from '../lib/scenes';

function money(n) {
  return `¥${Number(n).toFixed(2)}`;
}

export default function Page() {
  const scenes = publicScenes();

  return (
    <main>
      <header className="top">
        <div className="shell topShell">
          <a className="brand" href="/">
            <span className="mark">SS</span>
            <span>
              SceneShot AI
              <small>v0.7 · Next.js API Scaffold</small>
            </span>
          </a>
          <nav className="nav">
            <a href="/api/health" target="_blank">Health API</a>
            <a href="/api/scenes" target="_blank">Scenes API</a>
            <a className="btn primary" href="#scenes">查看场景</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="shell grid">
          <div>
            <span className="badge">✨ v0.7 · Next.js 后端化脚手架</span>
            <h1 className="h1">上传照片，生成你的爆款 AI 场景写真</h1>
            <p className="lead">
              当前版本已经从纯静态单页升级为 Next.js App Router。场景数据由服务端模块输出，
              并通过 API Routes 暴露给前端。下一步可以继续接服务端图片上传、真实 AI 生成和支付宝支付。
            </p>
            <div className="actions">
              <a className="btn primary" href="/api/scenes" target="_blank">验证 Scenes API</a>
              <a className="btn" href="/api/health" target="_blank">验证 Health API</a>
            </div>
            <div className="mini">
              <span>服务端场景：{scenes.length}</span>
              <span>Prompt 不暴露给前台</span>
              <span>Next.js API Ready</span>
            </div>
          </div>
          <div className="phone">
            <div className="compare">
              <div className="mock before"><b>Before</b><b>上传自拍</b></div>
              <div className="mock" style={{ '--grad': scenes[0]?.gradient || 'linear-gradient(135deg,#25122e,#f65f9a,#ffe9ac)' }}>
                <b>After</b><b>韩国棒球直播风格</b><span className="wm">SceneShot AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell stats">
          <div className="stat"><b>{scenes.length}</b><span className="muted">服务端场景</span></div>
          <div className="stat"><b>2</b><span className="muted">API Routes</span></div>
          <div className="stat"><b>0</b><span className="muted">Prompt 泄露</span></div>
          <div className="stat"><b>v0.8</b><span className="muted">下一步上传存储</span></div>
        </div>
      </section>

      <section className="section" id="scenes">
        <div className="shell">
          <div className="head">
            <div>
              <span className="badge">Scene Catalog</span>
              <h2>AI 场景商品库</h2>
              <p>这些场景来自服务端 Scene Catalog，前台只拿公开字段，不返回 hidden prompt。</p>
            </div>
          </div>
          <div className="cards">
            {scenes.map((scene) => (
              <article className="card" key={scene.slug}>
                <div className="cover" style={{ '--grad': scene.gradient }}><span className="wm">SceneShot</span></div>
                {scene.hot ? <span className="tag dark">爆款</span> : null}
                {scene.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                <h3>{scene.title}</h3>
                <p>{scene.description}</p>
                <div className="price"><span>免费带水印预览</span><b>{money(scene.price)} 解锁高清</b></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="panel">
            <h2>v0.8 建议</h2>
            <p>
              下一步把 v0.6 的上传、登录、订单、高清解锁交互拆成 Client Component，
              同时新增服务端上传存储接口。推荐顺序：Vercel Blob / Cloudflare R2 → Generation API → 支付宝沙箱订单。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
