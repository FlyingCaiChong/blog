# 盒尺寸

## content

### content 与替换元素

根据"外在盒子"是内联还是块级, 把元素分为内联元素和块级元素. 而根据是否具有可替换内容, 把元素分为替换元素和非替换元素.
常见的替换元素有: `<img>`、`<object>`、`<video>`、`<iframe>`、`textarea`、`input`、`<select>`、`<button>`
替换元素特性:

1. 内容可替换.
2. 内容的外观不受页面上的 `css` 影响.
3. 有自己的尺寸.
4. 有自己的表现规则.

## padding

`padding` 指盒子的内间距.

### padding 与元素的尺寸

因为 `CSS` 默认的 `box-sizing` 是 `content-box`, 所以使用 `padding` 会增加元素的尺寸.
如

```css
.box {
  width: 80px;
  padding: 20px;
}
```

此时 `box` 元素所占据的宽度是 `120px`.

`padding` 支持百分比值. 无论是水平方向还是垂直方向都是相对于宽度计算的.

## margin

`margin` 指盒子的外间距.

元素尺寸: 包括 `padding` 和 `border`.
元素内部尺寸: 包括 `padding`, 但不包括 `border`.
元素内部尺寸: 包括 `padding` 和 `border`,还包括 `margin`.

`margin` 也支持百分比值, 无论是水平方向还是垂直方向都是相对于宽度计算的.

`margin` 合并, 块级元素的上外边距(`margin-top`)与下外边距(`margin-bottom`)有时会合并为单个外边距, 这样的现象称为“`margin` 合并”.

1. 块级元素, 但不包括浮动和绝对定位元素.
2. 只发生在和当前文档流方向的相垂直的方向上.

`margin: auto` 的填充规则:

1. 如果一侧定值, 一侧 `auto`, 则 `auto` 为剩余空间大小.
2. 如果两侧都是 `auto`, 则平分剩余空间.

## border

`border` 指盒子的边框.

**border-style**类型

- `border-style: none`; 默认, 不显示边框
- `border-style: solid`; 实线边框
- `border-style: dashed`; 虚线边框
- `border-style: dotted`; 圆点边框
- `border-style: double`; 两根实线边框
