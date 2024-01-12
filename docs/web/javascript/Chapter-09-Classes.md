---
title: 第九章 类
---

# Chapter 09 Classes

JavaScript objects were covered in [Chapter 6](./Chapter-06-Objects.md). That chapter treated each object as a unique set of properties, different from every other object. It is often useful, however, to define a _class_ of objects that share certain properties. Members, or _instances_, of the class have their own properties to hold or define their state, but they also have methods that define their behavior. These methods are defined by the class and shared by all instances. Imagine a class named Complex that represents and performs arithmetic on complex numbers, for example. A Complex instance would have properties to hold the real and imaginary parts (the state) of the complex number. And the Complex class would define methods to perform addition and multiplication (the behavior) of those numbers.

::: tip 翻译
[第 6 章](./Chapter-06-Objects.md) 介绍了 JavaScript 对象。 该章将每个对象视为一组独特的属性，与其他对象不同。 然而，定义共享某些属性的对象 _class_ 通常很有用。 类的成员（或 _instances_）有自己的属性来保存或定义其状态，但它们也有定义其行为的方法。 这些方法由类定义并由所有实例共享。 例如，想象一个名为 Complex 的类，它表示复数并对其执行算术运算。 Complex 实例将具有保存复数的实部和虚部（状态）的属性。 Complex 类将定义执行这些数字的加法和乘法（行为）的方法。
:::

In JavaScript, classes use prototype-based inheritance: if two objects inherit properties (generally function-valued properties, or methods) from the same prototype, then we say that those objects are instances of the same class. That, in a nutshell, is how JavaScript classes work. JavaScript prototypes and inheritance were covered in §6.2.3 and §6.3.2, and you will need to be familiar with the material in those sections to understand this chapter. This chapter covers prototypes in §9.1.

::: tip 翻译
在 JavaScript 中，类使用基于原型的继承：如果两个对象从同一原型继承属性（通常是函数值属性或方法），那么我们就说这些对象是同一类的实例。 简而言之，这就是 JavaScript 类的工作原理。 JavaScript 原型和继承已在第 6.2.3 节和第 6.3.2 节中介绍，您需要熟悉这些部分中的材料才能理解本章。 本章涵盖第 9.1 节中的原型。
:::

If two objects inherit from the same prototype, this typically (but not necessarily) means that they were created and initialized by the same constructor function or factory function. Constructors have been covered in §4.6, §6.2.2, and §8.2.3, and this chapter has more in §9.2.

::: tip 翻译
如果两个对象继承自相同的原型，这通常（但不一定）意味着它们是由相同的构造函数或工厂函数创建和初始化的。 构造函数已在第 4.6 节、第 6.2.2 节和第 8.2.3 节中介绍，本章第 9.2 节中有更多内容。
:::

JavaScript has always allowed the definition of classes. ES6 introduced a brand-new syntax (including a `class` keyword) that makes it even easier to create classes. These new JavaScript classes work in the same way that old-style classes do, and this chapter starts by explaining the old way of creating classes because that demonstrates more clearly what is going on behind the scenes to make classes work. Once we’ve explained those fundamentals, we’ll shift and start using the new, simplified class definition syntax.

::: tip 翻译
JavaScript 一直允许类的定义。 ES6 引入了全新的语法（包括 `class` 关键字），使创建类变得更加容易。 这些新的 JavaScript 类的工作方式与旧式类的工作方式相同，本章首先解释创建类的旧方式，因为这样可以更清楚地演示使类工作的幕后工作。 一旦我们解释了这些基础知识，我们将转向并开始使用新的、简化的类定义语法。
:::

If you’re familiar with strongly typed object-oriented programming languages like Java or C++, you’ll notice that JavaScript classes are quite different from classes in those languages. There are some syntactic similarities, and you can emulate many features of “classical” classes in JavaScript, but it is best to understand up front that JavaScript’s classes and prototype-based inheritance mechanism are substantially different from the classes and class-based inheritance mechanism of Java and similar languages.

::: tip 翻译
如果您熟悉 Java 或 C++ 等强类型面向对象编程语言，您会注意到 JavaScript 类与这些语言中的类有很大不同。 有一些语法相似之处，您可以在 JavaScript 中模拟“经典”类的许多功能，但最好预先了解 JavaScript 的类和基于原型的继承机制与 Java 和类似的语言 的类和基于类的继承机制有本质上的不同。
:::

## 类和原型

In JavaScript, a class is a set of objects that inherit properties from the same prototype object. The prototype object, therefore, is the central feature of a class. [Chapter 6](./Chapter-06-Objects.md) covered the `Object.create()` function that returns a newly created object that inherits from a specified prototype object. If we define a prototype object and then use `Object.create()` to create objects that inherit from it, we have defined a JavaScript class. Usually, the instances of a class require further initialization, and it is common to define a function that creates and initializes the new object. Example 9-1 demonstrates this: it defines a prototype object for a class that represents a range of values and also defines a _factory function_ that creates and initializes a new instance of the class.

::: tip 翻译
在 JavaScript 中，类是一组从同一原型对象继承属性的对象。 因此，原型对象是类的核心特征。 [第 6 章](./Chapter-06-Objects.md) 介绍了 `Object.create()` 函数，该函数返回一个新创建的对象，该对象继承自指定的原型对象。 如果我们定义了一个原型对象，然后使用 `Object.create()` 来创建继承它的对象，我们就定义了一个 JavaScript 类。 通常，类的实例需要进一步初始化，并且通常定义一个创建和初始化新对象的函数。 示例 9-1 演示了这一点：它为表示一系列值的类定义了一个原型对象，还定义了一个用于创建和初始化该类的新实例的*工厂函数*。
:::

_Example 9-1. A simple JavaScript class_

```js
// This is a factory function that returns a new range object.
function range(from, to) {
  // Use Object.create() to create an object that inherits from the
  // prototype object defined below. The prototype object is stored as
  // a property of this function, and defines the shared methods (behavior)
  // for all range objects.
  let r = Object.create(range.methods);

  // Store the start and end points (state) of this new range object.
  // These are non-inherited properties that are unique to this object.
  r.from = from;
  r.to = to;

  // Finally return the new object.
  return r;
}

// This prototype object defines methods inherited by all range objects.
range.methods = {
  // Return true if x is in the range, false otherwise
  // This method works for textual and Date ranges as well as numeric.
  includes(x) {
    return this.from <= x && x <= this.to;
  },

  // A generator function that makes instances of the class iterable.
  // Note that it only works for numeric ranges.
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },

  // Return a string representation of the range
  toString() {
    return "(" + this.from + "..." + this.to + ")";
  },
};

// Here are example uses of a range object
let r = range(1, 3); // Create a range object
r.includes(2); // => true: 2 is in the range
r.toString(); // => "(1...3)"
[...r]; // => [1, 2, 3]; convert to an array via iterator
```

There are a few things worth noting in the code of Example 9-1:

- This code defines a factory function `range()` for creating new Range objects.
- It uses the `methods` property of this `range()` function as a convenient place to store the prototype object that defines the class. There is nothing special or idiomatic about putting the prototype object here.
- The `range()` function defines `from` and `to` properties on each Range object. These are the unshared, non-inherited properties that define the unique state of each individual Range object.
- The `range.methods` object uses the ES6 shorthand syntax for defining methods, which is why you don’t see the `function` keyword anywhere. (See §6.10.5 to review object literal shorthand method syntax.)
- One of the methods in the prototype has the computed name (§6.10.2) `Symbol.iterator`, which means that it is defining an iterator for Range objects. The name of this method is prefixed with `*`, which indicates that it is a generator function instead of a regular function. Iterators and generators are covered in detail in [Chapter 12](./Chapter-12-Iterators_Generators.md). For now, the upshot is that instances of this Range class can be used with the `for/of` loop and with the `...` spread operator.
- The shared, inherited methods defined in `range.methods` all use the `from` and `to` properties that were initialized in the `range()` factory function. In order to refer to them, they use the `this` keyword to refer to the object through which they were invoked. This use of `this` is a fundamental characteristic of the methods of any class.

::: tip 翻译
示例 9-1 的代码中有一些值得注意的地方:

- 这段代码定义了一个工厂函数 `range()` 来创建新的 Range 对象。
- 它使用此 `range()` 函数的 `methods` 属性作为存储定义类的原型对象的方便位置。 将原型对象放在这里并没有什么特别或惯用的地方。
- `range()` 函数在每个 Range 对象上定义 `from` 和 `to` 属性。 这些是非共享、非继承的属性，定义每个单独的 Range 对象的唯一状态。
- `range.methods` 对象使用 ES6 简写语法来定义方法，这就是为什么你在任何地方都看不到 `function` 关键字。 （请参阅第 6.10.5 节来查看对象文字简写语法。）
- 原型中的方法之一具有计算名称（第 6.10.2 节）`Symbol.iterator`，这意味着它正在为 Range 对象定义一个迭代器。 该方法的名称带有 `*` 前缀，表明它是一个生成器函数而不是常规函数。 [第 12 章](./Chapter-12-Iterators_Generators.md)详细介绍了迭代器和生成器。 目前，结果是该 Range 类的实例可以与 `for/of` 循环和 `...`扩展运算符一起使用。
- `range.methods` 中定义的共享继承方法都使用在 `range()` 工厂函数中初始化的 `from` 和 `to` 属性。 为了引用它们，它们使用 `this` 关键字来引用调用它们的对象。 `this` 的这种使用是任何类的方法的基本特征。
  :::

## 类和构造函数

Example 9-1 demonstrates a simple way to define a JavaScript class. It is not the idiomatic way to do so, however, because it did not define a _constructor_. A constructor is a function designed for the initialization of newly created objects. Constructors are invoked using the `new` keyword as described in §8.2.3. Constructor invocations using `new` automatically create the new object, so the constructor itself only needs to initialize the state of that new object. The critical feature of constructor invocations is that the `prototype` property of the constructor is used as the prototype of the new object. §6.2.3 introduced prototypes and emphasized that while almost all objects have a prototype, only a few objects have a `prototype` property. Finally, we can clarify this: it is function objects that have a `prototype` property. This means that all objects created with the same constructor function inherit from the same object and are therefore members of the same class. Example 9-2 shows how we could alter the Range class of Example 9-1 to use a constructor function instead of a factory function. Example 9-2 demonstrates the idiomatic way to create a class in versions of JavaScript that do not support the ES6 `class` keyword. Even though `class` is well supported now, there is still lots of older JavaScript code around that defines classes like this, and you should be familiar with the idiom so that you can read old code and so that you understand what is going on “under the hood” when you use the `class` keyword.

