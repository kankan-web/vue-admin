import type { RowProps, ColProps } from 'element-plus'
import type { FormItemProps } from 'element-plus/es/components/form/src/form-item'
export interface ItemConfigProp {
	[key: string]: unknown
}
export enum labelPositionProps {
	top = 'top',
	left = 'left',
	right = 'right'
}
export enum sizeProps {
	large = 'large',
	default = 'default',
	small = 'small'
}
export enum validateStatusProps {
	error = 'error',
	validating = 'validating',
	success = 'success'
}
type Options = {
	value: string | number | boolean
	label: string
}[]
export interface SelectProps {
	options: Options
}
interface FormItemProp extends FormItemProps {
	label?: string
	prop: string
	labelConfig?: object
	type: string
	options?: Options
	layout?: ColProps
	config?: ItemConfigProp
}
export interface Prop {
	rowConfig?: RowProps
	colConfig?: ColProps
	searchParam?: object | undefined
	formItems?: FormItemProp[]
}
