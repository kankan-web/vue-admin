/**
 * 关于ElementPlus按需加载的配置可以参考：
 * https://github.dev/sxzz/element-plus-best-practices
 */

import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { root, pathResolve } from '../utils/index'

//Element plus按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//SVG 图标目前使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：https://github.com/vbenjs/vite-plugin-svg-icons
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

//mock vite-plugin-mock
import { viteMockServe } from 'vite-plugin-mock'

// const pathSrc = path.resolve(__dirname, './src')
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, root, '../env')
	const isDev = mode === 'development'
	return {
		base: env.VITE_BASE_URL,
		//服务端渲染
		server: {
			port: 4000,
			host: '0.0.0.0',
			//本地跨域代理：https://cn.vitejs.dev/config/server-options.html#server-proxy
			proxy: {}
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, '../../src'),
				'@assets': resolve(__dirname, '../../src/assets'),
				'@components': resolve(__dirname, '../../src/components'),
				'@styles': resolve(__dirname, '../../src/styles')
			}
		},
		// https://vitejs.cn/vite5-cn/config/shared-options.html#envdir
		envDir: resolve(__dirname, '../env'),
		build: {
			// https://cn.vitejs.dev/guide/build.html#browser-compatibility
			target: ['es2015', 'chrome52'],
			sourcemap: false,
			// 消除打包大小超过500kb警告
			// chunkSizeWarningLimit: 4000,
			rollupOptions: {
				input: {
					index: pathResolve('./index.html', import.meta.url)
				},
				// 静态资源分类打包
				output: {
					chunkFileNames: 'static/js/[name]-[hash].js',
					entryFileNames: 'static/js/[name]-[hash].js',
					assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
				}
			},
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			}
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
				dirs: ['src/components'],
				//自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				resolvers: [ElementPlusResolver()],
				//自动导入 Vue 模板
				vueTemplate: true,
				//指定生成的类型声明文件的路径
				dts: pathResolve('../types/auto-imports.d.ts')
			}),
			//自动导入Vue组件
			Components({
				// eslintrc: {
				// 	enabled: true,
				// 	filepath: './.eslintrc-components.json'
				// }
				dirs: ['src/components'],
				resolvers: [
					//自动导入Element Plus 组件
					ElementPlusResolver()
				],
				dts: pathResolve('../types/components.d.ts')
			}),
			createSvgIconsPlugin({
				iconDirs: [pathResolve('src/assets/svg')],
				symbolId: 'icon-[name]'
			}),
			isDev &&
				viteMockServe({
					mockPath: 'mock', //mock文件路径
					enable: true, //是否启用
					watchFiles: true, //是否监听文件
					logger: true //是否打印日志
				})
		],
		css: {
			// 开启 CSS source maps
			devSourcemap: true,

			// CSS 预处理器配置
			preprocessorOptions: {
				scss: {
					// 全局引入变量和 mixin
					additionalData: `
            @import "@/style/variables.scss";
          `
				},
				less: {
					// less 配置
					javascriptEnabled: true,
					// 定义全局变量
					modifyVars: {
						'primary-color': '#1890ff'
					}
				}
			},

			// CSS 模块化配置
			modules: {
				// 自定义生成的类名
				generateScopedName: mode === 'development' ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:8]'
			}
		}
		// // 优化依赖
		// optimizeDeps: {
		// 	include: ['dhtmlx-gantt']
		// }
	}
})
