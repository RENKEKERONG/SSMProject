$.pxAjax = function (url, data, callback, type, status) {
    if (jQuery.isFunction(data)) {
        status = status || type;
        type = callback;
        callback = data;
        data = undefined;
    }
    if (status == undefined) status = true;
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        success: function (result) {
            callback(result);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.toast("提示", textStatus, "error");
        }
    });
}

//行业类型
function cerficationModel() {
    // dom加载完毕
    var $modal = $('#myModal');
    $modal.modal({
        backdrop: 'static'
    });
    // 测试 bootstrap 居中
    $modal.on('show.bs.modal', function () {
        var $this = $(this);
        /* 完成拖拽 */
        // $this.draggable({
        //     cursor: "move",
        //     handle: '.modal-header'
        // });
        var $modal_dialog = $this.find('.modal-dialog');
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $this.css('display', 'block');
        $modal_dialog.css({
            'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)
        });
    });
}

//存放省后台传过来的数据
var industryArray = [];
$(function () {
    var map = new Object();
    map.pid = 0;
    var parme = new Object();
    parme.map = map;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/user/personCenter/selectIndustryType",
        data: parme,
        beforeSend: function () {
            $("#cerTable").children().remove();
            $("#cerTable").append('<tr><td style="height: 40px" colspan="10" align="center"><img width="40px" height="40px" src="/resource/assets/images/wait.gif"></td></tr>');
        },
        success: function (data) {
            if (null != data.data) {
                $("#cerTable").empty();
                var html = $.template('cerTemplate', {cerList: data.data});
                $("#cerTable").append(html);
                industryArray = data.data;
            }
        },
        error: function (data) {
        }
    });
})
//定义三个数据，用来存放行业类型的ID
var industry1Array = [];
var industry2Array = [];
var industry3Array = [];
//用于接收行业类型1的名字
var industryName1;
//存放行业类型的所有的ID
var objecArray = new Array();
//存放市后台传过来的数据
var inArray1 = [];
var x = 0;//控制点击行业类型时,0为行业类型1，1为行业类型2，2为行业类型3
function industry1(id) {
    //行业类型可以增加多个，使用0进行分割
    var map = new Object();
    map.pid = id;
    var parme = new Object();
    parme.map = map;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/user/personCenter/selectIndustryType',
        data: parme,
        beforeSend: function () {
            $("#cerTable2").children().remove();
            // $("#cerTable2").append('<tr><td style="height: 40px" colspan="10" align="center"><img width="40px" height="40px" src="/resource/assets/images/wait.gif"></td></tr>');
        },
        success: function (data) {
            if (null != data.data) {
                $("#cerTable2").empty();
                var html = $.template('cerTemplate2', {cerList2: data.data});
                $("#cerTable2").append(html);
                inArray1 = data.data;
            }
        },
        error: function (data) {
        }
    });
    for (var i = 0; i < industryArray.length; i++) {
        if (id == industryArray[i].id) {
            industryName1 = industryArray[i].industryName;
            $("#addName").val(industryArray[i].industryName);
            if (industry1Array.length == 0) {
                industry1Array.push(industryArray[i].id);
            } else {
                industry1Array = [];
                industry1Array.push(industryArray[i].id);
            }
        }
    }
}

//用于接收行业类型2的名字
var industryName2;
//存放区后台传过来的数据
var inArray2 = [];

function industry2(id) {
    var map = new Object();
    map.pid = id;
    var parme = new Object();
    parme.map = map;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/user/personCenter/selectIndustryType',
        data: parme,
        beforeSend: function () {
            $("#cerTable3").children().remove();
            // $("#cerTable2").append('<tr><td style="height: 40px" colspan="10" align="center"><img width="40px" height="40px" src="/resource/assets/images/wait.gif"></td></tr>');
        },
        success: function (data) {
            if (null != data.data) {
                $("#cerTable3").empty();
                var html = $.template('cerTemplate3', {cerList3: data.data});
                $("#cerTable3").append(html);
                inArray2 = data.data;
            }
        },
        error: function (data) {
        }
    });
    for (var i = 0; i < inArray1.length; i++) {
        if (id == inArray1[i].id) {
            industryName2 = inArray1[i].industryName;
            // var value =document.getElementById("addName").value;
            $("#addName").val(industryName1 + "-" + inArray1[i].industryName);
            if (industry2Array.length == 0) {
                industry2Array.push(id);
            } else {
                industry2Array = [];
                industry2Array.push(id);
            }
        }
    }

}

