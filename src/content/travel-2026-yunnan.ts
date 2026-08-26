// 云南全家总动员 · 2026 国庆亲子三代行程（22 天·全程自驾）
// 机票已定：09-19 北京、延吉两路抵昆；09-25 爷爷从沈阳抵昆；10-08 爷爷奶奶飞沈阳回盘锦；10-10 其余家人返京
// 人员分批：09-19 父母+2岁宝宝+奶奶从北京出发、姥姥从延吉出发 → 09-25爷爷到昆明全家六口集合 → 10-08 爷爷奶奶返程 → 10-10 其余家人返京
// 结构：① 昆明/弥勒/抚仙湖慢游，爷爷落地后打车到禄充会合 ② 09-26六口转场大理，连住四晚后直接去普洱，再到西双版纳 ③ 爷爷奶奶动车返昆，其余四人经建水开车返昆
// 精简城市：取消腾冲、芒市、楚雄、墨江住宿；大理→普洱、版纳→建水是两个长驾驶日。
// 已去掉泸沽湖等高海拔点，全程 2000m 以内，最低版纳约 550m。

import type { Place } from '../utils/mapNav'

export const tripMeta = {
  title: "云南全家总动员 · 2026 国庆亲子三代 22 天行程",
  subtitle: "弥勒与抚仙湖慢游 → 禄充与爷爷会合 → 大理直达普洱 → 西双版纳 → 建水 → 昆明",
  dateRange: "2026.09.19（周六）— 10.10（周六）· 共 22 天",
  people: "北京出发4人(爸爸妈妈+2岁宝宝+奶奶)，姥姥从延吉会合；爷爷 09-25 加入 → 六口",
  car: "租 7 座车全程自驾（酒店/服务区补能）；不安排云南境内航班",
  totalDrive: "云南自驾约 2000—2300 公里；大理→普洱、版纳→建水是两个长驾驶日",
  arrival: "去程 09-19 北京大兴、延吉两路抵达昆明长水",
  theme: "全程主打：🏖️高原湖玩沙亲水 · 🌸弥勒当季花景 · 🏞️洱海田园与白族非遗 · 🐾普洱森林动物 · 🐘雨林傣家 · 🚂建水古城米轨",
  images: {
    kunmingArrival: "/images/travel/2026-yunnan/d01-kunming-arrival.webp",
    dianchi: "/images/travel/2026-yunnan/d02-dianchi.webp",
    mileDongfeng: "/images/travel/2026-yunnan/d03-mile-dongfeng.webp",
    mileTaiping: "/images/travel/2026-yunnan/d04-mile-taiping.webp",
    fuxianSunset: "/images/travel/2026-yunnan/d05-fuxian-sunset.webp",
    fuxianSand: "/images/travel/2026-yunnan/d06-fuxian-sand.webp",
    fuxianReunion: "/images/travel/2026-yunnan/d07-fuxian-reunion.webp",
    fuxianLuchong: "/images/travel/2026-yunnan/d08-fuxian-luchong.webp",
    erhai: "/images/travel/2026-yunnan/d09-erhai.webp",
    xizhou: "/images/travel/2026-yunnan/d10-xizhou.webp",
    zhoucheng: "/images/travel/2026-yunnan/d10-xizhou.webp",
    daliOldtown: "/images/travel/2026-yunnan/d11-dali-oldtown.webp",
    roadDaliPuer: "/images/travel/2026-yunnan/d12-road-dali-puer.webp",
    puerRedpanda: "/images/travel/2026-yunnan/d13-puer-redpanda.webp",
    puerCoffee: "/images/travel/2026-yunnan/d14-puer-coffee.webp",
    elephantValley: "/images/travel/2026-yunnan/d15-elephant-valley.webp",
    daiGarden: "/images/travel/2026-yunnan/d16-dai-garden.webp",
    botanicalGarden: "/images/travel/2026-yunnan/d17-botanical-garden.webp",
    mantingPark: "/images/travel/2026-yunnan/d18-manting-park.webp",
    bannaStation: "/images/travel/2026-yunnan/d19-banna-station.webp",
    jianshuiOldtown: "/images/travel/2026-yunnan/d20-jianshui-oldtown.webp",
    returnKunming: "/images/travel/2026-yunnan/d21-return-kunming.webp",
    kunmingDeparture: "/images/travel/2026-yunnan/d22-kunming-departure.webp"
  }
};

/** 已出票航班；仅保留路书需要的行程信息，不记录订单金额。 */
export const bookedFlights = [
  { date: "09.19", traveler: "爸爸妈妈 + 暄暄 + 奶奶", from: "北京大兴", to: "昆明长水", depart: "15:25", arrive: "19:05", airline: "河北航空", flightNo: "NS8009" },
  { date: "09.19", traveler: "姥姥", from: "延吉朝阳川", to: "昆明长水", depart: "14:20", arrive: "21:00", airline: "苏南瑞丽航空", flightNo: "DR6566" },
  { date: "09.25", traveler: "爷爷", from: "沈阳桃仙", to: "昆明长水", depart: "09:10", arrive: "13:50", airline: "南方航空", flightNo: "CZ5365" },
  { date: "10.08", traveler: "爷爷 + 奶奶", from: "昆明长水", to: "沈阳桃仙", depart: "15:00", arrive: "19:15", airline: "南方航空", flightNo: "CZ5366", note: "抵达沈阳后返回盘锦" },
  { date: "10.10", traveler: "爸爸妈妈 + 暄暄 + 姥姥", from: "昆明长水", to: "北京", depart: "15:05", arrive: "18:15", airline: "首都航空", flightNo: "JD5630" }
] as const;

