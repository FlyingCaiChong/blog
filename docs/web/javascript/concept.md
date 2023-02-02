---
title: "JavaScript 重点概念"
author: "菜虫"
date: "2023-01-31"
---

# JavaScript 重点概念

[[TOC]]

::: tip

- 基本数据类型有: `Undefined`、`Null`、`Boolean`、`Number`、`String`、`Symbol`
- 引用数据类型有: `Object`、`Function`、`Array`、`Date` 等
  :::

## 基本数据类型

### Undefined 类型

`Undefined` 类型只有一个唯一的字面值 `undefined`，表示的是一个变量不存在

**四种常见场景:**

1. 使用只声明而未初始化的变量时, 会返回`undefined`.

   ```javascript
   var a;
   console.log(a); // undefined
   ```

2. 获取一个对象的某个不存在的属性时, 会返回`undefined`.

   ```javascript
   var obj = {
     age: 20,
   };
   console.log(obj.name); // undefined
   ```

3. 函数没有返回值时, 在其他地方使用了返回值, 会返回`undefined`.

   ```javascript
   function foo() {}
   console.log(foo()); // undefined
   ```

4. 函数定义时使用了多个形参, 而在调用时传递的参数数量少于形参数量, 那么未匹配上的参数就为`undefined`.

   ```javascript
   function foo(param1, param2, param3) {
     console.log(param3); // undefined
   }
   foo(1, 2);
   ```

### Null 类型

`Null`类型只有一个唯一的字面值`null`, 表示一个空指针对象, 这也是在使用`typeof`运算符检测`null`值时会返回`object`的原因.

**三种常见场景:**

1. 如果声明的变量是为了以后保存某个值, 则应该在声明时就将其赋值为`null`.

   ```javascript {1}
   var obj = null;
   function foo() {
     return {
       name: "kobe",
     };
   }
   obj = foo();
   ```

2. `JavaScript`在获取 `DOM` 元素时, 如果没有获取到指定的元素对象, 会返回`null`.

   ```javascript
   document.querySelector("#id"); // null
   ```

3. 在使用正则表达式进行捕获时, 如果没有捕获结果, 会返回`null`.

   ```javascript
   "test".match(/a/); // null
   ```

### Undefined 和 Null 两种类型的异同

#### 相同点

1. 都只有一个字面值.
2. 转换为 `Boolean` 类型时, 都为 `false`.
3. 在需要将两者转换成对象时, 都会抛出一个 `TypeError` 的异常.
   ```javascript
   var a;
   var b = null;
   console.log(a.name); // Cannot read properties of undefined (reading 'name')
   console.log(b.name); // Cannot read properties of null (reading 'name')
   ```
4. `Undefined` 类型派生自 `Null` 类型, 在非严格相等的情况下, 两者时相等的.
   ```javascript
   null == undefined; // true
   ```

#### 不同点

1. `null` 是 `JavaScript` 中的关键字,而 `undefined` 是 `JavaScript` 中的全局变量
2. 使用`typeof`运算符检测时, `Undefined` 类型的值返回`undefined`. `Null` 类型的值返回`object`.
   ```javascript
   typeof undefined; // undefined
   typeof null; // object
   ```
3. 通过 `call` 调用 `toString()`函数时, `Undefined` 类型的值返回`[object Undefined]`. `Null` 类型的值返回`[object Null]`.
   ```javascript
   Object.prototype.toString.call(undefined); // [object Undefined]
   Object.prototype.toString.call(null); // [object Null]
   ```
4. 在进行字符串类型的转换时, `null` 会转换为字符串`'null'`, `undefined` 会转换为字符串`'undefined'`.
   ```javascript
   undefined + " string"; // undefined string
   null + " string"; // null string
   ```
5. 在进行数值类型的转换时, `null` 会转换为 0, 可以参与计算. `undefined` 会转换为 `NaN`, 无法参与计算.
   ```javascript
   undefined + 0; // NaN
   null + 0; // 0
   ```
6. 没有必要将一个变量显式设置为 `undefined`. 如果需要定义某个变量来保存将来要使用的对象, 应该将其初始化为 `null`.

### Boolean 类型

`Boolean` 类型的字面值只有两个, 分别是 `true` 和 `false`.

**不同类型与 Boolean 类型的值的转换:**

1. `String` 类型转换为 `Boolean` 类型
   - 空字符串""或者''都会转换为 `false`.
   - 任何非空字符串都会转换为 `true`, 包括只有空格的字符串" ".
