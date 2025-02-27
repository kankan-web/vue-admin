/*
 * @Description: mock/index.ts入口文件
 * 自动递归导入mock文件夹下的所有（文件）模块【含export、default导出】
 * 无需使用import导入
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const directoryPath = __dirname

// 递归遍历文件夹
function getFilesPath(dir, filelist: string[] = []) {
	const files = fs.readdirSync(dir)
	files.forEach(file => {
		const filepath = path.join(dir, file)
		const stat = fs.statSync(filepath)
		if (stat.isDirectory()) {
			filelist = getFilesPath(filepath, filelist)
		} else {
			filelist.push(filepath)
		}
	})
	return filelist
}

async function loadMockFiles() {
	try {
		// 使用 Array.from 替代扩展运算符
		const filteredFiles = getFilesPath(directoryPath).filter(file => !/index.tsx?|.mjs$/.test(file))
		const allFiles = Array.from(new Set(filteredFiles))

		return await Promise.all(
			allFiles.map(filename => {
				const name = `${filename.replace(directoryPath + '/', '')}`
				// PS: 这里动态import直接变量名不行，必须用./
				return import(`./${name}`)
					.then(module => {
						return Array.prototype.concat(...Object.values(module))
					})
					.catch(console.error)
			})
		)
	} catch (err) {
		console.log('Unable to scan directory: ' + err)
		return []
	}
}
// 自动读取mock下的文件、导出所有模块（export、default导出都支持）
export default (await loadMockFiles()).flat(Infinity)
