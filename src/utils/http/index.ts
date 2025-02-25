import axios, { AxiosError, AxiosInstance } from 'axios'
import { TAxiosOption, TAxiosRequestConfig, TAxiosResopnse } from './type'
import { showFullScreenLoading, hideFullScreenLoading } from '@/components/mLoading/fullScreen'
import { useUserStore } from '@/stores/modules/user'
import { AxiosCanceler } from './axiosCancel'
import { ResultEnum } from '@/enums/httpEnums'
import { checkStatus } from '@/utils/http/checkStatus'
// import router from "@/routers";

const axiosCanceler = new AxiosCanceler()
const config: TAxiosOption = {
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 60 * 1000,
	headers: {
		Accept: 'application/json,text/plain,*/*'
	},
	isShowErrorMsg: false,
	loading: true
}

class TRequest {
	instance: AxiosInstance
	constructor(config: TAxiosOption) {
		this.instance = axios.create(config)
		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
		 */
		this.instance.interceptors.request.use(
			(config: TAxiosRequestConfig) => {
				//当前重复请求不需要取消，在api服务中通过指定第三个参数：{cancel:true} 来决定是否取消
				config.cancel ??= true
				if (config.cancel) axiosCanceler.addPending(config)
				//当前请求不需要显示loading，在api服务中通过指定第三个参数：{loading:false} 来决定是否显示
				config.loading ??= true
				if (config.loading) showFullScreenLoading()
				//添加token
				const { token } = useUserStore()
				if (token) config.headers.Authorization = token
				return config
			},
			(error: AxiosError) => {
				return Promise.reject(error)
			}
		)
		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.instance.interceptors.response.use(
			(response: TAxiosResopnse) => {
				const { data, config } = response
				const useStore = useUserStore()
				axiosCanceler.removePending(config)
				if (config.loading) hideFullScreenLoading()
				//登录失败
				if (data.code === ResultEnum.OVERDUE) {
					useStore.setToken('')
					//TODO:跳转至登录页面
					// router.push(LOGIN_URL)
					ElMessage.error(data.msg)
					return Promise.reject(data)
				}
				//全局错误信息拦截（防止下载文件的时候返回数据流，没有code直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					ElMessage.error(data.msg)
					return Promise.reject(data)
				}
				//成功请求（在页面上非特殊情况，否则不用处理失败逻辑）
				return data
			},
			async (error: AxiosError) => {
				const { response } = error
				hideFullScreenLoading()
				//请求超时&&网络错误单独判断，没有response
				if (error.message.includes('timeout')) ElMessage.error('请求超时！请您稍后再试')
				if (error.message.includes('Network Error')) ElMessage.error('网络错误！请您稍后再试')
				// 服务器结果状态码
				if (response) checkStatus(response.status)
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理：可以跳转到断网页面
				// if(!window.navigator.onLine) router.push('/500')
				return Promise.reject(error)
			}
		)
	}

	get<T, U>(url: string, data?: U, config = {}): Promise<T> {
		return this.instance.get(url, { params: data, ...config })
	}
	post<T, U>(url: string, data?: U, config = {}): Promise<T> {
		return this.instance.post(url, data, config)
	}
	put<T, U>(url: string, data?: U, config = {}): Promise<T> {
		return this.instance.put(url, data, config)
	}
	delete<T, U>(url: string, data?: U, config = {}): Promise<T> {
		return this.instance.delete(url, { params: data, ...config })
	}
	download<T, U>(url: string, data?: U, config = {}): Promise<T> {
		return this.instance.post(url, data, { ...config, responseType: 'blob' })
	}
}
export default new TRequest(config)
