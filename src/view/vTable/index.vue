<template>
  <div class="vTable-main">
    <div class="vTable-content">
      <template v-for="item in Object.keys(subList)" :key="item">
        <h4>{{ item }}组人员</h4>
        <div class="table-container">
          <el-auto-resizer>
            <template #default="{ width }">
              <el-table-v2 
                :data="subList[item]" 
                :columns="columns" 
                :width="width"
                :height="getTableHeight(subList[item].length)"
                fixed
              />
            </template>
          </el-auto-resizer>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import useTable from "./Table";

const { columns } = useTable();
const tableWidth = ref(800); // 设置一个固定宽度，也可以通过计算获取容器宽度

// 表格高度计算
const ROW_HEIGHT = 54; // 每行高度
const HEADER_HEIGHT = 40; // 表头高度
const MIN_HEIGHT = 100; // 最小高度
const MAX_HEIGHT = 300; // 最大高度

const getTableHeight = (rowCount: number) => {
  const contentHeight = HEADER_HEIGHT + (rowCount * ROW_HEIGHT);
  return Math.max(MIN_HEIGHT, Math.min(contentHeight, MAX_HEIGHT));
}

const subList = ref({
  first: [
    { name: "张三", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "李四", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "王五", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "赵六", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "孙七", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "周八", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "吴九", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
  ],
  second: [
    { name: "张三123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "李四123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "王五123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
  ],
  third:[
    { name: "张三123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "李四123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "王五123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },  
    { name: "赵六123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "孙七123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "周八123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "吴九123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
    { name: "郑十123", age: 18, sex: "男", address: "北京", email: "1234567890@qq.com", phone: "1234567890" },
  ]
})
</script>

<style lang="scss" scoped>
.vTable-main {
  width: 300px;
  height: 100%;
  background-color: #fff;
  overflow-y: auto;
  
  .vTable-content {
    padding: 20px;
  }

  .table-container {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    
    :deep(.el-auto-resizer) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  
  h4 {
    margin-bottom: 16px;
  }
}
</style>
