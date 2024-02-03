<template>
  <div>
    <mChooseArea @change="handleAreaChange"></mChooseArea>
  </div>
</template>
<script lang="ts" setup>
import mChooseArea from "../../components/chooseArea/src/index.vue";
const handleAreaChange = (value) => {
  console.log("value", value);
};
</script>
