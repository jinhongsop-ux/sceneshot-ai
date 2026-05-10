/* SceneShot AI - Shared JavaScript */

/* ============================================
   I18N - TRANSLATIONS
   ============================================ */
const TRANSLATIONS = {
    zh: {
        // Navbar
        'nav.scenes': '场景',
        'nav.pricing': '定价',
        'nav.examples': '作品',
        'nav.faq': '常见问题',
        'nav.signin': '登录',
        'nav.generate': '立即生成',
        // Footer
        'footer.privacy': '隐私政策',
        'footer.terms': '服务条款',
        'footer.support': '联系客服',
        'footer.affiliate': '推广合作',
        'footer.copy': '© 2024 SceneShot AI。让创作变得简单。',
        // Sidebar
        'sidebar.creations': '我的作品',
        'sidebar.credits': '积分',
        'sidebar.settings': '设置',
        'sidebar.admin': '管理后台',
        // Index / Landing
        'index.badge': 'AI 生成效果',
        'index.hero.title': '秒级生成你的病毒式 AI 体育场照片',
        'index.hero.desc': '上传一张照片，即可将其转化为逼真的韩国棒球直播风格场景、旅行快照或电影级街拍。',
        'index.hero.cta': '生成我的照片',
        'index.hero.private': '私密上传',
        'index.before': '原图',
        'index.after': 'AI 增强',
        'index.steps.title': '三步搞定',
        'index.steps.desc': '30 秒内将普通照片变为非凡的 AI 生成场景。',
        'index.step1.label': '第一步',
        'index.step1.title': '上传自拍',
        'index.step1.desc': '拍摄或上传一张清晰的肖像照片。我们的 AI 在光线充足时效果最佳。',
        'index.step2.label': '第二步',
        'index.step2.title': '选择场景',
        'index.step2.desc': '浏览我们精美的 AI 生成场景库，选择你喜欢的。',
        'index.step3.label': '第三步',
        'index.step3.title': '生成魔法',
        'index.step3.desc': '我们的 AI 在几秒内将你的肖像无缝融入所选场景。',
        'index.trending.title': '热门场景',
        'index.trending.desc': '本周最受欢迎的场景',
        'index.trending.viewall': '查看全部',
        'index.cta.title': '准备好创造魔法了吗？',
        'index.cta.desc': '加入数千用户的行列，开始用 20 个免费积分创作令人惊叹的 AI 照片。',
        'index.cta.btn': '免费开始',
        // Scenes
        'scenes.title': '选择你的场景',
        'scenes.desc': '浏览我们的 AI 生成场景集，找到完美的背景。',
        'scenes.filter.all': '全部场景',
        'scenes.filter.sports': '运动',
        'scenes.filter.professional': '专业',
        'scenes.filter.fantasy': '奇幻',
        'scenes.filter.casual': '休闲',
        'scenes.filter.scifi': '科幻',
        'scenes.popular': '热门',
        'scenes.flagship': '旗舰',
        'scenes.new': '新品',
        // Scene Detail
        'detail.back': '返回场景库',
        'detail.sportsscene': '运动场景',
        'detail.popular': '热门',
        'detail.title': '韩国棒球直播',
        'detail.desc': '将你的肖像转化为逼真的韩国棒球直播风格照片。适合想体验大屏幕感觉的体育迷。',
        'detail.requirements': '照片要求',
        'detail.req1': '清晰、光线充足的肖像照片',
        'detail.req2': '面部完全可见',
        'detail.req3': '最低 512×512 像素',
        'detail.req4': 'JPG 或 PNG 格式',
        'detail.cost': '费用明细',
        'detail.standard': '标准质量',
        'detail.hd': '高清渲染',
        'detail.credits': '积分',
        'detail.cta': '上传照片并生成',
        'detail.terms': '继续即表示您同意我们的服务条款。照片经过安全处理，24 小时后自动删除。',
        // Create
        'create.title': '开始创作',
        'create.credits': '积分',
        'create.upload.desc': '上传一张清晰的照片，开始魔法之旅。',
        'create.upload.drag': '拖放照片到这里',
        'create.upload.click': '或点击从设备中选择',
        'create.upload.privacy': '您的照片仅用于生成，之后安全删除。',
        'create.scene.title': '选择场景',
        'create.scene.desc': '选择你的肖像所处的环境。',
        'create.settings.title': '生成设置',
        'create.settings.ratio': '宽高比',
        'create.settings.square': '1:1 方形',
        'create.settings.story': '9:16 竖版',
        'create.settings.quality': '画质',
        'create.settings.hd': '高清生成',
        'create.settings.hdcost': '消耗 2 积分',
        'create.generate': '立即生成',
        'create.loading': '正在生成你的场景...',
        'create.loading.time': '通常需要 10-15 秒',
        'create.result.title': '你的场景已就绪！',
        'create.result.download': '下载',
        'create.result.retry': '再试一次',
        // Pricing
        'pricing.title': '获取更多积分',
        'pricing.desc': '激发你的创意。选择适合你的积分包，立即开始生成令人惊叹的 AI 场景。',
        'pricing.starter': '入门版',
        'pricing.popular': '热门版',
        'pricing.creator': '创作者版',
        'pricing.pro': '专业版',
        'pricing.credits': '积分',
        'pricing.buy': '立即购买',
        'pricing.mostpopular': '最受欢迎',
        'pricing.bestvalue': '休闲用户的最佳选择',
        'pricing.faq.title': '常见问题',
        'pricing.faq.desc': '关于积分和计费你需要了解的一切。',
        'pricing.faq.q1': '积分如何使用？',
        'pricing.faq.a1': '每次生成通常消耗 1 个积分。高分辨率放大或复杂的多主体场景可能消耗 2-3 个积分。在确认生成前，您始终可以看到确切的费用。',
        'pricing.faq.q2': '积分会过期吗？',
        'pricing.faq.a2': '不会，通过这些积分包购买的积分永不过期。它们会保留在您的账户中，直到您使用为止。',
        'pricing.faq.q3': '我的隐私如何保护？',
        'pricing.faq.a3': '您生成的场景默认为私密。未经您明确同意，我们不会使用您生成的图像来训练我们的公共模型。',
        'pricing.faq.q4': '可以退款吗？',
        'pricing.faq.a4': '我们对未使用的积分提供 14 天退款保证。如果您最近购买的积分包尚未使用，请联系客服获取全额退款。',
        // Credits
        'credits.title': '积分记录',
        'credits.desc': '查看您的交易、生成记录和剩余积分。',
        'credits.balance': '当前余额',
        'credits.viewpricing': '查看定价',
        'credits.buy': '购买积分',
        'credits.recent': '最近交易',
        'credits.loadmore': '加载更多交易',
        // FAQ
        'faq.badge': '支持与帮助',
        'faq.title': '常见问题',
        'faq.desc': '关于使用 SceneShot AI 创作精美神奇肖像你需要了解的一切。',
        'faq.q1': '我应该上传什么样的照片？',
        'faq.a1': '为了获得最佳效果，请上传一张清晰、光线充足的肖像照片，面部完全可见，不要被大太阳镜等配饰遮挡。中性表情效果最好，但微微一笑也完全可以。AI 使用这张基础图像来构建高清场景，因此输入越清晰，输出越神奇。',
        'faq.q2': '积分如何运作？',
        'faq.a2': '每次点击"生成"都会消耗一个积分。您可以按包购买积分，也可以订阅每月计划获得定期额度。只要您的账户活跃，积分永不过期，您可以随时在个人资料仪表板上查看当前余额。',
        'faq.q3': '我的照片隐私吗？',
        'faq.a3': '绝对隐私。您的隐私是我们的首要任务。您上传的照片仅用于生成您请求的场景，并在 24 小时后自动从我们的服务器删除。我们不会使用您的个人图像来训练 AI 模型，也不会与任何第三方共享。',
        'faq.q4': '可以去除水印吗？',
        'faq.a4': '可以！虽然免费层级生成的图像在角落包含一个小而微妙的 SceneShot AI 水印，但所有付费积分和订阅计划都会生成高清无水印图像，可直接用于专业用途、社交媒体或打印。',
        'faq.q5': '生成需要多长时间？',
        'faq.a5': '大多数场景在 10 到 15 秒内生成。高复杂度场景或服务器负载较高时可能偶尔需要 30 秒。我们的定制 AI 架构针对速度进行了优化，同时不妥协最终图像的高清质量。',
        'faq.contact.title': '还有其他问题？',
        'faq.contact.desc': '找不到你要的答案？我们的支持团队随时准备帮你创造魔法。',
        'faq.contact.btn': '联系客服',
        // Dashboard
        'dashboard.balance': '可用余额',
        'dashboard.credits': '积分',
        'dashboard.buy': '购买积分',
        'dashboard.recent': '最近场景',
        'dashboard.filter': '筛选',
        // Admin
        'admin.title': '管理概览',
        'admin.desc': 'SceneShot AI 的实时指标和系统健康状况。',
        'admin.30days': '最近 30 天',
        'admin.export': '导出报告',
        'admin.users': '总用户数',
        'admin.generations': '生成次数',
        'admin.revenue': '收入 (MRR)',
        'admin.health': '系统健康',
        'admin.successrate': '成功率，最近 24 小时',
        'admin.vs30days': '对比前 30 天',
        'admin.chart.title': '生成量 vs 收入',
        'admin.chart.gen': '生成量',
        'admin.chart.rev': '收入',
        'admin.popular': '热门场景',
        'admin.viewall': '查看所有场景',
        'admin.recent': '最近生成',
        'admin.search': '搜索 ID 或用户...',
        'admin.preview': '预览',
        'admin.id': 'ID',
        'admin.user': '用户',
        'admin.scene': '应用场景',
        'admin.status': '状态',
        'admin.time': '时间',
        'admin.actions': '操作',
        'admin.success': '成功',
        'admin.failed': '失败',
        'admin.processing': '处理中',
        'admin.showing': '显示第 1 到 3 条，共 1,204 条',
        'admin.prev': '上一页',
        'admin.next': '下一页',
        // Sign In
        'signin.title': '欢迎来到 SceneShot AI',
        'signin.subtitle': '获得 <span class="text-primary font-semibold">20 个免费试用积分</span>',
        'signin.google': '使用 Google 登录',
        'signin.or': '或',
        'signin.email': '使用邮箱登录',
        'signin.terms': '继续即表示您同意我们的',
        'signin.tos': '服务条款',
        'signin.privacy': '隐私政策',
        'signin.back': '返回首页',
        // Language toggle
        'lang.toggle': 'EN',
    },
    en: {
        'nav.scenes': 'Scenes',
        'nav.pricing': 'Pricing',
        'nav.examples': 'Examples',
        'nav.faq': 'FAQ',
        'nav.signin': 'Sign In',
        'nav.generate': 'Generate Now',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.support': 'Contact Support',
        'footer.affiliate': 'Affiliate Program',
        'footer.copy': '© 2024 SceneShot AI. Magic made simple.',
        'sidebar.creations': 'My Creations',
        'sidebar.credits': 'Credits',
        'sidebar.settings': 'Settings',
        'sidebar.admin': 'Admin',
        'index.badge': 'AI-Generated Results',
        'index.hero.title': 'Create your viral AI stadium photo in seconds',
        'index.hero.desc': 'Upload one photo and transform it into a realistic Korean baseball broadcast-style scene, travel snapshot, or cinematic street photo.',
        'index.hero.cta': 'Generate My Photo',
        'index.hero.private': 'Private uploads',
        'index.before': 'Before',
        'index.after': 'AI Enhanced',
        'index.steps.title': 'Three Simple Steps',
        'index.steps.desc': 'Transform your ordinary photo into an extraordinary AI-generated scene in under 30 seconds.',
        'index.step1.label': 'Step 1',
        'index.step1.title': 'Upload Selfie',
        'index.step1.desc': 'Take or upload a clear portrait photo. Our AI works best with good lighting.',
        'index.step2.label': 'Step 2',
        'index.step2.title': 'Choose Scene',
        'index.step2.desc': 'Browse our library of stunning AI-generated scenes and pick your favorite.',
        'index.step3.label': 'Step 3',
        'index.step3.title': 'Generate Magic',
        'index.step3.desc': 'Our AI seamlessly blends your portrait into the chosen scene in seconds.',
        'index.trending.title': 'Trending Scenes',
        'index.trending.desc': 'Most popular scenes this week',
        'index.trending.viewall': 'View All',
        'index.cta.title': 'Ready to create magic?',
        'index.cta.desc': 'Join thousands of users creating stunning AI photos. Start with 20 free credits.',
        'index.cta.btn': 'Get Started Free',
        'scenes.title': 'Choose Your Scene',
        'scenes.desc': 'Browse our collection of AI-generated scenes and find the perfect backdrop.',
        'scenes.filter.all': 'All Scenes',
        'scenes.filter.sports': 'Sports',
        'scenes.filter.professional': 'Professional',
        'scenes.filter.fantasy': 'Fantasy',
        'scenes.filter.casual': 'Casual',
        'scenes.filter.scifi': 'Sci-Fi',
        'scenes.popular': 'Popular',
        'scenes.flagship': 'Flagship',
        'scenes.new': 'New',
        'detail.back': 'Back to Scenes',
        'detail.sportsscene': 'SPORTS SCENE',
        'detail.popular': 'Popular',
        'detail.title': 'Korean Baseball Broadcast',
        'detail.desc': 'Transform your portrait into a realistic Korean baseball broadcast-style photo. Perfect for sports fans who want to feel like they\'re on the big screen.',
        'detail.requirements': 'Photo Requirements',
        'detail.req1': 'Clear, well-lit portrait photo',
        'detail.req2': 'Face fully visible',
        'detail.req3': 'Minimum 512×512 pixels',
        'detail.req4': 'JPG or PNG format',
        'detail.cost': 'Cost Breakdown',
        'detail.standard': 'Standard Quality',
        'detail.hd': 'HD Render',
        'detail.credits': 'Credits',
        'detail.cta': 'Upload Photo and Generate',
        'detail.terms': 'By proceeding, you agree to our Terms of Service. Photos are processed securely and deleted after 24 hours.',
        'create.title': 'Start Your Creation',
        'create.credits': 'Credits',
        'create.upload.desc': 'Upload a clear photo to begin the magic.',
        'create.upload.drag': 'Drag & Drop your photo here',
        'create.upload.click': 'or click to browse from your device',
        'create.upload.privacy': 'Your photo is used only for generation and securely deleted.',
        'create.scene.title': 'Choose a Scene',
        'create.scene.desc': 'Select the environment for your portrait.',
        'create.settings.title': 'Generation Settings',
        'create.settings.ratio': 'Aspect Ratio',
        'create.settings.square': '1:1 Square',
        'create.settings.story': '9:16 Story',
        'create.settings.quality': 'Quality',
        'create.settings.hd': 'HD Generation',
        'create.settings.hdcost': 'Costs 2 credits',
        'create.generate': 'Generate Now',
        'create.loading': 'Generating your scene...',
        'create.loading.time': 'This usually takes 10-15 seconds',
        'create.result.title': 'Your Scene is Ready!',
        'create.result.download': 'Download',
        'create.result.retry': 'Try Another',
        'pricing.title': 'Get More Credits',
        'pricing.desc': 'Fuel your creativity. Choose the credit pack that fits your needs and start generating stunning AI scenes instantly.',
        'pricing.starter': 'Starter',
        'pricing.popular': 'Popular',
        'pricing.creator': 'Creator',
        'pricing.pro': 'Pro',
        'pricing.credits': 'Credits',
        'pricing.buy': 'Buy Now',
        'pricing.mostpopular': 'Most Popular',
        'pricing.bestvalue': 'Best value for casual users',
        'pricing.faq.title': 'Frequently Asked Questions',
        'pricing.faq.desc': 'Everything you need to know about credits and billing.',
        'pricing.faq.q1': 'How are credits used?',
        'pricing.faq.a1': 'Each generation typically costs 1 credit. High-resolution upscales or complex multi-subject scenes may cost 2-3 credits. You\'ll always see the exact cost before confirming a generation.',
        'pricing.faq.q2': 'Do credits expire?',
        'pricing.faq.a2': 'No, credits purchased through these packs never expire. They remain in your account until you use them, allowing you to generate at your own pace.',
        'pricing.faq.q3': 'How is my privacy handled?',
        'pricing.faq.a3': 'Your generated scenes are private by default. We do not use your generated images to train our public models without explicit opt-in consent.',
        'pricing.faq.q4': 'Can I get a refund?',
        'pricing.faq.a4': 'We offer a 14-day money-back guarantee for unused credits. If you haven\'t generated any scenes with a recently purchased pack, contact support for a full refund.',
        'credits.title': 'Credit History',
        'credits.desc': 'View your transactions, generations, and remaining balance.',
        'credits.balance': 'Current Balance',
        'credits.viewpricing': 'View Pricing',
        'credits.buy': 'Buy Credits',
        'credits.recent': 'Recent Transactions',
        'credits.loadmore': 'Load More Transactions',
        'faq.badge': 'Support & Help',
        'faq.title': 'Frequently Asked Questions',
        'faq.desc': 'Everything you need to know about using SceneShot AI to create stunning, magical portraits.',
        'faq.q1': 'What kind of photo should I upload?',
        'faq.a1': 'For the best results, upload a clear, well-lit portrait photo where your face is fully visible and not obstructed by accessories like large sunglasses. A neutral expression works best, but a slight smile is perfectly fine. The AI uses this base image to construct the high-definition scenes, so the clearer the input, the more magical the output.',
        'faq.q2': 'How do credits work?',
        'faq.a2': 'Every time you click "Generate," it costs one credit. You can purchase credits in packs or subscribe to a monthly plan for a recurring allowance. Credits never expire as long as your account is active, and you can view your current balance at any time on your profile dashboard.',
        'faq.q3': 'Is my photo private?',
        'faq.a3': 'Absolutely. Your privacy is our top priority. The photos you upload are only used to generate your requested scenes and are automatically deleted from our servers after 24 hours. We do not use your personal images to train our AI models or share them with any third parties.',
        'faq.q4': 'Can I remove the watermark?',
        'faq.a4': 'Yes! While free tier generation includes a small, subtle SceneShot AI watermark in the corner, all paid credits and subscription plans generate high-definition, watermark-free images ready for professional use, social media, or printing.',
        'faq.q5': 'How long does generation take?',
        'faq.a5': 'Most scenes are generated within 10 to 15 seconds. High-complexity scenes or heavy server load might occasionally take up to 30 seconds. Our custom AI architecture is optimized for speed without compromising the high-definition quality of your final image.',
        'faq.contact.title': 'Still have questions?',
        'faq.contact.desc': 'Can\'t find the answer you\'re looking for? Our support team is ready to help you create magic.',
        'faq.contact.btn': 'Contact Support',
        'dashboard.balance': 'Available Balance',
        'dashboard.credits': 'credits',
        'dashboard.buy': 'Buy Credits',
        'dashboard.recent': 'Recent Scenes',
        'dashboard.filter': 'Filter',
        'admin.title': 'Admin Overview',
        'admin.desc': 'Real-time metrics and system health for SceneShot AI.',
        'admin.30days': 'Last 30 Days',
        'admin.export': 'Export Report',
        'admin.users': 'Total Users',
        'admin.generations': 'Generations',
        'admin.revenue': 'Revenue (MRR)',
        'admin.health': 'System Health',
        'admin.successrate': 'Success rate, last 24h',
        'admin.vs30days': 'vs. previous 30 days',
        'admin.chart.title': 'Generations vs. Revenue',
        'admin.chart.gen': 'Generations',
        'admin.chart.rev': 'Revenue',
        'admin.popular': 'Popular Scenes',
        'admin.viewall': 'View All Scenes',
        'admin.recent': 'Recent Generations',
        'admin.search': 'Search ID or User...',
        'admin.preview': 'Preview',
        'admin.id': 'ID',
        'admin.user': 'User',
        'admin.scene': 'Scene Applied',
        'admin.status': 'Status',
        'admin.time': 'Time',
        'admin.actions': 'Actions',
        'admin.success': 'Success',
        'admin.failed': 'Failed',
        'admin.processing': 'Processing',
        'admin.showing': 'Showing 1 to 3 of 1,204 entries',
        'admin.prev': 'Prev',
        'admin.next': 'Next',
        'signin.title': 'Welcome to SceneShot AI',
        'signin.subtitle': 'Start with <span class="text-primary font-semibold">20 free trial credits</span>',
        'signin.google': 'Continue with Google',
        'signin.or': 'or',
        'signin.email': 'Continue with Email',
        'signin.terms': 'By continuing, you agree to our',
        'signin.tos': 'Terms of Service',
        'signin.privacy': 'Privacy Policy',
        'signin.back': 'Back to Home',
        'lang.toggle': '中文',
    }
};

