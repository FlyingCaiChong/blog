# Core Bluetooth snippets

## 导入 CoreBluetooth 框架

Objective-C:

```objc
#import <CoreBluetooth/CoreBluetooth.h>
```

Swift:

```swift
import CoreBluetooth
```

## CBCenterManager 对象

### 初始化

#### 1. 遵守协议并定义对象

Objective-C:

```objc
@interface SomeClass () <CBCentralManagerDelegate>
@property (nonatomic, strong) CBCentralManager *centralManager;
@property (nonatomic, strong) CBPeripheral *peripheral;
@end
```

Swift:

```swift
class ComeClass: SomeSuperclass, CBCentralManagerDelegate {
    var centralManager: CBCentralManager!
    var peripheral: CBPeripheral
```

#### 2. 初始化 CBCenterManager 对象

Objective-C:

```objc
self.centralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
```

Swift:

```swift
centralManager = CBCentralManager(delegate: self, queue: nil)
```

:::tip
参数 queue: 事件派遣队列, 如果是 nil, 将在主队列上派遣事件.
:::

### 扫描

#### 1. 实现 CBCenterManager 对象状态更新的协议方法

Objective-C:

```objc
- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
    NSLog(@"state:%ld", (long)central.state);
}
```

Swift:

```swift
func centralManagerDidUpdateState(central: CBCentralManager) {
    print("state: \(central.state)")
}
```

:::tip

`CBCenterManager`初始化后, 蓝牙状态更新回调此方法.
在此方法中取`center.state`. 枚举类型值有:

1.  `CBManagerStateUnknown`: 状态未知, 即将更新
2.  `CBManagerStateResetting`: 系统服务的连接短暂丢失
3.  `CBManagerStateUnsupported`: 设备不支持低功耗蓝牙功能
4.  `CBManagerStateUnauthorized`: 未授权
5.  `CBManagerStatePoweredOff`: 蓝牙已关闭
6.  `CBManagerStatePoweredOn`: 蓝牙已开启

当在`CBManagerStatePoweredOn`状态时, 再去扫描外设.

:::

#### 2. 开始扫描

Objective-C:

```objc
[self.centralManager scanForPeripheralsWithServices:nil options:nil];
```

Swift:

```swift
centralManager.scanForPeripheralsWithServices(nil, options: nil)
```

:::tip

参数`serviceUUIDs`: `CBUUID`对象数组, 指定被扫描设备的服务列表. 当设置为 nil 时, 会扫描所有外围设备. 需要在后台扫描设备时必须指定. 指定服务以节省电量.
参数`options`: 配置项. 主要有两个 key.

1.  `CBCentralManagerScanOptionAllowDuplicatesKey`: 指定是否重复扫描
2.  `CBCentralManagerScanOptionSolicitedServiceUUIDsKey`: 指定扫描所包含指定服务的外设

:::

#### 3. 实现更新扫描结果的协议方法

Objective-C:

```objc
- (void)centralManager:(CBCentralManager *)central
    didDiscoverPeripheral:(CBPeripheral *)peripheral
        advertisementData:(NSDictionary *)advertisementData
                     RSSI:(NSNumber *)RSSI
{
    NSLog(@"peripheral：%@", peripheral);
}
```

Swift:

```swift
func centralManager(central: CBCentralManager,
    didDiscoverPeripheral peripheral: CBPeripheral,
    advertisementData: [String : AnyObject],
    RSSI: NSNumber!)
{
    print("peripheral: \(peripheral)")
}
```

:::tip

1. 参数`peripheral`: 扫描到的外设对象
2. 参数`advertisementData`: 外设广播包数据
3. 参数`RSSI`: 外设信号量

:::

#### 4. 停止扫描

Objective-C:

```objc
[self.centralManager stopScan];
```

Swift:

```swift
centralManager.stopScan()
```

### 连接

#### 1. 开始连接

Objective-C:

```objc
[self.centralManager connectPeripheral:peripheral options:nil];
```

Swift:

```swift
centralManager.connectPeripheral(peripheral, options: nil)
```

