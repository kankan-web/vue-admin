import request from '@/utils/http/index'

// 定义API响应类型
export interface ApiResponse<T> {
	code: number
	msg: string
	data: T
}

// 部门接口定义
export interface Department {
	id: string
	name: string
	children?: Department[]
}

// 获取用户部门列表
export const getUserDepartment = (): Promise<ApiResponse<Department[]>> => {
	return request.get('/user/department')
}