::: tip 翻译
示例 9-1 演示了定义 JavaScript 类的简单方法。 然而，这不是惯用的方法，因为它没有定义 _构造函数_。 构造函数是为新创建的对象的初始化而设计的函数。 构造函数是使用 `new` 关键字调用的，如第 8.2.3 节中所述。 使用 `new` 的构造函数调用会自动创建新对象，因此构造函数本身只需要初始化该新对象的状态。 构造函数调用的关键特征是构造函数的 `prototype` 属性被用作新对象的原型。 第 6.2.3 节介绍了原型，并强调虽然几乎所有对象都有原型，但只有少数对象具有 `prototype` 属性。 最后，我们可以澄清这一点：函数对象具有 `prototype` 属性。 这意味着使用相同构造函数创建的所有对象都继承自同一对象，因此是同一类的成员。 示例 9-2 展示了如何更改示例 9-1 的 Range 类以使用构造函数而不是工厂函数。 示例 9-2 演示了在不支持 ES6 `class` 关键字的 JavaScript 版本中创建类的惯用方法。 尽管 `class` 现在得到了很好的支持，但仍然有很多旧的 JavaScript 代码定义了这样的类，你应该熟悉这个习惯用法，这样你就可以阅读旧的代码，并理解当您使用 `class` 关键字时 “在幕后” 发生了什么，。
:::

Example 9-2. A Range class using a constructor

```js
// This is a constructor function that initializes new Range Objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
  // Store the start and end points (state) of this new range object.
  // These are non-inherited properties that are unique to this object.
  this.from = from;
  this.to = to;
}

// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype = {
  // Return true if x is in the range, false otherwise.
  // This method works for textual and Date ranges as well as numeric.
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },

  // A generator function that makes instances of the class iterable.
  // Note that it only works for numeric ranges.
  [Symbol.iterator]: function* () {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },

  // Return a string representation of the range.
  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  },
};

// Here are example uses of this new Range class
let r = new Range(1, 3); // Create a Range object; note the use of new
r.includes(2); // => true: 2 is in the range
r.toString(); // => "(1...3)"
[...r]; // => [1, 2, 3]; convert to an array via iterator
```

It is worth comparing Examples 9-1 and 9-2 fairly carefully and noting the differences between these two techniques for defining classes. First, notice that we renamed the `range()` factory function to `Range()` when we converted it to a constructor. This is a very common coding convention: constructor functions define, in a sense, classes, and classes have names that (by convention) begin with capital letters. Regular functions and methods have names that begin with lowercase letters.

::: tip 翻译
值得仔细比较示例 9-1 和 9-2，并注意这两种定义类的技术之间的差异。 首先，请注意，当我们将 `range()` 工厂函数转换为构造函数时，我们将其重命名为 `Range()`。 这是一种非常常见的编码约定：构造函数在某种意义上定义类，并且类的名称（按照约定）以大写字母开头。 常规函数和方法的名称以小写字母开头。
:::

Next, notice that the `Range()` constructor is invoked (at the end of the example) with the `new` keyword while the `range()` factory function was invoked without it. Example 9-1 uses regular function invocation (§8.2.1) to create the new object, and Example 9-2 uses constructor invocation (§8.2.3). Because the `Range()` constructor is invoked with `new`, it does not have to call `Object.create()` or take any action to create a new object. The new object is automatically created before the constructor is called, and it is accessible as the `this` value. The `Range()` constructor merely has to initialize this. Constructors do not even have to return the newly created object. Constructor invocation automatically creates a new object, invokes the constructor as a method of that object, and returns the new object. The fact that constructor invocation is so different from regular function invocation is another reason that we give constructors names that start with capital letters. Constructors are written to be invoked as constructors, with the `new` keyword, and they usually won’t work properly if they are invoked as regular functions. A naming convention that keeps constructor functions distinct from regular functions helps programmers know when to use `new`.

::: tip 翻译
接下来，请注意，`Range()` 构造函数是使用 `new` 关键字调用的（在示例的末尾），而 `range()` 工厂函数是在没有它的情况下调用的。 示例 9-1 使用常规函数调用（第 8.2.1 节）来创建新对象，示例 9-2 使用构造函数调用（第 8.2.3 节）。 因为 `Range()` 构造函数是通过 `new` 调用的，所以它不必调用 `Object.create()` 或采取任何操作来创建新对象。 新对象在调用构造函数之前自动创建，并且可以通过 `this` 值进行访问。 `Range()` 构造函数只需初始化它。 构造函数甚至不必返回新创建的对象。 构造函数调用会自动创建一个新对象，将构造函数作为该对象的方法调用，然后返回新对象。 构造函数调用与常规函数调用如此不同，这是我们为构造函数命名以大写字母开头的另一个原因。 构造函数被编写为使用 `new` 关键字作为构造函数调用，如果作为常规函数调用，它们通常无法正常工作。 使构造函数与常规函数不同的命名约定可以帮助程序员知道何时使用 `new`。
:::

> #### Constructors and new.target
>
> Within a function body, you can tell whether the function has been invoked as a constructor with the special expression `new.target`. If the value of that expression is defined, then you know that the function was invoked as a constructor, with the `new` keyword. When we discuss subclasses in §9.5, we’ll see that `new.target` is not always a reference to the constructor it is used in: it might also refer to the constructor function of a subclass.
>
> If `new.target` is `undefined`, then the containing function was invoked as a function, without the `new` keyword. JavaScript’s various error constructors can be invoked without `new`, and if you want to emulate this feature in your own constructors, you can write them like this:
>
> ```js
> function C() {
>   if (!new.target) return new C();
>   // initialization code goes here
> }
> ```
>
> This technique only works for constructors defined in this old-fashioned way. Classes created with the `class` keyword do not allow their constructors to be invoked without `new`.

::: tip 翻译

#### 构造函数和 new.target

在函数体内，您可以使用特殊表达式 `new.target` 判断该函数是否作为构造函数被调用。 如果定义了该表达式的值，那么您就知道该函数是使用 `new` 关键字作为构造函数调用的。 当我们在第 9.5 节中讨论子类时，我们会看到 `new.target` 并不总是对其所使用的构造函数的引用：它也可能引用子类的构造函数。

如果 `new.target` 为 `undefined`，则包含的函数将作为函数调用，不带 `new` 关键字。 JavaScript 的各种错误构造函数可以在没有 `new` 的情况下被调用，如果你想在你自己的构造函数中模拟这个功能，你可以这样写：

此技术仅适用于以这种老式方式定义的构造函数。 使用 `class` 关键字创建的类不允许在没有 `new` 的情况下调用其构造函数。
:::

Another critical difference between Examples 9-1 and 9-2 is the way the prototype object is named. In the first example, the prototype was `range.methods`. This was a convenient and descriptive name, but arbitrary. In the second example, the prototype is `Range.prototype`, and this name is mandatory. An invocation of the `Range()` constructor automatically uses `Range.prototype` as the prototype of the new Range object.

::: tip 翻译
示例 9-1 和 9-2 之间的另一个关键区别是原型对象的命名方式。 在第一个示例中，原型是 `range.methods`。 这是一个方便且具有描述性的名称，但却是任意的。 在第二个示例中，原型是 `Range.prototype`，并且该名称是必需的。 调用 `Range()` 构造函数会自动使用`Range.prototype` 作为新 Range 对象的原型。
:::

Finally, also note the things that do not change between Examples 9-1 and 9-2 : the `range` methods are defined and invoked in the same way for both classes. Because Example 9-2 demonstrates the idiomatic way to create classes in versions of JavaScript before ES6, it does not use the ES6 shorthand method syntax in the prototype object and explicitly spells out the methods with the `function` keyword. But you can see that the implementation of the methods is the same in both examples.

::: tip 翻译
最后，还要注意示例 9-1 和 9-2 之间没有变化的事情：两个类的 `range` 方法以相同的方式定义和调用。 因为示例 9-2 演示了在 ES6 之前的 JavaScript 版本中创建类的惯用方法，所以它在原型对象中没有使用 ES6 简写方法语法，而是使用 `function` 关键字显式地拼写出这些方法。 但您可以看到两个示例中方法的实现是相同的。
:::

Importantly, note that neither of the two `range` examples uses arrow functions when defining constructors or methods. Recall from §8.1.3 that functions defined in this way do not have a `prototype` property and so cannot be used as constructors. Also, arrow functions inherit the `this` keyword from the context in which they are defined rather than setting it based on the object through which they are invoked, and this makes them useless for methods because the defining characteristic of methods is that they use `this` to refer to the instance on which they were invoked.

::: tip 翻译
重要的是，请注意，在定义构造函数或方法时，两个 `range` 示例都没有使用箭头函数。 回想一下第 8.1.3 节，以这种方式定义的函数没有 `prototype` 属性，因此不能用作构造函数。 此外，箭头函数从定义它们的上下文继承 `this` 关键字，而不是根据调用它们的对象来设置它，这使得它们对方法毫无用处，因为方法的定义特征是它们使用 `this` 来引用它们被调用的实例。
:::

Fortunately, the new ES6 class syntax doesn’t allow the option of defining methods with arrow functions, so this is not a mistake that you can accidentally make when using that syntax. We will cover the ES6 `class` keyword soon, but first, there are more details to cover about constructors.

::: tip 翻译
幸运的是，新的 ES6 类语法不允许使用箭头函数定义方法，因此您在使用该语法时不会意外犯下错误。 我们很快就会介绍 ES6 `class` 关键字，但首先，需要介绍有关构造函数的更多细节。
:::

### 构造函数、类标识和 instanceof

As we’ve seen, the prototype object is fundamental to the identity of a class: two objects are instances of the same class if and only if they inherit from the same prototype object. The constructor function that initializes the state of a new object is not fundamental: two constructor functions may have `prototype` properties that point to the same prototype object. Then, both constructors can be used to create instances of the same class.

::: tip 翻译
正如我们所看到的，原型对象是类标识的基础：两个对象当且仅当它们继承自同一个原型对象时，才是同一类的实例。 初始化新对象状态的构造函数不是基本的：两个构造函数可能具有指向同一原型对象的 `prototype` 属性。 然后，两个构造函数都可以用于创建同一类的实例。
:::

Even though constructors are not as fundamental as prototypes, the constructor serves as the public face of a class. Most obviously, the name of the constructor function is usually adopted as the name of the class. We say, for example, that the `Range()` constructor creates Range objects. More fundamentally, however, constructors are used as the righthand operand of the `instanceof` operator when testing objects for membership in a class. If we have an object `r` and want to know if it is a Range object, we can write:

