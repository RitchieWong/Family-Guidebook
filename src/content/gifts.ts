/**
 * 暄暄收到的礼物清单
 * -----------------------------------------------------------
 * 把亲朋好友送暄暄的礼物都记下来，记得是谁的心意 💝
 *
 * 新增：直接在 GIFTS 数组里 push 一条。
 *   - date: 收到礼物的日期 YYYY-MM-DD
 *   - from: 送礼物的人
 *   - name: 礼物名称
 *   - emoji: 展示用小图标
 *   - occasion?: 场合（百天/周岁/生日/过年/随手礼 等）
 *   - desc?: 备注/故事
 *   - category: 分类（便于筛选）
 */

export type GiftCategory = '衣物' | '玩具' | '金饰' | '红包' | '书籍' | '食品' | '出行' | '其他'

export interface Gift {
  date: string
  from: string
  name: string
  emoji: string
  category: GiftCategory
  occasion?: string
  desc?: string
  /** 是否特别珍藏的礼物（会高亮） */
  highlight?: boolean
}

export const GIFTS: Gift[] = [
  // ------------- 出生 & 满月 -------------
  {
    date: '2024-04-19',
    from: '爷爷 奶奶',
    name: '金手镯 · 一对',
    emoji: '💍',
    category: '金饰',
    occasion: '出生贺礼',
    desc: '爷爷奶奶早早备下的见面礼，刻着「平安」二字。',
    highlight: true,
  },
  {
    date: '2024-04-19',
    from: '姥姥 姥爷',
    name: '金锁 · 长命百岁',
    emoji: '🔐',
    category: '金饰',
    occasion: '出生贺礼',
    desc: '姥姥亲手挑的，希望暄暄一世平安。',
    highlight: true,
  },
  {
    date: '2024-05-19',
    from: '大姨一家',
    name: '新生儿连体衣套装',
    emoji: '👶',
    category: '衣物',
    occasion: '满月',
  },
  {
    date: '2024-05-19',
    from: '爸爸的同事们',
    name: '尿不湿 & 湿巾大礼包',
    emoji: '🧻',
    category: '其他',
    occasion: '满月',
    desc: '办公室凑的心意，解决了新手爸妈最大的消耗品烦恼。',
  },

  // ------------- 百天 -------------
  {
    date: '2024-07-28',
    from: '舅舅 舅妈',
    name: '百天纪念银镯',
    emoji: '🎀',
    category: '金饰',
    occasion: '百天',
    highlight: true,
  },
  {
    date: '2024-07-28',
    from: '姑姑',
    name: '摇铃玩具一套',
    emoji: '🔔',
    category: '玩具',
    occasion: '百天',
  },

  // ------------- 周岁 -------------
  {
    date: '2025-04-19',
    from: '爷爷 奶奶',
    name: '小金鱼吊坠',
    emoji: '🐟',
    category: '金饰',
    occasion: '周岁',
    desc: '"年年有余"，戴一整年。',
    highlight: true,
  },
  {
    date: '2025-04-19',
    from: '姥姥 姥爷',
    name: '红包 · 周岁礼',
    emoji: '🧧',
    category: '红包',
    occasion: '周岁',
  },
  {
    date: '2025-04-19',
    from: '大姨',
    name: '小猪佩奇抓周套装',
    emoji: '🐷',
    category: '玩具',
    occasion: '周岁',
    desc: '抓周那天，暄暄第一把抓的是笔 📝。',
  },
  {
    date: '2025-04-19',
    from: '爸妈的朋友们',
    name: '绘本十件套',
    emoji: '📚',
    category: '书籍',
    occasion: '周岁',
  },

  // ------------- 日常 & 其他 -------------
  {
    date: '2025-10-01',
    from: '东台舅爷一家',
    name: '童装 · 江南小碎花',
    emoji: '👗',
    category: '衣物',
    occasion: '江苏之行',
    desc: '国庆回老家，舅奶亲自挑的布料。',
  },
  {
    date: '2025-12-30',
    from: '爷爷 奶奶',
    name: '保暖羽绒服',
    emoji: '🧥',
    category: '衣物',
    occasion: '过冬',
  },
  {
    date: '2026-01-01',
    from: '姥姥',
    name: '新年压岁红包',
    emoji: '🧧',
    category: '红包',
    occasion: '新年',
  },
  {
    date: '2026-04-19',
    from: '爸爸 妈妈',
    name: '两岁生日蛋糕 + 小推车',
    emoji: '🎂',
    category: '玩具',
    occasion: '两岁生日',
    desc: '暄暄第一次自己吹蜡烛 🕯️，一口气吹灭了两根。',
    highlight: true,
  },
  {
    date: '2026-04-19',
    from: '姑姑 姑父',
    name: '乐高 duplo 农场套装',
    emoji: '🧱',
    category: '玩具',
    occasion: '两岁生日',
  },
]

export const GIFT_CATEGORY_META: Record<GiftCategory, { icon: string; color: string }> = {
  衣物: { icon: 'ri-shirt-line', color: 'bg-rose-50 text-rose-600 ring-rose-200' },
  玩具: { icon: 'ri-bear-smile-line', color: 'bg-amber-50 text-amber-700 ring-amber-200' },
  金饰: { icon: 'ri-vip-crown-line', color: 'bg-yellow-50 text-yellow-700 ring-yellow-200' },
  红包: { icon: 'ri-red-packet-line', color: 'bg-red-50 text-red-600 ring-red-200' },
  书籍: { icon: 'ri-book-2-line', color: 'bg-sky-50 text-sky-700 ring-sky-200' },
  食品: { icon: 'ri-cake-2-line', color: 'bg-pink-50 text-pink-600 ring-pink-200' },
  出行: { icon: 'ri-suitcase-line', color: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  其他: { icon: 'ri-gift-line', color: 'bg-slate-50 text-slate-600 ring-slate-200' },
}
