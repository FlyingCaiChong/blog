---
title: 第二章 词法结构
---

# 词法结构

[[toc]]

The lexical structure of a programming language is the set of elementary rules that specifies how you write programs in that language. It is the lowest-level syntax of a language: it specifies what variable names look like, the delimiter characters for comments, and how one program statement is separated from the next, for example. This short chapter documents the lexical structure of JavaScript. It covers:

- Case sensitivity, spaces, and line breaks
- Comments
- Literals
- Identifiers and reserved words
- Unicode
- Optional semicolons

::: tip 翻译
编程语言的词法结构是一套基本规则，规定了如何使用这门语言编写程序。词法结构是一门语言最低级的语法，规定了变量如何命名、注释的定界符，以及如何分隔程序的语句，等等。本章篇幅不长，主要讲解 JavaScript 的词法结构，涵盖如下内容：

- 区分大小写、空格和换行符
- 注释
- 字面量
- 标识符和保留字
- Unicode
- 可选的分号
  :::

## JavaScript 程序的文本

JavaScript is a case-sensitive language. This means that language keywords, variables, function names, and other _identifiers_ must always be typed with a consistent capitalization of letters. The while keyword, for example, must be typed “while,” not “While” or “WHILE.” Similarly, `online`, `Online`, `OnLine`, and `ONLINE` are four distinct variable names.

::: tip 翻译
JavaScript 区分大小写。这意味着它的关键字、变量、函数名和其他标识符必须始终保持一致的大小写形式。比如`while`关键字必须写成`while`，而不是`While`或`WHILE`。类似的，`online`、`Online`、`OnLine`和`ONLINE`是 4 个完全不同的变量名。
:::

JavaScript ignores spaces that appear between tokens in programs. For the most part, JavaScript also ignores line breaks (but see §2.6 for an exception). Because you can use spaces and newlines freely in your programs, you can format and indent your programs in a neat and consistent way that makes the code easy to read and understand.

::: tip 翻译
JavaScript 忽略程序记号(token)之间的空格。很大程度上，JavaScript 也忽略换行符（2.6 节将介绍例外情形）。因为可以在程序中随意使用空格和换行，所以可以按照便于阅读理解的方式对程序进行格式化和缩进。
:::

In addition to the regular space character (`\u0020`), JavaScript also recognizes tabs, assorted ASCII control characters, and various Unicode space characters as whitespace. JavaScript recognizes newlines, carriage returns, and a carriage return/line feed sequence as line terminators.

::: tip 翻译
除了常规空格(`\u0020`)，JavaScript 也将制表符、各种 ASCII 控制符和 Unicode 间隔符识别为空格。JavaScript 将换行符、回车符和回车/换行序列识别为行终止符。
:::

## 注释

JavaScript supports two styles of comments. Any text between a `//` and the end of a line is treated as a comment and is ignored by JavaScript. Any text between the characters `/*` and `*/` is also treated as a comment; these comments may span multiple lines but may not be nested. The following lines of code are all legal JavaScript comments:

::: tip 翻译
JavaScript 支持两种样式的注释: 当行注释是以 `//` 开头到一行末尾的内容；多行注释位于 `/*` 和 `*/` 之间，可以跨行，但不能嵌套。下面几行代码都是合法的 JavaScript 注释：
:::

```js
// 这是单行注释

/* 这也是注释 */ // 而这是另一个注释.

/*
 * 这是多行注释。
 * 每行开头额外的*字符不是必需的，只是为了美观
 */
```

## 字面量

A _literal_ is a data value that appears directly in a program. The following are all literals:

::: tip 翻译
字面量（literal）是一种直接出现在程序中的数据值。下面这些都是字面量：
:::

```js
12; // 数值12
1.2; // 数值1.2
("hello world"); // 字符串
("Hi"); // 另一个字符串
true; // 布尔值
false; // 另一个布尔值
null; // 无对象
```

Complete details on numeric and string literals appear in [Chapter 3](./Chapter-03-Types_Values_Variables.md).

::: tip 翻译
[第 3 章](./Chapter-03-Types_Values_Variables.md)将详细介绍数值和字符串字面量。
:::

## 标识符和保留字

