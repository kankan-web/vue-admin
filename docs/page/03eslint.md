# 基础环境搭建
## 🍎前言

总结了一份自己的前端工作流搭建流程，方便以后使用。包含：

1.  一个标准化的项目初始化
2.  eslint、stylelint及prettier的配置及自动保存修复
3.  代码提交规范的第三方工具强制约束

基础模版代码：[vue-template](https://github.com/kankan-web/vue-template/tree/workflow-template)

> 版本备注：
>
> 1.  node：18.18.0
> 2.  pnpm：9.6.0

## 一、项目搭建

### package.json

package.json 文件是 Node.js 项目中的一个重要配置文件，主要用于管理项目的依赖、脚本、版本信息等。

*   **项目元数据（Metadata）** : 它包含了项目的元数据，如项目名称、版本、描述、作者、许可证等。
*   **依赖管理（Dependency Management）** : 它列出了项目所依赖的npm包及其版本，这包括dependencies和devDependencies等。
*   **脚本（Scripts）** : scripts字段允许定义可以通过npm run命令执行的脚本，使得启动、构建、测试和部署等操作可以自动化。
*   **版本控制（Version control）** : 通过version字段指定，可以帮助管理项目的发布和版本控制。
*   **配置平台（Platform Config）** : 可以包含一些项目的配置选项，供其他工具（如 Babel、ESLint 等）使用。

```sh
pnpm init -y
```

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "这是一个示例项目",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "author": "你的名字",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^26.6.0"
  }
}
```

### LICENSE

在软件项目中，LICENSE文件是指许可证文件，它包含了关于软件授权和使用的条款和条件。LICENSE文件用于明确告知其他人在使用、修改或分发项目的源代码或二进制文件时需要遵守的规则。

LICENSE文件的存在对于开源软件项目尤为重要，因为它定义了项目的开源许可证类型和条款。开源许可证允许用户自由地使用、修改和分发软件，同时也规定了一些限制和责任。常见许可证类型：

*   MIT 许可证：允许几乎任何人使用、复制、修改和分发代码，只需保留版权声明。
*   Apache 2.0 许可证：允许使用、修改和分发代码，要求包含许可证和版权声明。
*   GPL 许可证：要求衍生作品以相同许可证发布，确保代码的自由使用。
*   BSD 许可证：类似于 MIT 许可证，允许使用、修改和分发，但有附加条款。

> 可前往：[choosealicense](https://link.juejin.cn?target=https%3A%2F%2Fchoosealicense.com%2F "https://choosealicense.com/")网站选择一个合适的，更多相关的内容可阅读：[添加许可到仓库](https://docs.github.com/zh/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository)

### .gitignore

.gitignore 文件是一个文本文件，用于告诉 Git 哪些文件或目录应该被忽略，不纳入版本控制。某些文件（临时文件、编译生成的文件、日志文件、敏感信息文件等）可以不包含在版本控制中，以保持版本库整洁及信息保护。通过忽略不必要的文件，也可以减少 Git 需要处理的文件数量，从而提高性能。

该文件遵循的匹配规则：

*   `*` 用作通配符匹配
*   `/` 用于忽略相对于 `.gitignore` 文件的路径名
*   `#` 用于将注释添加到 `.gitignore` 文件

```.gitignore
# 忽略 Node.js 依赖
node_modules/

# 忽略编译生成的文件
dist/

# 忽略日志文件
*.log

# 忽略环境变量文件
.env

# 忽略操作系统生成的文件
.DS_Store
Thumbs.db
```

### .npmrc

`npmrc` 是个配置文件，用于配置 npm 包管理器的行为和设置。它用于配置 npm 的命令行工具的行为，例如设置镜像源、代理、缓存路径等。

`npmrc` 是 npm 的配置文件，通常是 `.npmrc` 文件。你可以在项目级别或全局级别创建 `.npmrc` 文件来配置 npm 的行为。

**配置方式：**

1.  **项目级别配置：** 在项目根目录下创建 `.npmrc` 文件，并添加所需配置。
2.  **全局级别配置：** 使用命令 `npm config edit` 打开全局配置文件，并添加所需配置。

**常见配置项：**

