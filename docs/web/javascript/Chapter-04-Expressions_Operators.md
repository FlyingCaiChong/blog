---
title: 第四章 表达式与操作符
---

# 表达式与操作符

[[toc]]

This chapter documents JavaScript expressions and the operators with which many of those expressions are built. An _expression_ is a phrase of JavaScript that can be _evaluated_ to produce a value. A constant embedded literally in your program is a very simple kind of expression. A variable name is also a simple expression that evaluates to whatever value has been assigned to that variable. Complex expressions are built from simpler expressions. An array access expression, for example, consists of one expression that evaluates to an array followed by an open square bracket, an expression that evaluates to an integer, and a close square bracket. This new, more complex expression evaluates to the value stored at the specified index of the specified array. Similarly, a function invocation expression consists of one expression that evaluates to a function object and zero or more additional expressions that are used as the arguments to the function.

::: tip 翻译
本章讲述 JavaScript 表达式和用于构建各种表达式的操作符。表达式是一个可以被求值并产生一个值的 JavaScript 短语。直接嵌入在程序中的常量是最简单的表达式。变量名也是简单的表达式，可以求值为之前赋给它的值。复杂表达式由简单表达式构成。比如，数组访问表达式由一个求值为数组的表达式、一个左方括号、一个求值为整数的表达式和一个右方括号构成。这个新的更复杂的表达式求值为保存在指定数组的指定索引位置的值。类似地，函数调用表达式由一个求值为函数对象的表达式和零或多个作为函数参数的表达式构成。
:::

The most common way to build a complex expression out of simpler expressions is with an _operator_. An operator combines the values of its operands (usually two of them) in some way and evaluates to a new value. The multiplication operator `*` is a simple example. The expression `x * y` evaluates to the product of the values of the expressions `x` and `y`. For simplicity, we sometimes say that an operator _returns_ a value rather than “evaluates to” a value.

::: tip 翻译
基于简单表达式构建复杂表达式最常见的方式是使用操作符。操作符以某种方式组合其操作数的值（通常有两个），然后求值为一个新值。以乘法操作符 `*` 为例。表达式 `x * y` 求值为表达式 `x` 和 `y` 值的积。为简单起见，有时也说操作符返回值，而不是“求值为”一个值。
:::

This chapter documents all of JavaScript’s operators, and it also explains expressions (such as array indexing and function invocation) that do not use operators. If you already know another programming language that uses C-style syntax, you’ll find that the syntax of most of JavaScript’s expressions and operators is already familiar to you.

::: tip 翻译
本章讲述所有 JavaScript 操作符，也会解释不使用操作符的表达式（如数组索引和函数调用）。如果你熟悉其他使用 C 风格语法的编程语言，那一定会觉得 JavaScript 中多数表达式和操作符的语法并不陌生。
:::

## 主表达式

The simplest expressions, known as _primary expressions_, are those that stand alone—they do not include any simpler expressions. Primary expressions in JavaScript are constant or _literal_ values, certain language keywords, and variable references.

::: tip 翻译
最简单的表达式称为主表达式（primary expression），即那些独立存在，不再包含更简单表达式的表达式。JavaScript 中的主表达式包括常量或字面量值、某些语言关键字和变量引用。
:::

Literals are constant values that are embedded directly in your program. They look like these:

::: tip 翻译
字面量是可以直接嵌入在程序中的常量值。例如：
:::

```js
1.23 // 数值字面量
"hello" // 字符串字面量
/pattern/ // 正则表达式字面量
```

JavaScript syntax for number literals was covered in §3.2. String literals were documented in §3.3. The regular expression literal syntax was introduced in §3.3.5 and will be documented in detail in §11.3.

::: tip 翻译
3.2 节介绍了 JavaScript 数值字面量的语法。3.3 节介绍了字符串字面量的语法。3.3.5 节介绍了正则表达式字面量的语法，另外 11.3 节还会详细介绍。
:::

Some of JavaScript’s reserved words are primary expressions:

::: tip 翻译
JavaScript 的一些保留字也是主表达式：
:::

```js
true; // 求值为布尔值true
false; // 求值为布尔值false
null; // 求值为null值
this; // 求值为“当前”对象
```

We learned about `true`, `false`, and `null` in §3.4 and §3.5. Unlike the other keywords, this is not a constant—it evaluates to different values in different places in the program. The `this` keyword is used in object-oriented programming. Within the body of a method, `this` evaluates to the object on which the method was invoked. See §4.5, [Chapter 8](./Chapter-08-Functions.md) (especially §8.2.2), and [Chapter 9](./Chapter-09-Classes.md) for more on `this`.

::: tip 翻译
我们在 3.4 节和 3.5 节学习了 `true`、`false` 和 `null`。与其他关键字不同，`this` 不是常量，它在程序中的不同地方会求值为不同的值。`this` 是面向对象编程中使用的关键字。在方法体中，`this` 求值为调用方法的对象。要了解关于 `this` 的更多信息，可以参考 4.5 节、[第 8 章](./Chapter-08-Functions.md)（特别是 8.2.2 节）和[第 9 章](./Chapter-09-Classes.md)。
:::

Finally, the third type of primary expression is a reference to a variable, constant, or property of the global object:

::: tip 翻译
最后，第三种主表达式是变量、常量或全局对象属性的引用：
:::

```js
i; // Evaluates to the value of the variable i.
sum; // Evaluates to the value of the variable sum.
undefined; // The value of the "undefined" property of the global object
```

When any identifier appears by itself in a program, JavaScript assumes it is a variable or constant or property of the global object and looks up its value. If no variable with that name exists, an attempt to evaluate a nonexistent variable throws a ReferenceError instead.

::: tip 翻译
当程序中出现任何独立的标识符时，JavaScript 假设它是一个变量或常量或全局对象的属性，并查询它的值。如果不存在该名字的变量，则求值不存在的变量会导致抛出 ReferenceError。
:::

## 对象和数组初始化程序

_Object_ and _array initializers_ are expressions whose value is a newly created object or array. These initializer expressions are sometimes called _object literals_ and _array literals_. Unlike true literals, however, they are not primary expressions, because they include a number of subexpressions that specify property and element values. Array initializers have a slightly simpler syntax, and we’ll begin with those.

::: tip 翻译
对象和数组初始化程序也是一种表达式，其值为新创建的对象或数组。这些初始化程序表达式有时候也被称为对象字面量和数组字面量。但与真正的字面量不同，它们不是主表达式，因为它们包含用于指定属性或元素值的子表达式。数组初始化程序的语法稍微简单一点，我们先来介绍它。
:::

An array initializer is a comma-separated list of expressions contained within square brackets. The value of an array initializer is a newly created array. The elements of this new array are initialized to the values of the comma-separated expressions:

::: tip 翻译
数组初始化程序是一个包含在方括号内的逗号分隔的表达式列表。数组初始化程序的值是新创建的数组。这个新数组的元素被初始化为逗号分隔的表达式的值：
:::

```js
[]; // 空数组： 方括号中没有表达式意味着没有元素
[1 + 2, 3 + 4]; // 两个元素的数组。第一个元素是3，第二个元素是7
```

The element expressions in an array initializer can themselves be array initializers, which means that these expressions can create nested arrays:

::: tip 翻译
数组初始化程序中的元素表达式本身也可以是数组初始化程序，这意味着以下表达式可以创建嵌套数组：
:::

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

The element expressions in an array initializer are evaluated each time the array initializer is evaluated. This means that the value of an array initializer expression may be different each time it is evaluated.

::: tip 翻译
数组初始化程序中的元素表达式在每次数组初始化程序被求值时也会被求值。这意味着数组初始化程序表达式每次求值的结果可能不一样。
:::

Undefined elements can be included in an array literal by simply omitting a value between commas. For example, the following array contains five elements, including three undefined elements:

::: tip 翻译
在数组字面量中省略逗号间的值可以包含未定义元素。例如，以下数组包含 5 个元素，其中有 3 个未定义元素：
:::

```js
let sparseArray = [1, , , , 5];
```

A single trailing comma is allowed after the last expression in an array initializer and does not create an undefined element. However, any array access expression for an index after that of the last expression will necessarily evaluate to undefined.

::: tip 翻译
数组初始化程序的最后一个表达式后面可以再跟一个逗号，而且这个逗号不会创建未定义元素。不过，通过数组访问表达式访问最后一个表达式后面的索引一定会求值为 `undefined`。
:::

Object initializer expressions are like array initializer expressions, but the square brackets are replaced by curly brackets, and each subexpression is prefixed with a property name and a colon:

::: tip 翻译
对象初始化程序表达式与数组初始化程序表达式类似，但方括号变成了花括号，且每个子表达式前面多了一个属性名和一个冒号：
:::

```js
let p = { x: 2.3, y: -1.2 }; // 有两个属性的对象
let q = {}; // 没有属性的空对象
q.x = 2.3;
q.y = -1.2; // 现在q拥有了跟p一样的属性
```

In ES6, object literals have a much more feature-rich syntax (you can find details in §6.10). Object literals can be nested. For example:

::: tip 翻译
在 ES6 中，对象字面量拥有了更丰富的语法（可以参见 6.10 节）。对象字面量可以嵌套。例如：
:::

```js
let rectangle = {
  upperLeft: { x: 2, y: 2 },
  lowerRight: { x: 4, y: 5 },
};
```

We’ll see object and array initializers again in [Chapters 6](./Chapter-06-Objects.md) and [7](./Chapter-07-Arrays.md).

::: tip 翻译
[第 6 章](./Chapter-06-Objects.md)和[第 7 章](./Chapter-07-Arrays.md)还将介绍对象和数组初始化程序。
:::

## 函数定义表达式

A _function definition expression_ defines a JavaScript function, and the value of such an expression is the newly defined function. In a sense, a function definition expression is a “function literal” in the same way that an object initializer is an “object literal.” A function definition expression typically consists of the keyword `function` followed by a comma-separated list of zero or more identifiers (the parameter names) in parentheses and a block of JavaScript code (the function body) in curly braces. For example:

::: tip 翻译
函数定义表达式定义 JavaScript 函数，其值为新定义的函数。某种意义上说，函数定义表达式也是“函数字面量”，就像对象初始化程序是“对象字面量”一样。函数定义表达式通常由关键字`function`、位于括号中的逗号分隔的零或多个标识符（参数名），以及一个位于花括号中的 JavaScript 代码块（函数体）构成。例如：
:::

```js
// 这个函数返回传入值的平方
let square = function (x) {
  return x * x;
};
```

A function definition expression can also include a name for the function. Functions can also be defined using a function statement rather than a function expression. And in ES6 and later, function expressions can use a compact new “arrow function” syntax. Complete details on function definition are in [Chapter 8](./Chapter-08-Functions.md).

::: tip 翻译
函数定义表达式也可以包含函数的名字。函数也可以使用函数语句而非函数表达式来定义。在 ES6 及之后的版本中，函数表达式可以使用更简洁的“箭头函数”语法。[第 8 章](./Chapter-08-Functions.md)详细讲解了函数定义。
:::

## 属性访问表达式

A _property access expression_ evaluates to the value of an object property or an array element. JavaScript defines two syntaxes for property access:

::: tip 翻译
属性访问表达式求值为对象属性或数组元素的值。JavaScript 定义了两种访问属性的语法：
:::

```js
expression.identifier;
expression[expression];
```

The first style of property access is an expression followed by a period and an identifier. The expression specifies the object, and the identifier specifies the name of the desired property. The second style of property access follows the first expression (the object or array) with another expression in square brackets. This second expression specifies the name of the desired property or the index of the desired array element. Here are some concrete examples:

::: tip 翻译
第一种属性访问语法是表达式后跟一个句点和一个标识符。其中，表达式指定对象，标识符指定属性名。第二种属性访问语法是表达式（对象或数组）后跟另一个位于方括号中的表达式。这第二个表达式指定属性名或数组元素的索引。下面是几个具体的例子：
:::

```js
let o = { x: 1, y: { z: 3 } }; // 示例对象
let a = [o, 4, [5, 6]]; // 包含前面对象的示例数组
o.x; // => 1: 表达式o的属性x
o.y.z; // => 3: 表达式o.y的属性z
o["x"]; // => 1: 对象o的属性x
a[1]; // => 4: 表达式a中索引为1的元素
a[2]["1"]; // => 6: 表达式a[2]中索引为 1的元素
a[0].x; // => 1: 表达式a[0]的属性x
```

With either type of property access expression, the expression before the `.` or `[` is first evaluated. If the value is `null` or `undefined`, the expression throws a TypeError, since these are the two JavaScript values that cannot have properties. If the object expression is followed by a dot and an identifier, the value of the property named by that identifier is looked up and becomes the overall value of the expression. If the object expression is followed by another expression in square brackets, that second expression is evaluated and converted to a string. The overall value of the expression is then the value of the property named by that string. In either case, if the named property does not exist, then the value of the property access expression is `undefined`.

::: tip 翻译
无论哪种属性访问表达式，位于 `.` 或 `[` 前面的表达式都会先求值。如果求值结果为`null`或`undefined`，则表达式会抛出 TypeError，因为它们是 JavaScript 中不能有属性的两个值。如果对象表达式后跟一个点和一个标识符，则会对以该标识符为名字的属性求值，且该值会成为整个表达式的值。如果对象表达式后跟位于方括号中的另一个表达式，则第二个表达式会被求值并转换为字符串。整个表达式的值就是名字为该字符串的属性的值。任何一种情况下，如果指定名字的属性不存在，则属性访问表达式的值是`undefined`。
:::

The `.identifier` syntax is the simpler of the two property access options, but notice that it can only be used when the property you want to access has a name that is a legal identifier, and when you know the name when you write the program. If the property name includes spaces or punctuation characters, or when it is a number (for arrays), you must use the square bracket notation. Square brackets are also used when the property name is not static but is itself the result of a computation (see §6.3.1 for an example).

::: tip 翻译
在两种属性访问表达式中，加标识符的语法更简单，但通过它访问的属性的名字必须是合法的标识符，而且在写代码时已经知道了这个名字。如果属性名中包含空格或标点字符，或者是一个数值（对于数组而言），则必须使用方括号语法。方括号也可以用来访问非静态属性名，即属性本身是计算结果（参见 6.3.1 节的例子）。
:::

Objects and their properties are covered in detail in [Chapter 6](./Chapter-06-Objects.md), and arrays and their elements are covered in [Chapter 7](./Chapter-07-Arrays.md).

::: tip 翻译
对象及其属性将在[第 6 章](./Chapter-06-Objects.md)详细介绍，数组及其元素将在[第 7 章](./Chapter-07-Arrays.md)详细介绍。
:::

### 条件式属性访问

ES2020 adds two new kinds of property access expressions:

::: tip 翻译
ES2020 增加了两个新的属性访问表达式：
:::

```js
expression?.identifier;
expression?.[expression];
```

In JavaScript, the values `null` and `undefined` are the only two values that do not have properties. In a regular property access expression using `.` or `[]`, you get a TypeError if the expression on the left evaluates to `null` or `undefined`. You can use `?.` and `?.[]` syntax to guard against errors of this type.

::: tip 翻译
在 JavaScript 中，`null`和`undefined`是唯一两个没有属性的值。在使用普通的属性访问表达式时，如果`.`或`[]`左侧的表达式求值为`null`或`undefined`，会报 TypeError。可以使用`?.`或`?.[]`语法防止这种错误发生。
:::

Consider the expression `a?.b`. If a is `null` or `undefined`, then the expression evaluates to `undefined` without any attempt to access the property `b`. If `a` is some other value, then `a?.b` evaluates to whatever `a.b` would evaluate to (and if a does not have a property named `b`, then the value will again be `undefined`).

::: tip 翻译
比如表达式`a?.b`，如果`a`是`null`或`undefined`，那么整个表达式求值结果为`undefined`，不会尝试访问属性`b`。如果 a 是其他值，则`a?.b`求值为`a.b`的值（如果`a`没有名为`b`的属性，则整个表达式的值还是`undefined`）。
:::

This form of property access expression is sometimes called “optional chaining” because it also works for longer “chained” property access expressions like this one:

::: tip 翻译
这种形式的属性访问表达式有时候也被称为“可选链接”，因为它也适用于下面这样更长的属性访问表达式链条：
:::

```js
let a = { b: null };
a.b?.c.d; // => undefined
```

`a` is an object, so `a.b` is a valid property access expression. But the value of `a.b` is `null`, so `a.b.c` would throw a TypeError. By using `?.` instead of `.` we avoid the TypeError, and `a.b?.c` evaluates to `undefined`. This means that `(a.b?.c).d` will throw a TypeError, because that expression attempts to access a property of the value `undefined`. But—and this is a very important part of “optional chaining”—`a.b?.c.d` (without the parentheses) simply evaluates to `undefined` and does not throw an error. This is because property access with `?.` is “short-circuiting”: if the subexpression to the left of `?.` evaluates to `null` or `undefined`, then the entire expression immediately evaluates to `undefined` without any further property access attempts.

