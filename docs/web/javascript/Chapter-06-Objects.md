---
title: 第六章 对象
---

# 对象

[[toc]]

Objects are JavaScript’s most fundamental datatype, and you have already seen them many times in the chapters that precede this one. Because objects are so important to the JavaScript language, it is important that you understand how they work in detail, and this chapter provides that detail. It begins with a formal overview of objects, then dives into practical sections about creating objects and querying, setting, deleting, testing, and enumerating the properties of objects. These property-focused sections are followed by sections that explain how to extend, serialize, and define important methods on objects. Finally, the chapter concludes with a long section about new object literal syntax in ES6 and more recent versions of the language.

::: tip 翻译
对象是 JavaScript 最基本的数据类型，前几章我们已经多次看到它了。因为对 JavaScript 语言来说对象实在太重要了，所以理解对象的详细工作机制也非常重要，本章就来详尽地讲解对象。一开始我们先正式地介绍一下对象，接下来几节将结合实践讨论创建对象和查询、设置、删除、测试以及枚举对象的属性。在关注属性的几节之后，接着会讨论如何扩展、序列化对象，以及在对象上定义重要方法。本章最后一节比较长，主要讲解 ES6 和这门语言的新近版本新增的对象字面量语法。
:::

## 对象简介

An object is a composite value: it aggregates multiple values (primitive values or other objects) and allows you to store and retrieve those values by name. An object is an unordered collection of properties, each of which has a name and a value. Property names are usually strings (although, as we’ll see in §6.10.3, property names can also be Symbols), so we can say that objects map strings to values. This string-to-value mapping goes by various names—you are probably already familiar with the fundamental data structure under the name “hash,” “hashtable,” “dictionary,” or “associative array.” An object is more than a simple string-to-value map, however. In addition to maintaining its own set of properties, a JavaScript object also inherits the properties of another object, known as its “prototype.” The methods of an object are typically inherited properties, and this “prototypal inheritance” is a key feature of JavaScript.

::: tip 翻译
对象是一种复合值，它汇聚多个值（原始值或其他对象）并允许我们按名字存储和获取这些值。对象是一个属性的无序集合，每个属性都有名字和值。属性名通常是字符串（也可以是符号，参见 6.10.3 节），因此可以说对象把字符串映射为值。这种字符串到值的映射曾经有很多种叫法，包括“散列”“散列表”“字典”或“关联数组”等熟悉的基本数据结构。不过，对象不仅仅是简单的字符串到值的映射。除了维持自己的属性之外，JavaScript 对象也可以从其他对象继承属性，这个其他对象称为其“原型”。对象的方法通常是继承来的属性，而这种“原型式继承”也是 JavaScript 的主要特性。
:::

JavaScript objects are dynamic—properties can usually be added and deleted—but they can be used to simulate the static objects and “structs” of statically typed languages. They can also be used (by ignoring the value part of the string-to-value mapping) to represent sets of strings.

::: tip 翻译
JavaScript 对象是动态的，即可以动态添加和删除属性。不过，可以用对象来模拟静态类型语言中的静态对象和“结构体”。对象也可以用于表示一组字符串（忽略字符串到值的映射中的值）。
:::

Any value in JavaScript that is not a string, a number, a Symbol, or `true`, `false`, `null`, or `undefined` is an object. And even though strings, numbers, and booleans are not objects, they can behave like immutable objects.

::: tip 翻译
在 JavaScript 中，任何不是字符串、数值、符号或`true`、`false`、`null`、`undefined`的值都是对象。即使字符串、数值和布尔值不是对象，它们的行为也类似不可修改的对象。
:::

Recall from §3.8 that objects are _mutable_ and manipulated by reference rather than by value. If the variable `x` refers to an object and the code `let y = x`; is executed, the variable `y` holds a reference to the same object, not a copy of that object. Any modifications made to the object through the variable `y` are also visible through the variable `x`.

::: tip 翻译
我们在 3.8 节介绍过对象是可修改的，是按引用操作而不是按值操作的。如果变量`x`指向一个对象，则代码`let y = x;`执行后，变量`y`保存的是同一个对象的引用，而不是该对象的副本。通过变量`y`对这个对象所做的任何修改，在变量`x`上都是可见的。
:::

The most common things to do with objects are to create them and set, query, delete, test, and enumerate their properties. These fundamental operations are described in the opening sections of this chapter. The sections after that cover more advanced topics.

::: tip 翻译
与对象相关的最常见的操作包括创建对象，以及设置、查询、删除、测试和枚举它们的值。这些基本操作将在本章开头几节介绍。之后几节将讨论更高级的主题。
:::

A _property_ has a name and a value. A property name may be any string, including the empty string (or any Symbol), but no object may have two properties with the same name. The value may be any JavaScript value, or it may be a getter or setter function (or both). We’ll learn about getter and setter functions in §6.10.6.

::: tip 翻译
属性有一个名字和一个值。属性名可以是任意字符串，包括空字符串（或任意符号），但对象不能包含两个同名的属性。值可以是任意 JavaScript 值，或者是设置函数或获取函数（或两个函数同时存在）。6.10.6 节将学习设置函数和获取函数。
:::

It is sometimes important to be able to distinguish between properties defined directly on an object and those that are inherited from a prototype object. JavaScript uses the term _own property_ to refer to non-inherited properties.

::: tip 翻译
有时候，区分直接定义在对象上的属性和那些从原型对象上继承的属性很重要。JavaScript 使用术语“自有属性”指代非继承属性。
:::

In addition to its name and value, each property has three _property attributes_:

- The _writable_ attribute specifies whether the value of the property can be set.
- The _enumerable_ attribute specifies whether the property name is returned by a `for/in` loop.
- The _configurable_ attribute specifies whether the property can be deleted and whether its attributes can be altered.

::: tip 翻译
除了名字和值之外，每个属性还有 3 个属性特性（`property attribute`）：

- `writable`（可写）特性指定是否可以设置属性的值。
- `enumerable`（可枚举）特性指定是否可以在`for/in`循环中返回属性的名字。
- `configurable`（可配置）特性指定是否可以删除属性，以及是否可修改其特性。
  :::

Many of JavaScript’s built-in objects have properties that are read-only, non-enumerable, or non-configurable. By default, however, all properties of the objects you create are writable, enumerable, and configurable. §14.1 explains techniques for specifying non-default property attribute values for your objects.

::: tip 翻译
很多 JavaScript 内置对象拥有只读、不可枚举或不可配置的属性。不过，默认情况下，我们所创建对象的所有属性都是可写、可枚举和可配置的。14.1 节将介绍为对象指定非默认的属性特性值的技术。
:::

## 创建对象

Objects can be created with object literals, with the `new` keyword, and with the `Object.create()` function. The subsections below describe each technique.

::: tip 翻译
对象可以通过对象字面量、`new`关键字和`Object.create()`函数来创建。接下来分别介绍这几种技术。
:::

### 对象字面量

The easiest way to create an object is to include an object literal in your JavaScript code. In its simplest form, an _object literal_ is a comma-separated list of colon-separated name:value pairs, enclosed within curly braces. A property name is a JavaScript identifier or a string literal (the empty string is allowed). A property value is any JavaScript expression; the value of the expression (it may be a primitive value or an object value) becomes the value of the property. Here are some examples:

::: tip 翻译
创建对象最简单的方式是在 JavaScript 代码中直接包含对象字面量。对象字面量的最简单形式是包含在一对花括号中的一组逗号分隔的“名:值”对。属性名是 JavaScript 标识符或字符串字面量（允许空字符串）。属性值是任何 JavaScript 表达式，这个表达式的值（可以是原始值或对象值）会变成属性的值。下面看几个示例：
:::

```js
let empty = {}; // 没有属性的对象
let point = { x: 0, y: 0 }; // 包含两个数值属性
let p2 = { x: point.x, y: point.y + 1 }; // 值比较复杂
let book = {
  "main title": "JavaScript", // 属性名包含空格
  "sub-title": "The Definitive Guide", // 和连字符，因此使用字符串字面量
  for: "all audiences", // for时保留字，但没有引号
  author: {
    // 这个属性的值本身是
    firstname: "David", // 一个对象
    surname: "Flanagan",
  },
};
```

A trailing comma following the last property in an object literal is legal, and some programming styles encourage the use of these trailing commas so you’re less likely to cause a syntax error if you add a new property at the end of the object literal at some later time.

::: tip 翻译
对象字面量最后一个属性后面的逗号是合法的，有些编程风格指南鼓励添加这些逗号，以便将来在对象字面量末尾再增加新属性时不会导致语法错误。
:::

An object literal is an expression that creates and initializes a new and distinct object each time it is evaluated. The value of each property is evaluated each time the literal is evaluated. This means that a single object literal can create many new objects if it appears within the body of a loop or in a function that is called repeatedly, and that the property values of these objects may differ from each other.

::: tip 翻译
对象字面量是一个表达式，每次求值都会创建并初始化一个新的、不一样的对象。字面量每次被求值的时候，它的每个属性的值也会被求值。这意味着同一个对象字面量如果出现在循环体中，或出现在被重复调用的函数体内，可以创建很多新对象，且这些对象属性的值可能不同。
:::

The object literals shown here use simple syntax that has been legal since the earliest versions of JavaScript. Recent versions of the language have introduced a number of new object literal features, which are covered in §6.10.

::: tip 翻译
前面展示的对象字面量使用了简单的语法，这种语法是在 JavaScript 最初始的版本中规定的。这门语言最近的版本新增了很多新的对象字面量特性，将在 6.10 节介绍。
:::

### 使用 new 创建对象

The `new` operator creates and initializes a new object. The new keyword must be followed by a function invocation. A function used in this way is called a _constructor_ and serves to initialize a newly created object. JavaScript includes constructors for its built-in types. For example:

::: tip 翻译
`new`操作符用于创建和初始化一个新对象。`new`关键字后面必须跟一个函数调用。以这种方式使用的函数被称为构造函数（constructor），目的是初始化新创建的对象。JavaScript 为内置的类型提供了构造函数。例如：
:::

```js
let o = new Object(); // 创建一个空对象，与 {} 相同.
let a = new Array(); // 创建一个空数组，与 [] 相同.
let d = new Date(); // 创建一个表示当前时间的日期对象
let r = new Map(); //创建一个映射对象，用于存储键/值映射
```

In addition to these built-in constructors, it is common to define your own constructor functions to initialize newly created objects. Doing so is covered in [Chapter 9](./Chapter-09-Classes.md).

