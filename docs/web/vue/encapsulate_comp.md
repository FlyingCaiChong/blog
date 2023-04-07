# 基于第三方组件二次封装的思路

在开发的过程中, 当第三方组件不能满足业务需求时, 可能会需要对其进行二次封装, 在进行二次封装时, 需要考虑一些问题:

1. 组件 `props` 的传递
2. 组件的 `v-model`
3. 插槽的传递
4. `ref` 的引用

针对以上问题, 假设场景, 基于 `antd` 的 `input` 组件进行二次封装 `my-input` 组件.

## 组件 props 的传递

在业务层使用 `my-input` 组件, 传递的 `props` 如何传递给 `antd` 的 `input` 组件, 一个简单粗暴的方法是把 `antd` 的 `input` 组件所有的 `props` 在 `my-input` 组件中重新写一遍, 虽然可以实现需求, 但耗时耗力, 不够优雅. 更好的方法是使用 [attrs](https://v2.cn.vuejs.org/v2/api/#vm-attrs), `attrs` 包含了父作用域中不作为 `prop` 被识别 (且获取) 的 attribute 绑定, 这样就可以通过 `v-bind="$attrs"`传递给 `input` 组件.

## 组件的 v-model

在业务层使用 `my-input` 组件时, 如何通过 `v-model` 来绑定 `input` 组件的输入. 这里涉及到[自定义组件的 v-model 知识](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model), 一个组件上的 `v-model` 默认会利用名为 `value` 的 `prop` 和名为 `input` 的事件. `value` 的 `prop` 通过 `v-bind="$attrs"`传递给了`input`组件, 在`my-input`组件中监听 `input` 组件的事件 再通过`$emit('input', e.target.value)` 抛出给父组件.

## 插槽的传递

`antd` 的 `input` 组件的有一些插槽, 如何在使用 `my-input` 组件时把插槽传给 `input` 组件. 一个简单粗暴的方法是在 `my-input` 组件上实现全部相同的插槽, 再定义相同名称的插槽, 供父组件使用, 但这个思路不好, 原因是必须全部都实现, 如果 `input` 组件内部对没有实现的插槽做了默认插槽的实现, 就会有问题. 更好的方法是使用 [$scopedSlots](https://v2.cn.vuejs.org/v2/api/#vm-scopedSlots)来访问作用域插槽, 然后遍历它, 使用[动态插槽名](https://v2.cn.vuejs.org/v2/guide/components-slots.html#%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%90%8D)的方式来添加插槽.

## ref 的引用

在业务层使用 `my-input` 组件时, 如何通过 `ref` 属性来获取 `input` 组件的引用信息, 然后调用 `input` 组件的方法. 如果在业务层 `my-input` 组件使用 `ref` 时, 默认是引用的 `my-input` 组件, 没办法调用 `input` 组件的方法. 不太可能引用到 `input` 组件. 换个思路实现的方法是, 将 `input` 组件的方法都同步给 `my-input` 组件, 这样就可以在使用 `my-input` 组件的 `ref` 调用相应的方法时内部就是调用的 `input` 组件的方法.

---

具体代码实现如下

```vue
<template>
  <div>
    <a-input ref="input" v-bind="$attrs" @change="onChange">
      <template v-for="(item, name) in $scopedSlots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </a-input>
  </div>
</template>

<script>
export default {
  name: "MyInput",
  mounted() {
    for (let i in this.$refs.input) {
      if (typeof this.$refs.input[i] === "function") {
        if (!(i in this)) {
          this[i] = this.$refs.input[i];
        }
      }
    }
  },
  methods: {
    onChange(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style lang="less" scoped></style>
```
