---
title: "npm的使用"
---

# npm

## npm 是什么

npm（“Node 包管理器”）是 JavaScript 运行时 Node.js 的默认程序包管理器。

npm 由两个主要部分组成:

- 用于发布和下载程序包的 CLI(命令行界面)工具
- 托管 JavaScript 程序包的[在线存储库](https://www.npmjs.com/)

## package.json

每个 JavaScript 项目（无论是 Node.js 还是浏览器应用程序）都可以被当作 npm 软件包，并且通过 `package.json` 来描述项目和软件包信息。

当运行 npm init 初始化 JavaScript/Node.js 项目时，将生成 package.json 文件，文件内的内容(基本元数据)由开发人员提供：

- name: JavaScript 项目或库的名称。
- version: 项目的版本。通常，在应用程序开发中，由于没有必要对开源库进行版本控制，因此经常忽略这一块。但是，仍可以用它来定义版本。
- description: 项目的描述。
- license: 项目的许可证。

## npm scripts

package.json 还支持一个 scripts 属性，可以把它当作在项目本地运行的命令行工具。例如，一个 npm 项目的 scripts 部分可能看起来像这样：

```js
{
  "scripts": {
    "dev": "yarn docs:dev",
    "build": "yarn docs:build",
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 2",
    "commit": "cz",
  },
}
```

`vuepress`, `conventional-changelog`, `cz` 不是安装威全局可执行文件, 而是安装在项目本地的 `node_modules/.bin/` 中。
最新引入的 npx 使我们可以像在全局安装程序一样运行这些 node_modules 项目作用域命令，方法是在其前面加上 npx ...（即 npx cz）。

## dependencies vs devDependencies

这两个以键值对象的形式出现，其中 npm 库的名称为键，其语义格式版本为值。

```js
{
  "dependencies": {
    "@actions/core": "^1.2.3",
    "@actions/github": "^2.1.1"
  },
  "devDependencies": {
    "@types/jest": "^25.1.4",
    "@types/node": "^13.9.0",
    "@typescript-eslint/parser": "^2.22.0",
    "@zeit/ncc": "^0.21.1",
    "eslint": "^6.8.0",
    "eslint-plugin-github": "^3.4.1",
    "eslint-plugin-jest": "^23.8.2",
    "jest": "^25.1.0",
    "jest-circus": "^25.1.0",
    "js-yaml": "^3.13.1",
    "prettier": "^1.19.1",
    "ts-jest": "^25.2.1",
    "typescript": "^3.8.3"
  }
}
```

这些依赖通过带有 --save 或 --save-dev 标志的 npm install 命令安装。 它们分别用于生产和开发/测试环境

semver 语义版本`major.minor.patch`模型:

- ^: 表示最新的次版本，例如， ^1.0.4 可能会安装主版本系列 1 的最新次版本 1.3.0。
- ~: 表示最新的补丁程序版本，与 ^ 类似， 〜1.0.4 可能会安装次版本系列 1.0 的最新次版本 1.0.7。

所有这些确切的软件包版本都将记录在 package-lock.json 文件中。

## package-lock.json

该文件描述了 npm JavaScript 项目中使用的依赖项的确切版本。如果 package.json 是通用的描述性标签，则 package-lock.json 是成分表。

## npm 的使用

### 创建 package.json 文件

```sh
npm init
```

### 安装模块

```sh
// 生存环境
npm install <package_name> --save

// 开发环境
npm install <package_name> --save-dev
```

### 更新模块

```sh
npm update
```

### 卸载模块

```sh
npm uninstall <package_name>
```

如果要在卸载模块的同时，也将他从 package.json 文件中移除，可以添加跟安装时候一样的参数，例如:

```sh
npm uninstall --save lodash
```

卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

```sh
npm ls
```

### 清空本地缓存

```sh
npm cache clear
```

### 查看模块的文档

```sh
npm docs <package_name>
```

### 在浏览器中打开模块的代码仓库页

```sh
npm repo <package_name>
```
