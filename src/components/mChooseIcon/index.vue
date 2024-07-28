<template>
  <el-button @click="handleClick" type="primary">
    <slot></slot>
  </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog v-model="dialogVisible" title="Tips">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(ElementPlusIconsVue)"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="text">
            <el-icon><component :is="item"></component></el-icon>
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useCopy } from "@/hooks/useCopy";
const props = defineProps<{
  // 弹出框的标题
  title: string;
  // 控制弹出框的显示与隐藏
  visible: boolean;
}>();
const emits = defineEmits(["update:visible"]);

// 拷贝一份父组件传递过来的visible，用于初始化，并不会随着props的变化而变化
let dialogVisible = ref<boolean>(props.visible);
//处理显示与隐藏
const handleClick = () => {
  emits("update:visible", !props.visible);
};
//处理复制
const clickItem = (title: string) => {
  let text = `<el-icon><${title}/></el-icon>`;
  useCopy(text);
  // 关闭弹框
  dialogVisible.value = false;
};
/**
 * 监听visible的变化 只能监听第一次的变化，类似于使用computed,
 * 后续props.visible变化时，对应的dialogVisible也需要跟随变化
 */
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

/**
 * 监听组件内部的dialogVisible变化，
 * dialogVisible变化时也会影响到父级的props中的visible变化
 */
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>
<style lang="scss">
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}
.text {
  font-size: 14px;
}
.icon {
  flex: 1;
}
.el-icon {
  width: 2em;
  height: 2em;
  svg {
    width: 2em;
    height: 2em;
  }
}
</style>

