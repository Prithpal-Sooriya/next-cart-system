module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
  globals: {
    'ts-jest': {
      useBabelrc: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js', '<rootDir>/.next/'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    // '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js',
  },
}