::: tip 翻译
尽管构造函数不像原型那么基本，但构造函数充当类的公共面孔。 最明显的是，构造函数的名称通常被采用作为类的名称。 例如，我们说 `Range()` 构造函数创建 `Range` 对象。 然而，更根本的是，在测试对象的类成员资格时，构造函数被用作 `instanceof` 运算符的右侧操作数。 如果我们有一个对象 `r` 并且想知道它是否是 `Range` 对象，我们可以这样写：
:::

```js
r instanceof Range; // => true: r inherits from Range.prototype
```

The `instanceof` operator was described in §4.9.4. The lefthand operand should be the object that is being tested, and the righthand operand should be a constructor function that names a class. The expression `o instanceof C` evaluates to `true` if `o` inherits from `C.prototype`. The inheritance need not be direct: if `o` inherits from an object that inherits from an object that inherits from `C.prototype`, the expression will still evaluate to `true`.

::: tip 翻译
`instanceof` 运算符在第 4.9.4 节中进行了描述。 左侧操作数应该是正在测试的对象，右侧操作数应该是命名类的构造函数。 如果 `o` 继承自 `C.prototype`，则表达式 `o instanceof C` 的计算结果为 `true`。 继承不必是直接的：如果 `o` 继承自一个对象，而该对象又继承自 `C.prototype` 的对象，则表达式的计算结果仍将为`true`。
:::

Technically speaking, in the previous code example, the `instanceof` operator is not checking whether `r` was actually initialized by the `Range` constructor. Instead, it is checking whether `r` inherits from `Range.prototype`. If we define a function `Strange()` and set its prototype to be the same as `Range.prototype`, then objects created with new `Strange()` will count as Range objects as far as `instanceof` is concerned (they won’t actually work as Range objects, however, because their `from` and `to` properties have not been initialized):

::: tip 翻译
从技术上讲，在前面的代码示例中，`instanceof` 运算符并未检查 `r` 是否实际上由 `Range` 构造函数初始化。 相反，它检查 `r` 是否继承自 `Range.prototype`。 如果我们定义一个函数 `Strange()` 并将其原型设置为与 `Range.prototype` 相同，那么使用 new `Strange()` 创建的对象就 `instanceof` 而言将算作 `Range` 对象（然而，它们实际上并不能作为 `Range` 对象工作，因为它们的 `from` 和 `to` 属性尚未初始化）：
:::

```js
function Strange() {}
Strange.prototype = Range.prototype;
new Strange() instanceof Range; // => true
```

Even though `instanceof` cannot actually verify the use of a constructor, it still uses a constructor function as its righthand side because constructors are the public identity of a class.

::: tip 翻译
尽管 `instanceof` 实际上无法验证构造函数的使用，但它仍然使用构造函数作为其右侧，因为构造函数是类的公共标识。
:::

If you want to test the prototype chain of an object for a specific prototype and do not want to use the constructor function as an intermediary, you can use the `isPrototypeOf()` method. In Example 9-1, for example, we defined a class without a constructor function, so there is no way to use `instanceof` with that class. Instead, however, we could test whether an object `r` was a member of that constructor-less class with this code:

::: tip 翻译
如果你想测试一个对象的原型链是否有特定的原型，并且不想使用构造函数作为中介，你可以使用 `isPrototypeOf()` 方法。 例如，在示例 9-1 中，我们定义了一个没有构造函数的类，因此无法在该类中使用 `instanceof`。 然而，我们可以使用以下代码测试对象 `r` 是否是该无构造函数类的成员：
:::

```js
range.methods.isPrototypeOf(r); // range.methods is the prototype object.
```

### constructor 属性

In Example 9-2, we set `Range.prototype` to a new object that contained the methods for our class. Although it was convenient to express those methods as properties of a single object literal, it was not actually necessary to create a new object. Any regular JavaScript function (excluding arrow functions, generator functions, and async functions) can be used as a constructor, and constructor invocations need a `prototype` property. Therefore, every regular JavaScript function1 automatically has a `prototype` property. The value of this property is an object that has a single, non-enumerable `constructor` property. The value of the `constructor` property is the function object:

::: tip 翻译
在示例 9-2 中，我们将 `Range.prototype` 设置为包含我们类的方法的新对象。 尽管将这些方法表示为单个对象文字的属性很方便，但实际上没有必要创建新对象。 任何常规 JavaScript 函数（不包括箭头函数、生成器函数和异步函数）都可以用作构造函数，并且构造函数调用需要 `prototype` 属性。 因此，每个常规 JavaScript 函数都会自动具有 `prototype` 属性。 此属性的值是一个具有单个不可枚举 `constructor` 属性的对象。 `constructor` 属性的值是函数对象：
:::

```js
let F = function () {}; // This is a function object.
let p = F.prototype; // This is the prototype object associated with F.
let c = p.constructor; // This is the function associated with the prototype.
c === F; // => true: F.prototype.constructor === F for any F
```

The existence of this predefined prototype object with its `constructor` property means that objects typically inherit a `constructor` property that refers to their constructor. Since constructors serve as the public identity of a class, this `constructor` property gives the class of an object:

::: tip 翻译
这个预定义原型对象及其 `constructor` 属性的存在意味着对象通常会继承引用其构造函数的 `constructor` 属性。 由于构造函数充当类的公共标识，因此 `constructor` 属性给出了对象的类：
:::

```js
let o = new F(); // Create an object o of class F
o.constructor === F; // => true: the constructor property specifies the class
```

Figure 9-1 illustrates this relationship between the constructor function, its prototype object, the back reference from the prototype to the constructor, and the instances created with the constructor.

::: tip 翻译
图 9-1 说明了构造函数、其原型对象、从原型到构造函数的反向引用以及使用构造函数创建的实例之间的关系。
:::

![iShot_2024-01-11_14.07.19](media/17049499051851/iShot_2024-01-11_14.07.19.png)
_Figure 9-1. A constructor function, its prototype, and instances_

Notice that Figure 9-1 uses our `Range()` constructor as an example. In fact, however, the Range class defined in Example 9-2 overwrites the predefined `Range.prototype` object with an object of its own. And the new prototype object it defines does not have a `constructor` property. So instances of the Range class, as defined, do not have a `constructor` property. We can remedy this problem by explicitly adding a constructor to the prototype:

::: tip 翻译
请注意，图 9-1 使用我们的 `Range()` 构造函数作为示例。 然而，事实上，示例 9-2 中定义的 `Range` 类用它自己的对象覆盖了预定义的 `Range.prototype` 对象。 并且它定义的新原型对象没有 `constructor` 属性。 因此，按照定义，`Range` 类的实例没有 `constructor` 属性。 我们可以通过向原型显式添加构造函数来解决这个问题：
:::

```js
Range.prototype = {
  constructor: Range, // Explicitly set the constructor back-reference

  /* method definitions go here */
};
```

Another common technique that you are likely to see in older JavaScript code is to use the predefined prototype object with its `constructor` property and add methods to it one at a time with code like this:

::: tip 翻译
您可能在较旧的 JavaScript 代码中看到的另一种常见技术是使用预定义的原型对象及其 `constructor` 属性，并使用如下代码一次向其添加一个方法：
:::

```js
// Extend the predefined Range.prototype object so we don't overwrite
// the automatically created Range.prototype.constructor property.
Range.prototype.includes = function (x) {
  return this.from <= x && x <= this.to;
};
Range.prototype.toString = function () {
  return "(" + this.from + "..." + this.to + ")";
};
```

## 类和 class 关键字

Classes have been part of JavaScript since the very first version of the language, but in ES6, they finally got their own syntax with the introduction of the `class` keyword. Example 9-3 shows what our Range class looks like when written with this new syntax.

::: tip 翻译
从 JavaScript 的第一个版本开始，类就一直是 JavaScript 的一部分，但在 ES6 中，通过引入 `class` 关键字，类最终获得了自己的语法。 例 9-3 展示了使用这种新语法编写的 `Range` 类的样子。
:::

_Example 9-3. The Range class rewritten using class_

```js
class Range {
  constructor(from, to) {
    // Store the start and end points (state) of this new range object.
    // These are non-inherited properties that are unique to this object.
    this.from = from;
    this.to = to;
  }

  // Return true if x is in the range, false otherwise
  // This method works for textual and Date ranges as well as numeric.
  includes(x) {
    return this.from <= x && x <= this.to;
  }

  // A generator function that makes instances of the class iterable.
  // Note that it only works for numeric ranges.
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }

  // Return a string presentation of the range
  toString() {
    return `(${this.from}...${this.to})`;
  }
}

// Here are example uses of this new Range class
let r = new Range(1, 3); // Create a Range object
r.includes(2); // => true: 2 is in the range
r.toString(); // => "(1...3)"
[...r]; // => [1, 2, 3]; convert to an array via iterator
```

It is important to understand that the classes defined in Examples 9-2 and 9-3 work in exactly the same way. The introduction of the `class` keyword to the language does not alter the fundamental nature of JavaScript’s prototype-based classes. And although Example 9-3 uses the `class` keyword, the resulting Range object is a constructor function, just like the version defined in Example 9-2. The new `class` syntax is clean and convenient but is best thought of as “syntactic sugar” for the more fundamental class definition mechanism shown in Example 9-2.

::: tip 翻译
重要的是要了解示例 9-2 和 9-3 中定义的类以完全相同的方式工作。 将 `class` 关键字引入语言不会改变 JavaScript 基于原型类的基本性质。 尽管示例 9-3 使用 `class` 关键字，但结果 Range 对象是 `constructor` 函数，就像示例 9-2 中定义的版本一样。 新的 `class` 语法是干净和方便的，但最好将其视为“句法糖”，用于示例 9-2 中显示的更基本的类定义机制。
:::

Note the following things about the `class` syntax in Example 9-3:

- The class is declared with the `class` keyword, which is followed by the name of class and a class body in curly braces.
- The class body includes method definitions that use object literal method shorthand (which we also used in Example 9-1), where the `function` keyword is omitted. Unlike object literals, however, no commas are used to separate the methods from each other. (Although class bodies are superficially similar to object literals, they are not the same thing. In particular, they do not support the definition of properties with `name/value` pairs.)
- The keyword `constructor` is used to define the constructor function for the class. The function defined is not actually named “constructor”, however. The `class` declaration statement defines a new variable `Range` and assigns the value of this special `constructor` function to that variable.
- If your class does not need to do any initialization, you can omit the `constructor` keyword and its body, and an empty constructor function will be implicitly created for you.

::: tip 翻译
请注意示例 9-3 中的 `class` 语法的以下事项：

