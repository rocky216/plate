var path = require("path")
var express = require("express")
var ejs = require('ejs');
var proxyMiddleWare = require("http-proxy-middleware");
var config = require("../config")

var app = express()


var proxyOption ={target:config.baseUrl,changeOrigoin:true};
app.use("/system",proxyMiddleWare(proxyOption))

app.use(express.static(path.join(__dirname, '../dist')));

app.set('views', path.join(__dirname, '../dist'));

app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.get("/", (req, res)=>{
  res.render('index')
})

app.listen(3000)