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
      children: [
        "Chapter-01-Introduction",
        "Chapter-02-LexicalStructure",
        "Chapter-03-Types_Values_Variables",
        "Chapter-04-Expressions_Operators",
        "Chapter-05-Statements",
        "Chapter-06-Objects",
        "Chapter-07-Arrays",
        "Chapter-08-Functions",
        "Chapter-09-Classes",
        "Chapter-10-Modules",
        "Chapter-11-Standard_Library",
        "Chapter-12-Iterators_Generators",
        "Chapter-13-Asynchronous",
        "Chapter-14-Metaprogramming",
        "Chapter-15-Web_Browsers",
        "Chapter-16-Server_side",
        "Chapter-17-Tools_Extensions",
      ],
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
