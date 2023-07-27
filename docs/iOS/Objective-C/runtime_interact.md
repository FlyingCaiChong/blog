# 与运行时交互

`Objective-C` 程序在三个不同的层次上与运行时系统交互:

1. 通过 `Objective-C` 源代码;
2. 通过在基础框架的 `NSObject` 类中定义的方法;
3. 通过直接调用运行时函数。

## Objective-C 源代码

在大多数情况下，运行时系统在后台自动工作。你只需要编写和编译 `Objective-C` 源代码就可以使用它。

当编译包含 `Objective-C` 类和方法的代码时，编译器会创建实现语言动态特征的数据结构和函数调用。数据结构捕获类和类别定义以及协议声明中的信息;它们包括在 [Objective-C 编程语言](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP30001163)中[定义类](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocDefiningClasses.html#//apple_ref/doc/uid/TP30001163-CH12)和[协议](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocProtocols.html#//apple_ref/doc/uid/TP30001163-CH15)时讨论的类和协议对象，以及从源代码中提取的方法选择器、实例变量模板和其他信息。如[消息传递](./runtime_message.md)中所述，主体运行时函数是发送消息的函数。它由源代码消息表达式调用。

## NSObject 方法

`Cocoa` 中的大多数对象都是 `NSObject` 类的子类，因此大多数对象都继承了它定义的方法。(值得注意的例外是 `NSProxy` 类;更多信息请参见[消息转发](./runtime_forward.md)。)因此，它的方法建立了每个实例和每个类对象固有的行为。然而，在少数情况下，`NSObject` 类仅仅定义了一个模板，用于描述如何做某事;它本身并不提供所有必要的代码。

例如，`NSObject`类定义了一个 `description` 实例方法，该方法返回一个描述类内容的字符串。这主要用于调试- `GDB` `print-object` 命令打印从该方法返回的字符串。`NSObject` 对这个方法的实现不知道类包含什么，所以它返回一个包含对象名称和地址的字符串。`NSObject` 的子类可以实现这个方法来返回更多的细节。例如，基础类 `NSArray` 返回它所包含的对象的描述列表。

一些 `NSObject` 方法只是在运行时系统中查询信息。这些方法允许对象执行内省。这类方法的例子有 `class 方法`，它要求一个对象识别它的类;

- `isKindOfClass:` 和 `isMemberOfClass:`，它们测试对象在继承层次结构中的位置;
- `respondsToSelector:` 表示一个对象是否可以接受一个特定的消息;
- `constoprotocol:` 表示一个对象是否声明要实现特定协议中定义的方法;
- 以及 `methodForSelector:`，它提供了方法实现的地址。

像这样的方法赋予对象自我反省的能力。

## 运行时函数

运行时系统是一个动态共享库，它有一个公共接口，由位于 `/usr/include/objc` 目录下的头文件中的一组函数和数据结构组成. 其中许多函数允许你使用普通的 `C` 来复制编译器在你编写 `Objective-C` 代码时所做的事情。其他功能则是通过 `NSObject` 类的方法导出的功能的基础。这些功能使开发运行时系统的其他接口成为可能，并产生增强开发环境的工具;在 `Objective-C` 中编程时不需要它们。然而，在编写 `Objective-C` 程序时，一些运行时函数可能有时是有用的。所有这些函数都记录在 [Objective-C 运行时引用](https://developer.apple.com/documentation/objectivec/objective_c_runtime)中。

---

引用: [Interacting with the Runtime](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtInteracting.html#//apple_ref/doc/uid/TP40008048-CH103-SW1)
