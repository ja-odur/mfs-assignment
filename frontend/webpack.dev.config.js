const config = require('./webpack.config');

// Override the public path
// config.output.publicPath = 'http://localhost:5555/public/';

// Set the static public path to match what Django expects
// config.devServer.static.publicPath = '/static/';

module.exports = config;
