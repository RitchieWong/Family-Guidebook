import HeroOverview from '../components/travel/sections/HeroOverview'
import Hotel from '../components/travel/sections/Hotel'
import Day1 from '../components/travel/sections/Day1'
import Day2 from '../components/travel/sections/Day2'
import Day3 from '../components/travel/sections/Day3'
import Day4 from '../components/travel/sections/Day4'
import TipsChecklist from '../components/travel/sections/TipsChecklist'
import StickyPageNav, { type StickyNavSection } from '../components/StickyPageNav'

const SECTIONS: StickyNavSection[] = [
  { id: 'overview', label: '总览', emoji: '🗺️' },
  { id: 'hotel', label: '住宿', emoji: '🏨' },
  { id: 'day1', label: 'Day1', emoji: '①' },
  { id: 'day2', label: 'Day2', emoji: '②' },
  { id: 'day3', label: 'Day3', emoji: '③' },
  { id: 'day4', label: 'Day4', emoji: '④' },
  { id: 'tips', label: '贴士', emoji: '💡' },
  { id: 'checklist', label: '清单', emoji: '📋' },
]

export default function TravelLaborDay2026Page() {
  return (
    <div className="bg-slate-50">
      <StickyPageNav
        sections={SECTIONS}
        back={{ to: '/category/travel', label: '路书' }}
        accent="sky"
      />

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