- 类是用 `class` 关键字声明的，后面是类的名称和花括号中的类体。
- 类体包含使用对象字面量方法简写（我们也在示例 9-1 中使用）的方法定义，其中省略了 `function` 关键字。 然而，与对象字面量不同，方法之间不使用逗号分隔。 （虽然类体表面上与对象字面量相似，但它们不是同一件事。特别是，它们不支持使用 `name/value` 对定义属性。）
- 关键字 `constructor` 用于定义类的构造函数。 然而，定义的函数实际上并不被命名为“构造函数”。 `class` 声明语句定义了一个新变量 `Range`，并将这个特殊 `constructor` 函数的值分配给该变量。
- 如果你的类不需要做任何初始化，你可以省略 `constructor` 关键字及其主体，并且会隐式地为你创建一个空的构造函数。
  :::

If you want to define a class that subclasses—or _inherits from_—another class, you can use the `extends` keyword with the `class` keyword:

::: tip 翻译
如果要定义一个子类或继承另一个类的类，可以将 `extends` 关键字与 `class` 关键字一起使用：
:::

```js
// A Span is like a Range, but instead of initializing it with
// a start and an end, we initialize it with a start and a length
class Span extends Range {
  constructor(start, length) {
    if (length >= 0) {
      super(start, start + length);
    } else {
      super(start + length, start);
    }
  }
}
```

Creating subclasses is a whole topic of its own. We’ll return to it, and explain the `extends` and `super` keywords shown here, in §9.5.

::: tip 翻译
创建子类本身就是一个完整的主题。 我们将返回它，并解释第 9.5 节中显示的 `extends` 和 `super`关键字。
:::

Like function declarations, class declarations have both statement and expression forms. Just as we can write:

::: tip 翻译
与函数声明一样，类声明也有语句和表达式两种形式。 正如我们可以写的：
:::

```js
let square = function (x) {
  return x * x;
};
square(3); // => 9
```

we can also write:

::: tip 翻译
我们也可以写成：
:::

```js
let Square = class {
  constructor(x) {
    this.area = x * x;
  }
};
new Square(3).area; // => 9
```

As with function definition expressions, class definition expressions can include an optional class name. If you provide such a name, that name is only defined within the class body itself.

::: tip 翻译
与函数定义表达式一样，类定义表达式可以包含可选的类名。 如果您提供这样的名称，则该名称仅在类主体本身内定义。
:::

Although function expressions are quite common (particularly with the arrow function shorthand), in JavaScript programming, class definition expressions are not something that you are likely to use much unless you find yourself writing a function that takes a class as its argument and returns a subclass.

::: tip 翻译
尽管函数表达式很常见（特别是箭头函数简写），但在 JavaScript 编程中，类定义表达式并不是您可能会经常使用的东西，除非您发现自己编写了一个将类作为其参数并返回子类的函数 。
:::

We’ll conclude this introduction to the `class` keyword by mentioning a couple of important things you should know that are not apparent from `class` syntax:

- All code within the body of a `class` declaration is implicitly in strict mode (§5.6.3), even if no "`use strict`" directive appears. This means, for example, that you can’t use octal integer literals or the `with` statement within class bodies and that you are more likely to get syntax errors if you forget to declare a variable before using it.
- Unlike function declarations, class declarations are not “hoisted.” Recall from §8.1.1 that function definitions behave as if they had been moved to the top of the enclosing file or enclosing function, meaning that you can invoke a function in code that comes before the actual definition of the function. Although class declarations are like function declarations in some ways, they do not share this hoisting behavior: you cannot instantiate a class before you declare it.

::: tip 翻译
我们将通过提到一些您应该知道的重要事情来结束对 `class` 关键字的介绍，这些事情在 `class` 语法中并不明显：

- 即使没有出现“`use strict`”指令，`class` 声明体内的所有代码都隐式处于严格模式（第 5.6.3 节）。 例如，这意味着您不能在类体内使用八进制整数文字或 `with` 语句，并且如果您在使用变量之前忘记声明变量，则更有可能出现语法错误。
- 与函数声明不同，类声明不是“提升”的。 回想一下第 8.1.1 节，函数定义的行为就好像它们已移动到封闭文件或封闭函数的顶部，这意味着您可以在函数实际定义之前的代码中调用函数。 尽管类声明在某些方面类似于函数声明，但它们不共享这种提升行为：在声明类之前无法实例化它。
  :::

### 静态方法

You can define a static method within a `class` body by prefixing the method declaration with the `static` keyword. Static methods are defined as properties of the constructor function rather than properties of the prototype object.

::: tip 翻译
您可以通过在方法声明前加上 `static` 关键字作为前缀，在 `class` 主体中定义静态方法。 静态方法被定义为构造函数的属性，而不是原型对象的属性。
:::

For example, suppose we added the following code to Example 9-3:

::: tip 翻译
例如，假设我们将以下代码添加到示例 9-3 中：
:::

```js
  static parse(s) {
    let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      throw new TypeError(`Cannot parse Range from "${s}".`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }
```

The method defined by this code is `Range.parse()`, not `Range.prototype.parse()`, and you must invoke it through the constructor, not through an instance:

::: tip 翻译
此代码定义的方法是 `Range.parse()` ，而不是 `Range.prototype.parse()`，并且您必须通过构造函数而不是通过实例调用它：
:::

```js
let r = Range.parse("(1...10)"); // Returns a new Range object
r.parse("(1...10)"); // TypeError: r.parse is not a function
```

You’ll sometimes see static methods called _class methods_ because they are invoked using the name of the class/constructor. When this term is used, it is to contrast class methods with the regular _instance methods_ that are invoked on instances of the class. Because static methods are invoked on the constructor rather than on any particular instance, it almost never makes sense to use the `this` keyword in a static method.

::: tip 翻译
有时您会看到称为 _类方法_ 的静态方法，因为它们是使用类/构造函数的名称调用的。 使用该术语时，是将类方法与在类实例上调用的常规 _实例方法_ 进行对比。 由于静态方法是在构造函数上调用的，而不是在任何特定实例上调用的，因此在静态方法中使用 `this` 关键字几乎没有任何意义。
:::

We’ll see examples of static methods in Example 9-4.

::: tip 翻译
我们将在示例 9-4 中看到静态方法的例子。
:::

### Getters、 Setters 和其他方法形式

Within a class body, you can define `getter` and `setter` methods (§6.10.6) just as you can in object literals. The only difference is that in class bodies, you don’t put a comma after the `getter` or `setter`. Example 9-4 includes a practical example of a `getter` method in a class.

::: tip 翻译
在类主体中，您可以定义 `getter` 和 `setter` 方法（第 6.10.6 节），就像在对象文本中一样。 唯一的区别是，在类体中，不要在 `getter` 或 `setter` 之后放置逗号。 示例 9-4 包含类中 `getter` 方法的实际示例。
:::

In general, all of the shorthand method definition syntaxes allowed in object literals are also allowed in class bodies. This includes generator methods (marked with `*`) and methods whose names are the value of an expression in square brackets. In fact, you’ve already seen (in Example 9-3) a generator method with a computed name that makes the Range class iterable:

::: tip 翻译
一般来说，对象字面量中允许的所有简写方法定义语法也允许在类体中。 这包括生成器方法（用 `*` 标记）和名称为方括号中表达式的值的方法。 事实上，您已经（在示例 9-3 中）看到了一个具有计算名称的生成器方法，该方法使 `Range` 类可迭代：
:::

```js
  *[Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i;
    }
  }
```

### Public、Private 和 Static 字段

In the discussion here of classes defined with the `class` keyword, we have only described the definition of methods within the class body. The ES6 standard only allows the creation of methods (including getters, setters, and generators) and static methods; it does not include syntax for defining fields. If you want to define a field (which is just an object-oriented synonym for “property”) on a class instance, you must do that in the constructor function or in one of the methods. And if you want to define a static field for a class, you must do that outside the class body, after the class has been defined. Example 9-4 includes examples of both kinds of fields.

::: tip 翻译
在这里讨论使用 `class` 关键字定义的类时，我们只描述了类体内方法的定义。 ES6 标准只允许创建方法（包括 `getters`、`setters`和`generators`）和静态方法； 它不包括定义字段的语法。 如果要在类实例上定义字段（它只是“属性”的面向对象同义词），则必须在构造函数或其中一个方法中执行此操作。 如果要为类定义静态字段，则必须在定义类之后在类主体之外执行此操作。 示例 9-4 包括两种字段的示例。
:::

Standardization is underway, however, for extended class syntax that allows the definition of instance and static fields, in both public and private forms. The code shown in the rest of this section is not yet standard JavaScript as of early 2020 but is already supported in Chrome and partially supported (public instance fields only) in Firefox. The syntax for public instance fields is in common use by JavaScript programmers using the React framework and the Babel transpiler.

::: tip 翻译
然而，扩展类语法的标准化正在进行中，该语法允许以公共和私有形式定义实例和静态字段。 截至 2020 年初，本节其余部分中显示的代码还不是标准 JavaScript，但已在 Chrome 中受支持，并在 Firefox 中部分受支持（仅限公共实例字段）。 使用 React 框架和 Babel 转译器的 JavaScript 程序员通常使用公共实例字段的语法。
:::

Suppose you’re writing a class like this one, with a constructor that initializes three fields:

::: tip 翻译
假设您正在编写一个像这样的类，其中的构造函数初始化三个字段：
:::

```js
class Buffer {
  constructor() {
    this.size = 0;
    this.capacity = 4096;
    this.buffer = new Uint8Array(this.capacity);
  }
}
```

With the new instance field syntax that is likely to be standardized, you could instead write:

::: tip 翻译
使用可能标准化的新实例字段语法，您可以改为编写：
:::

```js
class Buffer {
  size = 0;
  capacity = 4096;
  buffer = new Uint8Array(this.capacity);
}
```

The field initialization code has moved out of the constructor and now appears directly in the class body. (That code is still run as part of the constructor, of course. If you do not define a constructor, the fields are initialized as part of the implicitly created constructor.) The `this.` prefixes that appeared on the lefthand side of the assignments are gone, but note that you still must use `this.` to refer to these fields, even on the righthand side of the initializer assignments. The advantage of initializing your instance fields in this way is that this syntax allows (but does not require) you to put the initializers up at the top of the class definition, making it clear to readers exactly what fields will hold the state of each instance. You can declare fields without an initializer by just writing the name of the field followed by a semicolon. If you do that, the initial value of the field will be `undefined`. It is better style to always make the initial value explicit for all of your class fields.

