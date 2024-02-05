---
title: 第七章 数组
---

# 数组

This chapter documents arrays, a fundamental datatype in JavaScript and in most other programming languages. An _array_ is an ordered collection of values. Each value is called an _element_, and each element has a numeric position in the array, known as its _index_. JavaScript arrays are _untyped_: an array element may be of any type, and different elements of the same array may be of different types. Array elements may even be objects or other arrays, which allows you to create complex data structures, such as arrays of objects and arrays of arrays. JavaScript arrays are _zero-based_ and use 32-bit indexes: the index of the first element is 0, and the highest possible index is 4294967294 (2^32−2), for a maximum array size of 4,294,967,295 elements. JavaScript arrays are _dynamic_: they grow or shrink as needed, and there is no need to declare a fixed size for the array when you create it or to reallocate it when the size changes. JavaScript arrays may be _sparse_: the elements need not have contiguous indexes, and there may be gaps. Every JavaScript array has a length property. For nonsparse arrays, this property specifies the number of elements in the array. For sparse arrays, length is larger than the highest index of any element.

::: tip 翻译
本章讲解数组。数组是 JavaScript 以及多数其他编程语言的一种基础数据类型。数组是值的有序集合，其中的值叫作元素，每个元素有一个数值表示的位置，叫作索引。JavaScript 数组是无类型限制的，即数组中的元素可以是任意类型，同一数组的不同元素也可以是不同的类型。数组元素甚至可以对象或其他数组，从而可以创建复杂的数据结构，比如对象的数组或者数组的数组。JavaScript 数组是基于零且使用 32 位数值索引的，第一个元素的索引为 0，最大可能的索引值是 4 294 967 294（232-2），即数组最大包含 4 294 967 295 个元素。JavaScript 数组是动态的，它们会按需增大或缩小，因此创建数组时无须声明一个固定大小，也无须在大小变化时重新为它们分配空间。JavaScript 数组可以是稀疏的，即元素不一定具有连续的索引，中间可能有间隙。每个 JavaScript 数组都有 length 属性。对于非稀疏数组，这个属性保存数组中元素的个数。对于稀疏数组，length 大于所有元素的最高索引。
:::

JavaScript arrays are a specialized form of JavaScript object, and array indexes are really little more than property names that happen to be integers. We’ll talk more about the specializations of arrays elsewhere in this chapter. Implementations typically optimize arrays so that access to numerically indexed array elements is generally significantly faster than access to regular object properties.

::: tip 翻译
JavaScript 数组是一种特殊的 JavaScript 对象，因此数组索引更像是属性名，只不过碰巧是整数而已。本章经常会谈到数组的这种特殊性。实现通常对数组会进行特别优化，从而让访问数值索引的数组元素明显快于访问常规的对象属性。
:::

Arrays inherit properties from `Array.prototype`, which defines a rich set of array manipulation methods, covered in §7.8. Most of these methods are _generic_, which means that they work correctly not only for true arrays, but for any “array-like object.” We’ll discuss array-like objects in §7.9. Finally, JavaScript strings behave like arrays of characters, and we’ll discuss this in §7.10.

::: tip 翻译
数组从`Array.prototype`继承属性，这个原型上定义了很多数组操作方法，7.8 节将介绍。其中很多方法都是泛型的，这意味着它们不仅可以用于真正的数组，也可以用于任何“类数组对象”。7.9 节将讨论类数组对象。最后，JavaScript 字符串的行为类似字母数组，将在 7.10 节讨论。
:::

ES6 introduces a set of new array classes known collectively as “typed arrays.” Unlike regular JavaScript arrays, typed arrays have a fixed length and a fixed numeric element type. They offer high performance and byte-level access to binary data and are covered in §11.2.

::: tip 翻译
ES6 增加了一批新的数组类，统称为“定型数组”（typed array）。与常规 JavaScript 数组不同，定型数组具有固定长度和固定的数值元素类型。定型数组具有极高的性能，支持对二进制数据的字节级访问，将在 11.2 节介绍。
:::

## 创建数组

There are several ways to create arrays. The subsections that follow explain how to create arrays with:

- Array literals
- The `...` spread operator on an iterable object
- The `Array()` constructor
- The `Array.of()` and `Array.from()` factory methods

::: tip 翻译
创建数组有几种方式。接下来几节将分别介绍：

- 数组字面量
- 对可迭代对象使用`...`扩展操作符
- `Array()`构造函数
- 工厂方法`Array.of()`和`Array.from()`
  :::

### 数组字面量

By far the simplest way to create an array is with an array literal, which is simply a comma-separated list of array elements within square brackets. For example:

::: tip 翻译
迄今为止，创建数组最简单的方式就是使用数组字面量。数组字面量其实就是一对方括号中逗号分隔的数组元素的列表。例如：
:::

```js
let empty = []; // 没有元素的数组
let primes = [2, 3, 5, 7, 11]; // 有5个数值元素的数组
let misc = [1.1, true, "a"]; // 3 中不同类型的元素，最后还有一个逗号
```

The values in an array literal need not be constants; they may be arbitrary expressions:

::: tip 翻译
数组字面量中的值不需要是常量，可以是任意表达式：
:::

```js
let base = 1024;
let table = [base, base + 1, base + 2, base + 3];
```

Array literals can contain object literals or other array literals:

::: tip 翻译
数组字面量可以包含对象字面量或其他数组字面量：
:::

```js
let b = [
  [1, { x: 1, y: 2 }],
  [2, { x: 3, y: 4 }],
];
```

If an array literal contains multiple commas in a row, with no value between, the array is sparse (see §7.3). Array elements for which values are omitted do not exist but appear to be `undefined` if you query them:

::: tip 翻译
如果数组字面量中连续包含多个逗号，且逗号之间没有值，则这个数组就是稀疏的（参见 7.3 节）。这些省略了值的数组元素并不存在，但按照索引查询它们时又会返回`undefined`：
:::

```js
let count = [1, , 3]; // 索引0和2有元素，索引1没有元素
let undefs = [, ,]; // 这个数组没有元素，但长度为2
```

Array literal syntax allows an optional trailing comma, so `[,,]` has a length of 2, not 3.

::: tip 翻译
数组字面量语法允许末尾出现逗号，因此`[,,]`的长度是 2 不是 3。
:::

### 扩展操作符

In ES6 and later, you can use the “spread operator,” `...`, to include the elements of one array within an array literal:

::: tip 翻译
在 ES6 及之后的版本中，可以使用扩展操作符`...`在一个数组字面量中包含另一个数组的元素：
:::

```js
let a = [1, 2, 3];
let b = [0, ...a, 4]; // b == [0, 1, 2, 3, 4]
```

The three dots “spread” the array a so that its elements become elements within the array literal that is being created. It is as if the `...a` was replaced by the elements of the array a, listed literally as part of the enclosing array literal. (Note that, although we call these three dots a spread operator, this is not a true operator because it can only be used in array literals and, as we’ll see later in the book, function invocations.)

::: tip 翻译
这里的三个点会“扩展”数组`a`，因而它的元素变成了要创建的数组字面量的元素。可以把`...a`想象成代表数组`a`的所有元素，这些元素依次出现在了包含它们的数组字面量中（注意，虽然我们把这个三个点称作扩展操作符，但它们实际上并不是操作符，因为只能在数组字面量和本书后面介绍的函数调用中使用它们）。
:::

The spread operator is a convenient way to create a (shallow) copy of an array:

::: tip 翻译
扩展操作符是创建数组（浅）副本的一种便捷方式：
:::

```js
let original = [1, 2, 3];
let copy = [...original];
copy[0] = 0; // 修改copy不会影响original
original[0]; // => 1
```

The spread operator works on any iterable object. (_Iterable_ objects are what the `for/of` loop iterates over; we first saw them in §5.4.4, and we’ll see much more about them in [Chapter 12](./Chapter-12-Iterators_Generators.md).) Strings are iterable, so you can use a spread operator to turn any string into an array of single-character strings:

