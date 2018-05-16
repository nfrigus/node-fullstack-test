const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: "source-map",
  entry: { app: './src/client/index.js' },
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: { extensions: ['.js', '.json'] },
  devServer: {
    contentBase: __dirname + '/public',
    historyApiFallback: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: __dirname + '/public/index.html',
      template: 'src/index.html',
      inject: false,
    })
  ]
}
