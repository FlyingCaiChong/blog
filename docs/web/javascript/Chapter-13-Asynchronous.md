---
title: 第十三章 异步 JavaScript
---

# 异步 JavaScript

[[toc]]

Some computer programs, such as scientific simulations and machine learning models, are compute-bound: they run continuously, without pause, until they have computed their result. Most real-world computer programs, however, are significantly asynchronous. This means that they often have to stop computing while waiting for data to arrive or for some event to occur. JavaScript programs in a web browser are typically event-driven, meaning that they wait for the user to click or tap before they actually do anything. And JavaScript-based servers typically wait for client requests to arrive over the network before they do anything.

::: tip 翻译
一些计算机程序，例如科学模拟和机器学习模型，是受计算限制的：它们不间断地连续运行，直到计算出结果。 然而，大多数现实世界的计算机程序都是明显异步的。 这意味着他们通常必须在等待数据到达或某些事件发生时停止计算。 Web 浏览器中的 JavaScript 程序通常是事件驱动的，这意味着它们在实际执行任何操作之前等待用户单击或点击。 基于 JavaScript 的服务器通常会等待客户端的网络请求到达，然后再执行任何操作。
:::

This kind of asynchronous programming is commonplace in JavaScript, and this chapter documents three important language features that help make it easier to work with asynchronous code. Promises, new in ES6, are objects that represent the not-yet available result of an asynchronous operation. The keywords `async` and `await` were introduced in ES2017 and provide new syntax that simplifies asynchronous programming by allowing you to structure your Promise-based code as if it was synchronous. Finally, asynchronous iterators and the `for/await` loop were introduced in ES2018 and allow you to work with streams of asynchronous events using simple loops that appear synchronous.

::: tip 翻译
这种异步编程在 JavaScript 中很常见，本章介绍了三个重要的语言功能，这些功能有助于更轻松地使用异步代码。 Promise 是 ES6 中的新增内容，它是表示异步操作尚不可用时的结果的对象。 ES2017 中引入了关键字 `async` 和 `await`，它们提供了新的语法，允许您像同步一样构建基于 Promise 的代码，从而简化异步编程。 最后，ES2018 中引入了异步迭代器和 `for/await` 循环，允许您使用看似同步的简单循环来处理异步事件流。
:::

Ironically, even though JavaScript provides these powerful features for working with asynchronous code, there are no features of the core language that are themselves asynchronous. In order to demonstrate Promises, `async`, `await`, and `for/await`, therefore, we will first take a detour into client-side and server-side JavaScript to explain some of the asynchronous features of web browsers and Node. (You can learn more about client-side and server-side JavaScript in **Chapters 15 and 16**.)

::: tip
讽刺的是，尽管 JavaScript 提供了这些用于处理异步代码的强大功能，但核心语言本身并没有异步功能。 因此，为了演示 `Promises`、`async`、`await` 和 `for/await`，我们将首先绕道客户端和服务器端的 JavaScript，来解释 Web 浏览器和 Node 的一些异步功能 。 （您可以在[第 15 章](./Chapter-15-Web_Browsers.md)和[第 16 章](./Chapter-16-Server_side.md)中了解有关客户端和服务器端 JavaScript 的更多信息。）
:::

## 使用回调的异步编程

At its most fundamental level, asynchronous programming in JavaScript is done with `callbacks`. A callback is a function that you write and then pass to some other function. That other function then invokes (“calls back”) your function when some condition is met or some (asynchronous) event occurs. The invocation of the callback function you provide notifies you of the condition or event, and sometimes, the invocation will include function arguments that provide additional details. This is easier to understand with some concrete examples, and the subsections that follow demonstrate various forms of callback-based asynchronous programming using both client side JavaScript and Node.

::: tip 翻译
在最基本的层面上，JavaScript 中的异步编程是通过 `callbacks` 完成的。 回调是您编写然后传递给其他函数的函数。 然后，当满足某些条件或发生某些（异步）事件时，另一个函数会调用（“回调”）您的函数。 您提供的回调函数的调用会通知您条件或事件，有时，调用将包含提供其他详细信息的函数参数。 通过一些具体示例可以更容易地理解这一点，接下来的小节将演示使用客户端 JavaScript 和 Node.js 的各种形式的基于回调的异步编程。
:::

### 定时器

One of the simplest kinds of asynchrony is when you want to run some code after a certain amount of time has elapsed. As we saw in **§11.10**, you can do this with the `setTimeout()` function:

::: tip 翻译
最简单的异步之一是当您想要在一段时间过去后运行某些代码时。 正如我们在 **§11.10** 中看到的，您可以使用 `setTimeout()` 函数来执行此操作：
:::

```js
setTimeout(checkForUpdates, 60000);
```

The first argument to `setTimeout()` is a function and the second is a time interval measured in milliseconds. In the preceding code, a hypothetical `checkForUpdates()` function will be called 60,000 milliseconds (1 minute) after the `setTimeout()` call. `checkForUpdates()` is a callback function that your program might define, and `setTimeout()` is the function that you invoke to register your callback function and specify under what asynchronous conditions it should be invoked.

::: tip 翻译
`setTimeout()`的第一个参数是一个函数， 第二个参数是一个时间间隔， 单位是毫秒。在前面的代码中，`checkForUpdate()`函数将在`setTimeout()`调用后 60,000 毫秒（1 分钟）被调用。`checkForUpdates()`函数是您的程序可能定义的回调函数，`setTimeout()`是您用来注册回调函数，并指定在哪些异步条件下它应该被调用的函数。
:::

`setTimeout()` calls the specified callback function one time, passing no arguments, and then forgets about it. If you are writing a function that really does check for updates, you probably want it to run repeatedly. You can do this by using `setInterval()` instead of `setTimeout()`:

::: tip 翻译
`setTimeout()` 调用指定的回调函数一次，不传递任何参数，然后就忘记它。 如果您正在编写一个确实检查更新的函数，您可能希望它重复运行。 您可以使用 `setInterval()` 而不是 `setTimeout()` 来完成此操作：
:::

```js
// 一分钟后调用 checkForUpdates，然后再每隔一分钟调用一次
let updateIntervalId = setInterval(checkForUpdates, 60000);

// setInterval() 会返回一个值， 我们可以使用该值通过调用 clearInterval() 来停止重复的调用。
// （类似的， setTimeout() 会返回一个值， 你可以将其传递给 clearTimeout()）
function stopCheckingForUpdates() {
  clearInterval(updateIntervalId);
}
```

### 事件

Client-side JavaScript programs are almost universally event driven: rather than running some kind of predetermined computation, they typically wait for the user to do something and then respond to the user’s actions. The web browser generates an `event` when the user presses a key on the keyboard, moves the mouse, clicks a mouse button, or touches a touchscreen device. Event-driven JavaScript programs register callback functions for specified types of events in specified contexts, and the web browser invokes those functions whenever the specified events occur. These callback functions are called `event handlers` or `event listeners`, and they are registered with `addEventListener()`:

::: tip 翻译
客户端 JavaScript 程序几乎都是事件驱动的：它们通常等待用户执行某些操作，然后响应用户的操作，而不是运行某种预定的计算。 当用户按下键盘上的按键、移动鼠标、单击鼠标按钮或触摸触摸屏设备时，Web 浏览器会生成“事件”。 事件驱动的 JavaScript 程序在指定的上下文中为指定类型的事件注册回调函数，并且每当指定的事件发生时，Web 浏览器就会调用这些函数。 这些回调函数称为“事件处理程序”或“事件监听器”，它们通过 `addEventListener()` 注册：
:::

```js
// 获取 HTML <button> 元素
let okay = document.querySelector("#confirmUpdateDialog button.okay");

// 注册一个回调方法，当用户点击按钮时， 会调用此方法
okay.addEventListener("click", applyUpdate);
```

In this example, `applyUpdate()` is a hypothetical callback function that we assume is implemented somewhere else. The call to `document.querySelector()` returns an object that represents a single specified element in the web page. We call `addEventListener()` on that element to register our callback. Then the first argument to `addEventListener()` is a string that specifies the kind of event we’re interested in—a mouse click or touchscreen tap, in this case. If the user clicks or taps on that specific element of the web page, then the browser will invoke our `applyUpdate()` callback function, passing an object that includes details (such as the time and the mouse pointer coordinates) about the event.

::: tip 翻译
在这个例子中，`applyUpdate()` 是一个假设的回调函数，我们假设它是在其他地方实现的。 对 `document.querySelector()` 的调用返回一个表示网页中单个指定元素的对象。 我们在该元素上调用 `addEventListener()` 来注册我们的回调函数。 然后 `addEventListener()` 的第一个参数是一个字符串，它指定我们感兴趣的事件类型 - 在本例中是鼠标单击或触摸屏点击。 如果用户单击或点击网页的特定元素，则浏览器将调用我们的 `applyUpdate()` 回调函数，并将一个包含有关该事件的详细信息（例如时间和鼠标指针坐标）的对象作为参数传递给回调函数。
:::

### 网络事件

Another common source of asynchrony in JavaScript programming is network requests. JavaScript running in the browser can fetch data from a web server with code like this:

::: tip 翻译
JavaScript 编程中异步的另一个常见来源是网络请求。 浏览器中运行的 JavaScript 可以使用如下代码从 Web 服务器获取数据：
:::

```js
function getCurrentVersionNumber(versionCallback) {
  // 注意回调参数
  // 创建一个脚本化 HTTP 请求用于向后端版本 API 发出请求
  let request = new XMLHttpRequest();
  request.open("GET", "http://www.example.com/api/version");
  request.send();

  // 注册一个回调函数，当服务器响应到达时会被调用
  request.onload = function () {
    if (request.status === 200) {
      // 如果 HTTP 状态是好的，获取版本号并调用回调函数
      let currentVersion = parseFloat(request.responseText);
      versionCallback(null, currentVersion);
    } else {
      // 否则调用回调函数报告错误
      versionCallback(response.statusText, null);
    }
  };
  // 注册另一个回调函数，用于处理网络错误
  request.onerror = request.ontimeout = function (e) {
    versionCallback(e.type, null);
  };
}
```

Client-side JavaScript code can use the `XMLHttpRequest` class plus callback functions to make HTTP requests and asynchronously handle the server’s response when it arrives. The `getCurrentVersionNumber()` function defined here (we can imagine that it is used by the hypothetical `checkForUpdates()` function we discussed in **§13.1.1**) makes an HTTP request and defines event handlers that will be invoked when the server’s response is received or when a timeout or other error causes the request to fail.

::: tip 翻译
客户端 JavaScript 代码可以使用 `XMLHttpRequest`类加上回调函数来发出 HTTP 请求，并在服务器响应到达时，异步处理该响应。 此处定义的 `getCurrentVersionNumber()` 函数（我们可以想象它由我们在 **§13.1.1** 中讨论的假设的 `checkForUpdates()` 函数）发出 HTTP 请求并定义将被调用的事件处理程序，该事件处理程序会当收到服务器的响应时、或者超时、或其他错误导致请求失败时会被调用。
:::

Notice that the code example above does not call `addEventListener()` as our previous example did. For most web APIs (including this one), event handlers can be defined by invoking `addEventListener()` on the object generating the event and passing the name of the event of interest along with the callback function. Typically, though, you can also register a single event listener by assigning it directly to a property of the object. That is what we do in this example code, assigning functions to the `onload`, `onerror`, and `ontimeout` properties. By convention, event listener properties like these always have names that begin with on. `addEventListener()` is the more flexible technique because it allows for multiple event handlers. But in cases where you are sure that no other code will need to register a listener for the same object and event type, it can be simpler to simply set the appropriate property to your callback.