function industry3(id) {
    for (var i = 0; i < inArray2.length; i++) {
        if (id == inArray2[i].id) {
            var value = document.getElementById("addName").value;
            $("#addName").val(industryName1 + "-" + industryName2 + "-" + inArray2[i].industryName);
            if (industry3Array.length == 0) {
                industry3Array.push(id);
            } else {
                industry3Array = [];
                industry3Array.push(id);
            }
        }
    }
}

//向页面添加行业类型时
var i = 0;
//主要用来判断页面最多可增加6个
var count = 0;

function addToDiv() {
    $("#cerTable2").children().remove();
    $("#cerTable3").children().remove();
    //将行业类型的ID存入数组,且将三个行业类型的数据都清空，重新添加
    if (industry1Array.length == 1 && industry2Array.length == 1 && industry3Array.length == 1) {
        objecArray.push(industry1Array[0]);
        objecArray.push(industry2Array[0]);
        objecArray.push(industry3Array[0]);
        industry1Array = [];
        industry2Array = [];
        industry3Array = [];
    }

    var flag = false;
    var addName = document.getElementById("addName").value;
    var company_type = document.getElementById("company_type").childNodes;
    for (var i = 0; i < company_type.length; i++) {
        var flag = company_type[i].textContent.includes(addName);
        if (company_type[i].nodeType == 3) {
            count++;
        }
        if (flag) {
            return;
        }
    }
    if (count == 24) {
        $.toast("提示", "行业类型最多课插入6个", "false");
        return;
    }
    if (!flag) {
        i++
        var HTML = "<div>" + addName + "&nbsp;&nbsp;&nbsp<a onclick='romveAddType(" + i + ")' " +
            "style='color:red;cursor:pointer'>移除</a></div>";
        //生成HTML
        var elem_li = document.createElement('div'); // 生成一个 li元素
        elem_li.id = "del" + i;
        elem_li.innerHTML = HTML; // 设置元素的内容
        document.getElementById('company_type').appendChild(elem_li); // 添加到UL中去
    }
}

var sc = 0;

function romveAddType(id) {
    var idName = "del" + id;
    var elementById = document.getElementById("company_type");//父标签
    var elementUl = document.getElementById(idName);//字表签
    elementById.removeChild(elementUl);//删除
    id = id - sc;

    var start = (id - 2) * 3;
    if (start < 0) {
        start = 0;
    }
    // var end = (id-1)*4-1;
    objecArray.splice(start, 3);
    sc++;


}


//初始化省
var provinceArray = [];
var cityArray = [];
var districtArray = [];

function choiceProvince(provinceId) {
    //先将省和市隐藏
    // $("#areaCity").hide();
    // $("#areaDistrict").hide();
    $.pxAjax("/user/personCenter/selectProvince", "", function (data) {
        if (data.success) {
            $("#province1").empty();
            for (var i = 0; i < data.data.length; i++) {
                if (i == 0) {
                    $("#province1").append("<option selected  id=''>" + '请选择' + "</option>");
                }
                if (data.data[i].id == provinceId) {
                    var typeId = 'province' + data.data[i].id;
                    $("#province1").append("<option  selected id=" + typeId + ">" + data.data[i].provinceName + "</option>");
                } else {
                    var typeId = 'province' + data.data[i].id;
                    $("#province1").append("<option id=" + typeId + ">" + data.data[i].provinceName + "</option>");
                }
                if (i == data.data.length - 1) {
                }
            }
            chooseProvince();
        } else {
            $.toast("提示", result.msg, "warning");
        }
    }, 'POST');
}

//初始化省
$(function () {
    choiceProvince();
})
// function initProvince(id) {
//     var obj = document.getElementById("province1");
//     var sele = obj.options;
//     sele[0].onclick=city(id);
// }

function chooseProvince() {
    var obj = document.getElementById("province1");
    var sele = obj.options;
    obj.onclick = function () {
        var index = obj.selectedIndex;
        var Array = sele[index].id.split("province");
        sele[index].onchange = city(Array[1]);
    }
}

