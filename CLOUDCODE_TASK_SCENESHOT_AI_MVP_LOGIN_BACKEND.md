你现在接手一个名为 SceneShot AI 的 Web 产品项目。

请先完整阅读当前仓库代码，理解现有前端页面、路由结构、组件结构、样式系统、构建方式和部署方式。不要急着重写项目，不要破坏现有 UI。你的任务是在现有 demo 基础上，按照下面的最新产品逻辑，把它改造成一个可以跑通 MVP 闭环的前后端 demo。

当前线上 demo 参考：
https://69ea9109.sceneshot-ai.pages.dev/

你需要基于现有 demo 继续完善，而不是另起炉灶。

==================================================
一、产品背景
==================================================

SceneShot AI 是一个面向普通用户的 AI 场景写真生成 Web 产品。

核心玩法：

用户上传一张自己的照片，选择一个热门场景模板，例如“韩国棒球直播镜头风格”，系统通过后端内置提示词和 AI 图像生成 API，把用户照片生成一张具有强烈社交传播感的 AI 场景图。

第一阶段 MVP 不做复杂平台，也不做 App，也不做真实视频功能。

第一阶段重点是验证：

1. 用户是否愿意上传照片。
2. 用户是否愿意注册账号。
3. 用户是否愿意为了高清无水印结果付费。
4. “韩国棒球直播风格 AI 照片”这个爆款场景是否有转化力。
5. 整个流程是否可以从“看到案例 → 上传 → 注册 → 免费试用 → 付费解锁”跑通。

产品一句话定位：

“上传一张照片，生成你的爆款 AI 场景写真。”

更偏用户语言的表达：

“上传一张自拍，秒变韩国棒球赛直播镜头里的你。”

==================================================
二、最新产品策略
==================================================

我们已经决定：

第一阶段不做手机号验证码登录。
第一阶段不做微信登录。
第一阶段不做游客直接免费生成真实 AI 图。
第一阶段不做复杂会员体系。
第一阶段不接真实支付也可以，先做 mock 支付闭环。
第一阶段不接真实 AI API 也可以，先做 mock 生成闭环。

原因：

手机号登录需要短信签名、模板审核、主体资质、短信套餐、防刷成本，不适合快速 MVP。
微信登录也可能涉及开放平台和审核，不适合第一版。
游客直接免费生成真实 AI 图容易被刷 API 成本。
因此第一版采用低摩擦账号体系 + 免费试用限制 + 水印图转付费解锁。

最新核心策略如下：

游客状态：
- 可以浏览首页
- 可以浏览场景库
- 可以查看场景详情页
- 可以上传照片
- 可以选择场景
- 可以配置比例/质量等选项
- 但是点击“生成”时必须注册/登录

注册方式：
- 主路径：用户名 + 密码快速注册
- 邮箱可选
- 邮箱不是必填
- 邮箱用于找回账号、保护积分、保护作品
- 不做手机号
- 不做微信登录
- 不做 Google 登录，除非项目原本已经有并且成本很低

免费权益：
- 注册成功后，不要直接大额送积分
- 注册成功后获得“1 次免费试用”
- 免费试用只能生成 1 张“低清 + 带水印”的预览图
- 免费试用本质上后端可以用 credits 或 trial_token 实现，但前端展示请用用户更容易理解的“1 次免费试用”
- 免费图可以下载带水印版本
- 高清、无水印、再次生成，都需要付费或购买套餐

防刷策略：
- 注册 / 登录 / 领取免费试用 / 生成前，预留 Cloudflare Turnstile 验证能力
- MVP 可以先做 mock Turnstile 或可配置开关，但代码结构要预留
- 同一 IP / 同一设备 / 同一浏览器每天只能领取有限次数的新用户免费试用
- 设备识别只能作为弱风控，不要把它当强身份
- 至少用 cookie + localStorage + server-side request IP 记录做基础限制
- 不要允许游客无限免费生成
- 不要允许同一设备反复注册无限领取免费试用

