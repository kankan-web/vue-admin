<template>
	<div class="card table-search">
		<el-form ref="formRef" :model="searchParam">
			<Grid ref="girdRef" :gap="[12, 20]" :cols="searchCol">
				<template v-if="!isCollapse">
					<GridItem
						class="search-item-box"
						v-for="(item, index) in columns"
						:key="item.label"
						:index="index"
						v-bind="getResponsive(item)"
					>
						<el-form-item :label="item.label" :prop="item.prop">
							<template #label>
								<el-space :size="4">
									<span>{{ item.label }}</span>
									<el-tooltip v-if="item.labelConfig?.tooltip" effect="dark" :content="item.labelConfig.tooltip" placement="top">
										<!--TODO：项目中还未考虑该如何引入图标  -->
										X
									</el-tooltip>
									<span style="margin-right: 4px">:</span>
								</el-space>
							</template>
							<mForm :column="item" :search-param="searchParam">
								<template v-for="item in slotList" :key="item.prop" #[item.prop]="data">
									<slot :name="item.slotName" :data="data"></slot>
								</template>
							</mForm>
						</el-form-item>
					</GridItem>
				</template>
				<GirdItem v-else> 测试 </GirdItem>
				<GridItem suffix>
					<el-space :size="10">
						<el-button type="primary">搜索</el-button>
						<el-button type="primary" plain>重置</el-button>
						<el-text type="primary" style="cursor: pointer" @click="isCollapse = !isCollapse">收缩</el-text>
					</el-space>
				</GridItem>
			</Grid>
		</el-form>
	</div>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import GridItem from '@/components/Gird/components/GirdItem.vue'
import Grid from '@/components/Gird/index.vue'
import type { SearchProps } from './type'
import type { BreakPoint } from '../Gird/type'
import { ref, computed } from 'vue'
import mForm from '@/components/mForm/index.vue'

interface SearchFormProps {
	columns?: SearchProps[] //搜索配置列
	searchParam?: { [key: string]: unknown } //搜索参数
	searchCol: number | Record<BreakPoint, number> //搜索列,必定有值
}
const props = withDefaults(defineProps<SearchFormProps>(), {
	columns: () => [],
	searchParam: () => ({})
})
const isCollapse = ref(false)
/**
 * 获取响应式设置
 * span：列宽
 * offset：列偏移
 * xs,sm,md,lg,xl：响应式设置
 */
const getResponsive = (item: SearchProps) => {
	return {
		span: item.layout?.span ?? 1,
		offset: item.layout?.offset ?? 0,
		xs: item.layout?.xs,
		sm: item.layout?.sm,
		md: item.layout?.md,
		lg: item.layout?.lg,
		xl: item.layout?.xl
	}
}
const getSlotList = (columns: SearchProps[]) => {
	console.log('columns', columns)
	console.log(
		'columns',
		columns.filter(item => item.type === 'slot')
	)
	return columns.filter(item => item.type === 'slot')
}
const slotList = computed(() => getSlotList(props.columns))
const formRef = ref()
</script>
<style lang="scss" scoped>
.table-search {
	padding: 12px 18px;
	background-color: rgb(251, 251, 254);
	.el-form-item {
		height: 40px;
		margin: 0;
	}
}

.search-item-box {
	background-color: white;
	border: 1px solid rgb(202, 208, 213);
	border-radius: 4px;
	:deep(.el-form-item__label) {
		font-size: 16px;
		color: rgb(92, 95, 102);
		line-height: 40px;
		height: 40px;
		padding: 0 12px;
		position: relative;
		:deep(el-form-item__label::after) {
			content: '';
			display: inline-block;
			height: 24px;
			width: 1px;
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			background-color: rgb(228, 232, 236);
		}
	}
}
.el-form-item {
	:deep(.el-form-item__content > div) {
		width: 100%;
		height: 100%;
	}
	:deep(.el-select__wrapper) {
		height: 40px;
	}
	:deep(.el-input__wrapper:hover) {
		box-shadow: none;
	}
	:deep(.el-input__wrapper) {
		box-shadow: none;
	}
	:deep(.el-select__wrapper) {
		box-shadow: none;
	}
}
</style>
