<template>
    <!-- 展示外部图标 -->
    <div v-if='isExternal' :style="styleExternalIcon" class="svg-external-icon svg-icon" :class="className  "></div>
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
        <use :xlink:href="iconName"/>
    </svg>
    <!-- 展示内部图标 -->
</template>
<script lang="ts" setup>
import {defineProps,computed} from 'vue
import {isExternal as external} from '@/utils/validate'
const props = defineProps({
    //icon图标
    icon:{
        type:String,
        required:true
    },
    //图标类名
    className:{
        type:String,
        default:''
    }
})
//外部图标和内部图标只能展示一个,定义componet处理图标展示
//1.判断当前图标是否为外部图标
const isExternal=computed(()=>external(props.icon))
//2.外部图标样式
const styleExternalIcon = computed(()=>({
    mask:`url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask':`url(${props.icon}) no-repeat 50% 50%`
}))
//3.内部图标
const iconName = computed(()=>`#icon-${props.icon}`)
</script>
<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height:1em;
    vertical-align:-0.15em;
    fill:currentColor;
    overflow:hidden;
}
.svg-external-icon{
    background-color:currentColor;
    mask-size:cover !important;
    display:inline-block;
}
</style>