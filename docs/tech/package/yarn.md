---
title: "yarn的使用"
---

# yarn 的使用

### 安装

```sh
npm install --global yarn
```

### 检查版本号

```sh
yarn --version
```

### 使用方法

#### 1. 初始化一个新项目

```sh
yarn init
```

#### 2. 添加依赖包

```sh
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

#### 3. 将依赖项添加到不同依赖项类别中

分别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies` 类别中：

```sh
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

#### 4. 升级依赖包

```sh
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

#### 5. 移除依赖包

```sh
yarn remove [package]
```

#### 6. 安装项目的全部依赖

```sh
yarn
```

或者

```sh
yarn install
```

#### 7. 清除缓存

```sh
yarn cache clean
```
