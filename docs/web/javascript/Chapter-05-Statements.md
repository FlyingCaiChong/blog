---
title: 第五章 语句
---

# 语句

[[toc]]

[Chapter 4](./Chapter-04-Expressions_Operators.md) described expressions as JavaScript phrases. By that analogy, statements are JavaScript sentences or commands. Just as English sentences are terminated and separated from one another with periods, JavaScript statements are terminated with semicolons (§2.6). Expressions are evaluated to produce a value, but statements are executed to make something happen.

::: tip 翻译
[第 4 章](./Chapter-04-Expressions_Operators.md)把 JavaScript 中的表达式称作短语。那语句就是 JavaScript 中的句子或命令。就像英语句子用句点来结尾和分隔一样，JavaScript 语句以分号（参见 2.6 节）结尾。表达式被求值后产生一个值，而语句在被执行后会导致某事件发生。
:::

One way to “make something happen” is to evaluate an expression that has side effects. Expressions with side effects, such as assignments and function invocations, can stand alone as statements, and when used this way are known as _expression statements_. A similar category of statements are the _declaration statements_ that declare new variables and define new functions.

::: tip 翻译
一种“导致某事件发生”的方式是求值一个有副效应的表达式。像赋值或函数调用这样有副效应的表达式本身就可以作为语句，在像这样使用时就被称为表达式语句。另一种与之类似的语句是声明语句，用于声明变量和定义新函数。
:::

JavaScript programs are nothing more than a sequence of statements to execute. By default, the JavaScript interpreter executes these statements one after another in the order they are written. Another way to “make something happen” is to alter this default order of execution, and JavaScript has a number of statements or _control structures_ that do just this:

::: tip 翻译
JavaScript 程序就是一系列待执行的语句。默认情况下，JavaScript 解释器按照它们在源代码中的顺序逐个执行这些语句。另一种“导致某事件发生”的方式是改变这个默认的执行顺序，为此，JavaScript 提供了一些语句或者叫控制结构。
:::

_Conditionals_
Statements like `if` and `switch` that make the JavaScript interpreter execute or skip other statements depending on the value of an expression

::: tip 翻译
_条件_

像`if`和`switch`这样的语句让 JavaScript 解释器根据某个表达式的值选择执行或跳过其他语句。
:::

_Loops_
Statements like `while` and `for` that execute other statements repetitively

::: tip 翻译
_循环_

像`while`和`for`这样的语句会重复执行其他语句。
:::

_Jumps_
Statements like `break`, `return`, and `throw` that cause the interpreter to jump to another part of the program

::: tip 翻译
_跳转_

像`break`、`return`和`throw`这样的语句会导致解释器跳转到程序的其他部分。
:::

The sections that follow describe the various statements in JavaScript and explain their syntax. Table 5-1, at the end of the chapter, summarizes the syntax. A JavaScript program is simply a sequence of statements, separated from one another with semicolons, so once you are familiar with the statements of JavaScript, you can begin writing JavaScript programs.

::: tip 翻译
本章各节将依次介绍 JavaScript 中的各种语句，以及它们的语法。本章末尾的表 5-1 总结了这些语法。JavaScript 程序就是一系列语句，以分号作为分隔符。因此只要熟悉 JavaScript 的语句，就可以上手写 JavaScript 程序。
:::

## 表达式语句

The simplest kinds of statements in JavaScript are expressions that have side effects. This sort of statement was shown in [Chapter 4](./Chapter-04-Expressions_Operators.md). Assignment statements are one major category of expression statements. For example:

::: tip 翻译
JavaScript 中最简单的一种语句就是有副效应的表达式。这种语句在[第 4 章](./Chapter-04-Expressions_Operators.md)已经展示过了。赋值语句是一种主要的表达式语句。例如：
:::

```js
greeting = "Hello " + name;
i *= 3;
```

The increment and decrement operators, `++` and `--`, are related to assignment statements. These have the side effect of changing a variable value, just as if an assignment had been performed:

::: tip 翻译
递增操作符`++`和递减操作符`--`都跟赋值语句有关。它们都有修改变量值的副效应，就好像执行了赋值语句一样：
:::

```js
counter++;
```

The `delete` operator has the important side effect of deleting an object property. Thus, it is almost always used as a statement, rather than as part of a larger expression:

::: tip 翻译
`delete`操作符有删除对象属性的重要副效应。因此，一般都把它作为一个语句使用，而不是放在某个大的表达式中：
:::

```js
delete o.x;
```

Function calls are another major category of expression statements. For example:

::: tip 翻译
函数调用是另一类主要的表达式语句。例如：
:::

```js
console.log(debugMessage);
displaySpinner(); // A hypothetical function to display a spinner in a web app.
```

These function calls are expressions, but they have side effects that affect the host environment or program state, and they are used here as statements. If a function does not have any side effects, there is no sense in calling it, unless it is part of a larger expression or an assignment statement. For example, you wouldn’t just compute a cosine and discard the result:

::: tip 翻译
这些函数调用都是表达式，但它们有影响宿主环境或程序状态的副效应，因此在这里作为语句使用。如果是没有副效应的函数，那像这样调用就没有什么意义了，除非它在一个更大的表达式中，或者在赋值语句中。例如，谁也不会像这样计算一次余弦，然后丢掉结果：
:::

```js
Math.cos(x);
```

But you might well compute the value and assign it to a variable for future use:

::: tip 翻译
但很可能计算这个值之后把它赋给一个变量，以便将来使用：
:::

```js
cx = Math.cos(x);
```

Note that each line of code in each of these examples is terminated with a semicolon.

::: tip 翻译
注意，这些例子中的每行代码都以分号结尾。
:::

## 复合语句与空语句

Just as the comma operator (§4.13.7) combines multiple expressions into a single expression, a _statement block_ combines multiple statements into a single _compound statement_. A statement block is simply a sequence of statements enclosed within curly braces. Thus, the following lines act as a single statement and can be used anywhere that JavaScript expects a single statement:

::: tip 翻译
与逗号操作符（参见 4.13.7 节）将多个表达式组合为一个表达式一样，语句块将多个语句组合为一个复合语句。语句块其实就是一系列语句，可以放在任何期待一个语句的地方：
:::

```js
{
  x = Math.PI;
  cx = Math.cos(x);
  console.log("cos(n) = " + cx);
}
```

There are a few things to note about this statement block. First, it does not end with a semicolon. The primitive statements within the block end in semicolons, but the block itself does not. Second, the lines inside the block are indented relative to the curly braces that enclose them. This is optional, but it makes the code easier to read and understand.

::: tip 翻译
关于这个语句块，我们需要说明几点。第一，它没有以分号结尾。块中的单条语句都以分号结尾，但块本身没有。第二，块中的代码相对于包含它们的花括号缩进。这不是必需的，但可以让代码更清晰易读。
:::

Just as expressions often contain subexpressions, many JavaScript statements contain substatements. Formally, JavaScript syntax usually allows a single substatement. For example, the `while` loop syntax includes a single statement that serves as the body of the loop. Using a statement block, you can place any number of statements within this single allowed substatement.

::: tip 翻译
就像表达式经常会包含子表达式，很多 JavaScript 语句也包含子语句。例如，`while`循环语法只包含一个作为循环体的语句。而使用语句块，可以在这个唯一的子语句中添加任意多个语句。
:::

A compound statement allows you to use multiple statements where JavaScript syntax expects a single statement. The _empty statement_ is the opposite: it allows you to include no statements where one is expected. The empty statement looks like this:

::: tip 翻译
复合语句允许我们在 JavaScript 语法期待一个语句时使用多个语句。空语句正好相反，它让我们在期待一条语句的地方不包含任何语句。空语句是这样的：
:::

```
;
```

The JavaScript interpreter takes no action when it executes an empty statement. The empty statement is occasionally useful when you want to create a loop that has an empty body. Consider the following `for` loop (`for` loops will be covered in §5.4.3):

::: tip 翻译
JavaScript 解释器在执行空语句时什么也不会做。空语句偶尔会有用，比如创建一个空循环体的循环。比如下面的`for`循环（`for`循环将在 5.4.3 节介绍）：
:::

```js
// 初始化一个数组a
for (let i = 0; i < a.length; a[i++] = 0);
```

In this loop, all the work is done by the expression `a[i++] = 0`, and no loop body is necessary. JavaScript syntax requires a statement as a loop body, however, so an empty statement—just a bare semicolon—is used.

::: tip 翻译
在这个循环中，所有工作都是通过表达式`a[i++] = 0`完成的，不需要循环体。但 JavaScript 语法要求有一条语句作为循环体，此时空语句（就一个分号）可以派上用场。
:::

Note that the accidental inclusion of a semicolon after the right parenthesis of a `for` loop, `while` loop, or `if` statement can cause frustrating bugs that are difficult to detect. For example, the following code probably does not do what the author intended:

::: tip 翻译
注意，意外地在`for`、`while`循环或`if`语句的右括号后面加上分号会导致难以发现的隐患。例如，下面的代码可能并不是作者想要的：
:::

```js
if (a === 0 || b === 0); // 这行什么也不做
o = null; // 而这行始终都会执行
```

When you intentionally use the empty statement, it is a good idea to comment your code in a way that makes it clear that you are doing it on purpose. For example:

::: tip 翻译
如果你有意使用空语句，最好通过注释说明一下你的用意。比如：
:::

```js
for (let i = 0; i < a.length; a[i++] = 0 /* empty */);
```

## 条件语句

Conditional statements execute or skip other statements depending on the value of a specified expression. These statements are the decision points of your code, and they are also sometimes known as “branches.” If you imagine a JavaScript interpreter following a path through your code, the conditional statements are the places where the code branches into two or more paths and the interpreter must choose which path to follow.

::: tip 翻译
条件语句根据指定表达式的值执行或跳过执行某些语句，因此条件语句是代码中需要决策的地方，有时候也被称为“分支”。想象一下，JavaScript 解释器沿一条路径执行代码，条件语句表示代码要分成两条或更多条路径，而解释器必须选择其中一条。
:::

The following subsections explain JavaScript’s basic conditional, the `if/else` statement, and also cover `switch`, a more complicated, multi-way branch statement.

::: tip 翻译
接下来几节介绍 JavaScript 的基本条件语句`if/else`，以及较复杂的`switch`多分支语句。
:::

### if

The `if` statement is the fundamental control statement that allows JavaScript to make decisions, or, more precisely, to execute statements conditionally. This statement has two forms. The first is:

::: tip 翻译
if 语句是最基本的控制语句，可以让 JavaScript 做出决策，更精确地说，是有条件地执行语句。这个语句有两种形式，第一种是：
:::

```js
if (expression) statement;
```

In this form, _expression_ is evaluated. If the resulting value is truthy, _statement_ is executed. If _expression_ is falsy, statement is not executed. (See §3.4 for a definition of truthy and falsy values.) For example:

::: tip 翻译
在这个形式中，expression（表达式）会被求值。如果结果值是真值，statement（语句）会执行；如果表达式是假值，语句不会执行（参见 3.4 节中关于真值和假值的定义）。例如：
:::

```js
if (username == null)
  // 如果username时null或undefined
  username = "John Doe"; // 定义这个变量
```

Or similarly:

::: tip 翻译
或类似地：
:::

```js
// 如果 username 是 null, undefined, false, 0, "", 或 NaN, 给它一个新值
if (!username) username = "John Doe";
```

Note that the parentheses around the _expression_ are a required part of the syntax for the if statement.

::: tip 翻译
注意，表达式两边的圆括号是 if 语句的语法必需的。
:::

JavaScript syntax requires a single statement after the `if` keyword and parenthesized expression, but you can use a statement block to combine multiple statements into one. So the `if` statement might also look like this:

::: tip 翻译
JavaScript 语法要求在`if`关键字和带括号的表达式后面必须只跟一个语句，但我们可以使用语句块把多个语句组合成一个语句。因此`if`语句也可以是类似这样的：
:::

```js
if (!address) {
  address = "";
  message = "Please specify a mailing address.";
}
```

The second form of the `if` statement introduces an `else` clause that is executed when _expression_ is `false`. Its syntax is:

::: tip 翻译
`if`语句的第二种形式会包含一个`else`子句，会在表达式为`false`时执行。其语法为：
:::

```js
if (expression) statement1;
else statement2;
```

This form of the statement executes `statement1` if _expression_ is truthy and executes `statement2` if _expression_ is falsy. For example:

::: tip 翻译
这种形式在表达式为真值时执行语句 1，在表达式为假值时执行语句 2。例如：
:::

```js
if (n === 1) console.log("You have 1 new message.");
else console.log(`You have ${n} new messages.`);
```

When you have nested `if` statements with `else` clauses, some caution is required to ensure that the else clause goes with the appropriate `if` statement. Consider the following lines:

::: tip 翻译
如果在嵌套的`if`语句中包含`else`子句，那么就要留心让`else`子句与相应的`if`语句对应。来看下面这个例子：
:::