::: tip 翻译
请注意，上面的代码示例没有像我们之前的示例那样调用 `addEventListener()`。 对于大多数 Web API（包括此 API），可以通过在生成事件的对象上调用 `addEventListener()` 并传递感兴趣的事件名称和回调函数来定义事件处理程序。 不过，通常情况下，您还可以通过将单个事件侦听器直接分配给对象的属性来注册它。 这就是我们在示例代码中所做的，将函数分配给 `onload`、`onerror`和 `ontimeout`属性。 按照约定，此类事件侦听器属性的名称始终以 on 开头。 `addEventListener()` 是更灵活的技术，因为它允许多个事件处理程序。 但是，如果您确定没有其他代码需要为相同的对象和事件类型注册侦听器，则只需为回调设置适当的属性可能会更简单。
:::

Another thing to note about the `getCurrentVersionNumber()` function in this example code is that, because it makes an asynchronous request, it cannot synchronously return the value (the current version number) that the caller is interested in. Instead, the caller passes a callback function, which is invoked when the result is ready or when an error occurs. In this case, the caller supplies a callback function that expects two arguments. If the `XMLHttpRequest` works correctly, then `getCurrentVersionNumber()` invokes the callback with a null first argument and the version number as the second argument. Or, if an error occurs, then `getCurrentVersionNumber()` invokes the callback with error details in the first argument and null as the second argument.

::: tip 翻译
关于此示例代码中的 `getCurrentVersionNumber()` 函数，另一个需要注意的是，由于它是一个异步请求，因此它无法同步返回调用者感兴趣的值（当前版本号）。相反，调用者传递一个回调函数，当结果准备好或发生错误时被调用。 在这种情况下，调用者提供一个需要两个参数的回调函数。 如果 `XMLHttpRequest` 工作正常，则 `getCurrentVersionNumber()`将调用回调函数，第一个参数是`null`， 第二个参数是版本号。 或者，如果发生错误，则 `getCurrentVersionNumber()` 将调用回调函数，第一个参数包含错误详细信息，第二个参数为 `null`。
:::

### Node 中的回调和事件

The Node.js server-side JavaScript environment is deeply asynchronous and defines many APIs that use callbacks and events. The default API for reading the contents of a file, for example, is asynchronous and invokes a callback function when the contents of the file have been read:

::: tip 翻译
Node.js 服务器端 JavaScript 环境是深度异步的，并定义了许多使用回调和事件的 API。 例如，用于读取文件内容的默认 API 是异步的，并在读取文件内容时调用回调函数：
:::

```js
const fs = require("fs"); // 'fs'模块具有与文件系统相关的 API
let options = {
  // 为我们的程序保存选项的对象
  // 默认选项将在此处
};

// 读取一个配置文件，然后调用回调函数
fs.readFile("config.json", "utf-8", (err, text) => {
  if (err) {
    // 如果有错误，显示警告，但继续
    console.warn("Could not read config file:", err);
  } else {
    // 否则，解析文件内容并将其分配给选项对象
    Object.assign(options, JSON.parse(text));
  }

  // 无论哪种情况，我们现在都可以开始运行程序
  startProgram(options);
});
```

Node’s `fs.readFile()` function takes a two-parameter callback as its last argument. It reads the specified file asynchronously and then invokes the callback. If the file was read successfully, it passes the file contents as the second callback argument. If there was an error, it passes the error as the first callback argument. In this example, we express the callback as an arrow function, which is a succinct and natural syntax for this kind of simple operation.

::: tip 翻译
Node 的 `fs.readFile()` 函数采用两个参数的回调函数作为其最后一个参数。 它异步读取指定的文件，然后调用回调函数。 如果文件读取成功，它将文件内容作为第二个回调参数传递。 如果出现错误，它将错误作为第一个回调参数传递。 在这个例子中，我们将回调函数表示为箭头函数，对于这种简单的操作来说，这是一种简洁自然的语法。
:::

Node also defines a number of event-based APIs. The following function shows how to make an HTTP request for the contents of a URL in Node. It has two layers of asynchronous code handled with event listeners. Notice that Node uses an `on()` method to register event listeners instead of `addEventListener()`:

::: tip 翻译
Node 还定义了许多基于事件的 API。 以下函数展示了如何对 Node.js 中的 URL 内容发出 HTTP 请求。 它有两层异步代码，由事件侦听器处理。 请注意，Node 使用 `on()` 方法来注册事件监听器，而不是 `addEventListener()`：
:::

```js
const https = require("https");

// 读取URL的文本内容，并异步地将其传递给回调函数
function getText(url, callback) {
  // 开始 HTTP GET 请求
  request = https.get(url);

  // 注册一个函数来处理响应事件
  request.on("response", (response) => {
    // 响应事件意味着已经收到响应头
    let httpStatus = response.statusCode;
    // 尚未收到 HTTP 响应的正文。
    // 因此我们注册更多的事件回调，以便在它到达时被调用
    response.setEncoding("utf-8"); // 设置 Unicode 文本
    let body = ""; // 我们将在这里积累。

    // 当body块准备就绪时，将调用此事件处理程序
    response.on("data", (chunk) => {
      body += chunk;
    });

    // 当响应完成是， 将调用此事件处理程序
    response.on("end", () => {
      if (httpStatus === 200) {
        // 如果HTTP响应是好的
        callback(null, body); // 将响应正文传递给回调函数
      } else {
        // 否则，将状态码传递给回调函数
        callback(httpStatus, null);
      }
    });
  });

  // 我们还为较低级别的网络错误注册了一个事件处理程序
  request.on("error", (err) => {
    callback(err, null);
  });
}
```

## Promises

Now that we’ve seen examples of callback and event-based asynchronous programming in client-side and server-side JavaScript environments, we can introduce Promises, a core language feature designed to simplify asynchronous programming.

::: tip 翻译
现在我们已经看到了客户端和服务器端 JavaScript 环境中回调和基于事件的异步编程的示例，我们可以介绍 Promises，这是一种旨在简化异步编程的核心语言功能。
:::

A Promise is an object that represents the result of an asynchronous computation. That result may or may not be ready yet, and the Promise API is intentionally vague about this: there is no way to synchronously get the value of a Promise; you can only ask the Promise to call a callback function when the value is ready. If you are defining an asynchronous API like the `getText()` function in the previous section, but want to make it Promise-based, omit the callback argument, and instead return a Promise object. The caller can then register one or more callbacks on this Promise object, and they will be invoked when the asynchronous computation is done.

::: tip 翻译
Promise 是一个表示异步计算结果的对象。 这个结果可能已经准备好，也可能还没有准备好，Promise API 故意对此含糊其辞：没有办法同步获取 Promise 的值； 你只能要求 Promise 在值准备好时调用回调函数。 如果您正在定义一个异步 API，如上一节中的`getText()`函数，但希望使其基于 Promise，请省略回调参数，而是返回一个 Promise 对象。 然后，调用者可以在此 Promise 对象上注册一个或多个回调，并在异步计算完成时调用它们。
:::

So, at the simplest level, Promises are just a different way of working with callbacks. However, there are practical benefits to using them. One real problem with callback based asynchronous programming is that it is common to end up with callbacks inside callbacks inside callbacks, with lines of code so highly indented that it is difficult to read. Promises allow this kind of nested callback to be re-expressed as a more linear `Promise chain` that tends to be easier to read and easier to reason about.

::: tip 翻译
因此，从最简单的角度来看，Promise 只是使用回调的一种不同方式。 然而，使用它们有实际的好处。 基于回调的异步编程的一个真正问题是，通常最终会在回调内回调，并且代码行高度缩进以至于难以阅读。 Promise 允许这种嵌套回调被重新表达为更线性的 `Promise chain`，它往往更容易阅读和理解。
:::

Another problem with callbacks is that they can make handling errors difficult. If an asynchronous function (or an asynchronously invoked callback) throws an exception, there is no way for that exception to propagate back to the initiator of the asynchronous operation. This is a fundamental fact about asynchronous programming: it breaks exception handling. The alternative is to meticulously track and propagate errors with callback arguments and return values, but this is tedious and difficult to get right. Promises help here by standardizing a way to handle errors and providing a way for errors to propagate correctly through a chain of promises.

::: tip 翻译
回调的另一个问题是它们会使处理错误变得困难。 如果异步函数（或异步调用的回调）抛出一个异常，则该异常无法传播回异步操作的发起者。 这是异步编程的一个基本事实：它破坏了异常处理。 另一种方法是使用回调参数和返回值来仔细跟踪和传播错误，但这很乏味且难以正确执行。 Promise 在这里提供了帮助，它标准化了一种处理错误的方法，并提供了一种通过 Promise 链正确传播错误的方法。
:::

Note that Promises represent the future results of single asynchronous computations. They cannot be used to represent repeated asynchronous computations, however. Later in this chapter, we’ll write a Promise-based alternative to the `setTimeout()` function, for example. But we can’t use Promises to replace `setInterval()` because that function invokes a callback function repeatedly, which is something that Promises are just not designed to do. Similarly, we could use a Promise instead of the “load” event handler of an `XMLHttpRequest` object, since that callback is only ever called once. But we typically would not use a Promise in place of a “click” event handler of an HTML button object, since we normally want to allow the user to click a button multiple times.

::: tip 翻译
请注意，Promise 代表单个异步计算的未来结果。 然而，它们不能用于表示重复的异步计算。 例如，在本章后面，我们将编写一个基于 Promise 的 `setTimeout()` 函数替代方案。 但我们不能使用 Promises 来替换 `setInterval()`，因为该函数会重复调用回调函数，而 Promises 的设计初衷并不是这样做。 类似地，我们可以使用 Promise 代替 `XMLHttpRequest` 对象的 `load` 事件处理程序，因为该回调仅被调用一次。 但我们通常不会使用 Promise 来代替 HTML 按钮对象的“单击”事件处理程序，因为我们通常希望允许用户多次单击按钮。
:::

The subsections that follow will:

- Explain Promise terminology and show basic Promise usage
- Show how promises can be chained
- Demonstrate how to create your own Promise-based APIs

::: tip 翻译
以下小节将：

- 解释 Promise 术语并展示 Promise 的基本用法
- 展示如何链接 Promise
- 演示如何创建您自己的基于 Promise 的 API
  :::

> Promises seem simple at first, and the basic use case for Promises is, in fact, straightforward and simple. But they can become surprisingly confusing for anything beyond the simplest use cases. Promises are a powerful idiom for asynchronous programming, but you need to understand them deeply to use them correctly and confidently. It is worth taking the time to develop that deep understanding, however, and I urge you to study this long chapter carefully.

> Promise 乍一看似乎很简单，而且 Promise 的基本用例实际上是简单明了的。 但除了最简单的用例之外，它们可能会变得令人惊讶地令人困惑。 Promise 是异步编程的一个强大的习惯用法，但您需要深入理解它们，才能正确、自信地使用它们。 然而，花时间来加深理解是值得的，我强烈建议您仔细研究这一长章。

### 使用 Promises

With the advent of Promises in the core JavaScript language, web browsers have begun to implement Promise-based APIs. In the previous section, we implemented a `getText()` function that made an asynchronous HTTP request and passed the body of the HTTP response to a specified callback function as a string. Imagine a variant of this function, `getJSON()`, which parses the body of the HTTP response as JSON and returns a Promise instead of accepting a callback argument. We will implement a `getJSON()` function later in this chapter, but for now, let’s look at how we would use this Promise-returning utility function:

::: tip 翻译
随着核心 JavaScript 语言中 Promise 的出现，Web 浏览器已经开始实现基于 Promise 的 API。 在上一节中，我们实现了一个`getText()` 函数，该函数发出异步 HTTP 请求，并将 HTTP 响应正文作为字符串传递给指定的回调函数。 想象一下这个函数的一个变体 `getJSON()`，它将 HTTP 响应的正文解析为 JSON 并返回一个 Promise，而不是接受回调参数。 我们将在本章后面实现一个 `getJSON()` 函数，但现在让我们看看如何使用这个 Promise 返回实用函数：
:::

```js
getJSON(url).then((jsonData) => {
  // 这是一个回调函数，当解析的 JSON 值可用时，将使用该函数异步调用该函数。
});
```

`getJSON()` starts an asynchronous HTTP request for the URL you specify and then, while that request is pending, it returns a Promise object. The Promise object defines a `then()` instance method. Instead of passing our callback function directly to `getJSON()`, we instead pass it to the `then()` method. When the HTTP response arrives, the body of that response is parsed as JSON, and the resulting parsed value is passed to the function that we passed to `then()`.

