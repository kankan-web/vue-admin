#!/usr/bin/env node

/**
 * 生成模块
 * @param {string} name 模块名称
 * @param {object} options 选项
 * @param {string} options.directory 生成目录
 * @param {string} options.type 生成类型
 * @example
 * # 生成所有类型的模块，使用默认目录
 * node scripts/template/generate.js -n UserManagement
 * # 指定生成目录
 * node scripts/template/generate.js -n UserManagement -d src/modules
 * # 只生成视图和API
 * node scripts/template/generate.js -n UserManagement -t view
 * node scripts/template/generate.js -n UserManagement -t api
 * # 只生成路由
 * node scripts/template/generate.js -n UserManagement -t router
 * # 指定目录和类型
 * node scripts/template/generate.js -n UserManagement -d custom/path -t store
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { program } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import process from 'process' // 添加这一行以导入 process 模块

// 导入模板
import viewTemplate from './view.template.js'
import routerTemplate from './router.template.js'
import storeTemplate from './store.template.js'
import apiTemplate from './api.template.js'

// 获取 __dirname 等价物
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 项目根目录
const PROJECT_ROOT = path.resolve(__dirname, '../..')

// 默认各模块路径
const DEFAULT_PATHS = {
	views: path.join(PROJECT_ROOT, 'src/view'),
	router: path.join(PROJECT_ROOT, 'src/router/modules'),
	store: path.join(PROJECT_ROOT, 'src/stores/modules'),
	api: path.join(PROJECT_ROOT, 'src/api')
}

// 模板类型
const TEMPLATE_TYPES = ['all', 'view', 'router', 'store', 'api']

// 首字母大写
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// 生成模块
async function generateModule(name, options) {
	const moduleName = capitalize(name)
	const { directory, type } = options

	// 根据用户指定的目录创建自定义路径
	const PATHS = { ...DEFAULT_PATHS }

	if (directory) {
		const customDir = path.join(PROJECT_ROOT, directory)
		PATHS.views = path.join(customDir, 'view')
		PATHS.router = path.join(customDir, 'router/modules')
		PATHS.store = path.join(customDir, 'stores/modules')
		PATHS.api = path.join(customDir, 'api')
	}

	// 确保目录存在
	Object.values(PATHS).forEach(dir => {
		fs.ensureDirSync(dir)
	})

	console.log(chalk.blue(`开始生成 ${moduleName} 模块...`))
	console.log(chalk.blue(`生成目录: ${directory || 'src'}`))
	console.log(chalk.blue(`生成类型: ${type || 'all'}`))

	try {
		// 根据类型生成对应文件
		const shouldGenerateAll = type === 'all' || !type

		// 创建视图文件
		if (shouldGenerateAll || type === 'view') {
			const viewDir = path.join(PATHS.views, moduleName) // 生成视图文件目录
			fs.ensureDirSync(viewDir) // 确保目录存在
			fs.writeFileSync(path.join(viewDir, `index.vue`), viewTemplate(moduleName)) // 创建视图文件
			console.log(chalk.green(`✓ 视图文件已创建: ${path.relative(PROJECT_ROOT, viewDir)}/index.vue`))
		}

		// 创建路由文件
		if (shouldGenerateAll || type === 'router') {
			fs.writeFileSync(path.join(PATHS.router, `${name.toLowerCase()}.ts`), routerTemplate(moduleName))
			console.log(chalk.green(`✓ 路由文件已创建: ${path.relative(PROJECT_ROOT, PATHS.router)}/${name.toLowerCase()}.ts`))
		}

		// 创建 Store 文件
		if (shouldGenerateAll || type === 'store') {
			fs.writeFileSync(path.join(PATHS.store, `${name.toLowerCase()}.ts`), storeTemplate(moduleName))
			console.log(chalk.green(`✓ Store 文件已创建: ${path.relative(PROJECT_ROOT, PATHS.store)}/${name.toLowerCase()}.ts`))
		}

		// 创建 API 文件
		if (shouldGenerateAll || type === 'api') {
			fs.writeFileSync(path.join(PATHS.api, `${name.toLowerCase()}.ts`), apiTemplate(moduleName))
			console.log(chalk.green(`✓ API 文件已创建: ${path.relative(PROJECT_ROOT, PATHS.api)}/${name.toLowerCase()}.ts`))
		}

		// 只有在生成全部或路由时才更新路由主文件
		if (shouldGenerateAll || type === 'router') {
			// 更新路由主文件，自动导入新模块
			updateRouterIndex(name.toLowerCase(), directory)
		}

		// // 只有在生成全部或store时才更新Store主文件，【有需要才执行】
		// if (shouldGenerateAll || type === 'store') {
		// 	// 更新 Store 主文件，自动导入新模块
		// 	updateStoreIndex(name.toLowerCase(), directory)
		// }

		console.log(chalk.green.bold(`\n✅ ${moduleName} 模块创建成功！`))
		console.log(chalk.yellow(`提示: 请检查路由和 Store 的主文件，确保模块已正确导入`))
	} catch (error) {
		console.error(chalk.red('❌ 生成模块时出错:'), error)
	}
}

// 更新路由主文件
function updateRouterIndex(moduleName, directory) {
	const routerDir = directory ? path.join(PROJECT_ROOT, directory, 'router') : path.join(PROJECT_ROOT, 'src/router')
	const routerIndexPath = path.join(routerDir, 'index.ts')

	// 检查路由主文件是否存在
	if (!fs.existsSync(routerIndexPath)) {
		console.log(
			chalk.yellow(`⚠️ 未找到路由主文件，请手动导入路由模块: ${path.relative(PROJECT_ROOT, routerDir)}/modules/${moduleName}.ts`)
		)
		return
	}

	try {
		let content = fs.readFileSync(routerIndexPath, 'utf8')

		// 检查是否已导入
		if (content.includes(`from './modules/${moduleName}'`)) {
			console.log(chalk.yellow(`⚠️ 路由模块 ${moduleName} 似乎已导入，跳过更新`))
			return
		}

		// 查找导入语句块的结束位置
		const importEndIndex = content.lastIndexOf('import')
		if (importEndIndex === -1) {
			console.log(chalk.yellow(`⚠️ 无法确定导入语句位置，请手动导入路由模块`))
			return
		}

		// 找到该行末尾
		// const lineEndIndex = content.indexOf('\n', importEndIndex)
		// const importStatement = `import ${moduleName}Routes from './modules/${moduleName}'\n`

		// 插入导入语句
		// content = content.slice(0, lineEndIndex + 1) + importStatement + content.slice(lineEndIndex + 1)

		// 查找路由数组
		const routesMatch = content.match(/const\s+routes\s*:\s*RouteRecordRaw\[\]\s*=\s*\[([\s\S]*?)\]/m)
		if (!routesMatch) {
			console.log(chalk.yellow(`⚠️ 无法找到路由数组，请手动添加路由模块`))
			return
		}

		// 找到Layout组件的children数组
		const layoutMatch = content.match(/component\s*:\s*Layout\s*,\s*children\s*:\s*\[([\s\S]*?)\]/m)
		if (!layoutMatch) {
			console.log(chalk.yellow(`⚠️ 无法找到Layout组件的children数组，请手动添加路由模块`))
			return
		}

		// 在children数组末尾添加新路由
		const childrenEndIndex = layoutMatch.index + layoutMatch[0].lastIndexOf(']')
		const routeEntry = content.slice(layoutMatch.index, childrenEndIndex).trim().endsWith(',')
			? `			{
				path: '/${moduleName}',
				component: () => import('@/view/${capitalize(moduleName)}/index.vue')
			}\n`
			: `			,{
				path: '/${moduleName}',
				component: () => import('@/view/${capitalize(moduleName)}/index.vue')
			}\n`

		content = content.slice(0, childrenEndIndex) + routeEntry + content.slice(childrenEndIndex)

		fs.writeFileSync(routerIndexPath, content, 'utf8')
		console.log(chalk.green(`✓ 路由主文件已更新`))
	} catch (error) {
		console.error(chalk.yellow(`⚠️ 更新路由主文件时出错，请手动导入路由模块`), error)
	}
}

// // 更新 Store 主文件，【有需要才执行】
// function updateStoreIndex(moduleName, directory) {
// 	const storeDir = directory ? path.join(PROJECT_ROOT, directory, 'stores') : path.join(PROJECT_ROOT, 'src/stores')
// 	const storeIndexPath = path.join(storeDir, 'index.ts')

// 	if (!fs.existsSync(storeIndexPath)) {
// 		console.log(
// 			chalk.yellow(
// 				`⚠️ 未找到 Store 主文件，请手动导出 Store 模块: ${path.relative(PROJECT_ROOT, storeDir)}/modules/${moduleName}.ts`
// 			)
// 		)
// 		return
// 	}

// 	try {
// 		let content = fs.readFileSync(storeIndexPath, 'utf8')

// 		// 检查是否已导出
// 		if (content.includes(`from './modules/${moduleName}'`)) {
// 			console.log(chalk.yellow(`⚠️ Store 模块 ${moduleName} 似乎已导出，跳过更新`))
// 			return
// 		}

// 		// 查找最后一个导出语句
// 		const lastExportIndex = content.lastIndexOf('export')
// 		if (lastExportIndex === -1) {
// 			console.log(chalk.yellow(`⚠️ 无法确定导出语句位置，请手动导出 Store 模块`))
// 			return
// 		}

// 		// 找到该行末尾
// 		// const lineEndIndex = content.indexOf('\n', lastExportIndex)
// 		// const exportStatement = `export { use${capitalize(moduleName)}Store } from './modules/${moduleName}'\n`

// 		// 插入导出语句
// 		// content = content.slice(0, lineEndIndex + 1) + exportStatement + content.slice(lineEndIndex + 1)

// 		fs.writeFileSync(storeIndexPath, content, 'utf8')
// 		console.log(chalk.green(`✓ Store 主文件已更新`))
// 	} catch (error) {
// 		console.log(chalk.yellow(`⚠️ 更新 Store 主文件时出错，请手动导出 Store 模块`), error)
// 	}
// }

// 设置命令行参数
program
	.version('1.0.0')
	.description('Vue 模块生成器 - 快速创建视图、路由、Store 和 API 文件')
	.option('-n, --name <name>', '模块名称')
	.option('-d, --directory <path>', '指定生成目录，相对于项目根目录 (默认: src)')
	.option('-t, --type <type>', `指定生成的模板类型 (${TEMPLATE_TYPES.join('|')})`, 'all')
	.parse(process.argv)

const options = program.opts()

// 主函数
async function main() {
	let moduleName = options.name
	const { directory, type } = options

	// 验证模板类型
	if (type && !TEMPLATE_TYPES.includes(type)) {
		console.error(chalk.red(`❌ 无效的模板类型: ${type}`))
		console.log(chalk.yellow(`有效的模板类型: ${TEMPLATE_TYPES.join(', ')}`))
		process.exit(1)
	}

	// 如果没有提供名称，则提示用户输入
	if (!moduleName) {
		const answers = await inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: '请输入模块名称 (如: UserManagement):',
				validate: input => input.trim() !== '' || '模块名称不能为空'
			},
			{
				type: 'input',
				name: 'directory',
				message: '请输入生成目录 (相对于项目根目录，留空使用默认值 src):',
				default: directory || ''
			},
			{
				type: 'list',
				name: 'type',
				message: '请选择要生成的模板类型:',
				choices: TEMPLATE_TYPES,
				default: type || 'all'
			}
		])
		moduleName = answers.name
		options.directory = answers.directory || directory
		options.type = answers.type || type
	}

	// 生成模块
	await generateModule(moduleName, options)
}

// 执行主函数
main().catch(err => {
	console.error('执行出错:', err)
	process.exit(1)
})
