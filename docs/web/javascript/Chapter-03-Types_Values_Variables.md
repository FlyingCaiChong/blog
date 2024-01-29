---
title: 第三章 类型，值和变量
---

# 类型、值和变量

[[toc]]

Computer programs work by manipulating values, such as the number 3.14 or the text “Hello World.” The kinds of values that can be represented and manipulated in a programming language are known as types, and one of the most fundamental characteristics of a programming language is the set of types it supports. When a program needs to retain a value for future use, it assigns the value to (or “stores” the value in) a variable. Variables have names, and they allow use of those names in our programs to refer to values. The way that variables work is another fundamental characteristic of any programming language. This chapter explains types, values, and variables in JavaScript. It begins with an overview and some definitions.

::: tip 翻译
计算机程序通过操作值（如数值 3.14）或文本（如“Hello World”）来工作。编程语言中这些可以表示和操作的值被称为类型，而一门语言支持的类型集也是这门语言最基本的特征。程序在需要把某个值保存下来以便将来使用时，会把这个值赋给（或存入）变量。变量有名字，程序可以通过这些名字来引用值。变量的工作方式则是一门编程语言的另一个基本特征。本章讲解 JavaScript 中的类型、值和变量。首先从概念和一些定义开始。
:::

## 概述与定义

JavaScript types can be divided into two categories: _primitive types_ and _object types_. JavaScript’s primitive types include numbers, strings of text (known as strings), and Boolean truth values (known as booleans). A significant portion of this chapter is dedicated to a detailed explanation of the numeric (§3.2) and string (§3.3) types in JavaScript. Booleans are covered in §3.4.

::: tip 翻译
JavaScript 类型可以分为两类：_原始类型_ 和 _对象类型_。JavaScript 的原始类型包括数值、文本字符串（也称字符串）和布尔真值（也称布尔值）。本章将用很大篇幅专门详细讲解 JavaScript 中的数值（见 3.2 节）类型和字符串（见 3.3 节）类型。布尔值将在 3.4 节介绍。
:::

The special JavaScript values `null` and `undefined` are primitive values, but they are not numbers, strings, or booleans. Each value is typically considered to be the sole member of its own special type. §3.5 has more about `null` and `undefined`. ES6 adds a new special-purpose type, known as Symbol, that enables the definition of language extensions without harming backward compatibility. Symbols are covered briefly in §3.6.

::: tip 翻译
JavaScript 中的特殊值`null`和`undefined`也是原始值，但它们不是数值、字符串或布尔值。这两个值通常被认为是各自特殊类型的唯一成员，将在 3.5 节进行介绍。ES6 新增了一种特殊类型`Symbol`（符号），用于对语言进行扩展而不破坏向后兼容性。3.6 节将简单介绍符号。
:::

Any JavaScript value that is not a number, a string, a boolean, a symbol, `null`, or `undefined` is an object. An object (that is, a member of the _type object_) is a collection of _properties_ where each property has a name and a value (either a primitive value or another object). One very special object, the _global object_, is covered in §3.7, but more general and more detailed coverage of objects is in [Chapter 6](./Chapter-06-Objects.md).

::: tip 翻译
在 JavaScript 中，任何不是数值、字符串、布尔值、符号、`null`和`undefined`的值都是对象。对象（也就是对象类型的成员）是属性的集合，其中每个属性都有一个名字和一个值（原始值或其他对象）。有一个非常特殊的对象叫*全局对象*，将在 3.7 节介绍。但关于对象更通用也更详尽的介绍会放到[第 6 章](./Chapter-06-Objects.md)。
:::

An ordinary JavaScript object is an unordered collection of named values. The language also defines a special kind of object, known as an array, that represents an ordered collection of numbered values. The JavaScript language includes special syntax for working with arrays, and arrays have some special behavior that distinguishes them from ordinary objects. Arrays are the subject of [Chapter 7](./Chapter-07-Arrays.md).

::: tip 翻译
普通 JavaScript 对象是一个命名值的无序集合。这门语言本身也定义一种特殊对象，称为数组。数组表示一个数字值的有序集合。JavaScript 语言包括操作数组的特殊语法，而数组本身也具有区别于普通对象的行为。数组是[第 7 章](./Chapter-07-Arrays.md)的主题。
:::

In addition to basic objects and arrays, JavaScript defines a number of other useful object types. A Set object represents a set of values. A Map object represents a mapping from keys to values. Various “typed array” types facilitate operations on arrays of bytes and other binary data. The RegExp type represents textual patterns and enables sophisticated matching, searching, and replacing operations on strings. The Date type represents dates and times and supports rudimentary date arithmetic. Error and its subtypes represent errors that can arise when executing JavaScript code. All of these types are covered in [Chapter 11](./Chapter-11-Standard_Library.md).

::: tip 翻译
除了基本的对象和数组之外，JavaScript 还定义了其他一些有用的对象类型。`Set` 对象表示一组值的结合，`Map` 对象表示键与值的映射。各种“定型数组”（`typed array`） 类型便于对字节数组和其他二进制数据进行操作。`RegExp` 类型表示文本模式，可以实现对字符串的复杂匹配、搜索和替换操作。Date 类型表示日期和时间，支持基本的日期计算。Error 及其子类型表示 JavaScript 代码运行期间可能发生的错误。所有这些类型将在[第 11 章](./Chapter-11-Standard_Library.md)介绍。
:::

JavaScript differs from more static languages in that functions and classes are not just part of the language syntax: they are themselves values that can be manipulated by JavaScript programs. Like any JavaScript value that is not a primitive value, functions and classes are a specialized kind of object. They are covered in detail in [Chapters 8](./Chapter-08-Functions.md) and [9](./Chapter-09-Classes.md).

::: tip 翻译
JavaScript 与静态语言更大的差别在于，函数和类不仅仅是语言的语法，它们本身就是可以被 JavaScript 程序操作的值。与其他 JavaScript 非原始值一样，函数和类也是特殊的对象。[第 8 章](./Chapter-08-Functions.md)和[第 9 章](./Chapter-09-Classes.md)将详细介绍它们。
:::

The JavaScript interpreter performs automatic garbage collection for memory management. This means that a JavaScript programmer generally does not need to worry about destruction or deallocation of objects or other values. When a value is no longer reachable—when a program no longer has any way to refer to it—the interpreter knows it can never be used again and automatically reclaims the memory it was occupying. (JavaScript programmers do sometimes need to take care to ensure that values do not inadvertently remain reachable—and therefore nonreclaimable—longer than necessary.)

::: tip 翻译
在内存管理方面，JavaScript 解释器会执行自动垃圾收集。这意味着 JavaScript 程序员通常不用关心对象或其他值的析构与释放。当一个值无法触达时，或者说当程序无法以任何方式引用这个值时，解释器就知道这个值已经用不到了，会自动释放它占用的内存（JavaScript 程序员有时候需要留意，不能让某些值在不经意间存续过长时间后仍可触达，从而导致它们无法被回收）。
:::

JavaScript supports an object-oriented programming style. Loosely, this means that rather than having globally defined functions to operate on values of various types, the types themselves define methods for working with values. To sort the elements of an array `a`, for example, we don’t pass `a` to a `sort()` function. Instead, we invoke the `sort()` method of `a`:

::: tip 翻译
JavaScript 支持面向对象的编程风格。粗略地说，这意味着不用定义全局函数去操作不同类型的值，而是由这些类型本身定义操作值的方法。比如要对数组元素排序，不用把数组`a`传给一个`sort()`函数，而是可以调用数组`a`的`sort()`方法。
:::

```js
a.sort(); // sort(a)的面向对象版
```

Method definition is covered in **Chapter 9**. Technically, it is only JavaScript objects that have methods. But numbers, strings, boolean, and symbol values behave as if they have methods. In JavaScript, `null` and `undefined` are the only values that methods cannot be invoked on.

::: tip 翻译
第 9 章将介绍如何定义方法。从技术角度来讲，只有 JavaScript 对象才有方法。但数值、字符串、布尔值和符号表现得似乎它们也有方法。在 JavaScript 中，只有`null`和`undefined`是不能调用方法的值。
:::

JavaScript’s object types are _mutable_ and its primitive types are _immutable_. A value of a mutable type can change: a JavaScript program can change the values of object properties and array elements. Numbers, booleans, symbols, null, and undefined are immutable—it doesn’t even make sense to talk about changing the value of a number, for example. Strings can be thought of as arrays of characters, and you might expect them to be mutable. In JavaScript, however, strings are immutable: you can access the text at any index of a string, but JavaScript provides no way to alter the text of an existing string. The differences between mutable and immutable values are explored further in §3.8.

::: tip 翻译
JavaScript 的对象类型是可修改的（mutable），而它的原始类型是不可修改的（immutable）。可修改类型的值可以改变，比如 JavaScript 程序可以修改对象属性和数组元素的值。数值、布尔值、符号、`null`和`undefined`是不可修改的，以数值为例，修改它是没有意义的。字符串可以看成字符数组，你可能期望它们是可修改的。但在 JavaScript 中，字符串也是不可修改的。虽然可以按索引访问字符串中的字符，但 JavaScript 没有提供任何方式去修改已有字符串的字符。可修改值与不可修改值的区别将在 3.8 节更详细地介绍。
:::

JavaScript liberally converts values from one type to another. If a program expects a string, for example, and you give it a number, it will automatically convert the number to a string for you. And if you use a non-boolean value where a boolean is expected, JavaScript will convert accordingly. The rules for value conversion are explained in §3.9. JavaScript’s liberal value conversion rules affect its definition of equality, and the `==` equality operator performs type conversions as described in §3.9.1. (In practice, however, the `==` equality operator is deprecated in favor of the strict equality operator `===`, which does no type conversions. See §4.9.1 for more about both operators.)

::: tip 翻译
JavaScript 可以自由地转换不同类型的值。比如，程序期待一个字符串，而你提供了一个数值，这个数值会自动转换为字符串。而如果你在一个期待布尔值的地方使用了非布尔值，JavaScript 也会相应地把它转换为布尔值。这种自动转换的规则将在 3.9 节解释。JavaScript 这种自由的值转换会影响对相等的定义，而相等操作符`==`会根据 3.9.1 节的描述进行类型转换（不过在实践中，相等操作符`==`已经被弃用，取而代之的是不会做类型转换的严格相等操作符`===`。关于这两个操作符的更多介绍可以参见 4.9.1 节）。
:::

Constants and variables allow you to use names to refer to values in your programs. Constants are declared with `const` and variables are declared with `let` (or with `var` in older JavaScript code). JavaScript constants and variables are _untyped_: declarations do not specify what kind of values will be assigned. Variable declaration and assignment are covered in §3.10.

::: tip 翻译
常量和变量可以让我们在程序中使用名字来引用值。常量使用`const`声明，变量使用`let`（或在较老的 JavaScript 代码中使用`var`）声明。JavaScript 常量和变量是无类型的(`untyped`)，声明并不会限定要赋何种类型的值。变量声明和赋值将在 3.10 节中介绍。
:::

As you can see from this long introduction, this is a wide-ranging chapter that explains many fundamental details about how data is represented and manipulated in JavaScript. We’ll begin by diving right in to the details of JavaScript numbers and text.

::: tip 翻译
看完以上概述，想必读者也已经心领神会了。这一章内容非常宽泛，涉及 JavaScript 如何表示和操作数据的很多基础性细节。下面我们就从详尽了解 JavaScript 的数值和文本开始。
:::

## 数值

JavaScript’s primary numeric type, Number, is used to represent integers and to approximate real numbers. JavaScript represents numbers using the 64-bit floating point format defined by the IEEE 754 standard, which means it can represent numbers as large as ±1.7976931348623157 × 10^308 and as small as ±5 × 10^−324.

::: tip 翻译
JavaScript 的主要数值类型 Number 用于表示整数和近似实数。JavaScript 使用 IEEE 754 标准定义的 64 位符点格式表示数值，这意味着 JavaScript 可以表示的最大整数是 ±1.7976931348623157 × 10^308，最小整数是 ±5 × 10^−324。
:::

The JavaScript number format allows you to exactly represent all integers between −9,007,199,254,740,992 (−2^53) and 9,007,199,254,740,992 (2^53), inclusive. If you use integer values larger than this, you may lose precision in the trailing digits. Note, however, that certain operations in JavaScript (such as array indexing and the bitwise operators described in **Chapter 4**) are performed with 32-bit integers. If you need to exactly represent larger integers, see §3.2.5.

::: tip 翻译
JavaScript 的这种数值格式可以让我们准确表示 −9,007,199,254,740,992 (−2^53) 到 9,007,199,254,740,992 (2^53) 之间的所有整数（含首尾值）。如果你的数值超出了这个范围，那可能会在末尾的数字上损失一些精度。但要注意，JavaScript 中的某些操作（如第 4 章介绍的数组索引和位操作）是以 32 位整数计算的。如果想准确表示更大的整数，可以参考 3.2.5 节。
:::

When a number appears directly in a JavaScript program, it’s called a _numeric literal_. JavaScript supports numeric literals in several formats, as described in the following sections. Note that any numeric literal can be preceded by a minus sign (`-`) to make the number negative.

::: tip 翻译
当数值真正出现在 JavaScript 程序中时，就叫作数值字面量(numeric literal)。JavaScript 支持几种形式的数值字面量，后面几节会介绍。注意，任何数值字面量前面都可以加上一个减号（-）来让该数值变为负数。
:::

### 整数字面量

In a JavaScript program, a base-10 integer is written as a sequence of digits. For example:

::: tip 翻译
在 JavaScript 程序中，基数为 10 的整数可以直接写成数字序列。例如：
:::

```js
0;
3;
10000000;
```

