---
title: 第十一章 JavaScript 标准库
---

# JavaScript 标准库

Some datatypes, such as numbers and strings ([Chapter 3](./Chapter-03-Types_Values_Variables.md)), objects ([Chapter 6](./Chapter-06-Objects.md)), and arrays ([Chapter 7](./Chapter-07-Arrays.md)) are so fundamental to JavaScript that we can consider them to be part of the language itself. This chapter covers other important but less fundamental APIs that can be thought of as defining the “standard library” for JavaScript: these are useful classes and functions that are built in to JavaScript and available to all JavaScript programs in both web browsers and in Node.

::: tip 翻译
一些数据类型，例如数字和字符串（[第 3 章](./Chapter-03-Types_Values_Variables.md)）、对象（[第 6 章](./Chapter-06-Objects.md)）和数组（[第 7 章](./Chapter-07-Arrays.md)）对于 JavaScript 来说非常基础，我们可以将它们视为 JavaScript 语言本身的一部分 。 本章涵盖了其他重要但不太基础的 API，它们可以被视为定义 JavaScript 的“标准库”：这些是内置于 JavaScript 中的有用的类和函数，可供 Web 浏览器和 Node.js 中的所有 JavaScript 程序使用。
:::

The sections of this chapter are independent of one another, and you can read them in any order. They cover:

- The Set and Map classes for representing sets of values and mappings from one set of values to another set of values.
- Array-like objects known as TypedArrays that represent arrays of binary data, along with a related class for extracting values from non-array binary data.
- Regular expressions and the RegExp class, which define textual patterns and are useful for text processing. This section also covers regular expression syntax in detail.
- The Date class for representing and manipulating dates and times.
- The Error class and its various subclasses, instances of which are thrown when errors occur in JavaScript programs.
- The JSON object, whose methods support serialization and deserialization of JavaScript data structures composed of objects, arrays, strings, numbers, and booleans.
- The Intl object and the classes it defines that can help you localize your JavaScript programs.
- The Console object, whose methods output strings in ways that are particularly useful for debugging programs and logging the behavior of those programs.
- The URL class, which simplifies the task of parsing and manipulating URLs. This section also covers global functions for encoding and decoding URLs and their component parts.
- `setTimeout()` and related functions for specifying code to be executed after a specified interval of time has elapsed.

::: tip 翻译
本章的各个部分是相互独立的，您可以按任意顺序阅读它们。 它们涵盖：

- Set 和 Map 类用于表示值的集合和从一组值到另一组值的映射。
- 称为 TypedArray 的类数组对象，表示二进制数据数组，以及用于从非数组二进制数据中提取值的相关类。
- 正则表达式和 RegExp 类，它们定义文本模式并且对于文本处理很有用。 本节还详细介绍了正则表达式语法。
- 用于表示和操作日期和时间的 Date 类。
- Error 类及其各种子类，当 JavaScript 程序中发生错误时会抛出该类的实例。
- JSON 对象，其方法支持由对象、数组、字符串、数字和布尔值组成的 JavaScript 数据结构的序列化和反序列化。
- Intl 对象及其定义的类可以帮助您本地化 JavaScript 程序。
- Console 对象，其方法以对于调试程序和记录这些程序的行为特别有用的方式输出字符串。
- URL 类，简化了解析和操作 URL 的任务。 本节还介绍了用于编码和解码 URL 及其组成部分的全局函数。
- `setTimeout()` 和相关函数，用于指定在指定时间间隔之后要执行的代码。
  :::

Some of the sections in this chapter—notably, the sections on typed arrays and regular expressions—are quite long because there is significant background information you need to understand before you can use those types effectively. Many of the other sections, however, are short: they simply introduce a new API and show some examples of its use.

::: tip 翻译
本章中的某些部分（特别是有关类型化数组和正则表达式的部分）相当长，因为在有效使用这些类型之前，您需要了解重要的背景信息。 然而，许多其他部分都很简短：它们只是介绍了一个新的 API 并展示了它的一些使用示例。
:::

## Sets 和 Maps

JavaScript’s Object type is a versatile data structure that can be used to map strings (the object’s property names) to arbitrary values. And when the value being mapped to is something fixed like `true`, then the object is effectively a set of strings.

::: tip 翻译
JavaScript 的对象类型是一种多功能数据结构，可用于将字符串（对象的属性名称）映射到任意值。 当映射到的值是固定的（如 `true`）时，该对象实际上是一组字符串。
:::

Objects are actually used as maps and sets fairly routinely in JavaScript programming, but this is limited by the restriction to strings and complicated by the fact that objects normally inherit properties with names like “toString”, which are not typically intended to be part of the map or set.

::: tip 翻译
实际上，在 JavaScript 编程中，对象相当常规地用作映射和集合，但这受到字符串的限制，并且由于对象通常继承名称为 `toString` 的属性而变得复杂，这些属性通常不打算成为 `map` 或 `set` 的一部分。
:::

For this reason, ES6 introduces true `Set` and `Map` classes, which we’ll cover in the sub sections that follow.

::: tip 翻译
因此，ES6 引入了真正的 `Set` 和 `Map` 类，我们将在接下来的小节中介绍它们。
:::

### Set 类

A set is a collection of values, like an array is. Unlike arrays, however, sets are not ordered or indexed, and they do not allow duplicates: a value is either a member of a set or it is not a member; it is not possible to ask how many times a value appears in a set.

::: tip 翻译
`set` 是值的集合，就像数组一样。 然而，与数组不同的是，`set` 没有排序或索引，并且不允许重复：值要么是集合的成员，要么不是成员； 不可能询问某个值在集合中出现了多少次。
:::

Create a Set object with the `Set()` constructor:

::: tip 翻译
使用 `Set()` 构造函数创建一个集合对象：
:::

```js
let s = new Set(); // A new, empty set
let t = new Set([1, s]); // A new set with the members
```

The argument to the `Set()` constructor need not be an array: any iterable object (including other `Set` objects) is allowed:

::: tip 翻译
`Set()` 构造函数的参数可以不是数组:任何可迭代对象（包括其他 `Set` 对象）都是允许的。
:::

```js
let t = new Set(s); // A new set that copies the elements of s.
let unique = new Set("Mississippi"); // 4 elements: 'M', 'i', 's', and 'p'
```

The `size` property of a set is like the `length` property of an array: it tells you how many values the set contains:

::: tip 翻译
`set` 的 `size` 属性像数组的 `length` 属性一样：它告诉你集合包含了多少个值。
:::

```js
unique.size; // => 4
```

Sets don’t need to be initialized when you create them. You can add and remove elements at any time with `add()`, `delete()`, and `clear()`. Remember that sets cannot contain duplicates, so adding a value to a set when it already contains that value has no effect:

::: tip 翻译
创建集合时不需要对其进行初始化。 您可以随时使用 `add()`、`delete()` 和 `clear()` 方法添加和删除元素。 请记住，集合不能包含重复项，因此当集合已包含该值时，将值添加到集合中不会产生任何效果：
:::

```js
let s = new Set(); // Start empty
s.size; // => 0
s.add(1); // Add a number
s.size; // => 1; now the set has one member
s.add(1); // Add the same number again
s.size; // => 1; the size does not change
s.add(true); // Add another value; note that it is fine to mix types
s.size; // => 2
s.add([1, 2, 3]); // Add an array value
s.size; // => 3; the array was added, not its elements
s.delete(1); // => true: successfully deleted element 1
s.size; // => 2: this size is back down to 2
s.delete("test"); // => false: 'test' was not a member, deletion failed
s.delete(true); // => true: delete succeeded
s.delete([1, 2, 3]); // => false: the array in the set is different
s.size; // => 1: there is still that one array in the set
s.clear(); // Remove everything from the set
s.size; // => 0
```

There are a few important points to note about this code:

- The `add()` method takes a single argument; if you pass an array, it adds the array itself to the set, not the individual array elements. `add()` always returns the set it is invoked on, however, so if you want to add multiple values to a set, you can used chained method calls like `s.add('a').add('b').add('c');`.
- The `delete()` method also only deletes a single set element at a time. Unlike `add()`, however, `delete()` returns a boolean value. If the value you specify was actually a member of the set, then `delete()` removes it and returns `true`. Otherwise, it does nothing and returns `false`.
- Finally, it is very important to understand that set membership is based on strict equality checks, like the `===` operator performs. A set can contain both the number 1 and the string "1", because it considers them to be distinct values. When the values are objects (or arrays or functions), they are also compared as if with `===`. This is why we were unable to delete the array element from the set in this code. We added an array to the set and then tried to remove that array by passing a different array (albeit with the same elements) to the `delete()` method. In order for this to work, we would have had to pass a reference to exactly the same array.

::: tip 翻译
这段代码有几个要点需要注意：

- `add()` 方法采用单个参数； 如果传递一个数组，它会将数组本身添加到集合中，而不是单个数组元素。 然而，`add()` 总是返回调用它的集合，因此如果您想将多个值添加到集合中，可以使用链式方法调用，例如 `s.add('a').add('b' ).add('c');`.
- `delete()` 方法也一次仅删除一个集合元素。 然而，与 `add()` 不同，`delete()` 返回一个布尔值。 如果您指定的值实际上是集合的成员，则 `delete()` 将删除它并返回 `true`。 否则，它不执行任何操作并返回 `false`。
- 最后，了解集合成员资格基于严格的相等性检查非常重要，就像 `===` 运算符执行的那样。 集合可以同时包含数字 1 和字符串“1”，因为它认为它们是不同的值。 当值是对象（或数组或函数）时，它们也会像 `===` 一样进行比较。 这就是为什么我们无法从这段代码中的集合中删除数组元素。 我们向集合中添加了一个数组，然后尝试通过将另一个数组（尽管具有相同的元素）传递给 `delete()` 方法来删除该数组。 为了使其工作，我们必须传递对完全相同的数组的引用。
  :::

> Python programmers take note: this is a significant difference between JavaScript and Python sets. Python sets compare members for equality, not identity, but the trade-off is that Python sets only allow immutable members, like tuples, and do not allow lists and dicts to be added to sets.

> Python 程序员请注意：这是 JavaScript 和 Python 集合之间的显着差异。 Python 集合比较成员的相等性，而不是同一性，但权衡是 Python 集合只允许不可变成员（例如元组），并且不允许将列表和字典添加到集合中。

In practice, the most important thing we do with sets is not to add and remove elements from them, but to check to see whether a specified value is a member of the set. We do this with the `has()` method:

::: tip 翻译
在实践中，我们对集合所做的最重要的事情不是添加和删除其中的元素，而是检查指定值是否是集合的成员。 我们使用 `has()` 方法来做到这一点：
:::

```js
let oneDigitPrimes = new Set([2, 3, 5, 7]);
oneDigitPrimes.has(2); // => true: 2 is a one-digit prime number
oneDigitPrimes.has(3); // => true: so is 3
oneDigitPrimes.has(4); // => false: 4 is not a prime
oneDigitPrimes.has("5"); // => false: '5' is not even a number
```

The most important thing to understand about sets is that they are optimized for membership testing, and no matter how many members the set has, the `has()` method will be very fast. The `includes()` method of an array also performs membership testing, but the time it takes is proportional to the size of the array, and using an array as a set can be much, much slower than using a real Set object.

::: tip 翻译
关于集合最重要的一点是，它们针对成员资格测试进行了优化，无论集合有多少个成员，`has()` 方法都会非常快。 数组的 `includes()` 方法也执行成员资格测试，但所需的时间与数组的大小成正比，并且使用数组作为集合可能比使用真正的 `Set` 对象慢得多。
:::

The Set class is iterable, which means that you can use a `for/of` loop to enumerate all of the elements of a set:

::: tip 翻译
Set 类是可迭代的，这意味着您可以使用 `for/of` 循环来枚举集合的所有元素：
:::

```js
let sum = 0;
for (let p of oneDigitPrimes) {
  // Loop through the one-digit primes
  sum += p; // and add them up
}
sum; // => 17: 2 + 3 + 5 + 7
```

Because Set objects are iterable, you can convert them to arrays and argument lists with the `...` spread operator:

::: tip 翻译
由于 Set 对象是可迭代的，因此您可以使用 `...` 扩展运算符将它们转换为数组和参数列表：
:::

```js
[...oneDigitPrimes]; // => [2, 3, 5, 7]: the set converted to an Array
Math.max(...oneDigitPrimes); // => 7: set elements passed as function arguments
```

Sets are often described as “unordered collections.” This isn’t exactly true for the JavaScript Set class, however. A JavaScript set is unindexed: you can’t ask for the first or third element of a set the way you can with an array. But the JavaScript Set class always remembers the order that elements were inserted in, and it always uses this order when you iterate a set: the first element inserted will be the first one iterated (assuming you haven’t deleted it first), and the most recently inserted element will be the last one iterated.

::: tip 翻译
集合通常被描述为“无序集合”。 然而，对于 JavaScript Set 类来说，情况并非如此。 JavaScript 集合是无索引的：您不能像使用数组那样请求集合的第一个或第三个元素。 但是 JavaScript Set 类始终会记住元素插入的顺序，并且在迭代集合时它始终使用此顺序：插入的第一个元素将是第一个迭代的元素（假设您没有先删除它），并且 最近插入的元素将是最后一个迭代的元素。
:::

In addition to being iterable, the Set class also implements a `forEach()` method that is similar to the array method of the same name:

::: tip 翻译
除了可迭代之外，Set 类还实现了一个类似于同名数组方法的 `forEach()` 方法：
:::

```js
let product = 1;
oneDigitPrimes.forEach((n) => {
  product *= n;
});
product; // => 210: 2 * 3 * 5 * 7
```

The `forEach()` of an array passes array indexes as the second argument to the function you specify. Sets don’t have indexes, so the Set class’s version of this method simply passes the element value as both the first and second argument.

::: tip 翻译
数组的 `forEach()` 方法将数组索引作为第二个参数传递给您指定的函数。 集合没有索引，因此该方法的 Set 类版本只是将元素值作为第一个和第二个参数传递。
:::

### Map 类

A Map object represents a set of values known as _keys_, where each key has another value associated with (or “mapped to”) it. In a sense, a map is like an array, but instead of using a set of sequential integers as the keys, maps allow us to use arbitrary values as “indexes.” Like arrays, maps are fast: looking up the value associated with a key will be fast (though not as fast as indexing an array) no matter how large the map is.

::: tip 翻译
`Map` 对象表示一组称为 _keys_ 的值，其中每个键都有另一个与其关联（或“映射”）的值。 从某种意义上说，`map` 就像一个数组，但 `map` 允许我们使用任意值作为“索引”，而不是使用一组连续的整数作为键。 与数组一样，`map` 速度很快：无论 `map` 有多大，查找与键关联的值都会很快（尽管不如索引数组那么快）。
:::

Create a new map with the `Map()` constructor:

::: tip 翻译
使用 `Map()` 构造函数创建一个新的 `map`:
:::

```js
let m = new Map(); // Create a new, empty map
let n = new Map([
  // A new map initialized with string keys mapped to numbers
  ["one", 1],
  ["two", 2],
]);
```

The optional argument to the `Map()` constructor should be an iterable object that yields two element `[key, value]` arrays. In practice, this means that if you want to initialize a map when you create it, you’ll typically write out the desired keys and associated values as an array of arrays. But you can also use the `Map()` constructor to copy other maps or to copy the property names and values from an existing object:

::: tip 翻译
`Map()` 构造函数的可选参数应该是一个可迭代对象，它生成两个元素 `[key, value]` 数组。 实际上，这意味着如果您想在创建 `map` 时对其进行初始化，通常会将所需的键和关联值写为数组的数组。 但您也可以使用 `Map()` 构造函数来复制其他 `map` 或从现有对象复制属性名称和值：
:::

```js
let copy = new Map(n); // A new map with the same keys and values map n
let o = { x: 1, y: 2 }; // An object with two properties
let p = new Map(Object.entries(o)); // Same as new map([['x', 1], ['y', 2]])
```

Once you have created a Map object, you can query the value associated with a given key with `get()` and can add a new key/value pair with `set()`. Remember, though, that a map is a set of keys, each of which has an associated value. This is not quite the same as a set of key/value pairs. If you call `set()` with a key that already exists in the map, you will change the value associated with that key, not add a new key/value mapping. In addition to `get()` and `set()`, the Map class also defines methods that are like Set methods: use `has()` to check whether a map includes the specified key; use `delete()` to remove a key (and its associated value) from the map; use `clear()` to remove all key/value pairs from the map; and use the `size` property to find out how many keys a map contains.

::: tip 翻译
创建 `Map` 对象后，您可以使用 `get()` 查询与给定键关联的值，并可以使用 `set()` 添加新的键/值对。 但请记住，`map` 是一组键，每个键都有一个关联的值。 这与一组键/值对不太一样。 如果您使用 `map` 中已存在的键调用 `set()`，您将更改与该键关联的值，而不是添加新的键/值映射。 除了 `get()` 和 `set()` 之外，`Map` 类还定义了类似于 `Set` 方法的方法：使用 `has()` 来检查 `map` 是否包含指定的键； 使用 `delete()` 从 `map` 中删除键（及其关联值）； 使用 `clear()` 从 `map` 中删除所有键/值对； 并使用 `size` 属性来找出 `map` 包含多少个键。
:::

```js
let m = new Map(); // Start with an empty map
m.size; // => 0: empty maps have no keys
m.set("one", 1); // Map the key 'one' to the value 1
m.set("two", 2); // And the key 'two' to the value 2.
m.size; // => 2: the map now has two keys
m.get("two"); // => 2: return the value associated with key 'two'
m.get("three"); // => undefined: this key is not in the map
m.set("one", true); // Change the value associated with an existing key
m.size; // => 2: the size doesn't change
m.has("one"); // => true: the map has a key 'one'
m.has(true); // => false: the map does not have a key true
m.delete("one"); // => true: the key existed and deletion succeeded
m.size; // => 1
m.delete("three"); // => false: failed to delete a nonexistent key
m.clear(); // Remove all keys and values from the map
```

Like the `add()` method of Set, the `set()` method of Map can be chained, which allows maps to be initialized without using arrays of arrays:

::: tip 翻译
与 `Set` 的 `add()` 方法一样，`Map` 的 `set()` 方法可以链接，这允许在不使用数组的数组的情况下初始化映射：
:::

```js
let m = new Map().set("one", 1).set("two", 2).set("three", 3);
m.size; // => 3
m.get("two"); // => 2
```

As with Set, any JavaScript value can be used as a key or a value in a Map. This includes `null`, `undefined`, and `NaN`, as well as reference types like objects and arrays. And as with the Set class, Map compares keys by identity, not by equality, so if you use an object or array as a key, it will be considered different from every other object and array, even those with exactly the same properties or elements:

::: tip 翻译
与 `Set` 一样，任何 JavaScript 值都可以用作 `Map` 中的键或值。 这包括 `null`、 `undefined` 和 `NaN`，以及对象和数组等引用类型。 与 `Set` 类一样，`Map` 通过标识而不是相等来比较键，因此如果您使用对象或数组作为键，它将被视为与其他所有对象和数组不同，即使是那些具有完全相同的属性或元素的对象和数组 :
:::

```js
let m = new Map(); // Start with an empty map
m.set({}, 1); // Map one empty object to the number 1.
m.set({}, 2); // Map a different empty object to the number 2.
m.size; // => 2: there are two keys in this map
m.get({}); // => undefined: but this empty object is not a key
m.set(m, undefined); // Map the map itself to the value undefined.
m.has(m); // => true: m is a key in itself
m.get(m); // => undefined: same value we'd get if m wasn't a key
```

Map objects are iterable, and each iterated value is a two-element array where the first element is a key and the second element is the value associated with that key. If you use the spread operator with a Map object, you’ll get an array of arrays like the ones that we passed to the `Map()` constructor. And when iterating a map with a `for/of` loop, it is idiomatic to use destructuring assignment to assign the key and value to separate variables:

::: tip 翻译
`Map` 对象是可迭代的，每个迭代值都是一个双元素数组，其中第一个元素是键，第二个元素是与该键关联的值。 如果您将展开运算符与 `Map` 对象一起使用，您将获得一个数组数组，就像我们传递给 `Map()` 构造函数的数组一样。 当使用 `for/of` 循环迭代 `map` 时，惯用的做法是使用解构赋值将键和值分配给单独的变量：
:::

```js
let m = new Map([
  ["x", 1],
  ["y", 2],
]);
[...m]; // => [['x', 1], ['y', 2]]

for (let [key, value] of m) {
  // On the first iteration, key will be 'x' and value will be 1
  // On the second iteration, key will be 'y' and value will be 2
}
```

Like the Set class, the Map class iterates in insertion order. The first key/value pair iterated will be the one least recently added to the map, and the last pair iterated will be the one most recently added.

::: tip 翻译
与 `Set` 类一样，`Map` 类按插入顺序进行迭代。 迭代的第一个键/值对将是最先添加到 `map` 中的键/值对，迭代的最后一个键/值对将是最后添加的键/值对。
:::

If you want to iterate just the keys or just the associated values of a map, use the `keys()` and `values()` methods: these return iterable objects that iterate keys and values, in insertion order. (The `entries()` method returns an iterable object that iterates key/value pairs, but this is exactly the same as iterating the map directly.)

::: tip 翻译
如果您只想迭代映射的键或关联值，请使用 `keys()` 和 `values()` 方法：这些方法返回按插入顺序迭代键和值的可迭代对象。 （`entries()`方法返回一个迭代键/值对的可迭代对象，但这与直接迭代映射完全相同。）
:::

```js
[...m.keys()]; // => ['x', 'y']: just the keys
[...m.values()]; // => [1, 2]: just the values
[...m.entries()]; // => [['x', 1], ['y', 2]]: same as [...m]
```

Map objects can also be iterated using the `forEach()` method that was first implemented by the Array class.

::: tip 翻译
还可以使用 Array 类首先实现的 `forEach()` 方法来迭代 `Map` 对象。
:::

```js
m.forEach((value, key) => {
  // note value, key NOT key, value
  // On the first invocation, value will be 1 and key will be 'x'
  // On the second invocation, value will be 2 and key will be 'y'
});
```

It may seem strange that the value parameter comes before the key parameter in the code above, since with `for/of` iteration, the key comes first. As noted at the start of this section, you can think of a map as a generalized array in which integer array indexes are replaced with arbitrary key values. The `forEach()` method of arrays passes the array element first and the array index second, so, by analogy, the `forEach()` method of a map passes the map value first and the map key second.

