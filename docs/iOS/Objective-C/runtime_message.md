# 消息传递

本章描述了如何将消息表达式转换为`objc_msgSend`函数调用，以及如何通过名称引用方法。然后，本文解释了如何利用`objc_msgSend`，以及如何(如果需要的话)规避动态绑定。

## objc_msgSend 函数

在 `Objective-C` 中，消息直到运行时才会绑定到方法实现。编译器转换消息表达式，

```objc
[receiver message]
```

转换成一个消息传递函数 `objc_msgSend` 的调用。这个函数将接收方和消息中提到的方法名称(即方法选择器)作为它的两个主要参数:

```objc
objc_msgSend(receiver, selector)
```

任何在消息中传递的参数也会被传递给 `objc_msgSend`:

```objc
objc_msgSend(receiver, selector, arg1, arg2, ...)
```

消息传递函数为动态绑定做所有必要的事情:

- 它首先查找选择器引用的过程(方法实现)。由于相同的方法可以通过不同的类来实现，因此它找到的精确过程取决于接收方的类。
- 然后调用该过程，将接收对象(指向其数据的指针)以及为该方法指定的任何参数传递给它。
- 最后，它将过程的返回值作为自己的返回值传递。

::: warning
编译器生成对消息传递函数的调用。您永远不应该在您编写的代码中直接调用它。
:::

消息传递的关键在于编译器为每个类和对象构建的结构。每个类结构都包含这两个基本元素:

1. 指向超类的指针。
2. 一个类分派表。这个表有一些条目，这些条目将方法选择器与它们标识的方法的类特定地址关联起来。`setOrigin::`方法的选择器与(实现的过程)`setOrigin::`的地址相关联 ， `display` 方法的选择器与 `display` 的地址相关联，等等。

当创建一个新对象时，为它分配内存，并初始化它的实例变量。在对象的变量中，首先是指向其类结构的指针。这个指针称为 `isa`，它允许对象访问它的类，并通过类访问它继承的所有类。

:::tip
虽然不是严格意义上的语言的一部分，但 `isa` 指针是对象与 `Objective-C` 运行时系统一起工作所必需的。对象需要在结构定义的任何字段中与结构对象 `objc_object`(定义在 `objc/objc.h` 中)“等价”。然而，您很少需要创建自己的根对象，而且从 `NSObject` 或 `NSProxy` 继承的对象自动具有 `isa` 变量。
:::

类和对象结构的这些元素如图 3-1 所示。

图 3-1
![Figure 3-1  Messaging Framework](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Art/messaging1.gif)

当消息被发送到一个对象时，消息传递函数跟随对象的 `isa` 指针指向类结构，在分派表中查找方法选择器。如果它不能在那里找到选择器，`objc_msgSend` 跟随指向超类的指针，并试图在它的分派表中找到选择器。连续的失败会导致 `objc_msgSend` 在到达 `NSObject` 类之前一直攀爬类层次结构。一旦定位到选择器，该函数将调用在表中输入的方法，并将接收对象的数据结构传递给它。

这是在运行时选择方法实现的方式—或者，用面向对象编程的行话来说，将方法动态地绑定到消息。

为了加快消息传递过程，运行时系统在使用方法时缓存它们的选择器和地址。每个类都有一个单独的缓存，它可以包含用于继承方法和类中定义的方法的选择器。在搜索分派表之前，消息传递例程首先检查接收对象的类的缓存(理论是使用过一次的方法可能会再次使用)。如果方法选择器在缓存中，则消息传递只比函数调用稍微慢一点。一旦一个程序运行了足够长的时间来“预热”它的缓存，它发送的几乎所有消息都会找到一个缓存的方法。当程序运行时，缓存动态增长以容纳新消息。

## 使用隐藏参数

当 `objc_msgSend` 找到实现方法的过程时，它调用该过程并将消息中的所有参数传递给它。它还向过程传递了两个隐藏参数:

1. 接收对象
2. 方法的选择器

这些参数为每个方法实现提供了关于调用它的消息表达式的两部分的显式信息。之所以说它们是“隐藏的”，是因为它们没有在定义方法的源代码中声明。在编译代码时，它们被插入到实现中。

虽然这些参数没有显式声明，但源代码仍然可以引用它们(就像它可以引用接收对象的实例变量一样)。方法将接收对象称为 `self`，并将它自己的选择器称为`_cmd`。在下面的例子中，`_cmd` 指向 `strange` 方法的选择器，`self` 指向接收到 `strange` 消息的对象。

```objc
- strange
{
    id  target = getTheReceiver();
    SEL method = getTheMethod();

    if ( target == self || method == _cmd )
        return nil;
    return [target performSelector:method];
}
```

`self 是两个参数中比较有用的一个。事实上，这是方法定义使用接收对象实例变量的方式。

## 获取方法地址

绕开动态绑定的唯一方法是获取方法的地址，然后像调用函数一样直接调用它。在某些罕见的情况下，这可能是合适的，例如某个特定方法将连续执行多次，并且您希望避免每次执行该方法时的消息传递开销。

使用在 `NSObject` 类 `methodForSelector:` 中定义的方法，您可以请求实现方法的过程的指针，然后使用该指针调用过程。`methodForSelector:` 返回的指针必须小心地转换为正确的函数类型。返回类型和参数类型都应该包含在强制转换中。

下面的例子展示了如何调用实现 `setfill:` 方法的过程:

```objc
void (*setter)(id, SEL, BOOL);
int i;

setter = (void (*)(id, SEL, BOOL))[target
    methodForSelector:@selector(setFilled:)];
for ( i = 0 ; i < 1000 ; i++ )
    setter(targetList[i], @selector(setFilled:), YES);
```

传递给过程的前两个参数是接收对象(`self`)和方法选择器(`_cmd`)。这些参数隐藏在方法语法中，但在作为函数调用方法时必须显式地显示。

使用 `methodForSelector:` 来绕过动态绑定可以节省消息传递所需的大部分时间。然而，只有在特定消息多次重复的情况下，节省才会显著，如上所示的 for 循环中所示。

注意 `methodForSelector:` 是由 `Cocoa` 运行时系统提供的;它不是 `Objective-C` 语言本身的特性。

---

引用: [Messaging](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtHowMessagingWorks.html#//apple_ref/doc/uid/TP40008048-CH104-SW1)
