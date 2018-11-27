var currentuser;

$(document).ready(function () {
  // 拿到服务器返回的socket服务器，连接至socket服务器
  var socket = io.connect($('#socketserver').text());
  window.socket = socket;
  // 当界面加载完成以后，立即往服务器发送一个消息，告诉服务器，用户已经加入聊天室
  socket.emit('session', $('#session-id').text());

  // 接收socket服务器返回的结果，查看是否加入成功
  socket.on('joinResult', function (data) {
    // console.log(data);
    if (data.issuccess) { //如果加入成功，就显示欢迎信息
      $("#welcome_msg").css('display', 'block');
      $('#user-list').append($('<li id="myself">' + data.user + '</li>'));
      currentuser = data.user;

      //向服务器请求当前房间里所有的用户
      socket.emit('listusers', $('#roomid').text());
    } else { //如果加入房间失败，就显示错误信息
      $('#error_msg').css('display', 'block');
    }
  });

  //接收到服务器返回的用户列表，显示当前聊天室的所有用户
  socket.on('showusers', function (users) {
    listusers(users);
  })

  // 接收服务器的广播，当一个新的成员加入时，更新聊天室用户列表
  socket.on('newuser', function (users) {
    listusers(users);
  });

  // 接收到服务器发送的广播消息
  socket.on('message', function (message) {
    //将消息添加至消息列表
    $('#message-list').append($('<li></li>').text(message.user + ':' + message.text));
  })


  //给发送按钮添加点击时事件
  $('#send').click(sendMessage);
  //个输入文本框添加键盘事件
  $('#userarea').keyup(function (event) {
    if (event.ctrlKey && event.keyCode == 13) {
      sendMessage();
    }
  })

  $('#backhome').click(function () {
    window.beforeunload();
  });
})
//当页面关闭时，离开当前房间
window.onbeforeunload = function () {
  // console.log(currentuser);
  socket.emit('leave', {
    user: currentuser,
    room: $('#roomid').text()
  });
}

// 显示右侧的群成员列表
function listusers(users) {
  // 先把所有的数据清空
  $('#user-list').empty();

  // 把所有的用户显示到列表
  for (let i = 0; i < users.length; i++) {
    var $li = $('<li>' + users[i] + '</li>');
    if (users[i] == currentuser) {
      $li.attr('id', 'myself');
    }
    $('#user-list').append($li);
  }
}

// 发送聊天消息
function sendMessage() {
  // console.log('发送聊天消息');
  // 清空输入的内容
  var message = $('#userarea').val();
  $('#message-list').append($('<li class="clearfix"></li>').html('<p class="mymessage">' + message + '</p>'));
  $('#userarea').val('');

  socket.emit('message', {
    room: $('#roomid').text(),
    text: message,
    user: currentuser
  });
}