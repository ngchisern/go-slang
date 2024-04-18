module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testTimeout: 100000,
  testPathIgnorePatterns: [
    '__utils__'
  ]
};
