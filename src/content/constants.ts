import type { AccentKey, ItemStatus } from './types'

export const ACCENT: Record<
  AccentKey,
  { grad: string; badgeBg: string; badgeText: string; ring: string; solid: string; soft: string }
> = {
  sky: {
    grad: 'from-sky-500 to-cyan-500',
    badgeBg: 'bg-sky-50',
    badgeText: 'text-sky-600',
    ring: 'hover:ring-sky-200',
    solid: 'text-sky-600',
    soft: 'bg-sky-50 text-sky-700'
  },
  amber: {
    grad: 'from-amber-400 to-orange-400',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-600',
    ring: 'hover:ring-amber-200',
    solid: 'text-amber-600',
    soft: 'bg-amber-50 text-amber-700'
  },
  rose: {
    grad: 'from-rose-500 to-pink-500',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-600',
    ring: 'hover:ring-rose-200',
    solid: 'text-rose-600',
    soft: 'bg-rose-50 text-rose-700'
  },
  emerald: {
    grad: 'from-emerald-500 to-teal-500',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-600',
    ring: 'hover:ring-emerald-200',
    solid: 'text-emerald-600',
    soft: 'bg-emerald-50 text-emerald-700'
  },
  violet: {
    grad: 'from-violet-500 to-fuchsia-500',
    badgeBg: 'bg-violet-50',
    badgeText: 'text-violet-600',
    ring: 'hover:ring-violet-200',
    solid: 'text-violet-600',
    soft: 'bg-violet-50 text-violet-700'
  },
  cyan: {
    grad: 'from-cyan-500 to-blue-500',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-cyan-600',
    ring: 'hover:ring-cyan-200',
    solid: 'text-cyan-600',
    soft: 'bg-cyan-50 text-cyan-700'
  }
}

export const STATUS: Record<
  ItemStatus,
  { label: string; dot: string; text: string; bg: string; rank: number }
> = {
  live: { label: '已上线', dot: 'bg-emerald-400', text: 'text-emerald-600', bg: 'bg-emerald-50', rank: 0 },
  dev: { label: '开发中', dot: 'bg-amber-400', text: 'text-amber-600', bg: 'bg-amber-50', rank: 1 },
  plan: { label: '规划中', dot: 'bg-slate-300', text: 'text-slate-500', bg: 'bg-slate-50', rank: 2 }
}

export function formatDate(d?: string): string {
  if (!d) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d)
  if (!m) return d
  return `${m[1]}.${m[2]}.${m[3]}`
}
