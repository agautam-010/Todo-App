module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation/elements)',
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/jest.setup.js',
    '!**/*.config.js',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
