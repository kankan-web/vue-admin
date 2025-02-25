<template>
	<div :style="style">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import type { BreakPoint } from './type'
type Props = {
	cols?: number | Record<BreakPoint, number>
	gap?: number | [number, number]
}
const props = withDefaults(defineProps<Props>(), {
	cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
	gap: 0
})

onMounted(() => {
	resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
	window.addEventListener('resize', resize)
})
onUnmounted(() => {
	window.removeEventListener('resize', resize)
})
onActivated(() => {
	resize({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
	window.addEventListener('resize', resize)
})
onDeactivated(() => {
	window.removeEventListener('resize', resize)
})

// 监听屏幕变化
const resize = (e: UIEvent) => {
	let width = (e.target as Window).innerWidth
	switch (!!width) {
		case width < 768:
			breakPoint.value = 'xs'
			break
		case width >= 768 && width < 992:
			breakPoint.value = 'sm'
			break
		case width >= 992 && width < 1200:
			breakPoint.value = 'md'
			break
		case width >= 1200 && width < 1920:
			breakPoint.value = 'lg'
			break
		case width >= 1920:
			breakPoint.value = 'xl'
			break
	}
}

// 注入响应式断点
let breakPoint = ref<BreakPoint>('xl')
provide('breakPoint', breakPoint)

//注入cols,规定每行多少列
const gridCols = computed(() => {
	if (typeof props.cols === 'object') return props.cols[breakPoint.value] ?? props.cols
	return props.cols
})
provide('cols', gridCols)

// 注入 gap 间距，[a,b]表示行间距和列间距，girdItem每项来说，应该使用的是列
provide('gap', Array.isArray(props.gap) ? props.gap[1] : props.gap)
//设置间距
const gridGap = computed(() => {
	if (typeof props.gap === 'number') return `${props.gap}px`
	if (Array.isArray(props.gap)) return `${props.gap[1]}px ${props.gap[0]}px`
	return 'unset'
})

//设置style
const style = computed(() => {
	return {
		display: 'grid',
		gridGap: gridGap.value,
		gridTemplateColumns: `repeat(${gridCols.value},minmax(0,1fr))`
	}
})
</script>
<style></style>