*   `registry`：配置 npm 源，例如使用淘宝镜像加速安装。
*   `proxy` 和 `https-proxy`：如果在公司网络中工作，可以配置 HTTP 或 HTTPS 代理。
*   `cache`：可以配置 `npm` 的缓存目录。
*   `prefix`：设置全局安装包的路径。
*   `strict-ssl`：是否强制使用 SSL。

```.npmrc
# .npmrc

# 设置下载源为淘宝镜像，淘宝证书到期了，换了
registry=https://registry.npm.taobao.org/

# 设置代理服务器
proxy=http://proxy.example.com:8080
https-proxy=http://proxy.example.com:8080

# 设置包的缓存路径
cache=/path/to/npm-cache

# 设置全局安装包的路径
prefix=/path/to/npm-global
```

### README.md

README.md文件通常是一个项目的说明文档，用于向其他开发者或用户介绍项目的内容、使用方法、贡献指南等信息。`.md`代表Markdown格式，Markdown是一种轻量级的标记语言，用于简单地排版文档。

README.md文件通常包含以下内容：

*   **项目名称和简介**：简要介绍项目的名称、功能和用途。
*   **安装说明**：指导用户如何安装项目的依赖或部署项目。
*   **使用方法**：说明如何使用项目，包括配置、运行命令等。
*   **示例**：提供一些示例代码或截图，展示项目的功能。
*   **贡献指南**：说明如何贡献代码或报告问题。
*   **版本历史**：列出项目的版本历史和更新内容。
*   **许可证信息**：说明项目的许可证类型和使用限制。

## 二、代码规范

### 工具介绍

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d1d3ddbbf062408fa312428ae7023ec7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=EPZCWSGTufsofDMsSHb0FjwvWA0%3D)

