---
title: "ES6 相关"
date: "2023-02-01"
---

# ES6 相关

## let 和 const 关键字

在块级作用域内有效

### let 关键字

用于声明变量.

**特性**

1. 不存在变量提升
2. 存在暂时性死区
3. 不能重复声明
4. 不再是全局对象的属性

### const 关键字

用于声明常量. 特性和 `let` 关键字相同.

## 解构赋值

### 数组的解构赋值

针对数组，在解构赋值时，使用的是模式匹配，只要等号两边数组的模式相同，右边数组的值就会相应赋给左边数组的变量。

```javascript
let [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

let [, , c] = [1, 2, 3];
console.log(c); // 3
```

##### 1. 数组解构默认值

在数组解构时设置默认值，可以防止出现解构得到 `undefined` 值的情况.

```javascript
let [a = 1, b] = [, 4];
console.log(a); // 1
console.log(b); // 4
```

##### 2. 交换变量

可以使用数组的解构赋值来交换变量

```javascript
let a = 1;
let b = 2;
[b, a] = [a, b];
console.log(a); // 2
console.log(b); // 1
```

##### 3. 解析函数返回的数组

可以使用数组的解构赋值来获取函数返回的数组值

```javascript
function foo() {
  return [1, 2];
}
let [a, b] = foo();
console.log(a); // 1
console.log(b); // 2
```

##### 4. 嵌套数组的解构

支持嵌套数组的解构

```javascript
let [a, b, [c]] = [1, [2, 3], [4, 5]];
console.log(a); // 1
console.log(b); // [2, 3]
console.log(c); // 4
```

##### 5. 函数参数解构

当函数的参数为数组类型时，可以将实参和形参进行解构。

```javascript
function foo([arg1, arg2]) {
  console.log(arg1); // 2
  console.log(arg2); // 3
}
foo([2, 3]);
```

### 对象的解构赋值

对象解构赋值时, 右侧解构对象的属性名和左侧定义对象的变量名必须相同.

```javascript
let { a: a, b: b, c: c } = { a: 1, b: 2, c: 3 };
console.log(a, b, c); // 1, 2, 3
```

当 key 和 value 相同时, 可简写

```javascript
let { a, b, c } = { a: 1, b: 2, c: 3 };
```

对象解构赋值的原理是: 先找到左右两侧相同的属性名（`key`），然后再赋给对应的变量（`value`），真正被赋值的是 `value` 部分，并不是 `key` 的部分。

##### 1. 对象解构的默认值

对象解构时可以设置默认值, 当解构结果为 `undefined` 时, 使用默认值

```javascript
let { a, b = 2 } = { a: 1, c: 3 };
console.log(a, b); // 1, 2
```

##### 2. 嵌套对象的解构

嵌套的对象同样可以解构

```javascript
let obj = {
  a: [
    "hello",
    {
      b: "world",
    },
  ],
};
let {
  a: [x, { b: name }],
} = obj;
console.log(x); // hello
console.log(name); // world
```

##### 3. 选择性解构对象的属性

可以只解构对象的部分属性

```javascript
let { a, b } = { a: 1, b: 2, c: 3 };
console.log(a, b); // 1, 2
```

##### 4. 函数参数解构

当函数的参数是一个复杂的对象类型时，可以通过解构去获得想要获取的值并赋给变量。

```javascript
function foo({ name, age }) {
  console.log(name, age); // John 30
}
const user = {
  name: "John",
  age: 30,
  sex: "male",
};
foo(user);
```

## 扩展运算符与 rest 运算符

### 扩展运算符

扩展运算符用 3 个点表示（`...`），用于将一个数组或类数组对象转换为用逗号分隔的值序列。

它的基本用法是拆解数组和字符串。

```javascript
const arr = [1, 2, 3, 4];
console.log(...arr); // 1 2 3 4
const str = "hello";
console.log(...str); // h e l l o
```

##### 1. 扩展运算符代替 apply()函数

```javascript
let arr = [1, 4, 5, 2];
// 使用apply函数
console.log(Math.max.apply(null, arr));
// 使用扩展运算符
console.log(Math.max(...arr));
```