/**
 * 已预订住宿。仅公开查到的地址标记 verifiedAddress；其余订单截图未展示完整门牌号，
 * 只能先用“城市 + 订单名称”跨地图搜索，入住前应以订单详情或房东发送的定位为准。
 */
export const bookedHotels = [
  {
    id: 'kunming-dianchi', city: '昆明', checkIn: '09.19', checkOut: '09.21', nights: 2,
    name: '【末花·初夏】近欢乐世界 / 捞鱼河 / 海晏村民宿',
    room: '订单截图显示房型', status: '待入住', source: '途家民宿',
    nav: { name: '末花初夏民宿', address: '昆明 末花初夏 欢乐世界 捞鱼河 海晏村', city: '昆明' } satisfies Place,
  },
  {
    id: 'mile-linglong', city: '弥勒', checkIn: '09.21', checkOut: '09.23', nights: 2,
    name: '【翎珑美宿·两居湖景】湖景亲子民宿',
    room: '两居湖景', status: '待入住', source: '途家民宿',
    nav: { name: '翎珑美宿两居湖景', address: '弥勒 翎珑美宿 两居湖景', city: '弥勒' } satisfies Place,
  },
  {
    id: 'fuxian-banshan', city: '澄江·抚仙湖', checkIn: '09.23', checkOut: '09.25', nights: 2,
    name: '半山·云境湖景美宿', room: '两居山景套房', status: '待入住', source: '途家民宿',
    nav: { name: '半山·云境湖景美宿', address: '澄江市松元线太阳山漫园小区45-2号', city: '澄江', verifiedAddress: true } satisfies Place,
  },
  {
    id: 'fuxian-lanhu', city: '澄江·抚仙湖', checkIn: '09.25', checkOut: '09.26', nights: 1,
    name: '【澜湖】抚仙湖太阳山湖景民宿', room: '湖景房', status: '待入住', source: '途家民宿',
    nav: { name: '澜湖抚仙湖太阳山湖景民宿', address: '澄江 抚仙湖 太阳山 澜湖民宿', city: '澄江' } satisfies Place,
  },
  {
    id: 'dali-laiquer', city: '大理', checkIn: '09.26', checkOut: '09.30', nights: 4,
    name: '来趣儿民宿（大理古城三月街店）', room: '观云房', status: '待入住', source: '途家民宿',
    nav: { name: '来趣儿民宿（大理古城三月街店）', address: '大理市古城西门石门村59号附1号', city: '大理', verifiedAddress: true } satisfies Place,
  },
  {
    id: 'puer-shaoxi', city: '普洱', checkIn: '09.30', checkOut: '10.03', nights: 3,
    name: '芍汐民宿', room: '舒适经济普通公寓', status: '待确认', source: '途家民宿',
    nav: { name: '芍汐民宿', address: '普洱 芍汐民宿', city: '普洱' } satisfies Place,
  },
  {
    id: 'banna-lanqi', city: '西双版纳·景洪', checkIn: '10.03', checkOut: '10.07', nights: 4,
    name: '【蘭栖·漫栖】曼城清新奶油风民宿', room: '三居室', status: '待确认', source: '途家民宿',
    nav: { name: '蘭栖漫栖曼城民宿', address: '景洪 蘭栖 漫栖 曼城', city: '景洪' } satisfies Place,
  },
  {
    id: 'jianshui-zitao', city: '建水', checkIn: '10.07', checkOut: '10.09', nights: 2,
    name: '近紫陶街·中古风两居民宿', room: '两室·可做饭·近建水古城', status: '已确认', source: '小猪短租',
    nav: { name: '近紫陶街中古风两居民宿', address: '建水 紫陶街 建水古城 两居民宿', city: '建水' } satisfies Place,
  },
  {
    id: 'kunming-qiuqiu', city: '昆明·长水', checkIn: '10.09', checkOut: '10.10', nights: 1,
    name: '秋秋民宿 2-708', room: '两室一厅温馨套房', status: '待入住', source: '途家民宿',
    nav: { name: '秋秋民宿 2-708', address: '昆明长水机场附近 秋秋民宿 2-708', city: '昆明' } satisfies Place,
  },
] as const;

export type BookedHotelId = (typeof bookedHotels)[number]['id'];

/**
 * 酒店与当日景点之间的自驾参考。
 * 多数民宿订单未提供完整门牌号，以下按订单标题所示片区估算；节假日需以当天高德实时导航为准。
 */
