import { useMemo, useState } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { BIRTHDAY, MILESTONES, TAG_COLORS } from '../content/milestones'
import { formatDate } from '../content/constants'
import type { Milestone } from '../content/types'
import MobileAnchorFab from '../components/MobileAnchorFab'
import StickyPageNav from '../components/StickyPageNav'

type YearFilter = 'all' | string

export default function MilestonesPage() {
  const [year, setYear] = useState<YearFilter>('all')

  const sorted = useMemo(
    () => [...MILESTONES].sort((a, b) => a.date.localeCompare(b.date)),
    []
  )

  const years = useMemo(() => {
    const set = new Set(sorted.map(m => m.date.slice(0, 4)))
    return Array.from(set).sort()
  }, [sorted])

  const filtered = useMemo(
    () => (year === 'all' ? sorted : sorted.filter(m => m.date.startsWith(year))),
    [year, sorted]
  )

  const stats = useMemo(() => {
    const birth = new Date(BIRTHDAY)
    const now = new Date()
    const days = Math.max(0, Math.floor((now.getTime() - birth.getTime()) / 86400000))
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
    const yearsCount = new Set(MILESTONES.map(x => x.date.slice(0, 4))).size
    return { total: MILESTONES.length, days, age, years: yearsCount }
  }, [])

  return (
    <div>
      {/* 顶部 sticky 二级导航 */}
      <StickyPageNav
        back={{ to: '/category/growth', label: '成长日记' }}
        accent="amber"
        sections={[
          { id: 'hero', label: '出生', emoji: '🌱' },
          { id: 'name', label: '名字', emoji: '🌷' },
          { id: 'stats', label: '数据', emoji: '📊' },
          { id: 'timeline', label: '时间线', emoji: '⏳' },
          ...years.map((y) => ({ id: `y-${y}`, label: `${y} 年`, emoji: '📅' })),
          { id: 'letter', label: '家书', emoji: '💌' },
        ]}
      />

      {/* Hero */}
      <header id="hero" className="relative pt-6 md:pt-10 pb-10 md:pb-16 px-5 md:px-6 overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-fuchsia-50" />
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-rose-300/30 blur-3xl" />
        <div className="absolute top-20 right-10 text-8xl opacity-10 select-none hidden md:block">🌸</div>
        <div className="absolute bottom-10 left-10 text-7xl opacity-10 select-none hidden md:block">👶</div>

        <div className="relative max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-6">
            <Link to="/" className="hover:text-amber-600 transition inline-flex items-center gap-1">
              <i className="ri-home-4-line" />
              首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/category/growth" className="hover:text-amber-600 transition">
              成长日记
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">瑷暄记录</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/70 border border-amber-200 text-amber-700 text-xs md:text-sm font-medium">
              <i className="ri-heart-3-fill" />
              <span>王瑷暄 · 属龙女孩 · 2024 春</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/70 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-medium">
              <i className="ri-plant-line" />
              <span>谷雨时节 · 春生万物</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-6xl font-black leading-tight mb-3 md:mb-5">
            瑷暄记录
            <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
              美好 · 温暖 · 一天天长大
            </span>
          </h1>
          <p className="text-sm md:text-lg text-slate-600 max-w-2xl mb-6 md:mb-8">
            从 2024 年 4 月 19 日清晨 6 点 15 分开始，这个世界多了一个小天使。
            这里是爸爸悄悄写的成长簿 —— 每一次"第一次"，每一个小小的里程碑。
          </p>

          {/* 出生信息 */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
            <BirthCard icon="ri-calendar-event-line" color="text-amber-500" label="出生日期" value="2024.04.19" />
            <BirthCard icon="ri-time-line" color="text-rose-500" label="出生时辰" value="06:15" />
            <BirthCard
              icon="ri-plant-line"
              color="text-emerald-500"
              label="出生时节"
              value="谷雨"
              suffix="· 春六"
            />
            <BirthCard icon="ri-scales-3-line" color="text-fuchsia-500" label="出生体重" value="7.4 斤" />
            <BirthCard icon="ri-ruler-line" color="text-sky-500" label="出生身长" value="52 cm" />
          </div>

          {/* 谷雨小诗签 */}
          <div className="mt-4 md:mt-5 max-w-3xl rounded-2xl bg-white/70 backdrop-blur border border-emerald-100 px-4 md:px-5 py-3 md:py-4 flex items-start gap-3">
            <span className="text-xl md:text-2xl shrink-0">🌾</span>
            <div className="text-xs md:text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-emerald-700">谷雨</span> 是春天的最后一个节气
              ——「雨生百谷」，万物生长、牡丹花开。 2024 年的谷雨是{' '}
              <span className="font-semibold text-slate-800">4 月 19 日</span>
              ，你正好在这一天来到了我们身边，像春末的一场甘雨，被爸妈小心翼翼地接住。
            </div>
          </div>
        </div>
      </header>

      {/* 名字由来 */}
      <section id="name" className="max-w-5xl mx-auto px-5 md:px-6 py-6 md:py-16 scroll-mt-32">
        <div className="mb-3 md:mb-10 text-center">
          <div className="text-[10px] md:text-sm font-semibold text-rose-500 mb-1 md:mb-2 tracking-wider">
            THE STORY OF YOUR NAME
          </div>
          <h2 className="text-xl md:text-4xl font-black">关于你的名字</h2>
          <p className="text-slate-500 mt-0.5 md:mt-2 text-[11px] md:text-base hidden md:block">
            爸爸妈妈给你的第一份礼物
          </p>
        </div>

        {/* 一张大卡：姓名大字 + 音形义 */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 via-rose-50 to-fuchsia-50 border border-white shadow-sm p-4 md:p-10 relative overflow-hidden">
          <div className="absolute top-2 left-2 md:top-4 md:left-4 text-2xl md:text-5xl opacity-20 select-none">🌷</div>
          <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-2xl md:text-5xl opacity-20 select-none">✨</div>

          {/* 姓名大字区 */}
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-3 md:gap-10">
              <NameChar char="王" pinyin="姓" />
              <NameChar char="瑷" pinyin="ài" />
              <NameChar char="暄" pinyin="xuān" />
            </div>
          </div>

          {/* 字音 · 一行独占 */}
          <div className="relative mt-3 md:mt-6 rounded-xl md:rounded-2xl bg-white/70 backdrop-blur ring-1 ring-sky-100 px-3 md:px-5 py-2 md:py-3 flex items-center gap-2 md:gap-3">
            <span className="shrink-0 w-5 h-5 md:w-7 md:h-7 rounded md:rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center text-[10px] md:text-sm">
              <i className="ri-volume-up-line" />
            </span>
            <span className="shrink-0 font-bold text-slate-800 text-xs md:text-base">字音</span>
            <span className="text-slate-300 text-xs">|</span>
            <span className="font-bold text-amber-600 text-sm md:text-lg tracking-wide">
              王 · 爱 · 心园
            </span>
          </div>

          {/* 字义 · 两字分列 */}
          <div className="relative mt-2 md:mt-3 rounded-xl md:rounded-2xl bg-white/70 backdrop-blur ring-1 ring-fuchsia-100 px-3 md:px-5 py-2 md:py-3">
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
              <span className="shrink-0 w-5 h-5 md:w-7 md:h-7 rounded md:rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] md:text-sm">
                <i className="ri-quill-pen-line" />
              </span>
              <span className="shrink-0 font-bold text-slate-800 text-xs md:text-base">字义</span>
            </div>
            <div className="flex items-center gap-4 md:gap-8 pl-7 md:pl-10 text-xs md:text-base text-slate-600">
              <span>
                <span className="text-lg md:text-2xl font-black name-char leading-none mr-1.5 md:mr-2 align-middle">
                  瑷
                </span>
                <span className="align-middle">—— 美好</span>
              </span>
              <span className="text-slate-300">·</span>
              <span>
                <span className="text-lg md:text-2xl font-black name-char leading-none mr-1.5 md:mr-2 align-middle">
                  暄
                </span>
                <span className="align-middle">—— 温暖</span>
              </span>
            </div>
          </div>

          {/* 字形 · 两人结合 */}
          <div className="relative mt-2 md:mt-3 rounded-xl md:rounded-2xl bg-white/70 backdrop-blur ring-1 ring-rose-100 px-3 md:px-5 py-2 md:py-3">
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
              <span className="shrink-0 w-5 h-5 md:w-7 md:h-7 rounded md:rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] md:text-sm">
                <i className="ri-heart-pulse-line" />
              </span>
              <span className="shrink-0 font-bold text-slate-800 text-xs md:text-base">字形</span>
              <span className="text-[10px] md:text-xs text-rose-500 font-semibold">· 两人结合</span>
            </div>
            <div className="pl-7 md:pl-10 space-y-1 md:space-y-1.5 text-xs md:text-base text-slate-600">
              <div className="flex items-baseline gap-2">
                <span className="text-lg md:text-2xl font-black name-char leading-none">瑷</span>
                <span>
                  王字旁 · 同{' '}
                  <span className="text-amber-600 font-semibold">嘉琦</span> 的{' '}
                  <span className="text-amber-600 font-semibold">琦</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg md:text-2xl font-black name-char leading-none">暄</span>
                <span>
                  日字旁 · 同{' '}
                  <span className="text-rose-600 font-semibold">芳晴</span> 的{' '}
                  <span className="text-rose-600 font-semibold">晴</span>
                </span>
              </div>
            </div>
          </div>

          {/* 底部寄语 */}
          <div className="relative mt-3 md:mt-5 text-center text-[11px] md:text-sm text-slate-600 font-medium">
            💕 爸爸 + 妈妈 · 拼出了{' '}
            <span className="font-bold text-rose-600">美好温暖的女孩子</span>
          </div>
        </div>
      </section>

      {/* 数据小盘 */}
      <section id="stats" className="max-w-5xl mx-auto px-5 md:px-6 scroll-mt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon="ri-sparkling-2-line" color="amber" value={stats.total} unit="个" label="被记录的第一次" />
          <StatCard icon="ri-calendar-line" color="rose" value={stats.days} unit="天" label="从出生到今天" />
          <StatCard icon="ri-cake-3-line" color="fuchsia" value={stats.age} unit="岁" label="小人儿现在的年龄" />
          <StatCard icon="ri-leaf-line" color="sky" value={stats.years} unit="年" label="跨越的年份" />
        </div>
      </section>

      {/* 时间线 */}
      <section id="timeline" className="max-w-5xl mx-auto px-5 md:px-6 py-10 md:py-16 scroll-mt-32">
        <div className="mb-6 md:mb-10 text-center">
          <div className="text-xs md:text-sm font-semibold text-amber-500 mb-2 tracking-wider">
            FIRST TIMES · GROWING UP
          </div>
          <h2 className="text-2xl md:text-4xl font-black">成长时间线</h2>
          <p className="text-slate-500 mt-1 md:mt-2 text-xs md:text-base">每一行都是一次"哇塞，你怎么这么厉害"的瞬间</p>
        </div>

        {/* 年份筛选 */}
        <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8 justify-center">
          <YearBtn current={year} value="all" onClick={() => setYear('all')}>
            全部
          </YearBtn>
          {years.map(y => (
            <YearBtn key={y} current={year} value={y} onClick={() => setYear(y)}>
              {y}
            </YearBtn>
          ))}
        </div>

        {/* 左右交替时间线 */}
        <div className="timeline-wrap space-y-6 md:space-y-10 pl-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">这一年还没有记录，再等等～</div>
          ) : (
            renderRows(filtered)
          )}
        </div>
      </section>

      {/* 底部寄语 */}
      <section id="letter" className="max-w-5xl mx-auto px-5 md:px-6 pb-8 md:pb-10 scroll-mt-32">
        <div className="rounded-3xl p-6 md:p-12 bg-gradient-to-br from-amber-400 via-rose-400 to-fuchsia-500 text-white text-center relative overflow-hidden shadow-lg">
          <div className="absolute -top-6 -left-6 text-6xl md:text-8xl opacity-20 select-none">🌷</div>
          <div className="absolute -bottom-6 -right-6 text-6xl md:text-8xl opacity-20 select-none">💌</div>
          <div className="relative">
            <div className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 mb-2 md:mb-3">A Letter From Daddy</div>
            <div className="text-base md:text-2xl font-bold leading-relaxed max-w-2xl mx-auto">
              "暄暄呀，
              <br />
              这里记下来的每一个小小第一次，
              <br />
              都是爸爸妈妈悄悄收起来的宝藏。
              <br />
              你慢慢长，我们慢慢记。"
            </div>
            <div className="mt-4 md:mt-6 text-xs md:text-sm opacity-80">—— 爸爸</div>
          </div>
        </div>
      </section>

      {/* 传送门：照片版里程碑 */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 pb-12 md:pb-16">
        <Link
          to="/album/milestones-xuanxuan"
          className="group block rounded-3xl ring-1 ring-rose-100 bg-white hover:bg-rose-50/50 transition p-5 md:p-8 flex items-center gap-4 md:gap-5"
        >
          <div className="shrink-0 text-4xl md:text-6xl">🌷</div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] md:text-xs tracking-[0.25em] font-semibold text-rose-500 uppercase">
              Photo Edition
            </div>
            <div className="mt-1 text-base md:text-xl font-bold text-slate-800">
              换个方式看暄暄长大 · 5 张照片的家书
            </div>
            <div className="text-xs md:text-sm text-slate-500 mt-1 hidden sm:block">
              出生 · 满月 · 百天 · 周岁 · 两岁，5 张节点照片，5 封给暄暄的小信。
            </div>
          </div>
          <i className="ri-arrow-right-line text-lg md:text-xl text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition" />
        </Link>
      </section>

      <MobileAnchorFab
        title="瑷暄记录"
        anchors={[
          { id: 'hero', label: '顶部 · 出生信息', icon: 'ri-star-line', group: '页面板块' },
          { id: 'name', label: '关于你的名字', icon: 'ri-quill-pen-line', group: '页面板块' },
          { id: 'stats', label: '数据盘', icon: 'ri-bar-chart-2-line', group: '页面板块' },
          { id: 'timeline', label: '成长时间线', icon: 'ri-time-line', group: '页面板块' },
          { id: 'letter', label: '爸爸的信', icon: 'ri-mail-line', group: '页面板块' },
          ...years.map((y) => ({
            id: `y-${y}`,
            label: `${y} 年`,
            icon: 'ri-calendar-line',
            group: '时间线年份',
          })),
        ]}
      />
    </div>
  )
}

