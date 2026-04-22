import { Link } from 'react-router-dom'
import { ALBUMS } from '../content/albums'
import { formatDate } from '../content/constants'

export default function AlbumListPage() {
  return (
    <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-8 md:py-14">
      <Link to="/" className="inline-flex items-center gap-1 text-slate-500 text-sm hover:text-slate-800">
        <i className="ri-arrow-left-line" /> 回到首页
      </Link>

      <div className="mt-4 md:mt-6">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900">家庭相册</h1>
        <p className="mt-1 md:mt-2 text-xs md:text-base text-slate-500">按相册浏览，所有照片直接托管在仓库里。</p>
      </div>

      {/* 精选入口：里程碑 + 生活点滴 · 移动端也醒目 */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:gap-4">
        <Link
          to="/album/milestones-xuanxuan"
          className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-rose-400 to-pink-400 p-4 md:p-5 text-white shadow-sm hover:-translate-y-0.5 transition"
        >
          <div className="text-2xl md:text-3xl mb-1">🌷</div>
          <div className="text-sm md:text-base font-bold">成长里程碑</div>
          <div className="text-[11px] md:text-xs opacity-90 mt-0.5">5 张主图 · 5 封家书</div>
          <i className="ri-arrow-right-line absolute right-3 bottom-3 text-lg opacity-80 group-hover:translate-x-0.5 transition" />
        </Link>
        <Link
          to="/album/daily-moments"
          className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-400 to-sky-400 p-4 md:p-5 text-white shadow-sm hover:-translate-y-0.5 transition"
        >
          <div className="text-2xl md:text-3xl mb-1">🍓</div>
          <div className="text-sm md:text-base font-bold">生活点滴</div>
          <div className="text-[11px] md:text-xs opacity-90 mt-0.5">时间线 · 每个点 3 张照片</div>
          <i className="ri-arrow-right-line absolute right-3 bottom-3 text-lg opacity-80 group-hover:translate-x-0.5 transition" />
        </Link>
      </div>

      {ALBUMS.length === 0 ? (
        <div className="mt-8 md:mt-10 rounded-2xl bg-white ring-1 ring-slate-200 p-6 md:p-10 text-center">
          <div className="text-5xl">📷</div>
          <p className="mt-3 text-sm md:text-base text-slate-600">
            还没有相册。把照片放进 <code>public/photos/&lt;album-id&gt;/</code> 并运行
            <code className="mx-1 px-1 bg-slate-100 rounded">npm run import-photos</code>
            即可自动生成。
          </p>
        </div>
      ) : (
        <div className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 xl:gap-5">
          {ALBUMS.map(a => (
            <Link
              key={a.id}
              to={`/album/${a.id}`}
              className="group bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-cyan-300 hover:-translate-y-0.5 transition-all overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-4xl md:text-5xl">
                {a.cover.startsWith('/') || a.cover.startsWith('http') ? (
                  <img src={a.cover} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{a.cover || '🖼️'}</span>
                )}
              </div>
              <div className="p-3 md:p-4">
                <div className="text-[10px] md:text-xs text-slate-400">{formatDate(a.date)}</div>
                <h3 className="mt-0.5 md:mt-1 text-sm md:text-base font-semibold text-slate-800 truncate">{a.title}</h3>
                {a.subtitle && (
                  <p className="text-[11px] md:text-xs text-slate-500 mt-0.5 truncate">{a.subtitle}</p>
                )}
                <div className="mt-1.5 md:mt-2 text-[11px] md:text-xs text-slate-500">
                  {a.photos.length} 张照片
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
