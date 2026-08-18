import { useState } from 'react'
import StickyPageNav, { type StickyNavSection } from '../components/StickyPageNav'
import { bookedFlights, days, globalTips, routeStages, tripMeta } from '../content/travel-2026-yunnan'
import { scrollToSection } from '../utils/scrollToSection'

const SECTIONS: StickyNavSection[] = [
  { id: 'overview', label: '总览', emoji: '🗺️' },
  { id: 'route', label: '路线', emoji: '🧭' },
  { id: 'itinerary', label: '逐日安排', emoji: '📅' },
  { id: 'tips', label: '要点', emoji: '💡' },
]

const PHASES = [
  {
    id: 'phase-near',
    range: 'D1 — D7',
    dates: '09.19 — 09.25',
    title: '弥勒与抚仙湖 · 接爷爷会合',
    subtitle: '父母 + 暄暄 + 姥姥 + 奶奶',
    desc: '先玩昆明和弥勒，再到抚仙湖连住三晚；D7 爸爸单独往返长水机场接爷爷。',
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
    desc: 'D8 六口转场大理连住四晚，增加三塔古城与白族扎染，再用一个超长驾驶日直达普洱和版纳。',
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
    subtitle: '爷爷奶奶动车返昆 · 其余四人继续自驾',
    desc: 'D19 爷爷奶奶从版纳动车回昆明，其余四人开车去普洱；玩一天茶咖庄园后开回昆明。',
    icon: '🌼',
    gradient: 'from-amber-500 to-orange-500',
    soft: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
    days: days.slice(18),
  },
] as const

