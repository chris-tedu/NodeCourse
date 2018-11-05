// 核心模块
// node自带的，在安装node时就已经被编译成二进制文件
// 加载快
var http = require('http');

// 社区模块
// 需要使用npm install <packagename> 从 npm 上下载以后才能使用的模块
// var mime = require('mime');

// 文件模块
// 自己定义的文件或者文件夹
// 特点：以 / 或者 ./ 或者 ../ 开头，表示要加载的是一个文件模块
// 如果加载模块时指定了扩展名，会直接加载该模块，如果找不到该模块，就直接报错
// var test = require('./test.json');  //会直接报错，找不到test.json文件
var test = require('./test.js');  //能够加载该模块

// 如果文件没有写后缀名，会以如下顺序加载:
// 1. 根据指定路径，查找后缀名为.js、.json、.node的文件进行匹配
var hello = require('./hello'); //会找到hello.json文件

// 2. 如果根据指定路径，没有找到对应后缀的文件，则会去查找对应的文件夹
// 在demo文件夹里，先找package.json 文件里，main 所指向的文件
var demo = require('./demo');  //会找到 demo 目录


// 如果在这个文件夹里，没有package.json,或者package.json里没有设置main属性
// 会自动查找index.js、index.json或者index.node文件
// 如果在package.json里找不到main属性，又找不到 index文件，会报错
var myModule = require('./my-module');


// 3. 如果根据路径，找不到后缀名文件，也找不到文件夹，则会报错
// var hehe = require('./hehe');  //没有hehe文件，也没有hehe文件夹，直接报错