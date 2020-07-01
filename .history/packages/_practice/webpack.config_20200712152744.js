const merge = require('webpack-merge')

module.exports = merge(
  require('../../webpack-base.config')(),
  {
    entry: './src/index.tsx',
  },
)