::: tip 翻译
`getJSON()` 为您指定的 URL 启动一个异步 HTTP 请求，然后，当该请求处于待处理状态时，它会返回一个 Promise 对象。 Promise 对象定义了一个 `then()` 实例方法。 我们没有将回调函数直接传递给 `getJSON()`，而是将其传递给 `then()` 方法。 当 HTTP 响应到达时，该响应的正文被解析为 JSON，并将解析后的结果值传递给我们传递给`then()`的函数。
:::

You can think of the `then()` method as a callback registration method like the `addEventListener()` method used for registering event handlers in client-side JavaScript. If you call the `then()` method of a Promise object multiple times, each of the functions you specify will be called when the promised computation is complete.

::: tip 翻译
您可以将 `then()` 方法视为回调注册方法，就像用于在客户端 JavaScript 中注册事件处理程序的 `addEventListener()` 方法一样。 如果多次调用 Promise 对象的 `then()` 方法，则当承诺的计算完成时，将调用您指定的每个函数。
:::

Unlike many event listeners, though, a Promise represents a single computation, and each function registered with `then()` will be invoked only once. It is worth noting that the function you pass to `then()` is invoked asynchronously, even if the asynchronous computation is already complete when you call `then()`.

::: tip 翻译
但与许多事件侦听器不同的是，Promise 代表单个计算，并且使用 `then()` 注册的每个函数将仅被调用一次。 值得注意的是，传递给 `then()` 的函数是异步调用的，即使在调用 `then()` 时异步计算已经完成。
:::

At a simple syntactical level, the `then()` method is the distinctive feature of Promises, and it is idiomatic to append `.then()` directly to the function invocation that returns the Promise, without the intermediate step of assigning the Promise object to a variable.

::: tip 翻译
从简单的语法层面上说，`then()` 方法是 Promise 的一个独特特性，并且惯用的做法是直接将 `.then()` 附加到返回 Promise 的函数调用中，而不需要将 Promise 对象分配给一个变量作为中间步骤。
:::

It is also idiomatic to name functions that return Promises and functions that use the results of Promises with verbs, and these idioms lead to code that is particularly easy to read:

::: tip 翻译
习惯上，命名返回 Promise 的函数和使用 Promise 结果的函数时使用动词，这些习惯使得代码特别易读。
:::

```js
// 假设您有一个这样的函数来显示用户个人资料
function displayUserProfile(profile) {
  /* implementation omitted */
}

// 以下是您如何使用带有 Promise 的函数。
// 请注意这行代码读起来几乎就像英语句子：
getJSON("/api/user/profile").then(displayUserProfile);
```

#### 使用 Promises 处理错误

Asynchronous operations, particularly those that involve networking, can typically fail in a number of ways, and robust code has to be written to handle the errors that will inevitably occur.

::: tip 翻译
异步操作，特别是那些涉及网络的操作，通常会以多种方式失败，并且必须编写健壮的代码来处理不可避免发生的错误。
:::

For Promises, we can do this by passing a second function to the `then()` method:

::: tip 翻译
对于 Promise，我们可以通过将第二个函数传递给 `then()` 方法来做到这一点：
:::

```js
getJSON("/api/user/profile").then(displayUserProfile, handleProfileError);
```

A Promise represents the future result of an asynchronous computation that occurs after the Promise object is created. Because the computation is performed after the Promise object is returned to us, there is no way that the computation can traditionally return a value or throw an exception that we can catch. The functions that we pass to `then()` provide alternatives. When a synchronous computation completes normally, it simply returns its result to its caller. When a Promise-based asynchronous computation completes normally, it passes its result to the function that is the first argument to `then()`.

::: tip 翻译
Promise 表示创建 Promise 对象后发生的异步计算的未来结果。 因为计算是在 Promise 对象返回给我们之后执行的，所以传统上计算无法返回值或抛出我们可以捕获的异常。 我们传递给 `then()` 的函数提供了替代方案。 当同步计算正常完成时，它只是将结果返回给调用者。 当基于 Promise 的异步计算正常完成时，它将其结果传递给作为 `then()` 的第一个参数的函数。
:::

When something goes wrong in a synchronous computation, it throws an exception that propagates up the call stack until there is a `catch` clause to handle it. When an asynchronous computation runs, its caller is no longer on the stack, so if something goes wrong, it is simply not possible to throw an exception back to the caller.

::: tip 翻译
当同步计算中出现问题时，它会抛出一个异常，该异常会在调用堆栈中向上传播，直到有 `catch` 子句来处理它。 当异步计算运行时，其调用者不再位于堆栈上，因此如果出现问题，根本不可能将异常抛出回调用者。
:::

Instead, Promise-based asynchronous computations pass the exception (typically as an `Error` object of some kind, though this is not required) to the second function passed to `then()`. So, in the code above, if `getJSON()` runs normally, it passes its result to `displayUserProfile()`. If there is an error (the user is not logged in, the server is down, the user’s internet connection dropped, the request timed out, etc.), then `getJSON()` passes an Error object to `handleProfileError()`.

::: tip 翻译
相反，基于 Promise 的异步计算将异常（通常作为某种“Error”对象，尽管这不是必需的）传递给 `then()` 的第二个函数。 因此，在上面的代码中，如果 `getJSON()` 正常运行，它将其结果传递给 `displayUserProfile()`。 如果出现错误（用户未登录、服务器关闭、用户的互联网连接断开、请求超时等），则 `getJSON()` 会将 Error 对象传递给 `handleProfileError()`。
:::

In practice, it is rare to see two functions passed to `then()`. There is a better and more idiomatic way of handling errors when working with Promises. To understand it, first consider what happens if `getJSON()` completes normally but an error occurs in `displayUserProfile()`. That callback function is invoked asynchronously when `getJSON()` returns, so it is also asynchronous and cannot meaningfully throw an exception (because there is no code on the call stack to handle it).

::: tip 翻译
在实践中，很少看到两个函数传递给 `then()`。 使用 Promises 时，有一种更好、更惯用的方法来处理错误。 要理解它，首先考虑如果 `getJSON()` 正常完成但 `displayUserProfile()` 发生错误会发生什么。 当 `getJSON()` 返回时，该回调函数被异步调用，因此它也是异步的，并且不能有意义地抛出异常（因为调用堆栈上没有代码来处理它）。
:::

The more idiomatic way to handle errors in this code looks like this:

::: tip 翻译
处理此代码中的错误的更惯用的方法如下所示：
:::

```js
getJSON("/api/user/profile").then(displayUserProfile).catch(handleProfileError);
```

With this code, a normal result from `getJSON()` is still passed to `displayUserProfile()`, but any error in `getJSON()` or in `displayUserProfile()` (including any exceptions thrown by `displayUserProfile`) get passed to `handleProfileError()`. The `catch()` method is just a shorthand for calling `then()` with a null first argument and the specified error handler function as the second argument.

::: tip 翻译
使用此代码，`getJSON()` 的正常结果仍会传递给 `displayUserProfile()`，但 `getJSON()` 或 `displayUserProfile()`中的任何错误（包括 `displayUserProfile` 引发的任何异常）都会被获取并传递给 `handleProfileError()`。 `catch()` 方法只是调用 `then()` 的简写，第一个参数为空，第二个参数为指定的错误处理函数。
:::

We’ll have more to say about `catch()` and this error-handling idiom when we discuss Promise chains in the next section.

::: tip 翻译
当我们在下一节中讨论 Promise 链时，我们将更多地讨论 `catch()` 和这个错误处理习惯用法。
:::

##### Promise 术语

Before we discuss Promises further, it is worth pausing to define some terms. When we are not programming and we talk about human promises, we say that a promise is “kept” or “broken.” When discussing JavaScript Promises, the equivalent terms are “fulfilled” and “rejected.” Imagine that you have called the `then()` method of a Promise and have passed two callback functions to it. We say that the promise has been `fulfilled` if and when the first callback is called. And we say that the Promise has been `rejected` if and when the second callback is called. If a Promise is neither `fulfilled` nor `rejected`, then it is `pending`. And once a promise is `fulfilled` or `rejected`, we say that it is `settled`. Note that a Promise can never be both `fulfilled` and `rejected`. Once a Promise settles, it will never change from `fulfilled` to `rejected` or vice versa.

::: tip 翻译
在我们进一步讨论 Promise 之前，值得停下来定义一些术语。 当我们不编程时，在谈论人类的承诺时，我们说承诺是“遵守”或“打破”的。 在讨论 JavaScript Promise 时，等效术语是“履行”和“拒绝”。 想象一下，您调用了 Promise 的 `then()`方法，并向其传递了两个回调函数。 如果调用第一个回调，我们就说承诺已经 `fulfilled`。 如果调用第二个回调，我们就说 Promise 已被 `rejected`。 如果 Promise 既不是 `fulfilled` 也不是 `rejected`，那么它就是 `pending`。 一旦 Promise 是 `fulfilled` 或 `rejected`，我们就说它 `settled`。 请注意，Promise 永远不能同时 `fulfilled` 和 `rejected`。 一旦 Promise `settled`，它就永远不会从 `fulfilled` 变为 `rejected`，反之亦然。
:::

Remember how we defined Promises at the start of this section: “a Promise is an object that represents the `result` of an asynchronous operation.” It is important to remember that Promises are not just abstract ways registering callbacks to run when some async code finishes—they represent the results of that async code. If the async code runs normally (and the Promise is `fulfilled`), then that result is essentially the return value of the code. And if the async code does not complete normally (and the Promise is `rejected`), then the result is an Error object or some other value that the code might have thrown if it was not asynchronous. Any Promise that has settled has a value associated with it, and that value will not change. If the Promise is `fulfilled`, then the value is a return value that gets passed to any callback functions registered as the first argument of `then()`. If the Promise is `rejected`, then the value is an error of some sort that is passed to any callback functions registered with `catch()` or as the second argument of `then()`.

::: tip 翻译
请记住我们在本节开头如何定义 Promise：“Promise 是表示异步操作‘结果’的对象。” 重要的是要记住，Promise 不仅仅是注册回调以在某些异步代码完成时运行的抽象方式，它们代表该异步代码的结果。 如果异步代码正常运行（并且 Promise 是 `fulfilled`），那么该结果本质上就是代码的返回值。 如果异步代码未正常完成（并且 Promise 是 `rejected`），则结果是 Error 对象或代码在非异步情况下可能抛出的其他值。 任何已解决的 Promise 都有一个与之关联的值，并且该值不会改变。 如果 Promise 是`fulfilled`，则该值是一个返回值，该值会传递给注册为 `then()`第一个参数的任何回调函数。 如果 Promise 是 `rejected`，则该值是某种错误，该错误会传递给使用 `catch()` 注册的任何回调函数或作为`then()`的第二个参数。
:::

The reason that I want to be precise about Promise terminology is that Promises can also be `resolved`. It is easy to confuse this resolved state with the fulfilled state or with settled state, but it is not precisely the same as either. Understanding the resolved state is one of the keys to a deep understanding of Promises, and I’ll come back to it after we’ve discussed Promise chains below.

::: tip 翻译
我想要精确地解释 Promise 术语的原因是 Promise 也可以被`resolved`。 人们很容易将这种`resolved`状态与`fulfilled`状态或`settled`状态混淆，但两者并不完全相同。 理解`resolved`状态是深入理解 Promise 的关键之一，在我们讨论完下面的 Promise 链后我会再回到它。
:::

### Promises 链

One of the most important benefits of Promises is that they provide a natural way to express a sequence of asynchronous operations as a linear chain of `then()` method invocations, without having to nest each operation within the callback of the previous one. Here, for example, is a hypothetical Promise chain:

::: tip 翻译
Promises 最重要的好处之一是它们提供了一种自然的方式，来将一系列异步操作表示为 `then()` 方法调用的线性链，而不必将每个操作嵌套在前一个操作的回调中。 例如，这里是一个假设的 Promise 链：
:::

