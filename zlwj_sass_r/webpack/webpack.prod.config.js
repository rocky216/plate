const path = require("path")
const webpackMerge = require("webpack-merge")
const webpackBaseConfig = require("./webpack.base.config")
var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin")

const webpack = require("webpack")
const manifest = require("./vendors-manifest.json")

const project = process.env.NODE_PROJECT

function resolve(str){
  return path.resolve(__dirname,"../",str) 
}

module.exports = webpackMerge(webpackBaseConfig, {
  mode: "production",
  entry: resolve(`src/${project}/index`), 
  output: { //出口
    filename: `${project}.[hash].js`,
    path: resolve(`dist`),
    publicPath: `/`
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${project}.html`,
      template: "./src/index.html",
      publicPath: `/`,
    }),
    new AddAssetHtmlPlugin([
      {filepath: resolve("dist/vendors.dll.js")}
    ]),
    // new HtmlWebpackTagsPlugin({ tags: ['vendors.dll.js'], append: false }),
    new webpack.DllReferencePlugin({
      manifest
    }),

    /* 清除打印 */
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,//console
        }
      }
    }),
    //抽取css
    new MiniCssExtractPlugin({
      filename:`${project}.[hash].css`
    }),

    //压缩css
    new OptimizeCssAssetsPlugin(),

    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: { '@primary-color': '#45a3fc' },
              javascriptEnabled: true,
            }
          }
        }]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
})