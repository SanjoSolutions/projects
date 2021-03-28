module.exports =
  () => (
    {
      autoDetect: true,

      files: [
        'packages/database/src/**/*.ts',
        '!packages/database/src/**/*.spec.ts',
      ],

      tests: [
        'packages/database/src/**/*.spec.ts',
      ],
    }
  )
