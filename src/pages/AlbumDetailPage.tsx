import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAlbumById } from '../content/albums'
import { formatDate } from '../content/constants'

export default function AlbumDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const album = getAlbumById(id)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!album) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h1 className="text-2xl font-bold text-slate-800">相册不存在</h1>
        <Link to="/album" className="mt-6 inline-block text-cyan-600 hover:underline">
          查看全部相册
        </Link>
      </div>
    )
  }

  return (
    <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-14">
      <Link to="/album" className="inline-flex items-center gap-1 text-slate-500 text-sm hover:text-slate-800">
        <i className="ri-arrow-left-line" /> 回到相册列表
      </Link>

      <div className="mt-6">
        <div className="text-xs text-slate-400">{formatDate(album.date)}</div>
        <h1 className="mt-1 text-3xl md:text-4xl font-bold text-slate-900">
          {album.title}
        </h1>
        {album.subtitle && <p className="mt-1 text-slate-500">{album.subtitle}</p>}
        {album.description && (
          <p className="mt-3 max-w-2xl text-slate-600 leading-relaxed">
            {album.description}
          </p>
        )}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 xl:gap-4">
        {album.photos.map((p, i) => (
          <button
            key={p.file}
            onClick={() => setLightbox(i)}
            className="aspect-square rounded-xl overflow-hidden bg-slate-100 ring-1 ring-slate-200 hover:ring-cyan-300 transition"
          >
            <img
              src={p.thumb || p.medium || p.src}
              alt={p.caption || p.file}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && album.photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={album.photos[lightbox].src}
            alt=""
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="关闭"
          >
            <i className="ri-close-line text-3xl" />
          </button>
        </div>
      )}
    </section>
  )
}
