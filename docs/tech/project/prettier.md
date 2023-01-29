---
title: "使用prettier工具"
author: "菜虫"
date: "2023-01-29"
---

# 使用 prettier 工具 :telescope:

> prettier 是一款强大的代码格式化工具,支持 javascript、typescript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言, 基本上前端能用到的文件格式它都可以搞定, 是当下最流行的代码格式化工具

#### 1. 安装 prettier

```sh
npm install prettier -D
```

#### 2. 配置 prettier 文件

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

- useTabs: 使用 tab 缩进还是空格缩进, 选择 false;
- tabWidth: tab 是空格的情况下,是几个空格, 选择 2 个;
- printWidth: 当行字符的长度, 推荐 80;
- singleQuote: 使用单引号还是双引号, 选择 true, 使用单引号;
- trailingComma: 在多行输入的尾逗号是否添加, 设置为 none;
- semi: 语句末尾是否要加分号, 默认值 true, 选择 false 表示不加

#### 3. 创建.prettierignore 忽略文件

```ignore
  /dist/*
  .local
  .output.js
  /node_modules/**

  **/*.svg
  **/*.sh

  /public/*
```

#### 4. VSCode 需要安装 [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) 插件

#### 5. 测试 prettier 是否生效

1. 测试一: 在代码中保存代码;
2. 测试二: 配置一次性修改的命令, 在`package.json`中配置一个`script`:
   ```sh
   "prettier": "prettier --write ."
   ```
