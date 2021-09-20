import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'public'),
    library: {
      type: 'module'
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  experiments: {
    outputModule: true,
  }
}