::: tip 翻译
`a`是个对象，因此`a.b`是有效的属性访问表达式。但`a.b`的值是`null`，因此`a.b.c`会抛出 TypeError。但通过使用`?.`而非`.`就可以避免这个 TypeError，最终`a.b?.c`求值为`undefined`。这意味着`(a.b?.c).d`也会抛出 TypeError，因为这个表达式尝试访问`undefined`值的属性。但如果没有括号，即`a.b?.c.d`（这种形式是“可选链接”的重要特征）就会直接求值为`undefined`而不会抛出错误。这是因为通过`?.`访问属性是“短路操作”：如果`?.`左侧的子表达式求值为`null`或`undefined`，那么整个表达式立即求值为`undefined`，不会再进一步尝试访问属性。
:::

Of course, if `a.b` is an object, and if that object has no property named `c`, then `a.b?.c.d` will again throw a TypeError, and we will want to use another conditional property access:

::: tip 翻译
当然，如果`a.b`是对象，且这个对象没有名为`c`的属性，则`a.b?.c.d`仍然会抛出 TypeError。此时应该再加一个条件式属性访问：
:::

```js
let a = { b: {} };
a.b?.c?.d; // => undefined
```

Conditional property access is also possible using `?.[]` instead of `[]`. In the expression `a?.[b][c]`, if the value of a is `null` or `undefined`, then the entire expression immediately evaluates to `undefined`, and subexpressions `b` and `c` are never even evaluated. If either of those expressions has side effects, the side effect will not occur if a is not defined:

::: tip 翻译
条件式属性访问也可以让我们使用`?.[]`而非`[]`。在表达式`a?.[b][c]`中，如果`a`的值是`null`或`undefined`，则整个表达式立即求值为`undefined`，子表达式`b`和`c`不会被求值。换句话说，如果`a`没有定义，那么`b`和`c`无论谁有副效应（side effect），这个副效应都不会发生：
:::

```js
let a; // 忘记初始化这个变量了！
let index = 0;
try {
  a[index++]; // 抛出 TypeError
} catch (e) {
  index; // => 1: 抛出 TypeError 之前发生了递增
}
a?.[index++]; // => undefined: 因为a是undefined
index; // => 1: 因为 ?.[] 短路所以没有发生递增
a[index++]; // !TypeError: 不能索引undefined.
```

Conditional property access with `?.` and `?.[]` is one of the newest features of JavaScript. As of early 2020, this new syntax is supported in the current or beta versions of most major browsers.

::: tip 翻译
使用`?.`和`?.[]`的条件式属性访问是 JavaScript 最新的特性之一。在 2020 年初，多数主流浏览器的当前版本或预览版已经支持这个新语法。
:::

## 调用表达式

An _invocation expression_ is JavaScript’s syntax for calling (or executing) a function or method. It starts with a function expression that identifies the function to be called. The function expression is followed by an open parenthesis, a comma-separated list of zero or more argument expressions, and a close parenthesis. Some examples:

::: tip 翻译
调用表达式是 JavaScript 中调用（或执行）函数或方法的一种语法。这种表达式开头是一个表示要调用函数的函数表达式。函数表达式后面跟着左圆括号、逗号分隔的零或多个参数表达式的列表和右圆括号。看几个例子：
:::

```js
f(0); // f是函数表达式，0是参数表达式
Math.max(x, y, z); // Math.max 是函数； x, y, z是参数
a.sort(); // a.sort 是函数，没有参数
```

When an invocation expression is evaluated, the function expression is evaluated first, and then the argument expressions are evaluated to produce a list of argument values. If the value of the function expression is not a function, a TypeError is thrown. Next, the argument values are assigned, in order, to the parameter names specified when the function was defined, and then the body of the function is executed. If the function uses a `return` statement to return a value, then that value becomes the value of the invocation expression. Otherwise, the value of the invocation expression is `undefined`. Complete details on function invocation, including an explanation of what happens when the number of argument expressions does not match the number of parameters in the function definition, are in [Chapter 8](./Chapter-08-Functions.md).

::: tip 翻译
求值调用表达式时，首先求值函数表达式，然后求值参数表达式以产生参数值的列表。如果函数表达式的值不是函数，则抛出 TypeError。然后，按照函数定义时参数的顺序给参数赋值，之后再执行函数体。如果函数使用了`return`语句返回一个值，则该值就成为调用表达式的值。否则，调用表达式的值是`undefined`。关于函数调用的完整细节，包括在参数表达式个数与函数定义的参数个数不匹配时会发生什么，都会在[第 8 章](./Chapter-08-Functions.md)介绍。
:::

Every invocation expression includes a pair of parentheses and an expression before the open parenthesis. If that expression is a property access expression, then the invocation is known as a _method invocation_. In method invocations, the object or array that is the subject of the property access becomes the value of the `this` keyword while the body of the function is being executed. This enables an object-oriented programming paradigm in which functions (which we call “methods” when used this way) operate on the object of which they are part. See [Chapter 9](./Chapter-09-Classes.md) for details.

::: tip 翻译
每个调用表达式都包含一对圆括号和左圆括号前面的表达式。如果该表达式是属性访问表达式，则这种调用被称为方法调用。在方法调用中，作为属性访问主体的对象或数组在执行函数体时会变成`this`关键字的值。这样就可以支持面向对象的编程范式，即函数（这样使用时我们称其为“方法”）会附着在其所属对象上来执行操作。详细内容可以参考[第 9 章](./Chapter-09-Classes.md)。
:::

### 条件式调用

In ES2020, you can also invoke a function using `?.()` instead of `()`. Normally when you invoke a function, if the expression to the left of the parentheses is `null` or `undefined` or any other non-function, a TypeError is thrown. With the new `?.()` invocation syntax, if the expression to the left of the `?.` evaluates to `null` or `undefined`, then the entire invocation expression evaluates to `undefined` and no exception is thrown.

::: tip 翻译
在 ES2020 中，可以使用`?.()`而非`()`来调用函数。正常情况下，我们调用函数时，如果圆括号左侧的表达式是`null`或`undefined`或任何其他非函数值，都会抛出 TypeError。而使用`?.()`调用语法，如果`?.`左侧的表达式求值为`null`或`undefined`，则整个调用表达式求值为`undefined`，不会抛出异常。
:::

Array objects have a `sort()` method that can optionally be passed a function argument that defines the desired sorting order for the array elements. Before ES2020, if you wanted to write a method like `sort()` that takes an optional function argument, you would typically use an `if` statement to check that the function argument was defined before invoking it in the body of the `if`:

::: tip 翻译
数组对象有一个`sort()`方法，接收一个可选的函数参数，用来定义对数组元素排序的规则。在 ES2020 之前，如果想写一个类似`sort()`的这种接收可选函数参数的方法，通常需要在函数内使用`if`语句检查该函数参数是否有定义，然后再调用：
:::

```js
function square(x, log) {
  // 第二个参数是一个可选的函数
  if (log) {
    // 如果传入了可选的函数
    log(x); // 调用这个函数
  }
  return x * x; // 返回第一个参数的平方
}
```

With this conditional invocation syntax of ES2020, however, you can simply write the function invocation using `?.()`, knowing that invocation will only happen if there is actually a value to be invoked:

::: tip 翻译
但有了 ES2020 的条件式调用语法，可以简单地使用`?.()`来调用这个可选的函数，只有在函数有定义时才会真正调用：
:::

```js
function square(x, log) {
  // 第二个参数是一个可选的函数
  log?.(x); // 如果有定义则调用
  return x * x; // 返回第一个参数的平方
```

Note, however, that `?.()` only checks whether the left hand side is `null` or `undefined`. It does not verify that the value is actually a function. So the `square()` function in this example would still throw an exception if you passed two numbers to it, for example.

::: tip 翻译
不过要注意，`?.()`只会检查左侧的值是不是`null`或`undefined`，不会验证该值是不是函数。因此，这个例子中的`square()`函数在接收到两个数值时仍然会抛出异常。
:::

Like conditional property access expressions (§4.4.1), function invocation with `?.()` is short-circuiting: if the value to the left of `?.` is `null` or `undefined`, then none of the argument expressions within the parentheses are evaluated:

::: tip 翻译
与条件式属性访问表达式（参见 4.4.1 节）类似，使用`?.()`进行函数调用也是短路操作：如果`?.`左侧的值是`null`或`undefined`，则圆括号中的任何参数表达式都不会被求值：
:::

```js
let f = null,
  x = 0;
try {
  f(x++); // 因为f是null，所以抛出TypeError
} catch (e) {
  x; // => 1: 抛出异常前x发生了递增
}
f?.(x++); // => undefined:f是null，但不会抛出异常
x; // => 1: 因为短路，递增不会发生
```

Conditional invocation expressions with `?.()` work just as well for methods as they do for functions. But because method invocation also involves property access, it is worth taking a moment to be sure you understand the differences between the following expressions:

::: tip 翻译
使用`?.()`的条件式调用表达式既适用于函数调用，也适用于方法调用。因为方法调用又涉及属性访问，所以有必要花时间确认一下自己是否理解下列表达式的区别：
:::

```js
o.m(); // 常规属性访问，常规调用
o?.m(); // 条件式属性访问，常规调用
o.m?.(); // 常规属性访问，条件式调用
```

In the first expression, `o` must be an object with a property `m` and the value of that property must be a function. In the second expression, if `o` is `null` or `undefined`, then the expression evaluates to `undefined`. But if `o` has any other value, then it must have a property `m` whose value is a function. And in the third expression, `o` must not be `null` or `undefined`. If it does not have a property `m`, or if the value of that property is `null`, then the entire expression evaluates to `undefined`.

::: tip 翻译
第一个表达式中，`o`必须是一个对象且必须有一个`m`属性，且该属性的值必须是函数。第二个表达式中，如果`o`是`null`或`undefined`，则表达式求值为`undefined`。但如果`o`是任何其他值，则它必须有一个值为函数的属性`m`。第三个表达式中，`o`必须不是`null`或`undefined`。如果它没有属性`m`或属性`m`的值是`null`，则整个表达式求值为`undefined`。
:::

Conditional invocation with `?.()` is one of the newest features of JavaScript. As of the first months of 2020, this new syntax is supported in the current or beta versions of most major browsers.

::: tip 翻译
使用`?.()`的条件式调用是 JavaScript 最新的特性之一。在 2020 年初，多数主流浏览器的当前版本或预览版已经支持这个新语法。
:::

## 对象创建表达式

An _object creation expression_ creates a new object and invokes a function (called a constructor) to initialize the properties of that object. Object creation expressions are like invocation expressions except that they are prefixed with the keyword `new`:

::: tip 翻译
对象创建表达式创建一个新对象并调用一个函数（称为构造函数）来初始化这个新对象。对象创建表达式类似于调用表达式，区别在于前面多了一个关键字 `new`：
:::

```js
new Object();
new Point(2, 3);
```

If no arguments are passed to the constructor function in an object creation expression, the empty pair of parentheses can be omitted:

::: tip 翻译
如果在对象创建表达式中不会给构造函数传参，则可以省略圆括号：
:::

```js
new Object();
new Date();
```

The value of an object creation expression is the newly created object. Constructors are explained in more detail in **Chapter 9**.

::: tip 翻译
对象创建表达式的值是新创建的对象。第 9 章将更详细地解释构造函数。
:::

## 操作符概述

Operators are used for JavaScript’s arithmetic expressions, comparison expressions, logical expressions, assignment expressions, and more. Table 4-1 summarizes the operators and serves as a convenient reference.

::: tip 翻译
操作符在 JavaScript 中用于算术表达式、比较表达式、逻辑表达式、赋值表达式等。表 4-1 总结了所有操作符，可以作为一个参考。
:::

Note that most operators are represented by punctuation characters such as `+` and `=`. Some, however, are represented by keywords such as `delete` and `instanceof`. Keyword operators are regular operators, just like those expressed with punctuation; they simply have a less succinct syntax.

::: tip 翻译
注意，多数操作符都以`+`和`=`这样的标点符号表示。不过，有一些也以`delete`和`instanceof`这样的关键字表示。关键字操作符也是常规操作符，与标点符号表示的操作符一样，只不过它们的语法没那么简短而已。
:::

Table 4-1 is organized by operator precedence. The operators listed first have higher precedence than those listed last. Operators separated by a horizontal line have different precedence levels. The column labeled A gives the operator associativity, which can be L (left-to-right) or R (right-to-left), and the column N specifies the number of operands. The column labeled Types lists the expected types of the operands and (after the → symbol) the result type for the operator. The subsections that follow the table explain the concepts of precedence, associativity, and operand type. The operators themselves are individually documented following that discussion.

::: tip 翻译
表 4-1 按操作符优先级组织。换句话说，表格前面的操作符比后面的操作符优先级更高。横线分隔的操作符具有不同优先级。“结合性”中的“左”表示“从左到右”，“右”表示“从右到左”。“操作数”表示操作数的个数。“类型”表示操作数的类型，以及操作符的结果类型（→ 后面）。表格后面的几节解释优先级、结合性和操作数类型的概念。介绍完这些概念后，我们将详细介绍每一个操作符。
:::

_Table 4-1. JavaScript operators_

| Operator                          | Operation                        | A                  | N                  | Types            |
| --------------------------------- | :------------------------------- | :----------------- | ------------------ | ---------------- | ------------ | ----------- |
| ++                                | Pre- or post-increment           | R                  | 1                  | lval→num         |
| --                                | Pre- or post-decrement           | R                  | 1                  | lval→num         |
| -                                 | Negate number                    | R                  | 1                  | num→num          |
| +                                 | Convert to number                | R                  | 1                  | any→num          |
| ~                                 | Invert bits                      | R                  | 1                  | int→int          |
| !                                 | Invert boolean value             | R                  | 1                  | bool→bool        |
| delete                            | Remove a property                | R                  | 1                  | lval→bool        |
| typeof                            | Determine type of operand        | R                  | 1                  | any→str          |
| void                              | Return undefined value           | R                  | 1                  | any→undef        |
| \*\*                              | Exponentiate                     | R                  | 2                  | num,num→num      |
| \*,/,%                            | Multiply, divide, remainder      | L                  | 2                  | num,num→num      |
| +, -                              | Add, subtract                    | L                  | 2                  | num,num→num      |
| +                                 | Concatenate strings              | L                  | 2                  | str,str→str      |
| <<                                | Shift left                       | L                  | 2                  | int,int→int      |
| >>                                | Shift right with sign extension  | L                  | 2                  | int,int→int      |
| >>>                               | Shift right with zero extension  | L                  | 2                  | int,int→int      |
| <, <=, >, >=                      | Compare in numeric order         | L                  | 2                  | num,num→bool     |
| <, <=, >, >=                      | Compare in alphabetical order    | L                  | 2                  | str,str→bool     |
| instanceof                        | Test object class                | L                  | 2                  | obj,func→bool    |
| in                                | Test whether property exists     | L                  | 2                  | any,obj→bool     |
| ==                                | Test for non-strict equality     | L                  | 2                  | any,any→bool     |
| !=                                | Test for non-strict inequality   | L                  | 2                  | any,any→bool     |
| ===                               | Test for strict equality         | L                  | 2                  | any,any→bool     |
| !==                               | Test for strict inequality       | L                  | 2                  | any,any→bool     |
| &                                 | Compute bitwise AND              | L                  | 2                  | int,int→int      |
| ^                                 | Compute bitwise XOR              | L                  | 2                  | int,int→int      |
|                                   |                                  | Compute bitwise OR | L                  | 2                | int,int→int  |
| &&                                | Compute logical AND              | L                  | 2                  | any,any→any      |
|                                   |                                  |                    | Compute logical OR | L                | 2            | any,any→any |
| ??                                | Choose 1st defined operand       | L                  | 2                  | any,any→any      |
| ?:                                | Choose 2nd or 3rd Operand        | R                  | 3                  | bool,any,any→any |
| =                                 | Assign to a variable or property | R                  | 2                  | lval,any→any     |
| \*_=, _=, /=, %=, +=, -=, &=, ^=, | =, <<=, >>=, >>>=                | Operate and assign | R                  | 2                | lval,any→any |
| ,                                 | Discard 1st operand, return 2nd  | L                  | 2                  | any,any→any      |

### 操作数个数

Operators can be categorized based on the number of operands they expect (their _arity_). Most JavaScript operators, like the `*` multiplication operator, are _binary operators_ that combine two expressions into a single, more complex expression. That is, they expect two operands. JavaScript also supports a number of _unary operators_, which convert a single expression into a single, more complex expression. The `−` operator in the expression `−x` is a unary operator that performs the operation of negation on the operand `x`. Finally, JavaScript supports one _ternary operator_, the conditional operator `?:`, which combines three expressions into a single expression.

