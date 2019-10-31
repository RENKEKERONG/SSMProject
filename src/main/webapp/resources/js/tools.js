//去往登录页
function toLogin(){
	//去往登录页
	var url = window.location.href;
	window.location.href="/user/login/login.html?backurl=" + url;
}
var tools = {
	// 判断是否手机号码
	checkPhone : function(phone) {
		if (!(/^1[234578]\d{9}$/.test(phone))) {
			return false;
		} else {
			return true;
		}
	},
	isEmpty : function (str) {
		if(null==str || ""==str){
			return true;
		}
		return false;
	},
	isNotEmpty : function (str) {
		return !tools.isEmpty(str);
	}
}

