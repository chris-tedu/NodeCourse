var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');

var host = 'localhost';
var port = 3000;
http.createServer(function (request, response) {
  //获取到客户端的请求路径
  var pathname = url.parse(request.url).pathname;

  // 如果访问的是首页，直接读取index.html文件，返回首页内容
  if (pathname == '/' || pathname == '/index') {

    //可以设置Content-Type头信息
    response.setHeader('Content-Type','text/html;charset=utf8');

    fs.readFile('index.html', function (err, data) {
      if (err) throw err;
      response.end(data);
    })
  } else if (pathname.startsWith('/public')) {

    //可以使用mime模块，获取一个文件的mime类型
    response.setHeader('Content-type',mime.getType(pathname));

    //如果访问的是静态资源，则读取静态文件
    //注意：不能直接使用pathname,需要和__dirname拼接路径
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
      if (err) throw err;
      response.end(data);
    })
  } else {
    response.statusCode = 404;
    response.end('界面未找到');
  }
}).listen(port, host, function () {
  console.log(`Server is running at ${host}:${port}`);
});