::: tip 翻译
除了内置的构造函数，我们经常需要定义自己的构造函数来初始化新创建的对象。相关内容将在[第 9 章](./Chapter-09-Classes.md)介绍。
:::

### 原型

Before we can cover the third object creation technique, we must pause for a moment to explain prototypes. Almost every JavaScript object has a second JavaScript object associated with it. This second object is known as a _prototype_, and the first object inherits properties from the prototype.

::: tip 翻译
在介绍第三种创建对象的技术之前，必须暂停一下，先介绍原型。几乎每个 JavaScript 对象都有另一个与之关联的对象。这另一个对象被称为原型（prototype），第一个对象从这个原型继承属性。
:::

All objects created by object literals have the same prototype object, and we can refer to this prototype object in JavaScript code as `Object.prototype`. Objects created using the `new` keyword and a constructor invocation use the value of the `prototype` property of the constructor function as their prototype. So the object created by `new Object()` inherits from `Object.prototype`, just as the object created by `{}` does. Similarly, the object created by `new Array()` uses `Array.prototype` as its prototype, and the object created by `new Date()` uses `Date.prototype` as its prototype. This can be confusing when first learning JavaScript. Remember: almost all objects have a _prototype_, but only a relatively small number of objects have a `prototype` property. It is these objects with `prototype` properties that define the _prototypes_ for all the other objects.

::: tip 翻译
通过对象字面量创建的所有对象都有相同的原型对象，在 JavaScript 代码中可以通过`Object.prototype`引用这个原型对象。使用`new`关键字和构造函数调用创建的对象，使用构造函数`prototype`属性的值作为它们的原型。换句话说，使用`new Object()`创建的对象继承自`Object.prototype`，与通过`{}`创建的对象一样。类似地，通过`new Array()`创建的对象以`Array.prototype`为原型，通过`new Date()`创建的对象以`Date.prototype`为原型。对于 JavaScript 初学者，这一块很容易迷惑。记住：几乎所有对象都有原型，但只有少数对象有`prototype`属性。正是这些有`prototype`属性的对象为所有其他对象定义了原型。
:::

`Object.prototype` is one of the rare objects that has no prototype: it does not inherit any properties. Other prototype objects are normal objects that do have a prototype. Most built-in constructors (and most user-defined constructors) have a prototype that inherits from `Object.prototype`. For example, Date.prototype inherits properties from `Object.prototype`, so a Date object created by new `Date()` inherits properties from both `Date.prototype` and `Object.prototype`. This linked series of prototype objects is known as a _prototype chain_.

::: tip 翻译
`Object.prototype`是为数不多的没有原型的对象，因为它不继承任何属性。其他原型对象都是常规对象，都有自己的原型。多数内置构造函数（和多数用户定义的构造函数）的原型都继承自`Object.prototype`。例如，`Date.prototype`从`Object.prototype`继承属性，因此通过`new Date()`创建的日期对象从`Date.prototype`和`Object.prototype`继承属性。这种原型对象链接起来的序列被称为原型链。
:::

An explanation of how property inheritance works is in §6.3.2. [Chapter 9](./Chapter-09-Classes.md) explains the connection between prototypes and constructors in more detail: it shows how to define new “classes” of objects by writing a constructor function and setting its prototype property to the prototype object to be used by the “instances” created with that constructor. And we’ll learn how to query (and even change) the prototype of an object in §14.3.

::: tip 翻译
6.3.2 节将介绍属性继承的原理。[第 9 章](./Chapter-09-Classes.md)会更详细地解释原型与构造函数之间的联系，将展示如何定义新的对象“类”，包括编写构造函数以及将其 prototype 属性设置为一个原型对象，让通过该构造函数创建的“实例”继承这个原型对象的属性。另外，14.3 节还将介绍如何查询（甚至修改）一个对象的原型。
:::

### Object.create()

`Object.create()` creates a new object, using its first argument as the prototype of that object:

::: tip 翻译
`Object.create()`用于创建一个新对象，使用其第一个参数作为新对象的原型：
:::

```js
let o1 = Object.create({ x: 1, y: 2 }); // o1 继承属性 x 和 y.
o1.x + o1.y; // => 3
```

You can pass `null` to create a new object that does not have a prototype, but if you do this, the newly created object will not inherit anything, not even basic methods like `toString()` (which means it won’t work with the `+` operator either):

::: tip 翻译
传入`null`可以创建一个没有原型的新对象。不过，这样创建的新对象不会继承任何东西，连`toString()`这种基本方法都没有（意味着不能对该对象应用`+`操作符）：
:::

```js
let o2 = Object.create(null); // o2 不继承任何属性或方法
```

If you want to create an ordinary empty object (like the object returned by `{}` or `new Object()`), pass `Object.prototype`:

::: tip 翻译
如果想创建一个普通的空对象（类似`{}`或`new Object()`返回的对象），传入`Object.prototype`：
:::

```js
let o3 = Object.create(Object.prototype); // o3 与 {} 或 new Object() 类似.
```

The ability to create a new object with an arbitrary prototype is a powerful one, and we’ll use `Object.create()` in a number of places throughout this chapter. (`Object.create()` also takes an optional second argument that describes the properties of the new object. This second argument is an advanced feature covered in §14.1.)

::: tip 翻译
能够以任意原型创建新对象是一种非常强大的技术，本章多处都会使用`Object.create()`（`Object.create()`还可接收可选的第二个参数，用于描述新对象的属性。这个参数属于高级特性，将在 14.1 节介绍）。
:::

One use for `Object.create()` is when you want to guard against unintended (but nonmalicious) modification of an object by a library function that you don’t have control over. Instead of passing the object directly to the function, you can pass an object that inherits from it. If the function reads properties of that object, it will see the inherited values. If it sets properties, however, those writes will not affect the original object.

::: tip 翻译
`Object.create()`的一个用途是防止对象被某个第三方库函数意外（但非恶意）修改。这种情况下，不要直接把对象传给库函数，而要传入一个继承自它的对象。如果函数读取这个对象的属性，可以读到继承的值。而如果它设置这个对象的属性，则修改不会影响原始对象。
:::

```js
let o = { x: "don't change this value" };
library.function(Object.create(o)); // 防止意外修改
```

To understand why this works, you need to know how properties are queried and set in JavaScript. These are the topics of the next section.

::: tip 翻译
要理解其中的原理，需要知道 JavaScript 中属性查询和设置的过程。这些都是下一节的内容。
:::

## 查询和设置属性

To obtain the value of a property, use the dot (`.`) or square bracket (`[]`) operators described in §4.4. The lefthand side should be an expression whose value is an object. If using the dot operator, the righthand side must be a simple identifier that names the property. If using square brackets, the value within the brackets must be an expression that evaluates to a string that contains the desired property name:

::: tip 翻译
要获得一个属性的值，可以使用 4.4 节介绍的点（`.`）或方括号（`[]`）操作符。左边应该是一个表达式，其值为一个对象。如果使用点操作符，右边必须是一个命名属性的简单标识符。如果使用方括号，方括号中的值必须是一个表达式，其结果为包含目的属性名的字符串：
:::

```js
let author = book.author; // 取得book的"author"属性.
let name = author.surname; // 取得author的"surname"属性。
let title = book["main title"]; // 取得book的"main title"属性
```

To create or set a property, use a dot or square brackets as you would to query the property, but put them on the lefthand side of an assignment expression:

::: tip 翻译
要创建或设置属性，与查询属性一样，可以使用点或方括号，只是要把它们放到赋值表达式的左边：
:::

```js
book.edition = 7; // 为book创建一个"edition"属性.
book["main title"] = "ECMAScript"; // 修改 "main title" 属性.
```

When using square bracket notation, we’ve said that the expression inside the square brackets must evaluate to a string. A more precise statement is that the expression must evaluate to a string or a value that can be converted to a string or to a Symbol (§6.10.3). In [Chapter 7](./Chapter-07-Arrays.md), for example, we’ll see that it is common to use numbers inside the square brackets.

::: tip 翻译
使用方括号时，我们说过其中的表达式必须求值为一个字符串。更准确的说法是，该表达式必须求值为一个字符串或一个可以转换为字符串或符号的值（参见 6.10.3）。例如，我们会在[第 7 章](./Chapter-07-Arrays.md)看到在方括号中使用数字是很常见的。
:::

### 作为关联数组的对象

As explained in the preceding section, the following two JavaScript expressions have the same value:

::: tip 翻译
如前所述，下面两个 JavaScript 表达式的值相同：
:::

```js
object.property;
object["property"];
```

The first syntax, using the dot and an identifier, is like the syntax used to access a static field of a struct or object in C or Java. The second syntax, using square brackets and a string, looks like array access, but to an array indexed by strings rather than by numbers. This kind of array is known as an associative array (or hash or map or dictionary). JavaScript objects are associative arrays, and this section explains why that is important.

::: tip 翻译
第一种语法使用点和标识符，与在 C 或 Java 中访问结构体或对象的静态字段的语法类似。第二种语法使用方括号和字符串，看起来像访问数组，只不过是以字符串而非数值作为索引的数组。这种数组也被称为关联数组（或散列、映射、字典）。JavaScript 对象是关联数组，本节解释为什么这一点很重要。
:::

In C, C++, Java, and similar strongly typed languages, an object can have only a fixed number of properties, and the names of these properties must be defined in advance. Since JavaScript is a loosely typed language, this rule does not apply: a program can create any number of properties in any object. When you use the `.` operator to access a property of an object, however, the name of the property is expressed as an identifier. Identifiers must be typed literally into your JavaScript program; they are not a datatype, so they cannot be manipulated by the program.

::: tip 翻译
在 C、C++、Java 及类似的强类型语言中，对象只有固定数量的属性，且这些属性的名字必须事先定义。JavaScript 是松散类型语言，并没有遵守这个规则，即 JavaScript 程序可以为任意对象创建任意数量的属性。不过，在使用`.`操作符访问对象的属性时，属性名是通过标识符来表示的。标识符必须直接书写在 JavaScript 程序中，它们不是一种数据类型，因此不能被程序操作。
:::

On the other hand, when you access a property of an object with the `[]` array notation, the name of the property is expressed as a string. Strings are JavaScript datatypes, so they can be manipulated and created while a program is running. So, for example, you can write the following code in JavaScript:

::: tip 翻译
在通过方括号（`[]`）这种数组表示法访问对象属性时，属性名是通过字符串来表示的。字符串是一种 JavaScript 数组类型，因此可以在程序运行期间修改和创建。例如，可以在 JavaScript 中这样写：
:::