/** 渲染左右交替的时间线行（带年份分组） */
function renderRows(items: Milestone[]) {
  const out: ReactElement[] = []
  let lastYear = ''
  items.forEach((m, idx) => {
    const y = m.date.slice(0, 4)
    if (y !== lastYear) {
      out.push(
        <div
          key={`y-${y}`}
          id={`y-${y}`}
          className="flex justify-center mb-2 scroll-mt-32"
        >
          <span className="px-4 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold ring-1 ring-slate-200">
            {y} 年
          </span>
        </div>
      )
      lastYear = y
    }
    const side = idx % 2 === 0 ? 'timeline-row-left' : 'timeline-row-right'
    const tagColor =
      (m.tag && (TAG_COLORS as Record<string, string>)[m.tag]) || 'bg-slate-100 text-slate-600'
    const highlightCls = m.highlight
      ? 'ring-2 ring-amber-200 bg-gradient-to-br from-white to-amber-50'
      : ''
    out.push(
      <div key={`${m.date}-${idx}`} className={`${side} pl-10 md:pl-0`}>
        <span
          className="timeline-dot"
          style={m.highlight ? { borderColor: '#f43f5e' } : undefined}
        />
        <div className={`bubble ${highlightCls}`}>
          <div className="flex items-start gap-3">
            <div className="text-3xl md:text-4xl leading-none shrink-0">{m.emoji}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-[11px] font-bold text-slate-400">{formatDate(m.date)}</span>
                <span className="text-[11px] font-semibold text-slate-500">· {m.age}</span>
                {m.tag && (
                  <span
                    className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-semibold ${tagColor}`}
                  >
                    {m.tag}
                  </span>
                )}
                {m.highlight && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-semibold">
                    ★
                  </span>
                )}
              </div>
              <div className="text-base font-bold text-slate-800 leading-snug">{m.title}</div>
              {m.desc && (
                <div className="text-sm text-slate-500 mt-1 leading-relaxed">{m.desc}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  })
  return out
}

// ============== 子组件 ==============
function BirthCard({
  icon,
  color,
  label,
  value,
  suffix
}: {
  icon: string
  color: string
  label: string
  value: string
  suffix?: string
}) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-white shadow-sm">
      <div className={`${color} text-xl mb-1`}>
        <i className={icon} />
      </div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-bold text-slate-800">
        {value}
        {suffix && <span className="text-xs font-medium text-slate-400 ml-1">{suffix}</span>}
      </div>
    </div>
  )
}

function NameChar({ char, pinyin }: { char: string; pinyin: string }) {
  return (
    <div>
      <div className="text-5xl md:text-9xl font-black name-char leading-none">{char}</div>
      <div className="mt-1.5 md:mt-3 text-[10px] md:text-sm text-slate-500">{pinyin}</div>
    </div>
  )
}

function StatCard({
  icon,
  color,
  value,
  unit,
  label
}: {
  icon: string
  color: 'amber' | 'rose' | 'fuchsia' | 'sky'
  value: number
  unit: string
  label: string
}) {
  const colorMap = {
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
    fuchsia: 'bg-fuchsia-100 text-fuchsia-600',
    sky: 'bg-sky-100 text-sky-600'
  }
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div
        className={`w-10 h-10 rounded-xl ${colorMap[color]} flex items-center justify-center text-xl mb-3`}
      >
        <i className={icon} />
      </div>
      <div className="text-3xl font-black text-slate-800">
        {value}
        <span className="text-base font-semibold text-slate-500 ml-1">{unit}</span>
      </div>
      <div className="text-xs text-slate-500 mt-1">{label}</div>
    </div>
  )
}

function YearBtn({
  value,
  current,
  onClick,
  children
}: {
  value: string
  current: string
  onClick: () => void
  children: ReactNode
}) {
  const active = value === current
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
        active
          ? 'bg-slate-800 text-white shadow'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-amber-600'
      }`}
    >
      {children}
    </button>
  )
}