付费策略：
- 必须有小额套餐
- 不要一上来只有 9.9 元
- 需要支持“单张图解锁”的低门槛入口

推荐套餐：

1. 单张体验包
   价格：1.99 元或 2.99 元
   内容：解锁 1 张高清无水印图
   适合：只想拿一张图发社交平台的人

2. 三张尝鲜包
   价格：5.99 元
   内容：3 张高清无水印图
   适合：想多试几个场景的人

3. 标准包
   价格：9.9 元
   内容：8-10 次生成或高清解锁
   适合：普通高频用户

4. 创作者包
   价格：19.9 元
   内容：20-25 次生成或高清解锁
   适合：小红书/抖音创作者

MVP 阶段可以先做 mock 支付：
- 用户点击购买
- 弹出确认支付模拟框
- 点击“模拟支付成功”
- 后端创建订单记录
- 后端给用户增加 credits 或 unlock quota
- 写入交易流水
后续再接微信支付/支付宝/Stripe。

==================================================
三、核心用户流程
==================================================

请把产品流程调整成下面这种：

1. 用户进入首页
2. 看到爆款案例和 before/after 效果
3. 点击“立即生成”或“上传照片”
4. 进入创作页
5. 游客可以上传照片
6. 游客可以选择场景
7. 游客可以选择比例，例如 1:1、4:3、3:4、16:9
8. 游客点击“开始生成”
9. 如果未登录，弹出快速注册/登录弹窗
10. 用户用“用户名 + 密码”注册
11. 注册成功后，获得 1 次免费试用
12. 系统继续刚才的生成流程，不要让用户重新上传
13. 后端创建生成任务
14. 消耗 1 次免费试用
15. 返回 mock 生成图
16. 结果图展示为低清 + 水印版本
17. 结果页提供几个按钮：
    - 下载带水印图
    - 1.99 元解锁高清无水印
    - 5.99 元解锁 3 张
    - 再生成一张
    - 换个场景
18. 如果用户点击解锁高清无水印：
    - 如果有可用付费额度，直接解锁
    - 如果没有，弹出套餐购买
19. mock 支付成功后：
    - 增加用户可用额度
    - 解锁当前图片高清无水印
    - 记录订单和交易流水
20. 用户可在 Dashboard 里看到：
    - 当前免费试用剩余次数
    - 当前付费 credits / unlock quota
    - 历史生成作品
    - 订单记录
    - 账号设置
    - 绑定邮箱入口

==================================================
四、页面和 UI 调整要求
==================================================

请基于现有 demo 调整，不要做成传统后台系统，不要太像企业 SaaS。

目标风格：
- 面向普通消费者
- 偏女性用户
- 轻量、好玩、社交传播感强
- 重点展示效果图
- 强调“上传一张照片就能生成”
- 不要让账号体系显得很重
- 不要让用户一进来就看到传统注册页

重要 UI 原则：

1. 注册/登录不要作为入口第一屏
首页不要直接强制注册。
用户点击生成时，再弹出注册/登录弹窗。

2. 注册页不要大而空
如果项目当前有独立注册页，可以保留，但主流程应该使用 modal 弹窗。
独立注册页可以作为备用路径。

3. 注册弹窗文案要转化导向
不要只写“注册”。
请写成：

标题：
登录后生成你的 AI 场景照片

副标题：
注册即可获得 1 次免费试用，生成带水印预览图。

输入框：
- 用户名
- 密码
- 邮箱，可选

主按钮：
立即注册并生成

切换链接：
已有账号？登录

辅助文案：
绑定邮箱后可找回账号，并保护你的积分和作品。

邀请码：
不要直接展示邀请码输入框。
如果保留邀请码功能，请折叠为：
“有邀请码？”
用户点击后再展开。

错误提示：
不要页面一加载就显示“用户名不能为空”“密码不能为空”。
只在用户提交后，或输入框 blur 后显示。

4. 登录弹窗
标题：
登录后继续生成

输入框：
- 用户名或邮箱
- 密码

按钮：
登录并继续

辅助链接：
还没有账号？立即注册