export const dayDriveReferences = [
  {
    dayId: 2,
    items: [
      { from: '【末花·初夏】民宿', to: '捞鱼河湿地公园', distance: '约 5—15km', duration: '约 15—25 分钟' },
      { from: '【末花·初夏】民宿', to: '海晏村', distance: '约 5—15km', duration: '约 15—25 分钟' },
    ],
  },
  {
    dayId: 3,
    items: [
      { from: '翎珑美宿', to: '东风韵', distance: '约 15—20km', duration: '约 25—35 分钟' },
    ],
  },
  {
    dayId: 4,
    items: [
      { from: '翎珑美宿', to: '太平湖森林小镇', distance: '约 20—25km', duration: '约 30—40 分钟' },
      { from: '翎珑美宿', to: '湖泉生态园', distance: '约 2—5km', duration: '约 5—15 分钟' },
    ],
  },
  {
    dayId: 5,
    items: [
      { from: '半山·云境', to: '小湾村', distance: '约 15—25km', duration: '约 25—40 分钟' },
      { from: '半山·云境', to: '酒店附近湖岸', distance: '约 0—5km', duration: '约 5—15 分钟' },
    ],
  },
  {
    dayId: 6,
    items: [
      { from: '半山·云境', to: '抚海湾湿地公园', distance: '约 10—20km', duration: '约 20—35 分钟' },
      { from: '抚海湾湿地公园', to: '广龙旅游小镇', distance: '约 5—10km', duration: '约 10—20 分钟' },
      { from: '半山·云境', to: '月亮湾湿地公园', distance: '约 5—15km', duration: '约 15—25 分钟' },
    ],
  },
  {
    dayId: 7,
    items: [
      { from: '半山·云境', to: '禄充风景区', distance: '约 30—50km', duration: '约 45—70 分钟' },
      { from: '昆明长水机场', to: '禄充风景区', distance: '约 85—100km', duration: '约 1.5—2 小时', warning: '爷爷落地后直接打车到景区会合' },
      { from: '禄充风景区', to: '澜湖民宿', distance: '约 35—50km', duration: '约 50—70 分钟' },
    ],
  },
  {
    dayId: 8,
    items: [
      { from: '来趣儿民宿', to: '大理古城苍山门', distance: '约 1km', duration: '约 5 分钟 / 可步行' },
    ],
  },
  {
    dayId: 9,
    items: [
      { from: '来趣儿民宿', to: '崇圣寺三塔', distance: '约 2—4km', duration: '约 10—15 分钟' },
      { from: '来趣儿民宿', to: '大理古城西门', distance: '约 1km', duration: '约 5 分钟 / 可步行' },
    ],
  },
  {
    dayId: 10,
    items: [
      { from: '来趣儿民宿', to: '周城村', distance: '约 35—40km', duration: '约 50—60 分钟' },
      { from: '周城村', to: '喜洲古镇', distance: '约 10—15km', duration: '约 20—30 分钟' },
      { from: '喜洲古镇', to: '来趣儿民宿', distance: '约 25—30km', duration: '约 40—50 分钟' },
    ],
  },
  {
    dayId: 11,
    items: [
      { from: '来趣儿民宿', to: '龙龛生态廊道入口', distance: '约 8—10km', duration: '约 20—30 分钟' },
      { from: '来趣儿民宿', to: '才村生态廊道入口', distance: '约 5—8km', duration: '约 15—25 分钟' },
    ],
  },
  {
    dayId: 13,
    items: [
      { from: '芍汐民宿', to: '太阳河森林公园', distance: '约 35—45km', duration: '约 55—70 分钟', warning: '往返应按 70—90km、纯驾驶约 2 小时准备' },
    ],
  },
  {
    dayId: 14,
    items: [
      { from: '芍汐民宿', to: '市区咖啡体验空间', distance: '约 5—15km', duration: '约 15—30 分钟' },
      { from: '芍汐民宿', to: '梅子湖 / 洗马河公园', distance: '约 5—10km', duration: '约 15—25 分钟' },
    ],
  },
  {
    dayId: 15,
    items: [
      { from: '芍汐民宿', to: '野象谷', distance: '约 100—120km', duration: '约 1.5—2 小时' },
      { from: '野象谷', to: '蘭栖·漫栖民宿', distance: '约 35—45km', duration: '约 45—60 分钟' },
    ],
  },
  {
    dayId: 16,
    items: [
      { from: '蘭栖·漫栖', to: '中科院热带植物园西区', distance: '约 60—70km', duration: '约 70—90 分钟', warning: '西门 08:00 开放，建议 07:30 左右出发' },
    ],
  },
  {
    dayId: 17,
    items: [
      { from: '蘭栖·漫栖', to: '傣族园', distance: '约 30—35km', duration: '约 45—60 分钟' },
      { from: '蘭栖·漫栖', to: '景洪周边果园', distance: '约 10—25km', duration: '约 20—40 分钟', warning: '宝宝和老人状态一般时选近郊果园' },
    ],
  },
  {
    dayId: 18,
    items: [
      { from: '蘭栖·漫栖', to: '曼听公园', distance: '约 5—10km', duration: '约 15—25 分钟' },
      { from: '曼听公园', to: '总佛寺', distance: '相邻', duration: '步行约 5—10 分钟' },
    ],
  },
  {
    dayId: 20,
    items: [
      { from: '紫陶街民宿', to: '临安站', distance: '约 2—5km', duration: '约 10—15 分钟' },
      { from: '紫陶街民宿', to: '临安古城 / 朱家花园', distance: '约 1—3km', duration: '约 5—10 分钟' },
      { from: '紫陶街民宿', to: '紫陶街', distance: '约 0—2km', duration: '约 5—10 分钟 / 可步行' },
    ],
  },
  {
    dayId: 21,
    items: [
      { from: '建水紫陶街民宿', to: '妈咪多肉花园', distance: '约 190—210km', duration: '约 2.5—3 小时' },
      { from: '妈咪多肉花园', to: '秋秋民宿', distance: '约 30—40km', duration: '约 40—60 分钟', warning: '晚高峰以实时导航为准' },
    ],
  },
] as const;

