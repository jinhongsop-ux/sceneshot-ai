import { getStore } from './_store.js';
import { seedData } from './_seed.js';
import { hashPassword, verifyPassword, createJWT, getSessionFromRequest, getClientIP, generateTokenHash } from './_auth.js';
import { jsonResponse, errorResponse, handleOptions } from './_middleware.js';
import { generateImageForScene } from './_mockGen.js';

export async function onRequest(context) {
  const { request, env, params } = context;
  const store = getStore();
  seedData();

  const optionsResp = handleOptions(request);
  if (optionsResp) return optionsResp;

  const rawPath = Array.isArray(params.path) ? params.path.join('/') : (params.path || '');
  const path = '/api' + (rawPath.startsWith('/') ? rawPath : '/' + rawPath);
  const method = request.method;
  const deviceId = request.headers.get('X-Device-Id') || '';
  const ip = getClientIP(request);

  // Public routes (no auth required)
  if (path === '/api/auth/register' && method === 'POST') return handleRegister(request, env, store, deviceId, ip);
  if (path === '/api/auth/login' && method === 'POST') return handleLogin(request, env, store, deviceId);
  if (path === '/api/scenes' && method === 'GET') return handleGetScenes(store);
  if (path.startsWith('/api/scenes/') && method === 'GET') return handleGetScene(store, path.split('/')[3]);
  if (path === '/api/pricing-packages' && method === 'GET') return handleGetPackages(store);

  // Authenticated routes
  const auth = await getSessionFromRequest(request, env, store);

  if (path === '/api/auth/logout' && method === 'POST') return handleLogout(store, request, env);
  if (path === '/api/me' && method === 'GET') return handleGetMe(auth, store);
  if (path === '/api/uploads' && method === 'POST') return handleUpload(request, auth, store);
  if (path === '/api/generations' && method === 'POST') return handleCreateGeneration(request, auth, store, env, context);
  if (path === '/api/generations' && method === 'GET') return handleGetGenerations(auth, store);
  if (path.match(/^\/api\/generations\/[^/]+$/) && method === 'GET') return handleGetGeneration(auth, store, path.split('/')[3]);
  if (path.match(/^\/api\/generations\/[^/]+\/unlock-hd$/) && method === 'POST') return handleUnlockHd(auth, store, path.split('/')[3]);
  if (path.match(/^\/api\/generations\/[^/]+\/regenerate$/) && method === 'POST') return handleRegenerate(request, auth, store, env, context, path.split('/')[3]);
  if (path === '/api/entitlements' && method === 'GET') return handleGetEntitlements(auth, store);
  if (path === '/api/transactions' && method === 'GET') return handleGetTransactions(auth, store);
  if (path === '/api/orders' && method === 'GET') return handleGetOrders(auth, store);
  if (path === '/api/orders/mock-checkout' && method === 'POST') return handleMockCheckout(request, auth, store);
  if (path.match(/^\/api\/orders\/[^/]+\/mock-pay$/) && method === 'POST') return handleMockPay(auth, store, path.split('/')[3]);
  if (path === '/api/dashboard' && method === 'GET') return handleDashboard(auth, store);

  return errorResponse('Not found', 404);
}

// === AUTH ===

