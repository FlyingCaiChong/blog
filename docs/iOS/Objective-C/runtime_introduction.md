# 介绍

`Objective-C`语言尽可能地将编译时间和链接时间推迟到运行时。只要有可能，它就会动态地做事情。这意味着该语言不仅需要一个编译器，还需要一个运行时系统来执行已编译的代码。运行时系统是`Objective-C`语言的一种操作系统;它使语言起作用。

本文介绍了`NSObject`类以及`Objective-C`程序如何与运行时系统交互。特别是，它检查了在运行时动态加载新类和将消息转发给其他对象的范例。它还提供了关于如何在程序运行时查找对象信息的信息。

您应该阅读本文以了解 `Objective-C` 运行时系统是如何工作的，以及如何利用它。但是，通常情况下，您应该没有理由需要了解和理解这些材料来编写 Cocoa 应用程序。

## 本文的组织

- [运行时版本和平台](./runtime_version.md)
- [与运行时交互](./runtime_interact.md)
- [消息传递](./runtime_message.md)
- [动态方法解析](./runtime_dynamic.md)
- [消息转发](./runtime_forward.md)
- [类型编码](./runtime_encoding.md)
- [声明属性](./runtime_property.md)

---

另请参阅

- [Objective-C 运行时参考](https://developer.apple.com/documentation/objectivec/objective-c_runtime)描述`Objective-C`运行时支持库的数据结构和函数。你的程序可以使用这些接口与`Objective-C`运行时系统交互。例如，您可以添加类或方法，或者为加载的类获取所有类定义的列表。
- 用[Objective-C 编程](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210)描述了 Objective-C 语言。
- [Objective-C 发布说明](https://developer.apple.com/library/archive/releasenotes/Cocoa/RN-ObjectiveC/index.html#//apple_ref/doc/uid/TP40004309)描述了最近 OS X 版本中 Objective-C 运行时的一些变化。

---

引用: [Introduction](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008048-CH1-SW1)
