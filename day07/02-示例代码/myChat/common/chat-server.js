var socketio = require('socket.io');

module.exports.connect = function (server) {
  io = socketio(server);
  
  //监听连接事件
  io.on('connection',function (socket) {
    console.log('connection scuccess');
  })

  //监听断开连接事件
  io.on('disconnect',function (socket) {
    console.log('disconnect');
  })
}

