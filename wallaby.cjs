module.exports = () => ({
  autoDetect: true,

  files: [
    'packages/*/src/**/*.ts',
    '!packages/*/src/**/*.spec.ts',
    'rgbToHsl.js',
  ],

  tests: [
    'packages/*/src/**/*.spec.ts',
    'rgbToHsl.spec.js',
  ],
})
