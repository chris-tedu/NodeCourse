var express = require('express');
var app = express();

//1.使用 app.METHOD 方法
app.get('/',function (req, res) {
  res.send('只有使用GET方式请求访问的首页，才能看到我');
})

app.get('/index',function (req,res) {
  res.send('只有GET方式请求 /index 路径才能看到我');
})

app.post('/test',function (req, res) {
  res.send('只有使用POST方式请求/test路径，才能看到我');
})

//2. 使用 app.use 方法
app.use('/demo',function (req, res) {
  res.send('不管使用哪种请求方式，只要请求的是以 /demo 开头的路径，就能看到我');
})

//3. 使用 app.all 方法
app.all('/check',function (req, res) {
  res.send('不管使用哪种请求方式，只要请求路径是 /check,就能看到我');
})

//use 和 all 的异同
// 相同点： 都不判断请求的方式
// 区别：
// use匹配的是指定路径开头的请求。例如 app.use('/demo') 可以匹配 /demo 也可以匹配 /demo/hehe
// all匹配的是完全相等的请求。例如 app.all('/demo') 只能匹配 /demo,不能够匹配 /demo/hehe

app.listen(8080,function () {
  console.log('server is running at localhost:8080');
})