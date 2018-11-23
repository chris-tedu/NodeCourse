var express = require('express');
var app = express();
var config = require('./config');
var router = require('./router.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var server = require('http').Server(app);
var socket = require('./common/chat-server');

// 指定模板引擎为art-template
app.engine('html', require('express-art-template'));
// 指定模板的后缀名为html.如果不设置这个参数，每个模板文件都需要添加后缀名
app.set('view engine', 'html');

// 可以不设置，默认的views 路径就是 views 目录
// app.set('views',path.join(__dirname,'./views'));

// 使用bodyParse解析POST请求的数据
app.use(bodyParser.urlencoded({
  extended: false
}));

//使用express-session保存用户的登录状态
app.use(session({
  secret: 'chat secret', // 用来注册session id 到cookie里，相当于一个秘钥
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.maxAge,
  }
}));


// 指定路由。注意：指定路由的代码需要写在设置引擎代码的后面
app.use(router);

server.listen(config.port, config.host, function () {
  console.log(`server is running at ${config.host}:${config.port}`);
});
socket.connect(server);