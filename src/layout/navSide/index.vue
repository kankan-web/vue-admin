<template>
	<m-menu :collapse="collapse" :data="data" router :defaultActive="$route.path"></m-menu>
</template>
<script lang="ts" setup>
defineProps<{
	collapse: boolean
}>()
const data = [
	{
		icon: 'HomeFilled',
		name: '首页',
		index: '/'
	},
	{
		icon: 'Check',
		name: '图标选择器',
		index: '/chooseIcon'
	},
	{
		icon: 'Location',
		name: '省市区选择器',
		index: '/chooseArea'
	},
	{
		icon: 'Sort',
		name: '趋势标记',
		index: '/trend'
	},
	{
		icon: 'Menu',
		name: '菜单',
		index: '/menu'
	},
	{
		icon: 'Cpu',
		name: '超级表格',
		index: '/table'
	},
	{
		icon: 'Cpu',
		name: '虚拟表格',
		index: '/virtualTable'
	}
]
</script>
<style lang="scss"></style>
