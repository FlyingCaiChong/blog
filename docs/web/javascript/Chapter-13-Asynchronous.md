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
让我们回到我们的 URL 获取示例。 当“c1”返回“p4”时，“p2”是`resolved`。 但`resolved`并不等于`fulfilled`，所以任务 3 还没有开始。 当 HTTP 响应的完整正文可用时，`.json() `方法可以解析它并使用解析后的值来使“p4” `fulfilled`。 当“p4”是`fulfilled`时，“p2”也会自动`fulfilled`，并具有相同的解析 JSON 值。 此时，解析后的 JSON 对象被传递给 `c2`，任务 3 开始。
:::

This can be one of the trickiest parts of JavaScript to understand, and you may need to read this section more than once. **Figure 13-1** presents the process in visual form and may help clarify it for you.

::: tip 翻译
这可能是 JavaScript 中最难理解的部分之一，您可能需要多次阅读本节。 **图 13-1** 以可视化形式展示了该过程，可能有助于您理清思路。
:::

![Figure 13-1. Fetching a URL with Promises](/assets/fetching_url.png)
Figure 13-1. Fetching a URL with Promises

### 有关 Promise 和错误的更多信息

Earlier in the chapter, we saw that you can pass a second callback function to the `.then()` method and that this second function will be invoked if the Promise is `rejected`. When that happens, the argument to this second callback function is a value —typically an Error object—that represents the reason for the rejection. We also learned that it is uncommon (and even unidiomatic) to pass two callbacks to a `.then()` method. Instead, Promise-related errors are typically handled by adding a `.catch()` method invocation to a Promise chain. Now that we have examined Promise chains, we can return to error handling and discuss it in more detail. To preface the discussion, I’d like to stress that careful error handling is really important when doing asynchronous programming. With synchronous code, if you leave out error-handling code, you’ll at least get an exception and a stack trace that you can use to figure out what is going wrong. With asynchronous code, unhandled exceptions will often go unreported, and errors can occur silently, making them much harder to debug. The good news is that the `.catch()` method makes it easy to handle errors when working with Promises.

::: tip 翻译
在本章前面，我们看到您可以将第二个回调函数传递给 `.then()` 方法，并且如果 Promise 是 `rejected`，将调用第二个函数。 发生这种情况时，第二个回调函数的参数是一个值（通常是一个 Error 对象），它表示拒绝的原因。 我们还了解到，将两个回调传递给`.then()` 方法是不常见的（甚至是不惯用的）。 相反，与 Promise 相关的错误通常通过向 Promise 链添加 `.catch()` 方法调用来处理。 现在我们已经研究了 Promise 链，我们可以回到错误处理并更详细地讨论它。 作为讨论的序言，我想强调，在进行异步编程时，仔细的错误处理非常重要。 对于同步代码，如果省略错误处理代码，您至少会得到一个异常和一个堆栈跟踪，您可以使用它来找出问题所在。 对于异步代码，未处理的异常通常不会被报告，并且错误可能会悄无声息地发生，从而使调试变得更加困难。 好消息是，使用 Promise 时，`.catch()` 方法可以轻松处理错误。
:::

#### catch 和 finally 方法

The `.catch()` method of a Promise is simply a shorthand way to call `.then()` with `null` as the first argument and an error-handling callback as the second argument. Given any Promise `p` and a callback `c`, the following two lines are equivalent:

::: tip 翻译
Promise 的 `.catch()` 方法只是调用 `.then()` 的一种简写方法，其中第一个参数为 `null`，第二个参数为错误处理回调。 给定任何 Promise `p` 和回调 `c`，以下两行是等效的：
:::

```js
p.then(null, c);
p.catch(c);
```

The `.catch()` shorthand is preferred because it is simpler and because the name matches the `catch` clause in a `try/catch` exception-handling statement. As we’ve discussed, normal exceptions don’t work with asynchronous code. The `.catch()` method of Promises is an alternative that does work for asynchronous code. When something goes wrong in synchronous code, we can speak of an exception “bubbling up the call stack” until it finds a `catch` block. With an asynchronous chain of Promises, the comparable metaphor might be of an error “trickling down the chain” until it finds a `.catch()` invocation.

::: tip 翻译
首选 `.catch()` 简写形式，因为它更简单，而且名称与 `try/catch` 异常处理语句中的 `catch` 子句匹配。 正如我们所讨论的，普通异常不适用于异步代码。 Promises 的 `.catch()` 方法是一种适用于异步代码的替代方法。 当同步代码中出现问题时，我们可以说异常“在调用堆栈中冒泡”，直到找到 `catch` 块。 对于异步的 Promise 链，类似“沿着链向下流动”，直到找到 `.catch()` 调用的比喻，可能是错误的。
:::

In ES2018, Promise objects also define a `.finally()` method whose purpose is similar to the finally clause in a `try/catch/finally` statement. If you add a `.finally()` invocation to your Promise chain, then the callback you pass to `.finally()` will be invoked when the Promise you called it on settles. Your callback will be invoked if the Promise fulfills or rejects, and it will not be passed any arguments, so you can’t find out whether it fulfilled or rejected. But if you need to run some kind of cleanup code (such as closing open files or network connections) in either case, a `.finally()` callback is the ideal way to do that. Like `.then()` and `.catch()`, `.finally()` returns a new Promise object. The return value of a `.finally()` callback is generally ignored, and the Promise returned by `.finally()` will typically resolve or reject with the same value that the Promise that `.finally()` was invoked on resolves or rejects with. If a `.finally()` callback throws an exception, however, then the Promise returned by `.finally()` will reject with that value.

::: tip 翻译
在 ES2018 中，Promise 对象还定义了一个 `.finally()` 方法，其用途类似于 `try/catch/finally` 语句中的 `finally` 子句。 如果你向你的 Promise 链添加一个 `.finally()` 调用，那么当你调用的 Promise 稳定下来时，你传递给 `.finally()` 的回调将会被调用。 如果 Promise 是`fulfilled`或者`rejected`，您的回调将被调用，并且不会传递任何参数，因此您无法知道它是满足还是拒绝。 但是，如果您需要在任何一种情况下运行某种清理代码（例如关闭打开的文件或网络连接），`.finally()` 回调是执行此操作的理想方法。 与 `.then()` 和 `.catch()` 一样，`.finally()` 返回一个新的 Promise 对象。 `.finally()` 回调的返回值通常会被忽略，并且 `.finally()` 返回的 Promise 通常会`resolve`或`reject`，其值与调用 `.finally()` 的 Promise 解析的值一样 `resolve`或`reject`。 但是，如果 `.finally()` 回调抛出异常，则 `.finally()` 返回的 Promise 将以该值`reject`。
:::

The URL-fetching code that we studied in the previous sections did not do any error handling. Let’s correct that now with a more realistic version of the code:

::: tip 翻译
我们在前面几节中学习的 URL 获取代码没有进行任何错误处理。 现在让我们用更现实的代码版本来纠正这个问题：
:::

```js
fetch("/api/user/profile") // 开始HTTP请求
  .then((response) => {
    // 当状态和标头就绪时调用
    if (!response.ok) {
      // 如果我们得到了 404 Not Found 或者类似的错误
      return null; // 可能是未登录用户；返回null
    }

    // 现在检查标头确保服务器发送了 JSON
    // 如果没有，我们的服务器破坏了，这是一个非常严重的错误!
    let type = response.headers.get("content-type");
    if (type !== "application/json") {
      throw new TypeError(`Expected JSON, got ${type}`);
    }

    // 如果我们到这里了，那么我们得到了 2xx 状态和 JSON 标头
    // 因此我们可以肯定地返回一个 Promise 用于响应正文
    // 作为一个 JSON 对象。
    return response.json();
  })
  .then((profile) => {
    // 使用解析的响应正文或 null 进行调用
    if (profile) {
      displayUserProfile(profile);
    } else {
      // 如果我们在上面得到了 404 错误，而返回了 null，则我们到这里
      displayLoggedOutProfilePage();
    }
  })
  .catch((e) => {
    if (e instanceof NetworkError) {
      // 如果网络连接不可用时 fetch() 可以在这种情况下失败
      displayErrorMessage("Check your internet connection.");
    } else if (e instanceof TypeError) {
      // 这个发生在上面抛出 TypeError 时
      displayErrorMessage("Something is wrong with our server!");
    } else {
      // 这个必须是某种意外的错误
      console.error(e);
    }
  });
```

Let’s analyze this code by looking at what happens when things go wrong. We’ll use the naming scheme we used before: `p1` is the Promise returned by the `fetch()` call. `p2` is the Promise returned by the first `.then()` call, and `c1` is the callback that we pass to that `.then()` call. `p3` is the Promise returned by the second `.then()` call, and `c2` is the callback we pass to that call. Finally, `c3` is the callback that we pass to the `.catch()` call. (That call returns a Promise, but we don’t need to refer to it by name.)

::: tip 翻译
让我们分析这段代码，看看出现问题时会发生什么。 我们将使用之前使用的命名方案：`p1` 是 `fetch()` 调用返回的 Promise。 `p2` 是第一个 `.then()` 调用返回的 Promise，而 `c1` 是我们传递给该 `.then()` 调用的回调。 `p3` 是第二个 `.then()` 调用返回的 Promise，而 `c2` 是我们传递给该调用的回调。 最后，`c3` 是我们传递给 `.catch()` 调用的回调。 （该调用返回一个 Promise，但我们不需要通过名称引用它。）
:::

