module.exports =
  () => (
    {
      autoDetect: true,

      files: [
        'packages/format/src/**/*.ts',
        '!packages/format/src/**/*.spec.ts',
      ],

      tests: [
        'packages/format/src/**/*.spec.ts',
      ],
    }
  )
