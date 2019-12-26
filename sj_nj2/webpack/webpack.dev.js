var path = require("path");
var webpack = require("webpack")
var webpackMerge = require("webpack-merge");
var webpackBase = require("./webpack.base")
var config = require("../config")


function resolve(str){ 
  return path.resolve(__dirname,'..', str)
}

module.exports = webpackMerge(webpackBase, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: resolve('dist'),
    port: 3000,
    host:"localhost",
    hot: true,
    hotOnly:true, //禁用自动刷新
    noInfo: true,
    open: true,
    progress:false,
    proxy: {
      "/api/pc": {
        target: config.baseUrl,
        pathRewrite: {'^/api/pc' : '/api/pc'},
        changeOrigin: true,
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
