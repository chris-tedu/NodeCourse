var userDao = require('../dao/userDao');
var utils = require('utility');
var config = require('../config.js');
module.exports.checkUser = function (req, res, next) {
  userDao.getUsers({
    username: req.query.username
  }, function (err, data) {
    if (data.length > 0) {
      res.send({
        exist: true
      });
    } else {
      res.send({
        exist: false
      });
    }
  })
}
module.exports.doRegister = function (req, res, next) {
  var username = req.body.username;
  var pwd = req.body.password;
  var repwd = req.body.repwd;
  //判断用户名密码是否为空
  if ([username, pwd, repwd].some(function (item) {
      return item == "";
    })) {
    return res.send({
      'status': 'err',
      'err_msg': "信息不全"
    });
  } else if (!(/^[a-zA-z0-9_]{3,12}$/.test(username)) ) {
    return res.send({
      'status': 'err',
      'err_msg': '用户名格式错误'
    })
  } else if (pwd !== repwd) {
    return res.send({
      'status': 'err',
      'err_msg': '密码不一致'
    });
  }

  // 对密码进行md5加密
  req.body.password = utils.md5(pwd + config.md5_secret);
  // 将用户信息写入到数据库
  userDao.addUser(req.body, function (err, result) {
    if (err) {
      res.send({
        'status': 'err',
        'err_msg': '注册失败'
      });
    } else {
      req.session.user = username;
      res.send({
        'status' : 'OK',
        'err_msg' : '注册成功',
        'url' : req.headers.origin+'/home'
      })
    }
  });
}