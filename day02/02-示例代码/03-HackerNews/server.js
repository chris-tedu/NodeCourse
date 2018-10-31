var http = require('http');
var path = require('path');
var template = require('art-template');
var fs = require('fs');
var url = require('url');
var queryString = require('query-string');

var port = 8080;
var host = '127.0.0.1';

http.createServer(function (request, response) {
  //拿到用户的请求路径
  var pathname = url.parse(request.url).pathname;
  //设置响应头文件
  response.setHeader('Content-Type', 'text/html,charset=utf8');

  // 处理首页
  if (pathname == '/' || pathname == '/index') {
    fs.readFile(path.join(__dirname, '/data/list.txt'), {encoding: 'utf8'}, function (err, data) {
      if (err) throw err;

      //把从文件里读取到的数据转换成为JSON对象
      var list = JSON.parse(data || "[]");

      //将读取到的JSON对象渲染到 index.html 文件
      response.end(template(path.join(__dirname, '/views/index.html'), {news_list: list}))
    });
  }
  //处理提交界面
  else if (pathname == '/submit') {
    fs.readFile(path.join(__dirname, '/views/submit.html'), {encoding: 'utf8'}, function (err, data) {
      if (err) throw err;
      response.end(data);
    })
  }
  //处理添加新数据
  else if (pathname == '/add') {
    //判断用户的请求方式，添加数据只接收POST请求，不允许其他请求方式
    if (request.method != 'POST') {
      response.statusCode = 405;
      response.end('Method not allowed');
      return;
    }
    //如果是POST请求方式，则读取POST表单里提交的数据，写入到list.txt文件里
    else {
      var form = "";

      //Node 里读取POST提交的数据需要监听 data 事件
      //当接收到客户端发过来的数据时，将获取到的数据读取并保存
      request.on('data', function (chunk) {
        form += chunk;
      });

      // 当接收完客户端发送的请求数据以后，将获取到的数据写入到本地
      request.on('end', function () {
        // 使用querystring模块将获取到的字符串数据解析成JS对象
        var obj = queryString.parse(form);

        //读取 list.txt 文件，获取数据
        fs.readFile(path.join(__dirname, "data/list.txt"), {encoding: 'utf8'}, function (err, data) {
          //查看 list.txt 里一共保存了多少数据，获取到数据的长度，作为本次数据的id
          var list = JSON.parse(data || '[]');
          obj.id = list.length;

          // 将新的数据添加到原数组里
          list.push(obj);

          //把数据写入到 list.txt 文件里
          fs.writeFile(path.join(__dirname, '/data/list.txt'), JSON.stringify(list), {encoding: 'utf8'}, function (err) {
            if (err) throw err;

            //如果数据写入成功，需要重定向到首页
            response.writeHead(301, {Location: '/'});
            response.end();
          })
        });
      })
    }
  }
  //处理详情界面
  else if (pathname == '/detail') {
    //获取到请求参数里的id
    var id = url.parse(request.url, true).query['id'];

    //读取 list.txt 文件，获取该文件里的所有数据
    fs.readFile(path.join(__dirname, '/data/list.txt'), {encoding: 'utf8'}, function (err, data) {
      var list = JSON.parse(data || '[]');

      //调用数组的find方法，查找数据
      var result = list.find(function (value) {
        //找到数组里id值和请求参数一致的数据
        return value.id == id;
      });

      //如果找打了这个数据，就加载这条数据的详情并显示
      if(result) {
        response.end(template(__dirname + '/views/detail.html',{list:result}));
      }
      //如果没有找到这条数据，说明传递的参数不正确
      else {
        response.writeHead(400,'Bad Request');
      }
    });
  }
  //处理静态资源
  else if (pathname.startsWith('/resources')) {
    fs.readFile(path.join(__dirname, pathname), function (err, data) {
      if (err) throw err;
      response.end(data);
    })
  }
  //如果访问的路径没有处理，则返回404
  else {
    response.writeHead(404, 'Page not found');
    response.end();
  }
}).listen(port, host, function () {
  console.log(`server is running at ${host}:${port}`);
});
