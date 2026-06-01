import { useEffect, useMemo, useState } from 'react';

const money = (value) => `¥${Number(value).toFixed(2)}`;

export default function Home() {
  const [scenes, setScenes] = useState([]);
  const [activeSlug, setActiveSlug] = useState('korean-baseball-broadcast');
  const [aspectRatio, setAspectRatio] = useState('4:5');
  const [generation, setGeneration] = useState(null);
  const [orders, setOrders] = useState([]);
  const [unlocks, setUnlocks] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/api/scenes')
      .then((res) => res.json())
      .then((data) => {
        setScenes(data.scenes || []);
        if (data.scenes?.[0]?.slug) setActiveSlug(data.scenes[0].slug);
      })
      .catch(() => setStatus('场景加载失败'));
  }, []);

  const activeScene = useMemo(() => {
    return scenes.find((scene) => scene.slug === activeSlug) || scenes[0];
  }, [activeSlug, scenes]);

  async function generatePreview() {
    if (!activeScene) return;
    setStatus('正在生成带水印预览...');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sceneSlug: activeScene.slug, aspectRatio })
    });
    const data = await res.json();
    setGeneration(data.generation);
    setStatus('预览已生成。当前仍是 Mock 后端，下一步接真实上传与 AI。');
  }

  async function buy(packageType = 'single') {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageType, generationId: generation?.id || null })
    });
    const data = await res.json();
    const order = data.order;
    setOrders((prev) => [order, ...prev]);
    setUnlocks((prev) => prev + order.unlockCount);
    setStatus(`Mock 支付成功：${order.name}，增加 ${order.unlockCount} 次高清解锁。`);
  }

  function unlockCurrent() {
    if (!generation) {
      setStatus('请先生成一张带水印预览。');
      return;
    }
    if (generation.isUnlocked) {
      setStatus('当前图片已经解锁。');
      return;
    }
    if (unlocks <= 0) {
      buy('single').then(() => {
        setGeneration((prev) => prev ? { ...prev, isUnlocked: true, previewWatermark: false } : prev);
      });
      return;
    }
    setUnlocks((prev) => prev - 1);
    setGeneration((prev) => prev ? { ...prev, isUnlocked: true, previewWatermark: false } : prev);
    setStatus('已使用 1 次高清解锁。');
  }

  return (
    <>
      <style jsx global>{`
        :root{--ink:#211816;--muted:#7d6a62;--line:#eadbd2;--hot:#f75f9b;--violet:#8b5cf6;--bg:#fff7f1;--shadow:0 24px 70px rgba(70,42,32,.12);--r:26px}*{box-sizing:border-box}body{margin:0;font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;color:var(--ink);background:radial-gradient(circle at 18% 0%,#ffe4f1 0,#fff7f1 40%,#f8fff5 100%)}a{text-decoration:none;color:inherit}button,input,select{font:inherit}.shell{max-width:1180px;margin:auto;padding:0 22px}.top{position:sticky;top:0;z-index:30;background:rgba(255,247,241,.86);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.top .shell{min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px}.brand{display:flex;gap:12px;align-items:center;font-weight:900}.mark{width:44px;height:44px;border-radius:16px;background:linear-gradient(135deg,var(--hot),var(--violet));display:grid;place-items:center;color:white}.brand small{display:block;color:var(--muted);font-size:12px}.nav{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.btn,.nav a{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid var(--line);border-radius:999px;padding:10px 15px;background:rgba(255,255,255,.66);font-weight:850;cursor:pointer}.primary{border-color:transparent;background:linear-gradient(135deg,var(--ink),#4a2d45);color:white;box-shadow:0 16px 32px rgba(30,20,18,.17)}.hero{padding:68px 0 34px}.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:center}.badge{display:inline-flex;border:1px solid var(--line);background:rgba(255,255,255,.7);border-radius:999px;padding:9px 13px;color:#8f5067;font-size:13px;font-weight:900}.h1{font-size:clamp(42px,7vw,80px);line-height:1.02;letter-spacing:-.07em;margin:18px 0 20px}.lead{font-size:clamp(17px,2vw,22px);line-height:1.72;color:var(--muted);max-width:780px}.actions{display:flex;gap:12px;flex-wrap:wrap;margin:24px 0}.mini{display:flex;gap:18px;flex-wrap:wrap;color:var(--muted);font-weight:850;font-size:13px}.panel,.card,.phone{background:rgba(255,255,255,.76);border:1px solid var(--line);border-radius:var(--r);box-shadow:var(--shadow)}.phone{padding:18px;transform:rotate(1deg)}.mock,.art,.cover{background:var(--grad);position:relative;overflow:hidden}.mock{min-height:390px;border-radius:26px;padding:20px;display:flex;flex-direction:column;justify-content:space-between}.mock:before,.art:before,.cover:after,.result:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 46% 30%,rgba(255,255,255,.9) 0 7%,transparent 8%),linear-gradient(to top,rgba(0,0,0,.48),transparent 58%)}.mock b{z-index:1;color:white}.wm{position:absolute;right:16px;bottom:16px;color:white;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.5);border-radius:999px;padding:8px 12px;font-size:12px;font-weight:900}.section{padding:44px 0}.head{display:flex;justify-content:space-between;gap:18px;align-items:end;margin-bottom:22px}.head h2{font-size:clamp(30px,4vw,46px);letter-spacing:-.04em;margin:0}p,.muted{color:var(--muted);line-height:1.7}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.card{padding:16px;box-shadow:0 12px 34px rgba(70,42,32,.07)}.cover{height:185px;border-radius:22px;margin-bottom:12px}.tag{display:inline-block;margin:6px 5px 0 0;padding:5px 9px;border-radius:999px;background:rgba(255,255,255,.64);border:1px solid rgba(255,255,255,.6);font-size:12px;font-weight:900;color:#7b485c}.price{display:flex;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:13px;margin-top:13px;color:var(--muted);font-size:13px}.detail{display:grid;grid-template-columns:.92fr 1.08fr;gap:28px}.panel{padding:22px}.field label{display:block;margin-bottom:7px;color:var(--muted);font-size:13px;font-weight:900}.input{width:100%;border:1px solid var(--line);border-radius:16px;background:white;padding:13px;margin-bottom:14px}.result{min-height:420px;border-radius:28px;overflow:hidden;position:relative;background:var(--grad)}.caption{position:absolute;left:20px;bottom:20px;right:20px;z-index:2;color:white;text-shadow:0 4px 20px rgba(0,0,0,.45)}.caption b{display:block;font-size:24px}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.stat{padding:18px;border-radius:22px;background:rgba(255,255,255,.66);border:1px solid var(--line)}.stat b{display:block;font-size:30px}.table{width:100%;border-collapse:collapse}.table th,.table td{border-bottom:1px solid var(--line);padding:12px;text-align:left;font-size:14px}@media(max-width:900px){.grid,.detail{grid-template-columns:1fr}.cards{grid-template-columns:1fr 1fr}.stats{grid-template-columns:1fr 1fr}}@media(max-width:620px){.top .shell{align-items:flex-start;padding-top:12px;padding-bottom:12px}.cards,.stats{grid-template-columns:1fr}.h1{font-size:42px}.mock{min-height:230px}}
      `}</style>
      <header className="top">
        <div className="shell">
          <a className="brand" href="#top"><span className="mark">SS</span><span>SceneShot AI<small>v0.7 · Next.js Backend Scaffold</small></span></a>
          <nav className="nav"><a href="#scenes">场景</a><a href="#create">生成</a><a href="#orders">订单</a><a href="/api/health">API Health</a></nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="shell grid">
          <div>
            <span className="badge">✨ v0.7 · Next.js + API Routes</span>
            <h1 className="h1">SceneShot AI 后端化骨架已接入</h1>
            <p className="lead">当前版本已经从纯静态页升级为 Next.js 应用。场景公开接口、Mock 生成接口、Mock 订单接口和健康检查接口都已可用，隐藏 Prompt 只保留在服务端模块。</p>
            <div className="actions">
              <a className="btn primary" href="#create">开始生成预览</a>
              <a className="btn" href="/api/scenes">查看公开场景 API</a>
            </div>
            <div className="mini"><span>公开场景：{scenes.length}</span><span>剩余高清解锁：{unlocks}</span><span>Mock 订单：{orders.length}</span></div>
            {status ? <p><b>{status}</b></p> : null}
          </div>
          <div className="phone">
            <div className="mock" style={{ '--grad': activeScene?.gradient || 'linear-gradient(135deg,#25122e,#f65f9a 55%,#ffe9ac)' }}>
              <b>Backend Protected</b><b>Prompt 不暴露到前台</b><span className="wm">SceneShot API</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell stats">
          <div className="stat"><b>{scenes.length}</b><span className="muted">公开场景</span></div>
          <div className="stat"><b>{generation ? 1 : 0}</b><span className="muted">当前预览</span></div>
          <div className="stat"><b>{unlocks}</b><span className="muted">高清解锁</span></div>
          <div className="stat"><b>{orders.length}</b><span className="muted">Mock 订单</span></div>
        </div>
      </section>

      <section id="scenes" className="section">
        <div className="shell">
          <div className="head"><div><h2>AI 场景商品</h2><p>这些数据来自 `/api/scenes`，前端拿不到 hiddenPromptTemplate。</p></div></div>
          <div className="cards">
            {scenes.map((scene) => (
              <article className="card" key={scene.slug}>
                <div className="cover" style={{ '--grad': scene.gradient }}><span className="wm">SceneShot</span></div>
                {scene.tags?.slice(0, 3).map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                <h3>{scene.title}</h3>
                <p>{scene.description}</p>
                <div className="price"><span>免费预览</span><b>{money(scene.priceSingle)} 解锁高清</b></div>
                <p><button className="btn primary" onClick={() => { setActiveSlug(scene.slug); document.getElementById('create')?.scrollIntoView({ behavior: 'smooth' }); }}>试试这个场景</button></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="create" className="section">
        <div className="shell detail">
          <div className="panel">
            <span className="badge">Create via API</span>
            <h2>生成带水印预览</h2>
            <p>v0.7 的生成请求已经走 `/api/generate`。目前还是 Mock 返回，后续会在该接口内接图片上传存储与 AI 模型。</p>
            <div className="field"><label>选择场景</label><select className="input" value={activeSlug} onChange={(e) => setActiveSlug(e.target.value)}>{scenes.map((scene) => <option key={scene.slug} value={scene.slug}>{scene.title}</option>)}</select></div>
            <div className="field"><label>比例</label><select className="input" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}><option>4:5</option><option>1:1</option><option>9:16</option></select></div>
            <button className="btn primary" onClick={generatePreview}>调用 /api/generate</button>
          </div>
          <div className="panel">
            <h2>结果预览</h2>
            <div className="result" style={{ '--grad': generation?.scene?.gradient || activeScene?.gradient || 'linear-gradient(135deg,#25122e,#f65f9a 55%,#ffe9ac)' }}>
              <div className="caption"><b>{generation?.scene?.title || activeScene?.title || '等待生成'}</b><span>{generation?.isUnlocked ? 'HD No Watermark' : '带水印预览 / Mock Result'}</span></div>
              {!generation?.isUnlocked ? <span className="wm">SceneShot AI Preview</span> : null}
            </div>
            <div className="actions"><button className="btn primary" onClick={unlockCurrent}>{generation?.isUnlocked ? '已解锁' : '¥2.99 解锁当前图'}</button><button className="btn" onClick={() => buy('bundle3')}>¥5.99 解锁 3 张</button></div>
          </div>
        </div>
      </section>

      <section id="orders" className="section">
        <div className="shell panel">
          <h2>Mock 订单记录</h2>
          <p>订单请求走 `/api/orders`，返回 paid_mock。v0.8 可替换为支付宝沙箱 create order + notify callback。</p>
          {orders.length ? <table className="table"><tbody>{orders.map((order) => <tr key={order.id}><td>{order.name}</td><td>{money(order.amount)}</td><td>{order.unlockCount} 次</td><td>{order.status}</td></tr>)}</tbody></table> : <p>暂无订单。</p>}
        </div>
      </section>
    </>
  );
}
