const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')

module.exports = {
    devtool: 'source-map',
    entry: './app/client/main.js',
    output: {
        path: path.join(__dirname, 'dist/static'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        modules : [path.resolve(__dirname, "app"), "node_modules"]
    },
    plugins: [
        new Visualizer(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'API_TARGET' : JSON.stringify(process.env.API_TARGET)
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin("styles.css"),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
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
                use : ExtractTextPlugin.extract({
                    fallback : "style-loader",
                    use: [
                        'css-loader?importLoader=1&modules&localIdentName=[name]__[local]___[hash:base64:5]',
                        'resolve-url-loader',
                        {
                            loader : 'sass-loader',
                            options : {
                                includePaths : [path.resolve(__dirname, 'app'), path.resolve(__dirname, 'node_modules')],
                            }
                        }
                    ]
                }),
                include : path.resolve(__dirname, 'app'),
            },
        ]
    },
};
