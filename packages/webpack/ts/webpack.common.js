import ResolveTypeScriptPlugin from 'resolve-typescript-plugin';
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
        plugins: [new ResolveTypeScriptPlugin()],
    },
});
export default config;
//# sourceMappingURL=webpack.common.js.map