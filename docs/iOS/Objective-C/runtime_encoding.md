# 类型编码

为了帮助运行时系统，编译器将每个方法的返回类型和参数类型编码为字符串，并将字符串与方法选择器关联起来。它使用的编码方案在其他上下文中也很有用，因此可以通过 `@encode()` 编译器指令公开使用。当给定类型规范时，`@encode()` 返回对该类型进行编码的字符串。类型可以是基本类型，例如 `int`、指针、带标记的结构或联合，或者类名——事实上，任何类型都可以用作 C `sizeof()` 操作符的实参。

```c
char *buf1 = @encode(int **);
char *buf2 = @encode(struct key);
char *buf3 = @encode(Rectangle);
```

下表列出了类型代码。请注意，其中许多代码与您为归档或分发目的而对对象进行编码时使用的代码重叠。然而，这里列出的一些代码在编写编码器时不能使用，还有一些代码在编写编码器时可能希望使用，但这些代码不是由 `@encode()` 生成的。(请参阅基础框架参考中的 `NSCoder` 类规范以获得更多关于为存档或分发编码对象的信息。)

| Code           | Meaning                                                                       |
| -------------- | ----------------------------------------------------------------------------- |
| c              | A char                                                                        |
| i              | An int                                                                        |
| s              | A short                                                                       |
| l              | A long                                                                        |
| q              | A long long                                                                   |
| c              | An unsigned char                                                              |
| I              | An unsigned int                                                               |
| S              | An unsigned short                                                             |
| L              | An unsigned long                                                              |
| Q              | An unsigned long long                                                         |
| f              | A float                                                                       |
| d              | A double                                                                      |
| B              | A C++ bool or a C99 \_Bool                                                    |
| v              | A void                                                                        |
| \*             | A character string (char \*)                                                  |
| @              | An object (whether statically typed or typed id)                              |
| #              | A class object (Class)                                                        |
| :              | A method selector (SEL)                                                       |
| [arrar type]   | An array                                                                      |
| {name=type...} | A structure                                                                   |
| (name=type...) | A union                                                                       |
| bnum           | A bit field of num bits                                                       |
| ^type          | A pointer to type                                                             |
| ?              | An unknown type (among other things, this code is used for function pointers) |

:::tip
`Objective-C` 不支持 `long double` 类型。`@encode(long double)`返回 `d`，与 `double` 的编码方式相同。
:::

数组的类型代码被括在方括号内;数组中的元素数目是紧接在左括号之后、数组类型之前指定的。例如，一个包含 12 个浮点数指针的数组将被编码为:

```objc
[12^f]
```

结构体在大括号中指定，联合体在圆括号中指定。首先列出结构标记，然后是一个等号和按顺序列出的结构字段的代码。例如，结构体

```objc
typedef struct example {
    id   anObject;
    char *aString;
    int  anInt;
} Example;
```

将被编码成这样:

```objc
{example=@*i}
```

无论将定义的类型名称(`Example`)还是结构标记(`example`)传递给 `@encode()`，编码结果都是一样的。结构指针的编码携带了相同数量的关于结构字段的信息:

```objc
^{example=@*i}
```

然而，另一个间接层删除了内部类型规范:

```objc
^^{example}
```

对象被当作结构来对待。例如，将 `NSObject` 类名传递给 `@encode()` 会产生以下编码:

```objc
{NSObject=#}
```

`NSObject` 类只声明了一个 `class` 类型的实例变量 `isa` 。

请注意，尽管 `@encode()` 指令不返回它们，但当类型限定符用于在协议中声明方法时，运行时系统会使用表 6-2 中列出的额外编码。

表 6-2

| Code | Meaning |
| ---- | ------- |
| r    | const   |
| n    | in      |
| N    | inout   |
| o    | out     |
| O    | bycopy  |
| R    | byref   |
| V    | oneway  |

---

引用: [Type Encodings](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtTypeEncodings.html#//apple_ref/doc/uid/TP40008048-CH100-SW1)
