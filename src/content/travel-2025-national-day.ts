/**
 * 2025 国庆 · 江苏带娃游 路书（回顾版）
 *
 * 行程：2025.10.01 - 2025.10.11，共 11 天 10 晚
 * 出行家庭：爸爸 + 妈妈 + 暄暄（1 岁半），+ 中途汇合的家人
 * 核心事件：暄暄第一次坐高铁、表亲婚礼、江南水乡初遇、自驾江苏大环线
 */
import type { Place } from '../utils/mapNav'

/** 单日行程数据 —— 驱动 DaySection 组件 */
export interface DayItinerary {
  /** 唯一 id，用作锚点（#day01） */
  id: string
  /** 日期字符串：10.01 */
  date: string
  /** 星期 */
  weekday: string
  /** 标题 */
  title: string
  /** 副标题/导读 */
  subtitle: string
  /** 交通方式：highway-train/self-drive/rideshare/flight/walking 等 */
  transport: Transport
  /** 交通细节：高铁车次、出发地、抵达地、时间 */
  transportDetail?: TransportDetail
  /** 所在城市（可多个） */
  cities: string[]
  /** 游玩项目（数组） */
  activities: string[]
  /** 当晚住宿（没有住宿留空） */
  hotel?: string
  /** 主题色 */
  accent: AccentKey
  /** 一句话亮点 */
  highlight: string
  /** 亲子贴士（1-3 条） */
  tips?: string[]
}

export interface TransportDetail {
  /** 车次 / 航班号 / "自驾" / "顺风车" */
  no?: string
  from?: string
  to?: string
  depart?: string
  arrive?: string
}

export type Transport = 'train' | 'drive' | 'rideshare' | 'flight' | 'wedding' | 'rest'
export type AccentKey = 'sky' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'violet' | 'indigo' | 'teal' | 'orange' | 'pink'

