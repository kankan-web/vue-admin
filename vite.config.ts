/**
 * 关于ElementPlus按需加载的配置可以参考：
 * https://github.dev/sxzz/element-plus-best-practices
 */

import { defineConfig } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

//Element plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

//mock vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock'

const pathSrc = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
	//设置别名
	resolve: {
		alias: {
			'@': pathSrc
		}
	},
	//服务端渲染
	server: {
		port: 8080,
		host: '0.0.0.0',
		//本地跨域代理：https://cn.vitejs.dev/config/server-options.html#server-proxy
		proxy: {}
	},
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			eslintrc: {
				enabled: true, // 启用 ESLint 配置生成
				filepath: './.eslintrc-auto-import.json', // 生成的配置文件路径
				globalsPropValue: true // 声明全局变量
			},
			//自动导入Vue相关函数，如：ref，reactive，toRef等
			imports: ['vue'],
			//自动导入目录下的模块出口,默认情况下只扫描目录下的一级模块
			dirs: [path.resolve(pathSrc, './components/**')],
			//自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
			resolvers: [ElementPlusResolver()],
			//自动导入 Vue 模板
			vueTemplate: true,
			//指定生成的类型声明文件的路径
			dts: path.resolve(pathSrc, 'typings', 'auto-imports.d.ts')
		}),
		//自动导入Vue组件
		Components({
			// eslintrc: {
			// 	enabled: true,
			// 	filepath: './.eslintrc-components.json'
			// },
			dirs: [path.resolve(pathSrc, './components/**')],
			resolvers: [
				//自动导入Element Plus 组件
				ElementPlusResolver()
			],
			dts: path.resolve(pathSrc, 'typings', 'components.d.ts')
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
			symbolId: 'icon-[name]'
		}),
		viteMockServe({
			mockPath: './mock'
		})
	],
	optimizeDeps: {
		include: ['dhtmlx-gantt']
	}
})