//
//市
function city(id) {
    //给省的id传到省的input框里去
    $("#province").val(id);
    //给省初始化结束
    if (provinceArray.length == 0) {
        provinceArray.push(id);
    } else {
        provinceArray = [];
        provinceArray.push(id);
    }
    $.pxAjax("/user/personCenter/selectCity/" + id, "", function (data) {
        if (data.success) {
            if (data.data.length > 0) {
                $("#areaCity").show();
            } else {
                $("#areaCity").hide();
            }
            $("#city1").empty();
            for (var i = 0; i < data.data.length; i++) {
                if (i == 0) {
                    $("#city1").append("<option selected  id=''>" + '请选择' + "</option>");
                }
                var typeId2 = 'city' + data.data[i].id;
                $("#city1").append("<option  id=" + typeId2 + "  >" + data.data[i].cityName + "</option>");

                // if(i==0){
                //     initCity(data.data[i].id);
                // }
            }
            chooseCity();
        } else {
            $.toast("提示", data.msg, "warning");
        }
    }, 'POST');
}

// function initCity(id) {
//     var obj = document.getElementById("city1");
//     var sele = obj.options;
//     sele[0].onclick=district(id);
// }

function chooseCity() {
    var obj = document.getElementById("city1");
    var sele = obj.options;
    obj.onclick = function () {
        var index = obj.selectedIndex;
        var Array = sele[index].id.split("city");
        sele[index].onchange = district(Array[1]);
    }
}

function district(id) {
    //给市的id传到市的input框里去
    $("#city").val(id);
    //给市初始化结束
    if (cityArray.length == 0) {
        cityArray.push(id);
    } else {
        cityArray = [];
        cityArray.push(id);
    }
    $.pxAjax("/user/personCenter/selectDistrict/" + id, "", function (data) {
        if (data.success) {
            if (data.data.length > 0) {
                $("#areaDistrict").show();
            } else {
                $("#areaDistrict").hide();
            }
            $("#district1").empty();
            for (var i = 0; i < data.data.length; i++) {
                if (i == 0) {
                    $("#district1").append("<option selected id=''>" + '请选择' + "</option>");
                }
                var typeId2 = 'district' + data.data[i].id;
                $("#district1").append("<option  id=" + typeId2 + "  >" + data.data[i].districtName + "</option>");
                // if(i==0){
                //     initDistrict(data.data[i].id);
                // }
            }
            chooseDistrict();
        } else {
            $.toast("提示", data.msg, "warning");
        }
    }, 'POST');
}


function chooseDistrict() {
    try {
        var obj = document.getElementById("district1");
        var sele = obj.options;
        obj.onclick = function () {
            var index = obj.selectedIndex;
            var districtId = sele[index].id;
            var Array = districtId.split("district");
            sele[index].onchange = getDistrictId(Array[1]);
        }
    } catch (e) {

    }
}

function getDistrictId(id) {
    //给区的id传到区的input框里去
    $("#district").val(id);
    //给区初始化结束
    if (districtArray.length == 0) {
        districtArray.push(id);
    } else {
        districtArray = [];
        districtArray.push(id);
    }
}


//提交公司
function saveCompany() {
    var param = new Object();
    var flag = $("#firstForm").valid();
    if (flag) {
        var map = $.serializeObject($("#firstForm"));
        map.companyId = companyId;
        map.array = objecArray.toString();
        param.map = map;
        $.pxAjax("/user/personCenter/creating", param, function (result) {
            if (result.success) {
                location.href = "/user/personCenter/indexing";
            } else {
                $.toast("提示", result.msg, "warning");
            }
        }, 'post');
    }
}


var imgObj;

