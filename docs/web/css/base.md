---
title: "流、元素与基本尺寸"
---

# 流、元素与基本尺寸

`HTML`标签通常分为两类: 块级元素(block-level element) 和 内联元素 (inline element).

## 块级元素

常见的块级元素有`<div>`、`<li>`、`<table>`等.
基本特征: 一个水平流上只能单独显示一个元素, 多个块级元素则换行显示.
由于具有换行特性, 可以配合`clear`属性来清除浮动带来的影响.

```css
.clear:after {
  content: "";
  display: block; // 也可以是table, 或者list-item
  clear: both;
}
```

## width/height 作用

width 的默认值是`auto`. 包含以下四种不同的宽度表现:

1. 充分利用可用空间;
2. 收缩与包裹;
3. 收缩到最小;
4. 超出容器限制;

- 盒子分为内在盒子和外在盒子;
- 显示分为内部显示和外部显示;
- 尺寸分为内部尺寸和外部尺寸;

### 外部尺寸

外部尺寸指元素的尺寸由外部元素决定;
外部尺寸的块级元素一旦设置宽度会丢失流动性; [外部尺寸 block 元素的流动性示例](https://demo.cssworld.cn/3/2-3.php)

### 内部尺寸

内部尺寸指元素的尺寸由内部元素决定;

### 流体布局下的宽度分离原则

所谓“宽度分离原则”, 即 width 属性不与影响宽度的 padding/border 属性共存. 分开来写, 如:

```css
.father {
  width: 102px;
}
.son {
  border: 1px solid;
  padding: 20px;
}
```

### 改变 width/height 作用细节的 box-sizing

box-sizing 指“盒尺寸”, 其改变了 width 作用的盒子; 内在盒子 分为 content box、padding box、border box、margin box. 默认情况下, width 是作用在 content box 上的, box-sizing 的作用就是可以把 width 作用的盒子变为其他几个.

可以有以下几种写法:

```css
.box1 {
  box-sizing: content-box;
}
.box3 {
  box-sizing: border-box;
}
```

## 内联元素

内联元素的特征是可以和文字在一行显示.
