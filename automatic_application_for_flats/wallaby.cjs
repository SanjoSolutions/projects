module.exports = () => ({
  autoDetect: true,

  files: [
    'src/**/*.js',
    '!**/__tests__/**/*.[jt]s?(x)',
    '!**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  tests: [
    { pattern: 'src/modules/degewo/DegewoFlatOfferListElement.test.js', instrument: false },
    { pattern: 'src/lib/getInnerTextOfChildAsCurrency.test.js', instrument: false },
    { pattern: 'src/lib/getInnerTextOfChild.test.js', instrument: false },
    { pattern: 'src/lib/getInnerText.test.js', instrument: false },
    { pattern: 'src/lib/getInnerHTML.test.js', instrument: false },
    'src/**/__tests__/**/*.[jt]s?(x)',
    'src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  env: {
    params: {
      runner: '--experimental-vm-modules'
    }
  },

  hints: {
    ignoreCoverage: /disable coverage/
  }
})
