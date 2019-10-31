$(function(){
	banner();
	loginbox();
});

function loginbox(){
	setTimeout(function(){
		$("#brbox").animate({top:30},1000).animate({top:20},200);
	},500);
}

//幻灯片
function banner(){
	var box = $("#banner");
	var pic = box.find(".pic");
	var picli = box.find(".pic li");
	var numli = box.find(".num li");
	var len = picli.length;
	var t = null;
	var done=true;
	var cur = 0;
	var wid = picli.width();
	var hei = picli.height();
	picli.eq(0).addClass("on");
	numli.eq(0).addClass("on");
	//动动一
	// var doing1 = function(i,speed){
	// 	if(done==false||i==cur)return;
	// 	done=false;
	// 	if(i>=len)i=0;
	// 	if(i<=-1)i=len-1;
	// 	picli.removeAttr("style");
	// 	visible = picli.filter(":visible");
	// 	numli.removeClass("on").eq(i).addClass("on");
	// 	picli.removeAttr("style").css("z-index",2).eq(i).css("z-index",1).show();
	// 	visible.fadeOut(speed,function(){
	// 		picli.removeClass("on").eq(i).addClass("on");
	// 		cur = i;
	// 		done=true;
	// 	});
	// };
	// numli.each(function(i) {
	// 	$(this).mouseover(function(){
	// 		doing1(i,200);
	// 	});
	// });
	// //自动播放
	// box.hover(function(){
	// 	clearInterval(t);
	// },function(){
	// 	t = setInterval(function(){doing1(cur+1,1000)},5000);
	// }).trigger("mouseout");
}
