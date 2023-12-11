// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0'
  },
  vite: {
    vue: {},
    vueJsx: {
      mergeProps: true
    },
    server: {
      hmr: true //vite热更新
    }
  },
  modules: ['@vueuse/nuxt', '@unocss/nuxt', '@pinia/nuxt', '@nuxtjs/color-mode', '@ant-design-vue/nuxt']
})
