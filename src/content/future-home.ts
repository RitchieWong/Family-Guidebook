/**
 * 「未来的家」构思清单
 * -----------------------------------------------------------
 * 我们对未来家的所有期待，按房间 / 系统分区收纳。
 * 装修 / 选购 / 翻新前，都来这里翻一翻，别落下任何一个小心愿。
 *
 * 结构：分区 (Zone) → 多条心愿 (Wish)
 *
 * 新增：
 *   1. 已有分区新增心愿 → push 到对应 zone.wishes[]
 *   2. 新增分区 → 在 FUTURE_HOME_ZONES 末尾 push 一个 Zone
 */

export type WishPriority = 'must' | 'want' | 'nice'

export interface Wish {
  /** 心愿标题，简短一句 */
  title: string
  /** 小图标 emoji */
  emoji: string
  /** 优先级：必须有 / 想要有 / 锦上添花 */
  priority: WishPriority
  /** 详细说明 / 备注 / 落地要点 */
  note?: string
  /** 关联标签：智能化、收纳、清洁、隔音…… */
  tags?: string[]
}

export interface Zone {
  /** 用于筛选 tab 的 key，英文短词 */
  id: string
  /** 分区名称，如「客厅 & 厨房」 */
  name: string
  /** 副标题 */
  subtitle?: string
  /** 分区大图标 emoji */
  emoji: string
  /** 分区说明 */
  desc?: string
  /** 分区主色调（用于卡片左侧色条） */
  accent: 'rose' | 'amber' | 'emerald' | 'sky' | 'violet' | 'cyan' | 'slate'
  wishes: Wish[]
}

export const PRIORITY_META: Record<
  WishPriority,
  { label: string; emoji: string; color: string; rank: number }
> = {
  must: {
    label: '必须有',
    emoji: '⭐',
    color: 'bg-rose-50 text-rose-600 ring-rose-200',
    rank: 0,
  },
  want: {
    label: '想要有',
    emoji: '💡',
    color: 'bg-amber-50 text-amber-700 ring-amber-200',
    rank: 1,
  },
  nice: {
    label: '锦上添花',
    emoji: '✨',
    color: 'bg-sky-50 text-sky-700 ring-sky-200',
    rank: 2,
  },
}