The first thing that could fail is the `fetch()` request itself. If the network connection is down (or for some other reason an HTTP request cannot be made), then Promise `p1` will be `rejected` with a `NetworkError` object. We didn’t pass an error-handling `callback` function as the second argument to the `.then()` call, so `p2` rejects as well with the same `NetworkError` object. (If we had passed an error handler to that first `.then()` call, the error handler would be invoked, and if it returned normally, `p2` would be resolved and/or fulfilled with the return value from that handler.) Without a handler, though, `p2` is rejected, and then `p3` is rejected for the same reason. At this point, the `c3` error-handling callback is called, and the NetworkError-specific code within it runs.

::: tip 翻译
第一个可能失败的是 `fetch()` 请求本身。 如果网络连接断开（或者由于某些其他原因无法发出 HTTP 请求），则 Promise `p1` 将会是 `rejected`，并返回一个 `NetworkError` 对象。 我们没有将错误处理 `callback` 函数作为第二个参数传递给 `.then()` 调用，因此 `p2` 也会拒绝相同的 `NetworkError` 对象。 （如果我们将错误处理程序传递给第一个 `.then()` 调用，则将调用错误处理程序，如果它正常返回，则将使用该处理程序的返回值用于 `p2`将`resolved` 或 `fulfilled`。 ）但是，如果没有处理程序，`p2` 将是`rejected`，然后 `p3` 也会因为同样的原因是`rejected`。 此时，将调用`c3`错误处理回调，并运行其中特定于 `NetworkError` 的代码。
:::

Another way our code could fail is if our HTTP request returns a 404 Not Found or another HTTP error. These are valid HTTP responses, so the `fetch()` call does not consider them errors. `fetch()` encapsulates a 404 Not Found in a Response object and fulfills `p1` with that object, causing `c1` to be invoked. Our code in `c1` checks the `ok` property of the Response object to detect that it has not received a normal HTTP response and handles that case by simply returning `null`. Because this return value is not a Promise, it fulfills `p2` right away, and `c2` is invoked with this value. Our code in `c2` explicitly checks for and handles falsy values by displaying a different result to the user. This is a case where we treat an abnormal condition as a nonerror and handle it without actually using an error handler.

::: tip 翻译
我们的代码可能失败的另一种情况是，如果我们的 HTTP 请求返回 404 Not Found 或其他 HTTP 错误。 这些是有效的 HTTP 响应，因此 `fetch()` 调用不会将它们视为错误。 `fetch()` 将 404 Not Found 封装在 Response 对象中，并使用该对象执行 `p1`，从而调用 `c1`。 我们在 `c1` 中的代码检查 Response 对象的 `ok` 属性，以检测它是否没有收到正常的 HTTP 响应，并通过简单地返回 `null` 来处理这种情况。 因为这个返回值不是 Promise，所以它立即满足 `p2`，并且使用这个值调用 `c2`。 我们在 `c2` 中的代码通过向用户显示不同的结果来显式检查和处理虚假值。 在这种情况下，我们将异常情况视为非错误,并在不实际使用错误处理程序的情况下进行处理。
:::

A more serious error occurs in `c1` if the we get a normal HTTP response code but the Content-Type header is not set appropriately. Our code expects a JSON-formatted response, so if the server is sending us HTML, XML, or plain text instead, we’re going to have a problem. `c1` includes code to check the Content-Type header. If the header is wrong, it treats this as a nonrecoverable problem and throws a `TypeError`. When a callback passed to `.then()` (or `.catch()`) throws a value, the Promise that was the return value of the `.then()` call is `rejected` with that thrown value. In this case, the code in `c1` that raises a `TypeError` causes `p2` to be `rejected` with that `TypeError` object. Since we did not specify an error handler for `p2`, `p3` will be `rejected` as well. `c2` will not be called, and the `TypeError` will be passed to `c3`, which has code to explicitly check for and handle this type of error.

::: tip 翻译
如果我们得到正常的 HTTP 响应代码，但 Content-Type 标头未正确设置，则 `c1` 中会出现更严重的错误。 我们的代码需要 JSON 格式的响应，因此如果服务器向我们发送 HTML、XML 或纯文本，我们就会遇到问题。 `c1` 包含检查 Content-Type 标头的代码。 如果标头错误，它会将其视为不可恢复的问题，并抛出 `TypeError`。 当传递给 `.then()`（或`.catch()`）的回调抛出一个值时，作为`.then()`调用的返回值的 Promise 会被该抛出的值将会是`rejected`。 在这种情况下，`c1` 中引发 `TypeError`的代码会导致`p2`被该`TypeError`对象`rejected`。 由于我们没有为`p2`指定错误处理程序，因此`p3`也将是`rejected`。 `c2` 不会被调用，并且 `TypeError` 将被传递给 `c3`，它具有显式检查和处理此类错误的代码。
:::

There are a couple of things worth noting about this code. First, notice that the error object thrown with a regular, synchronous throw statement ends up being handled asynchronously with a `.catch()` method invocation in a Promise chain. This should make it clear why this shorthand method is preferred over passing a second argument to `.then()`, and also why it is so idiomatic to end Promise chains with a `.catch()` call.

::: tip 翻译
这段代码有几件事值得注意。 首先，请注意，使用常规同步 `throw` 语句抛出的错误对象最终会通过 Promise 链中的 `.catch()` 方法调用进行异步处理。 这应该可以清楚地说明为什么这种简写方法优于向 `.then()` 传递第二个参数，以及为什么用 `.catch()` 调用结束 Promise 链如此惯用。
:::

Before we leave the topic of error handling, I want to point out that, although it is idiomatic to end every Promise chain with a `.catch()` to clean up (or at least log) any errors that occurred in the chain, it is also perfectly valid to use `.catch()` elsewhere in a Promise chain. If one of the stages in your Promise chain can fail with an error, and if the error is some kind of recoverable error that should not stop the rest of the chain from running, then you can insert a `.catch()` call in the chain, resulting in code that might look like this:

::: tip 翻译
在我们离开错误处理主题之前，我想指出的是，尽管习惯上用 `.catch()` 结束每个 Promise 链来清理（或至少记录）链中发生的任何错误， 在 Promise 链的其他地方使用 `.catch()` 也是完全有效的。 如果 Promise 链中的一个阶段可能因错误而失败，并且该错误是某种可恢复的错误，不应阻止链的其余部分运行，那么您可以在 Promise 链中插入`.catch()`调用，结果代码可能如下所示：
:::

```js
startAsyncOperation()
  .then(doStageTwo)
  .catch(recoverFromStageTwoError)
  .then(doStageThree)
  .then(doStageFour)
  .catch(logStageThreeAndFourError);
```

Remember that the callback you pass to `.catch()` will only be invoked if the callback at a previous stage throws an error. If the callback returns normally, then the `.catch()` callback will be skipped, and the return value of the previous callback will become the input to the next `.then()` callback. Also remember that `.catch()` callbacks are not just for reporting errors, but for handling and recovering from errors. Once an error has been passed to a `.catch()` callback, it stops propagating down the Promise chain. A `.catch()` callback can throw a new error, but if it returns normally, than that return value is used to resolve and/or fulfill the associated Promise, and the error stops propagating.

::: tip 翻译
请记住，只有在前一阶段的回调抛出错误时，才会调用传递给 `.catch()` 的回调。 如果回调正常返回，那么`.catch()`回调将被跳过，上一个回调的返回值将成为下一个`.then()`回调的输入。 另请记住，`.catch()` 回调不仅仅用于报告错误，还用于处理错误并从错误中恢复。 一旦错误被传递给 `.catch()` 回调，它就会停止沿着 Promise 链传播。 `.catch()` 回调可能会抛出新错误，但如果它正常返回，则该返回值将用于`resolve`或`fulfill`关联的 Promise，并且错误将停止传播。
:::

Let’s be concrete about this: in the preceding code example, if either `startAsyncOperation()` or `doStageTwo()` throws an error, then the `recoverFromStageTwoError()` function will be invoked. If `recoverFromStageTwoError()` returns normally, then its return value will be passed to `doStageThree()` and the asynchronous operation continues normally. On the other hand, if `recoverFromStageTwoError()` was unable to recover, it will itself throw an error (or it will rethrow the error that it was passed). In this case, neither `doStageThree()` nor `doStageFour()` will be invoked, and the error thrown by `recoverFromStageTwoError()` would be passed to `logStageThreeAndFourErrors()`.

::: tip 翻译
让我们具体说明一下：在前面的代码示例中，如果 `startAsyncOperation()` 或 `doStageTwo()` 抛出错误，则将调用 `recoverFromStageTwoError()` 函数。 如果`recoverFromStageTwoError()` 正常返回，则其返回值将传递给`doStageThree()`，异步操作正常继续。 另一方面，如果 `recoverFromStageTwoError()`无法恢复，它本身会抛出一个错误（或者它将重新抛出它传递的错误）。 在这种情况下，`doStageThree()` 和 `doStageFour()` 都不会被调用，并且 `recoverFromStageTwoError()` 抛出的错误将被传递给`logStageThreeAndFourErrors()`。
:::

Sometimes, in complex network environments, errors can occur more or less at random, and it can be appropriate to handle those errors by simply retrying the asynchronous request. Imagine you’ve written a Promise-based operation to query a database:

::: tip 翻译
有时，在复杂的网络环境中，错误可能或多或少地随机发生，并且通过简单地重试异步请求来处理这些错误是适当的。 假设您编写了一个基于 Promise 的操作来查询数据库：
:::