::: tip 翻译
扩展操作符适用于任何可迭代对象（可迭代对象可以使用`for/of`循环遍历，5.4.4 节已经看到过，[第 12 章](./Chapter-12-Iterators_Generators.md)还将看到更多的例子）。字符串是可迭代对象，因此可以使用扩展操作符把任意字符串转换为单个字符的数组：
:::

```js
let digits = [..."0123456789ABCDEF"];
digits; // => ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]
```

Set objects (§11.1.1) are iterable, so an easy way to remove duplicate elements from an array is to convert the array to a set and then immediately convert the set back to an array using the spread operator:

::: tip 翻译
集合对象（参见 11.1.1 节）是可迭代的，因此要去除数组中的重复元素，一种便捷方式就是先把数组转换为集合，然后再使用扩展操作符把这个集合转换回数组：
:::

```js
let letters = [..."hello world"];
[...new Set(letters)]; // => ["h","e","l","o"," ","w","r","d"]
```

### Array() 构造函数

Another way to create an array is with the `Array()` constructor. You can invoke this constructor in three distinct ways:

- Call it with no arguments:
  ```js
  let a = new Array();
  ```
  This method creates an empty array with no elements and is equivalent to the array literal `[]`.
- Call it with a single numeric argument, which specifies a length:
  ```js
  let a = new Array(10);
  ```
  This technique creates an array with the specified length. This form of the `Array()` constructor can be used to preallocate an array when you know in advance how many elements will be required. Note that no values are stored in the array, and the array index properties “0”, “1”, and so on are not even defined for the array.
- Explicitly specify two or more array elements or a single non-numeric element for the array:
  ```js
  let a = new Array(5, 4, 3, 2, 1, "testing, testing");
  ```
  In this form, the constructor arguments become the elements of the new array. Using an array literal is almost always simpler than this usage of the `Array()` constructor.

::: tip 翻译
另一种创建数组的方式是使用`Array()`构造函数。有三种方式可以调用这个构造函数：

- 不传参数调用:
  这样会创建一个没有元素的空数组，等价于数组字面量`[]`。
- 传入一个数组参数，指定长度：
  这样会创建一个指定长度的数组。如果提前知道需要多少个数组元素，可以像这样调用`Array()`构造函数来预先为数组分配空间。注意，这时的数组中不会存储任何值，数组索引属性“0”、“1”等甚至都没有定义。
- 传入两个或更多个数组元素，或传入一个非数值元素：
  这样调用的话，构造函数参数会成为新数组的元素。使用数组字面量永远比像这样使用`Array()`构造函数更简单。
  :::

### Array.of()

When the `Array()` constructor function is invoked with one numeric argument, it uses that argument as an array length. But when invoked with more than one numeric argument, it treats those arguments as elements for the array to be created. This means that the `Array()` constructor cannot be used to create an array with a single numeric element.

::: tip 翻译
在使用数值参数调用`Array()`构造函数时，这个参数指定的是数组长度。但在使用一个以上的数值参数时，这些参数则会成为新数组的元素。这意味着使用`Array()`构造函数无法创建只包含一个数值元素的数组。
:::

In ES6, the `Array.of()` function addresses this problem: it is a factory method that creates and returns a new array, using its argument values (regardless of how many of them there are) as the array elements:

::: tip 翻译
在 ES6 中，Array.of()函数可以解决这个问题。这是个工厂方法，可以使用其参数值（无论多少个）作为数组元素来创建并返回新数组：
:::

```js
Array.of(); // => []; 返回没有参数的空数组
Array.of(10); // => [10]; 可以创建只有一个数值元素的数组
Array.of(1, 2, 3); // => [1, 2, 3]
```

### Array.from()

`Array.from` is another array factory method introduced in ES6. It expects an iterable or array-like object as its first argument and returns a new array that contains the elements of that object. With an iterable argument, `Array.from(iterable)` works like the spread operator `[...iterable]` does. It is also a simple way to make a copy of an array:

::: tip 翻译
`Array.from()`是 ES6 新增的另一个工厂方法。这个方法期待一个可迭代对象或类数组对象作为其第一个参数，并返回包含该对象元素的新数组。如果传入可迭代对象，`Array.from(iterable)`与使用扩展操作符`[...iterable]`一样。因此，它也是创建数组副本的一种简单方式：
:::

```js
let copy = Array.from(original);
```

`Array.from()` is also important because it defines a way to make a true-array copy of an array-like object. Array-like objects are non-array objects that have a numeric length property and have values stored with properties whose names happen to be integers. When working with client-side JavaScript, the return values of some web browser methods are array-like, and it can be easier to work with them if you first convert them to true arrays:

::: tip 翻译
`Array.from()`确实很重要，因为它定义了一种给类数组对象创建真正的数组副本的机制。类数组对象不是数组对象，但也有一个数值`length`属性，而且每个属性的键也都是整数。在客户端 JavaScript 中，有些浏览器方法返回的值就是类数组对象，那么像这样先把它们转换成真正的数组便于后续的操作：
:::

```js
let truearray = Array.from(arraylike);
```

`Array.from()` also accepts an optional second argument. If you pass a function as the second argument, then as the new array is being built, each element from the source object will be passed to the function you specify, and the return value of the function will be stored in the array instead of the original value. (This is very much like the array `map()` method that will be introduced later in the chapter, but it is more efficient to perform the mapping while the array is being built than it is to build the array and then map it to another new array.)

::: tip 翻译
`Array.from()`也接受可选的第二个参数。如果给第二个参数传入了一个函数，那么在构建新数组时，源对象的每个元素都会传入这个函数，这个函数的返回值将代替原始值成为新数组的元素（这一点与本章后面要介绍的数组的`map()`方法很像，但在构建数组期间执行映射的效率要高于先构建一个数组再把它映射为另一个新数组）。
:::

## 读取数组元素

You access an element of an array using the `[]` operator. A reference to the array should appear to the left of the brackets. An arbitrary expression that has a non-negative integer value should be inside the brackets. You can use this syntax to both read and write the value of an element of an array. Thus, the following are all legal JavaScript statements:

::: tip 翻译
可以使用`[]`操作符访问数组元素，方括号左侧应该是一个对数组的引用，方括号内应该是一个具有非负整数值的表达式。这个语法可以读和写数组元素的值。因此，下面都是合法的 JavaScript 语句：
:::

```js
let a = ["world"]; // 先创建包含一个元素的数组
let value = a[0]; // 读取元素 0
a[1] = 3.14; // 写入元素 1
let i = 2;
a[i] = 3; // 写入元素 2
a[i + 1] = "hello"; // 写入元素 3
a[a[i]] = a[0]; // 读取元素 0 和 2, 写入元素 3
```

What is special about arrays is that when you use property names that are non-negative integers less than 2^32–1, the array automatically maintains the value of the `length` property for you. In the preceding, for example, we created an array a with a single element. We then assigned values at indexes 1, 2, and 3. The length property of the array changed as we did, so:

::: tip 翻译
数组特殊的地方在于，只要你使用小于 2^32-1 的非负整数作为属性名，数组就会自动为你维护`length`属性的值。比如在前面的例子中，我们先创建了一个只有一个元素的数组。而在给它的索引 1、2、3 赋值之后，数组的`length`属性也会相应改变，因此：
:::

```js
a.length; // => 4
```

Remember that arrays are a specialized kind of object. The square brackets used to access array elements work just like the square brackets used to access object properties. JavaScript converts the numeric array index you specify to a string—the index 1 becomes the string "1"—then uses that string as a property name. There is nothing special about the conversion of the index from a number to a string: you can do that with regular objects, too:

::: tip 翻译
记住，数组是一种特殊的对象。用于访问数组元素的方括号与用于访问对象属性的方括号是类似的。JavaScript 会将数值数组索引转换为字符串，即索引 1 会变成字符串“1”，然后再将这个字符串作为属性名。这个从数值到字符串的转换没什么特别的，使用普通对象也一样：
:::

