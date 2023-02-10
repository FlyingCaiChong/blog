# BFC(block formatting context)

`BFC` 全称 `block formatting context`, 中文为"块级格式化上下文".

表现规则: 如果一个元素具有 `BFC`, 内部子元素的属性不会影响外部元素. 所以, `BFC` 元素是不可能发生 `margin` 重叠的, 也可以用来清除浮动的影响, 因为如果不清除, 子元素浮动则父元素高度塌陷.

常见触发 `BFC` 的情况如:

- `<html>`根元素
- `float` 的值不为 `none`
- `overflow` 的值为 `auto`、`scroll` 或者 `hidden`
- `display` 的值为 `flow-root`、`table-cell`、`table-caption` 和 `inline-block` 中的任何一个
- `position` 的值不为 `relative` 和 `static`

格式化上下文影响布局, 通常, 会为定位和清除浮动创建新的 `BFC`, 而不是更改布局, 因为它将:

- 包含内部浮动
- 排除外部浮动
- 阻止外边距重叠

使用`display: flow-root`, 一个新的`display`属性的值, 可以创建无副作用的 `BFC`.

## BFC 的用途

常见用途有三个:

1. 避免垂直外边距叠加
2. 清除浮动
3. 实现自适应布局
