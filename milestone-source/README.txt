暄暄成长里程碑 · 原图暂存夹
================================

把原图放进这个文件夹，按节点命名（扩展名 jpg/jpeg/png/heic/webp 均可）：

  birth.jpg          → 出生
  full-month.jpg     → 满月
  hundred-days.jpg   → 百天
  one-year.jpg       → 周岁
  two-years.jpg      → 两岁

放好后在项目根目录跑：

  npm run build-milestone-photos milestone-source

脚本会自动把每张图压成 thumb / medium / src 三档 webp，
写入 public/photos/milestones-xuanxuan/ 下（这才是真正入仓的那份）。

本文件夹里的原图已被 .gitignore 排除，不会进仓库。