::: tip 翻译
在上面的代码中，值参数出现在键参数之前可能看起来很奇怪，因为在 `for/of` 迭代中，键首先出现。 正如本节开头所述，您可以将 `map` 视为广义数组，其中整数数组索引被任意键值替换。 数组的 `forEach()` 方法首先传递数组元素，然后传递数组索引，因此，以此类推，`map` 的 `forEach()` 方法首先传递映射值，然后传递映射键。
:::

### WeakMap 和 WeakSet

The WeakMap class is a variant (but not an actual subclass) of the Map class that does not prevent its key values from being garbage collected. Garbage collection is the process by which the JavaScript interpreter reclaims the memory of objects that are no longer “reachable” and cannot be used by the program. A regular map holds “strong” references to its key values, and they remain reachable through the map, even if all other references to them are gone. The WeakMap, by contrast, keeps “weak” references to its key values so that they are not reachable through the WeakMap, and their presence in the map does not prevent their memory from being reclaimed.

::: tip 翻译
`WeakMap` 类是 `Map` 类的变体（但不是实际的子类），它不会阻止其键值被垃圾收集。 垃圾收集是 JavaScript 解释器回收不再“可达”且程序无法使用的对象内存的过程。 常规 `map` 保留对其键值的“强”引用，并且即使对它们的所有其他引用都消失了，它们仍然可以通过 `map` 访问。 相比之下，`WeakMap` 保留对其键值的“弱”引用，以便无法通过 `WeakMap` 访问它们，并且它们在 `map` 中的存在不会阻止回收它们的内存。
:::

The `WeakMap()` constructor is just like the `Map()` constructor, but there are some significant differences between WeakMap and Map:

- WeakMap keys must be objects or arrays; primitive values are not subject to garbage collection and cannot be used as keys.
- WeakMap implements only the `get()`, `set()`, `has()`, and `delete()` methods. In particular, WeakMap is not iterable and does not define `keys()`, `values()`, or `forEach()`. If WeakMap was iterable, then its keys would be reachable and it wouldn’t be weak.
- Similarly, WeakMap does not implement the `size` property because the size of a WeakMap could change at any time as objects are garbage collected.

::: tip 翻译
`WeakMap()` 构造函数就像 `Map()` 构造函数一样，但 `WeakMap` 和 `Map` 之间有一些显着差异：

- `WeakMap` 键必须是对象或数组； 原始值不受垃圾回收的影响，并且不能用作键。
- `WeakMap` 仅实现 `get()`、`set()`、`has()` 和 `delete()` 方法。 特别是，`WeakMap` 是不可迭代的，并且没有定义 `keys()`、`values()` 或 `forEach()`。 如果 `WeakMap` 是可迭代的，那么它的键将是可访问的，并且它不会是弱的。
- 类似地，`WeakMap` 也没有实现 `size` 属性，因为当对象被垃圾回收时，`WeakMap` 的大小可能随时发生变化。
  :::

The intended use of WeakMap is to allow you to associate values with objects without causing memory leaks. Suppose, for example, that you are writing a function that takes an object argument and needs to perform some time-consuming computation on that object. For efficiency, you’d like to cache the computed value for later reuse. If you use a Map object to implement the cache, you will prevent any of the objects from ever being reclaimed, but by using a WeakMap, you avoid this problem. (You can often achieve a similar result using a private Symbol property to cache the computed value directly on the object. See §6.10.3.)

::: tip 翻译
`WeakMap` 的预期用途是允许您将值与对象关联起来，而不会导致内存泄漏。 例如，假设您正在编写一个接受对象参数的函数，并且需要对该对象执行一些耗时的计算。 为了提高效率，您希望缓存计算值以供以后重用。 如果您使用 `Map` 对象来实现缓存，您将阻止任何对象被回收，但通过使用 `WeakMap`，您可以避免这个问题。 （您通常可以使用私有 `Symbol` 属性直接在对象上缓存计算值来获得类似的结果。请参阅第 6.10.3 节。）
:::

WeakSet implements a set of objects that does not prevent those objects from being garbage collected. The `WeakSet()` constructor works like the `Set()` constructor, but WeakSet objects differ from Set objects in the same ways that WeakMap objects differ from Map objects:

- WeakSet does not allow primitive values as members.
- WeakSet implements only the `add()`, `has()`, and `delete()` methods and is not iterable.
- WeakSet does not have a `size` property.

::: tip 翻译
`WeakSet` 实现了一组不会阻止其成员被垃圾收集的对象。 `WeakSet()` 构造函数就像 `Set()` 构造函数一样，但 `WeakSet` 对象与 `Set` 对象的不同之处与 `WeakMap` 对象与 `Map` 对象的不同之处相同：

- `WeakSet` 不允许原始值作为成员。
- `WeakSet` 只实现了 `add()`,`has()` 和 `delete()` 方法，并且是不可迭代的。
- `WeakSet` 没有 `size` 属性。
  :::

WeakSet is not frequently used: its use cases are like those for WeakMap. If you want to mark (or “brand”) an object as having some special property or type, for example, you could add it to a WeakSet. Then, elsewhere, when you want to check for that property or type, you can test for membership in that WeakSet. Doing this with a regular set would prevent all marked objects from being garbage collected, but this is not a concern when using WeakSet.

::: tip 翻译
`WeakSet` 并不经常使用：它的用例与 `WeakMap` 类似。 例如，如果您想将一个对象标记（或“标记”）为具有某些特殊属性或类型，您可以将其添加到 `WeakSet` 中。 然后，在其他地方，当您想要检查该属性或类型时，可以测试该 `WeakSet` 中的成员资格。 使用常规集合执行此操作将阻止所有标记的对象被垃圾收集，但在使用 `WeakSet` 时这不是问题。
:::

## 类型化数组和二进制数据

Regular JavaScript arrays can have elements of any type and can grow or shrink dynamically. JavaScript implementations perform lots of optimizations so that typical uses of JavaScript arrays are very fast. Nevertheless, they are still quite different from the array types of lower-level languages like C and Java. _Typed arrays_, which are new in ES6, are much closer to the low-level arrays of those languages. Typed arrays are not technically arrays (`Array.isArray()` returns false for them), but they implement all of the array methods described in §7.8 plus a few more of their own. They differ from regular arrays in some very important ways, however:

- The elements of a typed array are all numbers. Unlike regular JavaScript numbers, however, typed arrays allow you to specify the type (signed and unsigned integers and IEEE-754 floating point) and size (8 bits to 64 bits) of the numbers to be stored in the array.
- You must specify the length of a typed array when you create it, and that length can never change.
- The elements of a typed array are always initialized to 0 when the array is created.

::: tip 翻译
常规 JavaScript 数组可以包含任何类型的元素，并且可以动态增长或收缩。 JavaScript 实现执行了大量优化，因此 JavaScript 数组的典型使用速度非常快。 尽管如此，它们与 C、Java 等低级语言的数组类型仍然有很大不同。 ES6 中新增的 _类型化数组_ 更接近这些语言的低级数组。 从技术上讲，类型化数组不是数组（`Array.isArray()` 为它们返回 false），但它们实现了第 7.8 节中描述的所有数组方法以及它们自己的一些方法。 然而，它们在一些非常重要的方面与常规数组不同：

- 类型化数组的元素都是数字。 然而，与常规 JavaScript 数字不同，类型化数组允许您指定要存储在数组中的数字的类型（有符号和无符号整数以及 IEEE-754 浮点）和大小（8 位到 64 位）。
- 创建类型化数组时必须指定其长度，并且该长度永远不能更改。
- 创建数组时，类型化数组的元素始终初始化为 0。
  :::

### 类型化数组类型

JavaScript does not define a TypedArray class. Instead, there are 11 kinds of typed arrays, each with a different element type and constructor:

::: tip 翻译
JavaScript 没有定义 TypedArray 类。 相反，有 11 种类型化数组，每种都有不同的元素类型和构造函数：
:::

| Constructor         | Numeric type                                             |
| ------------------- | -------------------------------------------------------- |
| Int8Array()         | signed bytes                                             |
| Uint8Array()        | unsigned bytes                                           |
| Uint8ClampedArray() | unsigned bytes without rollover                          |
| Int16Array()        | signed 16-bit short integers                             |
| Uint16Array()       | unsigned 16-bit short integers                           |
| Int32Array()        | signed 32-bit integers                                   |
| Uint32Array()       | unsigned 32-bit integers                                 |
| BigInt64Array()     | signed 64-bit BigInt values (ES2020)                     |
| BigUint64Array()    | unsigned 64-bit BigInt values (ES2020)                   |
| Float32Array()      | 32-bit floating-point value                              |
| Float64Array()      | 64-bit floating-point value: a regular JavaScript number |

The types whose names begin with `Int` hold signed integers, of 1, 2, or 4 bytes (8, 16, or 32 bits). The types whose names begin with `Uint` hold unsigned integers of those same lengths. The “BigInt” and “BigUint” types hold 64-bit integers, represented in JavaScript as BigInt values (see §3.2.5). The types that begin with `Float` hold floating point numbers. The elements of a `Float64Array` are of the same type as regular JavaScript numbers. The elements of a `Float32Array` have lower precision and a smaller range but require only half the memory. (This type is called `float` in C and Java.)

::: tip 翻译
名称以 `Int` 开头的类型包含 1、2 或 4 字节（8、16 或 32 位）的有符号整数。 名称以 `Uint` 开头的类型保存相同长度的无符号整数。 `BigInt` 和 `BigUint` 类型保存 64 位整数，在 JavaScript 中表示为 `BigInt` 值（请参见第 3.2.5 节）。 以 `Float` 开头的类型保存浮点数。 `Float64Array` 的元素与常规 JavaScript 数字具有相同的类型。 `Float32Array` 的元素具有较低的精度和较小的范围，但只需要一半的内存。 （这种类型在 C 和 Java 中称为 `float`。）
:::

`Uint8ClampedArray` is a special-case variant on `Uint8Array`. Both of these types hold unsigned bytes and can represent numbers between 0 and 255. With `Uint8Array`, if you store a value larger than 255 or less than zero into an array element, it “wraps around,” and you get some other value. This is how computer memory works at a low level, so this is very fast. `Uint8ClampedArray` does some extra type checking so that, if you store a value greater than 255 or less than 0, it “clamps” to 255 or 0 and does not wrap around. (This clamping behavior is required by the HTML `<canvas>` element’s low-level API for manipulating pixel colors.)

::: tip 翻译
`Uint8ClampedArray` 是 `Uint8Array` 的一个特殊变体。 这两种类型都保存无符号字节，可以表示 0 到 255 之间的数字。使用 `Uint8Array`，如果您将大于 255 或小于零的值存储到数组元素中，它会“环绕”，并且您会得到一些其他值 。 这就是计算机内存在低级别上的工作方式，因此速度非常快。 `Uint8ClampedArray` 会进行一些额外的类型检查，这样，如果您存储大于 255 或小于 0 的值，它会“钳位”到 255 或 0 并且不会回绕。 （HTML `<canvas>` 元素的低级 API 需要这种夹紧行为来操作像素颜色。）
:::

Each of the typed array constructors has a `BYTES_PER_ELEMENT` property with the value 1, 2, 4, or 8, depending on the type.

::: tip 翻译
每个类型化数组构造函数都有一个 `BYTES_PER_ELEMENT` 属性，其值为 1、2、4 或 8，具体取决于类型。
:::

### 创建类型化数组

The simplest way to create a typed array is to call the appropriate constructor with one numeric argument that specifies the number of elements you want in the array:

::: tip 翻译
创建类型化数组的最简单方法是使用一个数字参数调用适当的构造函数，该数字参数指定数组中所需元素的数量：
:::

```js
let bytes = new Uint8Array(1024); // 1024 bytes
let matrix = new Float64Array(9); // A 3x3 matrix
let point = new Int16Array(3); // A point in 3D space
let rgba = new Uint8ClampedArray(4); // a 4-byte RGBA pixel value
let sudoku = new Int8Array(81); // A 9x9 sudoku board
```

When you create typed arrays in this way, the array elements are all guaranteed to be initialized to `0`, `0n`, or `0.0`. But if you know the values you want in your typed array, you can also specify those values when you create the array. Each of the typed array constructors has static `from()` and `of()` factory methods that work like `Array.from()` and `Array.of()`:

::: tip 翻译
当您以这种方式创建类型化数组时，数组元素都保证被初始化为 `0`、`0n` 或 `0.0`。 但是，如果您知道类型化数组中所需的值，则也可以在创建数组时指定这些值。 每个类型化数组构造函数都有静态`from()` 和 `of()` 工厂方法，其工作方式类似于 `Array.from()` 和 `Array.of()`：
:::

```js
let white = Uint8ClampedArray.of(255, 255, 255, 0); // RGBA opaque white
```

Recall that the `Array.from()` factory method expects an array-like or iterable object as its first argument. The same is true for the typed array variants, except that the iterable or array-like object must also have numeric elements. Strings are iterable, for example, but it would make no sense to pass them to the `from()` factory method of a typed array.

::: tip 翻译
回想一下，`Array.from()` 工厂方法需要一个类似数组或可迭代的对象作为其第一个参数。 对于类型化数组变体来说，也是如此，只是可迭代或类似数组的对象也必须具有数字元素。 例如，字符串是可迭代的，但将它们传递给类型化数组的 `from()` 工厂方法是没有意义的。
:::

If you are just using the one-argument version of `from()`, you can drop the `.from` and pass your iterable or array-like object directly to the constructor function, which behaves exactly the same. Note that both the constructor and the `from()` factory method allow you to copy existing typed arrays, while possibly changing the type:

::: tip 翻译
如果您仅使用 `from()` 的单参数版本，则可以删除 `.from` 并将可迭代或类似数组的对象直接传递给构造函数，其行为完全相同。 请注意，构造函数和 `from()` 工厂方法都允许您复制现有的类型化数组，同时可能更改类型：
:::

```js
let ints = Uint32Array.from(white); // The same 4 numbers, but as ints
```

When you create a new typed array from an existing array, iterable, or array-like object, the values may be truncated in order to fit the type constraints of your array. There are no warnings or errors when this happens:

::: tip 翻译
当您从现有数组、可迭代或类似数组的对象创建新的类型化数组时，这些值可能会被截断以适应数组的类型约束。 发生这种情况时不会出现警告或错误：
:::

```js
// Floats truncated to ints, longer ints truncated to 8 bits
Uint8Array.of(1.23, 2.99, 45000); // => new Uint8Array([1, 2, 200])
```

Finally, there is one more way to create typed arrays that involves the ArrayBuffer type. An ArrayBuffer is an opaque reference to a chunk of memory. You can create one with the constructor; just pass in the number of bytes of memory you’d like to allocate:

::: tip 翻译
最后，还有另一种创建类型化数组的方法，涉及 `ArrayBuffer` 类型。 `ArrayBuffer` 是对内存块的不透明引用。 您可以使用构造函数创建一个； 只需传入您想要分配的内存字节数：
:::

```js
let buffer = new ArrayBuffer(1024 * 1024);
buffer.byteLength; // => 1024*1024; one megabyte of memory
```

The ArrayBuffer class does not allow you to read or write any of the bytes that you have allocated. But you can create typed arrays that use the buffer’s memory and that do allow you to read and write that memory. To do this, call the typed array constructor with an ArrayBuffer as the first argument, a byte offset within the array buffer as the second argument, and the array length (in elements, not in bytes) as the third argument. The second and third arguments are optional. If you omit both, then the array will use all of the memory in the array buffer. If you omit only the length argument, then your array will use all of the available memory between the start position and the end of the array. One more thing to bear in mind about this form of the typed array constructor: arrays must be memory aligned, so if you specify a byte offset, the value should be a multiple of the size of your type. The `Int32Array()` constructor requires a multiple of four, for example, and the `Float64Array()` requires a multiple of eight.

::: tip 翻译
`ArrayBuffer` 类不允许您读取或写入已分配的任何字节。 但是您可以创建使用缓冲区内存的类型化数组，并且允许您读取和写入该内存。 为此，请使用 `ArrayBuffer` 作为第一个参数、数组缓冲区内的字节偏移量作为第二个参数以及数组长度（以元素为单位，而不是以字节为单位）作为第三个参数来调用类型化数组构造函数。 第二个和第三个参数是可选的。 如果省略两者，则数组将使用数组缓冲区中的所有内存。 如果仅省略长度参数，则数组将使用数组起始位置和末尾之间的所有可用内存。 关于这种形式的类型化数组构造函数，还要记住一件事：数组必须是内存对齐的，因此如果指定字节偏移量，则该值应该是类型大小的倍数。 例如，`Int32Array()` 构造函数需要四的倍数，而 `Float64Array()` 则需要八的倍数。
:::

Given the ArrayBuffer created earlier, you could create typed arrays like these:

::: tip 翻译
鉴于之前创建的 `ArrayBuffer`，您可以创建如下所示的类型化数组：
:::

```js
let asbytes = new Uint8Array(buffer); // Viewed as bytes
let asints = new Uint32Array(buffer); // Viewed as 32-bit signed ints
let lastK = new Uint8Array(buffer, 1023 * 1024); // Last kilobyte as bytes
let ints2 = new Int32Array(buffer, 1024, 256); // 2nd kilobyte as 256 integers
```

These four typed arrays offer four different views into the memory represented by the ArrayBuffer. It is important to understand that all typed arrays have an underlying ArrayBuffer, even if you do not explicitly specify one. If you call a typed array constructor without passing a buffer object, a buffer of the appropriate size will be automatically created. As described later, the `buffer` property of any typed array refers to its underlying ArrayBuffer object. The reason to work directly with ArrayBuffer objects is that sometimes you may want to have multiple typed array views of a single buffer.

::: tip 翻译
这四个类型化数组为 `ArrayBuffer` 所表示的内存提供了四种不同的视图。 重要的是要理解所有类型化数组都有一个底层 `ArrayBuffer`，即使您没有显式指定它也是如此。 如果调用类型化数组构造函数而不传递缓冲区对象，则会自动创建适当大小的缓冲区。 如下所述，任何类型化数组的 `buffer` 属性均指其底层 `ArrayBuffer` 对象。 直接使用 `ArrayBuffer` 对象的原因是有时您可能希望拥有单个缓冲区的多个类型化数组视图。
:::

### 使用类型化数组

Once you have created a typed array, you can read and write its elements with regular square-bracket notation, just as you would with any other array-like object:

::: tip 翻译
创建类型化数组后，您可以使用常规方括号表示法读取和写入其元素，就像处理任何其他类似数组的对象一样：
:::

```js
// Return the largest prime smaller than n, using the sieve of Eratosthenes
function sieve(n) {
  let a = new Uint8Array(n + 1); // a[x] will be 1 if x is composite
  let max = Math.floor(Math.sqrt(n)); // Don't do factors higher than this
  let p = 2; // 2 is the first prime
  while (p <= max) {
    // For primes less than max
    for (let i = 2 * p; i <= n; i += p) {
      // Mark multiples of p as composite
      a[i] = 1;
    }
    while (a[++p] /* empty */); // The next unmarked index is prime
  }
  while (a[n]) n--; // Loop backward to find the last prime
  return n; // Add return it
}
```

The function here computes the largest prime number smaller than the number you specify. The code is exactly the same as it would be with a regular JavaScript array, but using `Uint8Array()` instead of `Array()` makes the code run more than four times faster and use eight times less memory in my testing.

::: tip 翻译
这里的函数计算小于您指定的数字的最大素数。 该代码与常规 JavaScript 数组完全相同，但在我的测试中使用 `Uint8Array()` 而不是 `Array()` 使代码运行速度提高四倍以上，并且使用的内存减少八倍。
:::

Typed arrays are not true arrays, but they re-implement most array methods, so you can use them pretty much just like you’d use regular arrays:

::: tip 翻译
类型化数组不是真正的数组，但它们重新实现了大多数数组方法，因此您可以像使用常规数组一样使用它们：
:::

```js
let ints = new Int16Array(10); // 10 short integers
ints
  .fill(3)
  .map((x) => x * x)
  .join(""); // => '9999999999'
```

Remember that typed arrays have fixed lengths, so the `length` property is read-only, and methods that change the length of the array (such as `push()`, `pop()`, `unshift()`, `shift()`, and `splice()`) are not implemented for typed arrays. Methods that alter the contents of an array without changing the length (such as `sort()`, `reverse()`, and `fill()`) are implemented. Methods like `map()` and `slice()` that return new arrays return a typed array of the same type as the one they are called on.

::: tip 翻译
请记住，类型化数组具有固定长度，因此 `length` 属性是只读的，以及更改数组长度的方法（例如 `push()`、`pop()`、`unshift()`、`shift()` 和 `splice()`) 没有针对类型化数组实现。 实现了更改数组内容而不更改长度的方法（例如 `sort()`、`reverse()` 和 `fill()`）。 像 `map()` 和 `slice()` 这样返回新数组的方法会返回一个与调用它们的类型相同的类型化数组。
:::

### 类型化数组的方法和属性

In addition to standard array methods, typed arrays also implement a few methods of their own. The `set()` method sets multiple elements of a typed array at once by copying the elements of a regular or typed array into a typed array:

::: tip 翻译
除了标准数组方法之外，类型化数组还实现了一些自己的方法。 `set()` 方法通过将常规或类型化数组的元素复制到类型化数组中来一次设置类型化数组的多个元素：
:::

```js
let bytes = new Uint8Array(1024); // A 1k buffer
let pattern = new Uint8Array([0, 1, 2, 3]); // An array of 4 bytes
bytes.set(pattern); // Copy them to the start of another byte array
bytes.set(pattern, 4); // Copy them again at a different offset
bytes.set([0, 1, 2, 3], 8); // Or just copy values direct from a regular array
bytes.slice(0, 12); // => new Uint8Array([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3])
```

The `set()` method takes an array or typed array as its first argument and an element offset as its optional second argument, which defaults to 0 if left unspecified. If you are copying values from one typed array to another, the operation will likely be extremely fast.

::: tip 翻译
`set()` 方法将数组或类型化数组作为其第一个参数，将元素偏移量作为其可选的第二个参数，如果未指定，则默认为 0。 如果将值从一个类型化数组复制到另一个类型化数组，则操作可能会非常快。
:::

Typed arrays also have a subarray method that returns a portion of the array on which it is called:

::: tip 翻译
类型化数组还有一个子数组方法，它返回调用它的数组的一部分：
:::

```js
let ints = new Int16Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]); // 10 short integers
let last3 = ints.subarray(ints.length - 3, ints.length); // Last 3 of them
last3[0]; // => 7: this is the same as ints[7]
```

