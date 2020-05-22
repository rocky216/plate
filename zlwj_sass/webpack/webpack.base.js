var path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const themeColor = require("../src/assets/theme/index")


function resolve(str){
  return path.resolve(__dirname,"../",str) 
}

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].[hash].js",
    path: resolve("dist"),
    publicPath: "/"
  },
  resolve:{
    alias: {
      "@": resolve("src")
    },
    extensions: [".js", ".jsx",".less"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["app"]
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          // 'react-scoped-styles/script-loader',
          {loader: "babel-loader"}
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
         options: {
            modifyVars: themeColor,
           javascriptEnabled: true,
         },
        }],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      }
    ]
  }

}