::: tip 翻译
操作符可以按照它们期待的操作数个数（参数数量）来分类。多数 JavaScript 操作符（如乘法操作符`*`）都是二元操作符，可以将两个表达式组合成一个更复杂的表达式。换句话说，这些操作符期待两个操作数。JavaScript 也支持一些一元操作符，这些操作符将一个表达式转换为另一个更复杂的表达式。表达式`-x`中的操作符`-`就是一元操作符，用于对操作数`x`进行求负值操作。最后，JavaScript 也支持一个三元操作符，即条件操作符`?:`，用于将三个表达式组合为一个表达式。
:::

### 操作数与结果类型

Some operators work on values of any type, but most expect their operands to be of a specific type, and most operators return (or evaluate to) a value of a specific type. The Types column in Table 4-1 specifies operand types (before the arrow) and result type (after the arrow) for the operators.

::: tip 翻译
有些操作符适用于任何类型的值，但多数操作符期待自己的操作数是某种特定类型，而且多数操作符也返回（或求值为）特定类型的值。表 4-1 的“类型”列标明了操作数类型（箭头前）和结果类型（箭头后）。
:::

JavaScript operators usually convert the type (see §3.9) of their operands as needed. The multiplication operator `*` expects numeric operands, but the expression "3" `*` "5" is legal because JavaScript can convert the operands to numbers. The value of this expression is the number 15, not the string “15”, of course. Remember also that every JavaScript value is either “truthy” or “falsy,” so operators that expect boolean operands will work with an operand of any type.

::: tip 翻译
JavaScript 操作符通常会按照需要转换操作数的类型（参见 3.9 节）。比如，乘法操作符`*`期待数值参数，而表达式"3" `*` "5"之所以合法，是因为 JavaScript 可以把操作数转换为数值。因此这个表达式的值是数值 15，而非字符串"15"。也要记住，每个 JavaScript 值要么是“真值”要么是“假值”，因此期待布尔值操作数的操作符可以用于任何类型的操作数。
:::

Some operators behave differently depending on the type of the operands used with them. Most notably, the `+` operator adds numeric operands but concatenates string operands. Similarly, the comparison operators such as `<` perform comparison in numerical or alphabetical order depending on the type of the operands. The descriptions of individual operators explain their type-dependencies and specify what type conversions they perform.

::: tip 翻译
有些操作符的行为会因为操作数类型的不同而不同。最明显的，`+`操作符可以把数值加起来，也可以拼接字符串。类似地，比较操作符（如`<`）根据操作数类型会按照数值顺序或字母表顺序比较。后面对每个操作符都有详细介绍，包括它们的类型依赖，以及它们执行的类型转换。
:::

Notice that the assignment operators and a few of the other operators listed in Table 4-1 expect an operand of type `lval`. _lvalue_ is a historical term that means “an expression that can legally appear on the left side of an assignment expression.” In JavaScript, variables, properties of objects, and elements of arrays are lvalues.

::: tip 翻译
注意，表 4-1 中列出的赋值操作符和少数其他操作符期待操作数类型为`lval`。`lval`即`lvalue`（左值），是一个历史悠久的术语，意思是“一个可以合法地出现在赋值表达式左侧的表达式”。在 JavaScript 中，变量、对象属性和数组元素都是“左值”。
:::

### 操作符副效应

Evaluating a simple expression like `2 * 3` never affects the state of your program, and any future computation your program performs will be unaffected by that evaluation. Some expressions, however, have _side effects_, and their evaluation may affect the result of future evaluations. The assignment operators are the most obvious example: if you assign a value to a variable or property, that changes the value of any expression that uses that variable or property. The `++` and `--` increment and decrement operators are similar, since they perform an implicit assignment. The `delete` operator also has side effects: deleting a property is like (but not the same as) assigning undefined to the property.

::: tip 翻译
对类似`2 * 3`这样的简单表达式求值不会影响程序状态，程序后续的任何计算也不会被这个求值所影响。但有些表达式是有副效应的，即对它们求值可能影响将来求值的结果。赋值操作符就是明显的例子：把一个值赋给变量或属性，会改变后续使用该变量或属性的表达式的值。类似地，递增和递减操作符`++`和`--`也有副效应，因为它们会执行隐式赋值。同样，`delete`操作符也有副效应，因为删除属性类似于（但不同于）给属性赋值`undefined`。
:::

No other JavaScript operators have side effects, but function invocation and object creation expressions will have side effects if any of the operators used in the function or constructor body have side effects.

::: tip 翻译
其他 JavaScript 操作符都没有副效应，但函数调用和对象创建表达式是否有副效应，取决于函数或构造函数体内是否使用了有副效应的操作符。
:::

### 操作符优先级

The operators listed in Table 4-1 are arranged in order from high precedence to low precedence, with horizontal lines separating groups of operators at the same precedence level. Operator precedence controls the order in which operations are performed. Operators with higher precedence (nearer the top of the table) are performed before those with lower precedence (nearer to the bottom).

::: tip 翻译
表 4-1 中的操作符是按照优先级从高到低的顺序排列的，表中横线分组了相同优先级的操作符。操作符优先级控制操作符被执行的顺序。优先级高（靠近表格顶部）的操作符先于优先级低（靠近表格底部）的操作符执行。
:::

Consider the following expression:

::: tip 翻译
来看下面这个表达式：
:::

```js
w = x + y * z;
```

The multiplication operator `*` has a higher precedence than the addition operator `+`, so the multiplication is performed before the addition. Furthermore, the assignment operator `=` has the lowest precedence, so the assignment is performed after all the operations on the right side are completed.

::: tip 翻译
其中乘法操作符`*`比加法操作符`+`优先级高，因此乘法计算先于加法执行。另外，赋值操作符`=`的优先级最低，因此赋值会在右侧所有操作都执行完之后才会执行。
:::

Operator precedence can be overridden with the explicit use of parentheses. To force the addition in the previous example to be performed first, write:

::: tip 翻译
操作符优先级可以通过圆括号显式改写。比如，要强制先执行上例中的加法计算，可以这样写：
:::

```js
w = (x + y) * z;
```

Note that property access and invocation expressions have higher precedence than any of the operators listed in Table 4-1. Consider this expression:

::: tip 翻译
注意，属性访问和调用表达式的优先级高于表 4-1 中列出的任何操作符。看下面的例子：
:::

```js
// my 是一个有function属性的对象，function属性
// 是一个函数的数组。这里调用了x号函数，并传给它
// 参数y，然后再求值函数调用返回值的类型。
typeof my.functions[x](y);
```

Although `typeof` is one of the highest-priority operators, the `typeof` operation is performed on the result of the property access, array index, and function invocation, all of which have higher priority than operators.

::: tip 翻译
尽管`typeof`是优先级最高的操作符，但`typeof`操作符要基于属性访问、数组索引和函数调用的结果执行，这些操作的优先级全部高于操作符。
:::

In practice, if you are at all unsure about the precedence of your operators, the simplest thing to do is to use parentheses to make the evaluation order explicit. The rules that are important to know are these: multiplication and division are performed before addition and subtraction, and assignment has very low precedence and is almost always performed last.

::: tip 翻译
实践中，如果你完全不确定自己所用操作符的优先级，最简单的办法是使用圆括号明确求值顺序。最重要的规则在于：乘和除先于加和减执行，而赋值优先级很低，几乎总是最后才执行。
:::

When new operators are added to JavaScript, they do not always fit naturally into this precedence scheme. The `??` operator (§4.13.2) is shown in the table as lower precedence than `||` and `&&`, but, in fact, its precedence relative to those operators is not defined, and ES2020 requires you to explicitly use parentheses if you mix `??` with either `||` or `&&`. Similarly, the new `**` exponentiation operator does not have a well defined precedence relative to the unary negation operator, and you must use parentheses when combining negation with exponentiation.

::: tip 翻译
JavaScript 新增的操作符并不总是符合这个优先级模式。比如在表 4-1 中，`??`操作符（参见 4.13.2 节）比`||`和`&&`优先级低，而实际上它相对于这两个操作符的优先级并没有定义，ES2020 要求在混用`??`和`||`或`&&`时使用必须使用圆括号。类似地，新的幂操作符`**`相对于一元负值操作符的优先级也没有明确定义，因此在同时求负值和求幂时也必须使用圆括号。
:::

### 操作符结合性

In Table 4-1, the column labeled A specifies the _associativity_ of the operator. A value of L specifies left-to-right associativity, and a value of R specifies right-to-left associativity. The associativity of an operator specifies the order in which operations of the same precedence are performed. Left-to-right associativity means that operations are performed from left to right. For example, the subtraction operator has left-to-right associativity, so:

::: tip 翻译
在表 4-1 中，“结合性”标明了操作符的结合性。“左”表示结合性为从左到右，“右”表示结合性为从右到左。操作符结合性规定了相同优先级操作的执行顺序。左结合意味着操作从左到右执行。例如，减操作符具有左结合性，因此：
:::

```js
w = x - y - z;
```

is the same as:

::: tip 翻译
就等价于：
:::

```js
w = x - y - z;
```

On the other hand, the following expressions:

::: tip 翻译
另一方面，下列表达式：
:::

```
y = a ** b ** c;
x = ~-y;
w = x = y = z;
q = a ? b : c ? d : e ? f : g;
```

are equivalent to:

::: tip 翻译
等价于：
:::

```
y = (a ** (b ** c));
x = ~(-y);
w = (x = (y = z));
q = a ? b : (c ? d : (e ? f : g));
```

because the exponentiation, unary, assignment, and ternary conditional operators have right-to-left associativity.

::: tip 翻译
因为幂、一元、赋值和三元条件操作符具有右结合性。
:::

### 求值顺序

Operator precedence and associativity specify the order in which operations are performed in a complex expression, but they do not specify the order in which the subexpressions are evaluated. JavaScript always evaluates expressions in strictly left-to-right order. In the expression `w = x + y * z`, for example, the subexpression `w` is evaluated first, followed by `x`, `y`, and `z`. Then the values of `y` and `z` are multiplied, added to the value of `x`, and assigned to the variable or property specified by expression `w`. Adding parentheses to the expressions can change the relative order of the multiplication, addition, and assignment, but not the left-to-right order of evaluation.

::: tip 翻译
操作符的优先级和结合性规定了复杂表达式中操作的执行顺序，但它们没有规定子表达式的求值顺序。JavaScript 始终严格按照从左到右的顺序对表达式求值。例如，在表达式`w = x + y * z`中，子表达式`w`首先被求值，再对`x`、`y`和`z`求值。然后将`y`和`z`相乘，加到`x`上，再把结果赋值给表达式`w`表示的变量或属性。在表达式中使用圆括号可以改变乘法、加法和赋值的相对顺序，但不会改变从左到右的求值顺序。
:::

Order of evaluation only makes a difference if any of the expressions being evaluated has side effects that affect the value of another expression. If expression `x` increments a variable that is used by expression `z`, then the fact that `x` is evaluated before `z` is important.

::: tip 翻译
求值顺序只在一种情况下会造成差异，即被求值的表达式具有副效应，这会影响其他表达式的求值。比如，表达式`x`递增一个变量，而表达式`z`会使用这个变量，此时保证`x`先于`z`被求值就很重要了。
:::

## 算术表达式

This section covers the operators that perform arithmetic or other numerical manipulations on their operands. The exponentiation, multiplication, division, and subtraction operators are straightforward and are covered first. The addition operator gets a subsection of its own because it can also perform string concatenation and has some unusual type conversion rules. The unary operators and the bitwise operators are also covered in subsections of their own.

::: tip 翻译
本节介绍对操作数执行算术或其他数值操作的操作符。首先介绍幂、乘、除和减这几个简单直观的操作符。之后会介绍加操作符，因为它也执行字符串转换，且具有不同寻常的类型转换规则。一元操作符和位操作符也会在之后介绍。
:::

Most of these arithmetic operators (except as noted as follows) can be used with BigInt (see §3.2.5) operands or with regular numbers, as long as you don’t mix the two types.

::: tip 翻译
多数算术操作符（除了下面提到的）都可以用于 BigInt（参见 3.2.5 节）操作数或常规数值，前提是不能混用两种类型。
:::

The basic arithmetic operators are `**` (exponentiation), `*` (multiplication), `/` (division), `%` (modulo: remainder after division), `+` (addition), and `-` (subtraction). As noted, we’ll discuss the `+` operator in a section of its own. The other five basic operators simply evaluate their operands, convert the values to numbers if necessary, and then compute the power, product, quotient, remainder, or difference. Non-numeric operands that cannot convert to numbers convert to the `NaN` value. If either operand is (or converts to) `NaN`, the result of the operation is (almost always) `NaN`.

::: tip 翻译
基本的算术操作符是`**`（幂）、`*`（乘）、`/`（除）、`%`（模：除后的余数）、`+`（加）和`-`（减）。如前所述，我们会在单独一节讨论`+`操作符。另外 5 个基本操作符都会对自己的操作数进行求值，必要时将操作数转换为数值，然后计算幂、积、商、余和差。无法转换为数值的非数值操作数则转换为`NaN`。如果有操作数是（或被转换成）`NaN`，则操作结果（几乎始终）是`NaN`。
:::

The `**` operator has higher precedence than `*`, `/`, and `%` (which in turn have higher precedence than `+` and `-`). Unlike the other operators, `**` works right-to-left, so `2**2**3` is the same as `2**8`, not `4**3`. There is a natural ambiguity to expressions like `-3**2`. Depending on the relative precedence of unary minus and exponentiation, that expression could mean `(-3)**2` or `-(3**2)`. Different languages handle this differently, and rather than pick sides, JavaScript simply makes it a syntax error to omit parentheses in this case, forcing you to write an unambiguous expression. `**` is JavaScript’s newest arithmetic operator: it was added to the language with ES2016. The `Math.pow()` function has been available since the earliest versions of JavaScript, however, and it performs exactly the same operation as the `**` operator.

::: tip 翻译
`**`操作符的优先级高于`*`、`/`和`%`（后三个的优先级又高于`+`和`-`）。与其他操作符不同，`**`具有右结合性，即`2**2**3`相当于`2**8`而非`4**3`。另外，类似`-3**2`这样的表达式本质上是有歧义的。取决于一元减号和幂操作的相对优先级，这个表达式可能意味着`(-3)**2`，也可能意味着`-(3**2)`。对于这种情况，不同语言的处理方式也不同。JavaScript 认为这种情况下不写括号就是语法错误，强制你自己消除表达式的歧义。`**`是 JavaScript 中最新的操作符，是 ES2016 中增加的。但`Math.pow()`函数在 JavaScript 很早的版本中就有了，它与`**`操作符执行完全相同的操作。
:::

The `/` operator divides its first operand by its second. If you are used to programming languages that distinguish between integer and floating-point numbers, you might expect to get an integer result when you divide one integer by another. In JavaScript, however, all numbers are floating-point, so all division operations have floating-point results: `5/2` evaluates to `2.5`, not `2`. Division by zero yields positive or negative infinity, while `0/0` evaluates to `NaN`: neither of these cases raises an error.

::: tip 翻译
`/`操作符用第二个操作数除第一个操作数。如果你习惯了区分整数和浮点数的编程语言，应该知道整数相除得到整数。但在 JavaScript 中，所有数值都是浮点数，因此所有除法操作得到的都是浮点数，比如 `5/2` 得到 `2.5` 而不是 `2`。被 `0` 除得到正无穷或负无穷，而 `0/0` 求值为 `NaN`。这两种情况都不是错误。
:::

The `%` operator computes the first operand modulo the second operand. In other words, it returns the remainder after whole-number division of the first operand by the second operand. The sign of the result is the same as the sign of the first operand. For example, `5 % 2` evaluates to `1`, and `-5 % 2` evaluates to `-1`.

::: tip 翻译
`%`操作符计算第一个操作数对第二个操作数取模的结果。换句话说，它返回第一个操作数被第二个操作数整除之后的余数。结果的符号与第一个操作数相同。例如，`5 % 2`求值为`1`，而`-5 % 2`求值为`-1`。
:::

While the modulo operator is typically used with integer operands, it also works for floating-point values. For example, `6.5 % 2.1` evaluates to `0.2`.

::: tip 翻译
虽然模操作数通常用于整数，但也可以用于浮点数。比如，`6.5 % 2.1`求值为`0.2`。
:::

### + 操作符

The binary `+` operator adds numeric operands or concatenates string operands:

::: tip 翻译
二元 `+` 操作符用于计算数值操作数的和或者拼接字符串操作数：
:::

