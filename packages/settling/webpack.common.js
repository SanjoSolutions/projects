import common from '@sanjo/webpack/ts/webpack.common.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
const __dirname = dirname(fileURLToPath(import.meta.url));
const config = merge(common, {
    output: {
        path: __dirname,
    },
    devServer: {
        static: {
            directory: __dirname,
        },
    },
});
export default config;
//# sourceMappingURL=webpack.common.js.map