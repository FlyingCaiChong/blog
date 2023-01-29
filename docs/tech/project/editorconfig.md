---
title: "集成editorconfig配置"
author: "菜虫"
date: "2023-01-29"
---

# 集成 editorconfig 配置 :hamburger:

> EditorConfig 有助于为不同 IDE 编辑器上处理同一个项目的多个开发人员维护一致的编码风格

创建.editorconfig 文件, 内容如下:

```editorconfig
# http://editorconfig.org

# top-most EditorConfig file
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格 (tab | space)
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace =  = false
```

---

VSCode 需要安装 [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) 插件.