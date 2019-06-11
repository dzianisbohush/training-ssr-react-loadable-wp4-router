const webpack = require('webpack');
const path = require('path');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

module.exports = {
  target: 'web',
  entry: {
    index: './source/client.jsx',
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'source', 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              require('@babel/plugin-proposal-class-properties'),
              require('@babel/plugin-proposal-object-rest-spread'),
              require('@babel/plugin-syntax-dynamic-import'),
              require('react-loadable/babel'),
            ],
          },
        },
      },
    ],
  },
  optimization: {
    nodeEnv: 'development',
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          minChunks: 2,
        },
        default: {
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new ReactLoadableSSRAddon({
      filename: 'react-loadable-ssr-addon.json',
    }),
  ],
};
