  $(document).ready(function () {

    $("#username").blur(function () {
      //校验用户名是否合法
      var user_regex = /^[a-zA-z0-9_]{3,12}$/;
      if (user_regex.test($("#username").val())) {
        //如果验证通过，则隐藏错误提示，启用注册按钮
        $("#user-err").css('display', 'none');
        $('#register').removeAttr('disabled');
      } else {
        // 如果验证未通过，则显示错误提示，禁用注册按钮，并直接返回，不再继续执行
        $("#user-err").css("display", "inline").text("用户名只能由3到12位的数字字母下划线组成");
        $('#register').attr('disabled', "disabled");
        return;
      }

      $.get('/checkuser?username=' + $(this).val(), function (data, status) {
        $('#register').attr('disabled', "disabled");
        if (data.exist) {
          $("#user-err").css("display", "inline").text("用户名已被占用，请使用其他用户名");
          $('#register').attr('disabled', "disabled");
        } else {
          $("#user-err").css('display', 'none');
          $('#register').removeAttr('disabled');
        }
      })
    })

    $("#register").click(function (e) {
      // 阻止submit按钮的默认事件
      e.preventDefault();
      // 校验两次密码输入是否一致
      if ($("#pwd").val() === $("#repwd").val()) {
        // 如果验证通过，则隐藏错误提示
        $('#pwd-err').css("display", "none");
        $.post('/register', $("form").serialize(), function (data) {
          if (data.status == 'err') {
            $('#err-msg').css("display", "inline").text(data.err_msg);
          } else {
            window.location.href = data.url;
          }
        })
      } else {
        $("#pwd-err").css("display", "inline");
      }
    })
  })