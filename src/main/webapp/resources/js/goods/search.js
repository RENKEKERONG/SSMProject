
var searchParam = {};
$(document).ready(function () {
    $('.keywordSearch').click(function (obj) {
        var keyword = $('#keyword').val();
        searchGoods({keyword: keyword});
    });

    $('.search').click(function (obj) {
        searchGoods(getParams());
    });

    $('#keyword').keydown(function (e) {
        if (!e) e = window.event;//火狐中是 window.event
        if ((e.keyCode || e.which) == 13) {
            searchGoods({keyword: this.value});
        }
    });

    //上一页
    $('.pageDiv a.icon-left').click(function (obj) {
        var currentPage = $('strong.currentPage').text();
        if (null == currentPage) {
            currentPage = 1;
        }
        var params = getParams();
        params.pageNo = parseInt(currentPage) - 1;
        searchGoods(params);
    });

    //下一页
    $('.pageDiv a.icon-right').click(function (obj) {
        var currentPage = $('strong.currentPage').text();
        if (null == currentPage) {
            currentPage = 1;
        }
        var params = getParams();
        var allPage = $('strong.allPage').text();
        if(currentPage == allPage){
            params.pageNo = parseInt(currentPage);
        }else {
            params.pageNo = parseInt(currentPage) + 1;
        }

        searchGoods(params);
    });

    //页面跳转
    $('a.page-btn').click(function (obj) {
        var currentPage = $('#pageNo').val();
        if (null == currentPage) {
            currentPage = 1;
        }
        var params = getParams();
        var pageNo = 1;
        try {
            pageNo = parseInt(currentPage);
        } catch (e) {
        }
        params.pageNo = pageNo;
        searchGoods(params);
    });

    $(".jian").click(function () {
        var modelId = $(this).attr("idValue");
        var num = parseNum($("#num"+modelId).val());
        var min = parseNum($("#num"+modelId).attr("quantity"));
        num = num - 1 <= 0 ? 1 : num - 1;
        if(num<parseNum(min)){
            num = min;
        }
        $("#num"+modelId).val(num);
    });
    $(".jia").click(function () {
        var modelId = $(this).attr("idValue");
        var num = parseNum($("#num"+modelId).val());
        var min = parseNum($("#num"+modelId).attr("quantity"));
        num = num + 1;
        if(num<parseNum(min)){
            num = min;
        }
        $("#num"+modelId).val(num);
    });
});
function parseNum(num) {
    num = parseInt(num);
    return isNaN(num) ? 1 : num;
};
function getParams() {
    var keyword = $('#keyword').val();
    var goodType1 = $('#goodTypeId1').val();
    var goodType2 = $('#goodTypeId2').val();
    var goodType3 = $('#goodTypeId3').val();
    var category = $('#category').val();
    var params = {keyword: keyword, goodType1: goodType1, goodType2: goodType2, goodType3: goodType3,category: category};
    //价格范围
    var gtPrice = $('.priceInput.gtPrice').val();
    var ltePrice = $('.priceInput.ltePrice').val();
    if (tools.isNotEmpty(ltePrice)) {
        params.ltePrice = ltePrice;
        if (tools.isEmpty(gtPrice)) {
            gtPrice = 0;
        }
    }
    if (tools.isNotEmpty(gtPrice)) {
        params.gtPrice = gtPrice;
    }
    return params;
}

function doOrderBy(obj, sort) {
    var sortType = $("#sortType").val();
    if (tools.isEmpty(sortType)) {
        sortType = "0";
    } else {
        if (sortType == 0) {
            sortType = 1;
        } else {
            sortType = 0;
        }
    }
    var params = getParams();
    var url = window.location.href;
    url = url.substring(0, url.indexOf("?"))
    var p = "";
    if (null != params.gtPrice) {
        p += "&gt=" + params.gtPrice;
    }
    if (null != params.ltePrice) {
        p += "&lte=" + params.ltePrice;
    }
    if (tools.isNotEmpty(sort)) {
        if (tools.isNotEmpty(sortType)) {
            p += "&sort=" + sort + "&st=" + sortType;
        } else {
            p += "&sort=" + sort;
        }
    }

    if (tools.isNotEmpty(p)) {
        url += "?" + p.substring(1);
    }
    window.location.href = url;
}

function searchGoods(params) {
    if (null == params.pageNo) {
        params.pageNo = "";
    }
    if (params.pageNo < 1) {
        params.pageNo = 1;
    }
    if (params.pageNo > 10) {
        params.pageNo = 10;
    }

    //var params = {pageNo:pageNo,keyword:keyword};
    search(params);
    // window.location.href="/goods/search/k"+keyword+"_b_t1_t2_t3_p"+pageNo+".html";
}

/**
 * 搜索
 */
function search(params) {
    var goodType1 = "", goodType2 = "", goodType3 = "", keyword = "", pageNo = "",category="";
    if (null != params) {
        if (tools.isNotEmpty(params.pageNo)) {
            pageNo = params.pageNo;
        }
        if (tools.isNotEmpty(params.keyword)) {
            keyword = params.keyword;
        }
        if (tools.isNotEmpty(params.goodType1)) {
            goodType1 = params.goodType1;
        }
        if (tools.isNotEmpty(params.goodType2)) {
            goodType2 = params.goodType2;
        }
        if (tools.isNotEmpty(params.goodType3)) {
            goodType3 = params.goodType3;
        }
        if (tools.isNotEmpty(params.category)) {
            category = params.category;
        }
        searchParam = params;
    }
    var url = "/goods/search/k" + keyword + "_b_t1" + goodType1 + "_t2" + goodType2 + "_t3" + goodType3 + "_p" + pageNo +"_c"+category+ ".html";
    var p = "";
    if (null != params.gtPrice) {
        p += "&gt=" + params.gtPrice;
    }
    if (null != params.ltePrice) {
        p += "&lte=" + params.ltePrice;
    }
    if (tools.isNotEmpty(p)) {
        url += "?" + p.substring(1);
    }
   window.location.href = url;
  //   $.ajax({
  //       url:url
  //   })
}

/**
 * 按照分类搜索
 * @param keyword
 * @param pageNo
 */
function searchGoodType(goodType, type) {
    if (null == searchParam) {
        searchParam = {};
    }
    if (tools.isNotEmpty(goodType)) {
        if (type == 1) {
            searchParam.goodType1 = goodType;
        } else if (type == 2) {
            searchParam.goodType2 = goodType;
        } else if (type == 3) {
            searchParam.goodType3 = goodType;
        }
    }
    var category = $('#category').val();
    if (!category){
        category=0;
    }
    searchParam.category=category;
    search(searchParam);
}

//加入购物车
function buyNow(goodsId,modelId,buyNow) {
    //获取当前选中的商品
    var goodNums = $("#num"+modelId).val();
    var data = {
        goodsId: goodsId,
        modelId: modelId,
        goodNums: goodNums
    };

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

//加入购物车
function addShopCart(goodsId,modelId,buyNow) {
    //获取当前选中的商品
    var goodNums = $("#num"+modelId).val();
    var minOrderQuantity =$("#minOrderQuantity"+modelId).val();
    if (!goodNums){
        if (minOrderQuantity) {
            goodNums=minOrderQuantity;
        }else {
            goodNums=1;
        }
    }
    var data = {
        goodsId: goodsId,
        modelId: modelId,
        goodNums: goodNums
    };
    var serviceList = new Array();
    var categorySingle = $("#category").val();

        serviceList.push({serviceName: '自主', servicePrice: '0', serviceType: 1});
        serviceList.push({serviceName: '纸箱', servicePrice: '0', serviceType: 2});
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