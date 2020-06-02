const path = require("path")
const webpackMerge = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config")
const webpack = require("webpack")


function resolve(str){
  return path.resolve(__dirname,"../",str) 
}

module.exports = webpackMerge(webpackBaseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: { //出口
    filename: 'app.js',
    publicPath: "/"
  },
  // devServer: {
  //   compress:true, //是否压缩
  //   port:3003, //端口号
  //   host:'localhost', //外部服务器可以访问
  //   open:true, //是否运行时打开浏览器
  //   hot: true, //热更新
  //   hotOnly:true,
  //   noInfo: true,
  //   progress:false,
  //   overlay: true, //浏览器输出错误
  //   useLocalIp: true,  //本地IP打开
    
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
})