```js
i = j = 1;
k = 2;
if (i === j)
  if (j === k) console.log("i equals k");
  else console.log("i doesn't equal j"); // WRONG!!
```

In this example, the inner `if` statement forms the single statement allowed by the syntax of the outer `if` statement. Unfortunately, it is not clear (except from the hint given by the indentation) which `if` the `else` goes with. And in this example, the indentation is wrong, because a JavaScript interpreter actually interprets the previous example as:

::: tip 翻译
在这个例子中，内部的`if`语句构成了外部`if`语句语法所需的那条语句。而`else`语句对应哪个`if`并不清楚（除了缩进有所暗示之外）。但在这个例子中，缩进是错误的，因为 JavaScript 解释器实际上会把前面的例子解释为：
:::

```js
if (i === j) {
  if (j === k) console.log("i equals k");
  else console.log("i doesn't equal j"); // OOPS!
}
```

The rule in JavaScript (as in most programming languages) is that by default an `else` clause is part of the nearest `if` statement. To make this example less ambiguous and easier to read, understand, maintain, and debug, you should use curly braces:

::: tip 翻译
JavaScript 的规则（与多数编程语言一样）是，默认情况下`else`子句属于最近的`if`语句。为了让这个例子更清晰、易读、易理解、易维护、易调试，应该使用花括号：
:::

```js
if (i === j) {
  if (j === k) {
    console.log("i equals k");
  }
} else {
  // 花括号的位置起了决定性作用！
  console.log("i doesn't equal j");
}
```

Many programmers make a habit of enclosing the bodies of `if` and `else` statements (as well as other compound statements, such as `while` loops) within curly braces, even when the body consists of only a single statement. Doing so consistently can prevent the sort of problem just shown, and I advise you to adopt this practice. In this printed book, I place a premium on keeping example code vertically compact, and I do not always follow my own advice on this matter.

::: tip 翻译
很多程序员都有使用花括号包装`if`和`else`语句（以及其他复合语句，如`while`循环）的习惯，即使语句体只有一个语句。始终这么做可以避免刚才的问题，建议读者也这么做。在本书中，我始终在设法减少代码行数，因此不一定处处遵循这个建议。
:::

### else if

The `if/else` statement evaluates an expression and executes one of two pieces of code, depending on the outcome. But what about when you need to execute one of many pieces of code? One way to do this is with an `else if` statement. `else if` is not really a JavaScript statement, but simply a frequently used programming idiom that results when repeated `if/else` statements are used:

::: tip 翻译
`if/else`语句求值一个表达式并根据结果执行两段代码中的一段。但如果你想执行多段代码中的一段呢？一种思路是使用`else if`语句。`else if`并不是真正的 JavaScript 语句，而是一个在使用`if/else`时被频繁用到的编程惯例：
:::

```js
if (n === 1) {
  // 执行第一个代码块
} else if (n === 2) {
  // 执行第二个代码块
} else if (n === 3) {
  // 执行第三个代码块
} else {
  // 如果前面都失败，则执行第四个代码块
}
```

There is nothing special about this code. It is just a series of `if` statements, where each following `if` is part of the `else` clause of the previous statement. Using the `else if` idiom is preferable to, and more legible than, writing these statements out in their syntactically equivalent, fully nested form:

::: tip 翻译
这段代码没有什么特别的，就是一系列`if`语句，每个`if`语句后面都有一个`else`子句。使用`else if`更好，也更容易理解，不推荐使用下面这样的完整嵌套形式：
:::

```js
if (n === 1) {
  // 执行第一个代码块
} else {
  if (n === 2) {
    // 执行第二个代码块
  } else {
    if (n === 3) {
      // 执行第三个代码块
    } else {
      // 如果前面都失败，执行第四个代码块
    }
  }
}
```

### switch

An `if` statement causes a branch in the flow of a program’s execution, and you can use the `else if` idiom to perform a multi-way branch. This is not the best solution, however, when all of the branches depend on the value of the same expression. In this case, it is wasteful to repeatedly evaluate that expression in multiple `if` statements.

::: tip 翻译
`if`语句在程序执行流中会创建一个分支，而使用多个`else if`可以实现多个分支。但是，在所有分析都依赖同一个表达式的值时这并不是最好的办法。因为多个`if`语句重复对一个表达式进行求值太浪费了。
:::

The `switch` statement handles exactly this situation. The `switch` keyword is followed by an expression in parentheses and a block of code in curly braces:

::: tip 翻译
此时最合适的语句是`switch`语句。`switch`关键字后面跟着一个带括号的表达式和一个包含在花括号中的代码块：
:::

```js
switch(expression) {
    statements
}
```

However, the full syntax of a `switch` statement is more complex than this. Various locations in the block of code are labeled with the `case` keyword followed by an expression and a colon. When a `switch` executes, it computes the value of _expression_ and then looks for a `case` label whose expression evaluates to the same value (where sameness is determined by the `===` operator). If it finds one, it starts executing the block of code at the statement labeled by the `case`. If it does not find a `case` with a matching value, it looks for a statement labeled `default:`. If there is no `default:` label, the `switch` statement skips the block of code altogether.

::: tip 翻译
不过，`switch`语句的完整语法比这里展示的要复杂得多。比如，其中代码块的不同位置会有`case`关键字开头的标签，后跟一个表达式和一个冒号。当`switch`执行时，它会计算表达式的值，然后对比`case`标签，看哪个表达式会求值为相同的值（这时的相同意味着`===`操作符返回`true`）。如果找到了相同的值，则执行相应`case`语句的代码块。如果没有找到，则再找标签为`default:`的语句。如果没有`default:`标签，`switch`语句就跳过整个代码块。
:::

`switch` is a confusing statement to explain; its operation becomes much clearer with an example. The following `switch` statement is equivalent to the repeated `if/else` statements shown in the previous section:

::: tip 翻译
`switch`语句不太好用文字来解释，看个例子更容易明白。下面这个`switch`语句与前面多个`if/else`语句的例子是等价的：
:::

```js
switch (n) {
  case 1: // 如果 n === 1, 从这里开始执行
    // 执行第一个代码块
    break; // 到这里停止
  case 2: // 如果 n === 2, 从这里开始执行
    // 执行第二个代码块
    break; // 到这里停止
  case 3: // 如果 n === 3, 从这里开始执行
    // 执行第三个代码块
    break; // 到这里停止
  default: // 如果前面都失败
    // 执行第四个代码块
    break; // 到这里停止
}
```

Note the `break` keyword used at the end of each `case` in this code. The `break` statement, described later in this chapter, causes the interpreter to jump to the end (or “break out”) of the `switch` statement and continue with the statement that follows it. The `case` clauses in a `switch` statement specify only the _starting point_ of the desired code; they do not specify any ending point. In the absence of `break` statements, a `switch` statement begins executing its block of code at the `case` label that matches the value of its _expression_ and continues executing statements until it reaches the end of the block. On rare occasions, it is useful to write code like this that “falls through” from one case label to the next, but 99% of the time you should be careful to end every `case` with a `break` statement. (When using `switch` inside a function, however, you may use a `return` statement instead of a `break` statement. Both serve to terminate the `switch` statement and prevent execution from falling through to the next `case`.)

::: tip 翻译
注意代码中每个`case`末尾的`break`关键字。这个`break`语句（本章后面会介绍）将导致解释器跳到`switch`语句末尾（或“跑出”`switch`语句），继续执行后面的语句。`switch`语句中的`case`子句只指定了预期代码的起点，并没有指定终点。在没有`break`语句的情况下，`switch`语句从匹配其表达式值的`case`代码块开始执行，一直执行到代码块结束。这种情况偶尔是有用的，比如让代码执行流从某个`case`标签直接“穿透”到下一个`case`标签。但 99%的时候还是需要注意用`break`语句来结束每个`case`（不过在函数中使用`switch`时，可以使用 return 语句而非`break`语句。这两个关键字都可以终止`switch`语句，阻止执行流进入下一个`case`）。
:::

Here is a more realistic example of the `switch` statement; it converts a value to a string in a way that depends on the type of the value:

::: tip 翻译
下面看一个关于`switch`语句的更实际的例子，这个`switch`语句会根据值的类型决定怎么把它转换成字符串：
:::

```js
function convert(x) {
  switch (typeof x) {
    case "number": // 把数值转换为16进制整数
      return x.toString(16);
    case "string": // 返回加了引号的字符串
      return '"' + x + '"';
    default: // 其他类型值按常规方式转换
      return String(x);
  }
}
```

Note that in the two previous examples, the `case` keywords are followed by number and string literals, respectively. This is how the `switch` statement is most often used in practice, but note that the ECMAScript standard allows each `case` to be followed by an arbitrary expression.

::: tip 翻译
注意在前面两个例子中，`case`关键字后面分别是数值和字符串字面量。这是实践中使用`switch`语句的常见方式，但要注意 ECMAScript 标准允许每个`case`后面跟任意表达式。
:::

The `switch` statement first evaluates the expression that follows the `switch` keyword and then evaluates the `case` expressions, in the order in which they appear, until it finds a value that matches. The matching case is determined using the `===` identity operator, not the `==` equality operator, so the expressions must match without any type conversion.

::: tip 翻译
`switch`语句首先对跟在`switch`关键字后面的表达式求值，然后再按照顺序求值`case`表达式，直至遇到匹配的值。这里的匹配使用`===`全等操作符，而不是`==`相等操作符，因此表达式必须在没有类型转换的情况下匹配。
:::

Because not all of the `case` expressions are evaluated each time the `switch` statement is executed, you should avoid using `case` expressions that contain side effects such as function calls or assignments. The safest course is simply to limit your `case` expressions to constant expressions.

::: tip 翻译
考虑到在`switch`语句执行时，并不是所有`case`表达式都会被求值，所以应该避免使用包含副效应的`case`表达式，比如函数调用或赋值表达式。最可靠的做法是在`case`后面只写常量表达式。
:::

As explained earlier, if none of the `case` expressions match the `switch` expression, the `switch` statement begins executing its body at the statement labeled `default:`. If there is no `default:` label, the `switch` statement skips its body altogether. Note that in the examples shown, the `default:` label appears at the end of the switch body, following all the `case` labels. This is a logical and common place for it, but it can actually appear anywhere within the body of the statement.

::: tip 翻译
正如前面解释的，如果没有与`switch`表达式匹配的`case`表达式，则`switch`语句就会执行标签为`default:`的语句。如果没有`default:`标签，`switch`语句会跳过自己的代码体。注意在前面的例子中，`default:`标签出现在`switch`体的末尾，在所有`case`标签后面。这个位置是符合逻辑的，也是它最常出现的位置。但事实上，`default:`标签可以出现在`switch`语句体的任何位置。
:::

## 循环语句

To understand conditional statements, we imagined the JavaScript interpreter following a branching path through your source code. The _looping statements_ are those that bend that path back upon itself to repeat portions of your code. JavaScript has five looping statements: `while`, `do/while`, `for`, `for/of` (and its `for/await` variant), and `for/in`. The following subsections explain each in turn. One common use for loops is to iterate over the elements of an array. §7.6 discusses this kind of loop in detail and covers special looping methods defined by the Array class.

::: tip 翻译
为理解条件语句，我们曾想象 JavaScript 解释器在源代码中会经过不同路径。而循环语句则是把这些路径弯曲又折回起点，以重复执行代码中的某些部分。JavaScript 有 5 种循环语句：`while`、`do/while`、`for`、`for/of`（及其变体 `for/await`）和 `for/in`。接下来几节将分别介绍这 5 种循环。循环的一个常见用途是迭代数组元素。7.6 节详细讨论了这种循环，并介绍了 Array 类定义的特殊循环方法。
:::

### while

Just as the `if` statement is JavaScript’s basic conditional, the `while` statement is JavaScript’s basic loop. It has the following syntax:

::: tip 翻译
就像 `if` 语句是 JavaScript 的基本条件控制语句一样，`while` 语句是 JavaScript 的基本循环语句，具有如下语法：
:::

```js
while (expression) statement;
```

To execute a `while` statement, the interpreter first evaluates _expression_. If the value of the expression is falsy, then the interpreter skips over the _statement_ that serves as the loop body and moves on to the next statement in the program. If, on the other hand, the _expression_ is truthy, the interpreter executes the _statement_ and repeats, jumping back to the top of the loop and evaluating _expression_ again. Another way to say this is that the interpreter executes _statement_ repeatedly while the _expression_ is truthy. Note that you can create an infinite loop with the syntax `while(true)`.

::: tip 翻译
执行`while`语句时，解释器首先会求值表达式。如果这个表达式的值是假值，则解释器会跳过作为循环体的语句，继续执行程序中的下一条语句。而如果表达式是真值，则解释器会执行语句并且重复，即跳回循环的开头再次求值表达式。另一种解释方式是，解释器会在表达式为真值时重复执行语句。注意，使用`while(true)`可以创造一个无穷循环。
:::

