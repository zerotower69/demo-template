import { transformerVariantGroup, transformerDirectives, presetAttributify, defineConfig, presetMini, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
// loader helpers
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
// https://github.com/unocss/unocss#readme
export default defineConfig({
  presets: [
    presetMini({ dark: 'class' }),
    presetAttributify(),
    presetUno(),
    presetIcons({
      // 其他选项
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        ant: () => import('@iconify-json/ant-design').then(i => i.icons),
        //自己的图标，从alibaba icons 下载的svg转义
        custom: FileSystemIconLoader('./assets/icons', svg => svg.replace(/#fff/, 'currentColor'))
      }
    })
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-ac': 'flex justify-around items-center',
    'flex-bc': 'flex justify-between items-center'
  },
  theme: {}
})
