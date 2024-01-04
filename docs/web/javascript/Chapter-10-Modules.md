---
title: 第十章 模块
---

# 模块

[[toc]]

The goal of modular programming is to allow large programs to be assembled using modules of code from disparate authors and sources and for all of that code to run correctly even in the presence of code that the various module authors did not anticipate. As a practical matter, modularity is mostly about encapsulating or hiding private implementation details and keeping the global namespace tidy so that modules cannot accidentally modify the variables, functions, and classes defined by other modules.

::: tip 翻译
模块化编程的目标是允许使用来自不同作者和来源的代码模块来组装大型程序，并且即使存在各个模块作者没有预料到的代码，所有代码也能正确运行。 实际上，模块化主要是封装或隐藏私有实现细节并保持全局命名空间整洁，以便模块不会意外修改其他模块定义的变量、函数和类。
:::

Until recently, JavaScript had no built-in support for modules, and programmers working on large code bases did their best to use the weak modularity available through classes, objects, and closures. Closure-based modularity, with support from code-bundling tools, led to a practical form of modularity based on a `require()` function, which was adopted by Node. `require()`-based modules are a fundamental part of the Node programming environment but were never adopted as an official part of the JavaScript language. Instead, ES6 defines modules using `import` and `export` keywords. Although `import` and `export` have been part of the language for years, they were only implemented by web browsers and Node relatively recently. And, as a practical matter, JavaScript modularity still depends on code-bundling tools.

::: tip 翻译
直到最近，JavaScript 还没有对模块的内置支持，而从事大型代码库工作的程序员尽最大努力通过类、对象和闭包来使用可用的弱模块化性。 基于闭包的模块化，在代码捆绑工具的支持下，产生了一种基于“require()”函数的实用模块化形式，并被 Node.js 采用。 基于“require()”的模块是 Node 编程环境的基本组成部分，但从未被采用为 JavaScript 语言的正式部分。 相反，ES6 使用“import”和“export”关键字定义模块。 尽管“import”和“export”多年来一直是该语言的一部分，但它们最近才由 Web 浏览器和 Node 实现。 而且，实际上，JavaScript 模块化仍然依赖于代码捆绑工具。
:::

The Sections that follow cover:

- Do-it-yourself modules with classes, objects, and closures
- Node modules using `require()`
- ES6 modules using `export`, `import`, and `import()`

::: tip 翻译
以下各节涵盖：

- 带有类、对象和闭包的 DIY 模块
- 使用`require()`的 Node 模块
- 使用 `export`、`import` 和 `import()` 的 ES6 模块
  :::

## Modules with Classes, Objects, and Closures

Though it may be obvious, it is worth pointing out that one of the important features of classes is that they act as modules for their methods. Think back to **Example 9-8**. That example defined a number of different classes, all of which had a method named `has()`. But you would have no problem writing a program that used multiple set classes from that example: there is no danger that the implementation of `has()` from SingletonSet will overwrite the `has()` method of BitSet, for example.

::: tip 翻译
尽管这可能是显而易见的，但值得指出的是，类的重要特征之一是它们充当其方法的模块。 回想一下**示例 9-8**。 该示例定义了许多不同的类，所有类都有一个名为`has()`的方法。 但是，编写使用该示例中的多个集合类的程序不会有任何问题：例如，SingletonSet 中的`has()`实现不会覆盖 BitSet 的`has()`方法。
:::

The reason that the methods of one class are independent of the methods of other, unrelated classes is that the methods of each class are defined as properties of independent prototype objects. The reason that classes are modular is that objects are modular: defining a property in a JavaScript object is a lot like declaring a variable, but adding properties to objects does not affect the global namespace of a program, nor does it affect the properties of other objects. JavaScript defines quite a few mathematical functions and constants, but instead of defining them all globally, they are grouped as properties of a single global Math object. This same technique could have been used in **Example 9-8**. Instead of defining global classes with names like SingletonSet and BitSet, that example could have been written to define only a single global Sets object, with properties referencing the various classes. Users of this Sets library could then refer to the classes with names like `Sets.Singleton` and `Sets.Bit`.

::: tip 翻译
一个类的方法独立于其他不相关类的方法的原因是每个类的方法被定义为独立原型对象的属性。 类模块化的原因在于对象也是模块化的：在 JavaScript 对象中定义属性很像声明变量，但是向对象添加属性不会影响程序的全局命名空间，也不会影响其他对象的属性。 JavaScript 定义了相当多的数学函数和常量，但它们不是全局定义的，而是被分组为单个全局 Math 对象的属性。 同样的技术也可以用在**示例 9-8** 中。 该示例可以编写为仅定义单个全局 Sets 对象，并具有引用各个类的属性，而不是使用 SingletonSet 和 BitSet 之类的名称定义全局类。 然后，该 Sets 库的用户可以引用具有`Sets.Singleton`和`Sets.Bit`等名称的类。
:::

Using classes and objects for modularity is a common and useful technique in JavaScript programming, but it doesn't go far enough. In particular, it doesn't offer us any way to hide internal implementation details inside the module. Consider **Example 9-8** again. If we were writing that example as a module, maybe we would have wanted to keep the various abstract classes internal to the module, only making the concrete subclasses available to users of the module. Similarly, in the BitSet class, the `_valid()` and `_has()` methods are internal utilities that should not really be exposed to users of the class. And `BitSet.bits` and `BitSet.masks` are implementation details that would be better off hidden.

::: tip 翻译
使用类和对象实现模块化是 JavaScript 编程中一种常见且有用的技术，但它还远远不够。 特别是，它没有为我们提供任何隐藏模块内内部实现细节的方法。 再次考虑**示例 9-8**。 如果我们将该示例编写为模块，也许我们希望将各种抽象类保留在模块内部，只使具体子类可供模块的用户使用。 类似地，在 BitSet 类中，`_valid()`和`_has()`方法是内部实用程序，不应真正向该类的用户公开。 `BitSet.bits`和`BitSet.masks`是最好隐藏的实现细节。
:::

As we saw in **#8.6**, local variables and nested functions declared within a function are private to that function. This means that we can use immediately invoked function expressions to achieve a kind of modularity by leaving the implementation details and utility functions hidden within the enclosing function but making the public API of the module the return value of the function. In the case of the BitSet class, we might structure the module like this:

::: tip 翻译
正如我们在 **#8.6** 中看到的，函数内声明的局部变量和嵌套函数对于该函数来说是私有的。 这意味着我们可以使用立即调用的函数表达式来实现某种模块化，方法是将实现细节和实用函数隐藏在封闭函数中，但将模块的公共 API 作为函数的返回值。 对于 BitSet 类，我们可以像这样构造模块：
:::

```js
const BitSet = (function() { // 将 BitSet 设置为该函数的返回值
    // 私有方法
    function isValid(set, n) { ... }
    function has(set, byte, bit) { ... }
    const BITS = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
    const MASKS = new Uint8Array([~1, ~2, ~4, ~8, ~32, ~64, ~128]);
    // 该模块的公共 API 是 BitSet 类，我们在此处定义并返回该类。 类可以使用上面定义的私有函数和常量，但它们将对用户隐藏
    return class BitSet extends AbstractWritableSet {
        // ... implementation omitted ...
    }
}());
```

This approach to modularity becomes a little more interesting when the module has more than one item in it. The following code, for example, defines a mini statistics module that exports `mean()` and `stddev()` functions while leaving the implementation details hidden:

::: tip 翻译
当模块中包含多个项目时，这种模块化方法会变得更有趣。 例如，以下代码定义了一个迷你统计模块，该模块导出`mean()`和`stddev()`函数，同时隐藏实现细节：
:::

