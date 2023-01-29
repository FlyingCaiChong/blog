---
title: "正则表达式"
---

# 正则表达式

> 正则表达式用于匹配指定的字符串. 定义时以/开头,/结尾.

[[TOC]]

## 语法

正则表达式描述了一种字符串匹配的模式, 可以用来检查一个串是否含有某种子串、将匹配的子串替换或者从某个串中取出符合某个条件的子串等.

### 普通字符

#### [ABC]

匹配`[...]`中的所有字符. 示例:

```javascript {2}
let str = "google";
let regex = /[aeiou]/g;
let match = str.match(regex); // ['o','o','e']
```

#### [^ABC]

匹配除了`[...]`中字符的所有字符, 与`[...]`正好相反. 示例:

```javascript {2}
let str = "google";
let regex = /[^aeiou]/g;
let match = str.match(regex); // ['g','g','l']
```

#### [A-Z]

`[A-Z]`表示一个区间, 匹配这个区间的字符, 示例:

```javascript {2,3}
let str = "FreeCodeCamp";
let regex = /[A-Z]/g;
let regex2 = /[a-z]/g;
let match = str.match(regex); // ['F', 'C', 'C']
let match2 = regex2.match(regex2); // ['r', 'e', 'e', 'o', 'd', 'e', 'a', 'm', 'p']
```

#### \s 和\S

`\s` 匹配所有空白符, 包括换行符. 示例:

```javascript {2}
let str = "abc\r$^#%\n!1  23";
let regex = /\s/g;
let match = str.match(regex); // ['\r', '\n', ' ', ' ']
```

`\S` 匹配所有非空白符, 与`\s`正好相反. 示例

```javascript {2}
let str = "abc\r$^#%\n!1  23";
let regex = /\S/g;
let match = str.match(regex); // [ 'a', 'b', 'c', '$', '^', '#', '%', '!', '1', '2', '3' ]
```

#### \w 和\W

`\w` 匹配字母、数字、下划线。等价于`[A-Za-z0-9_]`. 示例

```javascript {2}
let str = "abc\r$^#%\n!1  2__";
let regex = /\w/g;
let match = str.match(regex); // [ 'a', 'b', 'c', '1', '2', '_', '_' ]
```

`\W` 与`\w` 正好相反. 示例

```javascript {2}
let str = "abc\r$^#%\n!1  2__";
let regex = /\W/g;
let match = str.match(regex); // [ '\r', '$', '^', '#', '%', '\n', '!', ' ', ' ' ]
```

#### \d 和\D

`\d` 匹配数字. 示例

```javascript {2}
let str = "abc12%@ a34*jk";
let regex = /\d/g;
let match = str.match(regex); // [ '1', '2', '3', '4' ]
```

`\D` 匹配非数字. 示例

```javascript {2}
let str = "abc12%@ a34*jk";
let regex = /\D/g;
let match = str.match(regex); // [ 'a', 'b', 'c', '%', '@', ' ', 'a', '*', 'j', 'k' ]
```

### 特殊字符

所谓特殊字符，就是一些有特殊含义的字符.

#### $

匹配输入字符串的结尾位置, 示例

```javascript {2}
let theEnding = "This is a never ending story";
let storyRegex = /story$/;
let res1 = storyRegex.test(theEnding); // true
let noEnding = "Sometimes a story will have to end";
let res2 = storyRegex.test(noEnding); // false
```

#### ^

匹配输入字符串的开始位置, 除非在方括号表达式中使用，当该符号在方括号表达式中使用时，表示不接受该方括号表达式中的字符集合. 示例

```javascript {2}
let firstStr = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
let res1 = firstRegex.test(firstStr); // true
let notFirst = "You can't find Ricky now.";
let res2 = firstRegex.test(notFirst); // false
```

#### \*

匹配前面的子表达式零次或多次. 示例:

```javascript {4}
let soccerWord = "gooooooooal!";
let gPhrase = "gut feeling";
let oPhrase = "over the moon";
let goRegex = /go*/g;
let res1 = soccerWord.match(goRegex); // [ 'goooooooo' ]
let res2 = gPhrase.match(goRegex); // [ 'g', 'g' ]
let res3 = oPhrase.match(goRegex); // null
```

#### +

匹配前面的子表达式一次或多次. 示例:

```javascript {2}
let dufficultSpelling = "Mississippi";
let myRegex = /s+/g;
let res = dufficultSpelling.match(myRegex); // [ 'ss', 'ss' ]
```

#### .

匹配除换行符`（\n、\r）`之外的任何单个字符，相等于 `[^\n\r]`。 示例

```javascript {2}
let str = "abc\r$^#%\n!123";
let regex = /./g;
let match = str.match(regex); // [ 'a', 'b', 'c', '$', '^', '#', '%', '!', '1', '2', '3' ]
```

#### ?

1. 匹配前面的子表达式零次或一次. 示例:

```javascript {3}
let american = "color";
let british = "colour";
let rainbowRegex = /colou?r/;
let res1 = rainbowRegex.test(american); // true
let res2 = rainbowRegex.test(british); // true
```

2.惰性匹配

在正则表达式中，贪婪（greedy）匹配会匹配到符合正则表达式匹配模式的字符串的最长可能部分，并将其作为匹配项返回。 另一种方案称为懒惰（lazy）匹配，它会匹配到满足正则表达式的字符串的最小可能部分。

