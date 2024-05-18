import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
import UnoCSS from 'unocss/vite'
import ProgressBar from 'vite-plugin-progress'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode, command } = config
  const { VITE_BASE_URL, VITE_TITLE, VITE_DROP_CONSOLE, VITE_BUILD_PATH } = loadEnv(mode, CWD)
  return {
    base: VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 8000
    },
    plugins: [
      vue(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      VueDevTools(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: VITE_TITLE
          }
        }
      }),
      UnoCSS(),
      ProgressBar()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    //优化
    optimizeDeps: {
      include: []
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE === 'true' ? ['console.log', 'debugger'] : []
    },
    //构建目标
    build: {
      target: 'es2017',
      minify: 'esbuild',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 2000,
      outDir: 'dist',
      //rollupOptions
      rollupOptions: {
        output: {
          entryFileNames: 'js/[name]-[hash].js',
          chunkFileNames: 'js/[name]-[hash].js',
          assetFileNames(chunkInfo) {
            if (chunkInfo.name?.endsWith('.css')) {
              return 'css/[name]-[hash].css'
            }
            const imagesExts = ['.png', 'jpeg', 'jpg', '.svg', '.webp']
            if (imagesExts.some((ext) => chunkInfo.name?.endsWith(ext))) {
              return 'images/[name]-[hash][ext]'
            }
            return 'assets/[name]-[hash][ext]'
          }
        }
      }
    }
  }
})
