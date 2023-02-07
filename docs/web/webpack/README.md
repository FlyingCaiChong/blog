# Webpack 相关知识

:::tip 概念
本质上，`webpack` 是一个用于现代 `JavaScript` 应用程序的 **静态模块打包工具**。当 `webpack` 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 `bundles`，它们均为静态资源，用于展示你的内容.
:::

## 基本安装

首先创建一个项目, 初始化`npm`, 然后在本地安装`webpack`, 接着安装`webpack-cli`.

```sh
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

## 核心概念

### 入口(entry)

入口起点(`entry point`) 指示 `webpack`应该使用哪个模块，来作为构建其内部 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/) 的开始。进入入口起点后，`webpack` 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 `./src/index.js`, 可以通过在[webpack configuration](https://webpack.docschina.org/configuration) 中配置`entry`属性, 来指定一个(或多个)不同的入口起点. 例如:

**webpack.config.js**

```javascript {2}
module.exports = {
  entry: "./path/to/my/entry/file.js",
};
```

### 输出(output)

`output`属性告诉`webpack`在哪里输出它所创建的`bundle`, 以及如何命名这些文件. 主要输出文件的默认值是`./dist/main.js`, 其他生成文件默认放置在`./dist`文件夹中.
可以在配置中指定一个`output`字段, 来配置这些处理过程:

**webpack.config.js**

```javascript {4-7}
const path = require("path");
module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
```

### loader

`webpack`只能理解`javascript`和`JSON`文件, 这是`webpack`开箱可用的自带能力. `loader`让`webpack`能够去处理其他类型的文件, 并将它们转换为有效[模块](https://webpack.docschina.org/concepts/modules), 以供应用程序使用, 以及被添加到依赖图中.

在更高层面, 在`webpack`的配置中,`loader`有两个属性:

1. `test`属性, 识别出哪些文件会被转换,
2. `use`属性, 定义出在进行转换时, 使用哪个`loader`.

**webapck.config.js**

```javascript {9}
const path = require("path");
module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rolus: [{ text: /\.txt$/, use: "raw-loader" }],
  },
};
```

### 插件(plugin)

`loader`用于转换某些类型的模块, 而插件则可以用于执行范围更广的任务. 包括: 打包优化, 资源管理, 注入环境变量.

想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。多数插件可以通过选项(`option`)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 `new` 操作符来创建一个插件实例。

**webpack.config.js**

```javascript {13}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rolus: [{ text: /\.txt$/, use: "raw-loader" }],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

在上面的示例中，`html-webpack-plugin` 为应用程序生成一个 `HTML` 文件，并自动将生成的所有 `bundle` 注入到此文件中。

### 模式(mode)

通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 `webpack` 内置在相应环境下的优化。其默认值为 `production`。

**webpack.config.js**

```javascript {2}
module.exports = {
  mode: "production",
};
```
