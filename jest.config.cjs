module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
};
