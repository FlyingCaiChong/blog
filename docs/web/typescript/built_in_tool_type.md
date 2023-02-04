---
title: "内置工具类型"
---

# 内置工具类型

## `Partial<T>`

:::tip 作用
将一个类型的属性 全部变为可选属性
:::

定义:

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

该 `Type` 使用时需要传入一个泛型 `T`, 内部遍历 `T` 的所有属性, 然后创建一个新的 `Type`, 新的 `Type` 的所有属性使用 `?` 标识, 使之为可选.

`keyof` 会遍历一个 `Interface` 的所有属性名称(`key`), 生成一个联合类型.

示例:

```typescript
interface A {
  x: number;
  y: number;
}
// Partial<A>: { x?: number; y?: number }
const a: Partial<A> = {
  x: 1,
};
```

## `Required<T>`

:::tip 作用
将一个类型的属性 全部变为必选属性
:::

定义:

```typescript
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

该 `Type` 和 `Partial` 刚好相反, 使用时需要传入一个泛型 `T`, 内部使用 `-?` 将 `T` 的每个属性去除可选标识, 使之为必选.

示例:

```typescript
interface A {
  x?: number;
  y: number;
}
// Required<A>: { x: number; y: number }
const a: Required<A> = {
  x: 1,
  y: 1,
};
```

## `Readonly<T>`

:::tip 作用
将一个类型的属性 全部变为只读属性
:::

定义:

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

该 `Type` 使用时需要传入一个泛型 `T`, 内部使用 `readonly` 将 `T` 的每个属性去除可选标识, 使之为只读.

示例:

```typescript
interface A {
  x?: number;
  y: number;
}
// ReadOnly<A>: { readonly x: number; readonly y: number }
const a: ReadOnly<A> = {
  x: 1,
  y: 1,
};
a.x = 2; // error
```

## `Record<K, T>`

:::tip 作用
使用给定的对象属性名类型和对象属性类型创建一个新的对象类型
:::

定义:

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

示例:

```typescript
type K = "x" | "y";
type T = number;
type R = Record<K, T>; // {x: number, y: number}
const a: R = { x: 1, y: 1 };
```

## `Pick<T, K>`

:::tip 作用
从一个`Type`中选取一些属性, 来构造一个新的对象`Type`
:::

定义:

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

类型参数`T`表示源对象类型，类型参数`K`提供了待选取的属性名类型，它必须为对象类型`T`中存在的属性

示例

```typescript
interface A {
  x: number;
  y: number;
}
type T0 = Pick<A, "x">; // { x: number }
type T1 = Pick<A, "y">; // { y: number }
```

## `Omit<T, K>`

:::tip 作用
从一个对象类型中删除一些属性来构造一个新的对象`Type`
:::

定义

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

和`Pick`刚刚相反, 用于排除不需要的属性. 类型参数`T`表示源对象类型，类型参数`K`提供了待剔除的属性名类型，但它可以为对象类型`T`中不存在的属性.

示例

```typescript
interface A {
  x: number;
  y: number;
}
type T0 = Omit<A, "x">; // { y: number }
type T1 = Omit<A, "y">; // { x: number }
type T2 = Omit<A, "z">; // { x: number; y: number }
```

## `Exclude<T, U>`

:::tip 作用
排除一个联合类型中的某一些类型, 来构造一个新的`Type`
:::

定义

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

示例

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

## `Extract<T, U>`

:::tip 作用
提取出一些联合类型中的某一些类型, 来构造一个新的`Type`
:::

定义

```typescript
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

和`Exclude`正好相反.

示例

```typescript
type T0 = Extract<"a" | "b" | "c", "a">; // 'a'
```

## `NonNullable<T>`

:::tip 作用
从类型中排除 `null` 和 `undefined` , 来构造一个新的`Type`
:::

定义

```typescript
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;
```

示例

```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
```

## `Parameters<T>`

:::tip 作用
从`[函数Type]`的形参中, 构造一个数组`Type`
:::

定义

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

`infer` 标识一个待推导类型, 上面定义的意思是: 如果 `T` 为函数类型, 那就返回函数的形参;

