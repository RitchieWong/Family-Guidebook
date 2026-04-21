import { useMemo } from 'react'
import { DEPARTURE_AT } from '../../../content/travel-2026-labor-day'

/** Hero 大图 + 行程总览 */
export default function HeroOverview() {
  const daysToGo = useMemo(() => {
    const diff = new Date(DEPARTURE_AT).getTime() - Date.now()
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }, [])

  return (
    <>
      {/* Hero */}
      <header className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-amber-50" />
        <div className="absolute top-20 right-10 text-9xl opacity-10 select-none">🌊</div>
        <div className="absolute bottom-10 left-10 text-8xl opacity-10 select-none">⛺</div>
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-sky-200 text-sky-700 text-sm font-medium mb-6">
            <i className="ri-sparkling-2-fill" />
            <span>
              {daysToGo > 0 ? `距离出发还有 ${daysToGo} 天 · ` : ''}
              2 岁的暄暄 · 三代同堂 · 4天3晚
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            追海风 · 数星辰<br />
            <span className="bg-gradient-to-r from-sky-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
              北戴河 → 盘锦 自驾露营记
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-8">
            从帝都到渤海之滨，再到辽河入海口的红色湿地。一次三代同堂的团聚，一场小小探险家的蓝色启蒙。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            <KeyCard iconCls="text-sky-600" icon="ri-calendar-event-line" label="出行日期" value="4.29 - 5.02" />
            <KeyCard iconCls="text-amber-600" icon="ri-roadster-line" label="总里程" value="约 720 km" />
            <KeyCard iconCls="text-rose-500" icon="ri-group-line" label="出行家庭" value="3 代 · 8 人" />
            <KeyCard iconCls="text-emerald-600" icon="ri-home-heart-line" label="住宿方式" value="民宿 + 露营" />
          </div>
        </div>
      </header>

      {/* 行程总览 */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-semibold text-sky-600 mb-2">ITINERARY OVERVIEW</div>
            <h2 className="text-3xl md:text-4xl font-black">行程总览</h2>
          </div>
          <div className="hidden md:block text-sm text-slate-500">左滑查看每日详情 →</div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-10 mb-8">
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-amber-400 rounded-full" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              <RouteNode iconBg="from-sky-500 to-sky-700" shadow="shadow-sky-200" emoji="🏙️" name="北京" sub="出发地 · 天通苑" tip="4.29 下午取车" tipCls="text-sky-600" />
              <RouteNode iconBg="from-cyan-500 to-sky-600" shadow="shadow-cyan-200" emoji="🌊" name="北戴河" sub="海滨公园住宿" tip="约 320 km · 3.5h" tipCls="text-cyan-600" />
              <RouteNode iconBg="from-emerald-500 to-teal-600" shadow="shadow-emerald-200" emoji="⛺" name="家庭团聚" sub="爷爷/姑姑/哥哥们" tip="5.01 盘锦→北戴河" tipCls="text-emerald-600" />
              <RouteNode iconBg="from-amber-500 to-rose-500" shadow="shadow-amber-200" emoji="🦀" name="盘锦" sub="红海滩 · 还车" tip="约 285 km · 3.2h" tipCls="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <DayPreview href="#day1" badgeCls="bg-sky-50 text-sky-600" border="hover:border-sky-300"
            tag="DAY 1" date="4.29 周三" title="京城出发 · 海边初遇" sub="天通苑取车 → 北戴河民宿"
            footIcon="ri-moon-clear-line" foot="海鲜晚餐·沙滩夜" footCls="text-sky-600" />
          <DayPreview href="#day2" badgeCls="bg-cyan-50 text-cyan-600" border="hover:border-cyan-300"
            tag="DAY 2" date="4.30 周四" title="鸽子窝 · 老虎石" sub="日出观赏 → 海滩玩沙"
            footIcon="ri-sun-line" foot="悠闲亲子日" footCls="text-cyan-600" />
          <DayPreview href="#day3" badgeCls="bg-emerald-50 text-emerald-600" border="hover:border-emerald-300"
            tag="DAY 3" date="5.01 周五" title="家人团聚日 · 露营" sub="爷爷姑姑哥哥从盘锦赶到"
            footIcon="ri-heart-fill" foot="三代同堂团圆" footCls="text-emerald-600" />
          <DayPreview href="#day4" badgeCls="bg-amber-50 text-amber-600" border="hover:border-amber-300"
            tag="DAY 4" date="5.02 周六" title="北戴河惜别 · 回家还车" sub="南戴河游玩 → 海鲜晚餐 → 盘锦到家"
            footIcon="ri-flag-line" foot="满载而归·温柔收尾" footCls="text-amber-600" />
        </div>
      </section>
    </>
  )
}

function KeyCard({ icon, iconCls, label, value }: { icon: string; iconCls: string; label: string; value: string }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-white shadow-sm">
      <div className={`${iconCls} text-2xl mb-1`}><i className={icon} /></div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-bold text-slate-800">{value}</div>
    </div>
  )
}

function RouteNode({ iconBg, shadow, emoji, name, sub, tip, tipCls }: {
  iconBg: string; shadow: string; emoji: string; name: string; sub: string; tip: string; tipCls: string
}) {
  return (
    <div className="text-center">
      <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${iconBg} flex items-center justify-center text-white text-3xl shadow-lg ${shadow}`}>{emoji}</div>
      <div className="mt-3 font-bold">{name}</div>
      <div className="text-xs text-slate-500">{sub}</div>
      <div className={`text-xs mt-1 ${tipCls}`}>{tip}</div>
    </div>
  )
}

function DayPreview({ href, badgeCls, border, tag, date, title, sub, footIcon, foot, footCls }: {
  href: string; badgeCls: string; border: string
  tag: string; date: string; title: string; sub: string
  footIcon: string; foot: string; footCls: string
}) {
  // 站点使用 HashRouter，不能让 <a href="#dayN"> 真的修改 URL hash，
  // 否则会被 HashRouter 当成路由跳走。这里用 JS 平滑滚动到目标元素，
  // 并扣掉主 Nav (64) + 二级导航 (~48) + 呼吸 = 120
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const id = href.replace(/^#/, '')
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group bg-white rounded-2xl p-5 border border-slate-100 ${border} hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${badgeCls}`}>{tag}</span>
        <span className="text-xs text-slate-400">{date}</span>
      </div>
      <div className="font-bold text-lg mb-1">{title}</div>
      <div className="text-sm text-slate-500">{sub}</div>
      <div className={`mt-3 flex items-center gap-2 text-xs font-medium ${footCls}`}>
        <i className={footIcon} /> {foot}
        <i className="ri-arrow-right-line ml-auto group-hover:translate-x-1 transition" />
      </div>
    </a>
  )
}
