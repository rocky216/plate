var path = require("path")
var webpack = require("webpack")
var webpackMerge = require("webpack-merge")
var webpackBase = require("./webpack.base")
var config = require("../config")
var manifest = require("./vendors-manifest.json")
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(str){ 
  return path.resolve(__dirname,'..', str)
}

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  devtool:"nosources-source-map",
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
    })
  ]
})