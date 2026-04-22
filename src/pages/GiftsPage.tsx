import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GIFTS, GIFT_CATEGORY_META, type GiftCategory } from '../content/gifts'
import { formatDate } from '../content/constants'

type Filter = 'all' | GiftCategory

/**
 * 暄暄收到的礼物清单
 * - 移动端默认卡片流 + 顶部分类 tab，省滑屏
 * - 桌面端 3 列瀑布，信息量大
 */
export default function GiftsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const sorted = useMemo(
    () => [...GIFTS].sort((a, b) => b.date.localeCompare(a.date)),
    []
  )

  const categories = useMemo(() => {
    const count: Record<string, number> = {}
    sorted.forEach((g) => (count[g.category] = (count[g.category] || 0) + 1))
    return Object.keys(count) as GiftCategory[]
  }, [sorted])

  const filtered = useMemo(
    () => (filter === 'all' ? sorted : sorted.filter((g) => g.category === filter)),
    [filter, sorted]
  )

  const stats = useMemo(() => {
    const fromSet = new Set(sorted.map((g) => g.from))
    const highlight = sorted.filter((g) => g.highlight).length
    return { total: sorted.length, fromCount: fromSet.size, highlight }
  }, [sorted])

  return (
    <div className="bg-[#fff7f2] min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50" />
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-8 md:pt-10 pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-5 flex-wrap">
            <Link to="/" className="hover:text-rose-600 inline-flex items-center gap-1">
              <i className="ri-home-4-line" /> 首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/category/growth" className="hover:text-rose-600">
              成长日记
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">暄暄的礼物</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-rose-200 text-rose-700 text-xs font-semibold mb-3 md:mb-4">
            <i className="ri-gift-2-fill" />
            <span>Gifts · 来自全家的心意</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">
            暄暄收到的礼物
          </h1>
          <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
            爷爷奶奶、姥姥姥爷、叔叔阿姨、哥哥姐姐……
            每一份礼物背后，都是惦记着你的一颗心。
          </p>

          {/* Stats */}
          <div className="mt-5 md:mt-6 grid grid-cols-3 gap-2 md:gap-3 max-w-md">
            <MiniStat value={stats.total} label="件礼物" color="text-rose-600" />
            <MiniStat value={stats.fromCount} label="位送礼人" color="text-amber-600" />
            <MiniStat value={stats.highlight} label="特别珍藏" color="text-fuchsia-600" />
          </div>
        </div>
      </header>

      {/* Filter tabs - sticky on mobile（和全站导航风格统一：无滚动条 + 激活居中 + 主题胶囊） */}
      <StickyFilterBar
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        totalCount={sorted.length}
      />

      {/* Gift list */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((g, i) => {
            const meta = GIFT_CATEGORY_META[g.category]
            return (
              <article
                key={i}
                className={`relative bg-white rounded-2xl p-4 md:p-5 ring-1 ring-slate-200 hover:ring-rose-300 hover:-translate-y-0.5 transition-all shadow-sm ${
                  g.highlight ? 'ring-rose-200 bg-gradient-to-br from-white to-rose-50/60' : ''
                }`}
              >
                {g.highlight && (
                  <span className="absolute -top-2 -right-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-rose-500 text-white shadow">
                    ★ 珍藏
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className="text-3xl md:text-4xl shrink-0 leading-none">{g.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[11px] text-slate-400">{formatDate(g.date)}</span>
                      {g.occasion && (
                        <span className="text-[11px] text-slate-500">· {g.occasion}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-800 leading-snug">{g.name}</h3>
                    <div className="mt-1 text-xs text-rose-600 font-medium inline-flex items-center gap-1">
                      <i className="ri-heart-line" />
                      {g.from}
                    </div>
                    {g.desc && (
                      <p className="mt-2 text-xs md:text-sm text-slate-500 leading-relaxed">
                        {g.desc}
                      </p>
                    )}
                    <span
                      className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${meta.color}`}
                    >
                      <i className={meta.icon} />
                      {g.category}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">这一类还没有记录～</div>
        )}
      </section>

      {/* Footer note */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 pb-16">
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 text-white text-center shadow-lg">
          <div className="text-4xl mb-3">💝</div>
          <p className="text-base md:text-lg font-bold leading-relaxed">
            每一份礼物都是一句悄悄话：
            <br />
            「暄暄呀，我们都很爱你。」
          </p>
        </div>
      </section>
    </div>
  )
}

function MiniStat({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-xl md:rounded-2xl p-2.5 md:p-3 border border-white shadow-sm text-center">
      <div className={`text-xl md:text-2xl font-black ${color} leading-none`}>{value}</div>
      <div className="text-[10px] md:text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function TabBtn({
  active,
  onClick,
  innerRef,
  children,
}: {
  active: boolean
  onClick: () => void
  innerRef?: (el: HTMLButtonElement | null) => void
  children: React.ReactNode
}) {
  return (
    <button
      ref={innerRef}
      onClick={onClick}
      className={`shrink-0 px-3 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition flex items-center gap-1 whitespace-nowrap ${
        active
          ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-sm'
          : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

/**
 * Gifts 页的顶部分类筛选栏（fixed 贴在主 Nav 下方，风格与 StickyPageNav 统一）
 * - 无滚动条
 * - 激活项自动水平居中
 * - 主题色胶囊按钮
 */
function StickyFilterBar({
  filter,
  setFilter,
  categories,
  totalCount,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  categories: GiftCategory[]
  totalCount: number
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // 激活变化时把当前项滚到水平中央
  useEffect(() => {
    const el = itemRefs.current[filter]
    const scroller = scrollerRef.current
    if (!el || !scroller) return
    const target = el.offsetLeft + el.offsetWidth / 2 - scroller.clientWidth / 2
    const clamped = Math.max(
      0,
      Math.min(target, scroller.scrollWidth - scroller.clientWidth),
    )
    scroller.scrollTo({ left: clamped, behavior: 'smooth' })
  }, [filter])

  return (
    <>
      <div className="fixed left-0 right-0 top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-3 md:px-6 py-2 flex items-center gap-2 md:gap-3">
          <Link
            to="/category/growth"
            className="shrink-0 flex items-center gap-1 text-slate-500 text-xs md:text-sm hover:text-rose-600 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" /> 成长
          </Link>
          <span className="shrink-0 text-slate-200">|</span>

          <div
            ref={scrollerRef}
            className="flex-1 min-w-0 overflow-x-auto no-scrollbar"
          >
            <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
              <TabBtn
                active={filter === 'all'}
                onClick={() => setFilter('all')}
                innerRef={(el) => (itemRefs.current['all'] = el)}
              >
                全部 · {totalCount}
              </TabBtn>
              {categories.map((c) => {
                const meta = GIFT_CATEGORY_META[c]
                return (
                  <TabBtn
                    key={c}
                    active={filter === c}
                    onClick={() => setFilter(c)}
                    innerRef={(el) => (itemRefs.current[c] = el)}
                  >
                    <i className={`${meta.icon} text-sm`} />
                    <span>{c}</span>
                  </TabBtn>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* 占位 */}
      <div className="h-12" aria-hidden />
    </>
  )
}
