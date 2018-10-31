var http = require('http');
var template = require('art-template');
var url = require('url');
var path = require('path');
var host = '127.0.0.1';
var port = 8080;
http.createServer(function (request, response) {
  response.setHeader('Content-Type', 'text/html;charset=utf8');
  var pathname = url.parse(request.url).pathname;
  var html;
  if (pathname == '/') {
    //使用template函数渲染
    //template(filename,content) 方法需要两个参数
    // 第一参数表示用来加载的模板文件路径；
    // 第二个参数用来表示模板里的数据
    html = template(
      path.join(__dirname, 'pages/使用template函数渲染.html'),
      {student: {name: "张三", age: 28}}
    );
  } else if (pathname == '/render') {
    //使用render函数渲染
    //render(source,data,options) 至少需要传递两个参数
    //第一个参数用来表示需要解析的模板语句
    //第二个参数用来表示模板语句里的动态数据
    //第三个参数options用来表示配置项
    html = template.render('<h1>您的成绩是{{score}}分</h1>', {score: 89});
  } else if (pathname == '/compile') {
    //compile(source) 函数值需要一个参数，用来表示需要解析的模板语句
    //compile函数的返回值表示解析后的结果，而是一个函数
    // var result = template.compile('<h1>今天最高气温{{high}}度,最低气温{{low}}度</h1>');
    // html = result({high:30,low:20});

    //上述两段代码可以合成下面一段
    html = template.compile('<h1>今天最高气温{{high}}度,最低气温{{low}}度</h1>')({high: 30, low: 20});
  } else if (pathname == '/condition') {
    var score = url.parse(request.url, true).query['score'];
    //从请求路劲里获取分数，根据不同的分数，显示不同的内容
    html = template(path.join(__dirname, '/pages/条件判断.html'), {score: score});
  } else if (pathname == '/scores') {
    //传递一个数字类型的数组，交个前端界面进行渲染
    html = template(path.join(__dirname, '/pages/普通遍历.html'), {scores: [98, 95, 89, 87, 85, 79]});
  } else if (pathname == '/students') {
    //定义一个数组，这个数组里的每个元素都是一个student对象
    var students = [
      {name: 'zhangsan', age: 18, score: 98},
      {name: 'lisi', age: 19, score: 95},
      {name: 'wangwu', age: 19, score: 94},
      {name: 'jerry', age: 18, score: 90},
      {name: 'allen', age: 17, score: 90},
      {name: 'chris', age: 18, score: 89},
      {name: 'tom', age: 19, score: 88},
      {name: 'tonny', age: 17, score: 87},
    ];

    html = template(path.join(__dirname, '/pages/遍历数组对象.html'), {students: students});
  }
  response.end(html);
}).listen(port, function () {
  console.log(`server is running at ${host}:${port}`);
});