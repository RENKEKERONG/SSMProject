$(document).ready(function () {
    $('.transformRotate span.guige').click(function (obj) {
        if ($(this).parent().parent().hasClass("noChange")) {
            // if($(this).hasClass("on")){
            //     $(this).removeClass("on");
            // }else {
            //     $(this).addClass("on");
            // }
            $(this).parent().parent().find('span.guige').removeClass("on")
            $(this).addClass("on");
            return false;
        }else {
            $(this).parent().parent().find('span.guige').removeClass("on");
            $(this).addClass("on");
            // if ($(this).parent().hasClass("noChange")) {
            //     // $(this).parent().find('span.guige').toggleClass("on");
            //     return false;
            // }
        }
        var thisModelIds = $(this).attr("modelIds");
        //获取所有选中的属性
        var modelId = "";
        var attrs = $('.attrList span.on');
        if (null != attrs && attrs.length > 0) {
            if (attrs.length == 1) {
                modelId = thisModelIds;
            } else {
                for (var i = 0; i < attrs.length; i++) {
                    if (attrs[i].parentElement == this.parentElement) {
                        continue;
                    }
                    var num = 0;
                    var modelIds = $(attrs[i]).attr("modelIds");
                    var modelIdArr = modelIds.split(",");
                    for (var k = 0; k < modelIdArr.length; k++) {
                        var tmpModelId = modelIdArr[k];
                        if (thisModelIds.indexOf(tmpModelId + ",") > -1 || thisModelIds.endsWith(tmpModelId)) {
                            num++;
                            if (num == attrs.length - 1) {
                                break;
                            }
                        }
                    }
                    if (num == attrs.length - 1) {
                        modelId = tmpModelId;
                        break;
                    }
                }
            }
        }
        //var modelId = $(this).attr("modelId");
        //页面跳转
        if (tools.isEmpty(modelId)) {
            modelId = $(this).attr("modelId");
        }
        var url = "/goods/info_" + modelId.split(",")[0] + "c0.html";
        // console.log(url);
        window.location.href = url;
    });

    $("#partGoods input[name=\"partCheckbox\"]").click(function () {
        GoodsInfo.countPrice();
    });
    $("#relationItem a.sortListParent").click(function () {
        $("#relationItem a.sortListParent").removeClass("cBlue");
        $(this).addClass("cBlue");
        var sortId = $(this).attr("sortId");
        if (tools.isEmpty(sortId)) {
            $("#partGoods li").show();
            return false;
        }
        $("#partGoods li").hide();
        $("#partGoods li.sortListItem_" + sortId).show();
    });
    $(".jian").click(function () {
        var min = $("#num").attr("idValue");
        var num = parseNum($("#num").val());
        num = num - 1 <= 0 ? 1 : num - 1;
        if(num<parseNum(min)){
            num = min;
        }
        $("#num").val(num);
    });
    $(".jia").click(function () {
        var min = $("#num").attr("idValue");
        var num = parseNum($("#num").val());
        var stockQuantity = parseNum($("#stockQuantity").val());
        num = num + 1;
        if(num<parseNum(min)){
            num = min;
        }
       /* if (num>stockQuantity){
            num = stockQuantity;
        }*/
        $("#num").val(num);
    });
});

