---
title: 第八章 函数
---

# Chapter 8 Functions

This chapter covers JavaScript functions. Functions are a fundamental building block for JavaScript programs and a common feature in almost all programming languages. You may already be familiar with the concept of a function under a name such as _subroutine_ or _procedure_.

A _function_ is a block of JavaScript code that is defined once but may be executed, or _invoked_, any number of times. JavaScript functions are _parameterized_: a function definition may include a list of identifiers, known as _parameters_, that work as local variables for the body of the function. Function invocations provide values, or _arguments_, for the function’s parameters. Functions often use their argument values to compute a _return value_ that becomes the value of the function-invocation expression. In addition to the arguments, each invocation has another value—the _invocation context_—that is the value of the `this` keyword.

If a function is assigned to a property of an object, it is known as a _method_ of that object. When a function is invoked on or _through_ an object, that object is the invocation context or `this` value for the function. Functions designed to initialize a newly created object are called _constructors_. Constructors were described in §6.2 and will be covered again in **Chapter 9**.

In JavaScript, functions are objects, and they can be manipulated by programs. JavaScript can assign functions to variables and pass them to other functions, for example. Since functions are objects, you can set properties on them and even invoke methods on them.

JavaScript function definitions can be nested within other functions, and they have access to any variables that are in scope where they are defined. This means that JavaScript functions are _closures_, and it enables important and powerful programming techniques.

## Defining Functions

The most straightforward way to define a JavaScript function is with the `function` keyword, which can be used as a declaration or as an expression. ES6 defines an important new way to define functions without the `function` keyword: “arrow functions” have a particularly compact syntax and are useful when passing one function as an argument to another function. The subsections that follow cover these three ways of defining functions. Note that some details of function definition syntax involving function parameters are deferred to §8.3.

In object literals and class definitions, there is a convenient shorthand syntax for defining methods. This shorthand syntax was covered in §6.10.5 and is equivalent to using a function definition expression and assigning it to an object property using the basic `name:value` object literal syntax. In another special case, you can use keywords `get` and `set` in object literals to define special property getter and setter methods. This function definition syntax was covered in §6.10.6.

Note that functions can also be defined with the `Function()` constructor, which is the subject of §8.7.7. Also, JavaScript defines some specialized kinds of functions. `function*` defines generator functions (see Chapter 12) and `async function` defines asynchronous functions (see Chapter 13).

### Function Declarations

Function declarations consist of the `function` keyword, followed by these components:

- An identifier that names the function. The name is a required part of function declarations: it is used as the name of a variable, and the newly defined function object is assigned to the variable.
- A pair of parentheses around a comma-separated list of zero or more identifiers. These identifiers are the parameter names for the function, and they behave like local variables within the body of the function.
- A pair of curly braces with zero or more JavaScript statements inside. These statements are the body of the function: they are executed whenever the function is invoked.

Here are some example function declarations:

```js
// Print the name and value of each property of o. Return undefined.
function printProps(o) {
  for (let p in o) {
    console.log(`${p}: ${o[p]}\n`);
  }
}

// Compute the distance between Cartesian points (x1,y1) and (x2,y2).
function distance(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it.
function factorial(x) {
  if (x <= 1) {
    return 1;
  }
  return x * factorial(x - 1);
}
```

One of the important things to understand about function declarations is that the name of the function becomes a variable whose value is the function itself. Function declaration statements are “hoisted” to the top of the enclosing script, function, or block so that functions defined in this way may be invoked from code that appears before the definition. Another way to say this is that all of the functions declared in a block of JavaScript code will be defined throughout that block, and they will be defined before the JavaScript interpreter begins to execute any of the code in that block.

The `distance()` and `factorial()` functions we’ve described are designed to compute a value, and they use `return` to return that value to their caller. The `return` statement causes the function to stop executing and to return the value of its expression (if any) to the caller. If the `return` statement does not have an associated expression, the return value of the function is `undefined`.

The `printProps()` function is different: its job is to output the names and values of an object’s properties. No return value is necessary, and the function does not include a `return` statement. The value of an invocation of the `printProps()` function is always `undefined`. If a function does not contain a return statement, it simply executes each statement in the function body until it reaches the end, and returns the `undefined` value to the caller.

Prior to ES6, function declarations were only allowed at the top level within a JavaScript file or within another function. While some implementations bent the rule, it was not technically legal to define functions inside the body of loops, conditionals, or other blocks. In the strict mode of ES6, however, function declarations are allowed within blocks. A function defined within a block only exists within that block, however, and is not visible outside the block.

### Function Expressions

Function expressions look a lot like function declarations, but they appear within the context of a larger expression or statement, and the name is optional. Here are some example function expressions:

