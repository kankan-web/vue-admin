---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue-admin"
  text: "后台管理基础框架"
  tagline: 基于vue3 + Typescript + Vite + Pinia + Element-plus
  actions:
    - theme: brand
      text: 开始
      link: /about
    - theme: alt
      text: 访问Github
      link: https://github.com/kankan-web/vue-admin

features:
  - title: 最新流行技术栈
    details: 基于vue3 + Typescript + Vite + Pinia + Element-plus
  - title: 规范工程化工作流
    details: 配置ESLint、Prettier、Husky、Lint-staged等工具，规范前端代码格式
  - title: 丰富的组件和Hooks
    details: 基于Element-plus组件库，封装了丰富的组件和Hooks
---

<div class="contact-section">
  <h2>联系</h2>
  <p>如果有任何疑问，可直接微信联系我，秒回</p>
  <div class="qrcode-container">
    <img src="./image/wx.png" alt="微信二维码">
  </div>
</div>

<style>
.contact-section {
  text-align: center;
  margin: 0px auto;
  padding: 20px;
  max-width: 600px;
}

.contact-section h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--vp-c-brand);
  margin-top: 20px;
}

.contact-section p {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: var(--vp-c-text-1);
}

.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.qrcode-container img {
  max-width: 200px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.qrcode-container img:hover {
  transform: scale(1.05);
}
</style>