```javascript {2,4}
let str = "titanic";
let regex1 = /t[a-z]*i/;
let res1 = str.match(regex1); // [ 'titani', index: 0, input: 'titanic', groups: undefined ]
let regex2 = /t[a-z]*?i/;
let res2 = str.match(regex2); // [ 'ti', index: 0, input: 'titanic', groups: undefined ]
```

#### |

指明两项之间的一个选择. 匹配多个规则.

```javascript {2}
let petString = "James has a pet cat.";
let petRegex = /dog|cat|bird|fish/;
let res = petRegex.test(petString); // true
```

#### -

连字符, 定义要匹配的字符范围.

```javascript {4}
let catStr = "cat";
let batStr = "bat";
let matStr = "mat";
let bgRegex = /[a-e]at/;
let res1 = catStr.match(bgRegex); // [ 'cat', index: 0, input: 'cat', groups: undefined ]
let res2 = batStr.match(bgRegex); // [ 'bat', index: 0, input: 'bat', groups: undefined ]
let res3 = matStr.match(bgRegex); // null
```

#### []

可以把字符集放在方括号（[ 和 ]）之间来定义一组需要匹配的字符串

```javascript {5}
let bigStr = "big";
let bagStr = "bag";
let bugStr = "bug";
let bogStr = "bog";
let bgRegex = /b[aiu]g/;
let res1 = bigStr.match(bgRegex); // [ 'big', index: 0, input: 'big', groups: undefined ]
let res2 = bagStr.match(bgRegex); // [ 'bag', index: 0, input: 'bag', groups: undefined ]
let res3 = bugStr.match(bgRegex); // [ 'bug', index: 0, input: 'bug', groups: undefined ]
let res4 = bogStr.match(bgRegex); // null
```

#### {}

限定符, 用来指定正则表达式的一个给定组件必须要出现多少次才能满足匹配.

##### {n}

n 是一个非负整数。匹配确定的 n 次。

```javascript {4}
let A4 = "haaaah";
let A3 = "haaah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleHA = /ha{3}h/;
let res1 = multipleHA.test(A4); // false
let res2 = multipleHA.test(A3); // true
let res3 = multipleHA.test(A100); // false
```

##### {n,}

n 是一个非负整数。至少匹配 n 次。

```javascript {4}
let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleHA = /ha{3,}h/;
let res1 = multipleHA.test(A4); // true
let res2 = multipleHA.test(A2); // false
let res3 = multipleHA.test(A100); // true
```

##### {n,m}

m 和 n 均为非负整数，其中 n <= m。最少匹配 n 次且最多匹配 m 次。

```javascript {3}
let A4 = "haaaah";
let A2 = "haah";
let multipleHA = /ha{3,5}h/;
let res1 = multipleHA.test(A4); // true
let res2 = multipleHA.test(A2); // false
```

#### ()

检查字符组.

```javascript {2}
let testStr = "Pumpkin";
let testRegex = /P(engu|umpk)in/;
let res = testRegex.test(testStr); // true
```

## 修饰符(标记)

标记也称为修饰符，正则表达式的标记用于指定额外的匹配策略。
标记不写在正则表达式里，标记位于表达式之外，格式如下：

```
/pattern/flags
```

### g 修饰符

global 全局匹配, 查找所有的匹配项。

```javascript {3}
let str = "Google runoob taobao runoob";
let regex1 = /runoob/;
let regex2 = /runoob/g;
let res1 = str.match(regex1); // [ 'runoob', index: 7, input: 'Google runoob taobao runoob', groups: undefined ]
let res2 = str.match(regex2); // [ 'runoob', 'runoob' ]
```

### i 修饰符

ignore 不区分大小写.

```javascript {3}
let str = "Google runoob taobao RUNoob";
let regex1 = /runoob/g;
let regex2 = /runoob/gi;
let res1 = str.match(regex1); // [ 'runoob' ]
let res2 = str.match(regex2); // [ 'runoob', 'RUNoob' ]
```

### m 修饰符

m 修饰符可以使 ^ 和 $ 匹配一段文本中每行的开始和结束位置。g 只匹配第一行，添加 m 之后实现多行。

```javascript {3}
let str = "runoobgoogle\ntaobao\nrunoobweibo";
let regex1 = /^runoob/g;
let regex2 = /^runoob/gm;
let res1 = str.match(regex1); // [ 'runoob' ]
let res2 = str.match(regex2); // [ 'runoob', 'runoob' ]
```

### s 修饰符

默认情况下的圆点 . 是 匹配除换行符 \n 之外的任何字符，加上 s 之后, . 中包含换行符 \n。

```javascript {3}
let str = "google\nrunoob\ntaobao";
let regex1 = /runoob./;
let regex2 = /runoob./s;
let res1 = str.match(regex1); // null
let res2 = str.match(regex2); // [ 'runoob\n', index: 7, input: 'google\nrunoob\ntaobao', groups: undefined ]
```

## 参考资料

- [正则表达式教程-Runoob](https://www.runoob.com/regexp/regexp-tutorial.html)
- [正则表达式-FreeCodeCamp](https://www.freecodecamp.org/chinese/learn/javascript-algorithms-and-data-structures/regular-expressions/using-the-test-method)
