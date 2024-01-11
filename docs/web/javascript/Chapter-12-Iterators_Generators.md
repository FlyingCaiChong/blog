---
title: 第十二章 迭代器和生成器
---

# 迭代器和生成器

Iterable objects and their associated iterators are a feature of ES6 that we’ve seen several times throughout this book. Arrays (including TypedArrays) are iterable, as are strings and Set and Map objects. This means that the contents of these data structures can be iterated—looped over—with the `for/of` loop, as we saw in §5.4.4:

::: tip 翻译
可迭代对象及其关联的迭代器是 ES6 的一个特性，我们在本书中多次看到过它。 数组（包括 TypedArray）是可迭代的，字符串以及 Set 和 Map 对象也是如此。 这意味着这些数据结构的内容可以使用 `for/of` 循环进行迭代（循环），如我们在第 5.4.4 节中看到的：
:::

```js
let sum = 0;
for (let i of [1, 2, 3]) {
  // Loop once for each of these values
  sum += i;
}
sum; // => 6
```

Iterators can also be used with the `...` operator to expand or “spread” an iterable object into an array initializer or function invocation, as we saw in §7.1.2:

::: tip 翻译
迭代器还可以与 `...` 运算符一起使用，将可迭代对象扩展或“传播”到数组初始值设定项或函数调用中，如我们在第 7.1.2 节中看到的：
:::

```js
let chars = [..."abcd"]; // chars = ["a", "b", "c", "d"]
let data = [1, 2, 3, 4, 5];
Math.max(...data); // => 5
```

Iterators can be used with destructuring assignment:

::: tip 翻译
迭代器可以与解构赋值一起使用：
:::

```js
let purpleHaze = Uint8Array.of(255, 0, 255, 128);
let [r, g, b, a] = purpleHaze; // a == 128
```

When you iterate a Map object, the returned values are `[key, value]` pairs, which work well with destructuring assignment in a `for/of` loop:

::: tip 翻译
当您迭代 Map 对象时，返回的值是 `[key, value]` 对，这与 `for/of` 循环中的解构赋值配合良好：
:::

```js
let m = new Map([
  ["one", 1],
  ["two", 2],
]);
for (let [k, v] of m) console.log(k, v); // Logs 'one 1' and 'two 2'
```

If you want to iterate just the keys or just the values rather than the pairs, you can use the `keys()` and `values()` methods:

::: tip 翻译
如果您只想迭代键或仅迭代值而不是对，可以使用 `keys()` 和 `values()` 方法：
:::

```js
[...m] // => [["one", 1], ["two", 2]]: default iteration
[...m.entries()] // => [["one", 1], ["two", 2]]: entries() method is the same
[...m.keys()] // => ["one", "two"]: keys() method iterates just map keys
[...m.values()] // => [1, 2]: values() method iterates just map values
```

Finally, a number of built-in functions and constructors that are commonly used with Array objects are actually written (in ES6 and later) to accept arbitrary iterators instead. The `Set()` constructor is one such API:

::: tip 翻译
最后，一些常用于 Array 对象的内置函数和构造函数实际上（在 ES6 及更高版本中）被编写为接受任意迭代器。 `Set()` 构造函数就是这样一种 API：
:::

```js
// Strings are iterable, so the two sets are the same
new Set("abc"); // => new Set(["a", "b", "c"])
```

This chapter explains how iterators work and demonstrates how to create your own data structures that are iterable. After explaining basic iterators, this chapter covers generators, a powerful new feature of ES6 that is primarily used as a particularly easy way to create iterators.

::: tip 翻译
本章解释了迭代器的工作原理，并演示了如何创建您自己的可迭代数据结构。 在解释了基本的迭代器之后，本章介绍了生成器，这是 ES6 的一个强大的新功能，主要用作创建迭代器的一种特别简单的方法。
:::

## How Iterators Work

The `for/of` loop and spread operator work seamlessly with iterable objects, but it is worth understanding what is actually happening to make the iteration work. There are three separate types that you need to understand to understand iteration in JavaScript. First, there are the _iterable_ objects: these are types like Array, Set, and Map that can be iterated. Second, there is the _iterator_ object itself, which performs the iteration. And third, there is the _iteration_ _result_ object that holds the result of each step of the iteration.