##### 2. 扩展运算符代替 concat()函数合并数组

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
// 使用concat函数
console.log(arr1.concat(arr2));
// 使用扩展运算符
console.log([...arr1, ...arr2]);
```

##### 3. 扩展运算符转换 Set, 得到去重的数组

```javascript
let arr = [1, 2, 4, 6, 2, 7, 4];
console.log([...new Set(arr)]); // [1, 2, 4, 6, 7]
```

##### 4. 扩展运算符用于对象克隆

```javascript
let obj = {
  name: "kobe",
};
let obj2 = { ...obj };
obj2.name = "John";
console.log(obj2); // { name: 'John' }
console.log(obj); // { name: 'kobe' }
```

使用扩展运算符对数组或对象进行克隆时，如果数组的元素或者对象的属性是基本数据类型，则支持深克隆；如果是引用数据类型，则不支持深克隆

### rest 运算符

`rest` 运算符同样使用 3 个点表示（`...`），其作用与扩展运算符相反，用于将以逗号分隔的值序列转换成数组。

##### 1. rest 运算符与解构组合使用

```javascript
let arr = ["a", "b", "c", "d"];
let [arg1, ...arg2] = arr;
console.log(arg1); // 'a'
console.log(arg2); // ['b', 'c', 'd']

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

##### 2. rest 运算符代替 arguments 处理函数参数

```javascript
function foo(...args) {
  for (let arg of args) {
    console.log(arg);
  }
}
foo("a", "b", "c");
```

:::tip 区分扩展运算符与 rest 运算符:

- 当 3 个点（`…`）出现在函数的形参上或者出现在赋值等号的左侧，则表示它为 rest 运算符。
- 当 3 个点（`…`）出现在函数的实参上或者出现在赋值等号的右侧，则表示它为扩展运算符。
  :::

## 模版字符串

模板字符串使用反引号（``）括起来，它可以当作普通的字符串使用，也可以用来定义多行字符串，同时支持在字符串中使用${}嵌入变量。

## 箭头函数

基本语法如下:

```javascript
const foo = (v) => v;
// 等同于传统语法
var foo = function (v) {
  return v;
};
```

### 特点

1. 语法简洁
2. 不绑定 `this`
3. 不支持 `call()`函数与 `apply()`函数的特性
4. 不绑定 `arguments`, 可以借助 `rest` 运算符(`...`)来获取实参
5. 支持嵌套

### 不适用的场景

1. 不适合作为对象的函数
2. 不能作为构造函数，不能使用 `new` 操作符
3. 没有 `prototype` 属性
4. 不适合将原型函数定义成箭头函数

## 对于对象的扩展

### 属性简写

传统的 `JavaScript` 中，对象都会采用`{key: value}`的写法，但是在 `ES6` 中，可以直接在对象中写入变量，`key` 相当于变量名，`value` 相当于变量值，并且可以直接省略 `value`，通过 `key` 表示一个对象的完整属性。

```javascript
const name = "kobe";
const age = 20;
const obj = { name, age };
console.log(obj); // { name: 'kobe', age: 20 }
// 等同于
const obj = { name: name, age: age };
```

函数也可以简写

```javascript
const obj = {
  foo: function () {
    return "bar";
  },
};
// 等同于
const obj = {
  foo() {
    return "bar";
  },
};
```

### 属性遍历

5 种遍历方法

1. `for...in`: 用于遍历对象自身和继承的可枚举属性（不包含 `Symbol` 属性）
2. `Object.keys(obj)`: 返回一个数组，包含对象自身所有可枚举属性，不包含继承属性和 `Symbol` 属性。
3. `Object.getOwnPropertyNames(obj)`: 返回一个数组，包含对象自身所有可枚举属性和不可枚举属性，不包含继承属性和 `Symbol` 属性。
4. `Object.getOwnPropertySymbols(obj)`: 返回一个数组，包含对象自身所有 `Symbol` 属性，不包含其他属性。
5. `Reflect.ownKeys(obj)`: 返回一个数组，包含可枚举属性、不可枚举属性以及 `Symbol` 属性，不包含继承属性。

### 新增 Object.assign()函数

`Object.assign()`函数用于将一个或者多个对象的可枚举属性赋值给目标对象，然后返回目标对象。当多个源对象具有相同的属性时，后者的属性值会覆盖前面的属性值。

```javascript
let target = { a: 1 };
let source1 = { b: 2 };
let source2 = { c: 3 };
let source3 = { c: 4 };
console.log(Object.assign(target, source1, source2, source3)); // { a: 1, b: 2, c: 4 }
```

