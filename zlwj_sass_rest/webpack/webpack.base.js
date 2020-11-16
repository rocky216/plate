const {resolve} = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin');
const modifyVars = require('../src/assets/theme')
var webpack= require("webpack")

const project = process.env.NODE_PROJECT;

console.log(project)

module.exports = {
  entry: {
    [project]: resolve("src/"+project+"/index.tsx")
  },
  output: {
    filename: "[name].[hash].js",
    path: resolve(`dist/${project}`),
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js)?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx|ts|js)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [ {
            loader: "style-loader"
        },
        {
            loader: "css-loader"
        },
        {
            loader: "less-loader", 
            options: {
              javascriptEnabled: true,
              modifyVars: modifyVars,
            }
        },]
      }
    ]
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      "@common": resolve("src/common"),
      "@sass": resolve("src/sass"),
      "@admin": resolve("src/admin")
    },
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "智联万家sass平台",
      filename: `${project}.html`,
      template: resolve("src/index.html"),
      // hash: true,
    }),
    
  ],
}