```js
let o = {}; // 创建一个普通对象
o[1] = "one"; // 通过整数索引一个值
o["1"]; // => "one"; 数值和字符串属性名是同一个
```

It is helpful to clearly distinguish an array index from an object property name. All indexes are property names, but only property names that are integers between 0 and 2^32–2 are indexes. All arrays are objects, and you can create properties of any name on them. If you use properties that are array indexes, however, arrays have the special behavior of updating their `length` property as needed.

::: tip 翻译
明确区分数组索引和对象属性名是非常有帮助的。所有索引都是属性名，但只有介于 0 和 2^32-2 之间的整数属性名才是索引。所有数组都是对象，可以在数组上以任意名字创建属性。只不过，如果这个属性是数组索引，数组会有特殊的行为，即自动按需更新其`length`属性。
:::

Note that you can index an array using numbers that are negative or that are not integers. When you do this, the number is converted to a string, and that string is used as the property name. Since the name is not a non-negative integer, it is treated as a regular object property, not an array index. Also, if you index an array with a string that happens to be a non-negative integer, it behaves as an array index, not an object property. The same is true if you use a floating-point number that is the same as an integer:

::: tip 翻译
注意，可以使用负数或非整数值来索引数组。此时，数值会转换为字符串，而这个字符串会作为属性名。因为这个名字是非负整数，所以会被当成常规的对象属性，而不是数组索引。另外，如果你碰巧使用了非负整数的字符串来索引数组，那这个值会成为数组索引，而不是对象属性。同样，如果使用了与整数相等的浮点值也是如此：
:::

```js
a[-1.23] = true; // 这样会创建一个属性 "-1.23"
a["1000"] = 0; // 这是数组中第1001个元素
a[1.0] = 1; // 数组索引1，相当于 a[1] = 1;
```

The fact that array indexes are simply a special type of object property name means that JavaScript arrays have no notion of an “out of bounds” error. When you try to query a nonexistent property of any object, you don’t get an error; you simply get `undefined`. This is just as true for arrays as it is for objects:

::: tip 翻译
由于数组索引其实就是一种特殊的对象属性，所以 JavaScript 数组没有所谓“越界”错误。查询任何对象中不存在的属性都不会导致错误，只会返回`undefined`。数组作为一种特殊对象也是如此：
:::

```js
let a = [true, false]; // 数组的索引0和1有元素
a[2]; // => undefined; 这个索引没有元素
a[-1]; // => undefined; 这个名字没有属性
```

## 稀疏数组

A _sparse_ array is one in which the elements do not have contiguous indexes starting at 0. Normally, the `length` property of an array specifies the number of elements in the array. If the array is sparse, the value of the `length` property is greater than the number of elements. Sparse arrays can be created with the `Array()` constructor or simply by assigning to an array index larger than the current array `length`.

::: tip 翻译
稀疏数组就是其元素没有从 0 开始的索引的数组。正常情况下，数组的`length`属性表明数组中元素的个数。如果数组是稀疏的，则`length`属性的值会大于元素个数。可以使用`Array()`构造函数创建稀疏数组，或者直接给大于当前数组`length`的数组索引赋值。
:::

```js
let a = new Array(5); // 没有元素，但a.length是5
a = []; // 创建一个空数组，此时length = 0
a[1000] = 0; // 赋值增加了一个元素，但length变成了1001
```

We’ll see later that you can also make an array sparse with the `delete` operator.

::: tip 翻译
后面还会看到，使用`delete`操作符也可以创建稀疏数组。
:::

Arrays that are sufficiently sparse are typically implemented in a slower, more memory-efficient way than dense arrays are, and looking up elements in such an array will take about as much time as regular object property lookup.

::: tip 翻译
足够稀疏的数组通常是以较稠密数组慢、但内存占用少的方式实现的，查询这种数组的元素与查询常规对象属性的时间相当。
:::

Note that when you omit a value in an array literal (using repeated commas as in `[1,,3]`), the resulting array is sparse, and the omitted elements simply do not exist:

::: tip 翻译
注意，如果省略数组字面量中的一个值（像`[1,,3]`这样重复逗号两次），也会得到稀疏数组，被省略的元素是不存在的：
:::

```js
let a1 = [,]; // 这个数组没有元素，但length是1
let a2 = [undefined]; // 这个数组有一个undefined元素
0 in a1; // => false: a1 在索引0没有元素
0 in a2; // => true: a2 在索引0有undefined值
```

Understanding sparse arrays is an important part of understanding the true nature of JavaScript arrays. In practice, however, most JavaScript arrays you will work with will not be sparse. And, if you do have to work with a sparse array, your code will probably treat it just as it would treat a nonsparse array with `undefined` elements.

::: tip 翻译
理解稀疏数组是真正理解 JavaScript 数组的重要一环。但在实践中，我们碰到的多数 JavaScript 数组都不是稀疏的。如果真的碰到了稀疏数组，可以把稀疏数组当成包含 undefined 元素的非稀疏数组。
:::

## 数组长度

Every array has a `length` property, and it is this property that makes arrays different from regular JavaScript objects. For arrays that are dense (i.e., not sparse), the `length` property specifies the number of elements in the array. Its value is one more than the highest index in the array:

::: tip 翻译
每个数组都有`length`属性，正是这个属性让数组有别于常规的 JavaScript 对象。对于稠密数组（即非稀疏数组），`length`属性就是数组中元素的个数。这个值比数组的最高索引大 1：
:::

```js
[].length; // => 0: 数组没有元素
[("a", "b", "c")].length; // => 3: 最高索引为2，length值为3
```

When an array is sparse, the length property is greater than the number of elements, and all we can say about it is that length is guaranteed to be larger than the index of every element in the array. Or, put another way, an array (sparse or not) will never have an element whose index is greater than or equal to its length. In order to maintain this invariant, arrays have two special behaviors. The first we described above: if you assign a value to an array element whose index `i` is greater than or equal to the array’s current `length`, the value of the `length` property is set to `i+1`.

::: tip 翻译
对于稀疏数组，`length`属性会大于元素个数，也可以说稀疏数组的`length`值一定大于数组中任何元素的索引。从另一个角度说，数组（无论稀疏与否）中任何元素的索引都不会大于或等于数组的`length`。为了维护这种不变式（invariant），数组有两个特殊行为。第一个前面已经提到了，即如果给一个索引为`i`的数组元素赋值，而`i`大于或等于数组当前的`length`，则数组的`length`属性会被设置为`i+1`。
:::

The second special behavior that arrays implement in order to maintain the length invariant is that, if you set the `length` property to a non-negative integer `n` smaller than its current value, any array elements whose index is greater than or equal to `n` are deleted from the array:

::: tip 翻译
数组实现以维护长度不变式的第二个特殊行为，就是如果将`length`属性设置为一个小于其当前值的非负整数`n`，则任何索引大于或等于`n`的数组元素都会从数组中被删除：
:::

```js
a = [1, 2, 3, 4, 5]; // 先定义一个包含5个元素的数组
a.length = 3; // a变成[1,2,3].
a.length = 0; // 删除所有元素，a是 [].
a.length = 5; // 长度为5，但没有元素，类似 new Array(5)
```

You can also set the `length` property of an array to a value larger than its current value. Doing this does not actually add any new elements to the array; it simply creates a sparse area at the end of the array.

::: tip 翻译
也可以把数组的`length`属性设置为一个大于其当前值的值。这样做并不会向数组中添加新元素，只会在数组末尾创建一个稀疏的区域。
:::

## 添加和删除数组元素

We’ve already seen the simplest way to add elements to an array: just assign values to new indexes:

::: tip 翻译
我们已经看到过为数组添加元素的最简单方式了，就是给它的一个新索引赋值：
:::

```js
let a = []; // 创建一个空数组
a[0] = "zero"; // 添加一个元素
a[1] = "one";
```