:::tip

参数`options`: 配置项, 可取值:

1.  `CBConnectPeripheralOptionNotifyOnConnectionKey`
2.  `CBConnectPeripheralOptionNotifyOnDisconnectionKey`
3.  `CBConnectPeripheralOptionNotifyOnNotificationKey`
4.  `CBConnectPeripheralOptionEnableTransportBridgingKey`
5.  `CBConnectPeripheralOptionRequiresANCS`

:::

#### 2. 实现连接结果协议方法

Objective-C:

```objc
// Called when it succeeded
- (void)centralManager:(CBCentralManager *)central
    didConnectPeripheral:(CBPeripheral *)peripheral
{
    NSLog(@"connected!");
}

// Called when it failed
- (void)centralManager:(CBCentralManager *)central
    didFailToConnectPeripheral:(CBPeripheral *)peripheral
                         error:(NSError *)error
{
    NSLog(@"failed…");
}
```

Swift:

```swift
// Called when it succeeded
func centralManager(central: CBCentralManager,
    didConnectPeripheral peripheral: CBPeripheral)
{
    print("connected!")
}

// Called when it failed
func centralManager(central: CBCentralManager,
    didFailToConnectPeripheral peripheral: CBPeripheral,
    error: NSError?)
{
    print("failed…")
}
```

### 发现服务和特征

#### 1. 实现 CBPeripheralDelegate 协议

Objective-C:

```objc
@interface SomeClass () <CBCentralManagerDelegate, CBPeripheralDelegate>
```

Swift:

```swift
class SomeClass: SomeSuperclass, CBCentralManagerDelegate, CBPeripheralDelegate {
```

#### 2. 开始发现服务

Objective-C:

```objc
peripheral.delegate = self;
[peripheral discoverServices:nil];
```

Swift:

```swift
peripheral.delegate = self
peripheral.discoverServices(nil)
```

#### 3. 实现发现服务的结果协议方法

Objective-C:

```objc
- (void)peripheral:(CBPeripheral *)peripheral
    didDiscoverServices:(NSError *)error
{
    if (error) {
        NSLog(@"error: %@", error);
        return;
    }

    NSArray *services = peripheral.services;
    NSLog(@"Found %lu services! :%@", (unsigned long)services.count, services);
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral, didDiscoverServices error: NSError?)
{
    if let error = error {
        print("error: \(error)")
        return
    }
    let services = peripheral.services
    print("Found \(services.count) services! :\(services)")
}
```

#### 4. 开始发现特征

Objective-C:

```objc
[peripheral discoverCharacteristics:nil forService:service];
```

Swift:

```swift
peripheral.discoverCharacteristics(nil, forService: service)
```

#### 5. 实现发现特征的结果协议方法

Objective-C:

```objc
- (void)peripheral:(CBPeripheral *)peripheral
    didDiscoverCharacteristicsForService:(CBService *)service
                                   error:(NSError *)error
{
    if (error) {
        NSLog(@"error: %@", error);
        return;
    }
    NSArray *characteristics = service.characteristics;
    NSLog(@"Found %lu characteristics!", (unsigned long)characteristics.count);
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral,
    didDiscoverCharacteristicsForService service: CBService,
    error: NSError?)
{
    if let error = error {
        print("error: \(error)")
        return
    }

    let characteristics = service.characteristics
    print("Found \(characteristics.count) characteristics!)
}
```

### 读取数据

#### 1. 开始读取特征值

Objective-C:

```objc
[peripheral readValueForCharacteristic:characteristic];
```

Swift:

```swift
peripheral.readValueForCharacteristic(characteristic)
```

#### 2. 实现读取特征值回调协议方法

Objective-C:

```objc
- (void)peripheral:(CBPeripheral *)peripheral
    didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic
                              error:(NSError *)error
{
    if (error) {
        NSLog(@"Failed… error: %@", error);
        return;
    }

    NSLog(@"characteristic uuid:%@, value%@",
      characteristic.UUID, characteristic.value);
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral,
    didUpdateValueForCharacteristic characteristic: CBCharacteristic,
    error: NSError?)
{
    if let error = error {
        print("Failed… error: \(error)")
        return
    }

    print("characteristic uuid: \(characteristic.UUID), value: \(characteristic.value)")
}
```

