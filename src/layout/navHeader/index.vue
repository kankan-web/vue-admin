<template>
  <div class="header">
    <span @click="toggle" style="cursor: pointer">
      <el-icon v-if="!collapse"><Fold /></el-icon>
      <el-icon v-else><Expand /></el-icon>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps<{
  collapse: boolean;
}>();
const emits = defineEmits(["update:collapse"]);
const toggle = () => {
  emits("update:collapse", !props.collapse);
};
</script>
<style lang="scss">
.header {
  height: 60px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
</style>
