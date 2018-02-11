const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
      filename: './dist/bundle.js'
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              },
              exclude: /node_modules/
          }
      ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};