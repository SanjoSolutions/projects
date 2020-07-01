const merge = require('webpack-merge')

module.exports = merge(
  require('../../webpack-base.config'),
  {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'built'),
    },
  },
)