```js
// This function expression defines a function that squares its argument.
// Note that we assign it to a variable
const square = function (x) {
  return x * x;
};

// Function expressions can include names, which is useful for recursion.
const f = function fact(x) {
  if (x <= 1) {
    return 1;
  } else {
    return x * fact(x - 1);
  }
};

// Function expressions can also be used as arguments to other functions:
[3, 2, 1].sort(function (a, b) {
  return a - b;
});

// Function expressions are sometimes defined and immediately invoked:
let tensquared = (function (x) {
  return x * x;
})(10);
```

Note that the function name is optional for functions defined as expressions, and most of the preceding function expressions we’ve shown omit it. A function declaration actually _declares_ a variable and assigns a function object to it. A function expression, on the other hand, does not declare a variable: it is up to you to assign the newly defined function object to a constant or variable if you are going to need to refer to it multiple times. It is a good practice to use `const` with function expressions so you don’t accidentally overwrite your functions by assigning new values.

A name is allowed for functions, like the factorial function, that need to refer to themselves. If a function expression includes a name, the local function scope for that function will include a binding of that name to the function object. In effect, the function name becomes a local variable within the function. Most functions defined as expressions do not need names, which makes their definition more compact (though not nearly as compact as arrow functions, described below).

There is an important difference between defining a function `f()` with a function declaration and assigning a function to the variable `f` after creating it as an expression. When you use the declaration form, the function objects are created before the code that contains them starts to run, and the definitions are hoisted so that you can call these functions from code that appears above the definition statement. This is not true for functions defined as expressions, however: these functions do not exist until the expression that defines them are actually evaluated. Furthermore, in order to invoke a function, you must be able to refer to it, and you can’t refer to a function defined as an expression until it is assigned to a variable, so functions defined with expressions cannot be invoked before they are defined.

### Arrow Functions

In ES6, you can define functions using a particularly compact syntax known as “arrow functions.” This syntax is reminiscent of mathematical notation and uses an `=>` “arrow” to separate the function parameters from the function body. The function keyword is not used, and, since arrow functions are expressions instead of statements, there is no need for a function name, either. The general form of an arrow function is a comma-separated list of parameters in parentheses, followed by the `=>` arrow, followed by the function body in curly braces:

```js
const sum = (x, y) => {
  return x + y;
};
```

But arrow functions support an even more compact syntax. If the body of the function is a single return statement, you can omit the `return` keyword, the semicolon that goes with it, and the curly braces, and write the body of the function as the expression whose value is to be returned:

```js
const sum = (x, y) => x + y;
```

Furthermore, if an arrow function has exactly one parameter, you can omit the parentheses around the parameter list:

```js
const polynomial = (x) => x * x + 2 * x + 3;
```

Note, however, that an arrow function with no arguments at all must be written with an empty pair of parentheses:

```js
const constantFunc = () => 42;
```

Note that, when writing an arrow function, you must not put a new line between the function parameters and the `=>` arrow. Otherwise, you could end up with a line like `const polynomial = x`, which is a syntactically valid assignment statement on its own.

Also, if the body of your arrow function is a single `return` statement but the expression to be returned is an object literal, then you have to put the object literal inside parentheses to avoid syntactic ambiguity between the curly braces of a function body and the curly braces of an object literal:

```js
const f = x => { return { value: x }; }; // God: f() returns an object
const g = x => ({ value: x }); // God: g() returns an object
const h = x => { value: x }; // Bad: h() returns nothing
const i = x => { v: x, w: x }; // Bad: Syntax Error
```

In the third line of this code, the function `h()` is truly ambiguous: the code you intended as an object literal can be parsed as a labeled statement, so a function that returns undefined is created. On the fourth line, however, the more complicated object literal is not a valid statement, and this illegal code causes a syntax error.

The concise syntax of arrow functions makes them ideal when you need to pass one function to another function, which is a common thing to do with array methods like `map()`, `filter()`, and `reduce()` (see §7.8.1), for example:

```js
// Make a copy of an array with null elements removed
let filtered = [1, null, 2, 3].filter((x) => x !== null); // filtered == [1, 2, 3]
// Square some numbers:
let squares = [1, 2, 3, 4].map((x) => x * x); // squares == [1, 4, 9, 16]
```

Arrow functions differ from functions defined in other ways in one critical way: they inherit the value of the `this` keyword from the environment in which they are defined rather than defining their own invocation context as functions defined in other ways do. This is an important and very useful feature of arrow functions, and we’ll return to it again later in this chapter. Arrow functions also differ from other functions in that they do not have a `prototype` property, which means that they cannot be used as constructor functions for new classes (see §9.2).

### Nested Functions

In JavaScript, functions may be nested within other functions. For example:

```js
function hypotenuse(a, b) {
  function square(x) {
    return x * x;
  }
  return Math.sqrt(square(a) + square(b));
}
```

