"use strict";
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // eslint-disable-line no-unused-vars
const { pathToStaticFileFolder, isDevelopment, isProduction, pathToDist, cwd, nodeEnvironment, } = require('./webpack/config');
const webpackConfig = {
    entry: ['./src/css/root.scss', './src/root.tsx'],
    output: {
        // path: path.join(cwd, pathToDist),
        path: path.join(cwd, pathToStaticFileFolder),
        publicPath: pathToStaticFileFolder,
        filename: isDevelopment ? '[name].js' : 'index.js',
        chunkFilename: isDevelopment ? '[name].chunk.js' : '[name].[hash:6].chunk.js',
    },
    mode: nodeEnvironment,
    devtool: isProduction ? false : 'source-map',
    optimization: require('./webpack/setting/optimization').optimization,
    module: { rules: require('./webpack/setting/module/rules').rules },
    resolve: {
        alias: require('./webpack/setting/resolve/alias').alias,
        extensions: require('./webpack/setting/resolve/extensions').extensions,
    },
    plugins: require('./webpack/setting/plugins').plugins,
    devServer: require('./webpack/setting/dev-server').devServer,
};
// webpackConfig.plugins.push(new BundleAnalyzerPlugin());
module.exports = webpackConfig;
