module.exports = {
  moduleDirectories: ['node_modules', 'utils', __dirname],
  rootDir: __dirname,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jest-environment-jsdom',
};