## Symbol 类型

`Symbol` 表示的是一个独一无二的值。

### Symbol 类型的特性

##### 1. Symbol 值的唯一性

```javascript
const a = Symbol();
const b = Symbol();
const c = Symbol("one");
const d = Symbol("one");
console.log(a === b); // false
console.log(c === d); // false
```

##### 2. 不能使用 new 操作符

`Symbol` 函数并不是一个构造函数，因此不能通过 `new` 操作符创建 `Symbol` 值。

##### 3. 不能参与类型运算

`Symbol` 值可以通过 `toString()`函数显示地转换为字符串，但是本身不能参与其他类型值的运算

##### 4. 可以使用同一个 Symbol 值

使用 `Symbol.for()`函数, 它接收一个字符串作为参数，然后搜索有没有以该参数作为名称的 `Symbol` 值。如果有，就返回这个 `Symbol` 值，否则就新建并返回一个以该字符串为名称的 `Symbol` 值.

```javascript
let s1 = Symbol.for("one");
let s2 = Symbol.for("one");
console.log(s1 === s2); // true
```

### Symbol 类型的用法

1. 用作对象属性名
2. 用于属性区分
3. 用于属性名遍历

## Set 数据结构和 Map 数据结构

### Set 数据结构

`ES6` 中新增了一种数据结构 `Set`，表示的是一组数据的集合，类似于数组，但是 `Set` 的成员值都是唯一的，没有重复。

#### Set 实例的属性

- `Set.prototype.constructor`: 构造函数，默认就是 `Set` 函数。
- `Set.prototype.size`: 返回实例的成员总数。

#### Set 实例的函数

- `Set.prototype.add(value)`: 添加一个值，返回 `Set` 结构本身。
- `Set.prototype.delete(value)`: 删除某个值，返回布尔值。
- `Set.prototype.has(value)`: 返回布尔值，表示是否是成员。
- `Set.prototype.clear()`: 清除所有成员，无返回值。

### Map 数据结构

`ES6` 还增加了另一种数据结构 `Map`，与传统的对象字面量类似，它的本质是一种键值对的组合。但是与对象字面量不同的是，对象字面量的键只能是字符串，对于非字符串类型的值会采用强制类型转换成字符串，而 `Map` 的键却可以由各种类型的值组成。

#### Map 实例属性和函数

- `size`: 返回 `Map` 结构的成员总数。
- `set(key, value)`: `set()`函数设置键名 `key` 对应的键值为 `value`，`set()`函数返回的是当前 `Map` 对象，因此 `set()`函数可以采用链式调用的写法。
- `get(key)`: `get()`函数读取 `key` 对应的键值，如果找不到 `key`，返回`undefined`。
- `has(key)`: `has()`函数返回一个布尔值，表示某个键是否在当前 `Map` 对象中。
- `delete(key)`: `delete()`函数删除某个键，返回`true`；如果删除失败，返回`false`。
- `clear()`: `clear()`函数清除所有成员，没有返回值。

## Proxy

### Proxy 概述

`ES6` 中新增了 `Proxy` 对象，从字面上看可以理解为代理器，主要用于改变对象的默认访问行为，实际表现是在访问对象之前增加一层拦截，任何对对象的访问行为都会通过这层拦截。在拦截中，我们可以增加自定义的行为。

基本语法如下所示:

```javascript
const proxy = new Proxy(target, handler);
```

它实际是一个构造函数，接收两个参数，一个是目标对象 `target`；另一个是配置对象 `handler`，用来定义拦截的行为。

通过 `Proxy` 构造函数可以生成实例 `proxy`，任何对 `proxy` 实例的属性的访问都会自动转发至 `target` 对象上，可以针对访问的行为配置自定义的 `handler` 对象，因此外界通过 `proxy` 访问 `target` 对象的属性时，都会执行 `handler` 对象自定义的拦截操作。

```javascript
const person = {
  name: "kobe",
  age: 20,
};
let handler = {
  get: function (target, prop, receiver) {
    console.log("访问了person的属性");
    return target[prop];
  },
};
const p = new Proxy(person, handler);
console.log(p.name);
// 访问了person的属性
// kobe
```

:::warning 注意

1. 必须通过代理实例访问
2. 配置对象不能为空对象
   :::

### Proxy 实例函数