async function handleRegister(request, env, store, deviceId, ip) {
  const { username, password, email, turnstileToken } = await request.json();

  if (!username || username.length < 2) return errorResponse('用户名至少 2 个字符');
  if (!password || password.length < 6) return errorResponse('密码至少 6 个字符');
  if (store.findUserByUsername(username)) return errorResponse('用户名已被注册');

  // Turnstile check placeholder
  if (env.ENABLE_TURNSTILE === 'true' && env.TURNSTILE_SECRET_KEY) {
    // TODO: verify turnstileToken against Cloudflare API
  }

  const userId = store.generateId('user');
  const passwordHash = await hashPassword(password);
  const now = new Date().toISOString();

  store.users.set(userId, {
    id: userId, username, email: email || null, password_hash: passwordHash,
    email_verified: false, created_at: now, updated_at: now, last_login_at: now,
  });

  store.userEntitlements.set(store.generateId('ent'), {
    id: store.generateId('ent'), user_id: userId,
    free_trials_remaining: 1, paid_unlocks_remaining: 0, credits_balance: 0,
    created_at: now, updated_at: now,
  });

  // Rate limit free trial
  const { deviceCount, ipCount } = store.countSignupRewardsToday(deviceId, ip);
  let rewardAmount = 0;
  let rewardMsg = '';

  if (deviceCount >= 1) {
    rewardMsg = '当前设备今日免费试用次数已达上限，可购买单张体验包继续生成。';
  } else if (ipCount >= 3) {
    rewardMsg = '当前网络今日免费试用次数已达上限，可购买单张体验包继续生成。';
  } else {
    rewardAmount = 1;
    const rewardId = store.generateId('rew');
    store.signupRewards.set(rewardId, {
      id: rewardId, user_id: userId, anonymous_device_id: deviceId,
      ip_address: ip, reward_type: 'free_trial', amount: 1, created_at: now,
    });
    store.transactions.set(store.generateId('tx'), {
      id: store.generateId('tx'), user_id: userId, type: 'signup_reward',
      amount: 1, resource: 'free_trial', related_order_id: null,
      related_generation_id: null, description: '新用户注册奖励 1 次免费试用', created_at: now,
    });
  }

  // Create session
  const sessionToken = crypto.randomUUID();
  const session = {
    id: store.generateId('sess'), user_id: userId,
    token_hash: generateTokenHash(sessionToken),
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: now, user_agent: request.headers.get('User-Agent') || '', ip_address: ip,
  };
  store.authSessions.set(session.id, session);

  // Track device
  if (deviceId) {
    if (!store.findDevice(deviceId)) {
      store.devices.set(deviceId, {
        id: deviceId, anonymous_device_id: deviceId, first_ip: ip, last_ip: ip,
        user_agent: request.headers.get('User-Agent') || '', created_at: now, last_seen_at: now,
      });
    }
  }

  const resp = jsonResponse({
    user: { id: userId, username, email: email || null },
    entitlements: store.getEntitlements(userId),
    rewardMessage: rewardMsg,
  });
  resp.headers.set('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 3600}`);
  return resp;
}

async function handleLogin(request, env, store, deviceId) {
  const { login, password } = await request.json();
  if (!login || !password) return errorResponse('请输入用户名和密码');

  const user = store.findUserByUsername(login) || store.findUserByEmail(login);
  if (!user) return errorResponse('用户名或密码错误', 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return errorResponse('用户名或密码错误', 401);

  user.last_login_at = new Date().toISOString();
  const now = new Date().toISOString();
  const ip = getClientIP(request);

  const sessionToken = crypto.randomUUID();
  const session = {
    id: store.generateId('sess'), user_id: user.id,
    token_hash: generateTokenHash(sessionToken),
    expires_at: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    created_at: now, user_agent: request.headers.get('User-Agent') || '', ip_address: ip,
  };
  store.authSessions.set(session.id, session);

  const resp = jsonResponse({
    user: { id: user.id, username: user.username, email: user.email },
    entitlements: store.getEntitlements(user.id),
  });
  resp.headers.set('Set-Cookie', `session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 3600}`);
  return resp;
}

function handleLogout(store, request, env) {
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/session=([^;]+)/);
  if (match) {
    // Find and delete session
    for (const [id, s] of store.authSessions) {
      if (generateTokenHash(match[1]) === s.token_hash) {
        store.authSessions.delete(id);
        break;
      }
    }
  }
  const resp = jsonResponse({ ok: true });
  resp.headers.set('Set-Cookie', 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0');
  return resp;
}

function handleGetMe(auth, store) {
  if (!auth) return errorResponse('未登录', 401);
  const entitlements = store.getEntitlements(auth.user.id);
  return jsonResponse({
    user: { id: auth.user.id, username: auth.user.username, email: auth.user.email },
    entitlements,
  });
}

// === SCENES ===

function handleGetScenes(store) {
  const scenes = store.getActiveScenes().map(s => ({
    id: s.id, slug: s.slug, name: s.name, name_zh: s.name_zh,
    category: s.category, description: s.description, description_zh: s.description_zh,
    preview_image_url: s.preview_image_url, base_cost: s.base_cost,
    hd_unlock_cost: s.hd_unlock_cost, is_featured: s.is_featured,
  }));
  return jsonResponse({ scenes });
}

function handleGetScene(store, slug) {
  const scene = store.findSceneBySlug(slug);
  if (!scene) return errorResponse('场景不存在', 404);
  return jsonResponse({
    id: scene.id, slug: scene.slug, name: scene.name, name_zh: scene.name_zh,
    category: scene.category, description: scene.description, description_zh: scene.description_zh,
    preview_image_url: scene.preview_image_url, base_cost: scene.base_cost,
    hd_unlock_cost: scene.hd_unlock_cost, is_featured: scene.is_featured,
  });
}

// === UPLOADS ===

async function handleUpload(request, auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  const { filename, mime_type, size_bytes, data_url, width, height } = await request.json();

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(mime_type)) return errorResponse('仅支持 JPG/PNG/WebP 格式');
  if (size_bytes > 10 * 1024 * 1024) return errorResponse('文件大小不能超过 10MB');

  const id = store.generateId('up');
  const upload = {
    id, user_id: auth.user.id, original_filename: filename,
    mime_type, size_bytes, width: width || 0, height: height || 0,
    storage_url: data_url || '', storage_key: `uploads/${id}`,
    created_at: new Date().toISOString(),
  };
  store.uploads.set(id, upload);
  return jsonResponse({ upload: { id, filename, mime_type, size_bytes } });
}

// === GENERATIONS ===

async function handleCreateGeneration(request, auth, store, env, context) {
  if (!auth) return errorResponse('请先登录', 401);

  const { upload_id, scene_slug, aspect_ratio, quality } = await request.json();
  const scene = store.findSceneBySlug(scene_slug);
  if (!scene) return errorResponse('场景不存在', 404);

  const entitlements = store.getEntitlements(auth.user.id);
  if (!entitlements) return errorResponse('用户权益异常', 500);

  // Determine cost type
  let costType = null;
  if (entitlements.free_trials_remaining > 0) {
    costType = 'free_trial';
  } else if (entitlements.paid_unlocks_remaining > 0) {
    costType = 'paid_unlock';
  } else if (entitlements.credits_balance > 0) {
    costType = 'credits';
  }

  if (!costType) return errorResponse('没有可用额度，请先购买套餐或使用免费试用', 402);

  const id = store.generateId('gen');
  const now = new Date().toISOString();

  const generation = {
    id, user_id: auth.user.id, upload_id: upload_id || null,
    scene_id: scene.id, status: 'pending',
    generation_type: costType === 'free_trial' ? 'free_preview' : 'paid_generation',
    aspect_ratio: aspect_ratio || '1:1', quality: quality || 'standard',
    watermarked_url: '', hd_url: '', is_unlocked: false,
    cost_type: costType, cost_amount: 1,
    error_message: null, created_at: now, completed_at: null,
  };
  store.generations.set(id, generation);

  // Deduct
  if (costType === 'free_trial') entitlements.free_trials_remaining--;
  else if (costType === 'paid_unlock') entitlements.paid_unlocks_remaining--;
  else if (costType === 'credits') entitlements.credits_balance--;
  entitlements.updated_at = now;

  // Log transaction
  store.transactions.set(store.generateId('tx'), {
    id: store.generateId('tx'), user_id: auth.user.id,
    type: costType === 'free_trial' ? 'use_free_trial' : 'use_paid_unlock',
    amount: -1, resource: costType,
    related_order_id: null, related_generation_id: id,
    description: `生成消耗 1 ${costType === 'free_trial' ? '免费试用' : '付费额度'}`,
    created_at: now,
  });

  // Simulate async generation with ctx.waitUntil
  context.waitUntil(simulateGeneration(store, id, scene.slug));

  return jsonResponse({ generation: { ...generation, status: 'processing' } }, 202);
}

async function simulateGeneration(store, genId, sceneSlug) {
  await new Promise(r => setTimeout(r, 2000)); // 2s delay
  const gen = store.generations.get(genId);
  if (!gen) return;

  const { watermarked_url, hd_url } = generateImageForScene(sceneSlug);
  gen.watermarked_url = watermarked_url;
  gen.hd_url = hd_url;
  gen.status = 'succeeded';
  gen.completed_at = new Date().toISOString();
}

function handleGetGeneration(auth, store, genId) {
  if (!auth) return errorResponse('请先登录', 401);
  const gen = store.generations.get(genId);
  if (!gen || gen.user_id !== auth.user.id) return errorResponse('生成记录不存在', 404);

  // Don't expose hd_url unless unlocked
  const data = { ...gen };
  if (!gen.is_unlocked) data.hd_url = '';
  return jsonResponse({ generation: data });
}

function handleGetGenerations(auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  const gens = store.getGenerationsByUser(auth.user.id).map(g => ({
    ...g, hd_url: g.is_unlocked ? g.hd_url : '',
  }));
  return jsonResponse({ generations: gens });
}

async function handleUnlockHd(auth, store, genId) {
  if (!auth) return errorResponse('请先登录', 401);
  const gen = store.generations.get(genId);
  if (!gen || gen.user_id !== auth.user.id) return errorResponse('生成记录不存在', 404);
  if (gen.is_unlocked) return errorResponse('已经解锁过了');

  const ent = store.getEntitlements(auth.user.id);
  if (!ent) return errorResponse('用户权益异常', 500);

  if (ent.paid_unlocks_remaining <= 0 && ent.credits_balance <= 0) {
    return errorResponse('没有可用额度，请先购买套餐', 402);
  }

  // Deduct
  if (ent.paid_unlocks_remaining > 0) {
    ent.paid_unlocks_remaining--;
  } else {
    ent.credits_balance--;
  }
  ent.updated_at = new Date().toISOString();

  gen.is_unlocked = true;
  gen.generation_type = 'hd_unlock';

  const now = new Date().toISOString();
  store.transactions.set(store.generateId('tx'), {
    id: store.generateId('tx'), user_id: auth.user.id,
    type: 'use_paid_unlock', amount: -1, resource: 'paid_unlock',
    related_order_id: null, related_generation_id: genId,
    description: '解锁高清无水印', created_at: now,
  });

  return jsonResponse({ generation: gen, entitlements: ent });
}

async function handleRegenerate(request, auth, store, env, context, genId) {
  // Reuse create generation logic
  return handleCreateGeneration(request, auth, store, env, context);
}

// === ENTITLEMENTS & TRANSACTIONS ===

function handleGetEntitlements(auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  return jsonResponse({ entitlements: store.getEntitlements(auth.user.id) });
}

function handleGetTransactions(auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  return jsonResponse({ transactions: store.getTransactionsByUser(auth.user.id) });
}

// === PRICING ===

function handleGetPackages(store) {
  return jsonResponse({ packages: store.getActivePackages() });
}

// === ORDERS ===

async function handleMockCheckout(request, auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  const { package_id } = await request.json();

  const pkg = store.pricingPackages.get(package_id);
  if (!pkg) return errorResponse('套餐不存在', 404);

  const id = store.generateId('ord');
  const order = {
    id, user_id: auth.user.id, package_id: pkg.id,
    package_name: pkg.name, amount_cny: pkg.amount_cny,
    status: 'pending', provider: 'mock',
    created_at: new Date().toISOString(), paid_at: null,
  };
  store.orders.set(id, order);
  return jsonResponse({ order });
}

async function handleMockPay(auth, store, orderId) {
  if (!auth) return errorResponse('请先登录', 401);
  const order = store.orders.get(orderId);
  if (!order || order.user_id !== auth.user.id) return errorResponse('订单不存在', 404);
  if (order.status === 'paid') return errorResponse('订单已支付');

  const now = new Date().toISOString();
  order.status = 'paid';
  order.paid_at = now;

  // Grant entitlements
  const pkg = store.pricingPackages.get(order.package_id);
  if (pkg) {
    const ent = store.getEntitlements(auth.user.id);
    if (ent) {
      ent.paid_unlocks_remaining += pkg.unlock_count;
      ent.updated_at = now;
    }
  }

  // Log transaction
  store.transactions.set(store.generateId('tx'), {
    id: store.generateId('tx'), user_id: auth.user.id,
    type: 'purchase', amount: pkg ? pkg.unlock_count : 0,
    resource: 'paid_unlock', related_order_id: orderId,
    related_generation_id: null,
    description: `购买 ${pkg?.name || '套餐'}，获得 ${pkg?.unlock_count || 0} 次解锁`,
    created_at: now,
  });

  return jsonResponse({
    order, entitlements: store.getEntitlements(auth.user.id),
  });
}

function handleGetOrders(auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  return jsonResponse({ orders: store.getOrdersByUser(auth.user.id) });
}

// === DASHBOARD ===

function handleDashboard(auth, store) {
  if (!auth) return errorResponse('请先登录', 401);
  const ent = store.getEntitlements(auth.user.id);
  const gens = store.getGenerationsByUser(auth.user.id).slice(0, 10).map(g => ({
    ...g, hd_url: g.is_unlocked ? g.hd_url : '',
  }));
  const orders = store.getOrdersByUser(auth.user.id).slice(0, 10);
  const txns = store.getTransactionsByUser(auth.user.id).slice(0, 20);

  return jsonResponse({
    user: { id: auth.user.id, username: auth.user.username, email: auth.user.email },
    entitlements: ent,
    recentGenerations: gens,
    recentOrders: orders,
    recentTransactions: txns,
  });
}
