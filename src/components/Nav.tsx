import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getOrderedCategories } from '../content/categories'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const categories = getOrderedCategories()

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-rose-100/70">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition">🏡</span>
          <span className="font-extrabold tracking-wide cute-zh text-lg bg-gradient-to-r from-rose-500 via-orange-400 to-amber-500 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:to-pink-500 transition">
            暄暄的家
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-[15px]">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `cute-zh px-3 py-2 rounded-full transition ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-500'
              }`
            }
          >
            首页
          </NavLink>
          {categories.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              className={({ isActive }) =>
                `cute-zh px-3 py-2 rounded-full transition ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-sm'
                    : 'text-slate-600 hover:text-rose-500'
                }`
              }
            >
              <span className="mr-1">{c.emoji}</span>
              {c.title}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setOpen(v => !v)}
          aria-label="菜单"
        >
          <i className={open ? 'ri-close-line text-xl' : 'ri-menu-line text-xl'} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200/70 bg-white">
          <div className="max-w-6xl mx-auto px-5 py-3 flex flex-col">
            <NavLink
              to="/"
              end
              onClick={() => setOpen(false)}
              className="cute-zh py-2 text-slate-700 text-base"
            >
              🏠 首页
            </NavLink>
            {categories.map(c => (
              <NavLink
                key={c.id}
                to={`/category/${c.id}`}
                onClick={() => setOpen(false)}
                className="cute-zh py-2 text-slate-700 text-base"
              >
                <span className="mr-1">{c.emoji}</span>
                {c.title}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
