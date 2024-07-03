module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: [
    'react-refresh',
    'react',
    '@typescript-eslint',
    'react-hooks',
    'react-compiler',
    'prettier',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: ['react'],
        patterns: ['react/*'],
        message: 'Hooks are not allowed',
      },
    ],
    'react-compiler/no-direct-dom-manipulations': 'error',
    'react-compiler/no-hooks': 'error',
    'react-compiler/no-ts-ignore': 'error',
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
