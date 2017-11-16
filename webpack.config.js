var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index',
 output: {
    path: path.join(__dirname + '/'),
    filename: 'bundle.js'
 },
  module : {
    loaders: [
    {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['es2015','react']
        }
    },
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [ 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]}
    ]
  }
}
