<template>
  <div class="area-main">
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in allProvince"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import allAreas from "../lib/pca-code.json";
export interface AreaItem {
  name: string;
  code: string;
  children?: AreaItem[];
}
export interface Data {
  name: string;
  code: string;
}

const emits = defineEmits(["change"]);
const province = ref<string>("");
const city = ref<string>("");
const area = ref<string>("");
const allProvince = ref(allAreas);
const selectCity = ref<AreaItem[]>([]);
const selectArea = ref<AreaItem[]>([]);
//监听省份的选择
watch(
  () => province.value,
  (newValue) => {
    if (newValue) {
      let city = allProvince.value.find((item) => item.code === newValue)!
        .children!;
      selectCity.value = city;
    }
    city.value = "";
    area.value = "";
  }
);
// 监听城市的选择
watch(
  () => city.value,
  (val) => {
    if (val) {
      let area = selectCity.value.find((item) => item.code === val)!.children!;
      selectArea.value = area;
    }
    area.value = "";
  }
);
// 监听area，只有选择到了区域才能确保省市都被选择
watch(
  () => area.value,
  (val) => {
    if (val) {
      let provinceData: Data = {
        code: province.value,
        name:
          province.value &&
          allProvince.value.find((item) => item.code === province.value)!.name,
      };
      let cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name,
      };
      let areaData: Data = {
        code: val,
        name: val && selectArea.value.find((item) => item.code === val)!.name,
      };
      emits("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  }
);
</script>
<style lang="scss">
.area-main {
  display: flex;
  .el-select {
    margin-right: 10px;
  }
}
</style>
