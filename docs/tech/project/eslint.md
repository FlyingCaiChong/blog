---
title: "使用ESLint检测"
author: "菜虫"
date: "2023-01-29"
---

# 使用 ESLint 检测 :checkered_flag:

#### 1. 配置 ESLint 环境

在前面创建项目的时候, 选择了 ESLint, 所以 Vue 会默认帮助我们配置需要的 ESLint 环境.

#### 2. VSCode 需要安装 [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 插件

#### 3. 解决 ESLint 和 prettier 冲突的问题:

安装插件: (vue 在创建项目时, 如果选择了 prettier, 那么这两个插件会自动安装)

```sh
npm i eslint-plugin-prettier eslint-config-prettier -D
```

在.eslintrc.js 中添加 prettier 插件:

```js {12}
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};
```
