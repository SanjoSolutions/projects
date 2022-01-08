declare const config: {
  entry: string
  output: {
    filename: string
    path: string
    library: {
      type: string
    }
  }
  devtool: string
  resolve: {
    extensions: string[]
  }
  module: {
    rules: never[]
  }
  experiments: {
    outputModule: boolean
  }
}
export default config
//# sourceMappingURL=webpack.prod.d.ts.map
