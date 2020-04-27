var path = require("path")
var webpack = require("webpack")
var webpackMerge = require("webpack-merge")
var webpackBase = require("./webpack.base")
var config = require("../config")
var manifest = require("./vendors-manifest.json")
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const themeColor = require("../src/assets/theme/index")


function resolve(str){ 
  return path.resolve(__dirname,'..', str)
}

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  devtool:"source-map",
  plugins: [
    new HtmlWebpackIncludeAssetsPlugin({ assets: ['vendors.dll.js'], append: false }),
    new webpack.DllReferencePlugin({
      manifest
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,//console
        }
      }
    }),
    //抽取css
    new MiniCssExtractPlugin({
      filename:'[name].[hash].css'
    }),

    //压缩css
    new OptimizeCssAssetsPlugin(),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      BASEURL: JSON.stringify(""),
    })
  ],
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'less-loader',
          options: {
            modifyVars: themeColor,
           javascriptEnabled: true,
          }
        }]
      },
    ]
  }
})