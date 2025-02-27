import { reactive, toRefs } from 'vue'

// 定义接口和类型
interface Pageable {
	pageNum: number
	pageSize: number
	total: number
}

// 定义表格数据类型
interface TableData {
	[key: string]: unknown
}

// 定义API响应类型
interface ApiResponse<T> {
	success: boolean
	data: T
	code?: number
	message?: string
}

// 定义分页响应数据类型
interface PageResult<T> {
	list: T[]
	total: number
	[key: string]: unknown
}

// 定义参数类型
type ParamType = Record<string, unknown>

/**
 * @description 表格操作hooks
 * @param {Function} api 请求接口
 * @param {Function} searchApi 搜索接口
 * @param {Object} initParam 初始化参数
 * @param {Boolean} isPageable 是否分页
 * @param {Function} dataCallback 数据回调
 * @param {Function} requestError 请求错误
 */
interface Props {
	api: (params: ParamType) => Promise<ApiResponse<PageResult<TableData> | TableData[]>>
	searchApi?: (params: ParamType) => Promise<ApiResponse<PageResult<TableData> | TableData[]>>
	initParam?: ParamType
	isPageable?: boolean
	dataCallback?: (data: PageResult<TableData> | TableData[]) => PageResult<TableData> | TableData[]
	requestError?: (error: Error) => void
}

// 添加默认参数类型
const defaultProps: Partial<Props> = {
	isPageable: true,
	initParam: {}
}

export const useTable = (props: Props) => {
	// 合并默认参数
	const { api, initParam, isPageable, searchApi, dataCallback, requestError } = {
		...defaultProps,
		...props
	} as Required<Props>

	// 表格状态
	const state = reactive({
		tableData: [] as TableData[], // 表格数据
		pageable: {
			// 分页信息
			pageNum: 1,
			pageSize: 20,
			total: 0
		} as Pageable,
		searchParam: {} as ParamType, // 搜索参数
		searchInitParam: {} as ParamType, // 搜索初始化参数
		totalParam: {} as ParamType, // 总参数
		loading: false // 加载状态
	})

	// 获取表格数据
	const getTableData = async () => {
		if (!api) return

		state.loading = true
		// 合并参数
		state.totalParam = {
			...initParam,
			...(isPageable
				? {
						pageNum: state.pageable.pageNum,
						pageSize: state.pageable.pageSize
					}
				: {})
		}

		try {
			// 根据是否有搜索参数决定使用哪个API
			const hasSearchParams = Object.keys(state.searchParam).length > 0
			const apiToUse = hasSearchParams && searchApi !== undefined ? searchApi : api
			const params = {
				...state.searchInitParam,
				...state.totalParam
			}

			const response = await apiToUse(params)

			if (response.success) {
				// 处理数据回调
				let resultData = response.data
				resultData = dataCallback?.(resultData) || resultData

				// 设置表格数据
				if (isPageable && 'list' in resultData && Array.isArray(resultData.list)) {
					state.tableData = resultData.list as TableData[]
					if (typeof resultData.total === 'number') {
						state.pageable.total = resultData.total
					}
				} else {
					state.tableData = Array.isArray(resultData) ? (resultData as TableData[]) : [resultData as unknown as TableData]
				}
			}
		} catch (err) {
			// 错误处理
			console.error('表格数据获取错误:', err)
			requestError?.(err as Error)
		} finally {
			state.loading = false
		}
	}

	// 更新查询参数
	const updateSearchParam = () => {
		const newSearchParam: ParamType = {}

		// 处理查询参数，过滤掉空值
		Object.entries(state.searchParam).forEach(([key, value]) => {
			if (value !== null && value !== undefined && value !== '') {
				newSearchParam[key] = value
			}
		})

		state.totalParam = { ...newSearchParam }
	}

	// 查询
	const search = (val: ParamType) => {
		state.searchParam = val
		state.pageable.pageNum = 1
		updateSearchParam()
		getTableData()
	}

	// 重置
	const reset = () => {
		state.pageable.pageNum = 1
		state.searchParam = { ...state.searchInitParam }
		updateSearchParam()
		getTableData()
	}

	// 每页条数更改
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1
		state.pageable.pageSize = val
		getTableData()
	}

	// 当前页改变
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val
		getTableData()
	}

	// 初始化
	const initialize = () => {
		getTableData()
	}

	return {
		...toRefs(state),
		getTableData,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange,
		initialize
	}
}
