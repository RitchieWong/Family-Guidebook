/**
 * 站内锚点平滑滚动工具
 *
 * 背景：本站使用 HashRouter（main.tsx），URL 形如 /#/travel/2026-labor-day。
 * 如果用原生 <a href="#dayN">，浏览器会把整个 URL hash 替换为 #dayN，
 * HashRouter 立刻读到"新路由 = /dayN"，匹配不到任何路由 → 落到 NotFound。
 *
 * 因此所有站内锚点跳转都必须：
 *   1) 用 onClick 阻止默认行为（preventDefault）
 *   2) 用 JS 滚动到目标元素，不修改 URL
 *
 * 使用：
 *   <a href="#day1" onClick={(e) => scrollToSection(e, 'day1')}>Day1</a>
 *
 * offset 默认 120px：主 Nav 64 + sticky 二级导航 ~48 + 呼吸 8。
 * 调用方可按需覆盖。
 */
export function scrollToSection(
  e: React.MouseEvent | MouseEvent,
  id: string,
  offset = 120,
) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}
