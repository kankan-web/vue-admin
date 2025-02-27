<template>
	<el-table ref="tableRef" :data="_tableData" :columns="tableColumns" v-bind="$attrs" @selection-change="selectionChange">
		<!--默认插槽 -->
		<slot></slot>
		<template v-for="item in tableColumns" :key="item.prop">
			<!-- selection||index||expand -->
			<el-table-column
				v-if="item.type && ColumnTypes.includes(item.type)"
				:key="item.type"
				v-bind="item"
				:align="item.align ?? 'center'"
				:reserver-selection="item.type === 'selection'"
			>
				<template #default="scope">
					<component :is="item.render" v-bind="scope" v-if="item.render"></component>
					<slot v-else :name="item.type" v-bind="scope"></slot>
				</template>
			</el-table-column>
			<!-- 单个单元格编辑 -->
			<!-- other -->
		</template>
		<!-- 插入表格最后一行之后的插槽 -->
		<template #append>
			<slot name="append"></slot>
		</template>
		<!-- 无数据 -->
		<template #empty>
			<div class="table-empty">
				<slot name="empty">
					<el-empty :description="description" />
				</slot>
			</div>
		</template>
	</el-table>
	<!-- 分页 -->
	<Pagination v-if="pageination" :pageable="pageable" @size-change="onSizeChange" @current-change="onCurrentChange" />
</template>
<script setup lang="ts">
import type { ElTable, FormRules } from 'element-plus'
import { ref, computed, onMounted, watch } from 'vue'
import type { ColumnProps } from './type'
import type { ValueType } from '@/types/global'
import { useTable } from '@/hooks/useTable'
import { useSelection } from '@/hooks/useSelection'

// 导入 ParamType 类型
type ParamType = Record<string, unknown>
// 导入 TableData 类型
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

const ColumnTypes: string[] = ['selection', 'index', 'expand']
type TableProps = {
	tableData?: ValueType[] //静态table data数据，若存在，则不会使用requireApi返回的data ==>非必传
	columns: ColumnProps[] //表格列配置==>必传
	tableRule?: FormRules<{ [key: string]: ValueType }> //表格表单验证规则==>非必传
	requireApi?: (params: ParamType) => Promise<ApiResponse<PageResult<TableData> | TableData[]>> //请求表格数据Api接口==>非必传
	searchApi?: (params: ParamType) => Promise<ApiResponse<PageResult<TableData> | TableData[]>> //搜索表格数据Api接口==>非必传
	requestAuto?: boolean //是否自动请求数据==>非必传
	requestError?: (error: Error) => void //请求Api数据错误回调==>非必传
	dataCallback?: (data: PageResult<TableData> | TableData[]) => PageResult<TableData> | TableData[] //返回数据的回调函数，可以对数据进行处理==>非必传
	pageination?: boolean //是否分页==>非必传
	initParam?: ParamType //初始化请求参数==>非必传
	rowKey?: string //行数据唯一标识==>非必传
	description?: string //表格内容为空时的描述==>非必传
}
const props = withDefaults(defineProps<TableProps>(), {
	columns: () => [],
	requestAuto: true,
	pageination: true,
	rowKey: 'id',
	description: '暂无数据'
})
//抛出事件
const emits = defineEmits<{
	(e: 'save', value: ValueType[]): void
	(e: 'validateError', value: ValueType[]): void
	(e: 'select', value: ValueType[]): void
}>()

const tableRef = ref<InstanceType<typeof ElTable>>()

//接收columns并设置为响应式
const tableColumns = computed<ColumnProps[]>(() => props.columns)

//表格操作hooks
const {
	pageable,
	tableData, //获取表格数据
	getTableData: fetchTableData, //获取表格数据
	search: searchTable, //搜索表格数据
	reset: resetTable, //重置表格数据
	handleSizeChange: onSizeChange, //分页条数改变
	handleCurrentChange: onCurrentChange //分页页码改变
} = useTable({
	api: props.requireApi as (params: ParamType) => Promise<ApiResponse<PageResult<TableData> | TableData[]>>,
	searchApi: props.searchApi,
	initParam: props.initParam,
	isPageable: props.pageination,
	dataCallback: props.dataCallback,
	requestError: props.requestError
})

// 如果设置了自动请求，则在组件挂载时获取数据
onMounted(() => {
	if (props.requestAuto && props.requireApi) {
		fetchTableData()
	}
	if (props.tableData) {
		pageable.value.total = props.tableData.length
	}
})
//处理表格数据
const _tableData = computed(() => {
	if (!props.tableData) return tableData.value
	if (!props.pageination) return props.tableData
	return props.tableData.slice(
		(pageable.value.pageNum - 1) * pageable.value.pageSize,
		pageable.value.pageNum * pageable.value.pageSize
	)
})

//监听页面initParam变化，重新获取表格数据
watch(() => props.initParam, fetchTableData, { deep: true })
/**-------------表格多选---------------------- */
const { isSelected, selectedList, selectedListIds, selectionChange } = useSelection(props.rowKey, emits)

/**---------------单元格校验---------------------- */

// 暴露方法给父组件使用
defineExpose({
	search: searchTable,
	reset: resetTable,
	isSelected,
	selectedList,
	selectedListIds,
	handleSizeChange: onSizeChange,
	handleCurrentChange: onCurrentChange
})
</script>
