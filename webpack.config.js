const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = require('config');

/*-------------------------------------------------*/

module.exports = {
    // webpack optimization mode
    mode: (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

    // entry file(s)
    entry:  [
        './src/sass/style.sass',
        './src/index.js', 
    ],

    // output file(s) and chunks
    output: {
        library: 'SorobanSimulator',
        libraryTarget: 'umd',
        libraryExport: 'default',
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: config.get('publicPath')
    },

    // module/loaders configuration
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.sass$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].css',
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader?-url'
                },
                {
                    loader: 'postcss-loader'
                },
                {
                    loader: 'sass-loader'
                }]
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        })
    ],

    // development server configuration
    devServer: {

        // must be `true` for SPAs
        historyApiFallback: true,

        // open browser on server start
        open: config.get('open')
    },

    // generate source map
    devtool: ('production' === process.env.NODE_ENV ? 'source-map' : 'cheap-module-eval-source-map'),
};
