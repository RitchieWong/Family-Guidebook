/**
 * 地图导航工具：默认使用高德地图 (https://uri.amap.com/)
 *
 * 选用高德 URI API 的原因：
 *  - 跨平台稳定：移动端会尝试唤起高德 App，未安装则落地高德 H5；PC 端打开高德网页地图
 *  - 中国大陆覆盖最完整、地点搜索最准
 *  - 不需要 API Key，URL 直接使用
 *
 * 文档参考：https://lbs.amap.com/api/uri-api
 *
 * ⚠️ 重要约束：
 * 高德 navigation / marker 接口都**必须**用经纬度（GCJ-02 坐标系），
 * 不支持只传地址字符串。如果只有地址，请退回 amapSearchUrl（搜索页）。
 *
 * 推荐用法：
 *   1) 数据里同时维护 name + address + (lng, lat)（坐标可去 https://lbs.amap.com/tools/picker 拾取）
 *   2) 调用 amapNavigateUrl({ to: { lng, lat, name } })
 *      → 移动端唤起高德 App 直接进驾车导航；PC 端打开高德网页路线规划
 *   3) 没有坐标时，调用 amapSearchUrl(完整地址, 城市) 退化为搜索页
 */

const AMAP_BASE = 'https://uri.amap.com'
const SRC = 'family-guidebook' // 高德要求的来源标识

/** 站内统一的地点结构 */
export interface Place {
  name: string
  address?: string
  /** 经度（GCJ-02 高德坐标系） */
  lng?: number
  /** 纬度（GCJ-02 高德坐标系） */
  lat?: number
  /** 所在城市，用于搜索退化 */
  city?: string
}

/**
 * 一键"开始导航"
 *
 * - 有坐标 → uri.amap.com/navigation：直接进驾车路线规划
 *   * 起点（from）留空，移动端高德会自动用"我的位置"
 *   * PC 端需要起点，省略时高德会引导用户填入起点
 * - 无坐标 → 退化为 search（带完整地址）
 */
export function amapNavigateUrl(opts: {
  to: Place
  from?: Place
  /** 0 推荐 / 1 避堵 / 2 避收费 / 3 不走高速 */
  policy?: 0 | 1 | 2 | 3
}): string {
  const { to, from, policy } = opts

  if (typeof to.lng !== 'number' || typeof to.lat !== 'number') {
    // 退化为搜索（输入地址越完整越精准）
    return amapSearchUrl(to.address || to.name, to.city)
  }

  const params = new URLSearchParams({
    to: `${to.lng},${to.lat},${to.name}`,
    mode: 'car',
    src: SRC,
    callnative: '1', // 移动端尝试唤起高德 App
  })
  if (from && typeof from.lng === 'number' && typeof from.lat === 'number') {
    params.set('from', `${from.lng},${from.lat},${from.name}`)
  }
  if (typeof policy === 'number') params.set('policy', String(policy))

  return `${AMAP_BASE}/navigation?${params.toString()}`
}

/** 高德"地点搜索"链接：传入地名/POI 名称，会落到搜索结果页 */
export function amapSearchUrl(keyword: string, city?: string): string {
  const params = new URLSearchParams({
    keywords: keyword,
    src: SRC,
    callnative: '1',
  })
  if (city) params.set('city', city)
  return `${AMAP_BASE}/search?${params.toString()}`
}

/**
 * 高德"标记位置"链接：基于经纬度精准定位到地点详情页
 * 地点详情页里有"到这里去"按钮，可二次跳转到导航
 */
export function amapMarkerUrl(opts: Place): string {
  const { lng, lat, name, address } = opts
  if (typeof lng !== 'number' || typeof lat !== 'number') {
    return amapSearchUrl(address || name, opts.city)
  }
  const params = new URLSearchParams({
    position: `${lng},${lat}`,
    name,
    src: SRC,
    callnative: '1',
  })
  return `${AMAP_BASE}/marker?${params.toString()}`
}
