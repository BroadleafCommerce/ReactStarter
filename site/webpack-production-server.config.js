const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')

module.exports = {
    name: 'server',
    entry: './app/server/server.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        modules : [path.resolve(__dirname, "app"), "node_modules"]
    },
    target: 'node',
    node: {
        __filename: false,
        __dirname: false,
        console: true,
    },
    externals: nodeExternals(),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
            },
            {
                test : /\.(css|scss)$/,
                use: [
                    'css-loader/locals?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
                    'resolve-url-loader',
                    {
                        loader : 'sass-loader',
                        options : {
                            includePaths : [path.resolve(__dirname, 'app')],
                        }
                    }
                ],
                include : path.resolve(__dirname, 'app'),
            },
        ]
    },
};
