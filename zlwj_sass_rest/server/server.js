var path = require("path")
var express = require("express")
var ejs = require('ejs');
var compression = require('compression');
var proxyMiddleWare = require("http-proxy-middleware");
// var config = require("../config")

var app = express()
app.use(compression());


// var proxyOption ={
//       target:config.baseUrl,
//       changeOrigoin:true,
//       pathRewrite: {'^/api' : '/api'},
//     };
// app.use("/api",proxyMiddleWare(proxyOption))

app.use(express.static(path.join(__dirname, '../dist')));

app.set('views', path.join(__dirname, '../dist'));

app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.get("/", (req, res)=>{
  res.render('sass')
})
app.get("/admin", (req, res)=>{
  res.render('admin')
})

app.listen(5000)