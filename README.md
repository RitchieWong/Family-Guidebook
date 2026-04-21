# 暄暄的家 🏡

一家人围着暄暄转的小天地 —— 记录旅行、亲子小程序、小游戏，以及瑷暄每一次小小第一次。

> 🧒 主角：瑷暄（2024.04.19 出生 · 谷雨时节）
> 🌐 在线地址：<https://ritchiewong.site>

## 技术栈

- **Vite 5 + React 18 + TypeScript**
- **Tailwind CSS 3**
- **React Router v6（HashRouter）** · GitHub Pages 刷新不 404
- **sharp** · 本地一键压缩照片
- **GitHub Pages + GitHub Actions** · 零成本部署

## 目录结构

```
├─ public/
│  └─ photos/<albumId>/ · 照片（thumb/medium/src 三档）
├─ src/
│  ├─ main.tsx, App.tsx
│  ├─ components/         共用组件（Nav / Footer / CategoryCard）
│  ├─ pages/              页面（HomePage / CategoryPage / MilestonesPage ...）
│  ├─ content/            所有内容数据（TS 单一数据源）
│  │  ├─ categories.ts    首页分类 & 子项
│  │  ├─ milestones.ts    成长里程碑
│  │  ├─ albums.ts        相册入口（合并手写 + auto.json）
│  │  ├─ albums/auto.json 由 import-photos 脚本自动写入
│  │  ├─ constants.ts     配色 / 状态 / 日期工具
│  │  └─ types.ts
│  └─ styles/index.css    Tailwind 入口
├─ scripts/import-photos.mjs  照片导入脚本
├─ legacy/                旧静态站点（已归档只读，仅供回看）
└─ .github/workflows/deploy.yml  GitHub Pages 部署
```

## 本地开发

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # 生成 dist/
npm run preview   # 本地预览构建产物
```

## 添加内容

### 1. 新增成长记录

编辑 `src/content/milestones.ts`，往 `MILESTONES` 数组 push 一项：

```ts
{
  date: '2026-05-01',
  age: '2 岁 12 天',
  title: '第一次看海',
  emoji: '🌊',
  tag: '旅行',
  highlight: true,
  desc: '你盯着浪花看了整整 10 分钟。'
}
```

### 2. 新增分类下的子项

编辑 `src/content/categories.ts`，在对应分类的 `items[]` 里 push 一项。

### 3. 上传照片（推荐：脚本）

```bash
# 1) 把当次要上传的照片放到某个本地目录，比如 ~/Pictures/2024-04-birth
# 2) 运行脚本（会生成 thumb/medium/src 三档 webp）
npm run import-photos -- ~/Pictures/2024-04-birth \
  --id 2024-04-birth \
  --title "欢迎来到这个世界" \
  --date 2024-04-19 \
  --subtitle "月子 · 第一次抱你"

# 3) 提交 + push
git add public/photos/2024-04-birth src/content/albums/auto.json
git commit -m "album: 2024-04-birth"
git push
```

脚本会：
- 自动校正 EXIF 方向（rotate）
- 生成 480w / 1280w / 原图 三档 webp（压缩后体积很小）
- 追加相册到 `src/content/albums/auto.json`

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

- 自定义域名通过仓库根目录的 `CNAME` 文件控制（目前为 `ritchiewong.site`）
- 若未来切成 `user.github.io/Family-Guidebook/` 形式，需把 `vite.config.ts` 里的 `base` 改为 `'/Family-Guidebook/'`

## 迁移待办

- [x] 项目骨架 + 内容数据层
- [x] 首页（Hero / 分类 / Moments）
- [x] 分类详情页
- [x] 成长记录页（完整版：左右交替时间线 / 名字由来拆解 / 谷雨节气 / 年份过滤）
- [x] 完整迁移 `legacy/apps/travel/2026-labor-day.html`（4 天 3 晚路书：Hero/总览/住宿 A·B 切换/Day1-4/贴士/清单 localStorage）
- [x] 旧静态文件归档至 `legacy/`（只读保留，便于对照）
- [ ] 相册 lightbox 增强（键盘翻页 / 滑动 / EXIF）

## 旧静态站点

原 vanilla HTML/JS/CDN-Tailwind 版本已归档到 `legacy/`，包括：

- `legacy/apps/growth/milestones.html`
- `legacy/apps/travel/2026-labor-day.html` + `.js`
- `legacy/apps/games/`、`legacy/apps/mini-programs/`、`legacy/apps/album/`
- `legacy/assets/data.js`、`legacy/assets/style.css`
- `legacy/category.html`

新版本不再链接它们；保留是为了快速回看原始排版与文案。如不再需要，可直接删除 `legacy/` 目录。
