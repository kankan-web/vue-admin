import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../view/Home.vue";
import LayOut from "../layout/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: LayOut,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/chooseIcon",
        component: () => import("../view/chooseIcon/index.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("../view/chooseArea/index.vue"),
      },
      {
        path: "/trend",
        component: () => import("../view/trend/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
