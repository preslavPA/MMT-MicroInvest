var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    devServer: {
        inline: true,
        contentBase: './src',
        port: 3000
    },
    devtool: 'cheap-module-eval-source-map',
    entry: [
      './dev/js/index.js',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract({
                fallback : "style-loader",
                use : "css-loader"
              })
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath : '/static/',
        filename: 'bundle.js',
        hot : true
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};