```js
1 + 2; // => 3
"hello" + " " + "there"; // => "hello there"
"1" + "2"; // => "12"
```

When the values of both operands are numbers, or are both strings, then it is obvious what the `+` operator does. In any other case, however, type conversion is necessary, and the operation to be performed depends on the conversion performed. The conversion rules for `+` give priority to string concatenation: if either of the operands is a string or an object that converts to a string, the other operand is converted to a string and concatenation is performed. Addition is performed only if neither operand is string-like.

::: tip 翻译
如果两个操作数都是数值或都是字符串，`+`操作符执行后的结果自不必说。但除这两种情况之外的任何情况，都会涉及类型转换，而实际执行的操作取决于类型转换的结果。`+`操作符优先字符串拼接：只要有操作数是字符串或可以转换为字符串的对象，另一个操作数也会被转换为字符串并执行拼接操作。只有任何操作数都不是字符串或类字符串值时才会执行加法操作。
:::

Technically, the `+` operator behaves like this:

- If either of its operand values is an object, it converts it to a primitive using the object-to-primitive algorithm described in §3.9.3. Date objects are converted by their `toString()` method, and all other objects are converted via `valueOf()`, if that method returns a primitive value. However, most objects do not have a useful `valueOf()` method, so they are converted via `toString()` as well.
- After object-to-primitive conversion, if either operand is a string, the other is converted to a string and concatenation is performed.
- Otherwise, both operands are converted to numbers (or to `NaN`) and addition is performed.

::: tip 翻译
严格来讲，`+`操作符的行为如下所示:

- 如果有一个操作数是对象，则 `+` 操作符使用 3.9.3 节介绍的对象到原始值的算法把该操作数转换为原始值。`Date` 对象用 `toString()`方法来转换，其他所有对象通过 `valueOf()`转换（如果这个方法返回原始值）。不过，多数对象并没有 `valueOf()`方法，因此它们也会通过 `toString()`方法转换。
- 完成对象到原始值的转换后，如果有操作数是字符串，另一个操作数也会被转换为字符串并进行拼接。
- 否则，两个操作数都被转换为数值（或`NaN`），计算加法。
  :::

Here are some examples:

::: tip 翻译
下面是几个例子：
:::

```js
1 + 2; // => 3: 加法
"1" + "2"; // => "12": 拼接
"1" + 2; // => "12": 数值转换为字符串后再拼接
1 + {}; // => "1[object Object]": 对象转换为字符串后再拼接
true + true; // => 2: 布尔值转换为字符串后计算加法
2 + null; // => 2: null转换为0后计算加法
2 + undefined; // => NaN: undefined转换为NaN后计算加法
```

Finally, it is important to note that when the `+` operator is used with strings and numbers, it may not be associative. That is, the result may depend on the order in which operations are performed.

::: tip 翻译
最后，很重要的一点是要注意 `+` 操作符在用于字符串和数值时，可能不遵守结合性。换句话说，结果取决于操作执行的顺序。
:::

For example:

```js
1 + 2 + " blind mice"; // => "3 blind mice"
1 + (2 + " blind mice"); // => "12 blind mice"
```

The first line has no parentheses, and the `+` operator has left-to-right associativity, so the two numbers are added first, and their sum is concatenated with the string. In the second line, parentheses alter this order of operations: the number 2 is concatenated with the string to produce a new string. Then the number 1 is concatenated with the new string to produce the final result.

::: tip 翻译
第一行没有圆括号，`+` 操作符表现出左结合性，即两个数值先相加，然后它们的和再与字符串拼接。第二行中的圆括号改变了操作执行的顺序：数值 2 先与字符串拼接产生一个新字符串，然后数值 1 再与新字符串拼接得到最终结果。
:::

### 一元算术操作符

Unary operators modify the value of a single operand to produce a new value. In JavaScript, the unary operators all have high precedence and are all right-associative. The arithmetic unary operators described in this section (`+`, `-`, `++`, and `--`) all convert their single operand to a number, if necessary. Note that the punctuation characters `+` and `-` are used as both unary and binary operators.

::: tip 翻译
一元操作符修改一个操作数的值以产生一个新值。在 JavaScript 中，一元操作符全部具有高优先级和右结合性。本节介绍的算术一元操作符（`+`、`-`、`++`和`--`）都在必要时将自己唯一的操作数转换为数值。注意，操作符`+`和`-`既是一元操作符，也是二元操作符。
:::

The unary arithmetic operators are the following:

::: tip 翻译
一元算术操作符如下所示：
:::

**Unary plus(+)**

The unary plus operator converts its operand to a number (or to `NaN`) and returns that converted value. When used with an operand that is already a number, it doesn’t do anything. This operator may not be used with BigInt values, since they cannot be converted to regular numbers.

::: tip 翻译
**一元加（+）**

一元加操作符将其操作数转换为数值（或`NaN`）并返回转换后的值。如果操作数是数值，则它什么也不做。由于 BigInt 值不能转换为常规数值，因此这个操作符不应该用于 BigInt。
:::

**Unary minus(-)**

When `-` is used as a unary operator, it converts its operand to a number, if necessary, and then changes the sign of the result.

::: tip 翻译
**一元减（-）**

当`-`用作一元操作符时，它在必要时将操作数转换为数值，然后改变结果的符号。
:::

**Increment(++)**

The `++` operator increments (i.e., adds 1 to) its single operand, which must be an lvalue (a variable, an element of an array, or a property of an object). The operator converts its operand to a number, adds 1 to that number, and assigns the incremented value back into the variable, element, or property.

::: tip 翻译
**递增（++）**

`++`操作符递增其操作数（也就是加 1），这个操作数必须是一个左值（变量、数组元素或对象属性）。这个操作符将其操作数转换为数值，在这个数值上加 1，然后将递增后的数值再赋值回这个变量、元素或属性。
:::

The return value of the `++` operator depends on its position relative to the operand. When used before the operand, where it is known as the pre-increment operator, it increments the operand and evaluates to the incremented value of that operand. When used after the operand, where it is known as the post increment operator, it increments its operand but evaluates to the _unincremented_ value of that operand. Consider the difference between these two lines of code:

::: tip 翻译
`++`操作符的返回值取决于它与操作数的相对位置。如果位于操作数前面，则可以称其为前递增操作符，即先递增操作数，再求值为该操作数递增后的值。如果位于操作数后面，则可以称其为后递增操作符，即它也会递增操作数，但仍然求值为该操作数未递增的值。看看下面两行代码，注意它们的差异：
:::

```js
let i = 1,
  j = ++i; // i 和 j都是2
let n = 1,
  m = n++; // n是2，m是1
```

Note that the expression `x++` is not always the same as `x=x+1`. The `++` operator never performs string concatenation: it always converts its operand to a number and increments it. If `x` is the string “1”, `++x` is the number 2, but `x+1` is the string “11”.

::: tip 翻译
这说明，表达式`x++`不一定等价于`x=x+1`。`++`操作符不会执行字符串拼接，而始终会将其操作数转换为数值。如果`x`是字符串“1”，`++x`就是数值 2，但`x+1`则是字符串“11”。
:::

Also note that, because of JavaScript’s automatic semicolon insertion, you cannot insert a line break between the post-increment operator and the operand that precedes it. If you do so, JavaScript will treat the operand as a complete statement by itself and insert a semicolon before it.

::: tip 翻译
另外也要注意，由于 JavaScript 会自动插入分号，因此不能在后递增操作符和它前面的操作数之间插入换行符。如果插入了换行符，JavaScript 会将操作数当成一条完整的语句，在它后面插入一个分号。
:::

This operator, in both its pre- and post-increment forms, is most commonly used to increment a counter that controls a `for` loop (§5.4.3).

::: tip 翻译
这个操作符（包括其前、后递增形式）主要用于在`for`循环（参见 5.4.3 节）中控制计数器递增。
:::

**Decrement(--)**

The `--` operator expects an lvalue operand. It converts the value of the operand to a number, subtracts 1, and assigns the decremented value back to the operand. Like the `++` operator, the return value of `--` depends on its position relative to the operand. When used before the operand, it decrements and returns the decremented value. When used after the operand, it decrements the operand but returns the _undecremented_ value. When used after its operand, no line break is allowed between the operand and the operator.

::: tip 翻译

**递减（--）**

`--`操作符也期待左值操作数。它会将这个操作数转换为数值，减 1，然后把递减后的值再赋值给操作数。与`++`操作符类似，`--`返回的值取决于它与操作数的相对位置。如果位于操作数前面，它递减并返回递减后的值。如果位于操作数后面，它递减操作数，但返回未递减的值。在位于操作数后面时，操作数与操作符之间不能有换行符。
:::

### 位操作符

The bitwise operators perform low-level manipulation of the bits in the binary representation of numbers. Although they do not perform traditional arithmetic operations, they are categorized as arithmetic operators here because they operate on numeric operands and return a numeric value. Four of these operators perform Boolean algebra on the individual bits of the operands, behaving as if each bit in each operand were a boolean value (1=true, 0=false). The other three bitwise operators are used to shift bits left and right. These operators are not commonly used in JavaScript programming, and if you are not familiar with the binary representation of integers, including the two’s complement representation of negative integers, you can probably skip this section.

::: tip 翻译
位操作符对数值的二进制表示执行低级位操作。尽管它们执行的不是我们熟悉的算术计算，但由于它们操作的是数值操作数且返回数值，所以也可以把它们归类为算术操作符。4 个位操作符对操作数的个别二进制位执行布尔代数计算，即将操作数中的每一位当成布尔值来对待（1 为`true`，0 为`false`）。另外 3 个位操作符用于左右移位。位操作符在 JavaScript 编程中不太常用，如果对整数的二进制表示（包括负整数的二进制补码表示）不熟悉，可以考虑先跳过这一节。
:::

The bitwise operators expect integer operands and behave as if those values were represented as 32-bit integers rather than 64-bit floating-point values. These operators convert their operands to numbers, if necessary, and then coerce the numeric values to 32-bit integers by dropping any fractional part and any bits beyond the 32nd. The shift operators require a right-side operand between 0 and 31. After converting this operand to an unsigned 32-bit integer, they drop any bits beyond the 5th, which yields a number in the appropriate range. Surprisingly, `NaN`, `Infinity`, and `-Infinity` all convert to 0 when used as operands of these bitwise operators.

::: tip 翻译
位操作符期待整数操作数，而且将它们当成 32 位整数而非 64 位浮点值。这些操作符必要时将它们的操作数转换为数值，然后再将得到的数值强制转换为 32 位整数，即丢弃小数部分和第 32 位以外的部分。移位操作符要求右侧操作数介于 0 到 31 之间。在把操作数转换为无符号 32 位整数后，它们会丢弃第 5 位以外的位，得到一个近似相等的数值。令人惊讶的是，`NaN`、`Infinity`和`-Infinity`在作为这些位操作符的操作数时都会转换为 0。
:::

All of these bitwise operators except `>>>` can be used with regular number operands or with BigInt (see §3.2.5) operands.

::: tip 翻译
除了`>>>`之外的所有位操作符都可以用于常规数据或 BigInt（参见 3.2.5 节）操作数。
:::

**Bitwise AND(&)**

The `&` operator performs a Boolean AND operation on each bit of its integer arguments. A bit is set in the result only if the corresponding bit is set in both operands. For example, `0x1234 & 0x00FF` evaluates to `0x0034`.

::: tip 翻译
**按位与（&）**

`&`操作符对其整数参数的每一位执行布尔与操作。只有两个操作数对应的位都为 1，结果中对应的位才为 1。例如，`0x1234 & 0x00FF`求值为`0x0034`。
:::

**Bitwise OR(|)**

The `|` operator performs a Boolean OR operation on each bit of its integer arguments. A bit is set in the result if the corresponding bit is set in one or both of the operands. For example, `0x1234 | 0x00FF` evaluates to `0x12FF`.

::: tip 翻译
**按位或（|）**

`|`操作符对其整数参数的每一位执行布尔或操作。两个操作数中对应的位都为 1 或有一个为 1，结果中对应的位就为 1。例如，`0x1234 | 0x00FF`求值为`0x12FF`。
:::

**Bitwise XOR(^)**

The `^` operator performs a Boolean exclusive OR operation on each bit of its integer arguments. Exclusive OR means that either operand one is true or operand two is true, but not both. A bit is set in this operation’s result if a corresponding bit is set in one (but not both) of the two operands. For example, `0xFF00 ^ 0xF0F0` evaluates to `0x0FF0`.

::: tip 翻译
**按位异或（^）**

`^`操作符对其整数参数的每一位执行布尔异或操作。异或的意思就是要么操作数一为`true`，要么操作数二为`true`，二者不能同时为`true`。两个操作数中对应的位只有一个为 1，结果中对应的位就为 1。例如，`0xFF00 ^ 0xF0F0`求值为`0x0FF0`。
:::

**Bitwise NOT(~)**

The `~` operator is a unary operator that appears before its single integer operand. It operates by reversing all bits in the operand. Because of the way signed integers are represented in JavaScript, applying the `~` operator to a value is equivalent to changing its sign and subtracting 1. For example, `~0x0F` evaluates to `0xFFFFFFF0`, or −16.

::: tip 翻译
**按位取反（~）**

`~`操作符是一元操作符，要出现在其操作数前面。按位非的结果是反转操作数中的所有位。因为 JavaScript 表示有符号整数的方式，对一个值应用`~`操作符等于修改其符号并减 1。例如，`~0x0F`求值为`0xFFFFFFF0`，即-16。
:::

**Shift left(<<)**

The `<<` operator moves all bits in its first operand to the left by the number of places specified in the second operand, which should be an integer between 0 and 31. For example, in the operation `a << 1`, the first bit (the ones bit) of a becomes the second bit (the twos bit), the second bit of a becomes the third, etc. A zero is used for the new first bit, and the value of the 32nd bit is lost. Shifting a value left by one position is equivalent to multiplying by 2, shifting two positions is equivalent to multiplying by 4, and so on. For example, `7 << 2` evaluates to 28.

::: tip 翻译
**左移（<<）**

`<<`操作符将第一个操作数的所有位向左移动第二个操作数指定的位数，第二个操作数应该是介于 0 到 31 之间的整数。例如，在`a<<1`操作中，`a`的第 1 位变成第 2 位，`a`的第 2 位变成第 3 位，以此类推。新的第 1 位会填充 0，第 32 位的值丢弃。将一个值左移 1 位等于这个值乘以 2，左移 2 位等于乘以 4，以此类推。例如，`7<<2`求值为 28。
:::

**Shift right with sign(>>)**

The `>>` operator moves all bits in its first operand to the right by the number of places specified in the second operand (an integer between 0 and 31). Bits that are shifted off the right are lost. The bits filled in on the left depend on the sign bit of the original operand, in order to preserve the sign of the result. If the first operand is positive, the result has zeros placed in the high bits; if the first operand is negative, the result has ones placed in the high bits. Shifting a positive value right one place is equivalent to dividing by 2 (discarding the remainder), shifting right two places is equivalent to integer division by 4, and so on. `7 >> 1` evaluates to 3, for example, but note that and `−7 >> 1` evaluates to −4.

::: tip 翻译
**有符号位移（>>）**

`>>`操作符将第一个操作数的所有位向右移动第二个操作数指定的位数（介于 0 到 31 之间）。移出右边的位会被丢弃。填充到左边的位取决于原始操作数的符号，以便结果保持相同的符号。如果第一个操作数是正值，则结果的高位填充 0；如果第一个操作数是负值，则结果的高位填充 1。将一个正值右移 1 位等于这个值除以 2（丢弃余数），右移 2 位等于除以 4，以此类推。例如，`7>>1`求值为 3，`-7 >> 1`求值为-4。
:::

**Shift right with zero fill(>>>)**

The `>>>` operator is just like the `>>` operator, except that the bits shifted in on the left are always zero, regardless of the sign of the first operand. This is useful when you want to treat signed 32-bit values as if they are unsigned integers. `−1 >> 4` evaluates to `−1`, but `−1 >>> 4` evaluates to `0x0FFFFFFF`, for example. This is the only one of the JavaScript bitwise operators that cannot be used with BigInt values. BigInt does not represent negative numbers by setting the high bit the way that 32-bit integers do, and this operator only makes sense for that particular two’s complement representation.

::: tip 翻译
**零填充右移（>>>）**

`>>>`操作符与`>>`操作符类似，只不过无论第一个操作数的符号是什么，左侧移动的位始终填充 0。如果想把有符号 32 位值看成无符号整数，那可以使用这个操作符。例如，`-1 >> 4`求值为-1，而`-1 >>>4`求值为`0x0FFFFFFF`。这是 JavaScript 中唯一一个不能用于 BigInt 的位操作符。BigInt 不像 32 位整数那样通过设置高位的方式表示负值，这个操作符只对特定的补码表示有意义。
:::

