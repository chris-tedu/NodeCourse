var handler = require('./handler.js');
var url = require('url');

module.exports = function(request,response){
  //拿到用户的请求路径
  var pathname = url.parse(request.url).pathname;
  // 处理首页
  if (pathname == '/' || pathname == '/index') {
    handler.index(response);
  }
//处理提交界面
  else if (pathname == '/submit') {
    handler.submit(response);
  }
//处理添加新数据
  else if (pathname == '/add') {
    handler.add(request, response);
  }
//处理详情界面
  else if (pathname == '/detail') {
    handler.detail(request,response);
  }
//处理静态资源
  else if (pathname.startsWith('/resources')) {
    handler.sources(response, pathname);
  }
//如果访问的路径没有处理，则返回404
  else {
    handler.pageNotFound(response);
  }
}