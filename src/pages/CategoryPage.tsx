import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORIES } from '../content/categories'
import type { CategoryItem, ItemStatus } from '../content/types'
import { STATUS, formatDate } from '../content/constants'

type Filter = 'all' | ItemStatus

/**
 * 分类 Hero 主题（与首页 MobileCategoryGrid 的 CATEGORY_DECOR 风格完全一致）
 *   - softGrad：柔色粉彩渐变（淡 + 饱和中等，避免刺眼）
 *   - titleColor / subColor：深色文字适配浅底
 *   - bg：右下大号淡化装饰 emoji
 *   - corner：插画角落小装饰 emoji
 *   - image：首页同款 AI 水彩小插画
 */
const CATEGORY_HERO_THEME: Record<
  string,
  {
    softGrad: string
    titleColor: string
    subColor: string
    bg: string
    corner: string
    image: string
  }
> = {
  growth: {
    softGrad: 'from-rose-100 via-amber-50 to-orange-100',
    titleColor: 'text-rose-700',
    subColor: 'text-rose-400/80',
    bg: '🌷',
    corner: '✨',
    image: 'icons/categories/growth.png',
  },
  travel: {
    softGrad: 'from-sky-100 via-cyan-50 to-blue-100',
    titleColor: 'text-sky-700',
    subColor: 'text-sky-400/80',
    bg: '☁️',
    corner: '🧳',
    image: 'icons/categories/travel.png',
  },
  album: {
    softGrad: 'from-cyan-100 via-sky-50 to-indigo-100',
    titleColor: 'text-cyan-700',
    subColor: 'text-cyan-400/80',
    bg: '🌈',
    corner: '💕',
    image: 'icons/categories/album.png',
  },
  membership: {
    softGrad: 'from-emerald-100 via-teal-50 to-sky-100',
    titleColor: 'text-emerald-700',
    subColor: 'text-emerald-400/80',
    bg: '🏬',
    corner: '🪪',
    image: 'icons/categories/album.png',
  },
  'mini-programs': {
    softGrad: 'from-violet-100 via-fuchsia-50 to-pink-100',
    titleColor: 'text-violet-700',
    subColor: 'text-violet-400/80',
    bg: '🎨',
    corner: '🧩',
    image: 'icons/categories/mini-programs.png',
  },
}
const CATEGORY_HERO_THEME_FALLBACK = {
  softGrad: 'from-slate-100 via-slate-50 to-slate-100',
  titleColor: 'text-slate-700',
  subColor: 'text-slate-400/80',
  bg: '✨',
  corner: '💫',
  image: 'icons/categories/growth.png',
}

