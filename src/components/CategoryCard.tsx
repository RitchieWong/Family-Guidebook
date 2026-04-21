import { Link } from 'react-router-dom'
import type { Category, CategoryItem } from '../content/types'
import { ACCENT, STATUS, formatDate } from '../content/constants'

interface Props {
  category: Category
}

/**
 * 首页 / 分类 grid 的卡片。整体可点击跳到分类页，
 * 内部子项按 status 排序，前 3 条展示，live 子项可独立点击跳到详情。
 */
export default function CategoryCard({ category }: Props) {
  const accent = ACCENT[category.accent]
  const items = [...category.items]
    .sort((a, b) => STATUS[a.status].rank - STATUS[b.status].rank)
    .slice(0, 3)

  return (
    <article className="group bg-white rounded-3xl ring-1 ring-slate-200/80 overflow-hidden hover:ring-2 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col">
      {/* Header */}
      <Link
        to={`/category/${category.id}`}
        className={`block bg-gradient-to-br ${accent.grad} p-6 text-white`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl mb-2">{category.emoji}</div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="text-white/80 text-sm mt-0.5">{category.subtitle}</p>
          </div>
          <i className={`${category.icon} text-3xl text-white/60`} />
        </div>
      </Link>

      {/* Desc */}
      <Link
        to={`/category/${category.id}`}
        className="block px-6 pt-5 text-sm text-slate-600 leading-relaxed hover:text-slate-900 transition"
      >
        {category.desc}
      </Link>

      {/* Items */}
      <ul className="px-6 py-4 space-y-2 flex-1">
        {items.map(item => (
          <SubItem key={item.id} item={item} accent={category.accent} />
        ))}
        {category.items.length > items.length && (
          <li className="text-xs text-slate-400 pl-1">
            …还有 {category.items.length - items.length} 项
          </li>
        )}
      </ul>

      {/* CTA */}
      <Link
        to={`/category/${category.id}`}
        className={`px-6 py-4 border-t border-slate-100 text-sm ${accent.solid} hover:bg-slate-50 flex items-center justify-between transition`}
      >
        <span>查看全部 {category.items.length} 项</span>
        <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition" />
      </Link>
    </article>
  )
}

function SubItem({
  item,
  accent
}: {
  item: CategoryItem
  accent: Category['accent']
}) {
  const status = STATUS[item.status]
  const a = ACCENT[accent]
  const clickable = !!(item.to || item.href)

  const inner = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-lg">{item.cover || '✨'}</span>
          <span className="font-medium text-slate-800 truncate">{item.title}</span>
        </div>
        {item.subtitle && (
          <div className="text-xs text-slate-500 mt-0.5 truncate">
            {item.subtitle}
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        {item.date && (
          <span className="text-[11px] text-slate-400">{formatDate(item.date)}</span>
        )}
      </div>
    </>
  )

  const base =
    'flex items-center gap-3 p-2 -mx-2 rounded-xl transition'

  if (item.to) {
    return (
      <li>
        <Link to={item.to} className={`${base} hover:${a.soft.split(' ')[0]} hover:bg-slate-50`}>
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
          className={`${base} hover:bg-slate-50`}
        >
          {inner}
        </a>
      </li>
    )
  }
  return (
    <li>
      <div className={`${base} ${clickable ? 'cursor-pointer' : 'cursor-default'}`}>
        {inner}
      </div>
    </li>
  )
}
