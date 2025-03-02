import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { TAxiosRequestConfig, TAxiosResponseConfig, TAxiosError } from './type'
import {
	defaultConfig,
	addTokenToHeader,
	showLoading,
	hideLoading,
	checkStatus,
	handleNetworkError,
	handleBusinessError
} from './config'
import { AxiosCanceler } from './axiosCancel'

/**
 * @description 请求封装
 * @example
 * const res = await http.get('/api/users')
 * const res = await http.post('/api/users', { name: 'John' })
 * const res = await http.put('/api/users', { name: 'John' })
 * const res = await http.delete('/api/users', { name: 'John' })
 * const res = await http.download('/api/users', { name: 'John' })
 * const res = await http.upload('/api/users', { name: 'John' })
 * @example 取消请求
 * http.cancelRequest('/api/users') // 取消指定URL的请求
 * http.cancelAllRequests() // 取消所有请求
 * http.showLoading() // 显示加载动画
 * http.hideLoading() // 隐藏加载动画
 */

// 创建取消请求实例
export const axioCanceler = new AxiosCanceler()

class TRequest {
	/* axios实例 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

	constructor() {
		this.httpInterceptorsRequest()
		this.httpInterceptorsResponse()
	}

	/**
	 * @description 批量取消请求
	 * @example onUnMount(() => {http.cancelAllRequests()})
	 */
	public cancelAllRequests(): void {
		axioCanceler.removeAllPending()
	}

	/**
	 * @description 取消指定 URL 的请求
	 * @param url
	 * @example http.cancelRequest('/api/users');
	 */
	public cancelRequest(url: string): void {
		axioCanceler.removeByUrl(url)
	}

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		TRequest.axiosInstance.interceptors.request.use(
			(config: TAxiosRequestConfig): Promise<any> => {
				//1. 针对单个请求的自定义回调
				if (typeof config.beforeRequestCallback === 'function') {
					config = config.beforeRequestCallback(config)
				}
				//2. 显示加载动画
				showLoading(config)
				//3. 添加取消请求
				if (config.cancel) {
					axioCanceler.addPending(config)
				}
				//4. 添加token到请求头
				addTokenToHeader(config)
				//5. 请求之前
				return Promise.resolve(config)
			},
			(error: TAxiosError) => {
				const config = error.config
				//6.隐藏loading
				hideLoading(config)
				return Promise.reject(error)
			}
		)
	}

	/** 响应拦截 */
	private httpInterceptorsResponse(): void {
		TRequest.axiosInstance.interceptors.response.use(
			(response: TAxiosResponseConfig) => {
				const { config, data } = response

				// 执行响应前回调
				if (typeof config.beforeResponseCallback === 'function') {
					config.beforeResponseCallback(config)
				}

				// 隐藏加载动画
				hideLoading(config)

				// 处理业务错误
				if (handleBusinessError(data)) {
					return Promise.reject(data)
				}

				// 请求完成后，删除对应的cancelToken
				if (config.cancel) {
					axioCanceler.removePending(config)
				}

				// 响应成功
				return response.data
			},
			(error: TAxiosError) => {
				// 响应错误
				const config = error.config

				// 隐藏加载动画
				if (config) {
					hideLoading(config)
				}

				// 请求出错时，也需要删除对应的cancelToken
				if (error.config && error.config.cancel) {
					axioCanceler.removePending(error.config)
				}

				// 标记取消请求
				error.isCancelRequest = Axios.isCancel(error)

				// 处理网络错误
				if (!error.isCancelRequest) {
					handleNetworkError(error)
				}

				// 处理HTTP状态码错误
				if (error.response) {
					checkStatus(error.response.status)
				}

				// 处理断网情况
				if (!window.navigator.onLine) {
					console.log('网络已断开，请检查网络连接')
					// router.replace('/500')
				}

				return Promise.reject(error)
			}
		)
	}

	/**常用方法封装 */
	public post<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.post(url, params, config)
	}

	public get<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.get(url, { params, ...config })
	}

	public put<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.put(url, params, config)
	}

	public delete<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.delete(url, { params, ...config })
	}

	public download<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.post(url, params, {
			...config,
			responseType: 'blob'
		})
	}

	public upload<T>(url: string, formData: FormData, config?: TAxiosRequestConfig): Promise<T> {
		return TRequest.axiosInstance.post(url, formData, {
			...config,
			headers: {
				'Content-Type': 'multipart/form-data',
				...((config?.headers as Record<string, unknown>) || {})
			}
		})
	}
}

export const http = new TRequest()
