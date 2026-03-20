import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: 若仓库名不是 yourname.github.io，需设置 base 为 '/仓库名/'
// 例如仓库 skill-safety-web → base: '/skill-safety-web/'
const base = process.env.GITHUB_PAGES_BASE || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
})


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3002',
//         changeOrigin: true,
//       },
//     },
//   },
// })