::: tip 翻译
`for/of` 循环和扩展运算符与可迭代对象无缝协作，但值得了解实际发生的情况以使迭代工作。 要理解 JavaScript 中的迭代，您需要了解三种不同的类型。 首先，有 _iterable_ 对象：这些是可以迭代的类型，例如 `Array`、`Set` 和 `Map`。 其次，是 _iterator_ 对象本身，它执行迭代。 第三，有 _iteration_ _result_ 对象，它保存迭代每个步骤的结果。
:::

An _iterable_ object is any object with a special iterator method that returns an iterator object. An _iterator_ is any object with a `next()` method that returns an _iteration result_ object. And an _iteration result_ object is an object with properties named `value` and `done`. To iterate an iterable object, you first call its iterator method to get an iterator object. Then, you call the `next()` method of the iterator object repeatedly until the returned value has its `done` property set to `true`. The tricky thing about this is that the iterator method of an iterable object does not have a conventional name but uses the Symbol `Symbol.iterator` as its name. So a simple `for/of` loop over an iterable object iterable could also be written the hard way, like this:

::: tip 翻译
_iterable_ 对象是具有返回迭代器对象的特殊迭代器方法的任何对象。 _iterator_ 是具有返回 _iteration result_ 对象的 `next()` 方法的任何对象。 _iteration result_ 对象是一个具有名为 `value` 和 `done` 属性的对象。 要迭代一个可迭代对象，首先调用它的迭代器方法来获取迭代器对象。 然后，重复调用迭代器对象的 `next()` 方法，直到返回值的 `done` 属性设置为 `true`。 棘手的是，可迭代对象的迭代器方法没有常规名称，而是使用符号 `Symbol.iterator` 作为名称。 因此，对可迭代对象 `iterable` 进行简单的 `for/of` 循环也可以用困难的方式编写，如下所示：
:::

```js
let iterable = [99];
let iterator = iterable[Symbol.iterator]();
for (let result = iterator.next(); !result.done; result = iterator.next()) {
  console.log(result.value); // result.value == 99
}
```

The iterator object of the built-in iterable datatypes is itself iterable. (That is, it has a method named `Symbol.iterator` that just returns itself.) This is occasionally useful in code like the following when you want to iterate though a “partially used” iterator:

::: tip 翻译
内置可迭代数据类型的迭代器对象本身是可迭代的。 （也就是说，它有一个名为 `Symbol.iterator` 的方法，该方法仅返回自身。）当您想要迭代“部分使用”迭代器时，这在如下代码中有时很有用：
:::

```js
let list = [1, 2, 3, 4, 5];
let iter = list[Symbol.iterator]();
let head = iter.next().value; // head == 1
let tail = [...iter]; // tail == [2, 3, 4, 5]
```

## Implementing Iterable Objects

Iterable objects are so useful in ES6 that you should consider making your own datatypes iterable whenever they represent something that can be iterated. The Range classes shown in Examples 9-2 and 9-3 in **Chapter 9** were iterable. Those classes used generator functions to make themselves iterable. We’ll document generators later in this chapter, but first, we will implement the Range class one more time, making it iterable without relying on a generator.

::: tip 翻译
可迭代对象在 ES6 中非常有用，因此只要您自己的数据类型表示可迭代的内容，您就应该考虑将它们设为可迭代。 **第 9 章**中的示例 9-2 和 9-3 所示的 `Range` 类是可迭代的。 这些类使用生成器函数来使其自身可迭代。 我们将在本章稍后介绍生成器，但首先，我们将再次实现 `Range` 类，使其无需依赖生成器即可迭代。
:::

In order to make a class iterable, you must implement a method whose name is the Symbol `Symbol.iterator`. That method must return an iterator object that has a `next()` method. And the `next()` method must return an iteration result object that has a `value` property and/or a boolean `done` property. Example 12-1 implements an iterable Range class and demonstrates how to create iterable, iterator, and iteration result objects.

::: tip 翻译
为了使类可迭代，您必须实现一个名为 `Symbol.iterator` 的方法。 该方法必须返回一个具有 `next()` 方法的迭代器对象。 并且 `next()` 方法必须返回一个迭代结果对象，该对象具有 `value` 属性和/或布尔 `done` 属性。 示例 12-1 实现了一个可迭代的 `Range` 类，并演示了如何创建 `iterable`、`iterator` 和 `iteration result` 对象。
:::

_Example 12-1. An iterable numeric Range class_

