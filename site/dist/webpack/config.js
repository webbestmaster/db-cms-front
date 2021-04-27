"use strict";
/* global process */
/* eslint no-process-env: 0, id-match: 0, optimize-regex/optimize-regex: 0 */
const modeDevelopmentName = 'development';
const modeProductionName = 'production';
const nodeEnvironment = process.env.NODE_ENV || modeDevelopmentName;
const pathToStaticFileFolder = '/site-front-static-files/'; // '/static';
module.exports.nodeEnvironment = nodeEnvironment;
module.exports.isDevelopment = nodeEnvironment === modeDevelopmentName;
module.exports.isProduction = nodeEnvironment === modeProductionName;
module.exports.cwd = process.cwd();
module.exports.fileRegExp = /\.(webp|png|jpg|jpeg|gif|svg|otf|ttf|woff|woff2|eot|mp3)$/;
module.exports.pathToStaticFileFolder = pathToStaticFileFolder;
module.exports.pathToDist = pathToStaticFileFolder;
module.exports.webpackDevServerPort = 9090;
