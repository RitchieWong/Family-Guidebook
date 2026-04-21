import { Link } from 'react-router-dom'
import { getOrderedCategories } from '../content/categories'
import CategoryCard from '../components/CategoryCard'
import { MILESTONES, BIRTHDAY } from '../content/milestones'
import { STATUS } from '../content/constants'

export default function HomePage() {
  const categories = getOrderedCategories()

  const liveCount = categories.reduce(
    (acc, c) => acc + c.items.filter((i) => i.status === 'live').length,
    0
  )
  const devCount = categories.reduce(
    (acc, c) => acc + c.items.filter((i) => i.status === 'dev').length,
    0
  )
  const planCount = categories.reduce(
    (acc, c) => acc + c.items.filter((i) => i.status === 'plan').length,
    0
  )

  const recent = [...MILESTONES]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 4)

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden">
        {/* 底层渐变兜底色（图片加载前 / 图片两侧的留白色） */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50" />

        {/* 主背景插画：宽屏时显示完整场景，超大屏让插画稳定停在右侧视觉区 */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[center_right] md:bg-right xl:bg-[right_center] 2xl:bg-[right_center]"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}hero/hero-bg.png)`,
          }}
          aria-hidden
        />
        {/* 左侧柔光蒙层：让左半边文字有更高对比度，避免糊在插画上；大屏下蒙层覆盖更宽避免文字两侧空白处插画过亮 */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(255,247,242,0.92)_0%,rgba(255,247,242,0.65)_40%,rgba(255,247,242,0.15)_60%,rgba(255,247,242,0)_74%)] md:bg-[linear-gradient(100deg,rgba(255,247,242,0.88)_0%,rgba(255,247,242,0.55)_44%,rgba(255,247,242,0.08)_64%,rgba(255,247,242,0)_80%)] xl:bg-[linear-gradient(100deg,rgba(255,247,242,0.92)_0%,rgba(255,247,242,0.7)_38%,rgba(255,247,242,0.25)_56%,rgba(255,247,242,0)_72%)]" />
        {/* 点点纹理 */}
        <div className="absolute inset-0 opacity-[0.08] dotted-circle pointer-events-none" />

        <div className="relative max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pt-14 pb-10 md:pt-20 md:pb-14 xl:pt-24 xl:pb-16 min-h-[480px] md:min-h-[560px] xl:min-h-[620px] 2xl:min-h-[680px]">
          {/* 大屏下用 12 列网格，把内容稳稳锁在左半，右半留给插画里的小屋 / 小女孩 */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur text-xs text-slate-600 ring-1 ring-rose-200 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                一家人围着暄暄转的小天地
                <span>🌸</span>
              </div>

              <h1 className="mt-5 text-5xl md:text-7xl xl:text-[5.5rem] 2xl:text-[6rem] font-black tracking-tight text-slate-900 leading-[1.05]">
                <span className="cute-zh">欢迎来到</span>
                <span className="block mt-3 cute-zh">
                  <span className="title-grad underline-doodle">暄暄的家</span>
                </span>
              </h1>

              <p className="mt-7 max-w-lg xl:max-w-xl text-base md:text-lg xl:text-xl text-slate-700 leading-relaxed">
                这里是我们一家的<span className="cute-zh text-rose-500 font-semibold">慢速时光机</span>——
                把每一趟远行、每一个夜里敲出的小程序、每一声咿呀和每一次踮脚，
                都轻轻收进这座小小的家。
                <br className="hidden md:block" />
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

              {/* 手写小注释 */}
              <div className="mt-6 flex items-center gap-2 text-rose-400 handwrite text-2xl">
                <i className="ri-arrow-down-line text-lg rotate-12 -mt-1" />
                <span>made with love by 爸爸 &amp; 妈妈</span>
              </div>

              {/* Stats 贴纸卡：随左列一起呆在左半，铺满列宽，不再挤在角落 */}
              <div className="mt-10 grid grid-cols-3 gap-4 xl:gap-5 max-w-3xl lg:max-w-none">
                <Stat label="已上线" value={liveCount} color={STATUS.live.text} bg="from-emerald-100 to-teal-50" emoji="✅" rot="-2deg" />
                <Stat label="开发中" value={devCount} color={STATUS.dev.text} bg="from-amber-100 to-yellow-50" emoji="🛠️" rot="2deg" />
                <Stat label="规划中" value={planCount} color={STATUS.plan.text} bg="from-sky-100 to-cyan-50" emoji="📝" rot="-1deg" />
              </div>
            </div>

            {/* 右列：占位，让背景插画在大屏下有"自然栖息地"，避免文字盖到小女孩身上 */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-5 2xl:col-span-6" aria-hidden />
          </div>
        </div>

      </section>

      {/* ============ Categories ============ */}
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-16 xl:py-20">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold text-rose-500">
              <span className="w-6 h-px bg-rose-300" /> EXPLORE
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 cute-zh">
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
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pb-24">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 text-xs font-semibold text-amber-500">
              <span className="w-6 h-px bg-amber-300" /> LATELY
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 cute-zh">
              最近的 <span className="title-grad">小时光</span> 🌷
            </h2>
          </div>
          <Link
            to="/growth/milestones"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-rose-500 transition"
          >
            查看全部
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5">
          {recent.map((m, i) => (
            <Link
              key={i}
              to="/growth/milestones"
              className="relative bg-white rounded-3xl p-5 ring-1 ring-rose-100/70 hover:ring-rose-300 hover:-translate-y-1 transition-all shadow-sm hover:shadow-xl overflow-hidden group"
            >
              {/* 角落水印大 emoji */}
              <span className="absolute -right-2 -top-2 text-7xl opacity-10 select-none group-hover:opacity-20 transition">
                {m.emoji}
              </span>
              <div className="relative">
                <div className="text-3xl mb-2">{m.emoji}</div>
                <div className="text-xs text-slate-400">
                  {m.date} · {m.age}
                </div>
                <div className="mt-1.5 font-semibold text-slate-800 leading-snug">
                  {m.title}
                </div>
                {m.tag && (
                  <span className="mt-2 inline-block text-[11px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                    #{m.tag}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

/* ---------- 子组件 ---------- */
function Stat({
  label,
  value,
  color,
  bg,
  emoji,
  rot,
}: {
  label: string
  value: number
  color: string
  bg: string
  emoji: string
  rot: string
}) {
  return (
    <div
      className={`relative bg-gradient-to-br ${bg} rounded-3xl px-5 py-4 ring-1 ring-white shadow-md hover:-translate-y-1 hover:rotate-0 transition-transform duration-300`}
      style={{ transform: `rotate(${rot})` }}
    >
      <div className="absolute right-3 top-3 text-2xl">{emoji}</div>
      <div className={`text-3xl font-black ${color} leading-none`}>{value}</div>
      <div className="text-xs text-slate-600 mt-2 font-medium">{label}</div>
    </div>
  )
}