*   [ESLint](https://eslint.org/)： 是一款用于查找并报告代码中问题的工具
*   [Stylelint](https://stylelint.io/)： 是一个强大的现代 CSS 检测器
*   [Prettier](https://prettier.io/)： 是一款强大的代码格式化工具，支持多种语言
*   [lint-staged](https://github.com/okonet/lint-staged)： 是一个在 git 暂存文件上运行 linters 的工具
*   [husky](https://typicode.github.io/husky/#/)： 是 Git Hook 工具，可以设置在 git 各个阶段触发设定的命令

### 代码风格工具

#### 1. editorconfig

[EditorConfig](https://editorconfig.org/) 的优先级高于编辑器自身的配置，因此可用于维护不同开发人员、不同编辑器的编码风格。编码风格：缩进风格、换行符类型、字符编码等。

在项目根目录下增加 `.editorconfig` 文件进行配置即可，以下为参考配置：

```.editorconfig
# 表示这是项目根目录下的顶级 .editorconfig 文件，编辑器在查找配置时会停止向上查找
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
indent_style = tab # 使用制表符缩进
max_line_length = off
trim_trailing_whitespace = false
```

VSCode需要安装一个插件：EditorConfig for VS Code

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/92f22aa0fdf14907a1c7bd732b54001e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=6gxTqNzXBVhsGRmdpaw2usiz3b8%3D)

常见配置项：

*   `root`：是否是项目根目录下的顶级 .editorconfig 文件。
*   `indent_style`：缩进风格，可以是 tab（制表符）或 space（空格）。
*   `indent_size`：缩进大小，对于 tab 缩进风格无效。
*   `tab_width`：制表符宽度，用于 tab 缩进风格。
*   `end_of_line`：换行符类型，可以是 lf（Unix 风格）、crlf（Windows 风格）或 cr（旧版 Mac 风格）。
*   `charset`：字符编码，通常设置为 utf-8。
*   `trim_trailing_whitespace`：是否去除行末多余的空格。
*   `insert_final_newline`：文件末尾是否插入空行。 以上是一些常见的配置项，具体可以根据项目需要进行配置。详细的配置项列表和说明可以参考EditorConfig 官方文档。

> 参考资料：<https://editorconfig.org/>

#### 2. prettier

**Prettier** 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

**使用**

1.  安装**prettier**：`pnpm add prettier -D`
2.  配置`.prettierrc`文件：

```json
{
  //使用单引号还是双引号，选择true，使用单引号；
  "singleQuote": true,
  //tab是空格的情况下，是几个空格，选择2个；
  "tabWidth": 2,
  //箭头函数的参数总是使用括号
  "arrowParens": "always",
  //对象字面量中的括号前后有空格。
  "bracketSpacing": true,
  //保持原有的换行方式
  "proseWrap": "preserve",
  //在多行输入的尾逗号是否添加，设置为 `all`
  "trailingComma": "all",
  //在 JSX 中使用双引号，设置为false
  "jsxSingleQuote": false,
  //当行字符的长度，推荐80，也有人喜欢100或者120；
  "printWidth": 100,
  //自动识别并使用合适的行结束符
  "endOfLine": "auto"
}
```

3.  VSCode需要安装prettier的插件

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7034290fc668438eb2e9de7b3d7df99d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=3%2FIMJVqZlUFxGPeQjV1B0t5fWLc%3D)
4\. 测试prettier是否生效

*   测试一：在代码中保存代码；
*   测试二：配置一次性修改的命令；

在package.json中配置一个scripts：

```json
"prettier": "prettier --write ."
```

##### 配置保存自动格式化

建议为每个项目添加vscode独有的设置，也就是在项目的根目录中创建一个`.vscode`目录，里面放置一个`setting.json`文件，这样vscode会优先读取该设置。

这样可以保证别人下载你的项目进行开发时，也不会因为全局`setting.json`的配置不同而导致`Prettier`或者`ESLint`、`StyleLint`失效，接下来在该文件内输入以下代码：

```json
{
	// =======================下面是配置prettier格式化的setting===================
	// 指定哪些文件不参与搜索
	"search.exclude": {
	  "**/node_modules": true,
	  "dist": true,
	  "build": true,
	  "yarn.lock": true
	},
	// 保存自动格式化
	"editor.formatOnSave": true,
	"[javascript]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascriptreact]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescriptreact]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[json]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[html]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[markdown]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[css]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[less]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[scss]": {
	  "editor.defaultFormatter": "esbenp.prettier-vscode"
	},
  }
```

`editor.formatOnSave`的作用是在我们保存时，会自动执行一次代码格式化，而我们该使用什么格式化器？接下来的代码便是设置默认的格式化器，看名字大家也能看得出来了吧！

在遇到 .js 、 .jsx 、.ts 、.tsx 、.json 、.html 、.md 、 .css 、 .less 、 .scss 为后缀的文件时，都会去使用 Prettier 去格式化代码，而格式化的规则就是我们配置的 .prettierrc 决定的！

#### 3. .prettierignore

忽略格式化的文件

```.prettierignore
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

### 代码质量工具

#### 1. ESLint

ESLint 是一个用于 JavaScript 代码的静态代码分析工具，它可以帮助开发人员发现和修复代码中的问题，确保代码的质量和一致性。ESLint 可以检查代码中的语法错误、代码风格问题以及可能的逻辑错误。

##### 相较于ESLint9的更新

1.  不再支持`Node<v18.18.0`版本了，以前的老版本Node已经跑不起最新的`ESLint9`了
2.  配置文件格式的改动：

*   全面采用扁平配置系统，移除旧版层级配置
*   移除对`.eslintrc`文件的支持
*   现配置文件更改为`eslint.config.js`｜`eslint.config.cjs`｜`eslint.config.mjs`
    使用者只需要关心上面2个，至于API方面可以去官网查找。

> 关于配置文件改动肯定是最大的一部分，因为很多插件是还没有适配过来的，官网有一篇配置迁移指南可以参考[ESLint9的配置迁移指南](https://eslint.org/docs/latest/use/configure/migration-guide)

##### 安装ESLint9

安装依赖：

```bash
pnpm add eslint@9 -D
```

官方推荐执行：

```sh
pnpm init @eslint/config@latest
//或者
npx eslint --init
```

会问这几个问题：

```sh
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · vue
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · browser, node
The config that you've selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint, eslint-plugin-vue
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
☕️Installing...
```

此时根目录下会生成`eslint.config.js`文件，这是eslint最新的配置文件。打开文件，内容如下：

```eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  /*配置全局变量*/
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  /*js推荐配置*/
  pluginJs.configs.recommended,
  /*ts推荐配置*/
  ...tseslint.configs.recommended,
  /*vue推荐配置*/
  ...pluginVue.configs["flat/essential"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];
```

*   **第一个对象**：指定了要检查的文件类型（JavaScript、TypeScript和Vue文件）
*   **globals**：使用`globals`配置所有全局变量.对于ESLint来说，任何变量都需要定义，不管是否为全局变量。若不定义，比如在项目中`console`时，则会提示`‘console’ is not defined`
*   **pluginJS**：`ESLint`是默认支持解析`JavaScript`的，所以我们只需要启动相对🈺的规则名称即可。使用`@eslint/js`中推荐的规则集，用于JavaScript约束
*   **tseslint**：由于ESlint本身只支持识别JavaScript，所以对于**Typescript**需要使用`typescript-eslint`，用于对`vue-ts`的支持，同时本身也集成了`typescript`的`recommended`配置，用于对**Typescript**约束
*   **pluginVue**：由于ESlint本身只支持识别JavaScript，所以对于**Vue**需要使用`eslint-plugin-vue`，来支持识别Vue，同时使用`pluginVue.configs["flat/essential"]`用于项目中**Vue**文件规则配置
*   **最后一个对象**：确保ESLint在处理`.vue`文件时能正确解析TypSrcipt

##### 配置保存自动修复

1.  安装ESLint插件
    ![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c704a7dc4a3b4bb6a65ed508dd0f3212~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=HtHx16uzUFvaFJg70Psf12%2FO0PQ%3D)
2.  到之前创建的.vscode/setting.json中添加如下代码

```setting.json
{
   //========================eslint===================================
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "typescript.tsdk": "./node_modules/typescript/lib", // 代替 vscode 的 ts 语法智能提示
  // 保存自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
}
```

#### 2. ESLint与Prettier冲突

有时候`ESLint`定义的规则会与`prettier`定义的规则发生冲突，我们可以使用**eslint-plugin-prettier**。

这个插件不仅提供文件解析、代码fix，也顺带提供了一些规则配置。在`ESlint`与`prettier`发生冲突时，这个插件会将**冲突规则**的`ESlint`给`off`掉。也就是说，二选一，**优先选择prettier**。

```bash
pnpm add eslint-plugin-prettier -D
```

```eslint.config.js
import eslintPluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...其他代码
  eslintPluginPrettier,
];

```

#### 3. styleLint

`StyleLint` 是一个支持多种样式语言、可高度定制、支持插件扩展和自动修复的现代 CSS 样式检查工具，适合集成到编辑器和构建工具中以保持代码风格一致性和提高代码质量。

要开始使用 StyleLint，首先需要安装 StyleLint 包，然后在项目中配置一个 `.stylelintrc` 文件来指定检查规则。可以通过命令行工具或与构建过程集成来运行 StyleLint。当 StyleLint 检测到问题时，它会生成报告，其中包含有关问题的详细信息和建议的修复方法。

1.  安装

```sh
pnpm add stylelint stylelint-config-standard -D
```

2.  配置`.stylelintrc.js`文件

```js
/** @type {import('stylelint').Config} */

export default {
  // 从标准配置中继承规则
  extends: [
    "stylelint-config-standard",
    "stylelint-config-rational-order",
    "prettier",
  ],
  plugins: [
    "stylelint-declaration-block-no-ignored-properties",
    "stylelint-prettier",
  ],
  // 规则配置
  rules: {
    // 禁用注释前的空行规则
    "comment-empty-line-before": null,
    // 禁用声明前的空行规则
    "declaration-empty-line-before": null,
    // 指定函数名的大小写为小写
    "function-name-case": "lower",
    // 禁用选择器特异性递减规则
    "no-descending-specificity": null,
    // 禁用无效的双斜杠注释规则
    "no-invalid-double-slash-comments": null,
    // 指定规则前需要空行
    "rule-empty-line-before": "always",
    //stylelint-declaration-block-no-ignored-properties 用于提示我们写的矛盾样式
    "plugin/declaration-block-no-ignored-properties": true,
  },

  // 忽略检查的文件或文件夹
  ignoreFiles: ["node_modules/**/*", "build/**/*"],
};

```

*   `extends`：可以从已有的 StyleLint 配置中继承规则。这样可以避免重复定义相同的规则集。例如，"extends": "stylelint-config-standard" 将从标准配置中继承规则。

*   `plugins`：用于指定要使用的 StyleLint 插件。插件可以添加额外的规则或功能。例如，"plugins": \["stylelint-scss"] 将启用 SCSS 相关的规则和功能。

*   `rules`：指定项目中的规则配置。可以根据项目需求启用、禁用或修改规则。例如，"rules": { "indentation": "tab", "selector-pseudo-class-no-unknown": \[true, { "ignorePseudoClasses": \["global"] }] } 将规定使用制表符缩进，并忽略全局伪类的未知类规则。

*   `ignoreFiles`：指定 StyleLint 忽略检查的文件或文件夹。可以使用 glob 模式匹配多个文件或文件夹。例如，"ignoreFiles": \["node\_modules/", "\*\*/\*.min.css"] 将忽略 node\_modules 文件夹和所有.min.css 文件。

##### 配置保存自动修复

安装stylelint插件
![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/d29acbe9770e48d0ba970acc78ccd761~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=Yf0ZDzG17rN6nab1RX9r%2FOtPQtw%3D)

并且在 .vscode/settings.json 中增加以下代码：

```json
// ========================stylelint==============================
  // 使用 stylelint 自身的校验即可, 关闭vscode验证
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["css", "less", "sass", "scss"]
  // 在editor.codeActionsOnSave中增加styleLint修复
  
  // 保存自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  },
// ===============================================================

```

##### 配置根据分组排序

就是配置这个总是不生效，我还以为配置出错了，重启vscode！！！，重启vscode！！！重启vscode！！！，

```sh
yarn add stylelint-config-rational-order@0.1.2 -D
```

会按照如下属性进行分组排序

```sh
1.Positioning   2.Box Model    3.Typography    4.Visual    5.Animation    6.Misc
```

##### 提示我们写的矛盾样式

stylelint-declaration-block-no-ignored-properties 用于提示我们写的矛盾样式，比如下面的代码中 width 是会被浏览器忽略的，这可以避免我们犯一些低级错误～

```sh
yarn add stylelint-declaration-block-no-ignored-properties@2.8.0 -D
```

lint文件中配置

```js
// .stylelintrc
{
  "plugins": ["stylelint-declaration-block-no-ignored-properties"],
  "rules": {
    "plugin/declaration-block-no-ignored-properties": true
  }
}

```

## 三、git 提交规范

前面我们通过了`pretter+ESLint+StyleLint`解决了代码格式的问题，但是代码规范并不仅仅只是**代码格式风格规范**和**代码质量规范**，还有另外一个很重要的规范就是 **git 提交规范**

在现在的项目开发中，通常情况下，我们都会通过 git 来管理项目。只要通过 git 来管理项目，那么久必然会遇到使用 git 提交代码的场景

当我们执行 `git commit -m "描述信息"` 的时候，我们知道此时必须添加一个描述信息。但是中华文化博大精深，不同的人去填写描述信息的时候，都会根据自己的理解来进行描述。

而很多人的描述 “天马行空” ，这样就会导致别人在看你的提交记录时，看不懂你说的什么意思？不知道你当前的这次提交到底做了什么事情？会不会存在潜在的风险？

比如说，我们来看这几条提交记录：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7ab4483d2fa149258a46ece54088ba43~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=5n1f6GG3SVfLKVDbEjCpasGBkWA%3D)

你能够想象得到它们经历了什么吗？

所以 `git` **提交规范** 势在必行。

### 1. commitlint

配置提交校验，`commitlint`可以帮助我们进行 `git commit` 时的 `message` 格式是否符合规范

1.  安装

```bash
pnpm add @commitlint/cli @commitlint/config-conventional -D
```

`@commitlint/config-conventional` 这是一个规范配置，标识采用什么规范来执行消息校验, 这个默认是Angular的提交规范

2.  新增配置文件.`commitlintrc.js`

```js
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "ci",
        "chore",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "addLog",
      ],
    ],
  },
};
```

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ad5412ce14b14beeabb1c9a39efc71c3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=Ay8JEqYs9vKnz57TFdRJ83MBCeY%3D)

那么到这里我们就已经可以使用`git cz` 来代替了 `git commit` 实现了规范化的提交诉求了，但是当前依然存在着一个问题，那就是我们必须要通过 `git cz` 指令才可以完成规范化提交！

那么如果有马虎的同事，它们忘记了使用 `git cz` 指令，直接就提交了怎么办呢？

那么有没有方式来限制这种错误的出现呢？

答案是有的！借用`git Hooks`的帮助。

### 2. git Hooks

先来明确一下我们最终要实现的效果：

我们希望：

当《提交描述信息》不符合 [约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 的时候，阻止当前的提交，并抛出对应的错误提示

而要实现这个目的，我们就需要先来了解一个概念，叫做 `Git hooks（git 钩子 || git 回调方法）`

也就是：`git` **在执行某个事件之前或之后进行一些其他额外的操作**

而我们所期望的 **阻止不合规的提交消息**，那么就需要使用到 `hooks` 的钩子函数。

PS：详细的 `HOOKS介绍` 可点击[这里](https://git-scm.com/docs/githooks)查看

整体的 `hooks` 非常多，我们其中用的比较多的其实只有两个：

| Git Hook       | 调用时机                                                                                | 说明                            |
| -------------- | ----------------------------------------------------------------------------------- | ----------------------------- |
| **pre-commit** | `git commit`执行前 它不接受任何参数，并且在获取提交日志消息并进行提交之前被调用。脚本`git commit`以非零状态退出会导致命令在创建提交之前中止。 | 可以用`git commit --no-verify`绕过 |
| **commit-msg** | `git commit`执行前 可用于将消息规范化为某种项目标准格式。 还可用于在检查消息文件后拒绝提交。                               | 可以用`git commit --no-verify`绕过 |

简单来说这两个钩子：

1.  `commit-msg`：可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交
2.  `pre-commit`：会在提交前被调用，并且可以按需指定是否要拒绝本次提交

而我们接下来要做的关键，就在这两个钩子上面。

### 3. husky+commitlint 检查提交描述是否符合规范

要完成检查提交是否符合规范，我们需要使用到两个工具：

1.  [commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交工具
2.  [husky](https://github.com/typicode/husky)：是 git hooks 工具

注意：npm 需要在 7.x 以上版本！！！

上述已经介绍了[ commitlint](https://www.yuque.com/an-egg/web-stuff/vrl8fg4wfdg173l4#DRcoI)，接下来我们将介绍 husky 的安装及使用：

**husky**：是一个用于简化Git钩子（hooks）的设置的工具，允许开发者轻松地在各种Git事件触发时运行脚本。例如，在提交之前（pre-commit）、推送之前（pre-push）、或者在提交信息被写入后（commit-msg）等。

**操作步骤：**

1.  安装依赖：

```bash
pnpm add husky -D
```

2.  启用`husky`，执行如下命令会自动在`package`中增加命令，并生成`.husky` 文件夹

```bash
npx husky install
```

3.  `husky prepare` 命令，自动加入，有时候也没法自动加入，手动写也是可以的

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

5.  添加 `commitlint` 的 `hook` 到 `husky`中，并指令在 `commit-msg` 的 `hooks` 下执行 `npx --no-install commitlint --edit "$1"` 指令

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/aeb10e01ebb041d98162c3a97dbe8bb2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=NQ4pMxgpDfCwYMgxNsWxG1nfZN0%3D)

6.  随后回到 `package.json` 的 `husky` 配置，增加一个钩子，并且改写`husky`的`commit-msg`钩子

```json
"husky": {
  "hooks": {
    "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
  }
}
```

至此， 不符合规范的 commit 将不再可提交：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e78105d3d54e47db8386652664014fcf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=mVBeSeifb56l8NziIBSwxnliEkY%3D)

那么至此，我们就已经可以处理好了 **强制规范化的提交要求**，到现在 **不符合规范的提交信息，将不可在被提交！**

### 4. 配置可视化代码提交提示

```bash
pnpm add cz-conventional-changelog -D
```

在pageage.json中增加更改commitizen的配置，并增加脚本

```json
"config":{
    "commitizen":{
        "path":"node_modules/cz-conventional-changelog"
    }
}

