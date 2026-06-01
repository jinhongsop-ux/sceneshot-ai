'use client';

import { useEffect, useMemo, useState } from 'react';

function money(n) {
  return `¥${Number(n).toFixed(2)}`;
}

function defaultScenes() {
  return [
    {
      slug: 'korean-baseball-broadcast',
      title: '韩国棒球直播风格',
      hot: true,
      price: 2.99,
      bundle: 5.99,
      gradient: 'linear-gradient(135deg,#25122e,#f65f9a 55%,#ffe9ac)',
      description: '上传自拍，生成像被韩国棒球赛直播镜头捕捉到的看球现场照片。',
      subtitle: '像真的被体育直播拍到，适合小红书、抖音和朋友圈晒图。',
      tags: ['爆款', '女生适合', '直播感', '韩国棒球'],
    },
  ];
}

export default function Page() {
  const [scenes, setScenes] = useState(defaultScenes());
  const [route, setRoute] = useState('/');
  const [user, setUser] = useState(null);
  const [unlocks, setUnlocks] = useState(0);
  const [orders, setOrders] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetch('/api/scenes')
      .then((res) => res.json())
      .then((data) => {
        if (data?.scenes?.length) setScenes(data.scenes);
      })
      .catch(() => {});

    setUser(JSON.parse(localStorage.getItem('ss_user') || 'null'));
    setUnlocks(Number(localStorage.getItem('ss_unlocks') || 0));
    setOrders(JSON.parse(localStorage.getItem('ss_orders') || '[]'));
    setGenerations(JSON.parse(localStorage.getItem('ss_gens') || '[]'));

    const syncRoute = () => setRoute(location.hash.slice(1) || '/');
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  }, []);

  useEffect(() => {
    localStorage.setItem('ss_user', JSON.stringify(user));
    localStorage.setItem('ss_unlocks', String(unlocks));
    localStorage.setItem('ss_orders', JSON.stringify(orders));
    localStorage.setItem('ss_gens', JSON.stringify(generations));
  }, [user, unlocks, orders, generations]);

  const currentScene = useMemo(() => {
    const slug = route.startsWith('/create/')
      ? route.replace('/create/', '')
      : route.startsWith('/scene/')
        ? route.replace('/scene/', '')
        : 'korean-baseball-broadcast';
    return scenes.find((item) => item.slug === slug) || scenes[0];
  }, [route, scenes]);

  function login(name) {
    setUser({ name, createdAt: new Date().toLocaleString() });
    toast('登录成功');
  }

  function logout() {
    setUser(null);
    toast('已退出登录');
  }

  function toast(text) {
    const event = new CustomEvent('ss-toast', { detail: text });
    window.dispatchEvent(event);
  }

  function requireLogin() {
    if (user) return true;
    toast('请先登录/注册');
    location.hash = '#/account';
    return false;
  }

  function createOrder(name, amount, count) {
    const order = {
      id: `ord_${Date.now()}`,
      name,
      amount,
      count,
      status: 'paid',
      time: new Date().toLocaleString(),
      user: user?.name || 'guest',
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  function buyPack(count, amount, name) {
    if (!requireLogin()) return;
    createOrder(name, amount, count);
    setUnlocks((value) => value + count);
    toast(`Mock 支付成功：${name}`);
  }

  function createGeneration({ scene, ratio }) {
    if (!requireLogin()) return;
    if (!currentImage) {
      toast('请先上传照片');
      return;
    }
    const generation = {
      id: `gen_${Date.now()}`,
      scene: scene.title,
      slug: scene.slug,
      ratio,
      price: scene.price,
      time: new Date().toLocaleString(),
      unlocked: false,
      gradient: scene.gradient,
    };
    setGenerations((prev) => [generation, ...prev].slice(0, 20));
    toast('已生成带水印预览');
    location.hash = `#/result/${generation.id}`;
  }

  function unlockGeneration(id) {
    if (!requireLogin()) return;
    const target = generations.find((item) => item.id === id);
    if (!target) return;
    if (target.unlocked) {
      toast('这张已经解锁');
      return;
    }
    if (unlocks > 0) {
      setUnlocks((value) => value - 1);
      setGenerations((prev) => prev.map((item) => (item.id === id ? { ...item, unlocked: true } : item)));
      createOrder('使用高清解锁次数', 0, 1);
      toast('已使用 1 次高清解锁');
      return;
    }
    createOrder('单张体验包', 2.99, 1);
    setGenerations((prev) => prev.map((item) => (item.id === id ? { ...item, unlocked: true } : item)));
    toast('已模拟支付 ¥2.99 并解锁');
  }

  return (
    <>
      <Header user={user} />
      <main>
        {route === '/' && <Home scenes={scenes} user={user} unlocks={unlocks} orders={orders} generations={generations} />}
        {route === '/scenes' && <ScenesPage scenes={scenes} />}
        {route.startsWith('/scene/') && <SceneDetail scene={currentScene} />}
        {(route === '/create' || route.startsWith('/create/')) && (
          <CreatePage scenes={scenes} scene={currentScene} setCurrentImage={setCurrentImage} currentImage={currentImage} onCreate={createGeneration} unlocks={unlocks} />
        )}
        {route.startsWith('/result/') && <ResultPage generation={generations.find((item) => item.id === route.replace('/result/', ''))} currentImage={currentImage} unlocks={unlocks} onUnlock={unlockGeneration} onBuyPack={buyPack} />}
        {route === '/history' && <History generations={generations} setGenerations={setGenerations} />}
        {route === '/account' && <Account user={user} login={login} logout={logout} unlocks={unlocks} orders={orders} generations={generations} onBuyPack={buyPack} />}
        {route === '/admin' && <Admin scenes={scenes} unlocks={unlocks} orders={orders} generations={generations} />}
      </main>
      <Toast />
    </>
  );
}

function Header({ user }) {
  return (
    <header className="top">
      <div className="shell topShell">
        <a className="brand" href="#/">
          <span className="mark">SS</span>
          <span>SceneShot AI<small>v0.7 · Next.js API</small></span>
        </a>
        <nav className="nav">
          <a href="#/scenes">场景</a>
          <a href="#/create">生成</a>
          <a href="#/history">结果</a>
          <a href="#/account">{user ? user.name : '账户'}</a>
          <a href="#/admin">后台</a>
          <a className="btn primary" href="#/create/korean-baseball-broadcast">立即生成</a>
        </nav>
      </div>
    </header>
  );
}

function Home({ scenes, user, unlocks, orders, generations }) {
  return (
    <>
      <section className="hero">
        <div className="shell grid">
          <div>
            <span className="badge">✨ v0.7 · Next.js 后端化脚手架</span>
            <h1 className="h1">上传照片，生成你的爆款 AI 场景写真</h1>
            <p className="lead">现在项目已经从静态单页升级为 Next.js App Router。场景数据由服务端 API 输出，后续可以继续接图片上传、AI 生成和支付宝支付。</p>
            <div className="actions">
              <a className="btn primary" href="#/create/korean-baseball-broadcast">立即生成我的照片</a>
              <a className="btn" href="/api/scenes" target="_blank">查看 Scenes API</a>
            </div>
            <div className="mini"><span>{user ? `已登录：${user.name}` : '未登录'}</span><span>剩余高清解锁：{unlocks}</span><span>订单：{orders.length}</span></div>
          </div>
          <div className="phone"><div className="compare"><div className="mock before"><b>Before</b><b>上传自拍</b></div><div className="mock" style={{ '--grad': scenes[0]?.gradient }}><b>After</b><b>韩国棒球直播风格</b><span className="wm">SceneShot AI</span></div></div></div>
        </div>
      </section>
      <section className="section"><div className="shell stats"><Stat value={scenes.length} label="服务端场景" /><Stat value={generations.length} label="生成记录" /><Stat value={unlocks} label="高清解锁" /><Stat value={orders.length} label="Mock 订单" /></div></section>
      <section className="section"><div className="shell"><div className="head"><div><h2>热门 AI 场景</h2><p>场景来自 /api/scenes，不再写死在前端页面里。</p></div><a className="btn" href="#/scenes">全部场景</a></div><div className="cards">{scenes.map((scene) => <SceneCard key={scene.slug} scene={scene} />)}</div></div></section>
    </>
  );
}

function ScenesPage({ scenes }) {
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">Scene Gallery</span><h2>选择场景开始生成</h2><p>前台不展示隐藏 Prompt，只展示场景商品信息。</p></div><a className="btn primary" href="#/create">立即生成</a></div><div className="cards">{scenes.map((scene) => <SceneCard key={scene.slug} scene={scene} />)}</div></div></section>;
}

function SceneCard({ scene }) {
  return <article className="card"><a href={`#/scene/${scene.slug}`}><div className="cover" style={{ '--grad': scene.gradient }}><span className="wm">SceneShot</span></div></a>{scene.hot && <span className="tag dark">爆款</span>}{scene.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}<h3>{scene.title}</h3><p>{scene.description}</p><div className="price"><span>免费预览</span><b>{money(scene.price)} 解锁高清</b></div><p><a className="btn primary" href={`#/create/${scene.slug}`}>试试这个场景</a></p></article>;
}

function SceneDetail({ scene }) {
  return <section className="section"><div className="shell detail"><div className="panel"><div className="art" style={{ '--grad': scene.gradient }}><span className="wm">Preview</span></div></div><div className="panel"><h1 className="h1 smallTitle">{scene.title}</h1><p className="lead">{scene.subtitle}</p><p>{scene.description}</p>{scene.tags?.map((tag) => <span className="tag" key={tag}>{tag}</span>)}<div className="price"><span>免费生成带水印预览</span><b>{money(scene.price)} 解锁高清</b></div><div className="actions"><a className="btn primary" href={`#/create/${scene.slug}`}>上传照片生成</a><a className="btn" href="#/scenes">换个场景</a></div></div></div></section>;
}

function CreatePage({ scenes, scene, setCurrentImage, currentImage, onCreate, unlocks }) {
  const [selected, setSelected] = useState(scene.slug);
  const [ratio, setRatio] = useState('4:5');
  const active = scenes.find((item) => item.slug === selected) || scene;
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">Create</span><h2>上传照片生成带水印预览</h2><p>v0.7 仍保留安全的浏览器会话预览，不保存用户图片内容。</p></div></div><div className="detail"><form className="panel form" onSubmit={(event) => { event.preventDefault(); onCreate({ scene: active, ratio }); }}><div className="field"><label>场景</label><select className="input" value={selected} onChange={(event) => setSelected(event.target.value)}>{scenes.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></div><div className="upload"><b>上传自拍 / 半身照</b><input className="input file" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) setCurrentImage(URL.createObjectURL(file)); }} /></div><div className="field"><label>比例</label><select className="input" value={ratio} onChange={(event) => setRatio(event.target.value)}><option value="4:5">4:5 小红书推荐</option><option value="1:1">1:1 头像</option><option value="9:16">9:16 抖音封面</option></select></div><button className="btn primary">生成带水印预览</button></form><div className="panel"><h3>上传预览</h3><div className="preview">{currentImage ? <img src={currentImage} alt="上传预览" /> : <span className="muted">选择图片后显示预览</span>}</div><p className="muted">剩余高清解锁次数：{unlocks}</p></div></div></div></section>;
}

function ResultPage({ generation, currentImage, unlocks, onUnlock, onBuyPack }) {
  if (!generation) return <History generations={[]} setGenerations={() => {}} />;
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">Result</span><h2>{generation.scene}</h2><p>{generation.unlocked ? '高清无水印已解锁' : '当前是带水印预览，满意后解锁高清。'}</p></div><a className="btn" href={`#/create/${generation.slug}`}>再生成一张</a></div><div className="detail"><div className="panel"><h3>原始上传图</h3><div className="preview">{currentImage ? <img src={currentImage} alt="原始上传" /> : <span className="muted">本次会话图片已失效，请重新上传。</span>}</div><p className="muted">比例：{generation.ratio}｜{generation.time}</p></div><div className="panel"><h3>生成结果</h3><div className="result" style={{ '--grad': generation.gradient }}>{currentImage && <img src={currentImage} alt="结果预览" />}<div className="caption"><b>{generation.scene}</b><span>{generation.unlocked ? 'HD No Watermark' : 'SceneShot AI 带水印预览'}</span></div>{!generation.unlocked && <span className="wm">SceneShot AI Preview</span>}</div><div className="actions"><button className="btn">下载带水印图</button><button className="btn primary" onClick={() => onUnlock(generation.id)}>{generation.unlocked ? '已解锁' : '¥2.99 解锁高清'}</button><button className="btn" onClick={() => onBuyPack(3, 5.99, '三张尝鲜包')}>¥5.99 解锁 3 张</button></div><p className="muted">剩余高清解锁次数：{unlocks}</p></div></div></div></section>;
}

function Account({ user, login, logout, unlocks, orders, generations, onBuyPack }) {
  if (!user) return <section className="section"><div className="shell"><div className="panel"><h2>登录 / 注册</h2><form className="form" onSubmit={(event) => { event.preventDefault(); login(event.currentTarget.name.value); }}><div className="field"><label>用户名</label><input className="input" name="name" required placeholder="例如 reese" /></div><div className="field"><label>密码</label><input className="input" type="password" required placeholder="任意密码" /></div><button className="btn primary">登录 / 注册</button></form></div></div></section>;
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">Account</span><h2>账户中心</h2><p>v0.7 仍是本地 Mock 账户，下一步可替换为真实数据库。</p></div><button className="btn danger" onClick={logout}>退出登录</button></div><div className="stats"><Stat value={user.name} label="当前用户" /><Stat value={unlocks} label="高清解锁次数" /><Stat value={generations.length} label="生成记录" /><Stat value={orders.length} label="订单记录" /></div><div className="panel gapTop"><h3>快速购买</h3><div className="actions"><button className="btn primary" onClick={() => onBuyPack(1, 2.99, '单张体验包')}>¥2.99 解锁 1 张</button><button className="btn" onClick={() => onBuyPack(3, 5.99, '三张尝鲜包')}>¥5.99 解锁 3 张</button></div></div><div className="panel gapTop"><h3>订单记录</h3>{orders.length ? <table className="table"><tbody>{orders.map((order) => <tr key={order.id}><td>{order.name}</td><td>{money(order.amount)}</td><td>{order.count}</td><td>{order.status}</td><td>{order.time}</td></tr>)}</tbody></table> : <p>暂无订单。</p>}</div></div></section>;
}

function History({ generations, setGenerations }) {
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">History</span><h2>生成记录</h2><p>只保存场景、时间和解锁状态，不保存用户图片。</p></div><button className="btn danger" onClick={() => setGenerations([])}>清空</button></div>{generations.length ? <div className="cards">{generations.map((item) => <article className="card" key={item.id}><a href={`#/result/${item.id}`}><div className="cover" style={{ '--grad': item.gradient }}><span className="wm">{item.unlocked ? 'HD' : 'Preview'}</span></div></a><h3>{item.scene}</h3><p>{item.time}</p><div className="price"><span>{item.unlocked ? '已解锁' : '带水印预览'}</span><b>{item.ratio}</b></div></article>)}</div> : <div className="panel"><p>还没有生成记录。</p><a className="btn primary" href="#/create/korean-baseball-broadcast">立即生成</a></div>}</div></section>;
}

function Admin({ scenes, unlocks, orders, generations }) {
  return <section className="section"><div className="shell"><div className="head"><div><span className="badge">Admin · v0.7</span><h2>AI 场景商品后台</h2><p>已进入 Next.js 后端化架构，Scene Catalog 由服务端模块输出。</p></div></div><div className="stats"><Stat value={scenes.length} label="场景" /><Stat value={generations.length} label="生成" /><Stat value={orders.length} label="订单" /><Stat value={unlocks} label="剩余解锁" /></div><div className="panel gapTop"><h3>API 验证</h3><p><a href="/api/health" target="_blank">/api/health</a> · <a href="/api/scenes" target="_blank">/api/scenes</a></p><p>下一步 v0.8：服务端上传存储、真实 Generation API、支付宝沙箱订单。</p></div></div></section>;
}

function Stat({ value, label }) {
  return <div className="stat"><b>{value}</b><span className="muted">{label}</span></div>;
}

function Toast() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const handler = (event) => {
      setMessage(event.detail);
      setTimeout(() => setMessage(''), 2200);
    };
    window.addEventListener('ss-toast', handler);
    return () => window.removeEventListener('ss-toast', handler);
  }, []);
  return message ? <div className="toast">{message}</div> : null;
}
