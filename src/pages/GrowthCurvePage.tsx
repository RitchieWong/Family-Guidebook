import { Link } from 'react-router-dom'
import GrowthChart from '../components/GrowthChart'
import MobileAnchorFab from '../components/MobileAnchorFab'
import StickyPageNav from '../components/StickyPageNav'

export default function GrowthCurvePage() {
  return (
    <div className="bg-[#fff7f2] min-h-screen">
      {/* 顶部 sticky 二级导航 */}
      <StickyPageNav
        back={{ to: '/category/growth', label: '成长日记' }}
        accent="rose"
        sections={[
          { id: 'hero', label: '顶部', emoji: '📈' },
          { id: 'curve-diff', label: '最新数据', emoji: '📊' },
          { id: 'curve-charts', label: '曲线图', emoji: '📉' },
          { id: 'curve-records', label: '实测记录', emoji: '📝' },
        ]}
      />

      {/* Hero */}
      <header id="hero" className="relative overflow-hidden scroll-mt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50" />
        <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-0 -right-10 w-80 h-80 rounded-full bg-rose-200/40 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-5 lg:px-8 pt-6 md:pt-10 pb-6 md:pb-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-3 md:mb-5 flex-wrap">
            <Link to="/" className="hover:text-rose-600 inline-flex items-center gap-1">
              <i className="ri-home-4-line" /> 首页
            </Link>
            <i className="ri-arrow-right-s-line" />
            <Link to="/category/growth" className="hover:text-rose-600">
              成长日记
            </Link>
            <i className="ri-arrow-right-s-line" />
            <span className="text-slate-700 font-medium">成长曲线</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur ring-1 ring-rose-200 text-rose-700 text-[11px] md:text-xs font-semibold mb-3 md:mb-4">
            <i className="ri-line-chart-line" />
            <span>Growth Curve · 暄暄的身高体重</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">
            暄暄的成长曲线
          </h1>
          <p className="mt-2 md:mt-3 max-w-2xl text-sm md:text-base text-slate-600 leading-relaxed">
            每一次身高体重的测量都会变成一个小粉点，和 WHO 女童 P50
            中位数参考曲线一起呈现。看看我们家小姑娘长得多稳、多好。
          </p>
        </div>
      </header>

      {/* 图表（内部板块用 id 便于跳转） */}
      <GrowthChart />

      {/* 底部返回区 */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-16">
        <div className="flex items-center justify-center gap-4 text-xs md:text-sm flex-wrap">
          <Link
            to="/category/growth"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600"
          >
            <i className="ri-arrow-left-line" /> 回到成长日记
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/growth/milestones"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-600"
          >
            瑷暄记录 · 人生第一次 <i className="ri-arrow-right-line" />
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/album/milestones-xuanxuan"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-rose-600"
          >
            照片版里程碑 <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

      {/* 页内导航浮标 */}
      <MobileAnchorFab
        title="成长曲线"
        anchors={[
          { id: 'hero', label: '顶部介绍', icon: 'ri-star-line' },
          { id: 'curve-diff', label: '最新数据 · 对比 P50', icon: 'ri-scales-3-line' },
          { id: 'curve-charts', label: '身高 / 体重曲线图', icon: 'ri-line-chart-line' },
          { id: 'curve-records', label: '实测记录列表', icon: 'ri-list-check-2' },
        ]}
      />
    </div>
  )
}