In addition to base-10 integer literals, JavaScript recognizes hexadecimal (base-16) values. A hexadecimal literal begins with 0x or 0X, followed by a string of hexadecimal digits. A hexadecimal digit is one of the digits 0 through 9 or the letters a (or A) through f (or F), which represent values 10 through 15. Here are examples of hexadecimal integer literals:

::: tip 翻译
除了基数为 10 的整数字面量之外，JavaScript 也支持十六进制（基数是 16 的）值。十六进制字面量以`0x`或`0X`开头，后跟一个十六进制数字字符串。十六进制数字是数字 0 到 9 和字母 a（或 A）到 f（或 F），a 到 f 表示 10 到 15.下面是十六进制整数字面量的例子：
:::

```js
0xff; // => 255: (15*16 + 15)
0xbadcafe; // => 195939070
```

In ES6 and later, you can also express integers in binary (base 2) or octal (base 8) using the prefixes `0b` and `0o` (or `0B` and `0O`) instead of `0x`:

::: tip 翻译
在 ES6 及之后的版本中，也可以通过二进制（基数为 2）或八进制（基数为 8）表示整数，分别使用前缀`0b`和`0o`（或`0B`和`0O`）：
:::

```js
0b10101; // => 21: (1*16 + 0*8 + 1*4 + 0*2 + 1*1)
0o377; // => 255: (3*64 + 7*8 + 7*1)
```

### 符点字面量

Floating-point literals can have a decimal point; they use the traditional syntax for real numbers. A real value is represented as the integral part of the number, followed by a decimal point and the fractional part of the number.

::: tip 翻译
浮点字面量可以包含小数点，它们对实数使用传统语法。实数值由数值的整数部分、小数点和数值的小数部分组成。
:::

Floating-point literals may also be represented using exponential notation: a real number followed by the letter e (or E), followed by an optional plus or minus sign, followed by an integer exponent. This notation represents the real number multiplied by 10 to the power of the exponent.

::: tip 翻译
浮点字面量也可以使用指数计数法表示，即实数值后面可以跟字母`e`（或`E`），跟一个可选的加号或减号，再跟一个整数指数。这种计数法表示的是实数值乘以 10 的指数次幂。
:::

More succinctly, the syntax is:

::: tip 翻译
更简洁的语法形式为:
:::

```js
[digits][.digits][(E|e)[(+|-)]digits]
```

For example:

```js
3.14;
2345.6789;
0.333333333333333333;
6.02e23; // 6.02 × 10²³
1.4738223e-32; // 1.4738223 × 10⁻³²
```

> **Separators in Numeric Literals**
>
> You can use underscores within numeric literals to break long literals up into chunks that are easier to read:
>
> ```js
> let billion = 1_000_000_000; // Underscore as a thousands separator.
> let bytes = 0x89_ab_cd_ef; // As a bytes separator.
> let bits = 0b0001_1101_0111; // As a nibble separator.
> let fraction = 0.123_456_789; // Works in the fractional part, too.
> ```
>
> At the time of this writing in early 2020, underscores in numeric literals are not yet formally standardized as part of JavaScript. But they are in the advanced stages of the standardization process and are implemented by all major browsers and by Node.

> **数值字面量中的分隔符**
>
> 可以用下划线将数值字面量分隔为容易看清的数字段：
>
> ```js
> let billion = 1_000_000_000; // 以下划线作为千分位分隔符
> let bytes = 0x89_ab_cd_ef; // 作为字节分隔符
> let bits = 0b0001_1101_0111; // 作为半字节分隔符
> let fraction = 0.123_456_789; // 也可以用在小数部分
>
> 在2020年年初写作本书时，数值字面量中像这样添加下划线还没有成为正式的JavaScript标准。但这个特性已经进入标准化流程的后期，而且已经被所有主流浏览器以及Node实现了。
> ```

### JavaScript 中的算术

JavaScript programs work with numbers using the arithmetic operators `.` that the language provides. These include `+` for addition, `-` for subtraction, `*` for multiplication, `/` for division, and `%` for modulo (remainder after division). ES2016 adds `**` for exponentiation. Full details on these and other operators can be found in [Chapter 4](./Chapter-04-Expressions_Operators.md).

::: tip 翻译
JavaScript 程序使用语言提供的算术操作符来操作数值，包括表示加法的`+`、表示减法的`-`、表示乘法的`*`、表示除法的`/`和表示取模（除法后的余数）的`%`。ES2016 增加了取幂的`**`。这些操作符以及更多操作符将在[第 4 章](./Chapter-04-Expressions_Operators.md)详细介绍。
:::

In addition to these basic arithmetic operators, JavaScript supports more complex mathematical operations through a set of functions and constants defined as properties of the `Math` object:

::: tip 翻译
除了上述基本的算术操作符之外，JavaScript 还通过`Math`对象的属性提供了一组函数和常量，以支持更复杂的数学计算：
:::

```js
Math.pow(2, 53); // => 9007199254740992: 2 的53次方
Math.round(0.6); // => 1.0: 舍入到最接近的整数
Math.ceil(0.6); // => 1.0: 向上舍入到一个整数
Math.floor(0.6); // => 0.0: 向下舍入到一个整数
Math.abs(-5); // => 5: 绝对值
Math.max(x, y, z); // 返回最大的参数
Math.min(x, y, z); // 返回最小的参数
Math.random(); // 伪随机数x，其中 0 <= x < 1.0
Math.PI; // π: 圆周率
Math.E; // e: 自然对数的底数
Math.sqrt(3); // => 3**0.5: 3的平方根
Math.pow(3, 1 / 3); // => 3**(1/3): 3的立方根
Math.sin(0); // 三角函数：还有 Math.cos, Math.atan 等.
Math.log(10); // 10的自然对数
Math.log(100) / Math.LN10; // 以10为底100的对数
Math.log(512) / Math.LN2; // 以2为底512的对数
Math.exp(3); // Math.E 的立方
```

ES6 defines more functions on the Math object:

::: tip 翻译
ES6 在`Math`对象上又定义了更多函数：
:::

```js
Math.cbrt(27); // => 3: 立方根
Math.hypot(3, 4); // => 5: 所有参数平方和的平方根
Math.log10(100); // => 2: 以10为底的对数
Math.log2(1024); // => 10: 以2为底的对数
Math.log1p(x); // (1+x)的自然对数；精确到非常小的x
Math.expm1(x); // Math.exp(x)-1; Math.log1p()的逆运算
Math.sign(x); // 当<、== 或 >0 的参数返回 -1, 0, 或1
Math.imul(2, 3); // => 6: 优化的32位整数乘法
Math.clz32(0xf); // => 28: 32位整数中前导0的位数
Math.trunc(3.9); // => 3: 剪掉分数部分得到整数
Math.fround(x); // 舍入到最接近的32位符点数
Math.sinh(x); // 双曲线正弦. 还有 Math.cosh(), Math.tanh()
Math.asinh(x); // 双曲线反正弦. 还有 Math.acosh(), Math.atanh()
```

Arithmetic in JavaScript does not raise errors in cases of overflow, underflow, or division by zero. When the result of a numeric operation is larger than the largest representable number (overflow), the result is a special infinity value, `Infinity`. Similarly, when the absolute value of a negative value becomes larger than the absolute value of the largest representable negative number, the result is negative infinity, `-Infinity`. The infinite values behave as you would expect: adding, subtracting, multiplying, or dividing them by anything results in an infinite value (possibly with the sign reversed).

::: tip 翻译
JavaScript 中的算术在遇到上溢出、下溢出或被零除时不会发生错误。在数值操作的结果超过最大可表示数值时（上溢出），结果是一个特殊的无穷值`Infinity`。类似地，当某个负数的绝对值超过了最大可表示负数的绝对值时，结果是负无穷值`-Infinity`。这两个无穷值的行为跟我们的预期一样：任何数加、减、乘、除无穷值结果还是无穷值（只是符号可能相反）。
:::

Underflow occurs when the result of a numeric operation is closer to zero than the smallest representable number. In this case, JavaScript returns 0. If underflow occurs from a negative number, JavaScript returns a special value known as “negative zero.” This value is almost completely indistinguishable from regular zero and JavaScript programmers rarely need to detect it.

::: tip 翻译
下溢出发生在数值操作的结果比最小可表示数值更接近 0 的情况下。此时，JavaScript 返回 0。如果下溢出来自负数，JavaScript 返回一个被称为“负零”的特殊值。这个值与常规的零几乎完全无法区分，JavaScript 程序员极少需要检测它。
:::

Division by `zero` is not an error in JavaScript: it simply returns infinity or negative infinity. There is one exception, however: zero divided by zero does not have a well defined value, and the result of this operation is the special not-a-number value, `NaN`. `NaN` also arises if you attempt to divide infinity by infinity, take the square root of a negative number, or use arithmetic operators with non-numeric operands that cannot be converted to numbers.

::: tip 翻译
被零除在 JavaScript 中不是错误，只会简单地返回无穷或负无穷。不过有一个例外：0 除以 0 是没有意义的值，这个操作的结果是一个特殊的“非数值”（`NaN`，Not a Number）。此外，无穷除无穷、负数平方根或者用无法转换为数值的非数值作为算术操作符的操作数，结果也都是`NaN`。
:::

JavaScript predefines global constants `Infinity` and `NaN` to hold the positive infinity and not-a-number value, and these values are also available as properties of the Number object:

::: tip 翻译
JavaScript 预定义了全局常量`Infinity`和`NaN`以对应正无穷和非数值。这些值也可以通过 Number 对象的属性获取：
:::

```js
Infinity; // 因为太大而无法表示的正数
Number.POSITIVE_INFINITY; // 同上
1 / 0; // => Infinity
Number.MAX_VALUE * 2; // => Infinity; 溢出
-Infinity; // 因为太大而无法表示的负数
Number.NEGATIVE_INFINITY; // 同上
-1 / 0; // => -Infinity
-Number.MAX_VALUE * 2; // => -Infinity

NaN; // 非数值
Number.NaN; // 同上，写法不同
0 / 0; // => NaN
Infinity / Infinity; // => NaN

Number.MIN_VALUE / 2; // => 0: 下溢出
-Number.MIN_VALUE / 2; // => -0: 负零
-1 / Infinity; // -> -0: 也是负零
-0;

// ES6定义了下列Number属性
Number.parseInt(); // 同全局 parseInt() 函数
Number.parseFloat(); // 同全局 parseFloat() 函数
Number.isNaN(x); // 判断 x 是不是 NaN ?
Number.isFinite(x); // 判断 x 是数值还是无穷 ?
Number.isInteger(x); // 判断 x 是不是整数?
Number.isSafeInteger(x); // 判断 x 是不是整数 -(2**53) < x < 2**53?
Number.MIN_SAFE_INTEGER; // => -(2**53 - 1)
Number.MAX_SAFE_INTEGER; // => 2**53 - 1
Number.EPSILON; // => 2**-52: 数值与数值之间最小的差
```

The not-a-number value has one unusual feature in JavaScript: it does not compare equal to any other value, including itself. This means that you can’t write `x === NaN` to determine whether the value of a variable `x` is `NaN`. Instead, you must write `x != x` or `Number.isNaN(x)`. Those expressions will be `true` if, and only if, `x` has the same value as the global constant `NaN`.

::: tip 翻译
非数值在 JavaScript 中有一个不同寻常的特性：它与任何值比较都不相等，也不等于自己。这意味着不能通过`x === NaN`来确定某个变量`x`的值是`NaN`。相反，此时必须写成`x != x`或 `Number.isNaN(x)`。这两个表达式当且仅当`x`与全局常量`NaN`具有相同值时才返回`true`。
:::

The global function `isNaN()` is similar to `Number.isNaN()`. It returns `true` if its argument is `NaN`, or if that argument is a non-numeric value that cannot be converted to a number. The related function `Number.isFinite()` returns true if its argument is a number other than `NaN`, `Infinity`, or `-Infinity`. The global `isFinite()` function returns `true` if its argument is, or can be converted to, a finite number.

::: tip 翻译
全局函数`isNaN()`与`Number.isNaN()`类似。它会在参数是`NaN`时，或者在参数是无法转换为数值的非数值时返回`true`。相关的函数`Number.isFinite()`在参数不是`NaN`、`Infinity`或`-Infinity`时返回`true`。全局`isFinite()`函数在参数是有限数或者可以转换为有限数时返回`true`。
:::

The negative zero value is also somewhat unusual. It compares equal (even using JavaScript’s strict equality test) to positive zero, which means that the two values are almost indistinguishable, except when used as a divisor:

::: tip 翻译
负零值也有点不同寻常。它与正零值相等（即便使用 JavaScript 的严格相等比较），这意味着除了作为除数使用，几乎无法区分这两个值：
:::

```js
let zero = 0; // 常规的零
let negz = -0; // 负零
zero === negz; // => true: 零等于负零
1 / zero === 1 / negz; // => false: Infinity 与 -Infinity 不等
```

### 二进制浮点数与舍入错误

There are infinitely many real numbers, but only a finite number of them (18,437,736,874,454,810,627, to be exact) can be represented exactly by the JavaScript floating-point format. This means that when you’re working with real numbers in JavaScript, the representation of the number will often be an approximation of the actual number.

::: tip 翻译
实数有无限多个，但 JavaScript 的浮点格式只能表示其中有限个（确切地说，是 18,437,736,874,454,810,627 个）。这意味着在通过 JavaScript 操作实数时，数值表示的经常是实际数值的近似值。
:::

The IEEE-754 floating-point representation used by JavaScript (and just about every other modern programming language) is a binary representation, which can exactly represent fractions like `1/2`, `1/8`, and `1/1024`. Unfortunately, the fractions we use most commonly (especially when performing financial calculations) are decimal fractions: `1/10`, `1/100`, and so on. Binary floating-point representations cannot exactly represent numbers as simple as `0.1`.