```js
fetch(documentURL) // 发起一个 HTTP 请求
  .then((response) => response.json()) // 获取响应体JSON数据
  .then((document) => {
    return render(document); // 为用户渲染document
  })
  .then((rendered) => {
    cacheInDatabase(rendered); // 使用本地数据库缓存渲染结果
  })
  .catch((error) => handle(error)); // 处理错误
```

This code illustrates how a chain of Promises can make it easy to express a sequence of asynchronous operations. We’re not going to discuss this particular Promise chain at all, however. We will continue to explore the idea of using Promise chains to make HTTP requests, however.

::: tip 翻译
此代码说明了 Promise 链如何能够轻松表达一系列异步操作。 然而，我们根本不会讨论这个特定的 Promise 链。 不过，我们将继续探索使用 Promise 链发出 HTTP 请求的想法。
:::

Earlier in this chapter, we saw the XMLHttpRequest object used to make an HTTP request in JavaScript. That strangely named object has an old and awkward API, and it has largely been replaced by the newer, Promise-based Fetch API (**§15.11.1**). In its simplest form, this new HTTP API is just the function `fetch()`. You pass it a URL, and it returns a Promise. That promise is `fulfilled` when the HTTP response begins to arrive and the HTTP status and headers are available:

::: tip 翻译
在本章前面，我们看到了用于在 JavaScript 中发出 HTTP 请求的 XMLHttpRequest 对象。 这个奇怪的命名对象有一个古老而尴尬的 API，它基本上已被更新的、基于 Promise 的 Fetch API (**§15.11.1**) 所取代。 在最简单的形式中，这个新的 HTTP API 只是 `fetch()` 函数。 你向它传递一个 URL，它返回一个 Promise。 当 HTTP 响应开始到达并且 HTTP 状态和标头可用时，该 Promise 是 `fulfilled` 的：
:::

```js
fetch("/api/user/profile").then((response) => {
  // 当 promise resolves, 我们有状态和标头
  if (
    response.ok &&
    response.headers.get("Content-Type") === "application/json"
  ) {
    // 我们在这里能做什么？ 我们实际上还没有响应主体。
  }
});
```

When the Promise returned by `fetch()` is `fulfilled`, it passes a Response object to the function you passed to its `then()` method. This response object gives you access to request status and headers, and it also defines methods like `text()` and `json()`, which give you access to the body of the response in text and JSON-parsed forms, respectively. But although the initial Promise is fulfilled, the body of the response may not yet have arrived. So these `text()` and `json()` methods for accessing the body of the response themselves return Promises. Here’s a naive way of using `fetch()` and the `response.json()` method to get the body of an HTTP response:

::: tip 翻译
当`fetch()`函数返回的 Promise 是 `fulfilled`时，它会将 Response 对象传递给您传递给其`then()`方法的函数。 此响应对象使您可以访问请求状态和标头，并且它还定义了 `text()` 和 `json()` 等方法，这些方法使您可以分别访问文本和 JSON 解析形式的响应正文。 但是，尽管最初的 Promise 是 `fulfilled`，但响应正文可能尚未到达。 因此，这些用于访问响应正文的 `text()` 和 `json()` 方法本身会返回 Promises。 这是使用 `fetch()` 和 `response.json()` 方法获取 HTTP 响应正文的简单方法：
:::

```js
fetch("/api/user/profile").then((response) => {
  response.json().then((profile) => {
    // 请求 JSON 解析的正文
    // 当响应正文到达时，它将自动解析为 JSON 并传递给此函数
    displayUserProfile(profile);
  });
});
```

This is a naive way to use Promises because we nested them, like callbacks, which defeats the purpose. The preferred idiom is to use Promises in a sequential chain with code like this:

::: tip 翻译
这是使用 Promise 的一种幼稚的方式，因为我们嵌套了它们，就像回调一样，这达不到目的。 首选的习惯用法是在顺序链中使用 Promise，代码如下：
:::

```js
fetch("/api/user/profile")
  .then((response) => {
    return response.json();
  })
  .then((profile) => {
    displayUserProfile(profile);
  });
```

Let’s look at the method invocations in this code, ignoring the arguments that are passed to the methods:

::: tip 翻译
让我们看看这段代码中的方法调用，忽略传递给方法的参数：
:::

```js
fetch().then().then();
```

When more than one method is invoked in a single expression like this, we call it a method chain. We know that the `fetch()` function returns a Promise object, and we can see that the first `.then()` in this chain invokes a method on that returned Promise object. But there is a second `.then()` in the chain, which means that the first invocation of the `then()` method must itself return a Promise.

::: tip 翻译
当像这样在单个表达式中调用多个方法时，我们将其称为方法链。 我们知道 `fetch()` 函数返回一个 Promise 对象，并且我们可以看到该链中的第一个 `.then()` 调用了返回的 Promise 对象上的方法。 但是链中还有第二个 `.then()`，这意味着 `then()` 方法的第一次调用本身必须返回一个 Promise。
:::

Sometimes, when an API is designed to use this kind of method chaining, there is just a single object, and each method of that object returns the object itself in order to facilitate chaining. That is not how Promises work, however. When we write a chain of `.then()` invocations, we are not registering multiple callbacks on a single Promise object. Instead, each invocation of the `then()` method returns a new Promise object. That new Promise object is not `fulfilled` until the function passed to `then()` is complete.

::: tip 翻译
有时，当 API 被设计为使用这种方法链接时，只有一个对象，并且该对象的每个方法都返回对象本身以便于链接。 然而，Promise 并不是这样工作的。 当我们编写一系列 `.then()` 调用时，我们并不是在单个 Promise 对象上注册多个回调。 相反，每次调用 `then()` 方法都会返回一个新的 Promise 对象。 在传递给 `then()` 的函数完成之前，新的 Promise 对象不是 `fulfilled`。
:::

Let’s return to a simplified form of the original `fetch()` chain above. If we define the functions passed to the `then()` invocations elsewhere, we might refactor the code to look like this:

::: tip 翻译
让我们回到上面原始 `fetch()` 链的简化形式。 如果我们在其他地方定义传递给 `then()` 调用的函数，我们可能会将代码重构为如下所示：
:::

```js
fetch(theURL) // task 1; return promise 1
  .then(callback1) // task 2; return promise 2
  .then(callback2); // task 3; return promise 3
```

Let’s walk through this code in detail:

1. On the first line, `fetch()` is invoked with a URL. It initiates an HTTP GET request for that URL and returns a Promise. We’ll call this HTTP request “task 1” and we’ll call the Promise “promise 1”
2. On the second line, we invoke the `then()` method of promise 1, passing the `callback1` function that we want to be invoked when promise 1 is fulfilled. The `then()` method stores our callback somewhere, then returns a new Promise. We’ll call the new Promise returned at this step “promise 2”, and we’ll say that “task 2” begins when `callback1` is invoked.
3. On the third line, we invoke the `then()` method of promise 2, passing the `callback2` function we want invoked when promise 2 is fulfilled. This `then()` method remembers our callback and returns yet another Promise. We’ll say that “task 3” begins when `callback2` is invoked. We can call this latest Promise “promise 3”, but we don’t really need a name for it because we won’t be using it at all.
4. The previous three steps all happen synchronously when the expression is first executed. Now we have an asynchronous pause while the HTTP request initiated in step 1 is sent out across the internet.
5. Eventually, the HTTP response starts to arrive. The asynchronous part of the `fetch()` call wraps the HTTP status and headers in a Response object and fulfills promise 1 with that Response object as the value.
6. When promise 1 is `fulfilled`, its value (the Response object) is passed to our `callback1()` function, and task 2 begins. The job of this task, given a Response object as input, is to obtain the response body as a JSON object.
7. Let’s assume that task 2 completes normally and is able to parse the body of the HTTP response to produce a JSON object. This JSON object is used to fulfill promise 2.
8. The value that fulfills promise 2 becomes the input to task 3 when it is passed to the `callback2()` function. This third task now displays the data to the user in some unspecified way. When task 3 is complete (assuming it completes normally), then promise 3 will be `fulfilled`. But because we never did anything with promise 3, nothing happens when that Promise settles, and the chain of asynchronous computation ends at this point.

::: tip 翻译
让我们详细浏览一下这段代码：

1. 在第一行，使用 URL 调用 `fetch()`。 它对该 URL 发起 HTTP GET 请求并返回 Promise。 我们将此 HTTP 请求称为“任务 1”，将该 Promise 称为“promise 1”
2. 在第二行，我们调用 promise 1 的 `then()`方法，传递我们希望在 promise 1 是`fulfilled`时调用的 `callback1` 函数。 `then()` 方法将我们的回调存储在某处，然后返回一个新的 Promise。 我们将这一步返回的新 Promise 称为“promise 2”，并且我们会说当`callback1`被调用时 开始“任务 2”。
3. 在第三行，我们调用 promise 2 的 `then()`方法，传递我们想要在 promise 2 是`fulfilled`时调用的 `callback2` 函数。 这个 `then()` 方法会记住我们的回调并返回另一个 Promise。 我们会说当`callback2`被调用时开始“任务 3”。 我们可以将这个最新的 Promise 称为“promise 3”，但我们实际上不需要为它命名，因为我们根本不会使用它。
4. 当表达式第一次执行时，前三个步骤都是同步发生的。 现在，当步骤 1 中发起的 HTTP 请求通过互联网发送出去时，我们有一个异步暂停。
5. 最终，HTTP 响应开始到达。 `fetch()` 调用的异步部分将 HTTP 状态和请求头包装在 Response 对象中，并使用该 Response 对象作为值来实现 promise 1。
6. 当 promise 1 是 `fulfilled` 时，其值（Response 对象）将传递给我们的 `callback1()` 函数，任务 2 开始。 给定 Response 对象作为输入，此任务的工作是获取 JSON 对象形式的响应正文。
7. 假设任务 2 正常完成，并且能够解析 HTTP 响应的正文以生成 JSON 对象。 该 JSON 对象用于履行 promise 2。
8. 当履行 promise 2 的值传递给 `callback2()` 函数时，该值将成为任务 3 的输入。 第三个任务现在以某种未指定的方式向用户显示数据。 当任务 3 完成时（假设它正常完成），那么 promise 3 将是 `fulfilled`。 但是因为我们从未对 promise 3 做过任何事情，所以当 Promise `settles`时什么也不会发生，并且异步计算链在此时结束。
   :::

### Resolving Promises

While explaining the URL-fetching Promise chain with the list in the last section, we talked about promises 1, 2, and 3. But there is actually a fourth Promise object involved as well, and this brings us to our important discussion of what it means for a Promise to be “resolved.”

::: tip 翻译
在上一节中用列表解释 URL 获取 Promise 链时，我们讨论了 Promise 1、2 和 3。但实际上还涉及到第四个 Promise 对象，这给我们带来了重要的讨论： Promise 被 `resolved`是什么意思。
:::

Remember that `fetch()` returns a Promise object which, when `fulfilled`, passes a Response object to the callback function we register. This Response object has `.text()`, `.json()`, and other methods to request the body of the HTTP response in various forms. But since the body may not yet have arrived, these methods must return Promise objects. In the example we’ve been studying, “task 2” calls the `.json()` method and returns its value. This is the fourth Promise object, and it is the return value of the `callback1()` function.

::: tip 翻译
请记住，`fetch()` 返回一个 Promise 对象，当 `fulfilled` 时，会将 Response 对象传递给我们注册的回调函数。 该 Response 对象具有 `.text()`、`.json()` 和其他方法来以各种形式请求 HTTP 响应的正文。 但由于主体可能尚未到达，因此这些方法必须返回 Promise 对象。 在我们研究的示例中，“任务 2”调用 `.json()` 方法并返回其值。 这是第四个 Promise 对象，它是 `callback1()` 函数的返回值。
:::

Let’s rewrite the URL-fetching code one more time in a verbose and nonidiomatic way that makes the callbacks and promises explicit:

