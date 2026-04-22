import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getOrderedCategories } from '../content/categories'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const categories = getOrderedCategories()
  const { pathname } = useLocation()

  // 路由切换时自动关闭菜单
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // 打开时按 ESC 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-rose-100/70">
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
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
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 relative z-[51]"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '关闭菜单' : '打开菜单'}
          >
            <i className={open ? 'ri-close-line text-xl' : 'ri-menu-line text-xl'} />
          </button>
        </div>
      </header>

      {/* ============ 移动端弹层菜单 ============ */}
      {/* 全屏遮罩（点击关闭） */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />

      {/* 右上角弹出卡片 */}
      <div
        className={`md:hidden fixed top-16 right-3 z-50 w-56 origin-top-right transition-all duration-200 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
            <span className="text-lg">🏡</span>
            <span className="cute-zh text-sm font-bold text-slate-700">暄暄的家</span>
          </div>
          <div className="py-1">
            <NavLink
              to="/"
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2.5 text-sm cute-zh transition ${
                  isActive
                    ? 'bg-rose-50 text-rose-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`
              }
            >
              <span className="text-base">🏠</span>
              <span>首页</span>
            </NavLink>
            {categories.map((c) => (
              <NavLink
                key={c.id}
                to={`/category/${c.id}`}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 text-sm cute-zh transition ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {c.iconImage ? (
                  <img
                    src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${c.iconImage}`}
                    alt=""
                    className="w-6 h-6 rounded-md object-cover shrink-0"
                  />
                ) : (
                  <span className="text-base">{c.emoji}</span>
                )}
                <span className="truncate">{c.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
