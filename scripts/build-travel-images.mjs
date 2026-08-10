import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const imageDirectory = path.join(projectRoot, 'public/images/travel/2026-yunnan')
const variants = [
  { width: 480, quality: 66 },
  { width: 800, quality: 68 },
  { width: 1200, quality: 72 },
]

const sourceFiles = (await fs.readdir(imageDirectory))
  .filter((file) => file.endsWith('.webp') && !/-\d+w\.webp$/.test(file))
  .sort()

if (sourceFiles.length === 0) {
  throw new Error(`No source WebP images found in ${imageDirectory}`)
}

for (const { width, quality } of variants) {
  let totalBytes = 0

  for (const sourceFile of sourceFiles) {
    const sourcePath = path.join(imageDirectory, sourceFile)
    const outputFile = sourceFile.replace(/\.webp$/, `-${width}w.webp`)
    const outputPath = path.join(imageDirectory, outputFile)

    await sharp(sourcePath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outputPath)

    totalBytes += (await fs.stat(outputPath)).size
  }

  const totalMiB = (totalBytes / 1024 / 1024).toFixed(2)
  const averageKiB = Math.round(totalBytes / sourceFiles.length / 1024)
  console.log(`${width}w: ${sourceFiles.length} images, ${totalMiB} MiB total, ${averageKiB} KiB average`)
}
