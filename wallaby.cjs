module.exports = () => ({
  autoDetect: true,

  files: [
    'packages/database/src/**/*.ts',
    '!packages/database/src/**/*.spec.ts',
    'packages/diff/src/**/*.ts',
    '!packages/diff/src/**/*.spec.ts',
    'packages/set/src/**/*.ts',
    '!packages/set/src/**/*.spec.ts',
    'packages/define-element/src/**/*.ts',
    '!packages/define-element/src/**/*.spec.ts',
    'packages/request/src/**/*.ts',
    '!packages/request/src/**/*.spec.ts',
    'rgbToHsl.js',
    'packages/trade/src/**/*.ts',
    '!packages/trade/src/**/*.spec.ts',
    'packages/random/src/**/*.ts',
    '!packages/random/src/**/*.spec.ts',
    'packages/event-storage/src/**/*.ts',
    '!packages/event-storage/src/**/*.spec.ts',
    'packages/dependency-injection-container/src/**/*.ts',
    '!packages/dependency-injection-container/src/**/*.spec.ts',
    'packages/planning/src/**/*.ts',
    '!packages/planning/src/**/*.spec.ts',
  ],

  tests: [
    'packages/database/src/**/*.spec.ts',
    'packages/diff/src/**/*.spec.ts',
    'packages/set/src/**/*.spec.ts',
    'packages/define-element/src/**/*.spec.ts',
    'packages/request/src/**/*.spec.ts',
    'rgbToHsl.spec.js',
    'packages/trade/src/**/*.spec.ts',
    'packages/random/src/**/*.spec.ts',
    'packages/event-storage/src/**/*.spec.ts',
    'packages/dependency-injection-container/src/**/*.spec.ts',
    'packages/planning/src/**/*.spec.ts'
  ],
})