::: tip 翻译
让我们以一种冗长且非惯用的方式再次重写 URL 获取代码，使回调和 Promise 变得明确：
:::

```js
function c1(response) {
  // callback 1
  let p4 = response.json();
  return p4; // returns promise 4
}

function c2(profile) {
  // callback 2
  displayUserProfile(profile);
}

let p1 = fetch("/api/user/profile"); // promise 1, task 1
let p2 = p1.then(c1); // promise 2, task 2
let p3 = p2.then(c2); // promise 3, task 3
```

In order for Promise chains to work usefully, the output of task 2 must become the input to task 3. And in the example we’re considering here, the input to task 3 is the body of the URL that was fetched, parsed as a JSON object. But, as we’ve just discussed, the return value of callback `c1` is not a JSON object, but Promise `p4` for that JSON object. This seems like a contradiction, but it is not: when `p1` is fulfilled, `c1` is invoked, and task 2 begins. And when `p2` is fulfilled, `c2` is invoked, and task 3 begins. But just because task 2 begins when `c1` is invoked, it does not mean that task 2 must end when `c1` returns. Promises are about managing asynchronous tasks, after all, and if task 2 is asynchronous (which it is, in this case), then that task will not be complete by the time the callback returns.

::: tip 翻译
为了让 Promise 链有效地工作，任务 2 的输出必须成为任务 3 的输入。在我们这里考虑的示例中，任务 3 的输入是所获取的 URL 正文，解析为 JSON 对象。 但是，正如我们刚刚讨论的，回调“c1”的返回值不是 JSON 对象，而是该 JSON 对象的 Promise“p4”。 这看起来像是一个矛盾，但事实并非如此：当“p1”是 `fulfilled` 时，“c1”被调用，任务 2 开始。 当“p2”是`fulfilled`时，“c2”被调用，任务 3 开始。 但仅仅因为任务 2 在“c1”被调用时才开始，并不意味着任务 2 必须在“c1”返回时结束。 毕竟，Promise 是关于管理异步任务的，如果任务 2 是异步的（在本例中就是异步的），那么在回调返回时该任务将不会完成。
:::

We are now ready to discuss the final detail that you need to understand to really master Promises. When you pass a callback `c` to the `then()` method, `then()` returns a Promise `p` and arranges to asynchronously invoke `c` at some later time. The callback performs some computation and returns a value `v`. When the callback returns, `p` is `resolved` with the value `v`. When a Promise is `resolved` with a value that is not itself a Promise, it is immediately `fulfilled` with that value. So if `c` returns a non-Promise, that return value becomes the value of `p`, `p` is `fulfilled` and we are done. But if the return value `v` is itself a Promise, then `p` is `resolved` but not yet `fulfilled`. At this stage, `p` cannot settle until the Promise `v` settles. If `v` is `fulfilled`, then `p` will be `fulfilled` to the same value. If `v` is `rejected`, then `p` will be `rejected` for the same reason. This is what the `resolved` state of a Promise means: the Promise has become associated with, or “locked onto,” another Promise. We don’t know yet whether `p` will be `fulfilled` or `rejected`, but our callback `c` no longer has any control over that. `p` is `resolved` in the sense that its fate now depends entirely on what happens to Promise `v`.

::: tip 翻译
我们现在准备讨论您需要了解的最终细节，以真正掌握 Promise。 当您将回调“c”传递给 `then()` 方法时，`then()`返回一个 Promise “p”，并安排在稍后的某个时间异步调用“c”。 回调执行一些计算并返回值“v”。 当回调返回时，“p”将被 `resolved` 为值“v”。 当一个 Promise 被`resolved`为一个本身不是 Promise 的值时，它会立即用该值来`fulfilled`。 因此，如果“c”返回一个非 Promise，则该返回值将成为“p”的值，“p”是`fulfilled`，我们就完成了。 但如果返回值“v”本身就是一个 Promise，那么“p”是`resolved`但尚未`fulfilled`。 在这个阶段，只有 Promise `v` `settled`之后，`p` 才能`settle`。 如果“v”是`fulfilled`，则“p”将用相同的值`fulfilled`。 如果“v”是`rejected`，那么“p”也会因为同样的原因是`rejected`。 这就是 Promise 的`resolved`状态的含义：该 Promise 已与另一个 Promise 关联或“锁定”。 我们还不知道“p”是否是`fulfilled`或`rejected`，但我们的回调“c”不再对此有任何控制权。 `p` 被`resolved`了，因为它的命运现在完全取决于 Promise `v` 发生了什么。
:::

Let’s bring this back to our URL-fetching example. When `c1` returns `p4`, `p2` is `resolved`. But being `resolved` is not the same as being `fulfilled`, so task 3 does not begin yet. When the full body of the HTTP response becomes available, then the `.json()` method can parse it and use that parsed value to fulfill `p4`. When `p4` is `fulfilled`, `p2` is automatically `fulfilled` as well, with the same parsed JSON value. At this point, the parsed JSON object is passed to `c2`, and task 3 begins.

::: tip 翻译
让我们回到我们的 URL 获取示例。 当“c1”返回“p4”时，“p2”是`resolved`。 但`resolved`并不等于`fulfilled`，所以任务3还没有开始。 当 HTTP 响应的完整正文可用时，`.json() `方法可以解析它并使用解析后的值来使“p4” `fulfilled`。 当“p4”是`fulfilled`时，“p2”也会自动`fulfilled`，并具有相同的解析 JSON 值。 此时，解析后的 JSON 对象被传递给 `c2`，任务 3 开始。
:::

This can be one of the trickiest parts of JavaScript to understand, and you may need to read this section more than once. **Figure 13-1** presents the process in visual form and may help clarify it for you.

::: tip 翻译
这可能是 JavaScript 中最难理解的部分之一，您可能需要多次阅读本节。 **图 13-1** 以可视化形式展示了该过程，可能有助于您理清思路。
:::

![Figure 13-1. Fetching a URL with Promises](/assets/fetching_url.png)
Figure 13-1. Fetching a URL with Promises

### 有关 Promise 和错误的更多信息

Earlier in the chapter, we saw that you can pass a second callback function to the `.then()` method and that this second function will be invoked if the Promise is rejected. When that happens, the argument to this second callback function is a value —typically an Error object—that represents the reason for the rejection. We also learned that it is uncommon (and even unidiomatic) to pass two callbacks to a `.then()` method. Instead, Promise-related errors are typically handled by adding a `.catch()` method invocation to a Promise chain. Now that we have examined Promise chains, we can return to error handling and discuss it in more detail. To preface the discussion, I’d like to stress that careful error handling is really important when doing asynchronous programming. With synchronous code, if you leave out error-handling code, you’ll at least get an exception and a stack trace that you can use to figure out what is going wrong. With asynchronous code, unhandled exceptions will often go unreported, and errors can occur silently, making them much harder to debug. The good news is that the `.catch()` method makes it easy to handle errors when working with Promises.

#### catch 和 finally 方法

The `.catch()` method of a Promise is simply a shorthand way to call `.then()` with null as the first argument and an error-handling callback as the second argument. Given any Promise p and a callback c, the following two lines are equivalent:

```js
p.then(null, c);
p.catch(c);
```

The `.catch()` shorthand is preferred because it is simpler and because the name matches the `catch` clause in a `try/catch` exception-handling statement. As we’ve discussed, normal exceptions don’t work with asynchronous code. The `.catch()` method of Promises is an alternative that does work for asynchronous code. When something goes wrong in synchronous code, we can speak of an exception “bubbling up the call stack” until it finds a `catch` block. With an asynchronous chain of Promises, the comparable metaphor might be of an error “trickling down the chain” until it finds a `.catch()` invocation.

In ES2018, Promise objects also define a `.finally()` method whose purpose is similar to the finally clause in a `try/catch/finally` statement. If you add a `.finally()` invocation to your Promise chain, then the callback you pass to `.finally()` will be invoked when the Promise you called it on settles. Your callback will be invoked if the Promise fulfills or rejects, and it will not be passed any arguments, so you can’t find out whether it fulfilled or rejected. But if you need to run some kind of cleanup code (such as closing open files or network connections) in either case, a `.finally()` callback is the ideal way to do that. Like `.then()` and `.catch()`, `.finally()` returns a new Promise object. The return value of a `.finally()` callback is generally ignored, and the Promise returned by `.finally()` will typically resolve or reject with the same value that the Promise that `.finally()` was invoked on resolves or rejects with. If a `.finally()` callback throws an exception, however, then the Promise returned by `.finally()` will reject with that value.

The URL-fetching code that we studied in the previous sections did not do any error handling. Let’s correct that now with a more realistic version of the code:

```js
fetch("/api/user/profile") // Start the HTTP request
  .then((response) => {
    // Call this when status and headers are ready
    if (!response.ok) {
      // If we got a 404 Not Found or similar error
      return null; // Maybe user is logged out; return null profile
    }

    // Now Check the headers to ensure that the server sent us JSON
    // If not, our server is broken, and this is a serious error!
    let type = response.headers.get("content-type");
    if (type !== "application/json") {
      throw new TypeError(`Expected JSON, got ${type}`);
    }

    // If we get here, then we got a 2xx status and a JSON content-type
    // so we can confidently return a Promise for the response
    // body as a JSON object.
    return response.json();
  })
  .then((profile) => {
    // Called with the parsed response body or null
    if (profile) {
      displayUserProfile(profile);
    } else {
      // If we got a 404 error above and returned null we end up here
      displayLoggedOutProfilePage();
    }
  })
  .catch((e) => {
    if (e instanceof NetworkError) {
      // fetch() can fail this way if the internet connection is down
      displayErrorMessage("Check your internet connection.");
    } else if (e instanceof TypeError) {
      // This happens if we throw TypeError above
      displayErrorMessage("Something is wrong with our server!");
    } else {
      // This must be some kind of unanticipated error
      console.error(e);
    }
  });
```

Let’s analyze this code by looking at what happens when things go wrong. We’ll use the naming scheme we used before: `p1` is the Promise returned by the `fetch()` call. `p2` is the Promise returned by the first `.then()` call, and `c1` is the callback that we pass to that `.then()` call. `p3` is the Promise returned by the second `.then()` call, and `c2` is the callback we pass to that call. Finally, `c3` is the callback that we pass to the `.catch()` call. (That call returns a Promise, but we don’t need to refer to it by name.)

The first thing that could fail is the `fetch()` request itself. If the network connection is down (or for some other reason an HTTP request cannot be made), then Promise `p1` will be rejected with a `NetworkError` object. We didn’t pass an error-handling `callback` function as the second argument to the `.then()` call, so `p2` rejects as well with the same `NetworkError` object. (If we had passed an error handler to that first `.then()` call, the error handler would be invoked, and if it returned normally, `p2` would be resolved and/or fulfilled with the return value from that handler.) Without a handler, though, `p2` is rejected, and then `p3` is rejected for the same reason. At this point, the `c3` error-handling callback is called, and the NetworkError-specific code within it runs.

Another way our code could fail is if our HTTP request returns a 404 Not Found or another HTTP error. These are valid HTTP responses, so the `fetch()` call does not consider them errors. `fetch()` encapsulates a 404 Not Found in a Response object and fulfills `p1` with that object, causing `c1` to be invoked. Our code in `c1` checks the ok property of the Response object to detect that it has not received a normal HTTP response and handles that case by simply returning `null`. Because this return value is not a Promise, it fulfills `p2` right away, and `c2` is invoked with this value. Our code in `c2` explicitly checks for and handles falsy values by displaying a different result to the user. This is a case where we treat an abnormal condition as a nonerror and handle it without actually using an error handler.

A more serious error occurs in `c1` if the we get a normal HTTP response code but the Content-Type header is not set appropriately. Our code expects a JSON-formatted response, so if the server is sending us HTML, XML, or plain text instead, we’re going to have a problem. `c1` includes code to check the Content-Type header. If the header is wrong, it treats this as a nonrecoverable problem and throws a `TypeError`. When a callback passed to `.then()` (or `.catch()`) throws a value, the Promise that was the return value of the `.then()` call is rejected with that thrown value. In this case, the code in `c1` that raises a `TypeError` causes `p2` to be rejected with that `TypeError` object. Since we did not specify an error handler for `p2`, `p3` will be rejected as well. `c2` will not be called, and the `TypeError` will be passed to `c3`, which has code to explicitly check for and handle this type of error.

