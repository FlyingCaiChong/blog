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
  "/tech/npm/": [
    {
      title: "关于npm",
      path: "/tech/npm/",
    },
    {
      title: "起步",
      collapsable: true,
      children: [
        {
          title: "Setting up your npm user account",
          collapsable: true,
          children: [
            "creating-a-new-npm-user-account",
            "creating-a-strong-password",
            "receiving-a-one-time-password-over-email",
            "about-two-factor-authentication",
            "configuring-two-factor-authentication",
            "accessing-npm-using-2fa",
            "recovering-your-2fa-enabled-account",
          ],
        },
        {
          title: "Managing your profile settings",
          collapsable: true,
          children: [
            "managing-your-profile-settings",
            "changing-your-npm-username",
            "deleting-your-npm-user-account",
            "requesting-your-data",
          ],
        },
        {
          title: "Paying for your npm user account",
          collapsable: true,
          children: [
            "upgrading-to-a-paid-user-account-plan",
            "viewing-downloading-and-emailing-receipts-for-your-user-account",
            "updating-user-account-billing-settings",
            "downgrading-to-a-free-user-account-plan",
          ],
        },
        {
          title: "Configuring your local environment",
          collapsable: true,
          children: [
            "about-npm-versions",
            "downloading-and-installing-node-js-and-npm",
          ],
        },
        {
          title: "Troubleshooting",
          collapsable: true,
          children: [
            "generating-and-locating-npm-debug-files",
            "common-errors",
            "try-the-latest-stable-version-of-node",
            "try-the-latest-stable-version-of-npm",
          ],
        },
      ],
    },
    {
      title: "Packages and Modules",
      collapsable: true,
      children: [
        {
          title: "Introduction to packages and modules",
          collapsable: true,
          children: [
            "about-the-public-npm-registry",
            "about-packages-and-modules",
            "about-scopes",
            "about-public-packages",
            "about-private-packages",
            "package-scope-access-level-and-visibility",
          ],
        },
        {
          title: "Contributing packages to the registry",
          collapsable: true,
          children: [
            "creating-a-package-json-file",
            "creating-node-js-modules",
            "about-package-readme-files",
            "creating-and-publishing-unscoped-public-packages",
            "creating-and-publishing-scoped-public-packages",
            "creating-and-publishing-private-packages",
            "package-name-guidelines",
            "specifying-dependencies-and-devdependencies-in-a-package-json-file",
            "about-semantic-versioning",
            "adding-dist-tags-to-packages",
          ],
        },
        {
          title: "Updating and managing your published packages",
          collapsable: true,
          children: [
            "changing-package-visibility",
            "adding-collaborators-to-private-packages-owned-by-a-user-account",
            "updating-your-published-package-version-number",
            "deprecating-and-undeprecating-packages-or-package-versions",
            "transferring-a-package-from-a-user-account-to-another-user-account",
            "unpublishing-packages-from-the-registry",
          ],
        },
        {
          title: "Getting packages from the registry",
          collapsable: true,
          children: [
            "searching-for-and-choosing-packages-to-download",
            "downloading-and-installing-packages-locally",
            "downloading-and-installing-packages-globally",
            "resolving-eacces-permissions-errors-when-installing-packages-globally",
            "updating-packages-downloaded-from-the-registry",
            "using-npm-packages-in-your-projects",
            "using-deprecated-packages",
            "uninstalling-packages-and-dependencies",
          ],
        },
        {
          title: "Securing your code",
          collapsable: true,
          children: [
            "about-audit-reports",
            "auditing-package-dependencies-for-security-vulnerabilities",
            "generating-provenance-statements",
            "about-registry-signatures",
            "verifying-registry-signatures",
            "requiring-2fa-for-package-publishing-and-settings-modification",
            "reporting-malware-in-an-npm-package",
          ],
        },
      ],
    },
    {
      title: "Integrations",
      collapsable: true,
      children: [
        {
          title: "Integrating npm with external services",
          collapsable: true,
          children: [
            "about-access-tokens",
            "creating-and-viewing-access-tokens",
            "revoking-access-tokens",
            "using-private-packages-in-a-ci-cd-workflow",
            "docker-and-private-modules",
          ],
        },
      ],
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
      title: "TypeScript 内置工具类型",
      path: "/web/typescript/built_in_tool_type",
    },
    {
      title: "Effective TypeScript学习",
      collapsable: true,
      children: ["Chapter-01"],
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