```js
let addr = "";
for (let i = 0; i < 4; i++) {
  addr += customer[`address${i}`] + "\n";
}
```

This code reads and concatenates the `address0`, `address1`, `address2`, and `address3` properties of the customer object.

::: tip 翻译
这段代码读取并拼接了`customer`对象的属性`address0`、`address1`、`address2`和`address3`。
:::

This brief example demonstrates the flexibility of using array notation to access properties of an object with string expressions. This code could be rewritten using the dot notation, but there are cases in which only the array notation will do. Suppose, for example, that you are writing a program that uses network resources to compute the current value of the user’s stock market investments. The program allows the user to type in the name of each stock they own as well as the number of shares of each stock. You might use an object named portfolio to hold this information. The object has one property for each stock. The name of the property is the name of the stock, and the property value is the number of shares of that stock. So, for example, if a user holds 50 shares of stock in IBM, the `portfolio.ibm` property has the value 50.

::: tip 翻译
这个简单的示例演示了使用数组表示法通过字符串表达式访问对象属性的灵活性。这段代码也可以使用点表示法重写，但某些场景只有使用数组表示法才行得通。例如，假设你在写一个程序，利用网络资源计算用户在股市上投资的价值。这个程序允许用户填写自己持有的每只股票的名字和数量。假设使用名为`portfolio`的对象来保存这些信息，该对象对每只股票都有一个属性，其每个属性名都是股票的名字，而属性值是该股票的数量。因此如果一个用户持有 50 股 IBM 股票，则 `portfolio.ibm` 属性的值就是 50。
:::

Part of this program might be a function for adding a new stock to the portfolio:

::: tip 翻译
这个程序可能包含一个函数，用于为投资组合（portfolio）添加新股票：
:::

```js
function addstock(portfolio, stockname, shares) {
  portfolio[stockname] = shares;
}
```

Since the user enters stock names at runtime, there is no way that you can know the property names ahead of time. Since you can’t know the property names when you write the program, there is no way you can use the `.` operator to access the properties of the portfolio object. You can use the `[]` operator, however, because it uses a string value (which is dynamic and can change at runtime) rather than an identifier (which is static and must be hardcoded in the program) to name the property.

::: tip 翻译
由于用户是在运行时输入股票名字，不可能提前知道属性名。既然不可能在写程序时就知道属性名，那就没办法使用`.`操作符访问`portfolio`对象的属性。不过，可以使用`[]`操作符，因为它使用字符串值（字符串是动态的，可以在运行时修改）而不是标识符（标识符是静态的，必须硬编码到程序中）来命名属性。
:::

In [Chapter 5](./Chapter-05-Statements.md), we introduced the `for/in` loop (and we’ll see it again shortly, in §6.6). The power of this JavaScript statement becomes clear when you consider its use with associative arrays. Here is how you would use it when computing the total value of a portfolio:

::: tip 翻译
[第 5 章](./Chapter-05-Statements.md)曾介绍过 `for/in` 循环（稍后在 6.6 节还会看到）。这个 JavaScript 语句的威力在结合关联数组一起使用时可以明显地体现出来。以下代码演示了如何计算投资组合的总价值：
:::

```js
function computeValue(portfolio) {
  let total = 0.0;
  for (let stock in portfolio) {
    // 对于投资组合中的每只股票
    let shares = portfolio[stock]; // 取得股票数量
    let price = getQuote(stock); // 查询股价
    total += shares * price; // 把单只股票价值加到总价值上
  }
  return total; // 返回总价值
}
```

JavaScript objects are commonly used as associative arrays as shown here, and it is important to understand how this works. In ES6 and later, however, the Map class described in §11.1.2 is often a better choice than using a plain object.

::: tip 翻译
JavaScript 对象经常像这样作为关联数组使用，理解其原理非常重要。不过，在 ES6 及之后的版本中，使用 Map 类（将在 11.1.2 节介绍）通常比使用普通对象更好。
:::

### 继承

JavaScript objects have a set of “own properties,” and they also inherit a set of properties from their prototype object. To understand this, we must consider property access in more detail. The examples in this section use the `Object.create()` function to create objects with specified prototypes. We’ll see in [Chapter 9](./Chapter-09-Classes.md), however, that every time you create an instance of a class with new, you are creating an object that inherits properties from a prototype object.

::: tip 翻译
JavaScript 对象有一组“自有属性”，同时也从它们的原型对象继承一组属性。要理解这一点，必须更详细地分析属性存取。本节的示例将使用`Object.create()`函数以指定原型来创建对象。不过在[第 9 章](./Chapter-09-Classes.md)我们将看到，每次通过`new`创建一个类的实例，都会创建从某个原型对象继承属性的对象。
:::

Suppose you query the property `x` in the object `o`. If `o` does not have an own property with that name, the prototype object of `o` is queried for the property `x`. If the prototype object does not have an own property by that name, but has a prototype itself, the query is performed on the prototype of the prototype. This continues until the property `x` is found or until an object with a `null` prototype is searched. As you can see, the prototype attribute of an object creates a chain or linked list from which properties are inherited:

::: tip 翻译
假设要从对象`o`中查询属性`x`。如果`o`没有叫这个名字的自有属性，则会从`o`的原型对象查询属性`x`。如果原型对象也没有叫这个名字的自有属性，但它有自己的原型，则会继续查询这个原型的原型。这个过程一直持续，直至找到属性`x`或者查询到一个原型为`null`的对象。可见，对象通过其`prototype`属性创建了一个用于继承属性的链条或链表：
:::

```js
let o = {}; // o 从 Object.prototype 继承对象方法
o.x = 1; // 现在它有了自有属性 x.
let p = Object.create(o); // p 从 o 和 Object.prototype 继承属性
p.y = 2; // 而且有一个自有属性y.
let q = Object.create(p); // q 从 p, o, 和 Object.prototype 继承属性
q.z = 3; // 且有一个自有属性 z.
let f = q.toString(); // toString 继承自 Object.prototype
q.x + q.y; // => 3; x 和 y 分别继承自 o 和 p
```

Now suppose you assign to the property `x` of the object `o`. If `o` already has an own (non-inherited) property named `x`, then the assignment simply changes the value of this existing property. Otherwise, the assignment creates a new property named `x` on the object `o`. If `o` previously inherited the property `x`, that inherited property is now hidden by the newly created own property with the same name.

::: tip 翻译
现在假设你为对象`o`的`x`属性赋值。如果`o`有一个名为`x`的自有（非继承）属性，这次赋值就会修改已有`x`属性的值。否则，这次赋值会在对象`o`上创建一个名为`x`的新属性。如果`o`之前继承了属性`x`，那么现在这个继承的属性会被新创建的同名属性隐藏。
:::

Property assignment examines the prototype chain only to determine whether the assignment is allowed. If `o` inherits a read-only property named `x`, for example, then the assignment is not allowed. (Details about when a property may be set are in §6.3.3.) If the assignment is allowed, however, it always creates or sets a property in the original object and never modifies objects in the prototype chain. The fact that inheritance occurs when querying properties but not when setting them is a key feature of JavaScript because it allows us to selectively override inherited properties:

::: tip 翻译
属性赋值查询原型链只为确定是否允许赋值。如果`o`继承了一个名为`x`的只读属性，则不允许赋值（关于什么情况下可以设置属性可以参考 6.3.3 节）。不过，如果允许赋值，则只会在原始对象上创建或设置属性，而不会修改原型链中的对象。查询属性时会用到原型链，而设置属性时不影响原型链是一个重要的 JavaScript 特性，利用这一点，可以选择性地覆盖继承的属性：
:::

```js
let unitcircle = { r: 1 }; // c 继承自的对象
let c = Object.create(unitcircle); // c 继承了属性 r
c.x = 1;
c.y = 1; // c 定义了两个自有属性
c.r = 2; // c 覆盖了它继承的属性
unitcircle.r; // => 1: 原型不受影响
```

There is one exception to the rule that a property assignment either fails or creates or sets a property in the original object. If `o` inherits the property `x`, and that property is an accessor property with a setter method (see §6.10.6), then that setter method is called rather than creating a new property `x` in `o`. Note, however, that the setter method is called on the object `o`, not on the prototype object that defines the property, so if the setter method defines any properties, it will do so on `o`, and it will again leave the prototype chain unmodified.

::: tip 翻译
属性赋值要么失败要么在原始对象上创建或设置属性的规则有一个例外。如果`o`继承了属性`x`，而该属性是一个通过设置方法定义的访问器属性（参见 6.10.6），那么就会调用该设置方法而不会在`o`上创建新属性`x`。要注意，此时会在对象`o`上而不是在定义该属性的原型对象上调用设置方法。因此如果这个设置方法定义了别的属性，那也会在`o`上定义同样的属性，但仍然不会修改原型链。
:::

### 属性访问错误

Property access expressions do not always return or set a value. This section explains the things that can go wrong when you query or set a property.

::: tip 翻译
属性访问表达式并不总是会返回或设置值。本节解释查询或设置属性时可能出错的情况。
:::

It is not an error to query a property that does not exist. If the property `x` is not found as an own property or an inherited property of `o`, the property access expression `o.x` evaluates to `undefined`. Recall that our book object has a “sub-title” property, but not a “subtitle” property:

::: tip 翻译
查询不存在的属性不是错误。如果在`o`的自有属性和继承属性中都没找到属性`x`，则属性访问表达式`o.x`的求值结果为`undefined`。例如，`book`对象有一个“sub-title”属性，没有“subtitle”属性：
:::

```js
book.subtitle; // => undefined: 属性不存在
```

It is an error, however, to attempt to query a property of an object that does not exist. The `null` and `undefined` values have no properties, and it is an error to query properties of these values. Continuing the preceding example:

::: tip 翻译
然而，查询不存在对象的属性则是错误。因为`null`和`undefined`值没有属性，查询这两个值的属性是错误。继续前面的示例：
:::

```js
let len = book.subtitle.length; // !TypeError: undefined 没有 length 属性
```

Property access expressions will fail if the lefthand side of the `.` is `null` or `undefined`. So when writing an expression like `book.author.surname`, you should be careful if you are not certain that book and `book.author` are actually defined. Here are two ways to guard against this kind of problem:

::: tip 翻译
如果`.`的左边是`null`或`undefined`，则属性访问表达式会失败。因此在写类似`book.author.surname`这样的表达式时，要确保`book`和`book.author`是有定义的。以下是两种防止这类问题的写法：
:::