// 路线阶段：① 昆明、弥勒、抚仙湖与爷爷会合 ② 六口滇西南自驾 ③ 分头返昆；drive=从上一站到本站
// phase: near=昆明附近先玩 / far=全家六口远游 / back=昆明收尾；mark: gather=六口集合 / split=爷爷奶奶返程
export const routeStages = [
  { city: "昆明·滇池", alt: "约 1890m", days: "D1-D2", date: "09.19-09.20", drive: "", phase: "near" },
  { city: "弥勒", alt: "约 1500m", days: "D3-D4", date: "09.21-09.22", drive: "约2.5h", phase: "near" },
  { city: "抚仙湖", alt: "约 1720m", days: "D5-D7", date: "09.23-09.25", drive: "约2h", phase: "near" },
  { city: "爷爷打车到禄充会合", alt: "约 1720m", days: "D7", date: "09.25 13:50抵昆", drive: "机场→禄充约1.5—2h", phase: "near", mark: "gather" },
  { city: "大理·洱海", alt: "约 1970m", days: "D8-D11", date: "09.26-09.29", drive: "中秋假期按6—7h", phase: "far" },
  { city: "普洱", alt: "约 1300m", days: "D12-D14", date: "09.30-10.02", drive: "国庆前高峰按9—11h", phase: "far" },
  { city: "西双版纳", alt: "约 550m", days: "D15-D18", date: "10.03-10.06", drive: "约2—2.5h", phase: "far" },
  { city: "建水·分头返程", alt: "约 1300m", days: "D19-D20", date: "10.07-10.08", drive: "版纳出发按7—8h", phase: "back", mark: "split" },
  { city: "昆明", alt: "约 1890m", days: "D21-D22", date: "10.09-10.10", drive: "建水→昆明约3—3.5h", phase: "back" }
];

// 地图节点：[名称, 经度, 纬度, 简写标签, 类型(hub连住/spot途经/special特色), 到该点自驾时间, 标签方位dir]
// dir: 标签相对圆点的方位 r右 l左 t上 b下，用于人工避让重叠
export const mapPoints = [
  ["昆明·滇池", 102.712, 24.982, "D1-2 起", "hub", "", "l"],
  ["弥勒", 103.414, 24.408, "D3-4", "hub", "约2.5h", "r"],
  ["抚仙湖·澄江", 102.898, 24.545, "D5-7", "hub", "约2h", "r"],
  ["昆明长水·爷爷打车", 102.929, 25.101, "D7 爷爷出发", "special", "到禄充约1.5—2h", "t"],
  ["大理·洱海", 100.170, 25.780, "D8-11", "hub", "中秋假期按6—7h", "t"],
  ["普洱", 100.972, 22.825, "D12-14", "hub", "高峰按9—11h", "l"],
  ["西双版纳·景洪", 100.797, 22.010, "D15-18", "hub", "约2—2.5h", "b"],
  ["建水·返程", 102.827, 23.619, "D19-20", "hub", "按7—8h", "l"],
  ["昆明长水·返程", 102.929, 25.101, "D21-22", "hub", "约3—3.5h", "r"]
];