"scripts":{
    commit:"git-cz"
}
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/376a01a7ec3b487cbcaa179c31ab929d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=VolZzawmNf3HHHks%2FagKMmA9uqw%3D)

那么到这里我们的**规范化目标**就完成了吗？

当然没有！

现在我们还缺少一个**规范化的处理** ，那就是 **代码格式提交规范处理！**

### 5. 通过 pre-commit+lint-staged 监测提交时代码规范并自动格式修复错误

虽然已经有 `eslint` 和 `prettir` 来对代码进行了代码质量和代码风格上的约束，但是有人依旧我行我素，强制将不规范的代码提交至代码仓库中，这种情况就可以用到 pre-commit+lint-staged

1.  pre-commit：会在提交前被调用，并且可以按需指定是否要拒绝本次提交
2.  lint-stage：**只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**

**操作步骤**

1.  安装依赖

```bash
pnpm add lint-staged -D
```

2.  在 package.json 中新增

```json
{
    "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js}": [
      "eslint --config .eslintrc.js"
    ],
    "*.{css,less,scss}": [
      "stylelint --config .stylelintrc.js"
    ],
    "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
      "prettier --write"
    ]
  },
}
```

3.  修改`.husky/pre-commit`脚本的内容，将.`husky/pre-commit`脚本的内容改为：

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cd35fce7025141ff9a017c87b9baebfe~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=otUuZnlV2689ML7GY8VkUhLlMDA%3D)