The interesting thing about nested functions is their variable scoping rules: they can access the parameters and variables of the function (or functions) they are nested within. In the code shown here, for example, the inner function `square()` can read and write the parameters a and b defined by the outer function `hypotenuse()`. These scope rules for nested functions are very important, and we will consider them again in §8.6.

## Invoking Functions

The JavaScript code that makes up the body of a function is not executed when the function is defined, but rather when it is invoked. JavaScript functions can be invoked in five ways:

- As functions
- As methods
- As constructors
- Indirectly through their `call()` and `apply()` methods
- Implicitly, via JavaScript language features that do not appear like normal function invocations

### Function Invocation

Functions are invoked as functions or as methods with an invocation expression (§4.5). An invocation expression consists of a function expression that evaluates to a function object followed by an open parenthesis, a comma-separated list of zero or more argument expressions, and a close parenthesis. If the function expression is a property-access expression—if the function is the property of an object or an element of an array—then it is a method invocation expression. That case will be explained in the following example. The following code includes a number of regular function invocation expressions:

```js
printProps({ x: 1 });
let total = distance(0, 0, 2, 1) + distance(2, 1, 3, 5);
let probability = factorial(5) / factorial(13);
```

In an invocation, each argument expression (the ones between the parentheses) is evaluated, and the resulting values become the arguments to the function. These values are assigned to the parameters named in the function definition. In the body of the function, a reference to a parameter evaluates to the corresponding argument value.

For regular function invocation, the return value of the function becomes the value of the invocation expression. If the function returns because the interpreter reaches the end, the `return` value is `undefined`. If the function returns because the interpreter executes a `return` statement, then the `return` value is the value of the expression that follows the `return` or is `undefined` if the return statement has no value.

> **Conditional Invocation**
>
> In ES2020 you can insert `?.` after the function expression and before the open parenthesis in a function invocation in order to invoke the function only if it is not `null` or `undefined`. That is, the expression `f?.(x)` is equivalent (assuming no side effects) to:
>
> ```js
> f !== null && f !== undefined ? f(x) : undefined;
> ```
>
> Full details on this conditional invocation syntax are in §4.5.1.

For function invocation in non-strict mode, the invocation context (the `this` value) is the global object. In strict mode, however, the invocation context is `undefined`. Note that functions defined using the arrow syntax behave differently: they always inherit the `this` value that is in effect where they are defined.

Functions written to be invoked as functions (and not as methods) do not typically use the `this` keyword at all. The keyword can be used, however, to determine whether strict mode is in effect:

```js
// Define and invoke a function to determine if we're in strict mode.
const strict = (function () {
  return !this;
})();
```

> **Recursive Functions and the Stack**
>
> A _recursive_ function is one, like the `factorial()` function at the start of this chapter, that calls itself. Some algorithms, such as those involving tree-based data structures, can be implemented particularly elegantly with recursive functions. When writing a recursive function, however, it is important to think about memory constraints. When a function A calls function B, and then function B calls function C, the JavaScript interpreter needs to keep track of the execution contexts for all three functions. When function C completes, the interpreter needs to know where to resume executing function B, and when function B completes, it needs to know where to resume executing function A. You can imagine these execution contexts as a stack. When a function calls another function, a new execution context is pushed onto the stack. When that function returns, its execution context object is popped off the stack. If a function calls itself recursively 100 times, the stack will have 100 objects pushed onto it, and then have those 100 objects popped off. This call stack takes memory. On modern hardware, it is typically fine to write recursive functions that call themselves hundreds of times. But if a function calls itself ten thousand times, it is likely to fail with an error such as “Maximum call-stack size exceeded.”

### Method Invocation

A _method_ is nothing more than a JavaScript function that is stored in a property of an object. If you have a function `f` and an object `o`, you can define a method named `m` of `o` with the following line:

```js
o.m = f;
```

Having defined the method `m()` of the object o, invoke it like this:

```js
o.m();
```

Or, if `m()` expects two arguments, you might invoke it like this:

```js
o.m(x, y);
```

The code in this example is an invocation expression: it includes a function expression `o.m` and two argument expressions, `x` and `y`. The function expression is itself a property access expression, and this means that the function is invoked as a method rather than as a regular function.

The arguments and return value of a method invocation are handled exactly as described for regular function invocation. Method invocations differ from function invocations in one important way, however: the invocation context. Property access expressions consist of two parts: an object (in this case `o`) and a property name (`m`). In a method-invocation expression like this, the object o becomes the invocation context, and the function body can refer to that object by using the keyword `this`. Here is a concrete example:

```js
let calculator = {
  // An object literal
  operand1: 1,
  operand2: 1,
  add() {
    // We're using method shorthand syntax for this function
    // Note the use of the this keyword to refer to the containing object.
    this.result = this.operand1 + this.operand2;
  },
};
calculator.add(); // A method invocation to compute 1+1.
calculator.result; // => 2
```

Most method invocations use the dot notation for property access, but property access expressions that use square brackets also cause method invocation. The following are both method invocations, for example:

```js
o["m"](x, y); // Another way to write o.m(x, y).
a[0](z); // Also a method invocation (assuming a[0] is a function).
```

Method invocations may also involve more complex property access expressions:

```js
customer.surname.toUpperCase(); // Invoke method an customer.surname
f().m(); // Invoke method m() on return value of f()
```

Methods and the `this` keyword are central to the object-oriented programming paradigm. Any function that is used as a method is effectively passed an implicit argument—the object through which it is invoked. Typically, a method performs some sort of operation on that object, and the method-invocation syntax is an elegant way to express the fact that a function is operating on an object. Compare the following two lines:

```js
rect.setSize(width, height);
setRectSize(rect, width, height);
```

The hypothetical functions invoked in these two lines of code may perform exactly the same operation on the (hypothetical) object `rect`, but the method-invocation syntax in the first line more clearly indicates the idea that it is the object `rect` that is the primary focus of the operation.

> **Method Chaining**
>
> When methods return objects, you can use the return value of one method invocation as part of a subsequent invocation. This results in a series (or “chain”) of method invocations as a single expression. When working with Promise-based asynchronous operations (see **Chapter 13**), for example, it is common to write code structured like this:
>
> ```js
> // Run three asynchronous operations in sequence, handling errors.
> doStepOne().then(doStepTwo).then(doStepThree).catch(handleErrors);
> ```
>
> When you write a method that does not have a return value of its own, consider having the method return `this`. If you do this consistently throughout your API, you will enable a style of programming known as _method chaining_ in which an object can be named once and then multiple methods can be invoked on it:
>
> ```js
> new Square().x(100).y(100).size(50).outline("red").fill("blue").draw();
> ```

Note that `this` is a keyword, not a variable or property name. JavaScript syntax does not allow you to assign a value to `this`.

The `this` keyword is not scoped the way variables are, and, except for arrow functions, nested functions do not inherit the `this` value of the containing function. If a nested function is invoked as a method, its `this` value is the object it was invoked on. If a nested function (that is not an arrow function) is invoked as a function, then its this value will be either the global object (non-strict mode) or `undefined` (strict mode). It is a common mistake to assume that a nested function defined within a method and invoked as a function can use this to obtain the invocation context of the method. The following code demonstrates the problem:

```js
let o = {
  // An object o.
  m: function () {
    // Method m of the object.
    let self = this; // Save the "this" value in a variable.
    this === o; // => true: "this" is the object o.
    f(); // Now call the helper function f()

    function f() {
      // A nested function f.
      this === o; // => false: "this" is global or undefined.
      self === o; // => true: self is the outer "this" value.
    }
  },
};
o.m(); // Invoke the method m on the object o.
```

Inside the nested function `f()`, the `this` keyword is not equal to the object `o`. This is widely considered to be a flaw in the JavaScript language, and it is important to be aware of it. The code above demonstrates one common workaround. Within the method `m`, we assign the `this` value to a variable `self`, and within the nested function `f`, we can use `self` instead of `this` to refer to the containing object.

In ES6 and later, another workaround to this issue is to convert the nested function `f` into an arrow function, which will properly inherit the `this` value:

```js
const f = () => {
  this === o; // true, since arrow functions inherit this
};
```

Functions defined as expressions instead of statements are not hoisted, so in order to make this code work, the function definition for `f` will need to be moved within the method `m` so that it appears before it is invoked.

Another workaround is to invoke the `bind()` method of the nested function to define a new function that is implicitly invoked on a specified object:

```js
const f = function () {
  this === o; // true, since we bound this function to the outer this
}.bind(this);
```

We’ll talk more about `bind()` in §8.7.5.

### Constructor Invocation

If a function or method invocation is preceded by the keyword `new`, then it is a constructor invocation. (Constructor invocations were introduced in §4.6 and §6.2.2, and constructors will be covered in more detail in **Chapter 9**.) Constructor invocations differ from regular function and method invocations in their handling of arguments, invocation context, and return value.

If a constructor invocation includes an argument list in parentheses, those argument expressions are evaluated and passed to the function in the same way they would be for function and method invocations. It is not common practice, but you can omit a pair of empty parentheses in a constructor invocation. The following two lines, for example, are equivalent:

```js
o = new Object();
o = new Object();
```

A constructor invocation creates a new, empty object that inherits from the object specified by the `prototype` property of the constructor. Constructor functions are intended to initialize objects, and this newly created object is used as the invocation context, so the constructor function can refer to it with the `this` keyword. Note that the new object is used as the invocation context even if the constructor invocation looks like a method invocation. That is, in the expression `new o.m()`, o is not used as the invocation context.