::: tip 翻译
字段初始化代码已移出构造函数，现在直接出现在类主体中。 （当然，该代码仍然作为构造函数的一部分运行。如果您没有定义构造函数，则这些字段将作为隐式创建的构造函数的一部分进行初始化。）出现在左侧的 `this.` 前缀赋值已经消失，但请注意，您仍然必须使用 `this.` 来引用这些字段，即使在初始化器赋值的右侧也是如此。 以这种方式初始化实例字段的优点是，此语法允许（但不要求）您将初始化器放在类定义的顶部，使读者清楚哪些字段将保存每个实例的状态 。 您可以声明不带初始值设定项的字段，只需编写字段名称，后跟分号即可。 如果这样做，该字段的初始值将为 `undefined`。 最好始终为所有类字段明确指定初始值。
:::

Before the addition of this field syntax, class bodies looked a lot like object literals using shortcut method syntax, except that the commas had been removed. This field syntax—with equals signs and semicolons instead of colons and commas—makes it clear that class bodies are not at all the same as object literals.

::: tip 翻译
在添加此字段语法之前，类体看起来很像使用快捷方法语法的对象文字，只是逗号已被删除。 这种字段语法（使用等号和分号而不是冒号和逗号）清楚地表明类体与对象文字完全不同。
:::

The same proposal that seeks to standardize these instance fields also defines private instance fields. If you use the instance field initialization syntax shown in the previous example to define a field whose name begins with `#` (which is not normally a legal character in JavaScript identifiers), that field will be usable (with the `#` prefix) within the class body but will be invisible and inaccessible (and therefore immutable) to any code outside of the class body. If, for the preceding hypothetical Buffer class, you wanted to ensure that users of the class could not inadvertently modify the `size` field of an instance, you could use a private `#size` field instead, then define a getter function to provide read-only access to the value:

::: tip 翻译
寻求标准化这些实例字段的同一提案还定义了私有实例字段。 如果您使用上例中所示的实例字段初始化语法来定义名称以 `#` 开头的字段（通常不是 JavaScript 标识符中的合法字符），则该字段将可用（带有 `#` 前缀） 在类主体内，但对于类主体外部的任何代码来说是不可见和不可访问的（因此是不可变的）。 对于前面假设的 `Buffer` 类，如果您希望确保该类的用户不会无意中修改实例的 `size` 字段，则可以使用私有 `#size` 字段，然后定义一个 `getter` 函数来提供读取功能只能访问该值：
:::

```js
class Buffer {
  #size = 0;
  get size() {
    return this.#size;
  }
}
```

Note that private fields must be declared using this new field syntax before they can be used. You can’t just write `this.#size = 0`; in the constructor of a class unless you include a “declaration” of the field directly in the class body.

::: tip 翻译
请注意，私有字段必须先使用此新字段语法进行声明，然后才能使用。 你不能只写 `this.#size = 0`； 在类的构造函数中，除非您直接在类主体中包含字段的“声明”。
:::

Finally, a related proposal seeks to standardize the use of the `static` keyword for fields. If you add static before a public or private field declaration, those fields will be created as properties of the constructor function instead of properties of instances. Consider the static `Range.parse()` method we’ve defined. It included a fairly complex regular expression that might be good to factor out into its own static field. With the proposed new `static` field syntax, we could do that like this:

::: tip 翻译
最后，一项相关提案旨在标准化字段 `static` 关键字的使用。 如果在公共或私有字段声明之前添加 static，这些字段将被创建为构造函数的属性而不是实例的属性。 考虑一下我们定义的静态 `Range.parse()` 方法。 它包含一个相当复杂的正则表达式，可以将其分解到自己的静态字段中。 使用建议的新 `static` 字段语法，我们可以这样做：
:::

```js
  static integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;
  static parse(s) {
    let matches = s.match(Range.integerRangePattern);
    if (!matches) {
      throw new TypeError(`Cannot parse Range from "${s}".`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }
```

If we wanted this static field to be accessible only within the class, we could make it private using a name like `#pattern`.

::: tip 翻译
如果我们希望这个静态字段只能在类中访问，我们可以使用 `#pattern` 之类的名称将其设为私有。
:::

### 示例：复数类

Example 9-4 defines a class to represent complex numbers. The class is a relatively simple one, but it includes instance methods (including getters), static methods, instance fields, and static fields. It includes some commented-out code demonstrating how we might use the not-yet-standard syntax for defining instance fields and static fields within the class body.

::: tip 翻译
示例 9-4 定义了一个类来表示复数。 类是一个相对简单的类，但它包含实例方法（包括 `getters`）、静态方法、实例字段和静态字段。 它包括一些注释掉的代码，演示我们如何使用尚未标准的语法来定义类主体中的实例字段和静态字段。
:::

_Example 9-4. Complex.js: a complex number class_

```js
/**
 * Instances of this Complex class represent complex numbers.
 * Recall that a complex number is the sum of a real number and an
 * imaginary number and that the imaginary number i is the square root of -1.
 */
class Complex {
  // Once class field declarations are standardized, we could declare
  // private fields to hold the real and imaginary parts of a complex number
  // here, with code like this:
  //
  // #r = 0;
  // #i = 0;

  // This constructor function defines the instance fields r and i on every
  // instance it creates. These fields hold the real and imaginary parts of
  // the complex number: they are the state of the object.
  constructor(real, imaginary) {
    this.r = real; // This field holds the real part of the number.
    this.i = imaginary; // This field holds the imaginary part.
  }
  // Here are two instance methods for addition and multiplication
  // of complex numbers. If c and d are instances of this class, we
  // might write c.plus(d) or d.times(c)
  plus(that) {
    return new Complex(this.r + that.r, this.i + that.i);
  }
  times(that) {
    return new Complex(
      this.r * that.r - this.i * that.i,
      this.i * that.r + this.r * that.i
    );
  }

  // And here are static variants of the complex arithmetic methods.
  // We could write Complex.sum(c, d) and Complex.product(c, d).
  static sum(c, d) {
    return c.plus(d);
  }
  static product(c, d) {
    return c.times(d);
  }

  // These are some instance methods that are defined as getters
  // so they're used like fields. The real and imaginary getters would
  // be useful if we were using private fields this.#r and this.#i.
  get real() {
    return this.r;
  }
  get imaginary() {
    return this.i;
  }
  get magnitude() {
    return Math.hypot(this.r, this.i);
  }

  // Classes should almost always have a toString() method
  toString() {
    return `${this.r},${this.i}i`;
  }

  // It is often useful to define a method for testing whether
  // two instance of your class represent the same value
  equals(that) {
    return that instanceof Complex && this.r === that.r && this.i === that.i;
  }

  // Once static fields are supported inside class bodies, we could
  // define a useful Complex.ZERO constant like this:
  // static ZERO = new Complex(0, 0);
}

// Here are some class fields that hold useful predefined complex numbers.
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);
```

With the Complex class of Example 9-4 defined, we can use the constructor, instance fields, instance methods, class fields, and class methods with code like this:

::: tip 翻译
定义了示例 9-4 中的 `Complex` 类后，我们可以使用构造函数、实例字段、实例方法、类字段和类方法，代码如下：
:::

```js
let c = new Complex(2, 3); // Create a new object with the constructor
let d = new Complex(c.i, c.r); // Use instance fields of c
c.plus(d).toString(); // => '{5,5}'; use instance methods
c.magnitude; // => Math.hypot(2,3); use a getter function
Complex.product(c, d); // => new Complex(0, 13); a static method
Complex.ZERO.toString(); // => '{0,0}'; a static property
```

## 向现有类添加方法

JavaScript’s prototype-based inheritance mechanism is dynamic: an object inherits properties from its prototype, even if the properties of the prototype change after the object is created. This means that we can augment JavaScript classes simply by adding new methods to their prototype objects.

::: tip 翻译
JavaScript 基于原型的继承机制是动态的：对象从其原型继承属性，即使原型的属性在对象创建后发生变化。 这意味着我们只需向 JavaScript 类的原型对象添加新方法即可对其进行扩充。
:::

Here, for example, is code that adds a method for computing the complex conjugate to the Complex class of Example 9-4:

::: tip 翻译
例如，下面的代码将计算复数共轭的方法添加到示例 9-4 的 Complex 类中：
:::

```js
// Return a complex number that is the complex conjugate of this one.
Complex.prototype.conj = function () {
  return new Complex(this.r, -this.i);
};
```

The prototype object of built-in JavaScript classes is also open like this, which means that we can add methods to numbers, strings, arrays, functions, and so on. This is useful for implementing new language features in older versions of the language:

::: tip 翻译
内置 JavaScript 类的原型对象也是这样开放的，这意味着我们可以为数字、字符串、数组、函数等添加方法。 这对于在旧版本的语言中实现新的语言功能非常有用：
:::

```js
// If the new String method startsWith() is not already defined...
if (!String.prototype.startsWith) {
  // ...then define it like this using the older indexOf() method.
  String.prototype.startsWith = function (s) {
    return this.indexOf(s) === 0;
  };
}
```

Here is another example:

::: tip 翻译
这里是另一个例子：
:::

```js
// Invoke the function f this many times, passing the iteration number
// For example, to print "hello" 3 times:
// let n = 3;
// n.times(i => { console.log(`hello ${i}`); });
Number.prototype.times = function (f, context) {
  let n = this.valueOf();
  for (let i = 0; i < n; i++) {
    f.call(context, i);
  }
};
```

Adding methods to the prototypes of built-in types like this is generally considered to be a bad idea because it will cause confusion and compatibility problems in the future if a new version of JavaScript defines a method with the same name. It is even possible to add methods to `Object.prototype`, making them available for all objects. But this is never a good thing to do because properties added to `Object.prototype` are visible to `for/in` loops (though you can avoid this by using `Object.defineProperty()` [§14.1] to make the new property non-enumerable).

::: tip 翻译
像这样向内置类型的原型添加方法通常被认为是一个坏主意，因为如果新版本的 JavaScript 定义了同名的方法，将来会导致混乱和兼容性问题。 甚至可以将方法添加到 `Object.prototype`，使它们可用于所有对象。 但这从来都不是一件好事，因为添加到 `Object.prototype` 的属性对于 `for/in` 循环是可见的（尽管你可以通过使用 `Object.defineProperty()` [§14.1] 来创建新的不可枚举属性来避免这种情况）。
:::

## 子类

In object-oriented programming, a class B can _extend_ or _subclass_ another class A. We say that A is the _superclass_ and B is the _subclass_. Instances of B inherit the methods of A. The class B can define its own methods, some of which may _override_ methods of the same name defined by class A. If a method of B overrides a method of A, the overriding method in B often needs to invoke the overridden method in A. Similarly, the subclass constructor `B()` must typically invoke the superclass constructor `A()` in order to ensure that instances are completely initialized.

