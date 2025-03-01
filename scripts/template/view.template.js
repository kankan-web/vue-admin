export default name => `
<template>
	<div class="${name}-container">
		<h1>${name} 页面</h1>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { use${name}Store } from '@/stores/modules/${name.toLowerCase()}'
import { fetch${name}List } from '@/api/${name.toLowerCase()}'

const ${name.toLowerCase()}Store = use${name}Store()
const loading = ref(false)
const dataList = ref([])

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  try {
    loading.value = true
    const res = await fetch${name}List()
    dataList.value = res.data || []
    ${name.toLowerCase()}Store.setData(dataList.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.${name}-container {
  padding: 20px;
}
</style>
`
