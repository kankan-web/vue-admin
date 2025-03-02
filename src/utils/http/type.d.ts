import { TAxiosRequestConfig } from './types.d'
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export interface TAxiosRequestConfig extends AxiosRequestConfig {
	cancel?: boolean // 是否重复取消请求
	loading?: boolean // 是否显示加载中
	beforeRequestCallback?: (request: TAxiosRequestConfig) => TAxiosRequestConfig
	beforeResponseCallback?: (response: TAxiosRequestConfig) => TAxiosRequestConfig
}

export interface TAxiosResponseConfig extends AxiosResponse {
	config: TAxiosRequestConfig
}

export interface TAxiosError extends AxiosError {
	config: TAxiosRequestConfig // 覆盖 config 类型
	isCancelRequest?: boolean
}
