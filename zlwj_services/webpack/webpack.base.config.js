const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin');


function resolve(str){
  return path.resolve(__dirname,"../",str) 
}


module.exports = {
  
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    resolve("src/index")
  ], 
  output: { //出口
      filename: 'app.[hash].js',
      path: resolve("dist"),
      publicPath: "/"
  },
  resolve: {
    alias: {
      "@": resolve("src")
    },
    extensions:[".js",".jsx", ".tsx", ".ts"],
  },
  
  plugins: [
    
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: "./src/index.html",
    //   // chunks: ["app"]
    // })
  ],
  module:{
    rules: [
      {
          test: /\.(ts|tsx)?$/,
          use: ['babel-loader', 'ts-loader'],
          exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: { '@primary-color': '#45a3fc' },
                javascriptEnabled: true,
              }
             
           }, // compiles Less to CSS
        }]
      }
    ]
  }
}