通过上面的步骤，就完成了`lint-staged`的配置，这个时候再进行 git 提交时，将只检查暂存区（staged）的文件，不会检查项目所有文件，加快了每次提交 lint 检查的速度，同时也不会被历史遗留问题影响。通过这样的约束让我们定义的规则规范大家都能去遵守，共同维护代码的质量。

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ddb1454ddaea457da9631109ff1b5bb5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5aif6JuL:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMjczMTQ2MDIwMTA4MTA0In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1741570608&x-orig-sign=ElJ0Qs%2FUv5j1oIfU6YTTehdMrDk%3D)

## 四、typescript

`tsconfig.json`是 TypeScript 项目的配置文件，放在项目的根目录。反过来说，如果一个目录里面有`tsconfig.json`，TypeScript 就认为这是项目的根目录。

1.  安装

```sjh
pnpm add typescript -D
```

2.  初始化配置文件

```sh
npx tsc --init
```

4.  更改配置文件的内容如下，然后重启vscode，因为有时候抽风，vscode需要重新构建依赖树和缓存，所以重启之后这个报错就消失了

```json
{
  "compilerOptions": {
    // 基本配置
    "target": "ES5", // 编译成哪个版本的 es
    "useDefineForClassFields": true,
    "noImplicitAny": true, // 禁止隐式具有“any”类型
    "module": "ESNext", // 指定生成哪个模块系统代码

    "allowJs": true, // 允许编译 js 文件
    "jsx": "preserve", // 在 .tsx 文件里支持 JSX
    "isolatedModules": true,
    "strict": true, // 启用所有严格类型检查选项
    "types": ["vite/client"],
    "sourceMap": true,
    "lib": ["ESNext", "DOM"], // 编译过程中需要引入的库文件的列表

    // 模块解析选项
    "moduleResolution": "node", // 指定模块解析策略
    "esModuleInterop": true, // 支持 CommonJS 和 ES 模块之间的互操作性
    "resolveJsonModule": true, // 支持导入 json 模块
    "baseUrl": "./", // 根路径
    "paths": {
      // 路径映射，与 baseUrl 关联，这个需要跟webpack一一对应，我们后面会讲解如何配置&使用
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    },

    // 实验性选项
    "experimentalDecorators": true, // 启用实验性的ES装饰器
    "emitDecoratorMetadata": true, // 给源码里的装饰器声明加上设计类型元数据

    // 其他选项
    "forceConsistentCasingInFileNames": true, // 禁止对同一个文件的不一致的引用
    "skipLibCheck": true, // 忽略所有的声明文件（ *.d.ts）的类型检查
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入
    "noEmit": true // 只想使用tsc的类型检查作为函数时（当其他工具（例如Babel实际编译）时）使用它
  },
  "include": [
    // 这将包括 src 目录下的所有文件
    "src/**/*" // 这将包括 src 目录下的所有文件
  ],
  "exclude": [
    "node_modules" // 排除 node_modules 目录
  ]
}
```

