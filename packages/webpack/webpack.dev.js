import { merge } from 'webpack-merge';
import common from './webpack.common.js';
const config = merge(common, {
    // @ts-ignore
    mode: 'development',
});
export default config;
//# sourceMappingURL=webpack.dev.js.map