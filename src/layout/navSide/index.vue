<template>
  <el-menu
    :collapse="collapse"
    default-active="2"
    class="el-menu-vertical-demo"
  >
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
      <span>导航1</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><setting /></el-icon>
      <span>导航2</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><setting /></el-icon>
      <span>导航3</span>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
const props = defineProps<{
  collapse: boolean;
}>();
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
