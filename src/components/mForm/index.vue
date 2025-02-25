<template>
	<el-form ref="formRef" :model="_searchParam" v-bind="$attrs">
		<el-row v-bind="rowConfig">
			<template v-for="item in formItems" :key="item.prop">
				<el-col v-bind="item.layout ? item.layout : colConfig">
					<el-form-item class="Tform-item" :label="item.label" v-bind="item">
						<template v-if="item.type === 'slot'">
							<slot :name="item.prop" :data="item"></slot>
						</template>
						<template v-else>
							<component
								class="Tform-item-type"
								:is="componentMap(item.type)"
								v-bind="item.config"
								v-model.trim="_searchParam[item.prop]"
							>
								<template v-if="item.type === 'select'">
									<el-option
										v-for="option in item.options"
										:key="option.label"
										:label="option.label"
										:value="option.value"
									></el-option>
								</template>
								<template v-else-if="item.type === 'radio'">
									<el-radio
										v-for="option in item.options"
										:key="option.label"
										:label="option.value"
										:value="option.value"
									></el-radio>
								</template>
							</component>
						</template>
					</el-form-item>
				</el-col>
			</template>
		</el-row>
	</el-form>
</template>
<script setup lang="ts">
import type { Prop } from './type'
import { ElForm, ElRow } from 'element-plus'
const props = withDefaults(defineProps<Prop>(), {})
const _searchParam = ref<Record<string, unknown>>(props.searchParam ? { ...props.searchParam } : {})
const formRef = ref<InstanceType<typeof ElForm>>()
function componentMap(key: string) {
	switch (key) {
		case 'select':
			return 'el-select'
		case 'input':
			return 'el-input'
		case 'radio':
			return 'el-radio-group'
		case 'date':
			return 'el-date-picker'
		case 'daterange':
			return 'el-date-picker:daterange'
		case 'datetimerange':
			return 'el-date-picker:datetimerange'
		case 'time':
			return 'el-time-picker'
		case 'timeRange':
			return 'el-time-picker:timerange'
		default:
			throw new Error(`不存在${key}类型的组件`)
	}
}
defineExpose({
	element: formRef
})
</script>
<style lang=""></style>
