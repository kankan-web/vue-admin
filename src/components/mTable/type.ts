import type { TableColumnCtx, FormItemRule } from 'element-plus'
import { Ref, VNode } from 'vue'
import type { ValueType } from '@/types/global'

// 定义一个通用类型，用于替代any[]
export type ColumnTypes = 'selection' | 'index' | 'expand'

export interface EnumProps {
	label?: string
	value?: string | number | boolean | ValueType
	tagType?: string
}

export interface HeaderRenderScope<T> {
	$index: number
	column: TableColumnCtx<T>
}

export interface RenderScope<T> {
	$index: number
	row: T
}

// 使用泛型参数T，默认为unknown而不是any
export interface ColumnProps<T = unknown>
	extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
	type: string //列的类型
	tag?: boolean //列的标签
	enum?: EnumProps[] //枚举
	rules?: Array<FormItemRule> //表单验证规则
	isShow?: boolean | Ref<boolean> //是否显示
	headerRender?: (scope: HeaderRenderScope<T>) => VNode
	render?: (scope: RenderScope<T>) => VNode | string
	_children?: ColumnProps<T>[] //多级表头
}
