import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroOverview from '../components/travel/national/HeroOverview'
import DaySection from '../components/travel/national/DaySection'
import Hotels from '../components/travel/national/Hotels'
import Reflections from '../components/travel/national/Reflections'
import { ITINERARY } from '../content/travel-2025-national-day'
import { scrollToSection } from '../utils/scrollToSection'

export default function TravelNationalDay2025Page() {
  // 二级导航：总览 + 11 天 + 住宿 + 回顾
  const SECTIONS = [
    { id: 'overview', label: '总览' },
    ...ITINERARY.map((d) => ({ id: d.id, label: d.id.toUpperCase().replace('DAY', 'D') })),
    { id: 'hotel', label: '住宿' },
    { id: 'tips', label: '回顾' },
  ]

  const [active, setActive] = useState<string>('overview')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
      const items: Array<{ id: string; top: number }> = []
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el) items.push({ id: s.id, top: el.offsetTop })
      }
      items.sort((a, b) => a.top - b.top)

      let cur = items[0]?.id ?? (SECTIONS[0].id as string)
      for (const it of items) {
        if (it.top <= y) cur = it.id
        else break
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onNavClick = (id: string) => (e: React.MouseEvent) => scrollToSection(e, id)

  return (
    <div className="bg-slate-50">
      {/* 二级导航 */}
      <div className="sticky top-16 z-30 bg-white/85 backdrop-blur border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center gap-3 overflow-x-auto">
          <Link
            to="/category/travel"
            className="flex items-center gap-1 text-slate-500 text-sm hover:text-rose-600 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" /> 路书
          </Link>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-slate-600">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={onNavClick(s.id)}
                className={`whitespace-nowrap transition ${active === s.id ? 'text-rose-600' : 'hover:text-rose-600'}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <HeroOverview />
      {ITINERARY.map((d, idx) => (
        <DaySection key={d.id} day={d} index={idx} />
      ))}
      <Hotels />
      <Reflections />
    </div>
  )
}
