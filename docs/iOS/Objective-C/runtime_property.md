# 声明的属性

当编译器遇到属性声明(参见 [Objective-C 编程语言](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Introduction/introObjectiveC.html#//apple_ref/doc/uid/TP30001163)中的[声明属性](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjectiveC/Chapters/ocProperties.html#//apple_ref/doc/uid/TP30001163-CH17))时，它会生成与外层类、类别或协议相关联的描述性元数据。您可以使用支持按类或协议上的名称查找属性、以 `@encode` 字符串的形式获取属性类型以及以 `C` 字符串数组的形式复制属性的属性列表的函数来访问该元数据。每个类和协议都有一个声明的属性列表。

## 属性类型和函数

`Property` 结构定义了属性描述符的不透明句柄。

```objc
typedef struct objc_property *Property;
```

你可以使用函数 `class_copyPropertyList` 和 `protocol_copyPropertyList` 来分别检索与类(包括已加载的类别)和协议相关的属性数组:

```objc
objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount)
objc_property_t *protocol_copyPropertyList(Protocol *proto, unsigned int *outCount)
```

例如，给定以下类声明:

```objc
@interface Lender : NSObject {
    float alone;
}
@property float alone;
@end
```

您可以使用以下方法获取属性列表:

```objc
id LenderClass = objc_getClass("Lender");
unsigned int outCount;
objc_property_t *properties = class_copyPropertyList(LenderClass, &outCount);
```

你可以使用 `property_getName` 函数来发现一个属性的名称:

```objc
const char *property_getName(objc_property_t property)
```

你可以使用函数 `class_getProperty` 和 `protocol_getProperty` 分别在类和协议中获得一个给定名称的属性的引用:

```objc
objc_property_t class_getProperty(Class cls, const char *name)
objc_property_t protocol_getProperty(Protocol *proto, const char *name, BOOL isRequiredProperty, BOOL isInstanceProperty)
```

您可以使用 `property_getAttributes` 函数来发现属性的名称和 `@encode` 类型字符串。有关编码类型字符串的详细信息，请参阅[类型编码](./runtime_encoding.md);有关该字符串的详细信息，请参见[属性类型字符串](#属性类型字符串)和[属性属性描述示例](#属性属性描述示例)。

```objc
const char *property_getAttributes(objc_property_t property)
```

把这些放在一起，您可以使用以下代码打印与一个类相关的所有属性的列表:

```objc
id LenderClass = objc_getClass("Lender");
unsigned int outCount, i;
objc_property_t *properties = class_copyPropertyList(LenderClass, &outCount);
for (i = 0; i < outCount; i++) {
    objc_property_t property = properties[i];
    fprintf(stdout, "%s %s\n", property_getName(property), property_getAttributes(property));
}

```

## 属性类型字符串

您可以使用 `property_getAttributes` 函数来发现属性的名称、`@encode` 类型字符串以及该属性的其他属性。

该字符串以 `T` 开头，后面跟着 `@encode` 类型和逗号，以 `V` 结尾，后面跟着后台实例变量的名称。在这两者之间，属性由以下描述符指定，以逗号分隔:

声明的属性类型编码

| Code          | Meaning                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------- |
| R             | The property is read-only (readonly).                                                                      |
| C             | The property is a copy of the value last assigned (copy).                                                  |
| &             | The property is a reference to the value last assigned (retain).                                           |
| N             | The property is non-atomic (nonatomic).                                                                    |
| G\<name\>     | The property defines a custom getter selector name. The name follows the G (for example, GcustomGetter,).  |
| S\<name\>     | The property defines a custom setter selector name. The name follows the S (for example, ScustomSetter:,). |
| D             | The property is dynamic (@dynamic).                                                                        |
| W             | The property is a weak reference (\_\_weak).                                                               |
| P             | The property is eligible for garbage collection.                                                           |
| t\<encoding\> | Specifies the type using old-style encoding.                                                               |

## 属性属性描述示例

给出这些定义:

```objc
enum FooManChu { FOO, MAN, CHU };
struct YorkshireTeaStruct { int pot; char lady; };
typedef struct YorkshireTeaStruct YorkshireTeaStructType;
union MoneyUnion { float alone; double down; };
```

下表显示了示例属性声明和 `property_getAttributes` 返回的相应字符串:

| Property declaration                                                                                  | Property description                                |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| @property char charDefault;                                                                           | Tc,VcharDefault                                     |
| @property double doubleDefault;                                                                       | Td,VdoubleDefault                                   |
| @property enum FooManChu enumDefault;                                                                 | Ti,VenumDefault                                     |
| @property float floatDefault;                                                                         | Tf,VfloatDefault                                    |
| @property int intDefault;                                                                             | Ti,VintDefault                                      |
| @property long longDefault;                                                                           | Tl,VlongDefault                                     |
| @property short shortDefault;                                                                         | Ts,VshortDefault                                    |
| @property signed signedDefault;                                                                       | Ti,VsignedDefault                                   |
| @property struct YorkshireTeaStruct structDefault;                                                    | T{YorkshireTeaStruct="pot"i"lady"c},VstructDefault  |
| @property YorkshireTeaStructType typedefDefault;                                                      | T{YorkshireTeaStruct="pot"i"lady"c},VtypedefDefault |
| @property union MoneyUnion unionDefault;                                                              | T(MoneyUnion="alone"f"down"d),VunionDefault         |
| @property unsigned unsignedDefault;                                                                   | TI,VunsignedDefault                                 |
| @property int (_functionPointerDefault)(char _);                                                      | T^?,VfunctionPointerDefault                         |
| @property id idDefault;                                                                               | T@,VidDefault                                       |
| @property int \*intPointer;                                                                           | T^i,VintPointer                                     |
| @property void \*voidPointerDefault;                                                                  | T^v,VvoidPointerDefault                             |
| @property int intSynthEquals;In the implementation block:@synthesize intSynthEquals=\_intSynthEquals; | Ti,V_intSynthEquals                                 |
| @property(getter=intGetFoo, setter=intSetFoo:) int intSetterGetter;                                   | Ti,GintGetFoo,SintSetFoo:,VintSetterGetter          |
| @property(readonly) int intReadonly;                                                                  | Ti,R,VintReadonly                                   |
| @property(getter=isIntReadOnlyGetter, readonly) int intReadonlyGetter;                                | Ti,R,GisIntReadOnlyGetter                           |
| @property(readwrite) int intReadwrite;                                                                | Ti,VintReadwrite                                    |
| @property(assign) int intAssign;                                                                      | Ti,VintAssign                                       |
| @property(retain) id idRetain;                                                                        | T@,&,VidRetain                                      |
| @property(copy) id idCopy;                                                                            | T@,C,VidCopy                                        |
| @property(nonatomic) int intNonatomic;                                                                | Ti,VintNonatomic                                    |
| @property(nonatomic, readonly, copy) id idReadonlyCopyNonatomic;                                      | T@,R,C,VidReadonlyCopyNonatomic                     |
| @property(nonatomic, readonly, retain) id idReadonlyRetainNonatomic;                                  | T@,R,&,VidReadonlyRetainNonatomic                   |

---

引用:
[Declared Properties](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Articles/ocrtPropertyIntrospection.html#//apple_ref/doc/uid/TP40008048-CH101-SW1)
