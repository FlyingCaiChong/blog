# 运行时版本和平台

在不同的平台上有不同的 `Objective-C` 运行时版本。

## 传统版本和现代版本

`Objective-C` 运行时有两个版本——“现代”和“遗留”。现代版本是与 `Objective-C 2.0` 一起引入的，并包含了许多新特性。运行时的遗留版本的编程接口在 `Objective-C 1` 运行时参考中描述;现代版本运行时的编程接口在 [Objective-C 运行时参考](https://developer.apple.com/documentation/objectivec/objective-c_runtime)中描述。

最值得注意的新特性是现代运行时中的实例变量是“非脆弱的”:

- 在遗留运行时中，如果更改类中的实例变量的布局，则必须重新编译从该类继承的类。
- 在现代运行时中，如果更改类中实例变量的布局，则不必重新编译从该类继承的类。

此外，现代运行时支持对已声明的属性进行实例变量合成(参见 [Objective-C 编程语言](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP30001163)中[已声明的属性](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocProperties.html#//apple_ref/doc/uid/TP30001163-CH17))。

## 平台

iPhone 应用程序和 OS X v10.5 及以后版本上的 64 位程序使用运行时的现代版本。

其他程序(OS X 桌面上的 32 位程序)使用运行时的遗留版本。

---

引用: [Runtime Versions and Platforms](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtVersionsPlatforms.html#//apple_ref/doc/uid/TP40008048-CH106-SW1)
