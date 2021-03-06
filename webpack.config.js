const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            entry: {
                gitlab: './src/gitlab/index.ts',
                localization_highlighter: './src/localization_highlighter/index.ts',
                exp_pnp: './src/exp_pnp/index.ts',
            },
            mode,
            devtool: 'source-map',
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.(html|svelte)$/,
                        use: {
                            loader: 'svelte-loader',
                            options: {
                                emitCss: false,
                                preprocess: require('svelte-preprocess')({}),
                            },
                        },
                        exclude: /node_modules/,
                    },
                ],
            },
            resolve: {
                alias: {
                    svelte: path.resolve('node_modules', 'svelte'),
                },
                extensions: ['.tsx', '.ts', '.mjs', '.js', '.svelte'],
                mainFields: ['svelte', 'browser', 'module', 'main'],
            },
            output: {
                filename: '[name].js',
                sourceMapFilename: '[file].map',
                path: path.resolve(__dirname, 'scripts'),
            },
            optimization: {},
            plugins: [new CleanWebpackPlugin()],
        },
        modeConfig(mode),
    );
};
