---
title: "JavaScript 函数"
date: "2023-02-01"
---

# JavaScript 函数

[[TOC]]

## 函数的定义和调用

函数实际也是一种对象，每个函数都是 `Function` 类型的实例，能够定义不同类型的属性与方法

### 函数的定义

#### 1. 函数声明

函数声明是直接使用 `function` 关键字接一个函数名，函数名后是接收函数的形参，示例如下。

```javascript
function sum(num1, num2) {
  return num1 + num2;
}
```

#### 2. 函数表达式

函数表达式的形式类似于普通变量的初始化，只不过这个变量初始化的值是一个函数，示例如下。

匿名函数表达式:

```javascript
var sum = function (num1, num2) {
  return num1 + num2;
};
```

具名函数表达式:

```javascript
var sum = function foo(num1, num2) {
  return num1 + num2;
};
```

::: danger 注意:
具名函数表达式的函数名称 `foo`, 实际是函数内部的一个局部变量, 在函数外部无法直接调用
:::

#### 3. Function()构造函数

使用 `new` 操作符，调用 `Function()` 构造函数，传入对应的参数，也可以定义一个函数，示例如下。

```javascript
var add = new Function("a", "b", "return a + b");
```

其中的参数，除了最后一个参数是执行的函数体，其他参数都是函数的形参。

### 函数的调用

函数的调用存在 5 种模式，分别是函数调用模式，方法调用模式，构造器调用模式，`call()`函数、`apply()`函数调用模式，匿名函数调用模式.

#### 1. 函数调用模式

函数调用模式是通过函数声明或者函数表达式的方式定义函数，然后直接通过函数名调用的模式。

```javascript
function add(a, b) {
  return a + b;
}

var sub = function (a, b) {
  return a - b;
};

add(1, 3);
sub(4, 1);
```

#### 2. 方法调用模式

方法调用模式会优先定义一个对象 `obj`，然后在对象内部定义值为函数的属性 `property`，通过对象 `obj.property()`来进行函数的调用。

```javascript
var obj = {
  name: "kobe",
  getName: function () {
    return this.name;
  },
};

obj.getName();
```

#### 3. 构造器调用模式

构造器调用模式会定义一个函数，在函数中定义实例属性，在原型上定义函数，然后通过 `new` 操作符生成函数的实例，再通过实例调用原型上定义的函数。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

var p = new Person("kobe");
p.getName();
```

#### 4. call()函数、apply()函数调用模式

通过 `call()`函数或者 `apply()`函数可以改变函数执行的主体，使得某些不具有特定函数的对象可以直接调用该特定函数.

```javascript
function sum(a, b) {
  return a + b;
}

var person = {};

