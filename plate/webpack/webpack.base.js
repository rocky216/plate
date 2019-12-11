var path = require("path")
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniExtract = require('mini-css-extract-plugin');


function resolve(str){
  return path.resolve(__dirname,'..', str)
}

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: resolve('dist'),
    filename: '[name]-[hash:5].bundle.js',
    chunkFilename: "[name]-[hash:5].chunk.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["app"]
    }),
    new MiniExtract({
      filename:'[name].css'
    }),
  ],
  resolve:{
    alias: {
      "@": path.join(__dirname, "../src")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/, 
        use: [
          // 'react-scoped-styles/script-loader',
          {loader: "babel-loader"}
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [{
      //     loader: MiniExtract.loader,
      //   }, 'css-loader']
      //   // use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.(less|css)$/,
        use: [{
          loader: MiniExtract.loader,
        }, 'css-loader', 'less-loader']
      }
    ]
  }
};