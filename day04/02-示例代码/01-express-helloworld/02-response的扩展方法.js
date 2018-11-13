var express = require('express');
var app = express();
//express 对request和response对象的功能进行了增强
//send 方法
app.get('/',function (req, res) {
  //在express里响应服务器请求，一般使用send方法，而不是end
  //send方法的优点
  // 1. 不会出现乱码
  // 2. send方法还可以返回数组、对象等

  //返回一个字符串
  // res.send('hello');
  //返回一个数组
  // res.send([1,2,3]);
  //返回一个对象
  res.send({name:'zhangsan',age:18});
})

//重定向到另一个请求
app.get('/test',function (req, res) {
  //express给 response 对象新增了 redirect 方法，直接用来重定向
  res.redirect('http://www.baidu.com');

  // res.writeHead(301,{Location:"http://www.baidu.com"});
})


//加载一个文件并返回
app.get('/demo',function (req, res) {
  //sendFile方法直接用来加载一个文件并返回
  // res.sendFile(path.join(__dirname,'test.html'));

  // res.sendFile 方法还可以再传递一个回调函数
  res.sendFile(path.join(__dirname,'test.html'),function (err) {
    if (err) throw err;
  });

  // fs.readFile(path.join(__dirname,'test.html'),function (err, data) {
  //   if (err) throw err;
  //   res.end(data);
  // })
})

//status 方法
app.get('/other',function (req, res) {
  //status方法可以直接用来设置响应状态码
  res.status(404).send('Page Not Found');

  // res.writeHead(404);
  // res.end('Page Not Found');
})