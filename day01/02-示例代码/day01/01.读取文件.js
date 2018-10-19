//加载fs模块
var fs = require('fs');
var path = require('path');

/*
读取文件
a.txt 表示需要读取的文件路径
encoding 用来指定读取文件的编码格式
function(err,data) 是读取文件的回调函数。
  err参数用来表示读取失败时的错误信息，data表示读取到的数据内容
 */
fs.readFile('a.txt',{encoding:'utf8'},function (err,data) {
  if(err) throw err;  //如果在读取文件的过程中出现异常，就直接抛出异常
  console.log(data);  //输出文件里的内容
});

// /Users/jiangwei/Desktop/NodeCourse/day01/02-示例代码/day01/01.读取文件.js
// __filename 用来获取文件的绝对路径
console.log(__filename);

//__dirname 和 path.dirname(__filename) 的作用一样，都是用来获取文件所在的目录
///Users/jiangwei/Desktop/NodeCourse/day01/02-示例代码/day01
console.log(__dirname);
console.log(path.dirname(__filename));