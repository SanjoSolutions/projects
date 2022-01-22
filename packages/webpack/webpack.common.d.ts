declare const _default: {
    entry: string;
    output: {
        filename: string;
        path: string;
        library: {
            type: string;
        };
    };
    devtool: string;
    resolve: {
        extensions: string[];
    };
    module: {
        rules: ({
            test: RegExp;
            use: string[];
            exclude?: undefined;
        } | {
            test: RegExp;
            use: string;
            exclude: RegExp;
        })[];
    };
    experiments: {
        outputModule: boolean;
    };
};
export default _default;
//# sourceMappingURL=webpack.common.d.ts.map