Usually, you do not want JavaScript to perform exactly the same operation over and over again. In almost every loop, one or more variables change with each _iteration_ of the loop. Since the variables change, the actions performed by executing _statement_ may differ each time through the loop. Furthermore, if the changing variable or variables are involved in _expression_, the value of the expression may be different each time through the loop. This is important; otherwise, an expression that starts off truthy would never change, and the loop would never end! Here is an example of a `while` loop that prints the numbers from 0 to 9:

::: tip 翻译
通常我们都不希望 JavaScript 反复执行同样的操作。几乎在每次循环或迭代中，都会有一个或多个变量改变。因为有变量改变，所以执行语句的动作每次循环都可能不同。另外，如果改变的变量会影响表达式，则每次循环这个表达式的值也可能不同。这一点非常重要，否则求值为真值的表达式可能永远不会变，循环也就永远不会结束！下面是一个通过`while`循环打印数值 0 到 9 的例子：
:::

```js
let count = 0;
while (count < 10) {
  console.log(count);
  count++;
}
```

As you can see, the variable count starts off at 0 and is incremented each time the body of the loop runs. Once the loop has executed 10 times, the expression becomes `false` (i.e., the variable count is no longer less than 10), the while statement finishes, and the interpreter can move on to the next statement in the program. Many loops have a counter variable like count. The variable names `i`, `j`, and `k` are commonly used as loop counters, though you should use more descriptive names if it makes your code easier to understand.

::: tip 翻译
在这个例子中，变量`count`从 0 开始，每运行一次循环体`count`就递增一次。当循环执行 10 次后，表达式的值变成`false`（即变量`count`不再小于 10），于是`while`循环完成，解释器又继续执行程序中的下一条语句。很多循环都有类似`count`的计数器变量。`i`、`j`、`k`是最常见的循环计数器变量名，当然如果希望让代码更容易理解，还应该使用更具有描述性的名字。
:::

### do/while

The `do/while` loop is like a while loop, except that the loop expression is tested at the bottom of the loop rather than at the top. This means that the body of the loop is always executed at least once. The syntax is:

::: tip 翻译
do/while 循环与 while 循环类似，区别是对循环表达式的测试在循环底部而不是顶部。这意味着循环体始终会至少执行一次。语法如下：
:::

```
do
  statement
while (expression);
```

The `do/while` loop is less commonly used than its `while` cousin—in practice, it is somewhat uncommon to be certain that you want a loop to execute at least once. Here’s an example of a `do/while` loop:

::: tip 翻译
`do/while`循环的使用没有`while`那么频繁，因为实践中很少有需要至少执行一次循环的情况。下面是一个`do/while`循环的例子：
:::

```js
function printArray(a) {
  let len = a.length,
    i = 0;
  if (len === 0) {
    console.log("Empty Array");
  } else {
    do {
      console.log(a[i]);
    } while (++i < len);
  }
}
```

There are a couple of syntactic differences between the `do/while` loop and the ordinary `while` loop. First, the `do` loop requires both the `do` keyword (to mark the beginning of the loop) and the `while` keyword (to mark the end and introduce the loop condition). Also, the `do` loop must always be terminated with a semicolon. The `while` loop doesn’t need a semicolon if the loop body is enclosed in curly braces.

::: tip 翻译
从语法上看，`do/while`循环与`while`循环有两个区别。首先，`do`循环要求使用两个关键字：`do`（标记循环开始）和`while`（标记循环结束并引入循环条件）。其次，`do`循环必须始终以分号终止。而`while`循环在循环体使用花括号时不需要分号。
:::

### for

The for statement provides a looping construct that is often more convenient than the `while` statement. The for statement simplifies loops that follow a common pattern. Most loops have a counter variable of some kind. This variable is initialized before the loop starts and is tested before each iteration of the loop. Finally, the counter variable is incremented or otherwise updated at the end of the loop body, just before the variable is tested again. In this kind of loop, the initialization, the test, and the update are the three crucial manipulations of a loop variable. The for statement encodes each of these three manipulations as an expression and makes those expressions an explicit part of the loop syntax:

::: tip 翻译
`for`语句提供了比`while`语句更方便的循环结构。`for`语句简化了遵循常见模式的循环。多数循环都有某种形式的计数器变量，这个变量在循环开始前会被初始化，然后循环的每次迭代都会测试它的值。另外，计数器变量在循环体结束时、在被再次测试之前会递增或者更新。在这种循环模式下，初始化、测试和更新是对循环变量的三个关键操作。`for`语句将这三个操作分别设定为一个表达式，让这些表达式成为循环语法中明确的部分：
:::

```js
for (initialize; test; increment) statement;
```

_initialize_, _test_, and _increment_ are three expressions (separated by semicolons) that are responsible for initializing, testing, and incrementing the loop variable. Putting them all in the first line of the loop makes it easy to understand what a for loop is doing and prevents mistakes such as forgetting to initialize or increment the loop variable.

::: tip 翻译
_initialize_、_test_ 和 _increment_ 是三个表达式（以分号隔开），分别负责初始化、测试和递增循环变量。把它们都放在循环的第一行让人更容易理解`for`循环在做什么，避免忘记初始化或递增循环变量。
:::

The simplest way to explain how a `for` loop works is to show the equivalent `while` loop:

::: tip 翻译
解释`for`循环的最简单方式是对比等价的`while`循环：
:::

```js
initialize;
while (test) {
  statement;
  increment;
}
```

In other words, the _initialize_ expression is evaluated once, before the loop begins. To be useful, this expression must have side effects (usually an assignment). JavaScript also allows _initialize_ to be a variable declaration statement so that you can declare and initialize a loop counter at the same time. The _test_ expression is evaluated before each iteration and controls whether the body of the loop is executed. If _test_ evaluates to a truthy value, the _statement_ that is the body of the loop is executed. Finally, the _increment_ expression is evaluated. Again, this must be an expression with side effects in order to be useful. Generally, it is either an assignment expression, or it uses the `++` or `--` operators.

::: tip 翻译
换句话说，_initialize_ 表达式只在循环开始前求值一次。为了起作用，这个表达式必须有副效应（通常是赋值）。JavaScript 也允许 _initialize_ 是变量声明语句，以便可以同时声明并初始化循环计数器。_test_ 表达式会在每次迭代时求值，用于控制是否执行循环体。如果 _test_ 求值为真值，则作为循环体的 _statement_ 就执行。执行后求值 _increment_ 表达式。同样，_increment_ 必须是有副效应的表达式（这样才有作用）；一般来说，要么是赋值表达式，要么使用`++`或`--`操作符。
:::

We can print the numbers from 0 to 9 with a for loop like the following. Contrast it with the equivalent `while` loop shown in the previous section:

::: tip 翻译
可以使用`for`循环像下面这样打印数值从 0 到 9，对照一下上一节完成同样操作的`while`循环：
:::

```js
for (let count = 0; count < 10; count++) {
  console.log(count);
}
```

Loops can become a lot more complex than this simple example, of course, and sometimes multiple variables change with each iteration of the loop. This situation is the only place that the comma operator is commonly used in JavaScript; it provides a way to combine multiple initialization and increment expressions into a single expression suitable for use in a `for` loop:

::: tip 翻译
当然，肯定有比这复杂得多的循环，而且有时候每次迭代要改变的循环变量还不止一个。这种情况是 JavaScript 中的逗号操作符常见的唯一用武之地。因为逗号操作符可以把多个初始化和递增表达式组合成一个表达式，从而满足`for`循环的语法要求：
:::

```js
let i,
  j,
  sum = 0;
for (i = 0, j = 10; i < 10; i++, j--) {
  sum += i * j;
}
```

In all our loop examples so far, the loop variable has been numeric. This is quite common but is not necessary. The following code uses a `for` loop to traverse a linked list data structure and return the last object in the list (i.e., the first object that does not have a `next` property):

::: tip 翻译
目前为止，所有循环示例中的循环变量都是数值。这种情况常见但不是必需的。以下代码使用`for`循环遍历了一个链表数据结构，返回了列表中的最后一个对象（即第一个没有`next`属性的对象）：
:::

```js
function tail(o) {
  // 返回列表o的尾结点
  for (; o.next; o = o.next /* empty */); // o.next 为真值时遍历
  return o;
}
```

Note that this code has no _initialize_ expression. Any of the three expressions may be omitted from a `for` loop, but the two semicolons are required. If you omit the _test_ expression, the loop repeats forever, and `for(;;)` is another way of writing an infinite loop, like `while(true)`.

::: tip 翻译
注意，这段代码中没有 _initialize_ 表达式。对`for`循环而言，三个表达式中任何一个都可以省略，只有两个分号是必需的。如果省略了 _test_ 表达式，循环会永远重复执行。因此`for(;;)`与`while(true)`一样，是另一种编写无穷循环的方式。
:::

### for/of

ES6 defines a new loop statement: `for/of`. This new kind of loop uses the `for` keyword but is a completely different kind of loop than the regular `for` loop. (It is also completely different than the older `for/in` loop that we’ll describe in §5.4.5.)

::: tip 翻译
ES6 定义了一个新循环语句：`for/of`。这种新循环虽然使用`for`关键字，但它与常规`for`循环是完全不同的两种循环（`for/of`与 5.4.5 节要讨论的`for/in`循环也是完全不同的）。
:::

The `for/of` loop works with _iterable_ objects. We’ll explain exactly what it means for an object to be iterable in [Chapter 12](./Chapter-12-Iterators_Generators.md), but for this chapter, it is enough to know that arrays, strings, sets, and maps are iterable: they represent a sequence or set of elements that you can loop or iterate through using a `for/of` loop.

::: tip 翻译
`for/of`循环专门用于可迭代对象。[第 12 章](./Chapter-12-Iterators_Generators.md)会解释到底什么对象是可迭代对象，但现在只要知道数组、字符串、集合和映射都是可迭代的就行了。它们都是一组或一批元素，可以使用`for/of`循环来循环或迭代这些元素。
:::

Here, for example, is how we can use `for/of` to loop through the elements of an array of numbers and compute their sum:

::: tip 翻译
例如，下面这个例子演示了如何迭代一个数值数组并计算所有数值之和：
:::

```js
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  sum = 0;
for (let element of data) {
  sum += element;
}
sum; // => 45
```

Superficially, the syntax looks like a regular `for` loop: the `for` keyword is followed by parentheses that contain details about what the loop should do. In this case, the parentheses contain a variable declaration (or, for variables that have already been declared, simply the name of the variable) followed by the `of` keyword and an expression that evaluates to an iterable object, like the data array in this case. As with all loops, the body of a `for/of` loop follows the parentheses, typically within curly braces.

::: tip 翻译
表面上看，这个语法跟常规`for`循环很像，都是`for`关键字后跟着一对圆括号，其中包含如何循环的细节。具体来说，这里的圆括号中包含一个变量声明（对于已经声明的变量，只包含变量名即可），然后是`of`关键字和一个求值为可迭代对象的表达式（比如这里的`data`数组）。与所有循环一样，`for/of`循环的循环体紧跟在圆括号之后，通常包含在花括号中。
:::

In the code just shown, the loop body runs once for each element of the `data` array. Before each execution of the loop body, the next element of the array is assigned to the element variable. Array elements are iterated in order from first to last.

::: tip 翻译
在上面的代码中，循环体对应`data`数组中的每个元素都会运行一次。在每次执行循环体之前，都会把数组的下一个元素赋值给元素变量。数组元素是按照从头到尾的顺序迭代的。
:::

Arrays are iterated “live”—changes made during the iteration may affect the outcome of the iteration. If we modify the preceding code by adding the line `data.push(sum)`; inside the loop body, then we create an infinite loop because the iteration can never reach the last element of the array.

::: tip 翻译
数组迭代是“实时”的，即迭代过程中的变化可能影响迭代的输出。如果修改前面的代码，在循环内添加一行`data.push(sum);`，则会创建一个无穷循环。因为迭代永远不会触及数组的最后一个元素。
:::

#### for/of 与对象

Objects are not (by default) iterable. Attempting to use `for/of` on a regular object throws a TypeError at runtime:

::: tip 翻译
对象（默认）是不可迭代的。运行时尝试对常规对象使用`for/of`会抛出 TypeError：
:::

```js
let o = { x: 1, y: 2, z: 3 };
for (let element of o) {
  // 抛出TypeError，因为o不是可迭代对象
  console.log(element);
}
```

If you want to iterate through the properties of an object, you can use the `for/in` loop (introduced in §5.4.5), or use `for/of` with the `Object.keys()` method:

::: tip 翻译
如果想迭代对象的属性，可以使用`for/in`循环（见 5.4.5 节），或者基于`Object.keys()`方法的结果使用`for/of`：
:::

```js
let o = { x: 1, y: 2, z: 3 };
let keys = "";
for (let k of Object.keys(o)) {
  keys += k;
}
keys; // => "xyz"
```

