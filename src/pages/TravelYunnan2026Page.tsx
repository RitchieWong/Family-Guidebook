import StickyPageNav, { type StickyNavSection } from '../components/StickyPageNav'
import { bookedFlights, days, globalTips, routeStages, tripMeta } from '../content/travel-2026-yunnan'
import { scrollToSection } from '../utils/scrollToSection'

const SECTIONS: StickyNavSection[] = [
  { id: 'overview', label: '总览', emoji: '🗺️' },
  { id: 'route', label: '路线', emoji: '🧭' },
  { id: 'phase-near', label: '昆明周边', emoji: '①' },
  { id: 'phase-far', label: '六口远游', emoji: '②' },
  { id: 'phase-back', label: '返昆收尾', emoji: '③' },
  { id: 'tips', label: '要点', emoji: '💡' },
]

const PHASES = [
  {
    id: 'phase-near',
    range: 'D1 — D7',
    dates: '09.19 — 09.25',
    title: '昆明周边 · 等爷爷会合',
    subtitle: '父母 + 暄暄 + 姥姥 + 奶奶',
    desc: '以昆明为中心先玩滇池、抚仙湖、建水、弥勒、普者黑和罗平，D7 晚回昆明接爷爷。',
    icon: '🌿',
    gradient: 'from-emerald-500 to-teal-500',
    soft: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    days: days.slice(0, 7),
  },
  {
    id: 'phase-far',
    range: 'D8 — D18',
    dates: '09.26 — 10.06',
    title: '全家六口 · 滇西南远游',
    subtitle: '爷爷加入 · 核心景点一起走',
    desc: '大理、腾冲、芒市、普洱一路南下至西双版纳，最后从景洪短飞回昆明。',
    icon: '🐘',
    gradient: 'from-cyan-500 to-sky-500',
    soft: 'from-cyan-50 to-sky-50',
    border: 'border-cyan-100',
    days: days.slice(7, 18),
  },
  {
    id: 'phase-back',
    range: 'D19 — D22',
    dates: '10.07 — 10.10',
    title: '返昆收尾 · 分批返程',
    subtitle: 'D19 六口同游 · D20 爷爷奶奶返程',
    desc: '全家先共游石林，10 月 8 日送爷爷奶奶飞沈阳回盘锦，其余家人在昆明轻松收尾。',
    icon: '🌼',
    gradient: 'from-amber-500 to-orange-500',
    soft: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
    days: days.slice(18),
  },
] as const

export default function TravelYunnan2026Page() {
  return (
    <div className="bg-[#f7faf7]">
      <StickyPageNav
        sections={SECTIONS}
        back={{ to: '/category/travel', label: '路书' }}
        accent="emerald"
      />

      <Hero />
      <RouteOverview />
      {PHASES.map((phase) => (
        <PhaseSection key={phase.id} phase={phase} />
      ))}
      <TripTips />
    </div>
  )
}

