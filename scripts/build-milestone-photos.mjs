#!/usr/bin/env node
/**
 * 暄暄成长里程碑 · 专用照片处理脚本
 * -----------------------------------------------------------
 * 用法：
 *   npm run build-milestone-photos                 # 读默认 milestone-source/
 *   npm run build-milestone-photos <sourceDir>     # 自定义源目录
 *
 * 源目录结构（约定）：
 *   milestone-source/
 *   ├── 1-birth/
 *   │   ├── 主图.jpg          ← 必须命名为「主图」的文件，作为该节点主图
 *   │   └── xxx.jpeg          ← 其余图自动成为画廊图（按文件名排序）
 *   ├── 2-full-month/
 *   │   └── ...
 *   └── 5-two-years/
 *
 *   支持格式：jpg/jpeg/png/heic/webp。
 *   如果没有「主图.*」，会退回到「按文件名排序取第一张」逻辑。
 *
 * 输出：
 *   public/photos/milestones-xuanxuan/
 *     ├── cover/       1280px webp q85  主图（页面主视觉）
 *     ├── cover-thumb/ 480px  webp q75  主图缩略
 *     ├── cover-src/   原尺寸 webp q85  主图 lightbox 原图
 *     └── gallery/<id>/
 *         ├── 01-medium.webp  /  01-thumb.webp  /  01-src.webp
 *         └── ...             （画廊图，一张图三档）
 *
 * 节点页面代码只需要引用：
 *   story.image          = /photos/milestones-xuanxuan/cover/<id>.webp
 *   story.gallery[n].src = /photos/milestones-xuanxuan/gallery/<id>/01-medium.webp
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import os from 'node:os'
import process from 'node:process'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileP = promisify(execFile)

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_ROOT = path.join(ROOT, 'public/photos/milestones-xuanxuan')
const DEFAULT_SRC = path.join(ROOT, 'milestone-source')

const NODES = [
  { id: 'birth',        dir: '1-birth',        stage: '出生' },
  { id: 'full-month',   dir: '2-full-month',   stage: '满月' },
  { id: 'hundred-days', dir: '3-hundred-days', stage: '百天' },
  { id: 'one-year',     dir: '4-one-year',     stage: '周岁' },
  { id: 'two-years',    dir: '5-two-years',    stage: '两岁' },
]
const EXT = /\.(jpe?g|png|heic|webp)$/i
const COVER_RE = /^(主图|cover)\.(jpe?g|png|heic|webp)$/i

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

  console.log(`📁 源目录: ${path.relative(ROOT, srcAbs) || srcAbs}\n`)

  // 先清理旧输出（只清我们管的三个子目录，避免遗留文件）
  await clean(path.join(OUT_ROOT, 'cover'))
  await clean(path.join(OUT_ROOT, 'cover-thumb'))
  await clean(path.join(OUT_ROOT, 'cover-src'))
  await clean(path.join(OUT_ROOT, 'gallery'))

  await fs.mkdir(path.join(OUT_ROOT, 'cover'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'cover-thumb'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'cover-src'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'gallery'), { recursive: true })

  const report = []
  for (const node of NODES) {
    const subDir = path.join(srcAbs, node.dir)
    const subStat = await fs.stat(subDir).catch(() => null)
    if (!subStat || !subStat.isDirectory()) {
      console.log(`⏭  [${node.stage}] 跳过（目录不存在）`)
      continue
    }

    const files = (await fs.readdir(subDir))
      .filter((f) => EXT.test(f) && !f.startsWith('.'))

    if (files.length === 0) {
      console.log(`⏭  [${node.stage}] 跳过（目录里没有照片）`)
      continue
    }

    // 分出主图 vs 画廊
    const coverFile = files.find((f) => COVER_RE.test(f)) || files.sort()[0]
    const galleryFiles = files
      .filter((f) => f !== coverFile)
      .sort((a, b) => a.localeCompare(b))

    console.log(`\n✨ [${node.stage}] 主图: ${coverFile}  | 画廊: ${galleryFiles.length} 张`)

    // 处理主图
    const coverIn = path.join(subDir, coverFile)
    const coverName = `${node.id}.webp`
    await sharp(coverIn)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(OUT_ROOT, 'cover', coverName))
    await sharp(coverIn)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(OUT_ROOT, 'cover-thumb', coverName))
    await sharp(coverIn)
      .rotate()
      .webp({ quality: 85 })
      .toFile(path.join(OUT_ROOT, 'cover-src', coverName))

    // 处理画廊
    const nodeGalleryDir = path.join(OUT_ROOT, 'gallery', node.id)
    await fs.mkdir(nodeGalleryDir, { recursive: true })
    const galleryItems = []
    let i = 1
    for (const gf of galleryFiles) {
      const seq = String(i).padStart(2, '0')
      const input = await ensureDecodable(path.join(subDir, gf))
      await sharp(input)
        .rotate()
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(nodeGalleryDir, `${seq}-medium.webp`))
      await sharp(input)
        .rotate()
        .resize({ width: 320, withoutEnlargement: true })
        .webp({ quality: 72 })
        .toFile(path.join(nodeGalleryDir, `${seq}-thumb.webp`))
      await sharp(input)
        .rotate()
        .webp({ quality: 85 })
        .toFile(path.join(nodeGalleryDir, `${seq}-src.webp`))
      galleryItems.push(seq)
      i++
    }

    report.push({ stage: node.stage, cover: coverFile, gallery: galleryItems.length })
  }

  console.log('\n──────────── 汇总 ────────────')
  for (const r of report) {
    console.log(`  ✅ ${r.stage.padEnd(4, ' ')} · 主图 1 张 · 画廊 ${r.gallery} 张`)
  }
  console.log('\n👉 接下来：')
  console.log('   git add public/photos/milestones-xuanxuan/')
  console.log('   git commit -m "chore(photos): build milestone cover + gallery"')
  console.log('   git push')
}

async function clean(dir) {
  await fs.rm(dir, { recursive: true, force: true })
}

/**
 * sharp 在 macOS 上默认不带 HEIC 解码器，遇到 .heic 先用系统 `sips`
 * 转成临时 jpg，再交给 sharp。非 HEIC 直接原路径返回。
 */
const TMP_DIR = path.join(os.tmpdir(), 'milestone-heic-cache')
async function ensureDecodable(inputPath) {
  if (!/\.heic$/i.test(inputPath)) return inputPath
  await fs.mkdir(TMP_DIR, { recursive: true })
  const base = path.basename(inputPath).replace(/\.heic$/i, '.jpg')
  const out = path.join(TMP_DIR, `${Date.now()}-${base}`)
  try {
    await execFileP('sips', ['-s', 'format', 'jpeg', inputPath, '--out', out])
    return out
  } catch (e) {
    console.error(`⚠️  HEIC 解码失败（跳过）: ${inputPath}`)
    console.error(`    ${e.message}`)
    throw e
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
