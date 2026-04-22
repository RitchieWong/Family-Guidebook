import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { scrollToSection } from '../utils/scrollToSection'

export interface StickyNavSection {
  id: string
  label: string
  /** 可选：emoji 或 icon class */
  emoji?: string
  icon?: string
}

interface Props {
  sections: StickyNavSection[]
  /** 返回按钮：左侧显示「← 文本」，点击跳转 */
  back?: { to: string; label: string }
  /** 主题色 */
  accent?: 'rose' | 'sky' | 'amber' | 'emerald' | 'violet' | 'cyan'
  /** scroll offset，默认 120（主 Nav 64 + 本导航 ~48 + 呼吸 8） */
  offset?: number
}

const ACCENT_MAP: Record<
  NonNullable<Props['accent']>,
  { text: string; hover: string; grad: string }
> = {
  rose: { text: 'text-rose-600', hover: 'hover:text-rose-600', grad: 'from-rose-500 to-pink-500' },
  sky: { text: 'text-sky-600', hover: 'hover:text-sky-600', grad: 'from-sky-500 to-cyan-500' },
  amber: { text: 'text-amber-600', hover: 'hover:text-amber-600', grad: 'from-amber-500 to-orange-500' },
  emerald: { text: 'text-emerald-600', hover: 'hover:text-emerald-600', grad: 'from-emerald-500 to-teal-500' },
  violet: { text: 'text-violet-600', hover: 'hover:text-violet-600', grad: 'from-violet-500 to-fuchsia-500' },
  cyan: { text: 'text-cyan-600', hover: 'hover:text-cyan-600', grad: 'from-cyan-500 to-blue-500' },
}

/**
 * 页面顶部二级导航（fixed 定位，始终贴在主 Nav 下方）。
 *
 * 关键行为：
 * - 点击导航项后 800ms 内**锁定 active 为目标**，避免平滑滚动途中
 *   active 在多个年份/板块之间来回切换，视觉上看起来"没反应"
 * - 激活项始终通过 `scrollIntoView(inline: 'center')` 居中显示
 *   —— 无论点左侧/右侧更早的 tab 都能正确滚到中间
 */
export default function StickyPageNav({
  sections,
  back,
  accent = 'rose',
  offset = 120,
}: Props) {
  const [active, setActive] = useState<string>(sections[0]?.id || '')
  const scrollerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  /** 点击后短暂锁定的目标 id；锁定期间 onScroll 不再更新 active */
  const lockedIdRef = useRef<string | null>(null)
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 跟踪当前 section
  useEffect(() => {
    const onScroll = () => {
      if (lockedIdRef.current) return // 被点击锁定期间不更新
      const y = window.scrollY + offset + 20
      const items: Array<{ id: string; top: number }> = []
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) items.push({ id: s.id, top: el.offsetTop })
      }
      items.sort((a, b) => a.top - b.top)
      let cur = items[0]?.id ?? sections[0]?.id ?? ''
      for (const it of items) {
        if (it.top <= y) cur = it.id
        else break
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections, offset])

  // active 变化时 —— 始终把当前项滚到容器水平中央
  useEffect(() => {
    const el = itemRefs.current[active]
    const scroller = scrollerRef.current
    if (!el || !scroller) return
    // 目标：let el 中心对齐 scroller 视口中心
    const target =
      el.offsetLeft + el.offsetWidth / 2 - scroller.clientWidth / 2
    const clamped = Math.max(
      0,
      Math.min(target, scroller.scrollWidth - scroller.clientWidth),
    )
    scroller.scrollTo({ left: clamped, behavior: 'smooth' })
  }, [active])

  const handleClick = (e: React.MouseEvent, id: string) => {
    // 点击后立即锁定 active 为目标
    setActive(id)
    lockedIdRef.current = id
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current)
    // 800ms 后解锁（足够覆盖平滑滚动时间），之后 onScroll 恢复跟踪
    unlockTimerRef.current = setTimeout(() => {
      lockedIdRef.current = null
    }, 800)
    scrollToSection(e, id, offset)
  }

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current)
    }
  }, [])

  const a = ACCENT_MAP[accent]

  return (
    <>
      {/* fixed 导航：始终贴在主 Nav 下方 */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-3 md:px-6 py-2 flex items-center gap-2 md:gap-3">
          {back && (
            <>
              <Link
                to={back.to}
                className={`shrink-0 flex items-center gap-1 text-slate-500 text-xs md:text-sm ${a.hover} whitespace-nowrap`}
              >
                <i className="ri-arrow-left-line" /> {back.label}
              </Link>
              <span className="shrink-0 text-slate-200">|</span>
            </>
          )}

          <div ref={scrollerRef} className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 text-xs md:text-sm font-medium">
              {sections.map((s) => {
                const isActive = s.id === active
                return (
                  <a
                    key={s.id}
                    ref={(el) => (itemRefs.current[s.id] = el)}
                    href={`#${s.id}`}
                    onClick={(e) => handleClick(e, s.id)}
                    className={`relative shrink-0 px-2.5 py-1.5 rounded-full whitespace-nowrap transition flex items-center gap-1 ${
                      isActive
                        ? `bg-gradient-to-br ${a.grad} text-white font-semibold shadow-sm`
                        : `text-slate-600 ${a.hover} hover:bg-slate-50`
                    }`}
                  >
                    {s.emoji && <span className="text-sm leading-none">{s.emoji}</span>}
                    {s.icon && <i className={`${s.icon} text-sm`} />}
                    <span>{s.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 占位：让后续内容往下偏移，避免被 fixed 导航遮挡 */}
      <div className="h-12" aria-hidden />
    </>
  )
}
