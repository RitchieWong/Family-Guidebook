import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroOverview from '../components/travel/sections/HeroOverview'
import Hotel from '../components/travel/sections/Hotel'
import Day1 from '../components/travel/sections/Day1'
import Day2 from '../components/travel/sections/Day2'
import Day3 from '../components/travel/sections/Day3'
import Day4 from '../components/travel/sections/Day4'
import TipsChecklist from '../components/travel/sections/TipsChecklist'

const SECTIONS = [
  { id: 'overview', label: '总览' },
  { id: 'day1', label: 'Day1' },
  { id: 'day2', label: 'Day2' },
  { id: 'day3', label: 'Day3' },
  { id: 'day4', label: 'Day4' },
  { id: 'hotel', label: '住宿' },
  { id: 'tips', label: '贴士' },
  { id: 'checklist', label: '清单' },
] as const

export default function TravelLaborDay2026Page() {
  const [active, setActive] = useState<string>('overview')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140
      let cur = SECTIONS[0].id as string
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= y) cur = s.id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-slate-50">
      {/* 内嵌 sticky 二级导航（在主 Nav 下方） */}
      <div className="sticky top-16 z-30 bg-white/85 backdrop-blur border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center gap-3 overflow-x-auto">
          <Link
            to="/category/travel"
            className="flex items-center gap-1 text-slate-500 text-sm hover:text-sky-600 whitespace-nowrap"
          >
            <i className="ri-arrow-left-line" /> 路书
          </Link>
          <span className="text-slate-200">|</span>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`whitespace-nowrap transition ${active === s.id ? 'text-sky-600' : 'hover:text-sky-600'}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <HeroOverview />
      <Hotel />
      <Day1 />
      <Day2 />
      <Day3 />
      <Day4 />
      <TipsChecklist />
    </div>
  )
}
