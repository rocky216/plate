const path = require("path")
const webpack = require("webpack")
const tsImportPluginFactory = require ('ts-import-plugin');
const theme = require("../src/public/assets/theme")

const project = process.env.NODE_PROJECT

function resolve(str){
  return path.resolve(__dirname,"../",str)
}


module.exports = {
  
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    resolve(`src/${project}/index`)
  ], 
  output: { //出口
      filename: 'app.[hash].js',
      path: resolve("dist"),
      publicPath: "/"
  },
  resolve: {
    alias: {
      "@": resolve("src"),
      "@public": resolve("src/public"),
      "@admin": resolve("src/admin"),
    },
    extensions:[".js", ".tsx", ".ts"],
  },
  
  plugins: [
    
  ],
  module:{
    rules: [
      {
          test: /\.(ts|tsx|js)?$/,
          use: [
            {
              loader:'babel-loader',
              options: {
                cacheDirectory: true
              }
            },
            {
              loader:'ts-loader',
              options: {
                transpileOnly: true,
                // happyPackMode:true,
                // getCustomTransformers: () => ({
                //   before: [
                //     tsImportPluginFactory ({
                //       libraryName: 'antd',
                //       libraryDirectory: 'es',
                //       style: true,
                //     }),
                //   ],
                // }),
                // compilerOptions: {
                //   module: 'esnext',
                // },
              },
            }
          ],
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
                modifyVars: theme,
                javascriptEnabled: true,
              }
             
           }, // compiles Less to CSS
        }]
      }
    ]
  }
}