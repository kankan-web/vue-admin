import { createApp } from "vue";
import App from "./App.vue";
//vue Router
import router from "./router";

// pinia store
import pinia from "@/stores";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import mUI from "./components";

// 引入重置样式
import "./style/reset.scss";
// 引入基础样式
import "./style/base.scss";
//引入element plus样式
import "element-plus/dist/index.css";

//导入icons
import "virtual:svg-icons-register";

const app = createApp(App);
app.use(router).use(pinia);
// app.use(mUI);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
