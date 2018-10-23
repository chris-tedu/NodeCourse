### REPL 介绍

1. REPL 全称: Read-Eval-Print-Loop ( **交互式解释器** )

   - R-Read- 读取 - 读取用户输入,解析输入了 Javascript 数据结构并存储在内存中。
   - E-Eval- 执行 - 执行输入的数据结构
   - P-Print- 打印 - 输出结果
   - L-Loop- 循环 - 循环操作以上步骤

2. 进入 REPL 环境演示:

   - 浏览器 - 进入 REPL 环境 :   控制台

   - 命令行 - 进入 REPL 环境:  输入: `node` 命令即可进入

     ```js
     // 浏览器控制台上演示
     //1.
     > var num = 100+20   --> R E
     < undefined          --> P
     //2. 
     > function add(){        // 注意: 想写{} 一定要先写一个 { 然后回车最后补上 }
         return 100;
       }                   --> R E
     <  undefined          --> P
     //3. 
     > add()               --> R E
     < 100                 --> P 
     ```

   - 在命令行演示一下 2和3

3. 退出: 

   - 输入:`.exit`
     - `Ctr+C`  两次   ctr + c  : 很多地方都是退出

### 文件的读取和写入

#### 1. 写入文件

```js
/**
 * 写入文件  write file
 */
//1. 引入 fs 模块
var fs = require('fs');

//2. 写入文件
// fs.writeFile(file, data[,options], callback)
// 异步写入数据到文件
// 参数1: 文件要写入到哪里
// 参数2: 要写入的数据
// 参数3: 编码  默认: utf8   可选
// 参数4: 回调  回调参数: err  
var msg = 'hello node';
fs.writeFile('./data.txt',msg,function (err) {
  
  // 如果有错,,抛错
  if (err) {
    throw err;
  }

  console.log('写入成功')
})
console.log(222)
// 注意:
//1. 如果文件存在会覆盖
//2. 该操作是异步操作 
// (遇到异步的操作,先执行后面的代码,等异步回调回来再执行回调的内容)
//3. 默认写入的文件编码: 为 utf8 可选  一般不写
//4. 在回调里面,判断是否有错,,有错就抛出异常 throw err


```



#### 2. 异步的概念

```js
console.log(111);

setTimeout(function() {

  console.log(222)

}, 400 /  0 ); 

console.log(333)

```



#### 3.读取文件

- 2. **读取文件** :  ` fs.readFile(file, [, options], callback);`

        **常用**: `fs.readFile ( where , encoding , callback )`

  - 参数1: 从哪里读取数据?   **必填**

  - 参数2: 以什么格式读取出来 ?   

  - 参数3: 读取完毕后的回调函数,   **必填**

  - 读取文件注意: 
    - 该操作也是 异步操作;
    - 回调函数有2个参数:  `err` 和 `data`
    - 如果读取文件时没有指定编码，那么返回的将是原生的二进制数据<Buffer>；如果指定了编码，那么会根据指定的编码返回对应的字符串数据。

  - 问题:

    ```js
      // 问题1:
      // <Buffer e6 9c 89 e6 b2 a1 e6 9c 89 e8 be a3 e4 
      // b9 88 e4 b8 80 e9 a6 96 e6 ad 8c 2c e8 ae a9 e4 bd a
      // 0 e6 83 b3 e8 b5 b7e6 88 91 3f 3f>
      // Buffer 是一个缓冲 是一个字节数组  就是一种二进制数据 负责传输数据和文件
      //1. Buffer 是什么 ? 是一个缓冲,,是一个二进制数据流格式
      //   是发送或者接收文件传输过程中的格式
      //2. 它类似于一个数组 每个元素是 2位十六进制的字节  字节数组
      //3. 一个汉字三个字节
      // 是我们想要的格式吗??
      // 我们想要一个字符串 
      // 只要通过 toString() 就可以了  其实内部已经给我们转化为了 utf8格式

      //问题2: ENOENT E: error NO :no  ENT entity: 实体 没有这个文件或者文件夹

      //问题3: 显示第二个参数 :'utf8' 也是可以的
    ```

    ​


#### 4.  同步读取文件

- 方法: `fs.readFileSync(path[, options])`
- 返回值 接收数据