```js
/**
 * A Range object represents a range of numbers {x: from <= x <= to}
 * Range defines a has() method for testing whether a given number is a member
 * of the range. Range is iterable and iterates all integers within the range.
 */
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  // Make a Range act like a Set of numbers
  has(x) {
    return typeof x === "number" && this.from <= x && x <= this.to;
  }

  // Return string representation of the range using set notation
  toString() {
    return `{ x | ${this.from} <= x <= ${this.to} }`;
  }

  // Make a Range iterable by returning an iterator object.
  // Note that the name of this method is a special symbol, not a string.
  [Symbol.iterator]() {
    // Each iterator instance must iterate the range independently of
    // others. So we need a state variable to track our location in the
    // iteration. We start at the first integer >= from.
    let next = Math.ceil(this.from); // This is the next value we return
    let last = this.to; // We won't return anything > this
    return {
      // This is the iterator object
      // This next() method is what makes this an iterator object.
      // It must return an iterator result object.
      next() {
        return next <= last // If we haven't returned last value yet
          ? { value: next++ } // return next value and increment it
          : { done: true }; // otherwise indicate that we're done.
      },

      // As a convenience, we make the iterator itself iterator
      [Symbol.iterator]() {
        return this;
      },
    };
  }
}

for (let x of new Range(1, 10)) {
  console.log(x); // Logs numbers 1 to 10
}

[...new Range(-2, 2)]; // => [-2, -1, 0, 1, 2]
```

In addition to making your classes iterable, it can be quite useful to define functions that return iterable values. Consider these iterable-based alternatives to the `map()` and `filter()` methods of JavaScript arrays:

::: tip 翻译
除了使类可迭代之外，定义返回可迭代值的函数也非常有用。 考虑 JavaScript 数组的 `map()` 和 `filter()` 方法的这些基于可迭代的替代方法：
:::

```js
// Return an iterable object that iterates the result of applying f()
// to each value from the source iterable
function map(iterable, f) {
  let iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      // This object is both iterator and iterable
      let v = iterator.next();
      if (v.done) {
        return v;
      } else {
        return {
          value: f(v.value),
        };
      }
    },
  };
}

// Map a range of integers to their squares and convert to an array
[...map(new Range(1, 4), (x) => x * x)]; // => [1, 4, 9, 16]

// Return an iterable object that filters the specified iterable,
// iterating only those elements for which the predicate returns true
function filter(iterable, predicate) {
  let iterator = iterable[Symbol.iterator]();
  return {
    // This object is both iterator and iterable
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        let v = iterator.next();
        if (v.done || predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

// Filter a range so we're left with only even numbers
[...filter(new Range(1, 10), (x) => x % 2 === 0)]; // => [2, 4, 6, 8, 10]
```

One key feature of iterable objects and iterators is that they are inherently lazy: when computation is required to compute the next value, that computation can be deferred until the value is actually needed. Suppose, for example, that you have a very long string of text that you want to tokenize into space-separated words. You could simply use the `split()` method of your string, but if you do this, then the entire string has to be processed before you can use even the first word. And you end up allocating lots of memory for the returned array and all of the strings within it. Here is a function that allows you to lazily iterate the words of a string without keeping them all in memory at once (in ES2020, this function would be much easier to implement using the iterator-returning `matchAll()` method described in §11.3.2):

::: tip 翻译
可迭代对象和迭代器的一个关键特征是它们本质上是惰性的：当需要计算来计算下一个值时，可以推迟该计算，直到实际需要该值为止。 例如，假设您有一个很长的文本字符串，您想要将其标记为空格分隔的单词。 您可以简单地使用字符串的 `split()` 方法，但如果这样做，则必须先处理整个字符串，然后才能使用第一个单词。 最终您会为返回的数组及其中的所有字符串分配大量内存。 这是一个函数，允许您延迟迭代字符串中的单词，而无需将它们一次全部保留在内存中（在 ES2020 中，使用第 11.3.2 节中描述的迭代器返回 `matchAll()` 方法可以更容易地实现该函数):
:::

```js
function words(s) {
  var r = /\s+|$/g; // Match one or more spaces or end
  r.lastIndex = s.match(/[^ ]/).index; // Start matching at first non-space
  return {
    // Return an iterable iterator object
    [Symbol.iterator]() {
      // This makes us iterable
      return this;
    },
    next() {
      // This makes us an iterator
      let start = r.lastIndex; // Resume where the last match ended
      if (start < s.length) {
        // If we're not done
        let match = r.exec(s); // Match the next word boundary
        if (match) {
          // If we found one, return the word
          return {
            value: s.substring(start, match.index),
          };
        }
      }
      return { done: true }; // Otherwise, say that we're done
    },
  };
}

[...words(" abc def  ghi! ")]; // => ["abc", "def", "ghi!"]
```

