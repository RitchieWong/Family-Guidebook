/** 2026 五一 · 北戴河 → 盘锦 路书的"打印版"装备清单 */
export interface ChecklistGroup {
  id: string
  title: string
  icon: string
  items: string[]
}

export const CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    id: 'list-baby',
    title: '暄暄专属',
    icon: 'ri-baby-line',
    items: [
      '儿童安全座椅（必备）',
      '尿不湿×30片',
      '湿巾×5包',
      '奶粉/辅食/零食',
      '保温水壶',
      '安抚玩偶/小毯子',
      '绘本2-3本',
      '婴儿浴巾/小脸盆'
    ]
  },
  {
    id: 'list-cloth',
    title: '衣物',
    icon: 'ri-t-shirt-2-line',
    items: [
      '暄暄长袖T恤×5',
      '厚薄外套各1件',
      '连体防风衣',
      '沙滩短裤×3',
      '防晒帽+泳帽',
      '防滑沙滩鞋/运动鞋',
      '大人换洗衣物（4天量）',
      '奶奶保暖外套'
    ]
  },
  {
    id: 'list-camp',
    title: '露营装备',
    icon: 'ri-tent-line',
    items: [
      '帐篷×2（3-4人）',
      '天幕1个+支杆',
      '防潮垫/地席',
      '露营椅×8',
      '折叠桌1张',
      '卡式炉+气罐×2',
      '烧烤架+炭+点火器',
      '保温箱+冰袋',
      '头灯/营地灯×3',
      '垃圾袋×10'
    ]
  },
  {
    id: 'list-doc',
    title: '证件 & 电子',
    icon: 'ri-suitcase-2-line',
    items: [
      '身份证（大人）',
      '暄暄户口本/出生证',
      '驾驶证+行驶证',
      '租车合同+押金凭证',
      '现金备用¥500',
      '车钥匙备用',
      '手机充电宝×2',
      '车载充电器',
      '行车记录仪SD卡'
    ]
  }
]

/** 出发目标时间，用于倒计时 */
export const DEPARTURE_AT = '2026-04-29T14:00:00'

/* ============================================================
 * 路书涉及的地点（导航用）
 *
 * 高德 URI navigation 接口要求经纬度（GCJ-02 高德坐标系），
 * 不能只传地址字符串。坐标拾取方式：
 *   1) 打开 https://lbs.amap.com/tools/picker
 *   2) 搜索目的地名称，地图上点中确认
 *   3) 把右侧的"经度,纬度"复制过来
 *
 * 没填坐标也不会报错——会自动退回到"高德搜索页 + 完整地址"。
 * ============================================================ */
import type { Place } from '../utils/mapNav'

export const PLACES = {
  /** 全程唯一住宿 · 仙随民宿海滨公园店 */
  hotelXianSui: {
    name: '秦皇岛仙随民宿（海滨公园店）',
    address: '河北省秦皇岛市北戴河区河东寨西街47号',
    city: '秦皇岛',
    // TODO: 用 https://lbs.amap.com/tools/picker 拾取后填入
    // lng: 119.xxxxxx,
    // lat: 39.xxxxxx,
  } satisfies Place,
} as const

