/**
 * 暄暄成长里程碑 · 5 张关键节点照片
 * -----------------------------------------------------------
 * 出生 → 满月 → 百天 → 周岁 → 2 岁
 *
 * 照片约定（见 milestone-source/README.txt）：
 *   每个节点一个子文件夹，子文件夹里 `主图.xxx` 作为主图，
 *   其余图按文件名排序进画廊。跑 `npm run build-milestone-photos`
 *   会自动生成 cover/ cover-thumb/ cover-src/ gallery/<id>/ 三档 webp。
 *
 * 代码侧下方 MILESTONE_STORIES 的 image / gallery 字段由数据驱动，
 * 文件不存在时页面优雅降级到 emoji 占位。
 */

export interface GalleryPhoto {
  /** 缩略图（320px） */
  thumb: string
  /** 列表主图（800px） */
  medium: string
  /** 原尺寸（lightbox） */
  src: string
}

export interface MilestoneStory {
  id: 'birth' | 'full-month' | 'hundred-days' | 'one-year' | 'two-years'
  order: number
  stage: string
  stageEn: string
  date: string
  age: string
  season: string
  stats: {
    weight?: string
    height?: string
    extras?: Array<{ icon: string; label: string; value: string }>
  }
  /** 主图（1280px medium），undefined 时页面降级为 fallbackEmoji */
  image?: string
  /** 主图 lightbox 大图 */
  imageSrc?: string
  /** 画廊图（按拍摄/命名顺序），为空数组即不渲染画廊 */
  gallery: GalleryPhoto[]
  fallbackEmoji: string
  accent: 'rose' | 'amber' | 'emerald' | 'sky' | 'fuchsia'
  title: string
  letter: string
  linkedDates?: string[]
}

export const MILESTONE_ALBUM_META = {
  id: 'milestones-xuanxuan',
  title: '暄暄成长里程碑',
  subtitle: 'The First 730 Days',
  description:
    '出生、满月、百天、周岁、两岁 —— 5 张主图，5 封给暄暄的信，还有一路走来的那些瞬间。',
  date: '2024-04-19',
}

/** 生成某节点的画廊图引用数组（脚本按 01/02/... 命名） */
function gallery(id: MilestoneStory['id'], count: number): GalleryPhoto[] {
  const base = `/photos/milestones-xuanxuan/gallery/${id}`
  return Array.from({ length: count }, (_, i) => {
    const seq = String(i + 1).padStart(2, '0')
    return {
      thumb: `${base}/${seq}-thumb.webp`,
      medium: `${base}/${seq}-medium.webp`,
      src: `${base}/${seq}-src.webp`,
    }
  })
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
    image: '/photos/milestones-xuanxuan/cover/birth.webp',
    imageSrc: '/photos/milestones-xuanxuan/cover-src/birth.webp',
    gallery: gallery('birth', 0),
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
    image: '/photos/milestones-xuanxuan/cover/full-month.webp',
    imageSrc: '/photos/milestones-xuanxuan/cover-src/full-month.webp',
    gallery: gallery('full-month', 5),
    fallbackEmoji: '🌸',
    accent: 'amber',
    title: '这是——我们',
    letter:
      '第一个月过得像一场没有喘息的接力：每两小时一喂、脏尿布永远在补仓、你把夜和昼揉在一起，我们也跟着你把时差调乱了。但某天早上你突然看着妈妈，眯起眼睛笑了一下——那一下，这一个月就都值了。',
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
    image: '/photos/milestones-xuanxuan/cover/hundred-days.webp',
    imageSrc: '/photos/milestones-xuanxuan/cover-src/hundred-days.webp',
    gallery: gallery('hundred-days', 11),
    fallbackEmoji: '🎉',
    accent: 'fuchsia',
    title: '你会笑了',
    letter:
      '一百天，你完成了好多个「第一次」：第一次追着人影转、第一次想自己抬起小脑袋、第一次咯咯咯地笑出了声。那一刻我和妈妈对视了一下——原来所有夜里哄你的辛苦，都是在等你这一声笑。',
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
    image: '/photos/milestones-xuanxuan/cover/one-year.webp',
    imageSrc: '/photos/milestones-xuanxuan/cover-src/one-year.webp',
    gallery: gallery('one-year', 7),
    fallbackEmoji: '🎂',
    accent: 'emerald',
    title: '慢慢走 慢慢长',
    letter:
      '又一个谷雨。翻身、坐、爬、叫妈妈、扶站，一年里你把所有大人看起来轻而易举的事都当作宝藏认真解锁了一遍。这个月 17 号，你突然放开大人的手，踉跄着走了 4 步——从那天起，追你就变成了爸爸妈妈的日常运动。',
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
    image: '/photos/milestones-xuanxuan/cover/two-years.webp',
    imageSrc: '/photos/milestones-xuanxuan/cover-src/two-years.webp',
    gallery: gallery('two-years', 18),
    fallbackEmoji: '🌼',
    accent: 'sky',
    title: '小小人儿的大大世界',
    letter:
      '会数到 10、会吹蜡烛、会自己坐小马桶、第一次露营、第一次上托班。两年前那个 3.7 公斤的小不点儿，现在会拽着爸爸的手、指着门口说：「走！」世界那么大，你迫不及待想替我们再去看一遍。',
    linkedDates: ['2026-03-10', '2026-04-12', '2026-04-13'],
  },
]

export const SEASON_BADGE: Record<MilestoneStory['accent'], string> = {
  rose: 'bg-rose-50 text-rose-600 ring-rose-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
}

export const STORY_BG: Record<MilestoneStory['accent'], string> = {
  rose: 'from-rose-50 via-white to-pink-50',
  amber: 'from-amber-50 via-white to-orange-50',
  emerald: 'from-emerald-50 via-white to-teal-50',
  sky: 'from-sky-50 via-white to-cyan-50',
  fuchsia: 'from-fuchsia-50 via-white to-pink-50',
}