### "Closing" an Iterator: The Return Method

Imagine a (server-side) JavaScript variant of the `words()` iterator that, instead of taking a source string as its argument, takes the name of a file, opens the file, reads lines from it, and iterates the words from those lines. In most operating systems, programs that open files to read from them need to remember to close those files when they are done reading, so this hypothetical iterator would be sure to close the file after the `next()` method returns the last word in it.

::: tip 翻译
想象一下 `words()` 迭代器的（服务器端）JavaScript 变体，它不采用源字符串作为参数，而是采用文件名，打开文件，从中读取行，然后从那些行中迭代其中的单词。 在大多数操作系统中，打开文件进行读取的程序需要记住在完成读取后关闭这些文件，因此这个假设的迭代器一定会在 `next()` 方法返回最后一个单词后关闭文件。
:::

But iterators don’t always run all the way to the end: a `for/of` loop might be terminated with a `break` or `return` or by an exception. Similarly, when an iterator is used with destructuring assignment, the `next()` method is only called enough times to obtain values for each of the specified variables. The iterator may have many more values it could return, but they will never be requested.

::: tip 翻译
但迭代器并不总是一直运行到最后：`for/of` 循环可能会因 `break` 或 `return` 或异常而终止。 类似地，当迭代器与解构赋值一起使用时，`next()`方法仅被调用足够的次数来获取每个指定变量的值。 迭代器可能有更多的值可以返回，但它们永远不会被请求。
:::

If our hypothetical words-in-a-file iterator never runs all the way to the end, it still needs to close the file it opened. For this reason, iterator objects may implement a `return()` method to go along with the `next()` method. If iteration stops before `next()` has returned an iteration result with the done property set to true (most commonly because you left a `for/of` loop early via a `break` statement), then the interpreter will check to see if the iterator object has a `return()` method. If this method exists, the interpreter will invoke it with no arguments, giving the iterator the chance to close files, release memory, and otherwise clean up after itself. The `return()` method must return an iterator result object. The properties of the object are ignored, but it is an error to return a non-object value.

::: tip 翻译
如果我们假设的文件中单词迭代器从未运行到最后，它仍然需要关闭它打开的文件。 因此，迭代器对象可以实现 `return()` 方法来配合 `next()` 方法。 如果迭代在 `next()` 返回迭代结果之前停止，并且 `done` 属性设置为 `true`（最常见的是因为您通过 `break` 语句提前离开了 `for/of` 循环），如果迭代器对象有一个 `return()` 方法那么解释器将检查以查看。 如果此方法存在，解释器将不带参数地调用它，从而使迭代器有机会关闭文件、释放内存以及在自身之后进行清理。 `return()` 方法必须返回一个迭代器结果对象。 对象的属性被忽略，但返回非对象值是错误的。
:::

The `for/of` loop and the spread operator are really useful features of JavaScript, so when you are creating APIs, it is a good idea to use them when possible. But having to work with an iterable object, its iterator object, and the iterator’s result objects makes the process somewhat complicated. Fortunately, generators can dramatically simplify the creation of custom iterators, as we’ll see in the rest of this chapter.

::: tip 翻译
`for/of` 循环和展开运算符是 JavaScript 中非常有用的功能，因此当您创建 API 时，最好尽可能使用它们。 但是必须使用可迭代对象、其迭代器对象以及迭代器的结果对象使得该过程有些复杂。 幸运的是，生成器可以极大地简化自定义迭代器的创建，正如我们将在本章的其余部分中看到的那样。
:::

## Generators

A _generator_ is a kind of iterator defined with powerful new ES6 syntax; it’s particularly useful when the values to be iterated are not the elements of a data structure, but the result of a computation.

::: tip 翻译
_generator_ 是一种用强大的新 ES6 语法定义的迭代器； 当要迭代的值不是数据结构的元素而是计算的结果时，它特别有用。
:::

