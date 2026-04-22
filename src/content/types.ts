export type AccentKey = 'sky' | 'amber' | 'rose' | 'emerald' | 'violet' | 'cyan'
export type ItemStatus = 'live' | 'dev' | 'plan'

export interface CategoryItem {
  id: string
  title: string
  subtitle?: string
  desc?: string
  cover?: string
  date?: string
  location?: string
  duration?: string
  tags?: string[]
  status: ItemStatus
  /** 站内路由（React Router hash 路径，不要带 #） */
  to?: string
  /** 若为外部链接，使用 href */
  href?: string
}

export interface Category {
  id: string
  title: string
  subtitle: string
  desc: string
  icon: string
  emoji: string
  /** 可选：AI 生成的高质量分类图标（PNG），优先于 emoji 展示 */
  iconImage?: string
  accent: AccentKey
  items: CategoryItem[]
}

export interface Milestone {
  date: string // YYYY-MM-DD
  age: string
  title: string
  emoji: string
  tag: string
  highlight?: boolean
  desc?: string
  /** 关联的照片 key（暂未启用） */
  photos?: string[]
}

export interface AlbumPhoto {
  /** 文件名（相对相册目录） */
  file: string
  /** 原图路径 相对 /photos/ */
  src: string
  /** 缩略图路径 */
  thumb?: string
  /** 中图路径 */
  medium?: string
  width?: number
  height?: number
  takenAt?: string
  caption?: string
  lat?: number
  lng?: number
}

export interface Album {
  id: string
  title: string
  subtitle?: string
  date: string
  description?: string
  cover: string
  tags?: string[]
  photos: AlbumPhoto[]
}