5. 结果页
结果页是转化最关键的页面，请重点优化。
要有：
- 生成结果图
- 原图 vs 生成图对比
- 清晰提示：当前为免费带水印预览
- CTA：1.99 元解锁高清无水印
- CTA：5.99 元解锁 3 张
- CTA：下载带水印图
- CTA：再试一次
- CTA：换个场景
- 文案强调：
  “满意效果后再解锁高清无水印”

6. 价格页
请新增或调整 Pricing / Credits 页面。
不要只讲 credits，要用用户听得懂的“张数/解锁次数”。

套餐卡片建议：

单张体验包
¥1.99
解锁 1 张高清无水印
适合只想试一张

三张尝鲜包
¥5.99
解锁 3 张高清无水印
适合多试几个场景
标记：推荐

标准包
¥9.9
8 次高清解锁 / 或 10 次标准生成
适合日常使用

创作者包
¥19.9
20+ 次高清解锁
适合小红书/抖音内容创作者

请在 UI 中弱化复杂 credits 概念，强化：
- 免费试用 1 次
- 高清无水印解锁
- 单张购买
- 多张更划算

7. Dashboard
需要有用户中心页面，至少展示：
- 用户名
- 邮箱绑定状态
- 免费试用剩余次数
- 付费额度/credits 余额
- 最近生成作品
- 订单记录
- 退出登录
- 绑定邮箱入口

8. 账号设置页
至少有：
- 用户名
- 邮箱，可绑定/修改
- 修改密码
- 删除作品
- 退出登录
- 隐私提示

隐私提示文案：
请仅上传你本人或已获得授权的照片。生成结果为 AI 内容，不代表真实现场或真实直播画面。

==================================================
五、后端 MVP 要求
==================================================

请根据当前项目技术栈选择最合适的轻量后端实现方式。

如果当前项目适合 Cloudflare Pages Functions，请优先使用：
- Cloudflare Pages Functions / Workers style API
- 本地开发可运行
- 部署到 Cloudflare Pages 时可继续使用

如果当前项目是 Next.js，也可以使用 Next.js API Routes / Route Handlers。

如果当前项目只是静态前端，请添加适配的 API 层，至少让本地和部署都有清晰运行方式。

第一阶段可以使用轻量数据库方案：
- 如果项目已有数据库，就沿用
- 如果没有，优先设计可迁移的数据层
- 本地开发可以用 SQLite / JSON mock store / memory store，但代码结构要方便以后换成正式 DB
- 如果是 Cloudflare 架构，可以准备 D1 schema/migrations，但不要强依赖我现在已经配置好 D1
- 代码中要把 data access layer 抽象出来，不要把业务逻辑散落在前端 localStorage

后端必须承担以下责任：

1. 用户注册/登录
- 支持用户名 + 密码注册
- 邮箱可选
- 密码必须 hash 存储
- 不要明文保存密码
- 登录后创建 session 或 JWT
- 前端不能伪造登录态
- 支持退出登录

2. 新用户免费试用
- 新用户注册后获得 1 次免费试用
- 不是无限积分
- 试用只能生成低清水印图
- 领取免费试用要有基础风控
- 同一 device_id / IP 不要无限领取
- 设备标识可通过 cookie/localStorage 生成 anonymous_device_id 并传给后端
- 后端记录 device_id、IP、User-Agent

3. 生成任务
- 未登录不能真正创建 generation
- 用户点击生成时，后端判断：
  a. 用户是否有免费试用次数
  b. 用户是否有付费额度/credits
  c. 当前生成类型是 free_preview 还是 paid_hd
- 免费试用生成：
  - 消耗 1 次 trial
  - 返回低清水印 mock 图
- 付费生成/解锁：
  - 消耗对应付费额度
  - 返回高清无水印 mock 图
- 生成失败时要退回免费试用或 credits
- 生成状态包括：
  pending
  processing
  succeeded
  failed