To create a generator, you must first define a _generator function_. A generator function is syntactically like a regular JavaScript function but is defined with the keyword `function*` rather than `function`. (Technically, this is not a new keyword, just a `*` after the keyword `function` and before the function name.) When you invoke a generator function, it does not actually execute the function body, but instead returns a generator object. This generator object is an iterator. Calling its `next()` method causes the body of the generator function to run from the start (or whatever its current position is) until it reaches a `yield` statement. `yield` is new in ES6 and is something like a `return` statement. The value of the `yield` statement becomes the value returned by the `next()` call on the iterator. An example makes this clearer:

::: tip 翻译
要创建生成器，您必须首先定义 _generator function_。 生成器函数在语法上类似于常规 JavaScript 函数，但使用关键字 `function*` 而不是 `function` 定义。 （从技术上讲，这不是一个新的关键字，只是关键字 `function` 后面和函数名称之前的一个`*`。）当您调用生成器函数时，它实际上并不执行函数体，而是返回一个生成器对象 。 该生成器对象是一个迭代器。 调用其 `next()` 方法会导致生成器函数的主体从头开始运行（或无论其当前位置是什么），直到到达 `yield` 语句。 `yield` 是 ES6 中的新增内容，类似于 `return` 语句。 `yield` 语句的值成为迭代器上的 `next()` 调用返回的值。 一个例子可以让这一点更清楚：
:::

```js
// A generator function that yields the set of one digit (base-10) primes.
function* oneDigitPrimes() {
  // Invoking this function does not run the code
  yield 2; // but just returns a generator object. Calling
  yield 3; // the next() method of that generator runs
  yield 5; // the code until a yield statement provides
  yield 7; // the return value for the next() method.
}

// When we invoke the generator function, we get a generator
let primes = oneDigitPrimes();

// A generator is an iterator object that iterates the yielded values
primes.next().value; // => 2
primes.next().value; // => 3
primes.next().value; // => 5
primes.next().value; // => 7
primes.next().done; // => true

// Generators have a Symbol.iterator method to make them iterable
primes[Symbol.iterator](); // => primes

// We can use generators like other iterable types
[...oneDigitPrimes()]; // => [2, 3, 5, 7]
let sum = 0;
for (let prime of oneDigitPrimes()) {
  sum += prime;
}
sum; // => 17
```

In this example, we used a `function*` statement to define a generator. Like regular functions, however, we can also define generators in expression form. Once again, we just put an asterisk after the `function` keyword:

::: tip 翻译
在此示例中，我们使用 `function*` 语句来定义生成器。 然而，像常规函数一样，我们也可以以表达式形式定义生成器。 再一次，我们只是在 `function` 关键字后面加了一个星号：
:::

```js
const seq = function* (from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
};
[...seq(3, 5)]; // => [3, 4, 5]
```

In classes and object literals, we can use shorthand notation to omit the `function` keyword entirely when we define methods. To define a generator in this context, we simply use an asterisk before the method name where the `function` keyword would have been, had we used it:

::: tip 翻译
在类和对象字面量中，我们在定义方法时可以使用速记符号完全省略 `function` 关键字。 要在这种情况下定义生成器，我们只需在方法名称之前使用一个星号，如果我们使用了它，那么 `function` 关键字就在该位置：
:::

```js
let o = {
  x: 1,
  y: 2,
  z: 3,
  // A generator that yields each of the keys of this object
  *g() {
    for (let key of Object.keys(this)) {
      yield key;
    }
  },
};
[...o.g()]; // => ["x", "y", "z", "g"]
```

Note that there is no way to write a generator function using arrow function syntax.

::: tip 翻译
请注意，无法使用箭头函数语法编写生成器函数。
:::

Generators often make it particularly easy to define iterable classes. We can replace the `[Symbol.iterator]()` method show in Example 12-1 with a much shorter `*[Symbol.iterator]()` generator function that looks like this:

::: tip 翻译
生成器通常使定义可迭代类变得特别容易。 我们可以用更短的 `*[Symbol.iterator]()` 生成器函数替换示例 12-1 中显示的 `[Symbol.iterator]()` 方法，如下所示：
:::

```js
*[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
        yield x;
    }
}
```

See Example 9-3 in **Chapter 9** to see this generator-based iterator function in context.

::: tip 翻译
请参阅**第 9 章**中的示例 9-3，了解上下文中这个基于生成器的迭代器函数。
:::

### 生成器示例

Generators are more interesting if they actually _generate_ the values they yield by doing some kind of computation. Here, for example, is a generator function that yields Fibonacci numbers:

