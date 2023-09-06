import { merge } from "webpack-merge"
import common from "./webpack.common.js"

const config = merge(common, {
  mode: "production",
} as any)

export default config
