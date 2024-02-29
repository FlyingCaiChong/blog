---
title: 第一章 了解TypeScript
---

# 了解 TypeScript

## Item 1: TypeScript 与 JavaScript 的关系

TypeScript 是 JavaScript 的超集。
TypeScript 文件使用 `.ts`（或`.tsx`）扩展。JavaScript 文件使用 `.js`（或`.jsx`）扩展。
TypeScript 添加了一个类型系统来模拟 JavaScript 的运行时行为，并试图发现在运行时抛出异常的代码。

## Item 2: 了解使用的 TypeScript 配置项

可以通过命令行来配置:

```sh
tsc --noImplicitAny program.ts
```

或者通过`tsconfig.json`文件来配置:

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

可以通过命令 `tsc --init` 来创建`tsconfig.json`文件。

### 两个重要的配置

#### [noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny)

`noImplicitAny`控制变量是否必须具有已知类型。没有开启的情况下，如果没有指定类型，默认会推断为 any。如果开启此配置，则会抛出错误。
尽量开启此配置。

#### [strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks)

`strictNullChecks`控制`null`和`undefined`在所有类型中是否是允许的值。

当`strictNullChecks`为`off`的时候：

```ts
const x: number = null; // OK, null is a valid number
```

当`strictNullChecks`为`on`的时候：

```ts
const x: number = null; // ~ Type 'null' is not assignable to type 'number'
```

## Item 3: 理解代码生成是独立于类型的

`tsc` 做了两件事：

1. 将下一代`TypeScript/JavaScript`转换为在浏览器中工作的旧版本`JavaScript`
2. 检查代码的类型错误

### 代码类型错误时也可以生成输出

代码输出是独立于类型检查的，所以当类型错误时也可以生成输出。
如果要禁用类型错误时生成输出，可以在`tsconfig.json`中配置[noEmitOnError](https://www.typescriptlang.org/tsconfig/#noEmitOnError)。

### 不能在运行时检查 TypeScript 类型

使用`interface`定义的接口，不能在运行时使用`instanceof`来检查类型。

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // 报错： “Rectangle”仅表示类型，但在此处却作为值使用
    return shape.width * shape.height; // 类型“Square”上不存在属性“height”
  } else {
    return shape.width * shape.width;
  }
}
```

可以使用`in`：

```ts
function calculateArea(shape: Shape) {
  if ("height" in shape) {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

或者添加`tag`来区分类型:

```ts
interface Square {
  kind: "square";
  width: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if (shape.kind === "rectangle") {
    return shape.width * shape.height;
  } else {
    return shape.width * shape.width;
  }
}
```

### 类型操作不能影响运行时值

假设想将一个字符串或数字转换为数字，下面这种写法是错误的:

```ts
function asNumber(val: number | string): number {
  return val as number;
}
```

正确的写法是:

```ts
function asNumber(val: number | string): number {
  return typeof val === "string" ? Number(val) : val;
}
```

`as number`是类型断言，并不会将字符串转换成数字。

### 运行时类型可能和声明的类型不同

在运行时，值可能是声明的类型以外的类型，比如从接口获取数据时候，可能会得到其他类型的值。

### 基于 TypeScript 类型不能重载同名函数

这种写法是错误的：

```ts
function add(a: number, b: number) {
  return a + b;
}
function add(a: string, b: string) {
  return a + b;
}
```

报错：“函数实现重复”

可以这样写：

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
  return a + b;
}
const three = add(1, 2); // Type is number
const twelve = add("1", "2"); // Type is string
```

### TypeScript 类型对运行时性能没有影响

因为类型和类型操作在生成 JavaScript 时会被删除，所以不会对运行时性能产生影响。

## Item 4: 熟悉结构类型

- JavaScript 是鸭子类型，TypeScript 使用结构类型来建模：可分配给接口的值，可能有超出类型声明中显示列出的属性。类型不是“密封的”。
- 类也遵循结构类型规则。
- 使用结构类型便于进行单元测试。

## Item 5: 限制 any 类型的使用

TypeScript 的类型系统是渐进且可选的：

- 渐进式：可以一点一点地在代码中添加类型
- 可选的：可以随时禁用类型检查，这个功能的关键是 `any` 类型

any 类型的问题：

1. any 类型没有类型安全
2. any 类型会打破约束
3. any 类型没有语言服务
4. 当重构代码时 any 类型容易引起 bug
5. any 类型隐藏了你的类型设计
6. any 类型破环对类型系统的信心
