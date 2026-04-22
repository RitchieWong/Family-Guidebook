import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrderedCategories } from '../content/categories'
import CategoryCard from '../components/CategoryCard'
import { MILESTONES, BIRTHDAY } from '../content/milestones'
import { STATUS, ACCENT } from '../content/constants'
import type { Category, CategoryItem } from '../content/types'
import MobileAnchorFab from '../components/MobileAnchorFab'

/**
 * 每个分类的卡片主题：
 *   - softGrad：卡片柔色渐变（粉彩中等饱和度，匹配水彩插画）
 *   - ringColor：卡片外边细描边色（主题色淡边，强调边界）
 *   - shadowStyle：主题色染色阴影（视觉立体感）
 *   - titleColor / subColor：文字色
 *   - bg / corner：emoji 装饰
 *   - image：AI 插画路径
 */
const CATEGORY_DECOR: Record<
  string,
  {
    softGrad: string
    ringColor: string
    shadowStyle: string
    titleColor: string
    subColor: string
    badgeBg: string
    badgeText: string
    bg: string
    corner: string
    image: string
    drawerGrad: string
  }
> = {
  growth: {
    softGrad: 'from-rose-100 via-amber-50 to-orange-100',
    ringColor: 'ring-rose-200/70',
    shadowStyle: 'shadow-[0_6px_20px_-8px_rgba(244,114,182,0.45),0_2px_6px_-2px_rgba(251,146,60,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]',
    titleColor: 'text-rose-700',
    subColor: 'text-rose-400/80',
    badgeBg: 'bg-white/80 ring-rose-200',
    badgeText: 'text-rose-500',
    bg: '🌷',
    corner: '✨',
    image: 'icons/categories/growth.png',
    drawerGrad: 'from-rose-200 via-rose-100 to-amber-100',
  },
  travel: {
    softGrad: 'from-sky-100 via-cyan-50 to-blue-100',
    ringColor: 'ring-sky-200/70',
    shadowStyle: 'shadow-[0_6px_20px_-8px_rgba(56,189,248,0.5),0_2px_6px_-2px_rgba(14,165,233,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]',
    titleColor: 'text-sky-700',
    subColor: 'text-sky-400/80',
    badgeBg: 'bg-white/80 ring-sky-200',
    badgeText: 'text-sky-500',
    bg: '☁️',
    corner: '🧳',
    image: 'icons/categories/travel.png',
    drawerGrad: 'from-sky-200 via-sky-100 to-cyan-100',
  },
  album: {
    softGrad: 'from-cyan-100 via-sky-50 to-indigo-100',
    ringColor: 'ring-cyan-200/70',
    shadowStyle: 'shadow-[0_6px_20px_-8px_rgba(34,211,238,0.5),0_2px_6px_-2px_rgba(99,102,241,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]',
    titleColor: 'text-cyan-700',
    subColor: 'text-cyan-400/80',
    badgeBg: 'bg-white/80 ring-cyan-200',
    badgeText: 'text-cyan-500',
    bg: '🌈',
    corner: '💕',
    image: 'icons/categories/album.png',
    drawerGrad: 'from-cyan-200 via-cyan-100 to-indigo-100',
  },
  'mini-programs': {
    softGrad: 'from-violet-100 via-fuchsia-50 to-pink-100',
    ringColor: 'ring-violet-200/70',
    shadowStyle: 'shadow-[0_6px_20px_-8px_rgba(167,139,250,0.5),0_2px_6px_-2px_rgba(236,72,153,0.22),inset_0_1px_0_rgba(255,255,255,0.9)]',
    titleColor: 'text-violet-700',
    subColor: 'text-violet-400/80',
    badgeBg: 'bg-white/80 ring-violet-200',
    badgeText: 'text-violet-500',
    bg: '🎨',
    corner: '🧩',
    image: 'icons/categories/mini-programs.png',
    drawerGrad: 'from-violet-200 via-fuchsia-100 to-pink-100',
  },
}

