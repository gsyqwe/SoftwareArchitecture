/**
 * 导入其他js
 */

var head = document.getElementsByTagName('head')[0];

var cssList = [
	//	"https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css",
	"http://at.alicdn.com/t/font_643761_w0qyngytb8svpldi.css",
	//	"css/myCss.css",
	//	"css/animation/loading.css",
	//	"http://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css"

]

var jsList = [

	//	"http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js",
	//	"http://apps.bdimg.com/libs/angular.js/1.4.6/angular.min.js",
	//	"http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.js",
	//	'js/myJS.js',
	//	'js/infoJS/QiPao.js'
]

var newscript;

//导入css
for(x in cssList) {

	console.log("导入" + cssList[x])
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = cssList[x];
	head = document.getElementsByTagName('head')[0];
	head.appendChild(link);

}

//导入js文件
for(x in jsList) {
	console.log("导入" + jsList[x])
	newscript = document.createElement('script');
	newscript.setAttribute('type', 'text/javascript');
	newscript.setAttribute('src', jsList[x]);
	head.appendChild(newscript);

}