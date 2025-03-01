import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
// import eslintPluginPrettier from "eslint-plugin-prettier";

const __dirname = dirname(fileURLToPath(import.meta.url))
const autoImportConfig = JSON.parse(readFileSync(resolve(__dirname, '.eslintrc-auto-import.json'), 'utf-8'))

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts,vue}'] },
	{ languageOptions: { globals: { ...globals.browser, ...autoImportConfig.globals } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		files: ['**/*.vue'],
		languageOptions: { parserOptions: { parser: tseslint.parser } }
	},
	{
		rules: {
			'vue/multi-word-component-names': 'off',
			'@typescript-eslint/no-require-imports': 'off' // 禁用此规则
		}
	},
	{ ignores: ['dist/**', 'node_modules/**', '.commitlintrc.js', 'types/**'] }
	// eslintPluginPrettier.recommended,
]