## 关系表达式

This section describes JavaScript’s relational operators. These operators test for a relationship (such as “equals,” “less than,” or “property of ”) between two values and return `true` or `false` depending on whether that relationship exists. Relational expressions always evaluate to a boolean value, and that value is often used to control the flow of program execution in `if`, `while`, and `for` statements (see [Chapter 5](./Chapter-05-Statements.md)). The subsections that follow document the equality and inequality operators, the comparison operators, and JavaScript’s other two relational operators, in and `instanceof`.

::: tip 翻译
本节介绍 JavaScript 的关系操作符。这些操作符测试两个值之间的关系（如“等于”“小于”或“是……的属性”），并依据相应关系是否存在返回`true`或`false`。关系表达式始终求值为布尔值，而该值经常用于控制程序的执行流，如在`if`、`while`和`for`语句（参见[第 5 章](./Chapter-05-Statements.md)）中使用。接下来几小节将介绍相等和不相等操作符、比较操作符和 JavaScript 的另外两个关系操作符`in`和`instanceof`。
:::

### 相等与不相等操作符

The `==` and `===` operators check whether two values are the same, using two different definitions of sameness. Both operators accept operands of any type, and both return `true` if their operands are the same and `false` if they are different. The `===` operator is known as the strict equality operator (or sometimes the identity operator), and it checks whether its two operands are “identical” using a strict definition of sameness. The `==` operator is known as the equality operator; it checks whether its two operands are “equal” using a more relaxed definition of sameness that allows type conversions.

::: tip 翻译
`==`和`===`操作符分别用两个相同的标准检查两个值是否相同。这两个操作符都接受任意类型的操作数，都在自己的操作数相同时返回`true`，不同时返回`false`。`===`操作符被称为严格相等操作符（或者全等操作符），它根据严格相同的定义检查两个操作数是否“完全相同”。`==`操作符被称为相等操作符，它根据更宽松的（允许类型转换的）相同定义检查两个操作数是否“相等”。
:::

The `!=` and `!==` operators test for the exact opposite of the `==` and `===` operators. The `!=` inequality operator returns `false` if two values are equal to each other according to `==` and returns `true` otherwise. The `!==` operator returns `false` if two values are strictly equal to each other and returns `true` otherwise. As you’ll see in §4.10, the `!` operator computes the Boolean NOT operation. This makes it easy to remember that `!=` and `!==` stand for “not equal to” and “not strictly equal to.”

::: tip 翻译
`!=`和`!==`操作符测试的关系与`==`和`===`恰好相反。`!=`不相等操作符在两个值用`==`测试相等时返回`false`，否则返回`true`。`!==`操作符在两个值严格相等时返回`false`，否则返回`true`。正如 4.10 节将介绍的，!操作符计算布尔非操作的值。因此很容易记住`!=`和`!==`分别表示“不相等”和“不严格相等”。
:::

> **The =, ==, and === operators**
>
> JavaScript supports `=`, `==`, and `===` operators. Be sure you understand the differences between these assignment, equality, and strict equality operators, and be careful to use the correct one when coding! Although it is tempting to read all three operators as “equals,” it may help to reduce confusion if you read “gets” or “is assigned” for `=`, “is equal to” for `==`, and “is strictly equal to” for `===`.
>
> The `==` operator is a legacy feature of JavaScript and is widely considered to be a source of bugs. You should almost always use `===` instead of `==`, and `!==` instead of `!=`.

> **=、==和===操作符**
>
> JavaScript 支持`=`、`==`和`===`操作符，它们分别用于赋值、测试相等和严格相等。在实际编码中，一定要确保正确使用它们。表面上看它们都是“等于号”，为了好区分，可以把`=`理解为“取得”或“赋值给”，把`==`理解成“等于”，把`===`理解成“严格等于”。
>
> `==`操作符是 JavaScript 早期的特性，被普遍认为是个隐患。因此实践中应该坚持使用`===`而不使用`==`，使用`!==`而不使用`!=`。

As mentioned in §3.8, JavaScript objects are compared by reference, not by value. An object is equal to itself, but not to any other object. If two distinct objects have the same number of properties, with the same names and values, they are still not equal. Similarly, two arrays that have the same elements in the same order are not equal to each other.

::: tip 翻译
正如 3.8 节所说，JavaScript 对象是按引用而不是按值比较的。对象与自己相等，但与其他任何对象都不相等。即使两个对象有同样多的属性，每个属性的名字和值也相同，那它们也不相等。类似地，两个数组即使元素相同、顺序相同，它们也不相等。
:::

#### 严格相等

The strict equality operator `===` evaluates its operands, then compares the two values as follows, performing no type conversion:

- If the two values have different types, they are not equal.
- If both values are `null` or both values are `undefined`, they are equal.
- If both values are the boolean value `true` or both are the boolean value `false`, they are equal.
- If one or both values is `NaN`, they are not equal. (This is surprising, but the `NaN` value is never equal to any other value, including itself! To check whether a value `x` is `NaN`, use `x !== x`, or the global `isNaN()` function.)
- If both values are numbers and have the same value, they are equal. If one value is `0` and the other is `-0`, they are also equal.
- If both values are strings and contain exactly the same 16-bit values (see the sidebar in §3.3) in the same positions, they are equal. If the strings differ in length or content, they are not equal. Two strings may have the same meaning and the same visual appearance, but still be encoded using different sequences of 16-bit values. JavaScript performs no Unicode normalization, and a pair of strings like this is not considered equal to the `===` or `==` operators.
- If both values refer to the same object, array, or function, they are equal. If they refer to different objects, they are not equal, even if both objects have identical properties.

::: tip 翻译
严格相等操作符`===`求值其操作数，然后按下列步骤比较两个值，不做类型转换：

- 如果两个值类型不同，则不相等。
- 如果两个值都是`null`或都是`undefined`，则相等。
- 如果两个值都是布尔值`true`或都是布尔值`false`，则相等。
- 如果一个或两个值是`NaN`，则不相等（虽然有点意外，但`NaN`确实不等于任何其他值，也包括`NaN`自身！要检查某个值`x`是不是`NaN`，使用`x !== x`或全局`isNaN()`函数）。
- 如果两个值都是数值且值相同，则相等。如果一个值是`0`而另一个是`-0`，则也相等。
- 如果两个值都是字符串且相同位置包含完全相同的 16 位值（参见 3.3 节），则相等。如果两个字符串长度或内容不同，则不相等。两个字符串有可能看起来相同，也表示同样的意思，但底层编码却使用不同的 16 位值序列。JavaScript 不会执行 Unicode 归一化操作，像这样的两个字符串用`===`或`==`操作符都不会判定相等。
- 如果两个值引用同一个对象、数组或函数，则相等。如果它们引用不同的对象，即使两个对象有完全相同的属性，也不相等。
  :::

#### 基于类型转换的相等

The equality operator `==` is like the strict equality operator, but it is less strict. If the values of the two operands are not the same type, it attempts some type conversions and tries the comparison again:

- If the two values have the same type, test them for strict equality as described previously. If they are strictly equal, they are equal. If they are not strictly equal, they are not equal.
- If the two values do not have the same type, the `==` operator may still consider them equal. It uses the following rules and type conversions to check for equality:
  - If one value is `null` and the other is `undefined`, they are equal.
  - If one value is a number and the other is a string, convert the string to a number and try the comparison again, using the converted value.
  - If either value is `true`, convert it to 1 and try the comparison again. If either value is `false`, convert it to 0 and try the comparison again.
  - If one value is an object and the other is a number or string, convert the object to a primitive using the algorithm described in §3.9.3 and try the comparison again. An object is converted to a primitive value by either its `toString()` method or its `valueOf()` method. The built-in classes of core JavaScript attempt `valueOf()` conversion before `toString()` conversion, except for the Date class, which performs `toString()` conversion.
  - Any other combinations of values are not equal.

::: tip 翻译
相等操作符`==`与严格相等类似，但没那么严格。如果两个操作数的值类型不同，它会尝试做类型转换，然后再比较。

- 如果两个值类型相同，则按照前面的规则测试它们是否严格相等。如果严格相等，则相等。如果不严格相等，则不相等。
- 如果两个值类型不同，`==`操作符仍然可能认为它们相等。此时它会使用以下规则，基于类型转换来判定相等关系：
  - 如果一个值是`null`，另一个值是`undefined`，则相等。
  - 如果一个值是数值，另一个值是字符串，把字符串转换为数值，再比较转换后的数值。
  - 如果有一个值为`true`，把它转换为 1，再比较。如果有一个值为`false`，把它转换为 0，再比较。
  - 如果一个值是对象，另一个值是数值或字符串，先使用 3.9.3 节描述的算法把对象转换为原始值，再比较。对象转换为原始值时要么使用其`toString()`方法，要么使用其`valueOf()`方法。JavaScript 内置的核心类先尝试使用`valueOf()`，再尝试`toString()`。但 Date 类是个例外，这个类执行`toString()`转换。
  - 其他任何值的组合都不相等。
    :::

As an example of testing for equality, consider the comparison:

::: tip 翻译
下面来看一个比较相等的例子：
:::

```js
"1" == true; // => true
```

This expression evaluates to `true`, indicating that these very different-looking values are in fact equal. The boolean value true is first converted to the number 1, and the comparison is done again. Next, the string "1" is converted to the number 1. Since both values are now the same, the comparison returns `true`.

::: tip 翻译
这个表达式求值为`true`，意味着这两个看起来完全不一样的值实际上相等。布尔值`true`首先被转换为数值 1 然后再比较。而字符串"1"也被转换为数值 1。此时两个值相等，因此比较返回`true`。
:::

### 比较操作符

The comparison operators test the relative order (numerical or alphabetical) of their two operands:

::: tip 翻译
比较操作符测试操作数的相对顺序（数值或字母表顺序）:
:::

**Less than(<)**

The `<` operator evaluates to `true` if its first operand is less than its second operand; otherwise, it evaluates to `false`.

::: tip 翻译
**小于（<）**

`<`操作符在第一个操作数小于第二个操作数时求值为`true`，否则求值为`false`。
:::

**Greater than(>)**

The `>` operator evaluates to `true` if its first operand is greater than its second operand; otherwise, it evaluates to `false`.

::: tip 翻译
**大于（>）**

`>`操作符在第一个操作数大于第二个操作数时求值为`true`，否则求值为`false`。
:::

**Less than or equal(<=)**

The `<=` operator evaluates to `true` if its first operand is less than or equal to its second operand; otherwise, it evaluates to `false`.

::: tip 翻译
**小于等于（<=）**

`<=`操作符在第一个操作数小于或等于第二个操作数时求值为`true`，否则求值为`false`。
:::

**Greater than or equal(>=)**

The `>=` operator evaluates to `true` if its first operand is greater than or equal to its second operand; otherwise, it evaluates to `false`.

::: tip 翻译
**大于等于（>=）**

`>=`操作符在第一个操作数大于或等于第二个操作数时求值为`true`，否则求值为`false`。
:::

The operands of these comparison operators may be of any type. Comparison can be performed only on numbers and strings, however, so operands that are not numbers or strings are converted.

::: tip 翻译
这几个比较操作符的操作数可能是任何类型。但比较只能针对数值和字符串，因此不是数值或字符串的操作数会被转换类型。
:::

Comparison and conversion occur as follows:

- If either operand evaluates to an object, that object is converted to a primitive value, as described at the end of §3.9.3; if its `valueOf()` method returns a primitive value, that value is used. Otherwise, the return value of its `toString()` method is used.
- If, after any required object-to-primitive conversion, both operands are strings, the two strings are compared, using alphabetical order, where “alphabetical order” is defined by the numerical order of the 16-bit Unicode values that make up the strings.
- If, after object-to-primitive conversion, at least one operand is not a string, both operands are converted to numbers and compared numerically. `0` and `-0` are considered equal. `Infinity` is larger than any number other than itself, and `-Infinity` is smaller than any number other than itself. If either operand is (or converts to) `NaN`, then the comparison operator always returns `false`. Although the arithmetic operators do not allow BigInt values to be mixed with regular numbers, the comparison operators do allow comparisons between numbers and BigInts.

::: tip 翻译
比较和转换规则如下：

- 如果有操作数求值为对象，该对象会按照 3.9.3 节的描述被转换为原始值。即如果它的 `valueOf()`方法返回原始值，就使用这个值，否则就使用它的 `toString()`方法返回的值。
- 如果在完成对象到原始值的转换后两个操作数都是字符串，则使用字母表顺序比较这两个字符串，其中“字母表顺序”就是组成字符串的 16 位 Unicode 值的数值顺序。
- 如果在完成对象到原始值的转换后至少有一个操作数不是字符串，则两个操作数都会被转换为数值并按照数值顺序来比较。`0`和`-0`被认为相等。`Infinity`比它本身之外的任何数都大，`-Infinity`比它本身之外的任何数都小。如果有一个操作数是（或转换后是）`NaN`，则这些比较操作符都返回`false`。虽然算术操作符不允许 BigInt 值与常规数值混用，但比较操作符允许数值与 BigInt 进行比较。
  :::

Remember that JavaScript strings are sequences of 16-bit integer values, and that string comparison is just a numerical comparison of the values in the two strings. The numerical encoding order defined by Unicode may not match the traditional collation order used in any particular language or locale. Note in particular that string comparison is case-sensitive, and all capital ASCII letters are “less than” all lowercase ASCII letters. This rule can cause confusing results if you do not expect it. For example, according to the `<` operator, the string “Zoo” comes before the string “aardvark”.

::: tip 翻译
记住，JavaScript 字符串是 16 位整数值的序列，而字符串比较就是比较两个字符串的数值序列。Unicode 定义的这个数值编码顺序不一定与特定语言或地区使用的传统校正顺序（collation order）匹配。特别要注意字符串比较是区分大小写的，而所有大写 ASCII 字母比所有小写 ASCII 字母都小。如果不留意，这条规则很可能导致令人不解的结果。例如，根据`<`操作符，字符串“Zoo”会排在字符串“aardvark”前面。
:::

For a more robust string-comparison algorithm, try the `String.localeCompare()` method, which also takes locale-specific definitions of alphabetical order into account. For case-insensitive comparisons, you can convert the strings to all lowercase or all uppercase using `String.toLowerCase()` or `String.toUpperCase()`. And, for a more general and better localized string comparison tool, use the Intl.Collator class described in §11.7.3.

::: tip 翻译
如果需要更可靠的字符串比较算法，可以用`String.localeCompare()`方法，这个方法也会考虑特定地区的字母表顺序。要执行不区分大小写的比较，可以使用`String.toLowerCase()`或`String.toUpperCase()`把字符串转换为全小写或全大写。如果需要更通用和更好的本地化字符串比较工具，可以使用 11.7.3 节介绍的 Intl.Collator 类。
:::

Both the `+` operator and the comparison operators behave differently for numeric and string operands. `+` favors strings: it performs concatenation if either operand is a string. The comparison operators favor numbers and only perform string comparison if both operands are strings:

::: tip 翻译
`+`操作符和比较操作符同样都会对数值和字符串操作数区别对待。`+`偏向字符串，即只要有一个操作数是字符串，它就会执行拼接操作。而比较操作符偏向数值，只有两个操作数均为字符串时才按字符串处理：
:::

```js
1 + 2; // => 3: 相加.
"1" + "2"; // => "12": 拼接.
"1" + 2; // => "12": 2 会转换为 "2".
11 < 3; // => false: 数值比较
"11" < "3"; // => true: 字符串比较
"11" < 3; // => false: 数值比较, "11" 会转换为 11.
"one" < 3; // => false: 数值比较, "one" 转换为 NaN.
```

Finally, note that the `<=` (less than or equal) and `>=` (greater than or equal) operators do not rely on the equality or strict equality operators for determining whether two values are “equal.” Instead, the less-than-or-equal operator is simply defined as “not greater than,” and the greater-than-or-equal operator is defined as “not less than.” The one exception occurs when either operand is (or converts to) `NaN`, in which case, all four comparison operators return `false`.

::: tip 翻译
最后，注意`<=`（小于或等于）和`>=`（大于或等于）操作符不依赖相等或严格相等操作符确定两个值是否“相等”。其中，小于或等于操作符只是简单地定义为“不大于”，而大于或等于操作符则定义为“不小于”。还有一个例外情形，即只要有一个操作数是（或可以转换为）`NaN`，则全部 4 个比较操作符都返回`false`。
:::

### in 操作符

The `in` operator expects a left-side operand that is a string, symbol, or value that can be converted to a string. It expects a right-side operand that is an object. It evaluates to true if the left-side value is the name of a property of the right-side object. For example:

