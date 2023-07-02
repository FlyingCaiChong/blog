# 属性相关

## 计算属性(computed property)

- Stored property 是通过存取得到值
- 计算属性是通过运算得到值, 不会把值存到任何地方.
- 不需要参数的方法都可以变成计算属性, 获得更好的阅读性.
- 每次读取都要重新运算, 不适合放入太繁重、复杂的代码.

```swift
struct Product {
    let originPrice = 100.0
    var discount = 0.8

//    func sellingPrice() -> Double {
//        originPrice * discount
//    }

    var sellingPrice: Double {
        originPrice * discount
    }

    // 完整写法
//   var sellingPrice: Double {
//        get { originPrice * discount }
//    }
}
```

### 计算属性写法

- 必须用 var 声明
- 不可省略类型
- 只要要能够 get
- 如果要让这个属性可以修改, 需要设定 set 方法
- set 预设的参数名是 newValue, 也可以自定义命名

```swift
struct Product {
    let originPrice = 100.0
    var discount = 0.8

    var sellingPrice: Double {
//        set { discount = newValue / originPrice}
        set(price) { discount = price / originPrice }
        get { originPrice * discount }
    }
}
```

## 属性观察(property observers)

```swift
struct Product {
    let originPrice = 100.0
    var discount = 0.8 {
        willSet {
            print("折扣将调整为 \(newValue)")
        }
        didSet {
            print("折扣从 \(oldValue) 调整为 \(discount)")
        }
    }

    var sellingPrice: Double { originPrice * discount }
}
```

- 用来通知值的变化, 就算新的值相同也会触发
- willSet 值即将改变时通知
- didSet 改变发生后通知
- 与存储属性或继承的计算属性搭配使用

### 何时使用属性观察?

- 需要在属性改变前后做一些事情
- 很多地方都可能改变这个属性, 不用在每个地方都写一次前后流程.
- 需要的处理运算过程简单

## Property Wrapper

包装属性中的 set、get、didSet、willSet, 提供更简便的重复使用方法.

eg:

```swift
struct Baggage {
    var handWeight: Int {
        didSet {
            handWeight = min(10, handWeight)
        }
    }

    var consignmentWeight: Int {
        didSet {
            consignmentWeight = min(10, consignmentWeight)
        }
    }

    var golfWeight: Int {
        didSet {
            golfWeight = min(10, golfWeight)
        }
    }

    init(handWeight: Int, consignmentWeight: Int, golfWeight: Int) {
        self.handWeight = min(10, handWeight)
        self.consignmentWeight = min(10, consignmentWeight)
        self.golfWeight = min(20, golfWeight)
    }
}
```

property wrapper:

```swift
@propertyWrapper
struct LimitMax {
    private let max: Int
    var wrappedValue: Int {
        didSet {
            wrappedValue = min(max, wrappedValue)
        }
    }

    init(wrappedValue: Int, max: Int) {
        self.wrappedValue = min(max, wrappedValue)
        self.max = max
    }
}

struct Baggage {
    @LimitMax(max: 10) var handWeight: Int = 0
    @LimitMax(wrappedValue: 0, max: 10) var consignmentWeight: Int
    @LimitMax var golfWeight: Int

    init(handWeight: Int, consignmentWeight: Int, consignmentMax: Int, golfWeight: Int) {
        self.handWeight = handWeight
        self._consignmentWeight = .init(wrappedValue: consignmentWeight, max: consignmentMax)
        self._golfWeight = .init(wrappedValue: golfWeight, max: 30)
    }
}
```

### Property Wrapper 写法

- 创建一个类型, 并标记 `@propertyWrapper`
- 必须有一个名为 `wrappedValue`、至少可以 `get` 的属性
- 可以加上 `projectedValue` 投射任何属性或是本身, 这个属性通过`$`投射出去
- 自定义`init`时候, `wrappedValue`需要放到第一个参数
- 使用`Struct`自动的`init`时,把`wrappedValue`放在最上面

```swift
@propertyWrapper
struct ChangeLog<T> {
    var wrappedValue: T {
        didSet {
            print("\(desc) value changed \(wrappedValue)")
        }
    }

    var projectedValue: Self { self }

    private(set) var desc: String
}

struct Account {
    @ChangeLog(desc: "用途") var purpose: String = ""
    @ChangeLog(desc: "花费") var cost: Int = 0
}

var spend = Account(purpose: "bug macbook", cost: 10000)
print(spend.purpose)
print(spend.cost)
spend.cost = 12000
spend.$cost.desc
```

eg:

```swift
@propertyWrapper
struct Validation {
    private var text: String
    private var defaultValue: String
    var isValid: Bool {
        !text.isEmpty
    }
    var wrappedValue: String {
        get {
            text.isEmpty ? defaultValue : text
        }
        set {
            text = newValue
        }
    }

    var projectedValue: Self {
        self
    }

    init(wrappedValue: String, defaultValue: String) {
        text = wrappedValue
        self.defaultValue = defaultValue
    }
}

struct User {
    @Validation(defaultValue: "未命名使用者") var name: String = ""

    func greeting() {
        print("你好 \(name)")
        if ($name.isValid) {
            print("获得折扣码")
        } else {
            print("请设定姓名获得折扣码")
        }
    }
}

var user = User()
user.greeting()
user.name = "Jane"
user.greeting()
```

### 使用 Property Wrapper

-在需要的属性前面加上 `@Wrapper名称`

### 限制

- 被装饰的属性不能是计算属性
- 被装饰的属性不能是全局属性
- 被装饰的属性不能是`lazy`、`weak`或`unowned`的.
- `Property Wrapper`类型本身和`wrappedValue`、`projectedValue`必须要有同样的`access control level`