2. `Number` 类型转换为 `Boolean` 类型
   - 0 和 `NaN` 会转换为 `false`.
   - 除了 0 和 `NaN` 以外, 都会转换为 `true`.
3. `Object` 类型转换为 `Boolean` 类型
   - 当 `object` 为 `null` 时, 会转换为 `false`.
   - 如果 `object` 不为 `null`, 则都会转换为 `true`. 包括空对象{}
4. `Function` 类型转换为 `Boolean` 类型
   - 任何 `Function` 类型的值都会转换为 `true`
5. `Null` 类型转换为 `Boolean` 类型
   - `Null` 类型只有一个 `null` 值, 会转换为 `false`.
6. `Undefined` 类型转换为 `Boolean` 类型
   - `Undefined` 类型只有一个 `undefined` 值, 会转换为 `false`.

### Number 类型

#### Number 类型介绍

Number 类型的数据既包括整型数据, 也包括浮点型数据.

**整型数据的进制表示**

1. 十进制.
2. 八进制. 首位必须是 0, 其他位必须是 0~7 的八进制序列.
   ```javascript
   var num = 024; // 20
   ```
3. 十六进制. 前两位必须是 0x, 其他位必须是十六进制序列(`0~9`, `a~f` 或者 `A~F`).
   ```javascript
   var num = 0x3f; // 63
   ```

**不同类型与 Number 类型的值的转换:**

1. `Boolean` 类型转换为 `Number` 类型
   - `true` 转换为 1.
   - `false` 转换为 0.
2. `Null` 类型转换为 `Number` 类型
   - `Null` 类型只有一个字面值 `null`, 直接转换为 0.
3. `Undefined` 类型转换为 `Number` 类型
   - `Undefined`类型只有一个字面值 `undefined`, 直接转换为 `NaN`.
4. `String` 类型转换为 `Number` 类型
   - 如果字符串只包含数字或有效的浮点数, 则会转换成十进制数.
   - 如果字符串包含有效的十六进制格式, 则会按照十进制转换. 如'0x3f'会转换为 63.
   - 如果是空字符串, 则会转换为 0.
   - 如果字符串中包含除上述格式以外的字符串, 则会直接转换为 `NaN`.
5. `Object` 类型转换为 `Number` 类型
   - 会优先调用 `valueOf()` 函数, 通过 `valueOf()` 函数的返回值按照上述规则进行转换.
     - 如果转换的结果是 `NaN`, 则调用 `toString()` 函数, 通过 `toString()` 函数的返回值重新按照上述规则进行转换.
     - 如果有确定的 Number 类型返回值, 则结束
     - 否则返回 `NaN`

#### Number 类型转换

##### `Number()` 函数

`Number()`函数可以用于将任何类型转换为 `Number` 类型. 转换时遵循以下规则:

1. 如果是数字, 按照对应的进制数据格式, 统一转换为十进制并返回.
   ```javascript
   Number(10); // 10
   Number(010); // 8
   Number(0x10); // 16
   ```
2. 如果是 `Boolean` 类型的值, `true` 将返回 1, `false` 将返回 0
   ```javascript
   Number(true); // 1
   Number(false); // 0
   ```
3. 如果值为 `null`, 则返回 0.
   ```javascript
   Number(null); // 0
   ```
4. 如果值为 `undefined`, 则返回 `NaN`.
   ```javascript
   Number(undefined); // NaN
   ```
5. 如果值为字符串类型, 遵循以下规则:
   - 如果只包含数字, 则会直接转换为十进制数; 如果数字前面有 0, 则会直接忽略这个 0.
     ```javascript
     Number("21"); // 21
     Number("012"); // 12
     ```
   - 如果字符串是有效的浮点数, 则会直接转换为对应的浮点数, 前置的多个重复的 0 会被清空, 只保留一个.
     ```javascript
     Number("0.12"); // 0.12
     Number("00.12"); // 0.12
     ```
   - 如果字符串是有效的十六进制形式, 则会转换为对应的十进制数值.
     ```javascript
     Number("0x12"); // 18
     Number("0x21"); // 33
     ```
   - 如果字符串是有效的八进制形式, 则不会按照八进制转换, 而是直接按照十进制转换, 因为前置的 0 会被直接忽略.
     ```javascript
     Number("010"); // 10
     Number("0020"); // 20
     ```
   - 如果字符串为空, 即不包含任何字符,或为连续多个空格, 则会转换为 0
     ```javascript
     Number(""); // 0
     Number("   "); // 0
     ```
   - 如果字符串包含了任何不是以上 5 种情况的其他格式内容, 则会返回 `NaN`
     ```javascript
     Number("123a"); // NaN
     Number("a1.1"); // NaN
     ```
