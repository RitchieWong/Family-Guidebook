暄暄成长里程碑 · 原图暂存夹
================================

按节点分了 5 个子目录，把照片拖进对应文件夹即可，文件名随意：

  1-birth/          → 出生（2024.4.19）
  2-full-month/     → 满月（2024.5.19）
  3-hundred-days/   → 百天（2024.7.28）
  4-one-year/       → 周岁（2025.4.19）
  5-two-years/      → 两岁（2026.4.19）

支持格式：jpg / jpeg / png / heic / webp（脚本统一处理）。
每个节点目前只取文件夹里 **第一张** 照片作为该节点主图
（按文件名排序，所以想指定哪张优先，可以把文件名改成 01.jpg / 02.jpg）。

放好后在项目根目录跑：

  npm run build-milestone-photos

脚本会把每张图压成 thumb / medium / src 三档 webp，写入：

  public/photos/milestones-xuanxuan/{thumb,medium,src}/
      birth.webp
      full-month.webp
      hundred-days.webp
      one-year.webp
      two-years.webp

本文件夹里的原图已被 .gitignore 排除，不会进仓库。
