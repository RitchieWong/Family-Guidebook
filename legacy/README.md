# Legacy · 旧静态站点（已归档，只读）

本目录是 React + Vite 重构之前的 vanilla HTML / JS / CDN-Tailwind 版本，**已不再被部署或链接**，仅保留以便回看原始排版与文案。

| 旧文件 | 新版本入口 |
| --- | --- |
| `apps/growth/milestones.html` | `/growth/milestones`（`src/pages/MilestonesPage.tsx`） |
| `apps/travel/2026-labor-day.html` + `.js` | `/travel/2026-labor-day`（`src/pages/TravelLaborDay2026Page.tsx` + `src/components/travel/sections/*`） |
| `apps/games/*` | 暂未迁移，可在新版分类页对应入口扩展 |
| `apps/mini-programs/*` | 暂未迁移 |
| `apps/album/*` | `/album`（`src/pages/AlbumListPage.tsx` / `AlbumDetailPage.tsx`） |
| `category.html` | `/category/:id`（`src/pages/CategoryPage.tsx`） |
| `assets/data.js` | `src/content/categories.ts` 等 TS 数据源 |
| `assets/style.css` | `src/styles/index.css`（含 timeline / check-item / name-char 样式） |

## 何时可以删除

如果新版本已经稳定运行 ≥1 个月、并且不再需要回查原始 HTML 的样式/文案细节，整个 `legacy/` 目录可以直接 `rm -rf` 删除。