::: tip 翻译
`in`操作符期待左侧操作数是字符串、符号或可以转换为字符串的值，期待右侧操作数是对象。如果左侧的值是右侧的对象的属性名，则`in`返回`true`。例如：
:::

```js
let point = { x: 1, y: 1 }; // 定义对象
"x" in point; // => true: 对象中有名为 "x" 的属性
"z" in point; // => false: 对象没有名为 "z" 的属性.
"toString" in point; // => true: 对象继承了toString方法

let data = [7, 8, 9]; // 数组，有元素（索引） 0, 1, 和 2
"0" in data; // => true: 数组有元素 "0"
1 in data; // => true: 数组会转换为字符串
3 in data; // => false: 没有元素 3
```

### instanceof 操作符

The `instanceof` operator expects a left-side operand that is an object and a right-side operand that identifies a class of objects. The operator evaluates to `true` if the left-side object is an instance of the right-side class and evaluates to `false` otherwise. [Chapter 9](./Chapter-09-Classes.md) explains that, in JavaScript, classes of objects are defined by the constructor function that initializes them. Thus, the right-side operand of instanceof should be a function. Here are examples:

::: tip 翻译
`instanceof`操作符期待左侧操作数是对象，右侧操作数是对象类的标识。这个操作符在左侧对象是右侧类的实例时求值为`true`，否则求值为`false`。[第 9 章](./Chapter-09-Classes.md)解释了，在 JavaScript 中，对象类是通过初始化它们的构造函数定义的。因而，`instanceof`的右侧操作数应该是一个函数。下面看几个例子：
:::

```js
let d = new Date(); // 通过 Date() 构造函数创建一个新对象
d instanceof Date; // => true: d 是通过 Date() 创建的
d instanceof Object; // => true: 虽有对象都是 Object 的实例
d instanceof Number; // => false: d 不是 Number 对象
let a = [1, 2, 3]; // 通过数组字面量语法创建一个数组
a instanceof Array; // => true: a 是一个数组
a instanceof Object; // => true: 所有数组都是对象
a instanceof RegExp; // => false: 数组不是正则表达式
```

Note that all objects are instances of `Object`. `instanceof` considers the “superclasses” when deciding whether an object is an instance of a class. If the left-side operand of `instanceof` is not an object, `instanceof` returns `false`. If the right-hand side is not a class of objects, it throws a `TypeError`.

::: tip 翻译
注意，所有对象都是`Object`的实例。`instanceof`在确定对象是不是某个类的实例时会考虑“超类”。如果`instanceof`的左侧操作数不是对象，它会返回`false`。如果右侧操作数不是对象的类，它会抛出`TypeError`。
:::

In order to understand how the `instanceof` operator works, you must understand the “prototype chain.” This is JavaScript’s inheritance mechanism, and it is described in §6.3.2. To evaluate the expression `o instanceof f`, JavaScript evaluates `f.prototype`, and then looks for that value in the prototype chain of `o`. If it finds it, then `o` is an instance of `f` (or of a subclass of `f`) and the operator returns `true`. If `f.prototype` is not one of the values in the prototype chain of `o`, then `o` is not an instance of `f` and `instanceof` returns `false`.

::: tip 翻译
要理解`instanceof`的工作原理，必须理解“原型链”。原型链是 JavaScript 的继承机制，6.3.2 节有详细介绍。为了对表达式`o instanceof f`求值，JavaScript 会求值`f.prototype`，然后在`o`的原型链上查找这个值。如果找到了，则`o`是`f`（或`f`的子类）的实例，`instanceof`返回`true`。如果`f.prototype`不是`o`原型链上的一个值，则`o`不是`f`的实例，`instanceof`返回`false`。
:::

## 逻辑表达式

The logical operators `&&`, `||`, and `!` perform Boolean algebra and are often used in conjunction with the relational operators to combine two relational expressions into one more complex expression. These operators are described in the subsections that follow. In order to fully understand them, you may want to review the concept of “truthy” and “falsy” values introduced in §3.4.

::: tip 翻译
逻辑操作符`&&`、`||`和`!`执行布尔代数操作，经常与关系操作符一起使用，把两个关系表达式组合为更复杂的表达式。接下来几小节介绍这些操作符。为彻底理解它们，建议大家回顾一下 3.4 节介绍的“真性值”和“假性值”的概念。
:::

### 逻辑与 (&&)

The `&&` operator can be understood at three different levels. At the simplest level, when used with boolean operands, `&&` performs the Boolean AND operation on the two values: it returns `true` if and only if both its first operand and its second operand are `true`. If one or both of these operands is `false`, it returns `false`.

::: tip 翻译
`&&`操作符可以从不同层次来理解。最简单的情况下，在与布尔操作数共同使用时，`&&`对两个值执行布尔与操作：当且仅当第一个操作数为`true`并且第二个操作数也为`true`时，才返回`true`。如果有一个操作数是`false`，或者两个操作数都是`false`，它返回`false`。
:::

`&&` is often used as a conjunction to join two relational expressions:

::: tip 翻译
`&&`经常用于连接两个关系表达式：
:::

```js
x === 0 && y === 0; // 当且仅当x和y都是0时，整个表达式才为true
```

Relational expressions always evaluate to `true` or `false`, so when used like this, the `&&` operator itself returns `true` or `false`. Relational operators have higher precedence than `&&` (and `||`), so expressions like these can safely be written without parentheses.

::: tip 翻译
关系表达式始终返回`true`或`false`，因此在像这样使用时，`&&`操作符本身也返回`true`或`false`。关系操作符的优先级高于`&&`（以及`||`），因此类似这样的表达式可以不带圆括号。
:::

But `&&` does not require that its operands be boolean values. Recall that all JavaScript values are either “truthy” or “falsy.” (See §3.4 for details. The falsy values are `false`, `null`, `undefined`, `0`, `-0`, `NaN`, and `""`. All other values, including all objects, are truthy.) The second level at which `&&` can be understood is as a Boolean AND operator for truthy and falsy values. If both operands are truthy, the operator returns a truthy value. Otherwise, one or both operands must be falsy, and the operator returns a falsy value. In JavaScript, any expression or statement that expects a boolean value will work with a truthy or falsy value, so the fact that `&&` does not always return `true` or `false` does not cause practical problems.

::: tip 翻译
但`&&`不要求其操作数是布尔值。我们知道，所有 JavaScript 值要么是“真值”，要么是“假值”（详见 3.4 节。假值包括`false`、`null`、`undefined`、`0`、`-0`、`NaN`和`""`。所有其他值，包括所有对象都是真值）。理解`&&`的第二个层次是它对真值和假值执行布尔与操作。如果两个操作数都是真值，`&&`返回一个真值；否则（一个或两个操作数是假值），`&&`返回假值。在 JavaScript 中，期待布尔值的任何表达式或语句都可以处理真值或假值，因此`&&`并不总返回`true`或`false`的事实在实践中并不会导致出现问题。
:::

Notice that this description says that the operator returns “a truthy value” or “a falsy value” but does not specify what that value is. For that, we need to describe `&&` at the third and final level. This operator starts by evaluating its first operand, the expression on its left. If the value on the left is falsy, the value of the entire expression must also be falsy, so `&&` simply returns the value on the left and does not even evaluate the expression on the right.

::: tip 翻译
注意，上面谈到`&&`返回“一个真值”或“一个假值”时并没有说明这个值是什么。对此，需要从第三个层次上来理解`&&`。这个操作符首先对第一个操作数即它左边的表达式求值，如果左边的值是假值，则整个表达式的值也一定是假值，因此`&&`返回它左侧的值，不再求值它右侧的表达式。
:::

On the other hand, if the value on the left is truthy, then the overall value of the expression depends on the value on the right-hand side. If the value on the right is truthy, then the overall value must be truthy, and if the value on the right is falsy, then the overall value must be falsy. So when the value on the left is truthy, the `&&` operator evaluates and returns the value on the right:

::: tip 翻译
另一方面，如果`&&`左侧的值是真值，则整个表达式的值取决于右侧的值。如果右侧的值是真值，则整个表达式的值一定是真值；如果右侧的值是假值，则整个表达式的值一定是假值。因此，在左侧的值为真值时，`&&`操作符求值并返回它右侧的值：
:::

```js
let o = { x: 1 };
let p = null;
o && o.x; // => 1: o 是真值，此时返回 o.x 的值
p && p.x; // => null: p 是价值，因此返回它，不对p.x求值
```

It is important to understand that `&&` may or may not evaluate its right-side operand. In this code example, the variable `p` is set to `null`, and the expression `p.x` would, if evaluated, cause a TypeError. But the code uses `&&` in an idiomatic way so that `p.x` is evaluated only if `p` is truthy—not `null` or `undefined`.

::: tip 翻译
这里关键是要理解，`&&`可能会（也可能不会）对其右侧操作数求值。在这个代码示例中，变量`p`的值为`null`，表达式`p.x`如果被求值会导致 TypeError。但代码中以惯用方式利用`&&`只在`p`为真值（不是`null`或`undefined`）时才对`p.x`求值。
:::

The behavior of `&&` is sometimes called short circuiting, and you may sometimes see code that purposely exploits this behavior to conditionally execute code. For example, the following two lines of JavaScript code have equivalent effects:

::: tip 翻译
`&&`的这种行为有时候也被称为短路，可能你也会看到有代码利用这种行为条件式地执行代码。例如，以下两行 JavaScript 代码效果相同：
:::

```js
if (a === b) stop(); // 只有 a === b时 才调用 stop()
a === b && stop(); // 效果和上面一样
```

In general, you must be careful whenever you write an expression with side effects (assignments, increments, decrements, or function invocations) on the right-hand side of `&&`. Whether those side effects occur depends on the value of the left-hand side.

::: tip 翻译
一般来说，必须注意`&&`右侧包含副效应（赋值、递增、递减或函数调用）的表达式。无论其副效应是否依赖左侧的值。
:::

Despite the somewhat complex way that this operator actually works, it is most commonly used as a simple Boolean algebra operator that works on truthy and falsy values.

::: tip 翻译
尽管这个操作符的工作方式比较复杂，但它最常见的用法还是对真值和假值执行布尔代数计算。
:::

### 逻辑或 (||)

The `||` operator performs the Boolean OR operation on its two operands. If one or both operands is truthy, it returns a truthy value. If both operands are falsy, it returns a falsy value.

::: tip 翻译
`||`操作符对它的操作数执行布尔或操作。如果有一个操作数是真值，这个操作符就返回真值。如果两个操作数都是假值，它就返回假值。
:::

Although the `||` operator is most often used simply as a Boolean OR operator, it, like the && operator, has more complex behavior. It starts by evaluating its first operand, the expression on its left. If the value of this first operand is truthy, it short-circuits and returns that truthy value without ever evaluating the expression on the right. If, on the other hand, the value of the first operand is falsy, then `||` evaluates its second operand and returns the value of that expression.

::: tip 翻译
尽管`||`操作符最常用作简单的布尔或操作符，但它与&&类似，也有更复杂的行为。它首先会对第一个操作数，即它左侧的表达式求值。如果第一个操作数的值是真值，`||`就会短路，直接返回该真值，不再对右侧表达式求值。而如果第一个操作数的值是假值，则`||`会求值其第二个操作数并返回该表达式的值。
:::

As with the `&&` operator, you should avoid right-side operands that include side effects, unless you purposely want to use the fact that the right-side expression may not be evaluated.

::: tip 翻译
与`&&`操作符一样，应该避免让右侧操作数包含副效应，除非是有意利用右侧表达式可能不会被求值的事实。
:::

An idiomatic usage of this operator is to select the first truthy value in a set of alternatives:

::: tip 翻译
这个操作符的习惯用法是在一系列备选项中选择第一个真值：
:::

```js
// 如果maxWidth时真值，就使用它；否则，看看preferences对象。
// 如果preferences里也没有真值，就使用硬编码的常量
let max = maxWidth || preferences.maxWidth || 500;
```

Note that if 0 is a legal value for `maxWidth`, then this code will not work correctly, since 0 is a falsy value. See the `??` operator (§4.13.2) for an alternative.

::: tip 翻译
注意，如果 0 是`maxWidth`的有效值，则以上代码可能有问题，因为 0 是个假值。此时可以使用`??`操作符（参见 4.13.2 节）。
:::

Prior to ES6, this idiom is often used in functions to supply default values for parameters:

::: tip 翻译
在 ES6 之前，这个惯用法经常用于在函数中给参数提供默认值：
:::

```js
// 复制o的属性给p,返回p
function copy(o, p) {
  p = p || {}; // 如果没有传入对象p,使用新创建的对象
  // 这里是函数体
}
```

In ES6 and later, however, this trick is no longer needed because the default parameter value could simply be written in the function definition itself: `function copy(o, p={}) { ... }`.

::: tip 翻译
不过在 ES6 及之后的版本中，这个技巧已经没有必要了，因为默认参数可以直接写在函数定义中：`function copy(o, p={}) { ... }`。
:::

### 逻辑非 (!)

The `!` operator is a unary operator; it is placed before a single operand. Its purpose is to invert the boolean value of its operand. For example, if `x` is truthy, `!x` evaluates to `false`. If `x` is falsy, then `!x` is `true`.

::: tip 翻译
`!`操作符是个一元操作符，出现在操作数前面。这个操作符的目的是反转其操作数的布尔值。例如，如果`x`是真值，`!x`会求值为`false`。如果`x`是假值，`!x`求值为`true`。
:::

Unlike the `&&` and `||` operators, the `!` operator converts its operand to a boolean value (using the rules described in [Chapter 3](./Chapter-03-Types_Values_Variables.md)) before inverting the converted value. This means that `!` always returns `true` or `false` and that you can convert any value `x` to its equivalent boolean value by applying this operator twice: `!!x` (see §3.9.2).

::: tip 翻译
与`&&`和`||`不同，`!`操作符将其操作数转换为布尔值（使用[第 3 章](./Chapter-03-Types_Values_Variables.md)介绍的规则），然后再反转得到的布尔值。这意味着`!`始终返回`true`或`false`，而要取得任何值`x`对应的布尔值，只要对`x`应用这个操作符两次即可：`!!x`（参见 3.9.2 节）。
:::

As a unary operator, `!` has high precedence and binds tightly. If you want to invert the value of an expression like `p && q`, you need to use parentheses: `!(p && q)`. It is worth noting two laws of Boolean algebra here that we can express using JavaScript syntax:

::: tip 翻译
作为一元操作符，`!`优先级较高。如果想反转表达式`p && q`的值，需要使用圆括号：`!( p && q)`。有必要说一下，可以通过如下 JavaScript 语法来表达布尔代数的两个法则：
:::

```js
// 德摩根定律
!(p && q) === (!p || !q); // => true: p和q可以是任何值
!(p || q) === (!p && !q); // => true: p和q可以是任何值
```

## 赋值表达式

JavaScript uses the `=` operator to assign a value to a variable or property. For example:

::: tip 翻译
JavaScript 使用 `=` 操作符为变量或属性赋值。例如：
:::

```js
i = 0; // 设置变量i为0
o.x = 1; // 设置对象o的属性x为1
```

The `=` operator expects its left-side operand to be an lvalue: a variable or object property (or array element). It expects its right-side operand to be an arbitrary value of any type. The value of an assignment expression is the value of the right-side operand. As a side effect, the `=` operator assigns the value on the right to the variable or property on the left so that future references to the variable or property evaluate to the value.

::: tip 翻译
`=`操作符期待其左侧操作数是一个左值，即变量或对象属性或数组元素。它期待右侧操作数是任意类型的任意值。赋值表达式的值是右侧操作数的值。作为副效应，`=`操作符将右侧的值赋给左侧的变量或属性，以便将来对该变量或属性的引用可以求值为这个值。
:::

Although assignment expressions are usually quite simple, you may sometimes see the value of an assignment expression used as part of a larger expression. For example, you can assign and test a value in the same expression with code like this:

::: tip 翻译
尽管赋值表达式通常很简单，但有时候你可能也会看到一个大型表达式中会用到赋值表达式的值。例如，可以像下面这样在同一个表达式中赋值并测试这个值：
:::

```js
(a = b) === 0;
```

If you do this, be sure you are clear on the difference between the `=` and `===` operators! Note that `=` has very low precedence, and parentheses are usually necessary when the value of an assignment is to be used in a larger expression.

::: tip 翻译
如果你要这样做，最好真正明白`=`和`===`操作符的区别。注意，`=`的优先级很低，在较大的表达式中使用赋值的值通常需要使用圆括号。
:::

The assignment operator has right-to-left associativity, which means that when multiple assignment operators appear in an expression, they are evaluated from right to left. Thus, you can write code like this to assign a single value to multiple variables:

::: tip 翻译
赋值操作符具有右结合性，这意味着如果一个表达式中出现多个赋值操作符，它们会从右向左求值。因此，可以通过如下代码将一个值赋给多个变量：
:::

