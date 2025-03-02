# 背景

我们使用less、sass主要是为了使用他们提供的**变量**、**函数**等特性。 如果不进行配置，只在入口文件引入，在各个子页面里是无法直接使用，如果使用，还需要再次引用 这个对使用者非常不友好。

# 使用方式

### 1. 安装依赖

```bash
# 安装 SCSS/SASS（两者是同一依赖）
pnpm add -D sass

# 安装 LESS
pnpm add -D less
```

### 2. 配置 Vite

在 `vite.config.js` 中配置预处理器的全局变量（可选）和语法支持：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      // 配置 SCSS/SASS
      scss: {
        // 全局注入变量文件（路径根据项目调整）
        additionalData: `@import "@/styles/variables.scss";`
      },
      // 配置 LESS
      less: {
        additionalData: `@import "@/styles/variables.less";`
      }
    }
  }
})
```

**注意**：这里使用了别名@，记得提前在`resolve`中进行配置，否则不生效

### 3. 直接使用

-   **SCSS/SASS**

```html
<template>
  <div class="demo">Hello SCSS/SASS</div>
</template>

<style lang="scss">
/* 直接使用全局变量 */
.demo {
  color: $primary-color;
  &:hover {
    background: darken($primary-color, 10%);
  }
}
</style>
```

-   **LESS**

```html
<template>
  <div class="demo">Hello LESS</div>
</template>

<style lang="less">
// 使用全局变量
.demo {
  color: @primary-color;
  &:hover {
    background: fade(@primary-color, 90%);
  }
}
</style>
```

### 4. **全局变量文件示例**

-   **SCSS/SASS**

```css
// variables.scss
$primary-color: #42b983;
$padding: 16px;
```

-   **LESS**

```css
// variables.less
@primary-color: #42b983;
@padding: 16px;
```

# 为什么在入口文件中引入变量文件不会直接生效？

**编译时处理**：Less 和 SCSS 变量需要在样式文件中被编译成 CSS。如果你在 JavaScript 入口文件中引入这些变量文件，它们不会被 CSS 预处理器处理，因此这些变量不会在样式文件中生效。

**作用域问题**：Less 和 SCSS 变量的作用域是局部的，它们只在定义它们的文件中或通过 `@import` 引入的文件中生效。在 JavaScript 中引入这些文件并不会将它们的作用域扩展到整个项目

# 思考与总结

### 总结

一般来说，一个项目使用一个css 预处理器，less 或者sass，因为我极其不适应 stylus的无括号缩进模式，所以就里没有说stylus。

一般在项目中使用 css 预处理都是处于两个原因：

-   可以定义变量，然后在全局中任意地方使用
-   可以嵌套：允许将选择器嵌套在父选择器中，使代码结构更清晰，减少重复代码。
-   模块化支持，SCSS 通过 `@import` 和 `@use` 支持模块化，LESS 通过 `@import` 支持模块化，但所有导入的内容都会合并到全局作用域。
    -   `@import`：传统的导入方式，但会将所有内容合并到全局作用域。
    -   `@use`：推荐的方式，支持模块化导入，避免全局污染。

其实现在的原生 CSS 已经支持了定义变量，而且直接在主入口文件中定义，就可以直接在项目中使用，比 less、scss 等预处理方便的多。

同时原生 CSS 通过 `@import` 和 CSS Modules 来支持模块化：

-   `@import`：可以将样式拆分为多个文件，但性能较差（每个 `@import` 都会发起 HTTP 请求）。
-   CSS Modules：通过构建工具（如 Webpack、Vite）实现，将 CSS 文件作用域限定在组件内，避免全局污染。

同时原生 CSS 嵌套语法目前处于 **草案阶段**（CSS Nesting Module Level 1），尚未被所有浏览器完全支持。截至 2023 年，Chrome 和 Edge 已经开始实验性支持，但 Safari 和 Firefox 尚未完全支持。

### 思考

目前而言，我觉得 **SASS/LESS** 等预处理器在很多方面仍然有不可替代的价值。尽管原生 CSS 在不断发展，但在一些关键功能（如变量、嵌套、混合、模块化等）上，原生 CSS 尚未完全落地或实现得不够完善。预处理器能够在一定程度上弥补这些不足，提供更强大、更灵活的样式编写能力，尤其是在大型项目中，预处理器的优势尤为明显。

当然，随着 CSS 生态的演进，另一大主流工具 **UnoCSS** 也逐渐崭露头角。UnoCSS 通过原子化 CSS 的方式，极大地优化了样式开发的效率和性能。它通过按需生成样式，减少了冗余代码，同时提供了高度可定制化的能力，能够与预处理器相辅相成，甚至在某些场景下替代预处理器的部分功能。

总的来说，预处理器和 UnoCSS 各有其适用场景：

-   **SASS/LESS** 更适合需要复杂逻辑、模块化和复用性的项目。
-   **UnoCSS** 则更适合追求极致性能、轻量化和原子化样式的项目。

在未来，随着原生 CSS 的不断完善和 UnoCSS 等新兴工具的普及，开发者将有更多选择来优化样式开发流程，但预处理器在现阶段仍然是不可或缺的重要工具。
