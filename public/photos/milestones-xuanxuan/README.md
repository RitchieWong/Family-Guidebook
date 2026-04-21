# 暄暄成长里程碑 · 照片目录

这个目录存放 5 张节点照片的三档 webp，由脚本 `npm run build-milestone-photos` 生成。

## 目录约定
```
milestones-xuanxuan/
├── thumb/     480px  webp q75   列表缩略
├── medium/    1280px webp q82   页面主图（代码默认引用）
└── src/       原尺寸 webp q85   lightbox 查看大图
```

## 5 个节点文件名
- `birth.webp`         出生
- `full-month.webp`    满月
- `hundred-days.webp`  百天
- `one-year.webp`      周岁
- `two-years.webp`     两岁

## 生成方式
原图放在 `~/Pictures/milestones/`（支持 jpg/jpeg/png/heic/webp），文件名以节点 id 打头即可，然后：

```bash
npm run build-milestone-photos ~/Pictures/milestones
```

脚本会自动识别、旋转、压缩，写入上述三个子目录。
