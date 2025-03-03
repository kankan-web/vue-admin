import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-admin",
  description: "后台管理基础框架",
  lastUpdated: true,
  base: '/vue-admin/',  // 替换为你的GitHub仓库名称
  outDir: 'docs/.vitepress/dist',
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '项目介绍', link: '/about' }
    ],

    sidebar: [
      {
        text: '项目介绍',
        items: [
          { text: '为什么要写这个项目', link: '/page/01why' },
          { text: '使用pnpm管理包', link: '/page/02pnpm' },
          { text: '规范化处理', link: '/page/03eslint' },
          { text: '自动化生成项目基本模版', link: '/page/04template' },
          { text: 'Pinia', link: '/page/05pinia' },
          { text: 'axios二次封装', link: '/page/07axios' },
          { text: '接入nprogress', link: '/page/09nprogress' },
          { text: 'less sass的优化处理', link: '/page/10lessSass' },
          { text: 'viewport适配方案', link: '/page/11viewport' },
          { text: '环境变量', link: '/page/12env' },
          { text: '兼容性处理方案', link: '/page/13babel' },
          { text: '总结', link: '/page/14summary' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kankan-web/vue-admin' },
      { icon: 'slack', link: 'https://juejin.cn/user/273146020108104' }
    ],
    docFooter:{
      prev: '上一节',
      next: '下一节'
    }
  }
})
