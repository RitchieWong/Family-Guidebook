import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroOverview from '../components/travel/sections/HeroOverview'
import Hotel from '../components/travel/sections/Hotel'
import Day1 from '../components/travel/sections/Day1'
import Day2 from '../components/travel/sections/Day2'
import Day3 from '../components/travel/sections/Day3'
import Day4 from '../components/travel/sections/Day4'
import TipsChecklist from '../components/travel/sections/TipsChecklist'
import { scrollToSection } from '../utils/scrollToSection'

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
      // 关键：SECTIONS 的数组顺序 ≠ DOM 渲染顺序（hotel 在 SECTIONS 里排 day4 之后，
      // 但 DOM 里 hotel 紧跟 overview，排在 day1 之前）。
      // 必须按实际 offsetTop 升序遍历，取"最后一个已经越过 y 的 section"，
      // 否则滚到 day1~day4 时，因 hotel.offsetTop 很小也 <= y，会被最后一次覆盖为 hotel。
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
  }, [])

  /**
   * 注意：本站使用 HashRouter（URL 形如 /#/travel/...），
   * 所以**不能**用 <a href="#day1">，否则会把整个 hash 替换为 #day1，
   * 触发 HashRouter 重新路由 → 页面跳走 / 报错。
   * 这里复用 utils/scrollToSection，统一 offset = 120
   * （主 Nav 64 + sticky 二级导航 ~48 + 呼吸 8）。
   */
  const onNavClick = (id: string) => (e: React.MouseEvent) => {
    scrollToSection(e, id)
  }

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
                onClick={onNavClick(s.id)}
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
