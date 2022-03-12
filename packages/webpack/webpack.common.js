import * as process from 'process';
export default {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: process.cwd(),
        library: {
            type: 'module',
        },
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