There are a couple of things worth noting about this code. First, notice that the error object thrown with a regular, synchronous throw statement ends up being handled asynchronously with a `.catch()` method invocation in a Promise chain. This should make it clear why this shorthand method is preferred over passing a second argument to `.then()`, and also why it is so idiomatic to end Promise chains with a `.catch()` call.

Before we leave the topic of error handling, I want to point out that, although it is idiomatic to end every Promise chain with a `.catch()` to clean up (or at least log) any errors that occurred in the chain, it is also perfectly valid to use `.catch()` elsewhere in a Promise chain. If one of the stages in your Promise chain can fail with an error, and if the error is some kind of recoverable error that should not stop the rest of the chain from running, then you can insert a `.catch()` call in the chain, resulting in code that might look like this:

```js
startAsyncOperation()
  .then(doStageTwo)
  .catch(recoverFromStageTwoError)
  .then(doStageThree)
  .then(doStageFour)
  .catch(logStageThreeAndFourError);
```

Remember that the callback you pass to `.catch()` will only be invoked if the callback at a previous stage throws an error. If the callback returns normally, then the `.catch()` callback will be skipped, and the return value of the previous callback will become the input to the next `.then()` callback. Also remember that `.catch()` callbacks are not just for reporting errors, but for handling and recovering from errors. Once an error has been passed to a `.catch()` callback, it stops propagating down the Promise chain. A `.catch()` callback can throw a new error, but if it returns normally, than that return value is used to resolve and/or fulfill the associated Promise, and the error stops propagating.

Let’s be concrete about this: in the preceding code example, if either `startAsyncOperation()` or `doStageTwo()` throws an error, then the `recoverFromStageTwoError()` function will be invoked. If `recoverFromStageTwoError()` returns normally, then its return value will be passed to `doStageThree()` and the asynchronous operation continues normally. On the other hand, if `recoverFromStageTwoError()` was unable to recover, it will itself throw an error (or it will rethrow the error that it was passed). In this case, neither `doStageThree()` nor `doStageFour()` will be invoked, and the error thrown by `recoverFromStageTwoError()` would be passed to `logStageThreeAndFourErrors()`.

Sometimes, in complex network environments, errors can occur more or less at random, and it can be appropriate to handle those errors by simply retrying the asynchronous request. Imagine you’ve written a Promise-based operation to query a database:

```js
queryDatabase().then(displayTable).catch(displayDatabaseError);
```

Now suppose that transient network load issues are causing this to fail about 1% of the time. A simple solution might be to retry the query with a `.catch()` call:

```js
queryDatabase()
  .catch((e) => wait(500).then(queryDatabase)) // On failure, wait and retry
  .then(displayTable)
  .catch(displayDatabaseError);
```

If the hypothetical failures are truly random, then adding this one line of code should reduce your error rate from 1% to .01%.

##### 从 Promise 回调返回

Let’s return one last time to the earlier URL-fetching example, and consider the `c1` callback that we passed to the first `.then()` invocation. Notice that there are three ways that `c1` can terminate. It can return normally with the Promise returned by the `.json()` call. This causes `p2` to be resolved, but whether that Promise is fulfilled or rejected depends on what happens with the newly returned Promise. `c1` can also return normally with the value null, which causes `p2` to be fulfilled immediately. Finally, `c1` can terminate by throwing an error, which causes `p2` to be rejected. These are the three possible outcomes for a Promise, and the code in `c1` demonstrates how the callback can cause each outcome.

In a Promise chain, the value returned (or thrown) at one stage of the chain becomes the input to the next stage of the chain, so it is critical to get this right. In practice, forgetting to return a value from a callback function is actually a common source of Promise-related bugs, and this is exacerbated by JavaScript’s arrow function shortcut syntax. Consider this line of code that we saw earlier:

```js
.catch(e => wait(500).then(queryDatabase))
```

Recall from **Chapter 8** that arrow functions allow a lot of shortcuts. Since there is exactly one argument (the error value), we can omit the parentheses. Since the body of the function is a single expression, we can omit the curly braces around the function body, and the value of the expression becomes the return value of the function. Because of these shortcuts, the preceding code is correct. But consider this innocuous-seeming change:

```js
.catch(e => { wait(500).then(queryDatabase) })
```

By adding the curly braces, we no longer get the automatic return. This function now returns undefined instead of returning a Promise, which means that the next stage in this Promise chain will be invoked with undefined as its input rather than the result of the retried query. It is a subtle error that may not be easy to debug.

### Promises 并发

We’ve spent a lot of time talking about Promise chains for sequentially running the asynchronous steps of a larger asynchronous operation. Sometimes, though, we want to execute a number of asynchronous operations in parallel. The function `Promise.all()` can do this. `Promise.all()` takes an array of Promise objects as its input and returns a Promise. The returned Promise will be rejected if any of the input Promises are rejected. Otherwise, it will be fulfilled with an array of the fulfillment values of each of the input Promises. So, for example, if you want to fetch the text content of multiple URLs, you could use code like this:

```js
// We start with an array of URLs
const urls = [
  /* zero or more URLs here */
];
// And convert it to an array of Promise objects
promises = urls.map((url) => fetch(url).then((r) => r.text()));
// Now get a Promise to run all those Promises in parallel
Promise.all(promises)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch((e) => console.error(e));
```

`Promise.all()` is slightly more flexible than described before. The input array can contain both Promise objects and non-Promise values. If an element of the array is not a Promise, it is treated as if it is the value of an already fulfilled Promise and is simply copied unchanged into the output array.

The Promise returned by `Promise.all()` rejects when any of the input Promises is rejected. This happens immediately upon the first rejection and can happen while other input Promises are still pending. In ES2020, `Promise.allSettled()` takes an array of input Promises and returns a Promise, just like `Promise.all()` does. But `Promise.allSettled()` never rejects the returned Promise, and it does not fulfill that Promise until all of the input Promises have settled. The Promise resolves to an array of objects, with one object for each input Promise. Each of these returned objects has a `status` property set to “fulfilled” or “rejected.” If the status is “fulfilled”, then the object will also have a value property that gives the fulfillment value. And if the status is “rejected”, then the object will also have a `reason` property that gives the error or rejection value of the corresponding Promise:

```js
Promise.allSettled([Promise.resolve(1), Promise.reject(2), 3]).then(
  (results) => {
    results[0]; // => { status: "fulfilled", value: 1 }
    results[1]; // => { status: "rejected", value: 2 }
    results[2]; // => { status: "fulfilled", value: 3 }
  }
);
```

Occasionally, you may want to run a number of Promises at once but may only care about the value of the first one to fulfill. In that case, you can use `Promise.race()` instead of `Promise.all()`. It returns a Promise that is fulfilled or rejected when the first of the Promises in the input array is fulfilled or rejected. (Or, if there are any non-Promise values in the input array, it simply returns the first of those.)

### 制作 Promises

We’ve used the Promise-returning function `fetch()` in many of the previous examples because it is one of the simplest functions built in to web browsers that returns a Promise. Our discussion of Promises has also relied on hypothetical Promisereturning functions `getJSON()` and `wait()`. Functions written to return Promises really are quite useful, and this section shows how you can create your own Promisebased APIs. In particular, we’ll show implementations of `getJSON()` and `wait()`.

#### 基于其它 Promises 的 Promises

It is easy to write a function that returns a Promise if you have some other Promisereturning function to start with. Given a Promise, you can always create (and return) a new one by calling `.then()`. So if we use the existing `fetch()` function as a starting point, we can write `getJSON()` like this:

```js
function getJSON(url) {
  return fetch(url).then((response) => response.json());
}
```

The code is trivial because the Response object of the `fetch()` API has a predefined `json()` method. The `json()` method returns a Promise, which we return from our callback (the callback is an arrow function with a single-expression body, so the return is implicit), so the Promise returned by `getJSON()` resolves to the Promise returned by `response.json()`. When that Promise fulfills, the Promise returned by `getJSON()` fulfills to the same value. Note that there is no error handling in this `getJSON()` implementation. Instead of checking response.ok and the Content-Type header, we instead just allow the `json()` method to reject the Promise it returned with a SyntaxError if the response body cannot be parsed as JSON.

Let’s write another Promise-returning function, this time using `getJSON()` as the source of the initial Promise:

```js
function getHighScore() {
  return getJSON("/api/user/profile").then((profile) => profile.highScore);
}
```

We’re assuming that this function is part of some sort of web-based game and that the URL “/api/user/profile” returns a JSON-formatted data structure that includes a high Score property.

#### 基于同步值的 Promises

Sometimes, you may need to implement an existing Promise-based API and return a Promise from a function, even though the computation to be performed does not actually require any asynchronous operations. In that case, the static methods `Promise.resolve()` and `Promise.reject()` will do what you want. `Promise.resolve()` takes a value as its single argument and returns a Promise that will immediately (but asynchronously) be fulfilled to that value. Similarly, `Promise.reject()` takes a single argument and returns a Promise that will be rejected with that value as the reason. (To be clear: the Promises returned by these static methods are not already fulfilled or rejected when they are returned, but they will fulfill or reject immediately after the current synchronous chunk of code has finished running. Typically, this happens within a few milliseconds unless there are many pending asynchronous tasks waiting to run.)

Recall from **§13.2.3** that a resolved Promise is not the same thing as a fulfilled Promise. When we call `Promise.resolve()`, we typically pass the fulfillment value to create a Promise object that will very soon fulfill to that value. The method is not named `Promise.fulfill()`, however. If you pass a Promise `p1` to `Promise.resolve()`, it will return a new Promise `p2`, which is immediately resolved, but which will not be fulfilled or rejected until `p1` is fulfilled or rejected.

It is possible, but unusual, to write a Promise-based function where the value is computed synchronously and returned asynchronously with `Promise.resolve()`. It is fairly common, however, to have synchronous special cases within an asynchronous function, and you can handle these special cases with `Promise.resolve()` and `Promise.reject()`. In particular, if you detect error conditions (such as bad argument values) before beginning an asynchronous operation, you can report that error by returning a Promise created with `Promise.reject()`. (You could also just throw an error synchronously in that case, but that is considered poor form because then the caller of your function needs to write both a synchronous catch clause and use an asynchronous `.catch()` method to handle errors.) Finally, `Promise.resolve()` is sometimes useful to create the initial Promise in a chain of Promises. We’ll see a couple of examples that use it this way.

#### 从头开始 Promises

For both `getJSON()` and `getHighScore()`, we started off by calling an existing function to get an initial Promise, and created and returned a new Promise by calling the `.then()` method of that initial Promise. But what about writing a Promisereturning function when you can’t use another Promise-returning function as the starting point? In that case, you use the `Promise()` constructor to create a new Promise object that you have complete control over. Here’s how it works: you invoke the `Promise()` constructor and pass a function as its only argument. The function you pass should be written to expect two parameters, which, by convention, should be named resolve and reject. The constructor synchronously calls your function with function arguments for the resolve and reject parameters. After calling your function, the `Promise()` constructor returns the newly created Promise. That returned Promise is under the control of the function you passed to the constructor. That function should perform some asynchronous operation and then call the `resolve` function to resolve or fulfill the returned Promise or call the `reject` function to reject the returned Promise. Your function does not have to be asynchronous: it can call `resolve` or `reject` synchronously, but the Promise will still be resolved, fulfilled, or rejected asynchronously if you do this.

It can be hard to understand the functions passed to a function passed to a constructor by just reading about it, but hopefully some examples will make this clear. Here’s how to write the Promise-based `wait()` function that we used in various examples earlier in the chapter:

