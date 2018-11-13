//1. 加载 express 模块
var express = require('express');
//2. 实例化一个app对象
var app = express();

var path = require('path');
var fs = require('fs');
var host = '127.0.0.1';
var port = 8080;

//4. 处理请求
// get方法用来处理GET方式请求
// 第一个参数表示请求的路径
// 第二个参数表示回调函数
app.get('/',function (req, res) {
  res.end('hello world');
})

//3. 启动服务器
app.listen(port,host,function () {
  console.log(`server is running at ${host}:${port}`);
})