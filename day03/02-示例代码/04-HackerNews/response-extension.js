var path = require('path');
var fs = require('fs');
var template = require('art-template');
module.exports = function (response) {
  //设置响应头文件
  response.setHeader('Content-Type', 'text/html,charset=utf8');
  response.jw_render = function (file, content) {
    file = path.join(__dirname, file);
    fs.readFile(file, function (err, data) {

      if (err) throw err;

      if (content) {
        response.end(template(file, content));
      } else {
        response.end(data);
      }
    })
  }
}