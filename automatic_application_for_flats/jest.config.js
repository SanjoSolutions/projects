export default {
  globals: {
    __WEB_SERVER_PORT__: '8888',
  },
  globalSetup: './src/jest/setup.js',
  globalTeardown: './src/jest/teardown.js',
  transform: {},
}