You can also use the `push()` method to add one or more values to the end of an array:

::: tip 翻译
也可以使用`push()`方法在数组末尾添加一个或多个元素：
:::

```js
let a = []; // 创建一个空数组
a.push("zero"); // 在末尾添加一个值. a = ["zero"]
a.push("one", "two"); // 再再末尾添加两个值. a = ["zero", "one", "two"]
```

Pushing a value onto an array a is the same as assigning the value to `a[a.length]`. You can use the `unshift()` method (described in §7.8) to insert a value at the beginning of an array, shifting the existing array elements to higher indexes. The `pop()` method is the opposite of `push()`: it removes the last element of the array and returns it, reducing the length of an array by 1. Similarly, the `shift()` method removes and returns the first element of the array, reducing the length by 1 and shifting all elements down to an index one lower than their current index. See §7.8 for more on these methods.

::: tip 翻译
向数组`a`中推入一个值等同于把这个值赋给`a[a.length]`。要在数组开头插入值，可以使用`unshift()`方法（参见 7.8 节），这个方法将已有数组元素移动到更高索引位。与`push()`执行相反操作的是`pop()`方法，它删除数组最后一个元素并返回该元素，同时导致数组长度减 1。类似地，`shift()`方法删除并返回数组的第一个元素，让数组长度减 1 并将所有元素移动到低一位的索引。7.8 节有对这些方法的更多介绍。
:::

You can delete array elements with the `delete` operator, just as you can delete object properties:

::: tip 翻译
可以使用`delete`操作符删除数组元素：
:::

```js
let a = [1, 2, 3];
delete a[2]; // 现在索引2没有元素了
2 in a; // => false: 数组索引2没有定义
a.length; // => 3: 删除元素不影响数组长度
```

Deleting an array element is similar to (but subtly different than) assigning `undefined` to that element. Note that using `delete` on an array element does not alter the `length` property and does not shift elements with higher indexes down to fill in the gap that is left by the `deleted` property. If you delete an element from an array, the array becomes sparse.

::: tip 翻译
删除数组元素类似于（但不完全等同于）给该元素赋`undefined`值。注意，对数组元素使用`delete`操作符不会修改`length`属性，也不会把高索引位的元素向下移动来填充被删除属性的空隙。从数组中删除元素后，数组会变稀疏。
:::

As we saw above, you can also remove elements from the end of an array simply by setting the `length` property to the new desired length.

::: tip 翻译
如前所述，把数组`length`属性设置成一个新长度值，也可以从数组末尾删除元素。
:::

Finally, `splice()` is the general-purpose method for inserting, deleting, or replacing array elements. It alters the `length` property and shifts array elements to higher or lower indexes as needed. See §7.8 for details.

::: tip 翻译
`splice()`是一个可以插入、删除或替换数组元素的通用方法。这个方法修改`length`属性并按照需要向更高索引或更低索引移动数组元素。详细介绍可参见 7.8 节。
:::

## 迭代数组

As of ES6, the easiest way to loop through each of the elements of an array (or any iterable object) is with the `for/of` loop, which was covered in detail in §5.4.4:

::: tip 翻译
到 ES6 为止，遍历一个数组（或任何可迭代对象）的最简单方式就是使用`for/of`循环，5.5.4 节介绍过：
:::

```js
let letters = [..."Hello world"]; // An array of letters
let string = "";
for (let letter of letters) {
  string += letter;
}
string; // => 'Hello world'; 我们重新组装了原始文本
```

The built-in array iterator that the `for/of` loop uses returns the elements of an array in ascending order. It has no special behavior for sparse arrays and simply returns `undefined` for any array elements that do not exist.

::: tip 翻译
`for/of`循环使用的内置数组迭代器按照升序返回数组的元素。对于稀疏数组，这个循环没有特殊行为，凡是不存在的元素都返回`undefined`。
:::

If you want to use a `for/of` loop for an array and need to know the index of each array element, use the `entries()` method of the array, along with destructuring assignment, like this:

::: tip 翻译
如果要对数组使用`for/of`循环，并且想知道每个数组元素的索引，可以使用数组的`entries()`方法和解构赋值：
:::

```js
let everyother = "";
for (let [index, letter] of letters.entries()) {
  if (index % 2 === 0) {
    everyother += letter; // 偶数索引的字母
  }
}
everyother; // => 'Hlowrd'
```

Another good way to iterate arrays is with `forEach()`. This is not a new form of the for loop, but an array method that offers a functional approach to array iteration. You pass a function to the `forEach()` method of an array, and `forEach()` invokes your function once on each element of the array:

::: tip 翻译
另一种迭代数组的推荐方式是使用`forEach()`。它并不是一种新的`for`循环，而是数组提供的一种用于自身迭代的函数式方法。因此需要给`forEach()`传一个函数，然后`forEach()`会用数组的每个元素调用一次这个函数：
:::

```js
let uppercase = "";
letters.forEach((letter) => {
  // 注意这里使用的是箭头函数
  uppercase += letter.toUpperCase();
});
uppercase; // => 'HELLO WORLD'
```

As you would expect, `forEach()` iterates the array in order, and it actually passes the array index to your function as a second argument, which is occasionally useful. Unlike the `for/of` loop, the `forEach()` is aware of sparse arrays and does not invoke your function for elements that are not there.

::: tip 翻译
正如我们预期的，`forEach()`按顺序迭代数组，而且会将索引作为第二个参数传给函数。与`for/of`循环不同，`forEach()`能够感知稀疏数组，不会对没有的元素数组调用函数。
:::

§7.8.1 documents the `forEach()` method in more detail. That section also covers related methods such as `map()` and `filter()` that perform specialized kinds of array iteration.

::: tip 翻译
7.8.1 节会更详细地解释`forEach()`方法，该节也将介绍另外两个与数组迭代有关的方法：`map()`和`filter()`。
:::

You can also loop through the elements of an array with a good old-fashioned for loop (§5.4.3):

::: tip 翻译
当然，使用老式的`for`循环（参见 5.4.3 节）也可以遍历数组：
:::

```js
let vowels = "";
for (let i = 0; i < letters.length; i++) {
  // 对数组中的每个索引
  let letter = letters[i]; // 取得改索引处的元素
  if (/[aeiou]/.test(letter)) {
    // 使用正则表达式测试
    vowels += letter; // 如果是元音，就记住它
  }
}
vowels; // => 'eoo'
```

In nested loops, or other contexts where performance is critical, you may sometimes see this basic array iteration loop written so that the array length is only looked up once rather than on each iteration. Both of the following for loop forms are idiomatic, though not particularly common, and with modern JavaScript interpreters, it is not at all clear that they have any performance impact:

::: tip 翻译
在嵌套循环中，或其他性能攸关的场合，有时候会看到这种简单的数组迭代循环，但只会读取一次数组长度，而不是在每个迭代中都读取一次。下面展示的两种 for 循环形式都是比较推荐的：
:::

```js
// 把数组长度保存到局部变量中
for (let i = 0, len = letters.length; i < len; i++) {
  // 循环体不变
}

// 从后向前迭代数组
for (let i = letters.length - 1; i >= 0; i--) {
  // 循环体不变
}
```

These examples assume that the array is dense and that all elements contain valid data. If this is not the case, you should test the array elements before using them. If you want to skip undefined and nonexistent elements, you might write:

::: tip 翻译
这两个例子假定数组是稠密的，即所有元素都包含有效数据。如果不是这种情况，那应该在使用每个元素前先进行测试。如果想跳过未定义或不存在的元素，可以这样写：
:::

```js
for (let i = 0; i < a.length; i++) {
  if (a[i] === undefined) continue; // 跳过未定义及不存在的元素
  // 这里的循环体
}
```

## 多维数组

JavaScript does not support true multidimensional arrays, but you can approximate them with arrays of arrays. To access a value in an array of arrays, simply use the `[]` operator twice. For example, suppose the variable `matrix` is an array of arrays of numbers. Every element in `matrix[x]` is an array of numbers. To access a particular number within this array, you would write `matrix[x][y]`. Here is a concrete example that uses a two-dimensional array as a multiplication table:

