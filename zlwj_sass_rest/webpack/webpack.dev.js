const {join, resolve} = require("path")
const {merge} = require("webpack-merge")
const baseWebpack = require("./webpack.base")
const webpack = require("webpack")

const project = process.env.NODE_PROJECT;


module.exports = merge(baseWebpack, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: join("dist"),
    /* 启用gzip压缩 */
    compress: true,
    host: "localhost",
    hot: true,
    hotOnly: true,
    index: `${project}.html`,
    open: true,
    noInfo: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          }
        }
        
      },
    ]
  }
})