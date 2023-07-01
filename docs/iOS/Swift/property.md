# 计算属性 和 属性观察

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
