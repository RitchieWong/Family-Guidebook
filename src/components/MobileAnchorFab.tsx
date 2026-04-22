import { useEffect, useMemo, useState } from 'react'
import { scrollToSection } from '../utils/scrollToSection'

export interface Anchor {
  id: string
  label: string
  icon?: string
  /** 可选：分组标题（同一组连续排布） */
  group?: string
}

interface Props {
  anchors: Anchor[]
  /** 页面顶部的标题（面板顶部展示） */
  title?: string
  /** 浮标开始显示的滚动距离阈值（默认 240） */
  threshold?: number
  /** 桌面端是否也展示（默认 true，但表现为右侧中间小浮标） */
  desktop?: boolean
}

/**
 * 页内锚点浮标 —— 移动端 + 桌面端双模式
 *
 * 移动端：
 *   - 右下角 FAB 按钮，滚动超过 threshold 才显示
 *   - 点击展开面板，列出所有锚点（支持分组）
 *   - 自动高亮当前节
 *
 * 桌面端（可选 desktop=true）：
 *   - 右侧中部浮动小胶囊
 *
 * 用法：
 *   <MobileAnchorFab
 *     title="成长时间线"
 *     anchors={[
 *       { id: 'y-2024', label: '2024 年', group: '年份' },
 *       { id: 'y-2025', label: '2025 年', group: '年份' },
 *       { id: 'y-2026', label: '2026 年', group: '年份' },
 *     ]}
 *   />
 */
export default function MobileAnchorFab({
  anchors,
  title = '跳转到',
  threshold = 240,
  desktop = true,
}: Props) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)

  /** 按 group 分组（保持顺序） */
  const grouped = useMemo(() => {
    const map: Array<{ group: string | undefined; items: Anchor[] }> = []
    anchors.forEach((a) => {
      const last = map[map.length - 1]
      if (last && last.group === a.group) last.items.push(a)
      else map.push({ group: a.group, items: [a] })
    })
    return map
  }, [anchors])

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold)
      // 激活检测：找出最后一个"已经越过视口顶部 + 偏移"的节点
      const y = window.scrollY + 140
      let cur: string | null = null
      for (const a of anchors) {
        const el = document.getElementById(a.id)
        if (el && el.offsetTop <= y) cur = a.id
      }
      setActiveId(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [anchors, threshold])

  if (anchors.length === 0) return null

  const panel = (
    <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden w-60 md:w-64">
      <div className="px-3 py-2.5 border-b border-slate-100 flex items-center gap-2">
        <i className="ri-compass-3-line text-rose-400" />
        <span className="text-sm font-bold text-slate-700 truncate flex-1">{title}</span>
        <button
          onClick={() => setOpen(false)}
          className="w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center"
          aria-label="关闭"
        >
          <i className="ri-close-line text-sm" />
        </button>
      </div>
      <div className="max-h-[60vh] overflow-y-auto py-1">
        {grouped.map((g, gi) => (
          <div key={gi}>
            {g.group && (
              <div className="px-3 pt-2 pb-1 text-[10px] tracking-widest text-slate-400 font-bold">
                {g.group}
              </div>
            )}
            {g.items.map((a) => {
              const isActive = a.id === activeId
              return (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  onClick={(e) => {
                    scrollToSection(e, a.id)
                    setOpen(false)
                  }}
                  className={`flex items-center gap-2 px-3 py-2 text-[13px] transition ${
                    isActive
                      ? 'bg-rose-50 text-rose-600 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {a.icon && (
                    <i className={`${a.icon} ${isActive ? 'text-rose-500' : 'text-slate-400'}`} />
                  )}
                  <span className="truncate flex-1">{a.label}</span>
                  {isActive && <i className="ri-arrow-right-s-line text-rose-500" />}
                </a>
              )
            })}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setOpen(false)
        }}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-slate-500 hover:bg-slate-50 border-t border-slate-100"
      >
        <i className="ri-arrow-up-line" />
        <span>回到顶部</span>
      </button>
    </div>
  )

  return (
    <>
      {/* 移动端 FAB */}
      <div
        className={`md:hidden fixed right-4 bottom-5 z-40 transition ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {open && <div className="mb-2">{panel}</div>}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-white shadow-xl shadow-rose-300/50 flex items-center justify-center text-xl active:scale-95 transition"
          aria-label={open ? '关闭锚点' : '打开锚点'}
        >
          <i className={open ? 'ri-close-line' : 'ri-compass-3-line'} />
        </button>
      </div>

      {/* 桌面端：右侧中部小胶囊 */}
      {desktop && (
        <div
          className={`hidden md:block fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 transition ${
            visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {open ? (
            panel
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="group flex flex-col items-center gap-1 px-2 py-3 rounded-2xl bg-white/90 backdrop-blur ring-1 ring-slate-200 shadow-lg hover:ring-rose-300 hover:shadow-xl transition"
              aria-label="打开页面导航"
            >
              <i className="ri-compass-3-line text-rose-500 text-xl group-hover:scale-110 transition" />
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider [writing-mode:vertical-rl]">
                页内导航
              </span>
            </button>
          )}
        </div>
      )}
    </>
  )
}