```js
i = j = k = 0; // 把3个变量都初始化为0
```

### 通过操作赋值

Besides the normal `=` assignment operator, JavaScript supports a number of other assignment operators that provide shortcuts by combining assignment with some other operation. For example, the `+=` operator performs addition and assignment. The following expression:

::: tip 翻译
除了常规的`=`赋值操作符，JavaScript 还支持其他一些赋值操作符，这些操作符通过组合赋值和其他操作符提供了快捷操作。例如，`+=`操作符执行加法和赋值操作。下面这个表达式：
:::

```js
total += salesTax;
```

is equivalent to this one:

::: tip 翻译
等价于：
:::

```js
total = total + salesTax;
```

As you might expect, the `+=` operator works for numbers or strings. For numeric operands, it performs addition and assignment; for string operands, it performs concatenation and assignment.

::: tip 翻译
可能你也想到了，`+=`操作符可以处理数值和字符串。对数值操作数，它执行加法并赋值；对字符串操作数，它执行拼接并赋值。
:::

Similar operators include `-=`, `*=`, `&=`, and so on. Table 4-2 lists them all.

::: tip 翻译
类似的操作符还有`-=`、`*=`、`&=`，等等。表 4-2 列出了全部这样的操作符。
:::

_Table 4-2. Assignment operators_

| Operator | Example   | Equivalent   |
| -------- | :-------- | :----------- |
| +=       | a += b    | a = a + b    |
| -=       | a -= b    | a = a - b    |
| \*=      | a \*= b   | a = a \* b   |
| /=       | a /= b    | a = a / b    |
| %=       | a %= b    | a = a % b    |
| \*\*=    | a \*\*= b | a = a \*\* b |
| <<=      | a <<= b   | a = a << b   |
| >>=      | a >>= b   | a = a >> b   |
| >>>=     | a >>>= b  | a = a >>> b  |
| &=       | a &= b    | a = a & b    |
| \|=      | a \|= b   | a = a \| b   |
| ^=       | a ^= b    | a = a ^ b    |

In most cases, the expression:

::: tip 翻译
多数情况下，表达式：
:::

```js
a op= b
```

where `op` is an operator, is equivalent to the expression:

::: tip 翻译
（其中`op`是操作符）都等价于表达式：
:::

```js
a = a op b
```

In the first line, the expression a is evaluated once. In the second, it is evaluated twice. The two cases will differ only if a includes side effects such as a function call or an increment operator. The following two assignments, for example, are not the same:

::: tip 翻译
在第一行，表达式`a`只被求值一次。而在第二行，它会被求值两次。这两种情况只有在`a`包含副效应（如函数调用或递增操作符）时才会有区别。比如，下面这两个表达式就不一样了：
:::

```js
data[i++] *= 2;
data[i++] = data[i++] * 2;
```

## 求值表达式

Like many interpreted languages, JavaScript has the ability to interpret strings of JavaScript source code, evaluating them to produce a value. JavaScript does this with the global function `eval()`:

::: tip 翻译
与很多解释型语言一样，JavaScript 有能力解释 JavaScript 源代码字符串，对它们求值以产生一个值。JavaScript 是通过全局函数`eval()`来对源代码字符串求值的：
:::

```js
eval("3+2"); // => 5
```

Dynamic evaluation of strings of source code is a powerful language feature that is almost never necessary in practice. If you find yourself using `eval()`, you should think carefully about whether you really need to use it. In particular, `eval()` can be a security hole, and you should never pass any string derived from user input to `eval()`. With a language as complicated as JavaScript, there is no way to sanitize user input to make it safe to use with `eval()`. Because of these security issues, some web servers use the HTTP “Content-Security-Policy” header to disable `eval()` for an entire website.

::: tip 翻译
对源代码字符串的动态求值是一个强大的语言特性，但这种特性在实际项目当中几乎用不到。如果你发现自己在使用`eval()`，那应该好好思考一下到底是不是真需要使用它。特别地，`eval()`可能会成为安全漏洞，为此永远不要把来自用户输入的字符串交给它执行。对于像 JavaScript 这么复杂的语言，无法对用户输入脱敏，因此无法保证在`eval()`中安全地使用。由于这些安全问题，某些 Web 服务器使用 HTTP 的"Content-Security-Policy"头部对整个网站禁用`eval()`。
:::

The subsections that follow explain the basic use of `eval()` and explain two restricted versions of it that have less impact on the optimizer.

::: tip 翻译
接下来几小节将解释`eval()`的基本用法，并解释它的两个对优化程序影响不大的受限版本。
:::

> **Is eval() a Function or an Operator**
>
> `eval()` is a function, but it is included in this chapter on expressions because it really should have been an operator. The earliest versions of the language defined an `eval()` function, and ever since then, language designers and interpreter writers have been placing restrictions on it that make it more and more operator-like. Modern JavaScript interpreters perform a lot of code analysis and optimization. Generally speaking, if a function calls `eval()`, the interpreter cannot optimize that function. The problem with defining `eval()` as a function is that it can be given other names:
>
> ```js
> let f = eval;
> let g = f;
> ```
>
> If this is allowed, then the interpreter can’t know for sure which functions call `eval()`, so it cannot optimize aggressively. This issue could have been avoided if `eval()` was an operator (and a reserved word). We’ll learn (in §4.12.2 and §4.12.3) about restrictions placed on `eval()` to make it more operator-like.

> **eval()是函数还是操作符？**
>
> `eval()`是一个函数，但之所以在讲表达式的本章介绍它，是因为它其实应该是个操作符。JavaScript 语言最初的版本定义了一个`eval()`函数，而从那时起，语言设计者和解释器开发者一直对它加以限制，导致它越来越像操作符。现代 JavaScript 解释器会执行大量代码分析和优化。一般来说，如果一个函数调用`eval()`，则解释器将无法再优化该函数。把`eval()`定义为函数的问题在于可以给它起不同的名字：
>
> ```js
> let f = eval;
> let g = f;
> ```
>
> 如果可以这样，那么解释器无法确定哪个函数会调用`eval()`，也就无法激进优化。假如`eval()`是个操作符（即保留字），那这个问题就可以避免。后面（4.12.2 节和 4.12.3 节）会介绍对`eval()`的限制，而这些限制也让它更像操作符。

### eval()

`eval()` expects one argument. If you pass any value other than a string, it simply returns that value. If you pass a string, it attempts to parse the string as JavaScript code, throwing a SyntaxError if it fails. If it successfully parses the string, then it evaluates the code and returns the value of the last expression or statement in the string or undefined if the last expression or statement had no value. If the evaluated string throws an exception, that exception propagates from the call to `eval()`.

::: tip 翻译
`eval()`期待一个参数。如果给它传入任何非字符串值，它会简单地返回这个值。如果传入字符串，它会尝试把这个字符串当成 JavaScript 代码来解析，解析失败会抛出 SyntaxError。如果解析字符串成功，它会求值代码并返回该字符串中最后一个表达式或语句的值；如果最后一个表达式或语句没有值则返回`undefined`。如果求值字符串抛出异常，该异常会从调用`eval()`的地方传播出来。
:::

The key thing about `eval()` (when invoked like this) is that it uses the variable environment of the code that calls it. That is, it looks up the values of variables and defines new variables and functions in the same way that local code does. If a function defines a local variable `x` and then calls `eval("x")`, it will obtain the value of the local variable. If it calls `eval("x=1")`, it changes the value of the local variable. And if the function calls `eval("var y = 3;")`, it declares a new local variable `y`. On the other hand, if the evaluated string uses `let` or `const`, the variable or constant declared will be local to the evaluation and will not be defined in the calling environment.

::: tip 翻译
对于`eval()`（在像这样调用时），关键在于它会使用调用它的代码的变量环境。也就是说，它会像本地代码一样查找变量的值、定义新变量和函数。如果一个函数定义了一个局部变量`x`，然后调用了`eval("x")`，那它会取得这个局部变量的值。如果这个函数调用了`eval("var y = 3;")`，则会声明一个新局部变量`y`。另外，如果被求值的字符串使用了`let`或`const`，则声明的变量或常量会被限制在求值的局部作用域内，不会定义到调用环境中。
:::

Similarly, a function can declare a local function with code like this:

::: tip 翻译
类似地，函数也可以像下面这样声明一个局部函数：
:::

```js
eval("function f() { return x+1; }");
```

If you call `eval()` from top-level code, it operates on global variables and global functions, of course.

::: tip 翻译
如果在顶级代码中调用`eval()`，则它操作的一定是全局变量和全局函数。
:::

Note that the string of code you pass to `eval()` must make syntactic sense on its own: you cannot use it to paste code fragments into a function. It makes no sense to write `eval("return;")`, for example, because return is only legal within functions, and the fact that the evaluated string uses the same variable environment as the calling function does not make it part of that function. If your string would make sense as a standalone script (even a very short one like `x=0` ), it is legal to pass to `eval()`. Otherwise, `eval()` will throw a SyntaxError.

::: tip 翻译
注意，传给`eval()`的代码字符串本身必须从语法上说得通：不能使用它向函数中粘贴代码片段。比如，`eval("return;")`是没有意义的，因为 return 只在函数中是合法的，即使被求值的字符串使用与调用函数相同的变量环境，这个字符串也不会成为函数的一部分。只要这个字符串本身可以作为独立的脚本运行（即使像`x=0`这么短），都可以合法地传给`eval()`。否则，`eval()`将抛出 SyntaxError。
:::

### 全局 eval()

It is the ability of `eval()` to change local variables that is so problematic to JavaScript optimizers. As a workaround, however, interpreters simply do less optimization on any function that calls `eval()`. But what should a JavaScript interpreter do, however, if a script defines an alias for `eval()` and then calls that function by another name? The JavaScript specification declares that when `eval()` is invoked by any name other than “eval”, it should evaluate the string as if it were top-level global code. The evaluated code may define new global variables or global functions, and it may set global variables, but it will not use or modify any variables local to the calling function, and will not, therefore, interfere with local optimizations.

::: tip 翻译
之所以`eval()`会干扰 JavaScript 的优化程序，是因为它能够修改局部变量。不过作为应对，解释器也不会过多优化调用`eval()`的函数。那么，如果某脚本为`eval()`定义了别名，然后又通过另一个名字调用这个函数，JavaScript 解释器该怎么做呢？JavaScript 规范中说，如果`eval()`被以“eval”之外的其他名字调用时，它应该把字符串当成顶级全局代码来求值。被求值的代码可能定义新全局变量或全局函数，可能修改全局变量，但它不会再使用或修改调用函数的局部变量。因此也就不会妨碍局部优化。
:::

A “direct eval” is a call to the `eval()` function with an expression that uses the exact, unqualified name “eval” (which is beginning to feel like a reserved word). Direct calls to `eval()` use the variable environment of the calling context. Any other call—an indirect call—uses the global object as its variable environment and cannot read, write, or define local variables or functions. (Both direct and indirect calls can define new variables only with var. Uses of let and const inside an evaluated string create variables and constants that are local to the evaluation and do not alter the calling or global environment.)

::: tip 翻译
相对而言，使用名字“eval”来调用`eval()`函数就叫作“直接 eval”（这样就有点保留字的感觉了）。直接调用`eval()`使用的是调用上下文的变量环境。任何其他调用方式，包括间接调用，都使用全局对象作为变量环境，因而不能读、写或定义局部变量或函数（无论直接调用还是间接调用都只能通过 var 来定义新变量。在被求值的字符串中使用 let 和 const 创建的变量和常量会被限定在求值的局部作用域内，不会修改调用或全局环境）。
:::

The following code demonstrates:

::: tip 翻译
下面来看几个例子：
:::

```js
const geval = eval; //使用另一个名字，实现全局求值
let x = "global",
  y = "global"; // 两个全局变量
function f() {
  // 这个函数直接调用eval()
  let x = "local"; // 定义一个局部变量
  eval("x += 'changed';"); // 直接调用修改局部变量
  return x; // 返回修改后的局部变量
}
function g() {
  // 这个函数全局（间接）调用eval()
  let y = "local"; //定义一个局部变量
  geval("y += 'changed';"); //间接调用修改全局变量
  return y; // 返回未修改的局部变量
}
console.log(f(), x); // 局部变量变了，打印 "localchanged global":
console.log(g(), y); // 全局变量变了，打印 "local globalchanged":
```

Notice that the ability to do a global eval is not just an accommodation to the needs of the optimizer; it is actually a tremendously useful feature that allows you to execute strings of code as if they were independent, top-level scripts. As noted at the beginning of this section, it is rare to truly need to evaluate a string of code. But if you do find it necessary, you are more likely to want to do a global eval than a local eval.

::: tip 翻译
注意，这种全局求值的能力不仅仅是为了适应优化程序的需求，同时也是一种极其有用的特性，可以让我们把代码字符串作为独立、顶级的脚本来执行。正如本节开始时提到的，真正需要求值代码字符串的场景非常少。假如你必须使用`eval()`，那很可能应该使用它的全局求值而不是局部求值。
:::

### 严格 eval()

Strict mode (see §5.6.3) imposes further restrictions on the behavior of the `eval()` function and even on the use of the identifier “eval”. When `eval()` is called from strict-mode code, or when the string of code to be evaluated itself begins with a “use strict” directive, then `eval()` does a local eval with a private variable environment. This means that in strict mode, evaluated code can query and set local variables, but it cannot define new variables or functions in the local scope.

::: tip 翻译
严格模式（参见 5.6.3 节）对`eval()`函数增加了更多限制，甚至对标识符“eval”的使用也进行了限制。当我们在严格模式下调用`eval()`时，或者当被求值的代码字符串以“use strict”指令开头时，`eval()`会基于一个私有变量环境进行局部求值。这意味着在严格模式下，被求值的代码可以查询和设置局部变量，但不能在局部作用域中定义新变量或函数。
:::

Furthermore, strict mode makes `eval()` even more operator-like by effectively making “eval” into a reserved word. You are not allowed to overwrite the `eval()` function with a new value. And you are not allowed to declare a variable, function, function parameter, or catch block parameter with the name “eval”

::: tip 翻译
另外，严格模式让`eval()`变得更像操作符，因为“eval”在严格模式下会变成保留字。此时不能再使用新值来重写`eval()`函数。换句话说，通过名字“eval”来声明变量、函数、函数参数或捕获块参数都是不允许的。
:::

## 其他操作符

JavaScript supports a number of other miscellaneous operators, described in the following sections.

::: tip 翻译
JavaScript 还支持另外一些操作符，接下来几节介绍它们。
:::

### 条件操作符 (?:)

The conditional operator is the only ternary operator (three operands) in JavaScript and is sometimes actually called the ternary operator. This operator is sometimes written `?:`, although it does not appear quite that way in code. Because this operator has three operands, the first goes before the `?`, the second goes between the `?` and the `:`, and the third goes after the `:`. It is used like this:

::: tip 翻译
条件操作符是 JavaScript 唯一一个三元操作符（有三个操作数），因此有时候也被叫作三元操作符。这个操作符有时候会被写作`?:`，尽管它在代码中并不是这样的。这个操作符有三个操作数，第一个在`?`前面，第二个在`?`和`:`中间，第三个在`:`后面。因此在代码中一般是这样的：
:::

```js
x > 0 ? x : -x; // x的绝对值
```

The operands of the conditional operator may be of any type. The first operand is evaluated and interpreted as a boolean. If the value of the first operand is truthy, then the second operand is evaluated, and its value is returned. Otherwise, if the first operand is falsy, then the third operand is evaluated and its value is returned. Only one of the second and third operands is evaluated; never both.

::: tip 翻译
条件操作符的操作数可以是任意类型。第一个操作数被求值并解释为一个布尔值。如果第一个操作数的值是真值，那么就求值第二个操作数，并返回它的值。否则，求值第三个操作数并返回它的值。第二个或第三个操作数只有一个会被求值，不可能两个都被求值。
:::

While you can achieve similar results using the `if` statement (§5.3.1), the `?:` operator often provides a handy shortcut. Here is a typical usage, which checks to be sure that a variable is defined (and has a meaningful, truthy value) and uses it if so or provides a default value if not:

::: tip 翻译
可以使用`if`语句（参见 5.3.1 节）实现类似的结果，但`?:`操作符更简洁。下面展示了它的典型应用，其中检查了变量如果有定义（一个有意义的真值）就使用它，否则就提供一个默认值：
:::

```js
greeting = "hello " + (username ? username : "there");
```

This is equivalent to, but more compact than, the following `if` statement:

::: tip 翻译
这行代码等价于下面的`if`语句，但更简洁：
:::

```js
greeting = "hello ";
if (username) {
  greeting += username;
} else {
  greeting += "there";
}
```

### 先定义 (??)

