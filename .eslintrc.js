module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-native', 'prettier'],
  env: {jest: true},
  rules: {
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-inline-styles': 2,
    'eslint-comments/no-unlimited-disable': 0,
    'react/no-unstable-nested-components': 0,
    'no-bitwise': 0,
    'dot-notation': 0,
    '@typescript-eslint/no-shadow': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  ignorePatterns: ['ios', 'android', 'node_modules'],
};
