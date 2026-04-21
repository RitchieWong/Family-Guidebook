#!/usr/bin/env node
/**
 * 照片导入脚本
 * -----------------------------------------------------------
 * 用法：
 *   npm run import-photos -- <sourceDir> --id <albumId> --title <标题>
 *                            [--subtitle 副标题] [--date YYYY-MM-DD]
 *                            [--desc 描述] [--tags a,b,c]
 *
 * 示例：
 *   npm run import-photos -- ~/Pictures/2024-04-birth \
 *     --id 2024-04-birth --title "欢迎来到这个世界" --date 2024-04-19
 *
 * 行为：
 *   1) 从 sourceDir 读取所有 jpg/jpeg/png/heic/webp
 *   2) 用 sharp 生成 thumb(480w) / medium(1280w) / 原图(webp, 质量 82)
 *      输出到 public/photos/<albumId>/{thumb,medium,src}/xxx.webp
 *   3) 追加相册信息到 src/content/albums/auto.json（已存在同 id 会被更新）
 *
 * 不会提交 git，请自己 commit。
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import process from 'node:process'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PHOTOS_ROOT = path.join(ROOT, 'public/photos')
const ALBUMS_JSON = path.join(ROOT, 'src/content/albums/auto.json')

const SUPPORTED_EXT = /\.(jpe?g|png|heic|webp)$/i

function parseArgs(argv) {
  const args = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (!next || next.startsWith('--')) {
        args[key] = true
      } else {
        args[key] = next
        i++
      }
    } else {
      args._.push(a)
    }
  }
  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const sourceDir = args._[0]
  const albumId = args.id
  const title = args.title

  if (!sourceDir || !albumId || !title) {
    console.error(
      '用法: npm run import-photos -- <sourceDir> --id <albumId> --title <标题>'
    )
    process.exit(1)
  }

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('缺少依赖 sharp，请先执行: npm install')
    process.exit(1)
  }

  const srcAbs = path.resolve(sourceDir)
  const stat = await fs.stat(srcAbs).catch(() => null)
  if (!stat || !stat.isDirectory()) {
    console.error(`源目录不存在: ${srcAbs}`)
    process.exit(1)
  }

  const files = (await fs.readdir(srcAbs))
    .filter(f => SUPPORTED_EXT.test(f))
    .sort()

  if (files.length === 0) {
    console.error('源目录下没有可识别的图片')
    process.exit(1)
  }

  const outDir = path.join(PHOTOS_ROOT, albumId)
  await fs.mkdir(path.join(outDir, 'thumb'), { recursive: true })
  await fs.mkdir(path.join(outDir, 'medium'), { recursive: true })
  await fs.mkdir(path.join(outDir, 'src'), { recursive: true })

  const photos = []
  let idx = 0
  for (const file of files) {
    idx++
    const base = path.parse(file).name.replace(/[^A-Za-z0-9_-]/g, '_')
    const outName = `${String(idx).padStart(3, '0')}_${base}.webp`
    const inputPath = path.join(srcAbs, file)

    console.log(`[${idx}/${files.length}] ${file}`)

    const pipeline = sharp(inputPath).rotate()
    const meta = await pipeline.metadata()

    await sharp(inputPath)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(outDir, 'thumb', outName))

    await sharp(inputPath)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outDir, 'medium', outName))

    await sharp(inputPath)
      .rotate()
      .webp({ quality: 82 })
      .toFile(path.join(outDir, 'src', outName))

    photos.push({
      file: outName,
      src: `/photos/${albumId}/src/${outName}`,
      medium: `/photos/${albumId}/medium/${outName}`,
      thumb: `/photos/${albumId}/thumb/${outName}`,
      width: meta.width,
      height: meta.height
    })
  }

  // 读取已有 auto.json
  let existing = []
  try {
    const txt = await fs.readFile(ALBUMS_JSON, 'utf8')
    existing = JSON.parse(txt) || []
  } catch {
    existing = []
  }

  const album = {
    id: albumId,
    title,
    subtitle: args.subtitle || '',
    date: args.date || new Date().toISOString().slice(0, 10),
    description: args.desc || '',
    cover: photos[0]?.thumb || '🖼️',
    tags: args.tags ? String(args.tags).split(',').map(s => s.trim()) : [],
    photos
  }

  const filtered = existing.filter(a => a.id !== albumId)
  filtered.push(album)
  filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  await fs.writeFile(ALBUMS_JSON, JSON.stringify(filtered, null, 2) + '\n', 'utf8')
  console.log(`\n✅ 完成：${photos.length} 张照片 → ${outDir}`)
  console.log(`📝 已写入 ${path.relative(ROOT, ALBUMS_JSON)}`)
  console.log('👉 记得 git add public/photos/ src/content/albums/auto.json 并提交')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
