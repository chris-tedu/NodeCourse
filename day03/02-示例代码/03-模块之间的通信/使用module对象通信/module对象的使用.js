// 在node里，每个模块都有一个内置对象 module
// console.log(module);
/*Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/jiangwei/Desktop/NodeCourse/day03/02-示例代码/02-模块之间的通信/module对象的使用.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/jiangwei/Desktop/NodeCourse/day03/02-示例代码/02-模块之间的通信/node_modules',
     '/Users/jiangwei/Desktop/NodeCourse/day03/02-示例代码/node_modules',
     '/Users/jiangwei/Desktop/NodeCourse/day03/node_modules',
     '/Users/jiangwei/Desktop/NodeCourse/node_modules',
     '/Users/jiangwei/Desktop/node_modules',
     '/Users/jiangwei/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
*/

//module有多个对象和属性，最重要最常用的是 exports 属性
//module.exports 属性用来设置一个模块的导出内容，调用 require 方法加载这个模块时，默认就是使用module.exports 这个属性值

//module.exports 属性默认是一个空对象。
// module.exports = {};

// 1. 可以将 module.exports 属性指向另一个对象
// module.exports = {name:'zhangsan',score:98};

// 2. 也可以给 exports 这个对象添加其他的属性和方法
module.exports.age = 18;
module.exports.fn = function () {
  console.log('hahahah');
}