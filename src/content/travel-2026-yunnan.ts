// 云南全家总动员 · 2026 国庆亲子三代行程（22 天·全程自驾）
// 机票已定：09-19 北京、延吉两路抵昆；09-25 爷爷从沈阳抵昆；10-08 爷爷奶奶飞沈阳回盘锦；10-10 其余家人返京
// 人员分批：09-19 父母+2岁宝宝+奶奶从北京出发、姥姥从延吉出发 → 09-25爷爷到昆明全家六口集合 → 10-08 爷爷奶奶返程 → 10-10 其余家人返京
// 结构：① 昆明/弥勒/抚仙湖慢游，爸爸从抚仙湖接爷爷 ② 09-26六口转场大理，连住四晚后直接去普洱，再到西双版纳 ③ 爷爷奶奶动车返昆，其余四人经建水开车返昆
// 精简城市：取消腾冲、芒市、楚雄、墨江住宿；大理→普洱、版纳→建水是两个长驾驶日。
// 已去掉泸沽湖等高海拔点，全程 2000m 以内，最低版纳约 550m。

import type { Place } from '../utils/mapNav'

export const tripMeta = {
  title: "云南全家总动员 · 2026 国庆亲子三代 22 天行程",
  subtitle: "弥勒与抚仙湖慢游 → 抚仙湖接爷爷 → 大理直达普洱 → 西双版纳 → 建水 → 昆明",
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
 * 已预订住宿。订单截图未展示完整门牌号，导航先用“城市 + 订单名称”在高德搜索。
 * 后续补全经纬度后，amapNavigateUrl 会自动切换为从当前位置直接规划驾车路线。
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
    nav: { name: '半山云境湖景美宿', address: '澄江 抚仙湖 半山云境湖景美宿', city: '澄江' } satisfies Place,
  },
  {
    id: 'fuxian-lanhu', city: '澄江·抚仙湖', checkIn: '09.25', checkOut: '09.26', nights: 1,
    name: '【澜湖】抚仙湖太阳山湖景民宿', room: '湖景房', status: '待入住', source: '途家民宿',
    nav: { name: '澜湖抚仙湖太阳山湖景民宿', address: '澄江 抚仙湖 太阳山 澜湖民宿', city: '澄江' } satisfies Place,
  },
  {
    id: 'dali-laiquer', city: '大理', checkIn: '09.26', checkOut: '09.30', nights: 4,
    name: '来趣儿民宿（大理古城三月街店）', room: '观云房', status: '待入住', source: '途家民宿',
    nav: { name: '来趣儿民宿（大理古城三月街店）', city: '大理' } satisfies Place,
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

// 路线阶段：① 昆明、弥勒、抚仙湖接爷爷 ② 六口滇西南自驾 ③ 分头返昆；drive=从上一站到本站
// phase: near=昆明附近先玩 / far=全家六口远游 / back=昆明收尾；mark: gather=六口集合 / split=爷爷奶奶返程
export const routeStages = [
  { city: "昆明·滇池", alt: "约 1890m", days: "D1-D2", date: "09.19-09.20", drive: "", phase: "near" },
  { city: "弥勒", alt: "约 1500m", days: "D3-D4", date: "09.21-09.22", drive: "约2.5h", phase: "near" },
  { city: "抚仙湖", alt: "约 1720m", days: "D5-D7", date: "09.23-09.25", drive: "约2h", phase: "near" },
  { city: "爸爸接爷爷回抚仙湖", alt: "约 1720m", days: "D7", date: "09.25 13:50抵昆", drive: "往返约3—4h", phase: "near", mark: "gather" },
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
  ["昆明长水·接爷爷", 102.929, 25.101, "D7 爸爸往返", "special", "单程约1.5h", "t"],
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
    id: 2, date: "第2天 09-20 周日", city: "昆明·滇池", alt: "约 1890m", drive: "环滇池近郊约 40km",
    img: "dianchi",
    title: "滇池 · 海埂大坝 + 湿地公园（秋日湖景适应日）",
    schedule: [
      "自然醒，去海埂大坝散步吹湖风、看西山睡美人倒影；9月下旬不把红嘴鸥作为游览预期",
      "在捞鱼河或斗南湿地公园二选一：草坪、鲜花、湖景，宝宝跑跳老人散步",
      "午餐云南菜（汽锅鸡、野生菌），下午湖边慢逛",
      "傍晚回酒店，明天自然醒后去弥勒"
    ],
    play: ["滇池海埂", "湿地公园", "草坪放风", "西山睡美人"],
    hotelId: "kunming-dianchi" as BookedHotelId,
    tips: "9月20日通常早于红嘴鸥抵昆时间，当天只看湖景和湿地；两处湿地不连赶，选一处即可。"
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
    id: 6, date: "第6天 09-24 周四", city: "抚仙湖", alt: "约 1720m", drive: "环湖近郊约 30km",
    img: "fuxianSand",
    title: "抚仙湖轻松日 · 玩沙浅水亲水 + 午睡",
    schedule: [
      "自然醒，在酒店附近合规开放的沙滩或草坪玩沙，只在岸边浅水亲水，不下湖游泳",
      "午餐后完整午睡，下午不跨湖赶路",
      "傍晚沿湖散步，早点休息"
    ],
    play: ["湖边沙滩", "浅水亲水", "环湖落日"],
    hotelId: "fuxian-banshan" as BookedHotelId,
    tips: "这天有意留白，为第二天爸爸单独接机做缓冲。"
  },
  {
    id: 7, date: "第7天 09-25 周五", city: "抚仙湖·接爷爷", alt: "约 1720m", drive: "爸爸抚仙湖↔长水机场，往返约160km / 3—4h",
    img: "fuxianReunion",
    title: "爸爸单独开车接爷爷 · 全家在抚仙湖会合",
    schedule: [
      "早餐后从半山·云境退房，先把全家行李转到澜湖民宿；爸爸约 10:30 单独开车去长水机场",
      "爷爷乘南航CZ5365从沈阳09:10起飞，13:50抵达昆明；取行李后在到达层会合",
      "妈妈、宝宝、奶奶和姥姥留在澜湖民宿午睡、玩沙，不安排需要用车的项目",
      "爸爸接到爷爷后返回抚仙湖，预计16:30—17:30到澜湖民宿，晚上湖边团圆饭"
    ],
    play: ["爸爸机场接爷爷", "酒店玩沙", "六口团圆饭"],
    hotelId: "fuxian-lanhu" as BookedHotelId,
    tips: "当天先换到澜湖民宿再分头行动；机场停车、接客和返程都要留缓冲。"
  },
  {
    id: 8, date: "第8天 09-26 周六", city: "抚仙湖→大理", alt: "约 1970m", drive: "抚仙湖→大理约 360km；中秋假期按 6—7h 准备",
    img: "erhai",
    title: "抚仙湖 → 大理 · 六口一起转场洱海",
    schedule: [
      "当天处于中秋假期，早餐后尽早退房；出发前在酒店湖岸让爷爷看湖、拍一张六口合照",
      "经昆明南侧转杭瑞高速向西，途中至少进两次服务区，让宝宝下车活动并解决午餐",
      "下午抵达大理，入住来趣儿民宿（大理古城三月街店）连住四晚",
      "傍晚只在酒店附近看洱海日落，全家早休息"
    ],
    play: ["抚仙湖晨景", "高速转场", "洱海日落"],
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
    id: 10, date: "第10天 09-28 周一", city: "大理·洱海", alt: "约 1970m", drive: "近郊约 40km",
    img: "xizhou",
    title: "大理第二整天 · 喜洲田园 + 洱海生态廊道",
    schedule: [
      "自然醒后去喜洲古镇外围和稻田，吃喜洲粑粑",
      "午餐后回酒店完整午睡，不做整圈环洱海",
      "傍晚去生态廊道短距离散步，宝宝在草坪活动"
    ],
    play: ["喜洲田园", "白族院落", "洱海生态廊道"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "海拔接近2000米但不安排苍山索道和高处项目。"
  },
  {
    id: 11, date: "第11天 09-29 周二", city: "大理·洱海", alt: "约 1970m", drive: "近郊约 70km",
    img: "zhoucheng",
    title: "大理第三整天 · 周城白族扎染 + 龙龛码头",
    schedule: [
      "提前预约周城正规的白族扎染体验，上午看扎花、浸染和拆线，给宝宝选一件简单小方巾由大人协助完成",
      "午餐后回酒店完整午睡，避开最晒时段；不额外叠加蝴蝶泉或双廊",
      "傍晚到龙龛码头或才村短距离散步，看湖岸和洱海晚霞；9月底不期待冬季红水杉景观"
    ],
    play: ["周城扎染", "白族非遗", "龙龛码头", "洱海晚霞"],
    hotelId: "dali-laiquer" as BookedHotelId,
    tips: "大理现在有三个完整日：历史古城、田园湖岸、白族非遗各一天；最后一天仍保留午睡，并提前整理次日长途行李。"
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
    id: 13, date: "第13天 10-01 周四", city: "普洱", alt: "约 1300m", drive: "近郊往返约 70km",
    img: "puerCoffee",
    title: "普洱长途恢复日 · 咖啡体验 + 城市公园",
    schedule: [
      "经历前一天超长驾驶后睡到自然醒，不在国庆首日赶热门大景区",
      "选择一处已预约、停车方便的咖啡庄园或市区咖啡体验空间，看咖啡树并了解加工、烘焙和品鉴",
      "午餐后回酒店完整午睡，傍晚去梅子湖或洗马河公园短距离散步"
    ],
    play: ["咖啡体验", "咖啡树", "城市公园", "长途恢复"],
    hotelId: "puer-shaoxi" as BookedHotelId,
    tips: "10月初早于普洱咖啡常规采摘季，不承诺看到成熟红果；当天核心是让宝宝和驾驶员恢复体力。"
  },
  {
    id: 14, date: "第14天 10-02 周五", city: "普洱", alt: "约 1300m", drive: "近郊约 50km",
    img: "puerRedpanda",
    title: "普洱完整游玩日 · 太阳河森林公园看小熊猫",
    schedule: [
      "提前确认开放区域并购票，尽量在上午较早时段前往太阳河森林公园",
      "看小熊猫、犀牛、熊狸和热带森林，优先观光车及低强度路线",
      "下午适时返回酒店午睡，晚上只在附近吃饭"
    ],
    play: ["太阳河森林公园", "小熊猫", "犀牛", "热带森林"],
    hotelId: "puer-shaoxi" as BookedHotelId,
    tips: "从国庆首日调整到10月2日，仍需接受假期客流；出发前查看景区公告，若部分动物展示区施工则按开放区域游览。"
  },
  {
    id: 15, date: "第15天 10-03 周六", city: "普洱→西双版纳", alt: "约 550m", drive: "普洱→野象谷→景洪，纯驾驶约2—2.5h",
    img: "elephantValley",
    title: "普洱 → 野象谷 → 西双版纳",
    schedule: [
      "当天处于国庆客流高峰，建议07:00左右从普洱出发，沿昆磨高速南下",
      "提前购票后游览野象谷核心区域，优先索道或低强度路线，减少宝宝和老人步行",
      "午后继续开往景洪，入住【蘭栖·漫栖】曼城民宿连住四晚",
      "晚上只在酒店附近吃饭，不硬挤夜市"
    ],
    play: ["野象谷", "亚洲象", "雨林索道"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "野象谷顺路但国庆期间车流和排队压力大，不承诺看到野生象；若实时路况或停车排队过长，直接去景洪，不硬挤景区。"
  },
  {
    id: 16, date: "第16天 10-04 周日", city: "西双版纳", alt: "约 550m", drive: "近郊约 50km",
    img: "daiGarden",
    title: "西双版纳第一整天 · 傣族园或热带果园",
    schedule: [
      "自然醒后在傣族园和交通方便的热带果园中二选一；宝宝和老人状态一般时优先果园",
      "看傣家竹楼、孔雀和热带水果，避开持续暴晒与过长表演",
      "午后回酒店完整午睡，傍晚江边或告庄外围散步"
    ],
    play: ["傣族园", "傣家竹楼", "热带果园", "孔雀"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "这是取消楚雄、墨江后增加的版纳慢游日，可根据天气和宝宝状态临时二选一。"
  },
  {
    id: 17, date: "第17天 10-05 周一", city: "西双版纳", alt: "约 550m", drive: "景洪↔勐仑往返约 130km",
    img: "botanicalGarden",
    title: "西双版纳第一整天 · 热带植物园西区",
    schedule: [
      "自然醒后前往中科院西双版纳热带植物园，重点游西区",
      "只游西区并以游览车为主，看棕榈、奇花异木和热带园林，不把已过最佳期的王莲作为核心期待",
      "下午适时返回酒店休息，晚上根据体力决定是否去告庄外围"
    ],
    play: ["热带植物园西区", "游览车", "棕榈园", "奇花异木"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "提前实名购买门票和游览车票；节假日交通车可能排队，老人宝宝只走西区，不临时加东区。"
  },
  {
    id: 18, date: "第18天 10-06 周二", city: "西双版纳", alt: "约 550m", drive: "市内及近郊约 30km",
    img: "mantingPark",
    title: "西双版纳第二整天 · 曼听公园 + 总佛寺",
    schedule: [
      "自然醒后去曼听公园，看热带花木、湖景和傣式建筑",
      "与总佛寺连游，控制在半天，不追赶大型演出",
      "午后回酒店午睡，傍晚告庄外围或江边散步，避开最拥挤时段"
    ],
    play: ["曼听公园", "总佛寺", "热带花木", "傣式建筑"],
    hotelId: "banna-lanqi" as BookedHotelId,
    tips: "爷爷在版纳拥有两个完整游玩日，满足必须一起玩的要求。"
  },
  {
    id: 19, date: "第19天 10-07 周三", city: "西双版纳→建水", alt: "约 1300m", drive: "约450—480km；国庆返程日带宝宝按 7—8h 准备",
    img: "bannaStation",
    title: "分头返程 · 爷爷奶奶动车回昆明，其余四人开车去建水",
    schedule: [
      "提前抢爷爷奶奶从西双版纳站去昆明的上午动车，六口早餐后一起前往车站分开",
      "爷爷奶奶抵达昆明后入住长水机场附近酒店，为次日15:00航班留足余量",
      "爸爸妈妈、暄暄和姥姥送站后立即沿昆磨高速北上，再转向建水；每1.5—2小时进服务区让宝宝活动",
      "傍晚抵达近紫陶街·中古风两居民宿，只吃晚饭和散步，不再安排收费景点"
    ],
    play: ["六口早餐", "爷爷奶奶动车返昆", "自驾建水", "古城晚餐"],
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
    id: 21, date: "第21天 10-09 周五", city: "建水→昆明", alt: "约 1890m", drive: "约220km；带宝宝按 3—3.5h 准备",
    img: "returnKunming",
    title: "建水开回昆明 · 提前一天回到还车城市",
    schedule: [
      "早餐后从容退房，建议09:30前离开建水，不增加通海、玉溪等临时停靠",
      "途中安排一次服务区休息，让宝宝下车活动",
      "下午抵达昆明，入住长水附近的秋秋民宿 2-708；视时间决定当晚还车或次日还车"
    ],
    play: ["建水返昆", "服务区休息", "机场酒店"],
    hotelId: "kunming-qiuqiu" as BookedHotelId,
    tips: "这段比普洱返昆明显轻松，但仍要按实时天气和路况行驶；必须10月9日回到昆明，不能把返程压到航班当天。"
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
  { icon: "👨‍👩‍👧‍👦", title: "抚仙湖接爷爷", text: "09-23至09-25住半山·云境，09-25换到澜湖民宿；爸爸再单独往返长水机场接爷爷，09-26早餐后六口一起前往大理。" },
  { icon: "🚗", title: "云南境内全程开车", text: "取消内部航班，租车依次走昆明→弥勒→抚仙湖→大理→普洱→西双版纳→建水→昆明。爷爷奶奶因10-08已定昆明航班，10-07单独动车返昆。" },
  { icon: "🐘", title: "爷爷与版纳同游", text: "10-03顺游野象谷，10-04傣族园或果园，10-05热带植物园，10-06曼听公园与总佛寺均为六口同游。" },
  { icon: "🛣️", title: "长途驾驶要分段", text: "09-30大理直达普洱按9—11小时准备，10-07版纳直达建水按7—8小时准备；两天都不能等自然醒，并需成年人轮换驾驶。" },
  { icon: "🚂", title: "返程改走建水", text: "10-07其余四人从版纳长途开到建水，连住两晚；10-08米轨小火车和古城二选一主线，10-09再用约3—3.5小时回昆明。" },
  { icon: "🗺️", title: "大理增加一个完整日", text: "09-26提前抵达大理并连住四晚；三个整天分别安排三塔与古城、喜洲与生态廊道、周城扎染与龙龛码头。" },
  { icon: "😴", title: "两个长驾驶日", text: "09-30大理去普洱与10-07版纳去建水都需早出发并按1.5—2小时进服务区；其余大多数日子保留宝宝午睡。" },
  { icon: "🏔️", title: "海拔全程友好", text: "全程 2000m 以内，最低版纳约 550m，已去掉泸沽湖等高海拔点——带 2 岁宝宝和老人更安心。" }
];