function getCurrentLang() {
    return localStorage.getItem('ssai-lang') || 'zh';
}

function t(key) {
    const lang = getCurrentLang();
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || key;
}

function applyTranslations() {
    const lang = getCurrentLang();
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = TRANSLATIONS[lang] && TRANSLATIONS[lang][key];
        if (val !== undefined) {
            if (el.hasAttribute('data-i18n-html')) {
                el.innerHTML = val;
            } else {
                el.textContent = val;
            }
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = TRANSLATIONS[lang] && TRANSLATIONS[lang][key];
        if (val !== undefined) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const val = TRANSLATIONS[lang] && TRANSLATIONS[lang][key];
        if (val !== undefined) document.title = val;
    });
}

function switchLanguage(lang) {
    localStorage.setItem('ssai-lang', lang);
    applyTranslations();
    // Re-render dynamic components (navbar, footer, sidebar, bottombar)
    // by reloading — simplest approach for multi-page static site
    location.reload();
}

/* ============================================
   TAILWIND CONFIG (shared across all pages)
   ============================================ */
const TAILWIND_CONFIG = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                /* Warm editorial palette — Instagram-inspired */
                "primary": "#b8956c",
                "primary-container": "#f0e4d4",
                "on-primary": "#fffdf9",
                "on-primary-container": "#5c4a2e",
                "on-primary-fixed": "#3d2e18",
                "on-primary-fixed-variant": "#8c6d3f",
                "primary-fixed": "#f5ece0",
                "primary-fixed-dim": "#d4c4a8",
                "inverse-primary": "#c4a87c",

                "secondary": "#c47d6c",
                "secondary-container": "#f5ddd8",
                "on-secondary": "#fffdf9",
                "on-secondary-container": "#5c2e24",
                "on-secondary-fixed": "#3d1e18",
                "on-secondary-fixed-variant": "#8c5246",
                "secondary-fixed": "#f8e8e4",
                "secondary-fixed-dim": "#d8b0a6",
                "on-secondary-fixed-variant": "#8c5246",

                "tertiary": "#8c7c6c",
                "tertiary-container": "#e8ddd4",
                "on-tertiary": "#fffdf9",
                "on-tertiary-container": "#3d342c",
                "on-tertiary-fixed": "#2c241e",
                "on-tertiary-fixed-variant": "#6b5c4c",
                "tertiary-fixed": "#ede4dc",
                "tertiary-fixed-dim": "#c4b8a8",

                "error": "#ba1a1a",
                "error-container": "#ffdad6",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",

                "background": "#fdfbf7",
                "on-background": "#231f1b",
                "surface": "#fdfbf7",
                "surface-bright": "#fdfbf7",
                "surface-dim": "#e0dbd4",
                "surface-tint": "#b8956c",
                "surface-variant": "#e8e0d6",
                "on-surface": "#231f1b",
                "on-surface-variant": "#58534a",
                "inverse-surface": "#38342e",
                "inverse-on-surface": "#f5efe8",

                "surface-container": "#f0ece6",
                "surface-container-low": "#f5f1eb",
                "surface-container-lowest": "#fffdf9",
                "surface-container-high": "#e8e4de",
                "surface-container-highest": "#e0dbd4",

                "outline": "#8c8578",
                "outline-variant": "#d8d2c8",
                "shadow": "#231f1b",
                "scrim": "#231f1b"
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                full: "9999px"
            },
            spacing: {
                base: "8px",
                "margin-desktop": "64px",
                "container-max": "1280px",
                gutter: "24px",
                "margin-mobile": "20px"
            },
            fontFamily: {
                "body-lg": ["Plus Jakarta Sans"],
                "body-md": ["Plus Jakarta Sans"],
                "display-xl": ["Outfit"],
                "headline-lg-mobile": ["Outfit"],
                "label-bold": ["Plus Jakarta Sans"],
                caption: ["Plus Jakarta Sans"],
                "headline-lg": ["Outfit"],
                "headline-md": ["Outfit"]
            },
            fontSize: {
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "display-xl": ["56px", { lineHeight: "64px", letterSpacing: "-0.025em", fontWeight: "700" }],
                "headline-lg-mobile": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "label-bold": ["14px", { lineHeight: "20px", fontWeight: "600" }],
                caption: ["12px", { lineHeight: "16px", fontWeight: "500" }],
                "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.015em", fontWeight: "700" }],
                "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }]
            }
        }
    }
};

