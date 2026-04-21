import type { Category } from './types'

/**
 * 全站分类 & 子项数据源。
 * 新增内容只需在对应分类的 items[] 里 push 一项。
 *
 * status: live 已上线 / dev 开发中 / plan 规划中
 * accent: sky / amber / rose / emerald / violet / cyan
 * to:     React Router 内部路径（推荐）
 * href:   站外链接
 */
export const CATEGORIES: Record<string, Category> = {
  // ================ 📖 成长日记 ================
  growth: {
    id: 'growth',
    title: '成长日记',
    subtitle: 'Growth Diary',
    desc: '身高、体重、第一颗牙、第一句话……把每个小小里程碑都好好记下来。',
    icon: 'ri-book-2-line',
    emoji: '📖',
    accent: 'amber',
    items: [
      {
        id: 'milestones',
        title: '瑷暄记录 · 人生第一次',
        subtitle: "Xuanxuan's First Times",
        desc: '名字由来 + 从 2024.4.19 出生到现在的每一次第一次：第一次翻身、第一次叫妈妈、第一次走路、第一次吹蜡烛……',
        cover: '🌷',
        date: '2024-04-19',
        tags: ['里程碑', '名字由来', '时间线'],
        status: 'live',
        to: '/growth/milestones'
      },
      {
        id: 'growth-curve',
        title: '成长曲线',
        subtitle: 'Growth Curve',
        desc: '身高体重按月记录，和标准曲线对比一下。',
        cover: '📈',
        date: '2024-04-01',
        tags: ['数据'],
        status: 'plan'
      }
    ]
  },

  // ================ 🏖️ 旅行路书 ================
  travel: {
    id: 'travel',
    title: '旅行路书',
    subtitle: 'Travel Guidebooks',
    desc: '每一次家庭出行的完整路书：路线、住宿、贴士清单，都被好好收藏在这里。',
    icon: 'ri-road-map-fill',
    emoji: '🏖️',
    accent: 'sky',
    items: [
      {
        id: '2026-labor-day',
        title: '五一 · 北戴河 → 盘锦',
        subtitle: '三代同堂 · 暄暄第一次看海',
        desc: '4天3晚自驾露营，追海风、数星辰、看红海滩。从帝都到渤海之滨的亲子启蒙之旅。',
        cover: '🌊',
        date: '2026-04-29',
        duration: '4天3晚',
        location: '北戴河 / 盘锦',
        tags: ['自驾', '亲子', '露营', '海边'],
        status: 'live',
        to: '/travel/2026-labor-day'
      },
      {
        id: '2026-national-day',
        title: '国庆 · 待定',
        subtitle: 'Coming soon',
        desc: '十一长假的下一次冒险，目的地还在全家投票中……',
        cover: '🎋',
        date: '2026-10-01',
        duration: '待定',
        location: '待定',
        tags: ['计划中'],
        status: 'plan'
      }
    ]
  },

  // ================ 🖼️ 家庭相册 ================
  album: {
    id: 'album',
    title: '家庭相册',
    subtitle: 'Family Album',
    desc: '按时间 / 相册筛选的家庭照片集，照片本地处理后直接进仓库，全站零成本托管。',
    icon: 'ri-gallery-line',
    emoji: '🖼️',
    accent: 'cyan',
    items: [
      {
        id: 'all-albums',
        title: '全部相册',
        subtitle: 'All Albums',
        desc: '按年份 / 相册浏览所有家庭照片。',
        cover: '🗂️',
        date: '2024-04-19',
        tags: ['照片'],
        status: 'live',
        to: '/album'
      }
    ]
  },

  // ================ 📱 亲子小程序 ================
  'mini-programs': {
    id: 'mini-programs',
    title: '亲子小程序',
    subtitle: 'Mini Programs',
    desc: '爸爸亲手写的小程序合集：给爱人和孩子用的菜谱、给孩子用的启蒙游戏，藏着满满心意。',
    icon: 'ri-smartphone-line',
    emoji: '📱',
    accent: 'violet',
    items: [
      {
        id: 'princess-please-eat',
        title: '公主请吃',
        subtitle: 'Princess, Please Eat',
        desc: '给爱人和孩子的家庭菜谱小程序：翻翻今日菜单、点上最想吃的那道，爸爸掌勺伺候～',
        cover: '🍱',
        date: '2026-04-20',
        tags: ['菜谱', '点菜', '家庭'],
        status: 'dev'
      },
      {
        id: 'colors',
        title: '认颜色小能手',
        subtitle: 'Color Explorer',
        desc: '通过卡通动物 + 颜色配对，帮宝贝快乐认识 12 种基本颜色。',
        cover: '🎨',
        date: '2026-06-01',
        tags: ['启蒙', '0-3岁'],
        status: 'dev'
      },
      {
        id: 'shapes',
        title: '形状消消乐',
        subtitle: 'Shape Match',
        desc: '把相同形状拖到一起，训练小小手眼协调能力。',
        cover: '🔺',
        date: '2026-07-01',
        tags: ['手眼协调'],
        status: 'plan'
      }
    ]
  },

  // ================ 🎮 家庭游戏厅 ================
  games: {
    id: 'games',
    title: '家庭游戏厅',
    subtitle: 'Family Arcade',
    desc: '爸爸手写的小游戏合集：记忆翻翻乐、贪吃小恐龙、亲子问答……周末全家上场。',
    icon: 'ri-gamepad-line',
    emoji: '🎮',
    accent: 'rose',
    items: [
      {
        id: 'memory-flip',
        title: '记忆翻翻乐',
        subtitle: 'Memory Flip',
        desc: '经典配对小游戏，翻开卡片找出一样的图案，全家比拼记忆力。',
        cover: '🃏',
        date: '2026-05-10',
        tags: ['记忆', '亲子'],
        status: 'dev'
      },
      {
        id: 'dino-run',
        title: '贪吃小恐龙',
        subtitle: 'Dino Run',
        desc: '小朋友点头 / 长辈点按钮，一起跳过障碍物，看看谁能跑最远。',
        cover: '🦖',
        date: '2026-06-20',
        tags: ['反应', '轻操作'],
        status: 'plan'
      },
      {
        id: 'family-quiz',
        title: '我们家问答赛',
        subtitle: 'Family Quiz',
        desc: '关于家人的趣味问答：奶奶的拿手菜是什么？爸爸最怕的动物？',
        cover: '❓',
        date: '2026-08-01',
        tags: ['派对', '三代同堂'],
        status: 'plan'
      }
    ]
  }
}

/** 首页展示顺序：成长日记 → 旅行路书 → 家庭相册 → 小程序 → 游戏厅 */
export const CATEGORY_ORDER = ['growth', 'travel', 'album', 'mini-programs', 'games']

export function getOrderedCategories(): Category[] {
  const ordered = CATEGORY_ORDER.map(id => CATEGORIES[id]).filter(Boolean)
  // 兜底：把未在 ORDER 里声明的分类追加到末尾
  const rest = Object.values(CATEGORIES).filter(c => !CATEGORY_ORDER.includes(c.id))
  return [...ordered, ...rest]
}
