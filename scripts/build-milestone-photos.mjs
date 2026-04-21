#!/usr/bin/env node
/**
 * 暄暄成长里程碑 · 专用照片处理脚本
 * -----------------------------------------------------------
 * 用法：
 *   npm run build-milestone-photos                    # 读默认 milestone-source/
 *   npm run build-milestone-photos <sourceDir>        # 自定义源目录
 *
 * 源目录结构（推荐）：
 *   milestone-source/
 *   ├── 1-birth/            → 出生
 *   ├── 2-full-month/       → 满月
 *   ├── 3-hundred-days/     → 百天
 *   ├── 4-one-year/         → 周岁
 *   └── 5-two-years/        → 两岁
 *
 *   每个子目录里放任意文件名的图片，脚本会按文件名排序，取第一张
 *   作为该节点主图；支持 jpg/jpeg/png/heic/webp。
 *
 * 兼容旧版：
 *   如果子目录不存在，脚本会退回到扁平模式——扫描源目录下
 *   birth.* / full-month.* / hundred-days.* / one-year.* / two-years.*
 *
 * 输出：
 *   public/photos/milestones-xuanxuan/
 *     ├── thumb/   480px  webp q75
 *     ├── medium/  1280px webp q82   ← 页面代码默认引用
 *     └── src/     原尺寸  webp q85   ← lightbox 查看大图
 *
 * 跑完不需要改任何代码，提交 public/photos/milestones-xuanxuan/ 即可上线。
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import process from 'node:process'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_ROOT = path.join(ROOT, 'public/photos/milestones-xuanxuan')
const DEFAULT_SRC = path.join(ROOT, 'milestone-source')

/** 节点 id → 子目录名 */
const NODES = [
  { id: 'birth',        dir: '1-birth',        stage: '出生' },
  { id: 'full-month',   dir: '2-full-month',   stage: '满月' },
  { id: 'hundred-days', dir: '3-hundred-days', stage: '百天' },
  { id: 'one-year',     dir: '4-one-year',     stage: '周岁' },
  { id: 'two-years',    dir: '5-two-years',    stage: '两岁' },
]
const EXT = /\.(jpe?g|png|heic|webp)$/i

async function main() {
  const customDir = process.argv[2]
  const srcAbs = customDir
    ? path.resolve(customDir.replace(/^~/, process.env.HOME || ''))
    : DEFAULT_SRC

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('缺少依赖 sharp，请先执行: npm install')
    process.exit(1)
  }

  const stat = await fs.stat(srcAbs).catch(() => null)
  if (!stat || !stat.isDirectory()) {
    console.error(`源目录不存在: ${srcAbs}`)
    process.exit(1)
  }

  console.log(`📁 源目录: ${path.relative(ROOT, srcAbs) || srcAbs}`)

  await fs.mkdir(path.join(OUT_ROOT, 'thumb'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'medium'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'src'), { recursive: true })

  const done = []
  for (const node of NODES) {
    const picked = await pickPhoto(srcAbs, node)
    if (!picked) {
      console.log(`⏭  [${node.stage}] 跳过（没找到照片）`)
      continue
    }
    const outName = `${node.id}.webp`
    console.log(`✨ [${node.stage}] ${path.relative(srcAbs, picked)}`)

    await sharp(picked)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(OUT_ROOT, 'thumb', outName))

    await sharp(picked)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_ROOT, 'medium', outName))

    await sharp(picked)
      .rotate()
      .webp({ quality: 85 })
      .toFile(path.join(OUT_ROOT, 'src', outName))

    done.push(node.stage)
  }

  console.log(`\n✅ 完成 ${done.length}/${NODES.length} 张 → public/photos/milestones-xuanxuan/`)
  console.log(`   已处理：${done.join('、') || '（无）'}`)
  if (done.length < NODES.length) {
    const missing = NODES.filter((n) => !done.includes(n.stage)).map((n) => n.stage)
    console.log(`   未处理：${missing.join('、')}（稍后补照片再跑一次即可）`)
  }
  console.log('\n👉 接下来：')
  console.log('   git add public/photos/milestones-xuanxuan/')
  console.log('   git commit -m "chore(photos): update milestone photos"')
  console.log('   git push')
}

/**
 * 优先在节点子目录里找第一张图；找不到再回退到扁平命名模式。
 */
async function pickPhoto(srcAbs, node) {
  // 1) 子目录模式
  const subDir = path.join(srcAbs, node.dir)
  const subStat = await fs.stat(subDir).catch(() => null)
  if (subStat && subStat.isDirectory()) {
    const files = (await fs.readdir(subDir))
      .filter((f) => EXT.test(f) && !f.startsWith('.'))
      .sort((a, b) => a.localeCompare(b))
    if (files.length > 0) return path.join(subDir, files[0])
  }

  // 2) 扁平模式回退：srcAbs 下 <id>.* 或 <id>-*.*
  const flat = (await fs.readdir(srcAbs)).filter((f) => EXT.test(f))
  const hit = flat.find((f) => {
    const lower = f.toLowerCase()
    return lower.startsWith(`${node.id}.`) || lower.startsWith(`${node.id}-`)
  })
  if (hit) return path.join(srcAbs, hit)

  return null
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