::: tip 翻译
JavaScript 并不支持真正的多维数组，但我们可以使用数组的数组来模拟。要访问数组的数组的值，使用两个`[]`即可。比如，假设变量`matrix`是一个数值数组的数组，则`matrix[x]`的每个元素都是一个数值数组。要访问这个数组中的某个数值，就要使用`matrix[x][y]`这种形式。下面这个例子利用二维数组生成了乘法表：
:::

```js
// 创建一个多维数组
let table = new Array(10); // 表格的10行
for (let i = 0; i < table.length; i++) {
  table[i] = new Array(10); // 每行有10列
}

// 初始化数组
for (let row = 0; row < table.length; row++) {
  for (let col = 0; col < table[row].length; col++) {
    table[row][col] = row * col;
  }
}

// 从这个多维数组中获得 5*7 的值
table[5][7]; // => 35
```

## Array Methods

The preceding sections have focused on basic JavaScript syntax for working with arrays. In general, though, it is the methods defined by the Array class that are the most powerful. The next sections document these methods. While reading about these methods, keep in mind that some of them modify the array they are called on and some of them leave the array unchanged. A number of the methods return an array: sometimes, this is a new array, and the original is unchanged. Other times, a method will modify the array in place and will also return a reference to the modified array.

Each of the subsections that follows covers a group of related array methods:

- Iterator methods loop over the elements of an array, typically invoking a function that you specify on each of those elements.
- Stack and queue methods add and remove array elements to and from the beginning and the end of an array.
- Subarray methods are for extracting, deleting, inserting, filling, and copying contiguous regions of a larger array.
- Searching and sorting methods are for locating elements within an array and for sorting the elements of an array.

The following subsections also cover the static methods of the Array class and a few miscellaneous methods for concatenating arrays and converting arrays to strings.

### Array Iterator Methods

The methods described in this section iterate over arrays by passing array elements, in order, to a function you supply, and they provide convenient ways to iterate, map, filter, test, and reduce arrays.

Before we explain the methods in detail, however, it is worth making some generalizations about them. First, all of these methods accept a function as their first argument and invoke that function once for each element (or some elements) of the array. If the array is sparse, the function you pass is not invoked for nonexistent elements. In most cases, the function you supply is invoked with three arguments: the value of the array element, the index of the array element, and the array itself. Often, you only need the first of these argument values and can ignore the second and third values.

Most of the iterator methods described in the following subsections accept an optional second argument. If specified, the function is invoked as if it is a method of this second argument. That is, the second argument you pass becomes the value of the `this` keyword inside of the function you pass as the first argument. The return value of the function you pass is usually important, but different methods handle the return value in different ways. None of the methods described here modify the array on which they are invoked (though the function you pass can modify the array, of course).

Each of these functions is invoked with a function as its first argument, and it is very common to define that function inline as part of the method invocation expression instead of using an existing function that is defined elsewhere. Arrow function syntax (see §8.1.3) works particularly well with these methods, and we will use it in the examples that follow.

#### forEach()

The `forEach()` method iterates through an array, invoking a function you specify for each element. As we’ve described, you pass the function as the first argument to `forEach()`. `forEach()` then invokes your function with three arguments: the value of the array element, the index of the array element, and the array itself. If you only care about the value of the array element, you can write a function with only one parameter—the additional arguments will be ignored:

```js
let data = [1, 2, 3, 4, 5],
  sum = 0;
// Compute the sum of the elements of the array
data.forEach((value) => {
  sum += value;
}); // sum == 15

// Now increment each array element
data.forEach(function (v, i, a) {
  a[i] = v + 1;
}); // data == [2,3,4,5,6]
```

Note that `forEach()` does not provide a way to terminate iteration before all elements have been passed to the function. That is, there is no equivalent of the `break` statement you can use with a regular for loop.

#### map()

The `map()` method passes each element of the array on which it is invoked to the function you specify and returns an array containing the values returned by your function. For example:

```js
let a = [1, 2, 3];
a.map((x) => x * x); // => [1, 4, 9]: the function takes input x and returns x*x
```

The function you pass to `map()` is invoked in the same way as a function passed to `forEach()`. For the `map()` method, however, the function you pass should return a value. Note that `map()` returns a new array: it does not modify the array it is invoked on. If that array is sparse, your function will not be called for the missing elements, but the returned array will be sparse in the same way as the original array: it will have the same length and the same missing elements.

#### filter()

The `filter()` method returns an array containing a subset of the elements of the array on which it is invoked. The function you pass to it should be predicate: a function that returns `true` or `false`. The predicate is invoked just as for `forEach()` and `map()`. If the return value is `true`, or a value that converts to `true`, then the element passed to the predicate is a member of the subset and is added to the array that will become the return value. Examples:

```js
let a = [5, 4, 3, 2, 1];
a.filter((x) => x < 3); // => [2, 1]; values less than 3
a.filter((x, i) => i % 2 === 0); // => [5, 3, 1]; every other value
```

Note that `filter()` skips missing elements in sparse arrays and that its return value is always dense. To close the gaps in a sparse array, you can do this:

```js
let dense = sparse.filter(() => true);
```

And to close gaps and remove undefined and null elements, you can use `filter`, like this:

```js
a = a.filter((x) => x !== undefined && x !== null);
```

#### find() and findIndex()

The `find()` and `findIndex()` methods are like `filter()` in that they iterate through your array looking for elements for which your predicate function returns a truthy value. Unlike `filter()`, however, these two methods stop iterating the first time the predicate finds an element. When that happens, `find()` returns the matching element, and `findIndex()` returns the `index` of the matching element. If no matching element is found, `find()` returns `undefined` and `findIndex()` returns `-1`:

```js
let a = [1, 2, 3, 4, 5];
a.findIndex((x) => x === 3); // => 2; the value 3 appears at index 2
a.findIndex((x) => x < 0); // => -1; no negative numbers in the array
a.find((x) => x % 5 === 0); // => 5: this is a multiple of 5
a.find((x) => x % 7 === 0); // => undefined: no multiples of 7 in the array
```

#### every() and some()

The `every()` and `some()` methods are array predicates: they apply a predicate function you specify to the elements of the array, then return `true` or `false`.

The `every()` method is like the mathematical “for all” quantifier ∀: it returns `true` if and only if your predicate function returns `true` for all elements in the array:

```js
let a = [1, 2, 3, 4, 5];
a.every((x) => x < 10); // => true: all values are < 10.
a.every((x) => x % 2 === 0); // => false: not all values are even.
```

The `some()` method is like the mathematical “there exists” quantifier ∃: it returns true if there exists at least one element in the array for which the predicate returns `true` and returns `false` if and only if the predicate returns `false` for all elements of the array:

```js
let a = [1, 2, 3, 4, 5];
a.some((x) => x % 2 === 0); // => true; a has some even numbers.
a.some(isNaN); // => false; a has no non-numbers.
```

Note that both `every()` and `some()` stop iterating array elements as soon as they know what value to return. `some()` returns `true` the first time your predicate returns `<code>true</code>` and only iterates through the entire array if your predicate always returns `false`. `every()` is the opposite: it returns `false` the first time your predicate returns `false` and only iterates all elements if your predicate always returns `true`. Note also that, by mathematical convention, `every()` returns `true` and some returns `false` when invoked on an empty array.

#### reduce() and reduceRight()

The `reduce()` and `reduceRight()` methods combine the elements of an array, using the function you specify, to produce a single value. This is a common operation in functional programming and also goes by the names “inject” and “fold.” Examples help illustrate how it works:

```js
let a = [1, 2, 3, 4, 5];
a.reduce((x, y) => x + y, 0); // => 15; the sum of the values
a.reduce((x, y) => x * y, 1); // => 120; the product of the values
a.reduce((x, y) => (x > y ? x : y)); // => 5; the largest of the values
```

