import { merge } from 'webpack-merge'
import common from './webpack.common.js'
const config = merge(common, {
  // @ts-ignore
  mode: 'production',
})
export default config
//# sourceMappingURL=webpack.prod.js.map
