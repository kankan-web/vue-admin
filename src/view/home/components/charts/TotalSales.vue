<template>
  <div class="compare-wrapper">
    <div class="compare">
      <span>日同比</span>
      <span class="emphasis">7.33%</span>
      <div class="increase" />
    </div>
    <div class="compare">
      <span>月同比</span>
      <span class="emphasis">7.33%</span>
      <div class="decrease" />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .compare {
    display: flex;
    font-size: 12px;
    margin-top: 3px;
    align-items: center;
    color: #666;
  }
}
</style>
<style>
.increase {
  width: 0;
  height: 0;
  border-width: 3px;
  border-color: transparent transparent red transparent;
  border-style: solid;
  margin: 0 0 3px 5px;
}
.decrease {
  width: 0;
  height: 0;
  border-width: 3px;
  border-color: green transparent transparent transparent;
  border-style: solid;
  margin: 3px 0 0 5px;
}
</style>