```js
function wait(duration) {
  // Create and return a new Promise
  return new Promise((resolve, reject) => {
    // These control the Promise
    // If the argument is invalid, reject the Promise
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }

    // Otherwise, wait asynchronously and then resolve the Promise.
    // setTimeout will invoke resolve() with no arguments, which means
    // that the Promise will fulfill with the undefined value.
    setTimeout(resolve, duration);
  });
}
```

Note that the pair of functions that you use to control the fate of a Promise created with the `Promise()` constructor are named `resolve()` and `reject()`, not `fulfill()` and `reject()`. If you pass a Promise to `resolve()`, the returned Promise will resolve to that new Promise. Often, however, you will pass a non-Promise value, which fulfills the returned Promise with that value.

**Example 13-1** is another example of using the `Promise()` constructor. This one implements our `getJSON()` function for use in Node, where the `fetch()` API is not built in. Remember that we started this chapter with a discussion of asynchronous callbacks and events. This example uses both callbacks and event handlers and is a good demonstration, therefore, of how we can implement Promise-based APIs on top of other styles of asynchronous programming.

_Example 13-1. An asynchronous `getJSON()` function_

```js
const http = require("http");

function getJSON(url) {
  // Create and return a new Promise
  return new Promise((resolve, reject) => {
    // Start an HTTP GET request for the specified URL
    request = http.get(url, (response) => {
      // called when response starts
      // Reject the Promise if the HTTP status is wrong
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume(); // so we don't leak memory
      }
      // And reject if the response headers are wrong
      else if (response.headers["content-type"] !== "application/json") {
        reject(new Error("Invalid content-type"));
        response.resume(); // don't leak memory
      } else {
        // Otherwise, register events to read the body of the response
        let body = "";
        response.setEncoding("utf-8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          // When the response body is complete, try to parse it
          try {
            let parsed = JSON.parse(body);
            // If it parsed successfully, fulfill the Promise
            resolve(parsed);
          } catch (e) {
            // If parsing failed, reject the Promise
            reject(e);
          }
        });
      }
    });

    // We also reject the Promise if the request fails before we
    // even get a response (such as when the network is down)
    request.on("error", (error) => {
      reject(error);
    });
  });
}
```

### 按顺序执行的 Promises

`Promise.all()` makes it easy to run an arbitrary number of Promises in parallel. And Promise chains make it easy to express a sequence of a fixed number of Promises. Running an arbitrary number of Promises in sequence is trickier, however. Suppose, for example, that you have an array of URLs to fetch, but that to avoid overloading your network, you want to fetch them one at a time. If the array is of arbitrary length and unknown content, you can’t write out a Promise chain in advance, so you need to build one dynamically, with code like this:

```js
function fetchSequentially(urls) {
  // We'll store the URL bodies here as we fetch them
  const bodies = [];

  // Here's a Promise-returning function that fetches one body
  function fetchOne(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((body) => {
        // We save the body to the array, and we're purposely
        // omitting a return value here (returning undefined)
        bodies.push(body);
      });
  }

  // Start with a Promise that will fulfill right away (with value undefined)
  let p = Promise.resolve(undefined);

  // Now loop through the desired URLs, building a Promise chain
  // of arbitrary length, fetching one URL at each stage of the chain
  for (url of urls) {
    p = p.then(() => fetchOne(url));
  }

  // When the last Promise in that chain is fulfilled, then the
  // bodies array is ready. So let's return a Promise for that
  // bodies array. Note that we don't include any error handlers:
  // we want to allow errors to propagate to the caller.
  return p.then(() => bodies);
}
```

With this `fetchSequentially()` function defined, we could fetch the URLs one at a time with code much like the fetch-in-parallel code we used earlier to demonstrate `Promise.all()`:

```js
fetchSequentially(urls)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch((e) => console.error(e));
```

The `fetchSequentially()` function starts by creating a Promise that will fulfill immediately after it returns. It then builds a long, linear Promise chain off of that initial Promise and returns the last Promise in the chain. It is like setting up a row of dominoes and then knocking the first one over.

There is another (possibly more elegant) approach that we can take. Rather than creating the Promises in advance, we can have the callback for each Promise create and return the next Promise. That is, instead of creating and chaining a bunch of Promises, we instead create Promises that resolve to other Promises. Rather than creating a domino-like chain of Promises, we are instead creating a sequence of Promises nested one inside the other like a set of matryoshka dolls. With this approach, our code can return the first (outermost) Promise, knowing that it will eventually fulfill (or reject!) to the same value that the last (innermost) Promise in the sequence does. The `promiseSequence()` function that follows is written to be generic and is not specific to URL fetching. It is here at the end of our discussion of Promises because it is complicated. If you’ve read this chapter carefully, however, I hope you’ll be able to understand how it works. In particular, note that the nested function inside `promiseSequence()` appears to call itself recursively, but because the “recursive” call is through a `then()` method, there is not actually any traditional recursion happening:

```js
// This function takes an array of input values and a "promiseMaker" function.
// For any input value x in the array, promiseMaker(x) should return a Promise
// that will fulfill to an output value. This function returns a Promise that fulfills to an array of the computed output values.
//
// Rather than creating the Promises all at once and letting them run in
// parallel, however, promiseSequence() only runs one Promise at a time
// and does not call promiseMaker() for a value until the previous Promise has fulfilled.
function promiseSequence(inputs, promiseMaker) {
  // Make a private copy of the array that we can modify
  inputs = [...inputs];

  // Here's the function that we'll use as a Promise callback
  // This is the pseudorecursive magic that makes this all work.
  function handleNextInput(outputs) {
    if (inputs.length === 0) {
      // If there are no more inputs left, then return the array
      // of outputs, finally fulfilling this Promise and all the
      // previous resolved-but-not-fulfilled Promises.
      return outputs;
    } else {
      // If there are still input values to process, then we'll
      // return a Promise object, resolving the current Promise
      // with the future value from a new Promise.
      let nextInput = inputs.shift(); // Get the next input value,
      return (
        promiseMaker(nextInput) // compute the next output value,
          // Then create a new outputs array with the new output value
          .then((output) => output.concat(output))
          // Then "recurse", passing the new, longer, outputs array
          .then(handleNextInput)
      );
    }
  }

  // Start with a Promise that fulfills to an empty array and use
  // the function above as its callback.
  return Promise.resolve([]).then(handleNextInput);
}
```

This `promiseSequence()` function is intentionally generic. We can use it to fetch URLs with code like this:

```js
// Given a URL, return a Promise that fulfills to the URL body text
function fetchBody(url) {
  return fetch(url).then((r) => r.text());
}
// Use it to sequentially fetch a bunch of URL bodies
promiseSequence(urls, fetchBody)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch(console.error);
```

## async 和 await

ES2017 introduces two new keywords—`async` and `await`—that represent a paradigm shift in asynchronous JavaScript programming. These new keywords dramatically simplify the use of Promises and allow us to write Promise-based, asynchronous code that looks like synchronous code that blocks while waiting for network responses or other asynchronous events. Although it is still important to understand how Promises work, much of their complexity (and sometimes even their very presence!) vanishes when you use them with `async` and `await`.

As we discussed earlier in the chapter, asynchronous code can’t return a value or throw an exception the way that regular synchronous code can. And this is why Promises are designed the way the are. The value of a fulfilled Promise is like the return value of a synchronous function. And the value of a rejected Promise is like a value thrown by a synchronous function. This latter similarity is made explicit by the naming of the `.catch()` method. `async` and `await` take efficient, Promise-based code and hide the Promises so that your asynchronous code can be as easy to read and as easy to reason about as inefficient, blocking, synchronous code.

### await 表达式

The `await` keyword takes a Promise and turns it back into a return value or a thrown exception. Given a Promise object `p`, the expression `await` `p` waits until `p` settles. If `p` fulfills, then the value of `await` `p` is the fulfillment value of `p`. On the other hand, if `p` is rejected, then the `await` `p` expression throws the rejection value of `p`. We don’t usually use `await` with a variable that holds a Promise; instead, we use it before the invocation of a function that returns a Promise:

```js
let response = await fetch("/api/user/profile");
let profile = await response.json();
```

It is critical to understand right away that the `await` keyword does not cause your program to block and literally do nothing until the specified Promise settles. The code remains asynchronous, and the `await` simply disguises this fact. This means that _any code that uses `await` is itself asynchronous._

### async 函数

Because any code that uses `await` is asynchronous, there is one critical rule: you can only use the `await` keyword within functions that have been declared with the `async` keyword. Here’s a version of the `getHighScore()` function from earlier in the chapter, rewritten to use `async` and `await`:

```js
async function getHighScore() {
  let response = await fetch("/api/user/profile");
  let profile = await response.json();
  return profile.highScore;
}
```

Declaring a function `async` means that the return value of the function will be a Promise even if no Promise-related code appears in the body of the function. If an `async` function appears to return normally, then the Promise object that is the real return value of the function will resolve to that apparent return value. And if an `async` function appears to throw an exception, then the Promise object that it returns will be rejected with that exception.

The `getHighScore()` function is declared `async`, so it returns a Promise. And because it returns a Promise, we can use the `await` keyword with it:

```js
displayHighScore(await getHightScore());
```

But remember, that line of code will only work if it is inside another `async` function! You can nest `await` expressions within `async` functions as deeply as you want. But if you’re at the top level or are inside a function that is not `async` for some reason, then you can’t use `await` and have to deal with a returned Promise in the regular way:

```js
getHightScore().then(displayHighScore).catch(console.error);
```

You can use the `async` keyword with any kind of function. It works with the function keyword as a statement or as an expression. It works with arrow functions and with the method shortcut form in classes and object literals. (See **Chapter 8** for more about the various ways to write functions.)

### 等待多个 Promise

Suppose that we’ve written our `getJSON()` function using `async`:

```js
async function getJSON(url) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}
```

And now suppose that we want to fetch two JSON values with this function:

```js
let value1 = await getJSON(url1);
let value2 = await getJSON(url2);
```

The problem with this code is that it is unnecessarily sequential: the fetch of the second URL will not begin until the first fetch is complete. If the second URL does not depend on the value obtained from the first URL, then we should probably try to fetch the two values at the same time. This is a case where the Promise-based nature of `async` functions shows. In order to await a set of concurrently executing `async` functions, we use `Promise.all()` just as we would if working with Promises directly:

```js
let [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);
```

### 详细实现

Finally, in order to understand how `async` functions work, it may help to think about what is going on under the hood.

Suppose you write an `async` function like this:

```js
async function f(x) {
  /* body */
}
```

You can think about this as a Promise-returning function wrapped around the body of your original function:

```js
function f(x) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(
        (function (x) {
          /* body */
        })(x)
      );
    } catch (e) {
      reject(e);
    }
  });
}
```

It is harder to express the `await` keyword in terms of a syntax transformation like this one. But think of the `await` keyword as a marker that breaks a function body up into separate, synchronous chunks. An ES2017 interpreter can break the function body up into a sequence of separate subfunctions, each of which gets passed to the `then()` method of the `await`-marked Promise that precedes it.

## 异步迭代

We began this chapter with a discussion of callback- and event-based asynchrony, and when we introduced Promises, we noted that they were useful for single-shot asynchronous computations but were not suitable for use with sources of repetitive asynchronous events, such as `setInterval()`, the “click” event in a web browser, or the “data” event on a Node stream. Because single Promises do not work for sequences of asynchronous events, we also cannot use regular async functions and the await statements for these things.

ES2018 provides a solution, however. Asynchronous iterators are like the iterators described in **Chapter 12**, but they are Promise-based and are meant to be used with a new form of the `for/of` loop: `for/await`.

### for/await 循环

Node 12 makes its readable streams asynchronously iterable. This means you can read successive chunks of data from a stream with a `for/await` loop like this one:

```js
const fs = require("fs");

async function parseFile(filename) {
  let stream = fs.createReadStream(filename, { encoding: "utf-8" });
  for await (let chunk of stream) {
    parseChunk(chunk); // Assume parseChunk() is defined elsewhere
  }
}
```