4. 场景系统
- 场景列表必须从后端返回
- 前端不要硬编码全部场景数据
- prompt_template 只能存后端
- API 返回场景时，不要把 prompt_template 返回给前端
- 第一阶段重点场景：
  Korean Baseball Broadcast
  slug: korean-baseball-broadcast
  中文名：韩国棒球直播风格
  描述：把自拍变成仿佛被体育直播镜头捕捉到的韩国棒球赛现场照片
- 其他场景可以继续保留为 mock scenes，但都要通过 API 返回

5. 上传系统
- MVP 阶段可以先用 base64/local object/mock URL
- 但代码结构要预留正式对象存储
- 上传图片需要记录：
  user_id
  file name
  mime type
  size
  width/height 如果容易获取
  storage key / URL
  created_at
- 限制文件类型：
  jpg
  jpeg
  png
  webp
- 限制大小，例如 10MB
- 前端要提示照片要求：
  清晰人像
  面部可见
  不要重度滤镜
  不要多人合照
  不要上传没有授权的照片

6. 水印逻辑
- 免费生成结果必须带水印
- MVP 可以用固定 mock 水印图，也可以前端叠加水印
- 但业务状态上要区分：
  watermarked_url
  hd_url
  is_unlocked
- 用户未解锁前只能看到/下载 watermarked_url
- 用户解锁后才能看到/下载 hd_url

7. Mock 支付/订单
- 第一阶段不接真实支付
- 但要把订单逻辑做出来
- 支持用户购买套餐
- 点击购买后走 mock checkout
- mock 支付成功后：
  - 创建 order
  - 增加用户 paid_credits 或 unlock_quota
  - 写入 credit/order transaction
- 所有变化要可在 dashboard 中看到

8. 交易流水
必须记录所有关键资源变化：
- 新用户获得 1 次免费试用
- 使用免费试用
- 购买套餐
- 消耗付费额度
- 退款/失败退回
- 解锁高清无水印

==================================================
六、建议数据库 / 数据模型
==================================================

请根据项目实际技术栈实现，但数据结构至少要覆盖下面这些概念。

users:
- id
- username
- email nullable
- password_hash
- email_verified boolean
- created_at
- updated_at
- last_login_at

user_entitlements:
- user_id
- free_trials_remaining
- paid_unlocks_remaining
- credits_balance optional
- created_at
- updated_at

auth_sessions:
- id
- user_id
- token_hash
- expires_at
- created_at
- user_agent
- ip_address

devices:
- id
- anonymous_device_id
- first_ip
- last_ip
- user_agent
- created_at
- last_seen_at

signup_rewards:
- id
- user_id
- anonymous_device_id
- ip_address
- reward_type
- amount
- created_at

scenes:
- id
- slug
- name
- name_zh
- category
- description
- description_zh
- preview_image_url
- base_cost
- hd_unlock_cost
- is_active
- is_featured
- prompt_template server only
- created_at
- updated_at

uploads:
- id
- user_id nullable until login if needed
- original_filename
- mime_type
- size_bytes
- width
- height
- storage_url
- storage_key
- created_at

generations:
- id
- user_id
- upload_id
- scene_id
- status
- generation_type: free_preview / paid_generation / hd_unlock
- aspect_ratio
- quality
- watermarked_url
- hd_url
- is_unlocked
- cost_type: free_trial / paid_unlock / credits
- cost_amount
- error_message
- created_at
- completed_at

orders:
- id
- user_id
- package_id
- package_name
- amount_cny
- status: pending / paid / failed / refunded
- provider: mock
- created_at
- paid_at

transactions:
- id
- user_id
- type
- amount
- resource
- related_order_id
- related_generation_id
- description
- created_at

pricing_packages:
- id
- slug
- name
- amount_cny
- unlock_count
- description
- is_featured
- is_active

==================================================
七、API 设计要求
==================================================

请根据项目实际技术栈实现 API。接口命名可以调整，但语义要清晰。

Auth:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/me

Register request:
{
  "username": "string",
  "password": "string",
  "email": "string optional",
  "deviceId": "string",
  "turnstileToken": "string optional"
}

