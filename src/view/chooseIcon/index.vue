<template>
  <div>
    <mChooseIcon title="选择图标" v-model:visible="visible">
      选择图标</mChooseIcon
    >
  </div>
</template>
<script lang="ts" setup>
import mChooseIcon from "../../components/chooseIcon/src/index.vue";
import { ref } from "vue";
const visible = ref<boolean>(false);
</script>