The first-defined operator `??` evaluates to its first defined operand: if its left operand is not `null` and not `undefined`, it returns that value. Otherwise, it returns the value of the right operand. Like the `&&` and `||` operators, `??` is short-circuiting: it only evaluates its second operand if the first operand evaluates to `null` or `undefined`. If the expression `a` has no side effects, then the expression `a ?? b` is equivalent to:

::: tip 翻译
先定义（first-defined）操作符`??`求值其先定义的操作数，如果其左操作数不是`null`或`undefined`，就返回该值。否则，它会返回右操作数的值。与`&&`或`||`操作符类似，`??`是短路的：它只在第一个操作数求值为`null`或`undefined`时才会求值第二个操作数。如果表达式 a 没有副效应，那么表达式`a ?? b`等价于：
:::

```js
a !== null && a !== undefined ? a : b;
```

`??` is a useful alternative to `||` (§4.10.2) when you want to select the first _defined_ operand rather than the first truthy operand. Although `||` is nominally a logical OR operator, it is also used idiomatically to select the first non-falsy operand with code like this:

::: tip 翻译
`??`是对`||`（参见 4.10.2 节）的一个有用的替代，适合选择先定义的操作数，而不是第一个为真值的操作数。尽管`||`名义上是个逻辑或操作符，习惯上也会使用它选择第一个非假值操作数，比如：
:::

```js
// 如果maxWidth是真值，就使用它；否则，看看preferences对象。
// 如果Preferences里也没有真值，就使用硬编码的常量
let max = maxWidth || preferences.maxWidth || 500;
```

The problem with this idiomatic use is that zero, the empty string, and false are all falsy values that may be perfectly valid in some circumstances. In this code example, if `maxWidth` is zero, that value will be ignored. But if we change the `||` operator to `??`, we end up with an expression where zero is a valid value:

::: tip 翻译
这种习惯用法的问题在于，0、空字符串和`false`都是假值，但这些值在某些情况下是完全有效的。对上面的代码示例来说，`maxWidth`如果等于 0，该值就会被忽略。如果我们把`||`操作符改为`??`，那么对这个表达式来说，0 也会成为有效的值：
:::

```js
// 如果maxWidth有定义，就使用它；否则，看看preferences对象。
// 如果Preferences里也没有定义，就使用硬编码的常量
let max = maxWidth ?? preferences.maxWidth ?? 500;
```

Here are more examples showing how `??` works when the first operand is falsy. If that operand is falsy but defined, then `??` returns it. It is only when the first operand is “nullish” (i.e., `null` or `undefined`) that this operator evaluates and returns the second operand:

::: tip 翻译
下面再看几个例子，其中`??`的第一个操作数都是假值。如果这个操作数是假值但有定义，`??`仍然返回这个值。只有当第一个操作数“缺值”（nullish）时（即`null`或`undefined`），这个操作符才会求值并返回第二个操作数：
:::

```js
let options = { timeout: 0, title: "", verbose: false, n: null };
options.timeout ?? 1000; // => 0: 在对象中有定义
options.title ?? "Untitled"; // => "": 在对象中有定义
options.verbose ?? true; // => false: 在对象中有定义
options.quiet ?? false; // => false: 属性没有定义
options.n ?? 10; // => 10: 属性值是null
```

Note that the `timeout`, `title`, and `verbose` expressions here would have different values if we used `||` instead of `??`.

::: tip 翻译
注意，如果我们使用`||`而不是`??`，这里的`timeout`、`title`和`verbose`表达式会求值为不同的结果。
:::

The `??` operator is similar to the `&&` and `||` operators but does not have higher precedence or lower precedence than they do. If you use it in an expression with either of those operators, you must use explicit parentheses to specify which operation you want to perform first:

::: tip 翻译
`??`操作符与`&&`和`||`操作符类似，但优先级并不比它们更高或更低。如果表达式中混用了`??`和它们中的任何一个，必须使用圆括号说明先执行哪个操作：
:::

```js
(a ?? b) || c // ?? x先执行，然后执行||
a ?? (b || c) // || 先执行，然后执行 ??
a ?? b || c // SyntaxError: 必须有圆括号
```

The `??` operator is defined by ES2020, and as of early 2020, is newly supported by current or beta versions of all major browsers. This operator is formally called the “nullish coalescing” operator, but I avoid that term because this operator selects one of its operands but does not “coalesce” them in any way that I can see.

::: tip 翻译
`??`操作符是 ES2020 定义的，在 2020 年初已经得到所有主流浏览器当前和预览版的支持。这个操作符正式的名字叫“缺值合并”（nullish coalescing）操作符，但我没有使用这个叫法。因为这个操作符会选择自己的一个操作数，但我并没有看到它会“合并”操作数。
:::

### typeof 操作符

`typeof` is a unary operator that is placed before its single operand, which can be of any type. Its value is a string that specifies the type of the operand. Table 4-3 specifies the value of the `typeof` operator for any JavaScript value.

::: tip 翻译
`typeof`是个一元操作符，放在自己的操作数前面，这个操作数可以是任意类型。`typeof`操作符的值是一个字符串，表明操作数的类型。表 4-3 列出了所有 JavaScript 值在应用`typeof`操作符后得到的值。
:::

_Table 4-3. Values returned by the typeof operator_

| x                      | typeof x    |
| ---------------------- | ----------- |
| undefined              | "undefined" |
| null                   | "object"    |
| true or false          | "boolean"   |
| any number or NaN      | "number"    |
| any BigInt             | "bigint"    |
| any string             | "string"    |
| any symbol             | "symbol"    |
| any function           | "function"  |
| any nonfunction object | "object"    |

You might use the `typeof` operator in an expression like this:

::: tip 翻译
可以像下面这样在表达式中使用`typeof`操作符：
:::

```js
// 如果value是字符串，把它包含在引号中，否则把它转换为字符串
typeof value === "string" ? "'" + value + "'" : value.toString();
```

Note that `typeof` returns “object” if the operand value is `null`. If you want to distinguish `null` from objects, you’ll have to explicitly test for this special-case value.

::: tip 翻译
注意，如果操作数的值是`null`，`typeof`返回“object”。如果想区分`null`和对象，必须显式测试这个特殊值。
:::

Although JavaScript functions are a kind of object, the `typeof` operator considers functions to be sufficiently different that they have their own return value.

::: tip 翻译
尽管 JavaScript 函数是一种对象，`typeof`操作符也认为函数不一样，因为它们有自己的返回值。
:::

Because `typeof` evaluates to “object” for all object and array values other than functions, it is useful only to distinguish objects from other, primitive types. In order to distinguish one class of object from another, you must use other techniques, such as the `instanceof` operator (see §4.9.4), the `class` attribute (see §14.4.3), or the `constructor` property (see §9.2.2 and §14.3).

::: tip 翻译
因为对除函数之外的所有对象和数组值，`typeof`都求值为“object”，所以可以只用它来区分对象和其他原始类型。而要区分不同对象的类，必须使用其他方法，例如`instanceof`操作符（参见 4.9.4 节）、`class`特性（参见 14.4.3 节），或者`constructor`属性（参见 9.2.2 节和 14.3 节）。
:::

### delete 操作符

`delete` is a unary operator that attempts to delete the object property or array element specified as its operand. Like the assignment, increment, and decrement operators, `delete` is typically used for its property deletion side effect and not for the value it returns. Some examples:

::: tip 翻译
`delete`是一元操作符，尝试删除其操作数指定的对象属性或数组元素。与赋值、递增和递减操作符一样，使用`delete`通常也是为了发挥其属性删除的副效应，而不是使用它返回的值。来看几个例子：
:::

```js
let o = { x: 1, y: 2 }; // 先定义一个对象
delete o.x; // 删除它的属性
"x" in o; // => false: 这个属性不存在了

let a = [1, 2, 3]; // 定义一个数组
delete a[2]; // 删除数组的最后一个元素
2 in a; // => false: 数组元素2不存在了
a.length; // => 3: 但要注意，数组的长度没有变化
```

Note that a deleted property or array element is not merely set to the `undefined` value. When a property is deleted, the property ceases to exist. Attempting to read a nonexistent property returns `undefined`, but you can test for the actual existence of a property with the in operator (§4.9.3). Deleting an array element leaves a “hole” in the array and does not change the array’s length. The resulting array is _sparse_ (§7.3).

::: tip 翻译
注意，被删除的属性或数组元素不仅会被设置为`undefined`值。当删除一个属性时，这个属性就不复存在了。尝试读取不存在的属性会返回`undefined`，但可以通过 in 操作符（参见 4.9.3）测试某个属性是否存在。删除某个数组元素会在数组中留下一个“坑”，并不改变数组的长度。结果数组是一个稀疏数组（参见 7.3 节）。
:::

`delete` expects its operand to be an lvalue. If it is not an lvalue, the operator takes no action and returns `true`. Otherwise, `delete` attempts to delete the specified lvalue. delete returns `true` if it successfully deletes the specified lvalue. Not all properties can be deleted, however: non-configurable properties (§14.1) are immune from deletion.

::: tip 翻译
`delete`期待它的操作数是个左值。如果操作数不是左值，`delete`什么也不做，且返回`true`。否则，`delete`尝试删除指定的左值。如果删除成功则返回`true`。但是并非所有属性都是可以删除的：不可配置属性（参见 14.1 节）就无法删除。
:::

In strict mode, `delete` raises a SyntaxError if its operand is an unqualified identifier such as a variable, function, or function parameter: it only works when the operand is a property access expression (§4.4). Strict mode also specifies that `delete` raises a TypeError if asked to delete any non-configurable (i.e., nondeleteable) property. Outside of strict mode, no exception occurs in these cases, and `delete` simply returns `false` to indicate that the operand could not be deleted.

::: tip 翻译
在严格模式下，`delete`的操作数如果是未限定标识符，比如变量、函数或函数参数，就会导致 SyntaxError。此时，`delete`操作符只能作用于属性访问表达式（参见 4.4 节）。严格模式也会在`delete`尝试删除不可配置（即不可删除）属性时抛出 TypeError。但在严格模式之外，这两种情况都不会发生异常，`delete`只是简单地返回`false`，表示不能删除操作数。
:::

Here are some example uses of the `delete` operator:

::: tip 翻译
下面是几个使用`delete`操作符的例子：
:::

```js
let o = { x: 1, y: 2 };
delete o.x; // 删除对象的一个属性：返回true.
typeof o.x; // 属性不存在；返回 "undefined".
delete o.x; // 删除不存在的属性；返回 true.
delete 1; // 这样做毫无意义，但会返回true.
// 不能删除变量，返回false,或在严格模式下报SyntaxError
delete o;
// 不可删除的属性：返回false，或在严格模式下抛出 TypeError
delete Object.prototype;
```

We’ll see the `delete` operator again in §6.4.

::: tip 翻译
我们会在 6.4 节再看到`delete`操作符。
:::

### await 操作符

`await` was introduced in ES2017 as a way to make asynchronous programming more natural in JavaScript. You will need to read [Chapter 13](./Chapter-13-Asynchronous.md) to understand this operator. Briefly, however, `await` expects a Promise object (representing an asynchronous computation) as its sole operand, and it makes your program behave as if it were waiting for the asynchronous computation to complete (but it does this without actually blocking, and it does not prevent other asynchronous operations from proceeding at the same time). The value of the `await` operator is the fulfillment value of the Promise object. Importantly, `await` is only legal within functions that have been declared asynchronous with the `async` keyword. Again, see [Chapter 13](./Chapter-13-Asynchronous.md) for full details.

::: tip 翻译
`await`是 ES2017 增加的，用于让 JavaScript 中的异步编程更自然。要理解这个操作符，需要阅读[第 13 章](./Chapter-13-Asynchronous.md)。但简单来说，`await`期待一个 Promise 对象（表示异步计算）作为其唯一操作数，可以让代码看起来像是在等待异步计算完成（但实际上它不会阻塞主线程，不会妨碍其他异步操作进行）。`await`操作符的值是 Promise 对象的兑现值。关键在于，`await`只能出现在已经通过`async`关键字声明为异步的函数中。同样，要了解完整的细节，参见[第 13 章](./Chapter-13-Asynchronous.md)。
:::

### void 操作符

`void` is a unary operator that appears before its single operand, which may be of any type. This operator is unusual and infrequently used; it evaluates its operand, then discards the value and returns `undefined`. Since the operand value is discarded, using the `void` operator makes sense only if the operand has side effects.

::: tip 翻译
`void`是一元操作符，出现在它的操作数前面，这个操作数可以是任意类型。`void`是个与众不同的操作符，用处不多：它求值自己的操作数，然后丢弃这个值并返回`undefined`。由于操作数的值会被丢弃，只有在操作数有副效应时才有必要使用`void`操作符。
:::

The `void` operator is so obscure that it is difficult to come up with a practical example of its use. One case would be when you want to define a function that returns nothing but also uses the arrow function shortcut syntax (see §8.1.3) where the body of the function is a single expression that is evaluated and returned. If you are evaluating the expression solely for its side effects and do not want to return its value, then the simplest thing is to use curly braces around the function body. But, as an alternative, you could also use the `void` operator in this case:

::: tip 翻译
`void`操作符太难解释，也很难给出一个实际的例子说明它的用法。一种情况是你要定义一个函数，这个函数什么也不返回，但却使用了箭头函数的简写语法（参见 8.1.3 节），其中函数体是一个会被求值并返回的表达式。如果你只想对这个表达式求值，不想返回它的值，那最简单的方法是用花括号把函数体包起来。此时，作为替代也可以使用`void`操作符：
:::

```js
let counter = 0;
const increment = () => void counter++;
increment(); // => undefined
counter; // => 1
```

### 逗号操作符 (,)

The comma operator is a binary operator whose operands may be of any type. It evaluates its left operand, evaluates its right operand, and then returns the value of the right operand. Thus, the following line:

::: tip 翻译
逗号操作符是二元操作符，其操作数可以是任意类型。这个操作符会求值其左操作数，求值其右操作数，然后返回右操作数的值。因此，下面这行代码：
:::

```js
(i = 0), (j = 1), (k = 2);
```

evaluates to 2 and is basically equivalent to:

::: tip 翻译
求值为 2，基本上等价于：
:::

```js
i = 0;
j = 1;
k = 2;
```

The left-hand expression is always evaluated, but its value is discarded, which means that it only makes sense to use the comma operator when the left-hand expression has side effects. The only situation in which the comma operator is commonly used is with a `for` loop (§5.4.3) that has multiple loop variables:

::: tip 翻译
换句话说，逗号左侧的操作数始终会被求值，但这个值会被丢弃。而这也意味着只有当左侧表达式有副效应时才有必要使用逗号操作符。逗号操作符唯一常见的使用场景就是有多个循环变量的`for`循环（参见 5.4.3 节）：
:::

```js
// 下面第一个逗号是let语句语法的一部分
// 第二个逗号是逗号操作符，它让我们把两个表达式（i++与j--）
// 放到了本来期待一个表达式的语句（for循环）中
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i + j);
}
```

## 总结

This chapter covers a wide variety of topics, and there is lots of reference material here that you may want to reread in the future as you continue to learn JavaScript. Some key points to remember, however, are these:

- Expressions are the phrases of a JavaScript program.
- Any expression can be _evaluated_ to a JavaScript value.
- Expressions can also have side effects (such as variable assignment) in addition to producing a value.
- Simple expressions such as literals, variable references, and property accesses can be combined with operators to produce larger expressions.
- JavaScript defines operators for arithmetic, comparisons, Boolean logic, assignment, and bit manipulation, along with some miscellaneous operators, including the ternary conditional operator.
- The JavaScript `+` operator is used to both add numbers and concatenate strings.
- The logical operators `&&` and `||` have special “short-circuiting” behavior and sometimes only evaluate one of their arguments. Common JavaScript idioms require you to understand the special behavior of these operators.

::: tip 翻译
本章介绍了很多内容，其中包含很多参考资料，可以让你在学习 JavaScript 的过程中反复阅读。下面是其中必须记住的一些要点：

- 表达式是 JavaScript 程序中的短语。
- 任何表达式都可以求值为一个 JavaScript 值。
- 表达式除了产生一个值，也可以有副效应（如变量赋值）。
- 字面量、变量引用和属性访问等简单表达式可以与操作符组合，以产生更大的表达式。
- JavaScript 为算术、比较、布尔逻辑、赋值和位操作定义了操作符，还有其他一些操作符，包括三元条件操作符。
- JavaScript 的`+`操作符既可用于数值加法，也可用于字符串拼接。
- 逻辑操作符`&&`和`||`具有特殊的“短路”行为，有时候只会求值它们的一个参数。要熟悉 JavaScript 的惯用做法，必须理解这些操作符的这种特殊行为。
  :::
