
const {resolve, join} = require("path")
const {merge} = require("webpack-merge")
const baseWebpack = require("./webpack.base")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const modifyVars = require('../src/assets/theme')

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")
const _ = require("lodash")

var {library} = require("./library")



module.exports = merge(baseWebpack, {
  mode: "production",
  devtool: false,
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,//console
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'style/style.[hash].css'
    }),
    //压缩css
    new OptimizeCssAssetsPlugin(),
    ...Object.keys(library).map((name)=>{
      return new webpack.DllReferencePlugin({
        manifest: join(__dirname, "dll",name+"-manifest.json" )   //require("./vendors-manifest.json")
      })
    }),
    
    new AddAssetHtmlPlugin([
      {filepath: resolve("dist","*vendors.dll.js" )}
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader", 
            options: {
              javascriptEnabled: true,
              modifyVars: modifyVars,
            }
        },]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     name: true,
  //     chunks: "all",
  //   }
  // }
  
})