An _identifier_ is simply a name. In JavaScript, identifiers are used to name constants, variables, properties, functions, and classes and to provide labels for certain loops in JavaScript code. A JavaScript identifier must begin with a letter, an underscore (`_`), or a dollar sign (`$`). Subsequent characters can be letters, digits, underscores, or dollar signs. (Digits are not allowed as the first character so that JavaScript can easily distinguish identifiers from numbers.) These are all legal identifiers:

::: tip 翻译
简单来说，标识符就是一个名字。在 JavaScript 中，标识符用于在 JavaScript 代码中命名常量、变量、属性、函数和类，以及为某些循环提供标记(label)。JavaScript 标识符必须以字母、下划线(`_`)或美元符号(`$`)开头。后续字符可以是字母、数字、下划线或美元符号（数字不能作为第一个字符，以便 JavaScript 区分标识符和数值）。以下都是合法的标识符：
:::

```js
i;
my_variable_name;
v13;
_dummy;
$str;
```

Like any language, JavaScript reserves certain identifiers for use by the language itself. These “reserved words” cannot be used as regular identifiers. They are listed in the next section.

::: tip 翻译
与其他语言一样，JavaScript 为语言自身使用而保留了某些标识符。这些"保留字"不能作为常规标识符使用。下面介绍保留字。
:::

### 保留字

The following words are part of the JavaScript language. Many of these (such as `if`, `while`, and `for`) are reserved keywords that must not be used as the names of constants, variables, functions, or classes (though they can all be used as the names of properties within an object). Others (such as `from`, `of`, `get`, and `set`) are used in limited contexts with no syntactic ambiguity and are perfectly legal as identifiers. Still other keywords (such as `let`) can’t be fully reserved in order to retain backward compatibility with older programs, and so there are complex rules that govern when they can be used as identifiers and when they cannot. (`let` can be used as a variable name if declared with `var` outside of a class, for example, but not if declared inside a class or with `const`.) The simplest course is to avoid using any of these words as identifiers, except for `from`, `set`, and `target`, which are safe to use and are already in common use.

::: tip 翻译
以下列出的单词是 JavaScript 语言的一部分。其中很多（如`if`、`while`和`for`）绝对不能用作常量、变量、函数或类的名字（但可以在对象中用作属性的名字）。另外一些（如`from`、`of`、`get`和`set`）只能在少数完全没有语法歧义的情况下使用，是完全合法的标识符。还有一些关键字（如`let`）不能完全保留，因为要保持与旧程序向后兼容，为此有复杂的规则约束它们什么时候可以用作标识符，什么时候不可以（例如，在类外部通过`var`声明的变量可以用`let`作为变量名，但在类内部或使用`const`声明时不行）。最简单的做法就是不要使用这些单词作为标识符，但`from`、`set`和`target`除外，因为使用它们很安全，而且也很常见。
:::

```js
as const export get null target void
async continue extends if of this while
await debugger false import return throw with
break default finally in set true yield
case delete for instanceof static try
catch do from let super typeof
class else function new switch var
```

JavaScript also reserves or restricts the use of certain keywords that are not currently used by the language but that might be used in future versions:

::: tip 翻译
JavaScript 也保留或限制对某些关键字的使用，这些关键字当前并未被语言所用，但将来某个版本有可能会用到：
:::

```js
enum implements interface package private protected public
```

For historical reasons, `arguments` and `eval` are not allowed as identifiers in certain circumstances and are best avoided entirely.

::: tip 翻译
由于历史原因，某些情况下也不允许使用`arguments`和`eval`作为标识符，因此最好不要使用。
:::

## Unicode

JavaScript programs are written using the Unicode character set, and you can use any Unicode characters in strings and comments. For portability and ease of editing, it is common to use only ASCII letters and digits in identifiers. But this is a programming convention only, and the language allows Unicode letters, digits, and ideographs (but not emojis) in identifiers. This means that programmers can use mathematical symbols and words from non-English languages as constants and variables:

::: tip 翻译
JavaScript 程序是使用 Unicode 字符集编写的，因此在字符串和注释中可以使用任意 Unicode 字符。考虑到可移植性和易于编辑，建议在标识符中只使用 ASCII 字母和数字。但这只是一个编程惯例，语言本书支持在标识符中使用 Unicode 字母、数字和象形文字（但不支持表情符号）。这意味着常量或变量的名字中可以包含数学符号或非英语文字：
:::