Constructor functions do not normally use the `return` keyword. They typically initialize the new object and then return implicitly when they reach the end of their body. In this case, the new object is the value of the constructor invocation expression. If, however, a constructor explicitly uses the `return` statement to return an object, then that object becomes the value of the invocation expression. If the constructor uses return with no value, or if it returns a primitive value, that return value is ignored and the new object is used as the value of the invocation.

### Indirect Invocation

JavaScript functions are objects, and like all JavaScript objects, they have methods. Two of these methods, `call()` and `apply()`, invoke the function indirectly. Both methods allow you to explicitly specify the this value for the invocation, which means you can invoke any function as a method of any object, even if it is not actually a method of that object. Both methods also allow you to specify the arguments for the invocation. The `call()` method uses its own argument list as arguments to the function, and the `apply()` method expects an array of values to be used as arguments. The `call()` and `apply()` methods are described in detail in §8.7.4.

### Implicit Function Invocation

There are various JavaScript language features that do not look like function invocations but that cause functions to be invoked. Be extra careful when writing functions that may be implicitly invoked, because bugs, side effects, and performance issues in these functions are harder to diagnose and fix than in regular functions for the simple reason that it may not be obvious from a simple inspection of your code when they are being called.

The language features that can cause implicit function invocation include:

- If an object has getters or setters defined, then querying or setting the value of its properties may invoke those methods. See §6.10.6 for more information.
- When an object is used in a string context (such as when it is concatenated with a string), its `toString()` method is called. Similarly, when an object is used in a numeric context, its `valueOf()` method is invoked. See §3.9.3 for details.
- When you loop over the elements of an iterable object, there are a number of method calls that occur. **Chapter 12** explains how iterators work at the function call level and demonstrates how to write these methods so that you can define your own iterable types.
- A tagged template literal is a function invocation in disguise. §14.5 demonstrates how to write functions that can be used in conjunction with template literal strings.
- Proxy objects (described in §14.7) have their behavior completely controlled by functions. Just about any operation on one of these objects will cause a function to be invoked.

## Function Arguments and Parameters

JavaScript function definitions do not specify an expected type for the function parameters, and function invocations do not do any type checking on the argument values you pass. In fact, JavaScript function invocations do not even check the number of arguments being passed. The subsections that follow describe what happens when a function is invoked with fewer arguments than declared parameters or with more arguments than declared parameters. They also demonstrate how you can explicitly test the type of function arguments if you need to ensure that a function is not invoked with inappropriate arguments.

### Optional Parameters and Defaults

When a function is invoked with fewer arguments than declared parameters, the additional parameters are set to their default value, which is normally `undefined`. It is often useful to write functions so that some arguments are optional. Following is an example:

```js
// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, a) {
  if (a === undefined) {
    a = []; // If undefined, use a new array
  }
  for (let property in o) {
    a.push(property);
  }
  return a;
}

// getPropertyNames() can be invoked with one or two arguments:
let o = { x: 1 },
  p = { y: 2, z: 3 }; // Two objects for testing
let a = getPropertyNames(o); // a == ['x']; get o's properties in a new array
getPropertyNames(p, a); // a == ['x', 'y', 'z']; add p's properties to it
```

Instead of using an `if` statement in the first line of this function, you can use the `||` operator in this idiomatic way:

```js
a = a || [];
```

Recall from §4.10.2 that the `||` operator returns its first argument if that argument is truthy and otherwise returns its second argument. In this case, if any object is passed as the second argument, the function will use that object. But if the second argument is omitted (or `null` or another falsy value is passed), a newly created empty array will be used instead.

Note that when designing functions with optional arguments, you should be sure to put the optional ones at the end of the argument list so that they can be omitted. The programmer who calls your function cannot omit the first argument and pass the second: they would have to explicitly pass `undefined` as the first argument.

In ES6 and later, you can define a default value for each of your function parameters directly in the parameter list of your function. Simply follow the parameter name with an equals sign and the default value to use when no argument is supplied for that parameter:

```js
// Append the names of the enumerable properties of object o to the
// array a, and return a. If a is omitted, create and return a new array.
function getPropertyNames(o, a = []) {
  for (let property in o) {
    a.push(property);
  }
  return a;
}
```

Parameter default expressions are evaluated when your function is called, not when it is defined, so each time this `getPropertyNames()` function is invoked with one argument, a new empty array is created and passed It is probably easiest to reason about functions if the parameter defaults are constants (or literal expressions like `[]` and `{}`). But this is not required: you can use variables, or function invocations, for example, to compute the default value of a parameter. One interesting case is that, for functions with multiple parameters, you can use the value of a previous parameter to define the default value of the parameters that follow it:

```js
// This function returns an object representing a rectangle's dimensions.
// If only width is supplied, make it twice as high as it is wide.
const rectangle = (width, height = width * 2) => ({ width, height });
rectangle(1); // { width: 1, height: 2}
```

This code demonstrates that parameter defaults work with arrow functions. The same is true for method shorthand functions and all other forms of function definitions.