```js
// 简单但麻烦的技术
let surname = undefined;
if (book) {
  if (book.author) {
    surname = book.author.surname;
  }
}

// 取得surname、null或undefined的简洁的惯用技术
surname = book && book.author && book.author.surname;
```

To understand why this idiomatic expression works to prevent TypeError exceptions, you might want to review the short-circuiting behavior of the `&&` operator in §4.10.1.

::: tip 翻译
如果不理解这个惯用表达式为什么可以防止 TypeError 异常，可能需要回头看一看 4.10.1 节中关于`&&`操作符短路行为的解释。
:::

As described in §4.4.1, ES2020 supports conditional property access with `?.`, which allows us to rewrite the previous assignment expression as:

::: tip 翻译
正如 4.4.1 节介绍的，ES2020 通过`?.`支持条件式属性访问，用它可以把前面的赋值表达式改写成：
:::

```js
let surname = book?.author?.surname;
```

Attempting to set a property on `null` or `undefined` also causes a TypeError. Attempts to set properties on other values do not always succeed, either: some properties are read-only and cannot be set, and some objects do not allow the addition of new properties. In strict mode (§5.6.3), a TypeError is thrown whenever an attempt to set a property fails. Outside of strict mode, these failures are usually silent.

::: tip 翻译
尝试在`null`或`undefined`上设置属性也会导致 TypeError。而且，尝试在其他值上设置属性也不总是会成功，因为有些属性是只读的，不能设置，而有些对象不允许添加新属性。在严格模式下（见 5.6.3 节），只要尝试设置属性失败就会抛出 TypeError。在非严格模式下，这些失败通常是静默失败。
:::

The rules that specify when a property assignment succeeds and when it fails are intuitive but difficult to express concisely. An attempt to set a property `p` of an object `o` fails in these circumstances:

- `o` has an own property `p` that is read-only: it is not possible to set read-only properties.
- `o` has an inherited property `p` that is read-only: it is not possible to hide an inherited read-only property with an own property of the same name.
- `o` does not have an own property `p`; `o` does not inherit a property `p` with a setter method, and `o`’s extensible attribute (see §14.2) is `false`. Since `p` does not already exist in `o`, and if there is no setter method to call, then `p` must be added to `o`. But if `o` is not extensible, then no new properties can be defined on it.

::: tip 翻译
关于属性赋值什么时候成功、什么时候失败的规则很容易理解，但却不容易只用简单几句话说清楚。尝试在对象`o`上设置属性`p`在以下情况下会失败：

- `o`有一个只读自有属性`p`：不可能设置只读属性。
- `o`有一个只读继承属性`p`：不可能用同名自有属性隐藏只读继承属性。
- `o`没有自有属性`p`，`o`没有继承通过设置方法定义的属性`p`，`o`的`extensible`特性（参见 14.2 节）是`false`。因为`p`在`o`上并不存在，如果没有要调用的设置方法，那么`p`必须要添加到`o`上。但如果`o`不可扩展（`extensible`为`false`），则不能在它上面定义新属性。
  :::

## 删除属性

The `delete` operator (§4.13.4) removes a property from an object. Its single operand should be a property access expression. Surprisingly, `delete` does not operate on the value of the property but on the property itself:

::: tip 翻译
`delete`操作符（参见 4.13.4 节）用于从对象中移除属性。它唯一的操作数应该是一个属性访问表达式。令人惊讶的是，`delete`并不操作属性的值，而是操作属性本身：
:::

```js
delete book.author; // book 对象现在没有author属性了
delete book["main title"]; // 现在它也没有 "main title" 属性了。
```

The `delete` operator only deletes own properties, not inherited ones. (To delete an inherited property, you must delete it from the prototype object in which it is defined. Doing this affects every object that inherits from that prototype.)

::: tip 翻译
`delete`操作符只删除自有属性，不删除继承属性（要删除继承属性，必须从定义属性的原型对象上删除。这样做会影响继承该原型的所有对象）。
:::

A `delete` expression evaluates to `true` if the delete succeeded or if the delete had no effect (such as deleting a nonexistent property). `delete` also evaluates to `true` when used (meaninglessly) with an expression that is not a property access expression:

::: tip 翻译
如果`delete`操作成功或没有影响（如删除不存在的属性），则`delete`表达式求值为`true`。对非属性访问表达式（无意义地）使用`delete`，同样也会求值为`true`：
:::

```js
let o = { x: 1 }; // o 有自有属性x和继承属性 toString
delete o.x; // => true: 删除属性 x
delete o.x; // => true: 什么也不做（x不存在）但仍然返回true
delete o.toString; // => true: 什么也不做（toString 不是自有属性）
delete 1; // => true: 无意义，但仍然返回true
```

`delete` does not remove properties that have a configurable attribute of `false`. Certain properties of built-in objects are non-configurable, as are properties of the global object created by variable declaration and function declaration. In strict mode, attempting to delete a non-configurable property causes a TypeError. In non-strict mode, delete simply evaluates to `false` in this case:

::: tip 翻译
`delete`不会删除`configurable`特性为`false`的属性。与通过变量声明或函数声明创建的全局对象的属性一样，某些内置对象的属性也是不可配置的。在严格模式下，尝试删除不可配置的属性会导致 TypeError。在非严格模式下，`delete`直接求值为`false`：
:::

```js
// 在严格模式下，以下所有删除操作都会抛出TypeError,而不是返回false
delete Object.prototype; // => false: 属性不可配置
var x = 1; // 声明一个全局变量
delete globalThis.x; // => false: 不能删除这个属性
function f() {} // 声明一个全局函数
delete globalThis.f; // => false: 也不能删除这个属性
```

When deleting configurable properties of the global object in non-strict mode, you can omit the reference to the global object and simply follow the `delete` operator with the property name:

::: tip 翻译
在非严格模式下删除全局对象可配置的属性时，可以省略对全局对象的引用，只在`delete`操作符后面加上属性名：
:::

```js
globalThis.x = 1; // 创建可配置的全局属性（没有let 或var）
delete x; // => true: 这个属性可以删除
```

In strict mode, however, `delete` raises a SyntaxError if its operand is an unqualified identifier like x, and you have to be explicit about the property access:

::: tip 翻译
在严格模式下，如果操作数是一个像`x`这样的非限定标识符，`delete`会抛出 SyntaxError，即必须写出完整的属性访问表达式：
:::

```js
delete x; // 在严格模式下报 SyntaxError
delete globalThis.x; // 这样可以
```

## 测试属性

JavaScript objects can be thought of as sets of properties, and it is often useful to be able to test for membership in the set—to check whether an object has a property with a given name. You can do this with the in operator, with the `hasOwnProperty()` and `propertyIsEnumerable()` methods, or simply by querying the property. The examples shown here all use strings as property names, but they also work with Symbols (§6.10.3).

::: tip 翻译
JavaScript 对象可以被想象成一组属性，实际开发中经常需要测试这组属性的成员关系，即检查对象是否有一个给定名字的属性。为此，可以使用`in`操作符，或者`hasOwnProperty()`、`propertyIsEnumerable()`方法，或者直接查询相应属性。下面的示例都使用字符串作为属性名，但这些示例也适用于符号属性（参见 6.10.3 节）。
:::

The `in` operator expects a property name on its left side and an object on its right. It returns true if the object has an own property or an inherited property by that name:

::: tip 翻译
`in`操作符要求左边是一个属性名，右边是一个对象。如果对象有包含相应名字的自有属性或继承属性，将返回`true`：
:::

```js
let o = { x: 1 };
"x" in o; // => true: o 有自有属性 "x"
"y" in o; // => false: o 没有属性 "y"
"toString" in o; // => true: o 继承了 toString 属性
```

The `hasOwnProperty()` method of an object tests whether that object has an own property with the given name. It returns `false` for inherited properties:

::: tip 翻译
对象的`hasOwnProperty()`方法用于测试对象是否有给定名字的属性。对继承的属性，它返回`false`：
:::

```js
let o = { x: 1 };
o.hasOwnProperty("x"); // => true: o 有自有属性 x
o.hasOwnProperty("y"); // => false: o 没有属性 y
o.hasOwnProperty("toString"); // => false: toString 是继承属性
```

The `propertyIsEnumerable()` refines the `hasOwnProperty()` test. It returns `true` only if the `named` property is an own property and its enumerable attribute is true. Certain built-in properties are not enumerable. Properties created by normal JavaScript code are enumerable unless you’ve used one of the techniques shown in §14.1 to make them non-enumerable.

::: tip 翻译
`propertyIsEnumerable()`方法细化了`hasOwnProperty()`测试。如果传入的命名属性是自有属性且这个属性的`enumerable`特性为`true`，这个方法会返回`true`。某些内置属性是不可枚举的。使用常规 JavaScript 代码创建的属性都是可枚举的，除非使用 14.1 节的技术将它们限制为不可枚举：
:::

```js
let o = { x: 1 };
o.propertyIsEnumerable("x"); // => true: o 有一个可枚举属性 x
o.propertyIsEnumerable("toString"); // => false: toString不是自有属性
Object.prototype.propertyIsEnumerable("toString"); // => false: 不可枚举
```

Instead of using the `in` operator, it is often sufficient to simply query the property and use `!==` to make sure it is not undefined:

::: tip 翻译
除了使用`in`操作符，通常简单的属性查询配合`!==`确保其不是未定义的就可以了：
:::

```js
let o = { x: 1 };
o.x !== undefined; // => true: o 有属性 x
o.y !== undefined; // => false: o 没有属性 y
o.toString !== undefined; // => true: o 继承了 toString 属性
```

There is one thing the in operator can do that the simple property access technique shown here cannot do. in can distinguish between properties that do not exist and properties that exist but have been set to `undefined`. Consider this code:

::: tip 翻译
但有一件事`in`操作符可以做，而简单的属性访问技术做不到。`in`可以区分不存在的属性和存在但被设置为`undefined`的属性。来看下面的代码：
:::

```js
let o = { x: undefined }; // 把属性显示设置为 undefined
o.x !== undefined; // => false: 属性存在但值是 undefined
o.y !== undefined; // => false: 属性不存在
"x" in o; // => true: 属性存在
"y" in o; // => false: 属性不存在
delete o.x; // 删除属性 x
"x" in o; // => false: 属性x不存在了
```

## 枚举属性

Instead of testing for the existence of individual properties, we sometimes want to iterate through or obtain a list of all the properties of an object. There are a few different ways to do this.