Like a regular `await` expression, the `for/await` loop is Promise-based. Roughly speaking, the asynchronous iterator produces a Promise and the `for/await` loop waits for that Promise to fulfill, assigns the fulfillment value to the loop variable, and runs the body of the loop. And then it starts over, getting another Promise from the iterator and waiting for that new Promise to fulfill.

Suppose you have an array of URLs:

```js
const urls = [url1, url2, url3];
```

You can call `fetch()` on each URL to get an array of Promises:

```js
const promises = urls.map((url) => fetch(url));
```

We saw earlier in the chapter that we could now use `Promise.all()` to wait for all the Promises in the array to be fulfilled. But suppose we want the results of the first fetch as soon as they become available and don’t want to wait for all the URLs to be fetched. (Of course, the first fetch might take longer than any of the others, so this is not necessarily faster than using `Promise.all()`.) Arrays are iterable, so we can iterate through the array of promises with a regular `for/of` loop:

```js
for (const promise of promises) {
  response = await promise;
  handle(response);
}
```

This example code uses a regular `for/of` loop with a regular iterator. But because this iterator returns Promises, we can also use the new `for/await` for slightly simpler code:

```js
for await (const response of promises) {
  handle(response);
}
```

In this case, the `for/await` loop just builds the `await` call into the loop and makes our code slightly more compact, but the two examples do exactly the same thing. Importantly, both examples will only work if they are within functions declared `async`; a `for/await` loop is no different than a regular `await` expression in that way.

It is important to realize, however, that we’re using `for/await` with a regular iterator in this example. Things are more interesting with fully asynchronous iterators.

### 异步迭代器

Let’s review some terminology from **Chapter 12**. An iterable object is one that can be used with a `for/of` loop. It defines a method with the symbolic name `Symbol.iterator`. This method returns an iterator object. The iterator object has a `next()` method, which can be called repeatedly to obtain the values of the iterable object. The `next()` method of the iterator object returns iteration result objects. The iteration result object has a value property and/or a `done` property.

Asynchronous iterators are quite similar to regular iterators, but there are two important differences. First, an asynchronously iterable object implements a method with the symbolic name `Symbol.asyncIterator` instead of `Symbol.iterator`. (As we saw earlier, `for/await` is compatible with regular iterable objects but it prefers asynchronously iterable objects, and tries the `Symbol.asyncIterator` method before it tries the `Symbol.iterator` method.) Second, the `next()` method of an asynchronous iterator returns a Promise that resolves to an iterator result object instead of returning an iterator result object directly.

> In the previous section, when we used `for/await` on a regular, synchronously iterable array of Promises, we were working with synchronous iterator result objects in which the value property was a Promise object but the done property was synchronous. True asynchronous iterators return Promises for iteration result objects, and both the value and the done properties are asynchronous. The difference is a subtle one: with asynchronous iterators, the choice about when iteration ends can be made asynchronously.

### 异步生成器

As we saw in **Chapter 12**, the easiest way to implement an iterator is often to use a generator. The same is true for asynchronous iterators, which we can implement with generator functions that we declare `async`. An `async` generator has the features of `async` functions and the features of generators: you can use `await` as you would in a regular `async` function, and you can use `yield` as you would in a regular generator. But values that you `yield` are automatically wrapped in Promises. Even the syntax for `async` generators is a combination: `async function` and `function *` combine into `async function *`. Here is an example that shows how you might use an async generator and a `for/await` loop to repetitively run code at fixed intervals using loop syntax instead of a `setInterval()` callback function:

```js
// A Promise-based wrapper around setTimeout() that we can use await with.
// Returns a Promise that fulfills in the specified number of milliseconds
function elapsedTime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// An async generator function that increments a counter and yields it
// a specified (or infinite) number of times at a specified interval.
async function* clock(interval, max = Infinity) {
  for (let count = 1; count <= max; count++) {
    // regular for loop
    await elapsedTime(interval); // wait for time to pass
    yield count; // yield the counter
  }
}

// A test function that uses the async generator with for/await
async function test() {
  // Async so we can use for/await
  for await (let tick of clock(300, 100)) {
    // Loop 100 times every 300ms
    console.log(tick);
  }
}
```

### 实现异步迭代器

Instead of using async generators to implement asynchronous iterators, it is also possible to implement them directly by defining an object with a `Symbol.asyncIterator()` method that returns an object with a `next()` method that returns a Promise that resolves to an iterator result object. In the following code, we re-implement the `clock()` function from the preceding example so that it is not a generator and instead just returns an asynchronously iterable object. Notice that the `next()` method in this example does not explicitly return a Promise; instead, we just declare `next()` to be async:

```js
function clock(interval, max = Infinity) {
  // A Promise-ified version of setTimeout that we can use await with.
  // Note that this takes an absolute time instead of an interval.
  function until(time) {
    return new Promise((resolve) => setTimeout(resolve, time - Date.now()));
  }

  // Return an asynchronously iterable object
  return {
    startTime: Date.now(), // Remember when we started
    count: 1, // Remember which iteration we're on
    async next() {
      // The next() method makes this an iterator
      if (this.count > max) {
        // Are we done?
        return { done: true }; // Iteration result indicating done
      }
      // Figure out when the next iteration should begin,
      let targetTime = this.startTime + this.count * interval;
      // wait until that time,
      await until(targetTime);
      // and return the count value in an iteration result object.
      return { value: this.count++ };
    },
    // This method means that this iterator object is also an iterable.
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
```

This iterator-based version of the `clock()` function fixes a flaw in the generatorbased version. Note that, in this newer code, we target the absolute time at which each iteration should begin and subtract the current time from that in order to compute the interval that we pass to `setTimeout()`. If we use `clock()` with a `for/await` loop, this version will run loop iterations more precisely at the specified interval because it accounts for the time required to actually run the body of the loop. But this fix isn’t just about timing accuracy. The `for/await` loop always waits for the Promise returned by one iteration to be fulfilled before it begins the next iteration. But if you use an asynchronous iterator without a `for/await` loop, there is nothing to prevent you from calling the `next()` method whenever you want. With the generator-based version of `clock()`, if you call the `next()` method three times sequentially, you’ll get three Promises that will all fulfill at almost exactly the same time, which is probably not what you want. The iterator-based version we’ve implemented here does not have that problem.

The benefit of asynchronous iterators is that they allow us to represent streams of asynchronous events or data. The `clock()` function discussed previously was fairly simple to write because the source of the asynchrony was the `setTimeout()` calls we were making ourselves. But when we are trying to work with other asynchronous sources, such as the triggering of event handlers, it becomes substantially harder to implement asynchronous iterators—we typically have a single event handler function that responds to events, but each call to the iterator’s `next()` method must return a distinct Promise object, and multiple calls to `next()` may occur before the first Promise resolves. This means that any asynchronous iterator method must be able to maintain an internal queue of Promises that it resolves in order as asynchronous events are occurring. If we encapsulate this Promise-queueing behavior into an AsyncQueue class, then it becomes much easier to write asynchronous iterators based on AsyncQueue.

The AsyncQueue class that follows has `enqueue()` and `dequeue()` methods as you’d expect for a queue class. The `dequeue()` method returns a Promise rather than an actual value, however, which means that it is OK to call `dequeue()` before `enqueue()` has ever been called. The AsyncQueue class is also an asynchronous iterator, and is intended to be used with a `for/await` loop whose body runs once each time a new value is asynchronously enqueued. (AsyncQueue has a `close()` method. Once called, no more values can be enqueued. When a closed queue is empty, the `for/await` loop will stop looping.)

Note that the implementation of AsyncQueue does not use `async` or `await` and instead works directly with Promises. The code is somewhat complicated, and you can use it to test your understanding of the material we’ve covered in this long chapter. Even if you don’t fully understand the AsyncQueue implementation, do take a look at the shorter example that follows it: it implements a simple but very interesting asynchronous iterator on top of AsyncQueue.

```js
/**
 * An asynchronously iterable queue class. Add values with enqueue()
 * and remove them with dequeue(). dequeue() returns a Promise, which
 * means that values can be dequeued before they are enqueued. The
 * class implements [Symbol.asyncIterator] and next() so that it can
 * be used with the for/await loop (which will not terminate until
 * the close() method is called.)
 */
class AsyncQueue {
  constructor() {
    // Values that have been queued but not dequeued yet are stored here
    this.values = [];
    // When Promises are dequeued before their corresponding values are
    // queued, the resolve methods for those Promises are stored here.
    this.resolvers = [];
    // Once closed, no more values can be enqueued, and no more unfulfilled
    // Promises returned
    this.closed = false;
  }

  enqueue(value) {
    if (this.closed) {
      throw new Error("AsyncQueue closed");
    }
    if (this.resolvers.length > 0) {
      // If this value has already been promised, resolve that Promise
      const resolve = this.resolvers.shift();
      resolve(value);
    } else {
      // Otherwise, queue it up
      this.values.push(value);
    }
  }

  dequeue() {
    if (this.values.length > 0) {
      // If there is a queued value, return a resolved Promise for it
      const value = this.values.shift();
      return Promise.resolve(value);
    } else if (this.closed) {
      // If no queued values and we're closed, return a resolved
      // Promise for the "end-of-stream" marker
      return Promise.resolve(AsyncQueue.EOS);
    } else {
      // Otherwise, return an unresolved Promise,
      // queuing the resolver function for later use
      return new Promise((resolve) => {
        this.resolvers.push(resolve);
      });
    }
  }

  close() {
    // Once the queue is closed, no more values will be enqueued.
    // So resolve any pending Promises with the end-of-stream marker
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }

  // Define the method that makes this class asynchronously iterable
  [Symbol.asyncIterator]() {
    return this;
  }

  // Define the method that makes this an asynchronous iterator. The
  // dequeue() Promise resolves to a value or the EOS sentinel if we're
  // closed. Here, we need to return a Promise that resolves to an
  // iterator result object.
  next() {
    return this.dequeue().then((value) =>
      value === AsyncQueue.EOS
        ? { value: undefined, done: true }
        : { value: value, done: false }
    );
  }
}

// A sentinel value returned by dequeue() to mark "end of stream" when closed
AsyncQueue.EOS = Symbol("end-of-stream");
```

Because this AsyncQueue class defines the asynchronous iteration basics, we can create our own, more interesting asynchronous iterators simply by asynchronously queueing values. Here’s an example that uses AsyncQueue to produce a stream of web browser events that can be handled with a `for/await` loop:

```js
// Push events of the specified type on the specified document element
// onto an AsyncQueue object, and return the queue for use as an event stream
function eventStream(elt, type) {
  const q = new AsyncQueue(); // Create a queue
  elt.addEventListener(type, (e) => q.enqueue(e)); // Enqueue events
  return q;
}

async function handleKeys() {
  // Get a stream of keypress events and loop once for each one
  for await (const event of eventStream(document, "keypress")) {
    console.log(event.key);
  }
}
```

## 总结

In this chapter, you have learned:

- Most real-world JavaScript programming is asynchronous.
- Traditionally, asynchrony has been handled with events and callback functions. This can get complicated, however, because you can end up with multiple levels of callbacks nested inside other callbacks, and because it is difficult to do robust error handling.
- Promises provide a new way of structuring callback functions. If used correctly (and unfortunately, Promises are easy to use incorrectly), they can convert asynchronous code that would have been nested into linear chains of `then()` calls where one asynchronous step of a computation follows another. Also, Promises allow you to centralize your error-handling code into a single `catch()` call at the end of a chain of `then()` calls.
- The `async` and `await` keywords allow us to write asynchronous code that is Promise-based under the hood but that looks like synchronous code. This makes the code easier to understand and reason about. If a function is declared `async`, it will implicitly return a Promise. Inside an `async` function, you can `await` a Promise (or a function that returns a Promise) as if the Promise value was synchronously computed.
- Objects that are asynchronously iterable can be used with a `for/await` loop. You can create asynchronously iterable objects by implementing a `[Symbol.asyncIterator]()` method or by invoking an `async function *` generator function. Asynchronous iterators provide an alternative to “data” events on streams in Node and can be used to represent a stream of user input events in client-side JavaScript.