sum.call(person, 1, 2);
sum.apply(person, [1, 2]);
```

#### 5. 匿名函数调用模式

1. 通过函数表达式定义函数，并赋给变量，通过变量进行调用

```javascript
var sum = function (a, b) {
  return a + b;
};
sum(1, 2);
```

2. 使用小括号(）将匿名函数括起来，然后在后面使用小括号(），传递对应的参数，进行调用

```javascript
(function (a, b) {
  return a + b;
})(1, 2);
```

### 自执行函数

自执行函数即函数定义和函数调用的行为先后连续产生

## 函数参数

### 形参和实参

形参全称为形式参数，是在定义函数名称与函数体时使用的参数，目的是用来接收调用该函数时传入的参数。
实参全称为实际参数，是在调用时传递给函数的参数，实参可以是常量、变量、表达式、函数等类型。

### arguments 对象的性质

`arguments` 对象是所有函数都具有的一个内置局部变量，表示的是函数实际接收的参数，是一个类数组结构。

#### 1. 函数外部无法访问

`arguments` 对象只能在函数内部使用，无法在函数外部访问到 `arguments` 对象

#### 2. 可通过索引访问

`arguments` 对象是一个类数组结构，可以通过索引访问，每一项表示对应传递的实参值，如果该项索引值不存在，则会返回`undefined`。

```javascript
function sum(num1, num2) {
  console.log(arguments[0]); // 3
  console.log(arguments[1]); // 4
  console.log(arguments[2]); // undefined
}
sum(3, 4);
```

#### 3. 由实参决定

`arguments` 对象的值由实参决定，而不是由定义的形参决定，形参与 `arguments` 对象占用独立的内存空间.

#### 4. 特殊的 arguments.callee 属性

`arguments` 对象有一个很特殊的属性 `callee`，表示的是当前正在执行的函数，在比较时是严格相等的。

```javascript
function foo() {
  console.log(arguments.callee === foo); // true
}
foo();
```

## 构造函数

在函数中存在一类比较特殊的函数——构造函数。当我们创建对象的实例时，通常会使用到构造函数，例如对象和数组的实例化可以通过相应的构造函数 `Object()`和 `Array()`完成。

构造函数与普通函数在语法的定义上的区别:

1. 构造函数的函数名的第一个字母通常会大写
2. 在函数体内部使用 `this` 关键字，表示要生成的对象实例，构造函数并不会显式地返回任何值，而是默认返回`this`
3. 作为构造函数调用时，必须与 `new` 操作符配合使用

## 变量提升和函数提升

### 作用域

一个变量的定义与调用都是会在一个固定的范围中的，这个范围我们称之为作用域。

作用域分类:

1. 全局作用域
2. 函数作用域
3. 块级作用域

### 变量提升

变量提升是将变量的声明提升到函数顶部的位置，而变量的赋值并不会被提升。会产生提升的变量必须是通过 `var` 关键字定义

```javascript
var v = "Hello World";
(function () {
  console.log(v); // undefined
  var v = "Hello JavaScript";
})();
```

### 函数提升

使用函数声明方式定义的函数也会出现提升, 而对于函数表达式，是不会进行函数提升的

```javascript
foo();
function foo() {
  console.log("hello world");
}
```

## 闭包

### 执行上下文环境

`JavaScript` 每段代码的执行都会存在于一个执行上下文环境中，而任何一个执行上下文环境都会存在于整体的执行上下文环境中。根据栈先进后出的特点，全局环境产生的执行上下文环境会最先压入栈中，存在于栈底。当新的函数进行调用时，会产生的新的执行上下文环境，也会压入栈中。当函数调用完成后，这个上下文环境及其中的数据都会被销毁，并弹出栈，从而进入之前的执行上下文环境中

### 闭包的概念

指一个拥有许多变量和绑定了这些变量执行上下文环境的表达式，通常是一个函数。

特点:

1. 函数拥有的外部变量的引用，在函数返回时，该变量仍然处于活跃状态
2. 闭包作为一个函数返回时，其执行上下文环境不会被销毁，仍处于执行上下文环境中。

## this 的使用

this 指向的永远是函数的调用者

#### 1. this 指向全局对象

当函数没有所属对象而直接调用时，`this` 指向的是全局对象

```javascript
var value = 10;
var obj = {
  value: 100,
  method: function () {
    var foo = function () {
      console.log(this.value); // 10
      console.log(this); // window对象
    };
    foo();
    return this.value;
  },
};
obj.method();
```

#### 2. this 指向所属对象

```javascript
var obj = {
  name: "kobe",
  method: function () {
    console.log(this.name); // kobe
  },
};
obj.method();
```

#### 3. this 指向对象实例

当通过 `new` 操作符调用构造函数生成对象的实例时，`this` 指向该实例

```javascript
var number = 10;
function Person() {
  number = 20;
  this.number = 30;
}
Person.prototype.getNumber = function () {
  return this.number;
};
var p = new Person();
console.log(p.getNumber()); // 30
```

#### 4. this 指向 call()函数、apply()函数、bind()函数调用后重新绑定的对象

```javascript
var value = 10;
var obj = {
  value: 20,
};
var method = function () {
  console.log(this.value);
};
method(); // 10
method.call(obj); // 20
method.apply(obj); // 20
var newMethod = method.bind(obj);
newMethod(); // 20
```

#### 5. 闭包中的 this

函数的 `this` 变量只能被自身访问，其内部函数无法访问。因此在遇到闭包时，闭包内部的 `this` 关键字无法访问到外部函数的 `this` 变量。

```javascript
var user = {
  sport: "basketball",
  data: [
    { name: "kobe", age: 20 },
    { name: "James", age: 23 },
  ],
  clickHandler: function () {
    // 此时的this指向的是user对象
    // 使用临时变量_this保存this
    var _this = this;
    this.data.forEach(function (person) {
      // console.log(this); // [object Window]
      console.log(person.name + " is playing " + _this.sport);
    });
  },
};
user.clickHandler();
```

## call()函数、apply()函数、bind()函数的使用与区别

### 1. call()函数的基本使用

`call()`函数调用一个函数时，会将该函数的执行对象上下文改变为另一个对象。其语法如下所示。

```javascript
function.call(thisArg, arg1, arg2, ...)
```

- `function` 为需要调用的函数
- `thisArg` 表示的是新的对象上下文，函数中的 `this` 将指向 `thisArg`，如果 `thisArg` 为 `null` 或者 `undefined`，则 `this` 会指向全局对象。
- `arg1`，`arg2`，`...`表示的是函数所接收的参数列表。

示例:

```javascript
function add(x, y) {
  return x + y;
}
function myAddCall(x, y) {
  return add.call(this, x, y);
}
console.log(myAddCall(10, 20)); // 30
```

### 2. apply()函数的基本使用

`apply()`函数的作用域与 `call()`函数是一致的，只是在传递参数的形式上存在差别。其语法格式如下。

```javascript
function.apply(thisArg, [argsArray])
```

- `function` 与 `thisArg` 参数与 `call()`函数中的解释一样。
- `[argsArray]`表示的是参数会通过数组的形式进行传递，如果 `argsArray` 不是一个有效的数组或者 `arguments` 对象，则会抛出一个 `TypeError` 异常。

示例

```javascript
function add(x, y) {
  return x + y;
}
function myAddApply(x, y) {
  return add.apply(this, [x, y]);
}
console.log(myAddApply(10, 20)); // 30
```

### 3. bind()函数的基本使用

`bind()`函数创建一个新的函数，在调用时设置 `this` 关键字为提供的值，在执行新函数时，将给定的参数列表作为原函数的参数序列，从前往后匹配。其语法格式如下。

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

其返回值是原函数的副本，并拥有指定的 `this` 值和初始参数。

示例

```javascript
function add(x, y) {
  return x + y;
}
function myAddBind(x, y) {
  var bindAddFn = add.bind(this, x, y);
  return bindAddFn();
}
console.log(myAddBind(10, 20)); // 30
```

### call()函数、apply()函数、bind()函数的异同点

##### 相同点

都会改变函数调用的执行主体, 修改 `this` 的指向.

##### 不同点

1. `call()`函数与 `apply()`函数在执行后会立即调用前面的函数, 而 `bind()`函数是返回一个新的函数, 可以在任何时候进行调用.
2. 参数传递不同, `call()`函数与 `bind()`函数接受的参数相同, `apply()`函数接受的第二个参数是数组.
