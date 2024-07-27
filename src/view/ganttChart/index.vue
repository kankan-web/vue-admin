<template>
  <GanttComponent class="left-container" :tasks="tasks"></GanttComponent>
</template>
<script setup>
import { ref } from "vue";
import GanttComponent from "./components/GanttComponent.vue";
const tasks = ref({
  data: [
    {
      id: 1,
      text: "Task #1",
      start_date: "2020-01-17",
      duration: 3,
      progress: 0.6,
    },
    {
      id: 2,
      text: "Task #2",
      start_date: "2020-01-20",
      duration: 3,
      progress: 0.4,
    },
  ],
  links: [{ id: 1, source: 1, target: 2, type: "0" }],
});
</script>
<style lang="scss">
.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}
</style>

