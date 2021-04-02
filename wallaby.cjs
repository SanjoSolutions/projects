module.exports = () => ({
  autoDetect: true,

  files: [
    "packages/database/src/**/*.ts",
    "!packages/database/src/**/*.spec.ts",
    "rgbToHsl.js",
  ],

  tests: ["packages/database/src/**/*.spec.ts", "rgbToHsl.spec.js"],
})