```js
// 定义统计模块
const stats = (function () {
  // 模块私有的工具函数
  const sum = (x, y) => x + y;
  const square = (x) => x * x;

  // 将导出的公共函数
  function mean(data) {
    return data.reduce(sum) / data.length;
  }

  // 将导出的公共函数
  function stddev(data) {
    let m = mean(data);
    return Math.sqrt(
      data
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (data.length - 1)
    );
  }

  // 将公共函数导出为对象的属性
  return { mean, stddev };
})();

// 使用模块
stats.mean([1, 3, 5, 7, 9]); // => 5
stats.stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10)
```

### Automating Closure-Based Modularity

Note that it is a fairly mechanical process to transform a file of JavaScript code into this kind of module by inserting some text at the beginning and end of the file. All that is needed is some convention for the file of JavaScript code to indicate which values are to be exported and which are not.

::: tip 翻译
请注意，通过在文件的开头和结尾插入一些文本，将 JavaScript 代码文件转换为此类模块是一个相当机械的过程。 所需要的只是 JavaScript 代码文件的一些约定，以指示哪些值要导出，哪些值不导出。
:::

Imagine a tool that takes a set of files, wraps the content of each of those files within an immediately invoked function expression, keeps track of the return value of each function, and concatenates everything into one big file. The result might look something like this:

::: tip 翻译
想象一个工具，它接受一组文件，将每个文件的内容包装在立即调用的函数表达式中，跟踪每个函数的返回值，并将所有内容连接到一个大文件中。 结果可能看起来像这样：
:::

```js
const modules = {};
function require(moduleName) { return modules[moduleName]; }

modules["sets.js"] = (function() {
    const exports = {};

    // set.js 文件的内容位于此处：
    exports.BitSet = class BitSet { ... };

    return exports;
}());

modules["stats.js"] = (function() {
    const exports = {};

    // stats.js 文件的内容位于此处：
    const sum = (x, y) => x + y;
    const square = x => x * x;
    exports.mean = function(data) { ... };
    exports.stddev = function(data) { ... };

    return exports;
}());
```

With modules bundled up into a single file like the one shown in the preceding example, you can imagine writing code like the following to make use of those modules:

::: tip 翻译
将模块捆绑到单个文件中（如上一示例中所示），您可以想象编写如下代码来使用这些模块：
:::

```js
// 获取我们需要的模块（或模块内容）的引用
const stats = require("stats.js");
const BitSet = require("sets.js").BitSet;

// 现在使用这些模块编写代码
let s = new BitSet(100);
s.insert(10);
s.insert(20);
s.insert(30);
let average = stats.mean([...s]); // average is 20
```

This code is a rough sketch of how code-bundling tools (such as webpack and Parcel) for web browsers work, and it's also a simple introduction to the `require()` function like the one used in Node programs.

::: tip 翻译
这段代码粗略地展示了 Web 浏览器的代码捆绑工具（例如 webpack 和 Parcel）的工作原理，同时也是对 Node 程序中使用的`require()`函数的简单介绍。
:::

## Modules in Node

In Node programming, it is normal to split programs into as many files as seems natural. These files of JavaScript code are assumed to all live on a fast filesystem. Unlike web browsers, which have to read files of JavaScript over a relatively slow network connection, there is no need or benefit to bundling a Node program into a single JavaScript file.

::: tip 翻译
在 Node 编程中，将程序分割成尽可能多的文件是很正常的。 假定这些 JavaScript 代码文件都位于快速文件系统上。 与必须通过相对较慢的网络连接读取 JavaScript 文件的 Web 浏览器不同，将 Node 程序捆绑到单个 JavaScript 文件中没有必要也没有好处。
:::

In Node, each file is an independent module with a private namespace. Constants, variables, functions, and classes defined in one file are private to that file unless the file exports them. And values exported by one module are only visible in another module if that module explicitly imports them.

::: tip 翻译
在 Node 中，每个文件都是一个具有私有命名空间的独立模块。 一个文件中定义的常量、变量、函数和类对于该文件来说是私有的，除非该文件导出它们。 一个模块导出的值仅在另一个模块显式导入时才在该模块中可见。
:::

Node modules import other modules with the `require()` function and export their public API by setting properties of the Exports object or by replacing the `module.exports` object entirely.

::: tip 翻译
Node 模块使用 `require()` 函数导入其他模块，并通过设置 Exports 对象的属性或完全替换 `module.exports` 对象来导出其公共 API。
:::

### Node Exports

Node defines a global `exports` object that is always defined. If you are writing a Node module that exports multiple values, you can simply assign them to the properties of this object:

::: tip 翻译
Node 定义了一个始终被定义的全局`exports`对象。 如果您正在编写导出多个值的 Node 模块，您可以简单地将它们分配给该对象的属性：
:::

```js
const sum = (x, y) => x + y;
const square = (x) => x * x;

exports.mean = (data) => data.reduce(sum) / data.length;
exports.stddev = function (d) {
  let m = exports.mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};
```

Often, however, you want to define a module that exports only a single function or class rather than an object full of functions or classes. To do this, you simply assign the single value you want to export to `module.exports`:

::: tip 翻译
然而，您通常希望定义一个仅导出单个函数或类的模块，而不是导出一个充满函数或类的对象。 为此，您只需将要导出的单个值分配给`module.exports`：
:::

```js
module.exports = class BitSet extends AbstractWritableSet {
  // implementation omitted
};
```

The default value of `module.exports` is the same object that `exports` refers to. In the previous stats module, we could have assigned the mean function to `module.exports.mean` instead of `exports.mean`. Another approach with modules like the stats module is to export a single object at the end of the module rather than exporting functions one by one as you go:

::: tip 翻译
`module.exports` 的默认值与 `exports` 引用的对象相同。 在前面的 stats 模块中，我们可以将 mean 函数分配给`module.exports.mean`而不是`exports.mean`。 使用 stats 模块等模块的另一种方法是在模块末尾导出单个对象，而不是逐个导出函数：
:::

```js
// 定义所有函数, 包括公共的和私有的
const sum = (x, y) => x + y;
const square = (x) => x * x;

const mean = (data) => data.reduce(sum) / data.length;
const stddev = (d) => {
  let m = mean(d);
  return Math.sqrt(
    d
      .map((x) => x - m)
      .map(square)
      .reduce(sum) /
      (d.length - 1)
  );
};

// 导出公共的
module.exports = { mean, stddev };
```

### Node Imports

A Node module imports another module by calling the `require()` function. The argument to this function is the name of the module to be imported, and the return value is whatever value (typically a function, class, or object) that module exports.

::: tip 翻译
Node 模块通过调用`require()`函数导入另一个模块。 该函数的参数是要导入的模块的名称，返回值是模块导出的任何值（通常是函数、类或对象）。
:::

If you want to import a system module built in to Node or a module that you have installed on your system via a package manager, then you simply use the unqualified name of the module, without any "/" characters that would turn it into a filesystem path:

::: tip 翻译
如果您想导入 Node 内置的系统模块或通过包管理器安装在系统上的模块，那么您只需使用该模块的非限定名称，不带任何“/”字符，否则会将其变成文件系统路径：
:::

```js
// Node 内置模块
const fs = require("fs"); // 内置文件系统模块
const http = require("http"); // 内置http模块

// Express HTTP server framework 是一个第三方模块
// 它不是Node的一部分, 但已经安装在本地
const express = require("express");
```

When you want to import a module of your own code, the module name should be the path to the file that contains that code, relative to the current module's file. It is legal to use absolute paths that begin with a / character, but typically, when importing modules that are part of your own program, the module names will begin with ./ or sometimes ../ to indicate that they are relative to the current directory or the parent directory. For example:

::: tip 翻译
当您想要导入自己代码的模块时，模块名称应该是包含该代码的文件的路径，相对于当前模块的文件。 使用以 / 字符开头的绝对路径是合法的，但通常，当导入属于您自己的程序的模块时，模块名称将以 ./ 或有时 ../ 开头，以指示它们相对于当前程序 目录或父目录。 例如：
:::

