<template>
  <template v-if="column.type === 'slot'">
    <slot :name="column.slotName" :data="column"></slot>
  </template>
  <template v-else>
    <component
      :is="getComponent(column.type)"
      :placeholder="column.config?.placeholder"
      v-bind="{ ...handleSearchProps}"
      v-model="_searchParam[column.prop]"
    >
      <!-- <template v-if="column.type === 'select'">
        <el-option
          v-for="(option, index) in column.options"
          :key="index"
          :label="option.label"
          :value="option.value"
        />
      </template> -->
      <template v-if="column.type === 'select'">
        <component
          :is="getComponent('option')"
          v-for="(item, index) in column.options"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></component>
      </template>
      <slot v-else></slot>
    </component>
  </template>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { SearchProps } from "@/components/searchForm/type";

interface SearchFormItemProps {
  column: SearchProps;
  searchParam: { [key: string]: any };
}
const props = defineProps<SearchFormItemProps>();
const _searchParam = computed(() => props.searchParam);
const getComponent = (type: string) => {
 switch(type){
  case 'select':
    return ElSelect
  case 'input':
    return ElInput
  case 'date-picker':
    return ElDatePicker
  case 'option':
    return ElOption
  default:
    throw new Error(`未找到${type}组件`)
 }
};

const commonProps = computed(() => ({
  placeholder: `请输入${props.column.label}`,
  clearable: true,
  ...props.column.config,
}));

//处理透传的searchProps（el为tree-select、cascader需特殊处理）
const handleSearchProps = computed(()=>{
  const label = props.column.label
  const prop = props.column.prop
  let config = props.column.config
  console.log('config',config)
  return config
})
</script>
<style></style>
