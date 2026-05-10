# SceneShot AI

上传一张照片，生成你的爆款 AI 场景写真。

## 本地运行

```bash
# 安装依赖
npm install

# 启动本地开发服务器 (Cloudflare Pages Functions)
npm run dev
```

服务器会在 `http://localhost:8788` 启动，同时提供静态页面和 API。

## API 概览

所有 API 路径以 `/api/` 开头，由 Cloudflare Pages Functions 处理。

### 认证

| 方法 | 路径 | 说明 | 需要登录 |
|------|------|------|----------|
| POST | `/api/auth/register` | 用户名+密码注册 | 否 |
| POST | `/api/auth/login` | 用户名/邮箱+密码登录 | 否 |
| POST | `/api/auth/logout` | 退出登录 | 是 |
| GET | `/api/me` | 当前用户信息 | 是 |

### 场景

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/scenes` | 获取场景列表 |
| GET | `/api/scenes/:slug` | 获取场景详情 |

### 上传与生成

| 方法 | 路径 | 说明 | 需要登录 |
|------|------|------|----------|
| POST | `/api/uploads` | 上传图片 (base64) | 是 |
| POST | `/api/generations` | 创建生成任务 | 是 |
| GET | `/api/generations/:id` | 查询生成状态 | 是 |
| GET | `/api/generations` | 生成历史列表 | 是 |
| POST | `/api/generations/:id/unlock-hd` | 解锁高清无水印 | 是 |
| POST | `/api/generations/:id/regenerate` | 重新生成 | 是 |

### 权益与交易

| 方法 | 路径 | 说明 | 需要登录 |
|------|------|------|----------|
| GET | `/api/entitlements` | 用户权益余额 | 是 |
| GET | `/api/transactions` | 交易流水 | 是 |

### 套餐与订单

| 方法 | 路径 | 说明 | 需要登录 |
|------|------|------|----------|
| GET | `/api/pricing-packages` | 套餐列表 | 否 |
| POST | `/api/orders/mock-checkout` | 创建订单 | 是 |
| POST | `/api/orders/:id/mock-pay` | 模拟支付 | 是 |
| GET | `/api/orders` | 订单列表 | 是 |

### Dashboard

| 方法 | 路径 | 说明 | 需要登录 |
|------|------|------|----------|
| GET | `/api/dashboard` | 汇总数据 | 是 |

## 测试流程

### 注册/登录

1. 打开 `http://localhost:8788/create.html`
2. 上传一张照片，选择场景
3. 点击"开始生成" → 弹出注册弹窗
4. 输入用户名（≥2字符）+ 密码（≥6字符），邮箱可选
5. 点击"立即注册并生成"
6. 注册成功，获得 1 次免费试用

### 生成流程

1. 注册后自动继续生成
2. 等待 2 秒 mock 处理
3. 展示带水印的 mock 预览图
4. 可下载带水印图

### Mock 支付

1. 点击"解锁高清无水印" → 弹出购买套餐
2. 选择套餐（如 ¥1.99 单张体验包）
3. 点击"模拟支付成功"
4. 当前图片解锁高清无水印

### Dashboard

1. 打开 `http://localhost:8788/dashboard.html`
2. 查看：用户名、免费试用剩余、付费额度、最近作品、订单记录、交易流水

## 技术架构

- **前端**: 静态 HTML + Tailwind CDN + 共享 JS/CSS
- **后端**: Cloudflare Pages Functions (catch-all 路由)
- **数据层**: 内存 Map (MVP 阶段，重启丢失)
- **认证**: PBKDF2 密码哈希 + HMAC-SHA256 JWT (httpOnly cookie)
- **防刷**: device_id + IP 限制 (同设备每天 1 次，同 IP 每天 3 次)

## 后续升级

### 接真实 AI API

修改 `functions/api/_mockGen.js` 中的 `generateImageForScene()` 函数，替换为真实 AI 图像生成 API 调用（如 Stable Diffusion、Midjourney API 等）。

### 接真实支付

1. 在 `functions/api/[[path]].js` 中替换 mock-checkout 和 mock-pay 逻辑
2. 接入微信支付/支付宝/Stripe
3. 添加支付回调处理

### 接正式数据库

1. 将 `functions/api/_store.js` 中的内存 Map 替换为 D1/SQLite/PostgreSQL
2. 创建 migration 文件
3. 数据模型已在 `_store.js` 中定义

### 接 Cloudflare R2 (文件存储)

1. 修改 `POST /api/uploads` 中的 base64 存储为 R2 上传
2. 返回 R2 URL 而非 data URL

### 启用 Turnstile 验证码

1. 在 `wrangler.toml` 中设置 `ENABLE_TURNSTILE = "true"`
2. 配置 `TURNSTILE_SECRET_KEY` 和 `TURNSTILE_SITE_KEY`
3. 前端添加 Turnstile 组件

## 文件结构

```
├── index.html              # 首页
├── scenes.html             # 场景库
├── scene-detail.html       # 场景详情
├── create.html             # 创作页（核心）
├── pricing.html            # 定价页
├── dashboard.html          # 用户中心
├── credits.html            # 权益与交易
├── signin.html             # 登录页（备用）
├── faq.html                # 常见问题
├── admin.html              # 管理后台（静态）
├── css/shared.css          # 共享样式
├── js/shared.js            # 共享 JS（i18n + auth + UI）
├── functions/api/          # Cloudflare Pages Functions
│   ├── _store.js           # 内存数据层
│   ├── _seed.js            # 种子数据
│   ├── _auth.js            # 认证工具
│   ├── _middleware.js       # CORS/JSON helpers
│   ├── _mockGen.js         # Mock 生成服务
│   └── [[path]].js         # Catch-all API 路由
├── package.json
├── wrangler.toml
└── README.md
```