##### 介绍下tsconfig常见的配置

1.  `exclued`：属性是一个数组，必须与`include`属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与`include`属性相同的通配符
2.  `include`：`include`属性指定所要编译的文件列表，既支持逐一列出文件，也支持通配符。文件位置相对于当前配置文件而定。

```json
{
  "include": ["**/*"],
  "exclude": ["**/*.spec.ts"]
}
```

3.  `file`：`files`属性指定编译的文件列表，如果其中有一个文件不存在，就会报错。
4.  `references`：`references`属性是一个数组，数组成员为对象，适合一个大项目由许多小项目构成的情况，用来设置需要引用的底层项目。
5.  `compileOptions`：用来定制编译行为

#####

| 配置项                | 作用                                               |
| ------------------ | ------------------------------------------------ |
| `target`           | 指定编译后的 JavaScript 目标版本（如 `ES5`、`ES6`、`ES2020`等）。 |
| `module`           | 指定模块系统（如 `CommonJS`、`ES6`、`UMD`等）。               |
| `lib`              | 指定包含的库文件（如 `["ES6", "DOM"]`）。                    |
| `outDir`           | 指定编译后的输出目录。                                      |
| `rootDir`          | 指定源代码的根目录。                                       |
| `strict`           | 启用所有严格类型检查选项（推荐开启）。                              |
| `noImplicitAny`    | 禁止隐式的 `any`类型（推荐开启）。                             |
| `strictNullChecks` | 启用严格的 `null`和 `undefined`检查（推荐开启）。               |
| `esModuleInterop`  | 允许兼容 CommonJS 和 ES 模块（推荐开启）。                     |
| `skipLibCheck`     | 跳过库文件的类型检查，提升编译速度。                               |
| `allowJs`          | 允许编译 JavaScript 文件。                              |
| `checkJs`          | 对 JavaScript 文件进行类型检查（需开启 `allowJs`）。            |
| `jsx`              | 指定 JSX 的编译方式（如 `preserve`、`react`、`react-jsx`等）。 |
| `declaration`      | 生成 `.d.ts`类型声明文件。                                |
| `sourceMap`        | 生成 `.map`源映射文件，便于调试。                             |
| `baseUrl`          | 设置模块解析的基准路径。                                     |
| `paths`            | 配置路径别名，简化模块导入。                                   |
| `isolatedModules`  | 确保每个文件可以独立编译（推荐开启）。                              |
| `noEmitOnError`    | 如果有类型错误，不生成编译输出。                                 |
| `incremental`      | 启用增量编译，提升编译速度。                                   |
| `composite`        | 启用项目引用（Project References）支持。                    |