6. 如果值为对象类型. 则会先调用对象的`valueOf()`函数获取返回值，并将返回值按照上述步骤重新判断能否转换为 `Number` 类型。如果都不满足，则会调用对象的`toString()`函数获取返回值，并将返回值重新按照步骤判断能否转换成 `Number` 类型。如果也不满足，则返回`NaN`。

   以下是通过 `valueOf()` 函数将对象正确转换成 `Number` 类型的示例:

   ```javascript
   var obj = {
     age: 21,
     valueOf: function () {
       return this.age;
     },
     toString: function () {
       return "good";
     },
   };
   Number(obj); // 21
   ```

   以下是通过 `toString()` 函数将对象正确转换成 `Number` 类型的示例:

   ```javascript
   var obj = {
     age: 21,
     valueOf: function () {
       return [];
     },
     toString: function () {
       return this.age;
     },
   };
   Number(obj); // 21
   ```

   以下示例是通过 `valueOf()` 函数和 `toString()` 函数都无法将对象转换成 `Number` 类型的示例（最后返回`NaN`）

   ```javascript
   var obj = {
     age: 21,
     valueOf: function () {
       return "a";
     },
     toString: function () {
       return "b";
     },
   };
   Number(obj); // NaN
   ```

   如果 `toString()` 函数和 `valueOf()` 函数返回的都是对象类型而无法转换成基本数据类型，则会抛出类型转换的异常

   ```javascript
   var obj = {
     age: 21,
     valueOf: function () {
       return [];
     },
     toString: function () {
       return [];
     },
   };
   Number(obj); // Cannot convert object to primitive value
   ```

##### `parseInt()` 函数

`parseInt()` 函数用于解析一个字符串，并返回指定的基数对应的整数值.

语法格式如下:

```javascript
parseInt(string, radix);
```

其中 `string` 表示要被解析的值. `radix` 表示进制转换的基数, 数据范围 2~36. 常用二进制、十进制、八进制和十六进制等, 默认值为 10. 建议手动补充第二个表示基数的参数.

##### `parseFloat()` 函数

`parseFloat()` 函数用于解析一个字符串，返回对应的浮点数。如果给定值不能转换为数值，则会返回`NaN`。没有进制的概念.

#### isNaN()函数与 Number.isNaN()函数对比

`NaN` 有两个很明显的特点

1. 任何涉及 `NaN` 的操作都会返回 `NaN`
2. `NaN` 与任何值都不相等，即使是与 `NaN` 本身相比

在判断 `NaN` 时，`ES5` 提供了 `isNaN()`函数，`ES6` 为 `Number` 类型增加了静态函数 `isNaN()`。

##### isNaN() 函数

作用: 用来确定一个变量是不是 `NaN`.

`isNaN()`函数在判断是否为 `NaN` 时，需要先进行数据类型转换，只有在无法转换为数字时才会返回 `true`

```javascript
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN(true); // false, Number(true)会转换为数字1
isNaN(null); // false, Number(null)会转换为数字0
isNaN(1); // false
isNaN(""); // false, Number("")会转换为数字0
```

##### Number.isNaN() 函数

`Number.isNaN()`函数会在真正意义上去判断变量是否为 `NaN`，不会做数据类型转换. 只有在传入的值为 `NaN` 时，才会返回 `true`，传入其他任何类型的值时会返回 `false`

```javascript
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN(null); // false
Number.isNaN(true); // false
Number.isNaN(""); // false
Number.isNaN(123); // false
```

### String 类型

`String` 类型既可以通过双引号""表示, 也可以通过''单引号表示, 而且是完全等效的.

#### 三种定义字符串的方式

##### 1. 字符串字面量

字符串字面量就是直接通过单引号或者双引号定义字符串的方式

##### 2. 直接调用 String()函数

直接调用 `String()`函数，会将传入的任何类型的值转换成字符串类型

##### 3. new String()构造函数

`new String()`构造函数使用 `new` 运算符生成 `String` 类型的实例

```javascript
new String("hello");
```

#### String 类型常见算法

##### 1. 字符串逆序输出

**算法 1**

借助数组的 `reverse()`函数.

```javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}
```

**算法 2**

利用字符串本身的 `charAt()`函数.

从尾部开始遍历字符串，然后利用 `charAt()`函数获取字符并逐个拼接，得到最终的结果。`charAt()`函数接收一个索引数字，返回该索引位置对应的字符。

