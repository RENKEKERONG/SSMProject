$(document).ready(function () {
    $("#payBtn").click(function () {
        //立即支付
        PayWay.doPay();
    });
    $("#fileUploadBtn").click(function () {
        $("#fileImg").click();
    });
});

function delSpan(){
    payImg = "";
    $("#uploadFileShow").html("");
}

var imgObj;
var payImg;
//图片处理
function saveImg2() {
    var formData = new FormData($("#fileForm1")[0]);
    var form = $("#fileImg").val();
    var imageFormat = form.substring(form.length - 4, form.length);
    var spanHtml = "<span class=\"w70 dib\"></span><a href=\"javascript:;\" class=\"cBlue tdu\" id=\"uploadFileName\">汇款凭证</a><span class=\"c999 ml30 cp\" onclick='delSpan();'>删除</span>";
    if (form != "") {
        if (imageFormat == ".jpg" || imageFormat == "jpeg" || imageFormat == ".gif" || imageFormat == ".png" || imageFormat == ".bmp" || imageFormat == ".JPG" || imageFormat == ".JPEG" || imageFormat == ".GIF" || imageFormat == ".PNG" || imageFormat == ".BMP") {
            $.ajax({
                url: "/manage/baseDocument/upload/3",
                type: 'POST',
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    // $(imgObj).attr("src", returndata);
                    // $(imgObj).next().val(returndata);
                    payImg = result;
                    $("#uploadFileShow").html(spanHtml);
                    $("#fileImg").val("");
                },
                error: function (returndata) {
                    layer.msg("图片格式不支持或者名称不支持");
                }
            });
        } else {
            layer.msg("图片格式不支持或者名称不支持");
        }
    }
}
function uploadImg(obj) {
    imgObj = obj;
    $("#fileImg").click();
}

/**
 * 银行转账提交
 */
function offlinePaySubmit() {
    var mallOrderInstalmentId = $("#mallOrderInstalmentId").val();
    if(tools.isEmpty(mallOrderInstalmentId)){
        layer.msg('订单ID为空');
        return false;
    }
    if(tools.isEmpty(payImg)){
        layer.msg('请先上传转账凭证');
        return false;
    }
    var data = {orderId:mallOrderInstalmentId,payImg:payImg};
    $.ajax({
        url: "/auth/pay/offlinePaySubmit",
        type: 'POST',
        data: data,
        async: false,
        cache: false,
        dataType : 'json',
        beforeSend: function () {
            layer.load();
        },
        success: function (result) {
            if (result.success) {
                layer.closeAll('loading');
                layer.msg('付款信息提交成功！');
                var orderNo = $("#orderNo").val();
                parent.location.href = "/auth/pay/offlineSuccess_"+orderNo+".html";
            }else {
                layer.closeAll('loading');
                //失败
                if(result.msg){
                    layer.msg(result.msg);
                    $("#forbidId").removeAttr("onclick");
                }else{
                    layer.msg('付款信息提交失败！');
                }
                return false;
            }

        },
        error: function (result) {
            layer.closeAll('loading');
            if(result.msg){
                layer.msg(result.msg);
            }else{
                layer.msg('提交失败！');
            }
        }
    });
}