### Rest Parameters and Variable-Length Argument Lists

Parameter defaults enable us to write functions that can be invoked with fewer arguments than parameters. _Rest parameters_ enable the opposite case: they allow us to write functions that can be invoked with arbitrarily more arguments than parameters. Here is an example function that expects one or more numeric arguments and returns the largest one:

```js
function max(first = -Infinity, ...rest) {
  let maxValue = first; // Start by assuming the first arg is biggest
  // Then loop through the rest of the arguments, looking for bigger
  for (let value of rest) {
    if (value > maxValue) {
      maxValue = value;
    }
  }
  // Return the biggest
  return maxValue;
}

max(1, 10, 100, 2, 3, 1000, 4, 5, 6); // => 1000
```

A rest parameter is preceded by three periods, and it must be the last parameter in a function declaration. When you invoke a function with a rest parameter, the arguments you pass are first assigned to the non-rest parameters, and then any remaining arguments (i.e., the “rest” of the arguments) are stored in an array that becomes the value of the rest parameter. This last point is important: within the body of a function, the value of a rest parameter will always be an array. The array may be empty, but a rest parameter will never be `undefined`. (It follows from this that it is never useful—and not legal—to define a parameter default for a rest parameter.)

Functions like the previous example that can accept any number of arguments are called _variadic functions_, _variable arity functions_, or _vararg functions_. This book uses the most colloquial term, varargs, which dates to the early days of the C programming language.

Don’t confuse the `...` that defines a rest parameter in a function definition with the `...` spread operator, described in §8.3.4, which can be used in function invocations.

### The Arguments Object

Rest parameters were introduced into JavaScript in ES6. Before that version of the language, varargs functions were written using the Arguments object: within the body of any function, the identifier `arguments` refers to the Arguments object for that invocation. The Arguments object is an array-like object (see §7.9) that allows the argument values passed to the function to be retrieved by number, rather than by name. Here is the `max()` function from earlier, rewritten to use the Arguments object instead of a rest parameter:

```js
function max(x) {
  let maxValue = -Infinity;
  // Loop through the arguments, looking for, and remembering, the biggest.
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > maxValue) {
      maxValue = arguments[i];
    }
  }
  // Return the biggest
  return maxValue;
}

max(1, 10, 100, 2, 3, 1000, 4, 5, 6); // => 1000
```

The Arguments object dates back to the earliest days of JavaScript and carries with it some strange historical baggage that makes it inefficient and hard to optimize, especially outside of strict mode. You may still encounter code that uses the Arguments object, but you should avoid using it in any new code you write. When refactoring old code, if you encounter a function that uses `arguments`, you can often replace it with a `...args` rest parameter. Part of the unfortunate legacy of the Arguments object is that, in strict mode, `arguments` is treated as a reserved word, and you cannot declare a function parameter or a local variable with that name.

### The Spread Operator for Function Calls

The spread operator `...` is used to unpack, or “spread out,” the elements of an array (or any other iterable object, such as strings) in a context where individual values are expected. We’ve seen the spread operator used with array literals in §7.1.2. The operator can be used, in the same way, in function invocations:

```js
let numbers = [5, 2, 10, -1, 9, 100, 1];
Math.min(...numbers); // => -1
```

Note that `...` is not a true operator in the sense that it cannot be evaluated to produce a value. Instead, it is a special JavaScript syntax that can be used in array literals and function invocations.

When we use the same `...` syntax in a function definition rather than a function invocation, it has the opposite effect to the spread operator. As we saw in §8.3.2, using `...` in a function definition gathers multiple function arguments into an array. Rest parameters and the spread operator are often useful together, as in the following function, which takes a function argument and returns an instrumented version of the function for testing:

```js
// This function takes a function and returns a wrapped version
function timed(f) {
  return function (...args) {
    // Collect args into a rest parameter array
    console.log(`Entering function ${f.name}`);
    let startTime = Date.now();
    try {
      // Pass all of our arguments to the wrapped function
      return f(...args);
    } finally {
      // Before we return the wrapped return value, print elapsed time.
      console.log(`Exiting ${f.name} after ${Date.now() - startTime} ms`);
    }
  };
}

// Compute the sum of the numbers between 1 and n by brute force
function benchmark(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Now invoke the timed version of that test function
timed(benchmark)(1000000); // => 500000500000; this is the sum of the numbers
```

### Destructuring Function Arguments into Parameters

When you invoke a function with a list of argument values, those values end up being assigned to the parameters declared in the function definition. This initial phase of function invocation is a lot like variable assignment. So it should not be surprising that we can use the techniques of destructuring assignment (see §3.10.3) with functions.

If you define a function that has parameter names within square brackets, you are telling the function to expect an array value to be passed for each pair of square brackets. As part of the invocation process, the array arguments will be unpacked into the individually named parameters. As an example, suppose we are representing 2D vectors as arrays of two numbers, where the first element is the X coordinate and the second element is the Y coordinate. With this simple data structure, we could write the following function to add two vectors:

