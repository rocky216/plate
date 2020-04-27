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
    host: config.host,//"localhost",
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
      },
      "/resource": {
        target: config.baseRes,
        pathRewrite: {'^/resource' : '/resource'},
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      BASEURL: JSON.stringify(config.baseUrl),
    })
  ]
})