This works because `Object.keys()` returns an array of property names for an object, and arrays are iterable with `for/of`. Note also that this iteration of the keys of an object is not live as the array example above was—changes to the object o made in the loop body will have no effect on the iteration. If you don’t care about the keys of an object, you can also iterate through their corresponding values like this:

::: tip 翻译
这是因为`Object.keys()`返回一个对象属性名的数组，而数组是可以通过`for/of`来迭代的。也要注意，这种对象的键的迭代并不像上面例子那样是实时的，在循环体内修改对象 o 不会影响迭代。如果你不在乎对象的键，也可以像下面这样迭代每个键对应的值：
:::

```js
let sum = 0;
for (let v of Object.values(o)) {
  sum += v;
}
sum; // => 6
```

And if you are interested in both the keys and the values of an object’s properties, you can use `for/of` with `Object.entries()` and destructuring assignment:

::: tip 翻译
如果你既想要对象属性的键，也想要属性的值，可以基于`Object.entries()`和解构赋值来使用`for/of`：
:::

```js
let pairs = "";
for (let [k, v] of Object.entries(o)) {
  pairs += k + v;
}
pairs; // => "x1y2z3"
```

`Object.entries()` returns an array of arrays, where each inner array represents a key/value pair for one property of the object. We use destructuring assignment in this code example to unpack those inner arrays into two individual variables.

::: tip 翻译
`Object.entries()`返回一个数组的数组，其中每个内部数组表示对象的一个属性的键/值对。这里使用解构赋值把这些内部数组拆开，并将它们的元素赋值给两个变量。
:::

#### for/of 与字符串

Strings are iterable character-by-character in ES6:

::: tip 翻译
字符串在 ES6 中是可以逐个字符迭代的：
:::

```js
let frequency = {};
for (let letter of "mississippi") {
  if (frequency[letter]) {
    frequency[letter]++;
  } else {
    frequency[letter] = 1;
  }
}
frequency; // => {m: 1, i: 4, s: 4, p: 2}
```

Note that strings are iterated by Unicode codepoint, not by UTF-16 character. The string “I ❤ ” has a .length of 5 (because the two emoji characters each require two UTF-16 characters to represent). But if you iterate that string with `for/of`, the loop body will run three times, once for each of the three code points “I”, “❤”, and “ .”

::: tip 翻译
注意，字符串是按照 Unicode 码点而不是 UTF-16 字符迭代的。字符串“I ❤ ”的`.length`是 5（因为两个表情符号分别需要两个 UTF-16 字符表示）。但如果使用`for/of`来迭代这个字符串，循环体将运行 3 次，每次迭代一个码点“I”,“❤”和“ .”。
:::

#### for/of 与 Set 和 Map

The built-in ES6 Set and Map classes are iterable. When you iterate a Set with `for/of`, the loop body runs once for each element of the set. You could use code like this to print the unique words in a string of text:

::: tip 翻译
ES6 内置的 Set（集合）和 Map（映射）类是可迭代的。在使用`for/of`迭代 Set 时，循环体对集合中的每个元素都会运行一次。可以使用类似下面的代码打印出一个文本字符串中的唯一单词：
:::

```js
let text = "Na na na na na na na na Batman!";
let wordSet = new Set(text.split(" "));
let unique = [];
for (let word of wordSet) {
  unique.push(word);
}
unique; // => ["Na", "na", "Batman!"]
```

Maps are an interesting case because the iterator for a Map object does not iterate the Map keys, or the Map values, but key/value pairs. Each time through the iteration, the iterator returns an array whose first element is a key and whose second element is the corresponding value. Given a Map m, you could iterate and destructure its key/value pairs like this:

::: tip 翻译
Map 则比较有意思，因为 Map 对象的迭代器并不迭代 Map 键或 Map 值，而是迭代键/值对。每次迭代，迭代器都会返回一个数组，其第一个元素是键，第二个元素是对应的值。给出一个 Map `m`，可以像下面这样迭代和解构其键/值对：
:::

```js
let m = new Map([[1, "one"]]);
for (let [key, value] of m) {
  key; // => 1
  value; // => "one"
}
```

#### for/await 与异步迭代

ES2018 introduces a new kind of iterator, known as an _asynchronous iterator_, and a variant on the `for/of` loop, known as the `for/await` loop that works with asynchronous iterators.

::: tip 翻译
ES2018 新增了一种新迭代器，称为异步迭代器，同时新增了一种`for/of`循环，即使用异步迭代器的`for/await`循环。
:::

You’ll need to read [Chapters 12](./Chapter-12-Iterators_Generators.md) and [13](./Chapter-13-Asynchronous.md) in order to understand the `for/await` loop, but here is how it looks in code:

::: tip 翻译
要理解`for/await`循环，可能需要阅读[第 12 章](./Chapter-12-Iterators_Generators.md)和[第 13 章](./Chapter-13-Asynchronous.md)，但这里可以先看一看它的代码示例：
:::

```js
// 从异步可迭代流中读取数据块并将其打印出来
async function printStream(stream) {
  for await (let chunk of stream) {
    console.log(chunk);
  }
}
```

### for/in

A `for/in` loop looks a lot like a `for/of` loop, with the `of` keyword changed to `in`. While a `for/of` loop requires an iterable object after the `of`, a `for/in` loop works with any object after the `in`. The `for/of` loop is new in ES6, but `for/in` has been part of JavaScript since the very beginning (which is why it has the more natural sounding syntax).

::: tip 翻译
`for/in`循环看起来很像`for/of`循环，只不过`of`关键字换成了`in`。与`for/of`循环要求`of`后面必须是可迭代对象不同，`for/in`循环的`in`后面可以是任意对象。`for/of`循环是 ES6 新增的，而`for/in`是 JavaScript 从一开始就有的（这也是为什么它的语法显得更自然的原因）。
:::

The `for/in` statement loops through the property names of a specified object. The syntax looks like this:

::: tip 翻译
`for/in`语句循环指定对象的属性名，语法类似如下所示：
:::

```js
for (variable in object) statement;
```

_variable_ typically names a variable, but it may be a variable declaration or anything suitable as the left-hand side of an assignment expression. _object_ is an expression that evaluates to an object. As usual, statement is the statement or statement block that serves as the body of the loop.

::: tip 翻译
_variable_ 通常是一个变量名，但也可能是变量声明或任何可以作为赋值表达式左值的东西。_object_ 是一个求值为对象的表达式。跟以前一样，_statement_ 是作为循环体的语句或语句块。
:::

And you might use a `for/in` loop like this:

::: tip 翻译
比如，可以这样使用`for/in`循环：
:::

```js
for (let p in o) {
  // 将o的属性名赋值给变量p
  console.log(o[p]); // 打印每个属性的值
}
```

To execute a `for/in` statement, the JavaScript interpreter first evaluates the _object_ expression. If it evaluates to `null` or `undefined`, the interpreter skips the loop and moves on to the next statement. The interpreter now executes the body of the loop once for each enumerable property of the object. Before each iteration, however, the interpreter evaluates the _variable_ expression and assigns the name of the property (a string value) to it.

::: tip 翻译
执行`for/in`语句时，JavaScript 解释器首先求值 _object_ 表达式。如果它求值为`null`或`undefined`，解释器会跳过循环并转移到下一个语句。否则，解释器会对每个可枚举的对象属性执行一次循环体。但在每次迭代前，解释器都会求值 _variable_ 表达式，并将属性名字（字符串值）赋值给它。
:::

Note that the _variable_ in the `for/in` loop may be an arbitrary expression, as long as it evaluates to something suitable for the left side of an assignment. This expression is evaluated each time through the loop, which means that it may evaluate differently each time. For example, you can use code like the following to copy the names of all object properties into an array:

::: tip 翻译
注意，`for/in`循环中的 _variable_ 可能是任意表达式，只要能求值为赋值表达式的左值就可以。这个表达式在每次循环时都会被求值，这意味着每次的求值结果可能都不同。比如，可以用类似下面的代码把一个对象的所有属性复制到数组中：
:::

```js
let o = { x: 1, y: 2, z: 3 };
let a = [],
  i = 0;
for (a[i++] in o /* empty */);
```

JavaScript arrays are simply a specialized kind of object, and array indexes are object properties that can be enumerated with a `for/in` loop. For example, following the previous code with this line enumerates the array indexes 0, 1, and 2:

::: tip 翻译
JavaScript 数组其实就是一种特殊的对象，而数组索引是对象的属性，可以通过`for/in`循环来枚举。例如，在前面的代码后面再执行下面这行代码，会枚举出数组索引 0、1、2：
:::

```js
for (let i in a) console.log(i);
```

I find that a common source of bugs in my own code is the accidental use of `for/in` with arrays when I meant to use `for/of`. When working with arrays, you almost always want to use `for/of` instead of `for/in`.

::: tip 翻译
我自己在写代码时，常常因为本来应该对数组使用`for/of`却意外使用了`for/in`而导致隐错（bug）。在操作数组时，基本上只会用到`for/of`而不是`for/in`。
:::

The `for/in` loop does not actually enumerate all properties of an object. It does not enumerate properties whose names are symbols. And of the properties whose names are strings, it only loops over the enumerable properties (see §14.1). The various built-in methods defined by core JavaScript are not enumerable. All objects have a `toString()` method, for example, but the `for/in` loop does not enumerate this `toString` property. In addition to built-in methods, many other properties of the built-in objects are non-enumerable. All properties and methods defined by your code are enumerable, by default. (You can make them non-enumerable using techniques explained in §14.1.).

::: tip 翻译
`for/in`循环并不会枚举对象的所有属性，比如它不会枚举名字为符号的属性。而对于名字为字符串的属性，它只会遍历可枚举的属性（参见 14.1 节）。JavaScript 核心定义的各种内部方法是不可枚举的。比如，所有对象都有`toString()`方法，但`for/in`循环不会枚举`toString`属性。除了内部方法，内部对象的不少其他属性也是不可枚举的。默认情况下，我们手写代码定义的所有属性和方法都是可枚举的（可以使用 14.1 节介绍的技术让它们不可枚举）。
:::

Enumerable inherited properties (see §6.3.2) are also enumerated by the `for/in` loop. This means that if you use `for/in` loops and also use code that defines properties that are inherited by all objects, then your loop may not behave in the way you expect. For this reason, many programmers prefer to use a `for/of` loop with `Object.keys()` instead of a `for/in` loop.

::: tip 翻译
继承的可枚举属性（参见 6.3.2 节）也可以被`for/in`循环枚举。这意味着如果你使用`for/in`循环，并且代码中会定义被所有对象继承的属性，那你的循环就有可能出现意外结果。为此，很多程序员更愿意基于`Object.keys()`使用`for/of`循环，而不是使用`for/in`循环。
:::

If the body of a `for/in` loop deletes a property that has not yet been enumerated, that property will not be enumerated. If the body of the loop defines new properties on the object, those properties may or may not be enumerated. See §6.6.1 for more information on the order in which `for/in` enumerates the properties of an object.

::: tip 翻译
如果`for/in`循环的循环体删除一个尚未被枚举的属性，则该属性就不会再被枚举了。如果循环体在对象上又定义了新属性，则新属性可能会（也可能不会）被枚举。关于`for/in`枚举对象属性的顺序，可以参见 6.6.1 节。
:::

## 跳转语句

Another category of JavaScript statements are _jump statements_. As the name implies, these cause the JavaScript interpreter to jump to a new location in the source code. The break statement makes the interpreter jump to the end of a loop or other statement. `continue` makes the interpreter skip the rest of the body of a loop and jump back to the top of a loop to begin a new iteration. JavaScript allows statements to be named, or _labeled_, and `break` and `continue` can identify the target loop or other statement label.

::: tip 翻译
另一类 JavaScript 语句是跳转语句。顾名思义，跳转语句会导致 JavaScript 解释器跳转到源代码中的新位置。其中，`break`语句会让解释器跳转到循环末尾或跳转到其他语句。而`continue`语句会让解释器跳出循环体并返回循环顶部开始新一轮迭代。JavaScript 允许给语句命名或加标签，这样`break`和`continue`就可以识别目标循环或其他语句的标签。
:::

The `return` statement makes the interpreter jump from a function invocation back to the code that invoked it and also supplies the value for the invocation. The `throw` statement is a kind of interim return from a generator function. The throw statement raises, or _throws_, an exception and is designed to work with the `try/catch/finally` statement, which establishes a block of exception-handling code. This is a complicated kind of jump statement: when an exception is thrown, the interpreter jumps to the nearest enclosing exception handler, which may be in the same function or up the call stack in an invoking function.

::: tip 翻译
另外，`return`语句会让解释器从函数调用跳转回调用位置，同时提供调用返回的值。而`yield`语句是一种在生成器函数中间返回的语句。`throw`语句会抛出异常，设计用来与`try/catch/finally`语句共同使用，后者可以构成异常处理代码块。抛出异常是一种复杂的跳转语句：当有异常被抛出时，解释器会跳转到最近的闭合异常处理程序，可能是在同一个函数内部，也可能会上溯到函数调用栈的顶端。
:::

