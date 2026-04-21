import { Link } from 'react-router-dom'
import { ALBUMS } from '../content/albums'
import { formatDate } from '../content/constants'

export default function AlbumListPage() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-14">
      <Link to="/" className="inline-flex items-center gap-1 text-slate-500 text-sm hover:text-slate-800">
        <i className="ri-arrow-left-line" /> 回到首页
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">家庭相册</h1>
        <p className="mt-2 text-slate-500">按相册浏览，所有照片直接托管在仓库里。</p>
      </div>

      {ALBUMS.length === 0 ? (
        <div className="mt-10 rounded-2xl bg-white ring-1 ring-slate-200 p-10 text-center">
          <div className="text-5xl">📷</div>
          <p className="mt-3 text-slate-600">
            还没有相册。把照片放进 <code>public/photos/&lt;album-id&gt;/</code> 并运行
            <code className="mx-1 px-1 bg-slate-100 rounded">npm run import-photos</code>
            即可自动生成。
          </p>
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALBUMS.map(a => (
            <Link
              key={a.id}
              to={`/album/${a.id}`}
              className="group bg-white rounded-2xl ring-1 ring-slate-200 hover:ring-cyan-300 hover:-translate-y-0.5 transition-all overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-5xl">
                {a.cover.startsWith('/') || a.cover.startsWith('http') ? (
                  <img src={a.cover} alt={a.title} className="w-full h-full object-cover" />
                ) : (
                  <span>{a.cover || '🖼️'}</span>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-slate-400">{formatDate(a.date)}</div>
                <h3 className="mt-1 font-semibold text-slate-800">{a.title}</h3>
                {a.subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5">{a.subtitle}</p>
                )}
                <div className="mt-2 text-xs text-slate-500">
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
