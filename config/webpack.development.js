const { join,resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
module.exports = {
  output: {
    filename: "scripts/[name].bundule.js"
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: join(__dirname, "../dist"),
    proxy: {
      "/api": "http://localhost:3000"
    },
    port: 3000,
    hot: true,
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'github-keyword-query',
      filename: 'index.html',
      template: resolve(__dirname, '../src/layout.html')
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:3000"]
      },
      clearConsole: true,
    })
  ]
};
