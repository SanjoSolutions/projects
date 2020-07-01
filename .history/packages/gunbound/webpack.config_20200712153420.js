const { merge } = require('webpack-merge')
const path = require('path')

module.exports = merge(
  require('../../webpack-base.config'),
  {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'built'),
    },
  },
)
