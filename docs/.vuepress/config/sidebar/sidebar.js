module.exports = {
  "/iOS/Objective-C/": [
    {
      title: "Runtime",
      collapsable: true,
      children: [
        "runtime_introduction",
        "runtime_version",
        "runtime_interact",
        "runtime_message",
        "runtime_dynamic",
        "runtime_forward",
        "runtime_encoding",
        "runtime_property",
      ],
    },
    {
      title: "Runloop",
      path: "/iOS/Objective-C/runloop.md",
    },
    {
      title: "蓝牙CoreBluetooth",
      path: "/iOS/Objective-C/corebluetooth",
    },
  ],
  "/iOS/Swift/": [
    {
      title: "Swift文档翻译",
      collapsable: false,
      children: ["", "about_swift"],
    },
    {
      title: "常见概念",
      collapsable: true,
      children: [
        "optional",
        "array",
        "dictionary",
        "set",
        "range",
        "func",
        "class",
        "struct",
        "property",
        "enum",
        "protocol",
        "generic",
      ],
    },
  ],
  "/iOS/SwiftUI/": [
    {
      title: "SwiftUI",
      children: [""],
    },
  ],
  "/tech/project/": [
    {
      title: "介绍",
      path: "/tech/project/",
    },
    {
      title: "集成Editorconfig配置",
      path: "/tech/project/editorconfig",
    },
    {
      title: "使用prettier工具",
      path: "/tech/project/prettier",
    },
    {
      title: "使用ESLint检测",
      path: "/tech/project/eslint",
    },
    {
      title: "Husky的使用",
      path: "/tech/project/husky",
    },
  ],
  "/tech/package/": [
    {
      title: "介绍",
      path: "/tech/package/",
    },
    {
      title: "npm的使用",
      path: "/tech/package/npm",
    },
    {
      title: "yarn的使用",
      path: "/tech/package/yarn",
    },
    {
      title: "pnpm的使用",
      path: "/tech/package/pnpm",
    },
  ],
  "/web/javascript/": [
    {
      title: "介绍",
      path: "/web/javascript/",
    },
    {
      title: "JavaScript内存管理",
      path: "/web/javascript/memory",
    },
    {
      title: "JavaScript重点概念",
      path: "/web/javascript/concept",
    },
    {
      title: "JavaScript函数",
      path: "/web/javascript/function",
    },
    {
      title: "ES6 相关",
      path: "/web/javascript/es6",
    },
    {
      title: "JavaScript权威指南学习",
      collapsable: true,
      children: ["Chapter-10-Modules"],
    },
  ],
  "/web/typescript/": [
    {
      title: "TypeScript",
      children: ["", "built_in_tool_type"],
    },
  ],
  "/web/css/": [
    {
      title: "CSS",
      children: [
        "",
        "base",
        "box",
        "bfc",
        "flex",
        "grid",
        "containing_block",
        "v-bind",
      ],
    },
  ],
  "/web/vue/": [
    {
      title: "Vue",
      children: ["", "encapsulate_comp"],
    },
  ],
  "/web/react/": [
    {
      title: "React",
      children: [""],
    },
  ],
};
