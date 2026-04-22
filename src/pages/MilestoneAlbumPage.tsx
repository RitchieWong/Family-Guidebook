import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MILESTONE_ALBUM_META,
  MILESTONE_STORIES,
  SEASON_BADGE,
  STORY_BG,
  type MilestoneStory,
  type GalleryPhoto,
} from '../content/milestone-album'
import { MILESTONES } from '../content/milestones'
import { formatDate } from '../content/constants'
import { scrollToSection } from '../utils/scrollToSection'
import MobileAnchorFab from '../components/MobileAnchorFab'
import StickyPageNav from '../components/StickyPageNav'

interface LightboxState {
  images: string[]
  index: number
}

export default function MilestoneAlbumPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  return (
    <div className="bg-[#fff7f2]">
      {/* 顶部 sticky 二级导航 */}
      <StickyPageNav
        back={{ to: '/category/album', label: '家庭相册' }}
        accent="rose"
        sections={[
          { id: 'hero', label: '顶部', emoji: '🌷' },
          ...MILESTONE_STORIES.map((s) => ({
            id: s.id,
            label: s.stage,
            emoji: s.fallbackEmoji,
          })),
          { id: 'footer-letter', label: '家书', emoji: '💌' },
        ]}
      />

      <Hero />

      {MILESTONE_STORIES.map((s, idx) => (
        <StorySection
          key={s.id}
          story={s}
          index={idx}
          onOpenLightbox={(images, index) => setLightbox({ images, index })}
        />
      ))}

      <FooterLetter />

      <MobileAnchorFab
        title="成长里程碑"
        anchors={[
          { id: 'hero', label: '顶部介绍', icon: 'ri-star-line', group: '页面板块' },
          ...MILESTONE_STORIES.map((s) => ({
            id: s.id,
            label: `${s.order}. ${s.stage} · ${s.title}`,
            icon: 'ri-image-2-line',
            group: '5 个节点',
          })),
        ]}
      />

      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onChange={(next) => setLightbox(next)}
        />
      )}
    </div>
  )
}

