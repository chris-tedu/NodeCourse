var http = require('http');
var url = require('url');

http.createServer(function (request, response) {
  // console.log(request.constructor.name);   //IncomingMessage
  // console.log(response.constructor.name);  //ServerResponse

  //浏览器访问   127.0.0.1:3000/index?username=zhangsan&password=123&gender=male&age=18
  //IncommingMessage类型里有很多的属性和方法，比较常见的有：
  console.log(request.url);  //请求的完整URL路径  /index?username=zhangsan&password=123&gender=male&age=18
  console.log(request.method);  //获取到客户端的请求方式   GET


  //当拿到请求的完整URL路径以后，有些时候我们还需要获取到具体的请求参数
  //可以使用node提供的url模块来解析请求路径
  //第一个参数用来表示需要解析的路径
  //第二个参数是可选参数，用来表示是否解析路径里的参数。true表示解析请求路径里的参数
  var result = url.parse(request.url,true);  //结果是一个对象，用来保存所有的请求参数
  console.log(result.query);  //{ username: 'zhangsan',password: '123',gender: 'male',age: '18'}
  console.log(result.path);   //请求的完整路径   /index?username=zhangsan&password=123&gender=male&age=18
  console.log(result.pathname);  //不带请求参数的路径  /index

}).listen(3000,function () {
  console.log('Server is running at localhost:3000');
})