```js
const π = 3.14;
const sí = true;
```

### Unicode 转义序列

Some computer hardware and software cannot display, input, or correctly process the full set of Unicode characters. To support programmers and systems using older technology, JavaScript defines escape sequences that allow us to write Unicode characters using only ASCII characters. These Unicode escapes begin with the characters `\u` and are either followed by exactly four hexadecimal digits (using uppercase or lowercase letters A–F) or by one to six hexadecimal digits enclosed within curly braces. These Unicode escapes may appear in JavaScript string literals, regular expression literals, and identifiers (but not in language keywords). The Unicode escape for the character “é,” for example, is `\u00E9`; here are three different ways to write a variable name that includes this character:

::: tip 翻译
某些计算机硬件和软件无法显示、输入或正确处理全部 Unicode 字符。为方便程序员编码和支持使用老技术的系统，JavaScript 定义了转义序列，从而可以仅使用 ASCII 字符来表示 Unicode 字符。这些 Unicode 转义序列以`\u`开头，后跟 4 位十六进制数字（包括大写或小写的字母 A~F）或包含在一对花括号内的 1 ～ 6 位十六进制数字。Unicode 转义序列可以出现在 JavaScript 字符串字面量、正则表达式字面量和标识符中（不能出现在语言关键字中）。例如，字符“é”的 Unicode 转义序列是`\u00E9`，以下是 3 中在变量中使用这个字符的示例：
:::

```
let café = 1; // 使用Unicode字符定义一个变量
caf\u00e9; // => 1; 使用转义序列访问这个变量
caf\u{E9}; // => 1; 相同转义序列的另一种形式
```

Early versions of JavaScript only supported the four-digit escape sequence. The version with curly braces was introduced in ES6 to better support Unicode codepoints that require more than 16 bits, such as emoji:

::: tip 翻译
JavaScript 的早期版本只支持 4 位数字转义序列。带花括号的版本是 ES6 新增的，目的是更好地支持大于 16 位的 Unicode 码点，比如表情符号：
:::

```js
console.log("\u{1F600}"); // 打印一个笑脸符号
```

Unicode escapes may also appear in comments, but since comments are ignored, they are simply treated as ASCII characters in that context and not interpreted as Unicode.

::: tip 翻译
Unicode 转义序列也可以出现在注释中，但因为注释会被忽略，所以注释中的转义序列会被作为 ASCII 字符处理，不会被解释为 Unicode 字符。
:::

### Unicode 归一化

If you use non-ASCII characters in your JavaScript programs, you must be aware that Unicode allows more than one way of encoding the same character. The string “é,” for example, can be encoded as the single Unicode character `\u00E9` or as a regular ASCII “e” followed by the acute accent combining mark `\u0301`. These two encodings typically look exactly the same when displayed by a text editor, but they have different binary encodings, meaning that they are considered different by JavaScript, which can lead to very confusing programs:

::: tip 翻译
如果你在程序中使用非 ASCII 字符，那必须知道 Unicode 允许用多种编码方式表示同一个字符。例如，字符串“é”可以被编码为一个 Unicode 字符`\u00E9`，也可以被编码为一个常规 ASCII 字符 “e”后跟一个重音组合标记`\u0301`。这两种编码在文本编辑器中看起来完全相同，但它们的二进制编码不同，因此 JavaScript 认为它们不同，而这可能导致非常麻烦的问题：
:::

```js
const café = 1; // 这个常量名为 "caf\u{e9}"
const café = 2; // 这个常量不同: "cafe\u{301}"
café; // => 1: 这个常量有一个值
café; // => 2: 这个不同的常量有一个不同的值
```

The Unicode standard defines the preferred encoding for all characters and specifies a normalization procedure to convert text to a canonical form suitable for comparisons. JavaScript assumes that the source code it is interpreting has already been normalized and does not do any normalization on its own. If you plan to use Unicode characters in your JavaScript programs, you should ensure that your editor or some other tool performs Unicode normalization of your source code to prevent you from ending up with different but visually indistinguishable identifiers.