`subarray()` takes the same arguments as the `slice()` method and seems to work the same way. But there is an important difference. `slice()` returns the specified elements in a new, independent typed array that does not share memory with the original array. `subarray()` does not copy any memory; it just returns a new view of the same underlying values:

::: tip 翻译
`subarray()` 采用与 `slice()` 方法相同的参数，并且似乎以相同的方式工作。 但有一个重要的区别。 `slice()` 返回一个新的独立类型数组中的指定元素，该数组不与原始数组共享内存。 `subarray()` 不会复制任何内存； 它只是返回相同基础值的新视图：
:::

```js
ints[9] = -1; // Change a value in the original array and...
last3[2]; // => -1: it also changes in the subarray
```

The fact that the `subarray()` method returns a new view of an existing array brings us back to the topic of ArrayBuffers. Every typed array has three properties that relate to the underlying buffer:

::: tip 翻译
事实上，`subarray()` 方法返回现有数组的新视图，这让我们回到了 `ArrayBuffers` 的主题。 每个类型化数组都具有与底层缓冲区相关的三个属性：
:::

```js
last3.buffer; // The ArrayBuffer object for a typed array
last3.buffer === ints.buffer; // => true: both are views of the same buffer
last3.byteOffset; // => 14: this view starts at byte 14 of the buffer
last3.byteLength; // => 6: this view is 6 bytes (3 16-bit ints) long
last3.buffer.byteLength; // => 20: but the underlying buffer has 20 bytes
```

The `buffer` property is the ArrayBuffer of the array. `byteOffset` is the starting position of the array’s data within the underlying buffer. And `byteLength` is the length of the array’s data in bytes. For any typed array, a, this invariant should always be true:

::: tip 翻译
`buffer` 属性是数组的 `ArrayBuffer`。 `byteOffset` 是底层缓冲区中数组数据的起始位置。 `byteLength` 是数组数据的长度（以字节为单位）。 对于任何类型化数组 `a`，这个不变量应该始终为 `true：`
:::

```js
a.length * a.BYTES_PER_ELEMENT === a.byteLength; // => true
```

ArrayBuffers are just opaque chunks of bytes. You can access those bytes with typed arrays, but an ArrayBuffer is not itself a typed array. Be careful, however: you can use numeric array indexing with ArrayBuffers just as you can with any JavaScript object. Doing so does not give you access to the bytes in the buffer, but it can cause confusing bugs:

::: tip 翻译
`ArrayBuffers` 只是不透明的字节块。 您可以使用类型化数组访问这些字节，但 `ArrayBuffer` 本身并不是类型化数组。 但要小心：您可以将数字数组索引与 `ArrayBuffer` 一起使用，就像对任何 JavaScript 对象一样。 这样做不会让您访问缓冲区中的字节，但可能会导致令人困惑的错误：
:::

```js
let bytes = new Uint8Array(8);
bytes[0] = 1; // Set the first byte to 1
bytes.buffer[0]; // => undefined: buffer doesn't have index 0
bytes.buffer[1] = 255; // Try incorrectly to set a byte in the buffer
bytes.buffer[1]; // => 255: this just sets a regular JS property
bytes[1]; // => 0: this line above did not set the byte
```

We saw previously that you can create an ArrayBuffer with the `ArrayBuffer()` constructor and then create typed arrays that use that buffer. Another approach is to create an initial typed array, then use the buffer of that array to create other views:

::: tip 翻译
我们之前看到，您可以使用 `ArrayBuffer()` 构造函数创建 `ArrayBuffer`，然后创建使用该缓冲区的类型化数组。 另一种方法是创建一个初始类型数组，然后使用该数组的缓冲区来创建其他视图：
:::

```js
let bytes = new Uint8Array(1024);
let ints = new Uint32Array(bytes.buffer); // or 256 integers
let floats = new Float64Array(bytes.buffer); // or 128 doubles
```

### DataView 和 字节顺序

Typed arrays allow you to view the same sequence of bytes in chunks of 8, 16, 32, or 64 bits. This exposes the “endianness”: the order in which bytes are arranged into longer words. For efficiency, typed arrays use the native endianness of the underlying hardware. On little-endian systems, the bytes of a number are arranged in an ArrayBuffer from least significant to most significant. On big-endian platforms, the bytes are arranged from most significant to least significant. You can determine the endianness of the underlying platform with code like this:

::: tip 翻译
类型化数组允许您以 8、16、32 或 64 位块的形式查看相同的字节序列。 这暴露了“字节顺序”：字节排列成较长单词的顺序。 为了提高效率，类型化数组使用底层硬件的本机字节序。 在小端系统上，数字的字节按照从最低有效位到最高有效位的顺序排列在 `ArrayBuffer` 中。 在大端平台上，字节按从最高有效到最低有效的顺序排列。 您可以使用如下代码确定底层平台的字节序：
:::

```js
// If the integer 0x00000001 is arranged in memory as 01 00 00 00, then
// we're on a little-endian platform. On a big-endian platform, we'd get
// bytes 00 00 00 01 instead.
let littleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
```

Today, the most common CPU architectures are little-endian. Many network protocols, and some binary file formats, require big-endian byte ordering, however. If you’re using typed arrays with data that came from the network or from a file, you can’t just assume that the platform endianness matches the byte order of the data. In general, when working with external data, you can use Int8Array and Uint8Array to view the data as an array of individual bytes, but you should not use the other typed arrays with multibyte word sizes. Instead, you can use the DataView class, which defines methods for reading and writing values from an ArrayBuffer with explicitly specified byte ordering:

::: tip 翻译
如今，最常见的 CPU 架构是小端的。 然而，许多网络协议和一些二进制文件格式需要大端字节顺序。 如果您将类型化数组与来自网络或文件的数据一起使用，则不能仅仅假设平台字节顺序与数据的字节顺序匹配。 通常，在处理外部数据时，可以使用 `Int8Array` 和 `Uint8Array` 将数据视为单个字节的数组，但不应使用具有多字节字大小的其他类型数组。 相反，您可以使用 `DataView` 类，它定义了从具有显式指定字节顺序的 `ArrayBuffer` 中读取和写入值的方法：
:::

```js
// Assume we have a typed array of bytes of binary data to process. First,
// we create a DataView object so we can flexibly read and write
// values from those bytes
let view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

let int = view.getInt32(0); // Read big-endian signed int from byte 0
int = view.getInt32(4, false); // Next int is also big-endian
int = view.getUint32(8, true); // Next int is little-endian and unsigned
view.setUint32(8, int, false); // Write it back in big-endian format
```

DataView defines 10 get methods for each of the 10 typed array classes (excluding Uint8ClampedArray). They have names like `getInt16()`, `getUint32()`, `getBigInt64()`, and `getFloat64()`. The first argument is the byte offset within the ArrayBuffer at which the value begins. All of these getter methods, other than `getInt8()` and `getUint8()`, accept an optional boolean value as their second argument. If the second argument is omitted or is `false`, big-endian byte ordering is used. If the second argument is `true`, little-endian ordering is used.

::: tip 翻译
`DataView` 为 10 个类型化数组类（不包括 `Uint8ClampedArray`）中的每一个定义了 10 个 `get` 方法。 它们的名称包括 `getInt16()`、 `getUint32()`、`getBigInt64()`和`getFloat64()`。 第一个参数是 `ArrayBuffer` 中值开始的字节偏移量。 除了 `getInt8()` 和 `getUint8()` 之外，所有这些 `getter` 方法都接受可选的布尔值作为其第二个参数。 如果第二个参数被省略或者为 `false`，则使用大端字节顺序。 如果第二个参数为 `true`，则使用小端排序。
:::

DataView also defines 10 corresponding Set methods that write values into the underlying ArrayBuffer. The first argument is the offset at which the value begins. The second argument is the value to write. Each of the methods, except `setInt8()` and `setUint8()`, accepts an optional third argument. If the argument is omitted or is `false`, the value is written in big-endian format with the most significant byte first. If the argument is `true`, the value is written in little-endian format with the least significant byte first.

::: tip 翻译
`DataView` 还定义了 10 个相应的 `Set` 方法，用于将值写入底层 `ArrayBuffer`。 第一个参数是值开始的偏移量。 第二个参数是要写入的值。 除了 `setInt8()` 和 `setUint8()` 之外，每个方法都接受可选的第三个参数。 如果参数被省略或为 `false`，则该值将以大端格式写入，最高有效字节在前。 如果参数为 `true`，则该值将以小端格式写入，最低有效字节在前。
:::

Typed arrays and the DataView class give you all the tools you need to process binary data and enable you to write JavaScript programs that do things like decompressing ZIP files or extracting metadata from JPEG files.

::: tip 翻译
类型化数组和 `DataView` 类为您提供了处理二进制数据所需的所有工具，并使您能够编写 JavaScript 程序来执行解压缩 ZIP 文件或从 JPEG 文件中提取元数据等操作。
:::

## 与正则表达式的模式匹配

A _regular expression_ is an object that describes a textual pattern. The JavaScript RegExp class represents regular expressions, and both String and RegExp define methods that use regular expressions to perform powerful pattern-matching and search-and-replace functions on text. In order to use the RegExp API effectively, however, you must also learn how to describe patterns of text using the regular expression grammar, which is essentially a mini programming language of its own. Fortunately, the JavaScript regular expression grammar is quite similar to the grammar used by many other programming languages, so you may already be familiar with it. (And if you are not, the effort you invest in learning JavaScript regular expressions will probably be useful to you in other programming contexts as well.)

::: tip 翻译
_正则表达式_ 是描述文本模式的对象。 JavaScript `RegExp` 类表示正则表达式，`String` 和 `RegExp` 都定义了使用正则表达式对文本执行强大的模式匹配以及搜索和替换功能的方法。 然而，为了有效地使用 `RegExp` API，您还必须学习如何使用正则表达式语法来描述文本模式，正则表达式语法本质上是一种微型编程语言。 幸运的是，JavaScript 正则表达式语法与许多其他编程语言使用的语法非常相似，因此您可能已经熟悉它了。 （如果您不是，那么您在学习 JavaScript 正则表达式上投入的精力可能在其他编程环境中也对您有用。）
:::

The subsections that follow describe the regular expression grammar first, and then, after explaining how to write regular expressions, they explain how you can use them with methods of the String and RegExp classes.

::: tip 翻译
接下来的小节首先描述正则表达式语法，然后在解释如何编写正则表达式之后，解释如何将它们与 `String` 和 `RegExp` 类的方法一起使用。
:::

### 定义正则表达式

In JavaScript, regular expressions are represented by RegExp objects. RegExp objects may be created with the `RegExp()` constructor, of course, but they are more often created using a special literal syntax. Just as string literals are specified as characters within quotation marks, regular expression literals are specified as characters within a pair of slash (`/`) characters. Thus, your JavaScript code may contain lines like this:

::: tip 翻译
在 JavaScript 中，正则表达式由 `RegExp` 对象表示。 当然，`RegExp` 对象可以使用 `RegExp()` 构造函数创建，但它们更经常使用特殊的文字语法创建。 正如字符串文字指定为引号内的字符一样，正则表达式文字指定为一对斜杠 (`/`) 字符内的字符。 因此，您的 JavaScript 代码可能包含如下行：
:::

```js
let pattern = /s$/;
```

This line creates a new RegExp object and assigns it to the variable pattern. This particular RegExp object matches any string that ends with the letter “s.” This regular expression could have equivalently been defined with the `RegExp()` constructor, like this:

::: tip 翻译
此行创建一个新的 `RegExp` 对象并将其分配给变量模式。 这个特定的 `RegExp` 对象匹配任何以字母“s”结尾的字符串。 该正则表达式可以等效地使用 `RegExp()` 构造函数来定义，如下所示：
:::

```js
let pattern = new RegExp("s$");
```

Regular-expression pattern specifications consist of a series of characters. Most characters, including all alphanumeric characters, simply describe characters to be matched literally. Thus, the regular expression `/java/` matches any string that contains the substring “java”. Other characters in regular expressions are not matched literally but have special significance. For example, the regular expression `/s$/` contains two characters. The first, “s”, matches itself literally. The second, “$”, is a special meta character that matches the end of a string. Thus, this regular expression matches any string that contains the letter “s” as its last character.

::: tip 翻译
正则表达式模式规范由一系列字符组成。 大多数字符（包括所有字母数字字符）只是简单地描述要按字面匹配的字符。 因此，正则表达式 `/java/` 匹配任何包含子字符串 `java` 的字符串。 正则表达式中的其他字符不是按字面匹配的，而是具有特殊意义。 例如，正则表达式 `/s$/` 包含两个字符。 第一个“`s`”与字面意思相符。 第二个“`$`”是一个特殊的元字符，与字符串的末尾匹配。 因此，此正则表达式匹配包含字母“`s`”作为最后一个字符的任何字符串。
:::

As we’ll see, regular expressions can also have one or more flag characters that affect how they work. Flags are specified following the second slash character in RegExp literals, or as a second string argument to the `RegExp()` constructor. If we wanted to match strings that end with “`s`” or “`S`”, for example, we could use the `i` flag with our regular expression to indicate that we want case-insensitive matching:

::: tip 翻译
正如我们将看到的，正则表达式还可以具有一个或多个影响其工作方式的标志字符。 标志是在 `RegExp` 文本中的第二个斜杠字符之后指定的，或者作为 `RegExp()` 构造函数的第二个字符串参数指定。 例如，如果我们想要匹配以“`s`”或“`S`”结尾的字符串，我们可以在正则表达式中使用“`i`”标志来指示我们想要不区分大小写的匹配：
:::

```js
let pattern = /s$/i;
```

The following sections describe the various characters and meta-characters used in JavaScript regular expressions.

::: tip 翻译
以下部分描述了 JavaScript 正则表达式中使用的各种字符和元字符。
:::

#### 文字字符

