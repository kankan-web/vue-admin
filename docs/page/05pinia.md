# Pinia状态管理库
**Pinia** 和 **Vuex** 都是用于管理 Vue.js 应用状态的库，但它们之间有一些显著的区别。Pinia 是 Vuex 的现代化替代品，旨在提供更简洁、更灵活和更易于使用的状态管理解决方案。以下是 **Pinia** 和 **Vuex** 的优势

## Pinia 优势

### 1. 更简洁直观的 API 设计

-   **去除 Mutation**：Pinia 合并了 Vuex 的 Mutation 和 Action，直接通过 Actions 处理同步和异步操作，减少代码负责度
-   **更直观的 Composition API 风格**：与 Vue 3 的 Composition API 高度契合，可以通过 `ref`、`computed` 等直接定义响应式状态，代码更简洁。

### 2. 更完美的 Typescript 支持

-   Pinia 原生支持 TypeScript，类型推断更加完善，无需额外配置即可享受类型安全。而 Vuex 则需要借助复杂的手动类型定义

### 3. 模块化设计更灵活

-   **更自然的模块化：** 每个 Store 独立定义（defineStore），无需手动分模块，天然支持代码分割
-   **无需嵌套模块：** Pinia 通过多个独立的 Store 组织状态，每个 Store 都是扁平化的，避免 Vuex 中嵌套模块的复杂性。
-   **自动代码分割：** Store 可以按需加载，天然支持代码拆分（配合构建工具），优化应用体积。

### 4. 更轻量高效

-   Pinia 的体积比 Vuex 更小（压缩后约 1KB），对应用性能更友好。
-   Pinia 基于 Vue 3 的响应式系统（`reactive`、`ref`），性能与开发体验更优。

### **总结：Pinia vs Vuex**

| 特性                | **Pinia**                                  | **Vuex**                        |
| ----------------- | ------------------------------------------ | ------------------------------- |
| **API**           | 更简洁、与 Vue 3 Composition API 深度集成           | 比较复杂、基于 Vue 2 的设计               |
| **响应式支持**         | 完全支持 Vue 3 的响应式系统（Proxy）                   | 在 Vue 3 中才加入 Proxy 支持           |
| **模块化支持**         | 更轻量、灵活的模块化                                 | 支持模块化，但较重和复杂                    |
| **插件机制**          | 内置插件支持，配置简便                                | 支持插件，但配置较为繁琐                    |
| **持久化支持**         | 轻松集成持久化插件（如 `pinia-plugin-persistedstate`） | 需要外部插件（如 `vuex-persistedstate`） |
| **TypeScript 支持** | 更好的类型推导和 TS 支持                             | 支持较差，需要额外配置                     |
| **性能**            | 更优的性能（特别是对于 Vue 3）                         | 性能较为一般                          |
| **社区支持**          | 新兴的状态管理工具，正在发展                             | 更长时间的使用历史，社区和资源更丰富              |

## 核心概念

1.  **State**: 用于存放数据，有点儿类似 data 的概念；
1.  **Getters**: 用于获取数据，有点儿类似 computed 的概念；
1.  **Actions**: 用于修改数据，有点儿类似 methods 的概念；
1.  **Plugins**: Pinia 插件。

## Pinia 与 Vuex 代码分割机制

假设项目有 3 个 Store（`user`、`job`、`pay`）和 2 个页面（首页、个人中心），分别使用 Pinia 和 Vuex 对其状态管理。

### Vuex 的代码分割

**模块合并打包**：Vuex 在构建时会将所有模块（如 `user`、`job`、`pay`）合并到一个包中。例如，若首页仅需 `job` store，但打包时会强制包含全部模块，导致首屏加载冗余代码，影响性能。

**依赖耦合**：即使页面仅使用部分模块，Vuex 也会将所有模块代码引入到同一 chunk 中，无法实现按需加载。

**解决方案：**

经常在首页优化时，会考虑这个场景，一般处理方案时去做 Vuex 的按需加载，beforeCreate 时候，可以去判断当前页面需要加载哪些 store，利用这个 API 可以实现`$store.registerModule`

> 详情可以参考：<https://segmentfault.com/a/1190000038440206>

### Pinia 的代码分割

**按需加载**：Pinia 通过动态依赖检查，仅打包当前页面引用的 Store。例如，首页引用 `job` store 时，构建工具（如 Webpack/Vite）会自动分离该 Store 到独立 chunk，其他未使用的 Store（如 `user`、`pay`）不会混入首页代码。

**模块独立性**：每个 Store 通过 `defineStore` 独立定义，天然支持代码分割，无需手动配置命名空间或模块拆分

## 持久化处理

Pinia 需要持久化（State Persistence）主要是因为前端应用的状态默认存储在内存中，页面刷新或关闭后状态会丢失。

### 持久化场景

| **场景**  | **示例**        | **持久化必要性** |
| ------- | ------------- | ---------- |
| 用户身份认证  | 登录 Token、用户信息 | 避免每次刷新重新登录 |
| 表单草稿    | 未提交的表单数据      | 防止意外丢失输入内容 |
| 应用配置    | 主题、语言、布局偏好    | 保持用户个性化设置  |
| 购物车/收藏夹 | 商品列表、收藏项      | 跨会话保留用户选择  |
| 分页/筛选状态 | 表格的页码、排序条件    | 保持页面操作连续性  |

### `pinia-plugin-persistedstate`

-   **安装插件**：

```
npm install pinia-plugin-persistedstate
```

-   **配置 Pinia**：

```
// main.ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
```

-   **标记需要持久化的 Store**：

```
// stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({ token: '' }),
  persist: true, // 开启持久化
});
```

-   **自定义配置**：

```
export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] }),
  persist: {
    key: 'my-cart', // 存储的键名（默认是 store id）
    storage: sessionStorage, // 指定存储方式（默认 localStorage）
    paths: ['items'], // 仅持久化部分状态
  },
});
```

## 参考文档

1.  [Vue状态管理深度剖析：Vuex vs Pinia —— 从原理到实践的全面对比_pinia和vuex-CSDN博客](https://blog.csdn.net/m0_52827996/article/details/139070949)
1.  [Pinia状态管理 | vue-template](https://yinzhuo19970516.github.io/page/pinia.html)