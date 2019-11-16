const TerserPlugin = require('terser-webpack-plugin');

module.exports = env => ({
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: false,
                terserOptions: {
                    ecma: 6,
                },
            }),
        ],
    },
});
