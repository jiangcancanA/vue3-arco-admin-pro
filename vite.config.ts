import path from 'path'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/',
  // 本地服务启动配置、跨域配置
  // server: {
  //   host: 'localhost',
  //   port: 8080,
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.100.14:3351',
  //       ws: false,
  //       changeOrigin: true
  //     }
  //   }
  // },

  // 在 Vite 中，plugins 是配置项之一，用于指定你的项目使用的 Vite 插件。
  // 插件是一组功能模块，它们可以用来扩展或修改 Vite 构建过程中的行为。
  // 每个插件都是一个函数，接收 Vite 的实例作为参数，并在其上进行一些操作。
  plugins: [
    vue(), // Vite 插件，用于支持 Vue 单文件组件。
    vueJsx(), // Vite 插件，用于支持 Vue 的 JSX 语法。
    // 配置vite在运行的时候自动检测eslint规范
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      exclude: ['./node_modules/**']
    }),
    // 自定义组件名称, 自定义 Vite 插件，用于扩展 Vue 组件的 setup 配置
    VueSetupExtend()
  ],
  // 使用 resolve 字段配置别名，将 @ 映射到 src 目录
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // css 是用于配置样式处理的一个字段。它用于指定样式的预处理器和相关选项
  css: {
    // preprocessorOptions 是 Vite 配置文件中用于配置预处理器（Preprocessor）选项的一个字段。
    // 在 Vue 3 项目中，预处理器通常用于处理 CSS、Less、Sass 等样式文件。
    preprocessorOptions: {
      // 配置less全局使用
      less: {
        // modifyVars 是用于修改 Less 变量的一个选项。在 Less 中，变量可以用于存储颜色、字体、边距等样式信息，
        // 通过 modifyVars 可以在编译时动态修改这些变量的值。
        modifyVars: {
          // 这段配置的作用是在 Less 中引入 src/assets/less/main.less 文件，但不将其编译输出到最终的 CSS 文件中
          hack: `true; @import (reference) "${path.resolve('src/assets/less/main.less')}";`
        },
        javascriptEnabled: true
      }
    }
  }
})

// @import (reference) "${path.resolve('src/assets/less/main.less')}";：
// 这是引入一个 Less 文件的语法，路径是通过 Node.js 的 path.resolve 来获取的
// @import (reference) 表示引入文件但不将其编译输出，而是作为引用关系存在。
// hack: 'true;'：这是一种 hack 的写法，它确保这个 @import 语句在 Less 编译过程中被执行，
// 但不会在最终的 CSS 输出中生成。这个写法可能在特定的情境下用于触发 Less 的编译行为。
