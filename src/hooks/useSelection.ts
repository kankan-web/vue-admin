import { ValueType } from '@/types/global'
import { computed, ref } from 'vue'

export const useSelection = (rowKey: string, emit: unknown) => {
	const isSelected = ref<boolean>(false)
	const selectedList = ref<Array<{ [key: string]: ValueType }>>([])
	//当前选中的所有ids数组
	const selectedListIds = computed((): string[] => {
		const ids: string[] = []
		selectedList.value.forEach(item => {
			ids.push(item[rowKey] as string)
		})
		return ids
	})
	//多选操作
	const selectionChange = (rowArr: { [key: string]: ValueType }[]) => {
		isSelected.value = rowArr.length > 0
		selectedList.value = rowArr
		// 使用类型断言调用emit
		;(emit as { (event: string, ...args: unknown[]): void })('select', rowArr)
	}
	return { isSelected, selectedList, selectedListIds, selectionChange }
}
