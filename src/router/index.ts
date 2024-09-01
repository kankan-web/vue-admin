import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/view/home/index.vue";
import Layout from "@/layout/index.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/view/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/chooseIcon",
        component: () => import("@/view/chooseIcon/index.vue"),
      },
      {
        path: "/chooseArea",
        component: () => import("@/view/chooseArea/index.vue"),
      },
      {
        path: "/trend",
        component: () => import("@/view/trend/index.vue"),
      },
      {
        path: "/menu",
        component: () => import("@/view/menu/index.vue"),
      },
      {
        path: "/gantt",
        component: () => import("@/view/ganttChart/index.vue"),
      },
      {
        path:'/table',
        component:()=>import("@/view/proTable/index.vue")
      }
    ],
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
