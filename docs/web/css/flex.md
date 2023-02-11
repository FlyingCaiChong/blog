# Flex 布局

## flex 容器的属性

1. `flex-direction`
2. `flex-wrap`
3. `flex-flow`
4. `justify-content`
5. `align-items`
6. `align-content`

### flex-direction

决定主轴(`main axis`)方向, 取值有 `row|row-reverse|column|column-reverse`

- `row`: 主轴为水平方向,起点在左端
- `row-reverse`: 主轴为水平方向, 起点在右端
- `column`: 主轴为竖直方向,起点在上沿
- `column-reverse`: 主轴为竖直方向,起点在下沿

### flex-wrap

决定项目在一条轴线上排不下时如何换行, 取值有 `nowrap|wrap|wrap-reverse`

- `nowrap`: 不换行
- `wrap`: 换行, 第一行在上方
- `wrap-reverse`: 换行, 第一行在下方

### flex-flow

是 `flex-direction` 和 `flex-wrap` 的简写形式 `flex-direction` || `flex-wrap`, 默认值 `row nowrap`

### justify-content

定义项目在主轴上的对齐方式, 取值有 `flex-start|flex-end|center|space-between|space-around`

- `flex-start`: 左对齐
- `flex-end`: 右对齐
- `center`: 居中
- `space-between`: 两端对齐, 项目之间的间隔相等
- `space-around`: 每个项目两侧的间隔相等. 项目之间的间隔比项目与边框的间隔大一倍.

### align-items

定义项目在交叉轴(`cross axis`)上的对齐方式, 取值有 `flex-start|flex-end|center|baseline|stretch`

- `flex-start`: 交叉轴的起点对齐
- `flex-end`: 交叉轴的终点对齐
- `center`: 交叉轴的中点对齐
- `baseline`: 项目的第一行文字的基线对齐
- `stretch`: 如果项目未设置高度或设为 auto,将占满整个容器的高度

### align-content

定义了多根轴线的对齐方式,如果项目只有一根轴线,该属性不起作用. 取值有 `flex-start|flex-end|center|space-between|space-around|stretch`

- `flex-start`: 交叉轴的起点对齐
- `flex-end`: 交叉轴的终点对齐
- `center`: 交叉轴的中心对齐
- `space-between`: 与交叉轴两端对齐, 轴线之间的间隔平均分布
- `space-around`: 每根轴线两侧的间隔相等. 轴线之间的间隔比轴线与边框的间隔大一倍.
- `stretch`: 轴线占满整个交叉轴

## 项目的属性

1. `order`
2. `flex-grow`
3. `flex-shrink`
4. `flex-basis`
5. `flex`
6. `align-self`

### order

定义项目的排列顺序. 数值越小,排列越靠前.默认为 0

### flex-grow

定义项目的放大比例, 默认为 0, 即如果存在剩余空间, 也不放大.

### flex-shrink

定义项目的缩小比例, 默认为 1. 即如果空间不足,该项目将缩小.

### flex-basis

定义了在分配多余空间之前, 项目占据的主轴空间(`main size`). 默认值 `auto`, 即项目的本来大小

### flex

是 `flex-grow` || `flex-shrink` || `flex-basis` 的简写, 默认 `0 1 auto`. 后两个值可选

### align-self

允许单个项目有与其他项目不一样的对齐方式, 可覆盖 `align-items` 属性. 默认值 `auto`. 取值有 `auto|flex-start|flex-end|center|baseline|stretch`
