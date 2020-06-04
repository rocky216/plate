const path = require("path");
const express = require("express");
const ejs = require("ejs");
const webpack = require("webpack");
const webpackDevMiddleware  = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../webpack/webpack.dev.config');
var proxyMiddleWare = require("http-proxy-middleware").createProxyMiddleware;
const open = require("open");
const config = require("../config")



const app = express();

const ENV = process.env.NODE_ENV

app.use(express.static( path.resolve(__dirname, "../dist") ));

app.set('view engine','ejs');
app.engine("html", ejs.__express);

if(ENV == "development"){
  app.set('views', __dirname+'/views');
  /* 加载webpack配置 */
  var compiler = webpack(webpackDevConfig);

  /* 加载webpack配置 */
  app.use( webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    quiet: true,
    compress: true,
    progress:false,
    overlay: true,
    open:true,
    stats: {
      colors: true
    }
  }))

  /* 热更新配置 */
  app.use(webpackHotMiddleware(compiler));

  /* 打开浏览器 */
  open(`http://${config.host}:${config.port}/${config.type}`);

  console.log(proxyMiddleWare)

  /* 开发环境代理接口 */
  app.use("/api",proxyMiddleWare({
    target:config.baseUrl,
    changeOrigoin:true,
    pathRewrite: {'^/api' : '/api'},
  }));

}else{
  
  app.set('views', path.resolve(__dirname, "../dist"));
  
}

app.get("/power", (req, res)=>{
  res.render("index.html",{mytype: req.url})
});

app.listen(config.port, ()=>{
  
  
})
