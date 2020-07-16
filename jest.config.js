module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  testEnvironment: 'jest-environment-jsdom-global',
  testMatch: ["**/*.spec.ts"]
};