- ```
     // fs.readFileSync(path[, options])
       // 参数1: 从哪里读取文件
       // 参数2: 编码  (可选)
     ```

     同步的概念
  ```
    console.log(111)

    var data = fs.readFileSync('./data1.txt','utf8');

    console.log(data)

    console.log(222)

    // 总结:
    //1. 该操作是同步的 
    //2. 异步捕捉异常: throw err
    // 同步 : 能不能不捕捉异常
    // 同步,一旦出错,,后面的所有代码都不执行,,体验很不好,,必须要有捕捉
    //3. 怎么捕捉呢?
    // try ...catch()
  ```


#### 5.  try…catch   (捕获异常 , 抛出错误)

- 异步读文件:  throw err

- 问题: 同步没有 err ,  能不能不捕获异常了???

  ```js
  no
  后面的会崩溃,不会执行
  ```

-  同步: try catch

  ``` js
  异步不能使用 try..catch 因为不管正确和错误都会走回调
  ```

- 代码: 同步 try .. catch

  ```js
  // 一旦出错,后面的代码不执行了..
  console.log(111)

  try {
    var data = fs.readFileSync('./abcd.txt','utf8');

    console.log(data)

  }catch(err){

    // throw err
    console.log('读取时:'+err)
  }

  console.log(222)
  ```

- 代码: 异步 try .. catch

  ```js
  console.log(111)

  try {

    fs.readFile(file,'utf8',function (err,data) {
      // 异步 try...catch
      // 如果正确: err 没有值  data 有值
      // 如果错误: err 有值 ,data 没有值
      // 不管怎么样,都会走这个回调方法,,, try catch 没有用
      console.log(333)
      console.log(data) // 不要拼字符串,会转化为字符串的
    })

  } catch(err){
    console.log(err)
  }

  console.log(222)
  ```

  ​

####6  路径   

- __dirname

- > 用终端运行
  >
  > //1. 先 来个打印 log('Test') 的测试

```js
//1. 加载 fs 模块
var fs = require('fs');
var path = require('path') //  path 模块 负责处理路径

//2. 读取文件 


// ('./data.txt')

console.log(__dirname);
///Users/MaWenxing/Desktop/14期讲课/day01/4-源代码/day01_14/04-__dirname
///Users/MaWenxing/Desktop/14期讲课/day01/4-源代码/day01_14/04-__dirname

// 后面的路径,,我能获取到,如果我们也能自动获取前面的就好了?
// 巧了,,,,唉,,巧了,,,,正好有一个熟悉,,__dirname

// 当前 js 的文件夹路径   js 的相对文件路径
// /Users/MaWenxing/Desktop/14期讲课/day01/4-源代码/day01_14/04-__dirname   /data.txt
// var file = '/Users/MaWenxing/Desktop/14期讲课/day01/4-源代码/day01_14/04-__dirname/data.txt'

// /data.txt  ./data.txt  data.txt
// var  file = __dirname + '/data.txt'
// var file = path.join(__dirname,'./data.txt')
fs.readFile(path.join(__dirname,'./data.txt'),'utf8',function (err,data) {
  
    if (err) {
      throw err
    }

     console.log(data)
  })

  // 报错的原因:  path 路径是相对于 `执行 node 命令所在的目录`

  // __dirname :  获取当前 js 所在的`文件夹`目录
  //  因为怕误写  ./data.txt  /data.txt  data.txt  --> path.join
  // 

  // 总结: 
  // 以后遇到这种文件路径的: 全部使用 path.join(__dirname,'./....')
```

### 通过 node.js 编写 http 服务程序

   ##### ☆ 步骤:

	1. 加载 http 模块;
	2. 创建 http 服务;
	3. 监听 request 事件 —— 为 http 服务对象添加 request 事件处理程序;
	4. 启动服务,开始监听 —— 开启 http 服务监听,准备接收客户端请求;

   ##### ☆ 注意

1. 浏览器可能是乱码, 需要设置 浏览器显示时所使用的编码:

   ```js
   response.setHeader('Content-Type','text/plain ; charset=utf-8');  // 注意 后面的分号 和引号的位置
   ```

2. 演示一下设置`Content-Type=text/html` 和 `Content-Type=text/plain`的区别。

