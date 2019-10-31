//图片处理
var imgObj;
function saveImg2() {
    var formData = new FormData($("#fileForm1")[0]);
    var form = $("#fileImg").val();
    var imageFormat = form.substring(form.length - 4, form.length);
    if (form != "") {
        if (imageFormat == ".jpg" || imageFormat == "jpeg" || imageFormat == ".gif" || imageFormat == ".png" || imageFormat == ".bmp" || imageFormat == ".JPG" || imageFormat == ".JPEG" || imageFormat == ".GIF" || imageFormat == ".PNG" || imageFormat == ".BMP") {
            $.ajax({
                url: "/user/personCenter/uploadAuthImage",
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    $(imgObj).attr("src", returndata);
                    $(imgObj).next().val(returndata);
                    $("#img").val(returndata);
                    $("#fileImg").val("");
                },
                error: function (returndata) {
                    $.toast("提示", "上传图片失败", "error");
                }
            });
        } else {
            $.toast("提示", "图片格式不正确", "error");
        }
    }
}
function uploadImg(obj){
    imgObj = obj;
    $("#fileImg").click();
}

$(document).ready(function () {
    $("#accountInfoSubmitBtn").click(function(obj){
        //提交方法
        accountInfo.submitAccount();
    })
    $("#activateMailbox").click(function(obj){
        accountInfo.activateMailbox();
    })
    $("#updataEmailBtn").click(function (obj) {
        //去除disabled属性
        $("#userEmail").removeAttr("disabled");
        //添加name属性
        $("#userEmail").attr("name","userEmail");
    })
})

var accountInfo = {
    submitAccount:function(){
        $.serializeObject = function (form) {
            var o = {};
            $.each(form.serializeArray(), function (index) {
                if (o[this['name']]) {
                    o[this['name']] = o[this['name']] + "," + this['value'];
                } else {
                    o[this['name']] = this['value'];
                }
            });
            return o;
        };
        //获取头像路径
        var map = $.serializeObject($("#accountInfoForm"));

        //判断头像是否上传
        if($("#img")[0].src.indexOf("resources/images/userMo.png") != -1){
            map.userImg = '';
        }else{
            map.userImg = $("#img")[0].src;
        }
        //判断姓名是否为空
        if(!map.userName){
            alert("请正确填写[姓名]");
            $("input[name=userName]").focus();
            return;
        }
        //邮箱验证
        if($("input#userEmail").attr("name")== "userName"){
            if(!map.userEmail){
                alert("请正确填写[邮箱]");
                $("input[name=userEmail]").focus();
                return;
            }else{
                var userEmailREG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
                if(!userEmailREG.test(map.userEmail)){
                    alert("请正确填写[邮箱]");
                    $("input[name=userEmail]").focus();
                    return;
                }
            }
        }

        //手机
        // if(!map.userTel){
        //     alert("请正确填写[手机]");
        //     $("input[name=userTel]").focus();
        //     return;
        // }else{
        //     var userTelREG = /^1[34578]\d{9}$/;
        //     if(!userTelREG.test(map.userTel)){
        //         alert("请正确填写[手机]");
        //         $("input[name=userTel]").focus();
        //         return;
        //     }
        // }
        //固定电话
        if($("#userPhone_0").val() && $("#userPhone_1").val()){
            var userPhone = $("#userPhone_0").val()+"-"+$("#userPhone_1").val();
            var phoneREG = /^0\d{2,3}-?\d{7,8}$/;
            if(!phoneREG.test(userPhone)){
                alert("固定电话填写有误");
                $("#userPhone_0").focus();
                return;
            }else{
                map.userPhone = userPhone;
            }
        }
        //传真
        if($("#userFax_0").val() && $("#userFax_1").val()){
            var userFax = $("#userFax_0").val()+"-"+$("#userFax_1").val();
            var userFaxREG = /^0\d{2,3}-?\d{7,8}$/;
            if(!userFaxREG.test(userFax)){
                alert("传真号码填写有误");
                $("#userFax_0").focus();
                return;
            }else{
                map.userFax = userFax;
            }
        }
        //提交操作
        $.ajax({
            type: 'get',
            url: '/user/personCenter/userInfoSubmit',
            data:map,
            async: true,
            dataType: 'json',
            success: function (result) {
                if (result.success) {
                    location.href = "/user/personCenter/accountInfoIndex";
                }
            }
        });
    },
    activateMailbox:function () {
        var map = new Object();
        map.id = $("input[name=id]").val();
        map.userEmail = $("input[name=userEmail]").val();
        $.ajax({
            type: 'get',
            url: '/user/personCenter/activateMailbox',
            data:map,
            dataType: 'json',
            success: function (result) {
                if (result.success) {

                }
            }
        });

    }
}