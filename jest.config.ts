export default {
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  }
};
