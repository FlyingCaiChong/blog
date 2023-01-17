---
title: "Husky的使用"
author: "菜虫"
date: "2023-01-17"
---

# Husky 的使用

虽然我们已经要求项目使用`eslint`了, 但是不能保证组员提交代码之前都将`eslint`中的问题解决掉:

- 也就是我们希望保证代码仓库中的代码都是符合`eslint`规范的;
- 那么我们需要在组员执行`git commit`命令的时候对其进行校验, 如果不符合`eslint`规范, 那么自动通过规范进行修复;
  那么如何做到这一点呢? 可以通过`Husky`工具:
- `husky`是一个`git hook`工具, 可以帮助我们触发`git`提交的各个阶段: `pre-commit`、`commit-msg`、`pre-push`

如何使用`husky`?
可以使用自动配置命令:

```sh
npx husky-init && npm install
```

这里会做三件事:

1. 安装 husky 相关的依赖:
   ![](/assets//husky_01.jpg)
2. 在项目目录下创建`.husky`文件夹:
   ![](/assets//husky_02.jpg)
3. 在 package.json 中添加一个脚本:
   ![](/assets//husky_04.jpg)

接下来需要去完成一个操作, 在进行`commit`时, 执行`lint`脚本
![](/assets//husky_04.jpg)

#### 代码提交风格

通常我们的`git commit`会按照统一的风格来提交, 这样可以快速定位每次提交的内容, 方便之后对版本进行控制
![](/assets//husky_05.jpg)
但是如果每次手动来编写这些事比较麻烦的事情, 我们可以使用一个工具: `Commitizen`

> `Commitizen`是一个帮助我们编写规范`commit message`的工具

1. 安装`Commitizen`
   ```sh
    npm install commitizen -D
   ```
2. 安装`cz-conventional-changelog`, 并且初始化`cz-conventional-changelog`:
   ```sh
    npx commitizen init cz-conventional-changelog --save-dev --save-exact
   ```
   这个命令会帮助我们安装`cz-conventional-changelog`:
   ![](/assets//husky_06.jpg)
   并且在 package.json 中进行配置:
   ![](/assets//husky_07.jpg)

这个时候我们提交代码需要使用`npx cz`
第一步选择 type, 本次更新的类型

| Type     | 作用                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| feat     | 新增特性(feature)                                                                      |
| fix      | 修复 Bug(bug fix)                                                                      |
| docs     | 修改文档(documentation)                                                                |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc)                        |
| refactor | 代码重构(refactor)                                                                     |
| perf     | 改善性能(A code change that improves performance)                                      |
| test     | 测试(when adding missing tests)                                                        |
| build    | 变更项目构建或外部依赖(例如 Scopes: webpack,gulp,npm 等)                               |
| ci       | 更改持续集成软件的配置文件和.package 中的 scripts 命令, 例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                                               |
| revert   | 代码回退                                                                               |

#### 代码提交验证

如果我们安装`cz`来规范了提交风格,但是依然有同事通过`git commit`按照不规范的格式提交应该怎么办呢?
我们可以通过`commitline`来限制提交:

1. 安装 `@commitlint/config-conventional`和 `@commitlint/cli`
   ```sh
   npm i @commitlint/config-conventional @commitlint/cli -D
   ```
2. 在根目录创建`commitlint.config.js`文件,配置`commitlint`

   ```js
   module.exports = {
     extends: ["@commitlint/config-conventional"],
   };
   ```

3. 使用`husky`生成`commit-msg`文件,验证提交信息
   ```sh
   npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
   ```
