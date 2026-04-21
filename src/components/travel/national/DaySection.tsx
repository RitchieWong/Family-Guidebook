import type { DayItinerary } from '../../../content/travel-2025-national-day'

const ACCENT: Record<string, { grad: string; shadow: string; softBg: string; textSoft: string; hard: string }> = {
  sky:     { grad: 'from-sky-500 to-sky-700',         shadow: 'shadow-sky-200',     softBg: 'from-sky-50/50 to-white',     textSoft: 'text-sky-600',     hard: 'text-sky-700' },
  cyan:    { grad: 'from-cyan-500 to-cyan-700',       shadow: 'shadow-cyan-200',    softBg: 'from-cyan-50/50 to-white',    textSoft: 'text-cyan-600',    hard: 'text-cyan-700' },
  emerald: { grad: 'from-emerald-500 to-emerald-700', shadow: 'shadow-emerald-200', softBg: 'from-emerald-50/50 to-white', textSoft: 'text-emerald-600', hard: 'text-emerald-700' },
  amber:   { grad: 'from-amber-500 to-orange-600',    shadow: 'shadow-amber-200',   softBg: 'from-amber-50/50 to-white',   textSoft: 'text-amber-600',   hard: 'text-amber-700' },
  rose:    { grad: 'from-rose-500 to-pink-600',       shadow: 'shadow-rose-200',    softBg: 'from-rose-50/50 to-white',    textSoft: 'text-rose-600',    hard: 'text-rose-700' },
  violet:  { grad: 'from-violet-500 to-purple-600',   shadow: 'shadow-violet-200',  softBg: 'from-violet-50/50 to-white',  textSoft: 'text-violet-600',  hard: 'text-violet-700' },
  indigo:  { grad: 'from-indigo-500 to-indigo-700',   shadow: 'shadow-indigo-200',  softBg: 'from-indigo-50/50 to-white',  textSoft: 'text-indigo-600',  hard: 'text-indigo-700' },
  teal:    { grad: 'from-teal-500 to-emerald-600',    shadow: 'shadow-teal-200',    softBg: 'from-teal-50/50 to-white',    textSoft: 'text-teal-600',    hard: 'text-teal-700' },
  orange:  { grad: 'from-orange-500 to-rose-500',     shadow: 'shadow-orange-200',  softBg: 'from-orange-50/50 to-white',  textSoft: 'text-orange-600',  hard: 'text-orange-700' },
  pink:    { grad: 'from-pink-500 to-rose-500',       shadow: 'shadow-pink-200',    softBg: 'from-pink-50/50 to-white',    textSoft: 'text-pink-600',    hard: 'text-pink-700' },
}

const TRANSPORT_META: Record<string, { icon: string; label: string }> = {
  train:     { icon: 'ri-train-line',      label: '高铁' },
  drive:     { icon: 'ri-car-line',        label: '自驾' },
  rideshare: { icon: 'ri-taxi-line',       label: '顺风车' },
  flight:    { icon: 'ri-flight-takeoff-line', label: '飞机' },
  wedding:   { icon: 'ri-service-line',    label: '婚礼' },
  rest:      { icon: 'ri-hotel-bed-line',  label: '休整' },
}

/** 可复用的单日区块 —— 数据驱动 */
export default function DaySection({ day, index }: { day: DayItinerary; index: number }) {
  const cls = ACCENT[day.accent] ?? ACCENT.sky
  const tMeta = TRANSPORT_META[day.transport] ?? TRANSPORT_META.drive
  const num = String(index + 1).padStart(2, '0')

  return (
    <section id={day.id} className={`py-12 bg-gradient-to-b ${cls.softBg} scroll-mt-20`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cls.grad} text-white flex items-center justify-center text-2xl font-black shadow-lg ${cls.shadow}`}>
            {num}
          </div>
          <div>
            <div className={`text-sm ${cls.textSoft} font-semibold`}>
              2025 年 10 月 {day.date.split('.')[1]} 日 · {day.weekday}
            </div>
            <h2 className="text-2xl md:text-3xl font-black">{day.title}</h2>
            <p className="text-sm text-slate-500 mt-1">{day.subtitle}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 左：主要内容 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 交通卡片 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <i className={`${tMeta.icon} ${cls.textSoft} text-lg`} />
                <h3 className="font-bold">交通 · {tMeta.label}</h3>
                {day.transportDetail?.no && (
                  <span className={`ml-auto px-2 py-0.5 rounded-md text-xs font-bold ${cls.hard} bg-slate-50`}>
                    {day.transportDetail.no}
                  </span>
                )}
              </div>
              {day.transportDetail && (day.transportDetail.from || day.transportDetail.to) ? (
                <div className="bg-slate-50 rounded-xl p-4 grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                  <div className="text-center">
                    <div className="text-xs text-slate-400">出发</div>
                    <div className="font-semibold text-slate-700">{day.transportDetail.from ?? '—'}</div>
                    {day.transportDetail.depart && <div className={`text-sm ${cls.textSoft} mt-1`}>{day.transportDetail.depart}</div>}
                  </div>
                  <i className={`ri-arrow-right-line ${cls.textSoft}`} />
                  <div className="text-center">
                    <div className="text-xs text-slate-400">抵达</div>
                    <div className="font-semibold text-slate-700">{day.transportDetail.to ?? '—'}</div>
                    {day.transportDetail.arrive && <div className={`text-sm ${cls.textSoft} mt-1`}>{day.transportDetail.arrive}</div>}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-500">当日无长距离交通 · 原地活动</p>
              )}
            </div>

            {/* 活动清单 */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <i className={`ri-map-pin-line ${cls.textSoft} text-lg`} />
                <h3 className="font-bold">游玩 · {day.cities.join(' / ')}</h3>
              </div>
              <ul className="space-y-2">
                {day.activities.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <i className={`ri-checkbox-circle-line ${cls.textSoft} mt-0.5 flex-shrink-0`} />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 亮点 */}
            <div className={`bg-gradient-to-br ${cls.grad} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="flex items-center gap-2 mb-2 text-sm opacity-90">
                <i className="ri-sparkling-2-fill" />
                <span>今日亮点</span>
              </div>
              <p className="text-lg font-semibold leading-snug">{day.highlight}</p>
            </div>
          </div>

          {/* 右：住宿 + 贴士 */}
          <div className="space-y-4">
            {day.hotel ? (
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className={`text-xs ${cls.textSoft} font-semibold mb-2`}>
                  <i className="ri-hotel-line mr-1" /> 今晚住宿
                </div>
                <div className="font-bold text-slate-800 mb-1">{day.hotel}</div>
                <div className="text-xs text-slate-500">
                  <i className="ri-moon-clear-line mr-1" />
                  夜宿 · {day.cities[day.cities.length - 1]}
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="text-xs font-semibold text-amber-700 mb-2">
                  <i className="ri-information-line mr-1" /> 今晚安排
                </div>
                <div className="text-sm text-amber-900">
                  {day.transport === 'flight' ? '返程当晚抵京 · 无需酒店' : '亲戚家 / 婚宴酒店 · 无需预订'}
                </div>
              </div>
            )}

            {day.tips && day.tips.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                  <i className="ri-lightbulb-flash-line" />亲子贴士
                </div>
                <ul className="text-sm text-amber-900 space-y-1.5 list-disc list-inside">
                  {day.tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