```js
queryDatabase().then(displayTable).catch(displayDatabaseError);
```

Now suppose that transient network load issues are causing this to fail about 1% of the time. A simple solution might be to retry the query with a `.catch()` call:

::: tip 翻译
现在假设瞬态网络负载问题导致大约 1% 的时间失败。 一个简单的解决方案可能是使用 `.catch()` 调用重试查询：
:::

```js
queryDatabase()
  .catch((e) => wait(500).then(queryDatabase)) // On failure, wait and retry
  .then(displayTable)
  .catch(displayDatabaseError);
```

If the hypothetical failures are truly random, then adding this one line of code should reduce your error rate from 1% to .01%.

::: tip 翻译
如果假设的故障确实是随机的，那么添加这一行代码应该会将错误率从 1% 降低到 0.01%。
:::

##### 从 Promise 回调返回

Let’s return one last time to the earlier URL-fetching example, and consider the `c1` callback that we passed to the first `.then()` invocation. Notice that there are three ways that `c1` can terminate. It can return normally with the Promise returned by the `.json()` call. This causes `p2` to be resolved, but whether that Promise is fulfilled or rejected depends on what happens with the newly returned Promise. `c1` can also return normally with the value null, which causes `p2` to be fulfilled immediately. Finally, `c1` can terminate by throwing an error, which causes `p2` to be rejected. These are the three possible outcomes for a Promise, and the code in `c1` demonstrates how the callback can cause each outcome.

::: tip 翻译
让我们最后一次返回到之前的 URL 获取示例，并考虑我们传递给第一个 `.then()` 调用的 `c1` 回调。 请注意，`c1` 可以通过三种方式终止。 它可以通过 `.json()` 调用返回的 Promise 正常返回。 这会导致 `p2` 被`resolved`，但是该 Promise 是 `fulfilled` 还是 `rejected` 取决于新返回的 Promise 发生了什么。 `c1` 也可以正常返回 `null` 值，这会导致 `p2` 立即`fulfilled`。 最后，`c1` 可以通过抛出错误来终止，这会导致 `p2`被`rejected`。 这是 Promise 的三种可能结果，`c1` 中的代码演示了回调如何导致每种结果。
:::

In a Promise chain, the value returned (or thrown) at one stage of the chain becomes the input to the next stage of the chain, so it is critical to get this right. In practice, forgetting to return a value from a callback function is actually a common source of Promise-related bugs, and this is exacerbated by JavaScript’s arrow function shortcut syntax. Consider this line of code that we saw earlier:

::: tip 翻译
在 Promise 链中，链的一个阶段返回（或抛出）的值将成为链下一阶段的输入，因此正确处理这一点至关重要。 在实践中，忘记从回调函数返回值实际上是 Promise 相关错误的常见来源，而 JavaScript 的箭头函数快捷语法加剧了这种情况。 考虑一下我们之前看到的这行代码：
:::

```js
.catch(e => wait(500).then(queryDatabase))
```

Recall from [Chapter 8](./Chapter-08-Functions.md) that arrow functions allow a lot of shortcuts. Since there is exactly one argument (the error value), we can omit the parentheses. Since the body of the function is a single expression, we can omit the curly braces around the function body, and the value of the expression becomes the return value of the function. Because of these shortcuts, the preceding code is correct. But consider this innocuous-seeming change:

::: tip 翻译
回想一下[第 8 章](./Chapter-08-Functions.md)，箭头函数允许很多快捷方式。 由于只有一个参数（错误值），因此我们可以省略括号。 由于函数体是单个表达式，因此我们可以省略函数体周围的大括号，表达式的值将成为函数的返回值。 由于这些快捷方式，前面的代码是正确的。 但考虑一下这个看似无害的变化：
:::

```js
.catch(e => { wait(500).then(queryDatabase) })
```

By adding the curly braces, we no longer get the automatic return. This function now returns `undefined` instead of returning a Promise, which means that the next stage in this Promise chain will be invoked with `undefined` as its input rather than the result of the retried query. It is a subtle error that may not be easy to debug.

::: tip 翻译
通过添加花括号，我们不再获得自动返回。 该函数现在返回 `undefined` 而不是返回 Promise，这意味着该 Promise 链中的下一个阶段将使用 `undefined` 作为其输入而不是重试查询的结果来调用。 这是一个微妙的错误，可能不容易调试。
:::

### Promises 并发

We’ve spent a lot of time talking about Promise chains for sequentially running the asynchronous steps of a larger asynchronous operation. Sometimes, though, we want to execute a number of asynchronous operations in parallel. The function `Promise.all()` can do this. `Promise.all()` takes an array of Promise objects as its input and returns a Promise. The returned Promise will be `rejected` if any of the input Promises are `rejected`. Otherwise, it will be fulfilled with an array of the fulfillment values of each of the input Promises. So, for example, if you want to fetch the text content of multiple URLs, you could use code like this:

::: tip 翻译
我们花了很多时间讨论用于顺序运行较大异步操作的异步步骤的 Promise 链。 但有时，我们希望并行执行多个异步操作。 函数 `Promise.all()` 可以做到这一点。 `Promise.all()` 将 Promise 对象数组作为输入并返回 Promise。 如果任何输入的 Promise 被`rejected`，则返回的 Promise 将被`rejected`。 否则，它将通过每个输入 Promise 的履行值数组来履行。 因此，例如，如果您想获取多个 URL 的文本内容，您可以使用如下代码：
:::

```js
// 开始使用URls数组
const urls = [
  /* 0个或者多个URL */
];
// 并且转换为Promise对象数组
promises = urls.map((url) => fetch(url).then((r) => r.text()));
// 现在并行运行这些 Promise来获取一个 Promise
Promise.all(promises)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch((e) => console.error(e));
```

`Promise.all()` is slightly more flexible than described before. The input array can contain both Promise objects and non-Promise values. If an element of the array is not a Promise, it is treated as if it is the value of an already fulfilled Promise and is simply copied unchanged into the output array.

::: tip 翻译
`Promise.all()` 比之前描述的稍微灵活一些。 输入数组可以包含 Promise 对象和非 Promise 值。 如果数组的某个元素不是 Promise，则将其视为已`fulfilled`的 Promise 的值，并且简单地将其原封不动地复制到输出数组中。
:::

The Promise returned by `Promise.all()` rejects when any of the input Promises is rejected. This happens immediately upon the first rejection and can happen while other input Promises are still pending. In ES2020, `Promise.allSettled()` takes an array of input Promises and returns a Promise, just like `Promise.all()` does. But `Promise.allSettled()` never rejects the returned Promise, and it does not fulfill that Promise until all of the input Promises have settled. The Promise resolves to an array of objects, with one object for each input Promise. Each of these returned objects has a `status` property set to “fulfilled” or “rejected.” If the status is “fulfilled”, then the object will also have a value property that gives the fulfillment value. And if the status is “rejected”, then the object will also have a `reason` property that gives the error or rejection value of the corresponding Promise:

::: tip 翻译
当任何输入 Promise 被拒绝时，`Promise.all()` 返回的 Promise 也会被拒绝。 这种情况会在第一次拒绝后立即发生，并且可能会在其他输入 Promise 仍在等待处理时发生。 在 ES2020 中，`Promise.allSettled()` 接受一个输入 Promise 数组并返回一个 Promise，就像 `Promise.all()` 一样。 但是 `Promise.allSettled()` 永远不会拒绝返回的 Promise，并且在所有输入 Promise 都`settled`之前它不会`fulfill`该 Promise。 Promise `resolves`为一组对象，每个输入 Promise 都有一个对象。 每个返回的对象都有一个设置为`fulfilled`或`rejected`的`status`属性。 如果状态为`fulfilled`，则该对象还将具有给出履行值的 value 属性。 如果状态是`rejected`，那么该对象还会有一个 `reason` 属性，给出相应 Promise 的错误或拒绝值：
:::

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

::: tip 翻译
有时，您可能想同时运行多个 Promise，但可能只关心第一个要履行的 Promise 的值。 在这种情况下，您可以使用 `Promise.race()` 而不是 `Promise.all()`。 当输入数组中的第一个 Promise 是`fulfilled`或`rejected`时，它返回一个`fulfilled`或`rejected`的 Promise。 （或者，如果输入数组中有任何非 Promise 值，它只返回其中的第一个。）
:::

### 制作 Promises

We’ve used the Promise-returning function `fetch()` in many of the previous examples because it is one of the simplest functions built in to web browsers that returns a Promise. Our discussion of Promises has also relied on hypothetical Promise returning functions `getJSON()` and `wait()`. Functions written to return Promises really are quite useful, and this section shows how you can create your own Promise based APIs. In particular, we’ll show implementations of `getJSON()` and `wait()`.

::: tip 翻译
我们在前面的许多示例中使用了 Promise 返回函数 `fetch()`，因为它是 Web 浏览器中内置的返回 Promise 的最简单函数之一。 我们对 Promise 的讨论还依赖于假设的 Promise 返回函数`getJSON()` 和 `wait()`。 编写返回 Promise 的函数确实非常有用，本节将展示如何创建自己的基于 Promise 的 API。 特别是，我们将展示 `getJSON()` 和 `wait()` 的实现。
:::

#### 基于其它 Promises 的 Promises

It is easy to write a function that returns a Promise if you have some other Promise returning function to start with. Given a Promise, you can always create (and return) a new one by calling `.then()`. So if we use the existing `fetch()` function as a starting point, we can write `getJSON()` like this:

