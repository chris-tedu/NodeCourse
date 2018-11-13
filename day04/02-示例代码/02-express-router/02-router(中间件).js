//使用express.Router()方法，获取到一个router中间件
var router = require('express').Router();
var handler = require('./02-handler');

//router中间件也有get/post等方法
router.get('/',function (req,res,next) {
  res.send('我是通过get请求访问到的首页内容');
});

//可以传递一个回调函数
router.use('/index',handler.index);

//还可以传递两个回调函数。
router.use('/login',handler.login,handler.welcome);

module.exports = router;
