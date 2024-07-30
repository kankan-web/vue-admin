<template>
  <div class="top-view">
    <el-row :gutter="20">
      <m-col
        :value="6"
        :md="12"
        :sm="12"
        :xs="24"
        v-for="item in data"
        :key="item.title"
      >
        <el-card shadow="hover">
          <common-card :title="item.title" :value="item.value">
            <template #default>
              <component :is="item.prop" />
            </template>
            <template #footer>
              <div v-if="!Array.isArray(item.subTitle)">
                <span>{{ item.subTitle }} </span>
                <span class="emphasis">{{ item.subValue }}</span>
              </div>
              <div v-else class="footer-item">
                <div v-for="(subItem, index) in item.subTitle" :key="index">
                  <span>{{ subItem }} </span>
                  <span class="emphasis">{{ item.subValue[index] }}</span>
                </div>
              </div>
            </template>
          </common-card>
        </el-card>
      </m-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import mCol from "@/components/mCol";
import CommonCard from "./CommonCard.vue";
import TodayUsers from "./charts/TodayUsers.vue";
import TotalSales from "./charts/TotalSales.vue";
import TotalUsers from "./charts/TotalUsers.vue";
import TotalOrder from "./charts/TotalOrder.vue";

// import { chartData } from "../data";
const data = reactive([
  {
    title: "累计销售额",
    value: 32039165,
    subTitle: "昨日销售额",
    subValue: 300000000,
    prop: markRaw(TotalSales),
  },
  {
    title: "累计订单量",
    value: 2115465,
    subTitle: "昨日订单量",
    subValue: 200000,
    prop: markRaw(TotalOrder),
  },
  {
    title: "今日交易用户数",
    value: 59648,
    subTitle: "退货率",
    subValue: 5.6,
    prop: markRaw(TodayUsers),
  },

  {
    title: "累计用户数",
    value: 1064553,
    subTitle: ["日同比", "月同比"],
    subValue: ["6.36%", "32.95%"],
    prop: markRaw(TotalUsers),
  },
]);
</script>
<style lang="scss" scoped>
.footer-item {
  display: flex;
}
</style>
<style>
/* 让其变成全局样式来使用 */
.emphasis {
  margin-left: 5px;
  color: #333;
  font-weight: 700;
}
</style>
