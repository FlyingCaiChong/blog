---
title: 第十四章 元编程
---

# 元编程

[[toc]]

This chapter covers a number of advanced JavaScript features that are not commonly used in day-to-day programming but that may be valuable to programmers writing reusable libraries and of interest to anyone who wants to tinker with the details about how JavaScript objects behave.

::: tip 翻译
本章涵盖了许多高级 JavaScript 功能，这些功能在日常编程中并不常用，但对于编写可重用库的程序员可能很有价值，并且对于任何想要修改 JavaScript 对象行为细节的人来说可能很有价值。
:::

Many of the features described here can loosely be described as “metaprogramming”: if regular programming is writing code to manipulate data, then metaprogramming is writing code to manipulate other code. In a dynamic language like JavaScript, the lines between programming and metaprogramming are blurry—even the simple ability to iterate over the properties of an object with a `for/in` loop might be considered “meta” by programmers accustomed to more static languages.

::: tip 翻译
这里描述的许多功能可以粗略地描述为“元编程”：如果常规编程是编写代码来操作数据，那么元编程就是编写代码来操作其他代码。 在像 JavaScript 这样的动态语言中，编程和元编程之间的界限是模糊的——即使是使用 `for/in` 循环迭代对象属性的简单能力也可能被习惯于静态语言的程序员视为“元”。
:::

The metaprogramming topics covered in this chapter include:

- §14.1 Controlling the enumerability, deleteability, and configurability of object properties
- §14.2 Controlling the extensibility of objects, and creating “sealed” and “frozen” objects
- §14.3 Querying and setting the prototypes of objects
- §14.4 Fine-tuning the behavior of your types with well-known Symbols
- §14.5 Creating DSLs (domain-specific languages) with template tag functions
- §14.6 Probing objects with `reflect` methods
- §14.7 Controlling object behavior with Proxy

::: tip 翻译
本章涵盖的元编程主题包括：

