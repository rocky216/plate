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
    host:"192.168.0.103",//"localhost",
    hot: true,
    hotOnly:true, //禁用自动刷新
    noInfo: true,
    open: true,
    progress:false,
    proxy: {
      "/api": {
        target: config.baseUrl,
        pathRewrite: {'^/api' : '/api'},
        changeOrigin: true,
      }
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
