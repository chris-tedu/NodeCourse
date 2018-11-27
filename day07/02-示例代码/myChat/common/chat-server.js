var socketio = require('socket.io');
var client = require('../common/redis');
var roomAndUsers = {};

module.exports.connect = function (server) {
  io = socketio(server);

  //监听连接事件
  io.on('connection', function (socket) {
    // console.log('connection scuccess,socket = ' + socket);

    //socket服务器在接收到浏览器发送的请求以后，把用户添加到对应的房间
    socket.on('session', function (sessionid) {
      // console.log('接收到了客户端发送过来的session,sessionid = ' + sessionid);
      // 根据浏览器传递过来的sessionid,从Redis中获取到用户名和当前房间
      client.get(sessionid, function (err, data) {
        if (err) {
          throw err;
        }
        var obj = JSON.parse(data);
        joinRoom(socket, obj.username, obj.room);
      })
    });

    socket.on('listusers', function (roomid) {
      var users = roomAndUsers[roomid] || [];
      socket.emit('showusers', users);
    })

    //接收到了客户端发送过来的message消息
    socket.on('message', function (message) {
      // console.log('message.user = ' + message.user + ' ,message.text = ' + message.text);
      //将消息广播到房间里的所有用户
      socket.broadcast.to(message.room).emit('message', message);
    })

    // 监听离开事件
    socket.on('leave', function (data) {
      // console.log('leave --user = ' + user);
      // 把用户从当前房间的数组里移除，并且广播出去
      var users = roomAndUsers[data.room] || [];
      if (users.indexOf(data.user) != -1) {
        users.splice(users.indexOf(data.user), 1);
        socket.broadcast.emit('newuser', users);
      }
    })
  })

  //监听断开连接事件
  io.on('disconnect', function (user) {
    console.log('disconnet');
  })
}

function joinRoom(socket, username, room) {
  socket.join(room, function (err) {
    let issuccess = false;
    if (err) {
      // 如果进入房间失败，则抛出异常
      throw err;
    }
    // 如果程序没有出现异常，则说明进入房间成功
    issuccess = true; // issuccess置为true

    // 通知连接的用户，是否成功加入房间
    socket.emit('joinResult', {
      issuccess: issuccess,
      user: username
    });

    //根据房间号，获取当前房间里的所有用户
    var users = roomAndUsers[room] || [];

    //如果这个用户不存在，就把这个用户放到数组里
    if (users.indexOf(username) == -1) {
      users.push(username);
    }

    // 更新对应房间号的用户列表
    roomAndUsers[room] = users;

    //发送广播，告诉当前房间的其他用户，有新的用户加入
    socket.broadcast.emit('newuser', users);
  });
}