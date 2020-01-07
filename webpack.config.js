var path = require('path')
var webpack = require('webpack')
var SaveHashes = require('assets-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
  entry: {
    index: [
      path.join(__dirname, 'client/js/index.js'),
      path.join(__dirname, 'client/css/index.css')
    ],
  },
  output: {
    path: path.join(__dirname, 'public/dist/'),
    publicPath: '/dist/',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: isProd ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [{
          loader: 'vue-loader'
        }]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      {
        test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new SaveHashes({
      path: path.join(__dirname, 'config')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin()
  ]
}

if (isProd) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config