#!/usr/bin/env node
/**
 * 暄暄成长里程碑 · 专用照片处理脚本
 * -----------------------------------------------------------
 * 用法：
 *   npm run build-milestone-photos <sourceDir>
 *
 * 示例：
 *   npm run build-milestone-photos ~/Pictures/milestones
 *
 * 行为：
 *   读取 <sourceDir> 里所有文件名以 birth / full-month / hundred-days
 *   / one-year / two-years 打头的 jpg/jpeg/png/heic/webp（大小写不敏感），
 *   用 sharp 生成 thumb / medium / src 三档 webp：
 *     public/photos/milestones-xuanxuan/{thumb,medium,src}/<id>.webp
 *
 *   页面里 milestone-album.ts 的 story.image 默认指向 medium，
 *   脚本跑完就会立刻生效，不需要改代码。
 *
 * 说明：
 *   没有照片的节点不会被处理，页面会优雅降级为 emoji 占位。
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import process from 'node:process'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_ROOT = path.join(ROOT, 'public/photos/milestones-xuanxuan')

const IDS = ['birth', 'full-month', 'hundred-days', 'one-year', 'two-years']
const EXT = /\.(jpe?g|png|heic|webp)$/i

async function main() {
  const sourceDir = process.argv[2]
  if (!sourceDir) {
    console.error('用法: npm run build-milestone-photos <sourceDir>')
    console.error('  例: npm run build-milestone-photos ~/Pictures/milestones')
    process.exit(1)
  }

  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.error('缺少依赖 sharp，请先执行: npm install')
    process.exit(1)
  }

  const srcAbs = path.resolve(sourceDir.replace(/^~/, process.env.HOME || ''))
  const stat = await fs.stat(srcAbs).catch(() => null)
  if (!stat || !stat.isDirectory()) {
    console.error(`源目录不存在: ${srcAbs}`)
    process.exit(1)
  }

  const files = (await fs.readdir(srcAbs)).filter((f) => EXT.test(f))
  if (files.length === 0) {
    console.error('源目录里没有可识别的图片')
    process.exit(1)
  }

  await fs.mkdir(path.join(OUT_ROOT, 'thumb'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'medium'), { recursive: true })
  await fs.mkdir(path.join(OUT_ROOT, 'src'), { recursive: true })

  const done = []
  for (const id of IDS) {
    const file = files.find((f) => f.toLowerCase().startsWith(id))
    if (!file) {
      console.log(`⏭  [${id}] 跳过（源目录里没找到 ${id}.*）`)
      continue
    }
    const input = path.join(srcAbs, file)
    const outName = `${id}.webp`
    console.log(`✨ [${id}] ${file}`)

    await sharp(input)
      .rotate()
      .resize({ width: 480, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(OUT_ROOT, 'thumb', outName))

    await sharp(input)
      .rotate()
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(path.join(OUT_ROOT, 'medium', outName))

    await sharp(input)
      .rotate()
      .webp({ quality: 85 })
      .toFile(path.join(OUT_ROOT, 'src', outName))

    done.push(id)
  }

  console.log(
    `\n✅ 完成：${done.length}/${IDS.length} 张 → public/photos/milestones-xuanxuan/`
  )
  console.log(`   处理的节点：${done.join(', ') || '（无）'}`)
  console.log(
    '👉 记得 git add public/photos/milestones-xuanxuan/ 并提交 & push，GitHub Actions 会自动部署。'
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