::: tip 翻译
除了测试属性是否存在，有时候也需要遍历或获取对象的所有属性。为此有几种不同的实现方式。
:::

The `for/in` loop was covered in §5.4.5. It runs the body of the loop once for each enumerable property (own or inherited) of the specified object, assigning the name of the property to the loop variable. Built-in methods that objects inherit are not enumerable, but the properties that your code adds to objects are enumerable by default. For example:

::: tip 翻译
5.4.5 节介绍的`for/in`循环对指定对象的每个可枚举（自有或继承）属性都会运行一次循环体，将属性的名字赋给循环变量。对象继承的内置方法是不可枚举的，但你的代码添加给对象的属性默认是可枚举的。例如：
:::

```js
let o = { x: 1, y: 2, z: 3 }; // 3个可枚举自有属性
o.propertyIsEnumerable("toString"); // => false: 不可枚举
for (let p in o) {
  // 循环遍历属性
  console.log(p); // 打印 x, y, 和 z, 但没有 toString
}
```

To guard against enumerating inherited properties with `for/in`, you can add an explicit check inside the loop body:

::: tip 翻译
为防止通过`for/in`枚举继承的属性，可以在循环体内添加一个显式测试：
:::

```js
for (let p in o) {
  if (!o.hasOwnProperty(p)) continue; // 跳过继承的属性
}

for (let p in o) {
  if (typeof o[p] === "function") continue; // 跳过所有方法
}
```

As an alternative to using a `for/in` loop, it is often easier to get an array of property names for an object and then loop through that array with a `for/of` loop. There are four functions you can use to get an array of property names:

- `Object.keys()` returns an array of the names of the enumerable own properties of an object. It does not include non-enumerable properties, inherited properties, or properties whose name is a Symbol (see §6.10.3).
- `Object.getOwnPropertyNames()` works like `Object.keys()` but returns an array of the names of non-enumerable own properties as well, as long as their names are strings.
- `Object.getOwnPropertySymbols()` returns own properties whose names are Symbols, whether or not they are enumerable.
- `Reflect.ownKeys()` returns all own property names, both enumerable and non-enumerable, and both string and Symbol. (See §14.6.)

::: tip 翻译
除了使用`for/in`循环，有时候可以先获取对象所有属性名的数组，然后再通过`for/of`循环遍历该数组。有 4 个函数可以用来取得属性名数组：

- `Object.keys()`返回对象可枚举自有属性名的数组。不包含不可枚举属性、继承属性或名字是符号的属性（参见 6.10.3 节）。
- `Object.getOwnPropertyNames()`与`Object.keys()`类似，但也会返回不可枚举自有属性名的数组，只要它们的名字是字符串。
- `Object.getOwnPropertySymbols()`返回名字是符号的自有属性，无论是否可枚举。
- `Reflect.ownKeys()`返回所有属性名，包括可枚举和不可枚举属性，以及字符串属性和符号属性（参见 14.6 节）。
  :::

There are examples of the use of `Object.keys()` with a `for/of` loop in §6.7.

::: tip 翻译
6.7 节给出了使用`Object.keys()`和`for/of`循环的示例。
:::

### 属性枚举顺序

ES6 formally defines the order in which the own properties of an object are enumerated. `Object.keys()`, `Object.getOwnPropertyNames()`, `Object.getOwnPropertySymbols()`, `Reflect.ownKeys()`, and related methods such as `JSON.stringify()` all list properties in the following order, subject to their own additional constraints about whether they list non-enumerable properties or properties whose names are strings or Symbols:

- String properties whose names are non-negative integers are listed first, in numeric order from smallest to largest. This rule means that arrays and array-like objects will have their properties enumerated in order.
- After all properties that look like array indexes are listed, all remaining properties with string names are listed (including properties that look like negative numbers or floating-point numbers). These properties are listed in the order in which they were added to the object. For properties defined in an object literal, this order is the same order they appear in the literal.
- Finally, the properties whose names are Symbol objects are listed in the order in which they were added to the object.

::: tip 翻译
ES6 正式定义了枚举对象自有属性的顺序。`Object.keys()`、`Object.getOwnPropertyNames()`、`Object.getOwnPropertySymbols()`、`Reflect.onwKeys()`及`JSON.stringify()`等相关方法都按照下面的顺序列出属性，另外也受限于它们要列出不可枚举属性还是列出字符串属性或符号属性：

- 先列出名字为非负整数的字符串属性，按照数值顺序从最小到最大。这条规则意味着数组和类数组对象的属性会按照顺序被枚举。
- 在列出类数组索引的所有属性之后，再列出所有剩下的字符串名字（包括看起来像负数或浮点数的名字）的属性。这些属性按照它们添加到对象的先后顺序列出。对于在对象字面量中定义的属性，按照它们在字面量中出现的顺序列出。
- 最后，名字为符号对象的属性按照它们添加到对象的先后顺序列出。
  :::

The enumeration order for the `for/in` loop is not as tightly specified as it is for these enumeration functions, but implementations typically enumerate own properties in the order just described, then travel up the prototype chain enumerating properties in the same order for each prototype object. Note, however, that a property will not be enumerated if a property by that same name has already been enumerated, or even if a non-enumerable property by the same name has already been considered.

::: tip 翻译
`for/in`循环的枚举顺序并不像上述枚举函数那么严格，但实现通常会按照上面描述的顺序枚举自有属性，然后再沿原型链上溯，以同样的顺序枚举每个原型对象的属性。不过要注意，如果已经有同名属性被枚举过了，甚至如果有一个同名属性是不可枚举的，那这个属性就不会枚举了。
:::

## 扩展对象

A common operation in JavaScript programs is needing to copy the properties of one object to another object. It is easy to do that with code like this:

::: tip 翻译
在 JavaScript 程序中，把一个对象的属性复制到另一个对象上是很常见的。使用下面的代码很容易做到：
:::

```js
let target = { x: 1 },
  source = { y: 2, z: 3 };
for (let key of Object.keys(source)) {
  target[key] = source[key];
}
target; // => {x: 1, y: 2, z: 3}
```

But because this is a common operation, various JavaScript frameworks have defined utility functions, often named `extend()`, to perform this copying operation. Finally, in ES6, this ability comes to the core JavaScript language in the form of `Object.assign()`.

::: tip 翻译
但因为这是个常见操作，各种 JavaScript 框架纷纷为此定义了辅助函数，通常会命名为`extend()`。最终，在 ES6 中，这个能力以`Object.assign()`的形式进入了核心 JavaScript 语言。
:::

`Object.assign()` expects two or more objects as its arguments. It modifies and returns the first argument, which is the target object, but does not alter the second or any subsequent arguments, which are the source objects. For each source object, it copies the enumerable own properties of that object (including those whose names are Symbols) into the target object. It processes the source objects in argument list order so that properties in the first source object override properties by the same name in the target object and properties in the second source object (if there is one) override properties with the same name in the first source object.

::: tip 翻译
`Object.assign()`接收两个或多个对象作为其参数。它会修改并返回第一个参数，第一个参数是目标对象，但不会修改第二个及后续参数，那些都是来源对象。对于每个来源对象，它会把该对象的可枚举自有属性（包括名字为符号的属性）复制到目标对象。它按照参数列表顺序逐个处理来源对象，第一个来源对象的属性会覆盖目标对象的同名属性，而第二个来源对象（如果有）的属性会覆盖第一个来源对象的同名属性。
:::

`Object.assign()` copies properties with ordinary property get and set operations, so if a source object has a getter method or the target object has a setter method, they will be invoked during the copy, but they will not themselves be copied.

::: tip 翻译
`Object.assign()`以普通的属性获取和设置方式复制属性，因此如果一个来源对象有获取方法或目标对象有设置方法，则它们会在复制期间被调用，但这些方法本身不会被复制。
:::

One reason to assign properties from one object into another is when you have an object that defines default values for many properties and you want to copy those default properties into another object if a property by that name does not already exist in that object. Using `Object.assign()` naively will not do what you want:

::: tip 翻译
将属性从一个对象分配到另一个对象的一个原因是，如果有一个默认对象为很多属性定义了默认值，并且如果该对象中不存在同名属性，可以将这些默认属性复制到另一个对象中。但是，像下面这样简单地使用`Object.assign()`不会达到目的：
:::

```js
Object.assign(o, defaults); // 用defaults覆盖o的所有属性
```

Instead, what you can do is to create a new object, copy the defaults into it, and then override those defaults with the properties in `o`:

::: tip 翻译
此时，需要创建一个新对象，先把默认值复制到新对象中，然后再使用`o`的属性覆盖那些默认值：
:::

```js
o = Object.assign({}, defaults, o);
```

We’ll see in §6.10.4 that you can also express this object copy-and-override operation using the `...` spread operator like this:

::: tip 翻译
在后面 6.10.4 节我们会看到，使用扩展操作符`...`也可以表达这种对象复制和覆盖操作：
:::

```js
o = { ...defaults, ...o };
```

We could also avoid the overhead of the extra object creation and copying by writing a version of `Object.assign()` that copies properties only if they are missing:

::: tip 翻译
为了避免额外的对象创建和复制，也可以重写一版`Object.assign()`，只复制那些不存在的属性：
:::

```js
// 与 Object.assign() 类似，但不覆盖已经存在的属性
// (同时也不处理符号属性)
function merge(target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      if (!(key in target)) {
        // 这里跟 Object.assign() 不同
        target[key] = source[key];
      }
    }
  }
  return target;
}
Object.assign({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 }); // => {x: 2, y: 3, z: 4}
merge({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 }); // => {x: 1, y: 2, z: 4}
```

It is straightforward to write other property manipulation utilities like this `merge()` function. A `restrict()` function could delete properties of an object if they do not appear in another template object, for example. Or a `subtract()` function could remove all of the properties of one object from another object.

::: tip 翻译
编写类似`merge()`的属性操作辅助方法很简单。例如，可以写一个`restrict()`函数，用于从一个对象中删除另一个模板对象没有的属性。或者写一个`subtract()`函数，用于从一个对象中删除另一个对象包含的所有属性。
:::

## 序列化对象

Object _serialization_ is the process of converting an object’s state to a string from which it can later be restored. The functions `JSON.stringify()` and `JSON.parse()` serialize and restore JavaScript objects. These functions use the JSON data interchange format. JSON stands for “JavaScript Object Notation,” and its syntax is very similar to that of JavaScript object and array literals:

