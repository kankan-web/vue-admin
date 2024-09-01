<template>
  <!-- #MARK:这个使用$attrs来获取父组件传递过来的属性,并且传过来的数据没有在props中进行接收，相当于将父组件传递过来的剩余属性都进行接收 -->
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
  >
    <template v-for="item in data" :key="item.index">
      <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.index"
      >
        <el-icon>
          <component :is="item.icon"></component>
        </el-icon>
        <span>{{ item.name }}</span>
      </el-menu-item>
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.index"
      >
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(item1, index1) in item.children"
          :index="index1 + ''"
        >
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item1.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
  <!-- #UPDATE：使用jsx实现无限子菜单，需要使用@vitejs/plugin-vue-jsx插件 -->
</template>
<script setup lang="ts">
import { MenuItem } from "./type";
let props = defineProps({
  // 导航菜单的数据
  data: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  defaultActive: {
    type: String,
    default: "",
  },
  //是否是路由模式
  router: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

