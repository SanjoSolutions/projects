import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: __dirname,
        library: {
            type: 'module',
        },
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [],
    },
    experiments: {
        outputModule: true,
    },
};
//# sourceMappingURL=webpack.common.js.map