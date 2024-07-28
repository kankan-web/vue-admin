<template>
  <div class="common-main">
    <mChooseArea @change="handleAreaChange"></mChooseArea>
  </div>
</template>
<script lang="ts" setup>
const handleAreaChange = (value) => {
  console.log("value", value);
};
</script>
