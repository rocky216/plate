const path = require("path")
const CracoLessPlugin = require('craco-less');
const CracoAlias = require("craco-alias");
const config = require("./config/index.ts")



module.exports = function({env}){

  return {
    plugins: [
      /* 定制主题 */
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            
            lessOptions: {
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true,
            }
            
          },
        },
      },
      /* 别名设置 */
      {
        plugin: CracoAlias,
        options: {
          source: "tsconfig",
          baseUrl: ".",
          tsConfigPath: "./paths.json"
        }
      },
    ],
    webpack: {
      devServer: (devServerConfig)=>{
        console.log(devServerConfig)
        return {
          ...devServerConfig,
          compress: true,
          host: config.host,
          port: 3003,
          proxy: {
            "/api": {
              target: config.baseUrl,
              pathRewrite: {'^/api' : '/api'},
              changeOrigin: true,
            },
          },
        }
      }
    }
    

  };
}