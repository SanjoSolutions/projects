module.exports = () => ({
  autoDetect: true,

  files: [
    "packages/database/src/**/*.ts",
    "!packages/database/src/**/*.spec.ts",
    "packages/diff/src/**/*.ts",
    "!packages/diff/src/**/*.spec.ts",
    "packages/set/src/**/*.ts",
    "!packages/set/src/**/*.spec.ts",
    "rgbToHsl.js",
  ],

  tests: [
    "packages/database/src/**/*.spec.ts",
    "packages/diff/src/**/*.spec.ts",
    "packages/set/src/**/*.spec.ts",
    "rgbToHsl.spec.js"
  ],
});
