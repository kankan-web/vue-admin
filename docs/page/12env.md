# 配置多环境变量

## 命令

package.json 里的scripts 配置build
```json

"build:staging": "vite build --mode staging --config scripts/config/vite.config.ts",
"build:production": "vite build --mode production --config scripts/config/vite.config.ts",

```

可以根据自己业务情况去实际扩展

## 环境变量

目录下3个环境变量文件

-   .env.development
-   .env.staging
-   .env.production

分别对应，通用的环境变量，测试环境变量，线上环境变量

获取时，无论什么命令都会优先获取 .env 里的环境变量，再根据不同命令，执行不同的环境变量文件，遇到相同的环境变量会进行覆盖

目前我对主要定义的几个环境变量进行说明

```js
# 平台本地运行端口号
VITE_PORT=8848

# 开发环境读取配置文件路径
VITE_PUBLIC_PATH = /

# base api
VITE_APP_BASE_API='/dev-api'
```

[▲ 回目录](/about.html)