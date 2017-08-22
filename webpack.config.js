const settings = require('./src/settings.js')
const path = require('path')

module.exports = {
  context: __dirname,
  entry: './src/client.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'js/client.min.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      }, {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&name=[name].[ext]?[hash]&publicPath=/&outputPath=images/', // reasonable limit? Reconsider?
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[name].[ext]?[hash]&publicPath=/&outputPath=fonts/',
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]?[hash]&publicPath=/&outputPath=fonts/',
      },
    ],
  },
  // devtool: settings.dev ? 'cheap-eval-sourcemap' : false,
  devtool: settings.dev ? 'sourcemap' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    port: 3000,
  },
}
