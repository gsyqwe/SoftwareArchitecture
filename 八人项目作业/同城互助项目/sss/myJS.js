function getModeAndView(s) {

	try {
		var t = JSON.parse(s.replace(/&quot;/gi, '"'));
		//		console.log(t);
		return t;

	} catch(err) {
		return ""
	}
}

function ayok(str) {
	if(str == undefined) {
		return false;
	}
	if(str.indexOf("@") != -1) {

		return true;
	}
	return false;
}

function G_createNav() {
	var navDiv = document.getElementById("navDiv");

}

function randomString(len) {　　
	len = len || 32;　　
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for(i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}　　
	return pwd;
}

function loadImg(imgId) {
	var preSR = "static/img/";
	if(imgId == "registerBackgroundImage") {
		return preSR + "background.jpg";
	}
	if(imgId == "littleLogo") {
		return preSR + "littleLogo.png";
	}

	return "https://docs.fundebug.com/images/notifier/javascript/type/resource.png";

}

function toInfoPage(strInfo) {

	window.location = "info.html?ioo=" + Base64.encode(strInfo);
}

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

function unknownBUG(errorMsg) {
	console.log(errorMsg)
	console.log('   ▄               ▄  \n',
		'fuck!!!!  ▌▒█           ▄▀▒▌ \n',
		' 未知的bug ▌▒▒▀▄       ▄▀▒▒▒▐ \n',
		'        ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐ \n',
		'     ▄▄▀▒▒▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐ \n',
		'    ▄▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐ \n',
		'   ▐▒▒▒▄▄▄▒▒▒▒▒▒▒▒▒▒▒▒▒▀▄▒▒▌ \n',
		'   ▌▒▒▐▄█▀▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐ \n',
		'  ▐▒▒▒▒▒▒▒▒▒▒▒▌██▀▒▒▒▒▒▒▒▒▀▄▌ \n',
		'  ▌▒▀▄██▄▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▌ \n',
		'  ▌▀▐▄█▄█▌▄▒▀▒▒▒▒▒▒░░░░░░▒▒▒▐ \n',
		' ▐▒▀▐▀▐▀▒▒▄▄▒▄▒▒▒▒▒▒▒▒▒▒▒▒▒▒▌ \n',
		' ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒░░░░░░▒▒▒▐ \n',
		'  ▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒▒▒░░░░▒▒▒▒▌ \n',
		'  ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▐ \n',
		'   ▀▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▄▒▒▒▒▌ \n',
		'    ▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀ \n',
		'    ▀▒▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀ \n',
		'   ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▀▀ \n'
	);
}
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

function getThisWeek(today) {
	today = new Date();

	var resultArray = [];
	var date1 = new Date();
	var date2 = new Date();

	//	var peDayNum = today.getDay();

	resultArray.push(date1);
	resultArray.push(date2);
	return resultArray;

}

function getThisMonth(today) {
	var resultArray = [];
	var date1 = new Date();
	var date2 = new Date();

	//	var peDayNum = today.getDay();

	resultArray.push(date1);
	resultArray.push(date2);
	return resultArray;

}

function createBackTopButton() {

	var backTopHtml = '<div id="backTopBtn" class="backTopDiv"><i class="iconfont icon-zhiding" style="font-size:40px;"></i><p>回到顶部</p></div>'

	$('body').append(backTopHtml)

	$('#backTopBtn').click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 700)
	}).hover(
		function() {
			$(this).addClass('hover')
		},
		function() {
			$(this).removeClass('hover')
		}
	)
	minHeight = 600;
	minHeight ? minHeight = minHeight : minHeight = 600

	$(window).scroll(function() {
		var s = $(window).scrollTop()

		if(s > minHeight) {
			$('#backTopBtn').fadeIn(100)
		} else {
			$('#backTopBtn').fadeOut(100)
		}
	})
	//	layer.msg("chuangjian back top")

}