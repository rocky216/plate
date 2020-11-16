var path = require("path")
var webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const dllPath = path.resolve("dist")
const {library} = require("./library")


// var vendors= [
//   "antd",
//   "@ant-design/icons",
//   // "redux",
//   // "react-redux",
//   "lodash",
//   // "moment",
//   // "axios",
//   // "qs"
// ]
// var react = [
//   'react', 
//   'react-dom',
//   "react-router-dom",
// ]


module.exports = {
  mode: "production",
  entry: library,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
        // 定义程序中打包公共文件的入口文件vendor.js
        // context: process.cwd(),

        // manifest.json文件的输出位置
        path: path.join(__dirname,'dll', '[name]-manifest.json'),

        // 定义打包的公共vendor文件对外暴露的函数名
        name: '[name]_[hash]'
    }),
    // new BundleAnalyzerPlugin()
  ]
}