# 动态方法解析

本章描述了如何动态地提供一个方法的实现。

## 动态方法解析

在某些情况下，您可能希望动态地提供方法的实现。例如，`Objective-C` 声明的属性特性(参见 [Objective-C 编程语言](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP30001163)中的[声明属性](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocProperties.html#//apple_ref/doc/uid/TP30001163-CH17))包括 `@dynamic` 指令:

```objc
@dynamic propertyName;
```

它告诉编译器，与该属性相关联的方法将被动态提供。

您可以实现方法 `resolveInstanceMethod:` 和 `resolveClassMethod:` 来分别为实例和类方法动态地提供给定选择器的实现。

`Objective-C` 方法只是一个 `C` 函数，它至少有两个参数- `self` 和 `_cmd`。可以使用函数 `class_addMethod` 将函数作为方法添加到类中。因此，给定如下函数:

```objc
void dynamicMethodIMP(id self, SEL _cmd) {
    // implementation ....
}
```

你可以使用 `resolveInstanceMethod:` 动态地将它作为一个方法(称为 `resolveThisMethodDynamically` )添加到一个类中，就像这样:

```objc
@implementation MyClass
+ (BOOL)resolveInstanceMethod:(SEL)aSEL
{
    if (aSEL == @selector(resolveThisMethodDynamically)) {
          class_addMethod([self class], aSEL, (IMP) dynamicMethodIMP, "v@:");
          return YES;
    }
    return [super resolveInstanceMethod:aSEL];
}
@end
```

转发方法(如[消息转发](./runtime_forward.md)中所述)和动态方法解析在很大程度上是正交的。类有机会在转发机制生效之前动态解析方法。如果调用 `respondsToSelector:` 或 `instancesRespondToSelector:`，动态方法解析器将有机会首先为选择器提供一个 `IMP`。如果您实现了 `resolveInstanceMethod:` 但希望特定的选择器通过转发机制实际转发，那么您将对这些选择器返回 `NO`。

## 动态加载

`Objective-C` 程序可以在运行时加载和链接新的类和类别。新代码被合并到程序中，并与开始时加载的类和类别一样对待。

动态加载可以用来做很多不同的事情。例如，系统首选项应用程序中的各个模块是动态加载的。

在 `Cocoa` 环境中，动态加载通常用于定制应用程序。其他人可以编写你的程序在运行时加载的模块——就像 `Interface Builder` 加载自定义面板和 `OS X` 系统首选项应用程序加载自定义首选项模块一样。可加载模块扩展了应用程序的功能。他们以你允许但你无法预期或定义你自己的方式为它做出贡献。您提供框架，其他人提供代码。

虽然有一个运行时函数在 `Mach-O` 文件中执行动态加载 `Objective-C` 模块(`objc_loadModules`，定义在 `objc/objc-load.h`)， `Cocoa` 的 `NSBundle` 类为动态加载提供了一个明显更方便的接口——一个面向对象的和与相关服务集成的接口。关于 `NSBundle` 类及其使用的信息，请参阅基础框架参考中的 `NSBundle` 类规范。有关 `Mach-O` 文件的信息，请参阅 `OS X ABI Mach-O` 文件格式参考。

---

引用: [Dynamic Method Resolution](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtDynamicResolution.html#//apple_ref/doc/uid/TP40008048-CH102-SW1)
