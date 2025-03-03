# viewport 适配方案
postcss-px-to-viewport是一款 postcss 插件，用于将单位转化为 vw， 现在很多浏览器对vw的支持都很好，适配首选方案。
## PostCSS 配置
下面提供了一份基本的 postcss 配置，可以在此配置的基础上根据项目需求进行修改
```js
// postcss.config.js
const path = require('path')

module.exports = ({ file }) => {
  // const designWidth = file.includes(path.join('node_modules', 'vant')) ? 375 : 750
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        // 要转化的单位
        unitToConvert: 'px',
        // 视口的宽度
        viewportWidth: designWidth,
        // 保留几位小数
        unitPrecision: 3,
        // 哪些属性需要修改
        propList: ['*'],
        // 预期单位
        viewportUnit: 'vw',
        // 字体单位
        fontViewportUnit: 'vw',
        // 最小转化单位
        minPixelValue: 1,
        // 媒体查询里面的单位要不要转化
        mediaQuery: true,
        // 替换包含vw单位的
        replace: true,
        // 排除转化文件
        exclude: [],
        // 添加横向转化值
        landscape: false,
        // 横向采用的单位
        landscapeUnit: 'vw',
        // 横屏的视口宽度
        landscapeWidth: false
      }
    }
  }
}
```
## autoprefixer
如果要配置目标浏览器，可使用 package.json 的 browserslist 字段
你只使用无前缀的 CSS 规则即可
## 对比rem
下面这个是rem 适配方案肯定会有的代码
```js
const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
document.querySelector('html').style.fontSize = deviceWidth / 7.5 + 'px';
```

弊端：

* px和rem 需要一个计算比例系数，开发时需要计算，后来又提出 px-to-rem不如直接在代码中写px直观高效。
* rem是相对于html元素字体单位的一个相对单位，从本质上来说，它属于一个字体单位，用字体单位来布局，并不是太合适。


[▲ 回目录](/about.html)