```js
function vectorAdd(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}
vectorAdd([1, 2], [3, 4]); // => [4,6]
```

The code would be easier to understand if we destructured the two vector arguments into more clearly named parameters:

```js
function vectorAdd([x1, y1], [x2, y2]) {
  // Unpack 2 arguments into 4 parameters
  return [x1 + x2, y1 + y2];
}
vectorAdd([1, 2], [3, 4]); // => [4,6]
```

Similarly, if you are defining a function that expects an object argument, you can destructure parameters of that object. Let’s use a vector example again, except this time, let’s suppose that we represent vectors as objects with x and y parameters:

```js
// Multiply the vector {x,y} by a scalar value
function vectorMultiply({ x, y }, scalar) {
  return { x: x * scalar, y: y * scalar };
}
vectorMultiply({ x: 1, y: 2 }, 2); // => {x: 2, y: 4}
```

This example of destructuring a single object argument into two parameters is a fairly clear one because the parameter names we use match the property names of the incoming object. The syntax is more verbose and more confusing when you need to destructure properties with one name into parameters with different names. Here’s the vector addition example, implemented for object-based vectors:

```js
function vectorAdd(
  { x: x1, y: y1 }, // Unpack 1st object into x1 and y1 params
  { x: x2, y: y2 } // Unpack 2nd object into x2 and y2 params
) {
  return { x: x1 + x2, y: y1 + y2 };
}
vectorAdd({ x: 1, y: 2 }, { x: 3, y: 4 }); // => {x: 4, y: 6}
```

The tricky thing about destructuring syntax like `{x:x1, y:y1}` is remembering which are the property names and which are the parameter names. The rule to keep in mind for destructuring assignment and destructuring function calls is that the variables or parameters being declared go in the spots where you’d expect values to go in an object literal. So property names are always on the lefthand side of the colon, and the parameter (or variable) names are on the right.

You can define parameter defaults with destructured parameters. Here’s vector multiplication that works with 2D or 3D vectors:

```js
// Multiply the vector {x,y} or {x,y,z} by a scalar value
function vectorMultiply({ x, y, z = 0 }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar };
}
vectorMultiply({ x: 1, y: 2 }, 2); // => {x: 2, y: 4, z: 0}
```

Some languages (like Python) allow the caller of a function to invoke a function with arguments specified in `name=value` form, which is convenient when there are many optional arguments or when the parameter list is long enough that it is hard to remember the correct order. JavaScript does not allow this directly, but you can approximate it by destructuring an object argument into your function parameters. Consider a function that copies a specified number of elements from one array into another array with optionally specified starting offsets for each array. Since there are five possible parameters, some of which have defaults, and it would be hard for a caller to remember which order to pass the arguments in, we can define and invoke the `arraycopy()` function like this:

```js
function arraycopy({
  from,
  to = from,
  n = from.length,
  fromIndex = 0,
  toIndex = 0,
}) {
  let valuesToCopy = from.slice(fromIndex, fromIndex + n);
  to.splice(toIndex, 0, ...valuesToCopy);
  return to;
}
let a = [1, 2, 3, 4, 5],
  b = [9, 8, 7, 6, 5];
arraycopy({ from: a, n: 3, to: b, toIndex: 4 }); // => [9,8,7,6,1,2,3,5]
```

When you destructure an array, you can define a rest parameter for extra values within the array that is being unpacked. That rest parameter within the square brackets is completely different than the true rest parameter for the function:

```js
// This function expects an array argument. The first two elements of that
// array are unpacked into the x and y parameters. Any remaining elements
// are stored in the coords array. And any arguments after the first array
// are packed into the rest array.
function f([x, y, ...coords], ...rest) {
  return [x + y, ...rest, ...coords]; // Note: spread operator here
}
f([1, 2, 3, 4], 5, 6); // => [3, 5, 6, 3, 4]
```

In ES2018, you can also use a rest parameter when you destructure an object. The value of that rest parameter will be an object that has any properties that did not get destructured. Object rest parameters are often useful with the object spread operator, which is also a new feature of ES2018:

```js
// Multiply the vector {x,y} or {x,y,z} by a scalar value, retain other props
function vectorMultiply({ x, y, z = 0, ...props }, scalar) {
  return { x: x * scalar, y: y * scalar, z: z * scalar, ...props };
}
vectorMultiply({ x: 1, y: 2, w: -1 }, 2); // => {x: 2, y: 4, z: 0, w: -1}
```

Finally, keep in mind that, in addition to destructuring argument objects and arrays, you can also destructure arrays of objects, objects that have array properties, and objects that have object properties, to essentially any depth. Consider graphics code that represents circles as objects with `x`, `y`, `radius`, and `color` properties, where the `color` property is an array of red, green, and blue color components. You might define a function that expects a single circle object to be passed to it but destructures that circle object into six separate parameters:

