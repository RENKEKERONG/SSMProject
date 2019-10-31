$(function() {
	$('.transformRotate span.guige').click(function (obj) {
		if ($(this).parent().parent().hasClass("noChange")) {
			$(this).parent().parent().find('span.guige').removeClass("on")
			$(this).addClass("on");
			return false;
		}else {
			$(this).parent().parent().find('span.guige').removeClass("on");
			$(this).addClass("on");
		}
	})

					$("#ctab .trLine").each(function() {
						numfun($(this));
					});
					totalPriceFun();

					checkFun();

					$("#addcar").click(function() {
						$.post("/addshopcart.do", {
							goodsId: $("#goodsId").val(),
							num: $("#num").val()
						}, function(a) {
							if(a.success == "true") {
								window.location = "/shopcart/addsuccess.do";
							} else {
								alert(a.msg);
							}
						})

					})

					$("#jieshu").click(function() {
						layer.load();
						var productId = new Array();
						var num = new Array();

						$("#ctab .check:checked").each(function(i) {
							//	alert($(this).val());
							productId.push($(this).val());
							var tr = $(this).closest(".tr");
							var inp = tr.find(".inp");
							var num1 = parseNum(inp.val());
							num.push(num1);
						});

                        $("#productIds").val(productId.join(","));

                        $('#jiesuanFrom').submit();

					})
				});
				//加减
				function numfun(obj) {
					var box = $(obj);
					var inp = box.find(".inp");
					var jian = box.find(".jian");
					var jia = box.find(".jia");
					var productId = box.find("input[name='productId']").val();
					jian.click(function() {
						var num = parseNum(inp.val());
						var min = parseNum(inp.attr("idValue"));
						num = num - 1 <= 0 ? 1 : num - 1;
						if(num<min){
							num = min;
						}
						inp.val(num);
						ajaxUpdateGoodNums(productId,num);
						$(this).closest(".trLine").find("span.serviceNum").text(num);
                        $(this).closest(".trLine").find("span.serviceService").text(num);
						totalfun();
					});
					jia.click(function() {
						var num = parseNum(inp.val());
						var min = parseNum(inp.attr("idValue"));
						//var max = parseNum(inp.attr("stockQuantity"));
						/*if (max ==0){
							max=min;
						}*/
						num = num + 1;
						if(num<min){
							num = min;
						}
					/*	if (num>max){
							num = max;
						}*/
						inp.val(num);
						ajaxUpdateGoodNums(productId,num);
						$(this).closest(".trLine").find("span.serviceNum").text(num);
                        $(this).closest(".trLine").find("span.serviceService").text(num);
						totalfun();
					});
					inp.keyup(function() {
						var num = parseNum(inp.val());
                        $(this).closest(".trLine").find("span.serviceService").text(num);
						inp.val(num);
						totalfun();
					});

					var total = box.find(".total");
					var price = parseFloat(box.find(".price b").text());
					var installPrice=parseFloat(box.find(".calculateServicePrice0").attr("servicePrice"));
					var packagePrice=parseFloat(box.find(".calculateServicePrice1").attr("servicePrice"));
					price=price+installPrice;
					price=price+packagePrice;
					var totalfun = function(num) {
						total.text((price * inp.val()).toFixed(0));
						totalPriceFun();
					};
					totalfun();
					inp.change(function() {
						totalfun();
					});
				}

				function parseNum(num) {
					num = parseInt(num);
					return isNaN(num) ? 1 : num;
				};

				function checkFun() {
					var check = $("#ctab .check");
					var checkAll = $(".checkAll");
					var checkSubAll = $(".checkSubAll");

					var addedService = $(".addedService");
					var serviceDelete = $(".serviceDelete");
					var delSelect = $(".delSelect");
					var clearSelect = $(".clearSelect");
					var del = $("#ctab .del");
					var setClass = function(obj) {
						var tr = obj.closest(".tr");
						var cartId = obj.val();
						if(obj.is(':checked')) {
							tr.addClass("tron");
							$("#cart"+cartId).addClass("cartColor");
						} else {
							tr.removeClass("tron");
							$("#cart"+cartId).removeClass("cartColor");
						}
					}
					check.each(function() {
						$(this).change(function() {
							setClass($(this));
							totalPriceFun();
						}).trigger("change");
					});

					checkSubAll.click(function() {
						var curCheck = $(this).parent().parent().next("div").find(".check");
						if($(this).is(':checked')) {
							curCheck.each(function() {
								$(this).get(0).checked = true;
								setClass($(this));
								$(this).trigger("change");
							});
							$(this).get(0).checked = true;
						} else {
							curCheck.each(function() {
								$(this).get(0).checked = false;
								setClass($(this));
								$(this).trigger("change");
							});
							$(this).get(0).checked = false;
						}
					});

					checkAll.click(function() {
						if($(this).is(':checked')) {
							check.each(function() {
								$(this).get(0).checked = true;
								setClass($(this));
								$(this).trigger("change");
							});
							checkAll.each(function() {
								$(this).get(0).checked = true;
							});
							checkSubAll.each(function() {
								$(this).get(0).checked = true;
							});
						} else {
							check.each(function() {
								$(this).get(0).checked = false;
								setClass($(this));
								$(this).trigger("change");
							});
							checkAll.each(function() {
								$(this).get(0).checked = false;
							});
							checkSubAll.each(function() {
								$(this).get(0).checked = false;
							});
						}
					});
					//增值服务
					addedService.click(function (obj) {
						var itemId = $(this).parent().parent().parent().parent().parent().attr("cartId");
						$.ajax({
							type : 'post',
							url : '/auth/shopCart/getModelService',
							data : {
								cartId : itemId
							},
							dataType : 'json',
							success : function(result) {
								if (result.success) {
									var goodsinfo=result.data;
									var installTotalPricre =goodsinfo.installTotalPrice;
									if (goodsinfo.packsList[0]) {
										var packPrice = goodsinfo.packsList[0].packPrice;
									}
									if (packPrice) {
										$('#wooden'+itemId).attr("price",packPrice);
									}else {
										$('#wooden'+itemId).attr("price",0);
									}
									if (installTotalPricre) {
										$("#visit"+itemId).attr("price",installTotalPricre);
									}else {
										$("#visit"+itemId).attr("price",0);
									}

								} else {
									//失败
									if(result.msg){
										alert(result.msg);
									}
									return false;
								}
							}
						})
						var serviceList = $(".serviceName"+itemId).text();
						var selectId = "#sj-service"+itemId;
						var ishidden = $(selectId).css("display");
						if (ishidden == 'none'){
							if (serviceList.indexOf("纸箱")!= -1){
								$("#carton"+itemId).addClass("on");
							}
							if (serviceList.indexOf("木箱")!= -1){
								$("#wooden"+itemId).addClass("on");
							}
							if (serviceList.indexOf("自主")!= -1){
								$("#autonomy"+itemId).addClass("on");
							}
							if (serviceList.indexOf("上门")!= -1){
								$("#visit"+itemId).addClass("on");
							}
							$("#sj-service"+itemId).show();

						} else {
							$(".guige").removeClass("on");
							$(selectId).hide();
						}
						/*var modelId = $(this).closest(".trLine").attr("modelId");
						showGoodsService(modelId);*/
					});
					//删除增值服务
					serviceDelete.click(function () {
						//应该要弹框确认
						var cartServiceId = $(this).attr("cartServiceId");
						$(this).closest(".cartService").remove();
						$.ajax({
							type : 'post',
							url : '/auth/shopCart/removeShopCartService',
							data : {
								serviceId : cartServiceId
							},
							dataType : 'json',
							success : function(result) {
								if (result.success) {
									//成功删除


								} else {
									//失败
									if(result.msg){
										alert(result.msg);
									}else{
										alert("删除失败");
									}
									return false;
								}
							}
						});
					});
					//删除
					del.click(function() {
						//应该要弹框确认
						var id = $(this).closest(".trLine").attr("cartId");
						ajaxRemoveShopCart(id);
						$(this).closest(".trLine").remove();
						totalPriceFun();
					});
					//删除选中
					delSelect.click(function() {
						var trs = $("#ctab .check:checked");
						for(var i=0;i<trs.length;i++){
							var id = $(trs[i]).val();
							$(trs[i]).closest(".trLine").remove();
							ajaxRemoveShopCart(id);
						}
						totalPriceFun();
					});
					//清空购物车
					clearSelect.click(function () {
						ajaxClearShopCart();
						$("#ctab .trLine").remove();
					});

				}
				//总价格
				function totalPriceFun() {
					var totalPrice = $(".totalPrice");
					var jian = $(".totalNum");
					var total = 0;
					var jianNum = 0;
					$("#ctab .check:checked").each(function(i) {
						var tr = $(this).closest(".trLine");
						var cartId =tr.attr("cartId");
						var inp = tr.find(".inp");
						var num = parseNum(inp.val());
						var price = parseFloat(tr.find(".price b").text());
						var installPrice=parseFloat($('#cart'+cartId+" .calculateServicePrice0").attr("servicePrice"));
						var packagePrice=parseFloat($('#cart'+cartId+" .calculateServicePrice1").attr("servicePrice"));
						var  installFlag = Object.is(NaN,installPrice);
						var  packageFlag = Object.is(NaN,packagePrice);
						if (installFlag) {
							installPrice=0;
						}
						if (packageFlag) {
							packagePrice=0;
						}
						price=price+installPrice;
						price=price+packagePrice;
						total += price * num;
						tr.find(".total").text((price * num).toFixed(0))
						jianNum++;
					});
					totalPrice.text(total.toFixed(0));
					jian.text(jianNum);
				}

				//异步更新数据库的数量
				function ajaxUpdateGoodNums(id, goodNums) {
					$.ajax({
						type : 'post',
						url : '/auth/shopCart/updateGoodNums',
						data : {
							id : id,
							goodNums : goodNums
						},
						dataType : 'json',
						success : function(result) {
							if (result.success) {
								//成功加入购物车
								//alert("成功加入购物车");
							} else {
								//失败
								if(result.msg){
									alert(result.msg);
								}else{
									alert("修改失败");
								}
								return false;
							}
						}
					});
				}
		//获取增值服务
		function showGoodsService(modelId) {
			$.ajax({
				type : 'post',
				url : '/auth/shopCart/getGoodsService',
				data : {
					id : modelId
				},
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						//成功
						$("#sj-service").attr("display","block");
					} else {
						//失败
						if(result.msg){
							alert(result.msg);
						}else{
							alert("获取失败");
						}
						return false;
					}
				}
			});
		}
		//删除购物车商品
		function ajaxRemoveShopCart(id) {
			$.ajax({
				type : 'post',
				url : '/auth/shopCart/removeShopCart',
				data : {
					id : id
				},
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						//成功删除
						layer.msg('刪除购物车成功！');
					} else {
						//失败
						if(result.msg){
							alert(result.msg);
						}else{
							alert("删除失败");
						}
						return false;
					}
				}
			});
		}
		//清空购物车
		function ajaxClearShopCart() {
			$.ajax({
				type : 'post',
				url : '/auth/shopCart/clearShopCart',
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						//成功清空购物车
						layer.msg('成功清空购物车！');
					} else {
						//失败
						if(result.msg){
							alert(result.msg);
						}else{
							alert("清空失败");
						}
						return false;
					}
				}
			});
		}
		function hideDiv(itemId) {
			$(".guige").removeClass("on");
			$("#sj-service"+itemId).hide();
		}
		function selectService(itemId) {
			var serviceList = new Array();
			//安装服务
			var arr = new Array();
			 $('.service'+itemId).each(function () {
				arr.push($(this).attr("cartServiceId"));
			});
			 var map = {};
			/*var serviceId = $(serviceSpan).attr("cartServiceId");*/
			var installService = $('.installService'+itemId+' span.on');
			if (null != installService || installService.length > 0) {
				var serviceName = $(installService).attr("serviceName");
				var servicePrice = $(installService).attr("price");
				//serviceList.push({serviceName: serviceName, servicePrice: servicePrice, serviceType: 1});
				serviceList.push(serviceName+','+servicePrice+','+1);
			}
			//包装服务
			var packService = $('.packService'+itemId+' span.on');
			if (null != packService || packService.length > 0) {
				var serviceName = $(packService).attr("serviceName");
				var servicePrice = $(packService).attr("price");
				//serviceList.push({serviceName: serviceName, servicePrice: servicePrice, serviceType: 2});
				serviceList.push(serviceName+','+servicePrice+','+2);
			}
			map.serviceId=arr;
			map.serviceList=serviceList;
			map.cartId=itemId;
			$.ajax({
				type: 'post',
				url:'/auth/shopCart/addShopCartService',
				data: {
					"serviceId": arr,
					"serviceList": serviceList,
					"cartId": itemId
				},
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						//layer.msg('选择成功！');
                        window.location.reload();
					} else {
						//失败
						if(result.msg){
							alert(result.msg);
						}else{
							alert("选择失败！");
						}
						return false;
					}
				}
			});
		}
