import { ITINERARY, STATS } from '../../../content/travel-2025-national-day'
import { scrollToSection } from '../../../utils/scrollToSection'

/** 国庆路书 Hero —— 回顾版，不倒计时 */
export default function HeroOverview() {
  return (
    <>
      {/* Hero */}
      <header className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100 via-amber-50 to-sky-50" />
        <div className="absolute top-20 right-10 text-9xl opacity-10 select-none">🚅</div>
        <div className="absolute bottom-10 left-10 text-8xl opacity-10 select-none">🌾</div>
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-rose-200 text-rose-700 text-sm font-medium mb-6">
            <i className="ri-time-line" />
            <span>已成行 · 2025.10.01 - 10.11 · 11 天 10 晚</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            暄暄 1 岁半<br />
            <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 bg-clip-text text-transparent">
              第一次高铁 · 江南初遇
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-8">
            从北京南到东台，从张家港到苏州。人生的第一次高铁、第一场婚礼、第一座古镇。
            11 天的江苏大环线，装下了暄暄小小童年里最热闹的秋天。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
            <KeyCard iconCls="text-rose-600" icon="ri-calendar-event-line" label="出行日期" value="10.01 - 10.11" />
            <KeyCard iconCls="text-amber-600" icon="ri-road-map-line" label="途经城市" value={`${STATS.cities.length} 座`} />
            <KeyCard iconCls="text-sky-600" icon="ri-train-line" label="交通方式" value="高铁+自驾+飞" />
            <KeyCard iconCls="text-emerald-600" icon="ri-home-heart-line" label="住宿切换" value={`${STATS.hotels} 家酒店`} />
          </div>
        </div>
      </header>

      {/* 行程总览 · 时间线 */}
      <section id="overview" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-sm font-semibold text-rose-600 mb-2">ITINERARY OVERVIEW</div>
            <h2 className="text-3xl md:text-4xl font-black">11 天行程一览</h2>
          </div>
          <div className="hidden md:block text-sm text-slate-500">点击卡片跳转到当日详情 →</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ITINERARY.map((d) => (
            <DayPreview key={d.id} day={d} />
          ))}
        </div>

        {/* 路线图（极简版） */}
        <div className="mt-10 bg-white rounded-3xl shadow-lg border border-slate-100 p-6 md:p-8">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <i className="ri-route-line text-rose-600" />
            路线大环线
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {['北京', '东台', '张家港', '双山岛', '南通', '溧阳', '宜兴', '南浔', '苏州', '北京'].map((c, i, arr) => (
              <span key={c + i} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-full font-medium ${i === 0 || i === arr.length - 1
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-100 text-slate-700'}`}>
                  {c}
                </span>
                {i < arr.length - 1 && <i className="ri-arrow-right-s-line text-slate-400" />}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

/* ---------- 小组件 ---------- */
function KeyCard({ icon, iconCls, label, value }: { icon: string; iconCls: string; label: string; value: string }) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border border-white shadow-sm">
      <div className={`${iconCls} text-2xl mb-1`}><i className={icon} /></div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-bold text-slate-800">{value}</div>
    </div>
  )
}

const ACCENT_CLS: Record<string, { badge: string; border: string; foot: string }> = {
  sky:     { badge: 'bg-sky-50 text-sky-600',         border: 'hover:border-sky-300',     foot: 'text-sky-600' },
  cyan:    { badge: 'bg-cyan-50 text-cyan-600',       border: 'hover:border-cyan-300',    foot: 'text-cyan-600' },
  emerald: { badge: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-300', foot: 'text-emerald-600' },
  amber:   { badge: 'bg-amber-50 text-amber-600',     border: 'hover:border-amber-300',   foot: 'text-amber-600' },
  rose:    { badge: 'bg-rose-50 text-rose-600',       border: 'hover:border-rose-300',    foot: 'text-rose-600' },
  violet:  { badge: 'bg-violet-50 text-violet-600',   border: 'hover:border-violet-300',  foot: 'text-violet-600' },
  indigo:  { badge: 'bg-indigo-50 text-indigo-600',   border: 'hover:border-indigo-300',  foot: 'text-indigo-600' },
  teal:    { badge: 'bg-teal-50 text-teal-600',       border: 'hover:border-teal-300',    foot: 'text-teal-600' },
  orange:  { badge: 'bg-orange-50 text-orange-600',   border: 'hover:border-orange-300',  foot: 'text-orange-600' },
  pink:    { badge: 'bg-pink-50 text-pink-600',       border: 'hover:border-pink-300',    foot: 'text-pink-600' },
}

function DayPreview({ day }: { day: { id: string; date: string; weekday: string; title: string; subtitle: string; accent: string; highlight: string } }) {
  const cls = ACCENT_CLS[day.accent] ?? ACCENT_CLS.sky
  const onClick = (e: React.MouseEvent) => scrollToSection(e, day.id)
  return (
    <a
      href={`#${day.id}`}
      onClick={onClick}
      className={`group bg-white rounded-2xl p-5 border border-slate-100 ${cls.border} hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${cls.badge}`}>{day.id.toUpperCase().replace('DAY', 'DAY ')}</span>
        <span className="text-xs text-slate-400">{day.date} · {day.weekday}</span>
      </div>
      <div className="font-bold text-base mb-1 line-clamp-1">{day.title}</div>
      <div className="text-xs text-slate-500 line-clamp-2 min-h-[2rem]">{day.subtitle}</div>
      <div className={`mt-3 flex items-center gap-2 text-xs font-medium ${cls.foot}`}>
        <i className="ri-sparkling-line" />
        <span className="line-clamp-1">{day.highlight}</span>
        <i className="ri-arrow-right-line ml-auto group-hover:translate-x-1 transition flex-shrink-0" />
      </div>
    </a>
  )
}
