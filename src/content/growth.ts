/**
 * 暄暄成长曲线数据
 * -----------------------------------------------------------
 * 1) MEASUREMENTS：你们家的真实测量点（出生 / 体检 / 量身高日……）
 *    添加新点：直接往数组 push 一个对象即可，图表会自动加一个实测小圆点。
 *
 * 2) WHO_GIRL_P50_*：WHO 女童 0-24 月 P50（中位数）参考数据。
 *    仅作为「正常范围参考带」，不是暄暄本人曲线。
 *    来源：WHO Child Growth Standards（Girls, 0-24 months）
 *    https://www.who.int/tools/child-growth-standards
 */

export interface GrowthMeasurement {
  /** 测量日期 YYYY-MM-DD */
  date: string
  /** 月龄（可用公式算，但手动标注更直观） */
  ageMonths: number
  /** 体重 kg */
  weightKg: number
  /** 身高/身长 cm */
  heightCm: number
  /** 可选：来源标签（如「出生证」「北京妇幼体检」） */
  source?: string
  /** 可选：备注 */
  note?: string
}

/** 暄暄的实测数据（按日期升序，后续添加新点直接 push 即可） */
export const MEASUREMENTS: GrowthMeasurement[] = [
  {
    date: '2024-04-19',
    ageMonths: 0,
    weightKg: 3.7,
    heightCm: 52,
    source: '出生证明',
  },
  {
    date: '2026-03-30',
    ageMonths: 23,
    weightKg: 12.5,
    heightCm: 88.5,
    source: '北京妇幼 · 入园体检',
    note: '牙齿 16 颗，血红蛋白 118 g/L',
  },
]

/**
 * WHO 女童 P50 体重（kg） 0-24 月
 * 用于绘制参考带。数据取自 WHO Growth Standards 官方表格整月值。
 */
export const WHO_GIRL_P50_WEIGHT: Array<{ month: number; kg: number }> = [
  { month: 0, kg: 3.2 },
  { month: 1, kg: 4.2 },
  { month: 2, kg: 5.1 },
  { month: 3, kg: 5.8 },
  { month: 4, kg: 6.4 },
  { month: 5, kg: 6.9 },
  { month: 6, kg: 7.3 },
  { month: 7, kg: 7.6 },
  { month: 8, kg: 7.9 },
  { month: 9, kg: 8.2 },
  { month: 10, kg: 8.5 },
  { month: 11, kg: 8.7 },
  { month: 12, kg: 8.9 },
  { month: 13, kg: 9.2 },
  { month: 14, kg: 9.4 },
  { month: 15, kg: 9.6 },
  { month: 16, kg: 9.8 },
  { month: 17, kg: 10.0 },
  { month: 18, kg: 10.2 },
  { month: 19, kg: 10.4 },
  { month: 20, kg: 10.6 },
  { month: 21, kg: 10.9 },
  { month: 22, kg: 11.1 },
  { month: 23, kg: 11.3 },
  { month: 24, kg: 11.5 },
]

/**
 * WHO 女童 P50 身长/身高（cm） 0-24 月
 */
export const WHO_GIRL_P50_HEIGHT: Array<{ month: number; cm: number }> = [
  { month: 0, cm: 49.1 },
  { month: 1, cm: 53.7 },
  { month: 2, cm: 57.1 },
  { month: 3, cm: 59.8 },
  { month: 4, cm: 62.1 },
  { month: 5, cm: 64.0 },
  { month: 6, cm: 65.7 },
  { month: 7, cm: 67.3 },
  { month: 8, cm: 68.7 },
  { month: 9, cm: 70.1 },
  { month: 10, cm: 71.5 },
  { month: 11, cm: 72.8 },
  { month: 12, cm: 74.0 },
  { month: 13, cm: 75.2 },
  { month: 14, cm: 76.4 },
  { month: 15, cm: 77.5 },
  { month: 16, cm: 78.6 },
  { month: 17, cm: 79.7 },
  { month: 18, cm: 80.7 },
  { month: 19, cm: 81.7 },
  { month: 20, cm: 82.7 },
  { month: 21, cm: 83.7 },
  { month: 22, cm: 84.6 },
  { month: 23, cm: 85.5 },
  { month: 24, cm: 86.4 },
]

/** 用实测点相对 P50 的差值，判断暄暄处于「高于/接近/低于」参考中位数 */
export function compareWithP50(m: GrowthMeasurement) {
  const refW = WHO_GIRL_P50_WEIGHT.find((r) => r.month === m.ageMonths)?.kg
  const refH = WHO_GIRL_P50_HEIGHT.find((r) => r.month === m.ageMonths)?.cm
  return {
    weightDiff: refW !== undefined ? +(m.weightKg - refW).toFixed(2) : null,
    heightDiff: refH !== undefined ? +(m.heightCm - refH).toFixed(1) : null,
  }
}
