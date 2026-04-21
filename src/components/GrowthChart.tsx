import { useMemo } from 'react'
import {
  MEASUREMENTS,
  WHO_GIRL_P50_WEIGHT,
  WHO_GIRL_P50_HEIGHT,
  compareWithP50,
  type GrowthMeasurement,
} from '../content/growth'

/**
 * 暄暄成长曲线 · 纯 SVG 轻量实现
 * ----------------------------------------------
 * - 两张图：身高 + 体重
 * - 每张都画：灰色 WHO P50 参考曲线 + 蓝粉色暄暄实测点 + 实测点之间的连线
 * - 实测点上 hover / tap 会显示 tooltip（带日期、数值、与 P50 差值）
 * - 月龄轴固定 0-24 月（后续超出再改）
 */
export default function GrowthChart() {
  const latest = MEASUREMENTS[MEASUREMENTS.length - 1]
  const diff = useMemo(() => compareWithP50(latest), [latest])

  return (
    <section className="max-w-5xl mx-auto px-5 lg:px-8 py-14">
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 ring-1 ring-rose-200 text-rose-700 text-xs font-semibold mb-3">
          <i className="ri-line-chart-line" />
          <span>Growth Curve</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          暄暄的小小成长曲线
        </h3>
        <p className="mt-2 text-slate-500 text-sm leading-relaxed max-w-2xl">
          灰色虚线 = WHO 女童 P50 中位数参考；粉色圆点 = 暄暄实测值。
          每次量身高体重都会新增一个点，曲线会自动把小点连起来。
        </p>
      </header>

      {/* 当前差值卡 */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
        <DiffCard
          icon="ri-ruler-line"
          label="身高"
          value={`${latest.heightCm} cm`}
          diffLabel="对比 WHO P50"
          diff={diff.heightDiff}
          unit="cm"
          accent="rose"
        />
        <DiffCard
          icon="ri-scales-3-line"
          label="体重"
          value={`${latest.weightKg} kg`}
          diffLabel="对比 WHO P50"
          diff={diff.weightDiff}
          unit="kg"
          accent="amber"
        />
      </div>

      {/* 两张曲线 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="身高 / 身长（cm）"
          accent="rose"
          refLine={WHO_GIRL_P50_HEIGHT.map((p) => ({ x: p.month, y: p.cm }))}
          points={MEASUREMENTS.map((m) => ({
            x: m.ageMonths,
            y: m.heightCm,
            m,
            unit: 'cm',
          }))}
          yLabel="cm"
          yMin={40}
          yMax={100}
          yStep={10}
        />
        <ChartCard
          title="体重（kg）"
          accent="amber"
          refLine={WHO_GIRL_P50_WEIGHT.map((p) => ({ x: p.month, y: p.kg }))}
          points={MEASUREMENTS.map((m) => ({
            x: m.ageMonths,
            y: m.weightKg,
            m,
            unit: 'kg',
          }))}
          yLabel="kg"
          yMin={2}
          yMax={16}
          yStep={2}
        />
      </div>

      {/* 实测点列表 */}
      <div className="mt-8 rounded-2xl bg-white ring-1 ring-slate-200 px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <i className="ri-pin-distance-line text-slate-400" />
          <span className="text-xs tracking-[0.25em] font-semibold text-slate-500 uppercase">
            实测记录
          </span>
          <span className="text-xs text-slate-400">共 {MEASUREMENTS.length} 次</span>
          <div className="flex-1 h-px bg-slate-100 ml-3" />
        </div>
        <div className="divide-y divide-slate-100">
          {MEASUREMENTS.map((m, i) => (
            <div key={i} className="py-2.5 flex items-start gap-3 text-sm">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-50 text-rose-600 text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-semibold text-slate-800">{m.date}</span>
                  <span className="text-xs text-slate-400">{m.ageMonths} 月龄</span>
                  {m.source && (
                    <span className="text-xs text-slate-400">· {m.source}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-0.5">
                  <span>身高 <b className="text-slate-800">{m.heightCm} cm</b></span>
                  <span>体重 <b className="text-slate-800">{m.weightKg} kg</b></span>
                  {m.note && <span className="text-slate-400">· {m.note}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          💡 添加新测量：编辑 <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">src/content/growth.ts</code> 里的 <code className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">MEASUREMENTS</code> 数组，push 一条即可。
        </p>
      </div>
    </section>
  )
}

// ========================================================================
// 差值卡（对比 P50）
// ========================================================================
function DiffCard({
  icon,
  label,
  value,
  diffLabel,
  diff,
  unit,
  accent,
}: {
  icon: string
  label: string
  value: string
  diffLabel: string
  diff: number | null
  unit: string
  accent: 'rose' | 'amber'
}) {
  const tone =
    diff == null
      ? 'text-slate-400'
      : diff > 0
        ? 'text-emerald-600'
        : diff < 0
          ? 'text-slate-600'
          : 'text-slate-500'
  const arrow = diff == null ? '' : diff > 0 ? '↑' : diff < 0 ? '↓' : '='
  const bg = accent === 'rose' ? 'from-rose-50 to-pink-50' : 'from-amber-50 to-orange-50'

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${bg} ring-1 ring-slate-200 px-5 py-4`}>
      <div className="flex items-center gap-2 text-slate-500 text-xs">
        <i className={icon} />
        <span>{label}</span>
      </div>
      <div className="mt-1 text-2xl md:text-3xl font-black text-slate-800">{value}</div>
      {diff != null && (
        <div className={`mt-1 text-xs ${tone} flex items-center gap-1`}>
          <span>{diffLabel}</span>
          <span className="font-bold">
            {arrow} {Math.abs(diff)} {unit}
          </span>
        </div>
      )}
    </div>
  )
}

// ========================================================================
// 图表卡
// ========================================================================
interface ChartPoint {
  x: number
  y: number
  m: GrowthMeasurement
  unit: string
}
function ChartCard({
  title,
  accent,
  refLine,
  points,
  yLabel,
  yMin,
  yMax,
  yStep,
}: {
  title: string
  accent: 'rose' | 'amber'
  refLine: Array<{ x: number; y: number }>
  points: ChartPoint[]
  yLabel: string
  yMin: number
  yMax: number
  yStep: number
}) {
  // viewBox 坐标系
  const W = 480
  const H = 280
  const padL = 40
  const padR = 16
  const padT = 16
  const padB = 32

  const xMin = 0
  const xMax = 24
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const xScale = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * innerW
  const yScale = (y: number) =>
    padT + innerH - ((y - yMin) / (yMax - yMin)) * innerH

  // 参考线 path
  const refPath = refLine
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)} ${yScale(p.y)}`)
    .join(' ')

  // 实测点连线
  const measurePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.x)} ${yScale(p.y)}`)
    .join(' ')

  // Y 轴刻度
  const yTicks: number[] = []
  for (let v = yMin; v <= yMax; v += yStep) yTicks.push(v)

  // X 轴刻度（每 6 个月一个）
  const xTicks = [0, 6, 12, 18, 24]
  const xLabels: Record<number, string> = {
    0: '出生',
    6: '6 月',
    12: '1 岁',
    18: '18 月',
    24: '2 岁',
  }

  const dotColor = accent === 'rose' ? '#f43f5e' : '#f59e0b'
  const dotBg = accent === 'rose' ? '#fff1f2' : '#fffbeb'

  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-slate-700">{title}</div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-4 h-0 border-t-2 border-dashed"
              style={{ borderColor: '#94a3b8' }}
            />
            WHO P50
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
            暄暄实测
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label={title}
      >
        {/* Y 轴网格 + 刻度 */}
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yScale(v)}
              y2={yScale(v)}
              stroke="#f1f5f9"
              strokeWidth={1}
            />
            <text
              x={padL - 6}
              y={yScale(v) + 3}
              textAnchor="end"
              fontSize="10"
              fill="#94a3b8"
            >
              {v}
            </text>
          </g>
        ))}
        <text
          x={padL - 6}
          y={padT - 2}
          textAnchor="end"
          fontSize="9"
          fill="#cbd5e1"
        >
          {yLabel}
        </text>

        {/* X 轴刻度 */}
        {xTicks.map((x) => (
          <g key={x}>
            <line
              x1={xScale(x)}
              x2={xScale(x)}
              y1={padT}
              y2={H - padB}
              stroke="#f8fafc"
              strokeWidth={1}
            />
            <text
              x={xScale(x)}
              y={H - padB + 14}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
            >
              {xLabels[x]}
            </text>
          </g>
        ))}

        {/* 参考线 WHO P50 */}
        <path
          d={refPath}
          fill="none"
          stroke="#94a3b8"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          opacity={0.7}
        />

        {/* 实测连线 */}
        {points.length > 1 && (
          <path
            d={measurePath}
            fill="none"
            stroke={dotColor}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.5}
          />
        )}

        {/* 实测点 */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={xScale(p.x)}
              cy={yScale(p.y)}
              r={7}
              fill={dotBg}
              stroke={dotColor}
              strokeWidth={2}
            />
            <circle
              cx={xScale(p.x)}
              cy={yScale(p.y)}
              r={2.5}
              fill={dotColor}
            />
            {/* 数值气泡：让它不超出边界 */}
            <text
              x={xScale(p.x)}
              y={yScale(p.y) - 14}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#334155"
            >
              {p.y}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
