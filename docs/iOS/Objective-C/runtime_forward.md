# 消息转发

将消息发送给不处理该消息的对象是错误的。但是，在宣布错误之前，运行时系统给接收对象第二次机会来处理消息。

## 转发

如果你发送一个消息给一个不处理该消息的对象，在宣布一个错误之前，运行时发送给该对象一个 `forwardInvocation:` 消息，带有一个 `NSInvocation` 对象作为它的唯一参数- `NSInvocation` 对象封装了原始消息和与它一起传递的参数。

您可以实现 `forwardInvocation:` 方法来为消息提供默认响应，或者以其他方式避免错误。顾名思义，`forwardInvocation:` 通常用于将消息转发给另一个对象。

为了了解转发的范围和意图，请想象以下场景:假设，首先，您正在设计一个可以响应名为 `negotiate` 的消息的对象，并且您希望它的响应包括另一种对象的响应。您可以通过将 `negotiate` 消息传递给您实现的 `negotiate` 方法体中的另一个对象来轻松实现这一点。

更进一步，假设你想让你的对象对 `negotiate` 消息的响应与在另一个类中实现的响应完全一致。实现这一点的一种方法是让您的类从其他类继承方法。然而，以这种方式安排事情可能是不可能的。你的类和实现 `negotiate` 的类在继承层次结构的不同分支中可能有很好的理由。

即使你的类不能继承 `negotiate` 方法，你仍然可以通过实现该方法的一个版本来“借用”它，该版本只是将消息传递给另一个类的实例:

```objc
- (id)negotiate
{
    if ( [someOtherObject respondsTo:@selector(negotiate)] )
        return [someOtherObject negotiate];
    return self;
}
```

这种方法可能会有点麻烦，特别是当您希望您的对象将大量消息传递给另一个对象时。您必须实现一个方法来覆盖您想从其他类借用的每个方法。此外，在编写代码时，您不知道您可能想要转发的全部消息集，这将是不可能处理的情况。该集合可能依赖于运行时的事件，并且它可能会随着将来新方法和类的实现而改变。

`forwardInvocation:` 消息提供了第二次机会, 为这个问题提供了一个不那么特别的解决方案，而且是动态的而不是静态的。它是这样工作的:当一个对象因为在消息中没有匹配选择器的方法而不能响应消息时，运行时系统通过发送 `forwardInvocation:` 消息通知对象。每个对象从 `NSObject` 类继承一个`forwardInvocation:` 方法。然而，`NSObject` 版本的方法只是调用了 `doesNotRecognizeSelector:`。通过重写 `NSObject` 的版本并实现你自己的版本，你可以利用 `forwardInvocation:` 消息提供的将消息转发给其他对象的机会。

要转发一个消息，`forwardInvocation:` 方法需要做的就是:

1. 确定消息应该发送到哪里.
2. 将它与它的原始参数一起发送到那里。

该消息可以通过 `invokeWithTarget:` 方法发送:

```objc
- (void)forwardInvocation:(NSInvocation *)anInvocation
{
    if ([someOtherObject respondsToSelector:
            [anInvocation selector]])
        [anInvocation invokeWithTarget:someOtherObject];
    else
        [super forwardInvocation:anInvocation];
}
```

被转发的消息的返回值将返回给原始发送者。所有类型的返回值都可以传递给发送方，包括 id、结构和双精度浮点数。

`forwardInvocation:` 方法可以充当未识别消息的分发中心，将它们分发给不同的接收者。或者它可以是一个中转站，将所有消息发送到同一个目的地。它可以将一条消息翻译成另一条消息，或者简单地“吞下”一些消息，这样就没有响应和错误。`forwardInvocation:` 方法还可以将几个消息合并到一个响应中。`forwardInvocation:` 做什么取决于实现者。然而，它为在转发链中链接对象提供了机会，为程序设计提供了可能性。

:::tip
`forwardInvocation:` 方法只有在消息不调用名义接收方中的现有方法的情况下才处理消息。例如，如果您希望您的对象将 `negotiate` 消息转发给另一个对象，那么它就不能有自己的 `negotiate` 方法。如果是，消息将永远不会到达 `forwardInvocation:`。
:::

有关转发和调用的更多信息，请参见《基础框架参考》中的 `NSInvocation` 类规范。

## 转发和多重继承

转发模拟继承，可以将多重继承的一些效果借给 `Objective-C` 程序。如图 5-1 所示，通过转发来响应消息的对象似乎借用或“继承”了另一个类中定义的方法实现。

如图 5-1
![Forwarding](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Art/forwarding.gif)

在这个示例中，`Warrior` 类的一个实例将 `negotiate` 消息转发给 `Diplomat` 类的一个实例。`Warrior` 会表现得像 `Diplomat` 一样`negotiate`。它似乎会响应 `negotiate`的消息，而且在所有实际目的中，它确实会响应(尽管它实际上是一个`Diplomat`在做这项工作)。