`reduce()` takes two arguments. The first is the function that performs the reduction operation. The task of this reduction function is to somehow combine or reduce two values into a single value and to return that reduced value. In the examples we’ve shown here, the functions combine two values by adding them, multiplying them, and choosing the largest. The second (optional) argument is an initial value to pass to the function.

Functions used with `reduce()` are different than the functions used with `forEach()` and `map()`. The familiar `value`, `index`, and `array` values are passed as the second, third, and fourth arguments. The first argument is the accumulated result of the reduction so far. On the first call to the function, this first argument is the initial value you passed as the second argument to `reduce()`. On subsequent calls, it is the value returned by the previous invocation of the function. In the first example, the reduction function is first called with arguments 0 and 1. It adds these and returns 1. It is then called again with arguments 1 and 2 and returns 3. Next, it computes 3+3=6, then 6+4=10, and finally 10+5=15. This final value, 15, becomes the return value of `reduce()`.

You may have noticed that the third call to `reduce()` in this example has only a single argument: there is no initial value specified. When you invoke `reduce()` like this with no initial value, it uses the first element of the array as the initial value. This means that the first call to the reduction function will have the first and second array elements as its first and second arguments. In the sum and product examples, we could have omitted the initial value argument.

Calling `reduce()` on an empty array with no initial value argument causes a TypeError. If you call it with only one value--either an array with one element and no initial value or an empty array and an initial value--it simply returns that one value without ever calling the reduction function.

`reduceRight()` works just like `reduce()`, except that it processes the array from highest index to lowest (right-to-left), rather than from lowest to highest. You might want to do this if the reduction operation has right-to-left associativity, for example:

```js
// Compute 2^(3^4). Exponentiation has right-to-left precedence
let a = [2, 3, 4];
a.reduceRight((acc, val) => Math.pow(val, acc)); // => 2.4178516392292583e+24
```

Note that neither `reduce()` nor `reduceRight()` accepts an optional argument that specifies the `this` value on which the reduction function is to be invoked. The optional initial value argument takes its place. See the `Function.bind()` method (§8.7.5) if you need your reduction function invoked as a method of a particular object.

The examples shown so far have been numeric for simplicity, but `reduce()` and `reduceRight()` are not intended solely for mathematical computations. Any function that can combine two values (such as two objects) into one value of the same type can be used as a reduction function. On the other hand, algorithms expressed using array reductions can quickly become complex and hard to understand, and you may find that it is easier to read, write, and reason about your code if you use regular looping constructs to process your arrays.

### Flattening arrays with flat() and flatMap()

In ES2019, the `flat()` method creates and returns a new array that contains the same elements as the array it is called on, except that any elements that are themselves arrays are “flattened” into the returned array. For example:

```js
[1, [2, 3]]
  .flat() // => [1, 2, 3]
  [(1, [2, [3]])].flat(); // => [1, 2, [3]]
```

When called with no arguments, `flat()` flattens one level of nesting. Elements of the original array that are themselves arrays are flattened, but array elements of those arrays are not flattened. If you want to flatten more levels, pass a number to `flat()`:

```js
let a = [1, [2, [3, [4]]]];
a.flat(1); // => [1, 2, [3, [4]]]
a.flat(2); // => [1, 2, 3, [4]]
a.flat(3); // => [1, 2, 3, 4]
a.flat(4); // => [1, 2, 3, 4]
```

The `flatMap()` method works just like the `map()` method (see “`map()`” on page 166) except that the returned array is automatically flattened as if passed to `flat()`. That is, calling `a.flatMap(f)` is the same as (but more efficient than) `a.map(f).flat()`:

```js
let phrases = ["hello world", "the definitive guide"];
let words = phrases.flatMap((phrase) => phrase.split(" "));
words; // => ["hello", "world", "the", "definitive", "guide"];
```

You can think of `flatMap()` as a generalization of `map()` that allows each element of the input array to map to any number of elements of the output array. In particular, `flatMap()` allows you to map input elements to an empty array, which flattens to nothing in the output array:

```js
// Map non-negative numbers to their square roots
[-2, -1, 1, 2].flatMap((x) => (x < 0 ? [] : Math.sqrt(x))); // => [1, 2**0.5]
```

### Adding arrays with concat()

The `concat()` method creates and returns a new array that contains the elements of the original array on which `concat()` was invoked, followed by each of the arguments to `concat()`. If any of these arguments is itself an array, then it is the array elements that are concatenated, not the array itself. Note, however, that `concat()` does not recursively flatten arrays of arrays. `concat()` does not modify the array on which it is invoked:

```js
let a = [1, 2, 3];
a.concat(4, 5); // => [1,2,3,4,5]
a.concat([4, 5], [6, 7]); // => [1,2,3,4,5,6,7]; arrays are flattened
a.concat(4, [5, [6, 7]]); // => [1,2,3,4,5,[6,7]]; but not nested arrays
a; // => [1,2,3]; the original array is unmodified
```

Note that `concat()` makes a new copy of the array it is called on. In many cases, this is the right thing to do, but it is an expensive operation. If you find yourself writing code like `a = a.concat(x)`, then you should think about modifying your array in place with `push()` or `splice()` instead of creating a new one.

### Stacks and Queues with push(), pop(), shift(), and unshift()

The `push()` and `pop()` methods allow you to work with arrays as if they were stacks. The `push()` method appends one or more new elements to the end of an array and returns the new length of the array. Unlike `concat()`, `push()` does not flatten array arguments. The `pop()` method does the reverse: it deletes the last element of an array decrements the array length, and returns the value that it removed. Note that both methods modify the array in place. The combination of `push()` and `pop()` allows you to use a JavaScript array to implement a first-in, last-out stack. For example:

```js
let stack = []; // stack == []
stack.push(1, 2); // stack == [1,2];
stack.pop(); // stack == [1]; returns 2
stack.push(3); // stack == [1,3]
stack.pop(); // stack == [1]; returns 3
stack.push([4, 5]); // stack == [1,[4,5]]
stack.pop(); // stack == [1]; returns [4,5]
stack.pop(); // stack == []; returns 1
```

The `push()` method does not flatten an array you pass to it, but if you want to push all of the elements from one array onto another array, you can use the spread operator (§8.3.4) to flatten it explicitly:

```js
a.push(...values);
```

The `unshift()` and `shift()` methods behave much like `push()` and `pop()`, except that they insert and remove elements from the beginning of an array rather than from the end. `unshift()` adds an element or elements to the beginning of the array, shifts the existing array elements up to higher indexes to make room, and returns the new length of the array. `shift()` removes and returns the first element of the array, shifting all subsequent elements down one place to occupy the newly vacant space at the start of the array. You could use `unshift()` and `shift()` to implement a stack, but it would be less efficient than using `push()` and `pop()` because the array elements need to be shifted up or down every time an element is added or removed at the start of the array. Instead, though, you can implement a queue data structure by using `push()` to add elements at the end of an array and `shift()` to remove them from the start of the array:

```js
let q = []; // q == []
q.push(1, 2); // q == [1,2]
q.shift(); // q == [2]; returns 1
q.push(3); // q == [2, 3]
q.shift(); // q == [3]; returns 2
q.shift(); // q == []; returns 3
```

There is one feature of `unshift()` that is worth calling out because you may find it surprising. When passing multiple arguments to `unshift()`, they are inserted all at once, which means that they end up in the array in a different order than they would be if you inserted them one at a time:

```js
let a = []; // a == []
a.unshift(1); // a == [1]
a.unshift(2); // a == [2, 1]
a = []; // a == []
a.unshift(1, 2); // a == [1, 2]
```

### Subarrays with slice(), splice(), fill(), and copyWithin()

Arrays define a number of methods that work on contiguous regions, or subarrays or “slices” of an array. The following sections describe methods for extracting, replacing, filling, and copying slices.

#### slice()

