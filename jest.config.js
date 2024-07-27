/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{ useESM: true }],
  },
  preset: "ts-jest/presets/js-with-ts-esm",
  testPathIgnorePatterns: [ "/support/" ],
};