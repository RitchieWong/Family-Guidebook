import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORIES } from '../content/categories'
import type { CategoryItem, ItemStatus } from '../content/types'
import { ACCENT, STATUS, formatDate } from '../content/constants'

type Filter = 'all' | ItemStatus

export default function CategoryPage() {
  const { id = '' } = useParams<{ id: string }>()
  const category = CATEGORIES[id]
  const [filter, setFilter] = useState<Filter>('all')

  const items = useMemo(() => {
    if (!category) return []
    const sorted = [...category.items].sort(
      (a, b) => STATUS[a.status].rank - STATUS[b.status].rank
    )
    if (filter === 'all') return sorted
    return sorted.filter(i => i.status === filter)
  }, [category, filter])

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold text-slate-800">找不到这个分类</h1>
        <Link to="/" className="mt-6 inline-block text-sky-600 hover:underline">
          回到首页
        </Link>
      </div>
    )
  }

  const accent = ACCENT[category.accent]

  return (
    <>
      {/* Hero */}
      <section className={`bg-gradient-to-br ${accent.grad} text-white`}>
        <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-14">
          <Link to="/" className="inline-flex items-center gap-1 text-white/80 text-sm hover:text-white">
            <i className="ri-arrow-left-line" /> 回到首页
          </Link>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-5xl">{category.emoji}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{category.title}</h1>
              <p className="text-white/80 mt-1">{category.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-white/90 leading-relaxed">{category.desc}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {(['all', 'live', 'dev', 'plan'] as Filter[]).map(f => {
            const label =
              f === 'all' ? `全部 · ${category.items.length}` : STATUS[f].label
            const active = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm transition ring-1 ${
                  active
                    ? 'bg-slate-900 text-white ring-slate-900'
                    : 'bg-white text-slate-600 ring-slate-200 hover:ring-slate-400'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </section>

      {/* List */}
      <section className="max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] mx-auto px-5 lg:px-8 pb-20 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 xl:gap-5">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-slate-500 py-12">
            这里还空空的呢～
          </div>
        )}
      </section>
    </>
  )
}

function ItemCard({ item }: { item: CategoryItem }) {
  const status = STATUS[item.status]
  const clickable = !!(item.to || item.href)

  const body = (
    <>
      <div className="flex items-start justify-between">
        <div className="text-3xl">{item.cover || '✨'}</div>
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>
      <h3 className="mt-3 font-semibold text-slate-800">{item.title}</h3>
      {item.subtitle && (
        <div className="text-xs text-slate-500 mt-0.5">{item.subtitle}</div>
      )}
      {item.desc && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {item.desc}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags?.map(t => (
          <span
            key={t}
            className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{formatDate(item.date)}</span>
        {item.location && <span>📍 {item.location}</span>}
      </div>
    </>
  )

  const cls =
    'bg-white rounded-2xl p-5 ring-1 ring-slate-200 shadow-sm block transition'
  const interactive = clickable ? 'hover:-translate-y-0.5 hover:ring-slate-400 hover:shadow-md' : ''

  if (item.to) {
    return (
      <Link to={item.to} className={`${cls} ${interactive}`}>
        {body}
      </Link>
    )
  }
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={`${cls} ${interactive}`}>
        {body}
      </a>
    )
  }
  return <div className={cls}>{body}</div>
}
