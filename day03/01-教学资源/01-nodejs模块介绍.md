# node.js模块 

在NodeJS开发中，一个文件就可以理解为一个模块，一个Node应用是由模块组成的。

## node.js 模块分类 

nodejs里模块大致可以分为三类：核心模块、社区模块和文件模块。

### 核心模块

 Core Module ,  也叫 内置模块、原生模块

- fs	    读写文件
- http     创建服务并监听服务
- path     拼接路径
- url        解析 req.url 设置参数 true, 把 query 的查询字符串转化为对象 ( /add?id=12&name='yaya')

核心模块特点：

- 所有内置模块在`安装` node.js 的时候,就已经编译成二进制文件了, 可以直接加载运行(速度较快);
- 部分内置模块, 在 node.exe 这个进程`启动`的时候,就已经默认加载了,所以可以直接使用  ( module )
- 提前准备好了，加载速度快 

### 社区模块

> var mime = require('mime');

- 说明 : 需要额外通过 npm 安装的模块


- mime   根据路径/文件 后缀名 转化为对应的样式( Content-Type) , (mime.getType() )
- art-template   模板引擎 : 给 html 文件赋值

### 文件模块

文件模块也叫自定义模块，是自己在项目定义的模块。

> var a = require('./a'); 

- 说明 : 根据文件路径引入的模块
- 如果加载时,没有指定后缀名, 那么就按照如下顺序加载相应模块  ( 例如 :  require ( ' ./demo  ' ))
  1. .js
  2. .json
  3. .node (C/C++编写的模块)

# require方法的使用

## 加载模块顺序

1. 看 require() 加载模块时传入的参数是否 **以 './' 或 '../' 或'/' ** 等等这样的方式 **开头**  (相对路径和绝对路径都可以)   
2. 是, **说明是 文件模块** , 那么会按照传入的路径直接去查询对应的模块  —> 
   - require('./test.js')   ==> 如果是具体的文件名
     - 直接根据给定的路径去加载模块,找到了,加载成功,找不到加载失败
   - require('./test')  ==> 不是具体的文件名
     - 第一步: 根据指定的路径,依次添加文件后缀 .js、.json、.node 进行匹配,如果找不到匹配,执行第二步
     - 第二步: 找不到会认为是 test 文件夹, 查找是否有 test 目录,, (尝试找 test 包)
       - 找不到: 加载失败
       - 找到了,依次在 test 目录下查找 package.json 文件（找到该文件后尝试找 main 字段中的入口文件）、index.js、index.json、index.node，找不到则加载失败
3. 不是, 那么就认为传入的是 **模块名称**, （比如：require('http')、require('mime')）
   - 先从内置模块里找,找到说明是内置模块: 直接加载内置模块

   - 不是内置模块
     - 依次递归查找 node_modules 目录中是否有相应的包
     - 从当前目录开始,依次递归查找所有父目录下的 node_modules 目录中是否包含相应的包


```js
// 情况一: require() 参数是一个路径
require('./b')

// 先找:
// b.js
// b.json
// b.node
// b 文件夹 --> package.json -> main(入口文件: app.js --> index.js/index.json/index.node)


// 情况二: require() 参数不是一个路径 ,那就是模块  (包括: require('b.js') )
require('b.js')  //  或 require('http') 或 require('mime')
//1. 先从内置模块里找,找到就加载
//2. 内置模块里找不到,就是第三方模块  --> node_modules 找 --> 父级目录里找
```

## require 加载模块注意点

1. 所有模块第一次加载完毕后, 都会有缓存; 

2. 每次加载模块的时候,都优先从缓存中加载,缓存中没有的情况下, 才会按照 node.js 加载模块的规则去查找;

3. 内置模块 在 node.js 源码编码的时候,都已经编译为二进制执行文件了,所以加载速度较快  
   - 内置模块加载的优先级 , 仅次于缓存加载

4. 如果 想加载的 第三方模块 和内置模块 重名

   - 只加载内置模块


   - 除非: 通过路径的方式加载第三方模块

     ```jade
     var  mime = require('./node_modules/mime/index');
     console.log(mime.getType('demo.css'))
     ```

