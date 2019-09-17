var path = require("path")
var webpack = require("webpack")
var webpackMerge = require("webpack-merge")
var webpackBase = require("./webpack.base")

function resolve(str){
  return path.resolve(__dirname,'..', str)
}

module.exports = webpackMerge(webpackBase, {
  devServer: {
    contentBase: resolve('dist'),
    port: 8000,
    hot: true,
    hotOnly:true, //禁用自动刷新
    noInfo: true,
    open: true,
    proxy: {},
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.BASE_URL': JSON.stringify('baseUrl')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})

