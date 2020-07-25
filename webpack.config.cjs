var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: path.resolve('./src/index.js'),
    output: {
        library: 'canvas',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist'),
        filename: 'umd.min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    mode: 'production',
    devtool: 'source-map'
};
