/**
 * 暄暄成长里程碑 · 5 张关键节点照片
 * -----------------------------------------------------------
 * 出生 → 满月 → 百天 → 周岁 → 2 岁
 *
 * 照片约定：
 *   把每个节点的照片放到 public/photos/milestones-xuanxuan/ 下，
 *   文件名以节点 id 打头（如 birth.jpg、full-month.jpg ...），
 *   然后跑 `npm run build-milestone-photos` 会自动生成 thumb/medium/webp。
 *
 * 代码侧只依赖下方 MILESTONE_STORIES 里的 image 字段，文件不存在时
 * 页面会优雅地降级为 emoji 占位，不影响其它节点展示。
 */

export interface MilestoneStory {
  id: 'birth' | 'full-month' | 'hundred-days' | 'one-year' | 'two-years'
  /** 序号 1-5 */
  order: number
  /** 节点中文名 */
  stage: string
  /** 英文小标 */
  stageEn: string
  /** 发生日期 YYYY-MM-DD */
  date: string
  /** 年龄描述（如"出生 · 0 天"） */
  age: string
  /** 节气/季节 */
  season: string
  /** 关键数据 */
  stats: {
    weight?: string // "3.7 kg"
    height?: string // "52 cm"
    /** 其他自由扩展（如牙齿、词汇量） */
    extras?: Array<{ icon: string; label: string; value: string }>
  }
  /** 照片路径（public/ 下相对路径），若为 undefined 页面会用 fallbackEmoji 占位 */
  image?: string
  /** 缺图时的装饰 emoji */
  fallbackEmoji: string
  /** 主题色（用于卡片渐变/节气徽章） */
  accent: 'rose' | 'amber' | 'emerald' | 'sky' | 'fuchsia'
  /** 家书标题（大字手写体） */
  title: string
  /** 家书正文（爸爸口吻，约 80-120 字） */
  letter: string
  /** 关联的已有 milestone 事件日期数组（会从 milestones.ts 聚合显示） */
  linkedDates?: string[]
}

export const MILESTONE_ALBUM_META = {
  id: 'milestones-xuanxuan',
  title: '暄暄成长里程碑',
  subtitle: 'The First 730 Days',
  description:
    '出生、满月、百天、周岁、两岁 —— 5 张照片，5 封给暄暄的信。 每一张都是一次「不敢相信你都这么大了」的瞬间。',
  date: '2024-04-19',
}

export const MILESTONE_STORIES: MilestoneStory[] = [
  {
    id: 'birth',
    order: 1,
    stage: '出生',
    stageEn: 'Day 0',
    date: '2024-04-19',
    age: '出生 · 0 天',
    season: '谷雨',
    stats: {
      weight: '3.7 kg',
      height: '52 cm',
      extras: [{ icon: 'ri-time-line', label: '出生时辰', value: '晨 6:15' }],
    },
    image: '/photos/milestones-xuanxuan/medium/birth.webp',
    fallbackEmoji: '👶',
    accent: 'rose',
    title: '你好呀，小朋友',
    letter:
      '这是你来到世界的第 1 天。外面正下着春天最后一场雨——谷雨，雨生百谷。妈妈的手先握住了你，爸爸的手跟着也伸了过来。你皱着小眉头，像是在认真确认：嗯，这两个人，以后就跟着他们走了。欢迎回家，暄暄。',
    linkedDates: ['2024-04-19'],
  },
  {
    id: 'full-month',
    order: 2,
    stage: '满月',
    stageEn: 'Day 30',
    date: '2024-05-19',
    age: '满月 · 1 个月',
    season: '立夏',
    stats: {
      weight: '—',
      height: '—',
    },
    fallbackEmoji: '🌸',
    accent: 'amber',
    title: '这是——我们',
    letter:
      '照片位待补。你发来满月照之后，爸爸会在这里写下这一个月的故事：夜里每两小时喂一次、你第一次对我笑、你打了一个小小的哈欠、把我和妈妈的心都打化了……',
    linkedDates: [],
  },
  {
    id: 'hundred-days',
    order: 3,
    stage: '百天',
    stageEn: 'Day 100',
    date: '2024-07-28',
    age: '百天 · 3 个月 9 天',
    season: '大暑',
    stats: {
      weight: '—',
      height: '—',
    },
    fallbackEmoji: '🎉',
    accent: 'fuchsia',
    title: '你会笑了',
    letter:
      '照片位待补。这一天你学会了辅助独坐、能短暂支撑着趴一会儿，最厉害的是——你会咯咯咯地笑出声了。所有百天里的辛苦，都值回了这一声笑。',
    linkedDates: ['2024-07-01', '2024-07-28'],
  },
  {
    id: 'one-year',
    order: 4,
    stage: '周岁',
    stageEn: 'Year 1',
    date: '2025-04-19',
    age: '周岁 · 1 岁',
    season: '谷雨（归春）',
    stats: {
      weight: '—',
      height: '—',
    },
    fallbackEmoji: '🎂',
    accent: 'emerald',
    title: '慢慢走 慢慢长',
    letter:
      '照片位待补。又一个谷雨。这一年你学会了翻身、爬、叫妈妈、点头、站起来……到这个月 17 号，你开始自己走路了。从这一天开始，追你变成了爸爸妈妈的日常运动。',
    linkedDates: ['2025-04-26', '2025-05-06'],
  },
  {
    id: 'two-years',
    order: 5,
    stage: '两岁',
    stageEn: 'Year 2',
    date: '2026-04-19',
    age: '两岁 · 2 岁',
    season: '谷雨',
    stats: {
      weight: '—',
      height: '—',
    },
    fallbackEmoji: '🌼',
    accent: 'sky',
    title: '小小人儿的大大世界',
    letter:
      '照片位待补。你已经会数到 10、会吹蜡烛、会自己用小马桶、第一次去露营、第一次上托班。两年前那个 3.7 公斤的小不点儿，现在会拽着爸爸的手说："走！"',
    linkedDates: ['2026-03-10', '2026-04-12', '2026-04-13'],
  },
]

/** 节气徽章配色 */
export const SEASON_BADGE: Record<MilestoneStory['accent'], string> = {
  rose: 'bg-rose-50 text-rose-600 ring-rose-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
}

/** 卡片柔背景 */
export const STORY_BG: Record<MilestoneStory['accent'], string> = {
  rose: 'from-rose-50 via-white to-pink-50',
  amber: 'from-amber-50 via-white to-orange-50',
  emerald: 'from-emerald-50 via-white to-teal-50',
  sky: 'from-sky-50 via-white to-cyan-50',
  fuchsia: 'from-fuchsia-50 via-white to-pink-50',
}
