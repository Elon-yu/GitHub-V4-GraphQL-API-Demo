const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  output: {
    filename: "scripts/[name].[contenthash:5].bundule.js"
  },
  externals: {
    react: "React",
    'react-dom': "ReactDOM",
    antd: 'antd'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        },
        output: {
          comments: false
        }
      },
      parallel: true
    }),
    new HtmlWebpackPlugin({
      title: 'GitHub-V4-GraphQL-API-Demo',
      filename: 'index.html',
      template: resolve(__dirname, "../src/layout.html"),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      cdn: {
        js: [
          'https://unpkg.com/react@16/umd/react.production.min.js',
          "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
          "https://unpkg.com/antd@4.6.6/dist/antd.min.js",
        ]
      }
    })
  ]
};