//图片处理
function saveImg2() {
    var formData = new FormData($("#fileForm1")[0]);
    var form = $("#fileImg").val();
    var imageFormat = form.substring(form.length - 4, form.length);
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
                success: function (returndata) {
                    $(imgObj).attr("src", returndata);
                    $(imgObj).next().val(returndata);
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

function uploadImg(obj) {
    imgObj = obj;
    $("#fileImg").click();
}


var companyId = 0;

function searchCompany(company) {
    console.log("company:"+company);
    /**带着公司的名字去数据库搜索该公司的信息**/
    var param = new Object();
    var map = new Object();
    map.company = company;
    param.map = map;
    $.pxAjax("/user/personCenter/accurateSearchBycom", param, function (data) {
        if (data.success) {
            if (data.data.length > 0) {
                companyId = data.data[0].companyId;
                var data = data.data[0];//该公司的信息
                //现在进行初始化该公司的值
                $("#company").val(data.company);
                $("#company").prop("disabled", true);

                $("#companyName").val(data.companyName);
                $("#companyName").prop("disabled", true);

                $("#address").val(data.address);
                $("#address").prop("disabled", true);


                $("#srcLicense").attr("src", data.license);
                $("#srcLicense").prop("disabled", true);


                $("#tel").val(data.tel);
                $("#tel").prop("disabled", true);
                $("#company_type").attr("readonly", "readonly")


                $("#city1").prop("disabled", true);
                $("#district1").prop("disabled", true);
                $("#province1").prop("disabled", true);
                $('#company_type').attr("disabled", "disabled");  // 禁用
                $("#modalBtn").hide();
                $("#uplicence").hide();


                initProvince(data.province);
                initCity(data.province, data.city);
                initDistrict(data.city, data.area);

                $("#district").val(data.area);
                //将行业类型贴到页面上
                for (var i = 0; i < data.industryList.length; i++) {
                    var addName = data.industryList[i].industryName1 + "-" + data.industryList[i].industryName2 + "-" + data.industryList[i].industryName3;
                    var HTML = "<div style='padding: 0px 10px; '>" + addName + "&nbsp;&nbsp;&nbsp</div>";
                    //生成HTML
                    var elem_li = document.createElement('div'); // 生成一个 li元素
                    elem_li.id = "del" + i;
                    elem_li.innerHTML = HTML; // 设置元素的内容
                    document.getElementById('company_type').appendChild(elem_li); // 添加到UL中去
                    objecArray.push(data.industryList[i].typeId1);
                    objecArray.push(data.industryList[i].typeId2);
                    objecArray.push(data.industryList[i].typeId3);
                }
            }
        } else {
            $.toast("提示", data.msg, "warning");
        }
    }, 'POST');
}


//初始化省
function initProvince(provinceId) {
    //先将省和市隐藏
    $.pxAjax("/user/personCenter/selectProvince", "", function (data) {
        if (data.success) {
            $("#province1").empty();
            $("#province1").append("<option selected  id=''>" + '请选择' + "</option>");
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].id == provinceId) {
                    var typeId = 'province' + data.data[i].id;
                    $("#province1").append("<option selected id=" + typeId + ">" + data.data[i].provinceName + "</option>");
                } else {
                    var typeId = 'province' + data.data[i].id;
                    $("#province1").append("<option id=" + typeId + ">" + data.data[i].provinceName + "</option>");
                }
            }
        } else {
            $.toast("提示", result.msg, "warning");
        }
    }, 'POST');
}

//初始化市
function initCity(provinceId, cityId) {
    $.pxAjax("/user/personCenter/selectCity/" + provinceId, "", function (data) {
        if (data.success) {
            if (data.data.length > 0) {
                $("#city1").show();
            } else {
                $("#city1").hide();
            }
            $("#city1").empty();
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].id == cityId) {
                    $("#city1").append("<option selected  id=''>" + data.data[i].cityName + "</option>");
                }
                var typeId2 = 'city' + data.data[i].id;
                $("#city1").append("<option  id=" + typeId2 + "  >" + data.data[i].cityName + "</option>");
            }
        } else {
            $.toast("提示", data.msg, "warning");
        }
    }, 'POST');
}


//初始化区
function initDistrict(cityId, districtId) {
    $.pxAjax("/user/personCenter/selectDistrict/" + cityId, "", function (data) {
        if (data.success) {
            if (districtId == null || districtId == '') {
                $("#district1").hide();
            } else {
                $("#district1").show();
            }
            $("#district1").empty();
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].id == districtId) {
                    $("#district1").append("<option selected id=''>" + data.data[i].districtName + "</option>");
                } else {
                    var typeId2 = 'district' + data.data[i].id;
                    $("#district1").append("<option  id=" + typeId2 + "  >" + data.data[i].districtName + "</option>");
                }
            }
        } else {
            $.toast("提示", data.msg, "warning");
        }
    }, 'POST');
}


function cerfication() {
    window.location.href = "/user/personCenter/indexing";
}