::: tip 翻译
如果生成器实际上通过某种计算生成它们产生的值，那么它们会更有趣。 例如，这里是一个生成斐波那契数的生成器函数：
:::

```js
function* fibonacciSequence() {
  let x = 0,
    y = 1;
  for (;;) {
    yield y;
    [x, y] = [y, x + y]; // Note: destructuring assignment
  }
}
```

Note that the `fibonacciSequence()` generator function here has an infinite loop and yields values forever without returning. If this generator is used with the `...` spread operator, it will loop until memory is exhausted and the program crashes. With care, it is possible to use it in a `for/of` loop, however:

::: tip 翻译
请注意，此处的 `fibonacciSequence()` 生成器函数具有无限循环，并且永远生成值而不返回。 如果该生成器与 `...` 扩展运算符一起使用，它将循环直到内存耗尽并且程序崩溃。 不过，只要小心，就可以在 `for/of` 循环中使用它：
:::

```js
// Return the nth Fibonacci number
function fibonacci(n) {
  for (let f of fibonacciSequence()) {
    if (n-- <= 0) {
      return f;
    }
  }
}
fibonacci(20); // => 10946
```

This kind of infinite generator becomes more useful with a `take()` generator like this:

::: tip 翻译
这种无限生成器通过像这样的 `take()` 生成器变得更加有用：
:::

```js
// Yield the first n elements of the specified iterable object
function* take(n, iterable) {
  let it = iterable[Symbol.iterator](); // Get iterator for iterable object
  while (n-- > 0) {
    // Loop n times:
    let next = it.next(); // Get the next item from the iterator.
    if (next.done) return; // If there are not more values, return early
    else yield next.value; // otherwise, yield the value
  }
}

[...take(5, fibonacciSequence())]; // => [1, 1, 2, 3, 5]
```

Here is another useful generator function that interleaves the elements of multiple iterable objects:

::: tip 翻译
这是另一个有用的生成器函数，它交错多个可迭代对象的元素：
:::

```js
// Given an array of iterables, yield their elements in interleaved order.
function* zip(...iterables) {
  // Get an iterator for each iterable
  let iterator = iterables.map((i) => i[Symbol.iterator]());
  let index = 0;
  while (iterator.length > 0) {
    // While there are still some iterators
    if (index >= iterator.length) {
      // If we reached the last iterator
      index = 0; // go back to the first one
    }
    let item = iterator[index].next(); // Get next item from next iterator
    if (item.done) {
      // If that iterator is done
      iterator.splice(index, 1); // then remove it from the array
    } else {
      // Otherwise,
      yield item.value; // yield the iterated value
      index++; // and move on to the next iterator.
    }
  }
}

// Interleave three iterable objects
[...zip(oneDigitPrimes(), "ab", [0])]; // => [2, 'a', 0, 3, 'b', 5, 7]
```

### yield\* and Recursive Generators

In addition to the `zip()` generator defined in the preceding example, it might be useful to have a similar generator function that yields the elements of multiple iterable objects sequentially rather than interleaving them. We could write that generator like this:

::: tip 翻译
除了前面示例中定义的 `zip()` 生成器之外，拥有一个类似的生成器函数可能会很有用，该函数可以顺序生成多个可迭代对象的元素，而不是交错排列它们。 我们可以这样编写生成器：
:::

```js
function* sequence(...iterables) {
  for (let iterable of iterables) {
    for (let item of iterable) {
      yield item;
    }
  }
}

[...sequence("abc", oneDigitPrimes())]; // => ['a', 'b', 'c', 2, 3, 5, 7]
```

This process of yielding the elements of some other iterable object is common enough in generator functions that ES6 has special syntax for it. The `yield*` keyword is like `yield` except that, rather than yielding a single value, it iterates an iterable object and yields each of the resulting values. The `sequence()` generator function that we’ve used can be simplified with `yield*` like this:

::: tip 翻译
这种生成其他可迭代对象的元素的过程在生成器函数中很常见，ES6 对此有特殊的语法。 `yield*` 关键字与 `yield` 类似，只不过它不是生成单个值，而是迭代一个可迭代对象并生成每个结果值。 我们使用的 `sequence()` 生成器函数可以使用 `yield*` 来简化，如下所示：
:::

