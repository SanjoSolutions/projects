import { merge } from 'webpack-merge';
import common from '../webpack.common.js';
const config = merge(common, {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
});
export default config;
//# sourceMappingURL=webpack.common.js.map