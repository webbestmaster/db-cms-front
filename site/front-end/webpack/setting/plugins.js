const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
// const {UnusedFilesWebpackPlugin} = require('unused-files-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const {isProduction, isDevelopment} = require('../config');
const filePathPrefix = './';

const date = new Date();

const definePluginParameters = {
    // eslint-disable-next-line id-match
    // BUILD_DATE: JSON.stringify(date.getTime()),
    // eslint-disable-next-line id-match
    BUILD_DATE_H: JSON.stringify(date.toISOString()),
    // NODE_ENV: JSON.stringify(NODE_ENV),
    IS_PRODUCTION: JSON.stringify(isProduction),
    // PROJECT_ID: JSON.stringify('my-best-project')
    // IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT)
};

const staticFilesSiteList = [
    {
        from: './src/favicon.ico',
        to: filePathPrefix + 'favicon.ico',
    },
];

const pluginList = [
    new CircularDependencyPlugin({
        exclude: /node_modules/,
    }),
    new DuplicatePackageCheckerPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin(definePluginParameters),
    new ScriptExtHtmlWebpackPlugin({defaultAttribute: 'defer'}),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isDevelopment ? '[name].css' : 'style.css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash:6].css',
    }),
    // new UnusedFilesWebpackPlugin({
    //     patterns: ['www/**/*.*'],
    //     globOptions: {
    //         ignore: ['www/**/*.scss.flow', 'www/**/*.css.flow', 'www/asset/**/*'],
    //     },
    // }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru/),
];

pluginList.push(
    new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
            collapseWhitespace: isProduction,
            removeComments: isProduction,
            minifyCSS: isProduction,
            minifyJS: isProduction,
        },
        hash: true,
        filename: filePathPrefix + 'index.html',
    }),
    new CopyWebpackPlugin({
        patterns: staticFilesSiteList,
    }),
);

module.exports.plugins = pluginList;