::: tip 翻译
如果您有其他 Promise 返回函数可以开始，那么编写返回 Promise 的函数很容易。 给定一个 Promise，您始终可以通过调用 `.then()` 创建（并返回）一个新的 Promise。 因此，如果我们使用现有的 `fetch()` 函数作为起点，我们可以像这样编写 `getJSON()` ：
:::

```js
function getJSON(url) {
  return fetch(url).then((response) => response.json());
}
```

The code is trivial because the Response object of the `fetch()` API has a predefined `json()` method. The `json()` method returns a Promise, which we return from our callback (the callback is an arrow function with a single-expression body, so the return is implicit), so the Promise returned by `getJSON()` resolves to the Promise returned by `response.json()`. When that Promise fulfills, the Promise returned by `getJSON()` fulfills to the same value. Note that there is no error handling in this `getJSON()` implementation. Instead of checking response.ok and the Content-Type header, we instead just allow the `json()` method to reject the Promise it returned with a SyntaxError if the response body cannot be parsed as JSON.

::: tip 翻译
该代码很简单，因为`fetch()` API 的 Response 对象具有预定义的`json()`方法。 `json()` 方法返回一个 Promise，我们从回调中返回它（回调是一个带有单表达式主体的箭头函数，因此返回是隐式的），因此 `getJSON()` 返回的 Promise 解析为 `response.json()` 返回的 Promise。 当该 Promise `fulfills`时，`getJSON()`返回的 Promise 以相同的值来`fulfills`。 请注意，此 `getJSON()`实现中没有错误处理。 我们不会检查 response.ok 和 Content-Type 标头，而是如果响应正文无法解析为 JSON 时，允许 `json()` 方法拒绝它返回的 Promise，并返回 SyntaxError。
:::

Let’s write another Promise-returning function, this time using `getJSON()` as the source of the initial Promise:

::: tip 翻译
让我们编写另一个 Promise 返回函数，这次使用 `getJSON()` 作为初始 Promise 的来源：
:::

```js
function getHighScore() {
  return getJSON("/api/user/profile").then((profile) => profile.highScore);
}
```

We’re assuming that this function is part of some sort of web-based game and that the URL “/api/user/profile” returns a JSON-formatted data structure that includes a high Score property.

::: tip 翻译
我们假设此函数是某种基于网络的游戏的一部分，并且 URL `/api/user/profile`返回包含`highScore`属性的 JSON 格式的数据结构。
:::

#### 基于同步值的 Promises

Sometimes, you may need to implement an existing Promise-based API and return a Promise from a function, even though the computation to be performed does not actually require any asynchronous operations. In that case, the static methods `Promise.resolve()` and `Promise.reject()` will do what you want. `Promise.resolve()` takes a value as its single argument and returns a Promise that will immediately (but asynchronously) be fulfilled to that value. Similarly, `Promise.reject()` takes a single argument and returns a Promise that will be rejected with that value as the reason. (To be clear: the Promises returned by these static methods are not already fulfilled or rejected when they are returned, but they will fulfill or reject immediately after the current synchronous chunk of code has finished running. Typically, this happens within a few milliseconds unless there are many pending asynchronous tasks waiting to run.)

::: tip 翻译
有时，您可能需要实现现有的基于 Promise 的 API 并从函数返回 Promise，即使要执行的计算实际上不需要任何异步操作。 在这种情况下，静态方法 `Promise.resolve()` 和 `Promise.reject()` 将执行您想要的操作。 `Promise.resolve()` 将一个值作为其单个参数，并返回一个将立即（但异步）实现该值的 Promise。 类似地， `Promise.reject()`采用单个参数并返回一个 Promise，该 Promise 将以该值作为原因被拒绝。 （需要明确的是：这些静态方法返回的 Promise 在返回时尚未履行或拒绝，但它们将在当前同步代码块完成运行后立即履行或拒绝。通常，这会在几毫秒内发生，除非有许多挂起的异步任务等待运行。）
:::

Recall from **§13.2.3** that a resolved Promise is not the same thing as a fulfilled Promise. When we call `Promise.resolve()`, we typically pass the fulfillment value to create a Promise object that will very soon fulfill to that value. The method is not named `Promise.fulfill()`, however. If you pass a Promise `p1` to `Promise.resolve()`, it will return a new Promise `p2`, which is immediately `resolved`, but which will not be `fulfilled` or `rejected` until `p1` is `fulfilled` or `rejected`.

::: tip 翻译
回想一下**§13.2.3**，`resolved`的 Promise 与`fulfilled`的 Promise 不同。 当我们调用 `Promise.resolve()` 时，我们通常会传递履行值来创建一个 Promise 对象，该对象很快就会履行该值。 但是，该方法并未命名为 `Promise.fulfill()`。 如果将 Promise `p1` 传递给 `Promise.resolve()`，它将返回一个新的 Promise `p2`，该 Promise `p2` 会立即`resolved`，但这直到 `p1` 是`fulfilled`或`rejected`后才会`fulfilled`或`rejected`。
:::

It is possible, but unusual, to write a Promise-based function where the value is computed synchronously and returned asynchronously with `Promise.resolve()`. It is fairly common, however, to have synchronous special cases within an asynchronous function, and you can handle these special cases with `Promise.resolve()` and `Promise.reject()`. In particular, if you detect error conditions (such as bad argument values) before beginning an asynchronous operation, you can report that error by returning a Promise created with `Promise.reject()`. (You could also just throw an error synchronously in that case, but that is considered poor form because then the caller of your function needs to write both a synchronous catch clause and use an asynchronous `.catch()` method to handle errors.) Finally, `Promise.resolve()` is sometimes useful to create the initial Promise in a chain of Promises. We’ll see a couple of examples that use it this way.

::: tip 翻译
编写一个基于 Promise 的函数是可能的，但不常见，其中值是通过 `Promise.resolve()` 同步计算并异步返回的。 然而，在异步函数中存在同步特殊情况是相当常见的，您可以使用 `Promise.resolve()` 和 `Promise.reject()` 来处理这些特殊情况。 特别是，如果您在开始异步操作之前检测到错误情况（例如错误的参数值），则可以通过返回使用 `Promise.reject()` 创建的 Promise 来报告该错误。 （在这种情况下，您也可以同步抛出错误，但这被认为是不好的形式，因为函数的调用者需要编写同步 `catch` 子句并使用异步 `.catch()` 方法来处理错误。） 最后，`Promise.resolve()` 有时对于在 Promise 链中创建初始 Promise 很有用。 我们将看到几个以这种方式使用它的示例。
:::

#### 从头开始 Promises

For both `getJSON()` and `getHighScore()`, we started off by calling an existing function to get an initial Promise, and created and returned a new Promise by calling the `.then()` method of that initial Promise. But what about writing a Promise returning function when you can’t use another Promise-returning function as the starting point? In that case, you use the `Promise()` constructor to create a new Promise object that you have complete control over. Here’s how it works: you invoke the `Promise()` constructor and pass a function as its only argument. The function you pass should be written to expect two parameters, which, by convention, should be named `resolve` and `reject`. The constructor synchronously calls your function with function arguments for the `resolve` and `reject` parameters. After calling your function, the `Promise()` constructor returns the newly created Promise. That returned Promise is under the control of the function you passed to the constructor. That function should perform some asynchronous operation and then call the `resolve` function to resolve or fulfill the returned Promise or call the `reject` function to reject the returned Promise. Your function does not have to be asynchronous: it can call `resolve` or `reject` synchronously, but the Promise will still be resolved, fulfilled, or rejected asynchronously if you do this.

::: tip 翻译
对于 `getJSON()` 和 `getHighScore()`，我们首先调用现有函数来获取初始 Promise，然后通过调用该初始 Promise 的 `.then()` 方法创建并返回一个新 Promise。 但是，当您无法使用另一个 Promise 返回函数作为起点时，编写一个 Promise 返回函数怎么样？ 在这种情况下，您可以使用 `Promise()` 构造函数来创建一个您可以完全控制的新 Promise 对象。 它的工作原理如下：调用`Promise()`构造函数并传递一个函数作为其唯一参数。 您传递的函数应编写为需要两个参数，按照惯例，这两个参数应命名为 `resolve` 和 `reject` 。 构造函数使用`resolve`和`reject`参数的函数参数同步调用您的函数。 调用函数后， `Promise()` 构造函数返回新创建的 Promise。 返回的 Promise 由传递给构造函数的函数控制。 该函数应该执行一些异步操作，然后调用`resolve`函数来`resolve`或`fulfill`返回的 Promise，或者调用`reject`函数来`reject`返回的 Promise。 你的函数不必是异步的：它可以同步调用 `resolve` 或 `reject`，但如果你这样做，Promise 仍将被异步`resolved`、`fulfilled`或`rejected`。
:::

It can be hard to understand the functions passed to a function passed to a constructor by just reading about it, but hopefully some examples will make this clear. Here’s how to write the Promise-based `wait()` function that we used in various examples earlier in the chapter:

::: tip 翻译
仅通过阅读来理解传递给构造函数的函数可能很难理解，但希望一些示例能够清楚地说明这一点。 以下是如何编写我们在本章前面的各种示例中使用的基于 Promise 的 `wait()` 函数：
:::

```js
function wait(duration) {
  // 创建并返回一个Promise
  return new Promise((resolve, reject) => {
    // These control the Promise
    // 如果参数无效，拒绝 Promise
    if (duration < 0) {
      reject(new Error("Time travel not yet implemented"));
    }

    // 否则，异步等待并解决 Promise
    // setTimeout将调用resolve()不带参数，这意味着Promise将填充`undefined`值。
    setTimeout(resolve, duration);
  });
}
```