::: tip 翻译
Unicode 标准为所有字符定义了首选编码并规定了归一化例程，用于把文本转换为适合比较的规范形式。JavaScript 假定自己解释的源代码已经归一化，它自己不会执行任何归一化。如果你想在 JavaScript 程序中使用 Unicode 字符，应该保证使用自己的编辑器或其他工具对自己的源代码执行 Unicode 归一化，以防其中包含看起来一样但实际不同的标识符。
:::

## 可选的分号

Like many programming languages, JavaScript uses the semicolon (`;`) to separate statements (see [Chapter 5](./Chapter-05-Statements.md)) from one another. This is important for making the meaning of your code clear: without a separator, the end of one statement might appear to be the beginning of the next, or vice versa. In JavaScript, you can usually omit the semicolon between two statements if those statements are written on separate lines. (You can also omit a semicolon at the end of a program or if the next token in the program is a closing curly brace: `}`.) Many JavaScript programmers (and the code in this book) use semicolons to explicitly mark the ends of statements, even where they are not required. Another style is to omit semicolons whenever possible, using them only in the few situations that require them. Whichever style you choose, there are a few details you should understand about optional semicolons in JavaScript.

::: tip 翻译
与很多编程语言一样，JavaScript 使用分号（`;`）分隔语句（参见[第 5 章](./Chapter-05-Statements.md)）。这对于保持代码清晰很重要：如果没有分隔符，一条语句的结尾可能是另一条语句的开头，反之亦然。在 JavaScript 中，如果两条语句分别写在两行，通常可以省略它们之间的分号。另外，在程序末尾，如果接下来的记号是右花括号（`}`），则可以省略分号。很多 JavaScript 程序员（包括本书中的代码示例）使用分号明确标识语句结束，即便这些分号并非必需。另一种风格是尽可能省略分号，只在少数必要情况下才用。无论使用哪种风格，都需要了解一些关于 JavaScript 中可选分号的细节。
:::

Consider the following code. Since the two statements appear on separate lines, the first semicolon could be omitted:

::: tip 翻译
来看下面的代码。因为两条语句位于两行，所以第一个分号可以省略：
:::

```js
a = 3;
b = 4;
```

Written as follows, however, the first semicolon is required:

::: tip 翻译
然而，像下面这样写，第一个分号是必需的
:::

```
a = 3; b = 4;
```

Note that JavaScript does not treat every line break as a semicolon: it usually treats line breaks as semicolons only if it can’t parse the code without adding an implicit semicolon. More formally (and with three exceptions described a bit later), JavaScript treats a line break as a semicolon if the next nonspace character cannot be interpreted as a continuation of the current statement. Consider the following code:

::: tip 翻译
注意，JavaScript 并非任何时候都把换行符当作分号，而只是在不隐式添加分号就无法解析代码的情况下才这么做。更准确地讲（除了稍后介绍的三种例外情况），JavaScript 只在下一个非空格字符无法被解析为当前语句的一部分时才把换行符当作分号。来看下面的代码：
:::

```
let a
a
=
3
console.log(a)
```

JavaScript interprets this code like this:

::: tip 翻译
JavaScript 将这段代码解释为：
:::

```js
let a;
a = 3;
console.log(a);
```

JavaScript does treat the first line break as a semicolon because it cannot parse the code `let a a` without a semicolon. The second `a` could stand alone as the statement `a`;, but JavaScript does not treat the second line break as a semicolon because it can continue parsing the longer statement `a = 3;`.

::: tip 翻译
之所以把第一个换行符当作分号，是因为如果没有分号，JavaScript 就无法解析代码`let a a`。第二个`a`本身是一条独立的语句，但 JavaScript 并没有把第二个换行符当作分号，因为它还可以继续解析更长的语句 `a = 3;`。
:::

These statement termination rules lead to some surprising cases. This code looks like two separate statements separated with a newline:

::: tip 翻译
这些语句终止规则会导致某些意外情形。以下代码看起来是两条位于两行的语句：
:::

```
let y = x + f
(a + b).toString();
```

But the parentheses on the second line of code can be interpreted as a function invocation of f from the first line, and JavaScript interprets the code like this:

::: tip 翻译
但第二行的圆括号可以被解释为第一行`f`的函数调用，所以 JavaScript 将这两行代码解释为：
:::