##### 使用他人的tsconfg.json

你也可以使用别人预先写好的 tsconfig.json 文件，npm 的`@tsconfig`名称空间下面有很多模块，都是写好的`tsconfig.json`样本，比如 `@tsconfig/recommended`和`@tsconfig/node16`。

1.  安装依赖模块

```bash
pnpm add --dev @tsconfig/deno
```

3.  在tsconfig.json中引用这个模块

```json
{
  "extends": "@tsconfig/deno/tsconfig.json"
}
```

## 参考文章

*   [commitizen + husky 规范git提交信息](https://juejin.cn/post/6844904025868271629?searchId=20240404230547BCC4A2A240F03741F8E6#heading-1 "https://juejin.cn/post/6844904025868271629?searchId=20240404230547BCC4A2A240F03741F8E6#heading-1")
*   [我是这样搭建Typescript+React项目环境的！](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvortesnail%2Fblog%2Fissues%2F14 "https://github.com/vortesnail/blog/issues/14") 本文主要流程参考这篇文章，将文章中的包换成了相对较新的，解决了配置过程中存在的问题，增加了一些没有的配置
*   [Eslint + Prettier + Husky + Commitlint+ Lint-staged 规范前端工程代码规范](https://juejin.cn/post/7038143752036155428?searchId=20240404224332BDEE7231DFF8823CE5F7#heading-5 "https://juejin.cn/post/7038143752036155428?searchId=20240404224332BDEE7231DFF8823CE5F7#heading-5")
*   [【前端工程化】项目搭建篇-项目初始化\&prettier、eslint、stylelint、lint-staged、husky](https://juejin.cn/post/7353963878541246504)
