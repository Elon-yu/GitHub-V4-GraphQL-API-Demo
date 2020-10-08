const { join, resolve } = require("path")
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const _mode = process.env.NODE_ENV || 'development'
const _modeflag = _mode == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const webpackBaseConfig= {
  mode: _mode,
  entry: {
    app: resolve("src/index.js")
  },
  output: {
    path: join(__dirname, "./dist/assets"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: !_modeflag,
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader",
          "sass-loader"
        ],
      },

      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10 * 1024,
            outputPath: 'images/',
          }
        }
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 10 * 1024,
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  externals: {
    react: "React",
  },
  optimization: {
    minimize: _modeflag ? true : false,
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@utils": resolve("src/utils"),
      "@services": resolve("src/services"),
      "@libs": resolve("src/libs"),
    },
    modules: ["node_modules", resolve("src")],
    extensions: [".js", "jsx"]
  },
  plugins: [
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css"
    })
  ],
}

module.exports = merge(_mergeConfig, webpackBaseConfig);