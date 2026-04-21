import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-5 py-24 text-center">
      <div className="text-7xl mb-4">🫥</div>
      <h1 className="text-3xl font-bold text-slate-800">这里好像走丢了</h1>
      <p className="mt-2 text-slate-500">你要找的小角落还不存在，或者正在搭建中。</p>
      <Link
        to="/"
        className="mt-8 inline-block px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm hover:bg-slate-700 transition"
      >
        回到首页
      </Link>
    </div>
  )
}
