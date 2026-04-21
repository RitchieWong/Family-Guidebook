import { PLACES, ITINERARY } from '../../../content/travel-2025-national-day'

/** 国庆路书 · 住宿一览（4 家酒店）*/
export default function Hotels() {
  const hotelList: Array<{ name: string; city: string; nights: number[]; days: string[] }> = [
    {
      name: PLACES.zjgHotel.name,
      city: PLACES.zjgHotel.city,
      nights: [3, 4, 5],
      days: ['10.03 张家港沙洲优黄', '10.04 双山岛', '10.05 南通野生动物园'],
    },
    {
      name: PLACES.lyhHotel.name,
      city: PLACES.lyhHotel.city,
      nights: [6, 7],
      days: ['10.06 天目湖/竹海', '10.07 一号公路/窑湖小镇'],
    },
    {
      name: PLACES.nxHotel.name,
      city: PLACES.nxHotel.city,
      nights: [8],
      days: ['10.08 南浔古镇'],
    },
    {
      name: PLACES.szHotel.name,
      city: PLACES.szHotel.city,
      nights: [9, 10],
      days: ['10.09 过渡日', '10.10 拙政园'],
    },
  ]

  return (
    <section id="hotel" className="py-12 bg-gradient-to-b from-white to-rose-50/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="text-sm font-semibold text-rose-600 mb-2">ACCOMMODATION</div>
            <h2 className="text-3xl md:text-4xl font-black">住宿切换</h2>
            <p className="text-slate-500 mt-2 text-sm">
              11 天里住了 4 家酒店 + 2 晚亲戚家（10.01/10.02 东台）· 最后 1 晚回北京
            </p>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2">
            <i className="ri-information-line mr-1" /> 预订和联系：家中长辈对接
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {hotelList.map((h, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition">
              <div className={`${GRADIENT[idx % GRADIENT.length]} text-white p-5`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs opacity-80">酒店 {idx + 1} · {h.city}</span>
                  <span className="text-xs bg-white/20 backdrop-blur rounded px-2 py-0.5">
                    {h.nights.length} 晚
                  </span>
                </div>
                <div className="font-bold text-lg">{h.name}</div>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-500 mb-2">
                  <i className="ri-calendar-line mr-1" />入住日程
                </div>
                <ul className="space-y-1.5">
                  {h.days.map((d, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 住宿时间轴 */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <i className="ri-calendar-check-line text-rose-600" />
            11 天住宿时间轴
          </h4>
          <div className="overflow-x-auto">
            <div className="min-w-[880px] grid grid-cols-11 gap-1">
              {ITINERARY.map((d) => (
                <div key={d.id} className="text-center text-xs">
                  <div className="text-slate-400 mb-1">{d.date}</div>
                  <div className={`py-2 rounded-md text-[11px] leading-tight px-1 ${hotelCellCls(d.hotel, d.transport)}`}>
                    {hotelShort(d.hotel, d.transport)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GRADIENT = [
  'bg-gradient-to-r from-amber-500 to-orange-500',
  'bg-gradient-to-r from-teal-500 to-emerald-500',
  'bg-gradient-to-r from-violet-500 to-purple-500',
  'bg-gradient-to-r from-pink-500 to-rose-500',
]

function hotelShort(hotel?: string, transport?: string) {
  if (!hotel) {
    if (transport === 'flight') return '✈️ 返京'
    return '亲戚家'
  }
  if (hotel.includes('张家港')) return '张家港'
  if (hotel.includes('溧阳')) return '溧阳'
  if (hotel.includes('南浔')) return '南浔'
  if (hotel.includes('嘉樂')) return '苏州'
  return hotel
}

function hotelCellCls(hotel?: string, transport?: string) {
  if (!hotel) {
    if (transport === 'flight') return 'bg-sky-50 text-sky-700 font-semibold'
    return 'bg-slate-100 text-slate-500'
  }
  if (hotel.includes('张家港')) return 'bg-amber-100 text-amber-800 font-semibold'
  if (hotel.includes('溧阳')) return 'bg-teal-100 text-teal-800 font-semibold'
  if (hotel.includes('南浔')) return 'bg-violet-100 text-violet-800 font-semibold'
  if (hotel.includes('嘉樂')) return 'bg-pink-100 text-pink-800 font-semibold'
  return 'bg-slate-100 text-slate-600'
}
