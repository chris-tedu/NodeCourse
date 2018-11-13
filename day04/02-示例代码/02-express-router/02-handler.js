var path = require('path');
module.exports.index = function (req,res) {
  res.send('我是index页面');
}

module.exports.login = function (req,res,next) {
  if(req.query.user) {
    next();
  }else {
    res.sendFile(path.join(__dirname,'login.html'));
  }
}
module.exports.welcome = function (req,res) {
  res.send('welcome back ' + req.query.user);
}