Note that the pair of functions that you use to control the fate of a Promise created with the `Promise()` constructor are named `resolve()` and `reject()`, not `fulfill()` and `reject()`. If you pass a Promise to `resolve()`, the returned Promise will resolve to that new Promise. Often, however, you will pass a non-Promise value, which fulfills the returned Promise with that value.

::: tip 翻译
请注意，用于控制通过`Promise()`构造函数创建的 Promise 的命运的一对函数名为`resolve()`和`reject()`，而不是`fulfill()`和`reject()`。 如果您将 Promise 传递给 `resolve()`，则返回的 Promise 将解析为新的 Promise。 然而，您通常会传递一个非 Promise 值，用该值`fulfills`返回的 Promise。
:::

**Example 13-1** is another example of using the `Promise()` constructor. This one implements our `getJSON()` function for use in Node, where the `fetch()` API is not built in. Remember that we started this chapter with a discussion of asynchronous callbacks and events. This example uses both callbacks and event handlers and is a good demonstration, therefore, of how we can implement Promise-based APIs on top of other styles of asynchronous programming.

::: tip 翻译
**示例 13-1** 是使用 `Promise()` 构造函数的另一个示例。 这个实现了我们在 Node 中使用的 `getJSON()` 函数，其中没有内置 `fetch()` API。请记住，我们在本章开始时讨论了异步回调和事件。 此示例同时使用回调和事件处理程序，因此很好地演示了我们如何在其他异步编程风格之上实现基于 Promise 的 API。
:::

_Example 13-1. An asynchronous `getJSON()` function_

```js
const http = require("http");

function getJSON(url) {
  // 创建并返回一个Promise
  return new Promise((resolve, reject) => {
    // 开始HTTP GET 请求指定的URL
    request = http.get(url, (response) => {
      // 当响应开始时
      // 如果HTTP状态码不是200，拒绝Promise
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP status ${response.statusCode}`));
        response.resume(); // so we don't leak memory
      }
      // 并且拒绝Promise如果响应头不正确
      else if (response.headers["content-type"] !== "application/json") {
        reject(new Error("Invalid content-type"));
        response.resume(); // don't leak memory
      } else {
        // 否则，注册事件来读取响应体
        let body = "";
        response.setEncoding("utf-8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          // 当响应正文完成时，尝试解析
          try {
            let parsed = JSON.parse(body);
            // 如果解析成功，填充Promise
            resolve(parsed);
          } catch (e) {
            // 如果解析失败，拒绝Promise
            reject(e);
          }
        });
      }
    });

    // 我们也拒绝Promise如果请求失败在响应之前(例如网络不可用)
    request.on("error", (error) => {
      reject(error);
    });
  });
}
```

### 按顺序执行的 Promises

`Promise.all()` makes it easy to run an arbitrary number of Promises in parallel. And Promise chains make it easy to express a sequence of a fixed number of Promises. Running an arbitrary number of Promises in sequence is trickier, however. Suppose, for example, that you have an array of URLs to fetch, but that to avoid overloading your network, you want to fetch them one at a time. If the array is of arbitrary length and unknown content, you can’t write out a Promise chain in advance, so you need to build one dynamically, with code like this:

::: tip 翻译
`Promise.all()` 可以轻松并行运行任意数量的 Promise。 Promise 链可以轻松表达固定数量 Promise 的序列。 然而，按顺序运行任意数量的 Promise 会比较棘手。 例如，假设您有一组要获取的 URL，但为了避免网络过载，您希望一次获取一个。 如果数组是任意长度且内容未知，你无法提前写出一条 Promise 链，所以你需要动态构建一个 Promise 链，代码如下：
:::

```js
function fetchSequentially(urls) {
  // 我们将存储 URL 内容的数组
  const bodies = [];

  // 这是一个 Promise-returning 函数，用于获取一个 URL 内容
  function fetchOne(url) {
    return fetch(url)
      .then((response) => response.text())
      .then((body) => {
        // 我们将body保存到数组中，并且在这里故意省略返回值（返回未定义）
        bodies.push(body);
      });
  }

  // 开始时，我们创建一个Promise（值是undefined）
  let p = Promise.resolve(undefined);

  // 现在循环遍历所需的 URL，构建任意长度的 Promise 链，在链的每一阶段获取一个 URL
  for (url of urls) {
    p = p.then(() => fetchOne(url));
  }

  // 当该链中的最后一个 Promise 是`fulfilled`时，body 数组就准备好了。
  // 因此，让我们为该body 数组返回一个Promise。
  // 请注意，我们不包含任何错误处理程序：我们希望允许错误传播给调用者。
  return p.then(() => bodies);
}
```

With this `fetchSequentially()` function defined, we could fetch the URLs one at a time with code much like the fetch-in-parallel code we used earlier to demonstrate `Promise.all()`:

::: tip 翻译
定义了这个 `fetchSequentially()` 函数后，我们就可以一次获取一个 URL，其代码与我们之前用来演示 `Promise.all()` 的并行获取代码非常相似：
:::

```js
fetchSequentially(urls)
  .then((bodies) => {
    /* do something with the array of strings */
  })
  .catch((e) => console.error(e));