Details about each of these jump statements are in the sections that follow.

::: tip 翻译
接下来几小节将分别介绍这些跳转语句。
:::

### 语句标签

Any statement may be _labeled_ by preceding it with an identifier and a colon:

::: tip 翻译
通过前置一个标识符和一个冒号，可以为任何语句加上标签：
:::

```js
identifier: statement;
```

By labeling a statement, you give it a name that you can use to refer to it elsewhere in your program. You can label any statement, although it is only useful to label statements that have bodies, such as loops and conditionals. By giving a loop a name, you can use `break` and `continue` statements inside the body of the loop to exit the loop or to jump directly to the top of the loop to begin the next iteration. `break` and `continue` are the only JavaScript statements that use statement labels; they are covered in the following subsections. Here is an example of a labeled `while` loop and a `continue` statement that uses the label.

::: tip 翻译
给语句加标签之后，就相当于给它起了个名字，可以在程序的任何地方通过这个名字来引用它。任何语句都可以有标签，但只有给那些有语句体的语句加标签才有意义，比如循环语句和条件语句。给循环起个名字，然后在循环体中可以使用`break`和`continue`退出循环或跳到循环顶部开始下一次迭代。`break`和`continue`是 JavaScript 中唯一使用语句标签的语句，后面的小节会介绍它们。下面看一个给`while`循环加标签并通过`continue`语句使用这个标签的例子：
:::

```js
mainloop: while (token !== null) {
  // 省略的代码...
  continue mainloop; // 跳到命名循环的下一次迭代
  // 省略的其他代码...
}
```

The _identifier_ you use to label a statement can be any legal JavaScript identifier that is not a reserved word. The namespace for labels is different than the namespace for variables and functions, so you can use the same identifier as a statement label and as a variable or function name. Statement labels are defined only within the statement to which they apply (and within its substatements, of course). A statement may not have the same label as a statement that contains it, but two statements may have the same label as long as neither one is nested within the other. Labeled statements may themselves be labeled. Effectively, this means that any statement may have multiple labels.

::: tip 翻译
这里用作语句标签的 _identifier_ 可以是任何合法的 JavaScript 标识符（非保留字）。这些标签与变量和函数不在同一个命名空间中，因此同一个标识符既可以作为语句标签，也可以作为变量或函数名。语句标签只在定义它的语句（当然包括子语句）中有效。如果一条语句被另一条语句包含，那么它们不能使用相同的标签；如果两条语句没有嵌套关系，那么它们就可以使用相同的标签。已经有标签的语句本身也可以再加标签，这意味着任何语句都可以有多个标签。
:::

### break

The `break` statement, used alone, causes the innermost enclosing loop or `switch` statement to exit immediately. Its syntax is simple:

::: tip 翻译
`break`语句在单独使用时，会导致包含它的循环或`switch`语句立即退出。它的语法很简单：
:::

```js
break;
```

Because it causes a loop or `switch` to exit, this form of the `break` statement is legal only if it appears inside one of these statements.

::: tip 翻译
由于它会导致循环或`switch`退出，因此这种形式的`break`语句只有位于上述两种语句中才合法。
:::

You’ve already seen examples of the `break` statement within a `switch` statement. In loops, it is typically used to exit prematurely when, for whatever reason, there is no longer any need to complete the loop. When a loop has complex termination conditions, it is often easier to implement some of these conditions with `break` statements rather than trying to express them all in a single loop expression. The following code searches the elements of an array for a particular value. The loop terminates in the normal way when it reaches the end of the array; it terminates with a break statement if it finds what it is looking for in the array:

::: tip 翻译
前面我们已经看到在`switch`语句中使用`break`语句的例子了。在循环中，它通常用于提前退出，比如由于出现某个条件，没有必要再完成循环了。当循环有复杂的终止条件时，通常使用`break`语句更便于实现这些条件，而无须在一个循环表达式中包含所有这些条件。下面的代码从数组元素中搜索特定的值，如果到了数组末尾，循环会退出；如果找到了目标值，它会通过`break`语句终止：
:::

```js
for (let i = 0; i < a.length; i++) {
  if (a[i] === target) break;
}
```

JavaScript also allows the `break` keyword to be followed by a statement label (just the identifier, with no colon):

::: tip 翻译
JavaScript 也允许`break`关键字后面跟一个语句标签（只有标识符，没有冒号）：
:::

```js
break labelname;
```

When `break` is used with a label, it jumps to the end of, or terminates, the enclosing statement that has the specified label. It is a syntax error to use `break` in this form if there is no enclosing statement with the specified label. With this form of the `break` statement, the named statement need not be a loop or `switch`: `break` can “break out of ” any enclosing statement. This statement can even be a statement block grouped within curly braces for the sole purpose of naming the block with a label.

::: tip 翻译
当`break`后面跟一个标签时，它会跳转到具有指定标签的包含语句的末尾或终止该语句。如果没有具有指定标签的包含语句，那么这样使用`break`会导致语法错误。在这种形式的`break`语句中，命名语句不一定是可以中断任何包含语句的循环或`switch`:`break`。这里说的语句甚至可以是一个用花括号包含的语句块，其唯一目的就是通过标签来给这个语句块命名。
:::

A newline is not allowed between the `break` keyword and the _labelname_. This is a result of JavaScript’s automatic insertion of omitted semicolons: if you put a line terminator between the `break` keyword and the label that follows, JavaScript assumes you meant to use the simple, unlabeled form of the statement and treats the line terminator as a semicolon. (See §2.6.)

::: tip 翻译
`break`与 _labelname_ 之间不允许出现换行符。这主要因为 JavaScript 会自动插入省略的分号：如果把一个行终止符放在`break`和后面的标签名之间，JavaScript 会假定你使用简单的、没有标签的`break`语句，将换行符看成一个分号（参见 2.6 节）。
:::

You need the labeled form of the `break` statement when you want to break out of a statement that is not the nearest enclosing loop or a `switch`. The following code demonstrates:

::: tip 翻译
如果想中断一个并非最接近的包含循环或`switch`语句，就要使用这种带标签的`break`语句。来看下面的示例：
:::

```js
let matrix = getData(); // 从某个地方取得一个数值的二维数组
// 现在计算矩阵中所有数值之和
let sum = 0,
  success = false;
// 从一个加标签的语句开始，如果出错可以中断
computeSum: if (matrix) {
  for (let x = 0; x < matrix.length; x++) {
    let row = matrix[x];
    if (!row) {
      break computeSum;
    }
    for (let y = 0; y < row.length; y++) {
      let cell = row[y];
      if (isNaN(cell)) {
        break computeSum;
      }
      sum += cell;
    }
  }
  success = true;
}
// break 语句跳转到这里。如果此时 success == false
// 那说明得到的matrix出了问题。否则，sum会包含
// 这个矩阵中所有单元值的和
```

Finally, note that a `break` statement, with or without a label, can not transfer control across function boundaries. You cannot label a function definition statement, for example, and then use that label inside the function.

::: tip 翻译
最后要注意，无论带不带标签，`break`语句都不能把控制权转移到函数边界之外。比如，不能给一个函数定义加标签并在函数内部使用这个标签。
:::

### continue

The `continue` statement is similar to the `break` statement. Instead of exiting a loop, however, `continue` restarts a loop at the next iteration. The `continue` statement’s syntax is just as simple as the `break` statement’s:

::: tip 翻译
`continue`语句与`break`语句类似，但`continue`不会退出循环，而是从头开始执行循环的下一次迭代。`continue`语句的语法跟`break`语句一样简单：
:::

```js
continue;
```

The `continue` statement can also be used with a label:

::: tip 翻译
`continue`语句也可以带标签：
:::

```js
continue labelname;
```

The `continue` statement, in both its labeled and unlabeled forms, can be used only within the body of a loop. Using it anywhere else causes a syntax error.

::: tip 翻译
无论带不带标签，`continue`语句都只能在循环体内使用。在其他地方使用`continue`都会导致语法错误。
:::

When the `continue` statement is executed, the current iteration of the enclosing loop is terminated, and the next iteration begins. This means different things for different types of loops:

- In a `while` loop, the specified _expression_ at the beginning of the loop is tested again, and if it’s `true`, the loop body is executed starting from the top.
- In a `do/while` loop, execution skips to the bottom of the loop, where the loop condition is tested again before restarting the loop at the top.
- In a for loop, the _increment_ expression is evaluated, and the _test_ expression is tested again to determine if another iteration should be done.
- In a `for/of` or `for/in` loop, the loop starts over with the next iterated value or next property name being assigned to the specified variable.

::: tip 翻译
执行 `continue` 语句时，包含循环的当前迭代会终止，下一次迭代开始。对于不同类型的循环，结果可能有所不同:

- 对于 `while` 循环而言，循环开始指定的 _expression_ 会再次被求值，如果求值为 `true`，则会从上到下执行循环体。
- 对于 `do/while` 循环而言，执行会跳到循环底部，并在底部再次测试条件，然后决定是否从顶部开始重新启动循环。
- 对于 `for` 循环而言，会求值 _increment_ 表达式，并再次测试 _test_ 表达式，以决定是否该进行下一次迭代。
- 对于`for/of`或`for/in`循环而言，循环会从下一个被迭代的值或者下一个被赋值给指定变量的属性名开始。
  :::

Note the difference in behavior of the `continue` statement in the `while` and `for` loops: a `while` loop returns directly to its condition, but a for loop first evaluates its _increment_ expression and then returns to its condition. Earlier, we considered the behavior of the `for` loop in terms of an “equivalent” `while` loop. Because the `continue` statement behaves differently for these two loops, however, it is not actually possible to perfectly simulate a for loop with a `while` loop alone.

::: tip 翻译
要注意`continue`语句在`while`和`for`循环中行为的差异：`while`循环直接返回到它的条件，但`for`循环会先求其 _increment_ 表达式，然后再返回其条件。前面，我们曾认为`for`循环的行为“等价于”`while`循环。但因为`continue`语句在这两种循环中的不同表现，所以不可能单纯使用`while`循环来模拟`for`循环。
:::

The following example shows an unlabeled `continue` statement being used to skip the rest of the current iteration of a loop when an error occurs:

::: tip 翻译
下面这个例子展示了使用没有标签的`continue`语句在发生错误时跳过当前迭代的剩余部分：
:::

```js
for (let i = 0; i < data.length; i++) {
  if (!data[i]) {
    continue; // 不能处理未定义的数据
  }
  total += data[i];
}
```

Like the `break` statement, the `continue` statement can be used in its labeled form within nested loops when the loop to be restarted is not the immediately enclosing loop. Also, as with the `break` statement, line breaks are not allowed between the `continue` statement and its _labelname_.

::: tip 翻译
与`break`语句类似，`continue`语句在嵌套循环中也可以使用其带标签的形式，用于重新开始并非直接封闭的循环。同样与`break`语句一样，`continue`语句与其 _labelname_ 之间也不能出现换行。
:::

### return

Recall that function invocations are expressions and that all expressions have values. A `return` statement within a function specifies the value of invocations of that function. Here’s the syntax of the `return` statement:

::: tip 翻译
我们知道，函数调用是表达式，而所有表达式都有值。函数中的`return`语句指定了函数调用的返回值。以下是`return`语句的语法：
:::

```js
return expression;
```

A `return` statement may appear only within the body of a function. It is a syntax error for it to appear anywhere else. When the `return` statement is executed, the function that contains it returns the value of _expression_ to its caller. For example:

::: tip 翻译
`return`语句只能出现在函数体内。如果`return`出现在任何其他地方，都会导致语法错误。执行`return`语句后，包含它的函数向调用者返回 _expression_ 的值。例如：
:::

```js
function square(x) {
  return x * x;
} // 函数有一个return语句
square(2); // => 4
```

With no `return` statement, a function invocation simply executes each of the statements in the function body in turn until it reaches the end of the function and then returns to its caller. In this case, the invocation expression evaluates to `undefined`. The `return` statement often appears as the last statement in a function, but it need not be last: a function returns to its caller when a `return` statement is executed, even if there are other statements remaining in the function body.

::: tip 翻译
如果没有`return`语句，函数调用会依次执行函数体中的每个语句，直至函数末尾，然后返回到其调用者。此时，调用表达式求值为`undefined`。`return`语句常常是函数中的最后一条语句，但并非必须是最后一条。函数体在执行时，只要执行到`return`语句，就会返回到其调用者，而不管这个`return`语句后面是否还有其他语句。
:::

The `return` statement can also be used without an _expression_ to make the function return `undefined` to its caller. For example:

::: tip 翻译
`return`语句后面也可以不带 _expression_，从而导致函数向调用者返回`undefined`。例如：
:::

```js
function displayObject(o) {
  // 如果参数为null或undefined则立即返回
  if (!o) return;
  // 这里是函数的其他代码...
}
```