::: tip 翻译
在面向对象编程中，类 B 可以 _扩展_ 或 _子类_ 另一个类 A。我们说 A 是 _超类_，B 是 _子类_。 B 的实例继承 A 的方法。B 类可以定义自己的方法，其中一些方法可能会覆盖 A 类定义的同名方法。如果 B 的方法覆盖 A 的方法，则 B 中的覆盖方法通常需要调用 A 中被覆盖的方法。类似地，子类构造函数 `B()` 通常必须调用超类构造函数 `A()`，以确保实例完全初始化。
:::

This section starts by showing how to define subclasses the old, pre-ES6 way, and then quickly moves on to demonstrate subclassing using the `class` and `extends` keywords and superclass constructor method invocation with the `super` keyword. Next is a subsection about avoiding subclasses and relying on object composition instead of inheritance. The section ends with an extended example that defines a hierarchy of Set classes and demonstrates how abstract classes can be used to separate interface from implementation.

::: tip 翻译
本节首先展示如何以 ES6 之前的旧方式定义子类，然后快速演示如何使用 `class` 和 `extends` 关键字进行子类化，以及如何使用`super` 关键字调用超类构造函数方法。 接下来是关于避免子类和依赖对象组合而不是继承的小节。 本节以一个扩展示例结尾，该示例定义了 Set 类的层次结构，并演示了如何使用抽象类将接口与实现分开。
:::

### 子类和原型

Suppose we wanted to define a Span subclass of the Range class from Example 9-2. This subclass will work just like a Range, but instead of initializing it with a start and an end, we’ll instead specify a start and a distance, or span. An instance of this Span class is also an instance of the Range superclass. A span instance inherits a customized `toString()` method from `Span.prototype`, but in order to be a subclass of Range, it must also inherit methods (such as `includes()`) from `Range.prototype`.

::: tip 翻译
假设我们想要定义例 9-2 中 `Range` 类的 `Span` 子类。 这个子类的工作方式就像 `Range` 一样，但我们不是用起点和终点来初始化它，而是指定起点和距离或跨度。 此 `Span` 类的实例也是 `Range` 超类的实例。 `Span` 实例从 `Span.prototype` 继承了自定义的 `toString()` 方法，但为了成为 `Range` 的子类，它还必须从 `Range.prototype` 继承方法（例如 `includes()`）。
:::

_Example 9-5. Span.js: a simple subclass of Range_

```js
// This is the constructor function for our subclass
function Span(start, span) {
  if (span >= 0) {
    this.from = start;
    this.to = start + span;
  } else {
    this.to = start;
    this.from = start + span;
  }
}

// Ensure that the Span prototype inherits from the Range prototype
Span.prototype = Object.create(Range.prototype);

// We don't want to inherit Range.prototype.constructor, so we
// define our own constructor property.
Span.prototype.constructor = Span;

// By defining its own toString() method, Span overrides the
// toString() method that it would otherwise inherit from Range.
Span.prototype.toString = function () {
  return `(${this.from}...+${this.to - this.from})`;
};
```

In order to make Span a subclass of Range, we need to arrange for `Span.prototype` to inherit from `Range.prototype`. The key line of code in the preceding example is this one, and if it makes sense to you, you understand how subclasses work in JavaScript:

::: tip 翻译
为了使 `Span` 成为 `Range` 的子类，我们需要安排 `Span.prototype` 继承自 `Range.prototype`。 上一示例中的关键代码行就是这一行，如果它对您有意义，您就了解了子类在 JavaScript 中的工作原理：
:::

```js
Span.prototype = Object.create(Range.prototype);
```

Objects created with the `Span()` constructor will inherit from the `Span.prototype` object. But we created that object to inherit from `Range.prototype`, so Span objects will inherit from both `Span.prototype` and `Range.prototype`.

::: tip 翻译
使用 `Span()` 构造函数创建的对象将从 `Span.prototype` 对象继承。 但是我们创建该对象是为了继承 `Range.prototype`，因此 `Span` 对象将从 `Span.prototype` 和 `Range.prototype` 继承。
:::

You may notice that our `Span()` constructor sets the same `from` and `to` properties that the `Range()` constructor does and so does not need to invoke the `Range()` constructor to initialize the new object. Similarly, Span’s `toString()` method completely re-implements the string conversion without needing to call Range’s version of `toString()`. This makes Span a special case, and we can only really get away with this kind of subclassing because we know the implementation details of the superclass. A robust subclassing mechanism needs to allow classes to invoke the methods and constructor of their superclass, but prior to ES6, JavaScript did not have a simple way to do these things.

::: tip 翻译
您可能会注意到，我们的 `Span()` 构造函数设置了与 `Range()` 构造函数相同的 `from` 和 `to` 属性，因此不需要调用 `Range()` 构造函数来初始化新对象。 `同样，Span` 的 `toString()` 方法完全重新实现了字符串转换，而不需要调用 `Range` 版本的 `toString()` 。 这使得 `Span` 成为一个特例，我们只能真正摆脱这种子类化，因为我们知道超类的实现细节。 一个健壮的子类化机制需要允许该类调用其超类的方法和构造函数，但在 ES6 之前，JavaScript 没有一种简单的方法来完成这些事情。
:::

Fortunately, ES6 solves these problems with the `super` keyword as part of the `class` syntax. The next section demonstrates how it works.

::: tip 翻译
幸运的是，ES6 通过将 `super` 关键字作为 `class` 语法的一部分解决了这些问题。 下一节将演示它是如何工作的。
:::

### 带有 extends 和 super 的子类

In ES6 and later, you can create a superclass simply by adding an `extends` clause to a class declaration, and you can do this even for built-in classes:

::: tip 翻译
在 ES6 及更高版本中，您只需在类声明中添加 `extends` 子句即可创建超类，甚至对于内置类也可以执行此操作：
:::

```js
// A trivial Array subclass that adds getters for the first and last elements.
class EZArray extends Array {
  get first() {
    return this[0];
  }
  get last() {
    return this[this.length - 1];
  }
}

let a = new EZArray();
a instanceof EZArray; // => true: a is subclass instance
a instanceof Array; // => true: a is also a superclass instance.
a.push(1, 2, 3, 4); // a.length == 4; we can use inherited methods
a.pop(); // => 4: another inherited method
a.first; // => 1: first getter defined by subclass
a.last; // => 3: last getter defined by subclass
a[1]; // => 2: regular array access syntax still works.
Array.isArray(a); // => true: subclass instance really is an array
EZArray.isArray(a); // => true: subclass inherits static methods, too!
```

This EZArray subclass defines two simple `getter` methods. Instances of EZArray behave like ordinary arrays, and we can use inherited methods and properties like `push()`, `pop()`, and `length`. But we can also use the `first` and `last` getters defined in the subclass. Not only are instance methods like `pop()` inherited, but static methods like `Array.isArray` are also inherited. This is a new feature enabled by ES6 class syntax: `EZArray()` is a function, but it inherits from `Array()`:

::: tip 翻译
这个 EZArray 子类定义了两个简单的 `getter` 方法。 EZArray 实例的行为与普通数组类似，我们可以使用继承的方法和属性，如 `push()`、`pop()` 和 `length`。 但我们也可以使用子类中定义的 `first` 和 `last` `getter`。 不仅像 `pop()` 这样的实例方法被继承，像 `Array.isArray` 这样的静态方法也被继承。 这是 ES6 类语法启用的新功能：`EZArray()` 是一个函数，但它继承自 `Array()`：
:::

```js
// EZArray inherits instance methods because EZArray.prototype
// inherits from Array.prototype
Array.prototype.isPrototypeOf(EZArray.prototype); // => true

// And EZArray inherits static methods and properties because
// EZArray inherits from Array. This is a special feature of the
// extends keyword and is not possible before ES6.
Array.isPrototypeOf(EZArray); // => true
```

Our EZArray subclass is too simple to be very instructive. Example 9-6 is a more fully fleshed-out example. It defines a TypedMap subclass of the built-in Map class that adds type checking to ensure that the keys and values of the map are of the specified types (according to `typeof`). Importantly, this example demonstrates the use of the `super` keyword to invoke the constructor and methods of the superclass.

::: tip 翻译
我们的 EZArray 子类太简单，没有太多指导意义。 例 9-6 是一个更加充实的例子。 它定义了内置 `Map` 类的 `TypedMap` 子类，该子类添加类型检查以确保映射的键和值属于指定类型（根据 `typeof` ）。 重要的是，此示例演示了如何使用 `super` 关键字来调用超类的构造函数和方法。
:::

_Example 9-6. TypedMap.js: a subclass of Map that checks key and value types_

```js
class TypeMap extends Map {
  constructor(keyType, valueType, entries) {
    // If entries are specified, check their types
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
      }
    }

    // Initialize the superclass with the (type-checked) initial entries
    super(entries);

    // And then initialize this subclass by storing the types
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // Now redefine the set() method to add type checking for any
  // new entries added to the map.
  set(key, value) {
    // Throw an error if the key or value are of the wrong type
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }

    // If the types are correct, we invoke the superclass's version of
    // the set() method, to actually add the entry to the map. And we
    // return whatever the superclass method returns.
    return super.set(key, value);
  }
}
```

The first two arguments to the `TypedMap()` constructor are the desired key and value types. These should be strings, such as “number” and “boolean”, that the `typeof` operator returns. You can also specify a third argument: an array (or any iterable object) of `[key,value]` arrays that specify the initial entries in the map. If you specify any initial entries, then the first thing the constructor does is verify that their types are correct. Next, the constructor invokes the superclass constructor, using the `super` keyword as if it was a function name. The `Map()` constructor takes one optional argument: an iterable object of `[key,value]` arrays. So the optional third argument of the `TypedMap()` constructor is the optional first argument to the `Map()` constructor, and we pass it to that superclass constructor with `super(entries)`.

::: tip 翻译
`TypedMap()` 构造函数的前两个参数是所需的键和值类型。 这些应该是 `typeof` 运算符返回的字符串，例如“number”和“boolean”。 您还可以指定第三个参数：“`[key,value]`”数组的数组（或任何可迭代对象），用于指定映射中的初始条目。 如果您指定任何初始条目，那么构造函数要做的第一件事就是验证它们的类型是否正确。 接下来，构造函数调用超类构造函数，使用 `super` 关键字，就像它是函数名称一样。 `Map()` 构造函数采用一个可选参数：“`[key,value]`”数组的可迭代对象。 因此，`TypedMap()` 构造函数的可选第三个参数是`Map()`构造函数的可选第一个参数，我们使用 `super(entries)` 将其传递给超类构造函数。
:::

