$(document).ready(function(){
    //循环执行，每隔2秒钟执行一次showalert（）
    window.setInterval(WxPay.payStateCheck, 2000);
});
WxPay = {
    //支付回调检查
    payStateCheck:function () {
        var orderSn = $("#orderSn").val();
        var orderNo = $("#orderNo").val();
        var data = {orderSn:orderSn};
        debugger;
        $.ajax({
            type : 'post',
            url : '/auth/wxpay/payStateCheck',
            data : data,
            dataType : 'json',
            success : function(result) {
                if (result.success) {
                    //成功加入购物车
                    layer.msg('支付成功');
                    // alert("支付成功");
                    parent.location.href = "/auth/pay/paySuccess_"+orderNo+".html";
                }
            }
        });
    }
}