::: tip 翻译
JavaScript（以及所有现代编程语言）使用的 IEEE-754 浮点表示法是一种二进制表示法，这种表示法可以精确地表示如`1/2`、`1/8`和`1/1024`等分数。然而，我们最常用的分数（特别是在进行财务计算时）是十进制分数：`1/10`、`1/100`，等等。二进制浮点表示法无法精确表示哪怕`0.1`这么简单的数。
:::

JavaScript numbers have plenty of precision and can approximate 0.1 very closely. But the fact that this number cannot be represented exactly can lead to problems. Consider this code:

::: tip 翻译
虽然 JavaScript 数值有足够大的精度，能够非常近似地表示`0.1`，但无法精确地表示。这可能导致一些问题。比如以下代码：
:::

```js
let x = 0.3 - 0.2; // 30美分减20美分
let y = 0.2 - 0.1; // 20美分减10美分
x === y; // => false: 这两个值不一样！
x === 0.1; // => false: .3-.2 不等于 .1
y === 0.1; // => true: .2-.1 等于 .1
```

Because of rounding error, the difference between the approximations of .3 and .2 is not exactly the same as the difference between the approximations of .2 and .1. It is important to understand that this problem is not specific to JavaScript: it affects any programming language that uses binary floating-point numbers. Also, note that the values `x` and `y` in the code shown here are _very_ close to each other and to the correct value. The computed values are adequate for almost any purpose; the problem only arises when we attempt to compare values for equality.

::: tip 翻译
由于舍入错误，`.3`和`.2`近似值的差与`.2`和`.1`近似值的差并不相等。这并不是 JavaScript 独有的问题，而是所有使用二进制浮点数的编程语言共同的问题。同样，也要注意代码中 x 和 y 的值极其接近，它们也都极其接近正确的值。这个计算得到的值完全能够满足任何需要，切记不要试图比较它们的相等性。
:::

If these floating-point approximations are problematic for your programs, consider using scaled integers. For example, you might manipulate monetary values as integer cents rather than fractional dollars.

::: tip 翻译
如果浮点近似值对你的程序而言是个问题，可以考虑使用等量整数。例如，计算与钱数有关的数值时可以使用整数形式的美分，而不是零点几美元。
:::

### 通过 BigInt 表示任意精度整数

One of the newest features of JavaScript, defined in ES2020, is a new numeric type known as BigInt. As of early 2020, it has been implemented in Chrome, Firefox, Edge, and Node, and there is an implementation in progress in Safari. As the name implies, BigInt is a numeric type whose values are integers. The type was added to JavaScript mainly to allow the representation of 64-bit integers, which are required for compatibility with many other programming languages and APIs. But BigInt values can have thousands or even millions of digits, should you have need to work with numbers that large. (Note, however, that BigInt implementations are not suitable for cryptography because they do not attempt to prevent timing attacks.)

::: tip 翻译
ES2020 为 JavaScript 定义了一种新的数值类型 BigInt。2020 年年初，Chrome、Firefox、Edge 和 Node 都实现了这个类型，Safari 也在实现中。顾名思义，BigInt 这种数值类型的值是整数。之所以增加这个类型，主要是为了表示 64 位整数，这对于兼容很多其他语言和 API 是必需的。但 BigInt 值可能有数千甚至数百万个数字，可以满足对大数的需求（不过，BigInt 的实现并不适合加密，因为它们没有考虑防止时序攻击）。
:::

BigInt literals are written as a string of digits followed by a lowercase letter `n`. By default, the are in base 10, but you can use the `0b`, `0o`, and `0x` prefixes for binary, octal, and hexadecimal BigInt:

::: tip 翻译
BigInt 字面量写作一串数字后跟小写字母`n`。默认情况下，基数是`10`，但可以通过前缀`0b`、`0o`和`0x`来表示二进制、八进制和十六进制 BigInt：
:::

```js
1234n; // 一个不太大的BigInt字面量
0b111111n; // 二进制BigInt
0o7777n; // 八进制BigInt
0x8000000000000000n; // => 2n**63n: 一个64位整数
```

You can use `BigInt()` as a function for converting regular JavaScript numbers or strings to BigInt values:

::: tip 翻译
可以用 `BigInt()`函数把常规 JavaScript 数值或字符串转换为 BigInt 值：
:::

```js
BigInt(Number.MAX_SAFE_INTEGER); // => 9007199254740991n
let string = "1" + "0".repeat(100); // 1 后跟  100 个零.
BigInt(string); // => 10n**100n: 一个天文数字
```

Arithmetic with BigInt values works like arithmetic with regular JavaScript numbers, except that division drops any remainder and rounds down (toward zero):

::: tip 翻译
BigInt 值的算术运算与常规 JavaScript 数值的算术运算类似，只不过除法会丢弃余数并且会向下（向零）舍入：
:::

```js
1000n + 2000n; // => 3000n
3000n - 2000n; // => 1000n
2000n * 3000n; // => 6000000n
3000n / 997n; // => 3n: 商是 3
3000n % 997n; // 9n: 余数是 9
2n ** 131071n - 1n; // 有 39457 位数字的梅森素数
```

Although the standard `+`, `-`, `*`, `/`, `%`, and `**` operators work with BigInt, it is important to understand that you may not mix operands of type BigInt with regular number operands. This may seem confusing at first, but there is a good reason for it. If one numeric type was more general than the other, it would be easy to define arithmetic on mixed operands to simply return a value of the more general type. But neither type is more general than the other: BigInt can represent extraordinarily large values, making it more general than regular numbers. But BigInt can only represent integers, making the regular JavaScript number type more general. There is no way around this problem, so JavaScript sidesteps it by simply not allowing mixed operands to the arithmetic operators.

::: tip 翻译
虽然标准的`+`、`-`、`*`、`/`、`%`和`**`操作符可以用于 BigInt，但不能混用 BigInt 操作数和常规数值操作数。乍一看这个规则有点奇怪，但实际上是合理的。如果一种数值类型比另一种更通用，则比较容易定义混合操作数的计算并返回更通用的类型。但上述两种类型都不比另一种更通用：BigInt 可以表示超大值，因此它比常规数值更通用。但 BigInt 只能表示整数，这样看常规 JavaScript 数值类型反而更通用。这个问题无论如何也解决不了，因此 JavaScript 搁置了这个问题，只是简单地不允许在使用算术操作符时混用这两种类型的操作数。
:::

Comparison operators, by contrast, do work with mixed numeric types (but see §3.9.1 for more about the difference between `==` and `===`):

::: tip 翻译
相对来说，比较操作符允许混合操作数类型（关于`==`和`===`的区别，可以参考 3.9.1 节）：
:::

```js
1 < 2n; // => true
2 > 1n; // => true
0 == 0n; // => true
0 === 0n; // => false:  === 也检查类型是否相等l
```

The bitwise operators (described in §4.8.3) generally work with BigInt operands. None of the functions of the `Math` object accept BigInt operands, however.

::: tip 翻译
位操作符（4.8.3 节介绍）通常可以用于 BigInt 操作数。但`Math`对象的任何函数都不接收 BigInt 操作数。
:::

### 日期和时间

JavaScript defines a simple Date class for representing and manipulating the numbers that represent dates and times. JavaScript Dates are objects, but they also have a numeric representation as a _timestamp_ that specifies the number of elapsed milliseconds since January 1, 1970:

::: tip 翻译
JavaScript 为表示和操作与日期及时间相关的数据而定义了简单的 Date 类。JavaScript 的 Date 是对象，但也有数值表示形式，即自 1970 年 1 月 1 日起至今的毫秒数，也叫 _时间戳_：
:::

```js
let timestamp = Date.now(); // 当前时间的时间戳（数值）
let now = new Date(); // 当前时间的日期对象
let ms = now.getTime(); // 转换为毫秒时间戳
let iso = now.toISOString(); // 转换为标准格式的字符串
```

The Date class and its methods are covered in detail in §11.4. But we will see Date objects again in §3.9.3 when we examine the details of JavaScript type conversions.

::: tip 翻译
Date 类及其方法在 11.4 节有详细介绍。但在 3.9.3 节探讨 JavaScript 类型转换时，我们也会提到 Date 对象。
:::

## 文本

The JavaScript type for representing text is the _string_. A string is an immutable ordered sequence of 16-bit values, each of which typically represents a Unicode character. The _length_ of a string is the number of 16-bit values it contains. JavaScript’s strings (and its arrays) use zero-based indexing: the first 16-bit value is at position 0, the second at position 1, and so on. The _empty string_ is the string of length 0. JavaScript does not have a special type that represents a single element of a string. To represent a single 16-bit value, simply use a string that has a length of 1.

::: tip 翻译
JavaScript 中表示文本的类型是 String，即字符串。字符串是 16 位值的不可修改的有序序列，其中每个值都表示一个 Unicode 字符。字符串的 length 属性是它包含的 16 位值的个数。JavaScript 的
字符串（以及数组）使用基于零的索引，因此第一个 16 位值的索引是 0，第二个值的索引是 1，以此类推。空字符串是长度为 0 的字符串。JavaScript 没有表示单个字符串元素的专门类型。要表示一个 16 位值，使用长度为 1 的字符串即可。
:::

> **Characters, Codepoints, and JavaScript Strings**
>
> JavaScript uses the UTF-16 encoding of the Unicode character set, and JavaScript strings are sequences of unsigned 16-bit values. The most commonly used Unicode characters (those from the “basic multilingual plane”) have codepoints that fit in 16 bits and can be represented by one element of a string. Unicode characters whose codepoints do not fit in 16 bits are encoded using the rules of UTF-16 as a sequence (known as a “surrogate pair”) of two 16-bit values. This means that a JavaScript string of length 2 (two 16-bit values) might represent only a single Unicode character:
>
> ```js
> let euro = "€";
> let love = "❤";
> euro.length; // => 1: this character has one 16-bit element
> love.length; // => 2: UTF-16 encoding of ❤ is "\ud83d\udc99"
> ```
>
> Most string-manipulation methods defined by JavaScript operate on 16-bit values, not characters. They do not treat surrogate pairs specially, they perform no normalization of the string, and don’t even ensure that a string is well-formed UTF-16.
>
> In ES6, however, strings are _iterable_, and if you use the `for/of` loop or `...` operator with a string, it will iterate the actual characters of the string, not the 16-bit values.

> **字符、码点和 JavaScript 字符串**
>
> JavaScript 使用 Unicode 字符集的 UTF-16 编码，因此 JavaScript 字符串是无符号 16 位值的序列。最常用的 Unicode 字符（即“基本多语言平面”中的字符）的码点（codepoint）是 16 位的，可以用字符串中的一个元素来表示。码点超出 16 位的 Unicode 字符使用 UTF-16 规则编码为两个 16 位值的序列（称为 surrogate pair，即“代理对”）。这意味着一个长度为 2（两个 16 位值）的 JavaScript 字符串可能表示的只是一个 Unicode 字符：
>
> ```js
> let euro = "€";
> let love = "❤";
> euro.length; // => 1: 这个字符是一个16位的元素
> love.length; // => 2: ❤ 的UTF-16编码是 "\ud83d\udc99"
> ```
>
> JavaScript 的字符串操作方法一般操作的是 16 位值，而不是字符。换句话说，它们不会特殊对待代理对，不对字符串进行归一化，甚至不保证字符串是格式正确的 UTF-16。
>
> 但在 ES6 中，字符串是可迭代的，如果对字符串使用`for/of`循环或`...`操作符，迭代的是字符而不是 16 位值。

### 字符串字面量