```

The `fetchSequentially()` function starts by creating a Promise that will fulfill immediately after it returns. It then builds a long, linear Promise chain off of that initial Promise and returns the last Promise in the chain. It is like setting up a row of dominoes and then knocking the first one over.

::: tip 翻译
`fetchSequentially()` 函数首先创建一个 Promise，该 Promise 在返回后立即`fulfill`。 然后，它根据初始 Promise 构建一个长的线性 Promise 链，并返回链中的最后一个 Promise。 这就像建立一排多米诺骨牌，然后推倒第一张。
:::

There is another (possibly more elegant) approach that we can take. Rather than creating the Promises in advance, we can have the callback for each Promise create and return the next Promise. That is, instead of creating and chaining a bunch of Promises, we instead create Promises that resolve to other Promises. Rather than creating a domino-like chain of Promises, we are instead creating a sequence of Promises nested one inside the other like a set of matryoshka dolls. With this approach, our code can return the first (outermost) Promise, knowing that it will eventually fulfill (or reject!) to the same value that the last (innermost) Promise in the sequence does. The `promiseSequence()` function that follows is written to be generic and is not specific to URL fetching. It is here at the end of our discussion of Promises because it is complicated. If you’ve read this chapter carefully, however, I hope you’ll be able to understand how it works. In particular, note that the nested function inside `promiseSequence()` appears to call itself recursively, but because the “recursive” call is through a `then()` method, there is not actually any traditional recursion happening:

::: tip 翻译
我们可以采取另一种（可能更优雅）的方法。 我们可以为每个 Promise 创建回调并返回下一个 Promise，而不是提前创建 Promise。 也就是说，我们不是创建并链接一堆 Promise，而是创建解析为其他 Promise 的 Promise。 我们不是创建像多米诺骨牌一样的 Promise 链，而是创建一系列相互嵌套的 Promise，就像一组俄罗斯套娃一样。 通过这种方法，我们的代码可以返回第一个（最外层）Promise，因为知道它最终将实现（或拒绝！）与序列中最后一个（最内层）Promise 的值相同。 接下来的 `promiseSequence()` 函数被编写为通用函数，并不特定于 URL 获取。 这是我们对 Promise 讨论的最后部分，因为它很复杂。 但是，如果您仔细阅读了本章，我希望您能够理解它是如何工作的。 特别要注意的是，`promiseSequence()` 中的嵌套函数似乎递归地调用自身，但由于“递归”调用是通过 `then()` 方法，因此实际上并没有发生任何传统的递归：
:::

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

::: tip 翻译
这个 `promiseSequence()` 函数有意是通用的。 我们可以使用它来获取 URL，代码如下：
:::

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

::: tip 翻译
ES2017 引入了两个新关键字 `async` 和 `await`，它们代表了异步 JavaScript 编程的范式转变。 这些新关键字极大地简化了 Promise 的使用，并允许我们编写基于 Promise 的异步代码，这些代码看起来就像在等待网络响应或其他异步事件时阻塞的同步代码。 尽管了解 Promise 的工作原理仍然很重要，但当您将它们与 `async` 和 `await` 一起使用时，它们的大部分复杂性（有时甚至它们的存在！）就会消失。
:::

As we discussed earlier in the chapter, asynchronous code can’t return a value or throw an exception the way that regular synchronous code can. And this is why Promises are designed the way the are. The value of a fulfilled Promise is like the return value of a synchronous function. And the value of a rejected Promise is like a value thrown by a synchronous function. This latter similarity is made explicit by the naming of the `.catch()` method. `async` and `await` take efficient, Promise-based code and hide the Promises so that your asynchronous code can be as easy to read and as easy to reason about as inefficient, blocking, synchronous code.

::: tip 翻译
正如我们在本章前面讨论的，异步代码无法像常规同步代码那样返回值或抛出异常。 这就是 Promise 如此设计的原因。 已完成的 Promise 的值就像同步函数的返回值。 被拒绝的 Promise 的值就像同步函数抛出的值。 后者的相似性通过 `.catch()` 方法的命名而变得明确。 `async` 和 `await` 采用高效的、基于 Promise 的代码并隐藏 Promise，以便您的异步代码可以像低效、阻塞的同步代码一样易于阅读和推理。
:::

### await 表达式

The `await` keyword takes a Promise and turns it back into a return value or a thrown exception. Given a Promise object `p`, the expression `await` `p` waits until `p` settles. If `p` fulfills, then the value of `await` `p` is the fulfillment value of `p`. On the other hand, if `p` is rejected, then the `await` `p` expression throws the rejection value of `p`. We don’t usually use `await` with a variable that holds a Promise; instead, we use it before the invocation of a function that returns a Promise:

::: tip 翻译
`await` 关键字接受一个 Promise 并将其返回为返回值或抛出的异常。 给定一个 Promise 对象 `p`，表达式`await` `p`会等待，直到`p` `settles`。 如果`p` `fulfills`，则`await` `p`的值就是`p`的满足值。 另一方面，如果`p`是`rejected`，则`await` `p`表达式将抛出`p`的拒绝值。 我们通常不会将`await`与保存 Promise 的变量一起使用； 相反，我们在调用返回 Promise 的函数之前使用它：
:::

```js
let response = await fetch("/api/user/profile");
let profile = await response.json();
```

It is critical to understand right away that the `await` keyword does not cause your program to block and literally do nothing until the specified Promise settles. The code remains asynchronous, and the `await` simply disguises this fact. This means that _any code that uses `await` is itself asynchronous._

::: tip 翻译
立即了解`await`关键字不会导致程序阻塞，并且在指定的 Promise 解决之前不会执行任何操作，这一点至关重要。 代码仍然是异步的，而`await`只是掩盖了这一事实。 这意味着 _任何使用 `await` 的代码本身都是异步的。_
:::

### async 函数

Because any code that uses `await` is asynchronous, there is one critical rule: you can only use the `await` keyword within functions that have been declared with the `async` keyword. Here’s a version of the `getHighScore()` function from earlier in the chapter, rewritten to use `async` and `await`:

::: tip 翻译
由于任何使用`await`的代码都是异步的，因此有一个关键规则：只能在使用`async`关键字声明的函数中使用`await`关键字。 这是本章前面的`getHighScore()`函数的一个版本，重写为使用`async`和`await`：
:::

```js
async function getHighScore() {
  let response = await fetch("/api/user/profile");
  let profile = await response.json();
  return profile.highScore;
}
```

Declaring a function `async` means that the return value of the function will be a Promise even if no Promise-related code appears in the body of the function. If an `async` function appears to return normally, then the Promise object that is the real return value of the function will resolve to that apparent return value. And if an `async` function appears to throw an exception, then the Promise object that it returns will be rejected with that exception.

::: tip 翻译
声明一个函数为`async`意味着即使函数体中没有出现与 Promise 相关的代码，该函数的返回值也将是一个 Promise。 如果`async`函数看起来正常返回，那么作为该函数的实际返回值的 Promise 对象将解析为该明显的返回值。 如果`async`函数似乎抛出异常，那么它返回的 Promise 对象将因该异常而被拒绝。
:::

The `getHighScore()` function is declared `async`, so it returns a Promise. And because it returns a Promise, we can use the `await` keyword with it:

::: tip 翻译
`getHighScore()` 函数被声明为 `async`，因此它返回一个 Promise。 因为它返回一个 Promise，所以我们可以使用 `await` 关键字：
:::

```js
displayHighScore(await getHightScore());
```

But remember, that line of code will only work if it is inside another `async` function! You can nest `await` expressions within `async` functions as deeply as you want. But if you’re at the top level or are inside a function that is not `async` for some reason, then you can’t use `await` and have to deal with a returned Promise in the regular way:

::: tip 翻译
但请记住，该行代码仅在另一个`async`函数内才有效！ 您可以根据需要在`async`函数中嵌套`await`表达式。 但是如果你位于顶层或者由于某种原因位于非`async`的函数中，那么你就不能使用`await`并且必须以常规方式处理返回的 Promise：
:::

```js
getHightScore().then(displayHighScore).catch(console.error);
```

You can use the `async` keyword with any kind of function. It works with the function keyword as a statement or as an expression. It works with arrow functions and with the method shortcut form in classes and object literals. (See [Chapter 8](./Chapter-08-Functions.md) for more about the various ways to write functions.)

::: tip 翻译
您可以将 `async` 关键字与任何类型的函数一起使用。 它使用 function 关键字作为语句或表达式。 它与箭头函数以及类和对象文字中的方法快捷方式一起使用。 （有关编写函数的各种方法的更多信息，请参阅 [第 8 章](./Chapter-08-Functions.md)。）
:::

### 等待多个 Promise

Suppose that we’ve written our `getJSON()` function using `async`:

::: tip 翻译
假设我们使用`async`编写了`getJSON()`函数：
:::

```js
async function getJSON(url) {
  let response = await fetch(url);
  let body = await response.json();
  return body;
}
```

And now suppose that we want to fetch two JSON values with this function:

::: tip 翻译
现在假设我们想用这个函数获取两个 JSON 值：
:::

```js
let value1 = await getJSON(url1);
let value2 = await getJSON(url2);
```

The problem with this code is that it is unnecessarily sequential: the fetch of the second URL will not begin until the first fetch is complete. If the second URL does not depend on the value obtained from the first URL, then we should probably try to fetch the two values at the same time. This is a case where the Promise-based nature of `async` functions shows. In order to await a set of concurrently executing `async` functions, we use `Promise.all()` just as we would if working with Promises directly:

::: tip 翻译
此代码的问题在于它不必要地按顺序进行：直到第一个提取完成后才会开始提取第二个 URL。 如果第二个 URL 不依赖于从第一个 URL 获取的值，那么我们可能应该尝试同时获取这两个值。 这是`async`函数基于 Promise 的本质的例子。 为了等待一组并发执行的`async`函数，我们使用`Promise.all()`，就像直接使用 Promises 一样：
:::

```js
let [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);
```

### 详细实现

Finally, in order to understand how `async` functions work, it may help to think about what is going on under the hood.

::: tip 翻译
最后，为了理解 `async` 函数如何工作，考虑一下幕后发生的事情可能会有所帮助。
:::

Suppose you write an `async` function like this:

::: tip 翻译
假设你编写了一个像这样的`async`函数：
:::

```js
async function f(x) {
  /* body */
}
```

You can think about this as a Promise-returning function wrapped around the body of your original function:

::: tip 翻译
您可以将其视为包裹在原始函数主体中的 Promise 返回函数：
:::

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

::: tip 翻译
用像这样的语法转换来表达 `await` 关键字比较困难。 但是，可以将 `await`关键字视为将函数体分解为单独的同步块的标记。 ES2017 解释器可以将函数体分解为一系列单独的子函数，每个子函数都会传递给其前面标记为 `await` 的 Promise 的 `then()` 方法。
:::

## 异步迭代

We began this chapter with a discussion of callback- and event-based asynchrony, and when we introduced Promises, we noted that they were useful for single-shot asynchronous computations but were not suitable for use with sources of repetitive asynchronous events, such as `setInterval()`, the “click” event in a web browser, or the “data” event on a Node stream. Because single Promises do not work for sequences of asynchronous events, we also cannot use regular `async` functions and the `await` statements for these things.

::: tip 翻译
我们在本章开始时讨论了基于回调和基于事件的异步，当我们介绍 Promises 时，我们注意到它们对于单次异步计算很有用，但不适合与重复异步事件源一起使用，例如 `setInterval()`、Web 浏览器中的`click`事件或 Node 流上的`data`事件。 因为单个 Promise 不适用于异步事件序列，所以我们也不能使用常规的`async`函数和`await`语句来处理这些事情。
:::

ES2018 provides a solution, however. Asynchronous iterators are like the iterators described in [Chapter 12](./Chapter-12-Iterators_Generators.md), but they are Promise-based and are meant to be used with a new form of the `for/of` loop: `for/await`.

::: tip 翻译
然而，ES2018 提供了一个解决方案。 异步迭代器类似于[第 12 章](./Chapter-12-Iterators_Generators.md)中描述的迭代器，但它们是基于 Promise 的，并且旨在与新形式的 `for/of` 循环一起使用：`for/await`。
:::

### for/await 循环

Node 12 makes its readable streams asynchronously iterable. This means you can read successive chunks of data from a stream with a `for/await` loop like this one:

::: tip 翻译
Node 12 使其可读流可异步迭代。 这意味着您可以使用`for/await`循环从流中读取连续的数据块，如下所示：
:::

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

::: tip 翻译
与常规的 `await` 表达式一样，`for/await` 循环是基于 Promise 的。 粗略地说，异步迭代器生成一个 Promise，`for/await` 循环等待该 Promise 实现，将实现值分配给循环变量，然后运行循环体。 然后它重新开始，从迭代器获取另一个 Promise 并等待新的 Promise 完成。
:::

Suppose you have an array of URLs:

::: tip 翻译
假设您有一个 URL 数组：
:::

```js
const urls = [url1, url2, url3];
```

You can call `fetch()` on each URL to get an array of Promises:

::: tip 翻译
您可以在每个 URL 上调用 `fetch()` 来获取一个数组的 Promise。
:::

```js
const promises = urls.map((url) => fetch(url));
```

We saw earlier in the chapter that we could now use `Promise.all()` to wait for all the Promises in the array to be fulfilled. But suppose we want the results of the first fetch as soon as they become available and don’t want to wait for all the URLs to be fetched. (Of course, the first fetch might take longer than any of the others, so this is not necessarily faster than using `Promise.all()`.) Arrays are iterable, so we can iterate through the array of promises with a regular `for/of` loop:

::: tip 翻译
我们在本章前面看到，我们现在可以使用 `Promise.all()` 来等待数组中的所有 Promise 都得到满足。 但是假设我们希望第一次获取的结果一可用就得到，并且不想等待所有 URL 都被获取。 （当然，第一次获取可能比其他任何一次获取都需要更长的时间，因此这不一定比使用 `Promise.all()` 更快。）数组是可迭代的，因此我们可以使用常规`for/of`循环迭代 Promise 数组 ：
:::

```js
for (const promise of promises) {
  response = await promise;
  handle(response);
}
```

This example code uses a regular `for/of` loop with a regular iterator. But because this iterator returns Promises, we can also use the new `for/await` for slightly simpler code:

::: tip 翻译
此示例代码使用常规 `for/of` 循环和常规迭代器。 但因为这个迭代器返回 Promises，我们还可以使用新的 `for/await` 来实现稍微简单的代码：
:::

```js
for await (const response of promises) {
  handle(response);
}
```

In this case, the `for/await` loop just builds the `await` call into the loop and makes our code slightly more compact, but the two examples do exactly the same thing. Importantly, both examples will only work if they are within functions declared `async`; a `for/await` loop is no different than a regular `await` expression in that way.

::: tip 翻译
在这种情况下，`for/await` 循环只是将`await`调用构建到循环中，并使我们的代码稍微更紧凑，但这两个示例执行完全相同的操作。 重要的是，这两个示例仅在声明为`async`的函数内才有效； 在这方面，`for/await`循环与常规 `await` 表达式没有什么不同。
:::

It is important to realize, however, that we’re using `for/await` with a regular iterator in this example. Things are more interesting with fully asynchronous iterators.

::: tip 翻译
然而，重要的是要认识到，在本例中我们将 `for/await` 与常规迭代器一起使用。 完全异步的迭代器会让事情变得更有趣。
:::

### 异步迭代器

Let’s review some terminology from [Chapter 12](./Chapter-12-Iterators_Generators.md). An iterable object is one that can be used with a `for/of` loop. It defines a method with the symbolic name `Symbol.iterator`. This method returns an iterator object. The iterator object has a `next()` method, which can be called repeatedly to obtain the values of the iterable object. The `next()` method of the iterator object returns iteration result objects. The iteration result object has a value property and/or a `done` property.

::: tip 翻译
让我们回顾一下[第 12 章](./Chapter-12-Iterators_Generators.md)中的一些术语。 可迭代对象是可以与 `for/of` 循环一起使用的对象。 它定义了一个名为 `Symbol.iterator` 的方法。 该方法返回一个迭代器对象。 迭代器对象有一个 `next()` 方法，可以重复调用该方法来获取可迭代对象的值。 迭代器对象的 `next()` 方法返回迭代结果对象。 迭代结果对象具有 `value` 属性和 `done` 属性。
:::

Asynchronous iterators are quite similar to regular iterators, but there are two important differences. First, an asynchronously iterable object implements a method with the symbolic name `Symbol.asyncIterator` instead of `Symbol.iterator`. (As we saw earlier, `for/await` is compatible with regular iterable objects but it prefers asynchronously iterable objects, and tries the `Symbol.asyncIterator` method before it tries the `Symbol.iterator` method.) Second, the `next()` method of an asynchronous iterator returns a Promise that resolves to an iterator result object instead of returning an iterator result object directly.

::: tip 翻译
异步迭代器与常规迭代器非常相似，但有两个重要的区别。 首先，异步可迭代对象实现一个符号名称为 `Symbol.asyncIterator` 而不是 `Symbol.iterator` 的方法。 （正如我们之前看到的， `for/await` 与常规可迭代对象兼容，但它更喜欢异步可迭代对象，并在尝试 `Symbol.iterator` 方法之前尝试 `Symbol.asyncIterator` 方法。）其次，异步迭代器的 `next()` 方法返回一个解析为迭代器结果对象的 Promise，而不是直接返回迭代器结果对象。
:::

> In the previous section, when we used `for/await` on a regular, synchronously iterable array of Promises, we were working with synchronous iterator result objects in which the value property was a Promise object but the done property was synchronous. True asynchronous iterators return Promises for iteration result objects, and both the value and the done properties are asynchronous. The difference is a subtle one: with asynchronous iterators, the choice about when iteration ends can be made asynchronously.

> 在上一节中，当我们在常规的同步可迭代 Promise 数组上使用 `for/await` 时，我们使用的是同步迭代器结果对象，其中 `value` 属性是 Promise 对象，但 `done` 属性是同步的。 真正的异步迭代器为迭代结果对象返回 Promises，并且 `value` 和 `done` 属性都是异步的。 区别是微妙的：对于异步迭代器，可以异步选择迭代何时结束。

### 异步生成器

As we saw in [Chapter 12](./Chapter-12-Iterators_Generators.md), the easiest way to implement an iterator is often to use a generator. The same is true for asynchronous iterators, which we can implement with generator functions that we declare `async`. An `async` generator has the features of `async` functions and the features of generators: you can use `await` as you would in a regular `async` function, and you can use `yield` as you would in a regular generator. But values that you `yield` are automatically wrapped in Promises. Even the syntax for `async` generators is a combination: `async function` and `function *` combine into `async function *`. Here is an example that shows how you might use an async generator and a `for/await` loop to repetitively run code at fixed intervals using loop syntax instead of a `setInterval()` callback function:

::: tip 翻译
正如我们在[第 12 章](./Chapter-12-Iterators_Generators.md)中看到的，实现迭代器的最简单方法通常是使用生成器。 异步迭代器也是如此，我们可以使用声明为 `async` 的生成器函数来实现异步迭代器。 `async`生成器具有`async` 函数的功能和生成器的功能：您可以像在常规 `async` 函数中一样使用 `await` ，并且可以像在常规生成器中一样使用`yield` 。 但是你 `yield` 的值会自动包装在 Promise 中。 甚至 `async` 生成器的语法也是一个组合：`async function` 和 `function *` 组合成 `async function *`。 下面的示例展示了如何使用异步生成器和 `for/await` 循环，使用循环语法而不是 `setInterval()` 回调函数以固定时间间隔重复运行代码：
:::

```js
// 一个基于 Promise 的 setTimeout() 包装器，我们可以将 await 与它一起使用。
// 返回一个在指定毫秒数内完成的 Promise
function elapsedTime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 一个异步生成器函数，它递增计数器并以指定的时间间隔生成指定（或无限）次数的计数器。
async function* clock(interval, max = Infinity) {
  for (let count = 1; count <= max; count++) {
    // 常规循环
    await elapsedTime(interval); // 等待时间过去
    yield count; // 产生计数器
  }
}