Because of JavaScript’s automatic semicolon insertion (§2.6), you cannot include a line break between the `return` keyword and the expression that follows it.

::: tip 翻译
由于 JavaScript 会自动插入分号（参见 2.6 节），因此不能在`return`关键字和它后面的表达式之间插入换行。
:::

### yield

The `yield` statement is much like the `return` statement but is used only in ES6 generator functions (see §12.3) to produce the next value in the generated sequence of values without actually returning:

::: tip 翻译
`yield`语句非常类似于`return`语句，但只能用在 ES6 新增的生成器函数中（参见 12.3 节），以回送生成的值序列中的下一个值，同时又不会真正返回：
:::

```js
// 回送一系列整数的生成器函数
function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}
```

In order to understand _yield_, you must understand iterators and generators, which will not be covered until [Chapter 12](./Chapter-12-Iterators_Generators.md). _yield_ is included here for completeness, however. (Technically, though, _yield_ is an operator rather than a statement, as explained in §12.4.2.)

::: tip 翻译
为了理解 _yield_，必须理解迭代器和生成器，相关内容将在[第 12 章](./Chapter-12-Iterators_Generators.md)介绍。这里介绍 _yield_ 只是出于完整性考虑（但严格来讲，正如 12.4.2 节所解释的，_yield_ 是一个操作符而非语句）。
:::

### throw

An _exception_ is a signal that indicates that some sort of exceptional condition or error has occurred. To `throw` an exception is to signal such an error or exceptional condition. To `catch` an exception is to handle it—to take whatever actions are necessary or appropriate to recover from the exception. In JavaScript, exceptions are thrown whenever a runtime error occurs and whenever the program explicitly throws one using the `throw` statement. Exceptions are caught with the `try/catch/finally` statement, which is described in the next section.

::: tip 翻译
异常是一种信号，表示发生了某种意外情形或错误。抛出（`throw`）异常是为了表明发生了这种错误或意外情形。捕获（`catch`）异常则是要处理它，即采取必要或对应的措施以从异常中恢复。在 JavaScript 中，每当运行时发生错误或者程序里使用`throw`语句时都会抛出异常。可以使用`try/catch/finally`语句捕获异常，下一节会介绍这个语句。
:::

The `throw` statement has the following syntax:

::: tip 翻译
`throw`语句的语法如下：
:::

```js
throw expression;
```

_expression_ may evaluate to a value of any type. You might throw a number that represents an error code or a string that contains a human-readable error message. The Error class and its subclasses are used when the JavaScript interpreter itself throws an error, and you can use them as well. An Error object has a name property that specifies the type of error and a message property that holds the string passed to the constructor function. Here is an example function that throws an Error object when invoked with an invalid argument:

::: tip 翻译
_expression_ 可能求值为任何类型的值，可以抛出一个表示错误码的数值，也可以抛出一个包含可读的错误消息的字符串。JavaScript 解释器在抛出错误时会使用 Error 类及其子类，当然我们也可以在自己的代码中使用这些类。Error 对象有一个`name`属性和一个`message`属性，分别用于指定错误类型和保存传入构造函数的字符串。下面这个例子会在收到无效参数时抛出一个 Error 对象：
:::

```js
function factorial(x) {
  // 如果收到的参数无效，则抛出异常！
  if (x < 0) {
    throw new Error("x must not be negative");
  }
  // 否则，计算一个值并正常返回
  let f;
  for (f = 1; x > 1; f *= x, x--) {
    /**
     * empty
     */
  }
  return f;
}
factorial(4); // => 24
```

When an exception is thrown, the JavaScript interpreter immediately stops normal program execution and jumps to the nearest exception handler. Exception handlers are written using the `catch` clause of the `try/catch/finally` statement, which is described in the next section. If the block of code in which the exception was thrown does not have an associated catch clause, the interpreter checks the next-highest enclosing block of code to see if it has an exception handler associated with it. This continues until a handler is found. If an exception is thrown in a function that does not contain a `try/catch/finally` statement to handle it, the exception propagates up to the code that invoked the function. In this way, exceptions propagate up through the lexical structure of JavaScript methods and up the call stack. If no exception handler is ever found, the exception is treated as an error and is reported to the user.

::: tip 翻译
抛出异常时，JavaScript 解释器会立即停止正常程序的执行并跳到最近的异常处理程序。异常处理程序是使用`try/catch/finally`语句中的`catch`子句编写的，下一节会介绍。如果发生异常的代码块没有关联的`catch`子句，解释器会检查最接近的上一层代码块，看是否有与之关联的异常处理程序。这个过程一直持续，直至找到处理程序。如果函数中抛出了异常，但函数体内没有处理这个异常的`try/catch/finally`语句，则异常会向上传播到调用函数的代码。在这种情况下，异常是沿 JavaScript 方法的词法结构和调用栈向上传播的。如果没有找到任何异常处理程序，则将异常作为错误报告给用户。
:::

### try/catch/finally

The `try/catch/finally` statement is JavaScript’s exception handling mechanism. The `try` clause of this statement simply defines the block of code whose exceptions are to be handled. The `try` block is followed by a `catch` clause, which is a block of statements that are invoked when an exception occurs anywhere within the `try` block. The `catch` clause is followed by a `finally` block containing cleanup code that is guaranteed to be executed, regardless of what happens in the `try` block. Both the `catch` and `finally` blocks are optional, but a `try` block must be accompanied by at least one of these blocks. The `try`, `catch`, and `finally` blocks all begin and end with curly braces. These braces are a required part of the syntax and cannot be omitted, even if a clause contains only a single statement.

::: tip 翻译
`try/catch/finally`语句是 JavaScript 的异常处理机制。这个语句的`try`子句用于定义要处理其中异常的代码块。`try`块后面紧跟着`catch`子句，`catch`是一个语句块，在`try`块中发生异常时会被调用。`catch`子句后面是`finally`块，其中包含清理代码，无论`try`块中发生了什么，这个块中的代码一定会执行。`catch`和`finally`块都是可选的，但只要有`try`块，就必须有它们两中的一个。`try`、`catch`和`finally`块都以花括号开头和结尾。花括号是语法要求的部分，即使语句块只包含一条语句也不能省略。
:::

The following code illustrates the syntax and purpose of the `try/catch/finally` statement:

::: tip 翻译
下面的代码展示了`try/catch/finally`语句的语法和用途：
:::

```js
try {
  // 正常情况下，这里的代码会从头到尾执行，
  // 不会出现问题。但有时候也可能抛出异常：
  // 直接通过throw语句抛出，或者通过调用
  // 一个抛出异常的方法而抛出
} catch (e) {
  // 当且仅当try块抛出异常时，才会执行这个
  // 块中的语句。这里的语句可以使用局部变量
  // e 引用被抛出的Error对象。这个块可以以
  // 某种方式来处理异常，也可以什么也不做以忽略
  // 异常，还可以通过throw重新抛出异常
} finally {
  // 无论try块中发生什么，
  // 这个块中包含的语句都会被执行。无论try块是否终止，这些语句
  // 都会被执行：
  // 1) 正常情况下，在到达try块底部时执行
  // 2) 由于break、continue或return语句而执行
  // 3) 由于上面的catch子句处理了异常而执行
  // 4) 由于异常未被处理而继续传播而执行
}
```

Note that the `catch` keyword is generally followed by an identifier in parentheses. This identifier is like a function parameter. When an exception is caught, the value associated with the exception (an Error object, for example) is assigned to this parameter. The identifier associated with a `catch` clause has block scope—it is only defined within the catch block.

::: tip 翻译
注意，`catch`关键字后面通常会跟着一个包含在圆括号中的标识符。这个标识符类似函数的参数。当捕获到异常时，与异常关联的值（比如一个 Error 对象）就会被赋给这个参数。与`catch`子句关联的标识符具有块作用域，即只在`catch`块中有定义。
:::

Here is a realistic example of the `try/catch` statement. It uses the `factorial()` method defined in the previous section and the client-side JavaScript methods `prompt()` and `alert()` for input and output:

::: tip 翻译
下面是一个实际的`try/catch`语句的例子。例子中用到了上一节定义的`factorial()`方法，以及实现输入和输出的客户端 JavaScript 方法`prompt()`和`alert()`：
:::

```js
try {
  // 请用户输入一个数值
  let n = Number(prompt("Please enter a positive integer", ""));
  // 假设输入有效，计算该数值的阶乘
  let f = factorial(n);
  // 显示结果
  alert(n + "! = " + f);
} catch (ex) {
  // 如果用户的输入无效，则会跳到这里
  alert(ex); // 告诉用户发生了什么错误
}
```

This example is a `try/catch` statement with no `finally` clause. Although `finally` is not used as often as `catch`, it can be useful. However, its behavior requires additional explanation. The `finally` clause is guaranteed to be executed if any portion of the `try` block is executed, regardless of how the code in the `try` block completes. It is generally used to clean up after the code in the `try` clause.

::: tip 翻译
这个例子中只包含`try/catch`语句，没有`finally`子句。尽管`finally`没有`catch`使用得频繁，但有时候也很有用。不过，`finally`的行为需要再解释一下。只要执行了 try 块中的任何代码，`finally`子句就一定会执行，无论 try 块中的代码是怎么执行完的。因此`finally`子句经常用于在执行完 try 子句之后执行代码清理。
:::

In the normal case, the JavaScript interpreter reaches the end of the `try` block and then proceeds to the `finally` block, which performs any necessary cleanup. If the interpreter left the try block because of a `return`, `continue`, or `break` statement, the `finally` block is executed before the interpreter jumps to its new destination.

::: tip 翻译
正常情况下，JavaScript 解释器会执行到`try`块末尾，然后再执行`finally`块，从而完成必要的清理工作。如果解释器由于`return`、`continue`或`break`语句而离开了`try`块，则解释器在跳转到新目标之前会执行`finally`块。
:::

If an exception occurs in the `try` block and there is an associated `catch` block to handle the exception, the interpreter first executes the `catch` block and then the `finally` block. If there is no local `catch` block to handle the exception, the interpreter first executes the `finally` block and then jumps to the nearest containing `catch` clause.

::: tip 翻译
如果`try`块中发生了异常，而且有关联的`catch`块来处理这个异常，则解释器会先执行`catch`块，然后再执行`finally`块。如果局部没有`catch`块处理异常，则解释器会先执行`finally`块，然后再跳转到最接近的包含`catch`子句。
:::

If a `finally` block itself causes a jump with a `return`, `continue`, `break`, or `throw` statement, or by calling a method that throws an exception, the interpreter abandons whatever jump was pending and performs the new jump. For example, if a `finally` clause throws an exception, that exception replaces any exception that was in the process of being thrown. If a `finally` clause issues a `return` statement, the method returns normally, even if an exception has been thrown and has not yet been handled.

::: tip 翻译
如果`finally`块本身由于`return`、`continue`、`break`或`throw`语句导致跳转，或者调用的方法抛出了异常，则解释器会抛弃等待的跳转，执行新跳转。例如，如果`finally`子句抛出异常，该异常会代替正被抛出的其他异常。如果`finally`子句执行了`return`语句，则相应方法正常返回，即使有被抛出且尚未处理的异常。
:::

`try` and `finally` can be used together without a `catch` clause. In this case, the `finally` block is simply cleanup code that is guaranteed to be executed, regardless of what happens in the `try` block. Recall that we can’t completely simulate a for loop with a while loop because the `continue` statement behaves differently for the two loops. If we add a `try/finally` statement, we can write a `while` loop that works like a `for` loop and that handles `continue` statements correctly:

::: tip 翻译
`try`和`finally`可以配对使用，而不带`catch`子句。此时，无论`try`块中发生了什么，`finally`块一定会执行，可以正常完成清理任务。前面我们说过，不能完全通过`while`循环来模拟`for`循环，因为`continue`在这两种循环中的行为不一样。如果使用`try/finally`语句，就可以用`while`写出与`for`循环类似的逻辑，正确处理`continue`语句：
:::

```js
// 模拟 for(initialize ; test ; increment ) 循环体;
initialize;
while (test) {
  try {
    body;
  } finally {
    increment;
  }
}
```

Note, however, that a _body_ that contains a `break` statement behaves slightly differently (causing an extra increment before exiting) in the `while` loop than it does in the `for` loop, so even with the `finally` clause, it is not possible to completely simulate the for loop with `while`.

::: tip 翻译
不过要注意的是，包含`break`语句的`body`在`while`循环与在`for`循环中的行为会有所不同（在`while`循环中，`break`会导致在退出循环前额外执行一次`increment`）。因此即使使用`finally`子句，也不可能完全通过`while`来模拟`for`循环。
:::

