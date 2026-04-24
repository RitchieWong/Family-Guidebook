import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MEMBERSHIPS,
  PERK_CATEGORY_META,
  memberSummary,
  type Venue,
} from '../content/memberships'

type Filter = 'all' | string

/**
 * 家庭会员 & 权益清单
 * - 移动端：顶部 sticky Tab（按地点筛选）+ 卡片流
 * - 桌面端：2~3 列瀑布
 * - 主题色：emerald（与成长/旅行/相册/小程序区分开）
 */
export default function MembershipsPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const stats = useMemo(() => memberSummary(), [])

  const visibleVenues: Venue[] = useMemo(() => {
    if (filter === 'all') return MEMBERSHIPS
    return MEMBERSHIPS.filter((v) => v.id === filter)
  }, [filter])

  return (
    <div className="bg-[#f2fdf8] min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50" />
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-teal-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-8 md:pt-10 pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-5 flex-wrap">
            <Link
              to="/"
              className="hover:text-emerald-600 inline-flex items-center gap-1"
            >
              <i className="ri-home-4-line" /> 首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">家庭会员</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold mb-3 md:mb-4">
            <i className="ri-vip-line" />
            <span>Memberships · 家里已有的会员 & 福利</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">
            家庭会员 & 权益清单
          </h1>
          <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
            家门口商场的会员卡、每月可以领的赠品、暄暄的免费游玩时段……
            都记在这里，出门前看一眼，别白白浪费别人留给我们的好意。
          </p>

          {/* Stats */}
          <div className="mt-5 md:mt-6 grid grid-cols-3 gap-2 md:gap-3 max-w-md">
            <MiniStat
              value={stats.storeCount}
              label="家店铺"
              color="text-emerald-600"
            />
            <MiniStat
              value={stats.perkCount}
              label="项福利"
              color="text-teal-600"
            />
            <MiniStat
              value={stats.highlightCount}
              label="重点记得领"
              color="text-rose-500"
            />
          </div>
        </div>
      </header>

      {/* Sticky 地点筛选 */}
      <StickyFilterBar
        filter={filter}
        setFilter={setFilter}
        venues={MEMBERSHIPS}
        totalCount={stats.storeCount}
      />

      {/* 内容区：按地点分段 */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-8 md:py-10 space-y-10 md:space-y-12">
        {visibleVenues.map((venue) => (
          <VenueBlock key={venue.id} venue={venue} />
        ))}

        {visibleVenues.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            这里还没有记录～
          </div>
        )}
      </section>

      {/* 底部温馨提示 */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 pb-16">
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-emerald-400 via-teal-400 to-sky-400 text-white text-center shadow-lg">
          <div className="text-4xl mb-3">🎁</div>
          <p className="text-base md:text-lg font-bold leading-relaxed">
            会员不是冰冷的卡，
            <br />
            是商家记得我们、我们也好好用起来的「小默契」。
          </p>
        </div>
      </section>
    </div>
  )
}

/* ============================================================
 * 一个地点 section：地点标题 + 该地点下所有店铺卡片
 * ============================================================ */
function VenueBlock({ venue }: { venue: Venue }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="text-3xl md:text-4xl">{venue.emoji}</div>
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
            {venue.name}
          </h2>
          {venue.subtitle && (
            <div className="text-xs md:text-sm text-slate-500 mt-0.5">
              {venue.subtitle}
            </div>
          )}
        </div>
      </div>
      {venue.desc && (
        <p className="text-sm text-slate-500 leading-relaxed mb-4 md:mb-5">
          {venue.desc}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {venue.stores.map((store, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl p-4 md:p-5 ring-1 ring-slate-200 hover:ring-emerald-300 hover:-translate-y-0.5 transition-all shadow-sm"
          >
            {/* 店铺头 */}
            <header className="flex items-start gap-3 mb-3">
              <div className="text-2xl md:text-3xl shrink-0 leading-none">
                {store.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-slate-800 leading-snug">
                  {store.name}
                </h3>
                {store.location && (
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    <i className="ri-map-pin-line mr-0.5" />
                    {store.location}
                  </div>
                )}
                {store.desc && (
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {store.desc}
                  </p>
                )}
              </div>
            </header>

            {/* 权益列表 */}
            <ul className="space-y-2">
              {store.perks.map((p, i) => {
                const meta = PERK_CATEGORY_META[p.category]
                return (
                  <li
                    key={i}
                    className={`relative rounded-xl p-3 ring-1 transition ${
                      p.highlight
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50/70 ring-emerald-200'
                        : 'bg-slate-50/60 ring-slate-100'
                    }`}
                  >
                    {p.highlight && (
                      <span className="absolute -top-2 -right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow">
                        ★ 别忘
                      </span>
                    )}
                    <div className="flex items-start gap-2">
                      <div className="text-xl shrink-0 leading-none">
                        {p.emoji}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-slate-800">
                            {p.title}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ring-1 ${meta.color}`}
                          >
                            <i className={meta.icon} />
                            {p.category}
                          </span>
                        </div>
                        {p.rule && (
                          <div className="mt-1 text-[11px] text-emerald-700 font-medium inline-flex items-center gap-1">
                            <i className="ri-time-line" />
                            {p.rule}
                          </div>
                        )}
                        {p.note && (
                          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            {p.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </div>
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
          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-sm'
          : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

/**
 * 顶部 sticky 筛选栏（与 Gifts 页保持风格一致）
 */
function StickyFilterBar({
  filter,
  setFilter,
  venues,
  totalCount,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  venues: Venue[]
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
            className="shrink-0 flex items-center gap-1 text-slate-500 text-xs md:text-sm hover:text-emerald-600 whitespace-nowrap"
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
              {venues.map((v) => (
                <TabBtn
                  key={v.id}
                  active={filter === v.id}
                  onClick={() => setFilter(v.id)}
                  innerRef={(el) => (itemRefs.current[v.id] = el)}
                >
                  <span>{v.emoji}</span>
                  <span>{v.name}</span>
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
