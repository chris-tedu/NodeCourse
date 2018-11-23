module.exports.requireAuth = function (req, res, next) {
  //表示是否已经登录
  if (req.session.user) { //如果已经登录，执行下一步行为，直接跳转到主页
    next();
  } else {
    // 如果没有登录，则跳转到登录界面
    res.render('login');
  }
}