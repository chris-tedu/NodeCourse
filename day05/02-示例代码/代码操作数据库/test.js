var dao = require('./dao');
var mongoose = require('mongoose');
var http = require('http');
var User = require('./user');
http.createServer(function (request, response) {
  response.setHeader('content-type', "text/html;charset=utf8");
  if (request.url == '/insert') {
    dao.insert({name: '张三', age: 18, password: '123456', birthday: new Date("1991-03-04")}, {score: 98});
    response.end('插入成功');
  } else if (request.url == '/disconnect') {
    mongoose.disconnect();
    response.end('断开连接');
  } else if (request.url == '/add') {
    var arr = [
      {name: 'lisi', age: 20, password: '87654', birthday: new Date('1990-08-01'), score: 97},
      {name: 'wangwu', age: 17, password: '3890e', birthday: new Date('1992-09-10'), score: 96}
    ];
    dao.saveAll(arr);
    response.end('insert many');
  } else if (request.url == '/findall') {
    dao.findAll({age: {$gte: 17}}, function (data) {
      response.end(JSON.stringify(data));
    })
  } else if (request.url == '/findone') {
    dao.findOne({age: 17}, function (data) {
      response.end(JSON.stringify(data));
    })
  }else if(request.url == '/del') {
    dao.findAndDel({age: 17},function (data) {
      response.end('删除'+ data +'成功');
    });
  }else if(request.url == '/update') {
    User.findOneAndUpdate({age:17},{name:'赵二'},function (err, data) {
      response.end(JSON.stringify(data));
    });
  }
}).listen(8080, function () {
  console.log('Server is running at localhost:8080');
})