All alphabetic characters and digits match themselves literally in regular expressions. JavaScript regular expression syntax also supports certain nonalphabetic characters through escape sequences that begin with a backslash (`\`). For example, the sequence `\n` matches a literal newline character in a string. Table 11-1 lists these characters.

::: tip 翻译
所有字母字符和数字在正则表达式中都按字面意思匹配。 JavaScript 正则表达式语法还通过以反斜杠 (`\`) 开头的转义序列支持某些非字母字符。 例如，序列 `\n` 匹配字符串中的文字换行符。 表 11-1 列出了这些字符。
:::

_Table 11-1. Regular-expression literal characters_

| Character              | Matches                                                                                                                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Alphanumeric character | Itself                                                                                                                                                                                                 |
| \0                     | The NUL character (\u0000)                                                                                                                                                                             |
| \t                     | Tab (\u0009)                                                                                                                                                                                           |
| \n                     | Newline (\u000A)                                                                                                                                                                                       |
| \v                     | Vertical tab (\u000B)                                                                                                                                                                                  |
| \f                     | Form feed (\u000C)                                                                                                                                                                                     |
| \r                     | Carriage return (\u000D)                                                                                                                                                                               |
| \xnn                   | The Latin character specified by the hexadecimal number nn; for example, \x0A is the same as \n                                                                                                        |
| \uxxxx                 | The Unicode character specified by the hexadecimal number xxxx; for example, \u0009 is the same as \t.                                                                                                 |
| \u{n}                  | The Unicode character specified by the codepoint n, where n is one to six hexadecimal digits between 0 and 10FFFF. Note that this syntax is only supported in regular expressions that use the u flag. |
| \cX                    | The control character ^X; for example, \cJ is equivalent to the newline character \n.                                                                                                                  |

A number of punctuation characters have special meanings in regular expressions. They are:

::: tip 翻译
许多标点符号在正则表达式中具有特殊含义。 他们是：
:::

```js
^ $ . * + ? = ! : | \ / ( ) [ ] { }
```

The meanings of these characters are discussed in the sections that follow. Some of these characters have special meaning only within certain contexts of a regular expression and are treated literally in other contexts. As a general rule, however, if you want to include any of these punctuation characters literally in a regular expression, you must precede them with a `\`. Other punctuation characters, such as quotation marks and `@`, do not have special meaning and simply match themselves literally in a regular expression.

::: tip 翻译
这些字符的含义将在以下各节中讨论。 其中一些字符仅在正则表达式的某些上下文中具有特殊含义，并且在其他上下文中按字面意思处理。 但是，作为一般规则，如果您想在正则表达式中按字面意思包含任何这些标点符号，则必须在它们前面加上 `\`。 其他标点符号，例如引号和 `@`，没有特殊含义，只是在正则表达式中按字面意思进行匹配。
:::

If you can’t remember exactly which punctuation characters need to be escaped with a backslash, you may safely place a backslash before any punctuation character. On the other hand, note that many letters and numbers have special meaning when preceded by a backslash, so any letters or numbers that you want to match literally should not be escaped with a backslash. To include a backslash character literally in a regular expression, you must escape it with a backslash, of course. For example, the following regular expression matches any string that includes a backslash: `/\\/`. (And if you use the `RegExp()` constructor, keep in mind that any backslashes in your regular expression need to be doubled, since strings also use backslashes as an escape character.)

::: tip 翻译
如果您无法准确记住哪些标点字符需要使用反斜杠进行转义，您可以安全地在任何标点字符之前放置一个反斜杠。 另一方面，请注意，许多字母和数字在前面带有反斜杠时具有特殊含义，因此您想要按字面匹配的任何字母或数字不应使用反斜杠进行转义。 当然，要在正则表达式中包含反斜杠字符，您必须使用反斜杠对其进行转义。 例如，以下正则表达式匹配任何包含反斜杠的字符串：`/\\/`。 （如果您使用 `RegExp()` 构造函数，请记住正则表达式中的任何反斜杠都需要加倍，因为字符串也使用反斜杠作为转义字符。）
:::

#### 字符类

Individual literal characters can be combined into _character classes_ by placing them within square brackets. A character class matches any one character that is contained within it. Thus, the regular expression `/[abc]/` matches any one of the letters a, b, or c. Negated character classes can also be defined; these match any character except those contained within the brackets. A negated character class is specified by placing a caret (`^`) as the first character inside the left bracket. The RegExp `/[^abc]/` matches any one character other than a, b, or c. Character classes can use a hyphen to indicate a range of characters. To match any one lowercase character from the Latin alphabet, use `/[a-z]/`, and to match any letter or digit from the Latin alphabet, use `/[a-zA-Z0-9]/`. (And if you want to include an actual hyphen in your character class, simply make it the last character before the right bracket.)

::: tip 翻译
通过将各个文字字符放在方括号内，可以将它们组合成 _字符类_。 字符类匹配其中包含的任何一个字符。 因此，正则表达式 `/[abc]/` 匹配字母 a、b 或 c 中的任意一个。 也可以定义否定的字符类； 它们匹配除括号内包含的字符之外的任何字符。 通过将插入符号 (`^`) 作为左括号内的第一个字符来指定否定字符类。 正则表达式 `/[^abc]/` 匹配除 a、b 或 c 之外的任何一个字符。 字符类可以使用连字符来指示字符范围。 要匹配拉丁字母表中的任何一个小写字符，请使用 `/[a-z]/`，要匹配拉丁字母表中的任何字母或数字，请使用 `/[a-zA-Z0-9]/`。 （如果您想在字符类中包含实际的连字符，只需将其作为右括号之前的最后一个字符即可。）
:::

Because certain character classes are commonly used, the JavaScript regular expression syntax includes special characters and escape sequences to represent these common classes. For example, `\s` matches the space character, the tab character, and any other Unicode whitespace character; `\S` matches any character that is not Unicode whitespace. Table 11-2 lists these characters and summarizes character-class syntax. (Note that several of these character-class escape sequences match only ASCII characters and have not been extended to work with Unicode characters. You can, however, explicitly define your own Unicode character classes; for example, `/[\u0400-\u04FF]/` matches any one Cyrillic character.)

::: tip 翻译
由于某些字符类很常用，因此 JavaScript 正则表达式语法包含特殊字符和转义序列来表示这些常见类。 例如，`\s` 匹配空格字符、制表符和任何其他 Unicode 空白字符； `\S` 匹配任何不是 Unicode 空白的字符。 表 11-2 列出了这些字符并总结了字符类语法。 （请注意，其中一些字符类转义序列仅匹配 ASCII 字符，尚未扩展为可与 Unicode 字符一起使用。但是，您可以显式定义自己的 Unicode 字符类；例如 `/[\u0400-\u04FF ]/` 匹配任何一个西里尔字母字符。）
:::

_Table 11-2. Regular expression character classes_

| Character | Matches                                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [...]     | Any one character between the brackets                                                                                                                               |
| [^...]    | Any one character not between the brackets                                                                                                                           |
| .         | Any character except newline or another Unicode line terminator. Of, if the RegExp uses the s flag, then a period matches any character, including line terminators. |
| \w        | Any ASCII word character. Equivalent to [a-zA-Z0-9_].                                                                                                                |
| \W        | Any character that is not an ASCII word character. Equivalent to [^a-zA-Z0-9_].                                                                                      |
| \s        | Any Unicode whitespace character                                                                                                                                     |
| \S        | Any character that is not Unicode whitespace.                                                                                                                        |
| \d        | Any ASCII digit. Equivalent to [0-9].                                                                                                                                |
| \D        | Any character other than an ASCII digit. Equivalent to [^0-9].                                                                                                       |
| [\b]      | A literal backspace (special case).                                                                                                                                  |

Note that the special character-class escapes can be used within square brackets. `\s` matches any whitespace character, and `\d` matches any digit, so `/[\s\d]/` matches any one whitespace character or digit. Note that there is one special case. As you’ll see later, the `\b` escape has a special meaning. When used within a character class, however, it represents the backspace character. Thus, to represent a backspace character literally in a regular expression, use the character class with one element: `/[\b]/`.

::: tip 翻译
请注意，特殊字符类转义符可以在方括号内使用。 `\s` 匹配任何空白字符，`\d` 匹配任何数字，因此 `/[\s\d]/` 匹配任何一个空白字符或数字。 请注意，有一种特殊情况。 正如您稍后将看到的， `\b` 转义符具有特殊含义。 然而，当在字符类中使用时，它表示退格字符。 因此，要在正则表达式中按字面意思表示退格字符，请使用具有一个元素的字符类：`/[\b]/`。
:::

> **Unicode Character Classes**
> In ES2018, if a regular expression uses the `u` flag, then character classes `\p{...}` and its negation `\P{...}` are supported. (As of early 2020, this is implemented by Node, Chrome, Edge, and Safari, but not Firefox.) These character classes are based on properties defined by the Unicode standard, and the set of characters they represent may change as Unicode evolves.
>
> The `\d` character class matches only ASCII digits. If you want to match one decimal digit from any of the world’s writing systems, you can use `/\p{Decimal_Number}/u`. And if you want to match any one character that is not a decimal digit in any language, you can capitalize the p and write `\P{Decimal_Number}`. If you want to match any number-like character, including fractions and roman numerals, you can use `\p{Number}`. Note that “Decimal_Number” and “Number” are not specific to JavaScript or to regular expression grammar: it is the name of a category of characters defined by the Unicode standard.
>
> The `\w` character class only works for ASCII text, but with `\p`, we can approximate an internationalized version like this:
>
> ```js
> /[\p{Alphabetic}\p{Decimal_Number}\p{Mark}]/u;
> ```
>
> (Though to be fully compatible with the complexity of the world’s languages, we really need to add in the categories “Connector_Punctuation” and “Join_Control” as well.)
>
> As a final example, the `\p` syntax also allows us to define regular expressions that match characters from a particular alphabet or script:
>
> ```js
> let greekLetter = /\p{Script=Greek}/u;
> let cyrillicLetter = /\p{Script=Cyrillic}/u;
> ```

> **Unicode 字符类**
> 在 ES2018 中，如果正则表达式使用 `u` 标志，则支持字符类 `\p{...}` 及其否定 `\P{...}`。 （截至 2020 年初，Node、Chrome、Edge 和 Safari 实现了这一点，但 Firefox 尚未实现。）这些字符类基于 Unicode 标准定义的属性，它们表示的字符集可能会随着 Unicode 的发展而变化。
>
> `\d` 字符类仅匹配 ASCII 数字。 如果您想匹配世界上任何一种书写系统中的一位十进制数字，您可以使用 `/\p{Decimal_Number}/u`。 如果您想匹配任何语言中非十进制数字的任何一个字符，您可以将 p 大写并写入`P{Decimal_Number}`。 如果要匹配任何类似数字的字符，包括分数和罗马数字，可以使用`\p{Number}`。 请注意，`Decimal_Number` 和 `Number` 并非特定于 JavaScript 或正则表达式语法：它是 Unicode 标准定义的一类字符的名称。
>
> `\w` 字符类仅适用于 ASCII 文本，但是使用 `\p`，我们可以近似为国际化版本，如下所示：
>
> ```js
> /[\p{Alphabetic}\p{Decimal_Number}\p{Mark}]/u;
> ```
>
> （尽管为了完全兼容世界语言的复杂性，我们确实还需要添加“Connector_Punctuation”和“Join_Control”类别。）
>
> 作为最后一个示例，`\p` 语法还允许我们定义匹配特定字母或脚本中的字符的正则表达式：
>
> ```js
> let greekLetter = /\p{Script=Greek}/u;
> let cyrillicLetter = /\p{Script=Cyrillic}/u;
> ```

#### 重复

With the regular expression syntax you’ve learned so far, you can describe a two-digit number as `/\d\d/` and a four-digit number as `/\d\d\d\d/`. But you don’t have any way to describe, for example, a number that can have any number of digits or a string of three letters followed by an optional digit. These more complex patterns use regular expression syntax that specifies how many times an element of a regular expression may be repeated.

::: tip 翻译
使用目前为止学到的正则表达式语法，您可以将两位数字描述为 `/\d\d/`，将四位数字描述为 `/\d\d\d\d/`。 但你没有任何方法来描述，例如，一个可以有任意位数的数字或一个由三个字母组成的字符串，后跟一个可选的数字。 这些更复杂的模式使用正则表达式语法来指定正则表达式的元素可以重复多少次。
:::

The characters that specify repetition always follow the pattern to which they are being applied. Because certain types of repetition are quite commonly used, there are special characters to represent these cases. For example, `+` matches one or more occurrences of the previous pattern.

::: tip 翻译
指定重复的字符始终遵循它们所应用的模式。 由于某些类型的重复非常常用，因此有特殊字符来表示这些情况。 例如，`+` 匹配前一个模式的一次或多次出现。
:::

Table 11-3 summarizes the repetition syntax.

::: tip 翻译
表 11-3 总结了重复语法。
:::

_Table 11-3. Regular expression repetition characters_

| Character | Meaning                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------- |
| {n,m}     | Match the previous item at least n times but no more than m times.                                               |
| {n,}      | Match the previous item n or more times.                                                                         |
| {n}       | Match exactly n occurrences of the previous item.                                                                |
| ?         | Match zero or one occurrences of the previous item. That is, the previous item is optional. Equivalent to {0,1}. |
| +         | Match one or more occurrences of the previous item. Equivalent to {1, }.                                         |
| \*        | Match zero or more occurrences of the previous item. Equivalent to {0, }.                                        |

The following lines show some examples:

::: tip 翻译
以下几行显示了一些示例：
:::

```js
let r = /\d{2,4}/; // Match between two and four digits
r = /\w{3}\d?/; // Match exactly three word characters and an optional digit
r = /\s+java\s+/; // Match "java" with one or more spaces before and after
r = /[^(]*/; // Match zero or more characters that are not open parens
```

Note that in all of these examples, the repetition specifiers apply to the single character or character class that precedes them. If you want to match repetitions of more complicated expressions, you’ll need to define a group with parentheses, which are explained in the following sections.

::: tip 翻译
请注意，在所有这些示例中，重复说明符适用于它们前面的单个字符或字符类。 如果要匹配更复杂表达式的重复，则需要使用括号定义一个组，这将在以下部分中进行解释。
:::

Be careful when using the `*` and `?` repetition characters. Since these characters may match zero instances of whatever precedes them, they are allowed to match nothing. For example, the regular expression `/a*/` actually matches the string “bbbb” because the string contains zero occurrences of the letter a!

::: tip 翻译
使用 `*` 和 `?` 重复字符时要小心。 由于这些字符可能与它们前面的任何字符匹配零个实例，因此允许它们不匹配任何内容。 例如，正则表达式`/a*/` 实际上匹配字符串 `bbbb`，因为该字符串包含零次出现的字母`a`！
:::

#### 非贪婪重复

The repetition characters listed in Table 11-3 match as many times as possible while still allowing any following parts of the regular expression to match. We say that this repetition is “greedy.” It is also possible to specify that repetition should be done in a non-greedy way. Simply follow the repetition character or characters with a question mark: `??`, `+?`, `*?`, or even `{1,5}?`. For example, the regular expression `/a+/` matches one or more occurrences of the letter a. When applied to the string “aaa”, it matches all three letters. But `/a+?/` matches one or more occurrences of the letter a, matching as few characters as necessary. When applied to the same string, this pattern matches only the first letter a.

::: tip 翻译
表 11-3 中列出的重复字符尽可能多次匹配，同时仍允许正则表达式的任何后续部分匹配。 我们说这种重复是“贪婪的”。 还可以指定重复应该以非贪婪的方式完成。 只需在重复字符后面加上问号：`??`、`+？`、`*？`，甚至 `{1,5}？`。 例如，正则表达式 `/a+/` 匹配字母 `a` 的一次或多次出现。 当应用于字符串 `aaa` 时，它匹配所有三个字母。 但 `/a+?/` 匹配字母 `a` 的一次或多次出现，并根据需要匹配尽可能少的字符。 当应用于同一字符串时，此模式仅匹配第一个字母 `a`。
:::

Using non-greedy repetition may not always produce the results you expect. Consider the pattern `/a+b/`, which matches one or more a’s, followed by the letter b. When applied to the string “aaab”, it matches the entire string. Now let’s use the non-greedy version: `/a+?b/`. This should match the letter b preceded by the fewest number of a’s possible. When applied to the same string “aaab”, you might expect it to match only one a and the last letter b. In fact, however, this pattern matches the entire string, just like the greedy version of the pattern. This is because regular expression pattern matching is done by finding the first position in the string at which a match is possible. Since a match is possible starting at the first character of the string, shorter matches starting at subsequent characters are never even considered.

::: tip 翻译
使用非贪婪重复可能并不总能产生您期望的结果。 考虑模式 `/a+b/`，它匹配一个或多个 `a`，后跟字母 `b`。 当应用于字符串 `aaab` 时，它匹配整个字符串。 现在让我们使用非贪婪版本：`/a+?b/`。 这应该与字母 `b` 匹配，字母 `b` 前面有尽可能少的 a。 当应用于同一字符串`aaab` 时，您可能期望它仅匹配一个 `a` 和最后一个字母 `b`。 然而事实上，这个模式匹配整个字符串，就像该模式的贪婪版本一样。 这是因为正则表达式模式匹配是通过查找字符串中可能匹配的第一个位置来完成的。 由于匹配可能从字符串的第一个字符开始，因此从不考虑从后续字符开始的较短匹配。
:::

#### 交替、分组和引用

The regular expression grammar includes special characters for specifying alternatives, grouping subexpressions, and referring to previous subexpressions. The `|` character separates alternatives. For example, `/ab|cd|ef/` matches the string “ab” or the string “cd” or the string “ef ”. And `/\d{3}|[a-z]{4}/` matches either three digits or four lowercase letters.

::: tip 翻译
正则表达式语法包括用于指定替代项、对子表达式进行分组以及引用先前子表达式的特殊字符。 `|` 字符分隔替代项。 例如，`/ab|cd|ef/` 匹配字符串“ab”或字符串“cd”或字符串“ef”。 `/\d{3}|[a-z]{4}/` 匹配三个数字或四个小写字母。
:::

Note that alternatives are considered left to right until a match is found. If the left alternative matches, the right alternative is ignored, even if it would have produced a “better” match. Thus, when the pattern `/a|ab/` is applied to the string “ab”, it matches only the first letter.

::: tip 翻译
请注意，在找到匹配项之前，将从左到右考虑替代项。 如果左侧替代项匹配，则右侧替代项将被忽略，即使它会产生“更好”的匹配。 因此，当模式 `/a|ab/` 应用于字符串“ab”时，它仅匹配第一个字母。
:::

Parentheses have several purposes in regular expressions. One purpose is to group separate items into a single subexpression so that the items can be treated as a single unit by `|`, `*`, `+`, `?`, and so on. For example, `/java(script)?/` matches “java” followed by the optional “script”. And `/(ab|cd)+|ef/` matches either the string “ef ” or one or more repetitions of either of the strings “ab” or “cd”.

::: tip 翻译
括号在正则表达式中有多种用途。 一个目的是将单独的项目分组到单个子表达式中，以便可以通过 `|`、`*`、`+`、`?` 等将这些项目视为单个单元。 例如，`/java(script)?/` 匹配“java”，后跟可选的“script”。 `/(ab|cd)+|ef/` 匹配字符串“ef”或字符串“ab”或“cd”的一次或多次重复。
:::

Another purpose of parentheses in regular expressions is to define subpatterns within the complete pattern. When a regular expression is successfully matched against a target string, it is possible to extract the portions of the target string that matched any particular parenthesized subpattern. (You’ll see how these matching substrings are obtained later in this section.) For example, suppose you are looking for one or more lowercase letters followed by one or more digits. You might use the pattern `/[a-z]+\d+/`. But suppose you only really care about the digits at the end of each match. If you put that part of the pattern in parentheses (`/[a-z]+(\d+)/`), you can extract the digits from any matches you find, as explained later.

::: tip 翻译
正则表达式中括号的另一个用途是定义完整模式中的子模式。 当正则表达式与目标字符串成功匹配时，可以提取与任何特定括号子模式匹配的目标字符串部分。 （您将在本节后面看到如何获取这些匹配的子字符串。）例如，假设您正在查找一个或多个小写字母，后跟一个或多个数字。 您可以使用模式 `/[a-z]+\d+/`。 但假设您只关心每场比赛结束时的数字。 如果将模式的该部分放在括号中 (`/[a-z]+(\d+)/`)，则可以从找到的任何匹配项中提取数字，如下所述。
:::

A related use of parenthesized subexpressions is to allow you to refer back to a subexpression later in the same regular expression. This is done by following a `\` character by a digit or digits. The digits refer to the position of the parenthesized subexpression within the regular expression. For example, `\1` refers back to the first subexpression, and `\3` refers to the third. Note that, because subexpressions can be nested within others, it is the position of the left parenthesis that is counted. In the following regular expression, for example, the nested subexpression (`[Ss]cript`) is referred to as `\2`:

::: tip 翻译
带括号的子表达式的一个相关用途是允许您稍后在同一正则表达式中引用子表达式。 这是通过在 `\` 字符后跟一个或多个数字来完成的。 这些数字指的是正则表达式中带括号的子表达式的位置。 例如，`\1`引用第一个子表达式，`\3`引用第三个子表达式。 请注意，由于子表达式可以嵌套在其他子表达式中，因此计算的是左括号的位置。 例如，在以下正则表达式中，嵌套子表达式 (`[Ss]cript`) 称为 `\2`：
:::

```js
/([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/;
```

A reference to a previous subexpression of a regular expression does _not_ refer to the pattern for that subexpression but rather to the text that matched the pattern. Thus, references can be used to enforce a constraint that separate portions of a string contain exactly the same characters. For example, the following regular expression matches zero or more characters within single or double quotes. However, it does not require the opening and closing quotes to match (i.e., both single quotes or both double quotes):

::: tip 翻译
对正则表达式的前一个子表达式的引用并不是指该子表达式的模式，而是指与该模式匹配的文本。 因此，引用可用于强制约束字符串的各个部分包含完全相同的字符。 例如，以下正则表达式匹配单引号或双引号内的零个或多个字符。 但是，它不需要左引号和右引号匹配（即两个单引号或两个双引号）：
:::

```js
/['"][^'"]*['"]/;
```

To require the quotes to match, use a reference:

::: tip 翻译
要要求引号匹配，请使用引用：
:::

```js
/(['"])[^'"]*\1/;
```

The `\1` matches whatever the first parenthesized subexpression matched. In this example, it enforces the constraint that the closing quote match the opening quote. This regular expression does not allow single quotes within double-quoted strings or vice versa. (It is not legal to use a reference within a character class, so you cannot write: `/(['"])[^\1]*\1/`.)

::: tip 翻译
`\1` 匹配第一个带括号的子表达式匹配的内容。 在此示例中，它强制执行关闭引号与开始引号的约束。 此正则表达式不允许在双引号字符串中使用单引号，反之亦然。 （在字符类中使用引用是不合法的，因此不能写：`/(['"])[^\1]*\1/`。）
:::

When we cover the RegExp API later, you’ll see that this kind of reference to a parenthesized subexpression is a powerful feature of regular-expression search-and-replace operations.

::: tip 翻译
当我们稍后介绍 `RegExp` API 时，您将看到这种对括号子表达式的引用是正则表达式搜索和替换操作的强大功能。
:::

It is also possible to group items in a regular expression without creating a numbered reference to those items. Instead of simply grouping the items within `(` and `)`, begin the group with `(?:` and end it with `)`. Consider the following pattern:

::: tip 翻译
还可以在正则表达式中对项目进行分组，而无需创建对这些项目的编号引用。 不要简单地将 `(` 和 `)` 中的项目分组，而是以 `(?:` 开始组并以 `)`结束。 考虑以下模式：
:::

```js
/([Jj]ava(?:[Ss]cript)?)\sis\s(fun\w*)/;
```

In this example, the subexpression `(?:[Ss]cript)` is used simply for grouping, so the `?` repetition character can be applied to the group. These modified parentheses do not produce a reference, so in this regular expression, `\2` refers to the text matched by `(fun\w*)`.

::: tip 翻译
在此示例中，子表达式 `(?:[Ss]cript)` 仅用于分组，因此可以将 `?` 重复字符应用于组。 这些修改后的括号不会产生引用，因此在此正则表达式中，`\2` 引用与 `(fun\w*)` 匹配的文本。
:::

Table 11-4 summarizes the regular expression alternation, grouping, and referencing operators.

::: tip 翻译
表 11-4 总结了正则表达式的交替、分组和引用运算符。
:::

_Table 11-4. Regular expression alternation, grouping, and reference characters_

| Character | Meaning                                                                                                                                                                                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
|           |                                                                                                                                                                                                                                                                         | Alternation: match either the subexpression to the left or the subexpression to the right.     |
| (...)     | Grouping: group items into a single unit that can be used with \*, +, ?,                                                                                                                                                                                                | , and so on. Also remember the characters that match this group for use with later references. |
| (?:...)   | Grouping only: group items into a single unit, but do not remember the characters that match this group.                                                                                                                                                                |
| \n        | Match the same characters that were matched when group number n was first matched. Groups are subexpressions within (possibly nested) parentheses. Group numbers are assigned by counting left parentheses from left to right. Groups formed with (?: are not numbered. |

> **Named Capture Groups**
>
> ES2018 standardizes a new feature that can make regular expressions more self-documenting and easier to understand. This new feature is known as “named capture groups” and it allows us to associate a name with each left parenthesis in a regular expression so that we can refer to the matching text by name rather than by number. Equally important: using names allows someone reading the code to more easily understand the purpose of that portion of the regular expression. As of early 2020, this feature is implemented in Node, Chrome, Edge, and Safari, but not yet by Firefox.
>
> To name a group, use `(?<...>` instead of `(` and put the name between the angle brackets. For example, here is a regular expression that might be used to check the formatting of the final line of a US mailing address:
>
> ```js
> /(?<city>\w+) (?<state>[A-Z]{2}) (?<zipcode>\d{5})(?<zip9>-\d{4})?/;
> ```
>
> Notice how much context the group names provide to make the regular expression easier to understand. In §11.3.2, when we discuss the String `replace()` and `match()` methods and the RegExp `exec()` method, you’ll see how the RegExp API allows you to refer to the text that matches each of these groups by name rather than by position.
>
> If you want to refer back to a named capture group within a regular expression, you can do that by name as well. In the preceding example, we were able to use a regular expression “backreference” to write a RegExp that would match a single- or doublequoted string where the open and close quotes had to match. We could rewrite this RegExp using a named capturing group and a named backreference like this:
>
> ```js
> /(?<quote>['"])[^'"]*\k<quote>/;
> ```
>
> The `\k<quote>` is a named backreference to the named group that captures the open quotation mark.

> **命名捕获组**
>
> ES2018 标准化了一项新功能，可以使正则表达式更加自文档化并且更易于理解。 这个新功能被称为“命名捕获组”，它允许我们将名称与正则表达式中的每个左括号关联起来，以便我们可以通过名称而不是数字来引用匹配的文本。 同样重要的是：使用名称可以让阅读代码的人更轻松地理解正则表达式该部分的用途。 截至 2020 年初，此功能已在 Node、Chrome、Edge 和 Safari 中实现，但 Firefox 尚未实现。
>
> 要命名组，请使用 `(?<...>` 而不是 `(`，并将名称放在尖括号之间。例如，下面是一个正则表达式，可用于检查美国邮寄地址最后一行的格式 ：
>
> ```js
> /(?<city>\w+) (?<state>[A-Z]{2}) (?<zipcode>\d{5})(?<zip9>-\d{4})?/;
> ```
>
> 请注意组名称提供了多少上下文以使正则表达式更易于理解。 在第 11.3.2 节中，当我们讨论字符串 `replace()` 和 `match()` 方法以及 RegExp `exec()` 方法时，您将看到 `RegExp` API 如何允许您引用匹配的文本 这些组中的每一个都是按名称而不是按职位排列的。
>
> 如果您想在正则表达式中引用已命名的捕获组，也可以通过名称来执行此操作。 在前面的示例中，我们能够使用正则表达式“反向引用”来编写一个正则表达式，该正则表达式将匹配单引号或双引号字符串，其中开引号和闭引号必须匹配。 我们可以使用命名捕获组和命名反向引用重写此正则表达式，如下所示：
>
> ```js
> /(?<quote>['"])[^'"]*\k<quote>/;
> ```
>
> `\k<quote>` 是对捕获左引号的命名组的命名反向引用。

#### 指定匹配位置

As described earlier, many elements of a regular expression match a single character in a string. For example, `\s` matches a single character of whitespace. Other regular expression elements match the positions between characters instead of actual characters. `\b`, for example, matches an ASCII word boundary—the boundary between a `\w` (ASCII word character) and a `\W` (nonword character), or the boundary between an ASCII word character and the beginning or end of a string. Elements such as `\b` do not specify any characters to be used in a matched string; what they do specify, however, are legal positions at which a match can occur. Sometimes these elements are called _regular expression anchors_ because they anchor the pattern to a specific position in the search string. The most commonly used anchor elements are `^`, which ties the pattern to the beginning of the string, and `$`, which anchors the pattern to the end of the string.

::: tip 翻译
如前所述，正则表达式的许多元素与字符串中的单个字符匹配。 例如，`\s` 匹配单个空格字符。 其他正则表达式元素匹配字符之间的位置而不是实际字符。 例如，`\b`匹配 ASCII 字边界 - `\w`（ASCII 字字符）和`\W`（非字字符）之间的边界，或者 ASCII 字字符和字符串开头或结尾之间的边界。 诸如 `\b` 之类的元素不指定在匹配字符串中使用的任何字符； 然而，他们所指定的是比赛可以发生的合法位置。 有时，这些元素被称为 _正则表达式锚_，因为它们将模式锚定到搜索字符串中的特定位置。 最常用的锚元素是 `^`，它将模式连接到字符串的开头，以及 `$`，它将模式锚定到字符串的末尾。
:::

For example, to match the word “JavaScript” on a line by itself, you can use the regular expression `/^JavaScript$/`. If you want to search for “Java” as a word by itself (not as a prefix, as it is in “JavaScript”), you can try the pattern `/\sJava\s/`, which requires a space before and after the word. But there are two problems with this solution. First, it does not match “Java” at the beginning or the end of a string, but only if it appears with space on either side. Second, when this pattern does find a match, the matched string it returns has leading and trailing spaces, which is not quite what’s needed. So instead of matching actual space characters with `\s`, match (or anchor to) word boundaries with `\b`. The resulting expression is `/\bJava\b/`. The element `\B` anchors the match to a location that is not a word boundary. Thus, the pattern `\B[Ss]cript/` matches “JavaScript” and “postscript”, but not “script” or “Scripting”.

::: tip 翻译
例如，要匹配一行中的单词“JavaScript”，您可以使用正则表达式 `/^JavaScript$/`。 如果您想单独搜索“Java”（而不是像“JavaScript”中那样作为前缀），您可以尝试模式 `/\sJava\s/`，该模式在这个单词前后需要一个空格 。 但这个解决方案有两个问题。 首先，它不匹配字符串开头或结尾的`Java`，但前提是它两侧都带有空格。 其次，当此模式确实找到匹配项时，它返回的匹配字符串具有前导空格和尾随空格，这并不是所需要的。 因此，不要用 `\s` 匹配实际的空格字符，而是用 `\b` 匹配（或锚定）单词边界。 结果表达式是 `/\bJava\b/`。 元素 `\B`将匹配锚定到非单词边界的位置。 因此，模式 `\B[Ss]cript/``匹配“JavaScript”和“postscript”，但不匹配“script”或“Scripting”。
:::

You can also use arbitrary regular expressions as anchor conditions. If you include an expression within `(?=` and `)` characters, it is a lookahead assertion, and it specifies that the enclosed characters must match, without actually matching them. For example, to match the name of a common programming language, but only if it is followed by a colon, you could use `/[Jj]ava([Ss]cript)?(?=\:)/`. This pattern matches the word “JavaScript” in “JavaScript: The Definitive Guide”, but it does not match “Java” in “Java in a Nutshell” because it is not followed by a colon.

::: tip 翻译
您还可以使用任意正则表达式作为锚条件。 如果在 `(?=` 和 `)` 字符中包含表达式，则它是一个先行断言，它指定所包含的字符必须匹配，但实际上并不匹配它们。 例如，要匹配通用编程语言的名称，但仅当其后跟冒号时，您可以使用 `/[Jj]ava([Ss]cript)?(?=\:)/`。 此模式与“JavaScript：The Definitive Guide”中的“JavaScript”一词匹配，但与“Java in a Nutshell”中的“Java”不匹配，因为它后面没有冒号。
:::

If you instead introduce an assertion with `(?!`, it is a negative lookahead assertion, which specifies that the following characters must not match. For example, `/Java(?!Script)([A-Z]\w*)/` matches “Java” followed by a capital letter and any number of additional ASCII word characters, as long as “Java” is not followed by “Script”. It matches “JavaBeans” but not “Javanese”, and it matches “JavaScrip” but not “JavaScript” or “JavaScripter”. Table 11-5 summarizes regular expression anchors.

::: tip 翻译
如果您改为使用 `(?!` 引入断言，则它是负向先行断言，它指定以下字符不能匹配。例如，`/Java(?!Script)([A-Z]\w*)/ ` 匹配“Java”后跟一个大写字母和任意数量的附加 ASCII 单词字符，只要“Java”后面不跟“Script”。它匹配“JavaBeans”但不匹配“Javanese”，并且匹配“JavaScrip” 但不是“JavaScript”或“JavaScripter”。表 11-5 总结了正则表达式锚点。
:::

_Table 11-5. Regular expression anchor characters_

| Character | Meaning                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ^         | Match the beginning of the string or, with the m flag, the beginning of a line.                                                                                                                            |
| $         | Match the end of the string and, with the m flag, the end of a line.                                                                                                                                       |
| \b        | Match a word boundary. That is, match the position between a \w character and a \W character or between a \w character and the beginning or end of a string. (Note, however, that [\b] matches backspace.) |
| \B        | Match a position that is not a word boundary                                                                                                                                                               |
| (?=p)     | A positive lookahead assertion. Require that the following characters match the pattern p, but do not include those characters in the match.                                                               |
| (?!p)     | A negative lookahead assertion. Require that the following characters do not match the pattern p.                                                                                                          |

> **Lookbehind Assertions**
>
> ES2018 extends regular expression syntax to allow “lookbehind” assertions. These are like lookahead assertions but refer to text before the current match position. As of early 2020, these are implemented in Node, Chrome, and Edge, but not Firefox or Safari.
>
> Specify a positive lookbehind assertion with `(?<=...)` and a negative lookbehind assertion with `(?<!...)`. For example, if you were working with US mailing addresses, you could match a 5-digit zip code, but only when it follows a two-letter state abbreviation, like this:
>
> ```js
> /(?<= [A-Z]{2} )\d{5}/;
> ```
>
> And you could match a string of digits that is not preceded by a Unicode currency symbol with a negative lookbehind assertion like this:
>
> ```js
> /(?<![\p{Currency_Symbol}\d.])\d+(\.\d+)?/u;
> ```

> **后向断言**
> ES2018 扩展了正则表达式语法以允许“lookbehind”断言。 这些类似于前瞻断言，但引用当前匹配位置之前的文本。 截至 2020 年初，这些已在 Node、Chrome 和 Edge 中实现，但尚未在 Firefox 或 Safari 中实现。
>
> 使用 `(?<=...)` 指定正回顾断言，使用 `(?<!...)` 指定负回顾断言。 例如，如果您使用的是美国邮寄地址，则可以匹配 5 位邮政编码，但前提是它遵循两个字母的州缩写，如下所示：
>
> ```js
> /(?<= [A-Z]{2} )\d{5}/;
> ```
>
> 您可以将前面没有 Unicode 货币符号的数字字符串与否定后向断言相匹配，如下所示：
>
> ```js
> /(?<![\p{Currency_Symbol}\d.])\d+(\.\d+)?/u;
> ```

#### 标识符

Every regular expression can have one or more flags associated with it to alter its matching behavior. JavaScript defines six possible flags, each of which is represented by a single letter. Flags are specified after the second `/` character of a regular expression literal or as a string passed as the second argument to the `RegExp()` constructor. The supported flags and their meanings are:

::: tip 翻译
每个正则表达式都可以有一个或多个与之关联的标志来改变其匹配行为。 JavaScript 定义了六个可能的标志，每个标志都由一个字母表示。 标志在正则表达式文字的第二个 `/` 字符之后指定，或者作为作为第二个参数传递给 `RegExp()` 构造函数的字符串。 支持的标志及其含义是：
:::

##### g

The `g` flag indicates that the regular expression is “global”—that is, that we intend to use it to find all matches within a string rather than just finding the first match. This flag does not alter the way that pattern matching is done, but, as we’ll see later, it does alter the behavior of the String `match()` method and the RegExp `exec()` method in important ways.

::: tip 翻译
`g`标志表示正则表达式是“全局”的，也就是说，我们打算使用它来查找字符串中的所有匹配项，而不仅仅是查找第一个匹配项。 该标志不会改变模式匹配的完成方式，但是，正如我们稍后将看到的，它确实以重要方式改变了 String `match()` 方法和 RegExp `exec()` 方法的行为。
:::

##### i

The `i` flag specifies that pattern matching should be case-insensitive.

::: tip 翻译
`i` 标志指定模式匹配应该不区分大小写。
:::

##### m

The `m` flag specifies that matching should be done in “multiline” mode. It says that the RegExp will be used with multiline strings and that the `^` and `$` anchors should match both the beginning and end of the string and also the beginning and end of individual lines within the string.

::: tip 翻译
`m` 标志指定匹配应该在“多行”模式下完成。 它表示 RegExp 将与多行字符串一起使用，并且 `^` 和 `$` 锚点应匹配字符串的开头和结尾以及字符串中各行的开头和结尾。
:::

##### s

Like the `m` flag, the `s` flag is also useful when working with text that includes newlines. Normally, a “.” in a regular expression matches any character except a line terminator. When the `s` flag is used, however, “.” will match any character, including line terminators. The `s` flag was added to JavaScript in ES2018 and, as of early 2020, is supported in Node, Chrome, Edge, and Safari, but not Firefox.

::: tip 翻译
与 `m` 标志一样，`s` 标志在处理包含换行符的文本时也很有用。 通常，一个 `.` 正则表达式中的匹配除行终止符之外的任何字符。 然而，当使用 `s` 标志时，`.` 将匹配任何字符，包括行终止符。 ES2018 中向 JavaScript 添加了 `s` 标志，并且从 2020 年初开始，Node、Chrome、Edge 和 Safari 支持该标志，但 Firefox 不支持。
:::

##### u

The `u` flag stands for Unicode, and it makes the regular expression match full Unicode codepoints rather than matching 16-bit values. This flag was introduced in ES6, and you should make a habit of using it on all regular expressions unless you have some reason not to. If you do not use this flag, then your RegExps will not work well with text that includes emoji and other characters (including many Chinese characters) that require more than 16 bits. Without the `u` flag, the “.” character matches any 1 UTF-16 16-bit value. With the flag, however, “.” matches one Unicode codepoint, including those that have more than 16 bits. Setting the `u` flag on a RegExp also allows you to use the new `\u{...}` escape sequence for Unicode character and also enables the `\p{...}` notation for Unicode character classes.

::: tip 翻译
`u` 标志代表 Unicode，它使正则表达式匹配完整的 Unicode 代码点，而不是匹配 16 位值。 这个标志是在 ES6 中引入的，你应该养成在所有正则表达式上使用它的习惯，除非你有某种理由不这样做。 如果您不使用此标志，那么您的正则表达式将无法很好地处理包含表情符号和其他需要超过 16 位的字符（包括许多中文字符）的文本。 如果没有 `u` 标志，则 `.` 字符匹配任何 1 个 UTF-16 16 位值。 然而，有了标识，`.` 匹配一个 Unicode 代码点，包括那些超过 16 位的代码点。 在 RegExp 上设置 `u` 标志还允许您对 Unicode 字符使用新的 `\u{...}` 转义序列，并为 Unicode 字符类启用 `\p{...}` 表示法。
:::

##### y

The `y` flag indicates that the regular expression is “sticky” and should match at the beginning of a string or at the first character following the previous match. When used with a regular expression that is designed to find a single match, it effectively treats that regular expression as if it begins with `^` to anchor it to the beginning of the string. This flag is more useful with regular expressions that are used repeatedly to find all matches within a string. In this case, it causes special behavior of the String `match()` method and the RegExp `exec()` method to enforce that each subsequent match is anchored to the string position at which the last one ended.

::: tip 翻译
`y` 标志表示正则表达式是“粘性”的，并且应该匹配字符串的开头或上一个匹配之后的第一个字符。 当与旨在查找单个匹配项的正则表达式一起使用时，它会有效地将该正则表达式视为以 `^` 开头，以将其锚定到字符串的开头。 此标志对于重复使用以查找字符串中所有匹配项的正则表达式更有用。 在这种情况下，它会导致 String `match()` 方法和 RegExp `exec()` 方法的特殊行为，以强制每个后续匹配都锚定到最后一个结束的字符串位置。
:::

These flags may be specified in any combination and in any order. For example, if you want your regular expression to be Unicode-aware to do case-insensitive matching and you intend to use it to find multiple matches within a string, you would specify the flags `uig`, `gui`, or any other permutation of these three letters.

::: tip 翻译
这些标志可以以任意组合和任意顺序指定。 例如，如果您希望正则表达式能够识别 Unicode 以进行不区分大小写的匹配，并且打算使用它来查找字符串中的多个匹配项，则可以指定标志 `uig`、`gui`或任何其他这三个字母的排列。
:::

### 模式匹配的字符串方法

Until now, we have been describing the grammar used to define regular expressions, but not explaining how those regular expressions can actually be used in JavaScript code. We are now switching to cover the API for using RegExp objects. This section begins by explaining the string methods that use regular expressions to perform pattern matching and search-and-replace operations. The sections that follow this one continue the discussion of pattern matching with JavaScript regular expressions by discussing the RegExp object and its methods and properties.

::: tip 翻译
到目前为止，我们一直在描述用于定义正则表达式的语法，但没有解释如何在 JavaScript 代码中实际使用这些正则表达式。 我们现在转而介绍使用 RegExp 对象的 API。 本节首先解释使用正则表达式执行模式匹配以及搜索和替换操作的字符串方法。 本节后面的部分通过讨论 RegExp 对象及其方法和属性，继续讨论与 JavaScript 正则表达式的模式匹配。
:::

#### search()

Strings support four methods that use regular expressions. The simplest is `search()`. This method takes a regular expression argument and returns either the character position of the start of the first matching substring or −1 if there is no match:

::: tip 翻译
字符串支持四种使用正则表达式的方法。 最简单的是 `search()`。 此方法采用正则表达式参数，并返回第一个匹配子字符串开头的字符位置，如果没有匹配，则返回 -1：
:::

```js
"JavaScript".search(/script/iu); // => 4
"Python".search(/script/iu); // => -1
```

If the argument to `search()` is not a regular expression, it is first converted to one by passing it to the `RegExp` constructor. `search()` does not support global searches; it ignores the g flag of its regular expression argument.

::: tip 翻译
如果 `search()` 的参数不是正则表达式，则首先将其传递给 `RegExp` 构造函数，将其转换为正则表达式。 `search()` 不支持全局搜索； 它忽略其正则表达式参数的 `g` 标志。
:::

#### replace()

The `replace()` method performs a search-and-replace operation. It takes a regular expression as its first argument and a replacement string as its second argument. It searches the string on which it is called for matches with the specified pattern. If the regular expression has the g flag set, the `replace()` method replaces all matches in the string with the replacement string; otherwise, it replaces only the first match it finds. If the first argument to `replace()` is a string rather than a regular expression, the method searches for that string literally rather than converting it to a regular expression with the `RegExp()` constructor, as `search()` does. As an example, you can use `replace()` as follows to provide uniform capitalization of the word “JavaScript” throughout a string of text:

::: tip 翻译
`replace()` 方法执行搜索和替换操作。 它采用正则表达式作为其第一个参数，并将替换字符串作为其第二个参数。 它在调用它的字符串中搜索与指定模式的匹配项。 如果正则表达式设置了 `g` 标志，则 `replace()` 方法将用替换字符串替换字符串中的所有匹配项； 否则，它仅替换它找到的第一个匹配项。 如果 `replace()` 的第一个参数是字符串而不是正则表达式，则该方法会按字面意思搜索该字符串，而不是像 `search()`那样使用 `RegExp()` 构造函数将其转换为正则表达式 。 例如，您可以按如下方式使用 `replace()` 来在整个文本字符串中提供单词“JavaScript”的统一大写：
:::

```js
// No matter how it is capitalized, replace it with the correct capitalization
text.replace(/javascript/gi, "JavaScript");
```

`replace()` is more powerful than this, however. Recall that parenthesized subexpressions of a regular expression are numbered from left to right and that the regular expression remembers the text that each subexpression matches. If a $ followed by a digit appears in the replacement string, `replace()` replaces those two characters with the text that matches the specified subexpression. This is a very useful feature. You can use it, for example, to replace quotation marks in a string with other characters:

::: tip 翻译
然而，`replace()` 比这更强大。 回想一下，正则表达式的括号子表达式是从左到右编号的，并且正则表达式会记住每个子表达式匹配的文本。 如果替换字符串中出现 `$` 后跟数字，则 `replace()` 会将这两个字符替换为与指定子表达式匹配的文本。 这是一个非常有用的功能。 例如，您可以使用它用其他字符替换字符串中的引号：
:::

```js
// A quote is a quotation mark, followed by any number of
// nonquotation mark characters (which we capture), followed
// by another quotation mark.
let quote = /"([^"]*)"/g;
// Replace the straight quotation marks with guillemets
// leaving the quoted text (stored in $1) unchanged.
'He said "stop"'.replace(quote, "«$1»"); // => 'He said «stop»'
```

If your RegExp uses named capture groups, then you can refer to the matching text by name rather than by number:

::: tip 翻译
如果您的正则表达式使用命名捕获组，那么您可以按名称而不是数字引用匹配文本：
:::

```js
let quote = /"(?<quotedText>[^"]*)"/g;
'He said "stop"'.replace(quote, "«$<quotedText>»"); // => 'He said «stop»'
```

Instead of passing a replacement string as the second argument to `replace()`, you can also pass a function that will be invoked to compute the replacement value. The replacement function is invoked with a number of arguments. First is the entire matched text. Next, if the RegExp has capturing groups, then the substrings that were captured by those groups are passed as arguments. The next argument is the position within the string at which the match was found. After that, the entire string that `replace()` was called on is passed. And finally, if the RegExp contained any named capture groups, the last argument to the replacement function is an object whose property names match the capture group names and whose values are the matching text. As an example, here is code that uses a replacement function to convert decimal integers in a string to hexadecimal:

::: tip 翻译
您还可以传递一个将被调用来计算替换值的函数，而不是将替换字符串作为第二个参数传递给 `replace()`。 使用多个参数调用替换函数。 首先是整个匹配的文本。 接下来，如果 `RegExp` 具有捕获组，则这些组捕获的子字符串将作为参数传递。 下一个参数是字符串中找到匹配项的位置。 之后，调用 `replace()` 的整个字符串都会被传递。 最后，如果 `RegExp` 包含任何命名捕获组，则替换函数的最后一个参数是一个对象，其属性名称与捕获组名称匹配，其值是匹配文本。 例如，以下代码使用替换函数将字符串中的十进制整数转换为十六进制：
:::

```js
let s = "15 times 15 is 225";
s.replace(/\d+/gu, (n) => parseInt(n).toString(16)); // => "f times f is e1"
```

#### match()

The `match()` method is the most general of the String regular expression methods. It takes a regular expression as its only argument (or converts its argument to a regular expression by passing it to the `RegExp()` constructor) and returns an array that contains the results of the match, or null if no match is found. If the regular expression has the `g` flag set, the method returns an array of all matches that appear in the string. For example:

::: tip 翻译
`match()` 方法是最通用的字符串正则表达式方法。 它将正则表达式作为其唯一参数（或通过将其传递给 `RegExp()` 构造函数将其参数转换为正则表达式）并返回一个包含匹配结果的数组，如果未找到匹配则返回 `null`。 如果正则表达式设置了 `g` 标志，则该方法返回字符串中出现的所有匹配项的数组。 例如：
:::

```js
"7 plus 8 equals 15".match(/\d+/g); // => ["7", "8", "15"]
```

If the regular expression does not have the `g` flag set, `match()` does not do a global search; it simply searches for the first match. In this nonglobal case, `match()` still returns an array, but the array elements are completely different. Without the `g` flag, the first element of the returned array is the matching string, and any remaining elements are the substrings matching the parenthesized capturing groups of the regular expression. Thus, if `match()` returns an array `a`, `a[0]` contains the complete match, `a[1]` contains the substring that matched the first parenthesized expression, and so on. To draw a parallel with the `replace()` method, `a[1]` is the same string as `$1`, `a[2]` is the same as `$2`, and so on.

::: tip 翻译
如果正则表达式没有设置 `g` 标志，则 `match()` 不会进行全局搜索； 它只是搜索第一个匹配项。 在这种非全局情况下，`match()` 仍然返回一个数组，但数组元素完全不同。 如果没有 `g` 标志，返回数组的第一个元素是匹配的字符串，任何剩余元素都是与正则表达式的括号内的捕获组匹配的子字符串。 因此，如果 `match()` 返回一个数组 `a`，则 `a[0]` 包含完整匹配，`a[1]` 包含与第一个括号表达式匹配的子字符串，依此类推。 与 `replace()` 方法进行类比，`a[1]` 与 `$1` 是相同的字符串，`a[2]` 与 `$2` 相同，依此类推。
:::

For example, consider parsing a URL with the following code:

::: tip 翻译
例如，考虑使用以下代码解析 URL：
:::

```js
// A very simple URL parsing RegExp
let url = /(\w+):\/\/([\w.]+)\/(\S*)/;
let text = "Visit my blog at http://www.example.com/~david";
let match = text.match(url);
let fullurl, protocol, host, path;
if (match !== null) {
  fullurl = match[0]; // fullurl == 'http://www.example.com/~david'
  protocol = match[1]; // protocol == 'http'
  host = match[2]; // host == 'www.example.com'
  path = match[3]; // path == '/~david'
}
```

In this non-global case, the array returned by `match()` also has some object properties in addition to the numbered array elements. The `input` property refers to the string on which `match()` was called. The `index` property is the position within that string at which the match starts. And if the regular expression contains named capture groups, then the returned array also has a `groups` property whose value is an object. The properties of this object match the names of the named groups, and the values are the matching text. We could rewrite the previous URL parsing example, for example, like this:

::: tip 翻译
在这种非全局情况下，除了编号的数组元素之外，`match()` 返回的数组还具有一些对象属性。 `input` 属性指的是调用 `match()` 的字符串。 `index` 属性是该字符串中匹配开始的位置。 如果正则表达式包含命名捕获组，则返回的数组还有一个值为对象的 `groups` 属性。 该对象的属性与命名组的名称匹配，并且值是匹配的文本。 我们可以重写之前的 URL 解析示例，例如：
:::

```js
let url = /(?<protocol>\w+):\/\/(?<host>[\w.]+)\/(?<path>\S*)/;
let text = "Visit my blog at http://www.example.com/~david";
let match = text.match(url);
match[0]; // => 'http://www.example.com/~david'
match.input; // => text
match.index; // => 17
match.groups.protocol; // => 'http'
match.groups.host; // => 'www.example.com'
match.groups.path; // => '~david'
```

We’ve seen that `match()` behaves quite differently depending on whether the RegExp has the `g` flag set or not. There are also important but less dramatic differences in behavior when the `y` flag is set. Recall that the `y` flag makes a regular expression “sticky” by constraining where in the string matches can begin. If a RegExp has both the `g` and `y` flags set, then `match()` returns an array of matched strings, just as it does when `g` is set without `y`. But the first match must begin at the start of the string, and each subsequent match must begin at the character immediately following the previous match.

::: tip 翻译
我们已经看到，根据正则表达式是否设置了 `g` 标志，`match()`的行为有很大不同。 当设置 `y` 标志时，行为上也存在重要但不太显着的差异。 回想一下，`y`标志通过限制字符串匹配可以开始的位置来使正则表达式具有“粘性”。 如果 RegExp 同时设置了 `g` 和 `y` 标志，则 `match()` 返回一个匹配字符串的数组，就像设置了 `g` 而没有设置 `y` 时一样。 但第一个匹配必须从字符串的开头开始，并且后续的每个匹配必须从紧跟上一个匹配的字符开始。
:::

If the `y` flag is set without `g`, then `match()` tries to find a single match, and, by default, this match is constrained to the start of the string. You can change this default match start position, however, by setting the `lastIndex` property of the RegExp object at the index at which you want to match at. If a match is found, then this `lastIndex` will be automatically updated to the first character after the match, so if you call `match()` again, in this case, it will look for a subsequent match. (`lastIndex` may seem like a strange name for a property that specifies the position at which to begin the next match. We will see it again when we cover the RegExp `exec()` method, and its name may make more sense in that context.)

::: tip 翻译
如果 `y` 标志设置为没有 `g`，则 `match()` 会尝试查找单个匹配项，并且默认情况下，该匹配项被限制在字符串的开头。 但是，您可以通过在要匹配的索引处设置 RegExp 对象的 `lastIndex` 属性来更改此默认匹配开始位置。 如果找到匹配项，则此 `lastIndex` 将自动更新为匹配后的第一个字符，因此如果您再次调用 `match()`，在这种情况下，它将查找后续匹配项。 （对于指定下一场比赛开始位置的属性来说，`lastIndex` 可能看起来是一个奇怪的名称。当我们介绍 RegExp `exec()` 方法时，我们会再次看到它，它的名称在那个上下文中可能更有意义 。）
:::

```js
let vowel = /[aeiou]/y; // Sticky vowel match
"test".match(vowel); // => null: 'test' does not begin with a vowel
vowel.lastIndex = 1; // Specify a different match position
"test".match(vowel)[0]; // => 'e': we found a vowel at position 1
vowel.lastIndex; // => 2: lastIndex was automatically updated
"test".match(vowel); // => null: no vowel at position 2
vowel.lastIndex; // => 0: lastIndex gets reset after failed match
```

It is worth noting that passing a non-global regular expression to the `match()` method of a string is the same as passing the string to the `exec()` method of the regular expression: the returned array and its properties are the same in both cases.

::: tip 翻译
值得注意的是，将非全局正则表达式传递给字符串的 `match()` 方法与将字符串传递给正则表达式的 `exec()` 方法相同：返回的数组及其属性是两种情况都是一样的。
:::

#### matchAll()

The `matchAll()` method is defined in ES2020, and as of early 2020 is implemented by modern web browsers and Node. `matchAll()` expects a RegExp with the `g` flag set. Instead of returning an array of matching substrings like `match()` does, however, it returns an iterator that yields the kind of match objects that `match()` returns when used with a non-global RegExp. This makes `matchAll()` the easiest and most general way to loop through all matches within a string.

::: tip 翻译
`matchAll()` 方法是在 ES2020 中定义的，并且从 2020 年初开始由现代 Web 浏览器和 Node.js 实现。 `matchAll()` 需要一个设置了 `g` 标志的正则表达式。 然而，它不是像 `match()` 那样返回匹配子字符串的数组，而是返回一个迭代器，该迭代器生成 `match()` 与非全局正则表达式一起使用时返回的匹配对象类型。 这使得 `matchAll()` 成为循环遍历字符串中所有匹配项的最简单、最通用的方法。
:::

You might use `matchAll()` to loop through the words in a string of text like this:

::: tip 翻译
您可以使用 `matchAll()` 来循环文本字符串中的单词，如下所示：
:::

```js
// One or more Unicode alphabetic characters between word boundaries.
const words = /\b\p{Alphabetic}+\b/gu; // \p is not supported in Firefox yet
const text = "This is a native test of the matchAll() method.";
for (let word of text.matchAll(words)) {
  console.log(`Found '${word[0]}' at index ${word.index}`);
}
```

You can set the `lastIndex` property of a RegExp object to tell `matchAll()` what index in the string to begin matching at. Unlike the other pattern-matching methods, however, `matchAll()` never modifies the `lastIndex` property of the RegExp you call it on, and this makes it much less likely to cause bugs in your code.

::: tip 翻译
您可以设置 `RegExp` 对象的 `lastIndex` 属性来告诉 `matchAll()` 从字符串中的哪个索引开始匹配。 然而，与其他模式匹配方法不同，`matchAll()` 永远不会修改您调用它的正则表达式的 `lastIndex` 属性，这使得它不太可能在代码中引起错误。
:::

#### split()

The last of the regular expression methods of the String object is `split()`. This method breaks the string on which it is called into an array of substrings, using the argument as a separator. It can be used with a string argument like this:

::: tip 翻译
String 对象的最后一个正则表达式方法是 `split()`。 此方法使用参数作为分隔符，将调用它的字符串分解为子字符串数组。 它可以与字符串参数一起使用，如下所示：
:::

```js
"123,456,789".split(","); // => ["123", "456", "789"]
```

The `split()` method can also take a regular expression as its argument, and this allows you to specify more general separators. Here we call it with a separator that includes an arbitrary amount of whitespace on either side:

::: tip 翻译
`split()` 方法还可以将正则表达式作为其参数，这允许您指定更通用的分隔符。 这里我们用一个分隔符来调用它，该分隔符在两侧包含任意数量的空格：
:::

```js
"1, 2, 3,\n4, 5".split(/\s*,\s*/); // => ["1", "2", "3", "4", "5"]
```

Surprisingly, if you call `split()` with a RegExp delimiter and the regular expression includes capturing groups, then the text that matches the capturing groups will be included in the returned array. For example:

::: tip 翻译
令人惊讶的是，如果您使用 `RegExp` 分隔符调用 `split()` 并且正则表达式包含捕获组，则与捕获组匹配的文本将包含在返回的数组中。 例如：
:::

```js
const htmlTag = /<([^>]+)>/; // < followed by one or more non->, followed by >
"Testing<br/>1,2,3".split(htmlTag); // => ["Testing", "br/", "1,2,3"]
```

### RegExp 类

This section documents the `RegExp()` constructor, the properties of RegExp instances, and two important pattern-matching methods defined by the RegExp class.

::: tip 翻译
本节记录了 `RegExp()` 构造函数、`RegExp` 实例的属性以及 `RegExp` 类定义的两个重要的模式匹配方法。
:::

The `RegExp()` constructor takes one or two string arguments and creates a new RegExp object. The first argument to this constructor is a string that contains the body of the regular expression—the text that would appear within slashes in a regular-expression literal. Note that both string literals and regular expressions use the `\` character for escape sequences, so when you pass a regular expression to `RegExp()` as a string literal, you must replace each `\` character with `\\`. The second argument to `RegExp()` is optional. If supplied, it indicates the regular expression flags. It should be `g`, `i`, `m`, `s`, `u`, `y`, or any combination of those letters.

::: tip 翻译
`RegExp()` 构造函数接受一两个字符串参数并创建一个新的 `RegExp` 对象。 此构造函数的第一个参数是一个字符串，其中包含正则表达式的主体，即出现在正则表达式文字中斜杠内的文本。 请注意，字符串文字和正则表达式都使用 `\` 字符作为转义序列，因此当您将正则表达式作为字符串文字传递给 `RegExp()` 时，必须将每个 `\` 字符替换为 `\\`。 `RegExp()` 的第二个参数是可选的。 如果提供，它指示正则表达式标志。 它应该是 `g`、`i`、`m`、`s`、`u`、`y`或这些字母的任意组合。
:::

For example:

```js
// Find all five-digit numbers in a string. Note the double \\ in this case.
let zipcode = new RegExp("\\d{5}", "g");
```

The `RegExp()` constructor is useful when a regular expression is being dynamically created and thus cannot be represented with the regular expression literal syntax. For example, to search for a string entered by the user, a regular expression must be created at runtime with `RegExp()`.

::: tip 翻译
当动态创建正则表达式且无法用正则表达式文字语法表示时，`RegExp()`构造函数非常有用。 例如，要搜索用户输入的字符串，必须在运行时使用`RegExp()` 创建正则表达式。
:::

Instead of passing a string as the first argument to `RegExp()`, you can also pass a RegExp object. This allows you to copy a regular expression and change its flags:

::: tip 翻译
您还可以传递一个 `RegExp` 对象，而不是将字符串作为第一个参数传递给 `RegExp()`。 这允许您复制正则表达式并更改其标志：
:::

```js
let exactMatch = /JavaScript/;
let caseInsensitive = new RegExp(exactMatch, "i");
```

#### RegExp 属性

RegExp objects have the following properties:

::: tip 翻译
RegExp 对象具有以下属性：
:::

##### source

This read-only property is the source text of the regular expression: the characters that appear between the slashes in a RegExp literal.

::: tip 翻译
此只读属性是正则表达式的源文本：`RegExp` 文本中斜杠之间出现的字符。
:::

##### flags

This read-only property is a string that specifies the set of letters that represent the flags for the RegExp.

::: tip 翻译
此只读属性是一个字符串，指定表示 RegExp 标志的字母集。
:::

##### global

A read-only boolean property that is true if the `g` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `g` 标志，则该属性为 `true`。
:::

##### ignoreCase

A read-only boolean property that is true if the `i` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `i` 标志，则该属性为 `true`。
:::

##### multiline

A read-only boolean property that is true if the `m` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `m` 标志，则该属性为 `true`。
:::

##### dotAll

A read-only boolean property that is true if the `s` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `s` 标志，则该属性为 `true`。
:::

##### unicode

A read-only boolean property that is true if the `u` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `u` 标志，则该属性为 `true`。
:::

##### sticky

A read-only boolean property that is true if the `y` flag is set.

::: tip 翻译
只读布尔属性，如果设置了 `y` 标志，则该属性为 `true`。
:::

##### lastIndex

This property is a read/write integer. For patterns with the g or y flags, it specifies the character position at which the next search is to begin. It is used by the `exec()` and `test()` methods, described in the next two subsections.

::: tip 翻译
该属性是一个读/写整数。 对于带有 `g` 或 `y` 标志的模式，它指定下一个搜索开始的字符位置。 它由 `exec()` 和 `test()` 方法使用，在接下来的两小节中进行描述。
:::

#### test()

The `test()` method of the RegExp class is the simplest way to use a regular expression. It takes a single string argument and returns true if the string matches the pattern or `false` if it does not match.

::: tip 翻译
`RegExp` 类的 `test()` 方法是使用正则表达式的最简单方法。 它采用单个字符串参数，如果字符串与模式匹配则返回 `true`，如果不匹配则返回 `false`。
:::

`test()` works by simply calling the (much more complicated) `exec()` method described in the next section and returning true if `exec()` returns a non-null value. Because of this, if you use `test()` with a RegExp that uses the `g` or `y` flags, then its behavior depends on the value of the `lastIndex` property of the RegExp object, which can change unexpectedly. See “The lastIndex Property and RegExp Reuse” on page 299 for more details.

::: tip 翻译
`test()` 的工作原理是简单地调用下一节中描述的（更复杂的） `exec()` 方法，如果 `exec()` 返回非空值，则返回 `true`。 因此，如果将 `test()` 与使用 `g` 或 `y` 标志的 `RegExp` 一起使用，则其行为取决于 `RegExp` 对象的 `lastIndex` 属性的值，该值可能会意外更改。 有关详细信息，请参阅第 299 页的“lastIndex 属性和 RegExp 重用”。
:::

#### exec()

The RegExp `exec()` method is the most general and powerful way to use regular expressions. It takes a single string argument and looks for a match in that string. If no match is found, it returns `null`. If a match is found, however, it returns an array just like the array returned by the `match()` method for non-global searches. Element 0 of the array contains the string that matched the regular expression, and any subsequent array elements contain the substrings that matched any capturing groups. The returned array also has named properties: the `index` property contains the character position at which the match occurred, and the `input` property specifies the string that was searched, and the `groups` property, if defined, refers to an object that holds the substrings matching the any named capturing groups.

::: tip 翻译
RegExp `exec()` 方法是使用正则表达式的最通用和最强大的方法。 它采用单个字符串参数并在该字符串中查找匹配项。 如果未找到匹配项，则返回 `null`。 但是，如果找到匹配项，它会返回一个数组，就像非全局搜索的 `match()` 方法返回的数组一样。 数组的元素 0 包含与正则表达式匹配的字符串，任何后续数组元素都包含与任何捕获组匹配的子字符串。 返回的数组还具有命名属性：`index` 属性包含匹配发生的字符位置，`input`属性指定搜索的字符串，`groups` 属性（如果定义）引用一个对象 它保存与任何命名捕获组匹配的子字符串。
:::

Unlike the String `match()` method, `exec()` returns the same kind of array whether or not the regular expression has the global `g` flag. Recall that `match()` returns an array of matches when passed a global regular expression. `exec()`, by contrast, always returns a single match and provides complete information about that match. When `exec()` is called on a regular expression that has either the global `g` flag or the sticky `y` flag set, it consults the `lastIndex` property of the RegExp object to determine where to start looking for a match. (And if the `y` flag is set, it also constrains the match to begin at that position.) For a newly created RegExp object, `lastIndex` is 0, and the search begins at the start of the string. But each time `exec()` successfully finds a match, it updates the `lastIndex` property to the index of the character immediately after the matched text. If `exec()` fails to find a match, it resets `lastIndex` to 0. This special behavior allows you to call `exec()` repeatedly in order to loop through all the regular expression matches in a string. (Although, as we’ve described, in ES2020 and later, the `matchAll()` method of String is an easier way to loop through all matches.) For example, the loop in the following code will run twice:

::: tip 翻译
与 String `match()` 方法不同，无论正则表达式是否具有全局 `g` 标志，`exec()` 都会返回相同类型的数组。 回想一下，当传递全局正则表达式时，`match()` 返回一个匹配数组。 相比之下，`exec()` 始终返回单个匹配项并提供有关该匹配项的完整信息。 当对设置了全局 `g` 标志或粘性 `y` 标志的正则表达式调用 `exec()` 时，它会查阅 `RegExp` 对象的 `lastIndex` 属性来确定从哪里开始查找匹配项 。 （如果设置了 `y` 标志，它还会限制匹配从该位置开始。）对于新创建的 `RegExp` 对象，`lastIndex`为 0，并且搜索从字符串的开头开始。 但每次`exec()` 成功找到匹配项时，它都会将 `lastIndex` 属性更新为紧随匹配文本之后的字符的索引。 如果 `exec()` 未能找到匹配项，则会将 `lastIndex` 重置为 0。这种特殊行为允许您重复调用 `exec()` 以便循环遍历字符串中的所有正则表达式匹配项。 （尽管，正如我们所描述的，在 ES2020 及更高版本中，String 的 `matchAll()` 方法是循环所有匹配项的更简单方法。）例如，以下代码中的循环将运行两次：
:::

```js
let pattern = /Java/g;
let text = "JavaScript > Java";
let match;
while ((match = pattern.exec(text)) !== null) {
  console.log(`Matched ${match[0]} at ${match.index}`);
  console.log(`Next search begins at ${pattern.lastIndex}`);
}
```

> **The lastIndex Property and RegExp Reuse**
>
> As you have seen already, JavaScript’s regular expression API is complicated. The use of the `lastIndex` property with the `g` and `y` flags is a particularly awkward part of this API. When you use these flags, you need to be particularly careful when calling the `match()`, `exec()`, or `test()` methods because the behavior of these methods depends on `lastIndex`, and the value of `lastIndex` depends on what you have previously done with the RegExp object. This makes it easy to write buggy code.
>
> Suppose, for example, that we wanted to find the index of all `<p>` tags within a string of HTML text. We might write code like this:
>
> ```js
> let match,
>   positions = [];
> while ((match = /<p>/g.exec(html)) !== null) {
>   // POSSIBLE INFINITE LOOP
>   positions.push(match.index);
> }
> ```
>
> This code does not do what we want it to. If the `html` string contains at least one `<p>` tag, then it will loop forever. The problem is that we use a RegExp literal in the while loop condition. For each iteration of the loop, we’re creating a new RegExp object with `lastIndex` set to 0, so `exec()` always begins at the start of the string, and if there is a match, it will keep matching over and over. The solution, of course, is to define the RegExp once, and save it to a variable so that we’re using the same RegExp object for each iteration of the loop.
>
> On the other hand, sometimes reusing a RegExp object is the wrong thing to do. Suppose, for example, that we want to loop through all of the words in a dictionary to find words that contain pairs of double letters:
>
> ```js
> let dictionary = ["apple", "book", "coffee"];
> let doubleLetterWords = [];
> let doubleLetter = /(\w)\1/g;
>
> for (let word of dictionary) {
>   if (doubleLetter.test(word)) {
>     doubleLetterWords.push(word);
>   }
> }
> doubleLetterWords; // => ['apple', 'coffee']: 'book' is missing!
> ```
>
> Because we set the g flag on the RegExp, the `lastIndex` property is changed after successful matches, and the `test()` method (which is based on `exec()`) starts searching for a match at the position specified by `lastIndex`. After matching the “pp” in “apple”, `lastIndex` is 3, and so we start searching the word “book” at position 3 and do not see the “oo” that it contains.
>
> We could fix this problem by removing the `g` flag (which is not actually necessary in this particular example), or by moving the RegExp literal into the body of the loop so that it is re-created on each iteration, or by explicitly resetting lastIndex to zero before each call to `test()`.
>
> The moral here is that `lastIndex` makes the RegExp API error prone. So be extra careful when using the `g` or `y` flags and looping. And in ES2020 and later, use the String `matchAll()` method instead of `exec()` to sidestep this problem since `matchAll()` does not modify `lastIndex`.

> **lastIndex 属性和正则表达式重用**
>
> 正如您已经看到的，JavaScript 的正则表达式 API 很复杂。 将 `lastIndex` 属性与 `g` 和 `y` 标志一起使用是此 API 中特别尴尬的部分。 当您使用这些标志时，在调用 `match()`、`exec()` 或 `test()` 方法时需要特别小心，因为这些方法的行为取决于 `lastIndex` 和 `lastIndex` 取决于您之前对 `RegExp` 对象所做的操作。 这使得编写有错误的代码变得很容易。
>
> 另一方面，有时重用 `RegExp` 对象是错误的做法。 例如，假设我们想要循环字典中的所有单词以查找包含双字母对的单词：
>
> ```js
> let dictionary = ["apple", "book", "coffee"];
> let doubleLetterWords = [];
> let doubleLetter = /(\w)\1/g;
>
> for (let word of dictionary) {
>   if (doubleLetter.test(word)) {
>     doubleLetterWords.push(word);
>   }
> }
> doubleLetterWords; // => ['apple', 'coffee']: 'book' is missing!
> ```
>
> 因为我们在 `RegExp` 上设置了 `g` 标志，所以在成功匹配后，`lastIndex` 属性会发生更改，并且 `test()` 方法（基于 `exec()`）开始在由 指定的位置搜索匹配项 `lastIndex`。 匹配“apple”中的“pp”后，`lastIndex`为 3，因此我们从位置 3 开始搜索单词“book”，但没有看到它包含的“oo”。
>
> 我们可以通过删除 `g` 标志（在这个特定示例中实际上并不需要）来解决这个问题，或者通过将 `RegExp` 文字移动到循环体中以便在每次迭代时重新创建它，或者通过显式地 在每次调用 `test()` 之前将 `lastIndex` 重置为零。
>
> 这里的寓意是 `lastIndex` 使 `RegExp` API 容易出错。 因此，在使用 `g` 或 `y` 标志和循环时要格外小心。 在 ES2020 及更高版本中，使用 String `matchAll()` 方法而不是 `exec()` 来回避这个问题，因为 `matchAll()` 不会修改 `lastIndex`。

## Dates and Times

The Date class is JavaScript’s API for working with dates and times. Create a Date object with the `Date()` constructor. With no arguments, it returns a Date object that represents the current date and time:

```js
let now = new Date(); // The current time
```

If you pass one numeric argument, the `Date()` constructor interprets that argument as the number of milliseconds since the 1970 epoch:

```js
let epoch = new Date(0); // Midnight, January 1, 1970, GMT
```

If you specify two or more integer arguments, they are interpreted as the year, month, day-of-month, hour, minute, second, and millisecond in your local time zone, as in the following:

```js
let century = new Date(
  2100, // Year 2100
  0, // January
  1, // 1st
  2,
  3,
  4,
  5
); // 02:03:04.005, local time
```

One quirk of the Date API is that the first month of a year is number 0, but the first day of a month is number 1. If you omit the time fields, the `Date()` constructor defaults them all to 0, setting the time to midnight.

Note that when invoked with multiple numbers, the `Date()` constructor interprets them using whatever time zone the local computer is set to. If you want to specify a date and time in UTC (Universal Coordinated Time, aka GMT), then you can use the `Date.UTC()`. This static method takes the same arguments as the `Date()` constructor, interprets them in UTC, and returns a millisecond timestamp that you can pass to the `Date()` constructor:

```js
// Midnight in England, January 1, 2100
let century = new Date(Date.UTC(2100, 0, 1));
```

If you print a date (with `console.log(century)`, for example), it will, by default, be printed in your local time zone. If you want to display a date in UTC, you should explicitly convert it to a string with `toUTCString()` or `toISOString()`.

Finally, if you pass a string to the `Date()` constructor, it will attempt to parse that string as a date and time specification. The constructor can parse dates specified in the formats produced by the `toString()`, `toUTCString()`, and `toISOString()` methods:

```js
let century = new Date("2100-01-01T00:00:00.000Z"); // An ISO format date
```

Once you have a Date object, various get and set methods allow you to query and modify the year, month, day-of-month, hour, minute, second, and millisecond fields of the Date. Each of these methods has two forms: one that gets or sets using local time and one that gets or sets using UTC time. To get or set the year of a Date object, for example, you would use `getFullYear()`, `getUTCFullYear()`, `setFullYear()`, or `setUTCFullYear()`:

```js
let d = new Date(); // Start with the current date
d.setFullYear(d.getFullYear() + 1); // Increment the year
```

To get or set the other fields of a Date, replace “FullYear” in the method name with “Month”, “Date”, “Hours”, “Minutes”, “Seconds”, or “Milliseconds”. Some of the date set methods allow you to set more than one field at a time. `setFullYear()` and `setUTCFullYear()` also optionally allow you to set the month and day-of-month as well. And `setHours()` and `setUTCHours()` allow you to specify the minutes, seconds, and milliseconds fields in addition to the hours field.

Note that the methods for querying the day-of-month are `getDate()` and `getUTCDate()`. The more natural-sounding functions `getDay()` and `getUTCDay()` return the day-of-week (0 for Sunday through 6 for Saturday). The day-of-week is read-only, so there is not a corresponding `setDay()` method.

### Timestamps

JavaScript represents dates internally as integers that specify the number of milliseconds since (or before) midnight on January 1, 1970, UTC time. Integers as large as 8,640,000,000,000,000 are supported, so JavaScript won’t be running out of milliseconds for more than 270,000 years.

For any Date object, the `getTime()` method returns this internal value, and the `setTime()` method sets it. So you can add 30 seconds to a Date with code like this, for example:

```js
d.setTime(d.getTime() + 30000);
```

These millisecond values are sometimes called timestamps, and it is sometimes useful to work with them directly rather than with Date objects. The static `Date.now()` method returns the current time as a timestamp and is helpful when you want to measure how long your code takes to run:

```js
let startTime = Date.now();
reticulateSplines(); // Do some time-consuming operation
let endTime = Date.now();
console.log(`Spline reticulate took ${endTime - startTime}ms`);
```

> **High-Resolution Timestamps**
>
> The timestamps returned by `Date.now()` are measured in milliseconds. A millisecond is actually a relatively long time for a computer, and sometimes you may want to measure elapsed time with higher precision. The `performance.now()` function allows this: it also returns a millisecond-based timestamp, but the return value is not an integer, so it includes fractions of a millisecond. The value returned by `performance.now()` is not an absolute timestamp like the `Date.now()` value is. Instead, it simply indicates how much time has elapsed since a web page was loaded or since the Node process started.
>
> The `performance` object is part of a larger Performance API that is not defined by the ECMAScript standard but is implemented by web browsers and by Node. In order to use the performance object in Node, you must import it with:
>
> ```js
> const { performance } = require("perf_hooks");
> ```
>
> Allowing high-precision timing on the web may allow unscrupulous websites to fingerprint visitors, so browsers (notably Firefox) may reduce the precision of `performance.now()` by default. As a web developer, you should be able to re-enable highprecision timing somehow (such as by setting `privacy.reduceTimerPrecision` to false in Firefox).

### Date Arithmetic

Date objects can be compared with JavaScript’s standard `<`, `<=`, `>`, and `>=` comparison operators. And you can subtract one Date object from another to determine the number of milliseconds between the two dates. (This works because the Date class defines a `valueOf()` method that returns a timestamp.)

If you want to add or subtract a specified number of seconds, minutes, or hours from a Date, it is often easiest to simply modify the timestamp as demonstrated in the previous example, when we added 30 seconds to a date. This technique becomes more cumbersome if you want to add days, and it does not work at all for months and years since they have varying numbers of days. To do date arithmetic involving days, months, and years, you can use `setDate()`, `setMonth()`, and `setYear()`. Here, for example, is code that adds three months and two weeks to the current date:

```js
let d = new Date();
d.setMonth(d.getMonth() + 3, d.getDate() + 14);
```

Date setting methods work correctly even when they overflow. When we add three months to the current month, we can end up with a value greater than 11 (which represents December). The `setMonth()` handles this by incrementing the year as needed. Similarly, when we set the day of the month to a value larger than the number of days in the month, the month gets incremented appropriately.

### Formatting and Parsing Date Strings

If you are using the Date class to actually keep track of dates and times (as opposed to just measuring time intervals), then you are likely to need to display dates and times to the users of your code. The Date class defines a number of different methods for converting Date objects to strings. Here are some examples:

```js
let d = new Date(2020, 0, 1, 17, 10, 30); // 5:10:30pm on New Year's Day 2020
d.toString(); // => "Wed Jan 01 2020 17:10:30 GMT-0800 (Pacific Standard Time)"
d.toUTCString(); // => "Thu, 02 Jan 2020 01:10:30 GMT"
d.toLocaleDateString(); // => "1/1/2020": 'en-US' locale
d.toLocaleTimeString(); // => "5:10:30 PM": 'en-US' locale
d.toISOString(); // => "2020-01-02T01:10:30.000Z"
```

This is a full list of the string formatting methods of the Date class:

#### toString()

This method uses the local time zone but does not format the date and time in a locale-aware way.

#### toUTCString()

This method uses the UTC time zone but does not format the date in a localeaware way.

#### toISOString()

This method prints the date and time in the standard year-month-day
hours:minutes:seconds.ms format of the ISO-8601 standard. The letter “T” separates the date portion of the output from the time portion of the output. The time is expressed in UTC, and this is indicated with the letter “Z” as the last letter of the output.

#### toLocaleString()

This method uses the local time zone and a format that is appropriate for the user’s locale.

#### toDateString()

This method formats only the date portion of the Date and omits the time. It uses the local time zone and does not do locale-appropriate formatting.

#### toLocaleDateString()

This method formats only the date. It uses the local time zone and a localeappropriate date format.

#### toTimeString()

This method formats only the time and omits the date. It uses the local time zone but does not format the time in a locale-aware way.

#### toLocaleTimeString()

This method formats the time in a locale-aware way and uses the local time zone.

None of these date-to-string methods is ideal when formatting dates and times to be displayed to end users. See §11.7.2 for a more general-purpose and locale-aware dateand time-formatting technique.

Finally, in addition to these methods that convert a Date object to a string, there is also a static `Date.parse()` method that takes a string as its argument, attempts to parse it as a date and time, and returns a timestamp representing that date. `Date.parse()` is able to parse the same strings that the `Date()` constructor can and is guaranteed to be able to parse the output of `toISOString()`, `toUTCString()`, and `toString()`.

## Error Classes

The JavaScript `throw` and `catch` statements can throw and catch any JavaScript value, including primitive values. There is no exception type that must be used to signal errors. JavaScript does define an Error class, however, and it is traditional to use instances of Error or a subclass when signaling an error with throw. One good reason to use an Error object is that, when you create an Error, it captures the state of the JavaScript stack, and if the exception is uncaught, the stack trace will be displayed with the error message, which will help you debug the issue. (Note that the stack trace shows where the Error object was created, not where the throw statement throws it. If you always create the object right before throwing it with `throw new Error()`, this will not cause any confusion.)

Error objects have two properties: `message` and `name`, and a `toString()` method. The value of the `message` property is the value you passed to the `Error()` constructor, converted to a string if necessary. For error objects created with `Error()`, the `name` property is always “Error”. The `toString()` method simply returns the value of the `name` property followed by a colon and space and the value of the `message` property.

Although it is not part of the ECMAScript standard, Node and all modern browsers also define a `stack` property on Error objects. The value of this property is a multiline string that contains a stack trace of the JavaScript call stack at the moment that the Error object was created. This can be useful information to log when an unexpected error is caught.

In addition to the Error class, JavaScript defines a number of subclasses that it uses to signal particular types of errors defined by ECMAScript. These subclasses are EvalError, RangeError, ReferenceError, SyntaxError, TypeError, and URIError. You can use these error classes in your own code if they seem appropriate. Like the base Error class, each of these subclasses has a constructor that takes a single message argument. And instances of each of these subclasses have a `name` property whose value is the same as the constructor name.

You should feel free to define your own Error subclasses that best encapsulate the error conditions of your own program. Note that you are not limited to the `name` and `message` properties. If you create a subclass, you can define new properties to provide error details. If you are writing a parser, for example, you might find it useful to define a ParseError class with line and `column` properties that specify the exact location of the parsing failure. Or if you are working with HTTP requests, you might want to define an HTTPError class that has a `status` property that holds the HTTP status code (such as 404 or 500) of the failed request.

For example:

```js
class HTTPError extends Error {
  constructor(status, statusText, url) {
    super(`${status} ${statusText}: ${url}`);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }

  get name() {
    return "HTTPError";
  }
}

let error = new HTTPError(404, "Not Found", "https://example.com");
error.status; // => 404
error.message; // => '404 Not Found: https://example.com'
error.name; // => 'HTTPError'
```

## JSON Serialization and Parsing

When a program needs to save data or needs to transmit data across a network connection to another program, it must to convert its in-memory data structures into a string of bytes or characters than can be saved or transmitted and then later be parsed to restore the original in-memory data structures. This process of converting data structures into streams of bytes or characters is known as _serialization_ (or _marshaling_ or even _pickling_).

The easiest way to serialize data in JavaScript uses a serialization format known as JSON. This acronym stands for “JavaScript Object Notation” and, as the name implies, the format uses JavaScript object and array literal syntax to convert data structures consisting of objects and arrays into strings. JSON supports primitive numbers and strings and also the values `true`, `false`, and `null`, as well as arrays and objects built up from those primitive values. JSON does not support other JavaScript types like Map, Set, RegExp, Date, or typed arrays. Nevertheless, it has proved to be a remarkably versatile data format and is in common use even with non-JavaScriptbased programs.

JavaScript supports JSON serialization and deserialization with the two functions `JSON.stringify()` and `JSON.parse()`, which were covered briefly in §6.8. Given an object or array (nested arbitrarily deeply) that does not contain any nonserializable values like RegExp objects or typed arrays, you can serialize the object simply by passing it to `JSON.stringify()`. As the name implies, the return value of this function is a string. And given a string returned by `JSON.stringify()`, you can re-create the original data structure by passing the string to `JSON.parse()`:

```js
let o = { s: "", n: 0, a: [true, false, null] };
let s = JSON.stringify(o); // s == '{"s":"","n":0,"a":[true,false,null]}'
let copy = JSON.parse(s); // copy == {s: "", n: 0, a: [true, false, null]}
```

If we leave out the part where serialized data is saved to a file or sent over the network, we can use this pair of functions as a somewhat inefficient way of creating a deep copy of an object:

```js
// Make a deep copy of any serializable object or array
function deepcopy(o) {
  return JSON.parse(JSON.stringify(o));
}
```

> **JSON Is a Subset of JavaScript**
>
> When data is serialized to JSON format, the result is valid JavaScript source code for an expression that evaluates to a copy of the original data structure. If you prefix a JSON string with `var data =` and pass the result to `eval()`, you’ll get a copy of the original data structure assigned to the variable data. You should never do this, however, because it is a huge security hole—if an attacker could inject arbitrary JavaScript code into a JSON file, they could make your program run their code. It is faster and safer to just use `JSON.parse()` to decode JSON-formatted data.
>
> JSON is sometimes used as a human-readable configuration file format. If you find yourself hand-editing a JSON file, note that the JSON format is a very strict subset of JavaScript. Comments are not allowed and property names must be enclosed in double quotes even when JavaScript would not require this.

Typically, you pass only a single argument to `JSON.stringify()` and `JSON.parse()`. Both functions accept an optional second argument that allows us to extend the JSON format, and these are described next. `JSON.stringify()` also takes an optional third argument that we’ll discuss first. If you would like your JSON-formatted string to be human-readable (if it is being used as a configuration file, for example), then you should pass null as the second argument and pass a number or string as the third argument. This third argument tells `JSON.stringify()` that it should format the data on multiple indented lines. If the third argument is a number, then it will use that number of spaces for each indentation level. If the third argument is a string of whitespace (such as '\t'), it will use that string for each level of indent.

```js
let o = {
  s: "test",
  n: 0,
};
JSON.stringify(o, null, 2); // => '{\n "s": "test",\n "n": 0\n}'
```

`JSON.parse()` ignores whitespace, so passing a third argument to `JSON.stringify()` has no impact on our ability to convert the string back into a data structure.

### JSON Customizations

If `JSON.stringify()` is asked to serialize a value that is not natively supported by the JSON format, it looks to see if that value has a `toJSON()` method, and if so, it calls that method and then stringifies the return value in place of the original value. Date objects implement `toJSON()`: it returns the same string that `toISOString()` method does. This means that if you serialize an object that includes a Date, the date will automatically be converted to a string for you. When you parse the serialized string, the re-created data structure will not be exactly the same as the one you started with because it will have a string where the original object had a Date.

If you need to re-create Date objects (or modify the parsed object in any other way), you can pass a “reviver” function as the second argument to `JSON.parse()`. If specified, this “reviver” function is invoked once for each primitive value (but not the objects or arrays that contain those primitive values) parsed from the input string. The function is invoked with two arguments. The first is a property name—either an object property name or an array index converted to a string. The second argument is the primitive value of that object property or array element. Furthermore, the function is invoked as a method of the object or array that contains the primitive value, so you can refer to that containing object with the `this` keyword.

The return value of the reviver function becomes the new value of the named property. If it returns its second argument, the property will remain unchanged. If it returns `undefined`, then the named property will be deleted from the object or array before `JSON.parse()` returns to the user.

As an example, here is a call to `JSON.parse()` that uses a reviver function to filter some properties and to re-create Date objects:

```js
let data = JSON.parse(text, function (key, value) {
  // Remove any values whose property name begins with an underscore
  if (key[0] === "_") {
    return undefined;
  }

  // If the value is a string in ISO 8601 date format convert it to a Date
  if (
    typeof value === "string" &&
    /^\d\d\d\d-\d\dT\d\d:\d\d.\d\d\dZ$/.test(value)
  ) {
    return new Date(value);
  }

  // Otherwise, return the value unchanged
  return value;
});
```

In addition to its use of `toJSON()` described earlier, `JSON.stringify()` also allows its output to be customized by passing an array or a function as the optional second argument.

If an array of strings (or numbers—they are converted to strings) is passed instead as the second argument, these are used as the names of object properties (or array elements). Any property whose name is not in the array will be omitted from stringification. Furthermore, the returned string will include properties in the same order that they appear in the array (which can be very useful when writing tests).

If you pass a function, it is a replacer function—effectively the inverse of the optional reviver function you can pass to `JSON.parse()`. If specified, the replacer function is invoked for each value to be stringified. The first argument to the replacer function is the object property name or array index of the value within that object, and the second argument is the value itself. The replacer function is invoked as a method of the object or array that contains the value to be stringified. The return value of the replacer function is stringified in place of the original value. If the replacer returns `undefined` or returns nothing at all, then that value (and its array element or object property) is omitted from the stringification.

```js
// Specify what fields to serialize, and what order to serialize them in
let text = JSON.stringify(address, ["city", "state", "country"]);

// Specify a replacer function that omits RegExp-value properties.
let json = JSON.stringify(o, (k, v) => (v instanceof RegExp ? undefined : v));
```

The two `JSON.stringify()` calls here use the second argument in a benign way, producing serialized output that can be deserialized without requiring a special reviver function. In general, though, if you define a `toJSON()` method for a type, or if you use a replacer function that actually replaces nonserializable values with serializable ones, then you will typically need to use a custom reviver function with `JSON.parse()` to get your original data structure back. If you do this, you should understand that you are defining a custom data format and sacrificing portability and compatibility with a large ecosystem of JSON-compatible tools and languages.

## The Internationalization API

The JavaScript internationalization API consists of the three classes Intl.NumberFormat, Intl.DateTimeFormat, and Intl.Collator that allow us to format numbers (including monetary amounts and percentages), dates, and times in locale-appropriate ways and to compare strings in locale-appropriate ways. These classes are not part of the ECMAScript standard but are defined as part of the _ECMA402 standard_ and are wellsupported by web browsers. The Intl API is also supported in Node, but at the time of this writing, prebuilt Node binaries do not ship with the localization data required to make them work with locales other than US English. So in order to use these classes with Node, you may need to download a separate data package or use a custom build of Node.

One of the most important parts of internationalization is displaying text that has been translated into the user’s language. There are various ways to achieve this, but none of them are within the scope of the Intl API described here.

### Formatting Numbers

Users around the world expect numbers to be formatted in different ways. Decimal points can be periods or commas. Thousands separators can be commas or periods, and they aren’t used every three digits in all places. Some currencies are divided into hundredths, some into thousandths, and some have no subdivisions. Finally, although the so-called “Arabic numerals” 0 through 9 are used in many languages, this is not universal, and users in some countries will expect to see numbers written using the digits from their own scripts.

The Intl.NumberFormat class defines a `format()` method that takes all of these formatting possibilities into account. The constructor takes two arguments. The first argument specifies the locale that the number should be formatted for and the second is an object that specifies more details about how the number should be formatted. If the first argument is omitted or `undefined`, then the system locale (which we assume to be the user’s preferred locale) will be used. If the first argument is a string, it specifies a desired locale, such as "`en-US`" (English as used in the United States), "`fr`" (French), or "`zh-Hans-CN`" (Chinese, using the simplified Han writing system, in China). The first argument can also be an array of locale strings, and in this case, Intl.NumberFormat will choose the most specific one that is well supported.

The second argument to the `Intl.NumberFormat()` constructor, if specified, should be an object that defines one or more of the following properties:

#### style

Specifies the kind of number formatting that is required. The default is "`decimal`". Specify "`percent`" to format a number as a percentage or specify "currency" to specify a number as an amount of money.

#### currency

If style is "`currency`", then this property is required to specify the three-letter ISO currency code (such as "USD" for US dollars or "GBP" for British pounds) of the desired currency.

#### currencyDisplay

If style is "`currency`", then this property specifies how the currency is displayed. The default value "`symbol`" uses a currency symbol if the currency has one. The value "`code`" uses the three-letter ISO code, and the value "`name`" spells out the name of the currency in long form.

#### useGrouping

Set this property to `false` if you do not want numbers to have thousands separators (or their locale-appropriate equivalents).

#### minimumIntegerDigits

The minimum number of digits to use to display the integer part of the number. If the number has fewer digits than this, it will be padded on the left with zeros. The default value is 1, but you can use values as high as 21.

#### minimumFractionDigits, maximumFractionDigits

These two properties control the formatting of the fractional part of the number. If a number has fewer fractional digits than the minimum, it will be padded with zeros on the right. If it has more than the maximum, then the fractional part will be rounded. Legal values for both properties are between 0 and 20. The default minimum is 0 and the default maximum is 3, except when formatting monetary amounts, when the length of the fractional part varies depending on the specified currency.

#### minimumSignificantDigits, maximumSignificantDigits

These properties control the number of significant digits used when formatting a number, making them suitable when formatting scientific data, for example. If specified, these properties override the integer and fractional digit properties listed previously. Legal values are between 1 and 21.

Once you have created an Intl.NumberFormat object with the desired locale and options, you use it by passing a number to its `format()` method, which returns an appropriately formatted string. For example:

```js
let euros = Intl.NumberFormat("es", { style: "currency", currency: "EUR" });
euros.format(10); // => '10,00 €': ten euros, Spanish formatting

let pounds = Intl.NumberFormat("en", { style: "currency", currency: "GBP" });
pounds.format(1000); // => '£1,000.00': One thousand pounds, English formatting
```

A useful feature of `Intl.NumberFormat` (and the other Intl classes as well) is that its `format()` method is bound to the NumberFormat object to which it belongs. So instead of defining a variable that refers to the formatting object and then invoking the `format()` method on that, you can just assign the `format()` method to a variable and use it as if it were a standalone function, as in this example:

```js
let data = [0.05, 0.75, 1];
let formatData = Intl.NumberFormat(undefined, {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
}).format;

data.map(formatData); // => [ '5.0%', '75.0%', '100.0%' ]: in en-US locale
```

Some languages, such as Arabic, use their own script for decimal digits:

```js
let arabic = Intl.NumberFormat("ar", { useGrouping: false }).format;
arabic(1234567890); // => '١٢٣٤٥٦٧٨٩٠'
```

Other languages, such as Hindi, use a script that has its own set of digits, but tend to use the ASCII digits 0–9 by default. If you want to override the default script used for digits, add `-u-nu-` to the locale and follow it with an abbreviated script name. You can format numbers with Indian-style grouping and Devanagari digits like this, for example:

```js
let hindi = Intl.NumberFormat("hi-IN-u-nu-deva").format;
hindi(1234567890); // => '१,२३,४५,६७,८९०'
```

`-u-` in a locale specifies that what comes next is a Unicode extension. `nu` is the extension name for the numbering system, and `deva` is short for Devanagari. The Intl API standard defines names for a number of other numbering systems, mostly for the Indic languages of South and Southeast Asia.

### Formatting Dates and Times

The Intl.DateTimeFormat class is a lot like the Intl.NumberFormat class. The `Intl.DateTimeFormat()` constructor takes the same two arguments that `Intl.NumberFormat()` does: a locale or array of locales and an object of formatting options. And the way you use an Intl.DateTimeFormat instance is by calling its `format()` method to convert a Date object to a string.

As mentioned in §11.4, the Date class defines simple `toLocaleDateString()` and `toLocaleTimeString()` methods that produce locale-appropriate output for the user’s locale. But these methods don’t give you any control over what fields of the date and time are displayed. Maybe you want to omit the year but add a weekday to the date format. Do you want the month to be represented numerically or spelled out by name? The Intl.DateTimeFormat class provides fine-grained control over what is output based on the properties in the options object that is passed as the second argument to the constructor. Note, however, that Intl.DateTimeFormat cannot always display exactly what you ask for. If you specify options to format hours and seconds but omit minutes, you’ll find that the formatter displays the minutes anyway. The idea is that you use the options object to specify what date and time fields you’d like to present to the user and how you’d like those formatted (by name or by number, for example), then the formatter will look for a locale-appropriate format that most closely matches what you have asked for.

The available options are the following. Only specify properties for date and time fields that you would like to appear in the formatted output.

#### year

Use "`numeric`" for a full, four-digit year or "`2-digit`" for a two-digit abbreviation.

#### month

Use "`numeric`" for a possibly short number like “1”, or "`2-digit`" for a numeric representation that always has two digits, like “01”. Use "`long`" for a full name like “January”, "`short`" for an abbreviated name like “Jan”, and "`narrow`" for a highly abbreviated name like “J” that is not guaranteed to be unique.

#### day

Use "`numeric`" for a one- or two-digit number or "`2-digit`" for a two-digit number for the day-of-month.

#### weekday

Use "`long`" for a full name like “Monday”, "`short`" for an abbreviated name like “Mon”, and "`narrow`" for a highly abbreviated name like “M” that is not guaranteed to be unique.

#### era

This property specifies whether a date should be formatted with an era, such as CE or BCE. This may be useful if you are formatting dates from very long ago or if you are using a Japanese calendar. Legal values are "`long`", "`short`", and "`narrow`".

#### hour, minute, second

These properties specify how you would like time displayed. Use "`numeric`" for a one- or two-digit field or "`2-digit`" to force single-digit numbers to be padded on the left with a 0.

#### timeZone

This property specifies the desired time zone for which the date should be formatted. If omitted, the local time zone is used. Implementations always recognize “UTC” and may also recognize Internet Assigned Numbers Authority (IANA) time zone names, such as “America/Los_Angeles”.

#### timeZoneName

This property specifies how the time zone should be displayed in a formatted date or time. Use "`long`" for a fully spelled-out time zone name and "`short`" for an abbreviated or numeric time zone.

#### hour12

This boolean property specifies whether or not to use 12-hour time. The default is locale dependent, but you can override it with this property.

#### hourCycle

This property allows you to specify whether midnight is written as 0 hours, 12 hours, or 24 hours. The default is locale dependent, but you can override the default with this property. Note that hour12 takes precedence over this property. Use the value "`h11`" to specify that midnight is 0 and the hour before midnight is 11pm. Use "`h12`" to specify that midnight is 12. Use "`h23`" to specify that midnight is 0 and the hour before midnight is 23. And use "`h24`" to specify that midnight is 24.

Here are some examples:

```js
let d = new Date("2020-01-02T13:14:15Z"); // January 2nd, 2020, 13:14:15 UTC

// With no options, we get a basic numeric date format
Intl.DateTimeFormat("en-US").format(d); // => '1/2/2020'
Intl.DateTimeFormat("fr-FR").format(d); // => '02/01/2020'

// Spelled out weekday and month
let opts = { weekday: "long", month: "long", year: "numeric", day: "numeric" };
Intl.DateTimeFormat("en-US", opts).format(d); // => 'Tuesday, January 2, 2020'
Intl.DateTimeFormat("es-ES", opts).format(d); // => 'jueves, 2 de enero de 2020'

// The time in New York, for a French-speaking Canadian
opts = { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" };
Intl.DateTimeFormat("fr-CA", opts).format(d); // => '8 h 14'
```

Intl.DateTimeFormat can display dates using calendars other than the default Julian calendar based on the Christian era. Although some locales may use a non-Christian calendar by default, you can always explicitly specify the calendar to use by adding `-u-ca-` to the locale and following that with the name of the calendar. Possible calendar names include “buddhist”, “chinese”, “coptic”, “ethiopic”, “gregory”, “hebrew”, “indian”, “islamic”, “iso8601”, “japanese”, and “persian”. Continuing the preceding example, we can determine the year in various non-Christian calendars:

```js
let opts = { year: "numeric", era: "short" };
Intl.DateTimeFormat("en", opts).format(d); // => '2020 AD'
Intl.DateTimeFormat("en-u-ca-iso8601", opts).format(d); // => '2020 AD'
Intl.DateTimeFormat("en-u-ca-hebrew", opts).format(d); // => '5780 AM'
Intl.DateTimeFormat("en-u-ca-buddhist", opts).format(d); // => '2563 BE'
Intl.DateTimeFormat("en-u-ca-islamic", opts).format(d); // => '1441 AH'
Intl.DateTimeFormat("en-u-ca-persian", opts).format(d); // => '1398 AP'
Intl.DateTimeFormat("en-u-ca-indian", opts).format(d); // => '1941 Saka'
Intl.DateTimeFormat("en-u-ca-chinese", opts).format(d); // => '2019(ji-hai)'
Intl.DateTimeFormat("en-u-ca-japanese", opts).format(d); // => '2 Reiwa'
```

### Comparing Strings

The problem of sorting strings into alphabetical order (or some more general “collation order” for nonalphabetical scripts) is more challenging than English speakers often realize. English uses a relatively small alphabet with no accented letters, and we have the benefit of a character encoding (ASCII, since incorporated into Unicode) whose numerical values perfectly match our standard string sort order. Things are not so simple in other languages. Spanish, for example treats ñ as a distinct letter that comes after n and before o. Lithuanian alphabetizes Y before J, and Welsh treats digraphs like CH and DD as single letters with CH coming after C and DD sorting after D.

If you want to display strings to a user in an order that they will find natural, it is not enough use the `sort()` method on an array of strings. But if you create an Intl.Collator object, you can pass the `compare()` method of that object to the `sort()` method to perform locale-appropriate sorting of the strings. Intl.Collator objects can be configured so that the `compare()` method performs case-insensitive comparisons or even comparisons that only consider the base letter and ignore accents and other diacritics.

Like `Intl.NumberFormat()` and `Intl.DateTimeFormat()`, the `Intl.Collator()` constructor takes two arguments. The first specifies a locale or an array of locales, and the second is an optional object whose properties specify exactly what kind of string comparison is to be done. The supported properties are these:

#### usage

This property specifies how the collator object is to be used. The default value is "`sort`", but you can also specify "`search`". The idea is that, when sorting strings, you typically want a collator that differentiates as many strings as possible to produce a reliable ordering. But when comparing two strings, some locales may want a less strict comparison that ignores accents, for example.

#### sensitivity

This property specifies whether the collator is sensitive to letter case and accents when comparing strings. The value "`base`" causes comparisons that ignore case and accents, considering only the base letter for each character. (Note, however, that some languages consider certain accented characters to be distinct base letters.) "`accent`" considers accents in comparisons but ignores case. "case" considers case and ignores accents. And "`variant`" performs strict comparisons that consider both case and accents. The default value for this property is "variant" when `usage` is "`sort`". If `usage` is "`search`", then the default sensitivity depends on the locale.

#### ignorePunctuation

Set this property to true to ignore spaces and punctuation when comparing strings. With this property set to `true`, the strings “any one” and “anyone”, for example, will be considered equal.

#### numeric

Set this property to true if the strings you are comparing are integers or contain integers and you want them to be sorted into numerical order instead of alphabetical order. With this option set, the string “Version 9” will be sorted before “Version 10”, for example.

#### caseFirst

This property specifies which letter case should come first. If you specify "upper", then “A” will sort before “a”. And if you specify "`lower`", then “a” will sort before “A”. In either case, note that the upper- and lowercase variants of the same letter will be next to one another in sort order, which is different than Unicode lexicographic ordering (the default behavior of the Array `sort()` method) in which all ASCII uppercase letters come before all ASCII lowercase letters. The default for this property is locale dependent, and implementations may ignore this property and not allow you to override the case sort order.

Once you have created an Intl.Collator object for the desired locale and options, you can use its `compare()` method to compare two strings. This method returns a number. If the returned value is less than zero, then the first string comes before the second string. If it is greater than zero, then the first string comes after the second string. And if `compare()` returns zero, then the two strings are equal as far as this collator is concerned.

This `compare()` method that takes two strings and returns a number less than, equal to, or greater than zero is exactly what the Array `sort()` method expects for its optional argument. Also, Intl.Collator automatically binds the `compare()` method to its instance, so you can pass it directly to `sort()` without having to write a wrapper function and invoke it through the collator object. Here are some examples:

```js
// A basic comparator for sorting in the user's locale.
// Never sort human-readable strings without passing something like this:
const collator = new Intl.Collator().compare;
["a", "z", "A", "Z"].sort(collator); // => ['a', 'A', 'z', 'Z']

// Filenames often include numbers, so we should sort those specially
const filenameOrder = new Intl.Collator(undefined, { numeric: true }).compare;
["page10", "page9"].sort(filenameOrder); // => ['page9', 'page10']

// Find all strings that loosely match a target string
const fuzzyMatcher = new Intl.Collator(undefined, {
  sensitivity: "base",
  ignorePunctuation: true,
}).compare;
let strings = ["food", "fool", "Føø Bar"];
strings.findIndex((s) => fuzzyMatcher(s, "foobar") === 0); // => 2
```

Some locales have more than one possible collation order. In Germany, for example, phone books use a slightly more phonetic sort order than dictionaries do. In Spain, before 1994, “ch” and “ll” were treated as separate letters, so that country now has a modern sort order and a traditional sort order. And in China, collation order can be based on character encodings, the base radical and strokes of each character, or on the Pinyin romanization of characters. These collation variants cannot be selected through the Intl.Collator options argument, but they can be selected by adding `-uco-` to the locale string and adding the name of the desired variant. Use "`de-DE-uco-phonebk`" for phone book ordering in Germany, for example, and "`zh-TW-u-copinyin`" for Pinyin ordering in Taiwan.

```js
// Before 1994, CH and LL were treated as separate letters in Spain
const modernSpanish = Intl.Collator("es-ES").compare;
const traditionalSpanish = Intl.Collator("es-ES-u-co-trad").compare;
let palabras = ["luz", "llama", "como", "chico"];
palabras.sort(modernSpanish); // => ["chico", "como", "llama", "luz"]
palabras.sort(traditionalSpanish); // => ["como", "chico", "luz", "llama"]
```

## The Console API

You’ve seen the `console.log()` function used throughout this book: in web browsers, it prints a string in the “Console” tab of the browser’s developer tools pane, which can be very helpful when debugging. In Node, `console.log()` is a general-purpose output function and prints its arguments to the process’s stdout stream, where it typically appears to the user in a terminal window as program output.

The Console API defines a number of useful functions in addition to `console.log()`. The API is not part of any ECMAScript standard, but it is supported by browsers and by Node and has been formally written up and standardized at https://console.spec.whatwg.org.

The Console API defines the following functions:

#### console.log()

This is the most well-known of the console functions. It converts its arguments to strings and outputs them to the console. It includes spaces between the arguments and starts a new line after outputting all arguments.

#### console.debug(), console.info(), console.warn(), console.error()

These functions are almost identical to `console.log()`. In Node, `console.error()` sends its output to the stderr stream rather than the stdout stream, but the other functions are aliases of `console.log()`. In browsers, output messages generated by each of these functions may be prefixed by an icon that indicates its level or severity, and the developer console may also allow developers to filter console messages by level.

#### console.assert()

If the first argument is truthy (i.e., if the assertion passes), then this function does nothing. But if the first argument is `false` or another falsy value, then the remaining arguments are printed as if they had been passed to `console.error()` with an “Assertion failed” prefix. Note that, unlike typical `assert()` functions, `console.assert()` does not throw an exception when an assertion fails.

#### console.clear()

This function clears the console when that is possible. This works in browsers and in Node when Node is displaying its output to a terminal. If Node’s output has been redirected to a file or a pipe, however, then calling this function has no effect.

#### console.table()

This function is a remarkably powerful but little-known feature for producing tabular output, and it is particularly useful in Node programs that need to produce output that summarizes data. `console.table()` attempts to display its argument in tabular form (although, if it can’t do that, it displays it using regular
`console.log()` formatting). This works best when the argument is a relatively short array of objects, and all of the objects in the array have the same (relatively small) set of properties. In this case, each object in the array is formatted as a row of the table, and each property is a column of the table. You can also pass an array of property names as an optional second argument to specify the desired set of columns. If you pass an object instead of an array of objects, then the output will be a table with one column for property names and one column for property values. Or, if those property values are themselves objects, their property names will become columns in the table.

#### console.trace()

This function logs its arguments like `console.log()` does, and, in addition, follows its output with a stack trace. In Node, the output goes to stderr instead of stdout.

#### console.count()

This function takes a string argument and logs that string, followed by the number of times it has been called with that string. This can be useful when debugging an event handler, for example, if you need to keep track of how many times the event handler has been triggered.

#### console.countReset()

This function takes a string argument and resets the counter for that string.

#### console.group()

This function prints its arguments to the console as if they had been passed to `console.log()`, then sets the internal state of the console so that all subsequent console messages (until the next `console.groupEnd()` call) will be indented relative to the message that it just printed. This allows a group of related messages to be visually grouped with indentation. In web browsers, the developer console typically allows grouped messages to be collapsed and expanded as a group. The arguments to `console.group()` are typically used to provide an explanatory name for the group.

#### console.groupCollapsed()

This function works like `console.group()` except that in web browsers, the group will be “collapsed” by default and the messages it contains will be hidden unless the user clicks to expand the group. In Node, this function is a synonym for `console.group()`.

#### console.groupEnd()

This function takes no arguments. It produces no output of its own but ends the indentation and grouping caused by the most recent call to `console.group()` or `console.groupCollapsed()`.

#### console.time()

This function takes a single string argument, makes a note of the time it was called with that string, and produces no output.

#### console.timeLog()

This function takes a string as its first argument. If that string had previously been passed to `console.time()`, then it prints that string followed by the elapsed time since the `console.time()` call. If there are any additional arguments to `console.timeLog()`, they are printed as if they had been passed to `console.log()`.

#### console.timeEnd()

This function takes a single string argument. If that argument had previously been passed to `console.time()`, then it prints that argument and the elapsed time. After calling `console.timeEnd()`, it is no longer legal to call `console.timeLog()` without first calling `console.time()` again.

### Formatted Output with Console

Console functions that print their arguments like `console.log()` have a little-known feature: if the first argument is a string that includes `%s`, `%i`, `%d`, `%f`, `%o`, `%O`, or `%c`, then this first argument is treated as format string, and the values of subsequent arguments are substituted into the string in place of the two-character `%` sequences.

The meanings of the sequences are as follows:

#### %s

The argument is converted to a string.

#### %i and %d

The argument is converted to a number and then truncated to an integer.

#### %f

The argument is converted to a number

#### %o and %O

The argument is treated as an object, and property names and values are displayed. (In web browsers, this display is typically interactive, and users can expand and collapse properties to explore a nested data structure.) `%o` and `%O` both display object details. The uppercase variant uses an implementationdependent output format that is judged to be most useful for software developers.

#### %c

In web browsers, the argument is interpreted as a string of CSS styles and used to style any text that follows (until the next `%c` sequence or the end of the string). In Node, the `%c` sequence and its corresponding argument are simply ignored.

Note that it is not often necessary to use a format string with the console functions: it is usually easy to obtain suitable output by simply passing one or more values (including objects) to the function and allowing the implementation to display them in a useful way. As an example, note that, if you pass an Error object to `console.log()`, it is automatically printed along with its stack trace.

## URL APIs

Since JavaScript is so commonly used in web browsers and web servers, it is common for JavaScript code to need to manipulate URLs. The URL class parses URLs and also allows modification (adding search parameters or altering paths, for example) of existing URLs. It also properly handles the complicated topic of escaping and unescaping the various components of a URL.

The URL class is not part of any ECMAScript standard, but it works in Node and all internet browsers other than Internet Explorer. It is standardized at https://url.spec.whatwg.org.

Create a URL object with the `URL()` constructor, passing an absolute URL string as the argument. Or pass a relative URL as the first argument and the absolute URL that it is relative to as the second argument. Once you have created the URL object, its various properties allow you to query unescaped versions of the various parts of the URL:

```js
let url = new URL("https://example.com:8000/path/name?q=term#fragment");
url.href; // => 'https://example.com:8000/path/name?q=term#fragment'
url.origin; // => 'https://example.com:8000'
url.protocol; // => 'https:'
url.host; // => 'example.com:8000'
url.hostname; // => 'example.com'
url.port; // => '8000'
url.pathname; // => '/path/name'
url.search; // => '?q=term'
url.hash; // => '#fragment'
```

Although it is not commonly used, URLs can include a username or a username and password, and the URL class can parse these URL components, too:

```js
let url = new URL("ftp://admin:1337!@ftp.example.com/");
url.href; // => 'ftp://admin:1337!@ftp.example.com/'
url.origin; // => 'ftp://ftp.example.com'
url.username; // => 'admin'
url.password; // => '1337!'
```

The `origin` property here is a simple combination of the URL protocol and host (including the port if one is specified). As such, it is a read-only property. But each of the other properties demonstrated in the previous example is read/write: you can set any of these properties to set the corresponding part of the URL:

```js
let url = new URL("https://example.com"); // Start with our server
url.pathname = "api/search"; // Add a path to an API endpoint
url.search = "q=test"; // Add a query parameter
url.toString(); // => 'https://example.com/api/search?q=test'
```

One of the important features of the URL class is that it correctly adds punctuation and escapes special characters in URLs when that is needed:

```js
let url = new URL("https://example.com");
url.pathname = "path with spaces";
url.search = "q=foo#bar";
url.pathname; // => '/path%20with%20spaces'
url.search; // => '?q=foo%23bar'
url.href; // => 'https://example.com/path%20with%20spaces?q=foo%23bar'
```

The `href` property in these examples is a special one: reading `href` is equivalent to calling `toString()`: it reassembles all parts of the URL into the canonical string form of the URL. And setting `href` to a new string reruns the URL parser on the new string as if you had called the `URL()` constructor again.

In the previous examples, we’ve been using the `search` property to refer to the entire query portion of a URL, which consists of the characters from a question mark to the end of the URL or to the first hash character. Sometimes, it is sufficient to just treat this as a single URL property. Often, however, HTTP requests encode the values of multiple form fields or multiple API parameters into the query portion of a URL using the `application/x-www-form-urlencode`d format. In this format, the query portion of the URL is a question mark followed by one or more name/value pairs, which are separated from one another by ampersands. The same name can appear more than once, resulting in a named search parameter with more than one value.

If you want to encode these kinds of name/value pairs into the query portion of a URL, then the `searchParams` property will be more useful than the `search` property. The `search` property is a read/write string that lets you get and set the entire query portion of the URL. The `searchParams` property is a read-only reference to a URLSearchParams object, which has an API for getting, setting, adding, deleting, and sorting the parameters encoded into the query portion of the URL:

```js
let url = new URL("https://example.com/search");
url.search // => "": no query yet
url.searchParams.append("q", "term"); // Add a search parameter
url.search // => "?q=term"
url.searchParams.set("q", "x"); // Change the value of this parameter
url.search // => "?q=x"
url.searchParams.get("q") // => "x": query the parameter value
url.searchParams.has("q") // => true: there is a q parameter
url.searchParams.has("p") // => false: there is no p parameter
url.searchParams.append("opts", "1"); // Add another search parameter
url.search // => "?q=x&opts=1"
url.searchParams.append("opts", "&"); // Add another value for same name
url.search // => "?q=x&opts=1&opts=%26": note escape
url.searchParams.get("opts") // => "1": the first value
url.searchParams.getAll("opts") // => ["1", "&"]: all values
url.searchParams.sort(); // Put params in alphabetical order
url.search // => "?opts=1&opts=%26&q=x"
url.searchParams.set("opts", "y"); // Change the opts param
url.search // => "?opts=y&q=x"
// searchParams is iterable
[...url.searchParams] // => [["opts", "y"], ["q", "x"]]
url.searchParams.delete("opts"); // Delete the opts param
url.search // => "?q=x"
url.href // => "https://example.com/search?q=x"
```

The value of the `searchParams` property is a URLSearchParams object. If you want to encode URL parameters into a query string, you can create a URLSearchParams object, append parameters, then convert it to a string and set it on the search property of a URL:

```js
let url = new URL("http://example.com");
let params = new URLSearchParams();
params.append("q", "term");
params.append("opts", "exact");
params.toString(); // => "q=term&opts=exact"
url.search = params;
url.href; // => "http://example.com/?q=term&opts=exact"
```

### Legacy URL Functions

Prior to the definition of the URL API described previously, there have been multiple attempts to support URL escaping and unescaping in the core JavaScript language. The first attempt was the globally defined `escape()` and `unescape()` functions, which are now deprecated but still widely implemented. They should not be used.

When `escape()` and `unescape()` were deprecated, ECMAScript introduced two pairs of alternative global functions:

#### encodeURI() and decodeURI()

`encodeURI()` takes a string as its argument and returns a new string in which non-ASCII characters plus certain ASCII characters (such as space) are escaped. `decodeURI()` reverses the process. Characters that need to be escaped are first converted to their UTF-8 encoding, then each byte of that encoding is replaced with a %xx escape sequence, where xx is two hexadecimal digits. Because `encodeURI()` is intended for encoding entire URLs, it does not escape URL separator characters such as `/`, `?`, and `#`. But this means that `encodeURI()` cannot work correctly for URLs that have those characters within their various components.

#### encodeURIComponent() and decodeURIComponent()

This pair of functions works just like `encodeURI()` and `decodeURI()` except that they are intended to escape individual components of a URI, so they also escape characters like `/`, `?`, and `#` that are used to separate those components. These are the most useful of the legacy URL functions, but be aware that `encodeURIComponent()` will escape `/` characters in a path name that you probably do not want escaped. And it will convert spaces in a query parameter to `%20`, even though spaces are supposed to be escaped with a `+` in that portion of a URL.

The fundamental problem with all of these legacy functions is that they seek to apply a single encoding scheme to all parts of a URL when the fact is that different portions of a URL use different encodings. If you want a properly formatted and encoded URL, the solution is simply to use the URL class for all URL manipulation you do.

## Timers

Since the earliest days of JavaScript, web browsers have defined two functions—`setTimeout()` and `setInterval()`—that allow programs to ask the browser to invoke a function after a specified amount of time has elapsed or to invoke the function repeatedly at a specified interval. These functions have never been standardized as part of the core language, but they work in all browsers and in Node and are a de facto part of the JavaScript standard library.

The first argument to `setTimeout()` is a function, and the second argument is a number that specifies how many milliseconds should elapse before the function is invoked. After the specified amount of time (and maybe a little longer if the system is busy), the function will be invoked with no arguments. Here, for example, are three `setTimeout()` calls that print console messages after one second, two seconds, and three seconds:

```js
setTimeout(() => {
  console.log("Ready...");
}, 1000);
setTimeout(() => {
  console.log("set...");
}, 2000);
setTimeout(() => {
  console.log("go!");
}, 3000);
```

Note that `setTimeout()` does not wait for the time to elapse before returning. All three lines of code in this example run almost instantly, but then nothing happens until 1,000 milliseconds elapse.

If you omit the second argument to `setTimeout()`, it defaults to 0. That does not mean, however, that the function you specify is invoked immediately. Instead, the function is registered to be called “as soon as possible.” If a browser is particularly busy handling user input or other events, it may take 10 milliseconds or more before the function is invoked.

`setTimeout()` registers a function to be invoked once. Sometimes, that function will itself call `setTimeout()` to schedule another invocation at a future time. If you want to invoke a function repeatedly, however, it is often simpler to use `setInterval()`. `setInterval()` takes the same two arguments as `setTimeout()` but invokes the function repeatedly every time the specified number of milliseconds (approximately) have elapsed.

Both `setTimeout()` and `setInterval()` return a value. If you save this value in a variable, you can then use it later to cancel the execution of the function by passing it to `clearTimeout()` or `clearInterval()`. The returned value is typically a number in web browsers and is an object in Node. The actual type doesn’t matter, and you should treat it as an opaque value. The only thing you can do with this value is pass it to `clearTimeout()` to cancel the execution of a function registered with `setTimeout()` (assuming it hasn’t been invoked yet) or to stop the repeating execution of a function registered with `setInterval()`.

Here is an example that demonstrates the use of `setTimeout()`, `setInterval()`, and `clearInterval()` to display a simple digital clock with the Console API:

```js
// Once a second: clear the console and print the current time
let clock = setInterval(() => {
  console.clear();
  console.log(new Date().toLocaleTimeString());
}, 1000);

// After 10 seconds: stop the repeating code above
setTimeout(() => {
  clearInterval(clock);
}, 10000);
```

We’ll see `setTimeout()` and `setInterval()` again when we cover asynchronous programming in **Chapter 13**.

## Summary

Learning a programming language is not just about mastering the grammar. It is equally important to study the standard library so that you are familiar with all the tools that are shipped with the language. This chapter has documented JavaScript’s standard library, which includes:

- Important data structures, such as Set, Map, and typed arrays.
- The Date and URL classes for working with dates and URLs.
- JavaScript’s regular expression grammar and its RegExp class for textual pattern matching.
- JavaScript’s internationalization library for formatting dates, time, and numbers and for sorting strings.
- The `JSON` object for serializing and deserializing simple data structures and the console object for logging messages.