/* ============================================
   NAVBAR RENDERING
   ============================================ */
function renderNavbar(activePage) {
    const lang = getCurrentLang();
    const nextLang = lang === 'zh' ? 'en' : 'zh';
    const langLabel = lang === 'zh' ? 'EN' : '中文';

    const nav = document.createElement('nav');
    nav.className = 'fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm';

    const pages = [
        { id: 'scenes', key: 'nav.scenes', href: 'scenes.html' },
        { id: 'pricing', key: 'nav.pricing', href: 'pricing.html' },
        { id: 'dashboard', key: 'nav.examples', href: 'dashboard.html' },
        { id: 'faq', key: 'nav.faq', href: 'faq.html' }
    ];

    const linksHTML = pages.map(p => {
        const isActive = p.id === activePage;
        return `<a class="nav-link ${isActive ? 'active' : ''}" href="${p.href}" data-i18n="${p.key}">${t(p.key)}</a>`;
    }).join('');

    nav.innerHTML = `
        <a href="index.html" class="font-display-xl text-headline-md tracking-tighter text-on-surface">SceneShot AI</a>
        <div class="hidden md:flex items-center gap-8">
            ${linksHTML}
        </div>
        <div class="hidden md:flex items-center gap-3">
            <button onclick="switchLanguage('${nextLang}')" class="w-9 h-9 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-bold text-label-bold text-xs">${langLabel}</button>
            <span id="nav-auth-area">
                <a href="signin.html" class="font-label-bold text-label-bold text-on-surface-variant hover:text-on-surface transition-colors" data-i18n="nav.signin">${t('nav.signin')}</a>
            </span>
            <a href="create.html" class="cta-btn text-sm px-6 py-2" data-i18n="nav.generate">${t('nav.generate')}</a>
        </div>
        <button class="md:hidden text-on-surface p-2" id="mobile-menu-btn">
            <span class="material-symbols-outlined">menu</span>
        </button>
    `;

    document.body.prepend(nav);

    // Mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.id = 'mobile-menu-overlay';

    const panel = document.createElement('div');
    panel.className = 'mobile-menu-panel';
    panel.id = 'mobile-menu-panel';
    panel.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <span class="font-display-xl text-headline-md tracking-tighter text-on-surface">SceneShot AI</span>
            <button id="mobile-menu-close" class="p-2 text-on-surface">
                <span class="material-symbols-outlined">close</span>
            </button>
        </div>
        <div class="flex flex-col gap-2">
            ${pages.map(p => `<a href="${p.href}" class="sidebar-nav-item ${p.id === activePage ? 'active' : ''}" data-i18n="${p.key}"><span>${t(p.key)}</span></a>`).join('')}
        </div>
        <div class="mt-auto flex flex-col gap-3">
            <button onclick="switchLanguage('${nextLang}')" class="text-center font-label-bold text-label-bold text-on-surface-variant py-3 border border-outline-variant rounded-full hover:border-primary hover:text-primary transition-all">${langLabel}</button>
            <span id="mobile-auth-area">
                <a href="signin.html" class="text-center font-label-bold text-label-bold text-on-surface-variant py-3 border border-outline-variant rounded-full hover:border-primary hover:text-primary transition-all" data-i18n="nav.signin">${t('nav.signin')}</a>
            </span>
            <a href="create.html" class="text-center cta-btn py-3 w-full justify-center" data-i18n="nav.generate">${t('nav.generate')}</a>
        </div>
    `;

    document.body.prepend(panel);
    document.body.prepend(overlay);

    // Menu toggle
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        overlay.classList.add('open');
        panel.classList.add('open');
    });

    const closeMenu = () => {
        overlay.classList.remove('open');
        panel.classList.remove('open');
    };

    document.getElementById('mobile-menu-close')?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
}

/* ============================================
   SIDEBAR NAV RENDERING (Dashboard/Admin)
   ============================================ */
function renderSidebar(activeItem, items) {
    const sidebar = document.createElement('aside');
    sidebar.className = 'hidden lg:flex flex-col w-64 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/20 p-6 fixed top-0 left-0 h-full pt-24';

    const linksHTML = items.map(item => {
        const isActive = item.id === activeItem;
        const label = item.key ? t(item.key) : item.label;
        return `<a href="${item.href}" class="sidebar-nav-item ${isActive ? 'active' : ''}" ${item.key ? `data-i18n="${item.key}"` : ''}>
            <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
            <span>${label}</span>
        </a>`;
    }).join('');

    sidebar.innerHTML = `
        <div class="flex flex-col gap-1 flex-grow">
            ${linksHTML}
        </div>
        <a href="create.html" class="cta-btn text-center justify-center py-3">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span data-i18n="nav.generate">${t('nav.generate')}</span>
        </a>
    `;

    document.body.prepend(sidebar);
}

/* ============================================
   FOOTER RENDERING
   ============================================ */
function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'w-full px-margin-mobile md:px-margin-desktop py-8 flex flex-col md:flex-row justify-between items-center border-t border-outline-variant/20 bg-surface-container-low mt-auto mb-20 md:mb-0';
    footer.innerHTML = `
        <a href="index.html" class="font-display-xl text-headline-md text-on-surface mb-4 md:mb-0">SceneShot AI</a>
        <div class="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a class="font-caption text-caption text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-colors" href="#" data-i18n="footer.privacy">${t('footer.privacy')}</a>
            <a class="font-caption text-caption text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-colors" href="#" data-i18n="footer.terms">${t('footer.terms')}</a>
            <a class="font-caption text-caption text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-colors" href="#" data-i18n="footer.support">${t('footer.support')}</a>
            <a class="font-caption text-caption text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-colors" href="#" data-i18n="footer.affiliate">${t('footer.affiliate')}</a>
        </div>
        <div class="font-caption text-caption text-on-surface-variant opacity-60" data-i18n="footer.copy">${t('footer.copy')}</div>
    `;
    document.body.appendChild(footer);
}

/* ============================================
   MOBILE BOTTOM BAR
   ============================================ */
function renderBottomBar() {
    const bar = document.createElement('nav');
    bar.className = 'md:hidden fixed bottom-0 left-0 w-full z-50 flex flex-col items-center pb-safe bg-surface/90 backdrop-blur-2xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(35,31,27,0.06)]';
    bar.innerHTML = `
        <a href="create.html" class="cta-btn w-full mx-margin-mobile my-4 justify-center text-center">
            <span class="material-symbols-outlined">auto_awesome</span>
            <span data-i18n="nav.generate">${t('nav.generate')}</span>
        </a>
    `;
    document.body.appendChild(bar);
}

/* ============================================
   BEFORE/AFTER COMPARISON SLIDER
   ============================================ */
function initComparisonSliders() {
    document.querySelectorAll('.comparison-slider').forEach(slider => {
        const beforeWrapper = slider.querySelector('.before-wrapper');
        const handle = slider.querySelector('.slider-handle');
        if (!beforeWrapper || !handle) return;

        let isDragging = false;

        const updatePosition = (x) => {
            const rect = slider.getBoundingClientRect();
            let percent = ((x - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            beforeWrapper.style.width = percent + '%';
            handle.style.left = percent + '%';
        };

        const onPointerDown = (e) => {
            isDragging = true;
            e.preventDefault();
            updatePosition(e.clientX || e.touches?.[0]?.clientX);
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            updatePosition(e.clientX || e.touches?.[0]?.clientX);
        };

        const onPointerUp = () => {
            isDragging = false;
        };

        slider.addEventListener('mousedown', onPointerDown);
        slider.addEventListener('touchstart', onPointerDown, { passive: false });
        document.addEventListener('mousemove', onPointerMove);
        document.addEventListener('touchmove', onPointerMove, { passive: false });
        document.addEventListener('mouseup', onPointerUp);
        document.addEventListener('touchend', onPointerUp);
    });
}

/* ============================================
   FAQ ACCORDION
   ============================================ */
function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        if (!question || !answer) return;

        // Start collapsed
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';

        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';

            // Close all others
            document.querySelectorAll('.faq-item .faq-answer').forEach(a => {
                a.style.maxHeight = '0';
            });
            document.querySelectorAll('.faq-item .faq-icon').forEach(i => {
                i.style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/* ============================================
   TOGGLE SWITCHES
   ============================================ */
function initToggles() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });
}

/* ============================================
   RATIO BUTTON GROUPS
   ============================================ */
function initRatioButtons() {
    document.querySelectorAll('.ratio-btn-group').forEach(group => {
        const buttons = group.querySelectorAll('.ratio-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
}

/* ============================================
   SCENE FILTER CHIPS
   ============================================ */
function initFilterChips() {
    document.querySelectorAll('.filter-chip-group').forEach(group => {
        const chips = group.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    });
}

/* ============================================
   SCENE CARD SELECTION (Create Flow)
   ============================================ */
function initSceneSelection() {
    document.querySelectorAll('.scene-select-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.scene-select-card').forEach(c => {
                c.classList.remove('border-primary');
                c.classList.add('border-transparent');
                const check = c.querySelector('.scene-check');
                if (check) check.style.display = 'none';
            });
            card.classList.remove('border-transparent');
            card.classList.add('border-primary');
            const check = card.querySelector('.scene-check');
            if (check) check.style.display = 'block';
        });
    });
}

/* ============================================
   DASHBOARD TABS
   ============================================ */
function initTabs() {
    document.querySelectorAll('.tab-group').forEach(group => {
        const tabs = group.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.dataset.tab;
                contents.forEach(c => {
                    c.style.display = c.id === target ? 'block' : 'none';
                });
            });
        });
    });
}

/* ============================================
   CREATION FLOW STEPS
   ============================================ */
function initCreationFlow() {
    const steps = document.querySelectorAll('.creation-step');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const generateBtn = document.getElementById('generate-btn');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Hide all steps
            steps.forEach(s => s.style.display = 'none');
            // Show loading
            if (loadingSection) {
                loadingSection.style.display = 'flex';
                // After 3 seconds, show result
                setTimeout(() => {
                    loadingSection.style.display = 'none';
                    if (resultSection) {
                        resultSection.style.display = 'flex';
                    }
                }, 3000);
            }
        });
    }

    const tryAnotherBtn = document.getElementById('try-another-btn');
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', () => {
            if (resultSection) resultSection.style.display = 'none';
            steps.forEach(s => s.style.display = '');
            if (loadingSection) loadingSection.style.display = 'none';
        });
    }
}

/* ============================================
   FILE UPLOAD ZONE
   ============================================ */
function initUploadZone() {
    const zone = document.getElementById('upload-zone');
    const input = document.getElementById('file-input');
    if (!zone || !input) return;

    zone.addEventListener('click', () => input.click());

    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('border-primary');
        zone.classList.remove('border-primary/30');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('border-primary');
        zone.classList.add('border-primary/30');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('border-primary');
        zone.classList.add('border-primary/30');
        const file = e.dataTransfer.files[0];
        if (file) handleFileUpload(file, zone);
    });

    input.addEventListener('change', () => {
        const file = input.files[0];
        if (file) handleFileUpload(file, zone);
    });
}

function handleFileUpload(file, zone) {
    const icon = zone.querySelector('.upload-icon');
    const text = zone.querySelector('.upload-text');
    if (icon) icon.innerHTML = '<span class="material-symbols-outlined text-[48px] text-primary" style="font-variation-settings: \'FILL\' 1;">check_circle</span>';
    if (text) text.textContent = file.name;
    zone.classList.add('border-primary');
    zone.classList.remove('border-dashed');
}

/* ============================================
   SCROLL REVEAL (IntersectionObserver)
   ============================================ */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

/* ============================================
   NAVBAR SCROLL STATE
   ============================================ */
function initNavbarScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.classList.add('nav-scrolled');
                } else {
                    nav.classList.remove('nav-scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ============================================
   NUMBER COUNT-UP ANIMATION (Admin)
   ============================================ */
function initCountUp() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const animate = (el) => {
        const target = el.getAttribute('data-count');
        const suffix = el.getAttribute('data-count-suffix') || '';
        const prefix = el.getAttribute('data-count-prefix') || '';
        const numMatch = target.match(/[\d.]+/);
        if (!numMatch) return;

        const endVal = parseFloat(numMatch[0]);
        const hasDecimal = target.includes('.');
        const hasK = target.includes('K');
        const hasM = target.includes('M');
        const duration = 1500;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            let current = eased * endVal;

            if (hasK) {
                current = hasDecimal ? current.toFixed(1) + 'K' : Math.round(current) + 'K';
            } else if (hasM) {
                current = current.toFixed(1) + 'M';
            } else if (hasDecimal) {
                current = current.toFixed(1);
            } else {
                current = Math.round(current).toLocaleString();
            }

            el.textContent = prefix + current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(el => observer.observe(el));
}

/* ============================================
   DEVICE ID MANAGEMENT
   ============================================ */
function getDeviceId() {
    let id = localStorage.getItem('ssai-device-id');
    if (!id) {
        id = crypto.randomUUID ? crypto.randomUUID() : 'dev_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem('ssai-device-id', id);
    }
    return id;
}

/* ============================================
   AUTH STATE
   ============================================ */
const AuthState = {
    user: null,
    entitlements: null,
    isLoggedIn: false,
    pendingAction: null, // callback to run after login
};

async function initAuth() {
    try {
        const resp = await apiCall('GET', '/api/me');
        if (resp && resp.user) {
            AuthState.user = resp.user;
            AuthState.entitlements = resp.entitlements;
            AuthState.isLoggedIn = true;
            updateNavAuthState();
        }
    } catch (e) {
        // Not logged in
    }
}

function updateNavAuthState() {
    const authArea = document.getElementById('nav-auth-area');
    if (!authArea) return;

    if (AuthState.isLoggedIn) {
        authArea.innerHTML = `
            <a href="dashboard.html" class="font-label-bold text-label-bold text-on-surface-variant hover:text-on-surface transition-colors">${AuthState.user.username}</a>
            <button onclick="handleLogout()" class="font-label-bold text-label-bold text-on-surface-variant hover:text-error transition-colors ml-3" style="background:none;border:none;cursor:pointer;">退出</button>
        `;
    }

    // Also update mobile menu auth area
    const mobileAuthArea = document.getElementById('mobile-auth-area');
    if (mobileAuthArea && AuthState.isLoggedIn) {
        mobileAuthArea.innerHTML = `
            <a href="dashboard.html" class="text-center font-label-bold text-label-bold text-on-surface-variant py-3 border border-outline-variant rounded-full hover:border-primary hover:text-primary transition-all">${AuthState.user.username}</a>
            <button onclick="handleLogout()" class="text-center font-label-bold text-label-bold text-error py-3 border border-error/30 rounded-full hover:bg-error-container transition-all" style="background:none;cursor:pointer;width:100%;border-radius:9999px;">退出登录</button>
        `;
    }
}

/* ============================================
   API CALL WRAPPER
   ============================================ */
async function apiCall(method, path, body) {
    const opts = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'X-Device-Id': getDeviceId(),
        },
        credentials: 'same-origin',
    };
    if (body && method !== 'GET') {
        opts.body = JSON.stringify(body);
    }
    const resp = await fetch(path, opts);
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Request failed');
    return data;
}

/* ============================================
   AUTH MODAL
   ============================================ */
function renderAuthModal(mode = 'register') {
    // Remove existing modal
    document.getElementById('auth-modal-overlay')?.remove();

    const isRegister = mode === 'register';
    const overlay = document.createElement('div');
    overlay.id = 'auth-modal-overlay';
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    const modal = document.createElement('div');
    modal.className = 'bg-surface rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 relative animate-in';
    modal.onclick = (e) => e.stopPropagation();

    modal.innerHTML = `
        <button onclick="this.closest('#auth-modal-overlay').remove()" class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="text-center mb-6">
            <div class="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-primary text-[28px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
            </div>
            <h2 class="font-display-xl text-headline-md text-on-surface">${isRegister ? '登录后生成你的 AI 场景照片' : '登录后继续生成'}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">${isRegister ? '注册即可获得 1 次免费试用，生成带水印预览图。' : ''}</p>
        </div>
        <form id="auth-form" class="flex flex-col gap-4">
            <div>
                <label class="font-label-bold text-label-bold text-on-surface-variant mb-1.5 block">用户名</label>
                <input name="username" type="text" required minlength="2" placeholder="请输入用户名"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            ${isRegister ? `
            <div>
                <label class="font-label-bold text-label-bold text-on-surface-variant mb-1.5 block">邮箱（可选）</label>
                <input name="email" type="email" placeholder="用于找回账号和保护作品"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            ` : ''}
            <div>
                <label class="font-label-bold text-label-bold text-on-surface-variant mb-1.5 block">密码</label>
                <input name="password" type="password" required minlength="6" placeholder="至少 6 个字符"
                    class="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <div id="auth-error" class="text-error text-sm hidden"></div>
            <button type="submit" class="cta-btn w-full justify-center py-3.5 mt-2">
                ${isRegister ? '立即注册并生成' : '登录并继续'}
            </button>
        </form>
        <div class="text-center mt-4">
            ${isRegister
                ? '<span class="text-on-surface-variant text-sm">已有账号？</span><button onclick="renderAuthModal(\'login\')" class="text-primary font-label-bold text-label-bold text-sm ml-1 hover:underline bg-transparent border-none cursor-pointer">登录</button>'
                : '<span class="text-on-surface-variant text-sm">还没有账号？</span><button onclick="renderAuthModal(\'register\')" class="text-primary font-label-bold text-label-bold text-sm ml-1 hover:underline bg-transparent border-none cursor-pointer">立即注册</button>'
            }
        </div>
        ${isRegister ? '<p class="text-caption text-on-surface-variant text-center mt-3 text-xs">绑定邮箱后可找回账号，并保护你的积分和作品。</p>' : ''}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Handle form submit
    document.getElementById('auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const errEl = document.getElementById('auth-error');
        errEl.classList.add('hidden');

        try {
            const body = isRegister
                ? { username: form.get('username'), password: form.get('password'), email: form.get('email') || undefined, deviceId: getDeviceId() }
                : { login: form.get('username'), password: form.get('password'), deviceId: getDeviceId() };

            const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
            const resp = await apiCall('POST', endpoint, body);

            AuthState.user = resp.user;
            AuthState.entitlements = resp.entitlements;
            AuthState.isLoggedIn = true;

            overlay.remove();
            updateNavAuthState();
            showToast(isRegister ? '注册成功！已获得 1 次免费试用' : '登录成功', 'success');

            // Continue pending action (e.g., generation)
            if (AuthState.pendingAction) {
                AuthState.pendingAction();
                AuthState.pendingAction = null;
            }
        } catch (err) {
            errEl.textContent = err.message;
            errEl.classList.remove('hidden');
        }
    });
}

