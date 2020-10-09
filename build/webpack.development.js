const { join,resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
      title: 'GitHub-V4-GraphQL-API-demo',
      filename: 'index.html',
      template: resolve(__dirname, '../src/layout.html')
    }),
  ]
};
