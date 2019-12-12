var path = require("path")
var webpack = require("webpack")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


var vendors= [
  'react', 
  'react-dom',
  "react-router-dom",
  "antd",
  "redux",
  "react-redux",
  "lodash",
  "moment",
  "axios",
  "qs"
]


module.exports = {
  entry: {
    vendors: vendors
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
        // 定义程序中打包公共文件的入口文件vendor.js
        context: process.cwd(),

        // manifest.json文件的输出位置
        path: path.join(__dirname, '[name]-manifest.json'),

        // 定义打包的公共vendor文件对外暴露的函数名
        name: '[name]_[hash]'
    }),
    new BundleAnalyzerPlugin()
  ]
}