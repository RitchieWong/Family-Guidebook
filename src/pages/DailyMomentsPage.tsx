import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DAILY_MOMENTS, type DailyMoment } from '../content/daily-moments'
import { formatDate } from '../content/constants'
import { scrollToSection } from '../utils/scrollToSection'
import MobileAnchorFab from '../components/MobileAnchorFab'
import StickyPageNav from '../components/StickyPageNav'

interface LightboxState {
  images: string[]
  index: number
}

/**
 * 暄暄生活点滴时间线
 * - 每条一个节点，3 张生活照；未上传的优雅降级成 emoji 占位
 * - 移动端：左侧细时间轴 + 单列卡片；桌面：居中粗时间轴 + 双列错位
 */
export default function DailyMomentsPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const sorted = useMemo(
    () => [...DAILY_MOMENTS].sort((a, b) => a.date.localeCompare(b.date)),
    []
  )

  const years = useMemo(() => {
    const set = new Set(sorted.map((m) => m.date.slice(0, 4)))
    return Array.from(set).sort()
  }, [sorted])

  return (
    <div className="bg-[#fff7f2] min-h-screen">
      {/* 顶部 sticky 二级导航 */}
      <StickyPageNav
        back={{ to: '/category/album', label: '家庭相册' }}
        accent="emerald"
        sections={[
          { id: 'hero', label: '顶部', emoji: '🌿' },
          { id: 'timeline', label: '时间线', emoji: '⏳' },
          ...years.map((y) => ({ id: `y-${y}`, label: `${y} 年`, emoji: '📅' })),
          { id: 'letter', label: '寄语', emoji: '💌' },
        ]}
      />

      {/* Hero */}
      <header id="hero" className="relative overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-sky-50 to-rose-50" />
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 -right-10 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-8 md:pt-10 pb-8 md:pb-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-4 md:mb-5 flex-wrap">
            <Link to="/" className="hover:text-emerald-600 inline-flex items-center gap-1">
              <i className="ri-home-4-line" /> 首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/category/album" className="hover:text-emerald-600">
              家庭相册
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">生活点滴</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-emerald-200 text-emerald-700 text-xs font-semibold mb-3 md:mb-4">
            <i className="ri-heart-pulse-fill" />
            <span>Daily Little Moments · 温柔日常</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">
            暄暄生活点滴
          </h1>
          <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
            那些没被正式拍的里程碑照片，但足够温柔的日常：
            散步、吃饭、睡前、洗澡、追鸽子、看雪……
            每一条都是爸爸妈妈想要好好记住的一小块时光。
          </p>

          {/* 快速锚点（移动端水平滚动，跳到任意节点） */}
          <div className="mt-5 md:mt-6 -mx-5 px-5 lg:mx-0 lg:px-0 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 whitespace-nowrap pb-1">
              {sorted.map((m) => (
                <a
                  key={m.id}
                  href={`#${m.id}`}
                  onClick={(e) => scrollToSection(e, m.id)}
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white ring-1 ring-slate-200 text-[11px] text-slate-600 hover:ring-emerald-300 hover:text-emerald-600 transition"
                >
                  <span>{m.emoji}</span>
                  <span className="font-medium">{m.title.split(' · ')[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 时间线 */}
      <section id="timeline" className="max-w-5xl mx-auto px-5 lg:px-8 py-8 md:py-12 scroll-mt-32">
        <div className="timeline-wrap space-y-6 md:space-y-10">
          {renderMomentRows(sorted, setLightbox)}
        </div>
      </section>

      {/* 底部小寄语 */}
      <section id="letter" className="max-w-3xl mx-auto px-5 lg:px-8 pb-16 scroll-mt-32">
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-br from-emerald-400 via-sky-400 to-rose-400 text-white text-center shadow-lg">
          <div className="text-4xl mb-3">🌿</div>
          <p className="text-base md:text-lg font-bold leading-relaxed">
            那些你以为会忘记的小事，
            <br />
            其实都被我们好好收起来了。
          </p>
        </div>
      </section>

      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onChange={(next) => setLightbox(next)}
        />
      )}

      {/* 页内导航浮标：所有节点按年份分组 */}
      <MobileAnchorFab
        title="生活点滴 · 时间线"
        anchors={sorted.map((m) => ({
          id: m.id,
          label: `${m.emoji} ${m.title}`,
          icon: 'ri-calendar-event-line',
          group: m.date.slice(0, 4) + ' 年',
        }))}
      />
    </div>
  )
}

// ========================================================================
// 渲染整条时间线（按年份分组，每年开头插入 sticky 年份胶囊）
// ========================================================================
function renderMomentRows(
  items: DailyMoment[],
  setLightbox: (s: LightboxState | null) => void,
) {
  const out: React.ReactElement[] = []
  let lastYear = ''
  items.forEach((m, idx) => {
    const y = m.date.slice(0, 4)
    if (y !== lastYear) {
      out.push(
        <div
          key={`y-${y}`}
          id={`y-${y}`}
          className="flex justify-center mb-2 scroll-mt-32"
        >
          <span className="px-4 py-1 rounded-full bg-white text-slate-500 text-xs font-semibold ring-1 ring-slate-200">
            {y} 年
          </span>
        </div>
      )
      lastYear = y
    }
    out.push(
      <MomentRow
        key={m.id}
        moment={m}
        index={idx}
        onOpenLightbox={(imgs, i) => setLightbox({ images: imgs, index: i })}
      />
    )
  })
  return out
}

// ========================================================================
// 单条时间线节点
// ========================================================================
function MomentRow({
  moment,
  index,
  onOpenLightbox,
}: {
  moment: DailyMoment
  index: number
  onOpenLightbox: (images: string[], index: number) => void
}) {
  const side = index % 2 === 0 ? 'timeline-row-left' : 'timeline-row-right'

  return (
    <div id={moment.id} className={`${side} pl-10 md:pl-0 scroll-mt-24`}>
      <span className="timeline-dot" style={{ borderColor: '#10b981' }} />
      <div className="bubble">
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl md:text-4xl leading-none shrink-0">{moment.emoji}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-bold text-slate-400">{formatDate(moment.date)}</span>
              <span className="text-[11px] font-semibold text-slate-500">· {moment.age}</span>
              {moment.tag && (
                <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700">
                  {moment.tag}
                </span>
              )}
            </div>
            <div className="text-base font-bold text-slate-800 leading-snug">
              {moment.title}
            </div>
            <div className="text-sm text-slate-500 mt-1 leading-relaxed">{moment.desc}</div>
          </div>
        </div>

        {/* 3 张照片 or 占位 */}
        <MomentPhotos
          moment={moment}
          onOpen={(i) => {
            if (moment.photos.length > 0) onOpenLightbox(moment.photos, i)
          }}
        />
      </div>
    </div>
  )
}

function MomentPhotos({
  moment,
  onOpen,
}: {
  moment: DailyMoment
  onOpen: (index: number) => void
}) {
  const hasPhotos = moment.photos.length > 0
  const cells = hasPhotos ? moment.photos : [null, null, null]

  return (
    <div className="grid grid-cols-3 gap-1.5 md:gap-2 mt-2">
      {cells.map((p, i) => (
        <button
          key={i}
          type="button"
          onClick={() => p && onOpen(i)}
          className={`aspect-square rounded-lg md:rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 transition ${
            p ? 'hover:ring-emerald-300 cursor-zoom-in' : 'cursor-default'
          }`}
          aria-label={p ? `查看第 ${i + 1} 张` : '待补照片'}
        >
          {p ? (
            <img src={p} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <div className="text-2xl opacity-70">{moment.emoji}</div>
              <div className="text-[9px] mt-0.5 tracking-wider">待补</div>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

// ========================================================================
// Lightbox（抽出复用，与 MilestoneAlbumPage 保持一致 UX）
// ========================================================================
function Lightbox({
  state,
  onClose,
  onChange,
}: {
  state: LightboxState
  onClose: () => void
  onChange: (next: LightboxState) => void
}) {
  const { images, index } = state
  const total = images.length

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onChange({ images, index: (index - 1 + total) % total })
      else if (e.key === 'ArrowRight') onChange({ images, index: (index + 1) % total })
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images, index, total, onClose, onChange])

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img
        src={images[index]}
        alt=""
        className="max-w-full max-h-full object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onChange({ images, index: (index - 1 + total) % total })
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-2xl backdrop-blur transition"
            aria-label="上一张"
          >
            <i className="ri-arrow-left-s-line" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onChange({ images, index: (index + 1) % total })
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-2xl backdrop-blur transition"
            aria-label="下一张"
          >
            <i className="ri-arrow-right-s-line" />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-5 right-5 text-white/80 hover:text-white"
        aria-label="关闭"
      >
        <i className="ri-close-line text-3xl" />
      </button>
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/15 text-white text-xs backdrop-blur">
          {index + 1} / {total}
        </div>
      )}
    </div>
  )
}
