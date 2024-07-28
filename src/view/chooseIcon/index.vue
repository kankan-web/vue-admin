<template>
  <div class="common-main">
    <mChooseIcon title="选择图标" v-model:visible="visible">
      选择图标</mChooseIcon
    >
    <div class="icons-container">
      <el-tabs type="border-card">
        <el-tab-pane label="Icons">
          <div class="grid">klkl</div>
        </el-tab-pane>
        <el-tab-pane label="Element-Plus Icon">Config</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const visible = ref<boolean>(false);
//图标面板设置
</script>
<style lang="scss" scoped>
.icons-container {
  margin-top: 20px;
}
</style>
