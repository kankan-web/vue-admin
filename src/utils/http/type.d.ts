import { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

export type TAxiosOption = {
	headers: object
	baseURL: string
	timeout: number
	isShowErrorMsg: boolean
	loading: boolean
}
export interface TAxiosRequestConfig extends InternalAxiosRequestConfig {
	cancel?: boolean
	loading?: boolean
}
export interface TAxiosResopnse extends AxiosResponse {
	config: TAxiosRequestConfig
}
