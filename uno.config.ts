import {defineConfig,presetIcons,presetAttributify,presetUno} from "unocss"
import {FileSystemIconLoader} from "@iconify/utils/lib/loader/node-loaders"

export default defineConfig({
  presets:[
    presetUno({}),
    presetAttributify({}),
    presetIcons({
      collections:{
        custom:
          FileSystemIconLoader('./src/assets/icons',
            svg => svg.replace(/#fff/, 'currentColor'))
      }
    })
  ]
})