```js
let y = x + f(a + b).toString();
```

More likely than not, this is not the interpretation intended by the author of the code. In order to work as two separate statements, an explicit semicolon is required in this case.

::: tip 翻译
而这很有可能不是代码作者的真实意图。为了保证代码被解释为两条语句，这里必须要明确添加一个分号。
:::

In general, if a statement begins with `(`, `[`, `/`, `+`, or `-`, there is a chance that it could be interpreted as a continuation of the statement before. Statements beginning with `/`, `+`, and `-` are quite rare in practice, but statements beginning with `(` and `[` are not uncommon at all, at least in some styles of JavaScript programming. Some programmers like to put a defensive semicolon at the beginning of any such statement so that it will continue to work correctly even if the statement before it is modified and a previously terminating semicolon removed:

::: tip 翻译
通常，如果语句以`(`、`[`、`/`、`+`或`-`开头，就有可能被解释为之前语句的一部分。实践中，以`/`、`+`和`-`开头的语句极少，但以`(`和`[`开头的语句则并不鲜见，至少在某种 JavaScript 编程风格下经常会看到。有的程序员喜欢在所有这种语句前面都防御性地添加一个分号，这样即使它前面的语句被修改，删掉了之前末尾的分号，也不会影响当前语句:
:::

```
let x = 0 // 这里省略分号
;[x, x + 1, x + 2].forEach(console.log); // 防御：保证这条语句独立
```

There are three exceptions to the general rule that JavaScript interprets line breaks as semicolons when it cannot parse the second line as a continuation of the statement on the first line. The first exception involves the `return`, `throw`, `yield`, `break`, and `continue` statements (see [Chapter 5](./Chapter-05-Statements.md)). These statements often stand alone, but they are sometimes followed by an identifier or expression. If a line break appears after any of these words (before any other tokens), JavaScript will always interpret that line break as a semicolon. For example, if you write:

::: tip 翻译
JavaScript 在不能把第二行解析为第一行的连续部分时，对换行符的解释有三种例外情况。第一种情况涉及`return`、`throw`、`yield`、`break`和`continue`语句（参见[第 5 章](./Chapter-05-Statements.md)），这些语句经常独立存在，但有时候后面也会跟一个标识符或表达式。如果这几个单词后面（任何其他标记前面）有换行符，JavaScript 就会把这个换行符解释为分号。例如，如果你这么写：
:::

```
return
true;
```

JavaScript assumes you meant:

::: tip 翻译
JavaScript 假设你的意图是：
:::

```js
return;
true;
```

However, you probably meant:

::: tip 翻译
但你的意图可能是：
:::

```js
return true;
```

This means that you must not insert a line break between `return`, `break`, or `continue` and the expression that follows the keyword. If you do insert a line break, your code is likely to fail in a nonobvious way that is difficult to debug.

::: tip 翻译
这意味着，一定不能在`return`、`break`或`continue`等关键字和它们后面的表达式之间加入换行符。如果加入了换行符，那代码出错后的调试会非常麻烦，因为错误不明显。
:::

The second exception involves the `++` and `−−` operators (§4.8). These operators can be prefix operators that appear before an expression or postfix operators that appear after an expression. If you want to use either of these operators as postfix operators, they must appear on the same line as the expression they apply to. The third exception involves functions defined using concise “arrow” syntax: the `=>` arrow itself must appear on the same line as the parameter list.

::: tip 翻译
第二种例外情况涉及`++`和`--`操作符（参见4.8节）。这些操作符既可以放在表达式前面，也可以放在表达式后面。如果想把这两个操作符作为后置操作符，那它们必须与自己操作的表达式位于同一行。第三种例外情况涉及使用简洁的“箭头”语法定义的函数：箭头`=>`必须跟参数列表在同一行。
:::

## 总结

This chapter has shown how JavaScript programs are written at the lowest level. The next chapter takes us one step higher and introduces the primitive types and values (numbers, strings, and so on) that serve as the basic units of computation for JavaScript programs.

::: tip 翻译
本章讲解了在最低层面上应该如何编写JavaScript程序。下一章将上升一个层次，介绍作为JavaScript程序基本计算单位的原始类型和值（数值、字符串，等等）。
:::
