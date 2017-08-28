var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './app/client/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    resolve: {
        modules : [path.resolve(__dirname, "app"), "node_modules"],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : {
                'NODE_ENV': JSON.stringify('development'),
                'API_TARGET' : JSON.stringify(process.env.API_TARGET),
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    module: {
        rules: [
            {
                test : /\.(css|scss)$/,
                use : [
                    'style-loader',
                    'css-loader?importLoader=1&modules&localIdentName=[local]___[hash:base64:5]',
                    'resolve-url-loader',
                    {
                        loader : 'sass-loader?sourceMap',
                        options : {
                            includePaths : [path.resolve(__dirname, 'app')],
                        }
                    }
                ],
                include : [path.resolve(__dirname, 'app')],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
            },
        ]
    },
};
