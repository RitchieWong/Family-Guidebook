import HeroOverview from '../components/travel/national/HeroOverview'
import DaySection from '../components/travel/national/DaySection'
import Hotels from '../components/travel/national/Hotels'
import Reflections from '../components/travel/national/Reflections'
import { ITINERARY } from '../content/travel-2025-national-day'
import StickyPageNav, { type StickyNavSection } from '../components/StickyPageNav'

export default function TravelNationalDay2025Page() {
  // 二级导航：总览 + 11 天 + 住宿 + 回顾
  const SECTIONS: StickyNavSection[] = [
    { id: 'overview', label: '总览', emoji: '🗺️' },
    ...ITINERARY.map((d) => ({
      id: d.id,
      label: d.id.toUpperCase().replace('DAY', 'D'),
    })),
    { id: 'hotel', label: '住宿', emoji: '🏨' },
    { id: 'tips', label: '回顾', emoji: '💭' },
  ]

  return (
    <div className="bg-slate-50">
      <StickyPageNav
        sections={SECTIONS}
        back={{ to: '/category/travel', label: '路书' }}
        accent="rose"
      />

      <HeroOverview />
      {ITINERARY.map((d, idx) => (
        <DaySection key={d.id} day={d} index={idx} />
      ))}
      <Hotels />
      <Reflections />
    </div>
  )
}
