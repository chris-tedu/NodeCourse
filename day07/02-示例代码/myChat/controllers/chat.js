var client = require('../common/redis');
var config = require('../config.js');
module.exports.showChat = function (req, res) {
  //将用户传递过来的用户名和session_id存入Redis
  var roomid = req.query["roomid"];
  var username = req.session.user;
  var sessionid = req.session.id;
  var socketserver = config.socketHost + ":" + config.port;

  //  {"username":"zhangsan","room":1}
  client.set(sessionid, '{"username":"' + username + '","room":' + roomid + '}');
  res.render('chat', {
    username: username,
    roomid: roomid,
    sessionid: sessionid,
    socketserver: socketserver
  });
}