```js
function* sequence(...iterables) {
  for (let iterable of iterables) {
    yield* iterable;
  }
}

[...sequence("abc", oneDigitPrimes())]; // => ['a', 'b', 'c', 2, 3, 5, 7]
```

The array `forEach()` method is often an elegant way to loop over the elements of an array, so you might be tempted to write the `sequence()` function like this:

::: tip 翻译
数组 `forEach()` 方法通常是一种循环遍历数组元素的优雅方法，因此您可能会想像这样编写 `sequence()` 函数：
:::

```js
function* sequence(...iterables) {
  iterables.forEach((iterable) => yield * iterable); // Error
}
```

This does not work, however. `yield` and `yield*` can only be used within generator functions, but the nested arrow function in this code is a regular function, not a `function*` generator function, so `yield` is not allowed.

::: tip 翻译
然而，这不起作用。 `yield` 和 `yield*` 只能在生成器函数内使用，但是此代码中的嵌套箭头函数是常规函数，而不是 `function*` 生成器函数，因此不允许使用 `yield`。
:::

`yield*` can be used with any kind of iterable object, including iterables implemented with generators. This means that `yield *` allows us to define recursive generators, and you might use this feature to allow simple non-recursive iteration over a recursively defined tree structure, for example.

::: tip 翻译
`yield*` 可以与任何类型的可迭代对象一起使用，包括使用生成器实现的可迭代对象。 这意味着，`yield *` 允许我们定义递归生成器，并且您可以使用此功能来允许在递归定义的树结构上进行简单的非递归迭代。
:::

## 高级生成器功能

The most common use of generator functions is to create iterators, but the fundamental feature of generators is that they allow us to pause a computation, yield intermediate results, and then resume the computation later. This means that generators have features beyond those of iterators, and we explore those features in the following sections.

### The Return Value of a Generator Function

The generator functions we’ve seen so far have not had `return` statements, or if they have, they have been used to cause an early return, not to return a value. Like any function, though, a generator function can return a value. In order to understand what happens in this case, recall how iteration works. The return value of the `next()` function is an object that has a `value` property and/or a `done` property. With typical iterators and generators, if the `value` property is defined, then the `done` property is `undefined` or is `false`. And if `done` is `true`, then `value` is `undefined`. But in the case of a generator that returns a value, the final call to `next` returns an object that has both `value` and `done` defined. The `value` property holds the return value of the generator function, and the `done` property is `true`, indicating that there are no more values to iterate. This final value is ignored by the `for/of` loop and by the spread operator, but it is available to code that manually iterates with explicit calls to `next()`:

```js
function* oneAndDone() {
  yield 1;
  return "done";
}

// The return value does not appear in normal iteration.
[...oneAndDone()]; // => [1]
// But it is available if you explicitly call next()
let generator = oneAndDone();
generator.next(); // => { value: 1, done: false }
generator.next(); // => { value: 'done', done: true }
// If the generator is already done, the return value is not returned again
generator.next(); // => { value: undefined, done: true }
```

### The Value of a yield Expression

In the preceding discussion, we’ve treated `yield` as a statement that takes a value but has no value of its own. In fact, however, `yield` is an expression, and it can have a value.

When the `next()` method of a generator is invoked, the generator function runs until it reaches a `yield` expression. The expression that follows the `yield` keyword is evaluated, and that value becomes the return value of the `next()` invocation. At this point, the generator function stops executing right in the middle of evaluating the `yield` expression. The next time the `next()` method of the generator is called, the argument passed to `next()` becomes the value of the `yield` expression that was paused. So the generator returns values to its caller with `yield`, and the caller passes values in to the generator with `next()`. The generator and caller are two separate streams of execution passing values (and control) back and forth. The following code illustrates:

```js
function* smallNumbers() {
  console.log("next() invoked the first time; argument discarded");
  let y1 = yield 1; // y1 == 'b'
  console.log("next() invoked a second time with argument", y1);
  let y2 = yield 2; // y2 == 'c'
  console.log("next() invoked a third time with argument", y2);
  let y3 = yield 3; // y3 == 'd'
  console.log("next() invoked a fourth time with argument", y3);
  return 4;
}

let g = smallNumbers();
console.log("generator created; no code runs yet");
let n1 = g.next("a"); // n1.value = 1
console.log("generator yield", n1.value);
let n2 = g.next("b"); // n2.value = 2
console.log("generator yield", n2.value);
let n3 = g.next("c"); // n3.value = 3
console.log("generator yield", n3.value);
let n4 = g.next("d"); // n4.value = 4
console.log("generator returned", n4.value);
```

