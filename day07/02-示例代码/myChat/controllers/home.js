module.exports.showHome = function (req,res) {
  if (req.session.user) {
    res.render('home',{username:req.session.user});
  }else {
    res.send('对不起，请先登录！<a href="/login">点击登录</a>')
  }
}