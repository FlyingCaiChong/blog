---
title: "pnpm 的使用"
---

# pnpm 的使用

> 动机:
>
> 1. 节省磁盘空间并提升安装速度
> 2. 创建非扁平的 node_modules 目录

### 安装

通过 npm 安装

```sh
npm install -g pnpm
```

通过 homebrew 安装

```sh
brew install pnpm
```

### 设置源

```sh
// 查看源
pnpm config get registry
// 切换淘宝源
pnpm config set registry http://registry.npm.taobao.org
```

### 添加依赖包

保存到 dependencies 配置项下

```sh
pnpm add sax
```

保存到 devDependencies 配置项下

```sh
pnpm add -D sax
```

保存到 optionalDependencies 配置项下

```sh
pnpm add -O sax
```

安装软件包到全局环境中

```sh
pnpm add -g sax
```

安装标记为 next 的版本

```sh
pnpm add sax@next
```

安装指定版本 3.0.0

```sh
pnpm add sax@3.0.0
```

### 更新依赖包

```sh
pnpm update
```

### 移除依赖包

```sh
pnpm remove
```

### 安装项目的全部依赖

```sh
pnpm install
```
