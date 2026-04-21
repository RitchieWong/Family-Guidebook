import type { Album } from './types'

/**
 * 相册索引。
 *
 * 🔧 两种维护方式：
 * 1) 手动：在这里 push 一个 Album 对象
 * 2) 推荐：运行 `npm run import-photos ~/Pictures/xxx -- --id 2026-labor --title '五一北戴河'`
 *    脚本会自动处理图片并追加到 src/content/albums/auto.json
 *
 * photos[i].src / thumb / medium 均为相对 /photos/ 的路径
 * 比如 "2024-04-birth/medium/IMG_0001.webp" 对应 public/photos/2024-04-birth/medium/IMG_0001.webp
 */
import autoAlbums from './albums/auto.json'

export const MANUAL_ALBUMS: Album[] = [
  // 示例（未来你手动加的相册放这里）
]

export const ALBUMS: Album[] = [...MANUAL_ALBUMS, ...(autoAlbums as Album[])].sort((a, b) =>
  (b.date || '').localeCompare(a.date || '')
)

export function getAlbumById(id: string): Album | undefined {
  return ALBUMS.find(a => a.id === id)
}
