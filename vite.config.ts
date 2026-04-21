import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 若使用自定义域名（CNAME），base 用 '/'
// 若用 user/project 仓库并且没有自定义域名，base 改为 '/Family-Guidebook/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
})
