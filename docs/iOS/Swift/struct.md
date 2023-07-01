# Struct 结构体

## 介绍

1. 值类型(Value Type)
2. Struct 有静态空间和实例空间
3. 在这些空间里可以创建属性和 function(方法), 如果是静态的空间, 则通过类型来存取. 如果是实例空间, 则通过实例来存取
4. 可以 conforms to Protocol

## 创建 Struct

```swift
struct Person {
  var name: String
  var age = 0
  let sex: String

  func eat() {
    print("\(name) 吃东西")
  }

  mutating func changeName(to newName: String) {
    name = newName
  }
}
```

- 通过关键字 struct 声明
- 惯用大驼峰命名
- 在后方大括号内的区域定义
- 属性不需要先赋值
- 用 let 声明的属性创建后不能修改
- 如果要在方法内修改属性, 需要在 func 前面添加关键字 mutating 标记.

## 静态属性和方法

```swift
struct Person {
  static population: Int = 1000

  static func printPopulation() {
    print("人口数: \(population)")
  }
}
```

- 静态属性和方法, 使用 static 关键字
- 静态不需要实例, 它属于类型本身, 也就是程序一启动就存在了.

## 类型里的 Self 和 self

```swift
static func printPopulation() {
  // 静态方法里 Self 和 self 都是表示类型Person
  print("人口数: \(self.population)")
}

func eat() {
  // 实例方法内 self 表示 Person() 实例, Self 表示 Person类型
  print("\(self.name) 吃东西")
}
```

- self 表示自己, 通常会省略
- Self 表示自己的类型

## 预设初始化方式

- Struct 会自动根据预设的属性创建初始化方式, 用属性名作为参数名.
- 可以省略已经有预设值的属性

## 自定义初始化方式

```swift
struct Person {
  var name: String
  var age = 0
  let sex: String

  init(_ name: String, sex: String) {
    self.name = name
    self.sex = sex
  }
}
```

- 可以通过 init 关键字自定义初始化方式.
- 必须在 init 的 block 之中, 给所有没有预设值、不是 Optional 的属性赋值.
- init 是 mutating 的.
- 自定义 init 后, 就不会保留自动产生的初始化方法

## 私有属性

```swift
struct Person {
  var name: String
  private var age = 0
  let sex: String
}
```

- private 关键字声明为私有属性, 这个属性就不能在外部存取.
- private 属性 无法产生预设初始化方法, 需要自己写 init,或者设定固定的预设值.

```swift
private(set) var age = 0;
```

- 属性可以被 get(读取) 和 set(写入)
- private(set) 表示 设定写入的部分私有, 让外部依然能够读取, 但不能修改.

## conforms to Protocol

```swift
struct Person: Hashable {
  func hash(into hasher: inout Hasher) {

  }
}
```

- 在结构体类型名称后面加冒号 和 Protocol
- 用逗号区分多个 Protocol
- 需要在 struct 的定义中加入实现协议的方法或属性.

## 示例

```swift
struct Human: Equatable {

    static var population = 0

    var name = "Jane"
    private(set) var age = 0
    var height = 50

    init(_ name: String) {
        self.name = name
        Self.population += 1
    }

    init(_ name: String, age: Int, height: Int) {
        self.name = name
        self.age = age
        self.height = height
    }

    mutating func celebrateBirthday() {
        age += 1
        print("\(name) \(age) 生日快乐~~")
        if (age < 20) {
            height += (0...5).randomElement()!
        }
    }

    mutating func rebirth() {
        self = Human(name)
    }


    static func ==(lhs: Self, rhs: Self) -> Bool {
        lhs.name == rhs.name
    }
}
print("人口数 \(Human.population)")
var person = Human("Jane")
print("人口数 \(Human.population)")
person.rebirth()
print("人口数 \(Human.population)")
var person2 = Human("Cindy", age: 14, height: 80)
person == person2
person2.name = "Jane"
person == person2
person2.celebrateBirthday()
print(person2)
print(person.age)
person2.rebirth()
print(person2)
```
