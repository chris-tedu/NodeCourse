var client = require('../common/redis');
module.exports.showChat = function (req, res) {
  //将用户传递过来的用户名和session_id存入Redis
  var roomid = req.query["roomid"];
  var username = req.session.user;
  var sessionid = req.session.id;

  client.set(sessionid, "{username:'" + username + "',room:" + roomid + "}");
  res.render('chat',{username:username,roomid:roomid});
}