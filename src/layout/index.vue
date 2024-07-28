<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto">
        <navSide :collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <navHeader v-model:collapse="isCollapse" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import navHeader from "./navHeader/index.vue";
import navSide from "./navSide/index.vue";
import { ref } from "vue";
const isCollapse = ref(false);
</script>
<style lang="scss">
.el-container {
  .el-header {
    padding: 0;
    border-bottom: 1px solid #ccc;
  }
  .el-main {
    padding: 0;
  }
}
</style>