::: tip 翻译
对象序列化（serialization）是把对象的状态转换为字符串的过程，之后可以从中恢复对象的状态。函数`JSON.stringify()`和`JSON.parse()`用于序列化和恢复 JavaScript 对象。这两个函数使用 JSON 数据交换格式。JSON 表示"JavaScript Object Notation"（JavaScript 对象表示法），其语法与 JavaScript 对象和数组字面量非常类似：
:::

```js
let o = { x: 1, y: { z: [false, null, ""] } }; // 定义一个测试对象
let s = JSON.stringify(o); // s == '{"x":1,"y":{"z":[false,null,""]}}'
let p = JSON.parse(s); // p == {x: 1, y: {z: [false, null, ""]}}
```

JSON syntax is a _subset_ of JavaScript syntax, and it cannot represent all JavaScript values. Objects, arrays, strings, finite numbers, `true`, `false`, and `null` are supported and can be serialized and restored. `NaN`, `Infinity`, and `-Infinity` are serialized to `null`. `Date` objects are serialized to ISO-formatted date strings (see the `Date.toJSON()` function), but `JSON.parse()` leaves these in string form and does not restore the original `Date` object. Function, RegExp, and Error objects and the `undefined` value cannot be serialized or restored. `JSON.stringify()` serializes only the enumerable own properties of an object. If a property value cannot be serialized, that property is simply omitted from the stringified output. Both `JSON.stringify()` and `JSON.parse()` accept optional second arguments that can be used to customize the serialization and/or restoration process by specifying a list of properties to be serialized, for example, or by converting certain values during the serialization or stringification process. Complete documentation for these functions is in §11.6.

::: tip 翻译
JSON 语法是 JavaScript 语法的子集，不能表示所有 JavaScript 的值。可以序列化和恢复的值包括对象、数组、字符串、有限数值、`true`、`false`和`null`。`NaN`、`Infinity`和`-Infinity`会被序列化为`null`。日期对象会被序列化为 ISO 格式的日期字符串（参见`Date.toJSON()`函数），但`JSON.parse()`会保持其字符串形式，不会恢复原始的日期对象。函数、RegExp 和 Error 对象以及`undefined`值不能被序列化或恢复。`JSON.stringify()`只序列化对象的可枚举自有属性。如果属性值无法序列化，则该属性会从输出的字符串中删除。`JSON.stringify()`和`JSON.parse()`都接收可选的第二个参数，用于自定义序列化及恢复操作。例如，可以通过这个参数指定要序列化哪些属性，或者在序列化或字符串化过程中如何转换某些值。11.6 节包含这两个函数的完整介绍。
:::

## 对象方法

As discussed earlier, all JavaScript objects (except those explicitly created without a prototype) inherit properties from `Object.prototype`. These inherited properties are primarily methods, and because they are universally available, they are of particular interest to JavaScript programmers. We’ve already seen the `hasOwnProperty()` and `propertyIsEnumerable()` methods, for example. (And we’ve also already covered quite a few static functions defined on the Object constructor, such as `Object.create()` and `Object.keys()`.) This section explains a handful of universal object methods that are defined on Object.prototype, but which are intended to be replaced by other, more specialized implementations. In the sections that follow, we show examples of defining these methods on a single object. In [Chapter 9](./Chapter-09-Classes.md), you’ll learn how to define these methods more generally for an entire class of objects.

::: tip 翻译
如前所述，所有 JavaScript 对象（除了那些显式创建为没有原型的）都从`Object.prototype`继承属性。这些继承的属性主要是方法，因为它们几乎无处不在，所以对 JavaScript 程序而言特别重要。例如，前面我们已经看到过`hasOwnProperty()`和`propertyIsEnumerable()`方法了（而且我们也介绍了几个定义在 Object 构造函数上的静态方法，例如`Object.create()`和`Object.keys()`）。本节讲解`Object.prototype`上定义的几个通用方法，但这些方法很有可能被更特定的实现所取代。后面几节我们将展示在同一个对象上定义这些方法的示例。在[第 9 章](./Chapter-09-Classes.md)，我们还会学习如何为整个对象的类定义更通用的方法。
:::

### toString() 方法

The `toString()` method takes no arguments; it returns a string that somehow represents the value of the object on which it is invoked. JavaScript invokes this method of an object whenever it needs to convert the object to a string. This occurs, for example, when you use the `+` operator to concatenate a string with an object or when you pass an object to a method that expects a string.

::: tip 翻译
`toString()`方法不接收参数，返回表示调用它的对象的值的字符串。每当需要把一个对象转换为字符串时，JavaScript 就会调用该对象的这个方法。例如，在使用`+`操作符拼接一个字符串和一个对象时，或者把一个对象传入期望字符串参数的方法时。
:::

The default `toString()` method is not very informative (though it is useful for determining the class of an object, as we will see in §14.4.3). For example, the following line of code simply evaluates to the string “[object Object]”:

::: tip 翻译
默认的`toString()`方法并不能提供太多信息（但可以用于确定对象的类，如 14.4.3 节所示）。例如，下面这行代码只会得到字符串“[object Object]”：
:::

```js
let s = { x: 1, y: 1 }.toString(); // s == "[object Object]"
```

Because this default method does not display much useful information, many classes define their own versions of `toString()`. For example, when an array is converted to a string, you obtain a list of the array elements, themselves each converted to a string, and when a function is converted to a string, you obtain the source code for the function. You might define your own `toString()` method like this:

::: tip 翻译
由于这个默认方法不会显示太有用的信息，很多类都会重新定义自己的`toString()`方法。例如，在把数组转换为字符串时，可以得到数组元素的一个列表，每个元素也都会转换为字符串。而把函数转换为字符串时，可以得到函数的源代码。可以像下面这样定义自己的`toString()`方法：
:::

```js
let point = {
  x: 1,
  y: 2,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
};
String(point); // => "(1, 2)": toString() 用于转换为字符串
```

### toLocaleString() 方法

In addition to the basic `toString()` method, objects all have a `toLocaleString()`. The purpose of this method is to return a localized string representation of the object. The default `toLocaleString()` method defined by Object doesn’t do any localization itself: it simply calls `toString()` and returns that value. The Date and Number classes define customized versions of `toLocaleString()` that attempt to format numbers, dates, and times according to local conventions. Array defines a `toLocaleString()` method that works like `toString()` except that it formats array elements by calling their `toLocaleString()` methods instead of their `toString()` methods. You might do the same thing with a point object like this:

::: tip 翻译
除了基本的`toString()`方法之外，对象也都有一个`toLocaleString()`方法。这个方法的用途是返回对象的本地化字符串表示。Object 定义的默认`toLocaleString()`方法本身没有实现任何本地化，而是简单地调用`toString()`并返回该值。Date 和 Number 类定义了自己的`toLocaleString()`方法，尝试根据本地惯例格式化数值、日期和时间。数组也定义了一个与`toString()`类似的`toLocaleString()`方法，只不过它会调用每个数组元素的`toLocaleString()`方法，而不是调用它们的`toString()`方法。对于前面的`point`对象，我们也可以如法炮制：
:::

```js
let point = {
  x: 1000,
  y: 2000,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
  toLocaleString: function () {
    return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
  },
};
point.toString(); // => "(1000, 2000)"
point.toLocaleString(); // => "(1,000, 2,000)": 注意千分位分隔符
```

The internationalization classes documented in §11.7 can be useful when implementing a `toLocaleString()` method.

::: tip 翻译
11.7 节介绍的国际化类可以用于实现`toLocaleString()`方法。
:::

### valueOf() 方法

The `valueOf()` method is much like the `toString()` method, but it is called when JavaScript needs to convert an object to some primitive type other than a string-typically, a number. JavaScript calls this method automatically if an object is used in a context where a primitive value is required. The default `valueOf()` method does nothing interesting, but some of the built-in classes define their own `valueOf()` method. The Date class defines `valueOf()` to convert dates to numbers, and this allows Date objects to be chronologically compared with `<` and `>`. You could do something similar with a point object, defining a `valueOf()` method that returns the distance from the origin to the point:

::: tip 翻译
`valueOf()`方法与`toString()`方法很相似，但会在 JavaScript 需要把对象转换为某些非字符串原始值（通常是数值）时被调用。如果在需要原始值的上下文中使用了对象，JavaScript 会自动调用这个对象的`valueOf()`方法。默认的`valueOf()`方法并没有做什么，因此一些内置类定义了自己的`valueOf()`方法。Date 类定义的`valueOf()`方法可以将日期转换为数值，这样就让日期对象可以通过`<`和`>`操作符来进行比较。类似地，对于`point`对象，我们也可以定义一个返回原点与当前点之间距离的`valueOf()`：
:::

```js
let point = {
  x: 3,
  y: 4,
  valueOf: function () {
    return Math.hypot(this.x, this.y);
  },
};
Number(point); // => 5: valueOf() 用于转换为数值
point > 4; // => true
point > 5; // => false
point < 6; // => true
```

### toJSON() 方法

`Object.prototype` does not actually define a `toJSON()` method, but the `JSON.stringify()` method (see §6.8) looks for a `toJSON()` method on any object it is asked to serialize. If this method exists on the object to be serialized, it is invoked, and the return value is serialized, instead of the original object. The Date class (§11.4) defines a `toJSON()` method that returns a serializable string representation of the date. We could do the same for our Point object like this:

::: tip 翻译
`Object.prototype` 实际上并未定义 `toJSON()`方法，但`JSON.stringify()`方法（参见 6.8 节）会从要序列化的对象上寻找`toJSON()`方法。如果要序列化的对象上存在这个方法，就会调用它，然后序列化该方法的返回值，而不是原始对象。Date 类（参见 11.4 节）定义了自己的 `toJSON()`方法，返回一个表示日期的序列化字符串。同样，我们也可以给 `point` 对象定义这个方法：
:::

```js
let point = {
  x: 1,
  y: 2,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
  toJSON: function () {
    return this.toString();
  },
};
JSON.stringify([point]); // => '["(1, 2)"]'
```

## 对象字面量扩展语法

Recent versions of JavaScript have extended the syntax for object literals in a number of useful ways. The following subsections explain these extensions.

::: tip 翻译
最近的 JavaScript 版本从几个方面扩展了对象字面量语法。下面将讲解这些扩展。
:::

### 简写属性

Suppose you have values stored in variables `x` and `y` and want to create an object with properties named `x` and `y` that hold those values. With basic object literal syntax, you’d end up repeating each identifier twice:

