<template>
  <searchForm
    :columns="columns"
    :searchCol="searchCol"
    :searchParam="searchParam"
  >
    <template #address="data">fidshafio</template>
  </searchForm>
  fadsf1
</template>
<script setup lang="ts">
import type { SearchProps } from "../searchForm/type";
import type { BreakPoint } from "../Gird/type";
type TableProps = {
  // columns:SearchProps[]
  searchCol?: number | Record<BreakPoint, number>; //搜索列
};

const props = withDefaults(defineProps<TableProps>(), {
  // columns: () => []
  searchCol: () => ({ xs: 1, sm: 2, md: 3, lg: 3, xl: 4 }),
});

const searchParam = ref({});
const columns = ref<SearchProps[]>([
  {
    label: "用户名",
    type: "input",
    prop: "username",
    labelConfig: {
      tooltip: "我是搜索提示词",
      placement: "top",
    },
    config: {
      placeholder: "请输入用户名",
    },
  },
  {
    label: "性别",
    type: "select",
    prop: "sex",
    options: [
      {
        label: "女",
        value: 1,
      },
      {
        label: "男",
        value: 2,
      },
    ],
    config: {
      placeholder: "请选择性别",
    },
  },
  {
    type: "input",
    prop: "age",
    label: "年龄",
    config: {
      placeholder: "请输入年龄",
    },
  },
  // {
  //   type: "slot",
  //   slotName: "address",
  //   prop: "address",
  //   label: "地址",
  //   config: {
  //     placeholder: "请输入地址",
  //   },
  // },
  {
    type: "select",
    prop: "status",
    label: "用户状态",
    options: [
      {
        label: "启用",
        value: 1,
      },
      {
        label: "禁用",
        value: 0,
      },
    ],
    config: {
      placeholder: "请选择用户状态",
    },
  },
]);
</script>
