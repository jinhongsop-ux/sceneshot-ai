// In-memory data store for MVP
// Abstract DAL — swap to D1/SQLite later

class Store {
  constructor() {
    this.users = new Map();
    this.userEntitlements = new Map();
    this.authSessions = new Map();
    this.devices = new Map();
    this.signupRewards = new Map();
    this.scenes = new Map();
    this.uploads = new Map();
    this.generations = new Map();
    this.orders = new Map();
    this.transactions = new Map();
    this.pricingPackages = new Map();
  }

  generateId(prefix = '') {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 8);
    return prefix ? `${prefix}_${ts}${rand}` : `${ts}${rand}`;
  }

  // Users
  findUserByUsername(username) {
    for (const u of this.users.values()) {
      if (u.username === username) return u;
    }
    return null;
  }

  findUserByEmail(email) {
    for (const u of this.users.values()) {
      if (u.email === email) return u;
    }
    return null;
  }

  findUserById(id) {
    return this.users.get(id) || null;
  }

  // Sessions
  findSessionByTokenHash(tokenHash) {
    for (const s of this.authSessions.values()) {
      if (s.token_hash === tokenHash) return s;
    }
    return null;
  }

  // Entitlements
  getEntitlements(userId) {
    for (const e of this.userEntitlements.values()) {
      if (e.user_id === userId) return e;
    }
    return null;
  }

  // Devices
  findDevice(deviceId) {
    return this.devices.get(deviceId) || null;
  }

  // Scenes
  findSceneBySlug(slug) {
    for (const s of this.scenes.values()) {
      if (s.slug === slug) return s;
    }
    return null;
  }

  getActiveScenes() {
    return [...this.scenes.values()].filter(s => s.is_active);
  }

  // Generations
  getGenerationsByUser(userId) {
    return [...this.generations.values()]
      .filter(g => g.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // Orders
  getOrdersByUser(userId) {
    return [...this.orders.values()]
      .filter(o => o.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // Transactions
  getTransactionsByUser(userId) {
    return [...this.transactions.values()]
      .filter(t => t.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  // Pricing
  getActivePackages() {
    return [...this.pricingPackages.values()]
      .filter(p => p.is_active)
      .sort((a, b) => a.amount_cny - b.amount_cny);
  }

  // Signup rewards rate limiting
  countSignupRewardsToday(deviceId, ip) {
    const today = new Date().toISOString().split('T')[0];
    let deviceCount = 0;
    let ipCount = 0;
    for (const r of this.signupRewards.values()) {
      const rDay = r.created_at.split('T')[0];
      if (rDay === today) {
        if (r.anonymous_device_id === deviceId) deviceCount++;
        if (r.ip_address === ip) ipCount++;
      }
    }
    return { deviceCount, ipCount };
  }
}

// Singleton — persists across requests within the same Worker isolate
let store;
export function getStore() {
  if (!store) {
    store = new Store();
  }
  return store;
}
