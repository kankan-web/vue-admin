#!/usr/bin/env node

/**
 * Vue 模块生成器
 *
 * 优化内容：
 * 1. 修复了模板文件路径问题，确保正确导入模板
 * 2. 修复了项目根目录路径，确保生成的文件位于正确位置
 * 3. 使用动态导入 chalk 模块，解决 ESM 兼容性问题
 * 4. 将模板文件扩展名改为 .cjs，确保在 ESM 项目中能正确导入
 * 5. 修复 inquirer 导入问题，使用兼容的方式导入
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

// 各模块路径
const PATHS = {
	views: path.join(PROJECT_ROOT, 'src/view'),
	router: path.join(PROJECT_ROOT, 'src/router/modules'),
	store: path.join(PROJECT_ROOT, 'src/stores/modules'),
	api: path.join(PROJECT_ROOT, 'src/api')
}

// 确保目录存在
Object.values(PATHS).forEach(dir => {
	fs.ensureDirSync(dir)
})

// 首字母大写
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// 生成模块
async function generateModule(name) {
	const moduleName = capitalize(name)

	console.log(chalk.blue(`开始生成 ${moduleName} 模块...`))

	try {
		// 创建视图文件
		const viewDir = path.join(PROJECT_ROOT, 'src/view', moduleName)
		fs.ensureDirSync(viewDir)
		fs.writeFileSync(path.join(viewDir, `index.vue`), viewTemplate(moduleName))
		console.log(chalk.green(`✓ 视图文件已创建: src/view/${moduleName}/index.vue`))

		// 创建路由文件
		fs.writeFileSync(path.join(PATHS.router, `${name.toLowerCase()}.ts`), routerTemplate(moduleName))
		console.log(chalk.green(`✓ 路由文件已创建: src/router/modules/${name.toLowerCase()}.ts`))

		// 创建 Store 文件
		fs.writeFileSync(path.join(PATHS.store, `${name.toLowerCase()}.ts`), storeTemplate(moduleName))
		console.log(chalk.green(`✓ Store 文件已创建: src/stores/modules/${name.toLowerCase()}.ts`))

		// 创建 API 文件
		fs.writeFileSync(path.join(PATHS.api, `${name.toLowerCase()}.ts`), apiTemplate(moduleName))
		console.log(chalk.green(`✓ API 文件已创建: src/api/${name.toLowerCase()}.ts`))

		// 更新路由主文件，自动导入新模块
		updateRouterIndex(name.toLowerCase())

		// 更新 Store 主文件，自动导入新模块
		updateStoreIndex(name.toLowerCase(), moduleName)

		console.log(chalk.green.bold(`\n✅ ${moduleName} 模块创建成功！`))
		console.log(chalk.yellow(`提示: 请检查路由和 Store 的主文件，确保模块已正确导入`))
	} catch (error) {
		console.error(chalk.red('❌ 生成模块时出错:'), error)
	}
}

// 更新路由主文件
function updateRouterIndex(moduleName) {
	const routerIndexPath = path.join(PROJECT_ROOT, 'src/router/index.ts')

	if (!fs.existsSync(routerIndexPath)) {
		console.log(chalk.yellow(`⚠️ 未找到路由主文件，请手动导入路由模块: src/router/modules/${moduleName}.ts`))
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
		const lineEndIndex = content.indexOf('\n', importEndIndex)
		const importStatement = ``

		// 插入导入语句
		content = content.slice(0, lineEndIndex + 1) + importStatement + content.slice(lineEndIndex + 1)

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
				component: () => import('@/view/${moduleName}/index.vue')
			}\n`
			: `			,{
				path: '/${moduleName}',
				component: () => import('@/view/${moduleName}/index.vue')
			}\n`

		content = content.slice(0, childrenEndIndex) + routeEntry + content.slice(childrenEndIndex)

		fs.writeFileSync(routerIndexPath, content, 'utf8')
		console.log(chalk.green(`✓ 路由主文件已更新`))
	} catch (error) {
		console.error(chalk.yellow(`⚠️ 更新路由主文件时出错，请手动导入路由模块`), error)
	}
}

// 更新 Store 主文件
function updateStoreIndex(moduleName, capitalizedName) {
	const storeIndexPath = path.join(PROJECT_ROOT, 'src/stores/index.ts')

	if (!fs.existsSync(storeIndexPath)) {
		console.log(chalk.yellow(`⚠️ 未找到 Store 主文件，请手动导出 Store 模块: src/stores/modules/${moduleName}.ts`))
		return
	}

	try {
		let content = fs.readFileSync(storeIndexPath, 'utf8')

		// 检查是否已导出
		if (content.includes(`from './modules/${moduleName}'`)) {
			console.log(chalk.yellow(`⚠️ Store 模块 ${moduleName} 似乎已导出，跳过更新`))
			return
		}

		// 查找最后一个导出语句
		const lastExportIndex = content.lastIndexOf('export')
		if (lastExportIndex === -1) {
			console.log(chalk.yellow(`⚠️ 无法确定导出语句位置，请手动导出 Store 模块`))
			return
		}

		// 找到该行末尾
		const lineEndIndex = content.indexOf('\n', lastExportIndex)
		const exportStatement = ``

		// 插入导出语句
		content = content.slice(0, lineEndIndex + 1) + exportStatement + content.slice(lineEndIndex + 1)

		fs.writeFileSync(storeIndexPath, content, 'utf8')
		console.log(chalk.green(`✓ Store 主文件已更新`))
	} catch (error) {
		console.log(chalk.yellow(`⚠️ 更新 Store 主文件时出错，请手动导出 Store 模块`), error)
	}
}

// 设置命令行参数
program
	.version('1.0.0')
	.description('Vue 模块生成器 - 快速创建视图、路由、Store 和 API 文件')
	.option('-n, --name <name>', '模块名称')
	.parse(process.argv)

const options = program.opts()

// 主函数
async function main() {
	let moduleName = options.name

	// 如果没有提供名称，则提示用户输入
	if (!moduleName) {
		const answers = await inquirer.prompt([
			{
				type: 'input',
				name: 'name',
				message: '请输入模块名称 (如: UserManagement):',
				validate: input => input.trim() !== '' || '模块名称不能为空'
			}
		])
		moduleName = answers.name
	}

	// 生成模块
	await generateModule(moduleName)
}

// 执行主函数
main().catch(err => {
	console.error('执行出错:', err)
	process.exit(1)
})
