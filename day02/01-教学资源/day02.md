### NPM  —> 详见 NPM 文档

### package.json、package-lock.json 文件介绍

1. ##### package.json

   ```Js
   {
     "name": "05-hackernews",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1"
     },
     "keywords": [],
     "author": "",
     "license": "ISC",
     "dependencies": {
       "mime": "^2.0.3"
     }
   }
   ```

2. ##### package-lock.json 

   ```Js
   {
     "name": "05-hackernews",
     "version": "1.0.0",
     "lockfileVersion": 1,
     "requires": true,
     "dependencies": {
       "mime": {
         "version": "2.0.3",
         "resolved": "https://registry.npmjs.org/mime/-/mime-2.0.3.tgz",
         "integrity": "sha512-TrpAd/vX3xaLPDgVRm6JkZwLR0KHfukMdU2wTEbqMDdCnY6Yo3mE+mjs9YE6oMNw2QRfXVeBEYpmpO94BIqiug=="
       }
     }
   }
   ```

   ​

### ★ HackerNews 网站案例

1. [模仿网站 HackerNews](https://news.ycombinator.com/)

2. 步骤: (有待二次加工)

   ```js
   /**
    * 步骤:
    * 1. 简单的 http 服务器程序 + 导入 views + resources
    * 2. 根据不同的 ul, 加载不同的 html 静态页面
    * 3. 加载 静态资源   
    *    //1. 拼接路径
         //2. 读取静态资源
         //3. 返回给浏览器
    * 4. 处理 add 提交的 get 请求
    *    4.1 修改 submit.html 的代码 (method:get+action:/add) 
    *    4.4 添加 url 路由
    *    4.5 加载 node 自带的 url 模块  URL.parse(url,true)
    *    4.6 拼接数组 + 写入 data.json + 重定向
    * 5. 封装
    * 6. 每次添加新数据,都会把之前的给覆盖掉问题
    *    -  从 data.json 取出来之前的,然后添加进去,再写入 data.json
    *    -  不能使用 appendFile, 以为不可能是数组跟对象拼接在一起吧  
    *    -  注意: 第一次读取文件肯定有错误,,但是没有必要抛出异常
    *    - 第一次解析数组是个 undefined, 给个可选的 '[]'
    * 7. post 请求
    *    7.1  修改 html 的 method 和 action
    *    7.2 从 data.json 读取数据
    *    7.3 拼接新对象 
    *     - 获取 post 传递过来的数据
    *     - 是通过一段一段的 buffer 传过来的额
    *     - 所以我们需要 buffer 一段一段的接收
    *     - 然后合并在一起,通过 toString 转化为一起,但是是个查询字符串
    *     - 查询字符串需要使用 querystring 处理
    *    7.4 写入到 data.json
    *      
    */
   ```

   ​


#### 模板引擎 [underscore](http://underscorejs.org/#template)

1. 安装: `npm i underscore -S`
2. 加载:

```js
var _ = require('underscore');
```

3. 使用:underscore 三步走

   ```js
   //1. 有个模板文件 
   var oldHtml = '<h1><%= name %></h1>'

   //2. 生成模板函数 
   // 参数: 模板文件
   // 返回值: 模板函数
   var template = _.template(oldHtml)

   //3. 传值
   var newHtml = template({ name:' 小新哥' })
   console.log(newHtml);
   ```

   ​

#### 补充:

- 1、注意在发送不同类型的文件时，要设置好对应的`Content-Type`
  - [Content-Type参考 OSChina](http://tool.oschina.net/commons)
  - [Content-Type参考 MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- 2、HTTP状态码参考
  - [w3org参考](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
  - [MDN-HTTP response status codes](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
- 3、在html页面中写相对路径'./' 和 绝对路径 '/'的含义 。
  - 网页中的这个路径主要是告诉浏览器向哪个地址发起请求用的
  - **'./'**  表示本次请求从相对于当前页面的请求路径（即服务器返回当前页面时的请求路径）开始
  - **'/'**   表示请求从根目录开始

步骤2:草稿:

```js
1. 编写一个简单的 http 服务器

2. 根据不同的 url 加载不同的静态页面
 2.1 根据不同的 url 返回不同的文测试
 2.2 add get 显示 404 的原因是因为大小写GET 转化一下
 2.3 导入 html 页面(无模板) 资源 `views` 和 静态资源 `resources`
 2.4 根据不同的 url 请求读取 html 页面  index detail submit
 2.5 静态资源有问题: mime 处理样式 + 读取静态资源文件

3. 封装 res.ml_render()

4. 处理 add get
    4.1. 获取数据  
    ```js
     if (err && err.code != 'ENOENT') {
        throw err;
      }
    ````
    4.1.1
       ```js
       var URL = require('url');
       var urlObj =  URL.parse(req.url);
```
    4.1.2 req.url 已经不再是等于 '/add'了
    
    4.2. 写入数据到 data.json
    
    4.3. 重定向
    ​```js
     res.statusCode = 301;
     res.statusMessage = 'Moved Permanently';
     res.setHeader('location','/')
    
    ​```

5. 处理 add get
 - // 注意这里,因为 end 介绍是异步的,   所以 如果提前 end 了,就监听不到 二进制数据了

----
    6. 模板字符串:
     var template = _.template(data.toString());
        //3. 传值
    
     7. id
```



#### 补充: 学生询问如果使用插件

1. Better Align : 整理美化代码

​```` js
// 使用
//1. ctr + cmd/alt + p 
//2. 输入  Open keyboard Shortcuts File (首选项: 打开键盘快捷方式文件)
//3.粘贴上去
// 将键绑定放入此文件中以覆盖默认值
[
  { "key": "ctrl+cmd+=",  "command": "wwm.aligncode",
    "when": "editorTextFocus && !editorReadonly" }
]
//4. 以后使用 :  ctr + cmd + =
​````


```