```js
const stats = requires("./stats.js");
const BitSet = require("./utils/bitset.js");
```

(You can also omit the .js suffix on the files you're importing and Node will still find the files, but it is common to see these file extensions explicitly included.)

::: tip 翻译
（您还可以省略要导入的文件上的 .js 后缀，Node 仍会找到这些文件，但通常会看到显式包含这些文件扩展名。）
:::

When a module exports just a single function or class, all you have to do is require it. When a module exports an object with multiple properties, you have a choice: you can import the entire object, or just import the specific properties (using destructuring assignment) of the object that you plan to use. Compare these two approaches:

::: tip 翻译
当模块仅导出单个函数或类时，您所要做的就是`require`它。 当模块导出具有多个属性的对象时，您可以选择：可以导入整个对象，或者仅导入您计划使用的对象的特定属性（使用解构赋值）。 比较这两种方法：
:::

```js
// 导入整个stats对象. 可以使用它的所有函数
const stats = require("./stats.js");

// 使用'stats'命名空间调用
let average = stats.mean(data);

// 或者，我们可以使用惯用的解构赋值将我们想要的函数直接导入本地命名空间：
const { stddev } = require("./stats.js");

// 这很好而且简洁，尽管如果没有 'stats' 前缀作为 stddev() 函数的命名空间，我们会丢失一些上下文。
let sd = stddev(data);
```

### Node-Style Modules on the Web

Modules with an Exports object and a `require()` function are built in to Node. But if you're willing to process your code with a bundling tool like webpack, then it is also possible to use this style of modules for code that is intended to run in web browsers. Until recently, this was a very common thing to do, and you may see lots of web-based code that still does it.

::: tip 翻译
Node.js 中内置了带有 Exports 对象和 `require()` 函数的模块。 但是，如果您愿意使用 webpack 等捆绑工具处理代码，那么也可以将这种风格的模块用于要在 Web 浏览器中运行的代码。 直到最近，这还是一件很常见的事情，您可能会看到许多基于 Web 的代码仍然在这样做。
:::

Now that JavaScript has its own standard module syntax, however, developers who use bundlers are more likely to use the official JavaScript modules with `import` and `export` statements.

::: tip 翻译
然而，现在 JavaScript 有了自己的标准模块语法，使用捆绑器的开发人员更有可能使用带有`import`和`export`语句的官方 JavaScript 模块。
:::

## Modules in ES6

ES6 adds `import` and `export` keywords to JavaScript and finally supports real modularity as a core language feature. ES6 modularity is conceptually the same as Node modularity: each file is its own module, and constants, variables, functions, and classes defined within a file are private to that module unless they are explicitly exported. Values that are exported from one module are available for use in modules that explicitly import them. ES6 modules differ from Node modules in the syntax used for exporting and importing and also in the way that modules are defined in web browsers. The sections that follow explain these things in detail.

::: tip 翻译
ES6 在 JavaScript 中添加了`import`和`export`关键字，并最终支持真正的模块化作为核心语言功能。 ES6 模块化在概念上与 Node 模块化相同：每个文件都是它自己的模块，文件中定义的常量、变量、函数和类对于该模块来说是私有的，除非它们被显式导出。 从一个模块导出的值可在显式导入它们的模块中使用。 ES6 模块与 Node 模块的不同之处在于用于导出和导入的语法以及在 Web 浏览器中定义模块的方式。 以下各节详细解释了这些内容。
:::

First, though, note that ES6 modules are also different from regular JavaScript "scripts" in some important ways. The most obvious difference is the modularity itself: in regular scripts, top-level declarations of variables, functions, and classes go into a single global context shared by all scripts. With modules, each file has its own private context and can use the `import` and `export` statements, which is the whole point, after all. But there are other differences between modules and scripts as well. Code inside an ES6 module (like code inside any ES6 `class` definition) is automatically in strict mode (see #5.6.3). This means that, when you start using ES6 modules, you'll never have to write "use strict" again. And it means that code in modules cannot use the `with` statement or the `arguments` object or undeclared variables. ES6 modules are even slightly stricter than strict mode: in strict mode, in functions invoked as functions, `this` is `undefined`. In modules, `this` is `undefined` even in top-level code. (By contrast, scripts in web browsers and Node set `this` to the global object.)

::: tip 翻译
不过，首先请注意，ES6 模块在某些重要方面也不同于常规 JavaScript 脚本。 最明显的区别是模块化本身：在常规脚本中，变量、函数和类的顶级声明进入所有脚本共享的单个全局上下文中。 对于模块，每个文件都有自己的私有上下文，并且可以使用`import`和`export`语句，这就是重点。 但模块和脚本之间还存在其他差异。 ES6 模块内的代码（就像任何 ES6 `class` 定义内的代码）自动处于严格模式（参见 **#5.6.3**）。 这意味着，当您开始使用 ES6 模块时，您将永远不必再次编写`use strict`。 也意味着模块中的代码不能使用`with`语句或`arguments`对象或未声明的变量。 ES6 模块甚至比严格模式更严格：在严格模式下，在作为函数调用的函数中，`this`是`undefined`。 在模块中，即使在顶级代码中，`this`也是`undefined`的。 （相比之下，Web 浏览器和 Node 中的脚本将 `this` 设置为全局对象。）
:::

#### ES6 Modules on the Web and in Node

ES6 modules have been in use on the web for years with the help of code bundlers like webpack, which combine independent modules of JavaScript code into large, non-modular bundles suitable for inclusion into web pages. At the time of this writing, however, ES6 modules are finally supported natively by all web browsers other than Internet Explorer. When used natively, ES6 modules are added into HTML pages with a special `<script type="module">` tag, described later in this chapter.

::: tip 翻译
ES6 模块在 webpack 等代码捆绑器的帮助下已在 Web 上使用多年，它将独立的 JavaScript 代码模块组合成适合包含在网页中的大型非模块化捆绑包。 然而，在撰写本文时，ES6 模块最终得到了除 Internet Explorer 之外的所有 Web 浏览器的本机支持。 在本机使用时，ES6 模块会通过特殊的 `<script type="module">` 标记添加到 HTML 页面中，本章稍后将对此进行描述。
:::

And meanwhile, having pioneered JavaScript modularity, Node finds itself in the awkward position of having to support two not entirely compatible module systems. Node 13 supports ES6 modules, but for now, the vast majority of Node programs still use Node modules.

::: tip 翻译
与此同时，作为 JavaScript 模块化的先驱，Node 发现自己处于必须支持两个不完全兼容的模块系统的尴尬境地。 Node 13 支持 ES6 模块，但目前来看，绝大多数 Node 程序仍然使用 Node 模块。
:::

### ES6 Exports

To export a constant, variable, function, or class from an ES6 module, simply add the keyword `export` before the declaration:

::: tip 翻译
要从 ES6 模块导出常量、变量、函数或类，只需在声明之前添加关键字`export`：
:::

```js
export const PI = Math.PI;

export function degreesToRadians(d) {
  return (d * PI) / 180;
}

export class Circle {
  constructor(r) {
    this.r = r;
  }
  area() {
    return PI * this.r * this.r;
  }
}
```

As an alternative to scattering `export` keywords throughout your module, you can define your constants, variables, functions, and classes as you normally would, with no `export` statement, and then (typically at the end of your module) write a single `export` statement that declares exactly what is exported in a single place. So instead of writing three individual exports in the preceding code, we could have equivalently written a single line at the end:

::: tip 翻译
作为在整个模块中分散`export`关键字的替代方案，您可以像平常一样定义常量、变量、函数和类，而不使用`export`语句，然后（通常在模块末尾）编写一个单个`export`语句准确声明在单个位置导出的内容。 因此，我们可以在最后编写一行，而不是在前面的代码中编写三个单独的导出：
:::

```js
export { Circle, degreesToRadians, PI };
```

This syntax looks like the `export` keyword followed by and object literal (using shorthand notation). But in this case, the curly braces do not actually define an object literal. This export syntax simply requires a comma-separated list of identifiers within curly braces.

::: tip 翻译
此语法看起来像`export`关键字后跟对象字面量（使用简写符号）。 但在这种情况下，花括号实际上并没有定义对象字面量。 此导出语法只需要花括号内的逗号分隔标识符列表。
:::

It is common to write modules that export only one value (typically a function or class), and in this case, we usually use `export default` instead of `export`:

::: tip 翻译
编写仅导出一个值（通常是函数或类）的模块是很常见的，在这种情况下，我们通常使用`export default`而不是`export`：
:::

```js
export default class BitSet {
  // implementation omitted
}
```

Default exports are slightly easier to import than non-default exports, so when there is only one exported value, using `export default` makes things easier for the modules that use your exported value.

::: tip 翻译
默认导出比非默认导出稍微容易导入，因此当只有一个导出值时，使用`export default`可以使使用导出值的模块变得更容易。
:::

Regular exports with `export` can only be done on declarations that have a name. Default exports with `export default` can export any expression including anonymous function expressions and anonymous class expressions. This means that if you use `export default`, you can export object literals. So unlike the `export` syntax, if you see curly braces after `export default`, it really is an object literal that is being exported.

::: tip 翻译
使用`export`进行常规导出只能在具有名称的声明上进行。 使用`export default`的默认导出可以导出任何表达式，包括匿名函数表达式和匿名类表达式。 这意味着如果您使用`export default`，则可以导出对象字面量。 因此，与`export`语法不同，如果您在`export default`后面看到大括号，那么它确实是正在导出的对象字面量。
:::

It is legal, but somewhat uncommon, for modules to have a set of regular exports and also a default export. If a module has a default export, it can only have one.

::: tip 翻译
模块拥有一组常规导出和默认导出是合法的，但有些不常见。 如果一个模块有默认导出，则它只能有一个。
:::

Finally, note that the `export` keyword can only appear at the top level of your JavaScript code. You may not export a value from within a class, function, loop, or conditional. (This is an important feature of the ES6 module system and enables static analysis: a modules export will be the same on every run, and the symbols exported can be determined before the module is actually run.)

::: tip 翻译
最后，请注意`export`关键字只能出现在 JavaScript 代码的顶层。 您不能从类、函数、循环或条件中导出值。 （这是 ES6 模块系统的一个重要功能，可以进行静态分析：每次运行时模块导出都是相同的，并且可以在模块实际运行之前确定导出的符号。）
:::

### ES6 Imports

You import values that have been exported by other modules with the `import` keyword. This simplest form of import is used for modules that define a default export:

::: tip 翻译
您可以使用`import`关键字导入其他模块导出的值。 这种最简单的导入形式用于定义默认导出的模块：
:::

```js
import BitSet from "./bitset.js";
```

This is the `import` keyword, followed by an identifier, followed by the `from` keyword, followed by a string literal that names the module whose default export we are importing. The default export value of the specified module becomes the value of the specified identifier in the current module.

::: tip 翻译
这是`import`关键字，后跟一个标识符，然后是`from`关键字，最后是一个字符串文字，该字符串文字指定我们要导入其默认导出的模块。 指定模块的默认导出值成为当前模块中指定标识符的值。
:::

The identifier to which the imported value is assigned is a constant, as if it had been declared with the `const` keyword. Like exports, imports can only appear at the top level to a module and are not allowed within classes, functions, loops, or conditionals. By near-universal convention, the imports needed by a module are placed at the start of the module. Interestingly, however, this is not required: like function declarations, imports are "hoisted" to the top, and all imported values are available for any of the module's code runs.

::: tip 翻译
导入值分配给的标识符是一个常量，就好像它是用`const`关键字声明的一样。 与导出一样，导入只能出现在模块的顶层，并且不允许在类、函数、循环或条件中出现。 按照近乎普遍的惯例，模块所需的导入被放置在模块的开头。 然而有趣的是，这不是必需的：与函数声明一样，导入被“提升”到顶部，并且所有导入的值都可用于任何模块的代码运行。
:::

The module from which a value is imported is specified as a constant string literal in single quotes or double quotes. (You may not use a variable or other expression whose value is a string, and you may not use a string within backticks because template literals can interpolate variables and do not always have constant values.) In web browsers, this string is interpreted as a URL relative to the location of the module that is doing the importing. (In Node, or when using a bundling tool, the string is interpreted as a filename relative to the current module, but this makes little difference in practice.) A module specifier string must be an absolute path starting with "/", or a relative path starting with "./" or "../", or a complete URL a with protocol and hostname. The ES6 specification does not allow unqualified module specifier strings like "util.js" because it is ambiguous whether this is intended to name a module in the same directory as the current one or some kind of system module that is installed in some special location. (This restriction against "bare module specifiers" is not honored by code-bundling tools like webpack, which can easily be configured to find bare modules in a library directory that you specify.) A future version of the language may allow "bare module specifiers", but for now, they are not allowed. If you want to import a module from the same directory as the current one, simply place "./" before the module name and import from "./util.js" instead of "util.js".

::: tip 翻译
从中导入值的模块被指定为单引号或双引号中的常量字符串文字。（您不能使用值为字符串的变量或其他表达式，并且不能在反引号内使用字符串，因为模板文字可以插入变量并且并不总是具有常量值。）在 Web 浏览器中，此字符串被解释为 相对于执行导入的模块位置的 URL。 （在 Node 中，或者使用捆绑工具时，该字符串被解释为相对于当前模块的文件名，但这在实践中几乎没有什么区别。）模块说明符字符串必须是以“/”开头的绝对路径，或者 以“./”或“../”开头的相对路径，或带有协议和主机名的完整 URL。 ES6 规范不允许使用像“util.js”这样的不合格模块说明符字符串，因为这是否是为了命名与当前模块位于同一目录中的模块，还是为了命名安装在某个特殊位置的某种系统模块，这是不明确的。 （像 webpack 这样的代码捆绑工具不遵守对“裸模块说明符”的这种限制，它可以轻松配置为在您指定的库目录中查找裸模块。）该语言的未来版本可能允许“裸模块说明符” ”，但目前还不允许。 如果要从与当前模块相同的目录导入模块，只需在模块名称之前放置“./”，然后从“./util.js”而不是“util.js”导入即可。
:::

So far, we've only considered the case of importing a single value from a module that uses `export default`. To import values from a module that exports multiple values, we use a slightly different syntax:

::: tip 翻译
到目前为止，我们只考虑了从使用“导出默认值”的模块导入单个值的情况。 要从导出多个值的模块导入值，我们使用略有不同的语法：
:::

```js
import { mean, stddev } from "./stats.js";
```

Recall that default exports do not need to have a name in the module that defines them. Instead, we provide a local name when we import those values. But non-default exports of a module do have names in the exporting module, and when we import those values, we refer to them by those names. The exporting module can export any number of named value. An `import` statement that references that module can import any subset of those values simply by listing their names within curly braces. The curly braces make this kind of `import` statement look something like a destructuring assignment, and destructuring assignment is actually a good analogy for what this style of import is doing. The identifiers within curly braces are all hoisted to the top of the importing module and behave like constants.

::: tip 翻译
回想一下，默认导出不需要在定义它们的模块中具有名称。 相反，我们在导入这些值时提供本地名称。 但是模块的非默认导出在导出模块中确实有名称，当我们导入这些值时，我们通过这些名称引用它们。 导出模块可以导出任意数量的命名值。 引用该模块的`import`语句可以通过在大括号内列出这些值的名称来导入这些值的任何子集。 大括号使这种“导入”语句看起来像解构赋值，而解构赋值实际上是这种导入风格的一个很好的类比。 大括号内的标识符都被提升到导入模块的顶部，并且表现得像常量。
:::

Style guides sometimes recommend that you explicitly import every symbol that your module will use. When importing from a module that defines many exports, however, you can easily import everything with an `import` statement like this:

::: tip 翻译
样式指南有时建议您显式导入模块将使用的每个符号。 然而，当从定义了许多导出的模块导入时，您可以使用`import`语句轻松导入所有内容，如下所示：
:::

```js
import * as stats from "./stats.js";
```

An `import` statement like this creates an object and assigns it to a constant named `stats`. Each of the non-default exports of the module being imported becomes a property of this `stats` object. Non-default exports always have names, and those are used as property names within the object. Those properties are effectively constants: they cannot be overwritten or deleted. With the wildcard import shown in the previous example, the importing module would use the imported `mean()` and `stddev()` functions through the `stats` object, invoking them as `stats.mean()` and `stats.stddev()`.

::: tip 翻译
像这样的`import`语句创建一个对象并将其分配给名为`stats`的常量。 正在导入的模块的每个非默认导出都成为此`stats`对象的属性。 非默认导出始终具有名称，并且这些名称用作对象内的属性名称。这些属性实际上是常量：它们不能被覆盖或删除。使用前面示例中显示的通配符导入，导入模块将通过`stats`对象使用导入的`mean()`和`stddev()`函数，将它们调用为`stats.mean()`和`stats.stddev()`。
:::

Modules typically define either one default export or multiple named exports. It is legal, but somewhat uncommon, for a module to use both `export` and `export default`. But when a module does that, you can import both the default value and the named values with an `import` statement like this:

::: tip 翻译
模块通常定义一个默认导出或多个命名导出。 模块同时使用`export`和`export default`是合法的，但有些不常见。 但是，当模块执行此操作时，您可以使用`import`语句导入默认值和命名值，如下所示：
:::

```js
import Histogram, { mean, stddev } from "./histogram-stats.js";
```

So far, we've seen how to import from modules with a default export and from modules with non-default or named exports. But there is one other form of the `import` statement that is used with modules that have no exports at all. To include a no-exports module into your program, simply use the `import` keyword with the module specifier:

::: tip 翻译
到目前为止，我们已经了解了如何从具有默认导出的模块以及具有非默认或命名导出的模块导入。 但是还有另一种形式的`import`语句，用于根本没有导出的模块。 要将非导出模块包含到您的程序中，只需使用带有模块说明符的`import`关键字即可：
:::

```js
import "./analytics.js";
```

A module like this runs the first time it is imported. (And subsequent imports do nothing.) A module that just defines functions is only useful if it exports at least one of those functions. But if a module runs some code, then it can be useful to import even without symbols. An analytics module for a web application might run code to register various event handlers and then use those event handlers to send telemetry data back to the server at appropriate times. The module it self-contained and does not need to export anything, but we still need to `import` it so that it does actually run as part of our program.

::: tip 翻译
像这样的模块在第一次导入时运行。 （随后的导入不会执行任何操作。）仅定义函数的模块只有在至少导出其中一个函数时才有用。 但是如果一个模块运行一些代码，那么即使没有符号导入也会很有用。 Web 应用程序的分析模块可能会运行代码来注册各种事件处理程序，然后使用这些事件处理程序在适当的时间将遥测数据发送回服务器。 该模块是独立的，不需要导出任何内容，但我们仍然需要“导入”它，以便它实际上作为我们程序的一部分运行。
:::

Note that you can use this import-nothing `import` syntax even with modules that do have exports. If a module defines useful behavior independent of the values it exports, and if your program does not need any of those exported values, you can still import the module. just for that default behavior.

::: tip 翻译
请注意，即使对于确实具有导出的模块，您也可以使用此 导入无值的 `import` 语法。 如果模块定义了与其导出的值无关的有用行为，并且您的程序不需要任何这些导出的值，则您仍然可以导入该模块。 只是为了默认行为。
:::

### Imports and Exports with Renaming

If two modules export two different values using the same name and you want to import both of those values, you will have to rename one or both of the values when you import it. Similarly, if you want to import a value whose name is already in use in your module, you will need rename the imported value. You can use the `as` keyword with named imports to rename them as you import them:

::: tip 翻译
如果两个模块使用相同的名称导出两个不同的值，并且您想要导入这两个值，则在导入时必须重命名其中一个或两个值。 同样，如果要导入其名称已在模块中使用的值，则需要重命名导入的值。 您可以在导入时使用带有命名导入的`as`关键字来重命名它们：
:::

```js
import { render as renderImage } from "./imageutils.js";
import { render as renderUI } from "./ui.js";
```

These lines import two functions into the current module. The functions are both named `render()` in the modules that define them but are imported with the more descriptive and disambiguating names `renderImage()` and `renderUI()`.

::: tip 翻译
这些行将两个函数导入到当前模块中。 这些函数在定义它们的模块中都被命名为`render()`，但使用更具描述性和消除歧义的名称`renderImage()`和`renderUI()`导入。
:::

Recall that default exports do not have a name. The importing module always chooses the name when importing a default export. So there is no need for a special syntax for renaming in that case.

::: tip 翻译
回想一下，默认导出没有名称。 导入模块在导入默认导出时始终选择名称。 因此在这种情况下不需要特殊的重命名语法。
:::

Having said that, however, the possibility of renaming on import provides another way of importing from modules that define both a default export and named exports. Recall the "./histogram-stats.js" module from the previous section. Here is another way to import both the default and named exports of that module:

::: tip 翻译
然而，话虽如此，导入时重命名的可能性提供了另一种从定义默认导出和命名导出的模块导入的方法。 回想一下上一节中的“./histogram-stats.js”模块。 这是导入该模块的默认导出和命名导出的另一种方法：
:::

```js
import { default as Histogram, mean, stddev } from "./histogram-stats.js";
```

In this case, the JavaScript keyword `default` serves as a placeholder and allows us to indicate that we want to import and provide a name for the default export of the module.

::: tip 翻译
在这种情况下，JavaScript 关键字`default`充当占位符，允许我们指示要导入并为模块的默认导出提供名称。
:::

It is also possible to rename values as you export them, but only when using the curly brace variant of the `export` statement. It is not common to need to do this, but if you chose short, succinct names for use inside your module, you might prefer to export your values with more descriptive names that are less likely to conflict with other modules. As with imports, you use the `as` keyword to do this:

::: tip 翻译
导出值时也可以对其进行重命名，但仅限于使用`export`语句的大括号变体时。 需要这样做的情况并不常见，但如果您选择在模块内使用短而简洁的名称，您可能更愿意使用更具描述性的名称导出值，这些名称不太可能与其他模块发生冲突。 与导入一样，您可以使用`as`关键字来执行此操作：
:::

```js
export { layout as calculateLayout, render as renderLayout };
```

Keep in mind that, although the curly braces look something like object literals, they are not, and the `export` keyword expects a single identifier before the `as`, not an expression. This mean, unfortunately, that you cannot use export renaming like this:

::: tip 翻译
请记住，虽然花括号看起来像对象字面量，但实际上并非如此，并且`export`关键字需要`as`之前有一个标识符，而不是表达式。 不幸的是，这意味着您不能像这样使用导出重命名：
:::

```js
export { Math.sin as sin, Math.cos as cos }; // SyntaxError
```

### Re-Exports

Throughout this chapter, we've discussed a hypothetical "./stats.js" module that export `mean()` and `stddev()` functions. If we were writing such a module and we thought that many users of the module would want only one function or the other, then we might want to define `mean()` in a "./stats/mean.js" module and define `stddev()` in "./stats/stddev.js". That way, programs only need to import exactly the functions they need and are not bloated by importing code they do not need.

::: tip 翻译
在本章中，我们讨论了一个假设的“./stats.js”模块，该模块导出`mean()`和`stddev()`函数。 如果我们正在编写这样一个模块，并且我们认为该模块的许多用户只需要一个函数或另一个函数，那么我们可能需要在“./stats/mean.js”模块中定义 `mean()` 并定义 “./stats/stddev.js”中的`stddev()`。 这样，程序只需要准确导入它们需要的功能，而不会因为导入不需要的代码而变得臃肿。
:::

Even if we had defined these statistical functions in individual modules, however, we might expect that there would be plenty of programs that want both functions and would appreciate a convenient "./stats.js" module from which they could import both on one line.

::: tip 翻译
然而，即使我们在各个模块中定义了这些统计函数，我们也可能会期望有很多程序需要这两个函数，并且会欣赏一个方便的“./stats.js”模块，他们可以从中导入这两个函数 。
:::

Given that the implementations are now in separate files, defining this "./stats.js" module is simple:

::: tip 翻译
鉴于实现现在位于单独的文件中，定义这个“./stats.js”模块很简单：
:::

```js
import { mean } from "./stats/mean.js";
import { stddev } from "./stats/stddev.js";
export { mean, stddev };
```

ES6 modules anticipate this use case and provide a special syntax for it. Instead of importing a symbol simply to export it again, you can combine the import and the export steps into a single "re-export" statement that uses the `export` keyword and the `from` keyword:

::: tip 翻译
ES6 模块预见到了这种用例并为其提供了特殊的语法。 您可以将导入和导出步骤合并到一个使用`export`关键字和`from`关键字的“重新导出”语句中，而不是简单地导入符号以再次导出它：
:::

```js
export { mean } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";
```

Note that the names `mean` and `stddev` are not actually used in this code. If we are not being selective with a re-export and simply want to export all of the named values from another module, we can use a wildcard:

::: tip 翻译
请注意，此代码中实际上并未使用名称`mean`和`stddev`。 如果我们没有选择性地重新导出，而只是想从另一个模块导出所有命名值，则可以使用通配符：
:::

```js
export * from "./stats/mean.js";
export * from "./stats/stddev.js";
```

Re-export syntax allows renaming with `as` just as regular `import` and `export` statements do. Suppose we wanted to re-export the `mean()` function but also define `average()` as another name for the function. We could do that like this:

::: tip 翻译
重新导出语法允许使用`as`重命名，就像常规`import`和`export`语句一样。 假设我们想要重新导出`mean()`函数，但也将`average()`定义为该函数的另一个名称。 我们可以这样做：
:::

```js
export { mean, mean as average } from "./stats/mean.js";
export { stddev } from "./stats/stddev.js";
```

All of the re-exports in this example assume that the "./stats/mean.js" and "./stats/stddev.js" modules export their functions using `export` instead of `export default`. In fact, however, since these are modules with only a single export, it would have made sense to define them with `export default`. If we had done so, then the re-export syntax is a little more complicated because it needs to define a name for the unnamed default exports. We can do that like this:

::: tip 翻译
此示例中的所有重新导出均假设“./stats/mean.js”和“./stats/stddev.js”模块使用`export`而不是`export default`导出其函数。 然而事实上，由于这些模块只有一个导出，因此使用`export default`定义它们是有意义的。 如果我们这样做了，那么重新导出语法会稍微复杂一些，因为它需要为未命名的默认导出定义一个名称。 我们可以这样做：
:::

```js
export { default as mean } from "./stats/mean.js";
export { default as stddev } from "./stats/stddev.js";
```

If you want to re-export a named symbol from another module as the default export of your module, you could do an `import` followed by an `export default`, or you could combine the two statements like this:

::: tip 翻译
如果您想从另一个模块重新导出命名符号作为模块的默认导出，您可以执行`import`，然后执行`export default`，或者可以将这两个语句组合起来，如下所示：
:::

```js
// 从./stats.js中导入mean()函数, 并将其作为此模块的默认导出
export { mean as default } from "./stats.js";
```

And finally, to re-export the default export of another module as the default export of your module (though it is unclear why you would want to do this, since users could simply import the other module directly), you can write:

::: tip 翻译
最后，要将另一个模块的默认导出重新导出为模块的默认导出（尽管不清楚为什么要这样做，因为用户可以直接导入另一个模块），您可以编写：
:::

```js
// average.js 模块只是重新导出 stats/mean.js 默认导出
export { default } from "./stats/mean.js";
```

### JavaScript Modules on the Web

The preceding sections have described ES6 modules and their `import` and `export` declarations in a somewhat abstract manner. In this section and the next, we’ll be discussing how they actually work in web browsers, and if you are not already an experienced web developer, you may find the rest of this chapter easier to understand after you have read Chapter 15.

::: tip 翻译
前面几节以某种抽象的方式描述了 ES6 模块及其`import`和`export`声明。 在本节和下一节中，我们将讨论它们在 Web 浏览器中的实际工作方式，如果您还不是经验丰富的 Web 开发人员，那么在阅读第 15 章后，您可能会发现本章的其余部分更容易理解。
:::

As of early 2020, production code using ES6 modules is still generally bundled with a tool like webpack. There are trade-offs to doing this, but on the whole, code bundling tends to give better performance. That may well change in the future as network speeds grow and browser vendors continue to optimize their ES6 module implementations.

::: tip 翻译
截至 2020 年初，使用 ES6 模块的生产代码仍然通常与 webpack 等工具捆绑在一起。 这样做需要权衡，但总的来说，代码捆绑往往会带来更好的性能。 随着网络速度的增长和浏览器供应商继续优化其 ES6 模块实现，这种情况在未来很可能会发生变化。
:::

Even though bundling tools may still be desirable in production, they are no longer required in development since all current browsers provide native support for JavaScript modules. Recall that modules use strict mode by default, this does not refer to a global object, and top-level declarations are not shared globally by default. Since modules must be executed differently than legacy non-module code, their introduction requires changes to HTML as well as JavaScript. If you want to natively use import directives in a web browser, you must tell the web browser that your code is a module by using a `<script type="module">`tag.

::: tip 翻译
尽管捆绑工具在生产中可能仍然是理想的，但在开发中不再需要它们，因为所有当前的浏览器都提供对 JavaScript 模块的本机支持。 回想一下，模块默认使用严格模式，this 不引用全局对象，并且默认情况下顶级声明不会全局共享。 由于模块的执行方式必须与传统的非模块代码不同，因此它们的引入需要对 HTML 和 JavaScript 进行更改。 如果您想在 Web 浏览器中本机使用导入指令，则必须使用 `<script type="module">` 标记告诉 Web 浏览器您的代码是一个模块。
:::

One of the nice features of ES6 modules is that each module has a static set of imports. So given a single starting module, a web browser can load all of its imported modules and then load all of the modules imported by that first batch of modules, and so on, until a complete program has been loaded. We’ve seen that the module specifier in an import statement can be treated as a relative URL. A `<script type="module">` tag marks the starting point of a modular program. None of the modules it imports are expected to be in `<script>` tags, however: instead, they are loaded on demand as regular JavaScript files and are executed in strict mode as regular ES6 modules. Using a `<script type="module">` tag to define the main entry point for a modular JavaScript program can be as simple as this:

::: tip 翻译
ES6 模块的一个很好的功能是每个模块都有一组静态导入。 因此，给定一个启动模块，Web 浏览器可以加载所有导入的模块，然后加载第一批模块导入的所有模块，依此类推，直到加载完整的程序。 我们已经看到 `import` 语句中的模块说明符可以被视为相对 URL。 `<script type="module">` 标签标记了模块化程序的起点。 然而，它导入的所有模块都不应该位于`<script>`标签中：相反，它们会作为常规 JavaScript 文件按需加载，并作为常规 ES6 模块以严格模式执行。 使用 `<script type="module">` 标签定义模块化 JavaScript 程序的主入口点可以像这样简单：
:::

```js
<script type="module">import "./main.js";</script>
```

Code inside an inline `<script type="module">` tag is an ES6 module, and as such can use the export statement. There is not any point in doing so, however, because the HTML `<script>` tag syntax does not provide any way to define a name for inline modules, so even if such a module does export a value, there is no way for another module to import it.

::: tip 翻译
内联 `<script type="module">` 标记内的代码是 ES6 模块，因此可以使用导出语句。 然而，这样做没有任何意义，因为 HTML `<script>` 标记语法没有提供任何方法来定义内联模块的名称，所以即使这样的模块确实导出一个值，也没有办法 另一个模块来导入它。
:::

Scripts with the `type="module"` attribute are loaded and executed like scripts with the `defer` attribute. Loading of the code begins as soon as the HTML parser encounters the `<script>` tag (in the case of modules, this code-loading step may be a recursive process that loads multiple JavaScript files). But code execution does not begin until HTML parsing is complete. And once HTML parsing is complete, scripts (both modular and non) are executed in the order in which they appear in the HTML document.

::: tip 翻译
带有 `type="module"` 属性的脚本的加载和执行就像带有 `defer` 属性的脚本一样。 一旦 HTML 解析器遇到`<script>`标签，代码加载就会开始（在模块的情况下，此代码加载步骤可能是加载多个 JavaScript 文件的递归过程）。 但直到 HTML 解析完成后代码才会开始执行。 一旦 HTML 解析完成，脚本（模块化的和非模块化的）就会按照它们在 HTML 文档中出现的顺序执行。
:::

You can modify the execution time of modules with the `async` attribute, which works the same way for modules that it does for regular scripts. An `async` module will execute as soon as the code is loaded, even if HTML parsing is not complete and even if this changes the relative ordering of the scripts.

::: tip 翻译
您可以使用`async`属性修改模块的执行时间，该属性对模块的作用与对常规脚本的作用相同。 `async`模块将在代码加载后立即执行，即使 HTML 解析未完成，即使这改变了脚本的相对顺序。
:::

Web browsers that support `<script type="module">` must also support `<script nomodule>`. Browsers that are module-aware ignore any script with the `nomodule` attribute and will not execute it. Browsers that do not support modules will not recognize the `nomodule` attribute, so they will ignore it and run the script. This provides a powerful technique for dealing with browser compatibility issues. Browsers that support ES6 modules also support other modern JavaScript features like classes, arrow functions, and the `for/of` loop. If you write modern JavaScript and load it with `<script type="module">`, you know that it will only be loaded by browsers that can support it. And as a fallback for IE11 (which, in 2020, is effectively the only remaining browser that does not support ES6), you can use tools like Babel and webpack to transform your code into non-modular ES5 code, then load that less-efficient transformed code via `<script nomodule>`.

::: tip 翻译
支持 `<script type="module">` 的 Web 浏览器也必须支持 `<script nomodule>`。 具有模块意识的浏览器会忽略任何具有`nomodule`属性的脚本，并且不会执行它。 不支持模块的浏览器将无法识别`nomodule`属性，因此它们将忽略它并运行脚本。 这为处理浏览器兼容性问题提供了一种强大的技术。 支持 ES6 模块的浏览器还支持其他现代 JavaScript 功能，例如类、箭头函数和`for/of`循环。 如果您编写现代 JavaScript 并使用 `<script type="module">` 加载它，您就知道它只会由支持它的浏览器加载。 作为 IE11（到 2020 年，它实际上是唯一不支持 ES6 的浏览器）的后备方案，您可以使用 Babel 和 webpack 等工具将代码转换为非模块化 ES5 代码，然后加载效率较低的代码 通过`<script nomodule>`转换代码。
:::

Another important difference between regular scripts and module scripts has to do with cross-origin loading. A regular `<script>` tag will load a file of JavaScript code from any server on the internet, and the internet’s infrastructure of advertising, analytics, and tracking code depends on that fact. But `<script type="module">` provides an opportunity to tighten this up, and modules can only be loaded from the same origin as the containing HTML document or when proper CORS headers are in place to securely allow cross-origin loads. An unfortunate side effect of this new security restriction is that it makes it difficult to test ES6 modules in development mode using `file: URLs`. When using ES6 modules, you will likely need to set up a static web server for testing.

::: tip 翻译
常规脚本和模块脚本之间的另一个重要区别与跨域加载有关。 常规的`<script>`标签将从互联网上的任何服务器加载 JavaScript 代码文件，互联网的广告、分析和跟踪代码基础设施取决于这一事实。 但是 `<script type="module">` 提供了一个加强这一点的机会，并且模块只能从与包含的 HTML 文档相同的源加载，或者当正确的 CORS 标头就位以安全地允许跨源加载时加载。 这个新的安全限制的一个不幸的副作用是，它使得在开发模式下使用`file: URLs`测试 ES6 模块变得困难。 使用 ES6 模块时，您可能需要设置静态 Web 服务器进行测试。
:::

Some programmers like to use the filename extension `.mjs` to distinguish their modular JavaScript files from their regular, non-modular JavaScript files with the traditional `.js` extension. For the purposes of web browsers and `<script>` tags, the file extension is actually irrelevant. (The MIME type is relevant, however, so if you use `.mjs` files, you may need to configure your web server to serve them with the same MIME type as `.js` files.) Node’s support for ES6 does use the filename extension as a hint to distinguish which module system is used by each file it loads. So if you are writing ES6 modules and want them to be usable with Node, then it may be helpful to adopt the `.mjs` naming convention.

::: tip 翻译
一些程序员喜欢使用文件扩展名`.mjs`来区分其模块化 JavaScript 文件和具有传统`.js`扩展名的常规非模块化 JavaScript 文件。 对于网络浏览器和`<script>`标签来说，文件扩展名实际上是无关的。 （但是，MIME 类型是相关的，因此，如果您使用`.mjs`文件，则可能需要配置 Web 服务器以使用与`.js`文件相同的 MIME 类型为它们提供服务。）Node 对 ES6 的支持确实使用 文件扩展名作为区分它加载的每个文件使用哪个模块系统的提示。 因此，如果您正在编写 ES6 模块并希望它们可以与 Node 一起使用，那么采用`.mjs`命名约定可能会有所帮助。
:::

### Dynamic Imports with import()

We’ve seen that the ES6 `import` and `export` directives are completely static and enable JavaScript interpreters and other JavaScript tools to determine the relationships between modules with simple text analysis while the modules are being loaded without having to actually execute any of the code in the modules. With statically imported modules, you are guaranteed that the values you import into a module will be ready for use before any of the code in your module begins to run.

::: tip 翻译
我们已经看到，ES6`import`和`export`指令是完全静态的，使 JavaScript 解释器和其他 JavaScript 工具能够在加载模块时通过简单的文本分析来确定模块之间的关系，而无需实际执行任何指令 模块中的代码。 使用静态导入的模块，可以保证导入到模块中的值在模块中的任何代码开始运行之前就可以使用。
:::

On the web, code has to be transferred over a network instead of being read from the filesystem. And once transfered, that code is often executed on mobile devices with relatively slow CPUs. This is not the kind of environment where static module imports—which require an entire program to be loaded before any of it runs—make a lot of sense.

::: tip 翻译
在网络上，代码必须通过网络传输，而不是从文件系统读取。 一旦传输，该代码通常会在 CPU 相对较慢的移动设备上执行。 在这种环境中，静态模块导入（需要在任何程序运行之前加载整个程序）没有多大意义。
:::

It is common for web applications to initially load only enough of their code to render the first page displayed to the user. Then, once the user has some preliminary content to interact with, they can begin to load the often much larger amount of code needed for the rest of the web app. Web browsers make it easy to dynamically load code by using the DOM API to inject a new `<script>` tag into the current HTML document, and web apps have been doing this for many years.

::: tip 翻译
Web 应用程序通常最初只加载足够的代码来呈现向用户显示的第一页。 然后，一旦用户有了一些初步的交互内容，他们就可以开始加载 Web 应用程序其余部分所需的通常更大量的代码。 Web 浏览器可以通过使用 DOM API 将新的`<script>`标签注入当前 HTML 文档来轻松动态加载代码，并且 Web 应用程序多年来一直这样做。
:::

Although dynamic loading has been possible for a long time, it has not been part of the language itself. That changes with the introduction of `import()` in ES2020 (as of early 2020, dynamic import is supported by all browsers that support ES6 modules). You pass a module specifier to `import()` and it returns a Promise object that represents the asynchronous process of loading and running the specified module. When the dynamic `import` is complete, the Promise is “fulfilled” (see **Chapter 13** for complete details on asynchronous programming and Promises) and produces an object like the one you would get with the `import * as` form of the static import statement.

::: tip 翻译
尽管动态加载已经成为可能很长时间了，但它还没有成为语言本身的一部分。 随着 ES2020 中`import()`的引入，这种情况发生了变化（截至 2020 年初，所有支持 ES6 模块的浏览器都支持动态导入）。 您将模块说明符传递给`import()`，它会返回一个 Promise 对象，该对象表示加载和运行指定模块的异步过程。 当动态“导入”完成时，Promise 被“履行”（有关异步编程和 Promise 的完整详细信息，请参阅**第 13 章**）并生成一个对象，就像您通过`import * as`形式获得的对象一样 静态导入语句。
:::

So instead of importing the “./stats.js” module statically, like this:

::: tip 翻译
因此，代替静态导入“./stats.js”模块，如下所示：
:::

```js
import * as stats from "./stats.js";
```

we might import it and use it dynamically, like this:

::: tip 翻译
我们可以导入它并动态使用它，如下所示：
:::

```js
import("./stats.js").then((stats) => {
  let average = stats.mean(data);
});
```

Or, in an `async` function (again, you may need to read **Chapter 13** before you’ll understand this code), we can simplify the code with `await`:

::: tip 翻译
或者，在 `async` 函数中（同样，您可能需要阅读 **第 13 章**才能理解这段代码），我们可以使用 `await` 来简化代码：
:::

```js
async analyzeData(data) {
    let stats = await import("./stats.js");
    return {
        average: stats.mean(data),
        stddev: stats.stddev(data)
    }
}
```

The argument to `import()` should be a module specifier, exactly like one you’d use with a static `import` directive. But with `import()`, you are not constrained to use a constant string literal: any expression that evaluates to a string in the proper form will do.

::: tip 翻译
`import()`的参数应该是一个模块说明符，与静态`import`指令中使用的模块说明符完全相同。 但使用 `import()` 时，您不必使用常量字符串文字：任何计算结果为正确形式的字符串的表达式都可以。
:::

Dynamic `import()` looks like a function invocation, but it actually is not. Instead, `import()` is an operator and the parentheses are a required part of the operator syntax. The reason for this unusual bit of syntax is that `import()` needs to be able to resolve module specifiers as URLs relative to the currently running module, and this requires a bit of implementation magic that would not be legal to put in a JavaScript function. The function versus operator distinction rarely makes a difference in practice, but you’ll notice it if you try writing code like `console.log(import)`; or `let require = import`;.

::: tip 翻译
动态`import()`看起来像函数调用，但实际上不是。 相反，`import()`是一个运算符，括号是运算符语法的必需部分。 这种不寻常的语法的原因是`import()`需要能够将模块说明符解析为相对于当前正在运行的模块的 URL，这需要一些实现魔法，而将其放入 JavaScript 中是不合法的。 功能。 函数与运算符的区别在实践中很少产生差异，但如果您尝试编写像`console.log(import)`这样的代码，您会注意到这一点； 或`let require = import`;。
:::

Finally, note that dynamic `import()` is not just for web browsers. Code-packaging tools like webpack can also make good use of it. The most straightforward way to use a code bundler is to tell it the main entry point for your program and let it find all the static import directives and assemble everything into one large file. By strategically using dynamic `import()` calls, however, you can break that one monolithic bundle up into a set of smaller bundles that can be loaded on demand.

::: tip 翻译
最后，请注意动态`import()`不仅仅适用于网络浏览器。 像 webpack 这样的代码打包工具也可以很好地利用它。 使用代码捆绑器最直接的方法是告诉它程序的主入口点，并让它找到所有静态导入指令并将所有内容组装到一个大文件中。 然而，通过策略性地使用动态`import()`调用，您可以将该单一包分解为一组可以按需加载的较小包。
:::

### import.meta.url

There is one final feature of the ES6 module system to discuss. Within an ES6 module (but not within a regular `<script>` or a Node module loaded with `require()`), the special syntax `import.meta` refers to an object that contains metadata about the currently executing module. The url property of this object is the URL from which the module was loaded. (In Node, this will be a `file:// URL`.)

::: tip 翻译
ES6 模块系统的最后一个特性需要讨论。 在 ES6 模块中（但不在常规的 `<script>` 或使用 `require()` 加载的 Node 模块中），特殊语法 `import.meta` 指的是包含有关当前正在执行的模块的元数据的对象。 该对象的 url 属性是加载模块的 URL。 （在 Node 中，这将是一个 `file:// URL`。）
:::

The primary use case of `import.meta.url` is to be able to refer to images, data files, or other resources that are stored in the same directory as (or relative to) the module. The `URL()` constructor makes it easy to resolve a relative URL against an absolute URL like `import.meta.url`. Suppose, for example, that you have written a module that includes strings that need to be localized and that the localization files are stored in an `l10n/` directory, which is in the same directory as the module itself. Your module could load its strings using a URL created with a function, like this:

::: tip 翻译
`import.meta.url` 的主要用例是能够引用存储在与模块相同的目录（或相对于模块）的图像、数据文件或其他资源。 `URL()` 构造函数可以轻松地根据绝对 URL（如 `import.meta.url`）解析相对 URL。 例如，假设您编写了一个包含需要本地化的字符串的模块，并且本地化文件存储在`l10n/`目录中，该目录与模块本身位于同一目录中。 您的模块可以使用通过函数创建的 URL 加载其字符串，如下所示：
:::

```js
function localStringsURL(locale) {
  return new URL(`l10n/${locale}.json`, import.meta.url);
}
```

## Summary

The goal of modularity is to allow programmers to hide the implementation details of their code so that chunks of code from various sources can be assembled into large programs without worrying that one chunk will overwrite functions or variables of another. This chapter has explained three different JavaScript module systems:

- In the early days of JavaScript, modularity could only be achieved through the clever use of immediately invoked function expressions.
- Node added its own module system on top of the JavaScript language. Node modules are imported with `require()` and define their exports by setting properties of the Exports object, or by setting the `module.exports` property.
- In ES6, JavaScript finally got its own module system with `import` and `export` keywords, and ES2020 is adding support for dynamic imports with `import()`.

::: tip 翻译
模块化的目标是允许程序员隐藏其代码的实现细节，以便可以将来自不同来源的代码块组装成大型程序，而不必担心一个代码块会覆盖另一个代码块的函数或变量。 本章解释了三种不同的 JavaScript 模块系统：

- 在 JavaScript 的早期，模块化只能通过巧妙地使用立即调用的函数表达式来实现。
- Node 在 JavaScript 语言之上添加了自己的模块系统。 Node 模块通过 `require()` 导入，并通过设置 Exports 对象的属性或设置 `module.exports` 属性来定义其导出。
- 在 ES6 中，JavaScript 终于有了自己的带有`import`和`export`关键字的模块系统，而 ES2020 则通过`import()`添加了对动态导入的支持。
  :::
