# Run Loops

运行循环是与线程相关的基础架构的一部分。运行循环是一个事件处理循环，您使用它来安排工作和协调传入事件的接收。运行循环的目的是让你的线程在有工作要做的时候保持忙碌，在没有工作的时候让你的线程进入睡眠状态。

运行循环管理不是完全自动的。您仍然必须设计线程的代码，以便在适当的时间启动运行循环，并响应传入的事件。`Cocoa` 和 `Core Foundation` 都提供了 `run loop` 对象来帮助您配置和管理线程的 `run loop`。您的应用程序不需要显式地创建这些对象;每个线程(包括应用程序的主线程)都有一个相关的 `run loop` 对象。然而，只有次要线程需要显式地运行它们的 `run loop`。作为应用程序启动过程的一部分，应用程序框架自动在主线程上设置并运行 `run loop`。

下面的部分提供了关于运行循环以及如何为应用程序配置它们的更多信息。有关 `run loop 对象`的更多信息，请参阅 [NSRunLoop 类参考](https://developer.apple.com/documentation/foundation/nsrunloop)和 [CFRunLoop 参考](https://developer.apple.com/documentation/corefoundation/cfrunloop)。

## 一个运行循环的解剖

`run loop` 就像它的名字一样。它是线程进入并用于运行事件处理程序以响应传入事件的循环。您的代码提供了用于实现运行循环的实际循环部分的控制语句—换句话说，您的代码提供了驱动运行循环的 `while` 或 `for` 循环。在循环中，使用 `run loop` 对象来“运行”事件处理代码，该代码接收事件并调用安装的处理程序。

`run loop`从两种不同类型的源接收事件。输入源提供异步事件，通常是来自另一个线程或不同应用程序的消息。计时器源提供同步事件，在预定的时间或重复的间隔发生。两种类型的源在事件到达时都使用特定于应用程序的处理程序例程来处理事件。

图 3-1 展示了 `run loop` 的概念结构和各种来源。输入源将异步事件传递给相应的处理程序，并导致 `runUntilDate:` 方法(在线程关联的 `NSRunLoop` 对象上调用)退出。计时器源将事件传递给它们的处理程序例程，但不会导致运行循环退出。

图 3-1 ![Structure of a run loop and its sources](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/Art/runloop.jpg)

除了处理输入源，运行循环还生成关于运行循环行为的通知。已注册的运行循环观察器可以接收这些通知，并使用它们对线程进行额外的处理。使用 `Core Foundation` 在线程上安装运行循环观察者。

下面的部分提供了关于运行循环的组件及其运行模式的更多信息。它们还描述了事件处理期间在不同时间生成的通知。

### 运行循环模式

运行循环模式是要监视的输入源和计时器的集合，以及要通知的运行循环观察者的集合。每次运行 `run loop` 时，都指定(显式或隐式)要运行的特定“模式”。在运行循环的过程中，只监视与该模式相关的源，并允许交付其事件。(类似地，只有与该模式相关联的观察者才会被告知运行循环的进展。)与其他模式相关联的源保留任何新事件，直到后续事件以适当的模式通过循环。

在代码中，您通过名称来识别模式。`Cocoa` 和 `Core Foundation` 都定义了一个默认模式和几个常用模式，以及用于在代码中指定这些模式的字符串。您可以通过简单地为模式名称指定自定义字符串来定义自定义模式。虽然分配给自定义模式的名称是任意的，但这些模式的内容不是任意的。您必须确保将一个或多个输入源、计时器或运行循环观察者添加到您创建的任何模式中，以使它们有用。

在运行循环的特定过程中，可以使用模式从不需要的源中过滤事件。大多数时候，您将希望在系统定义的“默认”模式下运行您的 `run loop`。然而，模态面板可以在“模态”模式下运行。在这种模式下，只有与模态面板相关的源才会将事件传递给线程。对于次要线程，可以使用自定义模式来防止低优先级源在时间关键的操作期间交付事件。

:::tip
模式根据事件的来源而不是事件的类型进行区分。例如，您不会使用模式只匹配鼠标按下事件或键盘事件。您可以使用模式来监听不同的端口集、临时挂起计时器，或者以其他方式更改源并运行当前被监视的循环观察器。
:::

表 3-1 列出了 `Cocoa` 和 `Core Foundation` 定义的标准模式，以及当您使用该模式时的描述。“名称”列列出用于在代码中指定模式的实际常量。

表 3-1 预定义的运行循环模式

| Mode           | Name                                                                 | Description                                                                                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default        | NSDefaultRunLoopMode(Cocoa) kCFRunLoopDefaultMode (Core Foundation)  | 默认模式是大多数操作所使用的模式。大多数时候，您应该使用这种模式来启动您的 run 循环并配置您的输入源。                                                                                                                                             |
| Connection     | NSConnectionReplyMode (Cocoa)                                        | Cocoa 将此模式与 NSConnection 对象结合使用来监视应答。您自己应该很少需要使用这种模式。                                                                                                                                                            |
| Modal          | NSModalPanelRunLoopMode (Cocoa)                                      | Cocoa 使用此模式来识别用于模态面板的事件。                                                                                                                                                                                                        |
| Event tracking | NSEventTrackingRunLoopMode (Cocoa)                                   | Cocoa 使用这种模式在鼠标拖动循环和其他类型的用户界面跟踪循环期间限制传入的事件。                                                                                                                                                                  |
| Common modes   | NSRunLoopCommonModes (Cocoa) kCFRunLoopCommonModes (Core Foundation) | 这是一组可配置的常用模式。将输入源与该模式关联也将其与组中的每个模式关联。对于 Cocoa 应用程序，该集合默认包括默认模式、模态模式和事件跟踪模式。Core Foundation 最初只包含默认模式。您可以使用 CFRunLoopAddCommonMode 函数向该集合添加自定义模式。 |

### 输入源

输入源以异步方式向线程交付事件。事件的源取决于输入源的类型，通常为两类之一。基于端口的输入源监视应用程序的 `Mach` 端口。自定义输入源监视自定义事件源。就运行循环而言，输入源是基于端口的还是自定义的并不重要。系统通常实现这两种类型的输入源，您可以按原样使用。这两个来源之间的唯一区别是它们是如何发出信号的。基于端口的源由内核自动发出信号，而自定义源必须由另一个线程手动发出信号。

当您创建一个输入源时，您将其分配给运行循环的一个或多个模式。在任何给定时刻，模式都会影响被监控的输入源。大多数时候，您在默认模式下运行 `run loop`，但您也可以指定自定义模式。如果输入源不处于当前监视模式，则它生成的任何事件都将保持，直到 `run loop`以正确模式运行。

下面的部分将描述一些输入源。

#### 基于端口的输入源

`Cocoa` 和 `Core Foundation` 为使用端口相关的对象和函数创建基于端口的输入源提供了内置支持。例如，在 `Cocoa` 中，您根本不需要直接创建输入源。您只需创建一个端口对象，并使用 `NSPort` 的方法将该端口添加到 `run loop` 中。端口对象为您处理所需输入源的创建和配置。

在 `Core Foundation` 中，您必须手动创建端口及其运行循环源。在这两种情况下，您都使用与端口不透明类型(`CFMachPortRef`、`CFMessagePortRef` 或 `CFSocketRef`)相关联的函数来创建适当的对象。

有关如何设置和配置基于端口的自定义源的示例，请参见[配置基于端口的输入源](#配置基于端口的输入源)。

#### 自定义输入源

要创建自定义输入源，必须使用 `Core Foundation` 中与 `CFRunLoopSourceRef` `opaque` 类型相关联的函数。您可以使用几个回调函数配置自定义输入源。`Core Foundation` 在不同的点调用这些函数来配置源，处理任何传入的事件，并在从 `run loop` 中删除源时拆除源。

除了在事件到达时定义自定义源的行为外，还必须定义事件交付机制。源的这一部分在单独的线程上运行，负责向输入源提供其数据，并在数据准备好进行处理时向其发出信号。事件传递机制由您决定，但不必过于复杂。

有关如何创建自定义输入源的示例，请参见[定义自定义输入源](#定义自定义输入源)。有关自定义输入源的参考信息，请参见 [CFRunLoopSource 参考](https://developer.apple.com/documentation/corefoundation/cfrunloopsource-rhr)。

#### Cocoa 执行选择器输入源

除了基于端口的源之外，`Cocoa` 还定义了一个自定义的输入源，允许您在任何线程上执行选择器。与基于端口的源一样，执行选择器请求在目标线程上序列化，缓解了在一个线程上运行多个方法时可能出现的许多同步问题。与基于端口的源不同，执行选择器源在执行其选择器后从运行循环中删除自己。

:::tip
在 OS X v10.5 之前，执行选择器源主要用于向主线程发送消息，但在 OS X v10.5 及其后版本和 iOS 中，您可以使用它们向任何线程发送消息。
:::

当在另一个线程上执行选择器时，目标线程必须有一个活动的运行循环。对于您创建的线程，这意味着等待直到您的代码显式地启动运行循环。但是，因为主线程开始自己的运行循环，所以只要应用程序调用应用程序委托的 `applicationDidFinishLaunching:` 方法，您就可以开始在该线程上发出调用。`run loop` 在每次循环中处理所有排队的执行选择器调用，而不是在每次循环迭代中处理一个。

表 3-2 列出了在 `NSObject` 上定义的可用于在其他线程上执行选择器的方法。因为这些方法是在 `NSObject` 上声明的，所以你可以在任何可以访问 `Objective-C` 对象的线程中使用它们，包括 `POSIX` 线程。这些方法实际上并不创建执行选择器的新线程。

表 3-2

| Methods                                                                                                               | Description                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `performSelectorOnMainThread:withObject:waitUntilDone:` `performSelectorOnMainThread:withObject:waitUntilDone:modes:` | 在应用程序的主线程的下一个运行循环中执行指定的选择器。这些方法提供了在执行选择器之前阻塞当前线程的选项。                                                                                                                   |
| `performSelector:onThread:withObject:waitUntilDone:` `performSelector:onThread:withObject:waitUntilDone:modes:`       | 在有 NSThread 对象的任何线程上执行指定的选择器。这些方法提供了在执行选择器之前阻塞当前线程的选项。                                                                                                                         |
| `performSelector:withObject:afterDelay:` `performSelector:withObject:afterDelay:inModes:`                             | 在下一个运行循环期间和一个可选的延迟期间之后，对当前线程执行指定的选择器。因为它要等到下一个运行循环周期才能执行选择器，所以这些方法与当前执行的代码相比提供了一个自动的最小延迟。多个排队的选择器按照排队的顺序依次执行。 |
| `cancelPreviousPerformRequestsWithTarget:` `cancelPreviousPerformRequestsWithTarget:selector:object:`                 | 允许你使用`performSelector:withObject:afterDelay:` 或 `performSelector:withObject:afterDelay:inModes:` 方法取消发送到当前线程的消息。                                                                                      |

有关这些方法的详细信息，请参见 [NSObject 类参考](https://developer.apple.com/documentation/objectivec/nsobject)。

### Timer 源

计时器源在未来的一个预设时间同步地向您的线程交付事件。定时器是线程通知自己做某事的一种方式。例如，搜索字段可以使用计时器，在用户连续的击键间隔过了一定的时间后启动自动搜索。利用这个延迟时间，用户有机会在开始搜索之前输入尽可能多的所需搜索字符串。

尽管计时器会生成基于时间的通知，但它并不是一种实时机制。与输入源一样，计时器与运行循环的特定模式相关联。如果计时器不在运行循环当前监视的模式中，则在您以计时器支持的模式之一运行运行循环之前，它不会被触发。类似地，如果在运行循环执行处理程序例程的过程中触发计时器，则计时器将等待到下一次通过运行循环来调用其处理程序例程。如果 `run loop` 根本没有运行，则计时器永远不会触发。

通过配置计时器，可以只生成一次或多次事件。重复计时器根据计划的触发时间(而不是实际的触发时间)自动重新调度自己。例如，如果一个计时器被安排在特定的时间发射，并且在那之后每 5 秒发射一次，那么预定的发射时间将总是落在最初的 5 秒时间间隔上，即使实际发射时间被延迟。如果触发时间延迟到错过一个或多个计划的触发时间，则计时器在错过的时间段内只触发一次。在错过的时间段内触发后，定时器被重新调度到下一个预定的触发时间。

有关配置计时器源的更多信息，请参见[配置定时器源](#配置定时器源)。有关参考信息，请参阅 [NSTimer 类参考](https://developer.apple.com/documentation/foundation/timer)或 [CFRunLoopTimer 参考](https://developer.apple.com/documentation/corefoundation/cfrunlooptimer-rhk)。

### 运行循环观察者

源在发生适当的异步或同步事件时触发，而运行循环观察器则在运行循环本身执行期间的特殊位置触发。您可以使用运行循环观察程序来准备线程处理给定事件，或者在线程进入睡眠状态之前准备线程。你可以在运行循环中将以下事件与运行循环中的运行循环观察者联系起来:

- 运行循环的入口。
- 当运行循环即将处理一个计时器时。
- 当运行循环要处理一个输入源时。
- 当运行循环即将进入休眠状态时。
- 当运行循环被唤醒时，但是在它处理唤醒它的事件之前。
- 从运行循环的出口。

你可以使用 `Core Foundation` 在应用中添加运行循环观察员。要创建一个 `run loop` 观察者，你需要创建一个 `CFRunLoopObserverRef` `opaque` 类型的新实例。此类型跟踪自定义回调函数及其感兴趣的活动。

与计时器类似，运行循环观察器可以一次或多次使用。一次观察器在触发后将自己从运行循环中移除，而重复观察器仍然连接。在创建观察者时，您指定它是运行一次还是重复运行。

有关如何创建运行循环观察者的示例，请参见[配置 Run Loop](#配置-run-loop)。参考信息请参见[CFRunLoopObserver 参考](https://developer.apple.com/documentation/corefoundation/cfrunloopobserver)。

### 事件的运行循环序列

每次运行它，线程的运行循环都会处理挂起事件，并为任何附加的观察者生成通知。它这样做的顺序是非常具体的，如下:

1. 通知观察者, 运行循环已经进入。
2. 通知观察者, 任何准备好的计时器即将启动。
3. 通知观察者, 任何非基于端口的输入源即将启动。
4. 触发任何可以触发的非基于端口的输入源。
5. 如果基于端口的输入源已经准备好并等待触发，则立即处理事件。执行步骤 9。
6. 通知观察者, 线程即将进入睡眠状态。
7. 让线程休眠，直到下列事件之一发生:
   - 事件到达基于端口的输入源。
   - 计时器启动。
   - 为运行循环设置的超时值将过期。
   - 运行循环被显式唤醒。
8. 通知观察者线程刚刚醒来。
9. 处理挂起事件。
   - 如果启动了用户定义的计时器，则处理计时器事件并重新启动循环。执行步骤 2。
   - 如果触发了输入源，则交付事件。
   - 如果运行循环被显式唤醒，但还没有超时，则重新启动循环。执行步骤 2。
10. 通知观察者, 运行循环已经退出。

由于定时器和输入源的 `observer` 通知是在这些事件实际发生之前发出的，因此在通知时间和实际事件发生时间之间可能存在差距。如果这些事件之间的时间很关键，您可以使用 `sleep` 和 `awake-from-sleep` 通知来帮助您关联实际事件之间的时间。

由于计时器和其他周期性事件是在运行`run loop`时交付的，因此绕过该循环会中断这些事件的交付。当您通过进入循环并重复请求应用程序的事件来实现鼠标跟踪例程时，就会发生这种行为的典型示例。因为您的代码是直接获取事件，而不是让应用程序正常调度这些事件，所以活动计时器将无法触发，直到鼠标跟踪例程退出并将控制权返回给应用程序之后。

可以使用`run loop`对象显式地唤醒`run loop`。其他事件也可能导致运行循环被唤醒。例如，添加另一个非基于端口的输入源将唤醒`run loop`，以便可以立即处理输入源，而不是等待其他事件发生。

## 什么时候使用运行循环?

唯一需要显式运行 `run loop` 的时候是为应用程序创建次要线程的时候。应用程序主线程的运行循环是基础设施的重要组成部分。因此，应用程序框架提供了运行主应用程序循环的代码，并自动启动该循环。`iOS` 中的 `UIApplication`(或 `OS X` 中的 `NSApplication`)的 `run` 方法启动一个应用程序的主循环，作为正常启动序列的一部分。如果你使用 `Xcode` 模板项目来创建你的应用程序，你永远不应该显式地调用这些例程。

对于次要线程，您需要决定是否需要运行循环，如果需要，则自己配置并启动它。在所有情况下都不需要启动线程的运行循环。例如，如果您使用一个线程来执行一些长期运行的和预先确定的任务，您可能可以避免启动运行循环。运行循环适用于需要与线程有更多交互的情况。例如，如果你计划做以下任何一件事，你需要启动一个运行循环:

- 使用端口或自定义输入源与其他线程通信。
- 在线程上使用计时器。
- 在 `Cocoa` 应用程序中使用任何 `performSelector…` 方法。
- 保持线程运行以执行定期任务。

如果选择使用运行循环，则配置和设置很简单。不过，与所有线程编程一样，您应该有一个在适当情况下退出次要线程的计划。通过让线程退出来干净地结束线程总是比强制它终止要好。关于如何配置和退出运行循环的信息在[使用运行循环对象](#使用运行循环对象)中描述。

## 使用运行循环对象

`run loop` 对象提供了将输入源、计时器和 `run-loop` 观察器添加到运行循环并运行它的主接口。每个线程都有一个与之相关的运行循环对象。在 `Cocoa` 中，这个对象是 `NSRunLoop` 类的一个实例。在低级应用程序中，它是一个指向 `CFRunLoopRef` `opaque` 类型的指针。

### 获取一个 Run Loop 对象

要获取当前线程的运行循环，可以使用以下方法之一:

- 在 `Cocoa` 应用程序中，使用 `NSRunLoop` 的 `currentRunLoop` 类方法来检索 `NSRunLoop` 对象。
- 使用 `CFRunLoopGetCurrent` 函数。

虽然它们不是免费的桥接类型，但当需要时，您可以从 `NSRunLoop` 对象中获得 `CFRunLoopRef` `opaque` 类型。 `NSRunLoop` 类定义了一个 `getCFRunLoop` 方法，该方法返回一个 `CFRunLoopRef` 类型，您可以将该类型传递给 `Core Foundation` 例程。因为这两个对象引用同一个运行循环，您可以根据需要混合调用 `NSRunLoop` 对象和 `CFRunLoopRef` `opaque` 类型。

### 配置 Run Loop

在次要线程上运行 `run loop` 之前，必须至少向其添加一个输入源或计时器。如果运行循环没有任何要监视的源，那么当您试图运行它时，它将立即退出。有关如何向运行循环添加源的示例，请参见[配置 Run Loop 源](#配置-run-loop-源)。

除了安装源代码之外，您还可以安装 `run loop` 观察器，并使用它们来检测 `run loop` 的不同执行阶段。要安装运行循环观察者，您需要创建一个 `CFRunLoopObserverRef` `opaque` 类型，并使用 `CFRunLoopAddObserver` 函数将其添加到您的运行循环中。运行循环观察器必须使用 `Core Foundation` 创建，即使对于 `Cocoa` 应用程序也是如此。

清单 3-1 显示了一个线程的主例程，该线程将一个运行循环观察者附加到其运行循环。这个示例的目的是向您展示如何创建一个 `run loop` 观察者，因此代码只是简单地设置了一个 `run loop` 观察者来监视所有 `run loop` 活动。基本处理程序例程(未显示)只是在处理计时器请求时记录运行循环活动。

清单 3-1 创建一个`run loop`观察者

```objc
- (void)threadMain
{
    // The application uses garbage collection, so no autorelease pool is needed.
    NSRunLoop* myRunLoop = [NSRunLoop currentRunLoop];

    // Create a run loop observer and attach it to the run loop.
    CFRunLoopObserverContext  context = {0, self, NULL, NULL, NULL};
    CFRunLoopObserverRef    observer = CFRunLoopObserverCreate(kCFAllocatorDefault,
            kCFRunLoopAllActivities, YES, 0, &myRunLoopObserver, &context);

    if (observer)
    {
        CFRunLoopRef    cfLoop = [myRunLoop getCFRunLoop];
        CFRunLoopAddObserver(cfLoop, observer, kCFRunLoopDefaultMode);
    }

    // Create and schedule the timer.
    [NSTimer scheduledTimerWithTimeInterval:0.1 target:self
                selector:@selector(doFireTimer:) userInfo:nil repeats:YES];

    NSInteger    loopCount = 10;
    do
    {
        // Run the run loop 10 times to let the timer fire.
        [myRunLoop runUntilDate:[NSDate dateWithTimeIntervalSinceNow:1]];
        loopCount--;
    }
    while (loopCount);
}
```

在为长期存在的线程配置运行循环时，最好至少添加一个输入源来接收消息。虽然您可以只带一个计时器进入运行循环，但一旦计时器触发，它通常是无效的，这将导致运行循环退出。附加一个重复计时器可以使运行循环在较长的时间内运行，但需要定期触发计时器来唤醒线程，这实际上是轮询的另一种形式。相反，输入源等待事件发生，在事件发生之前，线程一直处于休眠状态。

### 启动 Run Loop

只有应用程序中的次要线程才需要启动运行循环。一个运行循环必须至少有一个要监视的输入源或计时器。如果没有连接，则运行循环立即退出。

有几种方法可以启动运行循环，包括以下方法:

- 无条件地
- 有一个固定的时间限制
- 在特定模式下

无条件地进入 `run loop`是最简单的选择，但也是最不可取的选择。无条件地运行 `run loop` 会将线程置于永久循环中，这使得您几乎无法控制 `run loop` 本身。您可以添加和删除输入源和计时器，但停止 `run loop` 的唯一方法是终止它。也没有办法在自定义模式下运行 `run loop`。

与其无条件地运行 `run loop`，不如使用超时值运行 `run loop`。使用超时值时，运行循环将一直运行到事件到达或分配的时间到期。如果事件到达，则将该事件分派给处理程序进行处理，然后退出 `run loop`。然后，您的代码可以重新启动运行循环，以处理下一个事件。如果分配的时间到期了，您可以简单地重新启动 `run loop`或使用这段时间来做任何需要的事件。

除了超时值，您还可以使用特定模式运行您的 `run loop`。模式和超时值不是互斥的，可以在启动 `run loop`时使用。模式限制了向运行循环交付事件的源的类型，并在[运行循环模式](#运行循环模式)中进行了更详细的描述。

清单 3-2 显示了线程主入口例程的框架版本。本例的关键部分展示了 `run loop` 的基本结构。本质上，您将输入源和计时器添加到运行循环中，然后重复调用其中一个例程来启动运行循环。每次 `run loop` 例程返回时，您都要检查是否出现了任何可能需要退出线程的条件。这个例子使用了 `Core Foundation` 的 `run loop` 例程，这样它就可以检查返回结果并确定为什么退出了 `run loop`。如果您正在使用 `Cocoa` 并且不需要检查返回值，您也可以使用 `NSRunLoop` 类的方法以类似的方式运行 `run loop`。(关于调用 `NSRunLoop` 类方法的 `run loop` 示例，请参见清单 3-14。)

清单 3-2 运行 Runloop

```objc
- (void)skeletonThreadMain
{
    // Set up an autorelease pool here if not using garbage collection.
    BOOL done = NO;

    // Add your sources or timers to the run loop and do any other setup.

    do
    {
        // Start the run loop but return after each source is handled.
        SInt32    result = CFRunLoopRunInMode(kCFRunLoopDefaultMode, 10, YES);

        // If a source explicitly stopped the run loop, or if there are no
        // sources or timers, go ahead and exit.
        if ((result == kCFRunLoopRunStopped) || (result == kCFRunLoopRunFinished))
            done = YES;

        // Check for any other exit conditions here and set the
        // done variable as needed.
    }
    while (!done);

    // Clean up code here. Be sure to release any allocated autorelease pools.
}
```

### 退出 Run Loop

可以递归地运行一个 `run loop`。换句话说，您可以从输入源或计时器的处理程序例程中调用 `CFRunLoopRun` 、`CFRunLoopRunInMode` 或任何 `NSRunLoop` 方法来启动运行循环。在这样做时，可以使用希望运行嵌套 `run loop`的任何模式，包括外部 `run loop`正在使用的模式。

在处理一个事件之前，有两种方法使运行循环退出:

- 将 `run loop` 配置为使用超时值运行。
- 让 `run loop` 停止。

如果您能够管理超时值，当然首选使用超时值。指定超时值可以让 `run loop` 在退出之前完成所有的正常处理，包括向 `run loop` 观察者传递通知。

使用 `CFRunLoopStop` 函数显式地停止运行循环会产生类似于超时的结果。运行循环发送任何剩余的运行循环通知，然后退出。不同之处在于，您可以在您无条件启动的运行循环中使用这种技术。

尽管删除运行循环的输入源和计时器也可能导致运行循环退出，但这并不是停止运行循环的可靠方法。一些系统例程将输入源添加到运行循环中，以处理所需的事件。因为您的代码可能不知道这些输入源，所以它将无法删除它们，这将阻止运行循环退出。

### 线程安全和 Run Loop 对象

线程安全性取决于您使用的操作运行循环的 `API` 。`Core Foundation` 中的函数通常是线程安全的，可以从任何线程调用。然而，如果您正在执行更改运行循环配置的操作，那么尽可能从拥有运行循环的线程执行此操作仍然是一种好做法。

`Cocoa` `NSRunLoop` 类不像它的 `Core Foundation` 类那样具有固有的线程安全性。如果你正在使用 `NSRunLoop` 类来修改你的运行循环，你应该只从拥有该运行循环的同一个线程这样做。在属于不同线程的运行循环中添加输入源或计时器可能会导致代码崩溃或以意想不到的方式运行。

## 配置 Run Loop 源

下面的部分展示了如何在 `Cocoa` 和 `Core Foundation` 中设置不同类型的输入源的示例。

### 定义自定义输入源

创建自定义输入源需要定义以下内容:

- 您希望输入源处理的信息。
- 一个调度程序例程，让感兴趣的客户知道如何联系您的输入源。
- 执行任何客户端发送的请求的处理程序。
- 一个取消程序，使您的输入源无效。

因为您创建了一个定制输入源来处理定制信息，所以实际配置被设计为灵活的。调度程序、处理程序和取消例程是自定义输入源几乎总是需要的关键例程。然而，其余大部分输入源行为发生在这些处理程序例程之外。例如，由您来定义将数据传递到输入源以及将输入源的存在传递给其他线程的机制。

图 3-2 显示了一个自定义输入源的示例配置。在本例中，应用程序的主线程维护对输入源、该输入源的自定义命令缓冲区以及安装了输入源的 `run loop` 的引用。当主线程有一个任务想要传递给工作线程时，它会向命令缓冲区发送一个命令，以及工作线程启动该任务所需的任何信息。(因为主线程和工作线程的输入源都可以访问命令缓冲区，所以访问必须是同步的。)一旦发布了命令，主线程就会向输入源发出信号，并唤醒工作线程的运行循环。在接收到 `wake up` 命令后，`run loop` 调用输入源的处理程序，该处理程序处理命令缓冲区中找到的命令。

图 3-2 ![Operating a custom input source](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/Art/custominputsource.jpg)

下面的部分解释了上图中自定义输入源的实现，并显示了需要实现的关键代码

#### 定义输入源

定义自定义输入源需要使用核心基础例程来配置运行循环源并将其附加到运行循环。虽然基本的处理程序是基于 `C` 的函数，但这并不妨碍你为这些函数编写包装器，并使用 `Objective-C` 或 `c++`来实现你的代码体。

图 3-2 中引入的输入源使用了一个 `Objective-C` 对象来管理命令缓冲区，并与 `run loop` 协调。清单 3-3 `显示了该对象的定义。RunLoopSource` 对象管理一个命令缓冲区，并使用该缓冲区接收来自其他线程的消息。这个清单还显示了 `RunLoopContext` 对象的定义，它实际上只是一个容器对象，用于将 `RunLoopSource` 对象和 `run loop` 引用传递给应用程序的主线程。

清单 3-3 自定义输入源对象定义

```objc
@interface RunLoopSource : NSObject
{
    CFRunLoopSourceRef runLoopSource;
    NSMutableArray* commands;
}

- (id)init;
- (void)addToCurrentRunLoop;
- (void)invalidate;

// Handler method
- (void)sourceFired;

// Client interface for registering commands to process
- (void)addCommand:(NSInteger)command withData:(id)data;
- (void)fireAllCommandsOnRunLoop:(CFRunLoopRef)runloop;

@end

// These are the CFRunLoopSourceRef callback functions.
void RunLoopSourceScheduleRoutine (void *info, CFRunLoopRef rl, CFStringRef mode);
void RunLoopSourcePerformRoutine (void *info);
void RunLoopSourceCancelRoutine (void *info, CFRunLoopRef rl, CFStringRef mode);

// RunLoopContext is a container object used during registration of the input source.
@interface RunLoopContext : NSObject
{
    CFRunLoopRef        runLoop;
    RunLoopSource*        source;
}
@property (readonly) CFRunLoopRef runLoop;
@property (readonly) RunLoopSource* source;

- (id)initWithSource:(RunLoopSource*)src andLoop:(CFRunLoopRef)loop;
@end
```

尽管 `Objective-C` 代码管理输入源的自定义数据，但是将输入源附加到运行循环需要基于 `c` 的回调函数。当您实际将 `run loop` 源附加到 `run loop` 时，将调用第一个函数，如清单 3-4 所示。因为这个输入源只有一个客户机(主线程)，所以它使用 `scheduler` 函数发送一条消息，以便在该线程上向应用程序委托注册自己。当委托想要与输入源通信时，它使用 `RunLoopContext` 对象中的信息来完成。

清单 3-4 调度一个运行循环源

```objc
void RunLoopSourceScheduleRoutine (void *info, CFRunLoopRef rl, CFStringRef mode)
{
    RunLoopSource* obj = (RunLoopSource*)info;
    AppDelegate*   del = [AppDelegate sharedAppDelegate];
    RunLoopContext* theContext = [[RunLoopContext alloc] initWithSource:obj andLoop:rl];

    [del performSelectorOnMainThread:@selector(registerSource:)
                                withObject:theContext waitUntilDone:NO];
}
```

最重要的回调例程之一是在输入源发出信号时用于处理自定义数据的回调例程。清单 3-5 显示了与 `RunLoopSource` 对象关联的 `perform` 回调例程。这个函数只是将完成工作的请求转发给 `sourceFired` 方法，然后该方法处理命令缓冲区中出现的任何命令。

清单 3-5 在输入源中执行工作

```objc
void RunLoopSourcePerformRoutine (void *info)
{
    RunLoopSource*  obj = (RunLoopSource*)info;
    [obj sourceFired];
}
```

如果使用 `CFRunLoopSourceInvalidate` 函数从运行循环中删除输入源，系统将调用输入源的取消例程。您可以使用这个例程通知客户端您的输入源不再有效，他们应该删除对它的任何引用。清单 3-6 显示了用 `RunLoopSource` 对象注册的取消回调例程。这个函数向应用程序委托发送另一个 `RunLoopContext` 对象，但这一次要求委托删除对运行循环源的引用。

清单 3-6 使输入源无效

```objc
void RunLoopSourceCancelRoutine (void *info, CFRunLoopRef rl, CFStringRef mode)
{
    RunLoopSource* obj = (RunLoopSource*)info;
    AppDelegate* del = [AppDelegate sharedAppDelegate];
    RunLoopContext* theContext = [[RunLoopContext alloc] initWithSource:obj andLoop:rl];

    [del performSelectorOnMainThread:@selector(removeSource:)
                                withObject:theContext waitUntilDone:YES];
}
```

:::tip
应用程序委托的 `registerSource:`和 `removeSource:`方法的代码在[与输入源的客户端协调](#与输入源的客户端协调)显示。
:::

#### 在 RunLoop 中安装输入源

清单 3-7 显示了 `RunLoopSource` 类的 `init` 和 `addToCurrentRunLoop` 方法。 `init` 方法创建 `CFRunLoopSourceRef` `opaque` 类型，该类型必须实际附加到 `run loop`。它将 `RunLoopSource` 对象本身作为上下文信息传递，以便回调例程有一个指向该对象的指针。直到工作线程调用 `addToCurrentRunLoop` 方法，才会安装输入源，此时调用 `RunLoopSourceScheduleRoutine` 回调函数。一旦将输入源添加到运行循环中，线程就可以运行它的运行循环来等待它。

清单 3-7 安装 Run Loop 源

```objc
- (id)init
{
    CFRunLoopSourceContext    context = {0, self, NULL, NULL, NULL, NULL, NULL,
                                        &RunLoopSourceScheduleRoutine,
                                        RunLoopSourceCancelRoutine,
                                        RunLoopSourcePerformRoutine};

    runLoopSource = CFRunLoopSourceCreate(NULL, 0, &context);
    commands = [[NSMutableArray alloc] init];

    return self;
}

- (void)addToCurrentRunLoop
{
    CFRunLoopRef runLoop = CFRunLoopGetCurrent();
    CFRunLoopAddSource(runLoop, runLoopSource, kCFRunLoopDefaultMode);
}

```

#### 与输入源的客户端协调

要使您的输入源有用，您需要对其进行操作，并从另一个线程向其发出信号。输入源的全部意义就是让它的关联线程处于休眠状态，直到有事情可做。这个事实要求应用程序中的其他线程知道输入源并有方法与它通信。

通知客户您的输入源的一种方法是，当您的输入源首次安装在其 `run loop` 中时，发送注册请求。您可以向尽可能多的客户端注册输入源，或者您可以简单地向某个中央机构注册，然后将您的输入源出售给感兴趣的客户端。清单 3-8 显示了由应用程序委托定义并在调用 `RunLoopSource` 对象的调度器函数时调用的注册方法。这个方法接收 `RunLoopSource` 对象提供的 `RunLoopContext` 对象，并将其添加到其源列表中。此清单还显示了在从其运行循环中删除输入源时用于注销输入源的例程。

清单 3-8 使用应用程序委托注册和删除输入源

```objc
- (void)registerSource:(RunLoopContext*)sourceInfo;
{
    [sourcesToPing addObject:sourceInfo];
}

- (void)removeSource:(RunLoopContext*)sourceInfo
{
    id    objToRemove = nil;

    for (RunLoopContext* context in sourcesToPing)
    {
        if ([context isEqual:sourceInfo])
        {
            objToRemove = context;
            break;
        }
    }

    if (objToRemove)
        [sourcesToPing removeObject:objToRemove];
}
```

:::tip
调用前面清单中的方法的回调函数如清单 3-4 和清单 3-6 所示。
:::

#### 向输入源发送信号

在将其数据传递给输入源之后，客户机必须向源发出信号并唤醒其运行循环。向源发出信号让运行循环知道源已经准备好进行处理。而且因为在信号发生时线程可能处于休眠状态，所以您应该总是显式地唤醒运行循环。如果不这样做，可能会导致处理输入源的延迟。

清单 3-9 显示了 `RunLoopSource` 对象的 `fireCommandsOnRunLoop` 方法。当客户机准备好让源处理它们添加到缓冲区中的命令时，就会调用此方法。

清单 3-9 唤醒 Run Loop

```objc
- (void)fireCommandsOnRunLoop:(CFRunLoopRef)runloop
{
    CFRunLoopSourceSignal(runLoopSource);
    CFRunLoopWakeUp(runloop);
}
```

:::warning
永远不要试图通过发送自定义输入源来处理 `SIGHUP` 或其他类型的进程级信号。唤醒运行循环的核心基础函数不是信号安全的，不应该在应用程序的信号处理程序例程中使用。有关信号处理程序例程的更多信息，请参阅 [sigaction 手册页](https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/sigaction.2.html#//apple_ref/doc/man/2/sigaction)。
:::

### 配置定时器源

要创建一个计时器源，您所要做的就是创建一个计时器对象并在运行循环中调度它。在 `Cocoa` 中，使用 `NSTimer` 类创建新的计时器对象，在 `Core Foundation` 中使用 `CFRunLoopTimerRef` `opaque` 类型。在内部， `NSTimer` 类只是 `Core Foundation` 的一个扩展，它提供了一些方便的特性，比如使用相同的方法创建和调度计时器的能力。

在 `Cocoa` 中，你可以使用以下任何一个类方法一次性创建和调度一个计时器:

- `scheduledTimerWithTimeInterval:target:selector:userInfo:repeats:`
- `scheduledTimerWithTimeInterval:invocation:repeats:`

这些方法创建计时器，并以默认模式(`NSDefaultRunLoopMode`)将其添加到当前线程的运行循环中。如果需要，还可以手动调度计时器，方法是创建 `NSTimer` 对象，然后使用 `NSRunLoop` 的 `addTimer:forMode:` 方法将其添加到运行循环中。这两种技术基本上做的是相同的事情，但对计时器配置的控制级别不同。例如，如果您创建计时器并手动将其添加到 `run loop` 中，则可以使用默认模式以外的模式来完成此操作。清单 3-10 显示了如何使用这两种技术创建计时器。第一个计时器的初始延迟为 1 秒，但此后每 0.1 秒定时触发一次。第二个计时器在最初的 0.2 秒延迟后开始触发，然后每 0.2 秒触发一次。

清单 3-10 使用 NSTimer 创建和调度计时器

```objc
NSRunLoop* myRunLoop = [NSRunLoop currentRunLoop];

// Create and schedule the first timer.
NSDate* futureDate = [NSDate dateWithTimeIntervalSinceNow:1.0];
NSTimer* myTimer = [[NSTimer alloc] initWithFireDate:futureDate
                        interval:0.1
                        target:self
                        selector:@selector(myDoFireTimer1:)
                        userInfo:nil
                        repeats:YES];
[myRunLoop addTimer:myTimer forMode:NSDefaultRunLoopMode];

// Create and schedule the second timer.
[NSTimer scheduledTimerWithTimeInterval:0.2
                        target:self
                        selector:@selector(myDoFireTimer2:)
                        userInfo:nil
                        repeats:YES];
```

清单 3-11 显示了使用核心基础函数配置计时器所需的代码。虽然这个例子没有在上下文结构中传递任何用户定义的信息，但是您可以使用这个结构来传递计时器所需的任何自定义数据。有关该结构内容的更多信息，请参见 [CFRunLoopTimer 参考](https://developer.apple.com/documentation/corefoundation/cfrunlooptimer-rhk)中对其的描述。

清单 3-11 使用 `Core Foundation` 创建和调度计时器

```c
CFRunLoopRef runLoop = CFRunLoopGetCurrent();
CFRunLoopTimerContext context = {0, NULL, NULL, NULL, NULL};
CFRunLoopTimerRef timer = CFRunLoopTimerCreate(kCFAllocatorDefault, 0.1, 0.3, 0, 0,
                                        &myCFTimerCallback, &context);

CFRunLoopAddTimer(runLoop, timer, kCFRunLoopCommonModes);

```

### 配置基于端口的输入源

`Cocoa` 和 `Core Foundation` 都提供了用于线程间或进程间通信的基于端口的对象。下面的部分将向您展示如何使用几种不同类型的端口设置端口通信。

#### 配置 NSMachPort 对象

要与 `NSMachPort` 对象建立本地连接，需要创建 `port` 对象并将其添加到主线程的 `run loop` 中。当启动你的二级线程时，你将相同的对象传递给你的线程的入口点函数。次要线程可以使用相同的对象将消息发送回主线程。

##### 实现主线程代码

清单 3-12 显示了启动辅助工作线程的主线程代码。因为 `Cocoa` 框架执行了许多配置 `port` 和 `run loop` 的中间步骤， `launchThread` 方法明显比它的核心基础等效方法要短(清单 3-17);然而，两者的行为几乎完全相同。一个区别是，这个方法没有将本地端口的名称发送给工作线程，而是直接发送 `NSPort` 对象。

清单 3-12 主线程启动方法

```objc
- (void)launchThread
{
    NSPort* myPort = [NSMachPort port];
    if (myPort)
    {
        // This class handles incoming port messages.
        [myPort setDelegate:self];

        // Install the port as an input source on the current run loop.
        [[NSRunLoop currentRunLoop] addPort:myPort forMode:NSDefaultRunLoopMode];

        // Detach the thread. Let the worker release the port.
        [NSThread detachNewThreadSelector:@selector(LaunchThreadWithPort:)
               toTarget:[MyWorkerClass class] withObject:myPort];
    }
}
```

为了在你的线程之间建立一个双向通信通道，你可能想让工作线程在签入消息中向你的主线程发送它自己的本地端口。接收签入消息可以让主线程知道在启动第二个线程时一切顺利，并为您提供向该线程发送进一步消息的方法。

清单 3-13 显示了主线程的 `handlePortMessage:`方法。当数据到达线程自己的本地端口时，将调用此方法。当签入消息到达时，该方法直接从端口消息中检索辅助线程的端口，并保存它以供以后使用。

清单 3-13 处理 Mach 端口消息

```objc
#define kCheckinMessage 100

// Handle responses from the worker thread.
- (void)handlePortMessage:(NSPortMessage *)portMessage
{
    unsigned int message = [portMessage msgid];
    NSPort* distantPort = nil;

    if (message == kCheckinMessage)
    {
        // Get the worker thread’s communications port.
        distantPort = [portMessage sendPort];

        // Retain and save the worker port for later use.
        [self storeDistantPort:distantPort];
    }
    else
    {
        // Handle other messages.
    }
}

```

##### 实现子线程代码

对于辅助工作线程，必须配置该线程并使用指定的端口将信息传递回主线程。

清单 3-14 显示了设置工作线程的代码。在为线程创建一个自动释放池之后，该方法会创建一个 `worker` 对象来驱动线程的执行。 `worker` 对象的 `sendCheckinMessage:` 方法(如清单 3-15 所示)为 `worker` 线程创建了一个本地端口，并将`checkin`消息发送回主线程。

清单 3-14 使用 Mach 端口启动工作线程

```objc
+(void)LaunchThreadWithPort:(id)inData
{
    NSAutoreleasePool*  pool = [[NSAutoreleasePool alloc] init];

    // Set up the connection between this thread and the main thread.
    NSPort* distantPort = (NSPort*)inData;

    MyWorkerClass*  workerObj = [[self alloc] init];
    [workerObj sendCheckinMessage:distantPort];
    [distantPort release];

    // Let the run loop process things.
    do
    {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode
                            beforeDate:[NSDate distantFuture]];
    }
    while (![workerObj shouldExit]);

    [workerObj release];
    [pool release];
}
```

当使用 `NSMachPort` 时，本地线程和远程线程可以使用相同的端口对象进行线程之间的单向通信。换句话说，由一个线程创建的本地端口对象成为另一个线程的远程端口对象。

清单 3-15 显示了第二个线程的`checkin`例程。此方法为将来的通信设置自己的本地端口，然后将`checkin`消息发送回主线程。该方法使用在 `LaunchThreadWithPort:` 方法中接收到的 `port` 对象作为消息的目标。

清单 3-15 使用 Mach 端口发送`checkin`消息

```objc
// Worker thread check-in method
- (void)sendCheckinMessage:(NSPort*)outPort
{
    // Retain and save the remote port for future use.
    [self setRemotePort:outPort];

    // Create and configure the worker thread port.
    NSPort* myPort = [NSMachPort port];
    [myPort setDelegate:self];
    [[NSRunLoop currentRunLoop] addPort:myPort forMode:NSDefaultRunLoopMode];

    // Create the check-in message.
    NSPortMessage* messageObj = [[NSPortMessage alloc] initWithSendPort:outPort
                                         receivePort:myPort components:nil];

    if (messageObj)
    {
        // Finish configuring the message and send it immediately.
        [messageObj setMsgId:setMsgid:kCheckinMessage];
        [messageObj sendBeforeDate:[NSDate date]];
    }
}

```

#### 配置 NSMessagePort 对象

要与 `NSMessagePort` 对象建立本地连接，不能简单地在线程之间传递端口对象。远程消息端口必须按名称获取。要在 `Cocoa` 中实现这一点，需要使用特定的名称注册本地端口，然后将该名称传递给远程线程，以便它能够获得用于通信的适当端口对象。清单 3-16 显示了在希望使用消息端口的情况下的端口创建和注册过程。

清单 3-16 注册消息端口

```objc
NSPort* localPort = [[NSMessagePort alloc] init];

// Configure the object and add it to the current run loop.
[localPort setDelegate:self];
[[NSRunLoop currentRunLoop] addPort:localPort forMode:NSDefaultRunLoopMode];

// Register the port using a specific name. The name must be unique.
NSString* localPortName = [NSString stringWithFormat:@"MyPortName"];
[[NSMessagePortNameServer sharedInstance] registerPort:localPort
                     name:localPortName];
```

#### 在 Core Foundation 中配置基于端口的输入源

本节展示了如何使用 `Core Foundation` 在应用程序的主线程和工作线程之间建立双向通信通道。

清单 3-17 显示了应用程序主线程用来启动工作线程的代码。该代码所做的第一件事是设置一个 `CFMessagePortRef` `opaque` 类型来侦听来自工作线程的消息。工作线程需要端口的名称来建立连接，这样字符串值就会被传递给工作线程的入口函数。端口名在当前用户上下文中应该是唯一的;否则，您可能会遇到冲突。

清单 3-17 将 `Core Foundation` 消息端口附加到新线程

```objc
#define kThreadStackSize        (8 *4096)

OSStatus MySpawnThread()
{
    // Create a local port for receiving responses.
    CFStringRef myPortName;
    CFMessagePortRef myPort;
    CFRunLoopSourceRef rlSource;
    CFMessagePortContext context = {0, NULL, NULL, NULL, NULL};
    Boolean shouldFreeInfo;

    // Create a string with the port name.
    myPortName = CFStringCreateWithFormat(NULL, NULL, CFSTR("com.myapp.MainThread"));

    // Create the port.
    myPort = CFMessagePortCreateLocal(NULL,
                myPortName,
                &MainThreadResponseHandler,
                &context,
                &shouldFreeInfo);

    if (myPort != NULL)
    {
        // The port was successfully created.
        // Now create a run loop source for it.
        rlSource = CFMessagePortCreateRunLoopSource(NULL, myPort, 0);

        if (rlSource)
        {
            // Add the source to the current run loop.
            CFRunLoopAddSource(CFRunLoopGetCurrent(), rlSource, kCFRunLoopDefaultMode);

            // Once installed, these can be freed.
            CFRelease(myPort);
            CFRelease(rlSource);
        }
    }

    // Create the thread and continue processing.
    MPTaskID        taskID;
    return(MPCreateTask(&ServerThreadEntryPoint,
                    (void*)myPortName,
                    kThreadStackSize,
                    NULL,
                    NULL,
                    NULL,
                    0,
                    &taskID));
}
```

安装了端口并启动了线程后，主线程可以在等待线程`checkin`的同时继续正常执行。当`checkin`消息到达时，它被分配给主线程的 `MainThreadResponseHandler` 函数，如清单 3-18 所示。这个函数提取 `worker` 线程的端口名，并为将来的通信创建一个管道。

清单 3-18 接收 `checkin` 消息

```objc
#define kCheckinMessage 100

// Main thread port message handler
CFDataRef MainThreadResponseHandler(CFMessagePortRef local,
                    SInt32 msgid,
                    CFDataRef data,
                    void* info)
{
    if (msgid == kCheckinMessage)
    {
        CFMessagePortRef messagePort;
        CFStringRef threadPortName;
        CFIndex bufferLength = CFDataGetLength(data);
        UInt8* buffer = CFAllocatorAllocate(NULL, bufferLength, 0);

        CFDataGetBytes(data, CFRangeMake(0, bufferLength), buffer);
        threadPortName = CFStringCreateWithBytes (NULL, buffer, bufferLength, kCFStringEncodingASCII, FALSE);

        // You must obtain a remote message port by name.
        messagePort = CFMessagePortCreateRemote(NULL, (CFStringRef)threadPortName);

        if (messagePort)
        {
            // Retain and save the thread’s comm port for future reference.
            AddPortToListOfActiveThreads(messagePort);

            // Since the port is retained by the previous function, release
            // it here.
            CFRelease(messagePort);
        }

        // Clean up.
        CFRelease(threadPortName);
        CFAllocatorDeallocate(NULL, buffer);
    }
    else
    {
        // Process other messages.
    }

    return NULL;
}
```

配置好主线程后，剩下的事情就是让新创建的工作线程创建自己的端口并`checkin`。清单 3-19 显示了工作线程的入口点函数。该函数提取主线程的端口名，并使用它创建一个返回主线程的远程连接。然后，该函数为自己创建一个本地端口，在线程的运行循环中安装该端口，并向主线程发送包含本地端口名称的`checkin`消息。

清单 3-19 设置线程结构

```objc
OSStatus ServerThreadEntryPoint(void* param)
{
    // Create the remote port to the main thread.
    CFMessagePortRef mainThreadPort;
    CFStringRef portName = (CFStringRef)param;

    mainThreadPort = CFMessagePortCreateRemote(NULL, portName);

    // Free the string that was passed in param.
    CFRelease(portName);

    // Create a port for the worker thread.
    CFStringRef myPortName = CFStringCreateWithFormat(NULL, NULL, CFSTR("com.MyApp.Thread-%d"), MPCurrentTaskID());

    // Store the port in this thread’s context info for later reference.
    CFMessagePortContext context = {0, mainThreadPort, NULL, NULL, NULL};
    Boolean shouldFreeInfo;
    Boolean shouldAbort = TRUE;

    CFMessagePortRef myPort = CFMessagePortCreateLocal(NULL,
                myPortName,
                &ProcessClientRequest,
                &context,
                &shouldFreeInfo);

    if (shouldFreeInfo)
    {
        // Couldn't create a local port, so kill the thread.
        MPExit(0);
    }

    CFRunLoopSourceRef rlSource = CFMessagePortCreateRunLoopSource(NULL, myPort, 0);
    if (!rlSource)
    {
        // Couldn't create a local port, so kill the thread.
        MPExit(0);
    }

    // Add the source to the current run loop.
    CFRunLoopAddSource(CFRunLoopGetCurrent(), rlSource, kCFRunLoopDefaultMode);

    // Once installed, these can be freed.
    CFRelease(myPort);
    CFRelease(rlSource);

    // Package up the port name and send the check-in message.
    CFDataRef returnData = nil;
    CFDataRef outData;
    CFIndex stringLength = CFStringGetLength(myPortName);
    UInt8* buffer = CFAllocatorAllocate(NULL, stringLength, 0);

    CFStringGetBytes(myPortName,
                CFRangeMake(0,stringLength),
                kCFStringEncodingASCII,
                0,
                FALSE,
                buffer,
                stringLength,
                NULL);

    outData = CFDataCreate(NULL, buffer, stringLength);

    CFMessagePortSendRequest(mainThreadPort, kCheckinMessage, outData, 0.1, 0.0, NULL, NULL);

    // Clean up thread data structures.
    CFRelease(outData);
    CFAllocatorDeallocate(NULL, buffer);

    // Enter the run loop.
    CFRunLoopRun();
}
```

一旦它进入运行循环，所有未来发送到线程端口的事件都将由 `ProcessClientRequest` 函数处理。该函数的实现取决于线程所做的工作类型，这里没有显示。

---

引用: [Run Loops](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/Multithreading/RunLoopManagement/RunLoopManagement.html#//apple_ref/doc/uid/10000057i-CH16-SW1)
