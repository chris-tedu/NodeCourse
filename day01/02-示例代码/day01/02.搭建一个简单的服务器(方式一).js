var http = require('http');

//1. 创建一个Http的服务对象
var server = http.createServer();

//2. 指定监听的端口号
server.listen(3000,function () {
  console.log('Server is running at 127.0.0.1:3000');
});

//3. 监听用户发过来的请求
server.on('request',function (req, res) {
  //当接收到request请求以后，会自动调用这个回调函数。在这个回调函数里处理用户的请求

  //设置响应头，告诉浏览器响应的类型及编码方式
  res.setHeader('Content-Type','text/plain;charset=utf8');

  //设置响应的内容。
  res.end('欢迎来到我的服务器');
});