### 写入数据

#### 1. 开始写入特征值

Objective-C:

```objc
[peripheral writeValue:data
     forCharacteristic:characteristic
                  type:CBCharacteristicWriteWithResponse];
```

Swift:

```swift
peripheral.writeValue(data, forCharacteristic: characteristic, type: CBCharacteristicWriteType.WithResponse)
```

#### 2. 实现写入特征值回调协议方法

Objective-C:

```objc
- (void)peripheral:(CBPeripheral *)peripheral
    didWriteValueForCharacteristic:(CBCharacteristic *)characteristic
                             error:(NSError *)error
{
    if (error) {
        NSLog(@"error:%@", error);
        return;
    }

    NSLog(@"Succeeded!");
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral,
    didWriteValueForCharacteristic characteristic: CBCharacteristic,
    error: NSError?)
{
    if let error = error {
        print("error: \(error)")
        return
    }

    print("Succeeded!")
}
```

### 通知

#### 1. 设置监听可通知特征

Objective-C:

```objc
[peripheral setNotifyValue:YES
         forCharacteristic:characteristic];
```

Swift:

```swift
peripheral.setNotifyValue(true, forCharacteristic: characteristic)
```

#### 2. 停止监听可通知特征

Objective-C:

```objc
[peripheral setNotifyValue:NO
         forCharacteristic:characteristic];
```

Swift:

```swift
peripheral.setNotifyValue(false, forCharacteristic: characteristic)
```

#### 3. 实现可通知特征通知状态变化的协议方法

Objective-C:

```objc
- (void)peripheral:(CBPeripheral *)peripheral
    didUpdateNotificationStateForCharacteristic:(CBCharacteristic *)characteristic
                                          error:(NSError *)error
{
    if (error) {
        NSLog(@"error:%@", error);
    }
    else {
        NSLog(@"isNotifying:%d", characteristic.isNotifying);
    }
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral,
    didUpdateNotificationStateForCharacteristic characteristic: CBCharacteristic,
    error: NSError?)
{
    if let error = error {
        print("error: \(error)")
    }
    else {
        print("isNotifying: \(characteristic.isNotifying)")
    }
}
```

#### 4. 实现特征值变化的协议方法

Objective-C:

```objc
- (void) peripheral:(CBPeripheral *)peripheral
 didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic
 error:(NSError *)error
{
    if (error) {
        NSLog(@"error:%@", error);
        return;
    }

    NSLog(@"characteristic UUID:%@, value:%@",
          characteristic.UUID, characteristic.value);
}
```

Swift:

```swift
func peripheral(peripheral: CBPeripheral,
 didUpdateValueForCharacteristic characteristic: CBCharacteristic,
 error: NSError?)
{
    if let error = error {
        print("error: \(error)")
        return
    }

    print("characteristic UUID: \(characteristic.UUID), value: \(characteristic.value)")
}
```

### 断开连接

#### 1. 主动断开连接

Objective-C:

```objc
[self.centralManager cancelPeripheralConnection:peripheral];
```

Swift:

```swift
centralManager.cancelPeripheralConnection(peripheral)
```

#### 2. 实现断开连接回调协议方法

Objective-C:

```objc
- (void)centralManager:(CBCentralManager *)central didDisconnectPeripheral:(CBPeripheral *)peripheral error:(nullable NSError *)error {
    if (error) {
        NSLog(@"error:%@", error);
        return;
    }
}
```

Swift:

```swift
func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
    if let error = error {
        print("error: \(error)")
        return
    }
}
```

## CBPeripheralManager 对象

### 初始化

#### 1. 遵守协议并定义对象

Objective-C:

```objc
@interface SomeClass () <CBPeripheralManagerDelegate>
@property (nonatomic, strong) CBPeripheralManager *peripheralManager;
@end
```