/** 整条行程 */
export const ITINERARY: DayItinerary[] = [
  {
    id: 'day01',
    date: '10.01',
    weekday: '周三',
    title: '出发 · 暄暄的第一次高铁',
    subtitle: '北京南 → 东台 · 国庆的第一声汽笛',
    transport: 'train',
    transportDetail: {
      no: 'G2575',
      from: '北京南站',
      to: '东台站',
      depart: '下午 13:46',
      arrive: '下午 19:24',
    },
    cities: ['北京', '东台'],
    activities: ['北京南站乘高铁南下', '抵达东台 · 入住亲戚家'],
    accent: 'sky',
    highlight: '暄暄 1 岁半 · 第一次坐高铁，全程 5 小时 38 分',
    tips: [
      '安排下午的班次，正好覆盖暄暄午睡时间',
      '带上最喜欢的玩偶和 2 本小绘本，车厢里可以打发时间',
      '高铁厕所有换尿布台，隔 2 小时换一次不怕"事故"',
    ],
  },
  {
    id: 'day02',
    date: '10.02',
    weekday: '周四',
    title: '东台婚礼日 · 喜气洋洋',
    subtitle: '暄暄的第一场婚礼',
    transport: 'wedding',
    cities: ['东台'],
    activities: ['参加东台婚礼', '见亲戚长辈，大家都想抱抱暄暄'],
    accent: 'rose',
    highlight: '1 岁半的暄暄穿上小礼服，成为全场最萌的客人',
    tips: [
      '婚礼现场人多声杂，给暄暄准备降噪耳塞或直接在安静房间过渡',
      '避免给她吃席面上的重口味菜，自备奶粉/辅食最稳',
    ],
  },
  {
    id: 'day03',
    date: '10.03',
    weekday: '周五',
    title: '东台 → 张家港 · 沙洲优黄',
    subtitle: '高铁再启程 · 江南初遇',
    transport: 'train',
    transportDetail: {
      no: 'G8361',
      from: '东台站',
      to: '张家港站',
      depart: '上午 09:54',
      arrive: '上午 10:38',
    },
    cities: ['张家港'],
    activities: ['抵达张家港', '参观张家港沙洲优黄文化园'],
    hotel: '如家 neo · 张家港高铁站店',
    accent: 'amber',
    highlight: '44 分钟高铁直达江南 · 下午看黄酒历史',
    tips: [
      '文化园室内参观为主，暄暄走累了可以推婴儿车',
      '酒香较浓，进入发酵车间可以快速通过',
    ],
  },
  {
    id: 'day04',
    date: '10.04',
    weekday: '周六',
    title: '张家港 · 双山岛',
    subtitle: '顺风车过江 · 长江口的小岛',
    transport: 'rideshare',
    transportDetail: {
      no: '顺风车',
      from: '张家港',
      to: '双山岛 / 硕放机场方向',
    },
    cities: ['张家港', '双山岛'],
    activities: ['双山岛游玩', '江滩踏青、看芦苇荡'],
    hotel: '如家 neo · 张家港高铁站店',
    accent: 'cyan',
    highlight: '暄暄第一次看长江 · 芦苇荡里追风',
    tips: [
      '岛上没有大型公共交通，靠步行 + 观光车',
      '秋风大，给暄暄备薄外套',
    ],
  },
  {
    id: 'day05',
    date: '10.05',
    weekday: '周日',
    title: '张家港 → 南通 · 野生动物园',
    subtitle: '自驾跨江 · 动物园亲密接触',
    transport: 'drive',
    transportDetail: {
      no: '自驾',
      from: '张家港',
      to: '南通',
    },
    cities: ['张家港', '南通'],
    activities: ['南通野生动物园一日游', '看长颈鹿、小象、孔雀开屏'],
    hotel: '如家 neo · 张家港高铁站店',
    accent: 'emerald',
    highlight: '1 岁半的暄暄第一次近距离看大动物 · 眼睛都不够用',
    tips: [
      '园区很大，建议租电瓶观光车',
      '投喂区人多，抱紧暄暄防止伸手',
      '返程跨江大桥容易堵车，提早收队',
    ],
  },
  {
    id: 'day06',
    date: '10.06',
    weekday: '周一',
    title: '张家港 → 溧阳 · 天目湖 + 竹海',
    subtitle: '自驾进山 · 江南的湖光山色',
    transport: 'drive',
    transportDetail: {
      no: '自驾',
      from: '张家港',
      to: '溧阳',
    },
    cities: ['溧阳'],
    activities: ['溧阳天目湖游船', '南山竹海漫步'],
    hotel: '如家 · 常州溧阳天目湖昆仑路北路店',
    accent: 'teal',
    highlight: '天目湖的水、南山竹海的风 · 江南腹地最清新的一天',
    tips: [
      '竹海景区坡多，婴儿车不便，推荐腰凳或背带',
      '湖边阴凉温度偏低，给暄暄加件外套',
    ],
  },
  {
    id: 'day07',
    date: '10.07',
    weekday: '周二',
    title: '溧阳一号公路 · 宜兴窑湖小镇',
    subtitle: '国民最美自驾路 · 紫砂小镇漫游',
    transport: 'drive',
    transportDetail: {
      no: '自驾',
      from: '溧阳',
      to: '宜兴',
    },
    cities: ['溧阳', '宜兴'],
    activities: ['溧阳一号公路自驾', '宜兴窑湖小镇打卡'],
    hotel: '如家 · 常州溧阳天目湖昆仑路北路店',
    accent: 'indigo',
    highlight: '彩虹公路蜿蜒在茶园里 · 车窗摇下来就是风景',
    tips: [
      '一号公路有多个观景平台，沿途停车拍照',
      '山路弯多，暄暄容易晕车，记得 1 小时下车透气',
    ],
  },
  {
    id: 'day08',
    date: '10.08',
    weekday: '周三',
    title: '溧阳 → 南浔古镇',
    subtitle: '江南水乡 · 小桥流水人家',
    transport: 'drive',
    transportDetail: {
      no: '自驾',
      from: '溧阳',
      to: '湖州 · 南浔',
    },
    cities: ['湖州'],
    activities: ['南浔古镇漫游', '百间楼、小莲庄、张石铭旧宅'],
    hotel: '如家 neo · 湖州南浔古镇店',
    accent: 'violet',
    highlight: '第一次带暄暄逛古镇 · 水边喂鱼、石板路上学走路',
    tips: [
      '古镇青石板路不平，备好防滑鞋',
      '晚上灯光亮起再去逛一圈 · 人少、凉快、好拍照',
    ],
  },
  {
    id: 'day09',
    date: '10.09',
    weekday: '周四',
    title: '南浔 → 苏州 · 过渡日',
    subtitle: '从湖州到苏州 · 慢慢行',
    transport: 'drive',
    transportDetail: {
      no: '自驾',
      from: '湖州',
      to: '苏州',
    },
    cities: ['湖州', '苏州'],
    activities: ['上午南浔古镇补游', '下午自驾至苏州', '晚上苏州老城漫步（具体景点待补）'],
    hotel: '遇见 · 嘉樂里酒店',
    accent: 'pink',
    highlight: '慢节奏过渡日 · 两个古城之间的换乘日',
    tips: [
      '车程约 1 小时 20 分钟，中途可以在湖州服务区休息',
      '苏州老城停车位紧张，酒店尽量选带停车场的',
    ],
  },
  {
    id: 'day10',
    date: '10.10',
    weekday: '周五',
    title: '苏州 · 拙政园',
    subtitle: '园林之母 · 江南压轴戏',
    transport: 'drive',
    cities: ['苏州'],
    activities: ['拙政园游览', '苏州园林的叠石、理水、花木、建筑'],
    hotel: '遇见 · 嘉樂里酒店',
    accent: 'orange',
    highlight: '中国四大名园之首 · 把江南揉进一座园子里',
    tips: [
      '国庆后半段游客回落，但拙政园仍需提前 2-3 天订票',
      '园里景点密集，暄暄走累了腰凳比婴儿车好用',
      '出园后可顺路去苏州博物馆（贝聿铭设计）补一波',
    ],
  },
  {
    id: 'day11',
    date: '10.11',
    weekday: '周六',
    title: '返程 · 硕放飞北京',
    subtitle: '苏州 → 无锡硕放机场 · 再见江南',
    transport: 'flight',
    transportDetail: {
      no: 'ZH9164',
      from: '硕放国际机场 T2',
      to: '首都国际机场 T3',
      depart: '下午 18:50',
      arrive: '下午 21:00',
    },
    cities: ['苏州', '北京'],
    activities: ['早上苏州退房，自驾到硕放机场', '深圳航空 ZH9164 回京'],
    accent: 'sky',
    highlight: '江南 11 天后 · 从高铁开始的旅程，以飞机结束',
    tips: [
      '硕放机场到苏州市区车程约 1 小时，算好还车时间',
      '安检前给暄暄喝一次奶，飞机起降时吞咽能缓解耳压',
    ],
  },
]