After invoking the superclass constructor to initialize superclass state, the `TypedMap()` constructor next initializes its own subclass state by setting `this.keyType` and `this.valueType` to the specified types. It needs to set these properties so that it can use them again in the `set()` method.

::: tip 翻译
在调用超类构造函数初始化超类状态后，`TypedMap()` 构造函数接下来通过将 `this.keyType` 和 `this.valueType` 设置为指定类型来初始化自己的子类状态。 它需要设置这些属性，以便可以在 `set()` 方法中再次使用它们。
:::

There are a few important rules that you will need to know about using `super()` in constructors:

- If you define a class with the `extends` keyword, then the constructor for your class must use `super()` to invoke the superclass constructor.
- If you don’t define a constructor in your subclass, one will be defined automatically for you. This implicitly defined constructor simply takes whatever values are passed to it and passes those values to `super()`.
- You may not use the `this` keyword in your constructor until after you have invoked the superclass constructor with `super()`. This enforces a rule that superclasses get to initialize themselves before subclasses do.
- The special expression `new.target` is `undefined` in functions that are invoked without the `new` keyword. In constructor functions, however, `new.target` is a reference to the constructor that was invoked. When a subclass constructor is invoked and uses `super()` to invoke the superclass constructor, that superclass constructor will see the subclass constructor as the value of `new.target`. A well designed superclass should not need to know whether it has been subclassed, but it might be useful to be able to use `new.target.name` in logging messages, for example.

::: tip 翻译
关于在构造函数中使用 `super()`，您需要了解一些重要规则：

- 如果您使用 `extends` 关键字定义类，则该类的构造函数必须使用 `super()` 来调用超类构造函数。
- 如果您没有在子类中定义构造函数，系统会自动为您定义一个构造函数。 这个隐式定义的构造函数只是接受传递给它的任何值并将这些值传递给`super()`。
- 在使用 `super()` 调用超类构造函数之前，您不能在构造函数中使用 `this` 关键字。 这强制了超类在子类之前初始化自身的规则。
- 在不使用 `new` 关键字调用的函数中，特殊表达式 `new.target` 是 `undefined`。 然而，在构造函数中，`new.target` 是对被调用的构造函数的引用。 当调用子类构造函数并使用 `super()` 调用超类构造函数时，该超类构造函数会将子类构造函数视为 `new.target` 的值。 设计良好的超类不需要知道它是否已被子类化，但例如，能够在日志消息中使用 `new.target.name` 可能会很有用。
  :::

After the constructor, the next part of Example 9-6 is a method named `set()`. The Map superclass defines a method named `set()` to add a new entry to the map. We say that this `set()` method in TypedMap _overrides_ the `set()` method of its superclass. This simple TypedMap subclass doesn’t know anything about adding new entries to map, but it does know how to check types, so that is what it does first, verifying that the key and value to be added to the map have the correct types and throwing an error if they do not. This `set()` method doesn’t have any way to add the key and value to the map itself, but that is what the superclass `set()` method is for. So we use the `super` keyword again to invoke the superclass’s version of the method. In this context, `super` works much like the `this` keyword does: it refers to the current object but allows access to overridden methods defined in the superclass.

::: tip 翻译
在构造函数之后，示例 9-6 的下一部分是一个名为 `set()` 的方法。 `Map` 超类定义了一个名为 `set()` 的方法来向 `map` 添加新条目。 我们说 `TypedMap` 中的 `set()` 方法覆盖了其超类的 `set()` 方法。 这个简单的 `TypedMap` 子类不知道有关向 `map` 添加新条目的任何信息，但它确实知道如何检查类型，因此这就是它首先要做的事情，验证要添加到 `map` 的键和值是否具有正确的类型，并且如果不是，则会抛出错误。 这个 `set()` 方法没有任何方法将键和值添加到 `map` 本身，但这就是超类 `set()` 方法的用途。 因此，我们再次使用 `super` 关键字来调用该方法的超类版本。 在这种情况下，`super` 的工作方式与 `this` 关键字非常相似：它引用当前对象，但允许访问超类中定义的重写方法。
:::

In constructors, you are required to invoke the superclass constructor before you can access `this` and initialize the new object yourself. There are no such rules when you override a method. A method that overrides a superclass method is not required to invoke the superclass method. If it does use `super` to invoke the overridden method (or any method) in the superclass, it can do that at the beginning or the middle or the end of the overriding method.

::: tip 翻译
在构造函数中，您需要先调用超类构造函数，然后才能访问 `this` 并自己初始化新对象。 当您重写方法时，没有这样的规则。 重写超类方法的方法不需要调用超类方法。 如果它确实使用 `super` 来调用超类中的重写方法（或任何方法），则它可以在重写方法的开头、中间或末尾执行此操作。
:::

Finally, before we leave the TypedMap example behind, it is worth noting that this class is an ideal candidate for the use of private fields. As the class is written now, a user could change the `keyType` or `valueType` properties to subvert the type checking.

::: tip 翻译
最后，在我们离开 `TypedMap` 示例之前，值得注意的是，此类是使用私有字段的理想候选类。 现在编写该类时，用户可以更改 `keyType` 或 `valueType` 属性来破坏类型检查。
:::

Once private fields are supported, we could change these properties to `#keyType` and `#valueType` so that they could not be altered from the outside.

::: tip 翻译
一旦支持私有字段，我们就可以将这些属性更改为 `#keyType` 和 `#valueType`，这样它们就无法从外部更改。
:::

### 委托代替继承

The `extends` keyword makes it easy to create subclasses. But that does not mean that you should create lots of subclasses. If you want to write a class that shares the behavior of some other class, you can try to inherit that behavior by creating a subclass. But it is often easier and more flexible to get that desired behavior into your class by having your class create an instance of the other class and simply delegating to that instance as needed. You create a new class not by subclassing, but instead by wrapping or “composing” other classes. This delegation approach is often called “composition,” and it is an oft-quoted maxim of object-oriented programming that one should “favor composition over inheritance.”

::: tip 翻译
`extends` 关键字可以轻松创建子类。 但这并不意味着您应该创建大量子类。 如果您想编写一个共享其他类行为的类，您可以尝试通过创建子类来继承该行为。 但是，通过让您的类创建另一个类的实例并根据需要简单地委托给该实例，将所需的行为引入到您的类中通常更容易、更灵活。 您不是通过子类化来创建新类，而是通过包装或“组合”其他类来创建新类。 这种委托方法通常被称为“组合”，这是经常被引用的面向对象编程的格言：人们应该“优先考虑组合而不是继承”。
:::

Suppose, for example, we wanted a Histogram class that behaves something like JavaScript’s Set class, except that instead of just keeping track of whether a value has been added to set or not, it instead maintains a count of the number of times the value has been added. Because the API for this Histogram class is similar to Set, we might consider subclassing Set and adding a `count()` method. On the other hand, once we start thinking about how we might implement this `count()` method, we might realize that the Histogram class is more like a Map than a Set because it needs to maintain a mapping between values and the number of times they have been added. So instead of subclassing Set, we can create a class that defines a Set-like API but implements those methods by delegating to an internal Map object. Example 9-7 shows how we could do this.

::: tip 翻译
例如，假设我们想要一个 `Histogram` 类，它的行为类似于 JavaScript 的 Set 类，不同之处在于它不仅仅跟踪某个值是否已添加到 set 中，而是维护该值已添加出现的次数。 因为这个 `Histogram` 类的 API 与 Set 类似，所以我们可以考虑子类化 Set 并添加一个 `count()` 方法。 另一方面，一旦我们开始考虑如何实现这个 `count()` 方法，我们可能会意识到 Histogram 类更像是 Map 而不是 Set，因为它需要维护值和添加次数之间的映射。 因此，我们可以创建一个定义类似 Set 的 API 的类，但通过委托给内部 Map 对象来实现这些方法，而不是子类化 Set。 例 9-7 展示了我们如何做到这一点。
:::

_Example 9-7. Histogram.js: a Set-like class implemented with delegation_

```js
/**
 * A Set-like class that keeps track of how many times a value has
 * been added. Call add() and remove() like you would for a Set, and
 * call count() to find out how many times a given value has been added.
 * The default iterator yields the values that have been added at least
 * once. Use entries() if you want to iterate [value, count] pairs.
 */
class Histogram {
  // To initialize, we just create a Map object to delegate to
  constructor() {
    this.map = new Map();
  }

  // For any given key, the count is the value in the Map, or zero
  // if the key does not appear in the Map.
  count(key) {
    return this.map.get(key) || 0;
  }

  // The Set-like method has() returns true if the count is non-zero
  has(key) {
    return this.count(key) > 0;
  }

  // The size of the histogram is just the number of entries in the Map.
  get size() {
    return this.map.size;
  }

  // To add a key, just increment its count in the Map
  add(key) {
    this.map.set(key, this.count(key) + 1);
  }

  // Deleting a key is a little tricker because we have to delete
  // the key from the Map if the count goes back down to zero.
  delete(key) {
    let count = this.count(key);
    if (count === 1) {
      this.map.delete(key);
    } else if (count > 1) {
      this.map.set(key, count - 1);
    }
  }

  // Iterating a Histogram just returns the keys stored in it
  [Symbol.iterator]() {
    return this.map.keys();
  }

  // These other iterator methods just delegate to the Map object
  keys() {
    return this.map.keys();
  }

  values() {
    return this.map.values();
  }

  entries() {
    return this.map.entries();
  }
}
```

All the `Histogram()` constructor does in Example 9-7 is create a Map object. And most of the methods are one-liners that just delegate to a method of the map, making the implementation quite simple. Because we used delegation rather than inheritance, a Histogram object is not an instance of Set or Map. But Histogram implements a number of commonly used Set methods, and in an untyped language like JavaScript, that is often good enough: a formal inheritance relationship is sometimes nice, but often optional.

::: tip 翻译
例 9-7 中的 `Histogram()` 构造函数所做的就是创建一个 Map 对象。 而且大多数方法都是单行的，只是委托给映射的方法，使得实现非常简单。 因为我们使用委托而不是继承，所以 `Histogram` 对象不是 Set 或 Map 的实例。 但是 `Histogram` 实现了许多常用的 Set 方法，并且在像 JavaScript 这样的非类型语言中，这通常就足够了：正式的继承关系有时很好，但通常是可选的。
:::

### 类层次结构和抽象类

Example 9-6 demonstrated how we can subclass Map. Example 9-7 demonstrated how we can instead delegate to a Map object without actually subclassing anything. Using JavaScript classes to encapsulate data and modularize your code is often a great technique, and you may find yourself using the `class` keyword frequently. But you may find that you prefer composition to inheritance and that you rarely need to use `extends` (except when you’re using a library or framework that requires you to extend its base classes).