`infer` 和变量似的，先定义一个 `infer P` 然后 `Ts` 就会自动推导函数的形参或者返回值、或者数组元素等，然后开发者在合适的位置使用定义好的`infer P`即可。

`infer`案例:
需求: 需要将数组类型的 `Type` 变为联合类型。其他类型的则不变.

```typescript
type ArrayToUnion<T> = T extends Array<infer Item> ? Item : T;
const a: ArrayToUnion<[string, number]> = "111"; // a: string|number
```

示例 1:

```typescript
type T0 = Parameters<() => string>; // []
type T1 = Parameters<(s: string) => void>; // [string]
```

示例 2:

```typescript
function getUserInfo(id: string, group: string) {}
type GetUserInfoArg = Parameters<typeof getUserInfo>;
const arg: GetUserInfoArg = ["001", "002"];
getUserInfo(...arg);
```

上面代码中的`typeof`是 `ts` 提供的操作符不是 `js` 中的那个`typeof`，只能用到 `ts` 的类型定义中, 所以使用`typeof getUserInfo`才能指向函数`Type`.

## `ConstructorParameters<T>`

:::tip 作用
从定义的[构造函数]的形参中, 构造一个数组`Type`
:::

定义

```typescript
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;
```

实现原理完全和 `Parameters` 一样，只不过这个方法接受的是一个类。

示例

```typescript
class User {
  constructor(id: string, group: string) {}
}
type NewUserArg = ConstructorParameters<typeof User>;
const arg: NewUserArg = ["001", "002"];
new User(...arg);
```

## `ReturnType<T>`

:::tip 作用
用函数`Type`的返回值定义一个新的`Type`
:::

定义

```typescript
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

示例

```typescript
type GetUserInfo = () => string;
const rt: ReturnType<GetUserInfo> = "kobe"; // string
```

## `InstanceType<T>`

:::tip 作用
从一个构造函数的实例定义一个新的`Type`
:::

定义

```typescript
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any;
```

示例:

```typescript
class C {
  x = 0;
}

type T0 = InstanceType<typeof C>; // C
```

## `ThisParameterType<T>`

:::tip 作用
提取函数`Type`的 `this` 参数, 生成一个新的`Type`, 若函数类型中没有定义`this`参数, 则返回`unknown`类型.
:::

定义

```typescript
/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;
```

示例

```typescript
function getUserInfo(this: { name: string }) {}
const getUserInfoArgThis: ThisParameterType<typeof getUserInfo> = {
  name: "zhang",
};
```

## `OmitThisParameter<T>`

:::tip 作用
忽略函数`Type` 的`this`参数, 生成一个新的函数`Type`
:::

定义

```typescript
/**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
```

示例

```typescript
function getUserInfo(this: { name: string }, id: string) {}
const a: OmitThisParameter<typeof getUserInfo> = (id: string) => {};
```

## `ThisType<T>`

:::tip 作用
给对象标记 this 接口
:::

定义

```typescript
/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
```

示例

```typescript
let obj: ThisType<{ x: number }> & { getX: () => number };
obj = {
  getX() {
    return this.x;
  },
};
```

## `Uppercase<T>`

:::tip 作用
将字符串中的每个字符转换为大写字符
:::

定义

```typescript
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;
```

示例

```typescript
type Text = "Hello, World";
type A = Uppercase<Text>; // "HELLO, WORLD"
```

## `Lowercase<T>`

:::tip 作用
将字符串中的每个字符转换为小写字符
:::

定义

```typescript
/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;
```

示例

```typescript
type Text = "Hello, World";
type A = Lowercase<Text>; // "hello, world"
```

## `Capitalize<T>`

:::tip 作用
将字符串中的第一个字符转换为大写字符
:::

定义

```typescript
/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;
```

示例

```typescript
type Text = "hello, world";
type A = Capitalize<Text>; // "Hello, world"
```

## `Uncapitalize<T>`

:::tip 作用
将字符串中的第一个字符转换为小写字符
:::

定义

```typescript
/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
```

示例

```typescript
type Text = "Hello, world";
type A = Uncapitalize<Text>; // "hello world"
```

---

typescript 内置工具类型的定义参见[类型定义](https://github.com/microsoft/TypeScript/blob/main/lib/lib.es5.d.ts)