// ========================================================================
// Hero
// ========================================================================
function Hero() {
  return (
    <header id="hero" className="relative overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50" />
      <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="absolute bottom-10 -right-10 w-80 h-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute top-16 right-8 text-7xl opacity-15 select-none hidden md:block">
        🌷
      </div>

      <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-6 md:pt-10 pb-8 md:pb-14">
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-3 md:mb-5 flex-wrap">
          <Link to="/" className="hover:text-rose-600 inline-flex items-center gap-1">
            <i className="ri-home-4-line" /> 首页
          </Link>
          <i className="ri-arrow-right-s-line" />
          <Link to="/category/album" className="hover:text-rose-600">
            家庭相册
          </Link>
          <i className="ri-arrow-right-s-line" />
          <span className="text-slate-700 font-medium">{MILESTONE_ALBUM_META.title}</span>
        </nav>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-rose-200 text-rose-700 text-[11px] md:text-xs font-semibold mb-3 md:mb-4">
          <i className="ri-heart-3-fill" />
          <span>5 个节点 · 5 封家书 · 一路走来的那些瞬间</span>
        </div>

        <h1 className="text-3xl md:text-6xl font-black leading-tight">
          <span className="handwrite text-slate-800">{MILESTONE_ALBUM_META.title}</span>
        </h1>
        <div className="mt-1 md:mt-2 text-xs md:text-base tracking-[0.3em] text-rose-500 font-semibold uppercase">
          {MILESTONE_ALBUM_META.subtitle}
        </div>
        <p className="mt-3 md:mt-5 max-w-2xl text-xs md:text-base text-slate-600 leading-relaxed">
          {MILESTONE_ALBUM_META.description}
        </p>

        <div className="mt-5 md:mt-8 flex flex-wrap gap-2">
          {MILESTONE_STORIES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollToSection(e, s.id)}
              className="group inline-flex items-center gap-1.5 pl-2 pr-3 py-1.5 rounded-full bg-white ring-1 ring-slate-200 text-xs font-medium text-slate-700 hover:ring-rose-300 hover:text-rose-600 transition"
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 flex items-center justify-center text-[10px] font-bold">
                {s.order}
              </span>
              <span>{s.stage}</span>
              {s.gallery.length > 0 && (
                <span className="text-[10px] text-slate-400 group-hover:text-rose-400">
                  · {s.gallery.length + 1}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}

// ========================================================================
// 单张节点叙事（主图 + 家书 + 画廊）
// ========================================================================
function StorySection({
  story,
  index,
  onOpenLightbox,
}: {
  story: MilestoneStory
  index: number
  onOpenLightbox: (images: string[], index: number) => void
}) {
  const imageOnLeft = index % 2 === 0

  const linked = useMemo(
    () =>
      (story.linkedDates || [])
        .map((d) => MILESTONES.find((m) => m.date === d))
        .filter((v): v is (typeof MILESTONES)[number] => Boolean(v)),
    [story.linkedDates]
  )

  // 主图 + 画廊 src 集合（给 lightbox 用）
  const allImages = useMemo(() => {
    const arr: string[] = []
    if (story.imageSrc) arr.push(story.imageSrc)
    story.gallery.forEach((g) => arr.push(g.src))
    return arr
  }, [story.imageSrc, story.gallery])

  return (
    <section
      id={story.id}
      className={`relative py-10 md:py-20 scroll-mt-32 bg-gradient-to-br ${STORY_BG[story.accent]}`}
    >
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center ${
            imageOnLeft ? '' : 'md:[&>:first-child]:order-2'
          }`}
        >
          <PhotoCard
            story={story}
            onOpen={() => {
              if (allImages.length > 0) onOpenLightbox(allImages, 0)
            }}
          />

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-sm font-bold shadow">
                {story.order}
              </span>
              <span className="text-xs tracking-[0.25em] font-semibold text-slate-500 uppercase">
                {story.stageEn} · {story.stage}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                <i className="ri-calendar-event-line" />
                {formatDate(story.date)}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500">{story.age}</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ring-1 ${
                  SEASON_BADGE[story.accent]
                }`}
              >
                <i className="ri-plant-line" />
                {story.season}
              </span>
            </div>

            <h2 className="handwrite text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-4">
              {story.title}
            </h2>

            <StatsBar story={story} />

            <p className="mt-5 text-slate-700 leading-[1.9] text-[15px] md:text-base">
              {story.letter}
            </p>

            {linked.length > 0 && (
              <div className="mt-6 rounded-2xl bg-white/60 backdrop-blur ring-1 ring-white px-4 py-3">
                <div className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mb-2">
                  这段日子的成就解锁
                </div>
                <div className="space-y-1.5">
                  {linked.map((m, i) => (
                    <div key={i} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="shrink-0">{m.emoji}</span>
                      <div className="min-w-0">
                        <span className="font-medium">{m.title}</span>
                        <span className="text-xs text-slate-400 ml-2">
                          {formatDate(m.date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 画廊 */}
        {story.gallery.length > 0 && (
          <Gallery
            stage={story.stage}
            items={story.gallery}
            onOpen={(idx) => onOpenLightbox(allImages, idx + (story.imageSrc ? 1 : 0))}
          />
        )}
      </div>
    </section>
  )
}

// ========================================================================
// 主图卡
// ========================================================================
function PhotoCard({ story, onOpen }: { story: MilestoneStory; onOpen: () => void }) {
  const [errored, setErrored] = useState(false)
  const hasImage = Boolean(story.image) && !errored

  return (
    <div className="relative">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-sm bg-amber-200/70 rotate-[-2deg] shadow-sm z-10" />

      <button
        type="button"
        onClick={() => hasImage && onOpen()}
        className={`relative w-full aspect-[3/4] rounded-[28px] overflow-hidden bg-white ring-1 ring-slate-200 shadow-[0_20px_50px_-20px_rgba(244,63,94,0.25)] ${
          hasImage ? 'cursor-zoom-in' : 'cursor-default'
        }`}
        aria-label={hasImage ? '查看大图' : undefined}
      >
        {hasImage ? (
          <img
            src={story.image}
            alt={`${story.stage} · ${story.title}`}
            loading="lazy"
            onError={() => setErrored(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-400 bg-gradient-to-br from-slate-50 to-white">
            <div className="text-7xl opacity-60">{story.fallbackEmoji}</div>
            <div className="text-xs tracking-widest">照片待补</div>
            <div className="text-[10px] text-slate-300">
              {story.stage} · {formatDate(story.date)}
            </div>
          </div>
        )}

        {hasImage && (
          <div className="absolute bottom-3 right-4 handwrite text-white text-right text-sm md:text-base leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] select-none pointer-events-none">
            <div>{formatDate(story.date)}</div>
            {story.stats.weight && story.stats.weight !== '—' && (
              <div className="text-xs md:text-sm">{story.stats.weight}</div>
            )}
            {story.stats.height && story.stats.height !== '—' && (
              <div className="text-xs md:text-sm">{story.stats.height}</div>
            )}
          </div>
        )}
      </button>

      <div className="absolute -bottom-6 -right-2 handwrite text-[100px] leading-none text-rose-200/50 select-none pointer-events-none">
        {story.order}
      </div>
    </div>
  )
}

// ========================================================================
// 画廊（小图网格）
// ========================================================================
function Gallery({
  stage,
  items,
  onOpen,
}: {
  stage: string
  items: GalleryPhoto[]
  onOpen: (index: number) => void
}) {
  return (
    <div className="mt-12 md:mt-16">
      <div className="flex items-center gap-2 mb-4">
        <i className="ri-image-line text-slate-400" />
        <span className="text-xs tracking-[0.25em] font-semibold text-slate-500 uppercase">
          {stage} · 那些瞬间
        </span>
        <span className="text-xs text-slate-400">共 {items.length} 张</span>
        <div className="flex-1 h-px bg-slate-200/70 ml-3" />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
        {items.map((g, i) => (
          <button
            key={g.thumb}
            type="button"
            onClick={() => onOpen(i)}
            className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 hover:ring-rose-300 transition shadow-sm cursor-zoom-in"
            aria-label={`查看第 ${i + 1} 张`}
          >
            <img
              src={g.thumb}
              alt={`${stage} ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 ring-0 group-hover:ring-4 group-hover:ring-rose-300/30 transition pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ========================================================================
// 数据小条
// ========================================================================
function StatsBar({ story }: { story: MilestoneStory }) {
  const items: Array<{ icon: string; label: string; value: string }> = []
  if (story.stats.weight && story.stats.weight !== '—') {
    items.push({ icon: 'ri-scales-3-line', label: '体重', value: story.stats.weight })
  }
  if (story.stats.height && story.stats.height !== '—') {
    items.push({ icon: 'ri-ruler-line', label: '身长', value: story.stats.height })
  }
  story.stats.extras?.forEach((e) => items.push(e))

  if (items.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white ring-1 ring-slate-200 text-sm"
        >
          <i className={`${it.icon} text-slate-400`} />
          <span className="text-slate-500 text-xs">{it.label}</span>
          <span className="font-semibold text-slate-800">{it.value}</span>
        </div>
      ))}
    </div>
  )
}

// ========================================================================
// Lightbox（支持左右切换 + 键盘）
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
      else if (e.key === 'ArrowLeft') {
        onChange({ images, index: (index - 1 + total) % total })
      } else if (e.key === 'ArrowRight') {
        onChange({ images, index: (index + 1) % total })
      }
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

// ========================================================================
// 底部尾签
// ========================================================================
function FooterLetter() {
  return (
    <section id="footer-letter" className="relative py-16 md:py-20 overflow-hidden scroll-mt-32">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        <div className="relative rounded-[32px] p-8 md:p-14 bg-gradient-to-br from-rose-400 via-pink-400 to-amber-400 text-white text-center shadow-xl overflow-hidden">
          <div className="absolute -top-8 -left-6 text-8xl opacity-15 select-none">🌷</div>
          <div className="absolute -bottom-8 -right-6 text-8xl opacity-15 select-none">💌</div>
          <div className="relative">
            <div className="text-xs uppercase tracking-[0.3em] opacity-80 mb-4">
              To · Xuanxuan
            </div>
            <p className="handwrite text-2xl md:text-3xl leading-[1.7] max-w-2xl mx-auto">
              等你长大以后，
              <br />
              翻开这个小册子看，
              <br />
              一定要记得——
              <br />
              爸爸妈妈一直都在呀。
            </p>
            <div className="mt-6 text-sm opacity-80">—— 爸爸 · 妈妈</div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-sm">
          <Link
            to="/category/album"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600"
          >
            <i className="ri-arrow-left-line" /> 回到家庭相册
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/growth/milestones"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-600"
          >
            查看完整时间线 <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  )
}