- [§14.1](#属性特性) 控制对象属性的可枚举性、可删除性和可配置性
- [§14.2](#对象可扩展性) 控制对象的扩展性，创建 `sealed` 和 `frozen` 对象
- [§14.3](#原型属性) 查询和设置对象的原型
- [§14.4](#著名的-symbols) 使用众所周知的符号微调类型的行为
- [§14.5](#模板标签) 使用模板标签函数创建 DSL（特定领域语言）
- [§14.6](#the-reflect-api) 使用 `reflect` 方法探测对象
- [§14.7](#proxy-对象) 使用代理控制对象行为
  :::

## 属性特性

The properties of a JavaScript object have names and values, of course, but each property also has three associated attributes that specify how that property behaves and what you can do with it:

- The `writable` attribute specifies whether or not the value of a property can change.
- The `enumerable` attribute specifies whether the property is enumerated by the `for/in` loop and the `Object.keys()` method.
- The `configurable` attribute specifies whether a property can be deleted and also whether the property’s attributes can be changed.

::: tip 翻译
当然，JavaScript 对象的属性具有名称和值，但每个属性还具有三个关联的属性，用于指定该属性的行为方式，以及可以使用它执行的操作：

- `writable` 属性指定属性的值是否可以更改。
- `enumerable` 属性指定该属性是否由 `for/in` 循环和 `Object.keys()` 方法枚举。
- `configurable` 属性指定是否可以删除属性，以及是否可以更改属性的属性。
  :::

Properties defined in object literals or by ordinary assignment to an object are writable, enumerable, and configurable. But many of the properties defined by the JavaScript standard library are not.

::: tip 翻译
在对象字面量中定义的属性，或通过对对象的普通赋值定义的属性，是可写、可枚举和可配置的。 但 JavaScript 标准库定义的许多属性并非如此。
:::

This section explains the API for querying and setting property attributes. This API is particularly important to library authors because:

- It allows them to add methods to prototype objects and make them non enumerable, like built-in methods.
- It allows them to “lock down” their objects, defining properties that cannot be changed or deleted.

::: tip 翻译
本节介绍查询和设置属性属性的 API。 此 API 对于库作者特别重要，因为：

- 它允许他们向原型对象添加方法并使它们不可枚举，就像内置方法一样。
- 它允许他们“锁定”他们的对象，定义不能更改或删除的属性。
  :::

Recall from §6.10.6 that, while “data properties” have a value, “accessor properties” have a `getter` and/or a `setter` method instead. For the purposes of this section, we are going to consider the `getter` and `setter` methods of an accessor property to be property attributes. Following this logic, we’ll even say that the value of a data property is an attribute as well. Thus, we can say that a property has a name and four attributes. The four attributes of a data property are _value_, _writable_, _enumerable_, and _configurable_. Accessor properties don’t have a _value_ attribute or a _writable_ attribute: their writability is determined by the presence or absence of a setter. So the four attributes of an accessor property are _get_, _set_, _enumerable_, and _configurable_.

::: tip 翻译
回想一下第 6.10.6 节，虽然“数据属性”有一个值，但“访问器属性”有一个 `getter` 和/或 `setter` 方法。 出于本节的目的，我们将把访问器属性的 `getter` 和 `setter` 方法视为属性的属性。 按照这个逻辑，我们甚至可以说数据属性的值也是一个属性。 因此，我们可以说属性有一个名称和四个属性。 数据属性的四个属性是 _value_、_writable_、_enumerable_ 和 _configurable_。 访问器属性没有 _value_ 属性或 _writable_ 属性：它们的可写性由 `setter` 的存在或不存在决定。 因此，访问器属性的四个属性是 _get_、_set_、_enumerable_ 和 _configurable_。
:::

The JavaScript methods for querying and setting the attributes of a property use an object called a _property descriptor_ to represent the set of four attributes. A property descriptor object has properties with the same names as the attributes of the property it describes. Thus, the property descriptor object of a data property has properties named _value_, _writable_, _enumerable_, and _configurable_. And the descriptor for an accessor property has `get` and `set` properties instead of _value_ and _writable_. The _writable_, _enumerable_, and _configurable_ properties are boolean values, and the _get_ and _set_ properties are function values.

::: tip 翻译
用于查询和设置属性特性的 JavaScript 方法使用称为“属性描述符”的对象来表示四个特性的集合。 属性描述符对象具有与其所描述的属性的特性同名的属性。 因此，数据属性的属性描述符对象具有名为 _value_、_writable_、_enumerable_ 和 _configurable_ 的属性。 访问器属性的描述符具有 `get` 和 `set` 属性，而不是 _value_ 和 _writable_。 _writable_、_enumerable_ 和 _configurable_ 属性是布尔值，_get_ 和 _set_ 属性是函数值。
:::

To obtain the property descriptor for a named property of a specified object, call `Object.getOwnPropertyDescriptor()`:

::: tip 翻译
要获取指定对象的命名属性的属性描述符，请调用 `Object.getOwnPropertyDescriptor()`：
:::

```js
// Returns { value: 1, writable: true, enumerable: true, configurable: true }
Object.getOwnPropertyDescriptor({ x: 1 }, "x");

// Here is an object with a read-only accessor property
const random = {
  get octet() {
    return Math.floor(Math.random() * 256);
  },
};

// Returns { get: /* func */, set: undefined, enumerable: true, configurable: true }
Object.getOwnPropertyDescriptor(random, "octet");

// Returns undefined for inherited properties and properties that don't exist.
Object.getOwnPropertyDescriptor({}, "x"); // => undefined; no such prop
Object.getOwnPropertyDescriptor({}, "toString"); // => undefined; inherited
```

As its name implies, `Object.getOwnPropertyDescriptor()` works only for own properties. To query the attributes of inherited properties, you must explicitly traverse the prototype chain. (See `Object.getPrototypeOf()` in §14.3); see also the similar `Reflect.getOwnPropertyDescriptor()` function in §14.6.)

::: tip 翻译
顾名思义，`Object.getOwnPropertyDescriptor()` 仅适用于自己的属性。 要查询继承属性的属性，必须显式遍历原型链。 （参见第 14.3 节中的 `Object.getPrototypeOf()`）； 另请参见第 14.6 节中类似的 `Reflect.getOwnPropertyDescriptor()` 函数。）
:::

To set the attributes of a property or to create a new property with the specified attributes, call `Object.defineProperty()`, passing the object to be modified, the name of the property to be created or altered, and the property descriptor object:

::: tip 翻译
要设置属性的属性，或创建具有指定属性的新属性，请调用 `Object.defineProperty()`，传递要修改的对象、要创建或更改的属性的名称、以及属性描述符对象 :
:::

```js
let o = {}; // Start with no properties at all
// Add a non-enumerable data property x with value 1
Object.defineProperty(o, "x", {
  value: 1,
  writable: true,
  enumerable: false,
  configurable: true,
});

// Check that the property is there but is non-enumerable
o.x; // => 1
Object.keys(o); // => []

// Now modify the property x so that it is read-only
Object.defineProperty(o, "x", { writable: false });

// Try to change the value of the property
o.x = 2; // Fails silently or throw TypeError in strict mode
o.x; // => 1

// The property is still configurable, so we can change its value like this:
Object.defineProperty(o, "x", { value: 2 });
o.x; // => 2

// Now change x from a data property to an accessor property
Object.defineProperty(o, "x", {
  get: function () {
    return 0;
  },
});
o.x; // => 0
```

The property descriptor you pass to `Object.defineProperty()` does not have to include all four attributes. If you’re creating a new property, then omitted attributes are taken to be `false` or `undefined`. If you’re modifying an existing property, then the attributes you omit are simply left unchanged. Note that this method alters an existing own property or creates a new own property, but it will not alter an inherited property. See also the very similar function `Reflect.defineProperty()` in §14.6.

::: tip 翻译
您传递给 `Object.defineProperty()` 的属性描述符不必包含所有四个属性。 如果您要创建新属性，则省略的属性将被视为 `false` 或`undefined`。 如果您要修改现有属性，则省略的属性将保持不变。 请注意，此方法会更改现有的自有属性或创建新的自有属性，但不会更改继承的属性。 另请参见第 14.6 节中非常相似的函数 `Reflect.defineProperty()`。
:::

If you want to create or modify more than one property at a time, use `Object.defineProperties()`. The first argument is the object that is to be modified. The second argument is an object that maps the names of the properties to be created or modified to the property descriptors for those properties. For example:

::: tip 翻译
如果您想一次创建或修改多个属性，请使用 `Object.defineProperties()`。 第一个参数是要修改的对象。 第二个参数是一个对象，它将要创建或修改的属性名称映射到这些属性的属性描述符。 例如：
:::

```js
let p = Object.defineProperties(
  {},
  {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    r: {
      get() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      enumerable: true,
      configurable: true,
    },
  }
);
p.r; // => Math.SQRT2
```

This code starts with an empty object, then adds two data properties and one read only accessor property to it. It relies on the fact that `Object.defineProperties()` returns the modified object (as does `Object.defineProperty()`).

::: tip 翻译
此代码从一个空对象开始，然后向其中添加两个数据属性和一个只读访问器属性。 它依赖于 `Object.defineProperties()` 返回修改后的对象这一事实（ `Object.defineProperty()` 也是如此）。
:::

The `Object.create()` method was introduced in §6.2. We learned there that the first argument to that method is the prototype object for the newly created object. This method also accepts a second optional argument, which is the same as the second argument to `Object.defineProperties()`. If you pass a set of property descriptors to `Object.create()`, then they are used to add properties to the newly created object.

::: tip 翻译
`Object.create()` 方法在第 6.2 节中引入。 我们在那里了解到该方法的第一个参数是新创建的对象的原型对象。 此方法还接受第二个可选参数，该参数与 `Object.defineProperties()` 的第二个参数相同。 如果将一组属性描述符传递给 `Object.create()`，那么它们将用于向新创建的对象添加属性。
:::

`Object.defineProperty()` and `Object.defineProperties()` throw TypeError if the attempt to create or modify a property is not allowed. This happens if you attempt to add a new property to a non-extensible (see §14.2) object. The other reasons that these methods might throw TypeError have to do with the attributes themselves. The _writable_ attribute governs attempts to change the _value_ attribute. And the _configurable_ attribute governs attempts to change the other attributes (and also specifies whether a property can be deleted). The rules are not completely straightforward, however. It is possible to change the value of a nonwritable property if that property is configurable, for example. Also, it is possible to change a property from writable to nonwritable even if that property is nonconfigurable. Here are the complete rules. Calls to `Object.defineProperty()` or `Object.defineProperties()` that attempt to violate them throw a TypeError:

- If an object is not extensible, you can edit its existing own properties, but you cannot add new properties to it.
- If a property is not configurable, you cannot change its configurable or enumerable attributes.
- If an accessor property is not configurable, you cannot change its getter or setter method, and you cannot change it to a data property.
- If a data property is not configurable, you cannot change it to an accessor property.
- If a data property is not configurable, you cannot change its _writable_ attribute from `false` to `true`, but you can change it from `true` to `false`.
- If a data property is not configurable and not writable, you cannot change its value. You can change the value of a property that is configurable but nonwritable, however (because that would be the same as making it writable, then changing the value, then converting it back to nonwritable).

::: tip 翻译
如果不允许尝试创建或修改属性，则 `Object.defineProperty()` 和 `Object.defineProperties()` 会抛出 TypeError。 如果您尝试向不可扩展（请参阅第 14.2 节）对象添加新属性，则会发生这种情况。 这些方法可能抛出 TypeError 的其他原因与属性本身有关。 _writable_ 属性控制尝试更改 _value_ 属性。 _configurable_ 属性控制尝试更改其他属性（并且还指定是否可以删除属性）。 然而，规则并不完全简单。 例如，如果不可写属性是可配置的，则可以更改该属性的值。 此外，即使属性不可配置，也可以将属性从可写更改为不可写。 这是完整的规则。 尝试违反它们的调用 `Object.defineProperty()` 或 `Object.defineProperties()` 会抛出 TypeError：

- 如果对象不可扩展，您可以编辑其现有的属性，但不能向其添加新属性。
- 如果属性不可配置，则无法更改其可配置或可枚举属性。
- 如果访问器属性不可配置，则无法更改其 getter 或 setter 方法，也无法将其更改为数据属性。
- 如果数据属性不可配置，则无法将其更改为访问器属性。
- 如果数据属性不可配置，则无法将其 _writable_ 属性从 `false` 更改为 `true` ，但可以将其从 `true` 更改为 `false` 。
- 如果数据属性不可配置且不可写，则无法更改其值。 但是，您可以更改可配置但不可写的属性的值（因为这与使其可写，然后更改值，然后将其转换回不可写相同）。
  :::

§6.7 described the `Object.assign()` function that copies property values from one or more source objects into a target object. `Object.assign()` only copies enumerable properties, and property values, not property attributes. This is normally what we want, but it does mean, for example, that if one of the source objects has an accessor property, it is the value returned by the getter function that is copied to the target object, not the getter function itself. **Example 14-1** demonstrates how we can use `Object.getOwnPropertyDescriptor()` and `Object.defineProperty()` to create a variant of `Object.assign()` that copies entire property descriptors rather than just copying property values.

::: tip 翻译
第 6.7 节 描述了 `Object.assign()` 函数，该函数将属性值从一个或多个源对象复制到目标对象中。 `Object.assign()` 仅复制可枚举属性和属性值，而不复制属性属性。 这通常是我们想要的，但它确实意味着，例如，如果源对象之一具有访问器属性，则复制到目标对象的是 `getter` 函数返回的值，而不是 `getter` 函数本身。 **示例 14-1** 演示了如何使用 `Object.getOwnPropertyDescriptor()` 和 `Object.defineProperty()` 来创建 `Object.assign()` 的变体，该变体复制整个属性描述符而不仅仅是复制属性的值。
:::

_Example 14-1. Copying properties and their attributes from one object to another_

```js
/**
 * Define a new Object.assignDescriptors() function that works like
 * Object.assign() except that it copies property descriptors from
 * source objects into the target object instead of just copying
 * property values, This function copies all own properties, both
 * enumerable and non-enumerable. And because it copies descriptors,
 * it copies getter function from source objects and overwrites setter
 * functions in the target object rather than invoking those getters and
 * setters.
 *
 * Object.assignDescriptors() propagates any TypeErrors thrown by
 * Object.defineProperty(). This can occur if the target object is sealed
 * or frozen or if any of the source properties try to change an existing
 * non-configurable property on the target object.
 *
 * Note that the assignDescriptors property is added to Object with
 * Object.defineProperty() so that the new function can be created as
 * a non-enumerable property like Object.assign().
 */
Object.defineProperty(Object, "assignDescriptors", {
  // Match the attributes of Object.assign()
  writable: true,
  enumerable: false,
  configurable: true,
  // The function that is the value of the assignDescriptors property.
  value: function (target, ...sources) {
    for (let source of sources) {
      for (let name of Object.getOwnPropertyNames(source)) {
        let desc = Object.getOwnPropertyDescriptor(source, name);
        Object.defineProperty(target, name, desc);
      }

      for (let symbol of Object.getOwnPropertySymbols(source)) {
        let desc = Object.getOwnPropertyDescriptor(source, symbol);
        Object.defineProperty(target, symbol, desc);
      }
    }
    return target;
  },
});

let o = {
  c: 1,
  get count() {
    return this.c++;
  },
}; // Define object with getter
let p = Object.assign({}, o); // Copy the property values
let q = Object.assignDescriptors({}, o); // Copy the property descriptors
p.count; // => 1: this is now just a data property so
p.count; // => 1: ...the counter does not increment.
q.count; // => 2: Incremented once when we copied it the first time,
q.count; // => 3: ...but we copied the getter method so it increments.
```

## 对象可扩展性

The _extensible_ attribute of an object specifies whether new properties can be added to the object or not. Ordinary JavaScript objects are extensible by default, but you can change that with the functions described in this section.

::: tip 翻译
对象的 _extensible_ 属性指定是否可以将新属性添加到该对象。 默认情况下，普通 JavaScript 对象是可扩展的，但您可以使用本节中描述的函数更改它。
:::

To determine whether an object is extensible, pass it to `Object.isExtensible()`. To make an object non-extensible, pass it to `Object.preventExtensions()`. Once you have done this, any attempt to add a new property to the object will throw a TypeError in strict mode and simply fail silently without an error in non-strict mode. In addition, attempting to change the prototype (see §14.3) of a non-extensible object will always throw a TypeError.

::: tip 翻译
要确定对象是否可扩展，请将其传递给 `Object.isExtensible()`。 要使对象不可扩展，请将其传递给 `Object.preventExtensions()`。 完成此操作后，任何向对象添加新属性的尝试都将在严格模式下抛出 TypeError ，并在非严格模式下简单地失败而不会出现错误。 此外，尝试更改不可扩展对象的原型（请参阅第 14.3 节）将始终抛出 TypeError。
:::

Note that there is no way to make an object extensible again once you have made it non-extensible. Also note that calling `Object.preventExtensions()` only affects the extensibility of the object itself. If new properties are added to the prototype of a non extensible object, the non-extensible object will inherit those new properties.

::: tip 翻译
请注意，一旦将对象设置为不可扩展，就无法再次使其可扩展。 另请注意，调用 `Object.preventExtensions()` 仅影响对象本身的可扩展性。 如果将新属性添加到不可扩展对象的原型中，则不可扩展对象将继承这些新属性。
:::

Two similar functions, `Reflect.isExtensible()` and `Reflect.preventExtensions()`, are described in §14.6.

::: tip 翻译
第 14.6 节中描述了两个类似的函数 `Reflect.isExtensible()` 和 `Reflect.preventExtensions()`。
:::

The purpose of the _extensible_ attribute is to be able to “lock down” objects into a known state and prevent outside tampering. The _extensible_ attribute of objects is often used in conjunction with the _configurable_ and _writable_ attributes of properties, and JavaScript defines functions that make it easy to set these attributes together:

- `Object.seal()` works like `Object.preventExtensions()`, but in addition to making the object non-extensible, it also makes all of the own properties of that object nonconfigurable. This means that new properties cannot be added to the object, and existing properties cannot be deleted or configured. Existing properties that are writable can still be set, however. There is no way to unseal a sealed object. You can use `Object.isSealed()` to determine whether an object is sealed.
- `Object.freeze()` locks objects down even more tightly. In addition to making the object non-extensible and its properties nonconfigurable, it also makes all of the object’s own data properties read-only. (If the object has accessor properties with `setter` methods, these are not affected and can still be invoked by assignment to the property.) Use `Object.isFrozen()` to determine if an object is frozen.

::: tip 翻译
_extensible_ 属性的目的是能够将对象“锁定”到已知状态并防止外部篡改。 对象的 _extensible_ 属性通常与属性的 _configurable_ 和 _writable_ 属性结合使用，JavaScript 定义了可以轻松将这些属性设置在一起的函数：

- `Object.seal()` 的工作方式与 `Object.preventExtensions()` 类似，但除了使对象不可扩展之外，它还使该对象的所有自身属性不可配置。 这意味着无法将新属性添加到对象，并且无法删除或配置现有属性。 但是，仍然可以设置现有的可写属性。 没有办法解封密封的物体。 您可以使用 `Object.isSealed()` 来确定对象是否被密封。
- `Object.freeze()` 可以更紧密地锁定对象。 除了使对象不可扩展及其属性不可配置之外，它还使对象自己的所有数据属性变为只读。 （如果对象具有带有 `setter` 方法的访问器属性，则这些属性不受影响，并且仍然可以通过分配给属性来调用。）使用 `Object.isFrozen()` 来确定对象是否被冻结。
  :::

It is important to understand that `Object.seal()` and `Object.freeze()` affect only the object they are passed: they have no effect on the prototype of that object. If you want to thoroughly lock down an object, you probably need to seal or freeze the objects in the prototype chain as well.

::: tip 翻译
重要的是要理解 `Object.seal()` 和 `Object.freeze()` 仅影响它们传递的对象：它们对该对象的原型没有影响。 如果你想彻底锁定一个对象，你可能还需要密封或冻结原型链中的对象。
:::

`Object.preventExtensions()`, `Object.seal()`, and `Object.freeze()` all return the object that they are passed, which means that you can use them in nested function invocations:

::: tip 翻译
`Object.preventExtensions()`、`Object.seal()` 和 `Object.freeze()` 都返回它们传递的对象，这意味着您可以在嵌套函数调用中使用它们：
:::

```js
// Create a sealed object with a frozen prototype and a non-enumerable property
let o = Object.seal(
  Object.create(Object.freeze({ x: 1 }), { y: { value: 2, writable: true } })
);
```

If you are writing a JavaScript library that passes objects to callback functions written by the users of your library, you might use `Object.freeze()` on those objects to prevent the user’s code from modifying them. This is easy and convenient to do, but there are trade-offs: frozen objects can interfere with common JavaScript testing strategies, for example.

::: tip 翻译
如果您正在编写一个 JavaScript 库，将对象传递给库用户编写的回调函数，则可以对这些对象使用 `Object.freeze()` 以防止用户的代码修改它们。 这样做既简单又方便，但也需要权衡：例如，冻结对象可能会干扰常见的 JavaScript 测试策略。
:::

## 原型属性

An object’s prototype attribute specifies the object from which it inherits properties. (Review §6.2.3 and §6.3.2 for more on prototypes and property inheritance.) This is such an important attribute that we usually simply say “the prototype of o" rather than “the `prototype` attribute of `o`.” Remember also that when `prototype` appears in code font, it refers to an ordinary object property, not to the `prototype` attribute: **Chapter 9** explained that the `prototype` property of a constructor function specifies the `prototype` attribute of the objects created with that constructor.

::: tip 翻译
对象的原型属性指定它继承属性的对象。（有关原型和属性继承的更多信息，请参阅第 6.2.3 节和第 6.3.2 节。）这是一个非常重要的属性，因此我们通常简单地说“o 的原型”而不是“o”的“原型”属性。” 还要记住，当 `prototype` 以代码字体出现时，它指的是普通对象属性，而不是 `prototype` 属性：**第 9 章** 解释了构造函数的 `prototype` 属性指定了 `prototype` 使用该构造函数创建的对象的属性。
:::

The `prototype` attribute is set when an object is created. Objects created from object literals use `Object.prototype` as their prototype. Objects created with `new` use the value of the prototype property of their constructor function as their prototype. And objects created with `Object.create()` use the first argument to that function (which may be `null`) as their prototype.

::: tip 翻译
`prototype` 属性是在创建对象时设置的。 从对象字面量创建的对象使用 `Object.prototype` 作为其原型。 使用 `new` 创建的对象使用其构造函数的原型属性的值作为其原型。 使用 `Object.create()` 创建的对象使用该函数的第一个参数（可能是 `null`）作为其原型。
:::

You can query the prototype of any object by passing that object to `Object.getPrototypeOf()`:

::: tip 翻译
您可以通过将对象传递给 `Object.getPrototypeOf()` 来查询任何对象的原型：
:::

```js
Object.getPrototypeOf({}); // => Object.prototype
Object.getPrototypeOf([]); // => Array.prototype
Object.getPrototypeOf(() => {}); // => Function.prototype
```

A very similar function, `Reflect.getPrototypeOf()`, is described in §14.6.

::: tip 翻译
第 14.6 节中描述了一个非常相似的函数 `Reflect.getPrototypeOf()`。
:::

To determine whether one object is the prototype of (or is part of the prototype chain of) another object, use the `isPrototypeOf()` method:

::: tip 翻译
要确定一个对象是否是另一个对象的原型（或者是其原型链的一部分），请使用 `isPrototypeOf()` 方法：
:::

```js
let p = { x: 1 }; // Define a prototype object.
let o = Object.create(p); // Create an object with that prototype.
p.isPrototypeOf(o); // => true: o inherits from p
Object.prototype.isPrototypeOf(p); // => true: p inherits from Object.prototype
Object.prototype.isPrototypeOf(o); // => true: o does too
```

Note that `isPrototypeOf()` performs a function similar to the `instanceof` operator(see §4.9.4).

::: tip 翻译
请注意，`isPrototypeOf()` 执行与 `instanceof` 运算符类似的功能（请参阅第 4.9.4 节）。
:::

The `prototype` attribute of an object is set when the object is created and normally remains fixed. You can, however, change the `prototype` of an object with `Object.setPrototypeOf()`:

::: tip 翻译
对象的 `prototype` 属性是在创建对象时设置的，并且通常保持固定。 但是，您可以使用 `Object.setPrototypeOf()` 更改对象的`prototype`：
:::

```js
let o = { x: 1 };
let p = { y: 2 };
Object.setPrototypeOf(o, p); // Set the prototype of o to p
o.y; // => 2: o now inherits the property y
let a = [1, 2, 3];
Object.setPrototypeOf(a, p); // Set the prototype of array a to p
a.join; // => undefined: a no longer has a join() method
```

There is generally no need to ever use `Object.setPrototypeOf()`. JavaScript implementations may make aggressive optimizations based on the assumption that the prototype of an object is fixed and unchanging. This means that if you ever call `Object.setPrototypeOf()`, any code that uses the altered objects may run much slower than it would normally.

::: tip 翻译
通常不需要使用 `Object.setPrototypeOf()`。 JavaScript 实现可能会基于对象的原型是固定且不变的假设来进行积极的优化。 这意味着，如果您调用 `Object.setPrototypeOf()`，任何使用更改后的对象的代码的运行速度可能会比正常情况下慢得多。
:::

A similar function, `Reflect.setPrototypeOf()`, is described in §14.6.

::: tip 翻译
第 14.6 节中描述了类似的函数 `Reflect.setPrototypeOf()`。
:::

Some early browser implementations of JavaScript exposed the `prototype` attribute of an object through the `__proto__` property (written with two underscores at the start and end). This has long since been deprecated, but enough existing code on the web depends on `__proto__` that the ECMAScript standard mandates it for all JavaScript implementations that run in web browsers. (Node supports it, too, though the standard does not require it for Node.) In modern JavaScript, `__proto__` is readable and writeable, and you can (though you shouldn’t) use it as an alternative to `Object.getPrototypeOf()` and `Object.setPrototypeOf()`. One interesting use of `__proto__`, however, is to define the prototype of an object literal:

::: tip 翻译
一些早期的 JavaScript 浏览器实现通过 `__proto__` 属性（在开头和结尾处用两个下划线编写）公开了对象的 `prototype` 属性。 这早已被弃用，但网络上足够多的现有代码依赖于 `__proto__`，ECMAScript 标准要求所有在网络浏览器中运行的 JavaScript 实现都必须使用它。 （Node 也支持它，尽管标准并不要求 Node 使用它。）在现代 JavaScript 中，`__proto__` 是可读可写的，您可以（尽管不应该）使用它作为 `Object.getPrototypeOf()` 和 `Object.setPrototypeOf()` 的替代品。 然而，`__proto__` 的一个有趣的用途是定义对象字面量的原型：
:::

```js
let p = { z: 3 };
let o = {
  x: 1,
  y: 2,
  __proto__: p,
};
o.z; // => 3: o inherits from p
```

## 著名的 Symbols

The Symbol type was added to JavaScript in ES6, and one of the primary reasons for doing so was to safely add extensions to the language without breaking compatibility with code already deployed on the web. We saw an example of this in [Chapter 12](./Chapter-12-Iterators_Generators.md), where we learned that you can make a class iterable by implementing a method whose “name” is the Symbol `Symbol.iterator`.

::: tip 翻译
在 ES6 中，Symbol 类型被添加到 JavaScript 中，这样做的主要原因之一是安全地向该语言添加扩展，而不会破坏与已部署在 Web 上的代码的兼容性。 我们在[第 12 章](./Chapter-12-Iterators_Generators.md)中看到了一个这样的例子，我们了解到可以通过实现一个“名称”为符号 `Symbol.iterator` 的方法来使类可迭代。
:::

`Symbol.iterator` is the best-known example of the “well-known Symbols.” These are a set of Symbol values stored as properties of the `Symbol()` factory function that are used to allow JavaScript code to control certain low-level behaviors of objects and classes. The subsections that follow describe each of these well-known Symbols and explain how they can be used.

::: tip 翻译
`Symbol.iterator` 是“众所周知的符号”中最著名的例子。 这些是作为 `Symbol()` 工厂函数的属性存储的一组符号值，用于允许 JavaScript 代码控制对象和类的某些低级行为。 接下来的小节描述了这些众所周知的符号，并解释了如何使用它们。
:::

### Symbol.iterator 和 Symbol.asyncIterator

The `Symbol.iterator` and `Symbol.asyncIterator` Symbols allow objects or classes to make themselves iterable or asynchronously iterable. They were covered in detail in [Chapter 12](./Chapter-12-Iterators_Generators.md) and §13.4.2, respectively, and are mentioned again here only for completeness.

::: tip 翻译
`Symbol.iterator` 和 `Symbol.asyncIterator` 符号允许对象或类使其自身可迭代或异步可迭代。 它们分别在[第 12 章](./Chapter-12-Iterators_Generators.md)和第 13.4.2 节中进行了详细介绍，此处再次提及只是为了完整性。
:::

### Symbol.hasInstance

When the `instanceof` operator was described in §4.9.4, we said that the righthand side must be a constructor function and that the expression `o instanceof f` was evaluated by looking for the value `f.prototype` within the prototype chain of `o`. That is still true, but in ES6 and beyond, `Symbol.hasInstance` provides an alternative. In ES6, if the righthand side of `instanceof` is any object with a `[Symbol.hasInstance]` method, then that method is invoked with the lefthand side value as its argument, and the return value of the method, converted to a boolean, becomes the value of the `instanceof` operator. And, of course, if the value on the righthand side does not have a `[Symbol.hasInstance]` method but is a function, then the `instanceof` operator behaves in its ordinary way.

::: tip 翻译
当第 4.9.4 节描述 `instanceof` 运算符时，我们说右侧必须是构造函数，并且通过查找值 `f.prototype`来评估表达式`o instanceof f` 在 `o` 的原型链中。 这仍然是事实，但在 ES6 及更高版本中，`Symbol.hasInstance` 提供了一种替代方案。 在 ES6 中，如果 `instanceof` 的右侧是任何具有 `[Symbol.hasInstance]` 方法的对象，则使用左侧值作为参数来调用该方法，并将该方法的返回值转换为布尔值，成为 `instanceof` 运算符的值。 当然，如果右侧的值没有 `[Symbol.hasInstance]` 方法，而是一个函数，则 `instanceof` 运算符将以普通方式运行。
:::

`Symbol.hasInstance` means that we can use the `instanceof` operator to do generic type checking with suitably defined pseudotype objects. For example:

::: tip 翻译
`Symbol.hasInstance` 意味着我们可以使用 `instanceof` 运算符对适当定义的伪类型对象进行泛型类型检查。 例如：
:::

```js
// Define an object as a "type" we can use with instanceof
let uint8 = {
    [Symbol.hasInstance(x)] {
        return Number.isInteger(x) && x >= 0 && x <= 255;
    }
};
128 instanceof uint8    // => true
256 instanceof uint8    // => false
Math.PI instanceof uint8    // => false: not an integer
```

Note that this example is clever but confusing because it uses a nonclass object where a class would normally be expected. It would be just as easy—and clearer to readers of your code—to write a `isUint8()` function instead of relying on this `Symbol.hasInstance` behavior.

::: tip 翻译
请注意，这个示例很聪明，但令人困惑，因为它使用了通常需要类的非类对象。 编写 `isUint8()` 函数而不是依赖此 `Symbol.hasInstance` 行为同样容易，并且对于代码的读者来说更清晰。
:::

### Symbol.toStringTag

If you invoke the `toString()` method of a basic JavaScript object, you get the string “`[object Object]`”:

::: tip 翻译
如果调用基本 JavaScript 对象的 `toString()` 方法，您将得到字符串“`[object Object]`”：
:::

```js
{}.toString()   // => "[object Object]"
```

If you invoke this same `Object.prototype.toString()` function as a method of instances of built-in types, you get some interesting results:

::: tip 翻译
如果您调用相同的 `Object.prototype.toString()` 函数作为内置类型实例的方法，您会得到一些有趣的结果：
:::

```js
Object.prototype.toString.call([]); // => "[object Array]"
Object.prototype.toString.call(/./); // => "[object RegExp]"
Object.prototype.toString.call(() => {}); // => "[object Function]"
Object.prototype.toString.call(""); // => "[object String]"
Object.prototype.toString.call(0); // => "[object Number]"
Object.prototype.toString.call(false); // => "[object Boolean]"
```

It turns out that you can use this `Object.prototype.toString().call()` technique with any JavaScript value to obtain the “class attribute” of an object that contains type information that is not otherwise available. The following `classof()` function is arguably more useful than the `typeof` operator, which makes no distinction between types of objects:

::: tip 翻译
事实证明，您可以将 `Object.prototype.toString().call()` 技术与任何 JavaScript 值一起使用，以获取包含无法通过其他方式获得的类型信息的对象的“类属性”。 下面的 `classof()` 函数可以说比 `typeof` 运算符更有用，后者不区分对象的类型：
:::

```js
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

classof(null); // => "Null"
classof(undefined); // => "Undefined"
classof(1); // => "Number"
classof(10n ** 100n); // => "BigInt"
classof(""); // => "String"
classof(false); // => "Boolean"
classof(Symbol()); // => "Symbol"
classof({}); // => "Object"
classof([]); // => "Array"
classof(/./); // => "RegExp"
classof(() => {}); // => "Function"
classof(new Map()); // => "Map"
classof(new Set()); // => "Set"
classof(new Date()); // => "Date"
```

Prior to ES6, this special behavior of the `Object.prototype.toString()` method was available only to instances of built-in types, and if you called this `classof()` function on an instance of a class you had defined yourself, it would simply return “Object”. In ES6, however, `Object.prototype.toString()` looks for a property with the symbolic name `Symbol.toStringTag` on its argument, and if such a property exists, it uses the property value in its output. This means that if you define a class of your own, you can easily make it work with functions like `classof()`:

::: tip 翻译
在 ES6 之前，`Object.prototype.toString()` 方法的这种特殊行为仅适用于内置类型的实例，并且如果您在你自己已定义的类的实例上调用此`classof()`函数，它只会返回 `Object`。 然而，在 ES6 中，`Object.prototype.toString()` 在其参数上查找具有符号名称 `Symbol.toStringTag` 的属性，如果存在这样的属性，它将在其输出中使用该属性值。 这意味着如果您定义自己的类，您可以轻松地使其与 `classof()` 等函数一起使用：
:::

```js
class Range {
  get [Symbol.toStringTag]() {
    return "Range";
  }
  // the rest of this class is omitted here
}
let r = new Range(1, 10);
Object.prototype.toString.call(r); // => "[object Range]"
classof(r); // => "Range"
```

### Symbol.species

Prior to ES6, JavaScript did not provide any real way to create robust subclasses of built-in classes like Array. In ES6, however, you can extend any built-in class simply by using the `class` and `extends` keywords. §9.5.2 demonstrated that with this simple subclass of Array:

::: tip 翻译
在 ES6 之前，JavaScript 没有提供任何真正的方法来创建内置类（如 Array）的健壮子类。 然而，在 ES6 中，您只需使用 `class` 和`extends` 关键字即可扩展任何内置类。 第 9.5.2 节通过这个简单的 Array 子类证明了这一点：
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

let e = new EZArray(1, 2, 3);
let f = e.map((x) => x * x);
e.last; // => 3: the last element of EZArray e
f.last; // => 9: f is also an EZArray with a last property
```

Array defines methods `concat()`, `filter()`, `map()`, `slice()`, and `splice()`, which return arrays. When we create an array subclass like EZArray that inherits these methods, should the inherited method return instances of Array or instances of EZArray? Good arguments can be made for either choice, but the ES6 specification says that (by default) the five array-returning methods will return instances of the subclass.

::: tip 翻译
Array 定义了返回数组的方法 `concat()`、`filter()`、`map()`、`slice()` 和 `splice()`。 当我们创建像 EZArray 这样继承这些方法的数组子类时，继承的方法应该返回 Array 的实例还是 EZArray 的实例？ 对于这两种选择都可以提出很好的论据，但 ES6 规范表示（默认情况下）五个数组返回方法将返回子类的实例。
:::

Here’s how it works:

- In ES6 and later, the `Array()` constructor has a property with the symbolic name `Symbol.species`. (Note that this Symbol is used as the name of a property of the constructor function. Most of the other well-known Symbols described here are used as the name of methods of a prototype object.)
- When we create a subclass with `extends`, the resulting subclass constructor inherits properties from the superclass constructor. (This is in addition to the normal kind of inheritance, where instances of the subclass inherit methods of the superclass.) This means that the constructor for every subclass of Array also has an inherited property with name `Symbol.species`. (Or a subclass can define its own property with this name, if it wants.)
- Methods like `map()` and `slice()` that create and return new arrays are tweaked slightly in ES6 and later. Instead of just creating a regular Array, they (in effect) invoke `new this.constructor[Symbol.species]()` to create the new array.

::: tip 翻译
它的工作原理如下：

- 在 ES6 及更高版本中，`Array()`构造函数有一个符号名称为 `Symbol.species` 的属性。 （请注意，此 Symbol 用作构造函数的属性名称。这里描述的大多数其他众所周知的 Symbol 都用作原型对象的方法名称。）
- 当我们使用 `extends` 创建子类时，生成的子类构造函数会继承超类构造函数的属性。 （这是对正常继承的补充，其中子类的实例继承超类的方法。）这意味着 Array 的每个子类的构造函数也有一个名为 `Symbol.species` 的继承属性。（或者，如果需要，子类可以使用此名称定义自己的属性。）
- 在 ES6 及更高版本中，创建和返回新数组的 `map()` 和 `slice()` 等方法略有调整。 他们（实际上）调用 `new this.constructor[Symbol.species]()` 来创建新数组，而不是仅仅创建常规数组。
  :::

Now here’s the interesting part. Suppose that `Array[Symbol.species]` was just a regular data property, defined like this:

::: tip 翻译
现在这是有趣的部分。 假设 `Array[Symbol.species]` 只是一个常规数据属性，定义如下：
:::

```js
Array[Symbol.species] = Array;
```

In that case, then subclass constructors would inherit the `Array()` constructor as their “species,” and invoking `map()` on an array subclass would return an instance of the superclass rather than an instance of the subclass. That is not how ES6 actually behaves, however. The reason is that `Array[Symbol.species]` is a read-only accessor property whose `getter` function simply returns this. Subclass constructors inherit this getter function, which means that by default, every subclass constructor is its own “species.”

::: tip 翻译
在这种情况下，子类构造函数将继承 `Array()` 构造函数作为它们的“`species`”，并且在数组子类上调用 `map()` 将返回超类的实例而不是子类的实例。 然而，ES6 的实际行为并非如此。 原因是 `Array[Symbol.species]` 是一个只读访问器属性，其 `getter` 函数仅返回 `this` 。 子类构造函数继承了这个 `getter` 函数，这意味着默认情况下，每个子类构造函数都是它自己的“`species`”。
:::

Sometimes this default behavior is not what you want, however. If you wanted the array-returning methods of EZArray to return regular Array objects, you just need to set `EZArray[Symbol.species]` to `Array`. But since the inherited property is a read only accessor, you can’t just set it with an assignment operator. You can use `defineProperty()`, however:

::: tip 翻译
然而，有时这种默认行为并不是您想要的。 如果您希望 EZArray 的数组返回方法返回常规 Array 对象，只需将 `EZArray[Symbol.species]` 设置为 `Array` 即可。 但由于继承的属性是只读访问器，因此不能仅使用赋值运算符来设置它。 但是，您可以使用`defineProperty()` ：
:::

```js
EZArray[Symbol.species] = Array; // Attempt to set a read-only property fails

// Instead we can use defineProperty():
Object.defineProperty(EZArray, Symbol.species, { value: Array });
```

The simplest option is probably to explicitly define your own `Symbol.species` getter when creating the subclass in the first place:

::: tip 翻译
最简单的选择可能是在首先创建子类时显式定义您自己的 `Symbol.species` getter：
:::

```js
class EZArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
  get first() {
    return this[0];
  }
  get last() {
    return this[this.length - 1];
  }
}

let e = new EZArray(1, 2, 3);
let f = e.map((x) => x - 1);
e.last; // => 3
f.last; // => undefined: f is a regular array with no last getter
```

Creating useful subclasses of Array was the primary use case that motivated the introduction of `Symbol.species`, but it is not the only place that this well-known Symbol is used. Typed array classes use the Symbol in the same way that the Array class does. Similarly, the `slice()` method of `ArrayBuffer` looks at the `Symbol.species` property of `this.constructor` instead of simply creating a new `ArrayBuffer`. And Promise methods like `then()` that return new Promise objects create those objects via this species protocol as well. Finally, if you find yourself subclassing Map (for example) and defining methods that return new Map objects, you might want to use `Symbol.species` yourself for the benefit of subclasses of your subclass.

::: tip 翻译
创建有用的 Array 子类是推动引入 `Symbol.species` 的主要用例，但这并不是使用这个众所周知的 Symbol 的唯一地方。 类型化数组类使用 Symbol 的方式与 Array 类相同。 类似地，`ArrayBuffer` 的 `slice()` 方法查看 `this.constructor` 的 `Symbol.species` 属性，而不是简单地创建一个新的 `ArrayBuffer`。 像 `then()` 这样返回新 Promise 对象的 Promise 方法也通过这个物种协议创建这些对象。 最后，如果您发现自己对 Map 进行了子类化（例如）并定义了返回新 Map 对象的方法，那么您可能希望自己使用 `Symbol.species` 来为您的子类的子类带来好处。
:::

### Symbol.isConcatSpreadable

The Array method `concat()` is one of the methods described in the previous section that uses `Symbol.species` to determine what constructor to use for the returned array. But `concat()` also uses `Symbol.isConcatSpreadable`. Recall from §7.8.3 that the `concat()` method of an array treats its `this` value and its array arguments differently than its nonarray arguments: nonarray arguments are simply appended to the new array, but the this array and any array arguments are flattened or “spread” so that the elements of the array are concatenated rather than the array argument itself.

::: tip 翻译
数组方法 `concat()` 是上一节中描述的方法之一，它使用 `Symbol.species` 来确定返回数组使用哪个构造函数。 但是 `concat()` 也使用 `Symbol.isConcatSpread`。 回想一下第 7.8.3 节，数组的 `concat()` 方法对待它的 `this` 值和它的数组参数与它的非数组参数不同：非数组参数只是简单地附加到新数组，但 `this` 数组和任何数组参数都是展平或“展开”，以便连接数组的元素而不是数组参数本身。
:::

Before ES6, `concat()` just used `Array.isArray()` to determine whether to treat a value as an array or not. In ES6, the algorithm is changed slightly: if the argument (or the `this` value) to `concat()` is an object and has a property with the symbolic name `Symbol.isConcatSpreadable`, then the boolean value of that property is used to determine whether the argument should be “spread.” If no such property exists, then `Array.isArray()` is used as in previous versions of the language.

::: tip 翻译
在 ES6 之前，`concat()` 仅使用 `Array.isArray()` 来确定是否将值视为数组。 在 ES6 中，算法略有改变：如果 `concat()` 的参数（或 `this` 值）是一个对象，并且具有符号名称为 `Symbol.isConcatSpread` 的属性，则该属性的布尔值是用于确定参数是否应该“传播”。 如果不存在这样的属性，则像该语言的早期版本一样使用 `Array.isArray()` 。
:::

There are two cases when you might want to use this Symbol:

- If you create an Array-like (see §7.9) object and want it to behave like a real array when passed to `concat()`, you can simply add the symbolic property to your object:
  ```js
  let arraylike = {
    length: 1,
    0: 1,
    [Symbol.isConcatSpreadable]: true,
  };
  [].concat(arraylike); // => [1]: (would be [[1]] if not spread)
  ```
- Array subclasses are spreadable by default, so if you are defining an array subclass that you do not want to act like an array when used with `concat()`, then you can add a `getter` like this to your subclass:
  ```js
  class NonSpreadableArray extends Array {
    get [Symbol.isConcatSpreadable]() {
      return false;
    }
  }
  let a = new NonSpreadableArray(1, 2, 3);
  [].concat(a).length; // => 1; (would be 3 elements long if a was spread)
  ```

::: tip 翻译
在两种情况下您可能需要使用此符号：

- 如果您创建一个类似数组（参见第 7.9 节）的对象，并希望它在传递给 `concat()` 时表现得像一个真正的数组，您可以简单地将符号属性添加到您的对象中：
- 数组子类默认是可扩展的，因此，如果您正在定义一个数组子类，并且不想在与 `concat()` 一起使用时表现得像数组一样，那么您可以向您的子类添加如下所示的 `getter` ：
  :::

### 模式匹配 Symbols

§11.3.2 documented the String methods that perform pattern-matching operations using a RegExp argument. In ES6 and later, these methods have been generalized to work with RegExp objects or any object that defines pattern-matching behavior via properties with symbolic names. For each of the string methods `match()`, `matchAll()`, `search()`, `replace()`, and `split()`, there is a corresponding well-known Symbol: `Symbol.match`, `Symbol.search`, and so on.

::: tip 翻译
第 11.3.2 节记录了使用 RegExp 参数执行模式匹配操作的 String 方法。 在 ES6 及更高版本中，这些方法已被推广到与 RegExp 对象或任何通过具有符号名称的属性定义模式匹配行为的对象一起使用。 对于每个字符串方法 `match()`、 `matchAll()`、`search()`、`replace()` 和 `split()`，都有一个相应的众所周知的 Symbol：`Symbol.match`、`Symbol.search` 等。
:::

RegExps are a general and very powerful way to describe textual patterns, but they can be complicated and not well suited to fuzzy matching. With the generalized string methods, you can define your own pattern classes using the well-known Symbol methods to provide custom matching. For example, you could perform string comparisons using `Intl.Collator` (see §11.7.3) to ignore accents when matching. Or you could define a pattern class based on the _Soundex_ algorithm to match words based on their approximate sounds or to loosely match strings up to a given _Levenshtein_ distance.

::: tip 翻译
正则表达式是描述文本模式的通用且非常强大的方法，但它们可能很复杂并且不太适合模糊匹配。 通过通用字符串方法，您可以使用众所周知的 Symbol 方法来定义自己的模式类，以提供自定义匹配。 例如，您可以使用 `Intl.Collator`（请参阅第 11.7.3 节）执行字符串比较，以在匹配时忽略重音符号。 或者，您可以基于 _Soundex_ 算法定义一个模式类，以根据单词的近似发音来匹配单词，或者松散地匹配字符串直至给定的 _Levenshtein_ 距离。
:::

In general, when you invoke one of these five String methods on a pattern object like this:

::: tip 翻译
一般来说，当您在模式对象上调用这五个 String 方法之一时，如下所示：
:::

```js
string.method(pattern, arg);
```

that invocation turns into an invocation of a symbolically named method on your pattern object:

::: tip 翻译
该调用变成对模式对象上的符号命名方法的调用：
:::

```js
pattern[symbol](string, arg);
```

As an example, consider the pattern-matching class in the next example, which implements pattern matching using the simple `*` and `?` wildcards that you are probably familar with from filesystems. This style of pattern matching dates back to the very early days of the Unix operating system, and the patterns are often called _globs_:

::: tip 翻译
作为示例，请考虑下一个示例中的模式匹配类，该类使用简单的 `*` 和 `?` 实现模式匹配。您可能熟悉文件系统中的通配符。 这种模式匹配风格可以追溯到 Unix 操作系统的早期，这些模式通常称为 _globs_：
:::

```js
class Glob {
  constructor(glob) {
    this.glob = glob;

    // We implement glob matching using RegExp internally.
    // ? matches any one character except /, and * matches zero or more
    // of those characters. We use capturing groups around each.
    let regexpText = glob.replace("?", "([^/])").replace("*", "([^/]*)");

    // We use the u flag to get Unicode-aware matching.
    // Globs are intended to match entire strings, so we use the ^ and $
    // anchors and do not implement search() or matchAll() since they
    // are not useful with patterns like this.
    this.regexp = new RegExp(`^${regexpText}$`, "u");
  }

  toString() {
    return this.glob;
  }

  [Symbol.search](s) {
    return s.search(this.regexp);
  }
  [Symbol.match](s) {
    return s.match(this.regexp);
  }
  [Symbol.replace](s, replacement) {
    return s.replace(this.regexp, replacement);
  }
}

let pattern = new Glob("docs/*.txt");
"docs/js.txt".search(pattern); // => 0: matches at character 0
"docs/js.htm".search(pattern); // => -1: does not match
let match = "docs/js.txt".match(pattern);
match[0]; // => "docs/js.txt"
match[1]; // => "js"
match.index; // => 0
"docs/js.txt".replace(pattern, "web/$1.htm"); // => "web/js.htm"
```

### Symbol.toPrimitive

§3.9.3 explained that JavaScript has three slightly different algorithms for converting objects to primitive values. Loosely speaking, for conversions where a string value is expected or preferred, JavaScript invokes an object’s `toString()` method first and falls back on the `valueOf()` method if `toString()` is not defined or does not return a primitive value. For conversions where a numeric value is preferred, JavaScript tries the `valueOf()` method first and falls back on `toString()` if `valueOf()` is not defined or if it does not return a primitive value. And finally, in cases where there is no preference, it lets the class decide how to do the conversion. Date objects convert using `toString()` first, and all other types try `valueOf()` first.

::: tip 翻译
第 3.9.3 节解释了 JavaScript 具有三种略有不同的算法来将对象转换为原始值。 宽松地说，对于需要或首选字符串值的转换，JavaScript 首先调用对象的 `toString()` 方法，如果 `toString()` 未定义或不返回一个原始值，则退回到 `valueOf()` 方法。。 对于首选数值的转换，JavaScript 首先尝试 `valueOf()` 方法，如果未定义 `valueOf()` 或它不返回原始值，则使用 `toString()` 方法。 最后，在没有偏好的情况下，它让类决定如何进行转换。 日期对象首先使用 `toString()` 进行转换，所有其他类型首先尝试 `valueOf()`。
:::

In ES6, the well-known Symbol `Symbol.toPrimitive` allows you to override this default object-to-primitive behavior and gives you complete control over how instances of your own classes will be converted to primitive values. To do this, define a method with this symbolic name. The method must return a primitive value that somehow represents the object. The method you define will be invoked with a single string argument that tells you what kind of conversion JavaScript is trying to do on your object:

- If the argument is "`string`", it means that JavaScript is doing the conversion in a context where it would expect or prefer (but not require) a string. This happens when you interpolate the object into a template literal, for example.
- If the argument is "`number`", it means that JavaScript is doing the conversion in a context where it would expect or prefer (but not require) a numeric value. This happens when you use the object with a `<` or `>` operator or with arithmetic operators like `-` and `*`.
- If the argument is "`default`", it means that JavaScript is converting your object in a context where either a numeric or string value could work. This happens with the `+`, `==`, and `!=` operators.

::: tip 翻译
在 ES6 中，众所周知的符号 `Symbol.toPrimitive` 允许您覆盖此默认的对象到原始值行为，并让您完全控制自己的类的实例如何转换为原始值。 为此，请使用此符号名称定义一个方法。 该方法必须返回一个以某种方式表示该对象的原始值。 您定义的方法将使用单个字符串参数来调用，该参数告诉您 JavaScript 尝试对您的对象执行哪种类型的转换：

- 如果参数是 `string`，则意味着 JavaScript 正在期望或更喜欢（但不要求）字符串的上下文中进行转换。 例如，当您将对象插入模板文字时，就会发生这种情况。
- 如果参数是 `number`，则意味着 JavaScript 正在期望或更喜欢（但不要求）数值的上下文中进行转换。 当您将对象与 `<` 或 `>` 运算符或与 `-` 和 `*` 等算术运算符一起使用时，就会发生这种情况。
- 如果参数是 `default`，则意味着 JavaScript 正在数字或字符串值可以工作的上下文中转换您的对象。 这种情况发生在 `+`、`==` 和`!=` 运算符上。
  :::

Many classes can ignore the argument and simply return the same primitive value in all cases. If you want instances of your class to be comparable and sortable with `<` and `>`, then that is a good reason to define a `[Symbol.toPrimitive]` method.

::: tip 翻译
许多类可以忽略该参数，并在所有情况下简单地返回相同的原始值。 如果您希望类的实例可以使用 `<` 和 `>` 进行比较和排序，那么这是定义`[Symbol.toPrimitive]` 方法的一个很好的理由。
:::

### Symbol.unscopables

The final well-known Symbol that we’ll cover here is an obscure one that was introduced as a workaround for compatibility issues caused by the deprecated `with` statement. Recall that the `with` statement takes an object and executes its statement body as if it were in a scope where the properties of that object were variables. This caused compatibility problems when new methods were added to the Array class, and it broke some existing code. `Symbol.unscopables` is the result. In ES6 and later, the `with` statement has been slightly modified. When used with an object `o`, a `with` statement computes `Object.keys(o[Symbol.unscopables]||{})` and ignores properties whose names are in the resulting array when creating the simulated scope in which to execute its body. ES6 uses this to add new methods to `Array.prototype` without breaking existing code on the web. This means that you can find a list of the newest Array methods by evaluating:

::: tip 翻译
我们将在这里介绍的最后一个众所周知的符号是一个不起眼的符号，它是作为因已弃用的 `with` 语句引起的兼容性问题的解决方法而引入的。 回想一下，`with` 语句接受一个对象并执行其语句主体，就好像它处于该对象的属性是变量的作用域中一样。 当向 Array 类添加新方法时，这会导致兼容性问题，并且会破坏一些现有代码。 结果是 `Symbol.unscopables`。 在 ES6 及更高版本中，`with` 语句已稍作修改。 当与对象 `o` 一起使用时，`with` 语句会计算 `Object.keys(o[Symbol.unscopables]||{})`，并在创建模拟作用域时忽略名称位于结果数组中的属性。 执行它的主体。 ES6 使用它向 `Array.prototype` 添加新方法，而不会破坏网络上的现有代码。 这意味着您可以通过评估找到最新 Array 方法的列表：
:::

```js
let newArrayMethods = Object.keys(Array.prototype[Symbol.unscopables]);
```

## 模板标签

Strings within backticks are known as “template literals” and were covered in §3.3.4. When an expression whose value is a function is followed by a template literal, it turns into a function invocation, and we call it a “tagged template literal.” Defining a new tag function for use with tagged template literals can be thought of as metaprogramming, because tagged templates are often used to define DSLs—domain-specific languages—and defining a new tag function is like adding new syntax to JavaScript. Tagged template literals have been adopted by a number of frontend JavaScript packages. The GraphQL query language uses a <code>gql\`\`</code> tag function to allow queries to be embedded within JavaScript code. And the Emotion library uses a <code>css\`\`</code> tag function to enable CSS styles to be embedded in JavaScript. This section demonstrates how to write your own tag functions like these.

::: tip 翻译
反引号内的字符串称为“模板文字”，并在第 3.3.4 节中进行了介绍。 当一个值为函数的表达式后面跟着一个模板文字时，它就变成了一个函数调用，我们称之为“标记模板文字”。 定义与标记模板文字一起使用的新标记函数可以被视为元编程，因为标记模板通常用于定义 DSL（特定于域的语言），并且定义新标记函数就像向 JavaScript 添加新语法一样。 标记模板文字已被许多前端 JavaScript 包采用。 GraphQL 查询语言使用 <code>gql\`\`</code> 标签函数来允许将查询嵌入到 JavaScript 代码中。 Emotion 库使用 <code>css\`\`</code> 标签功能使 CSS 样式能够嵌入到 JavaScript 中。 本节演示如何编写您自己的此类标记函数。
:::

There is nothing special about tag functions: they are ordinary JavaScript functions, and no special syntax is required to define them. When a function expression is followed by a template literal, the function is invoked. The first argument is an array of strings, and this is followed by zero or more additional arguments, which can have values of any type.

::: tip 翻译
标签函数没有什么特别之处：它们是普通的 JavaScript 函数，不需要特殊的语法来定义它们。 当函数表达式后跟模板文字时，将调用该函数。 第一个参数是一个字符串数组，后面跟着零个或多个附加参数，这些参数可以具有任何类型的值。
:::

The number of arguments depends on the number of values that are interpolated into the template literal. If the template literal is simply a constant string with no interpolations, then the tag function will be called with an array of that one string and no additional arguments. If the template literal includes one interpolated value, then the tag function is called with two arguments. The first is an array of two strings, and the second is the interpolated value. The strings in that initial array are the string to the left of the interpolated value and the string to its right, and either one of them may be the empty string. If the template literal includes two interpolated values, then the tag function is invoked with three arguments: an array of three strings and the two interpolated values. The three strings (any or all of which may be empty) are the text to the left of the first value, the text between the two values, and the text to the right of the second value. In the general case, if the template literal has `n` interpolated values, then the tag function will be invoked with `n+1` arguments. The first argument will be an array of `n+1` strings, and the remaining arguments are the `n` interpolated values, in the order that they appear in the template literal.

::: tip 翻译
参数的数量取决于插入到模板文字中的值的数量。 如果模板文字只是一个没有插值的常量字符串，那么将使用该字符串的数组来调用标记函数，并且没有其他参数。 如果模板文字包含一个内插值，则使用两个参数调用标记函数。 第一个是两个字符串的数组，第二个是插值。 该初始数组中的字符串是插值左侧的字符串和右侧的字符串，其中任一字符串都可能是空字符串。 如果模板文字包含两个内插值，则使用三个参数调用标记函数：三个字符串的数组和两个内插值。 这三个字符串（其中任何或全部可能为空）是第一个值左侧的文本、两个值之间的文本以及第二个值右侧的文本。 在一般情况下，如果模板文字具有 `n` 内插值，则将使用 `n+1` 参数调用标记函数。 第一个参数将是一个由 `n+1` 字符串组成的数组，其余参数是 `n` 插值，按照它们在模板文字中出现的顺序排列。
:::

The value of a template literal is always a string. But the value of a tagged template literal is whatever value the tag function returns. This may be a string, but when the tag function is used to implement a DSL, the return value is typically a non-string data structure that is a parsed representation of the string.

::: tip 翻译
模板文字的值始终是字符串。 但标记模板文字的值是标记函数返回的任何值。 这可能是一个字符串，但是当标签函数用于实现 DSL 时，返回值通常是一个非字符串数据结构，它是字符串的解析表示。
:::

As an example of a template tag function that returns a string, consider the following <code>html\`\`</code> template, which is useful when you want to safely interpolate values into a string of HTML. The tag performs HTML escaping on each of the values before using it to build the final string:

::: tip 翻译
作为返回字符串的模板标记函数的示例，请考虑以下 <code>html\`\`</code> 模板，当您想要安全地将值插入 HTML 字符串时，该模板非常有用。 该标签在使用每个值构建最终字符串之前对每个值执行 HTML 转义：
:::

```js
function html(strings, ...values) {
  // Convert each value to a string and escape special HTML characters
  let escaped = values.map((v) =>
    String(v)
      .replace("&", "&amp;")
      .replace("<", "&lt;")
      .replace(">", "&gt;")
      .replace('"', "&quot;")
      .replace("'", "&#39;")
  );

  // Return the concatenated strings and escaped values
  let result = strings[0];
  for (let i = 0; i < escaped.length; i++) {
    result += escaped[i] + strings[i + 1];
  }
  return result;
}

let operator = "<";
html`<b>x ${operator} y</b>`; // => "<b>x &lt; y</b>"

let kind = "game",
  name = "D&D";
html`<div class="${kind}">${name}</div>`; // => '<div class="game">D&amp;D</div>'
```

For an example of a tag function that does not return a string but instead a parsed representation of a string, think back to the Glob pattern class defined in §14.4.6. Since the `Glob()` constructor takes a single string argument, we can define a tag function for creating new Glob objects:

::: tip 翻译
对于不返回字符串而是返回字符串的解析表示形式的标记函数的示例，请回想一下第 14.4.6 节中定义的 Glob 模式类。 由于 `Glob()` 构造函数采用单个字符串参数，因此我们可以定义一个标签函数来创建新的 Glob 对象：
:::

```js
function glob(strings, ...values) {
  // Assemble the strings and values into a single string
  let s = strings[0];
  for (let i = 0; i < values.length; i++) {
    s += values[i] + strings[i + 1];
  }
  // Return a parsed representation of that string
  return new Glob(s);
}

let root = "/tmp";
let filePattern = glob`${root}/*.html`; // A RegExp alternative
"/tmp/test.html".match(filePattern)[1]; // => "test"
```

One of the features mentioned in passing in §3.3.4 is the <code>String.raw\`\`</code> tag function that returns a string in its “raw” form without interpreting any of the backslash escape sequences. This is implemented using a feature of tag function invocation that we have not discussed yet. When a tag function is invoked, we’ve seen that its first argument is an array of strings. But this array also has a property named `raw`, and the value of that property is another array of strings, with the same number of elements. The argument array includes strings that have had escape sequences interpreted as usual. And the raw array includes strings in which escape sequences are not interpreted. This obscure feature is important if you want to define a DSL with a grammar that uses backslashes. For example, if we wanted our <code>glob\`\`</code> tag function to support pattern matching on Windows-style paths (which use backslashes instead of forward slashes) and we did not want users of the tag to have to double every backslash, we could rewrite that function to use `strings.raw[]` instead of `strings[]`. The downside, of course, would be that we could no longer use escapes like `\u` in our glob literals.

::: tip 翻译
第 3.3.4 节中提到的功能之一是 <code>String.raw\`\`</code> 标记函数，它返回“原始”形式的字符串，而不解释任何反斜杠转义序列。 这是使用我们尚未讨论的标签函数调用功能来实现的。 当调用标签函数时，我们看到它的第一个参数是一个字符串数组。 但是这个数组还有一个名为 `raw` 的属性，该属性的值是另一个字符串数组，具有相同数量的元素。 参数数组包含已像平常一样解释转义序列的字符串。 原始数组包含不解释转义序列的字符串。 如果您想要使用反斜杠的语法来定义 DSL，那么这个晦涩的功能就很重要。 例如，如果我们希望我们的 <code>glob\`\`</code> 标记函数支持 Windows 样式路径（使用反斜杠而不是正斜杠）上的模式匹配，并且我们不希望标记的用户必须使用两个反斜杠，我们可以重写该函数以使用 `strings.raw[]` 而不是 `strings[]`。 当然，缺点是我们不能再在全局文本中使用像 `\u` 这样的转义符。
:::

## The Reflect API

The Reflect object is not a class; like the Math object, its properties simply define a collection of related functions. These functions, added in ES6, define an API for “reflecting upon” objects and their properties. There is little new functionality here: the Reflect object defines a convenient set of functions, all in a single namespace, that mimic the behavior of core language syntax and duplicate the features of various pre existing Object functions.

::: tip 翻译
Reflect 对象不是一个类； 与 Math 对象一样，它的属性只是定义相关函数的集合。 ES6 中添加的这些函数定义了用于“反映”对象及其属性的 API。 这里几乎没有什么新功能：Reflect 对象定义了一组方便的函数，所有这些函数都在一个命名空间中，模仿核心语言语法的行为并复制各种预先存在的对象函数的功能。
:::

Although the `Reflect` functions do not provide any new features, they do group the features together in one convenient API. And, importantly, the set of `Reflect` functions maps one-to-one with the set of Proxy handler methods that we’ll learn about in §14.7.

::: tip 翻译
尽管 `Reflect` 函数不提供任何新功能，但它们确实将这些功能组合到一个方便的 API 中。 而且，重要的是，`Reflect` 函数集与我们将在第 14.7 节中了解的代理处理程序方法集一对一映射。
:::

The Reflect API consists of the following functions:

::: tip 翻译
Reflect API 由以下函数组成：
:::

**`Reflect.apply(f, o, args)`**
This function invokes the function f as a method of o (or invokes it as a function with no `this` value if o is `null`) and passes the values in the args array as arguments. It is equivalent to `f.apply(o, args)`.

::: tip 翻译
该函数将函数 `f` 作为 `o` 的方法调用（或者如果 o 为 `null`，则将其作为没有 `this` 值的函数调用），并将 `args` 数组中的值作为参数传递。 它相当于 `f.apply(o, args)` 。
:::

**`Reflect.construct(c, args, newTarget)`**
This function invokes the constructor `c` as if the `new` keyword had been used and passes the elements of the array `args` as arguments. If the optional `newTarget` argument is specified, it is used as the value of `new.target` within the constructor invocation. If not specified, then the `new.target` value will be `c`.

::: tip 翻译
该函数调用构造函数 `c`，就像使用了 new 关键字一样，并将数组 `args` 的元素作为参数传递。 如果指定了可选的 `newTarget` 参数，它将用作构造函数调用中 `new.target` 的值。 如果未指定，则 `new.target`值将为 `c`。
:::

**`Reflect.defineProperty(o, name, descriptor)`**
This function defines a property on the object `o`, using `name` (a string or symbol) as the name of the property. The Descriptor object should define the value (or getter and/or setter) and attributes of the property. `Reflect.defineProperty()` is very similar to `Object.defineProperty()` but returns true on success and false on failures. (`Object.defineProperty()` returns o on success and throws TypeError on failure.)

::: tip 翻译
该函数定义对象 `o` 的属性，使用 `name`（字符串或符号）作为属性的名称。 Descriptor 对象应该定义属性的值（或 `getter` 和/或 `setter` ）和属性。 `Reflect.defineProperty()` 与 `Object.defineProperty()` 非常相似，但成功时返回 true，失败时返回 false。 （`Object.defineProperty()` 成功时返回 `o`，失败时抛出 TypeError。）
:::

**`Reflect.deleteProperty(o, name)`**
This function deletes the property with the specified string or symbolic name from the object `o`, returning `true` if successful (or if no such property existed) and `false` if the property could not be deleted. Calling this function is similar to writing `delete o[name]`.

::: tip 翻译
此函数从对象 `o` 中删除具有指定字符串或符号名称的属性，如果成功（或者不存在此类属性）则返回 `true`，如果无法删除该属性则返回`false`。 调用此函数类似于编写 `delete o[name]`。
:::

**`Reflect.get(o, name, receiver)`**
This function returns the value of the property of `o` with the specified name (a string or symbol). If the property is an accessor method with a `getter`, and if the optional `receiver` argument is specified, then the `getter` function is called as a method of `receiver` instead of as a method of `o`. Calling this function is similar to evaluating `o[name]`.

::: tip 翻译
此函数返回具有指定名称（字符串或符号）的 `o` 属性的值。 如果属性是带有 `getter` 的访问器方法，并且指定了可选的 `receiver` 参数，则 `getter` 函数将作为 `receiver` 的方法调用，而不是作为 `o` 的方法。 调用此函数类似于评估 `o[name]`。
:::

**`Reflect.getOwnPropertyDescriptor(o, name)`**
This function returns a property descriptor object that describes the attributes of the property named `name` of the object `o`, or returns `undefined` if no such property exists. This function is nearly identical to `Object.getOwnPropertyDescriptor()`, except that the Reflect API version of the function requires that the first argument be an object and throws TypeError if it is not.

::: tip 翻译
该函数返回一个属性描述符对象，该对象描述对象 `o` 的名为 `name` 的属性的属性，如果不存在此类属性，则返回 `undefined` 。 此函数与 `Object.getOwnPropertyDescriptor()` 几乎相同，只是该函数的 Reflect API 版本要求第一个参数是对象，如果不是则抛出 TypeError。
:::

**`Reflect.getPrototypeOf(o)`**
This function returns the prototype of object o or `null` if the object has no prototype. It throws a TypeError if o is a primitive value instead of an object. This function is almost identical to `Object.getPrototypeOf()` except that `Object.getPrototypeOf()` only throws a TypeError for `null` and `undefined` arguments and coerces other primitive values to their wrapper objects.

::: tip 翻译
该函数返回对象 `o` 的原型，如果该对象没有原型，则返回 `null`。 如果 `o` 是原始值而不是对象，则会抛出 TypeError。 该函数与`Object.getPrototypeOf()` 几乎相同，只是 `Object.getPrototypeOf()` 仅针对 `null` 和 `undefined` 参数抛出 TypeError，并将其他原始值强制为其包装对象。
:::

**`Reflect.has(o, name)`**
This function returns `true` if the object o has a property with the specified `name` (which must be a string or a symbol). Calling this function is similar to evaluating `name in o`.

::: tip 翻译
如果对象 `o` 具有指定 `name`（必须是字符串或符号）的属性，则此函数返回 `true`。 调用此函数类似于评估 `name in o` 。
:::

**`Reflect.isExtensible(o)`**
This function returns `true` if the object `o` is extensible (§14.2) and `false` if it is not. It throws a TypeError if o is not an object. `Object.isExtensible()` is similar but simply returns `false` when passed an argument that is not an object.

::: tip 翻译
如果对象 `o` 可扩展（第 14.2 节），则此函数返回 `true`，否则返回 `false`。 如果 `o` 不是对象，它会抛出 TypeError。 与`Object.isExtensible()` 类似，但在传递一个不是对象的参数时只是返回 `false`。
:::

**`Reflect.ownKeys(o)`**
This function returns an array of the names of the properties of the object `o` or throws a TypeError if o is not an object. The names in the returned array will be strings and/or symbols. Calling this function is similar to calling `Object.getOwnPropertyNames()` and `Object.getOwnPropertySymbols()` and combining their results.

::: tip 翻译
此函数返回对象 `o` 的属性名称数组，如果 `o` 不是对象，则抛出 TypeError。 返回数组中的名称将是字符串或符号。 调用此函数类似于调用 `Object.getOwnPropertyNames()` 和 `Object.getOwnPropertySymbols()` 并将其结果组合起来。
:::

**`Reflect.preventExtensions(o)`**
This function sets the _extensible_ attribute (§14.2) of the object o to `false` and returns `true` to indicate success. It throws a TypeError if o is not an object. `Object.preventExtensions()` has the same effect but returns o instead of `true` and does not throw TypeError for nonobject arguments.

::: tip 翻译
该函数将对象 `o` 的 _extensible_ 属性（第 14.2 节）设置为 `false` 并返回 `true` 以指示成功。 如果 `o` 不是对象，它会抛出 TypeError。 `Object.preventExtensions()` 具有相同的效果，但返回 `o` 而不是 `true`，并且不会为非对象参数抛出 TypeError。
:::

**`Reflect.set(o, name, value, receiver)`**
This function sets the property with the specified `name` of the object `o` to the specified `value`. It returns `true` on success and `false` on failure (which can happen if the property is read-only). It throws TypeError if `o` is not an object. If the specified property is an accessor property with a `setter` function, and if the optional `receiver` argument is passed, then the `setter` will be invoked as a method of `receiver` instead of being invoked as a method of `o`. Calling this function is usually the same as evaluating `o[name] = value`.

::: tip 翻译
该函数将对象 `o` 的指定 `name` 属性设置为指定的 `value`。 成功时返回 `true`，失败时返回 `false`（如果属性是只读的，则可能会发生这种情况）。 如果 `o` 不是一个对象，它会抛出 TypeError。 如果指定的属性是具有 `setter` 函数的访问器属性，并且传递了可选的 `receiver` 参数，则 `setter` 将作为 `receiver` 的方法调用，而不是作为 `o` 的方法调用。 调用此函数通常与评估 `o[name] = value` 相同。
:::

**`Reflect.setPrototypeOf(o, p)`**
This function sets the prototype of the object `o` to `p`, returning `true` on success and `false` on failure (which can occur if `o` is not extensible or if the operation would cause a circular prototype chain). It throws a TypeError if `o` is not an object or if `p` is neither an object nor `null`. `Object.setPrototypeOf()` is similar, but returns `o` on success and throws TypeError on failure. Remember that calling either of these functions is likely to make your code slower by disrupting JavaScript interpreter optimizations.

::: tip 翻译
该函数将对象 `o` 的原型设置为 `p`，成功时返回 `true`，失败时返回 `false`（如果 `o` 不可扩展或操作会导致循环原型链，则可能会发生这种情况） 。 如果`o` 不是对象或者 `p` 既不是对象也不是 `null`，则会抛出 TypeError。 `Object.setPrototypeOf()` 类似，但成功时返回 `o`，失败时抛出 TypeError。 请记住，调用这些函数中的任何一个都可能会破坏 JavaScript 解释器优化，从而使代码变慢。
:::

## Proxy 对象

The Proxy class, available in ES6 and later, is JavaScript’s most powerful metaprogramming feature. It allows us to write code that alters the fundamental behavior of JavaScript objects. The Reflect API described in §14.6 is a set of functions that gives us direct access to a set of fundamental operations on JavaScript objects. What the Proxy class does is allows us a way to implement those fundamental operations ourselves and create objects that behave in ways that are not possible for ordinary objects.

::: tip 翻译
ES6 及更高版本中提供的 Proxy 类是 JavaScript 最强大的元编程功能。 它允许我们编写改变 JavaScript 对象基本行为的代码。 第 14.6 节中描述的 Reflect API 是一组函数，使我们能够直接访问 JavaScript 对象的一组基本操作。 Proxy 类的作用是让我们能够自己实现这些基本操作，并创建具有普通对象无法实现的行为方式的对象。
:::

When we create a Proxy object, we specify two other objects, the target object and the handlers object:

::: tip 翻译
当我们创建 Proxy 对象时，我们指定了另外两个对象，目标对象和处理程序对象：
:::

```js
let proxy = new Proxy(target, handlers);
```

The resulting Proxy object has no state or behavior of its own. Whenever you perform an operation on it (read a property, write a property, define a new property, look up the prototype, invoke it as a function), it dispatches those operations to the handlers object or to the target object.

::: tip 翻译
生成的 Proxy 对象没有自己的状态或行为。 每当您对其执行操作（读取属性、写入属性、定义新属性、查找原型、将其作为函数调用）时，它都会将这些操作分派到处理程序对象或目标对象。
:::

The operations supported by Proxy objects are the same as those defined by the Reflect API. Suppose that p is a Proxy object and you write `delete p.x`. The `Reflect.deleteProperty()` function has the same behavior as the `delete` operator. And when you use the `delete` operator to delete a property of a Proxy object, it looks for a `deleteProperty()` method on the handlers object. If such a method exists, it invokes it. And if no such method exists, then the Proxy object performs the property deletion on the target object instead.

::: tip 翻译
Proxy 对象支持的操作与 Reflect API 定义的操作相同。 假设 `p` 是一个 Proxy 对象，并且您编写 `delete p.x`。 `Reflect.deleteProperty()` 函数与 `delete` 运算符具有相同的行为。 当您使用 `delete` 运算符删除 Proxy 对象的属性时，它会在处理程序对象上查找 `deleteProperty()` 方法。 如果存在这样的方法，则会调用它。 如果不存在这样的方法，则 Proxy 对象将对目标对象执行属性删除。
:::

Proxies work this way for all of the fundamental operations: if an appropriate method exists on the handlers object, it invokes that method to perform the operation. (The method names and signatures are the same as those of the Reflect functions covered in §14.6.) And if that method does not exist on the handlers object, then the Proxy performs the fundamental operation on the target object. This means that a Proxy can obtain its behavior from the target object or from the handlers object. If the handlers object is empty, then the proxy is essentially a transparent wrapper around the target object:

::: tip 翻译
代理对于所有基本操作都以这种方式工作：如果处理程序对象上存在适当的方法，它将调用该方法来执行操作。 （方法名称和签名与第 14.6 节中介绍的 Reflect 函数的名称和签名相同。）如果处理程序对象上不存在该方法，则代理将对目标对象执行基本操作。 这意味着代理可以从目标对象或处理程序对象获取其行为。 如果处理程序对象为空，则代理本质上是目标对象的透明包装器：
:::

```js
let t = { x: 1, y: 2 };
let p = new Proxy(t, {});
p.x; // => 1
delete p.y; // => true: delete property y of the proxy
t.y; // => undefined: this deletes it in the target, too
p.z = 3; // Defining a new property on the proxy
t.z; // => 3: defines the property on the target
```

This kind of transparent wrapper proxy is essentially equivalent to the underlying target object, which means that there really isn’t a reason to use it instead of the wrapped object. Transparent wrappers can be useful, however, when created as “revocable proxies.” Instead of creating a Proxy with the `Proxy()` constructor, you can use the `Proxy.revocable()` factory function. This function returns an object that includes a Proxy object and also a `revoke()` function. Once you call the `revoke()` function, the proxy immediately stops working:

::: tip 翻译
这种透明包装代理本质上等同于底层目标对象，这意味着确实没有理由使用它来代替包装对象。 然而，当创建为“可撤销代理”时，透明包装器可能会很有用。 您可以使用 `Proxy.revocable()` 工厂函数，而不是使用 `Proxy()` 构造函数创建代理。 该函数返回一个对象，其中包含一个 Proxy 对象和一个 `revoke()` 函数。 一旦调用 `revoke()` 函数，代理就会立即停止工作：
:::

```js
function accessTheDatabase() {
  /* implementation omitted */ return 42;
}
let { proxy, revoke } = Proxy.revocable(accessTheDatabase, {});

proxy(); // => 42: The proxy gives access to the underlying target function
revoke(); // But that access can be turned off whenever we want
proxy(); // !TypeError: we can no longer call this function
```

Note that in addition to demonstrating revocable proxies, the preceding code also demonstrates that proxies can work with target functions as well as target objects. But the main point here is that revocable proxies are a building block for a kind of code isolation, and you might use them when dealing with untrusted third-party libraries, for example. If you have to pass a function to a library that you don’t control, you can pass a revocable proxy instead and then revoke the proxy when you are finished with the library. This prevents the library from keeping a reference to your function and calling it at unexpected times. This kind of defensive programming is not typical in JavaScript programs, but the Proxy class at least makes it possible.

::: tip 翻译
请注意，除了演示可撤销代理之外，前面的代码还演示了代理可以与目标函数和目标对象一样使用。 但这里的要点是，可撤销代理是一种代码隔离的构建块，例如，您可以在处理不受信任的第三方库时使用它们。 如果您必须将函数传递给您无法控制的库，则可以传递可撤销代理，然后在使用完该库后撤销该代理。 这可以防止库保留对您的函数的引用并在意外的时间调用它。 这种防御性编程在 JavaScript 程序中并不常见，但 Proxy 类至少使之成为可能。
:::

If we pass a non-empty handlers object to the `Proxy()` constructor, then we are no longer defining a transparent wrapper object and are instead implementing custom behavior for our proxy. With the right set of handlers, the underlying target object essentially becomes irrelevant.

::: tip 翻译
如果我们将非空处理程序对象传递给 `Proxy()` 构造函数，那么我们不再定义透明包装对象，而是为代理实现自定义行为。 有了正确的处理程序集，底层目标对象基本上就变得无关紧要了。
:::

In the following code, for example, is how we could implement an object that appears to have an infinite number of read-only properties, where the value of each property is the same as the name of the property:

::: tip 翻译
例如，在下面的代码中，是我们如何实现一个看起来具有无限数量只读属性的对象，其中每个属性的值与属性的名称相同：
:::

```js
// We use Proxy to create an object that appears to have every
// possible property, with the value of each property equal to its name
let identity = new Proxy(
  {},
  {
    // Every property has its own name as its value
    get(o, name, target) {
      return name;
    },
    // Every property name is defined
    has(o, name) {
      return true;
    },
    // There are too many properties to enumerate, so we just throw
    ownKeys(o) {
      throw new RangeError("Infinite number of properties");
    },
    // All properties exist and are not writable, configurable or enumerable.
    getOwnPropertyDescriptor(o, name) {
      return {
        value: name,
        enumerable: false,
        writable: false,
        configurable: false,
      };
    },
    // All properties are read-only so they can't be set
    set(o, name, value, target) {
      return false;
    },
    // All properties are non-configurable, so they can't be deleted
    deleteProperty(o, name) {
      return false;
    },
    // All properties exist and are non-configurable so we can't define more
    defineProperty(o, name, desc) {
      return false;
    },
    // In effect, this means that the object is not extensible
    isExtensible(o) {
      return false;
    },
    // All properties are already defined on this object, so it couldn't
    // inherit anything even if it did have a prototype object.
    getPrototypeOf(o) {
      return null;
    },
    // The object is not extensible, so we can't change the prototype
    setPrototypeOf(o, proto) {
      return false;
    },
  }
);

identity.x; // => "x"
identity.toString; // => "toString"
identity[0]; // => "0"
identity.x = 1; // Setting properties has no effect
identity.x; // => "x"
delete identity.x; // => false: can't delete properties either
identity.x; // => "x"
Object.keys(identity); // !RangeError: can't list all the keys
for (let p of identity); // !RangeError
```

Proxy objects can derive their behavior from the target object and from the handlers object, and the examples we have seen so far have used one object or the other. But it is typically more useful to define proxies that use both objects.

::: tip 翻译
代理对象可以从目标对象和处理程序对象派生其行为，到目前为止我们看到的示例使用了其中一个对象。 但定义使用这两个对象的代理通常更有用。
:::

The following code, for example, uses Proxy to create a read-only wrapper for a target object. When code tries to read values from the object, those reads are forwarded to the target object normally. But if any code tries to modify the object or its properties, methods of the handler object throw a TypeError. A proxy like this might be helpful for writing tests: suppose you’ve written a function that takes an object argument and want to ensure that your function does not make any attempt to modify the input argument. If your test passes in a read-only wrapper object, then any writes will throw exceptions that cause the test to fail:

::: tip 翻译
例如，以下代码使用 Proxy 为目标对象创建只读包装器。 当代码尝试从对象读取值时，这些读取通常会转发到目标对象。 但是，如果任何代码尝试修改该对象或其属性，则处理程序对象的方法会抛出 TypeError。 像这样的代理可能有助于编写测试：假设您编写了一个接受对象参数的函数，并且希望确保您的函数不会尝试修改输入参数。 如果您的测试传入只读包装对象，则任何写入都会引发导致测试失败的异常：
:::

```js
function readOnlyProxy(o) {
  function readonly() {
    throw new TypeError("Readonly");
  }
  return new Proxy(o, {
    set: readonly,
    defineProperty: readonly,
    deleteProperty: readonly,
    setPrototypeOf: readonly,
  });
}

let o = { x: 1, y: 2 }; // Normal writable object
let p = readOnlyProxy(o); // Readonly version of it
p.x; // => 1: reading properties works
p.x = 2; // !TypeError: can't change properties
delete p.y; // !TypeError: can't delete properties
p.z = 3; // !TypeError: can't add properties
p.__proto__ = {}; // !TypeError: can't change the prototype
```

Another technique when writing proxies is to define handler methods that intercept operations on an object but still delegate the operations to the target object. The functions of the Reflect API (§14.6) have exactly the same signatures as the handler methods, so they make it easy to do that kind of delegation.

::: tip 翻译
编写代理时的另一种技术是定义处理程序方法，该方法拦截对象上的操作，但仍将操作委托给目标对象。 Reflect API（第 14.6 节）的函数与处理程序方法具有完全相同的签名，因此它们可以轻松执行此类委托。
:::

Here, for example, is a proxy that delegates all operations to the target object but uses handler methods to log the operations:

::: tip 翻译
例如，这里是一个代理，它将所有操作委托给目标对象，但使用处理程序方法来记录操作：
:::

```js
/**
 * Return a Proxy object that wraps o, delegating all operations to
 * that object after logging each operation. objname is a string that
 * will appear in the log messages to identify the object. If o has own
 * properties whose values are objects or functions, then if you query
 * the value of those properties, you'll get a loggingProxy back, so that
 * logging behavior of this proxy is "contagious"
 */
function loggingProxy(o, objname) {
  // Define handlers for our logging Proxy object.
  // Each handler logs a message and then delegates to the target object.
  const handlers = {
    // This handler is a special case because for own properties
    // whose value is an object or function, it returns a proxy rather
    // than returning the value itself.
    get(target, property, receiver) {
      // Log the get operation
      console.log(`Handler get(${objname}, ${property.toString()})`);

      // Use the Reflect API to get the property value
      let value = Reflect.get(target, property, receiver);

      // If the property is an own property of the target and
      // the value is an object or function then return a Proxy for it.
      if (
        Reflect.ownKeys(target).includes(property) &&
        (typeof value === "object" || typeof value === "function")
      ) {
        return loggingProxy(value, `${objname}.${property.toString()}`);
      }

      // Otherwise return the value unmodified.
      return value;
    },

    // There is nothing special about the following three methods:
    // they log the operation and delegate to the target object.
    // They are a special case simply so we can avoid logging the
    // receiver object which can cause infinite recursion.
    set(target, prop, value, receiver) {
      console.log(`Handler set(${objname},${prop.toString()},${value})`);
      return Reflect.set(target, prop, value, receiver);
    },
    apply(target, receiver, args) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.apply(target, receiver, args);
    },
    construct(target, args, receiver) {
      console.log(`Handler ${objname}(${args})`);
      return Reflect.construct(target, args, receiver);
    },
  };

  // We can automatically generate the rest of the handlers.
  // Metaprogramming FTW!
  Reflect.ownKeys(Reflect).forEach((handlerName) => {
    if (!(handlerName in handlers)) {
      handlers[handlerName] = function (target, ...args) {
        // Log the operation
        console.log(`Handler ${handlerName}(${objname},${args})`);
        // Delegate the operation
        return Reflect[handlerName](target, ...args);
      };
    }
  });

  // Return a proxy for the object using these logging handlers
  return new Proxy(o, handlers);
}
```

The `loggingProxy()` function defined earlier creates proxies that log all of the ways they are used. If you are trying to understand how an undocumented function uses the objects you pass it, using a logging proxy can help.

::: tip 翻译
前面定义的 `loggingProxy()` 函数创建记录其所有使用方式的代理。 如果您试图了解未记录的函数如何使用您传递给它的对象，那么使用日志记录代理会有所帮助。
:::

Consider the following examples, which result in some genuine insights about array iteration:

::: tip 翻译
考虑以下示例，这些示例可以得出有关数组迭代的一些真正见解：
:::

```js
// Define an array of data and an object with a function property
let data = [10, 20];
let methods = { square: (x) => x * x };

// Create logging proxies for the array and the object
let proxyData = loggingProxy(data, "data");
let proxyMethods = loggingProxy(methods, "methods");

// Suppose we want to understand how the Array.map() method works
data.map(methods.square); // => [100, 400]

// First, let's try it with a logging Proxy array
proxyData.map(methods.square); // => [100, 400]
// It produces this output:
// Handler get(data,map)
// Handler get(data,length)
// Handler get(data,constructor)
// Handler has(data,0)
// Handler get(data,0)
// Handler has(data,1)
// Handler get(data,1)

// Now lets try with a proxy methods object
data.map(proxyMethods.square); // => [100, 400]
// Log output:
// Handler get(methods,square)
// Handler methods.square(10,0,10,20)
// Handler methods.square(20,1,10,20)

// Finally, let's use a logging proxy to learn about the iteration protocol
for (let x of proxyData) console.log("Datum", x);
// Log out:
// Handler get(data,Symbol(Symbol.iterator))
// Handler get(data,length)
// Handler get(data,0)
// Datum 10
// Handler get(data,length)
// Handler get(data,1)
// Datum 20
// Handler get(data,length)
```

From the first chunk of logging output, we learn that the `Array.map()` method explicitly checks for the existence of each array element (causing the `has()` handler to be invoked) before actually reading the element value (which triggers the `get()` handler). This is presumably so that it can distinguish nonexistent array elements from elements that exist but are `undefined`.

::: tip 翻译
从日志输出的第一块中，我们了解到 `Array.map()` 方法在实际读取元素值（这触发 `get()` 处理程序）之前显式检查每个数组元素是否存在（导致调用 `has()` 处理程序）。 这大概是为了它可以区分不存在的数组元素和存在但是`undefined`的元素。
:::

The second chunk of logging output might remind us that the function we pass to `Array.map()` is invoked with three arguments: the element’s value, the element’s index, and the array itself. (There is a problem in our logging output: the `Array.toString()` method does not include square brackets in its output, and the log messages would be clearer if they were included in the argument list `(10,0, [10,20])`.)

::: tip 翻译
日志输出的第二块可能会提醒我们，传递给 `Array.map()` 的函数是用三个参数调用的：元素的值、元素的索引和数组本身。（我们的日志输出存在一个问题：`Array.toString()`方法的输出中不包含方括号，如果将它们包含在参数列表中`(10,0, [ 10,20])` 这样会更清晰.)
:::

The third chunk of logging output shows us that the `for/of` loop works by looking for a method with symbolic name `[Symbol.iterator]`. It also demonstrates that the Array class’s implementation of this iterator method is careful to check the array length at every iteration and does not assume that the array length remains constant during the iteration.

::: tip 翻译
日志输出的第三块向我们展示了 `for/of` 循环通过查找具有符号名称 `[Symbol.iterator]` 的方法来工作。 它还表明 Array 类对此迭代器方法的实现，会在每次迭代时仔细检查数组长度，并且不会假设数组长度在迭代期间保持不变。
:::

### Proxy 不变量

The `readOnlyProxy()` function defined earlier creates Proxy objects that are effectively frozen: any attempt to alter a property value or property attribute or to add or remove properties will throw an exception. But as long as the target object is not frozen, we’ll find that if we can query the proxy with `Reflect.isExtensible()` and `Reflect.getOwnPropertyDescriptor()`, and it will tell us that we should be able to set, add, and delete properties. So `readOnlyProxy()` creates objects in an inconsistent state. We could fix this by adding `isExtensible()` and `getOwnPropertyDescriptor()` handlers, or we can just live with this kind of minor inconsistency.

::: tip 翻译
前面定义的 `readOnlyProxy()` 函数创建有效冻结的 Proxy 对象：任何更改属性值或属性属性或添加或删除属性的尝试都会引发异常。 但是只要目标对象没有被冻结，我们就会发现，如果我们可以使用 `Reflect.isExtensible()` 和 `Reflect.getOwnPropertyDescriptor()` 查询代理，它会告诉我们应该能够设置、添加和删除属性。 因此 `readOnlyProxy()` 创建的对象处于不一致的状态。 我们可以通过添加 `isExtensible()` 和 `getOwnPropertyDescriptor()` 处理程序来解决这个问题，或者我们可以忍受这种轻微的不一致。
:::

The Proxy handler API allows us to define objects with major inconsistencies, however, and in this case, the Proxy class itself will prevent us from creating Proxy objects that are inconsistent in a bad way. At the start of this section, we described proxies as objects with no behavior of their own because they simply forward all operations to the handlers object and the target object. But this is not entirely true: after forwarding an operation, the Proxy class performs some sanity checks on the result to ensure important JavaScript invariants are not being violated. If it detects a violation, the proxy will throw a TypeError instead of letting the operation proceed.

::: tip 翻译
Proxy 处理程序 API 允许我们定义存在严重不一致的对象，但是，在这种情况下，Proxy 类本身将阻止我们创建不一致的 Proxy 对象。 在本节的开头，我们将代理描述为没有自己行为的对象，因为它们只是将所有操作转发到处理程序对象和目标对象。 但这并不完全正确：转发操作后，Proxy 类会对结果执行一些健全性检查，以确保不违反重要的 JavaScript 不变量。 如果检测到违规，代理将抛出 TypeError 而不是让操作继续进行。
:::

As an example, if you create a proxy for a non-extensible object, the proxy will throw a TypeError if the `isExtensible()` handler ever returns true:

::: tip 翻译
举个例子，如果你为一个不可扩展的对象创建一个代理，如果 `isExtensible()` 处理程序返回 true，代理将抛出一个 TypeError：
:::

```js
let target = Object.preventExtensions({});
let proxy = new Proxy(target, {
  isExtensible() {
    return true;
  },
});
Reflect.isExtensible(proxy); // !TypeError: invariant violation
```

Relatedly, proxy objects for non-extensible targets may not have a `getPrototypeOf()` handler that returns anything other than the real prototype object of the target. Also, if the target object has nonwritable, nonconfigurable properties, then the Proxy class will throw a TypeError if the `get()` handler returns anything other than the actual value:

::: tip 翻译
相关地，不可扩展目标的代理对象可能没有 `getPrototypeOf()` 处理程序，该处理程序返回除目标的真实原型对象之外的任何内容。 另外，如果目标对象具有不可写、不可配置的属性，那么如果 `get()` 处理程序返回实际值以外的任何内容，则 Proxy 类将抛出 TypeError：
:::

```js
let target = Object.freeze({ x: 1 });
let proxy = new Proxy(target, {
  get() {
    return 99;
  },
});
proxy.x; // !TypeError: value returned by get() doesn't match target
```

Proxy enforces a number of additional invariants, almost all of them having to do with non-extensible target objects and nonconfigurable properties on the target object.

::: tip 翻译
代理强制执行许多附加的不变量，几乎所有这些都与不可扩展的目标对象和目标对象上的不可配置的属性有关。
:::

## 总结

In this chapter, you have learned:

- JavaScript objects have an _extensible_ attribute and object properties have _writable_, _enumerable_, and _configurable_ attributes, as well as a value and a getter and/or setter attribute. You can use these attributes to “lock down” your objects in various ways, including creating “sealed” and “frozen” objects.
- JavaScript defines functions that allow you to traverse the prototype chain of an object and even to change the prototype of an object (though doing this can make your code slower).
- The properties of the `Symbol` object have values that are “well-known Symbols,” which you can use as property or method names for the objects and classes that you define. Doing so allows you to control how your object interacts with JavaScript language features and with the core library. For example, well-known Symbols allow you to make your classes iterable and control the string that is displayed when an instance is passed to `Object.prototype.toString()`. Prior to ES6, this kind of customization was available only to the native classes that were built in to an implementation.
- Tagged template literals are a function invocation syntax, and defining a new tag function is kind of like adding a new literal syntax to the language. Defining a tag function that parses its template string argument allows you to embed DSLs within JavaScript code. Tag functions also provide access to a raw, unescaped form of string literals where backslashes have no special meaning.
- The Proxy class and the related Reflect API allow low-level control over the fundamental behaviors of JavaScript objects. Proxy objects can be used as optionally revocable wrappers to improve code encapsulation, and they can also be used to implement nonstandard object behaviors (like some of the special case APIs defined by early web browsers).

::: tip 翻译
在本章中，您学习了：

- JavaScript 对象具有 _extensible_ 属性，对象属性具有 _writable_、_enumerable_ 和 _configurable_ 属性，以及值和 `getter` 和/或 `setter` 属性。 您可以使用这些属性以各种方式“锁定”对象，包括创建“密封”和“冻结”对象。
- JavaScript 定义的函数允许您遍历对象的原型链，甚至可以更改对象的原型（尽管这样做会使您的代码变慢）。
- `Symbol` 对象的属性具有“众所周知的符号”值，您可以将其用作您定义的对象和类的属性或方法名称。 这样做可以让您控制对象如何与 JavaScript 语言功能和核心库交互。 例如，众所周知的符号允许您使您的类可迭代并控制将实例传递给 `Object.prototype.toString()` 时显示的字符串。 在 ES6 之前，这种自定义仅适用于内置于实现中的本机类。
- 带标签的模板文字是一种函数调用语法，定义新的标签函数有点像向语言添加新的文字语法。 定义解析其模板字符串参数的标记函数允许您将 DSL 嵌入 JavaScript 代码中。 标签函数还提供对原始、未转义形式的字符串文字的访问，其中反斜杠没有特殊含义。
- Proxy 类和相关的 Reflect API 允许对 JavaScript 对象的基本行为进行低级控制。 代理对象可以用作可选的可撤销包装器以改进代码封装，它们还可以用于实现非标准对象行为（如早期 Web 浏览器定义的一些特殊情况 API）。
  :::
