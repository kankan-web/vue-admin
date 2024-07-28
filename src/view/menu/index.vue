<template>
  <div class="flex common-main">
    <div style="width: 200px">
      <m-menu :data="data1"></m-menu>
    </div>
    <div style="width: 200px">
      <m-infinite-menu :data="data2"></m-infinite-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
const data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
  },
  {
    name: "导航4",
    index: "4",
    icon: "document",
    children: [{ name: "导航4-1", index: "5", icon: "document" }],
  },
];
const data2 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
  },
  {
    name: "导航4",
    index: "4",
    icon: "Document",
    children: [
      {
        name: "导航4-1",
        index: "5",
        icon: "Document",
        children: [
          {
            name: "导航4-1-1",
            index: "6",
            icon: "Document",
          },
          {
            name: "导航4-1-2",
            index: "7",
            icon: "Document",
            children: [
              {
                name: "导航4-1-2-1",
                index: "8",
                icon: "Document",
              },
              {
                name: "导航4-1-2-2",
                index: "9",
                icon: "Document",
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-around;
}
</style>
