<template>
  <div ref="ganttContainer"></div>
</template>
<script setup>
import { ref, onMounted, defineProps } from "vue";
import { gantt } from "dhtmlx-gantt";
const ganttContainer = ref(null);
const props = defineProps({
  tasks: {
    type: Object,
    default: () => {
      return {
        data: [],
        links: [],
      };
    },
  },
});
onMounted(() => {
  gantt.config.date_format = "%d-%m-%Y";
  gantt.init(ganttContainer.value);
  gantt.parse(props.tasks);
});
</script>
<style lang="scss">
@import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

