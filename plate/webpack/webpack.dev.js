var path = require("path")
var webpack = require("webpack")
var webpackMerge = require("webpack-merge")
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
    port: 8000,
    hot: true,
    hotOnly:true, //禁用自动刷新
    noInfo: true,
    open: true,
    progress:false,
    proxy: {
      "/system": {
        target: config.baseUrl,
        pathRewrite: {'^/system' : '/system'},
        changeOrigin: true,
      }
    },
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify(config.baseUrl)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})