::: tip 翻译
例 9-6 演示了如何对 Map 进行子类化。 示例 9-7 演示了如何委托给 Map 对象，而无需实际子类化任何内容。 使用 JavaScript 类来封装数据和模块化代码通常是一项很棒的技术，您可能会发现自己经常使用 `class` 关键字。 但是您可能会发现您更喜欢组合而不是继承，并且很少需要使用 `extends`（除非您使用的库或框架需要您扩展其基类）。
:::

There are some circumstances when multiple levels of subclassing are appropriate, however, and we’ll end this chapter with an extended example that demonstrates a hierarchy of classes representing different kinds of sets. (The set classes defined in Example 9-8 are similar to, but not completely compatible with, JavaScript’s built-in Set class.)

::: tip 翻译
然而，在某些情况下，多个级别的子类化是合适的，我们将以一个扩展示例来结束本章，该示例演示了表示不同类型集合的类的层次结构。 （示例 9-8 中定义的 Set 类与 JavaScript 的内置 Set 类类似，但不完全兼容。）
:::

Example 9-8 defines lots of subclasses, but it also demonstrates how you can define _abstract classes_—classes that do not include a complete implementation—to serve as a common superclass for a group of related subclasses. An abstract superclass can define a partial implementation that all subclasses inherit and share. The subclasses, then, only need to define their own unique behavior by implementing the abstract methods defined—but not implemented—by the superclass. Note that JavaScript does not have any formal definition of abstract methods or abstract classes; I’m simply using that name here for unimplemented methods and incompletely implemented classes.

::: tip 翻译
示例 9-8 定义了许多子类，但它还演示了如何定义 _抽象类_（不包含完整实现的类）以充当一组相关子类的公共超类。 抽象超类可以定义所有子类继承和共享的部分实现。 那么，子类只需要通过实现超类定义（但未实现）的抽象方法来定义自己的独特行为。 请注意，JavaScript 没有抽象方法或抽象类的任何正式定义； 我在这里只是将这个名称用于未实现的方法和未完全实现的类。
:::

Example 9-8 is well commented and stands on its own. I encourage you to read it as a capstone example for this chapter on classes. The final class in Example 9-8 does a lot of bit manipulation with the `&`, `|`, and `~` operators, which you can review in §4.8.3.

::: tip 翻译
例 9-8 得到了很好的注释并且是独立的。 我鼓励您将其作为本章课程的顶点示例来阅读。 示例 9-8 中的最后一个类使用 `&`、`|`和 `~` 运算符进行了大量位操作，您可以在第 4.8.3 节中查看这些操作。
:::

_Example 9-8. Sets.js: a hierarchy of abstract and concrete set classes_

```js
/**
 * The AbstractSet class defines a single abstract method, has().
 */
class AbstractSet {
  // Throw an error here so that subclasses are forced
  // to define their own working version of this method.
  has(x) {
    throw new Error("Abstract method");
  }
}

/**
 * NotSet is a concrete subclass of AbstractSet.
 * The members of this set are all values that are not members of some
 * other set. Because it is defined in terms of another set it is not
 * writable, and because it has infinite members, it is not enumerable.
 * All we can do with it is test for membership and convert it to a
 * string using mathematical notation.
 */
class NotSet extends AbstractSet {
  constructor(set) {
    super();
    this.set = set;
  }

  // Our implementation of the abstract method we inherited
  has(x) {
    return !this.set.has(x);
  }
  // And we also override this Object method
  toString() {
    return `{ x| x ∉ ${this.set.toString()}}`;
  }
}

/**
 * Range set is a concrete subclass of AbstractSet. Its members are
 * all values that are between the from and to bounds, inclusive.
 * Since its members can be floating point numbers, it is not
 * enumerable and does not have a meaningful size.
 */
class RangeSet extends AbstractSet {
  constructor(from, to) {
    super();
    this.from = from;
    this.to = to;
  }

  has(x) {
    return x >= this.from && x <= this.to;
  }
  toString() {
    return `{ x| ${this.from} <= x <= ${this.to}}`;
  }
}

/**
 * AbstractEnumerableSet is an abstract subclass of AbstractSet. If defines
 * an abstract getter that returns the size of the set and also defines an
 * abstract iterator. And it then implements concrete isEmpty(), toString(),
 * and equals() methods on top of those. Subclasses that implement the
 * iterator, the size getter, and the has() method get these concrete
 * methods for free.
 */
class AbstractEnumerableSet extends AbstractSet {
  get size() {
    throw new Error("Abstract method");
  }
  [Symbol.iterator]() {
    throw new Error("Abstract method");
  }

  isEmpty() {
    return this.size === 0;
  }
  toString() {
    return `{${Array.from(this).join(", ")}}`;
  }
  equals(set) {
    // If the other set is not also Enumerable, it isn't equal to this one
    if (!(set instanceof AbstractEnumerableSet)) {
      return false;
    }

    // If they don't have the same size, they're not equal
    if (this.size !== set.size) {
      return false;
    }

    // Loop through the elements of this set
    for (let element of this) {
      // If an element isn't in the other set, they aren't equal
      if (!set.has(element)) {
        return false;
      }
    }

    // The elements matched, so the sets are equal
    return true;
  }
}

/**
 * SingletonSet is a concrete subclass of AbstractEnumerableSet.
 * A singleton set is a read-only set with a single member.
 */
class SingletonSet extends AbstractEnumerableSet {
  constructor(member) {
    super();
    this.member = member;
  }

  // We implement these three methods, and inherit isEmpty, equals()
  // and toString() implementation based on these methods.
  has(x) {
    return x === this.member;
  }
  get size() {
    return 1;
  }
  *[Symbol.iterator]() {
    yield this.member;
  }
}

/**
 * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.
 * It defines the abstract methods insert() and remove() that insert and
 * remove individual elements from the set, and then implements concrete
 * add(), subtract(), and intersect() methods on top of those. Note that
 * our API diverges here from the standard JavaScript Set class.
 */
class AbstractWritableSet extends AbstractEnumerableSet {
  insert(x) {
    throw new Error("Abstract method");
  }
  remove(x) {
    throw new Error("Abstract method");
  }

  add(set) {
    for (let element of set) {
      this.insert(element);
    }
  }

  subtract(set) {
    for (let element of set) {
      this.remove(element);
    }
  }

  intersect(set) {
    for (let element of set) {
      if (!set.has(element)) {
        this.remove(element);
      }
    }
  }
}

/**
 * A BitSet is a concrete subclass of AbstractWritableSet with a
 * very efficient fixed-size set implementation for sets whose
 * elements are non-negative integers less than some maximum size.
 */
class BitSet extends AbstractWritableSet {
  constructor(max) {
    super();
    this.max = max; // The maximum integer we can store.
    this.n = 0; // How many integers are in the set
    this.numBytes = Math.floor(max / 8) + 1; // How many bytes we need
    this.data = new Uint8Array(this.numBytes); // The bytes
  }

  // Internal method to check if a value is a legal member of this set
  _valid(x) {
    return Number.isInteger(x) && x >= 0 && x <= this.max;
  }

  // Tests whether the specified bit of the specified byte of our
  // data array is set or not. Returns true or false.
  _has(byte, bit) {
    return (this.data[byte] & BitSet.bits[bit]) !== 0;
  }

  // Is the value x in this BitSet?
  has(x) {
    if (this._valid(x)) {
      let byte = Math.floor(x / 8);
      let bit = x % 8;
      return this._has(byte, bit);
    } else {
      return false;
    }
  }

  // Insert the value x into the BitSet
  insert(x) {
    if (this._valid(x)) {
      // If the value is valid
      let byte = Math.floor(x / 8); // convert to byte and bit
      let bit = x % 8;
      if (!this._has(byte, bit)) {
        // If that bit is not set yet
        this.data[byte] |= BitSet.bits[bit]; // then set it
        this.n++; // and increment set size
      }
    } else {
      throw new Error("Invalid set element: " + x);
    }
  }

  remove(x) {
    if (this._valid(x)) {
      // If the value is valid
      let byte = Math.floor(x / 8); // compute the byte and bit
      let bit = x % 8;
      if (this._has(byte, bit)) {
        // If that bit is already set
        this.data[byte] &= BitSet.bits[bit]; // then unset it
        this.n--; // and decrement size
      }
    } else {
      throw new Error("Invalid set element: " + x);
    }
  }

  // A getter to return the size of the set
  get size() {
    return this.n;
  }

  // Iterate the set by just checking each bit in turn.
  // (We could be a lot more clever and optimize this substantially)
  *[Symbol.iterator]() {
    for (let i = 0; i <= this.max; i++) {
      if (this.has(i)) {
        yield i;
      }
    }
  }
}

// Some pre-computed values used by the has(), insert() and remove() methods
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);
```

## 总结

This chapter has explained the key features of JavaScript classes:

- Objects that are members of the same class inherit properties from the same prototype object. The prototype object is the key feature of JavaScript classes, and it is possible to define classes with nothing more than the `Object.create()` method.
- Prior to ES6, classes were more typically defined by first defining a constructor function. Functions created with the `function` keyword have a `prototype` property, and the value of this property is an object that is used as the prototype of all objects created when the function is invoked with `new` as a constructor. By initializing this prototype object, you can define the shared methods of your class. Although the prototype object is the key feature of the class, the `constructor` function is the public identity of the class.
- ES6 introduces a `class` keyword that makes it easier to define classes, but under the hood, constructor and prototype mechanism remains the same.
- Subclasses are defined using the `extends` keyword in a class declaration.
- Subclasses can invoke the constructor of their superclass or overridden methods of their superclass with the `super` keyword.

::: tip 翻译
本章解释了 JavaScript 类的主要特性：

- 作为同一类成员的对象从同一原型对象继承属性。 原型对象是 JavaScript 类的关键特性，只需使用 `Object.create()` 方法就可以定义类。
- 在 ES6 之前，类通常是通过首先定义构造函数来定义的。 使用 `function` 关键字创建的函数具有 `prototype` 属性，该属性的值是一个对象，该对象用作使用 `new` 作为构造函数调用该函数时创建的所有对象的原型。 通过初始化这个原型对象，您可以定义类的共享方法。 虽然原型对象是类的关键特征，但构造函数是类的公共标识。
- ES6 引入了 `class` 关键字，可以更轻松地定义类，但在底层，构造函数和原型机制保持不变。
- 子类是在类声明中使用 `extends` 关键字定义的。
- 子类可以使用 `super` 关键字调用其超类的构造函数或重写其超类的方法。
  :::