const CITY_STOPS = [
  { id: 'kunming-arrival', name: '昆明', icon: '🌼', note: '抵达与滇池适应', dayIds: [1, 2] },
  { id: 'mile', name: '弥勒', icon: '🌿', note: '红砖艺术与当季花景', dayIds: [3, 4] },
  { id: 'fuxian', name: '抚仙湖', icon: '🏖️', note: '湖边连住三晚，接爷爷会合', dayIds: [5, 6, 7] },
  { id: 'dali', name: '大理', icon: '🏞️', note: '三塔、洱海、喜洲与扎染', dayIds: [8, 9, 10, 11] },
  { id: 'puer-outbound', name: '普洱', icon: '🐾', note: '森林动物与茶咖庄园', dayIds: [12, 13, 14] },
  { id: 'banna', name: '西双版纳', icon: '🐘', note: '雨林、傣家与热带植物', dayIds: [15, 16, 17, 18] },
  { id: 'puer-return', name: '普洱·返程', icon: '☕', note: '分头返程与茶咖慢游', dayIds: [19, 20] },
  { id: 'kunming-return', name: '昆明·返程', icon: '✈️', note: '回到还车城市返京', dayIds: [21, 22] },
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
      <ItineraryTabs />
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
              三代同游，先到抚仙湖等爷爷，再全程开车走大理、普洱和西双版纳。
            </p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm text-emerald-50">
              {['三代六口', '2 岁宝宝', '全程 2000m 内', '7 座租车全程自驾'].map((item) => (
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
              href="#itinerary"
              onClick={(event) => scrollToSection(event, 'itinerary')}
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

type TripDay = (typeof days)[number]

function ItineraryTabs() {
  const [activeCityId, setActiveCityId] = useState<(typeof CITY_STOPS)[number]['id']>('kunming-arrival')
  const [activeDayId, setActiveDayId] = useState(1)
  const activeCity = CITY_STOPS.find((city) => city.id === activeCityId) ?? CITY_STOPS[0]
  const cityDays = activeCity.dayIds
    .map((dayId) => days.find((day) => day.id === dayId))
    .filter((day): day is TripDay => Boolean(day))
  const activeDay = cityDays.find((day) => day.id === activeDayId) ?? cityDays[0]

  const selectCity = (city: (typeof CITY_STOPS)[number]) => {
    setActiveCityId(city.id)
    setActiveDayId(city.dayIds[0])
  }

  return (
    <section id="itinerary" className="scroll-mt-32 border-t border-emerald-100 bg-gradient-to-b from-emerald-50 to-[#f7faf7] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6">
          <div className="text-sm font-bold tracking-[0.16em] text-emerald-700">DAILY ITINERARY</div>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">按城市选大项，按天切换安排</h2>
          <p className="mt-3 text-slate-600">一次只看一天，上午、中午、下午的节奏在一屏内对齐。</p>
        </div>

        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-3" role="tablist" aria-label="选择城市">
          {CITY_STOPS.map((city) => {
            const selected = city.id === activeCity.id
            return (
              <button
                key={city.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => selectCity(city)}
                className={`min-w-[168px] rounded-2xl border px-4 py-3 text-left transition md:min-w-0 md:flex-1 ${selected ? 'border-emerald-500 bg-emerald-700 text-white shadow-lg shadow-emerald-900/10' : 'border-emerald-100 bg-white text-slate-700 hover:border-emerald-300'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl" aria-hidden>{city.icon}</span>
                  <span className={`text-xs font-bold ${selected ? 'text-emerald-100' : 'text-slate-400'}`}>{city.dayIds.length} 天</span>
                </div>
                <div className="mt-2 text-lg font-black">{city.name}</div>
                <div className={`mt-1 text-xs ${selected ? 'text-emerald-100' : 'text-slate-500'}`}>{city.note}</div>
              </button>
            )
          })}
        </div>

        <div className="mt-3 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
          <div className="no-scrollbar flex gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50/80 px-4 py-3" role="tablist" aria-label={`${activeCity.name}逐日安排`}>
            {cityDays.map((day) => {
              const selected = day.id === activeDay.id
              return (
                <button
                  key={day.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveDayId(day.id)}
                  className={`shrink-0 rounded-xl px-4 py-2 text-sm font-bold transition ${selected ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-emerald-700'}`}
                >
                  D{day.id} <span className={selected ? 'text-emerald-100' : 'text-slate-400'}>{day.date.split(' ')[1]}</span>
                </button>
              )
            })}
          </div>
          <DayPanel key={activeDay.id} day={activeDay} cityName={activeCity.name} />
        </div>
      </div>
    </section>
  )
}

function DayPanel({ day, cityName }: { day: TripDay; cityName: string }) {
  const image = day.img ? tripMeta.images[day.img as keyof typeof tripMeta.images] : undefined
  const schedule = splitSchedule(day)
  return (
    <article role="tabpanel" className="animate-[fadeUp_240ms_ease-out]">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <div className="relative min-h-44 overflow-hidden bg-slate-100 lg:min-h-full">
          {image && (
            <img
              src={image}
              srcSet={responsiveImageSrcSet(image)}
              sizes="(min-width: 1024px) 240px, calc(100vw - 3rem)"
              width="1200"
              height="675"
              alt={day.title}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          )}
          <div className="absolute left-4 top-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 px-3 py-2 text-sm font-black text-white shadow-lg">D{day.id}</div>
          <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">海拔 {day.alt}</div>
        </div>
        <div className="p-5 md:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">{day.date}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">📍 {cityName} · {day.city}</span>
              </div>
              <h3 className="mt-3 text-xl font-black leading-snug text-slate-800 md:text-2xl">{day.title}</h3>
            </div>
            <div className="grid shrink-0 gap-2 text-sm sm:grid-cols-2 xl:w-[430px]">
              <InfoBox icon="ri-road-map-line" label="路程" value={day.drive} />
              <InfoBox icon="ri-hotel-line" label="住宿" value={day.hotel} />
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <SchedulePeriod icon="🌤️" label="上午" items={schedule.morning} empty="自然醒 / 整理行装" />
            <SchedulePeriod icon="🍜" label="中午" items={schedule.noon} empty="午餐 / 宝宝午睡" />
            <SchedulePeriod icon="🌇" label="下午 · 晚上" items={schedule.afternoon} empty="轻松活动 / 早点休息" />
          </div>

          <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-2">
              {day.play.map((item) => <span key={item} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{item}</span>)}
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-2.5 text-sm leading-relaxed text-emerald-900 xl:max-w-2xl">
              <span className="font-bold">💡 当日提醒：</span>{day.tips}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function responsiveImageSrcSet(image: string) {
  return [480, 800, 1200]
    .map((width) => `${image.replace(/\.webp$/, `-${width}w.webp`)} ${width}w`)
    .join(', ')
}

function splitSchedule(day: TripDay) {
  if (day.id === 1) return { morning: [], noon: [], afternoon: [...day.schedule] }
  if (day.id === 22) return { morning: day.schedule.slice(0, 1), noon: [], afternoon: day.schedule.slice(1) }
  return { morning: day.schedule.slice(0, 1), noon: day.schedule.slice(1, 2), afternoon: day.schedule.slice(2) }
}

function SchedulePeriod({ icon, label, items, empty }: { icon: string; label: string; items: readonly string[]; empty: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className="mb-2 flex items-center gap-2 font-black text-slate-800"><span aria-hidden>{icon}</span>{label}</div>
      {items.length > 0 ? (
        <ul className="space-y-1.5">
          {items.map((item) => <li key={item} className="text-sm leading-relaxed text-slate-600">{item}</li>)}
        </ul>
      ) : <p className="text-sm text-slate-400">{empty}</p>}
    </div>
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
