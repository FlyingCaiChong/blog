const nav = require("./config/nav/nav");
const sidebar = require("./config/sidebar/sidebar");

module.exports = {
  title: "知识库", // 网站的标题
  description: "菜虫的知识库", // 网站的描述
  base: "/blog/", // 部署站点的基础路径
  locales: {
    // 提供多语言支持的语言配置
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    nav,
    sidebar,
    lastUpdated: "Last Updated",
    repo: "FlyingCaiChong/blog",
    repoLabel: "查看源码",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "改善此页面",
    smoothScroll: true,
  },
  markdown: {
    lineNumbers: true,
    toc: {
      includeLevel: [2, 3, 4],
    },
  },
  plugins: ["@vuepress/back-to-top"],
};