To include a string in a JavaScript program, simply enclose the characters of the string within a matched pair of single or double quotes or backticks (`'` or `"` or <code>\`</code>). Double-quote characters and backticks may be contained within strings delimited by single-quote characters, and similarly for strings delimited by double quotes and backticks. Here are examples of string literals:

::: tip 翻译
要在 JavaScript 程序中包含字符串，可以把字符串放到一对匹配的单引号、双引号或者反引号（'、"或`）中。双引号字符和反引号可以出现在由单引号定界的字符串中，同理由双引号和反引号定界的字符串里也可以包含另外两种引号。下面是几个字符串字面量的例子：
:::

```js
""; // 空字符串，即有零个字符
"testing";
"3.14";
'name="myform"';
"Wouldn't you prefer O'Reilly's book?";
"τ is the ratio of a circle's circumference to its radius"`"She said 'hi'", he said.`;
```

Strings delimited with backticks are a feature of ES6, and allow JavaScript expressions to be embedded within (or interpolated into) the string literal. This expression interpolation syntax is covered in §3.3.4.

::: tip 翻译
使用反引号定界字符串是 ES6 的特性，允许在字符串字面量中包含（或插入）JavaScript 表达式。3.3.4 节将介绍这种表达式插值语法。
:::

The original versions of JavaScript required string literals to be written on a single line, and it is common to see JavaScript code that creates long strings by concatenating single-line strings with the `+` operator. As of ES5, however, you can break a string literal across multiple lines by ending each line but the last with a backslash (`\`). Neither the backslash nor the line terminator that follow it are part of the string literal. If you need to include a newline character in a single-quoted or double-quoted string literal, use the character sequence `\n` (documented in the next section). The ES6 backtick syntax allows strings to be broken across multiple lines, and in this case, the line terminators are part of the string literal:

::: tip 翻译
JavaScript 最早的版本要求字符串字面量必须写在一行，使用`+`操作符把单行字符串拼接成长字符串的 JavaScript 代码随处可见。到了 ES5，我们可以在每行末尾加一个反斜杠（`\`）从而把字符串字面量写到多行上。这个反斜杠和它后面的行终结符都不属于字符串字面量。如果需要在单引号或双引号字符串中包含换行符，需要使用字符序列`\n`（下一节讲述）。ES6 的反引号语法支持跨行字符串，而行终结符也是字符串字面量的一部分：
:::

```js
// 写在一行但表示两行的字符串：
"two\nlines";

// 写在三行但只有一行的字符串：
"one\
 long\
 line";

// 写在两行实际也是两行的字符串：
`the newline character at the end of this line
is included literally in this string`;
```

Note that when you use single quotes to delimit your strings, you must be careful with English contractions and possessives, such as can’t and O’Reilly’s. Since the apostrophe is the same as the single-quote character, you must use the backslash character (`\`) to “escape” any apostrophes that appear in single-quoted strings (escapes are explained in the next section).

::: tip 翻译
注意，在使用单引号定界字符串时，必须注意英文中的缩写和所有格，比如 can't 和 O'Reilly 中的单引号。因为这里的撇号就是单引号，所以必须使用反斜杠字符（`\`）“转义”单引号中出现的所有撇号（下一节讲解转义）。
:::

In client-side JavaScript programming, JavaScript code may contain strings of HTML code, and HTML code may contain strings of JavaScript code. Like JavaScript, HTML uses either single or double quotes to delimit its strings. Thus, when combining JavaScript and HTML, it is a good idea to use one style of quotes for JavaScript and the other style for HTML. In the following example, the string “Thank you” is single quoted within a JavaScript expression, which is then double-quoted within an HTML event-handler attribute:

::: tip 翻译
在客户端 JavaScript 编程中，JavaScript 代码中可能包含 HTML 代码的字符串，而 HTML 代码中也可能包含 JavaScript 代码。与 JavaScript 类似，HTML 使用单引号或双引号来定界字符串。为此，如果要将 JavaScript 和 HTML 代码混合在一起，最好 JavaScript 和 HTML 分别使用不同的引号。在下面的例子中，JavaScript 表达式中的字符串“Thank you”使用了单引号，而 HTML 事件处理程序属性则使用了双引号：
:::

```html
<button onclick="alert('Thank you')">Click Me</button>
```

### 字符串字面量中的转义序列

The backslash character (`\`) has a special purpose in JavaScript strings. Combined with the character that follows it, it represents a character that is not otherwise representable within the string. For example, `\n` is an _escape sequence_ that represents a newline character.

::: tip 翻译
反斜杠在 JavaScript 字符串中有特殊的作用：它与后面的字符组合在一起，可以在字符串中表示一个无法直接表示的字符。例如，`\n`是一个表示换行符的转义序列。
:::

Another example, mentioned earlier, is the `\'` escape, which represents the single quote (or apostrophe) character. This escape sequence is useful when you need to include an apostrophe in a string literal that is contained within single quotes. You can see why these are called escape sequences: the backslash allows you to escape from the usual interpretation of the single-quote character. Instead of using it to mark the end of the string, you use it as an apostrophe:

::: tip 翻译
前面还提到了另一个例子`\'`，表示单引号（或撇号）字符。这种转义序列在以单引号定界字符串时，可以用来在字符串中包含撇号。之所以称之为转义序列，就是反斜杠转换了通常意义上单引号的含义。转义之后，它不再表示字符串结束，而是表示撇号：
:::

```js
'You\'re right, it can\'t be a quote';
```

Table 3-1 lists the JavaScript escape sequences and the characters they represent. Three escape sequences are generic and can be used to represent any character by specifying its Unicode character code as a hexadecimal number. For example, the sequence `\xA9` represents the copyright symbol, which has the Unicode encoding given by the hexadecimal number `A9`. Similarly, the `\u` escape represents an arbitrary Unicode character specified by four hexadecimal digits or one to five digits when the digits are enclosed in curly braces: `\u03c0` represents the character `π`, for example, and `\u{1f600}` represents the “grinning face” emoji.

::: tip 翻译
表 3-1 列出了 JavaScript 中的转义序列及它们表示的字符。其中 3 个转义序列是通用的，可以指定十六进制数字形式的 Unicode 字符编码来表示任何字符。例如，`\xA9`表示版权符号，其中包含十六进制数字形式的 Unicode 编码`A9`。类似地，`\u`表示通过 4 位十六进制数字指定的任意 Unicode 字符，如果数字包含在一对花括号中，则是 1 到 6 位数字。例如，`\u03c0`表示字符`π`，`\u{1f600}`表示“开口笑”表情符号。
:::

_Table 3-1. JavaScript escape sequences_

| Sequence | Character represented                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| \0       | The NUL character (\u0000)                                                                                               |
| \b       | Backspace (\u0008)                                                                                                       |
| \t       | Horizontal tab (\u0009)                                                                                                  |
| \n       | Newline (\u000A)                                                                                                         |
| \v       | Vertical tab (\u000B)                                                                                                    |
| \f       | Form feed (\u000C)                                                                                                       |
| \r       | Carriage return (\u000D)                                                                                                 |
| \"       | Double quote (\u0022)                                                                                                    |
| \'       | Apostrophe or single quote (\u0027)                                                                                      |
| \\       | Backslash (\u005C)                                                                                                       |
| \xnn     | The Unicode character specified by the two hexadecimal digits nn                                                         |
| \unnnn   | The Unicode character specified by the four hexadecimal digits nnnn                                                      |
| \u{n}    | The Unicode character specified by the codepoint n, where n is one to six hexadecimal digits between 0 and 10FFFF (ES6). |

If the `\` character precedes any character other than those shown in Table 3-1, the backslash is simply ignored (although future versions of the language may, of course, define new escape sequences). For example, `\#` is the same as `#`. Finally, as noted earlier, ES5 allows a backslash before a line break to break a string literal across multiple lines.

::: tip 翻译
如果字符`\`位于任何表 3-1 之外的字符前面，则这个反斜杠会被忽略（当然，语言将来的版本有可能定义新转义序列）。例如，`\#`等同于`#`。最后，如前所述，ES5 允许把反斜杠放在换行符前面从而将一个字符串字面量拆成多行。
:::

### 使用字符串

One of the built-in features of JavaScript is the ability to _concatenate_ strings. If you use the `+` operator with numbers, it adds them. But if you use this operator on strings, it joins them by appending the second to the first. For example:

::: tip 翻译
拼接字符串是 JavaScript 的一个内置特性。如果对数值使用`+`操作符，那数值会相加。如果对字符串使用`+`操作符，那字符串会拼接起来（第二个在第一个后面）。例如：
:::

```js
let msg = "Hello, " + "world"; // Produces the string "Hello, world"
let greeting = "Welcome to my blog," + " " + name;
```

Strings can be compared with the standard `===` equality and `!==` inequality operators: two strings are equal if and only if they consist of exactly the same sequence of 16-bit values. Strings can also be compared with the `<`, `<=`, `>`, and `>=` operators. String comparison is done simply by comparing the 16-bit values. (For more robust locale-aware string comparison and sorting, see §11.7.3.)

::: tip 翻译
可以使用标准的全等`===`和不全等`!==`操作符比较字符串。只有当这两个字符串具有完全相同的 16 位值的序列时才相等。字符串也可以使用`<`、`<=`、`>`和`>=`操作符来比较。字符串比较是通过比较 16 位值完成的（要了解更多关于更可靠的地区相关字符串的比较，可以参考 11.7.3 节）。
:::

To determine the length of a string—the number of 16-bit values it contains—use the length property of the string:

::: tip 翻译
要确定一个字符串的长度（即字符串包含的 16 位值的个数），可以使用字符串的`length`属性：
:::

```js
s.length;
```

In addition to this `length` property, JavaScript provides a rich API for working with strings:

::: tip 翻译
除了`length`属性之外，JavaScript 还提供了操作字符串的丰富 API：
:::

```js
let s = "Hello, world"; // 先声明一个字符串.

// 取得字符串的一部分
s.substring(1, 4); // => "ell": 第2～4个字符.
s.slice(1, 4); // => "ell": 同上
s.slice(-3); // => "rld": 最后3个字符
s.split(", "); // => ["Hello", "world"]: 从定界符处拆开

// 搜索字符串
s.indexOf("l"); // => 2: 第一个字母 l 的位置
s.indexOf("l", 3); // => 3: 位置3后面第一个"l"的位置
s.indexOf("zz"); // => -1: s 并不包含子串 "zz"
s.lastIndexOf("l"); // => 10: 最后一个字母 l 的位置

// ES6及之后版本中的布尔值搜索函数
s.startsWith("Hell"); // => true: 字符串是以这些字符开头的
s.endsWith("!"); // => false: s不是以它结尾的
s.includes("or"); // => true: s 包含子串 "or"

// 创建字符串的修改版本
s.replace("llo", "ya"); // => "Heya, world"
s.toLowerCase(); // => "hello, world"
s.toUpperCase(); // => "HELLO, WORLD"
s.normalize(); // Unicode NFC 归一化: ES6 新增
s.normalize("NFD"); // NFD 归一化. 还有 "NFKC", "NFKD"

// 访问字符串中的个别（16位值）字符
s.charAt(0); // => "H": 第一个字符
s.charAt(s.length - 1); // => "d": 最后一个字符
s.charCodeAt(0); // => 72: 指定位置的16位数值
s.codePointAt(0); // => 72: ES6, 适用于码点大于16位的情形

// ES2017 新增的字符串填充函数
"x".padStart(3); // => " x": 在左侧添加空格，让字符串长度变成3
"x".padEnd(3); // => "x ": 在右侧添加空格，让字符串长度变成3
"x".padStart(3, "*"); // => "**x":在左侧添加星号，让字符串长度变成3
"x".padEnd(3, "-"); // => "x--": 在右侧添加破折号，让字符串长度变成3

// 删除空格函数，trim()是ES5就有的，其他是 ES2019 增加的
" test ".trim(); // => "test":删除开头和末尾的空格
" test ".trimStart(); // => "test ": 删除左侧空格，也叫 trimLeft
" test ".trimEnd(); // => " test":删除右侧空格， 也叫 trimRight

// 未分类字符串方法
s.concat("!"); // => "Hello, world!": 可以用 +操作符代替
"<>".repeat(5); // => "<><><><><>": 拼接n次. ES6新增
```

Remember that strings are immutable in JavaScript. Methods like `replace()` and `toUpperCase()` return new strings: they do not modify the string on which they are invoked.

::: tip 翻译
记住，JavaScript 中的字符串是不可修改的。像 `replace()` 和 `toUpperCase()` 这样的方法都返回新字符串，它们并不会修改调用它们的字符串。
:::

Strings can also be treated like read-only arrays, and you can access individual characters (16-bit values) from a string using square brackets instead of the `charAt()` method:

::: tip 翻译
字符串也可以被当成只读数组，使用方括号而非 `charAt()` 方法访问字符串中个别的字符（16 位值）：
:::

```js
let s = "hello, world";
s[0]; // => "h"
s[s.length - 1]; // => "d"
```

### 模版字面量

In ES6 and later, string literals can be delimited with backticks:

::: tip 翻译
在 ES6 及之后的版本中，字符串字面量可以用反引号来定界：
:::

```js
let s = `hello world`;
```

This is more than just another string literal syntax, however, because these _template literals_ can include arbitrary JavaScript expressions. The final value of a string literal in backticks is computed by evaluating any included expressions, converting the values of those expressions to strings and combining those computed strings with the literal characters within the backticks:

::: tip 翻译
不过，这不仅仅是一种新的字符串字面量语法，因为模板字面量可以包含任意 JavaScript 表达式。反引号中字符串字面量最终值的计算，涉及对其中包含的所有表达式求值、将这些表达式的值转换为字符串，然后再把这些字符串与反引号中的字面量组合：
:::

```js
let name = "Bill";
let greeting = `Hello ${name}.`; // greeting == "Hello Bill."
```

Everything between the `${` and the matching `}` is interpreted as a JavaScript expression. Everything outside the curly braces is normal string literal text. The expression inside the braces is evaluated and then converted to a string and inserted into the template, replacing the dollar sign, the curly braces, and everything in between them.

::: tip 翻译
位于 `${` 和对应的 `}` 之间的内容都被当作 JavaScript 表达式来解释。而位于这对花括号之外的则是常规字符串字面量。括号内的表达式会被求值，然后转换为字符串并插入模板中，替换美元字符、花括号以及花括号中的所有内容。
:::

A template literal may include any number of expressions. It can use any of the escape characters that normal strings can, and it can span any number of lines, with no special escaping required. The following template literal includes four JavaScript expressions, a Unicode escape sequence, and at least four newlines (the expression values may include newlines as well):

::: tip 翻译
模板字面量可以包含任意数量的表达式，可以包含任何常规字符串中可以出现的转义字符，也可以跨任意多行而无须特殊转义。下面的模板字面量包含 4 个 JavaScript 表达式、1 个 Unicode 转义序列和至少 4 个换行符（表达式的值也可能包含换行符）：
:::

```js
let errorMessage = `\
\u2718 Test failure at ${filename}:${linenumber}:
${exception.message}
Stack trace:
${exception.stack}
`;
```

The backslash at the end of the first line here escapes the initial newline so that the resulting string begins with the Unicode ✘ character (`\u2718`) rather than a newline.

::: tip 翻译
这里第一行末尾的反斜杠转义了第一个换行符，因此最终字符串的第一个字符是 Unicode 字符 ✘（`\u2718`）而非换行符。
:::

#### 标签化模版字面量

A powerful but less commonly used feature of template literals is that, if a function name (or “tag”) comes right before the opening backtick, then the text and the values of the expressions within the template literal are passed to the function. The value of this “tagged template literal” is the return value of the function. This could be used, for example, to apply HTML or SQL escaping to the values before substituting them into the text.

::: tip 翻译
模板字面量有一个强大但不太常用的特性：如果在开头的反引号前面有一个函数名（标签），那么模板字面量中的文本和表达式的值将作为参数传给这个函数。“标签化模板字面量”（tagged template literal）的值就是这个函数的返回值。这个特性可以用于先对某些值进行 HTML 或 SQL 转义，然后再把它们插入文本。
:::

ES6 has one built-in tag function: `String.raw()`. It returns the text within backticks without any processing of backslash escapes:

::: tip 翻译
ES6 提供了一个内置的标签函数：`String.raw()`。这个函数返回反引号中未经处理的文本，即不会处理任何反斜杠转义：
:::

```js
`\n`.length; // => 1: 字符串中只包含一个换行符
String.raw`\n`.length; // => 2: 一个反斜杠字符和一个字母n
```

Note that even though the tag portion of a tagged template literal is a function, there are no parentheses used in its invocation. In this very specific case, the backtick characters replace the open and close parentheses.

::: tip 翻译
注意，即使标签化模板字面量的标签部分是函数，在调用这个函数时也没有圆括号。在这种非常特别的情况下，反引号字符充当开头和末尾的圆括号。
:::

The ability to define your own template tag functions is a powerful feature of JavaScript. These functions do not need to return strings, and they can be used like constructors, as if defining a new literal syntax for the language. We’ll see an example in §14.5.

::: tip 翻译
可以自定义模板标签函数是 JavaScript 的一个非常强大的特性。这些函数不需要返回字符串，可以被当成构造函数使用，就像为语言本身定义了一种新的字面量语法一样。14.5 节将介绍这样一个例子。
:::

### 模式匹配

JavaScript defines a datatype known as a _regular expression_ (or RegExp) for describing and matching patterns in strings of text. RegExps are not one of the fundamental datatypes in JavaScript, but they have a literal syntax like numbers and strings do, so they sometimes seem like they are fundamental. The grammar of regular expression literals is complex and the API they define is nontrivial. They are documented in detail in §11.3. Because RegExps are powerful and commonly used for text processing, however, this section provides a brief overview.

::: tip 翻译
JavaScript 定义了一种被称为正则表达式（或 RegExp）的数据类型，用于描述和匹配文本中的字符串模式。RegExp 不是 JavaScript 中的基础类型，但具有类似数值和字符串的字面量语法，因此它们有时候看起来像是基础类型。正则表达式字面量的语法很复杂，它们定义的 API 也没那么简单。11.3 节将详细讲述这些内容。由于 RegExp 很强大，且常用于文本处理，因此本节将简单地介绍一下。
:::

Text between a pair of slashes constitutes a regular expression literal. The second slash in the pair can also be followed by one or more letters, which modify the meaning of the pattern. For example:

::: tip 翻译
一对斜杠之间的文本构成正则表达式字面量。这对斜杠中的第二个后面也可以跟一个或多个字母，用于修改模式的含义。例如：
:::

```js
/^HTML/; // 匹配字符串开头的字母 HTML
/[1-9][0-9]*/; // 匹配非0数字，后面跟着任意数字
/\bjavascript\b/i; // 匹配 "javascript" 这个词，不区分大小写
```

RegExp objects define a number of useful methods, and strings also have methods that accept RegExp arguments. For example:

::: tip 翻译
RegExp 对象定义了一些有用的方法，而字符串也有接收 RegExp 参数的方法。例如：
:::

```js
let text = "testing: 1, 2, 3"; // 示例文本
let pattern = /\d+/g; // 匹配一个或多个数字
pattern.test(text); // => true: 存在匹配项
text.search(pattern); // => 9: 第一个匹配项的位置
text.match(pattern); // => ["1", "2", "3"]: 所有匹配项的数组
text.replace(pattern, "#"); // => "testing: #, #, #"
text.split(/\D+/); // => ["","1","2","3"]:基于非数字拆分
```

## 布尔值

A boolean value represents truth or falsehood, on or off, yes or no. There are only two possible values of this type. The reserved words `true` and `false` evaluate to these two values.

::: tip 翻译
布尔值表示真或假、开或关、是或否。这个类型只有两个值：`true` 和 `false` 。
:::

Boolean values are generally the result of comparisons you make in your JavaScript programs. For example:

::: tip 翻译
布尔值在 JavaScript 中通常是比较操作的结果。例如：
:::

```js
a === 4;
```

This code tests to see whether the value of the variable a is equal to the number `4`. If it is, the result of this comparison is the boolean value `true`. If a is not equal to `4`, the result of the comparison is `false`.

::: tip 翻译
以上代码测试变量`a`的值是否等于数值`4`。如果是，则返回`true`；否则返回`false`。
:::

Boolean values are commonly used in JavaScript control structures. For example, the `if/else` statement in JavaScript performs one action if a boolean value is `true` and another action if the value is `false`. You usually combine a comparison that creates a boolean value directly with a statement that uses it. The result looks like this:

::: tip 翻译
布尔值在 JavaScript 常用于控制结构。例如，JavaScript 中的`if/else`语句在布尔值为`true`时会执行一种操作，而在值为`false`时会执行另一种操作。我们经常把产生布尔值的比较表达式直接放在使用布尔值的语句中。结果类似如下：
:::

```js
if (a === 4) {
  b = b + 1;
} else {
  a = a + 1;
}
```

This code checks whether `a` equals `4`. If so, it adds `1` to `b`; otherwise, it adds `1` to `a`.

::: tip 翻译
以上代码检查`a`是否等于`4`，如果等于，则给`b`加`1`；否则，给`a`加`1`。
:::

As we’ll discuss in §3.9, any JavaScript value can be converted to a boolean value. The following values convert to, and therefore work like, `false`:

::: tip 翻译
正如 3.9 节将会介绍的，JavaScript 的任何值都可以转换为布尔值。下面的这些值都会转换为（因而可以被用作）布尔值`false`：
:::

```js
undefined;
null;
0 - 0;
NaN;
(""); // the empty string
```

All other values, including all objects (and arrays) convert to, and work like, `true`. `false`, and the six values that convert to it, are sometimes called _falsy_ values, and all other values are called _truthy_. Any time JavaScript expects a boolean value, a falsy value works like `false` and a truthy value works like `true`.

::: tip 翻译
所有其他值，包括所有对象（和数组）都转换为（可以被用作）布尔值`true`。`false`和可以转换为它的 6 个值有时候也被称为假性值（falsy），而所有其他值则被称为真性值（truthy）。在任何 JavaScript 期待布尔值的时候，假性值都可以当作`false`，而真性值都可以当作`true`。
:::

As an example, suppose that the variable `o` either holds an object or the value `null`. You can test explicitly to see if `o` is non-null with an `if` statement like this:

::: tip 翻译
例如，假设变量`o`要么保存一个对象，要么是值`null`。可以通过一个`if`语句像下面这样检测`o`是否为非空：
:::

```js
if (o !== null) ...
```

The not-equal operator `!==` compares o to `null` and evaluates to either `true` or `false`. But you can omit the comparison and instead rely on the fact that `null` is falsy and objects are truthy:

::: tip 翻译
使用不全等操作符`!==`比较`o`和`null`，求值结果要么是`true`要么是`false`。不过，也可以省略比较，直接依赖`null`是假性值而对象是真性值这个事实：
:::

```js
if (o) ...
```

In the first case, the body of the `if` will be executed only if `o` is not `null`. The second case is less strict: it will execute the body of the `if` only if `o` is not `false` or any falsy value (such as `null` or `undefined`). Which `if` statement is appropriate for your program really depends on what values you expect to be assigned to `o`. If you need to distinguish `null` from `0` and `""`, then you should use an explicit comparison.

::: tip 翻译
第一种情况下，`if`语句的主体只有在`o`不是`null`时才会被执行。第二种情况没那么严格，只要`o`不是`false`或任何其他假性值（如`null`或`undefined`），`if`语句的主体就会执行。哪种`if`语句适合你的程序取决于你期待`o`中保存什么值。如果需要区分`null`和`0`、`""`，那么就应该使用比较表达式。
:::

Boolean values have a `toString()` method that you can use to convert them to the strings “true” or “false”, but they do not have any other useful methods. Despite the trivial API, there are three important boolean operators.

::: tip 翻译
布尔值有一个`toString()`方法，可用于将自己转换为字符串"true"或"false"。除此之外，布尔值再没有其他有用的方法了。除了这个极其简单的 API，还有三种重要的布尔值操作符。
:::

The `&&` operator performs the Boolean AND operation. It evaluates to a truthy value if and only if both of its operands are truthy; it evaluates to a falsy value otherwise. The `||` operator is the Boolean OR operation: it evaluates to a truthy value if either one (or both) of its operands is truthy and evaluates to a falsy value if both operands are falsy. Finally, the unary `!` operator performs the Boolean NOT operation: it evaluates to true if its operand is falsy and evaluates to false if its operand is truthy. For example:

::: tip 翻译
`&&`操作符执行布尔与操作，当且仅当两个操作数都为真时，求值结果才是真；任何一个操作数为假，结果都为假。`||`操作符执行布尔或操作，任何一个操作数为真，求值结果就是真；只有当两个操作数均为假时，结果才是假。一元的`！`操作符执行布尔非操作，如果操作数是假则结果为`true`；如果操作数是真则结果为`false`。例如：
:::

```js
if ((x === 0 && y === 0) || !(z === 0)) {
  // x和y均为0，或者z不是0
```

Full details on these operators are in §4.10.

::: tip 翻译
4.10 节将全面详细地介绍这几个操作符。
:::

## null 与 undefined

`null` is a language keyword that evaluates to a special value that is usually used to indicate the absence of a value. Using the `typeof` operator on `null` returns the string “object”, indicating that null can be thought of as a special object value that indicates “no object”. In practice, however, `null` is typically regarded as the sole member of its own type, and it can be used to indicate “no value” for numbers and strings as well as objects. Most programming languages have an equivalent to JavaScript’s `null`: you may be familiar with it as `NULL`, `nil`, or `None`.

::: tip 翻译
`null`是一个语言关键字，求值为一个特殊值，通常用于表示某个值不存在。对`null`使用`typeof`操作符返回字符串"object"，表明可以将`null`看成一种特殊对象，表示“没有对象”。但在实践中，`null`通常被当作它自己类型的唯一成员，可以用来表示数值、字符串以及对象“没有值”。多数编程语言都有一个与 JavaScript 的`null`等价的值，比如`NULL`、`nil`或`None`。
:::

JavaScript also has a second value that indicates absence of value. The `undefined` value represents a deeper kind of absence. It is the value of variables that have not been initialized and the value you get when you query the value of an object property or array element that does not exist. The `undefined` value is also the return value of functions that do not explicitly return a value and the value of function parameters for which no argument is passed. `undefined` is a predefined global constant (not a language keyword like null, though this is not an important distinction in practice) that is initialized to the `undefined` value. If you apply the `typeof` operator to the undefined value, it returns “undefined”, indicating that this value is the sole member of a special type.

::: tip 翻译
JavaScript 中的 `undefined` 也表示值不存在，但 `undefined` 表示一种更深层次的不存在。具体来说，变量的值未初始化时就是 `undefined`，在查询不存在的对象属性或数组元素时也会得到 `undefined`。另外，没有明确返回值的函数返回的值是 `undefined`，没有传值的函数参数的值也是 `undefined`。`undefined` 是一个预定义的全局常量（而非像 `null` 那样的语言关键字，不过在实践中这个区别并不重要），这个常量的初始化值就是 `undefined`。对 `undefined` 应用 `typeof` 操作符会返回"undefined"，表示这个值是该特殊类型的唯一成员。
:::

Despite these differences, `null` and `undefined` both indicate an absence of value and can often be used interchangeably. The equality operator `==` considers them to be equal. (Use the strict equality operator `===` to distinguish them.) Both are falsy values: they behave like `false` when a boolean value is required. Neither `null` nor `undefined` have any properties or methods. In fact, using `.` or `[]` to access a property or method of these values causes a TypeError.

::: tip 翻译
抛开细微的差别，`null`和`undefined`都可以表示某个值不存在，经常被混用。相等操作符`==`认为它们相等（要区分它们，必须使用全等操作符`===`）。因为它们俩都是假性值，在需要布尔值的情况下，它们都可以当作`false`使用。`null`和`undefined`都没有属性或方法。事实上，使用`.`或`[]`访问这两个值的属性或方法会导致 TypeError。
:::

I consider `undefined` to represent a system-level, unexpected, or error-like absence of value and `null` to represent a program-level, normal, or expected absence of value. I avoid using `null` and `undefined` when I can, but if I need to assign one of these values to a variable or property or pass or return one of these values to or from a function, I usually use `null`. Some programmers strive to avoid `null` entirely and use `undefined` in its place wherever they can.

::: tip 翻译
我认为可以用`undefined`表示一种系统级别、意料之外或类似错误的没有值，可以用`null`表示程序级别、正常或意料之中的没有值。实际编码中，我会尽量避免使用`null`和`undefined`，如果需要给某个变量或属性赋这样一个值，或者需要向函数传入或从函数中返回这样一个值，我通常使用`null`。有些程序员则极力避免使用`null`，而倾向于使用`undefined`。
:::

## Symbols

Symbols were introduced in ES6 to serve as non-string property names. To understand Symbols, you need to know that JavaScript’s fundamental Object type is an unordered collection of properties, where each property has a name and a value. Property names are typically (and until ES6, were exclusively) strings. But in ES6 and later, Symbols can also serve this purpose:

::: tip 翻译
符号（Symbol）是 ES6 新增的一种原始类型，用作非字符串的属性名。要理解符号，需要了解 JavaScript 的基础类型 Object 是一个属性的无序集合，其中每个属性都有一个名字和一个值。属性名通常是（在 ES6 之前一直必须是）字符串。但在 ES6 和之后的版本中，符号也可以作为属性名：
:::

```js
let strname = "string name"; // 可以用作属性名的字符串
let symname = Symbol("propname"); //可以用作属性名的符号
typeof strname; // => "string": strname 是字符串
typeof symname; // => "symbol": symname 是符号
let o = {}; // 创建一个新对象
o[strname] = 1; // 使用字符串名定义一个属性
o[symname] = 2; // 使用符号名定义一个属性
o[strname]; // => 1: 访问字符串名字的属性
o[symname]; // => 2: 访问符号名字的属性
```

The Symbol type does not have a literal syntax. To obtain a Symbol value, you call the `Symbol()` function. This function never returns the same value twice, even when called with the same argument. This means that if you call `Symbol()` to obtain a Symbol value, you can safely use that value as a property name to add a new property to an object and do not need to worry that you might be overwriting an existing property with the same name. Similarly, if you use symbolic property names and do not share those symbols, you can be confident that other modules of code in your program will not accidentally overwrite your properties.

::: tip 翻译
Symbol 类型没有字面量语法。要获取一个 Symbol 值，需要调用`Symbol()`函数。这个函数永远不会返回相同的值，即使每次传入的参数都一样。这意味着可以将调用`Symbol()`取得的符号值安全地用于为对象添加新属性，而无须担心可能重写已有的同名属性。类似地，如果定义了符号属性但没有共享相关符号，也可以确信程序中的其他代码不会意外重写这个属性。
:::

In practice, Symbols serve as a language extension mechanism. When ES6 introduced the `for/of` loop (§5.4.4) and iterable objects (**Chapter 12**), it needed to define standard method that classes could implement to make themselves iterable. But standardizing any particular string name for this iterator method would have broken existing code, so a symbolic name was used instead. As we’ll see in **Chapter 12**, `Symbol.iterator` is a Symbol value that can be used as a method name to make an object iterable.

::: tip 翻译
实践中，符号通常用作一种语言扩展机制。ES6 新增了`for/of`循环（参见 5.4.4 节）和可迭代对象（参见第 12 章），为此就需要定义一种标准的机制让类可以实现，从而把自身变得可迭代。但选择任何特定的字符串作为这个迭代器方法的名字都有可能破坏已有的代码。为此，符号名应运而生。正如第 12 章会介绍的，`Symbol.iterator`是一个符号值，可用作一个方法名，让对象变得可迭代。
:::

The `Symbol()` function takes an optional string argument and returns a unique Symbol value. If you supply a string argument, that string will be included in the output of the Symbol’s `toString()` method. Note, however, that calling `Symbol()` twice with the same string produces two completely different Symbol values.

::: tip 翻译
`Symbol()`函数可选地接收一个字符串参数，返回唯一的符号值。如果提供了字符串参数，那么调用返回符号值的`toString()`方法得到的结果中会包含该字符串。不过要注意，以相同的字符串调用两次`Symbol()`会产生两个完全不同的符号值。
:::

```js
let s = Symbol("sym_x");
s.toString(); // => "Symbol(sym_x)"
```

`toString()` is the only interesting method of Symbol instances. There are two other Symbol-related functions you should know about, however. Sometimes when using Symbols, you want to keep them private to your own code so you have a guarantee that your properties will never conflict with properties used by other code. Other times, however, you might want to define a Symbol value and share it widely with other code. This would be the case, for example, if you were defining some kind of extension that you wanted other code to be able to participate in, as with the `Symbol.iterator` mechanism described earlier.

::: tip 翻译
符号值唯一有趣的方法就是`toString()`。不过，还应该知道两个与符号相关的函数。在使用符号时，我们有时希望它们对代码是私有的，从而可以确保你的代码的属性永远不会与其他代码的属性发生冲突。但有时我们也希望定义一些可以与其他代码共享的符号值。例如，我们定义了某种扩展，希望别人的代码也可以使用，就像前面提到的`Symbol.iterator`机制一样。
:::

To serve this latter use case, JavaScript defines a global Symbol registry. The `Symbol.for()` function takes a string argument and returns a Symbol value that is associated with the string you pass. If no Symbol is already associated with that string, then a new one is created and returned; otherwise, the already existing Symbol is returned. That is, the `Symbol.for()` function is completely different than the `Symbol()` function: `Symbol()` never returns the same value twice, but `Symbol.for()` always returns the same value when called with the same string. The string passed to `Symbol.for()` appears in the output of `toString()` for the returned Symbol, and it can also be retrieved by calling `Symbol.keyFor()` on the returned Symbol.

::: tip 翻译
为了定义一些可以与其他代码共享的符号值，JavaScript 定义了一个全局符号注册表。`Symbol.for()`函数接收一个字符串参数，返回一个与该字符串关联的符号值。如果没有符号与该字符串关联，则会创建并返回一个新符号；否则，就会返回已有的符号。换句话说，`Symbol.for()`与`Symbol()`完全不同：`Symbol()`永远不会返回相同的值，而在以相同的字符串调用时`Symbol.for()`始终返回相同的值。传给`Symbol.for()`的字符串会出现在`toString()`（返回符号值）的输出中。而且，这个字符串也可以通过将返回的符号传给`Symbol.keyFor()`来得到：
:::

```js
let s = Symbol.for("shared");
let t = Symbol.for("shared");
s === t; // => true
s.toString(); // => "Symbol(shared)"
Symbol.keyFor(t); // => "shared"
```

## The Global Object

The preceding sections have explained JavaScript’s primitive types and values. Object types—objects, arrays, and functions—are covered in chapters of their own later in this book. But there is one very important object value that we must cover now. The _global object_ is a regular JavaScript object that serves a very important purpose: the properties of this object are the globally defined identifiers that are available to a JavaScript program. When the JavaScript interpreter starts (or whenever a web browser loads a new page), it creates a new global object and gives it an initial set of properties that define:

- Global constants like `undefined`, `Infinity`, and `NaN`
- Global functions like `isNaN()`, `parseInt()` (§3.9.2), and `eval()` (§4.12)
- Constructor functions like `Date()`, `RegExp()`, `String()`, `Object()`, and `Array()` (§3.9.2)
- Global objects like Math and JSON (§6.8)

The initial properties of the global object are not reserved words, but they deserve to be treated as if they are. This chapter has already described some of these global properties. Most of the others will be covered elsewhere in this book.

In Node, the global object has a property named `global` whose value is the global object itself, so you can always refer to the global object by the name `global` in Node programs.

In web browsers, the Window object serves as the global object for all JavaScript code contained in the browser window it represents. This global Window object has a selfreferential `window` property that can be used to refer to the global object. The Window object defines the core global properties, but it also defines quite a few other globals that are specific to web browsers and client-side JavaScript. Web worker threads (§15.13) have a different global object than the Window with which they are associated. Code in a worker can refer to its global object as `self`.

ES2020 finally defines `globalThis` as the standard way to refer to the global object in any context. As of early 2020, this feature has been implemented by all modern browsers and by Node.

## Immutable Primitive Values and Mutable Object References

There is a fundamental difference in JavaScript between primitive values (`undefined`, `null`, booleans, numbers, and strings) and objects (including arrays and functions). Primitives are immutable: there is no way to change (or “mutate”) a primitive value. This is obvious for numbers and booleans—it doesn’t even make sense to change the value of a number. It is not so obvious for strings, however. Since strings are like arrays of characters, you might expect to be able to alter the character at any specified index. In fact, JavaScript does not allow this, and all string methods that appear to return a modified string are, in fact, returning a new string value. For example:

```js
let s = "hello"; // Start with some lowercase text
s.toUpperCase(); // Returns "HELLO", but doesn't alter s
s; // => "hello": the original string has not changed
```

Primitives are also compared by _value_: two values are the same only if they have the same value. This sounds circular for numbers, booleans, null, and undefined: there is no other way that they could be compared. Again, however, it is not so obvious for strings. If two distinct string values are compared, JavaScript treats them as equal if, and only if, they have the same length and if the character at each index is the same.

Objects are different than primitives. First, they are _mutable_—their values can change:

```js
let o = { x: 1 }; // Start with an object
o.x = 2; // Mutate it by changing the value of a property
o.y = 3; // Mutate it again by adding a new property

let a = [1, 2, 3]; // Arrays are also mutable
a[0] = 0; // Change the value of an array element
a[3] = 4; // Add a new array element
```

Objects are not compared by value: two distinct objects are not equal even if they have the same properties and values. And two distinct arrays are not equal even if they have the same elements in the same order:

```js
let o = { x: 1 },
  p = { x: 1 }; // Two objects with the same properties
o === p; // => false: distinct objects are never equal
let a = [],
  b = []; // Two distinct, empty arrays
a === b; // => false: distinct arrays are never equal
```

Objects are sometimes called _reference types_ to distinguish them from JavaScript’s primitive types. Using this terminology, object values are _references_, and we say that objects are compared _by reference_: two object values are the same if and only if they _refer_ to the same underlying object.

```js
let a = []; // The variable a refers to an empty array.
let b = a; // Now b refers to the same array.
b[0] = 1; // Mutate the array referred to by variable b.
a[0]; // => 1: the change is also visible through variable a.
a === b; // => true: a and b refer to the same object, so they are equal.
```

As you can see from this code, assigning an object (or array) to a variable simply assigns the reference: it does not create a new copy of the object. If you want to make a new copy of an object or array, you must explicitly copy the properties of the object or the elements of the array. This example demonstrates using a for loop (§5.4.3):

```js
let a = ["a", "b", "c"]; // An array we want to copy
let b = []; // A distinct array we'll copy into
for (let i = 0; i < a.length; i++) {
  // For each index of a[]
  b[i] = a[i]; // Copy an element of a into b
}
let c = Array.from(b); // In ES6, copy arrays with Array.from()
```

Similarly, if we want to compare two distinct objects or arrays, we must compare their properties or elements. This code defines a function to compare two arrays:

```js
function equalArrays(a, b) {
  if (a === b) return true; // Identical arrays are equal
  if (a.length !== b.length) return false; // Different-size arrays not equal
  for (let i = 0; i < a.length; i++) {
    // Loop through all elements
    if (a[i] !== b[i]) return false; // If any differ, arrays not equal
  }
  return true; // Otherwise they are equal
}
```

## Type Conversions

JavaScript is very flexible about the types of values it requires. We’ve seen this for booleans: when JavaScript expects a boolean value, you may supply a value of any type, and JavaScript will convert it as needed. Some values (“truthy” values) convert to `true` and others (“falsy” values) convert to `false`. The same is true for other types: if JavaScript wants a string, it will convert whatever value you give it to a string. If JavaScript wants a number, it will try to convert the value you give it to a number (or to NaN if it cannot perform a meaningful conversion).

Some examples:

```js
10 + " objects"; // => "10 objects": Number 10 converts to a string
"7" * "4"; // => 28: both strings convert to numbers
let n = 1 - "x"; // n == NaN; string "x" can't convert to a number
n + " objects"; // => "NaN objects": NaN converts to string "NaN"
```

Table 3-2 summarizes how values convert from one type to another in JavaScript. Bold entries in the table highlight conversions that you may find surprising. Empty cells indicate that no conversion is necessary and none is performed.

_Table 3-2. JavaScript type conversions_

| Value                        | to String         | to Number  | to Boolean |
| ---------------------------- | :---------------- | ---------- | ---------- |
| undefined                    | "undefined"       | NaN        | false      |
| null                         | "null"            | 0          | false      |
| true                         | "true"            | 1          |            |
| false                        | "false"           | 0          |            |
| ""(empty string)             |                   | 0          | false      |
| "1.2"(nonempty, numeric)     |                   | 1.2        | true       |
| "one"(nonempty, non-numeric) |                   | NaN        | true       |
| 0                            | "0"               |            | false      |
| -0                           | "0"               |            | false      |
| 1 (finite, non-zero)         | "1"               |            | true       |
| Infinity                     | "Infinity"        |            | true       |
| -Infinity                    | "-Infinity"       |            | true       |
| NaN                          | "NaN"             |            | false      |
| {} (any object)              | see §3.9.3        | see §3.9.3 | true       |
| [] (empty array)             | ""                | 0          | true       |
| [9] (one numeric element)    | "9"               | 9          | true       |
| ['a'] (any other array)      | use join() method | NaN        | true       |
| function() {} (any function) | see §3.9.3        | NaN        | true       |

The primitive-to-primitive conversions shown in the table are relatively straightforward. Conversion to boolean was already discussed in §3.4. Conversion to strings is well defined for all primitive values. Conversion to numbers is just a little trickier. Strings that can be parsed as numbers convert to those numbers. Leading and trailing spaces are allowed, but any leading or trailing nonspace characters that are not part of a numeric literal cause the string-to-number conversion to produce `NaN`. Some numeric conversions may seem surprising: `true` converts to `1`, and `false` and the empty string convert to `0`.

Object-to-primitive conversion is somewhat more complicated, and it is the subject of §3.9.3.

### Conversions and Equality

JavaScript has two operators that test whether two values are equal. The “strict equality operator,” `===`, does not consider its operands to be equal if they are not of the same type, and this is almost always the right operator to use when coding. But because JavaScript is so flexible with type conversions, it also defines the `==` operator with a flexible definition of equality. All of the following comparisons are true, for example:

```js
null == undefined; // => true: These two values are treated as equal.
"0" == 0; // => true: String converts to a number before comparing.
0 == false; // => true: Boolean converts to number before comparing.
"0" == false; // => true: Both operands convert to 0 before comparing!
```

§4.9.1 explains exactly what conversions are performed by the `==` operator in order to determine whether two values should be considered equal.

Keep in mind that convertibility of one value to another does not imply equality of those two values. If `undefined` is used where a boolean value is expected, for example, it will convert to false. But this does not mean that `undefined == false`. JavaScript operators and statements expect values of various types and perform conversions to those types. The if statement converts `undefined` to `false`, but the `==` operator never attempts to convert its operands to booleans.

### Explicit Conversions

Although JavaScript performs many type conversions automatically, you may sometimes need to perform an explicit conversion, or you may prefer to make the conversions explicit to keep your code clearer.

The simplest way to perform an explicit type conversion is to use the `Boolean()`, `Number()`, and `String()` functions:

```js
Number("3"); // => 3
String(false); // => "false": Or use false.toString()
Boolean([]); // => true
```

Any value other than `null` or `undefined` has a `toString()` method, and the result of this method is usually the same as that returned by the `String()` function.

As an aside, note that the `Boolean()`, `Number()`, and `String()` functions can also be invoked—with `new`—as constructor. If you use them this way, you’ll get a “wrapper” object that behaves just like a primitive boolean, number, or string value. These wrapper objects are a historical leftover from the earliest days of JavaScript, and there is never really any good reason to use them.

Certain JavaScript operators perform implicit type conversions and are sometimes used explicitly for the purpose of type conversion. If one operand of the `+` operator is a string, it converts the other one to a string. The unary `+` operator converts its operand to a number. And the unary `!` operator converts its operand to a boolean and negates it. These facts lead to the following type conversion idioms that you may see in some code:

```js
x +
  "" + // => String(x)
  x; // => Number(x)
x - 0; // => Number(x)
!!x; // => Boolean(x): Note double !
```

Formatting and parsing numbers are common tasks in computer programs, and JavaScript has specialized functions and methods that provide more precise control over number-to-string and string-to-number conversions.

The `toString()` method defined by the Number class accepts an optional argument that specifies a radix, or base, for the conversion. If you do not specify the argument, the conversion is done in base 10. However, you can also convert numbers in other bases (between 2 and 36). For example:

```js
let n = 17;
let binary = "0b" + n.toString(2); // binary == "0b10001"
let octal = "0o" + n.toString(8); // octal == "0o21"
let hex = "0x" + n.toString(16); // hex == "0x11"
```

When working with financial or scientific data, you may want to convert numbers to strings in ways that give you control over the number of decimal places or the number of significant digits in the output, or you may want to control whether exponential notation is used. The Number class defines three methods for these kinds of number-to-string conversions. `toFixed()` converts a number to a string with a specified number of digits after the decimal point. It never uses exponential notation. `toExponential()` converts a number to a string using exponential notation, with one digit before the decimal point and a specified number of digits after the decimal point (which means that the number of significant digits is one larger than the value you specify). `toPrecision()` converts a number to a string with the number of significant digits you specify. It uses exponential notation if the number of significant digits is not large enough to display the entire integer portion of the number. Note that all three methods round the trailing digits or pad with zeros as appropriate. Consider the following examples:

```js
let n = 123456.789;
n.toFixed(0); // => "123457"
n.toFixed(2); // => "123456.79"
n.toFixed(5); // => "123456.78900"
n.toExponential(1); // => "1.2e+5"
n.toExponential(3); // => "1.235e+5"
n.toPrecision(4); // => "1.235e+5"
n.toPrecision(7); // => "123456.8"
n.toPrecision(10); // => "123456.7890"
```

In addition to the number-formatting methods shown here, the Intl.NumberFormat class defines a more general, internationalized number-formatting method. See §11.7.1 for details.

If you pass a string to the `Number()` conversion function, it attempts to parse that string as an integer or floating-point literal. That function only works for base-10 integers and does not allow trailing characters that are not part of the literal. The `parseInt()` and `parseFloat()` functions (these are global functions, not methods of any class) are more flexible. `parseInt()` parses only integers, while `parseFloat()` parses both integers and floating-point numbers. If a string begins with “0x” or “0X”, `parseInt()` interprets it as a hexadecimal number. Both `parseInt()` and parse `Float()` skip leading whitespace, parse as many numeric characters as they can, and ignore anything that follows. If the first nonspace character is not part of a valid numeric literal, they return `NaN`:

```js
parseInt("3 blind mice"); // => 3
parseFloat(" 3.14 meters"); // => 3.14
parseInt("-12.34"); // => -12
parseInt("0xFF"); // => 255
parseInt("0xff"); // => 255
parseInt("-0XFF"); // => -255
parseFloat(".1"); // => 0.1
parseInt("0.1"); // => 0
parseInt(".1"); // => NaN: integers can't start with "."
parseFloat("$72.47"); // => NaN: numbers can't start with "$"
```

`parseInt()` accepts an optional second argument specifying the radix (base) of the number to be parsed. Legal values are between 2 and 36. For example:

```js
parseInt("11", 2); // => 3: (1*2 + 1)
parseInt("ff", 16); // => 255: (15*16 + 15)
parseInt("zz", 36); // => 1295: (35*36 + 35)
parseInt("077", 8); // => 63: (7*8 + 7)
parseInt("077", 10); // => 77: (7*10 + 7)
```

### Object to Primitive Conversions

The previous sections have explained how you can explicitly convert values of one type to another type and have explained JavaScript’s implicit conversions of values from one primitive type to another primitive type. This section covers the complicated rules that JavaScript uses to convert objects to primitive values. It is long and obscure, and if this is your first reading of this chapter, you should feel free to skip ahead to §3.10.

One reason for the complexity of JavaScript’s object-to-primitive conversions is that some types of objects have more than one primitive representation. Date objects, for example, can be represented as strings or as numeric timestamps. The JavaScript specification defines three fundamental algorithms for converting objects to primitive values:

**prefer-string**
This algorithm returns a primitive value, preferring a string value, if a conversion to string is possible.

**prefer-number**
This algorithm returns a primitive value, preferring a number, if such a conversion is possible.

**no-preference**
This algorithm expresses no preference about what type of primitive value is desired, and classes can define their own conversions. Of the built-in JavaScript types, all except Date implement this algorithm as _prefer-number_. The Date class implements this algorithm as _prefer-string_.

The implementation of these object-to-primitive conversion algorithms is explained at the end of this section. First, however, we explain how the algorithms are used in JavaScript.

#### Object-to-boolean conversions

Object-to-boolean conversions are trivial: all objects convert to `true`. Notice that this conversion does not require the use of the object-to-primitive algorithms described, and that it literally applies to all objects, including empty arrays and even the wrapper object `new Boolean(false)`.

#### Object-to-string conversions

When an object needs to be converted to a string, JavaScript first converts it to a primitive using the _prefer-string_ algorithm, then converts the resulting primitive value to a string, if necessary, following the rules in Table 3-2.

This kind of conversion happens, for example, if you pass an object to a built-in function that expects a string argument, if you call `String()` as a conversion function, and when you interpolate objects into template literals (§3.3.4).

#### Object-to-number conversions

When an object needs to be converted to a number, JavaScript first converts it to a primitive value using the _prefer-number_ algorithm, then converts the resulting primitive value to a number, if necessary, following the rules in Table 3-2.

Built-in JavaScript functions and methods that expect numeric arguments convert object arguments to numbers in this way, and most (see the exceptions that follow) JavaScript operators that expect numeric operands convert objects to numbers in this way as well.

#### Special case operator conversions

Operators are covered in detail in **Chapter 4**. Here, we explain the special case operators that do not use the basic object-to-string and object-to-number conversions described earlier.

The `+` operator in JavaScript performs numeric addition and string concatenation. If either of its operands is an object, JavaScript converts them to primitive values using the _no-preference_ algorithm. Once it has two primitive values, it checks their types. If either argument is a string, it converts the other to a string and concatenates the strings. Otherwise, it converts both arguments to numbers and adds them.

The `==` and `!=` operators perform equality and inequality testing in a loose way that allows type conversions. If one operand is an object and the other is a primitive value, these operators convert the object to primitive using the _no-preference_ algorithm and then compare the two primitive values.

Finally, the relational operators `<`, `<=`, `>`, and `>=` compare the order of their operands and can be used to compare both numbers and strings. If either operand is an object, it is converted to a primitive value using the _prefer-number_ algorithm. Note, however, that unlike the object-to-number conversion, the primitive values returned by the _prefer-number_ conversion are not then converted to numbers.

Note that the numeric representation of Date objects is meaningfully comparable with `<` and `>`, but the string representation is not. For Date objects, the _no-preference_ algorithm converts to a string, so the fact that JavaScript uses the _prefer-number_ algorithm for these operators means that we can use them to compare the order of two Date objects.

#### The toString() and valueOf() methods

All objects inherit two conversion methods that are used by object-to-primitive conversions, and before we can explain the _prefer-string_, _prefer-number_, and _no-preference_ conversion algorithms, we have to explain these two methods.

The first method is `toString()`, and its job is to return a string representation of the object. The default `toString()` method does not return a very interesting value (though we’ll find it useful in §14.4.3):

```js
({ x: 1, y: 2 }).toString(); // => "[object Object]"
```

Many classes define more specific versions of the `toString()` method. The `toString()` method of the Array class, for example, converts each array element to a string and joins the resulting strings together with commas in between. The `toString()` method of the Function class converts user-defined functions to strings of JavaScript source code. The Date class defines a `toString()` method that returns a human-readable (and JavaScript-parsable) date and time string. The RegExp class defines a `toString()` method that converts RegExp objects to a string that looks like a RegExp literal:

```js
[1,2,3].toString() // => "1,2,3"
(function(x) { f(x); }).toString() // => "function(x) { f(x); }"
/\d+/g.toString() // => "/\\d+/g"
let d = new Date(2020,0,1);
d.toString() // => "Wed Jan 01 2020 00:00:00 GMT-0800 (Pacific Standard Time)"
```

The other object conversion function is called `valueOf()`. The job of this method is less well defined: it is supposed to convert an object to a primitive value that represents the object, if any such primitive value exists. Objects are compound values, and most objects cannot really be represented by a single primitive value, so the default `valueOf()` method simply returns the object itself rather than returning a primitive. Wrapper classes such as String, Number, and Boolean define `valueOf()` methods that simply return the wrapped primitive value. Arrays, functions, and regular expressions simply inherit the default method. Calling `valueOf()` for instances of these types simply returns the object itself. The Date class defines a `valueOf()` method that returns the date in its internal representation: the number of milliseconds since January 1, 1970:

```js
let d = new Date(2010, 0, 1); // January 1, 2010, (Pacific time)
d.valueOf(); // => 1262332800000
```

#### Object-to-primitive conversion algorithms

With the `toString()` and `valueOf()` methods explained, we can now explain approximately how the three object-to-primitive algorithms work (the complete details are deferred until §14.4.7):

- The _prefer-string_ algorithm first tries the `toString()` method. If the method is defined and returns a primitive value, then JavaScript uses that primitive value (even if it is not a string!). If `toString()` does not exist or if it returns an object, then JavaScript tries the `valueOf()` method. If that method exists and returns a primitive value, then JavaScript uses that value. Otherwise, the conversion fails with a TypeError.
- The _prefer-number_ algorithm works like the _prefer-string_ algorithm, except that it tries `valueOf()` first and `toString()` second.
- The _no-preference_ algorithm depends on the class of the object being converted. If the object is a Date object, then JavaScript uses the _prefer-string_ algorithm. For any other object, JavaScript uses the _prefer-number_ algorithm.

The rules described here are true for all built-in JavaScript types and are the default rules for any classes you define yourself. §14.4.7 explains how you can define your own object-to-primitive conversion algorithms for the classes you define.

Before we leave this topic, it is worth noting that the details of the prefer-number conversion explain why empty arrays convert to the number 0 and single-element arrays can also convert to numbers:

```js
Number([]); // => 0: this is unexpected!
Number([99]); // => 99: really?
```

The object-to-number conversion first converts the object to a primitive using the _prefer-number_ algorithm, then converts the resulting primitive value to a number. The _prefer-number_ algorithm tries `valueOf()` first and then falls back on `toString()`. But the Array class inherits the default `valueOf()` method, which does not return a primitive value. So when we try to convert an array to a number, we end up invoking the `toString()` method of the array. Empty arrays convert to the empty string. And the empty string converts to the number 0. An array with a single element converts to the same string that that one element does. If an array contains a single number, that number is converted to a string, and then back to a number.

## Variable Declaration and Assignment

One of the most fundamental techniques of computer programming is the use of names—or _identifiers_—to represent values. Binding a name to a value gives us a way to refer to that value and use it in the programs we write. When we do this, we typically say that we are assigning a value to a _variable_. The term “variable” implies that new values can be assigned: that the value associated with the variable may vary as our program runs. If we permanently assign a value to a name, then we call that name a _constant_ instead of a variable.

Before you can use a variable or constant in a JavaScript program, you must _declare_ it. In ES6 and later, this is done with the `let` and `const` keywords, which we explain next. Prior to ES6, variables were declared with var, which is more idiosyncratic and is explained later on in this section.

### Declarations with let and const

In modern JavaScript (ES6 and later), variables are declared with the `let` keyword, like this:

```js
let i;
let sum;
```

You can also declare multiple variables in a single `let` statement:

```js
let i, sum;
```

It is a good programming practice to assign an initial value to your variables when you declare them, when this is possible:

```js
let message = "hello";
let i = 0,
  j = 0,
  k = 0;
let x = 2,
  y = x * x; // Initializers can use previously declared variables
```

If you don’t specify an initial value for a variable with the `let` statement, the variable is declared, but its value is `undefined` until your code assigns a value to it.

To declare a constant instead of a variable, use `const` instead of let. `const` works just like `let` except that you must initialize the constant when you declare it:

```js
const H0 = 74; // Hubble constant (km/s/Mpc)
const C = 299792.458; // Speed of light in a vacuum (km/s)
const AU = 1.496e8; // Astronomical Unit: distance to the sun (km)
```

As the name implies, constants cannot have their values changed, and any attempt to do so causes a TypeError to be thrown.

It is a common (but not universal) convention to declare constants using names with all capital letters such as `H0` or `HTTP_NOT_FOUND` as a way to distinguish them from variables.

> **When to Use const**
>
> There are two schools of thought about the use of the `const` key‐ word. One approach is to use `const` only for values that are fundamentally unchanging, like the physical constants shown, or program version numbers, or byte sequences used to identify file types, for example. Another approach recognizes that many of the so-called variables in our program don’t actually ever change as our program runs. In this approach, we declare everything with const, and then if we find that we do actually want to allow the value to vary, we switch the declaration to let. This may help prevent bugs by ruling out accidental changes to variables that we did not intend.
>
> In one approach, we use `const` only for values that must not change. In the other, we use `const` for any value that does not happen to change. I prefer the former approach in my own code.

In **Chapter 5**, we’ll learn about the `for`, `for/in`, and `for/of` loop statements in JavaScript. Each of these loops includes a loop variable that gets a new value assigned to it on each iteration of the loop. JavaScript allows us to declare the loop variable as part of the loop syntax itself, and this is another common way to use `let`:

```js
for (let i = 0, len = data.length; i < len; i++) console.log(data[i]);
for (let datum of data) console.log(datum);
for (let property in object) console.log(property);
```

It may seem surprising, but you can also use `const` to declare the loop “variables” for `for/in` and `for/of` loops, as long as the body of the loop does not reassign a new value. In this case, the `const` declaration is just saying that the value is constant for the duration of one loop iteration:

```js
for (const datum of data) console.log(datum);
for (const property in object) console.log(property);
```

#### Variable and constant scope

The _scope_ of a variable is the region of your program source code in which it is defined. Variables and constants declared with `let` and `const` are _block scoped_. This means that they are only defined within the block of code in which the `let` or `const` statement appears. JavaScript class and function definitions are blocks, and so are the bodies of `if/else` statements, `while` loops, `for` loops, and so on. Roughly speaking, if a variable or constant is declared within a set of curly braces, then those curly braces delimit the region of code in which the variable or constant is defined (though of course it is not legal to reference a variable or constant from lines of code that execute before the `let` or `const` statement that declares the variable). Variables and constants declared as part of a `for`, `for/in`, or `for/of` loop have the loop body as their scope, even though they technically appear outside of the curly braces.

When a declaration appears at the top level, outside of any code blocks, we say it is a _global_ variable or constant and has global scope. In Node and in client-side JavaScript modules (see **Chapter 10**), the scope of a global variable is the file that it is defined in. In traditional client-side JavaScript, however, the scope of a global variable is the HTML document in which it is defined. That is: if one `<script>` declares a global variable or constant, that variable or constant is defined in all of the `<script>` elements in that document (or at least all of the scripts that execute after the `let` or `const` statement executes).

#### Repeated declarations

It is a syntax error to use the same name with more than one `let` or `const` declaration in the same scope. It is legal (though a practice best avoided) to declare a new variable with the same name in a nested scope:

```js
const x = 1; // Declare x as a global constant
if (x === 1) {
  let x = 2; // Inside a block x can refer to a different value
  console.log(x); // Prints 2
}
console.log(x); // Prints 1: we're back in the global scope now
let x = 3; // ERROR! Syntax error trying to re-declare x
```

#### Declarations and types

If you’re used to statically typed languages such as C or Java, you may think that the primary purpose of variable declarations is to specify the type of values that may be assigned to a variable. But, as you have seen, there is no type associated with JavaScript’s variable declarations. A JavaScript variable can hold a value of any type. For example, it is perfectly legal (but generally poor programming style) in JavaScript to assign a number to a variable and then later assign a string to that variable:

```js
let i = 10;
i = "ten";
```

### Variable Declarations with var

In versions of JavaScript before ES6, the only way to declare a variable is with the `var` keyword, and there is no way to declare constants. The syntax of `var` is just like the syntax of `let`:

```js
var x;
var data = [],
  count = data.length;
for (var i = 0; i < count; i++) console.log(data[i]);
```

Although `var` and `let` have the same syntax, there are important differences in the way they work:

- Variables declared with `var` do not have block scope. Instead, they are scoped to the body of the containing function no matter how deeply nested they are inside that function.
- If you use `var` outside of a function body, it declares a global variable. But global variables declared with var differ from globals declared with let in an important way. Globals declared with var are implemented as properties of the global object (§3.7). The global object can be referenced as globalThis. So if you write `var x = 2;` outside of a function, it is like you wrote `globalThis.x = 2;`. Note however, that the analogy is not perfect: the properties created with global `var` declarations cannot be deleted with the `delete` operator (§4.13.4). Global variables and constants declared with `let` and `const` are not properties of the global object.
- Unlike variables declared with `let`, it is legal to declare the same variable multiple times with `var`. And because var variables have function scope instead of block scope, it is actually common to do this kind of redeclaration. The variable i is frequently used for integer values, and especially as the index variable of `for` loops. In a function with multiple for loops, it is typical for each one to begin `for(var i = 0; ...`. Because var does not scope these variables to the loop body, each of these loops is (harmlessly) re-declaring and re-initializing the same variable.
- One of the most unusual features of var declarations is known as _hoisting_. When a variable is declared with `var`, the declaration is lifted up (or “hoisted”) to the top of the enclosing function. The initialization of the variable remains where you wrote it, but the definition of the variable moves to the top of the function. So variables declared with var can be used, without error, anywhere in the enclosing function. If the initialization code has not run yet, then the value of the variable may be `undefined`, but you won’t get an error if you use the variable before it is initialized. (This can be a source of bugs and is one of the important misfeatures that let corrects: if you declare a variable with let but attempt to use it before the `let` statement runs, you will get an actual error instead of just seeing an `undefined` value.)

> **Using Undeclared Variables**
>
> In strict mode (§5.6.3), if you attempt to use an undeclared variable, you’ll get a reference error when you run your code. Outside of strict mode, however, if you assign a value to a name that has not been declared with `let`, `const`, or `var`, you’ll end up creating a new global variable. It will be a global no matter now deeply nested within functions and blocks your code is, which is almost certainly not what you want, is bug-prone, and is one of the best reasons for using strict mode!
>
> Global variables created in this accidental way are like global variables declared with `var`: they define properties of the global object. But unlike the properties defined by proper `var` declarations, these properties can be deleted with the `delete` operator (§4.13.4).

### Destructuring Assignment

ES6 implements a kind of compound declaration and assignment syntax known as _destructuring assignment_. In a destructuring assignment, the value on the righthand side of the equals sign is an array or object (a “structured” value), and the lefthand side specifies one or more variable names using a syntax that mimics array and object literal syntax. When a destructuring assignment occurs, one or more values are extracted (“destructured”) from the value on the right and stored into the variables named on the left. Destructuring assignment is perhaps most commonly used to initialize variables as part of a `const`, `let`, or `var` declaration statement, but it can also be done in regular assignment expressions (with variables that have already been declared). And, as we’ll see in §8.3.5, destructuring can also be used when defining the parameters to a function.

Here are simple destructuring assignments using arrays of values:

```js
let [x, y] = [1, 2]; // Same as let x=1, y=2
[x, y] = [x + 1, y + 1]; // Same as x = x + 1, y = y + 1
[x, y] = [y, x]; // Swap the value of the two variables
[x, y]; // => [3,2]: the incremented and swapped values
```

Notice how destructuring assignment makes it easy to work with functions that return arrays of values:

```js
// Convert [x,y] coordinates to [r,theta] polar coordinates
function toPolar(x, y) {
  return [Math.sqrt(x * x + y * y), Math.atan2(y, x)];
}

// Convert polar to Cartesian coordinates
function toCartesian(r, theta) {
  return [r * Math.cos(theta), r * Math.sin(theta)];
}

let [r, theta] = toPolar(1.0, 1.0); // r == Math.sqrt(2); theta == Math.PI/4
let [x, y] = toCartesian(r, theta); // [x, y] == [1.0, 1,0]
```

We saw that variables and constants can be declared as part of JavaScript’s various `for` loops. It is possible to use variable destructuring in this context as well. Here is a code that loops over the name/value pairs of all properties of an object and uses destructuring assignment to convert those pairs from two-element arrays into individual variables:

```js
let o = { x: 1, y: 2 }; // The object we'll loop over
for (const [name, value] of Object.entries(o)) {
  console.log(name, value); // Prints "x 1" and "y 2"
}
```

The number of variables on the left of a destructuring assignment does not have to match the number of array elements on the right. Extra variables on the left are set to `undefined`, and extra values on the right are ignored. The list of variables on the left can include extra commas to skip certain values on the right:

```js
let [x, y] = [1]; // x == 1; y == undefined
[x, y] = [1, 2, 3]; // x == 1; y == 2
[, x, , y] = [1, 2, 3, 4]; // x == 2; y == 4
```

If you want to collect all unused or remaining values into a single variable when destructuring an array, use three dots (`...`) before the last variable name on the lefthand side:

```js
let [x, ...y] = [1, 2, 3, 4]; // y == [2,3,4]
```

We’ll see three dots used this way again in §8.3.2, where they are used to indicate that all remaining function arguments should be collected into a single array.

Destructuring assignment can be used with nested arrays. In this case, the lefthand side of the assignment should look like a nested array literal:

```js
let [a, [b, c]] = [1, [2, 2.5], 3]; // a == 1; b == 2; c == 2.5
```

A powerful feature of array destructuring is that it does not actually require an array! You can use any _iterable_ object (**Chapter 12**) on the righthand side of the assignment; any object that can be used with a `for/of` loop (§5.4.4) can also be destructured:

```js
let [first, ...rest] = "Hello"; // first == "H"; rest == ["e","l","l","o"]
```

Destructuring assignment can also be performed when the righthand side is an object value. In this case, the lefthand side of the assignment looks something like an object literal: a comma-separated list of variable names within curly braces:

```js
let transparent = { r: 0.0, g: 0.0, b: 0.0, a: 1.0 }; // A RGBA color
let { r, g, b } = transparent; // r == 0.0; g == 0.0; b == 0.0
```

The next example copies global functions of the `Math` object into variables, which might simplify code that does a lot of trigonometry:

```js
// Same as const sin=Math.sin, cos=Math.cos, tan=Math.tan
const { sin, cos, tan } = Math;
```

Notice in the code here that the `Math` object has many properties other than the three that are destructured into individual variables. Those that are not named are simply ignored. If the lefthand side of this assignment had included a variable whose name was not a property of `Math`, that variable would simply be assigned `undefined`.

In each of these object destructuring examples, we have chosen variable names that match the property names of the object we’re destructuring. This keeps the syntax simple and easy to understand, but it is not required. Each of the identifiers on the lefthand side of an object destructuring assignment can also be a colon-separated pair of identifiers, where the first is the name of the property whose value is to be assigned and the second is the name of the variable to assign it to:

```js
// Same as const cosine = Math.cos, tangent = Math.tan;
const { cos: cosine, tan: tangent } = Math;
```

I find that object destructuring syntax becomes too complicated to be useful when the variable names and property names are not the same, and I tend to avoid the shorthand in this case. If you choose to use it, remember that property names are always on the left of the colon, in both object literals and on the left of an object destructuring assignment.

Destructuring assignment becomes even more complicated when it is used with nested objects, or arrays of objects, or objects of arrays, but it is legal:

```js
let points = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
]; // An array of two point objects
let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points; // destructured into 4 variables.
x1 === 1 && y1 === 2 && x2 === 3 && y2 === 4; // => true
```

Or, instead of destructuring an array of objects, we could destructure an object of arrays:

```js
let points = { p1: [1, 2], p2: [3, 4] }; // An object with 2 array props
let {
  p1: [x1, y1],
  p2: [x2, y2],
} = points; // destructured into 4 vars
x1 === 1 && y1 === 2 && x2 === 3 && y2 === 4; // => true
```

Complex destructuring syntax like this can be hard to write and hard to read, and you may be better off just writing out your assignments explicitly with traditional code like `let x1 = points.p1[0];`.

> **Understanding Complex Destructuring**
>
> If you find yourself working with code that uses complex destructuring assignments, there is a useful regularity that can help you make sense of the complex cases. Think first about a regular (single-value) assignment. After the assignment is done, you can take the variable name from the lefthand side of the assignment and use it as an expression in your code, where it will evaluate to whatever value you assigned it. The same thing is true for destructuring assignment. The lefthand side of a destructuring assignment looks like an array literal or an object literal (§6.2.1 and §6.10). After the assignment has been done, the lefthand side will actually work as a valid array literal or object literal elsewhere in your code. You can check that you’ve written a destructuring assignment correctly by trying to use the lefthand side on the righthand side of another assignment expression:
>
> ```js
> // Start with a data structure and a complex destructuring
> let points = [
>   { x: 1, y: 2 },
>   { x: 3, y: 4 },
> ];
> let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = points;
>
> // Check your destructuring syntax by flipping the assignment around
> let points2 = [
>   { x: x1, y: y1 },
>   { x: x2, y: y2 },
> ]; // points2 == points
> ```

## Summary

Some key points to remember about this chapter:

- How to write and manipulate numbers and strings of text in JavaScript.
- How to work with JavaScript’s other primitive types: booleans, Symbols, `null`, and `undefined`.
- The differences between immutable primitive types and mutable reference types.
- How JavaScript converts values implicitly from one type to another and how you can do so explicitly in your programs.
- How to declare and initialize constants and variables (including with destructuring assignment) and the lexical scope of the variables and constants you declare.
