/**
 * 暄暄生活点滴 · 日常时间线
 * -----------------------------------------------------------
 * 没被正式拍的"里程碑照片"，但足够温柔的日常：
 *   散步、吃饭、睡前、洗澡、在家玩、和爸妈打闹……
 *
 * 新增：往 DAILY_MOMENTS 数组 push 一条即可。
 *   - photos 建议 3 张（可多可少，2-4 张都 OK）
 *   - 照片先放到 public/photos/daily-moments/ 下自己建子目录
 *   - 图片不存在时自动降级为 emoji 占位（看 DailyMomentsPage）
 */

export interface DailyMoment {
  /** 唯一 id，用作锚点 */
  id: string
  /** 发生日期 YYYY-MM-DD */
  date: string
  /** 主题（一句话） */
  title: string
  /** 当时多大 */
  age: string
  emoji: string
  /** 小故事 / 心情 */
  desc: string
  /** 3 张照片路径（相对 /photos/daily-moments/*），暂无可空数组 */
  photos: string[]
  /** 可选：标签 */
  tag?: string
}

export const DAILY_MOMENTS: DailyMoment[] = [
  {
    id: 'first-bath',
    date: '2024-05-10',
    age: '21 天',
    title: '第一次洗澡 · 哇哇大哭',
    emoji: '🛁',
    desc: '小小一只躺在洗澡盆里，水温 37 度，抗议声响彻整个卫生间。爸爸负责托脖子，妈妈负责拍安抚。',
    photos: [],
    tag: '生活',
  },
  {
    id: 'first-walk',
    date: '2024-06-15',
    age: '2 个月',
    title: '第一次出门散步',
    emoji: '🚼',
    desc: '小区楼下绿地转了一圈。你睁大眼睛看树叶，爸爸抱着你比划说话：「这是风，这是阳光哦。」',
    photos: [],
    tag: '出行',
  },
  {
    id: 'baby-food',
    date: '2024-10-24',
    age: '6 个月',
    title: '第一口辅食 · 米糊',
    emoji: '🥣',
    desc: '小嘴抿了抿，眉头一皱，又伸手去抓勺子。全家围着你鼓掌，像完成了什么大事。',
    photos: [],
    tag: '吃饭',
  },
  {
    id: 'playing-feet',
    date: '2024-11-02',
    age: '6 个月半',
    title: '发现了自己的脚 · 开始啃',
    emoji: '🦶',
    desc: '躺在床上仰着腿 —— 咦，这是啥？—— 放嘴里尝尝。从此一发不可收拾。',
    photos: [],
    tag: '趣事',
  },
  {
    id: 'winter-hat',
    date: '2024-12-20',
    age: '8 个月',
    title: '第一个冬天 · 小熊连体服',
    emoji: '🧸',
    desc: '裹成小熊出门，走到哪都被阿姨们夸。你不知道，只顾咬手套上的绒球。',
    photos: [],
    tag: '穿搭',
  },
  {
    id: 'first-steps',
    date: '2025-05-06',
    age: '1 岁 17 天',
    title: '爸妈对面 · 蹒跚 4 步',
    emoji: '🚶‍♀️',
    desc: '爸爸伸出手，你松开沙发边，摇摇晃晃走了 4 步。那天全家的手机都没电了——录了太多视频。',
    photos: [],
    tag: '成长',
  },
  {
    id: 'park-summer',
    date: '2025-07-12',
    age: '1 岁 3 个月',
    title: '夏天公园 · 追鸽子',
    emoji: '🕊️',
    desc: '你第一次看到鸽子，咯咯咯笑着扑过去。鸽子吓跑了，你又愣愣地看着它们飞走。',
    photos: [],
    tag: '出行',
  },
  {
    id: 'counting',
    date: '2025-08-24',
    age: '1 岁 4 个月',
    title: '会数 1—10 了',
    emoji: '🔢',
    desc: '每次上楼梯都要数一遍。有时数到 5 就卡壳，然后看着爸爸傻笑，等我们提示。',
    photos: [],
    tag: '认知',
  },
  {
    id: 'first-snow',
    date: '2025-12-12',
    age: '1 岁 7 个月',
    title: '第一次看雪',
    emoji: '❄️',
    desc: '北京下了一场小雪。你伸手去接，雪花化了，你愣了一下，又伸手——以为刚才是变魔术。',
    photos: [],
    tag: '人生第一次',
  },
  {
    id: 'bedtime-book',
    date: '2026-01-20',
    age: '1 岁 9 个月',
    title: '睡前绘本 · 《猜猜我有多爱你》',
    emoji: '📖',
    desc: '每晚必读的固定曲目。你会指着大兔子说「爸爸」、指着小兔子说「暄暄」。',
    photos: [],
    tag: '睡前',
  },
  {
    id: 'potty',
    date: '2026-03-12',
    age: '1 岁 10 个月',
    title: '第一次用小马桶',
    emoji: '🚽',
    desc: '自己坐上去，咧嘴一笑，然后指着自己说「棒」。成就感满分。',
    photos: [],
    tag: '生活',
  },
  {
    id: 'camping',
    date: '2026-04-12',
    age: '1 岁 11 个月',
    title: '第一次露营 · 小帐篷',
    emoji: '⛺',
    desc: '爸爸搭帐篷，你在旁边跟着学，递个小木棍、拿个营钉。晚上盯着星星说「月月」。',
    photos: [],
    tag: '出行',
  },
  {
    id: 'preschool',
    date: '2026-04-13',
    age: '1 岁 11 个月',
    title: '第一天上托班',
    emoji: '🎒',
    desc: '小书包背得比自己还大。进门时你回头看了一眼，又自信地跟老师走了。妈妈在门口偷偷抹了眼泪。',
    photos: [],
    tag: '人生第一次',
  },
]
