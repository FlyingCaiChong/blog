# CSS Grid 布局

## Grid Container

### grid-template-rows

用来定义每一行的行高. 对应的值可以是 repeat 函数、绝对单位、百分比、fr 关键字、auto-fill 关键字、auto-fit 关键字、minmax()函数、auto 关键字、max-content、min-content.

- repeat()函数: 接受两个参数, 第一个参数是重复的次数, 第二个参数是所要重复的值.
- fr 关键字: flex 单位, 剩余空间的比例关系.
- auto-fill 关键字: 表示自动填充, 会用空格子填满剩余宽度.
- auto-fit 关键字: 表示自动填充, 会尽量扩大单元格的宽度.
- minmax()函数: 接受两个参数, 分别是最小值和最大值. 产生一个长度范围, 表示长度在这个范围之中.
- auto: 表示由浏览器自己决定长度

### grid-template-columns

用来定义每一列的列宽. 可取的值和 grid-template-rows 一样

### grid-template-areas

用来指定区域, 一个区域由单个或多个单元格组成, 指定的区域, 需要填满整个网格, 不用的区域, 可以用`.`表示

### grid-row-gap

用来设置行与行的间隔(行间距)

### grid-column-gap

用来设置列与列的间隔(列间距)

### grid-gap

是`grid-row-gap`和`grid-column-gap`的简写.

### grid-auto-flow

用来控制`Container`内`item`的摆放顺序. 默认值是`row`, 表示**先行后列**. 也可以设置为`column`, 表示**先列后行**.
`row`和`column`后面可以加`dense`关键字, 主要用于, 某些`item`指定位置后, 剩下的`item`怎么自动放置. 加了`dense`关键字后, 会尽可能紧密填满网格.

### grid-auto-rows

设置浏览器自动创建的多余网格的行高.

### grid-auto-columns

设置浏览器自动创建的多余网格的列宽.

`grid-auto-rows`和`grid-auto-columns` 用来调整隐式网格的`track`.

### justify-content

设置整个内容区域在容器里面的水平位置.

```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between
    | space-evenly;
}
```

### align-content

设置整个内容区域在容器里面的垂直位置.

```css
.container {
  align-content: start | end | center | stretch | space-around | space-between |
    space-evenly;
}
```

### justify-items

设置所有单元格内容的水平位置.

```css
.container {
  justify-items: start | end | center | stretch;
}
```

### align-items

设置所有单元格内容的垂直位置.

```css
.container {
  align-items: start | end | center | stretch;
}
```

### place-items

是`align-items`和`justify-items`的简写形式.

## Grid Item

### grid-row-start

指定上边框所在的水平网格数

### grid-row-end

指定下边框所在的水平网格数

### grid-row

是`grid-row-start`和`grid-row-end`的简写

### grid-column-start

指定左边框所在的垂直网格数

### grid-column-end

指定有边框所在的垂直网格数

### grid-column

是`grid-column-start`和`grid-column-end`的简写

网格数可以用网格线数字
如:

```css
.item {
  grid-row: 2 / 4; // 网格的行第2个网格线到第4个网格线
}
```

也可以用`span`关键字, 表示跨越.
如:

```css
.item {
  grid-row: 2 / span 2; // 网格的行从第2个网格线到第4个网格线
}
```

也可以用负数来倒数第几个网格.
如:

```css
.item {
  grid-row: 2 / -1; // 网格的行从第2个网格线到最后一个网格线
}
```

### grid-area

指定`item`放在哪个区域.

1. 可以结合`grid-template-areas`来使用.
2. 也可以用作`grid-row-start`、`grid-column-start`、`grid-row-end`和`grid-column-end`的简写.

### justify-self

用作于单个`item`, 设置单元格内容的水平位置

```css
.item {
  justify-self: start | end | center | stretch;
}
```

### align-self

用作于单个`item`, 设置单元格内容的垂直位置

```css
.item {
  align-self: start | end | center | stretch;
}
```

### place-self

是`align-self`和`justify-self`的简写形式.
