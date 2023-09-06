module.exports = () => ({
  autoDetect: true,

  files: [
    "packages/*/src/**/*.ts",
    "!packages/*/src/**/*.spec.ts",
    "rgbToHsl.js",
    "sudoku_solver/*.js",
    "!sudoku_solver/*.spec.js",
    "!packages/compose/example/**/*",
  ],

  tests: [
    "packages/*/src/**/*.spec.ts",
    "rgbToHsl.spec.js",
    "sudoku_solver/*.spec.js",
    "!packages/compose/example/**/*",
  ],
})