/** 出发时间（用于倒计时 / 已结束判断） */
export const DEPARTURE_AT = '2025-10-01T13:46:00'
export const RETURN_AT = '2025-10-11T21:00:00'

/** 联系人 · 不在页面展示 */
// export const CONTACT = { booker: '王长老' }

/** 核心住宿点 —— 供 Hotel 区块/导航使用 */
export const PLACES = {
  zjgHotel: {
    name: '如家 neo · 张家港高铁站店',
    address: '江苏省苏州市张家港高铁站附近',
    city: '张家港',
  } satisfies Place,
  lyhHotel: {
    name: '如家 · 常州溧阳天目湖昆仑路北路店',
    address: '江苏省常州市溧阳市昆仑路北路',
    city: '溧阳',
  } satisfies Place,
  nxHotel: {
    name: '如家 neo · 湖州南浔古镇店',
    address: '浙江省湖州市南浔区南浔古镇附近',
    city: '湖州',
  } satisfies Place,
  szHotel: {
    name: '遇见 · 嘉樂里酒店（苏州）',
    address: '江苏省苏州市姑苏区',
    city: '苏州',
  } satisfies Place,
} as const

/**
 * 关键数据（用于 Hero 上部的四张小卡）
 * - 总天数
 * - 总里程（自驾段估算）
 * - 城市数量
 * - 住宿数
 */
export const STATS = {
  totalDays: 11,
  totalNights: 10,
  cities: ['北京', '东台', '张家港', '双山岛', '南通', '溧阳', '宜兴', '湖州', '苏州'],
  hotels: 4,
  driveKm: 750,
  railKm: 1200,
}