function parseNum(num) {
    num = parseInt(num);
    return isNaN(num) ? 1 : num;
};
GoodsInfo = {
    //计算已选配件价格
    countPrice: function () {
        var isLogin = $("#isLogin").val();
        if (!isLogin) {
            return false;
        }
        var chks = $("#partGoods input[name=\"partCheckbox\"]:checked");
        if (null == chks || chks.length == 0) {
            return false;
        }
        var totalPrice = 0;
        for (var i = 0; i < chks.length; i++) {
            var tmpPrice = chks[i].value;
            if (tools.isNotEmpty(tmpPrice)) {
                totalPrice += parseInt(tmpPrice);
            }
        }
        $("#partNum").text(chks.length);
        $("#partTotalPrice").text("￥" + totalPrice);

    },
    partBuyNow: function () {
        //获取选中的配件
        var chks = $("#partGoods input[name=\"partCheckbox\"]:checked");
        if (null == chks || chks.length == 0) {
            return false;
        }
        var modelIds = [];
        for (var i = 0; i < chks.length; i++) {
            var modelId = $(chks[i]).attr("modelId")
            modelIds.push(modelId);
        }
        $.ajax({
            type: 'post',
            url: '/auth/shopCart/addShopCartList',
            data: {idList: modelIds.join(",")},
            dataType: 'json',
            // contentType : 'application/json;charset=utf-8', //设置请求头信息
            contentType: "application/x-www-form-urlencoded", // 指定这个协议很重要
            success: function (result) {
                if (result.success) {
                    //成功加入购物车
                    window.location.href = "/auth/shopCart/myShopCart.html";
                } else {
                    if (result.data) {
                        if (result.data==1){
                            login.wLogin();
                            return;
                        }
                        if (result.data==2){
                            window.location.href = "/user/personCenter/indexing";
                            return;
                        }
                    }
                    //登录失败
                    if (result.msg) {
                        layer.msg(result.msg);
                        // alert(result.msg);
                    } else {
                        layer.msg('加入购物车失败！');
                    }
                    return false;
                }
            }
        });
    },
    buyNow: function () {
        GoodsInfo.addShopCart(true);
    },
    //加入购物车
    addShopCart: function (buyNow) {
        //获取当前选中的商品
        var goodsId = $('#goodsId').val();
        var modelId = $('#modelId').val();
        var goodNums = $('#num').val();
        var data = {
            goodsId: goodsId,
            modelId: modelId,
            goodNums: goodNums
        };

        var serviceList = new Array();
        //安装服务
        var installService = $('div.transformRotate.installService span.on');
        if (null != installService || installService.length > 0) {
            var serviceName = $(installService).attr("serviceName");
            var servicePrice = $(installService).attr("price");
            serviceList.push({serviceName: serviceName, servicePrice: servicePrice, serviceType: 1});
        }

        var packService = $('div.transformRotate.packService span.on');
        if (null != packService || packService.length > 0) {
            var serviceName = $(packService).attr("serviceName");
            var servicePrice = $(packService).attr("price");
            serviceList.push({serviceName: serviceName, servicePrice: servicePrice, serviceType: 2});
        }

        if (serviceList.length > 0) {
            data.serviceList = serviceList;
        }

        $.ajax({
            type: 'post',
            url: '/auth/shopCart/addShopCart',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8', //设置请求头信息
            success: function (result) {
                if (result.success) {
                    //成功加入购物车
                    $(".shopCartNum").text(result.data);
                    if (buyNow) {
                        window.location.href = "/auth/shopCart/myShopCart.html";
                    } else {
                        layer.msg('成功加入购物车!');
                    }
                    //跳转购物车
                    // window.location.href="/auth/shopCart/myShopCart.html";
                } else {
                    if (result.data) {
                        if (result.data==1){
                            login.wLogin();
                            return;
                        }
                        if (result.data==2){
                            window.location.href = "/user/personCenter/indexing";
                            return;
                        }
                    }
                    // window.location.href="/user/login/login.html?backurl="+window.location.href;
                    // }
                    //登录失败
                    if (result.msg) {
                        layer.msg(result.msg);
                        // $.tooltip('My God'+result.msg);
                        // alert(result.msg);
                    } else {
                        layer.msg('加入购物车失败！');
                        // $.tooltip('加入购物车失败！');
                        // alert("加入购物车失败");
                    }
                    return false;
                }
            }
        });
    }
}
function showAdaptationList(){
    var ishidden = $(".goodsAdaptation").css("display");
    if (ishidden == "none"){
        $(".goodsAdaptation").show();
    }else {
        $(".goodsAdaptation").hide();
    }

}