##### 1. get(target, propKey, receiver)

拦截对象属性的读取操作，例如调用 `proxy.name` 或者 `proxy[name]`，其中 `target` 表示的是目标对象，`propKey` 表示的是读取的属性值，`receiver` 表示的是配置对象。

##### 2. set(target, propKey, value, receiver)

拦截对象属性的写操作，即设置属性值，例如 `proxy.name='kobe'`或者 `proxy[name]='kobe'`，其中 `target` 表示目标对象，`propKey` 表示的是将要设置的属性，`value` 表示将要设置的属性的值，`receiver` 表示的是配置对象。

##### 3. has(target, propKey)

拦截 `hasProperty` 的操作，返回一个布尔值，最典型的表现形式是执行 `propKey in target`，其中 `target` 表示目标对象，`propKey` 表示判断的属性。

##### 4. deleteProperty(target, propKey)

拦截 `delete proxy[propKey]`的操作，返回一个布尔值，表示是否执行成功，其中 `target` 表示目标对象，`propKey` 表示将要删除的属性。

##### 5. ownKeys(target)

拦截 `Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in` 循环等操作，其中 `target` 表示的是获取对象自身所有的属性名。

##### 6. getOwnPropertyDescriptor(target, propKey)

拦截 `Object.getOwnPropertyDescriptor(proxy, propKey)`操作，返回属性的属性描述符构成的对象，其中 `target` 表示目标对象，`propKey` 表示需要获取属性描述符集合的属性。

##### 7. defineProperty(target, propKey, propDesc)

拦截 `Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy,propDescs)`操作，返回一个布尔值，其中 `target` 表示目标对象，`propKey` 表示新增的属性，`propDesc` 表示的是属性描述符对象。

##### 8. preventEntensions(target)

拦截 `Object.preventExtensions(proxy)`操作，返回一个布尔值，表示的是让一个对象变得不可扩展，不能再增加新的属性，其中 `target` 表示目标对象。

##### 9. getPrototypeOf(target)

拦截 `Object.getPrototypeOf(proxy)`操作，返回一个对象，表示的是拦截获取对象原型属性，其中 `target` 表示目标对象。

##### 10. isExtensible(target)

拦截 `Object.isExtensible(proxy)`，返回一个布尔值，表示对象是否是可扩展的，其中 `target` 表示目标对象。

##### 11. setPrototypeOf(target, proto)

拦截 `Object.setPrototypeOf(proxy, proto)`操作，返回一个布尔值，表示的是拦截设置对象的原型属性的行为，其中 `target` 表示目标对象，`proto` 表示新的原型对象。

##### 12. apply(target, object, args)

拦截 `Proxy` 实例作为函数调用的操作，例如 `proxy(...args)`、`proxy.call(object,...args)`、`proxy.apply(...)`，其中 `target` 表示目标对象，`object` 表示函数的调用方，`args` 表示函数调用传递的参数。

##### 13. construct(target, args)

拦截 `Proxy` 实例作为构造函数调用的操作，例如 `new proxy(...args)`，其中 `target` 表示目标对象，`args` 表示函数调用传递的参数。

## Reflect

`Reflect` 对象的方法与 `Proxy` 对象的方法一一对应, 让 `Proxy` 对象可以方便地调用对应的 `Reflect` 方法, 完成默认行为, 作为修改行为的基础. 也就是说, 不管 `Proxy` 怎么修改默认行为, 总是可以在 `Reflect` 中获取默认行为.

## Promise

### Promise 的生命周期

每个`Promise`对象都有 3 种状态:

1. `pending`
2. `fulfilled`
3. `rejected`

`Promise`在创建时处于`pending`状态, 状态的改变只有两种可能, 执行成功时, 由`pending`状态变成`fulfilled`状态; 执行失败时, 由`pending`状态变成`rejected`状态.

### Promise 的基本用法

`Promise` 对象本身是一个构造函数，可以通过 `new` 操作符生成 `Promise` 的实例

```javascript
const promise = new Promise((resolve, reject) => {
  // ...some code

  if (/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise`实例生成后, 可以用 `then` 方法分别制定 `resolved` 状态和 `rejected` 状态的回调函数:

```javascript
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  }
);
```

---

:::tip
更多 ES6 相关的内容参见阮一峰的[《ESMAScript 6 入门教程》](https://es6.ruanyifeng.com/)
:::
