var fs = require('fs');
var path = require('path');
var config = require('./config.js');
var queryString = require('query-string');
var url = require('url');
module.exports.index = function (response) {
  jw_readFile(function (data) {
    //把从文件里读取到的数据转换成为JSON对象
    var list = JSON.parse(data || "[]");
    //将读取到的JSON对象渲染到 index.html 文件
    response.jw_render('/views/index.html', {news_list: list});
  })
};
module.exports.submit = function (response) {
  response.jw_render('/views/submit.html');
};
module.exports.add = function (request, response) {
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
      jw_readFile(function (data) {
        //查看 list.txt 里一共保存了多少数据，获取到数据的长度，作为本次数据的id
        var list = JSON.parse(data || '[]');
        obj.id = list.length;

        // 将新的数据添加到原数组里
        list.push(obj);

        //把数据写入到 list.txt 文件里
        jw_writeFile(JSON.stringify(list), function () {
          //如果数据写入成功，需要重定向到首页
          response.writeHead(301, {Location: '/'});
          response.end();
        })
      })
    })
  }
};
module.exports.detail = function (request,response) {
  //获取到请求参数里的id
  var id = url.parse(request.url, true).query['id'];

  //读取 list.txt 文件，获取该文件里的所有数据
  jw_readFile(function (data) {
    var list = JSON.parse(data || '[]');
    //调用数组的find方法，查找数据
    var result = list.find(function (value) {
      //找到数组里id值和请求参数一致的数据
      return value.id == id;
    })

    //如果找打了这个数据，就加载这条数据的详情并显示
    if (result) {
      response.jw_render('/views/detail.html', {list: result});
    }
    //如果没有找到这条数据，说明传递的参数不正确
    else {
      response.writeHead(400, 'Bad Request');
    }
  });

};
module.exports.sources = function (response,pathname) {
  fs.readFile(path.join(__dirname, pathname), function (err, data) {
    if (err) throw err;
    response.end(data);
  })
};
module.exports.pageNotFound = function (response) {
  response.writeHead(404, 'Page not found');
  response.end();
};


function jw_readFile(callback) {
  fs.readFile(path.join(__dirname, config.dataPath), {encoding: 'utf8'}, function (err, data) {
    if (err) throw err;

    callback(data);
  });
}

function jw_writeFile(content, callback) {
  fs.writeFile(path.join(__dirname, config.dataPath), content, {encoding: 'utf8'}, function (err) {
    if (err) throw err;
    callback();
  })
}