```javascript
function reverseString(str) {
  var result = "";
  for (var i = str.length - 1; i >= 0; i--) {
    result += str.charAt(i);
  }
  return result;
}
```

**算法 3**

通过递归实现逆序输出

递归从字符串最后一个位置索引开始，通过 `charAt()`函数获取一个字符，并拼接到结果字符串中，递归结束的条件是位置索引小于 0

```javascript
function reverseString(strIn, pos, strOut) {
  if (pos < 0) {
    return strOut;
  }
  strOut += strIn.charAt(pos--);
  return reverseString(strIn, pos, strOut);
}
```

**算法 4**

通过 `call()`函数来改变 `slice()`函数的执行主体

调用 `call()`函数后，可以让字符串具有数组的特性，在调用未传入参数的 `slice()`函数后，得到的是一个与自身相等的数组，从而可以直接调用 `reverse()`函数，最后再通过调用 `join()`函数，得到逆序字符串

```javascript
function reverseString(str) {
  var arr = Array.prototype.slice.call(str);
  return arr.reverse().join("");
}
```

## 引用数据类型

::: tip 引用数据类型与基本数据类型不同点

- 引用数据类型的实例需要通过 `new` 操作符生成, 有的是显式调用, 有的是隐式调用.
- 引用数据类型的值是可变的, 基本数据类型的值是不可变的.
- 引用数据类型变量赋值传递的是内存地址.
- 引用数据类型的比较是对内存地址的比较, 而基本数据类型的比较是对值的比较.
  :::

### Object 类型

#### new 操作符

如通过 `new` 操作符生成一个 `Cat` 对象的实例

```javascript
var cat = new Cat();
```

`new` 操作符做了 3 件事:

1. 创建一个空对象.
2. 将空对象的 `__proto__` 属性指向 `Cat` 对象的 `prototype` 属性.
3. 将 `Cat()`函数中的 `this` 指向 `cat` 变量

```javascript
var cat = {};
cat.__proto__ = Cat.prototype;
Cat.call(cat);
```

#### Object 类型的实例函数

实例函数是指函数的调用是基于 `Object` 类型的实例的.

##### 1. hasOwnProperty(propertyName)函数

作用是判断对象自身是否拥有指定名称的实例属性，此函数不会检查实例对象原型链上的属性.

##### 2. propertyIsEnumerable(propertyName)函数

作用是判断指定名称的属性是否为实例属性并且是否是可枚举的，如果是原型链上的属性或者不可枚举都将返回`false`.

#### Object 类型的静态函数

静态函数指的是方法的调用基于 `Object` 类型自身，不需要通过 `Object` 类型的实例

##### 1. Object.create()函数

作用是创建并返回一个指定原型和指定属性的对象. 语法格式如下:

```javascript
Object.create(prototype, propertyDescriptor);
```

##### 2. Object.defineProperties()函数

作用是添加或修改对象的属性值. 语法格式如下:

```javascript
Object.defineProperties(obj, propertyDescriptor);
```

##### 3. Object.getOwnPropertyNames()函数

作用是获取对象的所有实例属性和函数，不包含原型链继承的属性和函数，数据格式为数组. 语法格式如下:

```javascript
Object.getOwnPropertyNames(obj);
```

##### 4. Object.keys() 函数

作用是获取对象可枚举的实例属性，不包含原型链继承的属性，数据格式为数组. 语法格式如下:

```javascript
Object.keys(obj);
```

### Array 类型

#### 1. 判断变量是否为数组

使用 `Array.isArray()` 函数

#### 2. filter()函数

用于过滤出满足条件的数据，返回一个新的数组，不会改变原来的数组

#### 3. reduce()函数

`reduce()`函数最主要的作用是做累加处理，即接收一个函数作为累加器，将数组中的每一个元素从左到右依次执行累加器，返回最终的处理结果。

语法如下:

```javascript
arr.reduce(callback[, initialValue]);
```

`initialValue` 用作 `callback` 的第一个参数值，如果没有设置，则会使用数组的第一个元素值. `callback` 会接收 4 个参数（`accumulator`、`currentValue`、`currentIndex`、`array`）.

- `accumulator` 表示上一次调用累加器的返回值，或设置的 `initialValue` 值。如果设置了 `initialValue`，则 `accumulator`=`initialValue`；否则 `accumulator`=数组的第一个元素值
- `currentValue` 表示数组正在处理的值
- `currentIndex` 表示当前正在处理值的索引。如果设置了 `initialValue`，则 `currentIndex` 从 0 开始，否则从 1 开始
- `array` 表示数组本身