因此，转发消息的对象“继承”了继承层次结构的两个分支的方法——它自己的分支和响应消息的对象的分支。在上面的例子中，`Warrior` 类似乎既继承了 `Diplomat`类，也继承了自己的超类。

转发提供了您通常希望从多重继承中获得的大多数特性。然而，两者之间有一个重要的区别:多重继承在单个对象中组合了不同的功能。它倾向于大的，多面的物体。另一方面，转发为不同的对象分配单独的职责。它将问题分解为更小的对象，但以一种对消息发送者透明的方式关联这些对象。

## 代理对象

转发不仅模仿了多重继承，它还使得开发轻量级对象成为可能，这些对象代表或“覆盖”更大的对象。代理项代表另一个对象，并将消息传递给它。

[Objective-C 编程语言](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP30001163)中的“远程消息传递”中讨论的代理就是这样一个代理。代理负责将消息转发到远程接收者的管理细节，确保在整个连接中复制和检索参数值，等等。但它并没有尝试做太多其他事情;它不复制远程对象的功能，只是给远程对象一个本地地址，它可以在另一个应用程序中接收消息。

其他类型的代理对象也是可能的。例如，假设您有一个处理大量数据的对象—它可能创建一个复杂的图像或读取磁盘上文件的内容。设置此对象可能非常耗时，所以您更喜欢延迟执行—当真正需要时或当系统资源暂时空闲时。同时，这个对象至少需要一个占位符，这样应用程序中的其他对象才能正常工作。

在这种情况下，您最初可以创建一个轻量级代理，而不是完整的对象。这个对象可以自己做一些事情，比如回答关于数据的问题，但大多数情况下，它只是为更大的对象保留一个位置，并在时间到来时将消息转发给它。当代理的 `forwardInvocation:` 方法首先接收到发送给另一个对象的消息时，它将确保该对象存在，并在不存在的情况下创建该对象。大对象的所有消息都经过代理，因此，就程序的其余部分而言，代理和大对象是相同的。

## 转发与继承

虽然转发模仿了继承，但 `NSObject` 类从未将两者混淆。像 `respondsToSelector:` 和 `isKindOfClass:`这样的方法只查看继承层次结构，从不查看转发链。例如，如果询问一个 `Warrior` 对象是否响应 `negotiate` 消息，

```objc
if ( [aWarrior respondsToSelector:@selector(negotiate)] )
    ...
```

答案是 `NO`，尽管它可以毫无错误地接收 `negotiate` 信息，并在某种意义上通过转发给 `Diplomat` 来响应它们。(见图 5-1)

在很多情况下，`NO` 才是正确答案。但事实可能并非如此。如果您使用转发来设置代理对象或扩展类的功能，那么转发机制可能应该像继承一样透明。如果你想让你的对象的行为就像它们真的继承了它们转发消息的对象的行为一样，你需要重新实现 `respondsToSelector:` 和 `isKindOfClass:` 方法来包含你的转发算法:

```objc
- (BOOL)respondsToSelector:(SEL)aSelector
{
    if ( [super respondsToSelector:aSelector] )
        return YES;
    else {
        /* Here, test whether the aSelector message can     *
         * be forwarded to another object and whether that  *
         * object can respond to it. Return YES if it can.  */
    }
    return NO;
}
```

除了 `respondsToSelector:` 和 `isKindOfClass:`， `instancesRespondToSelector:` 方法也应该镜像转发算法。如果使用协议，同样地，应将 `conformsToProtocol:` 方法添加到列表中。类似地，如果一个对象转发它接收到的任何远程消息，它应该有一个 `methodSignatureForSelector` 的版本:它可以返回最终响应所转发消息的方法的准确描述;例如，如果一个对象能够将消息转发给它的代理，你将实现 `methodSignatureForSelector:`

```objc
- (NSMethodSignature*)methodSignatureForSelector:(SEL)selector
{
    NSMethodSignature* signature = [super methodSignatureForSelector:selector];
    if (!signature) {
       signature = [surrogate methodSignatureForSelector:selector];
    }
    return signature;
}
```

你可以考虑把转发算法放在私有代码的某个地方，并有所有这些方法，还包括`forwardInvocation:`, 调用它。

:::tip
这是一种先进的技术，只适用于没有其他解决方案的情况。它不打算作为继承的替代。如果必须使用这种技术，请确保完全理解进行转发的类和要转发的类的行为。
:::

本节中提到的方法在基础框架参考中的 `NSObject` 类规范中有描述。有关 `invokeWithTarget:` 的信息，请参阅基础框架参考中的 `NSInvocation` 类规范。

---

引用: [Message Forwarding](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtForwarding.html#//apple_ref/doc/uid/TP40008048-CH105-SW1)