Login request:
{
  "login": "username or email",
  "password": "string",
  "deviceId": "string"
}

Scenes:
GET /api/scenes
GET /api/scenes/:slug

Uploads:
POST /api/uploads

Generations:
POST /api/generations
GET /api/generations/:id
GET /api/generations
POST /api/generations/:id/unlock-hd
POST /api/generations/:id/regenerate

Entitlements:
GET /api/entitlements
GET /api/transactions

Pricing:
GET /api/pricing-packages

Orders:
POST /api/orders/mock-checkout
POST /api/orders/:id/mock-pay
GET /api/orders

Dashboard:
GET /api/dashboard

==================================================
八、前端状态和交互要求
==================================================

请让前端不再只是静态 demo，而是尽量接入这些 API 或 mock API。

关键点：

1. 全局 auth state
- 当前用户
- 是否登录
- 免费试用剩余
- 付费解锁余额
- 登录弹窗打开状态

2. 生成流程中断恢复
用户上传照片和选择场景后，如果点击生成时未登录：
- 弹出注册/登录
- 注册/登录成功后，继续刚才的生成
- 不要让用户重新上传、重新选场景

3. 结果状态
根据 generation 返回的数据展示：
- 免费水印预览
- 是否已解锁高清
- 是否可下载高清
- 是否需要购买

4. 购买弹窗
用户点击“解锁高清无水印”但余额不足时：
- 弹出套餐选择
- 默认突出单张体验包和三张尝鲜包
- 支持 mock 支付
- 支付成功后立即解锁当前结果

5. Dashboard
Dashboard 不要只是静态卡片，要读取 API 或 mock data：
- 用户信息
- 权益
- 最近生成
- 订单
- 交易流水

==================================================
九、防刷与成本保护
==================================================

请至少实现基础层面的防刷逻辑，即便是 mock 也要有结构。

必须包括：

1. device_id
前端首次访问时生成 anonymous_device_id，存入 localStorage 和 cookie。
后续请求注册、生成、领取奖励时带给后端。

2. IP 记录
后端读取 request IP。
在 Cloudflare 环境中可尝试读取 CF-Connecting-IP。
本地开发没有则 fallback。

3. 新用户奖励限制
同一个 device_id 每天最多允许领取 1 次新用户免费试用。
同一个 IP 每天最多允许领取有限次数，例如 3 次。
超过后仍可注册，但不再发放免费试用，并给出友好提示：
“当前设备今日免费试用次数已达上限，可购买单张体验包继续生成。”

4. Turnstile 预留
添加 Turnstile 配置位：
TURNSTILE_SECRET_KEY
TURNSTILE_SITE_KEY
ENABLE_TURNSTILE
如果 ENABLE_TURNSTILE=false，则本地开发跳过。
如果 true，则注册/生成前校验。
前端也要预留组件位置。

5. 不要让前端决定权益
免费试用次数、付费解锁次数、是否可生成、是否可解锁，必须以后端返回为准。

==================================================
十、Mock 生成图和水印图
==================================================

第一阶段不接真实 AI API。

请实现 mock generation：

- 用户提交生成后，创建 generation
- 状态从 pending → processing → succeeded
- 可以用 setTimeout 或模拟异步
- 返回固定 mock result image
- 根据 scene 不同返回不同 mock 图片
- 免费试用返回 watermarked_url
- 解锁后返回 hd_url

如果当前项目里没有 mock 图片，请使用现有 assets 或新增 placeholder 图片。
图片可以是渐变占位图，但 UI 上要清晰标记：
“Mock result for MVP”

注意：
业务逻辑要为后续真实 AI provider 做好准备。
不要把 mock 写死在组件里。
应该有类似：
generateImageForScene(input)
这样的服务函数，后续可以替换成真实 AI API。

==================================================
十一、文案方向
==================================================

请把核心文案调整成更适合国内用户和女性用户的表达。

常用文案：

首页主标题：
上传一张照片，生成你的爆款 AI 场景写真