> **Bare Catch Clauses**
> Occasionally you may find yourself using a `catch` clause solely to detect and stop the propagation of an exception, even though you do not care about the type or the value of the exception. In ES2019 and later, you can omit the parentheses and the identifier and use the `catch` keyword bare in this case. Here is an example:
>
> ```js
> // Like JSON.parse(), but return undefined instead of throwing an error
> function parseJSON(s) {
>   try {
>     return JSON.parse(s);
>   } catch {
>     // Something went wrong but we don't care what it was
>     return undefined;
>   }
> }
> ```

> **干捕获子句**
>
> 我们偶尔会使用 catch 子句，只为了检测和停止异常传播，此时我们并不关心异常的类型或者错误消息。在 ES2019 及之后的版本中，类似这种情况下可以省略圆括号和其中的标识符，只使用 catch 关键字。下面是一个例子：
>
> ```js
> // 与 JSON.parse() 类似，但返回undefined而不是抛出异常
> function parseJSON(s) {
>   try {
>     return JSON.parse(s);
>   } catch {
>     // 出错了，但我们不关心错误是什么
>     return undefined;
>   }
> }
> ```

## 其他语句

This section describes the remaining three JavaScript statements—`with`, `debugger`, and "`use strict`".

::: tip 翻译
本节介绍剩下的三个 JavaScript 语句：`with`、`debugger`和"`use strict`"。
:::

### with

The `with` statement runs a block of code as if the properties of a specified object were variables in scope for that code. It has the following syntax:

::: tip 翻译
`with`会运行一个代码块，就好像指定对象的属性是该代码块作用域中的变量一样。它有如下语法：
:::

```js
with (object) statement;
```

This statement creates a temporary scope with the properties of _object_ as variables and then executes _statement_ within that scope.

::: tip 翻译
这个语句创建了一个临时作用域，以 _object_ 的属性作为变量，然后在这个作用域中执行 _statement_。
:::

The `with` statement is forbidden in strict mode (see §5.6.3) and should be considered deprecated in non-strict mode: avoid using it whenever possible. JavaScript code that uses `with` is difficult to optimize and is likely to run significantly more slowly than the equivalent code written without the `with` statement.

::: tip 翻译
`with`在严格模式（参见 5.6.3 节）下是被禁用的，在非严格模式下也应该认为已经废弃了。换句话说，尽可能不使用它。使用`with`的 JavaScript 代码很难优化，与不使用`with`的等价代码相比运行速度明显慢得多。
:::

The common use of the `with` statement is to make it easier to work with deeply nested object hierarchies. In client-side JavaScript, for example, you may have to type expressions like this one to access elements of an HTML form:

::: tip 翻译
使用`with`语句主要是为了更方便地使用深度嵌套的对象。例如，在客户端 JavaScript 中，要访问某个 HTML 表单的元素可能要这样写：
:::

```js
document.forms[0].address.value;
```

If you need to write expressions like this a number of times, you can use the `with` statement to treat the properties of the form object like variables:

::: tip 翻译
如果需要写很多次这样的表达式，则可以使用`with`语句让使用表单对象的属性像使用变量一样：
:::

```js
with (document.forms[0]) {
  //在这里直接访问表单元素。例如：
  name.value = "";
  address.value = "";
  email.value = "";
}
```

This reduces the amount of typing you have to do: you no longer need to prefix each form property name with `document.forms[0]`. It is just as simple, of course, to avoid the `with` statement and write the preceding code like this:

::: tip 翻译
这样可以减少键盘输入，因为不用每次都写`document.forms[0]`了。当然，前面的代码不用`with`语句也很容易写成这样：
:::

```js
let f = document.forms[0];
f.name.value = "";
f.address.value = "";
f.email.value = "";
```

Note that if you use `const` or `let` or `var` to declare a variable or constant within the body of a `with` statement, it creates an ordinary variable and does not define a new property within the specified object.

::: tip 翻译
注意，如果在`with`语句体中使用`const`、`let`或`var`声明一个变量或常量，那么只会创建一个普通变量，不会在指定的对象上定义新属性。
:::

### debugger

The `debugger` statement normally does nothing. If, however, a debugger program is available and is running, then an implementation may (but is not required to) perform some kind of debugging action. In practice, this statement acts like a breakpoint: execution of JavaScript code stops, and you can use the debugger to print variables’ values, examine the call stack, and so on. Suppose, for example, that you are getting an exception in your function `f()` because it is being called with an undefined argument, and you can’t figure out where this call is coming from. To help you in debugging this problem, you might alter `f()` so that it begins like this:

::: tip 翻译
`debugger`语句一般什么也不做。不过，包含`debugger`的程序在运行时，实现可以（但不是必需）执行某种调试操作。实践中，这个语句就像一个断点，执行中的 JavaScript 会停止，我们可以使用调试器打印变量的值、检查调用栈，等等。例如，假设你在调用函数`f()`时没有传参数，函数就会抛出异常，而你不知道这个调用来自何处。为了调试这个问题，可以修改`f()`，像下面这样为它加上`debugger`语句：
:::

```js
function f(o) {
    if (o === undefined) debugger; // 仅为调试才添加的
    ... // 这里是函数中的其他代码
}
```

Now, when `f()` is called with no argument, execution will stop, and you can use the debugger to inspect the call stack and find out where this incorrect call is coming from.

::: tip 翻译
现在，再次调用`f()`而不传参数，执行就会停止，你可以使用调试器检查调用栈，找到这个错误的调用来自何处。
:::

Note that it is not enough to have a debugger available: the `debugger` statement won’t start the debugger for you. If you’re using a web browser and have the developer tools console open, however, this statement will cause a breakpoint.

::: tip 翻译
注意，只有调试器还不行，`debugger`语句并不为你打开调试器。如果你使用浏览器并且打开了开发者控制台，这个语句就会导致断点。
:::

### "use strict"

"`use strict`" is a directive introduced in ES5. Directives are not statements (but are close enough that "`use strict`" is documented here). There are two important differences between the "`use strict`" directive and regular statements:

- It does not include any language keywords: the directive is just an expression statement that consists of a special string literal (in single or double quotes).
- It can appear only at the start of a script or at the start of a function body, before any real statements have appeared.

::: tip 翻译
"`use strict`"是 ES5 引入的一个指令。指令不是语句（但非常近似，所以在这里介绍"`use strict`"）。"`use strict`"与常规语句有两个重要的区别:

- 不包含任何语言关键字：指令是由（包含在单引号或双引号中的）特殊字符串字面量构成的表达式语句。
- 只能出现在脚本或函数体的开头，位于所有其他真正的语句之前。
  :::

The purpose of a "`use strict`" directive is to indicate that the code that follows (in the script or function) is _strict code_. The top-level (nonfunction) code of a script is strict code if the script has a "`use strict`" directive. A function body is strict code if it is defined within strict code or if it has a "`use strict`" directive. Code passed to the `eval()` method is strict code if `eval()` is called from strict code or if the string of code includes a "`use strict`" directive. In addition to code explicitly declared to be strict, any code in a class body ([Chapter 9](./Chapter-09-Classes.md)) or in an ES6 module (§10.3) is automatically strict code. This means that if all of your JavaScript code is written as modules, then it is all automatically strict, and you will never need to use an explicit "`use strict`" directive.

::: tip 翻译
"`use strict`"指令的目的是表示（在脚本或函数中）它后面的代码是严格代码。如果脚本中有"`use strict`"指令，则脚本的顶级（非函数）代码是严格代码。如果函数体是在严格代码中定义的，或者函数体中有一个"`use strict`"指令，那么它就是严格代码。如果严格代码中调用了`eval()`，那么传给`eval()`的代码也是严格代码；如果传给`eval()`的字符串包含"`use strict`"指令，那么相应的代码也是严格代码。除了显式声明为严格的代码，任何位于 class 体（参见[第 9 章](./Chapter-09-Classes.md)）或 ES6 模块（参见 10.3 节）中的代码全部默认为严格代码，而无须把"`use strict`"指令显式地写出来。
:::

Strict code is executed in _strict mode_. Strict mode is a restricted subset of the language that fixes important language deficiencies and provides stronger error checking and increased security. Because strict mode is not the default, old JavaScript code that still uses the deficient legacy features of the language will continue to run correctly. The differences between strict mode and non-strict mode are the following (the first three are particularly important):

- The `with` statement is not allowed in strict mode.
- In strict mode, all variables must be declared: a ReferenceError is thrown if you assign a value to an identifier that is not a declared variable, function, function parameter, `catch` clause parameter, or property of the global object. (In non strict mode, this implicitly declares a global variable by adding a new property to the global object.)
- In strict mode, functions invoked as functions (rather than as methods) have a `this` value of `undefined`. (In non-strict mode, functions invoked as functions are always passed the global object as their `this` value.) Also, in strict mode, when a function is invoked with `call()` or `apply()` (§8.7.4), the `this` value is exactly the value passed as the first argument to `call()` or `apply()`. (In non-strict mode, `null` and `undefined` values are replaced with the global object and nonobject values are converted to objects.)
- In strict mode, assignments to nonwritable properties and attempts to create new properties on non-extensible objects throw a TypeError. (In non-strict mode, these attempts fail silently.)
- In strict mode, code passed to `eval()` cannot declare variables or define functions in the caller’s scope as it can in non-strict mode. Instead, variable and function definitions live in a new scope created for the `eval()`. This scope is discarded when the `eval()` returns.
- In strict mode, the Arguments object (§8.3.3) in a function holds a static copy of the values passed to the function. In non-strict mode, the Arguments object has “magical” behavior in which elements of the array and named function parameters both refer to the same value.
- In strict mode, a SyntaxError is thrown if the `delete` operator is followed by an unqualified identifier such as a variable, function, or function parameter. (In nonstrict mode, such a `delete` expression does nothing and evaluates to `false`.)
- In strict mode, an attempt to `delete` a nonconfigurable property throws a TypeError. (In non-strict mode, the attempt fails and the `delete` expression evaluates to `false`.)
- In strict mode, it is a syntax error for an object literal to define two or more properties by the same name. (In non-strict mode, no error occurs.)
- In strict mode, it is a syntax error for a function declaration to have two or more parameters with the same name. (In non-strict mode, no error occurs.)
- In strict mode, octal integer literals (beginning with a 0 that is not followed by an x) are not allowed. (In non-strict mode, some implementations allow octal literals.)
- In strict mode, the identifiers `eval` and `arguments` are treated like keywords, and you are not allowed to change their value. You cannot assign a value to these identifiers, declare them as variables, use them as function names, use them as function parameter names, or use them as the identifier of a `catch` block.
- In strict mode, the ability to examine the call stack is restricted. `arguments.caller` and `arguments.callee` both throw a TypeError within a strict mode function. Strict mode functions also have caller and `arguments` properties that throw TypeError when read. (Some implementations define these nonstandard properties on non-strict functions.)

::: tip 翻译
严格代码在严格模式下执行。严格模式是 JavaScript 的一个受限制的子集，这个子集修复了重要的语言缺陷，提供了更强的错误检查，也增强了安全性。因为严格模式并不是默认的，那些使用语言中有缺陷的遗留特性的旧代码依然可以正确运行。严格模式与非严格模式的区别如下（前三个特别重要）：

- 严格模式下不允许使用`with`语句。
- 在严格模式下，所有变量都必须声明。如果把值赋给一个标识符，而这个标识符是没有声明的变量、函数、函数参数、`catch`子句参数或全局对象的属性，都会导致抛出一个 ReferenceError（在非严格模式下，给全局对象的属性赋值会隐式声明一个全局变量，即给全局对象添加一个新属性）。
- 在严格模式下，函数如果作为函数（而非方法）被调用，其`this`值为`undefined`（在非严格模式，作为函数调用的函数始终以全局对象作为`this`的值）。另外，在严格模式下，如果函数通过`call()`或`apply()`（参见 8.7.4 节）调用，则`this`值就是作为第一个参数传给`call()`或`apply()`的值（在非严格模式下，`null`和`undefined`值会被替换为全局对象，而非对象值会被转换为对象）。
- 在严格模式下，给不可写的属性赋值或尝试在不可扩展的对象上创建新属性会抛出 TypeError（在非严格模式下，这些尝试会静默失败）。
- 在严格模式下，传给`eval()`的代码不能像在非严格模式下那样在调用者的作用域中声明变量或定义函数。这种情况下定义的变量和函数会存在于一个为`eval()`创建的新作用域中。这个作用域在`eval()`返回时就会被销毁。
- 在严格模式下，函数中的`Arguments`对象（参见 8.3.3 节）保存着一份传给函数的值的静态副本。在非严格模式下，这个`Arguments`对象具有“魔法”行为，即这个数组中的元素与函数的命名参数引用相同的值。
- 在严格模式下，如果`delete`操作符后面跟一个未限定的标识符，比如变量、函数或函数参数，则会导致抛出 SyntaxError（在非严格模式下，这样的`delete`表达式什么也不做，且返回`false`）。
- 在严格模式下，尝试删除一个不可配置的属性会导致抛出 TypeError（在非严格模式下，这个尝试会失败，且`delete`表达式会求值为`false`）。
- 在严格模式下，对象字面量定义两个或多个同名属性是语法错误（在非严格模式下，不会发生错误）。
- 在严格模式下，函数声明中有两个或多个同名参数是语法错误（在非严格模式下，不会发生错误）。
- 在严格模式下，不允许使用八进制整数字面量（以`0`开头后面没有`x`）（在非严格模式下，某些实现允许使用八进制字面量）。
- 在严格模式下，标识符`eval`和`arguments`被当作关键字，不允许修改它们的值。不能给这些标识符赋值，不能把它们声明为变量，不能把它们用作函数名或者函数参数名，也不能把它们作为`catch`块的标识符使用。
- 在严格模式下，检查调用栈的能力是受限制的。`arguments.caller`和`arguments.callee`在严格模式函数中都会抛出 TypeError。严格模式函数也有`caller`和`arguments`属性，但读取它们会抛出 TypeError（某些实现在非严格函数中定义了这些非标准属性）。
  :::