When this code runs, it produces the following output that demonstrates the backand-forth between the two blocks of code:

```js
generator created; no code runs yet
next() invoked the first time; argument discarded
generator yield 1
next() invoked a second time with argument b
generator yield 2
next() invoked a third time with argument c
generator yield 3
next() invoked a fourth time with argument d
generator returned 4
```

Note the asymmetry in this code. The first invocation of `next()` starts the generator, but the value passed to that invocation is not accessible to the generator.

### The return() and throw() Methods of a Generator

We’ve seen that you can receive values yielded by or returned by a generator function. And you can pass values to a running generator by passing those values when you call the `next()` method of the generator.

In addition to providing input to a generator with `next()`, you can also alter the flow of control inside the generator by calling its `return()` and `throw()` methods. As the names suggest, calling these methods on a generator causes it to return a value or throw an exception as if the next statement in the generator was a `return` or `throw`.

Recall from earlier in the chapter that, if an iterator defines a `return()` method and iteration stops early, then the interpreter automatically calls the `return()` method to give the iterator a chance to close files or do other cleanup. In the case of generators, you can’t define a custom `return()` method to handle cleanup, but you can structure the generator code to use a `try/finally` statement that ensures the necessary cleanup is done (in the `finally` block) when the generator returns. By forcing the generator to return, the generator’s built-in `return()` method ensures that the cleanup code is run when the generator will no longer be used.

Just as the `next()` method of a generator allows us to pass arbitrary values into a running generator, the `throw()` method of a generator gives us a way to send arbitrary signals (in the form of exceptions) into a generator. Calling the `throw()` method always causes an exception inside the generator. But if the generator function is written with appropriate exception-handling code, the exception need not be fatal but can instead be a means of altering the behavior of the generator. Imagine, for example, a counter generator that yields an ever-increasing sequence of integers. This could be written so that an exception sent with `throw()` would reset the counter to zero.

When a generator uses `yield*` to yield values from some other iterable object, then a call to the `next()` method of the generator causes a call to the `next()` method of the iterable object. The same is true of the `return()` and `throw()` methods. If a generator uses `yield*` on an iterable object that has these methods defined, then calling `return()` or `throw()` on the generator causes the iterator’s `return()` or `throw()` method to be called in turn. All iterators must have a `next()` method. Iterators that need to clean up after incomplete iteration should define a `return()` method. And any iterator may define a `throw()` method, though I don’t know of any practical reason to do so.

### Final Note About Generators

Generators are a very powerful generalized control structure. They give us the ability to pause a computation with yield and restart it again at some arbitrary later time with an arbitrary input value. It is possible to use generators to create a kind of cooperative threading system within single-threaded JavaScript code. And it is possible to use generators to mask asynchronous parts of your program so that your code appears sequential and synchronous, even though some of your function calls are actually asynchronous and depend on events from the network.

Trying to do these things with generators leads to code that is mind-bendingly hard to understand or to explain. It has been done, however, and the only really practical use case has been for managing asynchronous code. JavaScript now has async and await keywords (see **Chapter 13**) for this very purpose, however, and there is no longer any reason to abuse generators in this way.

## Summary

In this chapter, you have learned:

- The `for/of` loop and the `...` spread operator work with iterable objects.
- An object is iterable if it has a method with the symbolic name `[Symbol.iterator]` that returns an iterator object.
- An iterator object has a `next()` method that returns an iteration result object.
- An iteration result object has a `value` property that holds the next iterated value, if there is one. If the iteration has completed, then the result object must have a `done` property set to `true`.
- You can implement your own iterable objects by defining a `[Symbol.iterator]()` method that returns an object with a `next()` method that returns iteration result objects. You can also implement functions that accept iterator arguments and return iterator values.
- Generator functions (functions defined with `function*` instead of `function`) are another way to define iterators.
- When you invoke a generator function, the body of the function does not run right away; instead, the return value is an iterable iterator object. Each time the `next()` method of the iterator is called, another chunk of the generator function runs.
- Generator functions can use the `yield` operator to specify the values that are returned by the iterator. Each call to `next()` causes the generator function to run up to the next `yield` expression. The value of that `yield` expression then becomes the value returned by the iterator. When there are no more `yield` expressions, then the generator function returns, and the iteration is complete.
