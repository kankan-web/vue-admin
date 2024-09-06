<template>
   <div :style="style">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {Responsive,BreakPoint} from '../type'
type Props={
  offset?:number;
  span?:number;
  suffix?:boolean;
  xs?:Responsive;
  sm?:Responsive;
  md?:Responsive;
  lg?:Responsive;
  xl?:Responsive;
}
const props = withDefaults(defineProps<Props>(),{
  span:1,
  offset:0,
  suffix:false,
  xs:undefined,
  sm:undefined,
  md:undefined,
  lg:undefined,
  xl:undefined
})
//接收断点
const breakPoint=inject('breakPoint',ref('xl'))
const cols = inject('cols',ref(4))//接收列数
const gap = inject('gap',0)

const style=computed(()=>{
  //针对子项来说，先判断子项的span，没有的话使用父级的span
  let span = props[breakPoint.value]?.span??props.span
  //针对子项来说，先判断子项的offset，没有的话使用父级的offset
  let offset = props[breakPoint.value]?.offset??props.offset
  //如果为true，则表示为最后一项，需要特殊处理
  if(props.suffix){
    return {
      gridColumnStart:cols.value-span-offset+1,
      gridColumnEnd:`span ${span+offset}`,
      //MARK：有点不太理解
      marginLeft:offset!==0?`calc(((100%+${gap}px)/${span+offset})*${offset})`:'unset'
    }
  }else{
    return {
      gridColumn:`span ${span+offset>cols.value?cols.value:span+offset}`,
      marginLeft:offset!==0?`calc(((100%+${gap}px)/${span+offset})*${offset})`:'unset'
    }
  }
})
</script> 
<style lang="">

</style>