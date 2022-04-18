import * as process from 'process';
const path = process.cwd();
export default {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path,
        library: {
            type: 'module',
        },
    },
    devServer: {
        static: {
            directory: path,
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    experiments: {
        outputModule: true,
    },
};
//# sourceMappingURL=webpack.common.js.map