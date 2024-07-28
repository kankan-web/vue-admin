<template>
  <div>
    <mChooseArea @change="handleAreaChange"></mChooseArea>
  </div>
</template>
<script lang="ts" setup>
const handleAreaChange = (value) => {
  console.log("value", value);
};
</script>