副标题：
不用写提示词，不用修图。选择一个场景，几分钟生成适合发朋友圈、小红书和抖音的 AI 写真。

主按钮：
立即生成我的照片

次按钮：
查看效果案例

创作页按钮：
开始生成

未登录弹窗标题：
登录后生成你的 AI 场景照片

注册副标题：
注册即可获得 1 次免费试用，生成带水印预览图。

免费结果提示：
当前为免费带水印预览图。满意效果后，可解锁高清无水印版本。

解锁按钮：
¥1.99 解锁高清无水印

套餐按钮：
购买 3 张尝鲜包

水印提示：
免费图会带有 SceneShot AI 水印，用于预览和分享。

隐私提示：
请仅上传你本人或已获得授权的照片。生成结果为 AI 内容，不代表真实现场或真实直播画面。

防滥用提示：
为了保护免费试用权益，同一设备每天仅可领取一次免费试用。

==================================================
十二、重要约束
==================================================

1. 不要把产品做成复杂后台。
2. 不要让登录流程阻塞首页浏览。
3. 不要让游客直接无限生成。
4. 不要把 prompt_template 暴露给前端。
5. 不要把扣费/权益判断放在前端。
6. 不要明文存密码。
7. 不要明文存 session token。
8. 不要写死所有数据在组件里。
9. 不要删除现有好看的页面和样式，优先在原有基础上增强。
10. 不要接真实短信、真实微信、真实支付、真实 AI API，除非我之后明确要求。
11. 本轮目标是前后端 MVP 闭环，不是生产级完整商业系统。
12. 代码要保持清晰，为后续交给 Codex 优化升级留出空间。

==================================================
十三、验收标准
==================================================

完成后我希望可以做到：

1. 打开首页，可以正常浏览。
2. 进入创作页，游客可以上传照片和选场景。
3. 点击生成时，如果未登录，会弹出快速注册/登录。
4. 注册只需要用户名和密码，邮箱可选。
5. 注册成功后，用户获得 1 次免费试用。
6. 注册后自动继续刚才的生成流程。
7. 生成成功后展示一张低清/带水印 mock 图。
8. 用户可以下载带水印图。
9. 用户点击高清无水印，会提示购买套餐。
10. 用户可以 mock 支付 1.99 元单张体验包。
11. mock 支付成功后，当前图片变为已解锁高清无水印。
12. Dashboard 能看到用户、权益、生成历史、订单和交易记录。
13. 刷新页面后，登录状态和用户数据尽量保留。
14. 同设备重复注册不能无限领取免费试用。
15. README 更新说明：
    - 如何本地运行
    - API 如何工作
    - mock 登录/注册如何测试
    - mock 支付如何测试
    - 后续如何接真实 AI API
    - 后续如何接真实支付
    - 后续如何接正式数据库

==================================================
十四、建议执行方式
==================================================

请按照下面顺序工作：

第一步：
阅读仓库，输出你对当前技术栈、页面结构和数据流的理解。

第二步：
制定修改计划，不要大规模重写。

第三步：
实现数据模型和 API 层。

第四步：
实现 auth state、注册/登录弹窗。

第五步：
改造 create flow，让未登录用户在点击生成时弹窗登录，登录后继续生成。

第六步：
实现 mock generation、水印结果、高清解锁状态。

第七步：
实现 pricing/mock checkout/mock payment。

第八步：
实现 dashboard 数据展示。

第九步：
补基础防刷逻辑：device_id、IP 限制、新用户奖励限制、Turnstile 预留。

第十步：
检查所有页面，修复样式和移动端体验。

第十一步：
更新 README。

最后请给我一个总结：
- 你改了哪些文件
- 新增了哪些 API
- 当前哪些功能已经可用
- 哪些功能是 mock
- 下一步接真实 AI API/真实支付需要改哪里

特别注意：现有 demo 的视觉方向已经基本可用，本轮不要推翻重做 UI。请优先围绕“登录弹窗、生成流程、权益系统、mock 支付、Dashboard 数据化”做增强。所有修改都要服务于 MVP 商业闭环。