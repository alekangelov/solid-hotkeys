module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'prettier',
    'airbnb-base',
    'eslint:recommended',
    'plugin:solid/recommended',
    'plugin:solid/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    lib: ['ESNext', 'DOM'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'solid', '@typescript-eslint/tslint'],

  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'solid/reactivity': 'warn',
    'solid/no-destructure': 'warn',
    'solid/jsx-no-undef': 'error',
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-parens': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
  },
  ignorePatterns: ['dist'],
};
