const path = require("path")
const webpackMerge = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config")
const webpack = require("webpack")
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const project = process.env.NODE_PROJECT

function resolve(str){
  return path.resolve(__dirname,"../",str) 
}

module.exports = webpackMerge(webpackBaseConfig, {
  mode: "development",
  devtool: "inline-source-map",
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
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      // chunks: ["app"]
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NamedModulesPlugin(),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {loader: 'babel-loader?cacheDirectory=true',},
        {loader: 'ts-loader',},
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    })
  ],
})