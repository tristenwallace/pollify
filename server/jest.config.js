module.exports = {
  testEnvironment: 'node', // Use node not the DOM
  roots: ['<rootDir>/src'], // Look for tests in the src directory
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$', // Find test files with .test.ts or .spec.ts
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], // File extensions to process
};
