# Express

- 什么 express?
  -  Express 是基于 `Node.js` 平台，快速、开放、极简的一个'' web 开发框架'' , 
  -  同时也是 'Node.js' 的一个 第三方模块。
- 为什么学习 express 框架?
  - 让我们基于 Node.js 开发 web 应用程序更高效
  - 不会 express, 等于没有学过 node
- express 官方网站
  - [英文官网 - http://expressjs.com/](http://expressjs.com/)
  - [中文官网 - http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)

## Express 特点  

> 先了解,知道个概念,,后面会细讲

1. 实现了`路由`功能   (eg: express.Router())
2. `中间件`（函数）功能
3. 对` req 和 res` 对象的`扩展`
4. 可以集成其他`模板引擎` (eg: art-template )

##  Express 基本使用

### 1. 基本步骤

- 安装:   `npm i express -S`        // 安装之前: 先`npm init -y` 初始化 package.json 文件
- 加载:   `var express = require('express')`
- 实例:   `var app = express()`      // 实例化 express 对象
- 使用:   ` app.get()/app.use()/app.all() …. App.listen()`

### 2.  Hello World 案例

```js
//1. 加载express
var express = require('express');

//2. 实例
var app = express();   //  (类似于创建一个 server 对象)

//4. 处理请求
// 参数1: 路径
// 参数2: 回调函数
app.get('/',function (req,res) {
  res.end('Hello world')
})

//3. 开启服务器
app.listen(8080,function () {
  console.log('服务器开启了 http://localhost:8080')
})
```

### 3.  res.send() 和 res.end() 的异同 ? 

- 相同点: 都能够结束响应,把内容响应给浏览器

- 不同点: 

  - 1. send () 不乱码:

    ```js
    res.send() 会自动发送更多的响应报文头,其中就包括: Content-Type:text/html; charset=utf-8 所以没有乱码;
    ```

  - 2. 参数类型不同:

    ```js
    - res.send() 参数可以是 a Buffer object、a String , 还有 an object、an Array
    - res.end() 参数类型只能是: Buffer 或者 String 
    ```

- 总结: 以后在 express 推荐使用: send()  发送HTTP响应;

### 4.  res 的其他几个常用的方法

- **res.redirect([status,] path) : 重定向**

  ```js
    res.redirect('https://www.baidu.com');
    res.redirect(301, 'https://www.baidu.com');
  //之前的
  res.writeHead(301, {'Location': '/'});
  ```

- **res.sendFile(path [, options]_[, fn])  读取文件**

  ```js
  // 以前 : 读取文件并响应
    fs.readFile(path.join(__dirname,'./index.html'),function (err,data) {
      if (err) {
        throw err
      }
      res.end(data);
    })
  
  // 现在 : 
  // 2.1 不需要回调函数
  res.sendFile(path.join(__dirname,'./demo.html'))
  // 2.2 需要回调函数
  res.sendFile(path.join(__dirname,'./demo.html'),function (err) {
      if (err) {
        throw err
      }
      console.log('ok')
    })
  ```

- **res.status() : 设置状态** 

  ```js
   res.status(404).send('文件不存在！');
  ```

##  Express 中注册路由的方法

### 方法一 :  app.METHOD()

> 类型固定,路径完全匹配

​	**1. 基本用法**

- Method 是一个 http 请求方法: 例如:  get / post / put /  delete 等等

- ```js
  1. 请求方式固定
  2. 路径完全匹配
  ```

  ```js
  // 参数1: 路径
  // 参数2: callback 回调  
  app.get('/index',function (req,res) {
    
      res.send('index')
  })
  ```

  ​

### 方法二 :   app.use() — (中间件一般与这个配合使用)

> 开头是: /index 就匹配
>
> 任意类型,路径开始相同就匹配

- 1. 在进行路由匹配的时候,不限定方法,什么请求方法都可以 
- 2. 请求路径的第一部分只要与 /index 相等即可,,,并不要求请求路径 ( pathname ) 完全匹配

```js
app.use('/index',function (req,res) {
  res.send('hello 你好世界')
})
```

### 方法三 : app.all()  

> 任意类型, 路径完全匹配

- 1. 不限定请求方法;
  2. 请求路径的 pathname 必须完全匹配;

  ```js
  app.all('/index',function () {
    res.send('index');
  })
  ```


## Router中间件

尽管app对象提供app.METHOD、app.use和app.all三种注册路由的方式，我们在开发中，经常也不会把路由功能直接交给app来处理，而是使用express提供的Router中间件来实现。

在传统模式中，我们可以将处理路由的代码独立成一个单独的模块，例如router.js

router.js

```js
module.exports = function(app) {
	app.get('/',function(req,res){res.send('首页');})
    app.post('/test',function(req,res){res.send('post请求到了test页面');})
}
```

app.js

```javascript
var express = require('express');
var app = express();
var router = require('./router');
//router模块是一个函数
//将app直接传递给router模块
router(app);
```

上述代码中，是将app对象整个传递给了router模块，这样的做法很不推荐，因为不安全，app对象有被滥用的风险。为了更好的解决这个问题，Express4.0给出了更好的解决方案:express.Router.

Router对象可以被看做是一个迷你的app对象，它拥有一个独立的中间件队列。

router.js

```javascript
var router = require('express').Router();
router.get('/',function(req,res){res.send('首页')});
module.exports = router;
```

app.js

```javascript
var router = require('./router');
var app = require('express')();
app.use(router);
```

## Express 处理静态资源

1. 使用 express 按照以前的逻辑写:

   ```js
   //3. 注册路由
   app.get('/',function (req,res) {
   
     res.sendFile(path.join(__dirname,'./demo.html'));
   })
   
   // if(req.url.startWith('/public)) { 拼接路径 返回绝对路径的文件 }
   
   // 处理静态资源
   //app.use(path,callback)  //use 请求路径的第一部分只要与 path 路径匹配即可
   app.use('/public',function(req,res){
     res.sendFile(path.join(__dirname,'./public/demo.css')); // 是异步的
   })
   ```

2. #####使用 express 的内置模块   [express.static](http://www.expressjs.com.cn/starter/static-files.html)

   ```js
   //官网原话:
   通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
   
   将`静态资源文件所在的目录`作为参数传递给 `express.static 中间件`,就可以提供静态资源文件的访问了。
   ```

    ##### 

>  href="./public/demo.css"     src="./public/dog.jpg"

````js
// 因为1 express.static 是中间件 中间件也就是函数 所以,,可以替换后面的函数
 官网的话:  app.use('/public',express.static());
//因为2.上面说到`静态资源文件所在的目录`作为参数传,所以传目录
// 目录:  path.join(__dirname,'./public')
app.use('/public',express.static(path.join(__dirname,'./public')));
````
### 注意事项:

#### 静态资源

index.html和demo.css按照如下的文件结构存储：

```
app
|public 
	| demo.css
demo.html
```

如果Node里，设置静态资源的代码如下，那么访问静态资源时，请求路径里不能添加 /pulblic，需要直接访问demo.css.例如: `127.0.0.1:9000/demo.css`

```javascript
app.use(express.static('public'));
```

在demo.html里，使用demo.css也不能使用public文件夹，而是直接使用。

```html
<!-- 这里需要直接写demo.css文件名，不能添加public目录 -->
<link rel='stylesheet' href='demo.css'>
```

**一般情况下，我们不使用上述形式来设置静态资源！**在服务器端，我们会在use方法里添加参数，处理静态资源的请求。

```javascript
//添加一个参数public，处理请求
app.use('public',express.static('public'));
```

在demo.html里，正常设置静态资源的路径。

```html
<!-- 正常的资源路径 -->
<link rel='stylesheet' href='public/demo.css'>
```

#### url的变化

express会对request对象的功能进行增强，同时也会修改request对象的部分属性。在express里，request对象的url属性值和非express状态下的属性值代表的含义不同。

例如：请求路径`127.0.0.1:8080/public/demo.css ` 

在非express环境下，获取 `request.url` 属性，拿到的结果是 ` /public/demo.css`.

在express框架下，request对象的相关属性被修改了。

```javascript
console.log(request.url);  // /demo.css
console.log(request.baseUrl);  // /public
console.log(request.originalUrl);  //  /public/demo.css
```

在express框架下，如果要获取原来的请求路径，需要获取`originalUrl`属性。

## express集成art-template

express生成器可以快速的生成一个express应用骨架，并同时指定模板引擎。但是express生成器默认支持的模板引擎有限，只有ejs、hbs、hjs、jade、pug、twig、vash这几种模板引擎（默认使用的是jade）。如果想要在express工程里使用art-template,需要将art-template集成到express里。

### 安装

```shell
npm install --save art-template
npm install --save express-art-template
```

### 使用

```javascript
var express = require('express');
var app = express();

// 指定模板引擎
app.engine('html', require('express-art-template'));
// 设置加载引擎文件的后缀名为html
app.set('view engine','html');
// 设置模板文件所在的文件夹(默认就是在views文件夹下)
app.set('views',path.join(__dirname,'views');
app.get('/', function (req, res) {
    res.render('index', {user: {name: 'aui'}});
});
```



# express生成器

通过应用生成工具express-generator可以快速创建一个应用的骨架。

## 安装

`sudo npm install express-generator  -g`

## 命令行使用

使用`express -h `可以列出所有可用的命令行参数。

```
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          输出使用方法
        --version       输出版本号
    -e, --ejs           添加对 ejs 模板引擎的支持
        --hbs           添加对 handlebars 模板引擎的支持
        --pug           添加对 pug 模板引擎的支持
    -H, --hogan         添加对 hogan.js 模板引擎的支持
        --no-view       创建不带视图引擎的项目
    -v, --view <engine> 添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是普通的 css 文件）
        --git           添加 .gitignore
    -f, --force         强制在非空目录下创建
```

## 生成工程

例如，如下命令创建了一个名称为myapp的Express应用，并且指定jade作为这个应用程序的模板引擎。

```bash
express --view=jade myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
```

然后按照所有的依赖包：

```bash
cd myapp
npm install
```

启动应用程序:

```bash
npm start
```

调试应用程序:

在MacOS或者Linux里运行

```bash
DEBUG=myapp:* npm start
```

在Windows里运行：

```
set DEBUG=myapp:* & npm start
```

