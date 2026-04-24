/**
 * 家庭会员 & 福利权益清单
 * -----------------------------------------------------------
 * 记录家里已经办下来的会员卡、商家常客权益、免费福利。
 * 区别于「暄暄的礼物」—— 这里是「商家给我们留着的好处」，
 * 一家人出门时顺手查一下，别忘了领。
 *
 * 结构：地点 (Venue) → 店铺 (Store) → 多条权益 (Perk)
 *
 * 新增：
 *   1. 如果是新地点 → 在 MEMBERSHIPS 里 push 一个 Venue
 *   2. 已有地点新增店铺 → 在该 Venue 的 stores[] 里 push
 *   3. 店铺新增一条权益 → 在 store.perks[] 里 push
 */

export type PerkCategory =
  | '赠品'
  | '免费'
  | '折扣'
  | '积分'
  | '生日'
  | '其他'

export interface Perk {
  /** 权益标题，简短一句 */
  title: string
  /** 小图标 emoji */
  emoji: string
  category: PerkCategory
  /** 触发条件 / 使用说明，比如「每月一次」「23 号」「每天 8-9 点」 */
  rule?: string
  /** 备注、注意事项、过期时间等 */
  note?: string
  /** 是否特别值得的权益（会高亮） */
  highlight?: boolean
}

export interface Store {
  /** 店铺名或品类名 */
  name: string
  /** 位置备注：几楼、哪个区，可选 */
  location?: string
  /** 展示用小图标 emoji */
  emoji: string
  /** 店铺简介 */
  desc?: string
  perks: Perk[]
}

export interface Venue {
  /** 用于筛选 tab 的 key，英文短词 */
  id: string
  /** 地点名称，如「龙德广场」 */
  name: string
  /** 地点副标题 */
  subtitle?: string
  /** 地点大图标 emoji */
  emoji: string
  /** 地点说明 */
  desc?: string
  stores: Store[]
}

export const MEMBERSHIPS: Venue[] = [
  {
    id: 'longde-plaza',
    name: '龙德广场',
    subtitle: '家门口的常去商场',
    emoji: '🏬',
    desc: '遛娃 + 吃饭 + 购物一站式，周末几乎常驻。下面这些福利记得顺手薅。',
    stores: [
      {
        name: '服装店',
        emoji: '👗',
        desc: '常年会员价，买衣服都来这家。',
        perks: [
          {
            title: '会员价购衣',
            emoji: '🏷️',
            category: '折扣',
            rule: '出示会员手机号',
            note: '具体门店 & 会员等级回头补登记 📝',
          },
        ],
      },
      {
        name: '内衣店',
        emoji: '👙',
        desc: '妈妈办了会员，每月都可以领一包棉柔巾。',
        perks: [
          {
            title: '每月领棉柔巾 · 一包',
            emoji: '🧻',
            category: '赠品',
            rule: '每月 1 次',
            note: '每月到店报手机号即可领，记得当月用完别忘。',
            highlight: true,
          },
        ],
      },
      {
        name: '淘气堡',
        location: '暄暄最爱的小小游乐场',
        emoji: '🎠',
        desc: '暄暄的小本营。生日月 + 日常免费时段都别错过。',
        perks: [
          {
            title: '会员卡 · 8 次次卡',
            emoji: '🎫',
            category: '积分',
            rule: '共 8 次可用',
            note: '每次玩完请店员划一次，快用完时留意续卡优惠。',
          },
          {
            title: '生日月免费玩',
            emoji: '🎂',
            category: '生日',
            rule: '每年 4 月（暄暄生日月）· 每月 23 号当天',
            note: '暄暄 4.19 生日，4 月整月或 23 号当天（按店内规则）凭会员信息免费入场。',
            highlight: true,
          },
          {
            title: '每天 8:00–9:00 免费时段',
            emoji: '⏰',
            category: '免费',
            rule: '每天早上 8-9 点',
            note: '开门一小时免费玩，人少干净，非常适合暄暄早起那天带去放电。',
            highlight: true,
          },
        ],
      },
    ],
  },
]

/** 权益分类 meta：配色 + 图标，UI 用 */
export const PERK_CATEGORY_META: Record<
  PerkCategory,
  { icon: string; color: string }
> = {
  赠品: {
    icon: 'ri-gift-2-line',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  免费: {
    icon: 'ri-price-tag-3-line',
    color: 'bg-teal-50 text-teal-700 ring-teal-200',
  },
  折扣: {
    icon: 'ri-coupon-3-line',
    color: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  积分: {
    icon: 'ri-stack-line',
    color: 'bg-sky-50 text-sky-700 ring-sky-200',
  },
  生日: {
    icon: 'ri-cake-3-line',
    color: 'bg-rose-50 text-rose-600 ring-rose-200',
  },
  其他: {
    icon: 'ri-bookmark-line',
    color: 'bg-slate-50 text-slate-600 ring-slate-200',
  },
}

/** 统计工具：权益总数 / 店铺总数 */
export function memberSummary() {
  const storeCount = MEMBERSHIPS.reduce((s, v) => s + v.stores.length, 0)
  const perkCount = MEMBERSHIPS.reduce(
    (s, v) => s + v.stores.reduce((sv, st) => sv + st.perks.length, 0),
    0,
  )
  const highlightCount = MEMBERSHIPS.reduce(
    (s, v) =>
      s +
      v.stores.reduce(
        (sv, st) => sv + st.perks.filter((p) => p.highlight).length,
        0,
      ),
    0,
  )
  return {
    venueCount: MEMBERSHIPS.length,
    storeCount,
    perkCount,
    highlightCount,
  }
}
