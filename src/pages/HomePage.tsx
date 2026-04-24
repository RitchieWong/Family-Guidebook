import { useState } from 'react'
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
  membership: {
    softGrad: 'from-emerald-100 via-teal-50 to-sky-100',
    ringColor: 'ring-emerald-200/70',
    shadowStyle: 'shadow-[0_6px_20px_-8px_rgba(52,211,153,0.5),0_2px_6px_-2px_rgba(45,212,191,0.25),inset_0_1px_0_rgba(255,255,255,0.9)]',
    titleColor: 'text-emerald-700',
    subColor: 'text-emerald-400/80',
    badgeBg: 'bg-white/80 ring-emerald-200',
    badgeText: 'text-emerald-600',
    bg: '🏬',
    corner: '🪪',
    image: 'icons/categories/album.png',
    drawerGrad: 'from-emerald-200 via-teal-100 to-sky-100',
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

        <div className="relative px-5 pt-3 pb-3">
          {/* Hero 文字区（紧凑：头像缩小，文字行距收紧） */}
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[10px] text-slate-700 ring-1 ring-rose-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                一家人围着暄暄转
                <span>🌸</span>
              </div>
              <h1 className="mt-1.5 text-[1.75rem] font-black tracking-tight text-slate-900 leading-[1.05]">
                <span className="cute-zh">欢迎来到</span>
                <span className="block mt-0.5 cute-zh">
                  <span className="title-grad underline-doodle">暄暄的家</span>
                </span>
              </h1>
            </div>
            {/* 插画小头像：圆形裁剪，房子+小女孩居中 */}
            <div className="shrink-0 relative">
              <div
                className="w-20 h-20 rounded-full ring-4 ring-white shadow-lg bg-gradient-to-br from-rose-100 to-amber-100 bg-no-repeat"
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

          {/* 描述（完整文案 · 行距收紧但不裁剪） */}
          <p className="mt-2.5 text-[12.5px] text-slate-600 leading-[1.55]">
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
  // 默认选中第一个分类（成长日记），不支持收起：点当前卡片无效，点其他卡片切换。
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? '')
  const active = categories.find((c) => c.id === activeId) ?? categories[0]

  return (
    <div className="mt-3">
      {/* 标题（保留 EXPLORE 小标 + h2 两行结构） */}
      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-rose-500 tracking-widest leading-none">
            <span className="w-4 h-px bg-rose-300" /> EXPLORE
          </div>
          <h2 className="text-base font-black text-slate-900 cute-zh mt-1 leading-none">
            小世界 · <span className="title-grad">分门别类</span>
          </h2>
        </div>
        <span className="text-[10px] text-slate-400 inline-flex items-center gap-1">
          <i className="ri-finger-tap-line" /> 轻触切换
        </span>
      </div>

      {/* 九宫格瓦片 · 2 列大卡，每卡一个分类 */}
      <div className="grid grid-cols-2 gap-2.5">
        {categories.map((c) => {
          const isActive = c.id === active?.id
          const decor = CATEGORY_DECOR[c.id]
          if (!decor) return null
          return (
            <button
              key={c.id}
              // 只在切换到其他卡片时更新，点击当前卡片无操作（不收起）
              onClick={() => {
                if (c.id !== activeId) setActiveId(c.id)
              }}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 active:scale-[0.97] text-left ring-1 ${decor.ringColor} ${decor.shadowStyle} ${
                isActive ? 'scale-[0.98]' : 'hover:-translate-y-0.5'
              }`}
            >
              {/* 主体：柔色粉彩渐变（搭配白底插画） */}
              <div className={`relative bg-gradient-to-br ${decor.softGrad} p-2.5 min-h-[94px]`}>
                {/* 右下大背景 emoji（淡化装饰） */}
                <div className="absolute -right-2 -bottom-3 text-[76px] leading-none opacity-25 select-none pointer-events-none rotate-[-8deg] group-hover:rotate-0 group-hover:scale-110 transition duration-500">
                  {decor.bg}
                </div>

                {/* 左上白色柔光斑 */}
                <div className="absolute -left-4 -top-4 w-16 h-16 rounded-full bg-white/70 blur-2xl pointer-events-none" />

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
                      className="w-[46px] h-[46px] object-contain drop-shadow-[0_2px_6px_rgba(244,114,182,0.25)] [mix-blend-mode:multiply]"
                      loading="lazy"
                    />
                    {/* 角落小装饰 emoji */}
                    <span className="absolute -top-1 -right-1 text-sm drop-shadow-sm">
                      {decor.corner}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full ring-1 backdrop-blur text-[10px] font-bold shadow-sm ${decor.badgeBg} ${decor.badgeText}`}
                  >
                    {c.items.length}
                  </span>
                </div>

                {/* 标题 */}
                <div className="relative mt-1.5">
                  <div
                    className={`font-bold text-[14px] leading-tight cute-zh tracking-wide ${decor.titleColor}`}
                  >
                    {c.title}
                  </div>
                  <div
                    className={`text-[9px] uppercase tracking-wider mt-0.5 truncate ${decor.subColor}`}
                  >
                    {c.subtitle}
                  </div>
                </div>

                {/* 激活时右下箭头指向下方 drawer（当前选中） */}
                {isActive && (
                  <i
                    className={`absolute bottom-2 right-2.5 z-10 text-sm ${decor.titleColor} opacity-80 ri-arrow-down-s-line`}
                  />
                )}
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

      {/* 子项抽屉（始终展开当前选中分类；切换时通过 key 触发 fadeUp 过渡） */}
      {active && (
        <div className="mt-1.5">
          <CategoryDrawer key={active.id} category={active} />
        </div>
      )}
    </div>
  )
}

/** 展开抽屉：分类的子项列表（浅色调，与九宫格卡呼应 · 紧凑版） */
function CategoryDrawer({ category }: { category: Category }) {
  const accent = ACCENT[category.accent]
  const decor = CATEGORY_DECOR[category.id]

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white ring-1 ${decor?.ringColor || 'ring-slate-200'} shadow-md animate-[fadeUp_0.3s_ease-out]`}
    >
      {/* 子项列表（紧凑行距） */}
      <ul className="divide-y divide-slate-100">
        {category.items.map((item) => (
          <MobileSubItem key={item.id} item={item} />
        ))}
      </ul>

      {/* Footer CTA（紧凑：py-1.5 + 小字号） */}
      <Link
        to={`/category/${category.id}`}
        className={`px-4 py-1.5 border-t border-slate-100 text-[12px] ${accent.solid} flex items-center justify-between bg-slate-50/60`}
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
    <div className="px-3.5 py-1.5 flex items-center gap-2.5">
      <div className="text-base shrink-0">{item.cover || '✨'}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-slate-800 truncate leading-tight">{item.title}</div>
        {item.subtitle && (
          <div className="text-[10px] text-slate-500 truncate mt-0.5">{item.subtitle}</div>
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