The `slice()` method returns a _slice_, or subarray, of the specified array. Its two arguments specify the start and end of the slice to be returned. The returned array contains the element specified by the first argument and all subsequent elements up to, but not including, the element specified by the second argument. If only one argument is specified, the returned array contains all elements from the start position to the end of the array. If either argument is negative, it specifies an array element relative to the length of the array. An argument of –1, for example, specifies the last element in the array, and an argument of –2 specifies the element before that one. Note that `slice()` does not modify the array on which it is invoked. Here are some examples:

```js
let a = [1, 2, 3, 4, 5];
a.slice(0, 3); // Returns [1,2,3]
a.slice(3); // Returns [4,5]
a.slice(1, -1); // Returns [2,3,4]
a.slice(-3, -2); // Returns [3]
```

#### splice()

`splice()` is a general-purpose method for inserting or removing elements from an array. Unlike `slice()` and `concat()`, `splice()` modifies the array on which it is invoked. Note that `splice()` and `slice()` have very similar names but perform substantially different operations.

`splice()` can delete elements from an array, insert new elements into an array, or perform both operations at the same time. Elements of the array that come after the insertion or deletion point have their indexes increased or decreased as necessary so that they remain contiguous with the rest of the array. The first argument to `splice()` specifies the array position at which the insertion and/or deletion is to begin. The second argument specifies the number of elements that should be deleted from (spliced out of) the array. (Note that this is another difference between these two methods. The second argument to `slice()` is an end position. The second argument to `splice()` is a length.) If this second argument is omitted, all array elements from the start element to the end of the array are removed. `splice()` returns an array of the deleted elements, or an empty array if no elements were deleted. For example:

```js
let a = [1, 2, 3, 4, 5, 6, 7, 8];
a.splice(4); // => [5,6,7,8]; a is now [1,2,3,4]
a.splice(1, 2); // => [2,3]; a is now [1,4]
a.splice(1, 1); // => [4]; a is now [1]
```

The first two arguments to `splice()` specify which array elements are to be deleted. These arguments may be followed by any number of additional arguments that specify elements to be inserted into the array, starting at the position specified by the first argument. For example:

```js
let a = [1, 2, 3, 4, 5];
a.splice(2, 0, "a", "b"); // => []; a is now [1,2,"a","b",3,4,5]
a.splice(2, 2, [1, 2], 3); // => ["a","b"]; a is now [1,2,[1,2],3,3,4,5]
```

Note that, unlike `concat()`, `splice()` inserts arrays themselves, not the elements of those arrays.

#### fill()

The `fill()` method sets the elements of an array, or a slice of an array, to a specified value. It mutates the array it is called on, and also returns the modified array:

```js
let a = new Array(5); // Start with no elements and length 5
a.fill(0); // => [0,0,0,0,0]; fill the array with zeros
a.fill(9, 1); // => [0,9,9,9,9]; fill with 9 starting at index 1
a.fill(8, 2, -1); // => [0,9,8,8,9]; fill with 8 at indexes 2, 3
```

The first argument to `fill()` is the value to set array elements to. The optional second argument specifies the starting index. If omitted, filling starts at index 0. The optional third argument specifies the ending index—array elements up to, but not including, this index will be filled. If this argument is omitted, then the array is filled from the start index to the end. You can specify indexes relative to the end of the array by passing negative numbers, just as you can for `slice()`.

#### copyWithin()

`copyWithin()` copies a slice of an array to a new position within the array. It modifies the array in place and returns the modified array, but it will not change the length of the array. The first argument specifies the destination index to which the first element will be copied. The second argument specifies the index of the first element to be copied. If this second argument is omitted, 0 is used. The third argument specifies the end of the slice of elements to be copied. If omitted, the length of the array is used. Elements from the start index up to, but not including, the end index will be copied. You can specify indexes relative to the end of the array by passing negative numbers, just as you can for `slice()`:

```js
let a = [1, 2, 3, 4, 5];
a.copyWithin(1); // => [1,1,2,3,4]: copy array elements up one
a.copyWithin(2, 3, 5); // => [1,1,3,4,4]: copy last 2 elements to index 2
a.copyWithin(0, -2); // => [4,4,3,4,4]: negative offsets work, too
```

`copyWithin()` is intended as a high-performance method that is particularly useful with typed arrays (see §11.2). It is modeled after the `memmove()` function from the C standard library. Note that the copy will work correctly even if there is overlap between the source and destination regions.

### Array Searching and Sorting Methods

Arrays implement `indexOf()`, `lastIndexOf()`, and `includes()` methods that are similar to the same-named methods of strings. There are also `sort()` and `reverse()` methods for reordering the elements of an array. These methods are described in the subsections that follow.

#### indexOf() and lastIndexOf()

`indexOf()` and `lastIndexOf()` search an array for an element with a specified value and return the index of the first such element found, or -1 if none is found. `indexOf()` searches the array from beginning to end, and `lastIndexOf()` searches from end to beginning:

```js
let a = [0, 1, 2, 1, 0];
a.indexOf(1); // => 1: a[1] is 1
a.lastIndexOf(1); // => 3: a[3] is 1
a.indexOf(3); // => -1: no element has value 3
```

`indexOf()` and `lastIndexOf()` compare their argument to the array elements using the equivalent of the `===` operator. If your array contains objects instead of primitive values, these methods check to see if two references both refer to exactly the same object. If you want to actually look at the content of an object, try using the `find()` method with your own custom predicate function instead.

`indexOf()` and `lastIndexOf()` take an optional second argument that specifies the array index at which to begin the search. If this argument is omitted, `indexOf()` starts at the beginning and `lastIndexOf()` starts at the end. Negative values are allowed for the second argument and are treated as an offset from the end of the array, as they are for the `slice()` method: a value of –1, for example, specifies the last element of the array.

The following function searches an array for a specified value and returns an array of all matching indexes. This demonstrates how the second argument to `indexOf()` can be used to find matches beyond the first.

```js
// Find all occurrences of a value x in an array a and return an array
// of matching indexes
function findall(a, x) {
  let results = [], // The array of indexes we'll return
    len = a.length, // The length of the array to be searched
    pos = 0; // The position to search from

  while (pos < len) {
    // While more elements to search...
    pos = a.indexOf(x, pos); // Search
    if (pos === -1) {
      // If nothing found, We're done.
      break;
    }
    results.push(pos); // Otherwise, store index in array
    pos = pos + 1; // And start next search at next element
  }
  return results; // Return array of indexes.
}
```

Note that strings have `indexOf()` and `lastIndexOf()` methods that work like these array methods, except that a negative second argument is treated as zero.

#### includes()

The ES2016 `includes()` method takes a single argument and returns true if the array contains that value or false otherwise. It does not tell you the index of the value, only whether it exists. The `includes()` method is effectively a set membership test for arrays. Note, however, that arrays are not an efficient representation for sets, and if you are working with more than a few elements, you should use a real Set object (§11.1.1).

The `includes()` method is slightly different than the `indexOf()` method in one important way. `indexOf()` tests equality using the same algorithm that the `===` operator does, and that equality algorithm considers the not-a-number value to be different from every other value, including itself. `includes()` uses a slightly different version of equality that does consider NaN to be equal to itself. This means that `indexOf()` will not detect the `NaN` value in an array, but `includes()` will:

```js
let a = [1, true, 3, NaN];
a.includes(true); // => true
a.includes(2); // => false
a.includes(NaN); // => true
a.indexOf(NaN); // => -1; indexOf can't find NaN
```

#### sort()

`sort()` sorts the elements of an array in place and returns the sorted array. When `sort()` is called with no arguments, it sorts the array elements in alphabetical order (temporarily converting them to strings to perform the comparison, if necessary):

```js
let a = ["banana", "cherry", "apple"];
a.sort(); // a == ["apple", "banana", "cherry"]
```

If an array contains undefined elements, they are sorted to the end of the array.