function Hero() {
  return (
    <header id="overview" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-800 to-cyan-700" />
      <div className="absolute -right-12 -top-16 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-20 text-white">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
          <span>已上线 · 2026 国庆</span><span className="text-white/40">·</span><span>09.19 — 10.10</span><span className="text-white/40">·</span><span>22 天</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <div className="mb-3 text-4xl" aria-hidden>🚗 🏞️ 🐘</div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">国庆 2026 · 云南全家总动员</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-emerald-50 md:text-xl">
              三代同游，先近后远。等全家六口在昆明会合，再一路去洱海、腾冲和西双版纳。
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm text-emerald-50">
              {['三代六口', '2 岁宝宝', '全程 2000m 内', '7 座电车 + 短飞'].map((item) => (
                <span key={item} className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold tracking-[0.18em] text-amber-200">
              <span>已定航班</span><span>{bookedFlights.length} 程</span>
            </div>
            <div className="mt-3 divide-y divide-white/15">
              {bookedFlights.map((flight) => <FlightRow key={`${flight.date}-${flight.flightNo}`} flight={flight} />)}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function FlightRow({ flight }: { flight: (typeof bookedFlights)[number] }) {
  return (
    <div className="grid grid-cols-[52px_1fr] gap-3 py-3 first:pt-0 last:pb-0">
      <div className="rounded-xl bg-white/10 py-2 text-center text-sm font-black self-start">{flight.date}</div>
      <div>
        <div className="font-bold">{flight.from} → {flight.to}</div>
        <div className="mt-1 text-xs text-emerald-100">{flight.traveler}</div>
        <div className="mt-1 text-xs text-emerald-100/80">{flight.depart} — {flight.arrive} · {flight.airline} {flight.flightNo}</div>
        {'note' in flight && <div className="mt-1 text-xs text-amber-100">{flight.note}</div>}
      </div>
    </div>
  )
}

function RouteOverview() {
  return (
    <section id="route" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 max-w-3xl">
          <div className="text-sm font-bold tracking-[0.16em] text-emerald-700">ROUTE OVERVIEW</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">三段式路线，一眼看懂谁和谁一起玩</h2>
          <p className="mt-3 text-slate-600">把 {routeStages.length} 个停靠节点收进三段旅程，集合与返程节点单独突出，长行程也不容易看乱。</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {PHASES.map((phase) => (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              onClick={(event) => scrollToSection(event, phase.id)}
              className={`group rounded-3xl border ${phase.border} bg-gradient-to-br ${phase.soft} p-5 transition hover:-translate-y-0.5 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl">{phase.icon}</span>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-600">{phase.range}</span>
              </div>
              <h3 className="mt-4 text-xl font-black text-slate-800">{phase.title}</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">{phase.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{phase.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 md:p-7 shadow-sm">
          <div className="mb-4 flex items-center gap-2 font-bold text-slate-800"><i className="ri-route-line text-emerald-600" />完整行程顺序</div>
          <div className="flex flex-wrap items-center gap-2">
            {routeStages.map((stage, index) => (
              <span key={`${stage.city}-${index}`} className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${stage.mark === 'gather' ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-200' : stage.mark === 'split' ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-200' : 'bg-slate-100 text-slate-700'}`}>
                  {stage.city}{stage.mark === 'gather' ? ' · 六口集合' : stage.mark === 'split' ? ' · 分批返程' : ''}
                </span>
                {index < routeStages.length - 1 && <i className="ri-arrow-right-s-line text-slate-300" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Phase = (typeof PHASES)[number]
type TripDay = (typeof days)[number]

function PhaseSection({ phase }: { phase: Phase }) {
  return (
    <section id={phase.id} className={`scroll-mt-24 border-t ${phase.border} bg-gradient-to-b ${phase.soft} py-12 md:py-16`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${phase.gradient} text-2xl text-white shadow-lg`}>{phase.icon}</span>
              <div>
                <div className="text-xs font-bold tracking-[0.16em] text-slate-500">{phase.range} · {phase.dates}</div>
                <h2 className="mt-1 text-2xl font-black md:text-3xl">{phase.title}</h2>
              </div>
            </div>
            <p className="mt-3 max-w-3xl text-slate-600">{phase.desc}</p>
          </div>
          <div className="shrink-0 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">👨‍👩‍👧 {phase.subtitle}</div>
        </div>
        <div className="space-y-5">
          {phase.days.map((day) => <DayCard key={day.id} day={day} gradient={phase.gradient} />)}
        </div>
      </div>
    </section>
  )
}

function DayCard({ day, gradient }: { day: TripDay; gradient: string }) {
  const image = day.img ? tripMeta.images[day.img as keyof typeof tripMeta.images] : undefined
  return (
    <article className="overflow-hidden rounded-3xl border border-white bg-white shadow-sm">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <div className="relative min-h-52 overflow-hidden bg-slate-100 lg:min-h-full">
          {image && <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105" />}
          <div className={`absolute left-4 top-4 rounded-xl bg-gradient-to-br ${gradient} px-3 py-2 text-sm font-black text-white shadow-lg`}>D{day.id}</div>
          <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">海拔 {day.alt}</div>
        </div>
        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">{day.date}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">📍 {day.city}</span>
          </div>
          <h3 className="mt-4 text-xl font-black leading-snug text-slate-800 md:text-2xl">{day.title}</h3>
          <div className="mt-4 grid gap-5 xl:grid-cols-[1fr_280px]">
            <ul className="space-y-2.5">
              {day.schedule.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-slate-600">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 text-sm">
              <InfoBox icon="ri-road-map-line" label="路程" value={day.drive} />
              <InfoBox icon="ri-hotel-line" label="住宿" value={day.hotel} />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {day.play.map((item) => <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{item}</span>)}
          </div>
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm leading-relaxed text-emerald-900">
            <span className="font-bold">💡 当日提醒：</span>{day.tips}
          </div>
        </div>
      </div>
    </article>
  )
}

function InfoBox({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3.5">
      <div className="mb-1 text-xs font-bold text-slate-400"><i className={`${icon} mr-1`} />{label}</div>
      <div className="leading-relaxed text-slate-700">{value}</div>
    </div>
  )
}

function TripTips() {
  return (
    <section id="tips" className="scroll-mt-24 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <div className="text-sm font-bold tracking-[0.16em] text-emerald-700">TRIP NOTES</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">出发前先记住这 8 件事</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {globalTips.map((tip) => (
            <div key={tip.title} className="rounded-3xl border border-slate-100 bg-[#f8fbf8] p-5 shadow-sm">
              <div className="text-3xl">{tip.icon}</div>
              <h3 className="mt-3 font-black text-slate-800">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