export const FUTURE_HOME_ZONES: Zone[] = [
  // ========================================================
  // 全屋系统级
  // ========================================================
  {
    id: 'whole-house',
    name: '全屋系统',
    subtitle: 'Whole-House Systems',
    emoji: '🏠',
    desc: '不属于某个具体房间，而是整个家的底层基建：网络、智能、地面、清洁可达性。',
    accent: 'violet',
    wishes: [
      {
        title: '全屋 WiFi 无死角',
        emoji: '📶',
        priority: 'must',
        note: 'Mesh 组网或 AP 面板，每个房间 / 阳台 / 卫生间都满格，看监控、投屏不卡。',
        tags: ['网络', '装修预埋'],
      },
      {
        title: '全屋智能家居',
        emoji: '🤖',
        priority: 'must',
        note: '回家有点科技感：灯光场景、电动窗帘、语音控制、安防联动；强弱电预留好。',
        tags: ['智能', '装修预埋'],
      },
      {
        title: '全屋无卫生死角',
        emoji: '🧹',
        priority: 'must',
        note: '家具尽量悬空 / 顶天立地，扫地机器人和猫都能钻进去；踢脚线选超薄款。',
        tags: ['清洁', '设计'],
      },
      {
        title: '自流平地面 · 全屋平齐',
        emoji: '📏',
        priority: 'want',
        note: '取消门槛石、过门石；所有房间一个标高，扫地机器人通行无障碍，视觉也更通透。',
        tags: ['设计', '清洁'],
      },
      {
        title: '深色原木 · 高级感主调',
        emoji: '🪵',
        priority: 'want',
        note: '主基调用深色原木（胡桃 / 黑橡），搭配米白与暖光，安静、耐看、不显脏。',
        tags: ['风格'],
      },
    ],
  },

  // ========================================================
  // 客厅 + 厨房（开放式）
  // ========================================================
  {
    id: 'living-kitchen',
    name: '客厅 & 厨房',
    subtitle: 'Open-Plan Living',
    emoji: '🍳',
    desc: '客厅厨房打通做开放式，烟火气和家人的笑声一起流动。',
    accent: 'amber',
    wishes: [
      {
        title: '客厅厨房打通',
        emoji: '🛋️',
        priority: 'must',
        note: '开放式或半开放（玻璃推拉门），做饭的人不孤单，娃在哪都看得见。',
        tags: ['布局'],
      },
      {
        title: '高性能抽油烟机',
        emoji: '💨',
        priority: 'must',
        note: '开放式厨房成败关键，吸力 ≥ 23m³/min，大风压、低噪音；中式爆炒不串味。',
        tags: ['厨电'],
      },
      {
        title: '厨房置物升降拉篮',
        emoji: '🧺',
        priority: 'want',
        note: '吊柜下拉式拉篮，矮个子也能轻松拿到顶层调料 / 杯具，告别踩凳子。',
        tags: ['收纳'],
      },
      {
        title: '大单槽水池 + 洗碗机',
        emoji: '🫧',
        priority: 'must',
        note: '洗碗池要大，能直接放下炒锅；嵌入式 13 套以上洗碗机，解放双手。',
        tags: ['厨电', '收纳'],
      },
      {
        title: '台上即热 / 烧水龙头',
        emoji: '☕',
        priority: 'want',
        note: '厨房要能直接烧热水：即热饮水机或瞬热龙头，泡奶、冲茶、煮面随手就来。',
        tags: ['厨电'],
      },
      {
        title: '折叠龙头 · 锅边加水',
        emoji: '🚰',
        priority: 'nice',
        note: '在灶台正上方预埋一根冷水管 + 折叠抽拉龙头，炒菜煮汤直接锅里加水，不用端来端去。',
        tags: ['装修预埋', '厨电'],
      },
      {
        title: '冰箱式收纳柜 · 柜门也能装',
        emoji: '🗄️',
        priority: 'want',
        note: '高柜做成"冰箱式"开门，门板内侧加薄层置物架，调料瓶分门别类一目了然。',
        tags: ['收纳'],
      },
      {
        title: '透明冰柜 · 装零食专用',
        emoji: '🍫',
        priority: 'nice',
        note: '客厅 / 餐边角落放一台玻璃门小冰柜，专门塞零食饮料，颜值 + 仪式感拉满。',
        tags: ['厨电'],
      },
      {
        title: '自带制冰冰箱',
        emoji: '🧊',
        priority: 'want',
        note: '主冰箱选带自动制冰功能的型号（接水管），夏天冰美式 / 冰可乐随时来。',
        tags: ['厨电', '装修预埋'],
      },
    ],
  },

  // ========================================================
  // 卧室
  // ========================================================
  {
    id: 'bedroom',
    name: '卧室',
    subtitle: 'Bedrooms',
    emoji: '🛏️',
    desc: '主卧要安静、次卧要保暖；床要硬一点，灯要暗一点，仪式感拉满。',
    accent: 'rose',
    wishes: [
      {
        title: '主卧 · 顶级隔音',
        emoji: '🤫',
        priority: 'must',
        note: '墙体加岩棉、门用静音门、窗户三玻两腔；娃睡了爸妈追剧也不会吵醒。',
        tags: ['隔音', '装修预埋'],
      },
      {
        title: '次卧 · 加保暖层',
        emoji: '🧥',
        priority: 'must',
        note: '外墙内侧加保温棉 / 反射膜，冬天不冰冷不结露，老人 / 客人住着舒服。',
        tags: ['保温', '装修预埋'],
      },
      {
        title: '床要硬一些',
        emoji: '🛌',
        priority: 'must',
        note: '硬棕 + 薄乳胶 / 椰棕床垫，护腰；可能的话主卧定制双人不同硬度分区款。',
        tags: ['家具'],
      },
      {
        title: '电动可摇起床架',
        emoji: '⚙️',
        priority: 'want',
        note: '床头床尾电动升降，半坐看书 / 抬腿放松；最好带零重力档位。',
        tags: ['家具', '智能'],
      },
      {
        title: '卧室投影仪',
        emoji: '🎬',
        priority: 'want',
        note: '吊装超短焦 + 100 寸电动幕布，躺平看片；线管和插座装修阶段就预埋。',
        tags: ['影音', '装修预埋'],
      },
    ],
  },

  // ========================================================
  // 阳台 & 洗衣
  // ========================================================
  {
    id: 'balcony',
    name: '阳台 & 洗衣区',
    subtitle: 'Balcony & Laundry',
    emoji: '🧺',
    desc: '把洗衣区放阳台，阳光、通风、地漏一次到位。',
    accent: 'sky',
    wishes: [
      {
        title: '阳台洗衣机 + 烘干机',
        emoji: '🌀',
        priority: 'must',
        note: '上下叠放或并排款；阳台预留水电 + 上下水 + 排风口，不挤厨房 / 卫生间。',
        tags: ['装修预埋', '家电'],
      },
      {
        title: '大容量洗衣机',
        emoji: '👕',
        priority: 'must',
        note: '至少 10kg 以上，能洗下整床被罩 + 厚毛毯；带蒸汽除菌更好。',
        tags: ['家电'],
      },
      {
        title: '阳台地面排水',
        emoji: '💧',
        priority: 'must',
        note: '阳台至少留 2 个地漏（洗衣机 + 拖地水），地面找坡 1%；防止反水到客厅。',
        tags: ['装修预埋'],
      },
    ],
  },

  // ========================================================
  // 卫生间
  // ========================================================
  {
    id: 'bathroom',
    name: '卫生间',
    subtitle: 'Bathrooms',
    emoji: '🛁',
    desc: '泡澡、夫妻同时洗漱、爸爸专属小便池，每一个小心愿都安排上。',
    accent: 'cyan',
    wishes: [
      {
        title: '浴池 / 泡澡缸',
        emoji: '🛀',
        priority: 'want',
        note: '主卫做独立浴缸（最好嵌入式），周末泡澡解压；陪娃玩水也安全。',
        tags: ['卫浴'],
      },
      {
        title: '双台盆 / 两个洗手池',
        emoji: '🪞',
        priority: 'must',
        note: '夫妻早上同时洗漱不打架；台盆建议台下盆 + 整体岩板，无卫生死角。',
        tags: ['卫浴'],
      },
      {
        title: '小便池',
        emoji: '🚹',
        priority: 'nice',
        note: '主卫角落加装一个小便池，爸爸专用；干净、省空间、不弄脏马桶圈。',
        tags: ['卫浴', '装修预埋'],
      },
    ],
  },

  // ========================================================
  // 玄关 & 收纳
  // ========================================================
  {
    id: 'entry',
    name: '玄关 & 收纳',
    subtitle: 'Entryway & Storage',
    emoji: '🚪',
    desc: '一进门就要清爽，鞋子、外套、快递都各归其位。',
    accent: 'emerald',
    wishes: [
      {
        title: '门口踢脚抽放鞋 · 可拆卸清洁',
        emoji: '👟',
        priority: 'want',
        note: '玄关柜底部做超薄翻斗式 / 抽屉式鞋抽，常穿鞋一脚收；面板可整块拆下来洗。',
        tags: ['收纳', '清洁'],
      },
    ],
  },

  // ========================================================
  // 生活仪式感
  // ========================================================
  {
    id: 'lifestyle',
    name: '生活仪式感',
    subtitle: 'Comfort & Rituals',
    emoji: '🛋️',
    desc: '一些不是必须、但拥有了就笑得出来的小确幸。',
    accent: 'violet',
    wishes: [
      {
        title: '一定要有按摩椅',
        emoji: '💆',
        priority: 'must',
        note: '客厅或书房角落留 1.2m × 0.8m 的位置 + 单独插座；下班 15 分钟，一身轻松。',
        tags: ['家具'],
      },
    ],
  },
]

/* ============================================================
 * 工具函数
 * ============================================================ */

export function futureHomeSummary() {
  let total = 0
  let mustCount = 0
  let wantCount = 0
  let niceCount = 0
  for (const z of FUTURE_HOME_ZONES) {
    for (const w of z.wishes) {
      total += 1
      if (w.priority === 'must') mustCount += 1
      else if (w.priority === 'want') wantCount += 1
      else niceCount += 1
    }
  }
  return {
    zoneCount: FUTURE_HOME_ZONES.length,
    total,
    mustCount,
    wantCount,
    niceCount,
  }
}