::: tip 翻译
假设变量`x`和`y`中保存着值，而你想创建一个具有属性`x`和`y`且值分别为相应变量值的对象。如果使用基本的对象字面量语法，需要把每个标识符重复两次：
:::

```js
let x = 1,
  y = 2;
let o = {
  x: x,
  y: y,
};
```

In ES6 and later, you can drop the colon and one copy of the identifier and end up with much simpler code:

::: tip 翻译
在 ES6 及之后，可以删掉其中的分号和一份标识符，得到非常简洁的代码：
:::

```js
let x = 1,
  y = 2;
let o = { x, y };
o.x + o.y; // => 3
```

### 计算的属性名

Sometimes you need to create an object with a specific property, but the name of that property is not a compile-time constant that you can type literally in your source code. Instead, the property name you need is stored in a variable or is the return value of a function that you invoke. You can’t use a basic object literal for this kind of property. Instead, you have to create an object and then add the desired properties as an extra step:

::: tip 翻译
有时候，我们需要创建一个具有特定属性的对象，但该属性的名字不是编译时可以直接写在源代码中的常量。相反，你需要的这个属性名保存在一个变量里，或者是调用的某个函数的返回值。不能对这种属性使用基本对象字面量。为此，必须先创建一个对象，然后再为它添加想要的属性：
:::

```js
const PROPERTY_NAME = "p1";
function computePropertyName() {
  return "p" + 2;
}

let o = {};
o[PROPERTY_NAME] = 1;
o[computePropertyName()] = 2;
```

It is much simpler to set up an object like this with an ES6 feature known as _computed properties_ that lets you take the square brackets from the preceding code and move them directly into the object literal:

::: tip 翻译
而使用 ES6 称为计算属性的特性可以更简单地创建类似对象，这个特性可以让你直接把前面代码中的方括号放在对象字面量中：
:::

```js
const PROPERTY_NAME = "p1";
function computePropertyName() {
  return "p" + 2;
}

let p = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2,
};

p.p1 + p.p2; // => 3
```

With this new syntax, the square brackets delimit an arbitrary JavaScript expression. That expression is evaluated, and the resulting value (converted to a string, if necessary) is used as the property name.

::: tip 翻译
有了这个语法，就可以在方括号中加入任意 JavaScript 表达式。对这个表达式求值得到的结果（必要时转换为字符串）会用作属性的名字。
:::

One situation where you might want to use computed properties is when you have a library of JavaScript code that expects to be passed objects with a particular set of properties, and the names of those properties are defined as constants in that library. If you are writing code to create the objects that will be passed to that library, you could hardcode the property names, but you’d risk bugs if you type the property name wrong anywhere, and you’d risk version mismatch issues if a new version of the library changes the required property names. Instead, you might find that it makes your code more robust to use computed property syntax with the property name constants defined by the library.

::: tip 翻译
一个可能需要计算属性的场景是，有一个 JavaScript 代码库，需要给这个库传入一个包含一组特定属性的对象，而这组属性的名字在该库中是以常量形式定义的。如果通过代码来创建要传给该库的这个对象，可以硬编码它的属性名，但是这样有可能把属性名写错，同时也存在因为库版本升级而修改了属性名导致的错配问题。此时，使用库自身定义的属性名常量，通过计算属性语法来创建这个对象会让你的代码更可靠。
:::

### 符号作为属性名

The computed property syntax enables one other very important object literal feature. In ES6 and later, property names can be strings or symbols. If you assign a symbol to a variable or constant, then you can use that symbol as a property name using the computed property syntax:

::: tip 翻译
计算属性语法也让另一个非常重要的对象字面量特性成为可能。在 ES6 及之后，属性名可以是字符串或符号。如果把符号赋值给一个变量或常量，那么可以使用计算属性语法将该符号作为属性名：
:::

```js
const extension = Symbol("my extension symbol");
let o = {
  [extension]: {
    /* 这个对象中存储扩展数据 */
  },
};
o[extension].x = 0; // 这个属性不会与o的其他属性冲突
```

As explained in §3.6, Symbols are opaque values. You can’t do anything with them other than use them as property names. Every Symbol is different from every other Symbol, however, which means that Symbols are good for creating unique property names. Create a new Symbol by calling the `Symbol()` factory function. (Symbols are primitive values, not objects, so `Symbol()` is not a constructor function that you invoke with new.) The value returned by `Symbol()` is not equal to any other Symbol or other value. You can pass a string to `Symbol()`, and this string is used when your Symbol is converted to a string. But this is a debugging aid only: two Symbols created with the same string argument are still different from one another.

::: tip 翻译
如 3.6 节所解释的，符号是不透明值。除了用作属性名之外，不能用它们做任何事情。不过，每个符号都与其他符号不同，这意味着符号非常适合用于创建唯一属性名。创建新符号需要调用`Symbol()`工厂函数（符号是原始值，不是对象，因此`Symbol()`不是构造函数，不能使用`new`调用）。`Symbol()`返回的值不等于任何其他符号或其他值。可以给`Symbol()`传一个字符串，在把符号转换为字符串时会用到这个字符串。但这个字符串的作用仅限于辅助调试，使用相同字符串参数创建的两个符号依旧是不同的符号。
:::

The point of Symbols is not security, but to define a safe extension mechanism for JavaScript objects. If you get an object from third-party code that you do not control and need to add some of your own properties to that object but want to be sure that your properties will not conflict with any properties that may already exist on the object, you can safely use Symbols as your property names. If you do this, you can also be confident that the third-party code will not accidentally alter your symbolically named properties. (That third-party code could, of course, use `Object.getOwnPropertySymbols()` to discover the Symbols you’re using and could then alter or delete your properties. This is why Symbols are not a security mechanism.)

::: tip 翻译
使用符号不是为了安全，而是为 JavaScript 对象定义安全的扩展机制。如果你从不受控的第三方代码得到一个对象，然后需要为该对象添加一些自己的属性，但又不希望你的属性与该对象原有的任何属性冲突，那就可以放心地使用符号作为属性名。而且，这样一来，你也不必担心第三方代码会意外修改你以符号命名的属性（当然，第三方代码可以使用`Object.getOwnPropertySymbols()`找到你使用的符号，然后修改或删除你的属性。这也是符号不是一种安全机制的原因）。
:::

### 扩展操作符

In ES2018 and later, you can copy the properties of an existing object into a new object using the “spread operator” `...` inside an object literal:

::: tip 翻译
在 ES2018 及之后，可以在对象字面量中使用“扩展操作符”`...`把已有对象的属性复制到新对象中：
:::

```js
let position = { x: 0, y: 0 };
let dimensions = { width: 100, height: 75 };
let rect = { ...position, ...dimensions };
rect.x + rect.y + rect.width + rect.height; // => 175
```

In this code, the properties of the position and dimensions objects are “spread out” into the `rect` object literal as if they had been written literally inside those curly braces. Note that this `...` syntax is often called a spread operator but is not a true JavaScript operator in any sense. Instead, it is a special-case syntax available only within object literals. (Three dots are used for other purposes in other JavaScript contexts, but object literals are the only context where the three dots cause this kind of interpolation of one object into another one.)

::: tip 翻译
这段代码把`position`和`dimensions`对象的属性“扩展”到了`rect`对象字面量中，就像直接把它们的属性写在了花括号中一样。注意，这个`...`语法经常被称为扩展操作符，但却不是真正意义上的 JavaScript 操作符。实际上，它是仅在对象字面量中有效的一种特殊语法（在其他 JavaScript 上下文中，三个点有其他用途。只有在对象字面量中，三个点才会产生这种把一个对象的属性复制到另一个对象中的插值行为）。
:::

If the object that is spread and the object it is being spread into both have a property with the same name, then the value of that property will be the one that comes last:

::: tip 翻译
如果扩展对象和被扩展对象有一个同名属性，那么这个属性的值由后面的对象决定：
:::

```js
let o = { x: 1 };
let p = { x: 0, ...o };
p.x; // => 1: 对象o的值覆盖了初始值
let q = { ...o, x: 2 };
q.x; // => 2: 值2覆盖了前面对象o的值
```

Also note that the spread operator only spreads the own properties of an object, not any inherited ones:

::: tip 翻译
另外要注意，扩展操作符只扩展对象的自有属性，不扩展任何继承属性：
:::

```js
let o = Object.create({ x: 1 }); // o 继承属性 x
let p = { ...o };
p.x; // => undefined
```

Finally, it is worth noting that, although the spread operator is just three little dots in your code, it can represent a substantial amount of work to the JavaScript interpreter. If an object has n properties, the process of spreading those properties into another object is likely to be an `O(n)` operation. This means that if you find yourself using `...` within a loop or recursive function as a way to accumulate data into one large object, you may be writing an inefficient `O(n^2)` algorithm that will not scale well as `n` gets larger.

::: tip 翻译
最后，还有一点需要注意，虽然扩展操作符在你的代码中只是三个小圆点，但它可能给 JavaScript 解释器带来巨大的工作量。如果对象有`n`个属性，把这个属性扩展到另一个对象可能是一种`O(n)`操作。这意味着，如果在循环或递归函数中通过`...`向一个大对象不断追加属性，则很可能你是在写一个低效的`O(n2)`算法。随着`n`越来越大，这个算法可能会成为性能瓶颈。
:::

### 简写方法

When a function is defined as a property of an object, we call that function a _method_ (we’ll have a lot more to say about methods in [Chapters 8](./Chapter-08-Functions.md) and [9](./Chapter-09-Classes.md)). Prior to ES6, you would define a method in an object literal using a function definition expression just as you would define any other property of an object:

::: tip 翻译
在把函数定义为对象属性时，我们称该函数为方法。（[第 8 章](./Chapter-08-Functions.md)和[第 9 章](./Chapter-09-Classes.md)包含更多关于方法的内容）。在 ES6 以前，需要像定义对象的其他属性一样，通过函数定义表达式在对象字面量中定义一个方法：
:::

```js
let square = {
  area: function () {
    return this.side * this.side;
  },
  side: 10,
};
square.area(); // => 100
```

In ES6, however, the object literal syntax (and also the class definition syntax we’ll see in [Chapter 9](./Chapter-09-Classes.md)) has been extended to allow a shortcut where the `function` keyword and the colon are omitted, resulting in code like this:

::: tip 翻译
但在 ES6 中，对象字面量语法（也包括[第 9 章](./Chapter-09-Classes.md)将介绍的类定义语法）经过扩展，允许一种省略`function`关键字和冒号的简写方法，结果代码如下：
:::

