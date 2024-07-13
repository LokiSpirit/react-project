export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = ['<rootDir>/src/setupTests.js'];
export const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
};
export const collectCoverage = true;
export const coverageReporters = ['text', 'lcov'];
export const coverageDirectory = 'coverage';
