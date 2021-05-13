module.exports = () => ({
  autoDetect: true,

  files: [
    "packages/database/src/**/*.ts",
    "!packages/database/src/**/*.spec.ts",
    "packages/diff/src/**/*.ts",
    "!packages/diff/src/**/*.spec.ts",
    "packages/set/src/**/*.ts",
    "!packages/set/src/**/*.spec.ts",
    "packages/define-element/src/**/*.ts",
    "!packages/define-element/src/**/*.spec.ts",
    "packages/request/src/**/*.ts",
    "!packages/request/src/**/*.spec.ts",
    "rgbToHsl.js",
    "packages/trade/src/**/*.ts",
    "!packages/trade/src/**/*.spec.ts"
  ],

  tests: [
    "packages/database/src/**/*.spec.ts",
    "packages/diff/src/**/*.spec.ts",
    "packages/set/src/**/*.spec.ts",
    "packages/define-element/src/**/*.spec.ts",
    "packages/request/src/**/*.spec.ts",
    "rgbToHsl.spec.js",
    "packages/trade/src/**/*.spec.ts"
  ],
});