```js
let square = {
  area() {
    return this.side * this.side;
  },
  side: 10,
};
square.area(); // => 100
```

Both forms of the code are equivalent: both add a property named `area` to the object literal, and both set the value of that property to the specified function. The shorthand syntax makes it clearer that `area()` is a method and not a data property like `side`.

::: tip 翻译
这两段代码是等价的，都会给对象字面量添加一个名为`area`的属性，都会把该属性的值设置为指定函数。这种简写语法让人一看便知`area()`是方法，而不是像`side`一样的数据属性。
:::

When you write a method using this shorthand syntax, the property name can take any of the forms that are legal in an object literal: in addition to a regular JavaScript identifier like the name area above, you can also use string literals and computed property names, which can include Symbol property names:

::: tip 翻译
在使用这种简写语法来写方法时，属性名可以是对象字面量允许的任何形式。除了像上面的`area`一样的常规 JavaScript 标识符之外，也可以使用字符串字面量和计算的属性名，包括符号属性名：
:::

```js
const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
  "method With Spaces"(x) {
    return x + 1;
  },
  [METHOD_NAME](x) {
    return x + 2;
  },
  [symbol](x) {
    return x + 3;
  },
};
weirdMethods["method With Spaces"](1); // => 2
weirdMethods[METHOD_NAME](1); // => 3
weirdMethods[symbol](1); // => 4
```

Using a Symbol as a method name is not as strange as it seems. In order to make an object iterable (so it can be used with a `for/of` loop), you must define a method with the symbolic name `Symbol.iterator`, and there are examples of doing exactly that in [Chapter 12](./Chapter-12-Iterators_Generators.md).

::: tip 翻译
使用符号作为方法名并没有看起来那么稀罕。为了让对象可迭代（以便在`for/of`循环中使用），必须以符号名`Symbol.iterator`为它定义一个方法，[第 12 章](./Chapter-12-Iterators_Generators.md)将给出定义这个方法的示例。
:::

### 属性的获取方法与设置方法

All of the object properties we’ve discussed so far in this chapter have been _data properties_ with a name and an ordinary value. JavaScript also supports _accessor properties_, which do not have a single value but instead have one or two accessor methods: a _getter_ and/or a _setter_.

::: tip 翻译
到目前为止，本章讨论的所有对象属性都是数据属性，即有一个名字和一个普通的值。除了数据属性之外，JavaScript 还支持为对象定义访问器属性（accessor property），这种属性不是一个值，而是一个或两个访问器方法：一个获取方法（getter）和一个设置方法（setter）。
:::

When a program queries the value of an accessor property, JavaScript invokes the getter method (passing no arguments). The return value of this method becomes the value of the property access expression. When a program sets the value of an accessor property, JavaScript invokes the setter method, passing the value of the righthand side of the assignment. This method is responsible for “setting,” in some sense, the property value. The return value of the setter method is ignored.

::: tip 翻译
当程序查询一个访问器属性的值时，JavaScript 会调用获取方法（不传参数）。这个方法的返回值就是属性访问表达式的值。当程序设置一个访问器属性的值时，JavaScript 会调用设置方法，传入赋值语句右边的值。从某种意义上说，这个方法负责“设置”属性的值。设置方法的返回值会被忽略。
:::

If a property has both a getter and a setter method, it is a read/write property. If it has only a getter method, it is a read-only property. And if it has only a setter method, it is a write-only property (something that is not possible with data properties), and attempts to read it always evaluate to `undefined`.

::: tip 翻译
如果一个属性既有获取方法也有设置方法，则该属性是一个可读写属性。如果只有一个获取方法，那它就是只读属性。如果只有一个设置方法，那它就是只写属性（这种属性通过数据属性是无法实现的），读取这种属性始终会得到`undefined`。
:::

Accessor properties can be defined with an extension to the object literal syntax (unlike the other ES6 extensions we’ve seen here, getters and setters were introduced in ES5):

::: tip 翻译
访问器属性可以通过对象字面量的一个扩展语法来定义（与我们前面看到的其他 ES6 扩展不同，获取方法和设置方法是在 ES5 中引入的）：
:::

```js
let o = {
  // 一个普通的数据属性
  dataProp: value,

  // 通过一对函数定义的一个访问器属性
  get accessorProp() {
    return this.dataProp;
  },
  set accessorProp(value) {
    this.dataProp = value;
  },
};
```

Accessor properties are defined as one or two methods whose name is the same as the property name. These look like ordinary methods defined using the ES6 shorthand except that getter and setter definitions are prefixed with `get` or `set`. (In ES6, you can also use computed property names when defining getters and setters. Simply replace the property name after `get` or `set` with an expression in square brackets.)

::: tip 翻译
访问器属性是通过一个或两个方法来定义的，方法名就是属性名。除了前缀是`get`和`set`之外，这两个方法看起来就像用 ES6 简写语法定义的普通方法一样（在 ES6 中，也可以使用计算的属性名来定义获取方法和设置方法。只要把`get`和`set`后面的属性名替换为用方括号包含的表达式即可）。
:::

The accessor methods defined above simply get and set the value of a data property, and there is no reason to prefer the accessor property over the data property. But as a more interesting example, consider the following object that represents a 2D Cartesian point. It has ordinary data properties to represent the x and y coordinates of the point, and it has accessor properties that give the equivalent polar coordinates of the point:

::: tip 翻译
上面定义的访问器方法只是简单地获取和设置了一个数据属性的值，这种情况使用数据属性或访问器属性都是可以的。不过我们可以看一个有趣的示例，例如下面这个表示 2D 笛卡儿坐标点的对象。这个对象用普通数据属性保存点的 x 和 y 坐标，用访问器属性给出与这个点等价的极坐标：
:::

```js
let p = {
  // x 和 y 是常规的可读写数据属性
  x: 1.0,
  y: 1.0,

  // r 是由获取方法和设置方法定义的可读写访问器属性
  // 不要忘了访问器方法后面的逗号。
  get r() {
    return Math.hypot(this.x, this.y);
  },
  set r(newvalue) {
    let oldvalue = Math.hypot(this.x, this.y);
    let ratio = newvalue / oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },

  // theta 是一个只定义了获取方法的只读访问器属性
  get theta() {
    return Math.atan2(this.y, this.x);
  },
};
p.r; // => Math.SQRT2
p.theta; // => Math.PI / 4
```

Note the use of the keyword `this` in the getters and setter in this example. JavaScript invokes these functions as methods of the object on which they are defined, which means that within the body of the function, this refers to the point object `p`. So the getter method for the `r` property can refer to the `x` and `y` properties as `this.x` and `this.y`. Methods and the `this` keyword are covered in more detail in §8.2.2.

::: tip 翻译
注意这个示例的获取和设置方法中使用了关键字`this`。JavaScript 会将这些函数作为定义它们的对象的方法来调用。这意味着在这些函数体内，`this`引用的是表示坐标点的对象`p`。因此访问器属性`r`的获取方法可以通过`this.x`和`this.y`来引用坐标点的`x`和`y`属性。方法和`this`关键字将在 8.2.2 节中详细介绍。
:::

Accessor properties are inherited, just as data properties are, so you can use the object `p` defined above as a prototype for other points. You can give the new objects their own `x` and `y` properties, and they’ll inherit the `r` and `theta` properties:

::: tip 翻译
与数据属性一样，访问器属性也是可以继承的。因此，可以把上面定义的对象`p`作为其他点的原型。可以给新对象定义自己的`x`和`y`属性，而它们将继承`r`和`theta`属性：
:::

```js
let q = Object.create(p); // 一个继承获取和设置方法的新对象
q.x = 3;
q.y = 4; // 创建q的自有数据属性
q.r; // => 5: 可以使用继承的访问器属性
q.theta; // => Math.atan2(4, 3)
```

The code above uses accessor properties to define an API that provides two representations (Cartesian coordinates and polar coordinates) of a single set of data. Other reasons to use accessor properties include sanity checking of property writes and returning different values on each property read:

::: tip 翻译
以上代码使用访问器属性定义了一个 API，提供了一个数据集的两种表示（笛卡儿坐标和极坐标）。使用访问器属性的其他场景还有写入属性时进行合理性检查，以及每次读取属性时返回不同的值：
:::

```js
// 这个对象保证序列严格递增
const serialnum = {
  // 这个数据属性保存下一个序号
  // 属性名中的_提示它仅在内部使用
  _n: 0,

  // 返回当前值并递增
  get next() {
    return this._n++;
  },

  // 把新值设置为n，但n必须大于当前值
  set next(n) {
    if (n > this._n) {
      this._n = n;
    } else {
      throw new Error("serial number can only be set to a larger value");
    }
  },
};
serialnum.next = 10; // 设置起始序号
serialnum.next; // => 10
serialnum.next; // => 11: 每次读取next都得到不同的值
```

Finally, here is one more example that uses a getter method to implement a property with “magical” behavior:

::: tip 翻译
最后，再看一个通过获取方法实现“魔法”属性的示例：
:::

```js
// 这个对象的访问器属性返回随机数值
// 例如，表达式 "random.octet" 在被求值时
// 会给出一个0和255之间的随机值
const random = {
  get octet() {
    return Math.floor(Math.random() * 256);
  },
  get uint16() {
    return Math.floor(Math.random() * 65536);
  },
  get int16() {
    return Math.floor(Math.random() * 65536) - 32768;
  },
};
```

## 总结

This chapter has documented JavaScript objects in great detail, covering topics that include:

- Basic object terminology, including the meaning of terms like _enumerable_ and _own property_.
- Object literal syntax, including the many new features in ES6 and later.
- How to read, write, delete, enumerate, and check for the presence of the properties of an object.
- How prototype-based inheritance works in JavaScript and how to create an object that inherits from another object with `Object.create()`.
- How to copy properties from one object into another with `Object.assign()`.
- All JavaScript values that are not primitive values are objects. This includes both arrays and functions, which are the topics of the next two chapters.

::: tip 翻译
本章非常详尽地讲解了 JavaScript 对象，主要包括以下内容：

- 与对象相关的基本概念，例如可枚举和自有属性。
- 对象字面量语法，包括 ES6 及之后增加的很多新特性。
- 如何读取、写入、删除、枚举和检查对象属性的存在。
- JavaScript 如何实现基于原型的继承，以及如何通过 `Object.create()`创建继承其他对象的对象。
- 如何通过 `Object.assign()`从一个对象向另一个对象复制属性。
- JavaScript中所有不是原始值的值都是对象。其中包括接下来两章会讨论的数组和函数。
  :::