/* ============================================
   PURCHASE MODAL
   ============================================ */
async function renderPurchaseModal() {
    document.getElementById('purchase-modal-overlay')?.remove();

    let packages = [];
    try {
        const resp = await apiCall('GET', '/api/pricing-packages');
        packages = resp.packages || [];
    } catch (e) {
        showToast('获取套餐失败', 'error');
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'purchase-modal-overlay';
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

    const modal = document.createElement('div');
    modal.className = 'bg-surface rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 relative animate-in';
    modal.onclick = (e) => e.stopPropagation();

    const packageCards = packages.map(pkg => `
        <div class="premium-card p-5 flex items-center justify-between cursor-pointer hover:border-primary transition-all purchase-pkg-btn" data-pkg-id="${pkg.id}" data-pkg-name="${pkg.name}" data-pkg-price="${pkg.amount_cny}">
            <div>
                <p class="font-label-bold text-label-bold text-on-surface">${pkg.name}</p>
                <p class="font-caption text-caption text-on-surface-variant">${pkg.description}</p>
            </div>
            <div class="text-right">
                <p class="font-display-xl text-headline-md text-primary">¥${pkg.amount_cny}</p>
                ${pkg.is_featured ? '<span class="text-xs bg-primary text-white px-2 py-0.5 rounded-full">推荐</span>' : ''}
            </div>
        </div>
    `).join('');

    modal.innerHTML = `
        <button onclick="this.closest('#purchase-modal-overlay').remove()" class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        <div class="text-center mb-6">
            <h2 class="font-display-xl text-headline-md text-on-surface">购买解锁额度</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">选择套餐，解锁高清无水印图片</p>
        </div>
        <div class="flex flex-col gap-3">
            ${packageCards}
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Handle package selection
    modal.querySelectorAll('.purchase-pkg-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pkgId = btn.dataset.pkgId;
            const pkgName = btn.dataset.pkgName;
            const pkgPrice = btn.dataset.pkgPrice;

            overlay.remove();
            await handleMockPayment(pkgId, pkgName, pkgPrice);
        });
    });
}

async function handleMockPayment(pkgId, pkgName, pkgPrice) {
    // Show mock payment confirmation
    const overlay = document.createElement('div');
    overlay.id = 'payment-modal-overlay';
    overlay.className = 'fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm';

    overlay.innerHTML = `
        <div class="bg-surface rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 text-center animate-in">
            <div class="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-primary text-[32px]">payment</span>
            </div>
            <h3 class="font-display-xl text-headline-md text-on-surface mb-2">确认支付</h3>
            <p class="text-on-surface-variant mb-1">${pkgName}</p>
            <p class="font-display-xl text-headline-lg text-primary mb-6">¥${pkgPrice}</p>
            <p class="text-caption text-on-surface-variant mb-6">这是 MVP 模拟支付，不会产生真实扣款</p>
            <div class="flex gap-3">
                <button onclick="this.closest('#payment-modal-overlay').remove()" class="outline-btn flex-1 justify-center py-3">取消</button>
                <button id="confirm-pay-btn" class="cta-btn flex-1 justify-center py-3">模拟支付成功</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('confirm-pay-btn').addEventListener('click', async () => {
        try {
            // Create order
            const { order } = await apiCall('POST', '/api/orders/mock-checkout', { package_id: pkgId });
            // Mock pay
            const payResp = await apiCall('POST', `/api/orders/${order.id}/mock-pay`);

            AuthState.entitlements = payResp.entitlements;
            overlay.remove();
            showToast(`支付成功！已获得 ${payResp.entitlements?.paid_unlocks_remaining || 0} 次解锁额度`, 'success');

            // Trigger pending action (unlock current image)
            if (AuthState.pendingAction) {
                AuthState.pendingAction();
                AuthState.pendingAction = null;
            }
        } catch (err) {
            showToast('支付失败: ' + err.message, 'error');
        }
    });
}

/* ============================================
   TOAST NOTIFICATIONS
   ============================================ */
function showToast(message, type = 'info') {
    const existing = document.getElementById('ssai-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'ssai-toast';
    const colors = {
        success: 'bg-green-600',
        error: 'bg-error',
        info: 'bg-primary',
    };
    toast.className = `fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full text-white font-label-bold text-label-bold shadow-lg ${colors[type] || colors.info} animate-in`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/* ============================================
   LOGOUT
   ============================================ */
async function handleLogout() {
    try {
        await apiCall('POST', '/api/auth/logout');
    } catch (e) {}
    AuthState.user = null;
    AuthState.entitlements = null;
    AuthState.isLoggedIn = false;
    location.reload();
}

/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    initComparisonSliders();
    initFaqAccordion();
    initToggles();
    initRatioButtons();
    initFilterChips();
    initSceneSelection();
    initTabs();
    initCreationFlow();
    initUploadZone();
    initScrollReveal();
    initNavbarScroll();
    initCountUp();
    initAuth();
});
