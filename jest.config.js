/**
 * Jest テスト設定
 * npm run test で実行されるユニットテストの設定
 */
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterSetup: [],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['jest', { tsconfig: 'tsconfig.json' }],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

module.exports = config;
