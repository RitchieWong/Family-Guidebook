import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FUTURE_HOME_ZONES,
  PRIORITY_META,
  futureHomeSummary,
  type Wish,
  type WishPriority,
  type Zone,
} from '../content/future-home'

type ZoneFilter = 'all' | string
type PriorityFilter = 'all' | WishPriority

/**
 * 「未来的家」构思路书
 * - Hero：玫瑰 / 暖橙渐变 + 总览数据
 * - Sticky：按分区筛选 tab
 * - 内容：分区分块，每块下卡片展示心愿条，高亮"必须有"
 */
export default function FutureHomePage() {
  const [zoneFilter, setZoneFilter] = useState<ZoneFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')

  const stats = useMemo(() => futureHomeSummary(), [])

  const visibleZones: Zone[] = useMemo(() => {
    let zones =
      zoneFilter === 'all'
        ? FUTURE_HOME_ZONES
        : FUTURE_HOME_ZONES.filter((z) => z.id === zoneFilter)

    if (priorityFilter !== 'all') {
      zones = zones
        .map((z) => ({
          ...z,
          wishes: z.wishes.filter((w) => w.priority === priorityFilter),
        }))
        .filter((z) => z.wishes.length > 0)
    }
    return zones
  }, [zoneFilter, priorityFilter])

  return (
    <div className="bg-[#fff8f4] min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-100" />
        <div className="absolute -top-16 -right-10 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -right-6 -bottom-8 text-[180px] md:text-[220px] leading-none opacity-15 select-none pointer-events-none rotate-[-8deg]">
          🏡
        </div>

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-8 md:pt-10 pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-5 flex-wrap">
            <Link
              to="/"
              className="hover:text-rose-600 inline-flex items-center gap-1"
            >
              <i className="ri-home-4-line" /> 首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">未来的家</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-rose-200 text-rose-700 text-xs font-semibold mb-3 md:mb-4">
            <i className="ri-home-heart-line" />
            <span>Future Home · 我们对家的所有期待</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">
            未来的家 · 构思清单
          </h1>
          <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
            还在画图纸的阶段，但每一个小心愿都先记下来：
            <br className="hidden md:block" />
            装修、选家具、换家电之前，都来这里翻一翻，别落下任何一个。
          </p>

          {/* Stats */}
          <div className="mt-5 md:mt-6 grid grid-cols-4 gap-2 md:gap-3 max-w-xl">
            <MiniStat
              value={stats.zoneCount}
              label="个分区"
              color="text-amber-600"
            />
            <MiniStat
              value={stats.mustCount}
              label="必须有"
              color="text-rose-500"
            />
            <MiniStat
              value={stats.wantCount}
              label="想要有"
              color="text-amber-700"
            />
            <MiniStat
              value={stats.niceCount}
              label="锦上添花"
              color="text-sky-600"
            />
          </div>
        </div>
      </header>

      {/* Sticky 分区筛选 */}
      <StickyFilterBar
        filter={zoneFilter}
        setFilter={setZoneFilter}
        zones={FUTURE_HOME_ZONES}
        totalCount={stats.total}
      />

      {/* 优先级二级筛选 */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pt-6 md:pt-8">
        <div className="flex items-center gap-2 flex-wrap text-xs md:text-sm">
          <span className="text-slate-500 mr-1">优先级：</span>
          <PrioritySegment
            active={priorityFilter === 'all'}
            onClick={() => setPriorityFilter('all')}
            label={`全部 · ${stats.total}`}
          />
          <PrioritySegment
            active={priorityFilter === 'must'}
            onClick={() => setPriorityFilter('must')}
            label={`⭐ 必须 · ${stats.mustCount}`}
            color="rose"
          />
          <PrioritySegment
            active={priorityFilter === 'want'}
            onClick={() => setPriorityFilter('want')}
            label={`💡 想要 · ${stats.wantCount}`}
            color="amber"
          />
          <PrioritySegment
            active={priorityFilter === 'nice'}
            onClick={() => setPriorityFilter('nice')}
            label={`✨ 锦上 · ${stats.niceCount}`}
            color="sky"
          />
        </div>
      </section>

      {/* 内容区 */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-8 md:py-10 space-y-10 md:space-y-12">
        {visibleZones.map((zone) => (
          <ZoneBlock key={zone.id} zone={zone} />
        ))}

        {visibleZones.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            这个筛选下还没有心愿～
          </div>
        )}
      </section>

      {/* 底部温馨提示 */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 pb-16">
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-rose-400 via-orange-400 to-amber-400 text-white text-center shadow-lg">
          <div className="text-4xl mb-3">🏡</div>
          <p className="text-base md:text-lg font-bold leading-relaxed">
            房子是钢筋水泥，
            <br />
            但家是我们一点点亲手攒出来的样子。
          </p>
        </div>
      </section>
    </div>
  )
}

/* ============================================================
 * 一个分区 section：分区标题 + 心愿卡片网格
 * ============================================================ */

const ACCENT_BAR: Record<Zone['accent'], string> = {
  rose: 'from-rose-400 to-pink-300',
  amber: 'from-amber-400 to-orange-300',
  emerald: 'from-emerald-400 to-teal-300',
  sky: 'from-sky-400 to-cyan-300',
  violet: 'from-violet-400 to-fuchsia-300',
  cyan: 'from-cyan-400 to-sky-300',
  slate: 'from-slate-400 to-slate-300',
}

const ACCENT_RING: Record<Zone['accent'], string> = {
  rose: 'hover:ring-rose-300',
  amber: 'hover:ring-amber-300',
  emerald: 'hover:ring-emerald-300',
  sky: 'hover:ring-sky-300',
  violet: 'hover:ring-violet-300',
  cyan: 'hover:ring-cyan-300',
  slate: 'hover:ring-slate-300',
}

function ZoneBlock({ zone }: { zone: Zone }) {
  // 优先级排序：must → want → nice
  const sortedWishes = [...zone.wishes].sort(
    (a, b) => PRIORITY_META[a.priority].rank - PRIORITY_META[b.priority].rank,
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="text-3xl md:text-4xl">{zone.emoji}</div>
        <div className="min-w-0 flex-1">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
            {zone.name}
            <span className="ml-2 text-xs md:text-sm font-medium text-slate-400">
              · {zone.wishes.length} 项
            </span>
          </h2>
          {zone.subtitle && (
            <div className="text-xs md:text-sm text-slate-500 mt-0.5">
              {zone.subtitle}
            </div>
          )}
        </div>
      </div>
      {zone.desc && (
        <p className="text-sm text-slate-500 leading-relaxed mb-4 md:mb-5">
          {zone.desc}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {sortedWishes.map((w, i) => (
          <WishCard key={i} wish={w} accent={zone.accent} />
        ))}
      </div>
    </div>
  )
}

function WishCard({ wish, accent }: { wish: Wish; accent: Zone['accent'] }) {
  const meta = PRIORITY_META[wish.priority]
  return (
    <article
      className={`relative bg-white rounded-2xl p-4 md:p-5 ring-1 ring-slate-200 ${ACCENT_RING[accent]} hover:-translate-y-0.5 transition-all shadow-sm overflow-hidden`}
    >
      {/* 左侧色条 */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${ACCENT_BAR[accent]}`}
      />

      <header className="flex items-start gap-3 mb-2 pl-1">
        <div className="text-2xl md:text-3xl shrink-0 leading-none">
          {wish.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-slate-800 leading-snug">
              {wish.title}
            </h3>
            <span
              className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${meta.color}`}
            >
              <span>{meta.emoji}</span>
              {meta.label}
            </span>
          </div>
        </div>
      </header>

      {wish.note && (
        <p className="pl-1 text-xs md:text-sm text-slate-500 leading-relaxed">
          {wish.note}
        </p>
      )}

      {wish.tags && wish.tags.length > 0 && (
        <div className="mt-2.5 pl-1 flex flex-wrap gap-1">
          {wish.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 text-slate-500 ring-1 ring-slate-100"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

/* ============================================================
 * 小组件
 * ============================================================ */

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
      <div className={`text-xl md:text-2xl font-black ${color} leading-none`}>
        {value}
      </div>
      <div className="text-[10px] md:text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function PrioritySegment({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean
  onClick: () => void
  label: string
  color?: 'rose' | 'amber' | 'sky'
}) {
  const activeBg =
    color === 'rose'
      ? 'bg-gradient-to-br from-rose-500 to-pink-500'
      : color === 'amber'
        ? 'bg-gradient-to-br from-amber-500 to-orange-500'
        : color === 'sky'
          ? 'bg-gradient-to-br from-sky-500 to-cyan-500'
          : 'bg-gradient-to-br from-slate-700 to-slate-500'

  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1 rounded-full font-semibold transition whitespace-nowrap ${
        active
          ? `${activeBg} text-white shadow-sm`
          : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
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
          ? 'bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-sm'
          : 'text-slate-600 hover:text-rose-600 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

function StickyFilterBar({
  filter,
  setFilter,
  zones,
  totalCount,
}: {
  filter: ZoneFilter
  setFilter: (f: ZoneFilter) => void
  zones: Zone[]
  totalCount: number
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

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
            to="/"
            className="shrink-0 flex items-center gap-1 text-slate-500 text-xs md:text-sm hover:text-rose-600 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" /> 首页
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
              {zones.map((z) => (
                <TabBtn
                  key={z.id}
                  active={filter === z.id}
                  onClick={() => setFilter(z.id)}
                  innerRef={(el) => (itemRefs.current[z.id] = el)}
                >
                  <span>{z.emoji}</span>
                  <span>{z.name}</span>
                </TabBtn>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-12" aria-hidden />
    </>
  )
}
