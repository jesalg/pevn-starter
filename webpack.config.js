var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SaveHashes = require('assets-webpack-plugin');
var isProd = (process.env.NODE_ENV === 'production');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
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
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        })
      },
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new SaveHashes({
      path: path.join(__dirname, 'config')
    }),
    new ExtractTextPlugin({
      publicPath: '/dist/',
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}

if (isProd) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config