5. 内置模块,只能通过`模块名称`来加载,  (错误示例: require('./http') )

6. require() 加载模块使用 ./ 相对路径时，相对路径是相对当前模块，不受执行 node 命令的路径影响

> 演示:
>
> 1. a 引入 b 打印 log(99)
> 2. 多次 引入 b , 打印几次? 缓存?

# 补充 CommonJS 规范

1. [CommonJS 规范](http://www.commonjs.org/)
2. [CommonJS规范-ruanyifeng](http://javascript.ruanyifeng.com/nodejs/module.html)

# 模块之间的通讯

一个文件就可以称作是一个模块，那么在node里，不同的文件之间，要怎样传递数据呢？

demo.js

```javascript
var a = 23;
function add(x,y) {
	return x + y;
}

//这里定义的变量a和函数add都是在demo.js文件里，example不能访问
//在node里有一个可以可以被全局访问的对象 global
//可以通过给这个对象添加属性的方式来实现数据传递
global.a = a;
global.add = add;
```

example.js

```javascript
console.log(global.a);
console.log(global.add(2,3));
```

可以使用node里的global全局对象，在不同的模块之间传递数据。但是，**不推荐大家使用这种写法**。

Node遵循了CommonJS的模块化规范来隔离每个模块的作用域，每个模块在它自身的命名空间中执行。

CommonJS模块有以下特点：

- 所有代码运行在当前模块作用域中，不会污染全局作用域 。
- 模块同步加载，根据代码中出现的顺序依次加载 。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。

##module对象

Node内部提供一个`Module`构建函数，所有模块都是`Module`的实例。每个模块内部，都有一个`module`对象，代表当前模块，它有以下属性：

```javascript
module.id 模块的识别符，通常是带有绝对路径的模块文件名。
module.filename 模块的文件名，带有绝对路径。
module.loaded 返回一个布尔值，表示模块是否已经完成加载。
module.parent 返回一个对象，表示调用该模块的模块。
module.children 返回一个数组，表示该模块要用到的其他模块。
module.exports 表示模块对外输出的值。
```

 其中，module.parent属性用来获取当前模板的父模板，如果当前模板是脚本入口，则为null,可以使用它来判断当前模板是否是脚本的入口；module.exports表示模板对外输出的值，当调用`require`方法加载一个模块时，其实读取的就是module.exports属性的值。

## module.exports 介绍  

导出模块  =>  默认以对象的形式导出

外面加载模块 就是 加载 module.exports 导出的值。

```js
 //1. 它是默认是一个空对象
console.log(module.exports); // => {}

 //2. 可以直接导出一个对象
 module.exports = {
    age:19,
    name:' 哈哈',
    say:function () {
      console.log('say hello')
    }
  }

//3. 既然 module.exports 是一个空对象,也可以通过添加对象的属性
module.exports.age = 12;
module.exports.name = '哈哈';
module.exports.say = function() {
  console.log('hello')
}

//4. 可以导出对象方法,利用它传值 (重点)
module.exports.play = function (playName) {
  console.log('玩'+playName);
}
module.exports.eat = function (food) {
  console.log('吃'+food)
}
```

## module.exports 与 exports 的区别

除了module.exports 属性以外，在每个模块里还有一个exports对象，也代表模块被加载时的值。

`demo.js`

```javascript
//给 module.exports 添加属性
module.exports.name = '哈哈';

//给 exports 添加属性
exports.age = 13;
exports.say = function () {
 console.log('say hello')
}
```

`test.js`

```javascript
var demo = require('./demo.js');
//无论是通过 module.exports 还是 exports 添加的属性，模块在被加载时都会显示
console.log(demo);   // {name:"哈哈",age:13,say:[Function]}
```

exports 相当于是module.exports的一个别名和快捷方式，加载模块时，其实查询的依然是module.exports的值。**不能直接将exports指向其他的值，这样是无效的！**

`demo.js`

```js
module.exports = 'hello world'
exports = 'world'
```

`test.js`

```javascript
var demo = require('./demo.js');
console.log(demo);  //hello world
```