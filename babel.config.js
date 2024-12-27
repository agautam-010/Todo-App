module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@src': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@utils': './src/utils',
          '@navigators': './src/navigators',
        },
      },
    ],
  ],
};