## 声明

The keywords `const`, `let`, `var`, `function`, `class`, `import`, and `export` are not technically statements, but they look a lot like statements, and this book refers informally to them as statements, so they deserve a mention in this chapter.

::: tip 翻译
关键字`const`、`let`、`var`、`function`、`class`、`import`和`export`严格来讲并不是语句，只是看起来很像语句，本书非正式地称它们为语句，因此本章也一并在这里介绍。
:::

These keywords are more accurately described as _declarations_ rather than statements. We said at the start of this chapter that statements “make something happen.” Declarations serve to define new values and give them names that we can use to refer to those values. They don’t make much happen themselves, but by providing names for values they, in an important sense, define the meaning of the other statements in your program.

::: tip 翻译
这些关键字更准确地讲应该叫作声明而非语句。我们在本章开始时说过，语句会导致“某些事件发生”。声明可以定义新值并给它们命名，以便将来通过这个名字引用相应的值。声明本身不会导致太多事件发生，但通过为值提供名字，它们会为程序中的其他语句定义相应的含义，这一点非常重要。
:::

When a program runs, it is the program’s expressions that are being evaluated and the program’s statements that are being executed. The declarations in a program don’t “run” in the same way: instead, they define the structure of the program itself. Loosely, you can think of declarations as the parts of the program that are processed before the code starts running.

::: tip 翻译
当程序运行时，解释器会对程序中的表达式求值，而且会执行程序的语句。程序中的声明并不以同样的方式“运行”，但它们定义程序本身的结构。宽泛地说，可以把声明看成程序的一部分，这一部分会在代码运行前预先处理。
:::

JavaScript declarations are used to define constants, variables, functions, and classes and for importing and exporting values between modules. The next subsections give examples of all of these declarations. They are all covered in much more detail elsewhere in this book.

::: tip 翻译
JavaScript 声明用于定义常量、变量、函数和类，也用于在模块间导入和导出值。接下来几小节将给出所有这些声明的例子。本书其他地方也有对它们更详细的介绍。
:::

### const, let, and var

The `const`, `let`, and `var` declarations are covered in §3.10. In ES6 and later, `const` declares constants, and `let` declares variables. Prior to ES6, the `var` keyword was the only way to declare variables and there was no way to declare constants. Variables declared with var are scoped to the containing function rather than the containing block. This can be a source of bugs, and in modern JavaScript there is really no reason to use var instead of `let`.

::: tip 翻译
本书在 3.10 节详细介绍了`const`、`let`和`var`。在 ES6 及之后的版本中，`const`声明常量而`let`声明变量。在 ES6 之前，使用`var`是唯一一个声明变量的方式，无法声明常量。使用`var`声明的变量，其作用域为包含函数，而非包含块。这可能会导致隐含的错误，但在现代 JavaScript 中，没有任何理由再使用`var`而不是`let`。
:::

```js
const TAU = 2 * Math.PI;
let radius = 3;
var circumference = TAU * radius;
```

### function

The `function` declaration is used to define functions, which are covered in detail in **Chapter 8**. (We also saw function in §4.3, where it was used as part of a function expression rather than a function declaration.) A function declaration looks like this:

::: tip 翻译
`function`声明用于定义函数，第 8 章中有详尽的介绍（我们在 4.3 节也看到过`function`，但当时是将其作为函数表达式而不是函数声明）。下面是一个函数声明的例子：
:::

```js
function area(radius) {
  return Math.PI * radius * radius;
}
```

A function declaration creates a function object and assigns it to the specified name--`area` in this example. Elsewhere in our program, we can refer to the function—and run the code inside it—by using this name. The function declarations in any block of JavaScript code are processed before that code runs, and the function names are bound to the function objects throughout the block. We say that function declarations are “hoisted” because it is as if they had all been moved up to the top of whatever scope they are defined within. The upshot is that code that invokes a function can exist in your program before the code that declares the function.

::: tip 翻译
函数声明会创建一个函数对象，并把这个函数对象赋值给指定的名字（在这里是`area`）。然后在程序的任何地方都可以通过这个名字来引用这个函数，以及运行其中的代码。位于任何 JavaScript 代码块中的函数声明都会在代码运行之前被处理，而在整个代码块中函数名都会绑定到相应的函数对象。无论在作用域中的什么地方声明函数，这些函数都会被“提升”，就好像它们是在该作用域顶部定义的一样。于是在程序中，调用函数的代码可能位于声明函数的代码之前。
:::

§12.3 describes a special kind of function known as a _generator_. Generator declarations use the `function` keyword but follow it with an asterisk. §13.3 describes asynchronous functions, which are also declared using the `function` keyword but are prefixed with the `async` keyword.

::: tip 翻译
12.3 节描述一种特殊的函数，叫作生成器。生成器声明使用`function`关键字后跟一个星号。13.3 节介绍了异步函数，同样也是使用`function`关键字声明的，但前面要加一个`async`关键字。
:::

### class

In ES6 and later, the `class` declaration creates a new class and gives it a name that we can use to refer to it. Classes are described in detail in [Chapter 9](./Chapter-09-Classes.md). A simple class declaration might look like this:

::: tip 翻译
在 ES6 及之后的版本中，class 声明会创建一个新类并为其赋予一个名字，以便将来引用。[第 9 章](./Chapter-09-Classes.md)详细地介绍了类。下面是一个简单的类声明：
:::

```js
class Circle {
  constructor(radius) {
    this.r = radius;
  }
  area() {
    return Math.PI * this.r * this.r;
  }
  circumference() {
    return 2 * Math.PI * this.r;
  }
}
```

Unlike functions, class declarations are not hoisted, and you cannot use a class declared this way in code that appears before the declaration.

::: tip 翻译
与函数不同，类声明不会被提升。因此在代码中，不能在还没有声明类之前就使用类。
:::

### import 和 export

The `import` and `export` declarations are used together to make values defined in one module of JavaScript code available in another module. A module is a file of JavaScript code with its own global namespace, completely independent of all other modules. The only way that a value (such as function or class) defined in one module can be used in another module is if the defining module exports it with `export` and the using module imports it with `import`. Modules are the subject of [Chapter 10](./Chapter-10-Modules.md), and `import` and `export` are covered in detail in §10.3.

::: tip 翻译
`import`和`export`声明共同用于让一个 JavaScript 模块中定义的值可以在另一个模块中使用。一个模块就是一个 JavaScript 代码文件，有自己的全局作用域，完全与其他模块无关。如果要在一个模块中使用另一个模块中定义的值（如函数或类），唯一的方式就是在定义值的模块中使用`export`导出值，在使用值的模块中使用`import`导入值。模块是[第 10 章](./Chapter-10-Modules.md)的主题，`import`和`export`在 10.3 节有详细介绍。
:::

`import` directives are used to import one or more values from another file of JavaScript code and give them names within the current module. `import` directives come in a few different forms. Here are some examples:

::: tip 翻译
`import`指令用于从另一个 JavaScript 代码文件中导入一个或多个值，并在当前模块中为这些值指定名字。`import`指令有几种不同的形式。下面是几个例子：
:::

```js
import Circle from "./geometry/circle.js";
import { PI, TAU } from "./geometry/constants.js";
import { magnitude as hypotenuse } from "./vectors/utils.js";
```

Values within a JavaScript module are private and cannot be imported into other modules unless they have been explicitly exported. The `export` directive does this: it declares that one or more values defined in the current module are exported and therefore available for import by other modules. The `export` directive has more variants than the import directive does. Here is one of them:

::: tip 翻译
JavaScript 模块中的值是私有的，除非被显式导出，否则其他模块都无法导入。`export`指令就是为此而生的，它声明把当前模块中定义的一个或多个值导出，因而其他模块可以导入这些值。`export`指令相比`import`指令有更多变体，下面是其中一种：
:::

```js
// geometry/constants.js
const PI = Math.PI;
const TAU = 2 * PI;
export { PI, TAU };
```

The `export` keyword is sometimes used as a modifier on other declarations, resulting in a kind of compound declaration that defines a constant, variable, function, or class and exports it at the same time. And when a module exports only a single value, this is typically done with the special form `export default`:

::: tip 翻译
`export`关键字有时候也用作其他声明的标识符，从而构成一种复合声明，在定义常量、变量、函数或类的同时又导出它们。如果一个模块只导出一个值，通常会使用特殊的`export default`形式：
:::

```js
export const TAU = 2 * Math.PI;
export function magnitude(x, y) {
  return Math.sqrt(x * x + y * y);
}
export default class Circle {
  /* class definition omitted here */
}
```

## 总结

This chapter introduced each of the JavaScript language’s statements, which are summarized in Table 5-1.

::: tip 翻译
本章介绍了 JavaScript 语言的所有语句，它们的语法全部列举在表 5-1 中。
:::

_Table 5-1. JavaScript statement syntax_

| Statement         | Purpose                                                                  |
| ----------------- | ------------------------------------------------------------------------ |
| break             | Exit from the innermost loop or switch or from named enclosing statement |
| case              | Label a statement within a switch                                        |
| class             | Declare a class                                                          |
| const             | Declare and initialize one or more constants                             |
| continue          | Begin next iteration of the innermost loop or the named loop             |
| debugger          | Debugger breakpoint                                                      |
| default           | Label the default statement within a switch                              |
| do/while          | An alternative to the while loop                                         |
| export            | Declare values that can be imported into other modules                   |
| for               | Any easy-to-use loop                                                     |
| for/await         | Asynchronously iterate the values of an async iterator                   |
| for/in            | Enumerate the property names of an object                                |
| for/of            | Enumerate the values of an iterable object such as an array              |
| function          | Declare a function                                                       |
| if/else           | Execute one statement or another depending on a condition                |
| import            | Declare names for values defined in other modules                        |
| label             | Give statement a name for use with break and continue                    |
| let               | Declare and initialize one or more block-scoped variables (new syntax)   |
| return            | Return a value from a function                                           |
| switch            | Multiway branch to case or default: labels                               |
| throw             | Throw an exception                                                       |
| try/catch/finally | Handle exceptions and code cleanup                                       |
| "use strict"      | Apply strict mode restrictions to script or function                     |
| var               | Declare and initialize one or more variables (old syntax)                |
| while             | A basic loop construct                                                   |
| with              | Extend the scope chain (deprecated and forbidden in strict mode)         |
| yield             | Provide a value to be iterated; only used in generator functions         |

| Statement         | Purpose                                           |
| ----------------- | ------------------------------------------------- |
| break             | 推出最内部循环、switch 或有名字的闭合语句         |
| case              | 在 switch 中标记一条语句                          |
| class             | 声明一个类                                        |
| const             | 声明并初始化一个或多个常量                        |
| continue          | 开始最内部循环或命名循环的下一次迭代              |
| debugger          | 调试器断点                                        |
| default           | 在 switch 中标记默认语句                          |
| do/while          | 替代 while 循环的一种结构                         |
| export            | 声明可以被导入其他模块的值                        |
| for               | 一种方便好用的循环                                |
| for/await         | 异步迭代异步迭代器的值                            |
| for/in            | 枚举对象的属性名                                  |
| for/of            | 枚举可迭代对象（如数组）的值                      |
| function          | 声明一个函数                                      |
| if/else           | 根据某个条件执行一个或另一个语句                  |
| import            | 为在其他模块中定义的值声明名字                    |
| label             | 为语句起个名字，以便与 break 和 continue 一起使用 |
| let               | 声明并初始化一个或多个块作用域的变量（新语法）    |
| return            | 从函数中返回一个值                                |
| switch            | 包含 case 或 default: 标签的多分枝结构            |
| throw             | 抛出一个异常                                      |
| try/catch/finally | 处理异常和代码清理                                |
| "use strict"      | 对脚本或函数应用严格模式                          |
| var               | 声明并初始化一个或多个变量（老语法）              |
| while             | 一种基本的循环结构                                |
| with              | 扩展作用域链（在严格模式下被废弃并禁止）          |
| yield             | 提供一个被迭代的值；只用在生成器函数中            |
