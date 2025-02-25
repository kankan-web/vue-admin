<template>
	<div class="card filter">
		<h4 v-if="title" class="title sle">
			{{ title }}
		</h4>
		<div class="search">
			<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable></el-input>
		</div>
		<el-scrollbar :style="{ height: title ? `calc(100% - 95px)` : `calc(100% - 56px)` }">
			<el-tree
				ref="treeRef"
				default-expand-all
				:node-key="id"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="false"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="multiple"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
				<template #default="scope">
					<span class="el-tree-node__label">
						<slot :row="scope">
							{{ scope.node.label }}
						</slot>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>
<script lang="ts" setup name="TreeFilter">
import { ref, onBeforeMount, watch } from 'vue'
//注意如果使用了按需引入的方式后，再次引入对应组件时，样式会受影响
// import { ElTree } from "element-plus"
// 导入Element Plus的ElTree组件的类型定义，以便在代码中使用该组件时能够获得类型检查和智能提示。
import type { ElTree } from 'element-plus'

interface BaseTreeNode {
	id: string
	label: string
	children?: BaseTreeNode[]
}

interface ExtendedTreeNode extends BaseTreeNode {
	parent?: ExtendedTreeNode
	level?: number
}

interface TreeFilterProps {
	data?: BaseTreeNode[]
	id?: string
	title?: string
	label?: string
	multiple?: boolean
	defaultValue?: string | string[]
}

const props = withDefaults(defineProps<TreeFilterProps>(), {
	id: 'id',
	label: 'label',
	multiple: false
})
const defaultProps = {
	children: 'children',
	label: props.label //很巧妙
}

// emit
const emit = defineEmits<{
	change: [value: string | string[]]
}>()

const treeRef = ref<InstanceType<typeof ElTree>>() //树形组件实例
const treeData = ref<BaseTreeNode[]>([]) //树形组件数据
const treeAllData = ref<BaseTreeNode[]>([]) //树形组件数据

/**--------- 初始化设置-----------  */
const selected = ref()
const setSelected = () => {
	if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
	else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : ''
}
//TODO:初始化的一些配置需要去完成
onBeforeMount(async () => {
	setSelected()
})
watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			treeData.value = props.data
			treeAllData.value = [{ id: '', label: '全部' }, ...props.data]
		}
	},
	{ deep: true, immediate: true }
)
/**---------功能设置----------- */
/**
 * filter：过滤所有树节点，过滤后的节点将被隐藏，
 * 接收一个参数并指定为 filter-node-method 属性的第一个参数
 */
const filterText = ref('')
watch(filterText, val => {
	treeRef.value!.filter(val)
})
//过滤，处理输入框的内容
const filterNode = (value: string, _data: BaseTreeNode, node: ExtendedTreeNode) => {
	if (!value) return false
	const labels: string[] = []
	let current: ExtendedTreeNode | undefined = node

	while (current) {
		labels.push(current.label)
		current = current.parent
	}

	return labels.some(label => label.includes(value))
}

// 单选
const handleNodeClick = (data: BaseTreeNode) => {
	if (props.multiple) return
	emit('change', data.id)
}
// 多选
const handleCheckChange = () => {
	const keys = treeRef.value?.getCheckedKeys() ?? []
	emit('change', keys as string[])
}
</script>
<style lang="scss" scoped>
.filter {
	width: 220px;
	height: 100%;
	padding: 18px;
	margin-right: 10px;
	.title {
		margin: 0 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #73767a;
		letter-spacing: 0.5px;
	}
	.search {
		display: flex;
		align-items: center;
		margin: 0 0 15px;
	}
	.el-scrollbar {
		:deep(.el-tree) {
			height: 80%;
			overflow: auto;
			.el-tree-node-content {
				height: 33px;
			}
		}
		:deep(.el-tree--highlight-current) {
			.el-tree-node.is-current > .el-tree-node__current {
				background-color: #009688;
				.el-tree-node__label,
				.el-tree-node__expand-icon {
					color: white;
				}
				.is-leaf {
					color: transparent;
				}
			}
		}
	}
}
</style>