Swift:

```swift
class SomeClass: SomeSuperclass, CBPeripheralManagerDelegate {
 var peripheralManager: CBPeripheralManager!
```

#### 2. 初始化 CBPeripheralManager 对象

Objective-C:

```objc
self.peripheralManager = [[CBPeripheralManager alloc] initWithDelegate:self queue:nil];
```

Swift:

```swift
peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
```

### 广播

#### 1. 实现 CBPeripheralManager 对象状态更新的协议方法

Objective-C:

```objc
- (void)peripheralManagerDidUpdateState:(CBPeripheralManager *)peripheral
{
    NSLog(@"state:%ld", (long)peripheral.state);
}
```

Swift:

```swift
func peripheralManagerDidUpdateState(peripheral: CBPeripheralManager)
{
    print("state: \(peripheral.state)")
}
```

#### 2. 开始广播

Objective-C:

```objc
NSDictionary *advertisementData = @{CBAdvertisementDataLocalNameKey: @"Test Device"};
[self.peripheralManager startAdvertising:advertisementData];
```

Swift:

```swift
let advertisementData = [CBAdvertisementDataLocalNameKey: "Test Device"]
peripheralManager.startAdvertising(advertisementData)
```

#### 3. 实现开始广播的回调协议方法

Objective-C:

```objc
- (void)peripheralManagerDidStartAdvertising:(CBPeripheralManager *)peripheral
                                       error:(NSError *)error
{
    if (error) {
        NSLog(@"Failed… error:%@", error);
        return;
    }

    NSLog(@"Succeeded!");
}
```

Swift:

```swift
func peripheralManagerDidStartAdvertising(peripheral: CBPeripheralManager, error: NSError?)
{
    if let error = error {
        print("Failed… error: \(error)")
        return
    }
    print("Succeeded!")
}
```

#### 4. 停止广播

Objective-C:

```objc
[self.peripheralManager stopAdvertising];
```

Swift:

```swift
peripheralManager.stopAdvertising()
```

### 添加服务

#### 1. 创建服务

Objective-C:

```objc
CBUUID *serviceUUID = [CBUUID UUIDWithString:kServiceUUID];
CBMutableService *service;
service = [[CBMutableService alloc] initWithType:serviceUUID
                                         primary:YES];
```

Swift:

```swift
let serviceUUID = CBUUID(string: kServiceUUID)
let service = CBMutableService(type: serviceUUID, primary: true)
```

#### 2. 创建特征

Objective-C:

```objc
CBUUID *characteristicUUID = [CBUUID UUIDWithString:kCharacteristicUUID];
CBCharacteristicProperties properties = (
    CBCharacteristicPropertyNotify |
    CBCharacteristicPropertyRead |
    CBCharacteristicPropertyWrite
);
CBAttributePermissions permissions = (CBAttributePermissionsReadable | CBAttributePermissionsWriteable);
CBMutableCharacteristic *c;
c = [[CBMutableCharacteristic alloc] initWithType:characteristicUUID
                                       properties:properties
                                            value:nil
                                      permissions:permissions];
```

Swift:

```swift
let characteristicUUID = CBUUID(string: kCharacteristicUUID)
let properties: CBCharacteristicProperties = [.Notify, .Read, .Write]
let permissions: CBAttributePermissions = [.Readable, .Writeable]
let characteristic = CBMutableCharacteristic(
    type: characteristicUUID,
    properties: properties,
    value: nil,
    permissions: permissions)
```

#### 3. 给服务添加特征

Objective-C:

```objc
service.characteristics = @[characteristic1, characteristic2];
```

Swift:

```swift
service.characteristics = [characteristic1, characteristic2]
```

#### 4. 添加服务到外设管理对象

Objective-C:

```objc
[self.peripheralManager addService:service];
```

Swift:

```swift
peripheralManager.addService(service)
```

#### 5. 实现添加服务的结果回调协议方法

Objective-C:

```objc
- (void)peripheralManager:(CBPeripheralManager *)peripheral
            didAddService:(CBService *)service
                    error:(NSError *)error
{
    if (error) {
        NSLog(@"error:%@", error);
        return;
    }

    NSLog(@"service:%@", service);
}
```

Swift:

```swift
func peripheralManager(peripheral: CBPeripheralManager, didAddService service: CBService, error: NSError?)
{
    if let error = error {
        print("error: \(error)")
        return
    }

    print("service: \(service)")
}
```

### 响应读的请求

Objective-C:

```objc
- (void)peripheralManager:(CBPeripheralManager *)peripheral
    didReceiveReadRequest:(CBATTRequest *)request
{
    if ([request.characteristic.UUID isEqual:self.characteristic.UUID])
    {
        // Set the characteristic's value to the request
        request.value = self.characteristic.value;

        // Respond to the request
        [self.peripheralManager respondToRequest:request
                                      withResult:CBATTErrorSuccess];
    }
}
```

Swift:

```swift
func peripheralManager(peripheral: CBPeripheralManager, didReceiveReadRequest request: CBATTRequest)
{
    if request.characteristic.UUID.isEqual(characteristic.UUID)
    {
        // Set the correspondent characteristic's value
        // to the request
        request.value = characteristic.value

        // Respond to the request
        peripheralManager.respondToRequest(
            request,
            withResult: .Success)
    }
}
```

### 响应写的请求

Objective-C:

```objc
- (void)peripheralManager:(CBPeripheralManager *)peripheral
    didReceiveWriteRequests:(NSArray *)requests
{
    for (CBATTRequest *aRequest in requests)
    {
        if ([aRequest.characteristic.UUID isEqual:self.characteristic.UUID])
        {
            // Set the request's value
            // to the correspondent characteristic
            self.characteristic.value = aRequest.value;
        }
    }

    [self.peripheralManager respondToRequest:requests[0]
                                  withResult:CBATTErrorSuccess];
}
```

Swift:

```swift
func peripheralManager(peripheral: CBPeripheralManager, didReceiveWriteRequests requests: [CBATTRequest])
{
    for request in requests
    {
        if request.characteristic.UUID.isEqual(characteristic.UUID)
        {
            // Set the request's value
            // to the correspondent characteristic
            characteristic.value = request.value
        }
    }
    peripheralManager.respondToRequest(requests[0], withResult: .Success)
}
```

### 响应通知

#### 1. 实现已被订阅的回调协议方法

Objective-C:

```objc
- (void)peripheralManager:(CBPeripheralManager *)peripheral
                         central:(CBCentral *)central
    didSubscribeToCharacteristic:(CBCharacteristic *)characteristic
{
    NSLog(@"subscribed centrals: %@", self.characteristic.subscribedCentrals);
}
```

Swift:

```swift
func peripheralManager(
    peripheral: CBPeripheralManager,
    central: CBCentral,
    didSubscribeToCharacteristic characteristic: CBCharacteristic)
{
    print("subscribed centrals: \( characteristic.subscribedCentrals)")
}
```

#### 2. 实现已被取消订阅的回调协议方法

Objective-C:

```objc
- (void)peripheralManager:(CBPeripheralManager *)peripheral
                           central:(CBCentral *)central
  didUnsubscribeFromCharacteristic:(CBCharacteristic *)characteristic
{
    NSLog(@"subscribed centrals: %@",
          self.characteristic.subscribedCentrals);
}
```

Swift:

```swift
func peripheralManager(
    peripheral: CBPeripheralManager,
    central: CBCentral,
    didUnsubscribeFromCharacteristic characteristic: CBCharacteristic)
{
    print("subscribed centrals: \(characteristic.subscribedCentrals)")
}
```

### 通知更新值

Objective-C:

```objc
self.characteristic.value = data;
[self.peripheralManager updateValue:data
                  forCharacteristic:self.characteristic
               onSubscribedCentrals:nil];
```

Swift:

```swift
characteristic.value = data
peripheralManager.updateValue(
    data,
    forCharacteristic: characteristic,
    onSubscribedCentrals: nil)
```
