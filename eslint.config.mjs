const browserGlobals = {
  window: "readonly",
  document: "readonly",
  navigator: "readonly",
  console: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  fetch: "readonly",
  Request: "readonly",
  Response: "readonly",
  alert: "readonly",
  confirm: "readonly",
  Html5QrcodeScanner: "readonly"
}

const nodeGlobals = {
  module: "readonly",
  require: "readonly",
  process: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  exports: "readonly"
}

export default [
  {
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "out/",
      "**/*.ts",
      "**/*.tsx"
    ]
  },
  {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...browserGlobals,
        ...nodeGlobals
      }
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      "no-console": "off",
      eqeqeq: ["error", "smart"],
      "no-shadow": ["error", { builtinGlobals: true }]
    }
  }
]
