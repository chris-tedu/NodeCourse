var http = require('http');

//创建服务器的同时，在函数里设置回调函数。
//当接收到客户端的连接请求时，会自动调用这个回调函数。
http.createServer(function (request, response) {
  response.setHeader('Content-Type','text/plain;charset=utf8');
  response.end('你好');
}).listen(3000,function () {
  console.log('Server is running at 127.0.0.1:3000');
});