export default function HomePage() {
  const categories = getOrderedCategories()

  const recent = [...MILESTONES]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4)

  return (
    <>
      {/* ============================================================
       * 移动端首屏：Hero + 小世界 一屏搞定（极简纯净风格）
       * ============================================================ */}
      <section id="hero" className="md:hidden relative overflow-hidden bg-gradient-to-b from-rose-50 via-amber-50/40 to-white">
        {/* 顶部柔和光斑装饰 */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-rose-200/50 blur-3xl pointer-events-none" />
        <div className="absolute top-32 -left-20 w-48 h-48 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.04] dotted-circle pointer-events-none" />

        <div className="relative px-5 pt-6 pb-8">
          {/* Hero 文字区 */}
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[10px] text-slate-700 ring-1 ring-rose-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                一家人围着暄暄转
                <span>🌸</span>
              </div>
              <h1 className="mt-3 text-[2rem] font-black tracking-tight text-slate-900 leading-[1.05]">
                <span className="cute-zh">欢迎来到</span>
                <span className="block mt-1 cute-zh">
                  <span className="title-grad underline-doodle">暄暄的家</span>
                </span>
              </h1>
            </div>
            {/* 插画小头像：圆形裁剪，房子+小女孩居中 */}
            <div className="shrink-0 relative">
              <div
                className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg bg-gradient-to-br from-rose-100 to-amber-100 bg-no-repeat"
                style={{
                  backgroundImage: `url(${import.meta.env.BASE_URL}hero/hero-bg.png)`,
                  backgroundSize: '165% auto',
                  backgroundPosition: '82% 45%',
                }}
                aria-hidden
              />
              <span className="absolute -bottom-1 -left-1 text-xl drop-shadow">🌷</span>
            </div>
          </div>

          {/* 描述（完整文案） */}
          <p className="mt-4 text-[13px] text-slate-600 leading-relaxed">
            这里是我们一家的<span className="cute-zh text-rose-500 font-semibold">慢速时光机</span>——
            把每一趟远行、每一个夜里敲出的小程序、每一声咿呀和每一次踮脚，
            都轻轻收进这座小小的家。 从{' '}
            <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-600 font-semibold whitespace-nowrap">
              {BIRTHDAY}
            </span>{' '}
            谷雨那天的第一声啼哭起，愿这里替我们留下所有会被岁月带走的温柔 ✨
          </p>

          {/* 小世界分类卡片 */}
          <MobileCategoryGrid categories={categories} />
        </div>
      </section>

      {/* ============================================================
       * 桌面端保留原 Hero
       * ============================================================ */}
      <section id="hero-desktop" className="hidden md:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50" />
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[center_right] md:bg-right xl:bg-[right_center] 2xl:bg-[right_center]"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero/hero-bg.png)` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,247,242,0.88)_0%,rgba(255,247,242,0.55)_44%,rgba(255,247,242,0.08)_64%,rgba(255,247,242,0)_80%)] xl:bg-[linear-gradient(100deg,rgba(255,247,242,0.92)_0%,rgba(255,247,242,0.7)_38%,rgba(255,247,242,0.25)_56%,rgba(255,247,242,0)_72%)]" />
        <div className="absolute inset-0 opacity-[0.08] dotted-circle pointer-events-none" />

        <div className="relative max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pt-20 pb-14 xl:pt-24 xl:pb-16 min-h-[560px] xl:min-h-[620px] 2xl:min-h-[680px]">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-7 2xl:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur text-xs text-slate-600 ring-1 ring-rose-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                一家人围着暄暄转的小天地
                <span>🌸</span>
              </div>

              <h1 className="mt-5 text-7xl xl:text-[5.5rem] 2xl:text-[6rem] font-black tracking-tight text-slate-900 leading-[1.05]">
                <span className="cute-zh">欢迎来到</span>
                <span className="block mt-3 cute-zh">
                  <span className="title-grad underline-doodle">暄暄的家</span>
                </span>
              </h1>

              <p className="mt-7 max-w-lg xl:max-w-xl text-lg xl:text-xl text-slate-700 leading-relaxed">
                这里是我们一家的<span className="cute-zh text-rose-500 font-semibold">慢速时光机</span>——
                把每一趟远行、每一个夜里敲出的小程序、每一声咿呀和每一次踮脚，
                都轻轻收进这座小小的家。
                <br />
                从{' '}
                <span className="px-2 py-0.5 rounded-md bg-rose-100/80 text-rose-600 font-semibold">
                  {BIRTHDAY}
                </span>{' '}
                谷雨那天的第一声啼哭起，愿这里替我们留下所有会被岁月带走的温柔 ✨
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/growth/milestones"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 text-white text-sm font-semibold shadow-lg shadow-rose-300/50 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <i className="ri-book-open-line text-base" />
                  翻开成长日记
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/travel/2026-labor-day"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur text-slate-700 text-sm font-semibold ring-1 ring-slate-200 hover:ring-rose-300 hover:text-rose-600 hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  <i className="ri-road-map-line text-base" />
                  最近的旅行路书
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 text-rose-400 handwrite text-2xl">
                <i className="ri-arrow-down-line text-lg rotate-12 -mt-1" />
                <span>made with love by 爸爸 &amp; 妈妈</span>
              </div>
            </div>

            <div className="col-span-5 2xl:col-span-6" aria-hidden />
          </div>
        </div>
      </section>

      {/* ============ Categories（仅桌面端展示） ============ */}
      <section id="explore" className="hidden md:block max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-16 xl:py-20 scroll-mt-20">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold text-rose-500">
              <span className="w-6 h-px bg-rose-300" /> EXPLORE
            </div>
            <h2 className="text-4xl font-black text-slate-900 cute-zh">
              小世界 · <span className="title-grad">分门别类</span> 🧩
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              每个小方块里，都是围着暄暄转的心意。
            </p>
          </div>
          <span className="handwrite text-rose-400 text-2xl rotate-2">pick one ↘</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 xl:gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* ============ Recent Moments ============ */}
      <section id="lately" className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pt-4 md:pt-0 pb-12 md:pb-24 scroll-mt-20">
        <div className="flex items-end justify-between mb-4 md:mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 md:mb-2 text-[11px] md:text-xs font-semibold text-amber-500">
              <span className="w-6 h-px bg-amber-300" /> LATELY
            </div>
            <h2 className="text-xl md:text-4xl font-black text-slate-900 cute-zh">
              最近的 <span className="title-grad">小时光</span> 🌷
            </h2>
          </div>
          <Link
            to="/growth/milestones"
            className="inline-flex items-center gap-1 text-xs md:text-sm text-slate-500 hover:text-rose-500 transition"
          >
            查看全部
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 xl:gap-5">
          {recent.map((m, i) => (
            <Link
              key={i}
              to="/growth/milestones"
              className="relative bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 ring-1 ring-rose-100/70 hover:ring-rose-300 hover:-translate-y-1 transition-all shadow-sm hover:shadow-xl overflow-hidden group"
            >
              <span className="absolute -right-2 -top-2 text-5xl md:text-7xl opacity-10 select-none group-hover:opacity-20 transition">
                {m.emoji}
              </span>
              <div className="relative">
                <div className="text-xl md:text-3xl mb-0.5 md:mb-2">{m.emoji}</div>
                <div className="text-[10px] md:text-xs text-slate-400">
                  {m.date} · {m.age}
                </div>
                <div className="mt-0.5 md:mt-1.5 text-xs md:text-base font-semibold text-slate-800 leading-snug line-clamp-2">
                  {m.title}
                </div>
                {m.tag && (
                  <span className="mt-1 md:mt-2 inline-block text-[10px] md:text-[11px] px-1.5 md:px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                    #{m.tag}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 移动端锚点浮标 */}
      <MobileAnchorFab
        anchors={[
          { id: 'hero', label: '首页 · 欢迎', icon: 'ri-home-4-line' },
          { id: 'lately', label: '最近小时光', icon: 'ri-sparkling-2-line' },
        ]}
      />
    </>
  )
}

/* ============================================================
 * 移动端：小世界九宫格
 *   - 3 列方形瓦片（emoji + 标题 + 数量），无滚动条
 *   - 点击瓦片 → 在下方就地展开该分类的子项列表（accordion）
 *   - 再次点击同一瓦片 → 收起；切换分类 → 平滑切换
 * ============================================================ */
function MobileCategoryGrid({ categories }: { categories: Category[] }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = activeId ? categories.find((c) => c.id === activeId) : null
  const drawerRef = useRef<HTMLDivElement>(null)

  /**
   * 展开后把 drawer 滚到视口中：
   *   - 主 Nav sticky 高度 = 64px
   *   - 顶部呼吸空间 = 12px
   *   - 让 drawer 的**顶部**正好贴在 Nav 下方，这样整个 drawer（含底部 CTA）
   *     基本都能在一屏看到；即使被 iPhone 刘海/底部 home indicator 压一点，
   *     CTA 也因为 drawer 内部 flex 布局 + safe-area padding 而始终可点。
   *   - 使用双 rAF 等待 accordion transition 开始后再滚（避免位置计算偏移）
   */
  useEffect(() => {
    if (!active || !drawerRef.current) return
    const el = drawerRef.current
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const NAV_H = 64
        const BREATH = 12
        const targetTop = window.scrollY + rect.top - NAV_H - BREATH
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
      })
    })
    return () => cancelAnimationFrame(id)
  }, [active?.id])

  return (
    <div className="mt-5">
      {/* 标题 */}
      <div className="flex items-end justify-between mb-2.5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-rose-500 tracking-widest">
            <span className="w-4 h-px bg-rose-300" /> EXPLORE
          </div>
          <h2 className="text-lg font-black text-slate-900 cute-zh mt-0.5">
            小世界 · <span className="title-grad">分门别类</span>
          </h2>
        </div>
        {active && (
          <button
            onClick={() => setActiveId(null)}
            className="text-[11px] text-slate-400 hover:text-rose-500 inline-flex items-center gap-1"
          >
            <i className="ri-close-line" /> 收起
          </button>
        )}
      </div>

      {/* 九宫格瓦片 · 2 列大卡，每卡一个分类 */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((c) => {
          const isActive = c.id === active?.id
          const decor = CATEGORY_DECOR[c.id]
          if (!decor) return null
          return (
            <button
              key={c.id}
              onClick={() => setActiveId((cur) => (cur === c.id ? null : c.id))}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 active:scale-[0.97] text-left ring-1 ${decor.ringColor} ${decor.shadowStyle} ${
                isActive ? 'scale-[0.98]' : 'hover:-translate-y-0.5'
              }`}
            >
              {/* 主体：柔色粉彩渐变（搭配白底插画） */}
              <div className={`relative bg-gradient-to-br ${decor.softGrad} p-4 min-h-[124px]`}>
                {/* 右下大背景 emoji（淡化装饰） */}
                <div className="absolute -right-3 -bottom-4 text-[92px] leading-none opacity-25 select-none pointer-events-none rotate-[-8deg] group-hover:rotate-0 group-hover:scale-110 transition duration-500">
                  {decor.bg}
                </div>

                {/* 左上白色柔光斑 */}
                <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full bg-white/70 blur-2xl pointer-events-none" />

                {/* AI 插画（主视觉，mix-blend-multiply 让白底完美融入彩色卡面） + 数量徽章 */}
                <div className="relative flex items-start justify-between">
                  <div
                    className={`relative transition ${
                      isActive ? 'scale-110 -rotate-6' : 'group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${decor.image}`}
                      alt=""
                      className="w-[64px] h-[64px] object-contain drop-shadow-[0_2px_6px_rgba(244,114,182,0.25)] [mix-blend-mode:multiply]"
                      loading="lazy"
                    />
                    {/* 角落小装饰 emoji */}
                    <span className="absolute -top-1 -right-1 text-base drop-shadow-sm">
                      {decor.corner}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full ring-1 backdrop-blur text-[10px] font-bold shadow-sm ${decor.badgeBg} ${decor.badgeText}`}
                  >
                    {c.items.length}
                  </span>
                </div>

                {/* 标题 */}
                <div className="relative mt-2">
                  <div
                    className={`font-bold text-[15px] leading-tight cute-zh tracking-wide ${decor.titleColor}`}
                  >
                    {c.title}
                  </div>
                  <div
                    className={`text-[10px] uppercase tracking-wider mt-0.5 truncate ${decor.subColor}`}
                  >
                    {c.subtitle}
                  </div>
                </div>

                {/* 激活时右下箭头变成向下 */}
                <i
                  className={`absolute bottom-2.5 right-3 z-10 text-sm transition ${decor.titleColor} opacity-70 ${
                    isActive ? 'ri-arrow-up-s-line' : 'ri-arrow-right-s-line'
                  }`}
                />
              </div>

              {/* 激活指示三角（指向下方 drawer） */}
              {isActive && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 -bottom-[1px] z-20 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent"
                  style={{ borderTopColor: 'white' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* 展开的子项抽屉（紧贴九宫格下方 · 一屏可见）
          - 使用 dvh 动态视口高度（iOS 下会排除地址栏 + 刘海/底部 home indicator）
          - max-height 控制为：视口 - 主 Nav(64) - drawer 顶部距离(~180，根据 Hero 文案估算)
          - CategoryDrawer 内部自带 flex 布局，超出的子项在内部滚动，CTA 固定底部 */}
      <div
        ref={drawerRef}
        className={`overflow-hidden transition-all duration-300 ease-out ${
          active
            ? 'max-h-[min(640px,calc(100dvh-80px))] opacity-100 mt-3'
            : 'max-h-0 opacity-0 mt-0'
        }`}
        style={{ scrollMarginTop: '76px' }}
      >
        {active && <CategoryDrawer category={active} />}
      </div>

      {/* 未激活时的提示 */}
      {!active && (
        <div className="mt-3 text-center text-[11px] text-slate-400">
          <i className="ri-finger-tap-line mr-1" />
          轻触上方任一方块 · 查看里面的小世界
        </div>
      )}
    </div>
  )
}

/** 展开抽屉：分类的子项列表（浅色调，与九宫格卡呼应） */
function CategoryDrawer({ category }: { category: Category }) {
  const accent = ACCENT[category.accent]
  const decor = CATEGORY_DECOR[category.id]
  const drawerGrad = decor?.drawerGrad || 'from-slate-100 via-slate-50 to-slate-100'
  const titleColor = decor?.titleColor || 'text-slate-700'

  return (
    <div
      className={`flex flex-col rounded-2xl overflow-hidden bg-white ring-1 ${decor?.ringColor || 'ring-slate-200'} shadow-md animate-[fadeUp_0.3s_ease-out]`}
      style={{ maxHeight: 'min(640px, calc(100dvh - 80px))' }}
    >
      {/* 描述条（浅色粉彩 + 深色文字） */}
      <div className={`relative shrink-0 px-4 py-3 bg-gradient-to-br ${drawerGrad}`}>
        {/* 顶部白色高光 */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/70 pointer-events-none" />
        <p className={`relative text-[12px] leading-relaxed line-clamp-2 ${titleColor}`}>
          {category.desc}
        </p>
      </div>

      {/* 子项列表（超出内部滚动，保证底部 CTA 始终可见） */}
      <ul className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100 no-scrollbar">
        {category.items.map((item) => (
          <MobileSubItem key={item.id} item={item} />
        ))}
      </ul>

      {/* Footer CTA（固定底部 + 安全区 padding，避开 iPhone home indicator） */}
      <Link
        to={`/category/${category.id}`}
        className={`shrink-0 px-4 py-2.5 border-t border-slate-100 text-xs ${accent.solid} flex items-center justify-between bg-slate-50/60`}
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <span>查看 {category.title} 全部 {category.items.length} 项</span>
        <i className="ri-arrow-right-line" />
      </Link>
    </div>
  )
}

function MobileSubItem({ item }: { item: CategoryItem }) {
  const status = STATUS[item.status]

  const inner = (
    <div className="px-4 py-2.5 flex items-center gap-3">
      <div className="text-lg shrink-0">{item.cover || '✨'}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-slate-800 truncate">{item.title}</div>
        {item.subtitle && (
          <div className="text-[10px] text-slate-500 truncate">{item.subtitle}</div>
        )}
      </div>
      <span
        className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] ${status.bg} ${status.text}`}
      >
        <span className={`w-1 h-1 rounded-full ${status.dot}`} />
        {status.label}
      </span>
    </div>
  )

  if (item.to) {
    return (
      <li>
        <Link to={item.to} className="block active:bg-slate-50 transition">
          {inner}
        </Link>
      </li>
    )
  }
  if (item.href) {
    return (
      <li>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="block active:bg-slate-50 transition"
        >
          {inner}
        </a>
      </li>
    )
  }
  return <li>{inner}</li>
}
