<template>
	<div class="common-card">
		<div class="common-card-title">{{ title }}</div>
		<div class="common-card-value">{{ value }}</div>
		<div class="common-card-chart">
			<slot></slot>
		</div>
		<div class="common-card-line"></div>
		<div class="common-card-footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>
<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		required: true
	},
	value: {
		type: [String, Number],
		required: true
	}
})
</script>
<style lang="scss" scoped>
.common-card {
	.common-card-title {
		color: #999;
		font-size: 12px;
	}
	.common-card-value {
		font-size: 25px;
		color: #000;
		margin-top: 5px;
		letter-spacing: 1px;
	}
	.common-card-chart {
		height: 50px;
	}
	.common-card-line {
		margin: 10px 0;
		border-top: 1px solid #eee;
	}
	.common-card-footer {
		font-size: 12px;
		color: #666;
	}
}
</style>
