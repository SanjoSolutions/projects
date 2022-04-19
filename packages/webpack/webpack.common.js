import { escapeForRegExp } from '@sanjo/escape-for-reg-exp';
import * as process from 'process';
const path = process.cwd();
const outputFileName = 'index.js';
const writeToDiskRegExp = new RegExp(`${escapeForRegExp(outputFileName)}$`);
export default {
    entry: './src/index.js',
    output: {
        filename: outputFileName,
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
            writeToDisk(filePath) {
                return writeToDiskRegExp.test(filePath);
            },
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