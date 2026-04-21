/**
 * 地图导航工具：默认使用高德地图 (https://uri.amap.com/)
 *
 * 选用高德 URI API 的原因：
 *  - 跨平台稳定：移动端会尝试唤起高德 App，未安装则落地高德 H5；PC 端打开高德网页地图
 *  - 中国大陆覆盖最完整、地点搜索最准（尤其国内民宿/景区）
 *  - 不需要 API Key，URL 直接使用
 *
 * 文档参考：https://lbs.amap.com/api/uri-api/summary
 */

const AMAP_BASE = 'https://uri.amap.com'

/** 高德"地点搜索"链接：传入地名/POI 名称，会落到搜索结果页（带定位） */
export function amapSearchUrl(keyword: string, city?: string): string {
  const params = new URLSearchParams({
    keywords: keyword,
    src: 'family-guidebook',
    callnative: '1', // 移动端尝试唤起 App，PC 端忽略
  })
  if (city) params.set('city', city)
  return `${AMAP_BASE}/search?${params.toString()}`
}

/**
 * 高德"标记位置"链接：基于经纬度精准定位
 * 经纬度需为高德坐标系（GCJ-02）
 */
export function amapMarkerUrl(opts: {
  lng: number
  lat: number
  name: string
}): string {
  const { lng, lat, name } = opts
  const params = new URLSearchParams({
    position: `${lng},${lat}`,
    name,
    src: 'family-guidebook',
    callnative: '1',
  })
  return `${AMAP_BASE}/marker?${params.toString()}`
}
