$(document).ready(function(){
    ShoppingList.getProvinceList();
    $("#addressSaveBtn").click(function(){
        //保存用户收货地址
        ShoppingList.saveAddress();
    });

});
ShoppingList = {
    //获取省份
    provinceSelectHtml:"",
    provinceId:"",
    cityId:"",
    districtId:"",
    getProvinceList:function(){
        $.ajax({
            type : 'post',
            url : '/auth/address/getProvinceList',
            data : {},
            dataType : 'json',
            success : function(result) {
                if (result.success) {
                    //areaSelect
                    if(null==result.data){
                        return false;
                    }
                    var provinceList = result.data.provinceList;
                    var companyInfo = result.data.companyInfo;
                    var receiverName = result.data.receiverName;
                    var mobilePhone = result.data.mobilePhone;
                    $("#receiverName").val(receiverName);
                    $("#detailAddress").val(companyInfo.address);
                    $("#mobilePhone").val(mobilePhone);
                    var html = "";
                    $("#provinceSelect");
                    for(var i=0;i<provinceList.length;i++){
                        var addr = provinceList[i];
                        html += "<option value=\""+addr.id+"\">"+addr.provinceName+"</option>";
                    }
                    ShoppingList.provinceSelectHtml = html;
                    ShoppingList.provinceId=companyInfo.province;
                    ShoppingList.cityId=companyInfo.city;
                    ShoppingList.districtId=companyInfo.area;
                } else {
                }
            }
        });
    },
    getCityList:function(provinceId,callback){
        $.ajax({
            type : 'post',
            url : '/auth/address/getCityList',
            data : {provinceId:provinceId},
            dataType : 'json',
            cache:false,
            async:true,
            success : function(result) {
                if (result.success) {
                    var html = "";
                    //areaSelect
                    if(null==result.data){
                        return;
                    }
                    var html = "";
                    for(var i=0;i<result.data.length;i++){
                        var addr = result.data[i];
                        html += "<option value=\""+addr.id+"\">"+addr.cityName+"</option>";
                    }
                    callback(html);
                } else {
                }
            }
        });
    },
    getDistrictList:function(cityId,callback){
        $.ajax({
            type : 'post',
            url : '/auth/address/getDistrictList',
            data : {cityId:cityId},
            dataType : 'json',
            cache:false,
            async:true,
            success : function(result) {
                if (result.success) {
                    var html = "";
                    //areaSelect
                    if(null==result.data){
                        return;
                    }
                    var html = "";
                    for(var i=0;i<result.data.length;i++){
                        var addr = result.data[i];
                        html += "<option value=\""+addr.id+"\">"+addr.districtName+"</option>";
                    }
                    callback(html);
                } else {
                }
            }
        });
    },
    saveAddress:function(){
        var name = $(".editPrice").find("input.name").val();
        var info = $(".editPrice").find("input.info").val();
        var phone = $(".editPrice").find("input.phone").val();

        var province = $("#provinceSelect").val();
        var provinceName = $("#provinceSelect").find("option:selected").text();
        var city = $("#citySelect").val();
        var cityName = $("#citySelect").find("option:selected").text();
        var district = $("#districtSelect").val();
        var districtName = $("#districtSelect").find("option:selected").text();

        if(tools.isEmpty(name)){
            layer.msg('客户姓名不能为空');
            // alert("客户姓名不能为空");
            return false;
        }
        if(tools.isEmpty(provinceName)){
            layer.msg('省份不能为空');
            // alert("省份不能为空");
            return false;
        }
        if(tools.isEmpty(cityName)){
            layer.msg('城市不能为空');
            // alert("城市不能为空");
            return false;
        }
        if(tools.isEmpty(info)){
            layer.msg('详细地址不能为空');
            // alert("详细地址不能为空");
            return false;
        }
        if(tools.isEmpty(phone)){
            layer.msg('移动电话不能为空');
            // alert("移动电话不能为空");
            return false;
        }

        $.ajax({
            type : 'post',
            url : '/auth/address/saveAddress',
            data : {
                name:name,
                info:info,
                phone:phone,
                province:province,
                provinceName:provinceName,
                city:city,
                cityName:cityName,
                district:district,
                districtName:districtName
            },
            dataType : 'json',
            cache:false,
            async:true,
            success : function(result) {
                if (result.success) {
                    layer.msg('添加成功');
                    // alert("添加成功");
                    window.location.reload();
                } else {
                    //失败
                    if(result.msg){
                        layer.msg(result.msg);
                        // alert(result.msg);
                    }else{
                        layer.msg('加入购物车失败');
                        // alert("加入购物车失败");
                    }
                    return false;
                }
            }
        });
    },

    //下单
    submitOrder: function(status){
        //获取订单信息
        var totalPrice =0;
        var shopPrice = parseFloat($('#shopPrice').text().replace("¥",''));
        var payType = parseInt($('#payWay').find("span.on").attr("value"));
        var deliveryId = parseInt($("span.chooseExpress.on").attr("id"));
        var tranType = parseInt($('#tranType').find("span.on").attr("value"));
        var transitPrice = parseFloat($("#transitPrice").text().replace("¥",''));
        var installPrice = parseFloat($("#installPrice").text().replace("¥",''));
        var tranMoney = parseFloat($("#tranMoney").text().replace("¥",''));
        var packagePrice = parseFloat($("#packagePrice").text().replace("¥",''));
        //获取商品
        var trs = $("tr.goodsDataTr");
        var shopCartIds = [];
        if(null!=trs || trs.length>0){
            for(var i=0;i<trs.length;i++){
                var cartId = $(trs[i]).attr("cartid");
                if(tools.isNotEmpty(cartId)){
                    shopCartIds.push(parseInt(cartId));
                }

            }
        }
        if(shopCartIds.length==0){
            layer.msg('购物清单为空');
            // alert("购物清单为空");
            return false;
        }
        var addressId = parseInt($("#currentAddress").attr("addressId"));
        var addressFlag =Object.is(NaN,addressId);
        if(addressFlag){
            layer.msg('请维护收货地址');
            // alert("请选择收货地址");
            return false;
        }
        totalPrice=transitPrice+tranMoney+installPrice+packagePrice+shopPrice;
        var data ={
            payType : payType,
            tranType : tranType,
            cartIdsStr:shopCartIds.join(","),
            addressId:addressId,
            remark:$("#orderRemark").val(),
            transitPrice:transitPrice,
            addressId:addressId,
            tranMoney:tranMoney,
            installPrice:installPrice,
            packagePrice:packagePrice,
            orderMoney:shopPrice,
            areaId:addressId,
            totalMoney: totalPrice,
            realPrice: totalPrice,
            orderStatus: status,
            logisticsCompany:deliveryId

        };
        $.ajax({
            type : 'post',
            url : '/auth/order/submitOrder',
            data : data,
            async: false,
            dataType : 'json',

            //contentType : 'application/json;charset=utf-8', //设置请求头信息
            beforeSend: function () {
                layer.load();
            },
            success : function(result) {
                if (result.success) {
                    var orderId = result.data;
                    $("#orderId").val(orderId);
                    layer.msg("订单提交成功");
                    $("#exportQuotation").hide();
                    $("#submitOrder").hide();
                    //成功加入购物车
                    //跳转支付页面
                     //window.location.href=${base_mall.mallAdmin}+"manage/index?type=buyOrder";
                    // window.location.href= mallBuyOrder;
                    layer.closeAll('loading');
                } else {
                    if (result.data) {
                        login.wLogin();
                        return;
                    }
                    layer.closeAll('loading');
                    //失败
                    if(result.msg){
                        layer.msg(result.msg);
                        // alert(result.msg);
                    }else{
                        layer.msg('失败！');
                    }
                    return false;
                }
            }
        });
    }
}