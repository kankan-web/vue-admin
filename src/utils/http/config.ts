import { TAxiosRequestConfig, TAxiosError } from './type'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { showFullScreenLoading, hideFullScreenLoading } from '@/components/mLoading/fullScreen'

export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401,
	TIMEOUT = 10000,
	TYPE = 'success'
}

// 默认配置
export const defaultConfig: TAxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL || '',
	timeout: 10000,
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
	loading: true, // 显示加载中
	cancel: true // 取消重复请求
}

// 获取token
export function getToken(): string {
	// 从localStorage或pinia/vuex中获取token
	// 这里使用一个示例实现
	const { token } = useUserStore()
	return token || ''
}

// 添加token到请求头
export function addTokenToHeader(config: TAxiosRequestConfig): void {
	const token = getToken()
	if (token) {
		config.headers = config.headers || {}
		config.headers['Authorization'] = `Bearer ${token}`
	}
}

// 显示加载动画
export function showLoading(config: TAxiosRequestConfig): void {
	if (config.loading) {
		showFullScreenLoading()
	}
}

// 隐藏加载动画
export function hideLoading(config: TAxiosRequestConfig): void {
	if (config.loading) {
		hideFullScreenLoading()
	}
}

// 处理HTTP状态码
export function checkStatus(status: number): void {
	switch (status) {
		case 400:
			ElMessage.error('请求错误(400)')
			break
		case 401:
			ElMessage.error('未授权，请重新登录(401)')
			// 这里可以处理登出逻辑
			break
		case 403:
			ElMessage.error('拒绝访问(403)')
			break
		case 404:
			ElMessage.error('请求出错(404)')
			break
		case 408:
			ElMessage.error('请求超时(408)')
			break
		case 500:
			ElMessage.error('服务器错误(500)')
			break
		case 501:
			ElMessage.error('服务未实现(501)')
			break
		case 502:
			ElMessage.error('网络错误(502)')
			break
		case 503:
			ElMessage.error('服务不可用(503)')
			break
		case 504:
			ElMessage.error('网络超时(504)')
			break
		case 505:
			ElMessage.error('HTTP版本不受支持(505)')
			break
		default:
			ElMessage.error(`连接出错(${status})!`)
	}
}

// 处理错误信息
export function handleNetworkError(error: TAxiosError): void {
	let message = '未知错误'
	if (error.message) {
		if (error.message.includes('timeout')) {
			message = '网络请求超时'
		} else if (error.message.includes('Network Error')) {
			message = '网络连接错误'
		} else {
			message = error.message
		}
	}
	ElMessage.error(message)
}

// 处理业务错误
export function handleBusinessError(data: any): boolean {
	// 如果没有code，说明不是标准响应格式（如二进制流）
	if (!data || !data.code) {
		return false
	}

	// 处理不同的业务状态码
	switch (data.code) {
		case ResultEnum.SUCCESS:
			return false
		case ResultEnum.OVERDUE:
			ElMessage.error(data.msg || '登录已过期，请重新登录')
			// 这里可以处理登出逻辑
			localStorage.removeItem('token')
			// router.push('/login')
			return true
		default:
			ElMessage.error(data.msg || '请求失败')
			return true
	}
}
