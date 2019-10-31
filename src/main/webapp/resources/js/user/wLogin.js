// $(function () {
//     $("#loginSubmitBtn").bind("onclick",function () {
//
//     })
// })
var login = {
    wLogin: function () {
        layer.open({
            type: 1,
            skin: 'layui-layer-skin', //样式类名
            id: "fastLogin",
            anim: 2,
            title: !1,
            shadeClose: true, //开启遮罩关闭
            content: login.render(),
            area: "350px", resize: !1,
            success: function (e, n) {
                $("#loginSubmitBtn").bind("click", function () {
                    login.doLogin()
                })
            }
        });
    },
    render: function () {
        return '<div class="m-fast-login"><h3 class="login-header">用户登录</h3><div class="login-form"><div class="form-error hide" id="loginShowError"></div><div class="form-line"><div class="content">' +
            '<input type="phone" placeholder="手机号" name="account" id="username" readonly onfocus="this.removeAttribute(\'readonly\');">' +
            '<i class="ico ico-account"></i>        </div>    </div>    <div class="form-line">' +
            '<div class="content"><input type="password" placeholder="登录密码" id="password" name="password" maxLength="20" readonly onfocus="this.removeAttribute(\'readonly\');">' +
            '  <i class="ico ico-password"></i>        </div>    </div>    <div class="form-line g-clearfix hide" data-captcha></div>   ' +
            ' <a href="javascript:void 0;" class="form-submit" id="loginSubmitBtn">登录</a>    <div class="form-line">    ' +
            '    <a href="/user/password/findPassword.html">忘记密码</a>' +
            '<a href="/user/register/register.html" class="reg-btn">免费注册</a>' +
            '</div></div>' +
            '      </div>'
    },
    doLogin: function () {
        var username = $("#username").val();
        var password = $("#password").val();
        if (!tools.checkPhone(username)) {
            $('#loginShowError').show();
            $('#loginShowError').text('请输入正确的手机号');
            return false;
        }
        if (null == password || password.length == 0) {
            $('#loginShowError').show();
            $('#loginShowError').text('请输入密码');
            return false;
        }
        login.clearError();
        //账号密码登录
        $.ajax({
            type: 'post',
            url: '/user/login/doLogin',
            data: {
                username: username,
                password: password,
            },
            dataType: 'json',
            beforeSend: function () {
                $("#loginSubmitBtn").attr("disable", true);
            },
            success: function (result) {
                if (result.success) {
                    //登录成功跳转首页
                    location.reload();
                } else {
                    //登录失败
                    $('#loginShowError').show();
                    $('#loginShowError').text(result.msg);
                    $("#loginSubmitBtn").attr("disable", false);
                    return false;
                }
            }
        });
    },
    clearError: function () {
        $('#loginShowError').hide().text("");
    }
}