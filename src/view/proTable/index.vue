<template>
  <div class="main-box">
    <div class="tree">
      <TreeFilter
        label="name"
        title="部门列表"
        :data="treeFilterData"
        :default-value="initParam.departmentId"
        @change="changeTreeFilter"
      />
    </div>
    <div class="table-box">

      <mTable></mTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getUserDepartment } from "@/api/user";
onMounted(() => {
  getTreeFilter();
});
// ProTable 实例
// const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ departmentId: "" });

// 获取 treeFilter 数据
// 当 proTable 的 requestAuto 属性为 false，不会自动请求表格数据，等待 treeFilter 数据回来之后，更改 initParam.departmentId 的值，才会触发请求 proTable 数据
const treeFilterData = ref<any>([]);
const getTreeFilter = () => {
  const { data } = getUserDepartment();
  treeFilterData.value = data;
  console.log("data", data);
  initParam.departmentId = treeFilterData.value[1].id; //默认第一项设置
};
// 树形筛选切换
const changeTreeFilter = (val: string) => {
  // proTable.value!.pageable.pageNum = 1;
  initParam.departmentId = val;
};
</script>
<style lang="scss">
// main-box(树形表格treeFilter页面会使用，左右布局flex)
.main-box {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
