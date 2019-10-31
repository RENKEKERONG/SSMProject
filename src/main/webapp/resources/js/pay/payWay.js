$(document).ready(function () {
    $("#payBtn").click(function () {
        //立即支付
        PayWay.doPay();
        // $("#wxPayForm").submit();
    });
});

var PayWay = {
    doPay: function () {
        var payWay = $("#wxPayForm").find("input[name='payWay']:checked").val();
        if (payWay && payWay == 'weixin') {
            var map = $("#wxPayForm").serialize();
            layer.open({
                type: 2,
                title: '微信支付',
                shadeClose: false,
                scrollbar: false,
                shade: 0.8,
                area: ['600px', '600px'],
                content: "/auth/wxpay/wxPay.html?" + map
            });
        }else if(payWay == 'bankTransfer'){
            //银行转账
            var orderId = $("#orderId").val();
            window.location.href="/auth/pay/offlinePay_"+orderId+".html";
        } else if (payWay == 'alipay') {
            layer.msg('尚未开通');
            return;
            //支付宝转账
            var orderId = $("#orderId").val();
            window.location.href = "/auth/alipay/order_" + orderId + ".html";
        }else if (payWay == 'unionPay') {
            layer.msg('尚未开通');
            return;
            //银联支付
            var orderId = $("#orderId").val();
            window.location.href = "/auth/unionpay/order_" + orderId + ".html";
        }
    }
}