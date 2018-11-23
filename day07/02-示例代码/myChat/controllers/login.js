var userDao = require("../dao/userDao.js");
var utils = require('utility');
var config = require('../config.js');
module.exports.doLogin = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username || !password) {
    return res.send({
      err: '用户名或者密码不能为空'
    });
  }

  req.body.password = utils.md5(password + config.md5_secret);
  userDao.getUsers(req.body, function (err, data) {
    if (err) {
      return res.send({
        err: '查询出错'
      });
    }

    // 如果没有查询到数据，查询的结果长度为0
    if (data.length == 0) {
      res.send({
        err: '用户名或者密码错误'
      });
    } else {
      req.session.user = username;
      res.redirect('/home');
    }
  })
}
module.exports.showRegister = function (req, res) {
  res.render('register');
}
module.exports.showLogin = function (req, res) {
  res.render('login');
}

module.exports.logout = function (req,res) {
  req.session.destroy();
  res.redirect('/login');
}