// 一个测试函数用于使用异步生成器和 `for/await`
async function test() {
  // 使用async ， 因此可以用 for/await
  for await (let tick of clock(300, 100)) {
    // 每300ms循环100次
    console.log(tick);
  }
}
```

### 实现异步迭代器

Instead of using async generators to implement asynchronous iterators, it is also possible to implement them directly by defining an object with a `Symbol.asyncIterator()` method that returns an object with a `next()` method that returns a Promise that resolves to an iterator result object. In the following code, we re-implement the `clock()` function from the preceding example so that it is not a generator and instead just returns an asynchronously iterable object. Notice that the `next()` method in this example does not explicitly return a Promise; instead, we just declare `next()` to be async:

::: tip 翻译
除了使用异步生成器来实现异步迭代器之外，还可以通过使用 `Symbol.asyncIterator()` 方法定义一个对象来直接实现它们，该方法返回一个带有 `next()` 方法的对象，该方法返回一个解析的 Promise 到迭代器结果对象。 在下面的代码中，我们重新实现了前面示例中的 `clock()` 函数，使其不是生成器，而只是返回一个异步可迭代对象。 请注意，此示例中的 `next()` 方法没有显式返回 Promise； 相反，我们只需将 `next()` 声明为异步：
:::

```js
function clock(interval, max = Infinity) {
  // 我们可以使用 wait 的 setTimeout 的 Promise 版本。
  // 请注意，这需要绝对时间而不是间隔。
  function until(time) {
    return new Promise((resolve) => setTimeout(resolve, time - Date.now()));
  }

  // 返回一个异步可迭代对象
  return {
    startTime: Date.now(), // 记录开始事件
    count: 1, // 记录我们正在进行哪个迭代
    async next() {
      // next() 方法使其成为迭代器
      if (this.count > max) {
        // Are we done?
        return { done: true }; // 迭代结果表明完成
      }
      // 找出下一次迭代何时开始，
      let targetTime = this.startTime + this.count * interval;
      // await 那个时候，
      await until(targetTime);
      // 并在迭代结果对象中返回计数值。
      return { value: this.count++ };
    },
    // 这个方法意味着这个迭代器对象也是一个可迭代对象。
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
```

This iterator-based version of the `clock()` function fixes a flaw in the generator based version. Note that, in this newer code, we target the absolute time at which each iteration should begin and subtract the current time from that in order to compute the interval that we pass to `setTimeout()`. If we use `clock()` with a `for/await` loop, this version will run loop iterations more precisely at the specified interval because it accounts for the time required to actually run the body of the loop. But this fix isn’t just about timing accuracy. The `for/await` loop always waits for the Promise returned by one iteration to be fulfilled before it begins the next iteration. But if you use an asynchronous iterator without a `for/await` loop, there is nothing to prevent you from calling the `next()` method whenever you want. With the generator-based version of `clock()`, if you call the `next()` method three times sequentially, you’ll get three Promises that will all fulfill at almost exactly the same time, which is probably not what you want. The iterator-based version we’ve implemented here does not have that problem.

::: tip 翻译
这个基于迭代器的 `clock()` 函数版本修复了基于生成器的版本中的缺陷。 请注意，在这段较新的代码中，我们以每次迭代开始的绝对时间为目标，并从中减去当前时间，以计算传递给 `setTimeout()` 的时间间隔。 如果我们将 `clock()` 与 `for/await` 循环一起使用，则此版本将在指定的时间间隔更精确地运行循环迭代，因为它考虑了实际运行循环体所需的时间。 但这个修复不仅仅涉及计时准确性。 `for/await` 循环总是等待一次迭代返回的 Promise 得到满足，然后才开始下一次迭代。 但是，如果您使用不带 `for/await` 循环的异步迭代器，则没有什么可以阻止您随时调用`next()`方法。 使用基于生成器的 `clock()` 版本，如果您连续调用 `next()` 方法三次，您将得到三个 Promise，它们几乎完全同时满足，这可能不是您想要的。 我们在这里实现的基于迭代器的版本没有这个问题。
:::

The benefit of asynchronous iterators is that they allow us to represent streams of asynchronous events or data. The `clock()` function discussed previously was fairly simple to write because the source of the asynchrony was the `setTimeout()` calls we were making ourselves. But when we are trying to work with other asynchronous sources, such as the triggering of event handlers, it becomes substantially harder to implement asynchronous iterators—we typically have a single event handler function that responds to events, but each call to the iterator’s `next()` method must return a distinct Promise object, and multiple calls to `next()` may occur before the first Promise resolves. This means that any asynchronous iterator method must be able to maintain an internal queue of Promises that it resolves in order as asynchronous events are occurring. If we encapsulate this Promise-queueing behavior into an AsyncQueue class, then it becomes much easier to write asynchronous iterators based on AsyncQueue.

::: tip 翻译
异步迭代器的好处是它们允许我们表示异步事件或数据流。 前面讨论的 `clock()` 函数编写起来相当简单，因为异步的根源是我们自己进行的 `setTimeout()` 调用。 但是，当我们尝试使用其他异步源（例如事件处理程序的触发）时，实现异步迭代器变得更加困难 - 我们通常有一个响应事件的事件处理程序函数，但每次调用迭代器的`next()` 方法必须返回一个不同的 Promise 对象，并且在第一个 Promise 解析之前可能会多次调用 `next()`。 这意味着任何异步迭代器方法都必须能够维护一个内部 Promise 队列，并在异步事件发生时按顺序解析该队列。 如果我们将这种 Promise 排队行为封装到 `AsyncQueue` 类中，那么基于 `AsyncQueue` 编写异步迭代器就会变得容易得多。
:::

The AsyncQueue class that follows has `enqueue()` and `dequeue()` methods as you’d expect for a queue class. The `dequeue()` method returns a Promise rather than an actual value, however, which means that it is OK to call `dequeue()` before `enqueue()` has ever been called. The AsyncQueue class is also an asynchronous iterator, and is intended to be used with a `for/await` loop whose body runs once each time a new value is asynchronously enqueued. (AsyncQueue has a `close()` method. Once called, no more values can be enqueued. When a closed queue is empty, the `for/await` loop will stop looping.)

::: tip 翻译
正如您对队列类所期望的那样，后面的 AsyncQueue 类具有 `enqueue()` 和 `dequeue()` 方法。 然而，`dequeue()` 方法返回一个 Promise，而不是实际值，这意味着可以在调用`enqueue()` 之前调用 `dequeue()`。 AsyncQueue 类也是一个异步迭代器，旨在与 `for/await` 循环一起使用，每次异步排队新值时，循环体都会运行一次。 （AsyncQueue 有一个`close()`方法。一旦调用，就不能再入队。当关闭的队列为空时，`for/await` 循环将停止循环。）
:::

Note that the implementation of AsyncQueue does not use `async` or `await` and instead works directly with Promises. The code is somewhat complicated, and you can use it to test your understanding of the material we’ve covered in this long chapter. Even if you don’t fully understand the AsyncQueue implementation, do take a look at the shorter example that follows it: it implements a simple but very interesting asynchronous iterator on top of AsyncQueue.

::: tip 翻译
请注意，AsyncQueue 的实现不使用 `async` 或 `await`，而是直接使用 Promises。 该代码有些复杂，您可以使用它来测试您对我们在这一长章中介绍的内容的理解。 即使您不完全理解 AsyncQueue 实现，也请看一下它后面的较短示例：它在 AsyncQueue 之上实现了一个简单但非常有趣的异步迭代器。
:::

```js
/**
 * 异步可迭代队列类。
 * 使用 enqueue() 添加值并使用 dequeue() 删除它们。
 * dequeue() 返回一个 Promise，这意味着值可以在入队之前出队。
 * 该类实现了 [Symbol.asyncIterator] 和 next()，
 * 以便它可以与 for/await 循环一起使用（在调用 close() 方法之前不会终止。）
 */
class AsyncQueue {
  constructor() {
    // 已排队但尚未出队的值存储在此处
    this.values = [];
    // 当 Promise 在其对应的值排队之前出列时，
    // 这些 Promise 的解析方法将存储在此处。
    this.resolvers = [];
    // 一旦关闭，就不能再排队任何值，也不再返回未履行的 Promise
    this.closed = false;
  }

  enqueue(value) {
    if (this.closed) {
      throw new Error("AsyncQueue closed");
    }
    if (this.resolvers.length > 0) {
      // 如果该值已被承诺，则解决该承诺
      const resolve = this.resolvers.shift();
      resolve(value);
    } else {
      // 否则，将其排队
      this.values.push(value);
    }
  }

  dequeue() {
    if (this.values.length > 0) {
      // 如果有排队值，则为其返回已解决的 Promise
      const value = this.values.shift();
      return Promise.resolve(value);
    } else if (this.closed) {
      // 如果没有排队值并且我们已关闭，则返回“流结束”标记的已解决 Promise
      return Promise.resolve(AsyncQueue.EOS);
    } else {
      // 否则，返回一个未解析的 Promise，
      // 将解析器函数排队以供以后使用
      return new Promise((resolve) => {
        this.resolvers.push(resolve);
      });
    }
  }

  close() {
    // 一旦队列关闭，就不会再有任何值入队。
    // 因此，使用流结束标记解决任何待处理的 Promise
    while (this.resolvers.length > 0) {
      this.resolvers.shift()(AsyncQueue.EOS);
    }
    this.closed = true;
  }

  // 定义使此类异步可迭代的方法
  [Symbol.asyncIterator]() {
    return this;
  }

  // 定义使其成为异步迭代器的方法。
  // 如果我们关闭， dequeue() Promise 会解析为一个值或 EOS 哨兵。
  // 在这里，我们需要返回一个解析为迭代器结果对象的 Promise。
  next() {
    return this.dequeue().then((value) =>
      value === AsyncQueue.EOS
        ? { value: undefined, done: true }
        : { value: value, done: false }
    );
  }
}

// dequeue() 返回的哨兵值，用于在关闭时标记“流结束”
AsyncQueue.EOS = Symbol("end-of-stream");
```

Because this AsyncQueue class defines the asynchronous iteration basics, we can create our own, more interesting asynchronous iterators simply by asynchronously queueing values. Here’s an example that uses AsyncQueue to produce a stream of web browser events that can be handled with a `for/await` loop:

::: tip 翻译
因为这个 AsyncQueue 类定义了异步迭代基础知识，所以我们可以通过异步排队值来创建我们自己的、更有趣的异步迭代器。 下面是一个使用 AsyncQueue 生成 Web 浏览器事件流的示例，可以使用 `for/await` 循环处理这些事件流：
:::

```js
// 将指定文档元素上指定类型的事件推送到 AsyncQueue 对象上，并返回队列以用作事件流
function eventStream(elt, type) {
  const q = new AsyncQueue(); // 创建一个队列
  elt.addEventListener(type, (e) => q.enqueue(e)); // Enqueue事件
  return q;
}

async function handleKeys() {
  // 获取按键事件流并为每个事件循环一次
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

::: tip 翻译
在本章中，您学习了：

- 大多数现实世界的 JavaScript 编程都是异步的。
- 传统上，异步是通过事件和回调函数来处理的。 然而，这可能会变得复杂，因为您最终可能会得到嵌套在其他回调中的多个级别的回调，并且很难进行可靠的错误处理。
- Promise 提供了一种构造回调函数的新方法。 如果使用正确（不幸的是，Promise 很容易被错误使用），它们可以将嵌套的异步代码转换到 `then()` 调用的线性链中的，其中计算的一个异步步骤跟随另一个计算步骤。 此外，Promise 允许您将错误处理代码集中到 `then()` 调用链末尾的单个 `catch()` 调用中。
- `async` 和 `await` 关键字允许我们编写基于 Promise 的异步代码，但看起来像同步代码。 这使得代码更容易理解和推理。 如果一个函数被声明为 `async`，它将隐式返回一个 Promise。 在 `async` 函数内，您可以 `await` 一个 Promise（或返回 Promise 的函数），就好像 Promise 值是同步计算的一样。
- 异步可迭代的对象可以与 `for/await` 循环一起使用。 您可以通过实现 `[Symbol.asyncIterator]()` 方法或调用 `async function *` 生成器函数来创建异步可迭代对象。 异步迭代器提供了 Node 中流上“数据”事件的替代方案，可用于表示客户端 JavaScript 中的用户输入事件流。
  :::
