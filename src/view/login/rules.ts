// import i18n from '@/i18n'
import type { FormItemRule } from 'element-plus'

export const validatePassword = () => {
	return (rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
		if (value.length < 6) {
			callback(new Error('密码不能小于6位'))
		} else {
			callback()
		}
	}
}
