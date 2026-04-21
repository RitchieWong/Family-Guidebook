import { useState } from 'react'
import { CHECKLIST_GROUPS } from '../../../content/travel-2026-labor-day'

type CheckedMap = Record<string, Set<number>>

const STORAGE_PREFIX = 'checklist-'

function loadAll(): CheckedMap {
  const m: CheckedMap = {}
  if (typeof window === 'undefined') return m
  CHECKLIST_GROUPS.forEach((g) => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + g.id)
      const arr = raw ? (JSON.parse(raw) as number[]) : []
      m[g.id] = new Set(arr)
    } catch {
      m[g.id] = new Set()
    }
  })
  return m
}

function saveOne(id: string, set: Set<number>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(Array.from(set)))
}

/** 出行贴士 + 装备清单（含 localStorage 勾选） */
export default function TipsChecklist() {
  const [checked, setChecked] = useState<CheckedMap>(() => loadAll())

  const toggle = (groupId: string, idx: number) => {
    setChecked((prev) => {
      const next: CheckedMap = { ...prev }
      const set = new Set(prev[groupId] ?? [])
      if (set.has(idx)) set.delete(idx)
      else set.add(idx)
      next[groupId] = set
      saveOne(groupId, set)
      return next
    })
  }

  const reset = () => {
    if (typeof window !== 'undefined') {
      CHECKLIST_GROUPS.forEach((g) => localStorage.removeItem(STORAGE_PREFIX + g.id))
    }
    const cleared: CheckedMap = {}
    CHECKLIST_GROUPS.forEach((g) => (cleared[g.id] = new Set()))
    setChecked(cleared)
  }

  return (
    <>
      <section id="tips" className="py-12 bg-gradient-to-b from-slate-50 to-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="text-sm font-semibold text-sky-600 mb-2">ESSENTIAL TIPS</div>
            <h2 className="text-3xl md:text-4xl font-black">出行贴士 & 装备清单</h2>
            <p className="text-slate-500 mt-2">为 2 岁的暄暄量身打造的准备方案</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <TipCard iconBg="bg-sky-100 text-sky-600" icon="ri-steering-line" title="自驾安全" items={[
              '儿童座椅务必反向固定',
              '每1.5小时必须停车休息',
              '避开早晚高峰和夜间行车',
              '加油卡、ETC 提前确认',
              '备胎、三角牌、急救包',
            ]} />
            <TipCard iconBg="bg-rose-100 text-rose-600" icon="ri-heart-pulse-line" title="健康防护" items={[
              '儿童退烧药、蒙脱石散、益生菌',
              '体温计、创可贴、碘伏',
              '防蚊喷雾（海边蚊虫多）',
              '暄暄专用防晒霜 SPF30+',
              '保温壶装温水',
            ]} />
            <TipCard iconBg="bg-emerald-100 text-emerald-600" icon="ri-money-cny-circle-line" title="预算参考" items={[
              '油费+过路费：¥ 1,200',
              '3晚民宿（家庭房）：¥ 2,400',
              '景点+门票：¥ 500',
              '餐饮（8人4天）：¥ 4,000',
            ]} footer={<>合计参考：<b className="text-emerald-600">¥ 8,100</b></>} />
          </div>
        </div>
      </section>

      <section id="checklist" className="pb-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <i className="ri-list-check-3 text-3xl" />
              <h2 className="text-2xl md:text-3xl font-black">家庭出行清单 · 打印版</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {CHECKLIST_GROUPS.map((g) => (
                <div key={g.id}>
                  <h4 className="font-bold mb-3 text-amber-200"><i className={`${g.icon} mr-1`} />{g.title}</h4>
                  <ul className="text-sm space-y-1.5 opacity-95">
                    {g.items.map((item, i) => {
                      const isChecked = checked[g.id]?.has(i) ?? false
                      return (
                        <li
                          key={i}
                          onClick={() => toggle(g.id, i)}
                          className={`check-item ${isChecked ? 'checked' : ''}`}
                        >
                          {item}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
              <div className="text-sm opacity-80"><i className="ri-information-line" /> 点击清单项可勾选完成</div>
              <button onClick={reset} className="px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm">
                <i className="ri-refresh-line" /> 重置清单
              </button>
            </div>
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🌊⛺🦀</div>
            <h3 className="text-2xl font-bold mb-3">愿这4天的每一个瞬间</h3>
            <p className="text-slate-600 leading-relaxed">
              都能成为暄暄童年里最蓝的那片海，最暖的那顿饭，最热闹的那圈亲人。<br />
              爷爷的肩膀、奶奶的絮叨、哥哥们的笑闹，都是这个五一最好的礼物。
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function TipCard({ icon, iconBg, title, items, footer }: {
  icon: string; iconBg: string; title: string; items: string[]; footer?: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center text-2xl mb-4`}>
        <i className={icon} />
      </div>
      <h3 className="font-bold mb-2">{title}</h3>
      <ul className="text-sm text-slate-600 space-y-1.5">
        {items.map((it) => <li key={it}>• {it}</li>)}
        {footer && <li>• {footer}</li>}
      </ul>
    </div>
  )
}