3. request  对象 包含了用户请求报文中的所有内容,通过 request 对象可以获取所有用户提交过来的数据;

4. response  对象用来向用户响应一些数据,当服务器要向浏览器响应数据的时候必须使用 response 对象

5. 有了 request 对象和 response 对象,就既可以获取用户提交的数据,也可以向用户响应数据了

   ​

##### ☆ 代码:

```js
//1. 加载 http 模块
var http = require('http');

//2. 创建 http 服务
var server =  http.createServer();

//3. 监听 request 事件
// 参数1: 请求体 request -> req
// 参数2: 响应体 response -> res
server.on('request',function (req,res) {
  
  console.log('有人请求了') // 会打印两次,一次是请求 ico 图标  (忽略)
  res.write('hello world 哈哈哈'); //2
  res.end();  //1. 
})

//4. 启动服务,开始监听
// 参数1: 指定一个端口  如果冲突了,再换一个
// 参数2: 回调
server.listen(9000,function () {
   console.log('服务已经启动,请访问: http://127.0.0.1:9000')
})
```



### 服务器代码优化

**优化1: 乱码问题**

- 浏览器读取数据的时候,默认是自己的编码格式,,我们返回的是默认 utf-8格式,,不匹配,需要专门设置一下

  **因为是服务器响应给浏览器的,所以需要设置的响应头里,告诉浏览器使用相应的编码来解析网页**

- 设置响应头: `res.setHeader('Content-Type', 'text/html; charset=utf-8');`

- 注意:

  - 1. `res.setHeader ( ' ' , ' ' ) ;`
    2. `Content-Type`  或者 `content-type`
    3. `charset=utf-8`   和之前的读取、写入文件 —> utf8  不一样

**优化2: 简化 red.end**

- ```js
  // 之前的
  res.write('hello wrold');
  res.end()
  ```

- ```js
  //以后:
  res.end('hello world')
  ```

**优化3: 简化: 创建、开启、监听 一步走**

- ```js
  //2. 创建 开启 监听
  http.createServer(function (req,res) {
     
    res.end('hello world')  
  }).listen(8080,function () {

    console.log('服务器已经开启了')  
  })
  ```

**优化4:  text/plain 和 text/html 的区别**

````js
response.setHeader('Content-Type','text/plain ; charset=utf-8');  // 注意 后面的分号 和引号的位置
````

``` js
 text/plain :  告诉浏览器发送的数据是 `纯文本`类型,,让浏览器以`纯文本`的格式进行解析
 text/html  :  告诉浏览器发送的数据是 `html` 类型,,...........html.......
```

代码:

``` js
res.end('hello <h1>world</h1>  哈哈')  //不能直接写 `<h1>`因为浏览器会自动识别
```

### request  和 response  介绍

> 用一个简单的判断 index 并返回 ok 的例子