export const days = [
  {
    id: 1, date: "第1天 09-19 周六", city: "昆明·滇池", alt: "约 1890m", drive: "机场→滇池市区约 30km",
    img: "kunmingArrival",
    title: "北京、延吉两路抵昆 · 全家会合休整",
    schedule: [
      "19:05 爸爸妈妈、暄暄和奶奶落地长水机场（北京大兴15:25起飞·河北航NS8009）",
      "21:00 姥姥从延吉抵达昆明（延吉朝阳川14:20起飞·苏南瑞丽航空DR6566）",
      "取预约好的 7 座租车（检查车况、装好儿童座椅），入住【末花·初夏】民宿",
      "宝宝老人早休息；爷爷 09-25 抵昆后到抚仙湖与全家会合"
    ],
    play: ["大部队抵达", "落地休整", "检查租车"],
    hotelId: "kunming-dianchi" as BookedHotelId,
    tips: "两路航班相差约 2 小时，北京一行先取行李和车辆，再接姥姥；第一晚不安排项目。"
  },
  {
    id: 2, date: "第2天 09-20 周日", city: "昆明·滇池东南岸", alt: "约 1890m", drive: "酒店↔捞鱼河及海晏村约 20—30km",
    img: "dianchi",
    title: "捞鱼河湿地公园 · 滇池东南岸慢游",
    schedule: [
      "自然醒后去捞鱼河湿地公园，走林下栈道和滇池岸边，宝宝在草坪活动；9月下旬不把红嘴鸥作为游览预期",
      "在捞鱼河附近吃午餐后回民宿完整午睡，不再横跨滇池去海埂大坝",
      "傍晚按体力去附近海晏村看湖岸日落，或者直接留在民宿休息",
      "晚上整理行李，明天自然醒后去弥勒"
    ],
    play: ["捞鱼河湿地", "林下栈道", "草坪放风", "海晏村日落"],
    hotelId: "kunming-dianchi" as BookedHotelId,
    tips: "酒店本就在捞鱼河、海晏村方向，当天只走滇池东南岸，不再安排海埂大坝，避免约2—3小时无效往返。"
  },
  {
    id: 3, date: "第3天 09-21 周一", city: "弥勒", alt: "约 1500m", drive: "昆明→弥勒约 140km / 2—2.5h",
    img: "mileDongfeng",
    title: "自然醒去弥勒 · 东风韵红砖艺术小镇",
    schedule: [
      "睡到自然醒，午前退房，开约 2—2.5 小时到弥勒",
      "午后入住后休息，再去东风韵看红砖万花筒建筑和大片草坪",
      "傍晚在小镇散步拍照，避开正午暴晒"
    ],
    play: ["东风韵", "红砖建筑", "草坪放风"],
    hotelId: "mile-linglong" as BookedHotelId,
    tips: "当天只安排一个核心项目，给宝宝留午睡和自由跑动时间。"
  },
  {
    id: 4, date: "第4天 09-22 周二", city: "弥勒", alt: "约 1500m", drive: "近郊约 40km",
    img: "mileTaiping",
    title: "弥勒慢玩 · 太平湖季节花景 + 湖泉生态园",
    schedule: [
      "自然醒后去太平湖森林小镇，坐观光车看当季花景、草坪和湿地",
      "午餐后回酒店午睡，不连续赶景点",
      "傍晚湖泉生态园散步、喂鱼，吃弥勒卤鸡和葡萄"
    ],
    play: ["太平湖当季花景", "观光车", "湖泉生态园"],
    hotelId: "mile-linglong" as BookedHotelId,
    tips: "太平湖面积大，优先坐观光车；不追求把每个园区走遍。"
  },
  {
    id: 5, date: "第5天 09-23 周三", city: "抚仙湖", alt: "约 1720m", drive: "弥勒→抚仙湖约 150km / 2—2.5h",
    img: "fuxianSunset",
    title: "弥勒 → 抚仙湖 · 湖边连住三晚",
    schedule: [
      "自然醒后退房，开约 2—2.5 小时到抚仙湖",
      "入住半山·云境湖景美宿，先连住两晚；09-25 再换到太阳山的澜湖民宿",
      "傍晚小湾村或酒店湖岸看落日"
    ],
    play: ["小湾村", "湖岸落日", "亲子酒店"],
    hotelId: "fuxian-banshan" as BookedHotelId,
    tips: "抚仙湖三晚分两家民宿：半山·云境 2 晚 + 澜湖 1 晚；09-25 早上要收好行李。"
  },
  {
    id: 6, date: "第6天 09-24 周四", city: "抚仙湖·澄江", alt: "约 1720m", drive: "抚海湾、广龙与月亮湾约 30—50km",
    img: "fuxianSand",
    title: "抚仙湖第二天 · 抚海湾湿地 + 月亮湾湖岸",
    schedule: [
      "自然醒后去抚海湾湿地公园，走平缓湖滨步道，看开阔湖面和湿地植物，推车也方便",
      "中午到附近广龙旅游小镇吃饭、简单逛一圈，再回半山·云境完整午睡",
      "傍晚去月亮湾湿地公园短距离散步、玩沙看湖，只在岸边活动，不下湖游泳"
    ],
    play: ["抚海湾湿地", "广龙旅游小镇", "月亮湾湿地", "湖边玩沙"],
    hotelId: "fuxian-banshan" as BookedHotelId,
    tips: "这天全部安排湖边低强度项目，不去博物馆；抚海湾与月亮湾都只走平缓区域，给第二天禄充核心日留体力。"
  },
  {
    id: 7, date: "第7天 09-25 周五", city: "抚仙湖·禄充会合", alt: "约 1720m", drive: "半山·云境→禄充→澜湖约 70—100km；爷爷机场打车约1.5—2h",
    img: "fuxianReunion",
    title: "抚仙湖核心日 · 禄充风景区与爷爷会合",
    schedule: [
      "全家自然醒、早餐后从半山·云境退房，把行李全部放车上，约10:30—11:00出发去抚仙湖西岸禄充风景区",
      "到禄充后先吃午餐，沿波息湾、古榕树和湖岸慢走；老人宝宝不爬笔架山，只走平缓核心区域",
      "爷爷乘南航CZ5365于13:50抵达长水机场，取行李后直接打车到禄充，预计15:30—16:00与全家会合，也能玩约1.5—2小时",
      "约17:30一起离开禄充，开往太阳山的澜湖民宿办理入住，晚上在新民宿附近吃团圆饭"
    ],
    play: ["禄充风景区", "波息湾", "古榕树湖岸", "爷爷打车会合", "六口团圆饭"],
    hotelId: "fuxian-lanhu" as BookedHotelId,
    tips: "这样不需要爸爸往返机场，也避开两家民宿退房与入住之间的空档；提前替爷爷约正规平台车辆，并把禄充景区入口定位发给司机。"
  },
  {
    id: 8, date: "第8天 09-26 周六", city: "抚仙湖→大理", alt: "约 1970m", drive: "抚仙湖→大理约 360km；中秋假期按 6—7h 准备",
    img: "erhai",
    title: "抚仙湖 → 大理 · 六口一起转场洱海",
    schedule: [
      "当天处于中秋假期，早餐后尽早退房；出发前在酒店湖岸让爷爷看湖、拍一张六口合照",
      "经昆明南侧转杭瑞高速向西，途中至少进两次服务区，让宝宝下车活动并解决午餐",
      "下午抵达大理，入住来趣儿民宿（大理古城三月街店）连住四晚",
      "傍晚只在民宿天台看苍山洱海远景，或步行到苍山门、三月街和古城西门，不再开车去洱海岸边"
    ],
    play: ["抚仙湖晨景", "高速转场", "民宿天台", "古城西门"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "抚仙湖减少一天后，把转场提前到中秋假期第二天；不绕行禄充，按6—7小时留足堵车和服务区缓冲。"
  },
  {
    id: 9, date: "第9天 09-27 周日", city: "大理·洱海", alt: "约 1970m", drive: "古城近郊约 25km",
    img: "daliOldtown",
    title: "大理第一整天 · 崇圣寺三塔 + 大理古城",
    schedule: [
      "尽量早到崇圣寺三塔文化旅游区，先看三塔倒影与苍洱风光；老人和宝宝以观光车、低强度路线为主",
      "午餐后回酒店完整午睡，不把寺院纵深区域全部走完",
      "傍晚逛大理古城人民路、五华楼一带，边走边吃，累了随时结束"
    ],
    play: ["崇圣寺三塔", "三塔倒影", "大理古城", "人民路"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "三塔景区范围较大，不追求全程步行；当天是中秋假期最后一天，停车和入园都要比平日多留时间。"
  },
  {
    id: 10, date: "第10天 09-28 周一", city: "大理·洱海北线", alt: "约 1970m", drive: "周城 + 喜洲环线约 75—90km",
    img: "xizhou",
    title: "大理第二整天 · 周城扎染 + 喜洲田园",
    schedule: [
      "早餐后沿洱海西侧北上，先到周城体验白族扎染，给宝宝选简单小方巾由大人协助",
      "中午顺路去喜洲，看转角楼和田园、吃喜洲粑粑；不再继续绕去双廊",
      "下午回民宿午睡，晚上只在酒店附近吃饭，不再进入古城主街"
    ],
    play: ["周城扎染", "白族非遗", "喜洲田园", "转角楼"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "周城与喜洲在同一条北线上，合并一天可避免重复跑远路；上午扎染预约尽量早，下午按宝宝状态提前返回。"
  },
  {
    id: 11, date: "第11天 09-29 周二", city: "大理·洱海西岸", alt: "约 1970m", drive: "龙龛、才村往返约 25—35km",
    img: "erhai",
    title: "大理第三整天 · 留一整天真正看洱海",
    schedule: [
      "自然醒后去龙龛生态廊道，从入口沿洱海岸边慢走，看湿地、杉树和苍山倒影；只走适合推车的短线",
      "午餐后回民宿完整午睡，避开湖边正午暴晒",
      "傍晚再去距离酒店更近的才村码头或才村廊道看洱海日落，不进古城、不骑电动车，晚饭后整理次日长途行李"
    ],
    play: ["龙龛生态廊道", "洱海湿地", "才村码头", "洱海日落"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "这一天不安排任何古城项目，上午龙龛、傍晚才村都在酒店东侧近距离范围；2岁宝宝不坐共享电动车，优先步行或景区接驳车。"
  },
  {
    id: 12, date: "第12天 09-30 周三", city: "大理→普洱", alt: "约 1300m", drive: "约500—550km；国庆出行高峰按 9—11h 准备",
    img: "roadDaliPuer",
    title: "全程第一个超长日 · 大理直接开到普洱",
    schedule: [
      "这天不能等自然醒，建议06:30—07:00离开大理；前一晚把行李和宝宝用品装车",
      "优先按实时导航选择大临高速、南景高速方向或推荐的全高速方案，不临时走偏僻近路",
      "每1.5—2小时进入服务区，宝宝下车活动，成年人轮换驾驶",
      "傍晚或入夜抵达普洱，直接入住芍汐民宿、吃饭、休息，不再安排景点"
    ],
    play: ["纯转场", "服务区分段休息", "轮换驾驶"],
    hotelId: "puer-shaoxi" as BookedHotelId,
    tips: "9月30日下午通常进入国庆出行高峰，带2岁宝宝按9—11小时准备；若出发前导航明显拥堵，应增加中途住宿，不疲劳驾驶。"
  },
  {
    id: 13, date: "第13天 10-01 周四", city: "普洱·太阳河", alt: "约 1300m", drive: "太阳河往返约 70—90km / 纯驾驶约2h",
    img: "puerRedpanda",
    title: "普洱第一整天 · 太阳河森林公园看小熊猫",
    schedule: [
      "按你的优先级把小熊猫提前到D13；提前购票，建议07:30左右从芍汐民宿出发，尽量避开国庆首日中午客流",
      "进入太阳河森林公园后优先观光车和小熊猫、犀牛等核心区域，不追求走完整片森林",
      "午后尽早返回民宿，宝宝在车上补觉；晚上只在附近吃饭休息"
    ],
    play: ["太阳河森林公园", "小熊猫", "犀牛", "热带森林"],
    hotelId: "puer-shaoxi" as BookedHotelId,
    tips: "D13也是国庆假期，不能保证人少；唯一可控的是提前入园、只走核心区。若前一晚到店过晚，则宁可推迟出发，不疲劳驾驶。"
  },
  {
    id: 14, date: "第14天 10-02 周五", city: "普洱市区", alt: "约 1300m", drive: "市区及近郊约 20—35km",
    img: "puerCoffee",
    title: "普洱轻松日 · 市区咖啡体验 + 梅子湖",
    schedule: [
      "避开热门大景区，睡到自然醒后选择芍汐民宿周边、停车方便的市区咖啡体验空间，了解烘焙和品鉴",
      "午餐后回民宿完整午睡，不再跑远郊咖啡庄园",
      "傍晚按酒店实时位置在梅子湖与洗马河公园中选更近的一处，短距离散步后回去收拾版纳行李"
    ],
    play: ["市区咖啡体验", "梅子湖", "洗马河备选", "完整午睡"],
    hotelId: "puer-shaoxi" as BookedHotelId,
    tips: "D14主动避开人多的热门景区，酒店完整地址尚未提供，傍晚按高德选择梅子湖或洗马河中更近的一处。"
  },
  {
    id: 15, date: "第15天 10-03 周六", city: "普洱→西双版纳", alt: "约 550m", drive: "普洱→野象谷→景洪，纯驾驶约2—2.5h",
    img: "elephantValley",
    title: "普洱 → 野象谷 → 西双版纳",
    schedule: [
      "当天处于国庆客流高峰，建议07:00左右从普洱出发，沿昆磨高速南下",
      "提前购票后游览野象谷核心区域，优先大象科普园、自然行为展示和官方大象食堂投喂，再按体力选择索道",
      "午后继续开往景洪，入住【蘭栖·漫栖】曼城民宿连住四晚",
      "晚上只在酒店附近吃饭，不硬挤夜市"
    ],
    play: ["野象谷", "亚洲象自然行为", "大象食堂投喂", "雨林索道"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "D15是大象互动最顺路的一天。野象谷官网当前未列出骑象项目，2岁宝宝不安排来源不明的骑乘；可在出发前致电景区0691-2431040确认当日官方项目、年龄限制和保险，以投喂与观察作为确定方案。"
  },
  {
    id: 16, date: "第16天 10-04 周日", city: "西双版纳·勐仑", alt: "约 550m", drive: "植物园往返约 120—140km / 2.5—3h",
    img: "daiGarden",
    title: "西双版纳第一整天 · 中科院热带植物园西区",
    schedule: [
      "建议07:30左右从曼城民宿出发，前往中科院西双版纳热带植物园西门，尽量赶在08:00开放后较早入园",
      "只游西区并以游览车为主，看棕榈、奇花异木和热带园林；不把已过最佳期的王莲作为核心期待",
      "下午适时返回景洪，宝宝可在返程车上补觉；晚上只在民宿附近吃饭休息"
    ],
    play: ["热带植物园西区", "游览车", "棕榈园", "奇花异木"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "植物园西门常规08:00开放；西区面积仍很大，老人宝宝全程以游览车为主，不临时增加东区。"
  },
  {
    id: 17, date: "第17天 10-05 周一", city: "西双版纳", alt: "约 550m", drive: "傣族园往返约 60—70km；果园视选择约 20—50km",
    img: "botanicalGarden",
    title: "西双版纳第二整天 · 傣族园或近郊果园",
    schedule: [
      "经历植物园长距离往返后自然醒，在傣族园和交通方便的近郊热带果园中二选一；宝宝和老人状态一般时优先果园",
      "选择傣族园则看傣家竹楼、村寨与有限场次表演，不追赶所有节目；选择果园则控制半天",
      "午后回曼城民宿完整午睡，傍晚只在江边或告庄外围短距离散步"
    ],
    play: ["傣族园", "傣家竹楼", "热带果园备选", "完整午睡"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "当天作为植物园后的缓冲日；傣族园单程约45—60分钟，如上午状态一般直接改近郊果园。"
  },
  {
    id: 18, date: "第18天 10-06 周二", city: "西双版纳", alt: "约 550m", drive: "市内及近郊约 30km",
    img: "mantingPark",
    title: "西双版纳第三整天 · 曼听公园 + 总佛寺",
    schedule: [
      "自然醒后去曼听公园，看热带花木、湖景和傣式建筑",
      "与总佛寺连游，控制在半天，不追赶大型演出",
      "午后回酒店午睡，傍晚告庄外围或江边散步，避开最拥挤时段"
    ],
    play: ["曼听公园", "总佛寺", "热带花木", "傣式建筑"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "爷爷在版纳拥有三个完整游玩日；最后一天只走景洪市内，给次日分头长途转场留体力。"
  },
  {
    id: 19, date: "第19天 10-07 周三", city: "西双版纳→建水", alt: "约 1300m", drive: "约450—480km；国庆返程日带宝宝按 7—8h 准备",
    img: "bannaStation",
    title: "分头返程 · 爷爷奶奶动车回昆明，其余四人开车去建水",
    schedule: [
      "提前抢爷爷奶奶从西双版纳站去昆明的上午动车，六口早餐后一起前往车站分开",
      "爷爷奶奶抵达昆明后入住长水机场附近酒店，为次日15:00航班留足余量",
      "爸爸妈妈、暄暄和姥姥送站后立即沿昆磨高速北上，再转向建水；每1.5—2小时进服务区让宝宝活动",
      "傍晚抵达近紫陶街·中古风两居民宿，只在家门口的紫陶街吃晚饭、短距离散步，不再安排收费景点"
    ],
    play: ["六口早餐", "爷爷奶奶动车返昆", "自驾建水", "紫陶街晚餐"],
    hotelId: "jianshui-zitao" as BookedHotelId,
    tips: "10月7日是国庆最后一天，北上车流量大；爷爷奶奶优先上午动车。若只买到下午车，由酒店提前预约车辆送站，其余四人仍需上午出发，不能等发车后再开往建水。"
  },
  {
    id: 20, date: "第20天 10-08 周四", city: "建水", alt: "约 1300m", drive: "古城近郊约 30km",
    img: "jianshuiOldtown",
    title: "建水完整日 · 米轨小火车 + 临安古城",
    schedule: [
      "首选提前预约上午的建水古城米轨小火车，用半天串联临安站、双龙桥、乡会桥和团山；若无票，改走朝阳楼、朱家花园和古城街巷，不在现场长时间排队",
      "午餐吃建水烧豆腐、草芽米线或汽锅鸡，随后回酒店完整午睡",
      "傍晚在临安古城慢逛，按体力选择紫陶街；不再叠加燕子洞等远郊景点。爷爷奶奶当天15:00乘CZ5366返沈阳；其余四人晚上早点休息，为明天返昆做准备"
    ],
    play: ["米轨小火车", "双龙桥", "临安古城", "朱家花园", "建水烧豆腐"],
    hotelId: "jianshui-zitao" as BookedHotelId,
    tips: "小火车运力有限，开售后尽快预约；有票走米轨线，无票走古城线，两套方案只选一套，下午固定保留午睡。"
  },
  {
    id: 21, date: "第21天 10-09 周五", city: "建水→昆明·呈贡", alt: "约 1890m", drive: "建水→妈咪多肉花园→机场民宿约230—250km / 3.5—4.5h",
    img: "returnKunming",
    title: "建水开回昆明 · 妈咪多肉花园收尾",
    schedule: [
      "早餐后退房，建议09:00—09:30离开建水，途中安排一次服务区休息",
      "中午前后到呈贡梁王路附近的妈咪多肉花园，让宝宝看多肉、在户外活动并吃午餐；导航定位已加入距离卡片",
      "控制游玩约1.5—2小时，下午避开太晚出发，继续前往长水附近的秋秋民宿 2-708；视时间决定当晚还车或次日还车"
    ],
    play: ["建水返昆", "妈咪多肉花园", "亲子花园", "机场酒店"],
    hotelId: "kunming-qiuqiu" as BookedHotelId,
    tips: "妈咪多肉花园位于梁王路辅路与郎溪街交叉口东侧，处在建水返昆进入呈贡后的顺路方向；仍需在出发前确认营业时间，最晚16:00左右离开去机场民宿。"
  },
  {
    id: 22, date: "第22天 10-10 周六", city: "返程·昆明→北京", alt: "约 1890m", drive: "酒店→长水机场约 30km",
    img: "kunmingDeparture",
    title: "全家从昆明返京（昆明→北京）",
    schedule: [
      "自然醒，从容退房；若昨晚未还车，上午加满油/补足电后还车，建议12:30前完成还车并进入机场",
      "昆明长水机场 15:05→北京 18:15（首都航空JD5630）",
      "结束云南全家总动员 22 天三代同游之旅"
    ],
    play: ["昆明返程", "亲子候机"],
    hotelId: null,
    tips: "云南境内旅游段全部开车完成；爷爷奶奶仅因已定10月8日昆明返程航班，于10月7日单独动车回昆明。"
  }
];

export const globalTips = [
  { icon: "👨‍👩‍👧‍👦", title: "禄充与爷爷会合", text: "09-25全家自然醒后退房去禄充，爷爷落地后直接打车到禄充会合；傍晚六口一起入住太阳山澜湖民宿，09-26早餐后前往大理。" },
  { icon: "🚗", title: "云南境内全程开车", text: "取消内部航班，租车依次走昆明→弥勒→抚仙湖→大理→普洱→西双版纳→建水→昆明。爷爷奶奶因10-08已定昆明航班，10-07单独动车返昆。" },
  { icon: "🐘", title: "版纳大象互动", text: "10-03顺路游野象谷，以官方大象食堂投喂和自然行为观察为确定项目；2岁宝宝不参加来源不明的骑象项目，出发前电话确认景区当日官方项目。" },
  { icon: "🛣️", title: "长途驾驶要分段", text: "09-30大理直达普洱按9—11小时准备，10-07版纳直达建水按7—8小时准备；两天都不能等自然醒，并需成年人轮换驾驶。" },
  { icon: "🚂", title: "返程改走建水", text: "10-07其余四人从版纳长途开到建水，连住两晚；10-08玩米轨与古城，10-09经呈贡妈咪多肉花园回到昆明机场民宿。" },
  { icon: "🗺️", title: "大理只逛一天古城", text: "三个整天分别安排三塔与古城、周城扎染与喜洲、龙龛与才村洱海专日；后两天不再重复逛古城。" },
  { icon: "😴", title: "两个长驾驶日", text: "09-30大理去普洱与10-07版纳去建水都需早出发并按1.5—2小时进服务区；其余大多数日子保留宝宝午睡。" },
  { icon: "🏔️", title: "海拔全程友好", text: "全程 2000m 以内，最低版纳约 550m，已去掉泸沽湖等高海拔点——带 2 岁宝宝和老人更安心。" }
];
