# 可选值

表示 包装值 或 `nil`(没有值) 的类型

## 定义

```swift
@frozen enum Optional<Wrapped> : ExpressibleByNilLiteral {
  // The absence of a value
  case none
  // The presence of a value
  case some(Wrapped)

  // ...more code
}
```

Optional 其实是 Enum, 有 2 个 case, 一个有关联值, 另一个为.none.

如果定义一个 Int 类型的可选值变量, 可以在 Int 后加?来表示:

```swift
var x: Int? = 10
```

解读: 创建了一个枚举类型是`Optinal<Int>`, 关联值 10, 状态是`.some(10)`.

## Optionals are Enum

像枚举一样使用

1. 赋值

```swift
var z: Int? = .some(20)
```

2. 使用 switch

```swift
let x: String? = "Hello Optional"
switch x {
  case .some(let value): print("Value: \(value)")
  case .none: print("nothing stored inside the enum")
}
```

3. 使用 `case let` 访问 `Optionals`的值

```swift
if case let .some(value) = x {
  pring(value)
}
```

## Optional Binding

使用可选绑定来访问.some 包裹的值

```swift
if let x = x {
  print(x)
}
```

也可以使用`guard`条件语句:

```swift
func foo(x: Int?) {
  guard let x = x else {
    return
  }

  print(x)
}
```

上面 guard 语句, 当 x 为 nil 时, 程序进入 else 语句内 return 掉. 如果不是 nil, 则后面的语句使用的 x 就是解包的值.

guard 与 if 的区别是:

- if 语句可选绑定后, 解包的 x 的作用范围在 if 语句内. 离开 if 语句后, 还是可选值.
- guard 语句可选绑定后, 解包的 x 的作用范围 guard 语句之后.

## Optional Chaining

假设有结构体 A 和 B, A 有一个可选值, 存储的属性类型是 B

```swift
struct A {
  let b: B?
}
struct B {
  let x: Int = 100
}
```

现在有一个 A 的实例可选值, 取 x 的值, 如果使用可选绑定的方式:

```swift
let a : A? = A(b: B())
if let a = a {
  if let b = a.b {
    print(b.x)
  }
}
```

使用可选链的方式:

```swift
let value = a?.b?.x
```

## Nil Coalescing Operator ( c ?? d)

如果可选值 c 不是 nil, 就取 c 的值, 如果是 nil, 则取 d 的值.

```swift
let c : Int? = 10
let d : Int = 0
let e = c ?? d
```

## Force Unwrapping

在可选值后面使用`!`, 对可选值强制解包. 如果可选值是 nil 的话, 会 crash.

```swift
let optional : Int? = 10
let valueOfOptional = optional!
```

## Implicitly Unwrapped Optionals

```swift
let implicitlyOptional : Int! = 10
print(implicitlyOptional)
```

## Double-, Tripple-, Quadrupel-Optional

可选值可以嵌套使用.

```swift
var innerOptional : Int? = 10
var outerOptional : Int?? = innerOptional
if let innerOptional = outerOptional, value = innerOptional {
  print(value)
}
```

## Map 和 Flatmap

Map 和 Flatmap 在执行闭包里面, 可以处理解包后的可选值, 返回结果是可选值类型.
不同点是: Map 的返回值不能是 nil

```swift
var x : Int? = 10
let y : Int? = x.map {
  if $0 < 10 {
    return 0 // Cannot return nil
  } else { return $0 }
}
let z : Int? = x.flatMap {
  if $0 < 10 {
    return nil
  } else { return $0 }
}
```