- [node HTTP 官网](https://nodejs.org/dist/latest-v6.x/docs/api/http.html)

- 在 node 官网找 需要对应: **request ( http.IncomingMessage )  **和 **response ( http.ServerResponse ) **

#### ☆ request 对象

- 服务器解析用户提交的 http 请求报文，将结果解析到 request 对象中。凡是要获取和用户请求相关的数据都可以通过 request 对象获取

- request 对象类型 <http.IncomingMessage>, 继承自stream.Readable

- request 对象常用成员: 

- **1. request.headers — 请求头 (对象)**     

  //https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent

  ```js
  // 打印 request.headers
  { host: 'localhost:8080',
    connection: 'keep-alive',
      // 人家默认的,不要动它,,知道也没用,,也改变不了
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
      //User-Agent 告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本.
      
    'upgrade-insecure-requests': '1',//是否可使用更高的版本进行通信
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      //浏览器端可以接受的媒体类型,
    'accept-encoding': 'gzip, deflate, br',
      // 浏览器申明自己接收的编码方法 通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6' 
   //浏览器申明自己接收的语言。
  }
  ```

- **2. request.rawHeaders — 请求头 (数组)**

  ```js
  // 打印 request.rawHeaders
  [ 'Host',
    'localhost:8080',
    'Connection',
    'keep-alive',
    'Cache-Control',
    'max-age=0',
    'Upgrade-Insecure-Requests',
    '1',
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    'Accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding',
    'gzip, deflate, br',
    'Accept-Language',
    'zh-CN,zh;q=0.8,en;q=0.6' ]
  ```

  ​

- **3. request.httpVersion  — http 版本**

  ```js
  1.1 
  ```

- **4. request.method  — 请求方式**

  ```js
  GET / POST ....
  ```

- **5. request.url  — 请求 url 路径**

  ```js
  /
  /index
  /login/pass
  ```

#### ☆ response 对象

- 在服务器端用来向用户做出响应的对象。凡是需要向用户（客户端）响应的操作，都需要通过 response 对象来进行。

- response 对象类型 <http.ServerResponse>

- response 对象常用成员: 

- **1. response.write(chunk[, encoding]_[, callback]) — 写入数据 发送浏览器 **

  - 参数1:  要写入的数据,可以是字符串 或者 二进制数据   **必填 **    <string> | <Buffer>

    ` var buffer = Buffer.from('hello');`

  - 参数2: 编码, 默认是 utf8 ;选填

  - 参数3: 回调函数;选填

- **2. response.end([data]_[, encoding]_[, callback]) — 结束响应  (★★)**

  - 参数1: 结束响应前要发送的数据,  选填    <string> | <Buffer>
  - 参数2: 编码,  选填
  - 参数3: 回调函数,  选填
  - 注意: 每次响应都必须调用该方法，用来结束响应

  ```js
  - This method signals to the server that all of the response headers and body have been sent; that server should consider this message complete. The method, response.end(), MUST be called on each response.
  
  - res.end()这个方法告诉服务器所有要发送的响应头和响应体都发送完毕了。可以人为让这次响应结束了。
  ```

  ​

- **3. response.setHeader(name, value) — 设置响应报文头 (★★)** 

  - 告诉浏览器解析文本是以什么格式解析,又以什么编码格式解析

  ```js
  // 可多次使用 
  res.setHeader('Content-Type','text/plain;charset=utf-8')
  ```

- **4. response.statusCode — 设置或者读取 http 状态码**

- **5. response.statusMessage — 设置或读取 http 响应状态消息**

​        [MDN-HTTP response status codes](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

- 注意: (顺序不要乱写,尽量参考下面)

  ```js
    // 设置响应报文头
    res.statusCode = 400;
    res.statusMessage = 'hehe'
    res.setHeader('Content-Type','text/plain;charset=utf-8')
  
    // 设置响应报文头  (约等于上面)
    res.writeHead(200,'OK',{
      'Content-Type':'text/plain;charset=utf-8'
    })
   
    // 写入数据,,返回给浏览器
    res.write('哈哈哈')
  
    // 结束响应
    res.end('over')
  ```

  **6. response.writeHead(statusCode [, statusMessage]_[, headers]) — 设置响应头信息  (★)**

  - 参数1: 状态码

  - 参数2: 状态信息

  - 参数3: 响应头

  - 实例代码:

    ```js
    // 示例代码：
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(msg)
    });
    ```

  注意:

  ```js
  1. This method must only be called once on a message and it must be called before response.end() is called.
  
  - 这个方法在每次请求响应前都必须被调用（只能调用一次）。并且必须在end()方法调用**前**调用
  ```

  ```js
  2. If you call response.write() or response.end() before calling this, the implicit/mutable headers will be calculated and call this function for you.
  
  - 如果在调用writeHead()方法之前调用了write() 或 end()方法，系统会自动帮你调用writeHead()方法，并且会生成默认的响应头
  ```

- #### 总结

  ```js
  1. res.end() 放在最后; //不然后面设置的不起效果
  2. setHeader/statusCode/statusMessage  和 writeHead(statusCode [, statusMessage]_[, headers]) 最好只使用一个
  3. setHeader() 最好放在最前
  ```

### 根据 不同的 url 请求响应不同的纯文本 

- **注意:**

  - 根据 `req.url`的不同来判断  (例如: /abc  /index )
  - 别忘了 `404`

- 代码:

  ```js
  /**
   *  编写 http 服务程序 — 根据 不同的 url 请求 响应不同的 :  纯文本 
   *  1. 编写 http 服务程序
   *  2. 获取不同的 url 
   *  3. 响应不同的纯文本
   */
  //1. 加载 http 模块
  var http = require('http');

  //2. 创建.开启.监听
   http.createServer(function(req,res){

      // 设置文件类型 和 编码格式
      res.setHeader('Content-Type','text/plain;charset=utf-8');

      console.log(req.url);

      // / index  --> hello index
      // /login  --> hello login
      // /register  --> hello register
      // /list  --> hello list

      if (req.url=='/' || req.url == '/index') {
        
        res.end('hello index')

      } else if(req.url=='/login') {
        
        res.end('hello login')
      }else if(req.url=='/register') {
        
        res.end('hello register')
      }else if(req.url=='/list') {
        
        res.end('hello list')
      }else{

        res.end('hello 404 page not found')
      }
    

  }).listen(8080,function () {
      console.log('服务开启了');
  })
  ```

  ​

### 根据 不同的 url 请求响应不同的 :  HTML 

- **注意:**

  - 以后使用路径都用: `path.join(__dirname,'./htmls/index.html')`
  - `res.end() ` 后面传的参数可以是: <string> | <buffer>
  - 读取 html 文件,不用转化为字符串,,直接以 buffer 的格式返回给浏览器  `res.end(data)`
  - 不用设置文件类型和编码,,因为 html 界面里已经设置好 

- 代码:

- ```js
  /**
   *  编写 http 服务程序 — 根据 不同的 url 请求 响应不同的 :  html
   *  1. 编写 http 服务程序
   *  2. 获取不同的 url 
   *  3. 响应不同的html
   */
  //1. 引入 http 模块
  var http = require('http')
  var fs = require('fs');
  var path = require('path');

  //2. 创建 开启 监听
  http.createServer(function (req, res) {

    if (req.url == '/' || req.url == '/index') {

      //1. 读取 html
      // where [,encoding] callback
      // 有编码 --> string
      // 没有编码 --> buffer
      fs.readFile(path.join(__dirname, './htmls/index.html'), function (err, data) {

        if (err) {
          throw err;
        }

        console.log(data)
        //2. 返回给浏览器
        res.end(data)
      })
      
     ................
     
    } else {
      fs.readFile(path.join(__dirname, './htmls/404.html'), function (err, data) {

        if (err) {
          throw err;
        }

        console.log(data)
        //2. 返回给浏览器
        res.end(data)
      })
    }

  }).listen(8080, function () {
    console.log('服务器已经开启了')
  })
  ```

- html 内部代码:

- ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>index</title>
  </head>
  <body>

    <!-- 重点代码  -->
    <h1 style="color:red">hello index</h1>
    <h1>会看到乱码吗?</h1>
    
  </body>
  </html>
  ```


>  此处应该有疑问???

````js
/**
  * 问题1: 我没有设置响应头  setHeaader utf-8格式,,读取文字没有乱码?
  * 问题2: 我没有设置响应头  setHeaader  text/html  它为什么能够读取出来??
  */
````


#### 补充:

1. 读取文件,不需要判断文件是否存在.. 以为内部有个 error, 如果没有的话,会在 error 里面提示
2. try catch 捕获异常,如果出现错误,程序会执行到catch代码块
3. throw err : 异常只要一抛出,后面就不会再执行了
4. res.write() 里的编码是返回什么编码格式,不代表浏览器会以这种格式解析
5. 如果想告诉浏览以什么格式解析: 通过 res.setHeadr() 改变 Content-Type



## Common System Errors - 常见错误号

- EACCESS (Permission denied)
  - An attempt was made to access a file in a way forbidden by its file access permissions.
  - 访问被拒绝
- EADDRINUSE (Address already in use) // EADDRINUSE
  - An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.
  - 地址正在被使用（比如：端口号占用）
- EEXIST (File exists)
  - An existing file was the target of an operation that required that the target not exist.
  - 文件已经存在
- EISDIR (Is a directory)
  - An operation expected a file, but the given pathname was a directory.
  - 给定的路径是目录
- ENOENT (No such file or directory)
  - Commonly raised by fs operations to indicate that a component of the specified pathname does not exist -- no entity (file or directory) could be found by the given path.
  - 文件 或 目录不存在
- ENOTDIR (Not a directory)
  - A component of the given pathname existed, but was not a directory as expected. Commonly raised by fs.readdir.
  - 给定的路径不是目录



