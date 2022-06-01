module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:solid/recommended",
    "plugin:solid/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    lib: ['ESNext', 'DOM'],
  },
  plugins: ["@typescript-eslint", "solid", "@typescript-eslint/tslint"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "solid/reactivity": "warn",
    "solid/no-destructure": "warn",
    "solid/jsx-no-undef": "error",
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0
  },
  ignorePatterns: ["dist"],
};
