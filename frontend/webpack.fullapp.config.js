const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config.js');

// Update entrypoint
config.entry = './index.js';

// Override the public path
config.output.publicPath = '/';

// Add HTMLWebpack plugin
config.plugins = config.plugins.concat([new HtmlWebpackPlugin({ template: './standaloneIndex.html' })]);

module.exports = config;
