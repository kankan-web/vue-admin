<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>
<script lang="ts" setup>
import TopView from "./components/TopView.vue";
import SalesView from "./components/SalesView.vue";
import BottomView from "./components/BottomView.vue";
import MapView from "./components/MapView.vue";
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #eee;
}
</style>
