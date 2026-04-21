import { Link } from 'react-router-dom'
import { getOrderedCategories } from '../content/categories'

export default function Footer() {
  const year = new Date().getFullYear()
  const categories = getOrderedCategories()

  return (
    <footer className="mt-24 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-300">
      <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏡</span>
            <span className="text-white font-semibold">暄暄的家</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            一家人围着暄暄转的小天地。<br />
            记录旅行、小程序、小游戏，还有她每一次成长的小确幸。
          </p>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">小世界</h4>
          <ul className="space-y-2 text-sm">
            {categories.map(c => (
              <li key={c.id}>
                <Link
                  to={`/category/${c.id}`}
                  className="hover:text-white transition"
                >
                  {c.emoji} {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-3">关于这个小站</h4>
          <p className="text-sm leading-relaxed text-slate-400">
            用 Vite + React + Tailwind 搭建，托管在 GitHub Pages。<br />
            代码开源，内容私藏，照片手动入库。
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {year} 暄暄的家 · Made with ❤️ by 爸爸
      </div>
    </footer>
  )
}