```js
function drawCircle({ x, y, radius, color: [r, g, b] }) {
  // Not yet implemented
}
```

If function argument destructuring is any more complicated than this, I find that the code becomes harder to read, rather than simpler. Sometimes, it is clearer to be explicit about your object property access and array indexing.

### Argument Types

JavaScript method parameters have no declared types, and no type checking is performed on the values you pass to a function. You can help make your code self documenting by choosing descriptive names for function arguments and by documenting them carefully in the comments for each function. (Alternatively, see §17.8 for a language extension that allows you to layer type checking on top of regular JavaScript.)

As described in §3.9, JavaScript performs liberal type conversion as needed. So if you write a function that expects a string argument and then call that function with a value of some other type, the value you passed will simply be converted to a string when the function tries to use it as a string. All primitive types can be converted to strings, and all objects have `toString()` methods (if not necessarily useful ones), so an error never occurs in this case.

This is not always true, however. Consider again the `arraycopy()` method shown earlier. It expects one or two array arguments and will fail if these arguments are of the wrong type. Unless you are writing a private function that will only be called from nearby parts of your code, it may be worth adding code to check the types of arguments like this. It is better for a function to fail immediately and predictably when passed bad values than to begin executing and fail later with an error message that is likely to be unclear. Here is an example function that performs type-checking:

```js
// Return the sum of the elements an iterable object a.
// The elements of a must all be numbers.
function sum(a) {
  let total = 0;
  for (let element of a) {
    // Throws TypeError if a is not iterable
    if (typeof element !== "number") {
      throw new TypeError("sum(): elements must be numbers");
    }
    total += element;
  }
  return total;
}
sum([1, 2, 3]); // => 6
sum(1, 2, 3); // !TypeError: 1 is not iterable
sum([1, 2, "3"]); // !TypeError: element 2 is not a number
```

## Functions as Values

The most important features of functions are that they can be defined and invoked. Function definition and invocation are syntactic features of JavaScript and of most other programming languages. In JavaScript, however, functions are not only syntax but also values, which means they can be assigned to variables, stored in the properties of objects or the elements of arrays, passed as arguments to functions, and so on.

To understand how functions can be JavaScript data as well as JavaScript syntax, consider this function definition:

```js
function square(x) {
  return x * x;
}
```

This definition creates a new function object and assigns it to the variable square. The name of a function is really immaterial; it is simply the name of a variable that refers to the function object. The function can be assigned to another variable and still work the same way:

```js
let s = square; // Now s refers to the same function that square does
square(4); // => 16
s(4); // => 16
```

Functions can also be assigned to object properties rather than variables. As we’ve already discussed, we call the functions “methods” when we do this:

```js
let o = {
  square: function (x) {
    return x * x;
  },
}; // An object literal
let y = o.square(16); // y == 256
```

Functions don’t even require names at all, as when they’re assigned to array elements:

```js
let a = [(x) => x * x, 20]; // An array literal
a[0](a[1]); // => 400
```

The syntax of this last example looks strange, but it is still a legal function invocation expression!

As an example of how useful it is to treat functions as values, consider the `Array.sort()` method. This method sorts the elements of an array. Because there are many possible orders to sort by (numerical order, alphabetical order, date order, ascending, descending, and so on), the `sort()` method optionally takes a function as an argument to tell it how to perform the sort. This function has a simple job: for any two values it is passed, it returns a value that specifies which element would come first in a sorted array. This function argument makes `Array.sort()` perfectly general and infinitely flexible; it can sort any type of data into any conceivable order. Examples are shown in §7.8.6.

Example 8-1 demonstrates the kinds of things that can be done when functions are used as values. This example may be a little tricky, but the comments explain what is going on.

_Example 8-1. Using functions as data_

```js
// We define some simple functions here
function add(x, y) {
  return x + y;
}
function subtract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}
// Here's a function that takes one of the preceding functions
// as an argument and invokes it on two operands
function operate(operator, operand1, operand2) {
  return operator(operand1, operand2);
}

// We could invoke this function like this to compute the value (2+3) + (4*5):
let i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5));
// For the sake of the example, we implement the simple functions again,
// this time within an object literal;
const operators = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
  pow: Math.pow, // This works for predefined functions too
};
// This function takes the name of an operator, looks up that operator
// in the object, and then invokes it on the supplied operands. Note
// the syntax used to invoke the operator function.
function operate2(operation, operand1, operand2) {
  if (typeof operators[operation] === "function") {
    return operators[operation](operand1, operand2);
  } else throw "unknown operator";
}
operate2("add", "hello", operate2("add", " ", "world")); // => "hello world"
operate2("pow", 10, 2); // => 100
```
