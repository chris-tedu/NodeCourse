var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
  response.setHeader('Content-Type','text/plain;charset=utf8');

  //使用url模块解析请求的url路径，再从结果里获取到pathname
  var pathname = url.parse(request.url,true).pathname;

  //根据pathname让不同的请求对应不同的资源
  if(pathname == '/' || pathname == '/index') {
    response.end('欢迎来到首页');
  }else if (pathname =='/news') {
    response.end('欢迎来到新闻页');
  }else {
    response.statusCode = 404;
    response.end('界面未找到');
  }

}).listen(3000,function () {
  console.log('Server is running at localhost:3000');
})