To sort an array into some order other than alphabetical, you must pass a comparison function as an argument to `sort()`. This function decides which of its two arguments should appear first in the sorted array. If the first argument should appear before the second, the comparison function should return a number less than zero. If the first argument should appear after the second in the sorted array, the function should return a number greater than zero. And if the two values are equivalent (i.e., if their order is irrelevant), the comparison function should return 0. So, for example, to sort array elements into numerical rather than alphabetical order, you might do this:

```js
let a = [33, 4, 1111, 222];
a.sort(); // a == [1111, 222, 33, 4]; alphabetical order
a.sort(function (a, b) {
  // Pass a comparator function
  return a - b; // Returns < 0, 0, or > 0, depending on order
}); // a == [4, 33, 222, 1111]; numerical order
a.sort((a, b) => b - a); // a == [1111, 222, 33, 4]; reverse numerical order
```

As another example of sorting array items, you might perform a case-insensitive alphabetical sort on an array of strings by passing a comparison function that converts both of its arguments to lowercase (with the `toLowerCase()` method) before comparing them:

```js
let a = ["ant", "Bug", "cat", "Dog"];
a.sort(); // a == ["Bug","Dog","ant","cat"]; case-sensitive sort
a.sort(function (s, t) {
  let a = s.toLowerCase();
  let b = t.toLowerCase();
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}); // a == ["ant","Bug","cat","Dog"]; case-insensitive sort
```

#### reverse()

The `reverse()` method reverses the order of the elements of an array and returns the reversed array. It does this in place; in other words, it doesn’t create a new array with the elements rearranged but instead rearranges them in the already existing array:

```js
let a = [1, 2, 3];
a.reverse(); // a == [3,2,1]
```

### Array to String Conversions

The Array class defines three methods that can convert arrays to strings, which is generally something you might do when creating log and error messages. (If you want to save the contents of an array in textual form for later reuse, serialize the array with `JSON.stringify()` [§6.8] instead of using the methods described here.)

The `join()` method converts all the elements of an array to strings and concatenates them, returning the resulting string. You can specify an optional string that separates the elements in the resulting string. If no separator string is specified, a comma is used:

```js
let a = [1, 2, 3];
a.join(); // => "1,2,3"
a.join(" "); // => "1 2 3"
a.join(""); // => "123"
let b = new Array(10); // An array of length 10 with no elements
b.join("-"); // => "---------": a string of 9 hyphens
```

The `join()` method is the inverse of the `String.split()` method, which creates an array by breaking a string into pieces.

Arrays, like all JavaScript objects, have a `toString()` method. For an array, this method works just like the `join()` method with no arguments:

```js
[1, 2, 3]
  .toString() // => "1,2,3"
  [("a", "b", "c")].toString() // => "a,b,c"
  [(1, [2, "c"])].toString(); // => "1,2,c"
```

Note that the output does not include square brackets or any other sort of delimiter around the array value.

`toLocaleString()` is the localized version of `toString()`. It converts each array element to a string by calling the `toLocaleString()` method of the element, and then it concatenates the resulting strings using a locale-specific (and implementationdefined) separator string.

### Static Array Functions

In addition to the array methods we’ve already documented, the Array class also defines three static functions that you can invoke through the `Array` constructor rather than on arrays. `Array.of()` and `Array.from()` are factory methods for creating new arrays. They were documented in §7.1.4 and §7.1.5.

The one other static array function is `Array.isArray()`, which is useful for determining whether an unknown value is an array or not:

```js
Array.isArray([]); // => true
Array.isArray({}); // => false
```

## Array-Like Objects

As we’ve seen, JavaScript arrays have some special features that other objects do not have:

- The `length` property is automatically updated as new elements are added to the list.
- Setting `length` to a smaller value truncates the array.
- Arrays inherit useful methods from `Array.prototype`.
- `Array.isArray()` returns true for arrays.

These are the features that make JavaScript arrays distinct from regular objects. But they are not the essential features that define an array. It is often perfectly reasonable to treat any object with a numeric length property and corresponding non-negative integer properties as a kind of array.

These “array-like” objects actually do occasionally appear in practice, and although you cannot directly invoke array methods on them or expect special behavior from the length property, you can still iterate through them with the same code you’d use for a true array. It turns out that many array algorithms work just as well with arraylike objects as they do with real arrays. This is especially true if your algorithms treat the array as read-only or if they at least leave the array length unchanged.

The following code takes a regular object, adds properties to make it an array-like object, and then iterates through the “elements” of the resulting pseudo-array:

```js
let a = {}; // Start with a regular empty object

// Add properties to make it "array-like"
let i = 0;
while (i < 10) {
  a[i] = i * i;
  i++;
}
a.length = i;

// Now iterate through it as if it were a real array
let total = 0;
for (let j = 0; j < a.length; j++) {
  total += a[j];
}
```

In client-side JavaScript, a number of methods for working with HTML documents (such as `document.querySelectorAll()`, for example) return array-like objects. Here’s a function you might use to test for objects that work like arrays:

```js
// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded
// with an additional o.nodeType !== 3 test.
function isArrayLike(o) {
  if (
    o && // o is not null, undefined, etc.
    typeof o === "object" && // o is an object
    Number.isFinite(o.length) && // o.length is a finite number
    o.length >= 0 && // o.length is non-negative
    Number.isInteger(o.length) && // o.length is an integer
    o.length < 4294967295 // o.length < 2^32 - 1
  ) {
    return true; // then o is array-like
  } else {
    return false; // Otherwise it is not.
  }
}
```

We’ll see in a later section that strings behave like arrays. Nevertheless, tests like this one for array-like objects typically return `false` for strings—they are usually best handled as strings, not as arrays.

Most JavaScript array methods are purposely defined to be generic so that they work correctly when applied to array-like objects in addition to true arrays. Since array-like objects do not inherit from `Array.prototype`, you cannot invoke array methods on them directly. You can invoke them indirectly using the `Function.call` method, however (see §8.7.4 for details):

```js
let a = { 0: "a", 1: "b", 2: "c", length: 3 }; // An array-like object
Array.prototype.join.call(a, "+"); // => "a+b+c"
Array.prototype.map.call(a, (x) => x.toUpperCase()); // => ["A","B","C"]
Array.prototype.slice.call(a, 0); // => ["a","b","c"]: true array copy
Array.from(a); // => ["a","b","c"]: easier array copy
```

The second-to-last line of this code invokes the Array `slice()` method on an arraylike object in order to copy the elements of that object into a true array object. This is an idiomatic trick that exists in much legacy code, but is now much easier to do with `Array.from()`.

## Strings as Arrays

JavaScript strings behave like read-only arrays of UTF-16 Unicode characters. Instead of accessing individual characters with the `charAt()` method, you can use square brackets:

```js
let s = "test";
s.charAt(0); // => "t"
s[1]; // => "e"
```

The `typeof` operator still returns “string” for strings, of course, and the `Array.isArray()` method returns `false` if you pass it a string.

The primary benefit of indexable strings is simply that we can replace calls to `charAt()` with square brackets, which are more concise and readable, and potentially more efficient. The fact that strings behave like arrays also means, however, that we can apply generic array methods to them. For example:

```js
Array.prototype.join.call("JavaScript", " "); // => "J a v a S c r i p t"
```

Keep in mind that strings are immutable values, so when they are treated as arrays, they are read-only arrays. Array methods like `push()`, `sort()`, `reverse()`, and `splice()` modify an array in place and do not work on strings. Attempting to modify a string using an array method does not, however, cause an error: it simply fails silently.

## Summary

This chapter has covered JavaScript arrays in depth, including esoteric details about sparse arrays and array-like objects. The main points to take from this chapter are:

- Array literals are written as comma-separated lists of values within square brackets.
- Individual array elements are accessed by specifying the desired array index within square brackets.
- The `for/of` loop and `...` spread operator introduced in ES6 are particularly useful ways to iterate arrays.
- The Array class defines a rich set of methods for manipulating arrays, and you should be sure to familiarize yourself with the Array API.