export default function CategoryPage() {
  const { id = '' } = useParams<{ id: string }>()
  const category = CATEGORIES[id]
  const [filter, setFilter] = useState<Filter>('all')

  const items = useMemo(() => {
    if (!category) return []
    const sorted = [...category.items].sort(
      (a, b) => STATUS[a.status].rank - STATUS[b.status].rank
    )
    if (filter === 'all') return sorted
    return sorted.filter(i => i.status === filter)
  }, [category, filter])

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold text-slate-800">找不到这个分类</h1>
        <Link to="/" className="mt-6 inline-block text-sky-600 hover:underline">
          回到首页
        </Link>
      </div>
    )
  }

  const theme = CATEGORY_HERO_THEME[category.id] || CATEGORY_HERO_THEME_FALLBACK

  return (
    <>
      {/* Filters（统一的 Sticky 筛选栏 · fixed top-16 · 无滚动条 · 激活居中）
          放在 Hero 之前渲染，让它的占位 div 把 Hero 往下推 48px，避免 Hero 顶部被 fixed 栏遮挡 */}
      <StickyFilterBar
        filter={filter}
        setFilter={setFilter}
        accent={category.accent}
        totalCount={category.items.length}
        counts={{
          live: category.items.filter((i) => i.status === 'live').length,
          dev: category.items.filter((i) => i.status === 'dev').length,
          plan: category.items.filter((i) => i.status === 'plan').length,
        }}
      />

      {/* Hero · 与首页分类卡同款视觉：柔色粉彩渐变 + 深色文字 + AI 水彩小插画 */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${theme.softGrad}`}
      >
        {/* 顶部白色高光线 */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/70 pointer-events-none" />
        {/* 左上柔光斑 */}
        <div className="absolute -left-10 -top-10 w-56 h-56 rounded-full bg-white/60 blur-3xl pointer-events-none" />
        {/* 右下主题 emoji（淡化背景装饰） */}
        <div className="absolute -right-6 -bottom-8 text-[180px] md:text-[220px] leading-none opacity-20 select-none pointer-events-none rotate-[-8deg]">
          {theme.bg}
        </div>

        <div className="relative max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-7 md:py-12">
          {/* 标题行：AI 水彩小插画替代 emoji，和首页分类卡同款 */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="shrink-0 relative">
              <img
                src={`${import.meta.env.BASE_URL}${theme.image}`}
                alt=""
                aria-hidden
                className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.12)] [mix-blend-mode:multiply]"
              />
              {/* 角落小装饰 emoji */}
              <span className="absolute -top-1 -right-1 text-base md:text-lg drop-shadow-sm">
                {theme.corner}
              </span>
            </div>
            <div className="min-w-0">
              <h1 className={`text-2xl md:text-4xl font-black cute-zh ${theme.titleColor}`}>
                {category.title}
              </h1>
              <p className={`text-[11px] md:text-sm uppercase tracking-wider mt-0.5 ${theme.subColor}`}>
                {category.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-3 md:mt-4 max-w-2xl text-xs md:text-base text-slate-600 leading-relaxed">
            {category.desc}
          </p>
        </div>
      </section>

      {/* List */}
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pt-6 md:pt-8 pb-16 md:pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 xl:gap-5">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-12">
            这里还空空的呢～
          </div>
        )}
      </section>
    </>
  )
}

function ItemCard({ item }: { item: CategoryItem }) {
  const status = STATUS[item.status]
  const clickable = !!(item.to || item.href)

  const body = (
    <>
      <div className="flex items-start justify-between">
        <div className="text-3xl">{item.cover || '✨'}</div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-slate-800">{item.title}</h3>
      {item.subtitle && (
        <div className="text-xs text-slate-500 mt-0.5">{item.subtitle}</div>
      )}
      {item.desc && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {item.desc}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags?.map(t => (
          <span
            key={t}
            className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{formatDate(item.date)}</span>
        {item.location && <span>📍 {item.location}</span>}
      </div>
    </>
  )

  const cls =
    'bg-white rounded-2xl p-5 ring-1 ring-slate-200 shadow-sm block transition'
  const interactive = clickable ? 'hover:-translate-y-0.5 hover:ring-slate-400 hover:shadow-md' : ''

  if (item.to) {
    return (
      <Link to={item.to} className={`${cls} ${interactive}`}>
        {body}
      </Link>
    )
  }
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={`${cls} ${interactive}`}>
        {body}
      </a>
    )
  }
  return <div className={cls}>{body}</div>
}

/* ============================================================
 * 分类页顶部筛选栏（与 StickyPageNav / GiftsPage 同款视觉语言）
 *   - fixed 贴在主 Nav 下方
 *   - 无滚动条 + 激活项自动水平居中
 *   - 按分类主题色上色
 * ============================================================ */
type AccentKey = 'sky' | 'amber' | 'rose' | 'emerald' | 'violet' | 'cyan'

const ACCENT_TAB_MAP: Record<AccentKey, { grad: string; hover: string }> = {
  rose: { grad: 'from-rose-500 to-pink-500', hover: 'hover:text-rose-600' },
  sky: { grad: 'from-sky-500 to-cyan-500', hover: 'hover:text-sky-600' },
  amber: { grad: 'from-amber-500 to-orange-500', hover: 'hover:text-amber-600' },
  emerald: { grad: 'from-emerald-500 to-teal-500', hover: 'hover:text-emerald-600' },
  violet: { grad: 'from-violet-500 to-fuchsia-500', hover: 'hover:text-violet-600' },
  cyan: { grad: 'from-cyan-500 to-blue-500', hover: 'hover:text-cyan-600' },
}

function StickyFilterBar({
  filter,
  setFilter,
  accent,
  totalCount,
  counts,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  accent: AccentKey
  totalCount: number
  counts: Record<ItemStatus, number>
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const a = ACCENT_TAB_MAP[accent]

  useEffect(() => {
    const el = itemRefs.current[filter]
    const scroller = scrollerRef.current
    if (!el || !scroller) return
    // 如果激活项在可视区左半边（比如第一个 tab），把 scroller 归零，
    // 避免被强制居中后视觉上"第一个 tab 漂到中间、第二个看起来更居中"的错觉。
    const elCenter = el.offsetLeft + el.offsetWidth / 2
    if (elCenter <= scroller.clientWidth / 2) {
      scroller.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    const target = elCenter - scroller.clientWidth / 2
    const clamped = Math.max(
      0,
      Math.min(target, scroller.scrollWidth - scroller.clientWidth),
    )
    scroller.scrollTo({ left: clamped, behavior: 'smooth' })
  }, [filter])

  const tabs: Array<{ id: Filter; label: string; icon?: string }> = [
    { id: 'all', label: `全部 · ${totalCount}` },
    { id: 'live', label: `${STATUS.live.label} · ${counts.live}`, icon: 'ri-check-line' },
    { id: 'dev', label: `${STATUS.dev.label} · ${counts.dev}`, icon: 'ri-loader-4-line' },
    { id: 'plan', label: `${STATUS.plan.label} · ${counts.plan}`, icon: 'ri-calendar-line' },
  ]

  return (
    <>
      <div className="fixed left-0 right-0 top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-3 md:px-6 py-2 flex items-center gap-2 md:gap-3">
          <Link
            to="/"
            className={`shrink-0 flex items-center gap-1 text-slate-500 text-xs md:text-sm ${a.hover} whitespace-nowrap`}
          >
            <i className="ri-arrow-left-line" /> 首页
          </Link>
          <span className="shrink-0 text-slate-200">|</span>

          <div
            ref={scrollerRef}
            className="flex-1 min-w-0 overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
              {tabs.map((t) => {
                const isActive = filter === t.id
                return (
                  <button
                    key={t.id}
                    ref={(el) => (itemRefs.current[t.id] = el)}
                    onClick={() => setFilter(t.id)}
                    className={`shrink-0 px-2.5 py-1.5 rounded-full whitespace-nowrap transition flex items-center gap-1 ${
                      isActive
                        ? `bg-gradient-to-br ${a.grad} text-white font-semibold shadow-sm`
                        : `text-slate-600 ${a.hover} hover:bg-slate-50`
                    }`}
                  >
                    {t.icon && <i className={`${t.icon} text-sm`} />}
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 占位：避免被 fixed 筛选栏遮挡 */}
      <div className="h-12" aria-hidden />
    </>
  )
}
