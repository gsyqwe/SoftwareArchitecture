var canX; //画布左上角的x坐标
var canY; //画布左上角y坐标
var rate = 1; //图片缩放比例
var fillColor = "";
var tempFill = "";
var objectIndex;
var num = 0;
var tagResultId;
var taskID;

function initRect(taskId) {
	var url;
	taskID = taskId;
	console.log("我进入脚本了");

	$.ajax({
		url: "/nextPicture",
		type: "GET",
		data: "taskId=" + taskId,
		async: false,
		success: function(data, status) {
			console.log("============================================");
			$.each(data, function(selector, context) {

				console.log(selector+"==");
				console.log(context);

			})
			console.log("============================================");
			if(data["successful"] == false) {
				alert(data["message"]);
				window.location.href = "/toProjectCenterPage";
			} else {
				url = data["imageUrl"];
				tagResultId = data["tagResultId"];
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("获取下一副图片失败");
			alert("没有更多图片可以标注了!")
			window.location.href = "/toProjectCenterPage";
		}
	});
	var img = new Image();
	img.src = url;
	var canvas = document.getElementById("canvas");
	img.onload = function() {
		var imgW = img.width;
		var imgH = img.height;

		rate = getRate(imgW, imgH);
		canvas.height = imgH * rate;
		canvas.width = imgW * rate;

		$("#canvas").css("background-image", "url(" + url + ")");
		$("#canvas").css("background-size", imgW * rate + "px " + imgH * rate + "px");
		$("#canvas").css("background-repeat", "no-repeat");
	};
	canX = $('#canvas').offset().left; //获取画布左上角的x坐标
	canY = $('#canvas').offset().top + navHeight; //获取画布左上角的y坐标

	var paint = Object.create(Rect); //定义父类，初始化获取画线条的对象
	paint.draw();

}

var Rect = {
	name: "rect",
	draw: function() {
		var painting = true;
		var color = "#000000"; //设置颜色
		var Penwidth = 2; //设置矩形粗细
		var p_x; //画笔初始x坐标(相对图片)
		var p_y; //画笔初始y坐标
		var RectW; //矩形的高
		var RectH; //矩形的宽
		var layerName = "layer";
		var index = 0;
		var ondrawing;
		var changeSize = false;

		$('#canvas').mousedown(function(e) { //当鼠标按下时触发
			if(fillColor === "") {
				$("#alert").css("display", "block");
				painting = false;
			} else {
				$("#alert").css("display", "none");
				painting = true;
			}
			if(painting === true) {
				ondrawing = true;
				console.log(e.pageX + "," + e.pageY);
				p_x = e.pageX - canX;
				p_y = e.pageY - canY;
				index++;
				layerName = objectIndex + "-layer" + index;
				$('#canvas').drawRect({
					strokeStyle: color,
					strokeWidth: Penwidth,
					name: layerName,
					fromCenter: false,
					x: p_x,
					y: p_y,
					width: 0,
					height: 0,
					layer: true
				});
				$('#canvas').drawLayers();
				$('#canvas').saveCanvas();

			}
		});

		$('#canvas').mousemove(function(e) { //当鼠标在画布上移动时执行
			if((painting && ondrawing) || (changeSize)) {
				RectW = e.pageX - p_x - canX;
				RectH = e.pageY - p_y - canY;
				$('#canvas').removeLayer(layerName);
				$('#canvas').drawRect({
					strokeStyle: color,
					fillStyle: fillColor,
					strokeWidth: Penwidth,
					name: layerName,
					fromCenter: false,
					x: p_x,
					y: p_y,
					width: RectW,
					height: RectH,
					visible: true,
					layer: true
				});
				$('#canvas').drawLayers();
			}
		});

		$('#canvas').mouseup(function(e) {
			console.log("我是onmouseup");
			if((painting && ondrawing) || (changeSize)) {
				ondrawing = false;
				RectW = e.pageX - p_x - canX;
				RectH = e.pageY - p_y - canY;
				$('#canvas').removeLayer(layerName);
				$('#canvas').drawRect({
					draggable: true,
					bringToFront: true,
					strokeStyle: color,
					strokeWidth: Penwidth,
					fillStyle: fillColor,
					name: layerName,
					fromCenter: false,
					x: p_x,
					y: p_y,
					width: RectW,
					height: RectH,
					visible: true,
					layer: true,

					mousedown: function(layer) {
						console.log("我是图层");
						index--;
						ondrawing = false;
						var tempX = layer.x;
						var tempY = layer.y;
						var tempW = layer.width;
						var tempH = layer.height;
						if(tempW < 0) {
							tempX = tempX + tempW;
							tempW = 0 - tempW;
						}
						if(tempH < 0) {
							tempY = tempY + tempH;
							tempH = 0 - tempH;
						}
						var judge = judgeEdit(tempX, tempY, tempW, tempH);
						if(judge[0]) {
							layer.draggable = false;
							changeSize = true;
							layerName = layer.name;
							fillColor = layer.fillStyle;
							switch(judge[1]) {
								case 1:
									p_x = tempX + tempW;
									p_y = tempY + tempH;
									$("#canvas").css("cursor", "nw-resize");
									break;
								case 2:
									p_x = tempX;
									p_y = tempY + tempH;
									$("#canvas").css("cursor", "ne-resize");
									break;
								case 3:
									p_x = tempX + tempW;
									p_y = tempY;
									$("#canvas").css("cursor", "sw-resize");
									break;
								case 4:
									p_x = tempX;
									p_y = tempY;
									$("#canvas").css("cursor", "se-resize");
									break;
								default:
									layer.draggable = true;
									changeSize = false;
							}

						}
					},
					mouseup: function() {
						console.log("I am layer's mouseup");
						changeSize = false;
						$("#canvas").css("cursor", "auto");
					},

					dblclick: function(layer) {
						console.log("我被双击了");
						console.log(layer.name);
						$("#canvas").css("cursor", "auto");
						$('#canvas').removeLayer(layer.name);
						$('#canvas').drawLayers();
					},
					dragstart: function() {
						console.log("开始拖动了");
						ondrawing = false;
						$("#canvas").css("cursor", "move");
					},
					dragstop: function() {
						// $("#canvas").css("cursor", "auto");
					}

				});
				$('#canvas').drawLayers();
			}
			changeSize = false;
			$("#canvas").css("cursor", "auto");
			fillColor = tempFill;
		});

		$('#submit').click(function() {
			var layers = $('canvas').getLayers();
			var len = layers.length;
			var map = new Map();
			//初始化map
			for(var i = 1; i <= num; i++) {
				var list = new Array();
				map.set(i, list);
			}

			//将所有矩形坐标传入map
			for(var i = 0; i < len; i++) {
				var layer = layers[i];
				if(layer.width != 0) {
					var tempX = layer.x;
					var tempY = layer.y;
					var tempW = layer.width;
					var tempH = layer.height;
					if(tempW < 0) {
						tempX = tempX + tempW;
						tempW = 0 - tempW;
					}
					if(tempH < 0) {
						tempY = tempY + tempH;
						tempH = 0 - tempH;
					}
					var x2 = tempX + tempW;
					var y2 = tempY + tempH;
					tempX = tempX / rate;
					tempY = tempY / rate;
					x2 = x2 / rate;
					y2 = y2 / rate;
					var point = tempX + "-" + tempY + "-" + x2 + "-" + y2;
					var tempName = layer.name;
					var index = parseInt(tempName.split("-")[0]);
					var tempList = map.get(index);
					tempList.push(point);
					map.set(index, tempList);
				};
			}
			console.log(map);
			var result = "";
			for(var i = 0; i < num; i++) {
				var tempList = map.get(i + 1);
				if(tempList.length == 0 || tempList == null) {
					if(i != num - 1) {
						result = result + "join";
					}
				} else {
					for(var j = 0; j < tempList.length; j++) {
						if(j != tempList.length - 1) {
							result = result + tempList[j] + "next";
						} else {
							result = result + tempList[j];
						}
					}
					if(i != num - 1) {
						result = result + "join";
					}

				}
			}

			var input = document.getElementById("description");
			var description = input.value;
			console.log("description = " + description);

			var postData = {
				"projectId": taskID,
				"tagResultId": tagResultId,
				"map": result,
				"description": description

			};

			$.ajax({
				async: false,
				cache: false,
				type: 'POST',
				url: '/saveSquare',
				dataType: "json",
				data: postData,
				error: function() {
					alert('请求失败 ');
				},
				success: function(data) {
					var result = data
					console.log("result is " + result);
					if(result == "1") {
						alert("提交成功");
						location.reload();
					} else {
						alert(data);
					}
				}

			});

		});

		$('#back').click(function() {
			window.location.href = "/toProjectCenterPage";
		});

	}
};

var getRate = function(W, H) {
	var bigger = W > H ? W : H;
	console.log(bigger + "," + W + "," + H);
	var result = 1;
	if(bigger > 650) {
		result = 650 / bigger;
	}
	if(bigger < 600) {
		result = 600 / bigger;
	}
	return result;
};

var judgeEdit = function(x, y, w, h) {
	var pointX = getMousePos().x - canX;
	var pointY = getMousePos().y - canY;
	var dx1 = pointX - x;
	var dx2 = x + w - pointX;
	var dy1 = pointY - y;
	var dy2 = y + h - pointY;
	var dx = w / 20;
	var dy = h / 20;
	if(dx < 8) {
		dx = 10;
	}
	if(dy < 8) {
		dy = 10;
	}

	//点击左上角
	if(dx > dx1 && dy > dy1) {
		console.log("return 1");
		return [true, 1];
	}
	//点击右上角
	else if(dx > dx2 && dy > dy1) {
		console.log("return 2");
		return [true, 2];
	}
	//点击左下角
	else if(dx > dx1 && dy > dy2) {
		console.log("return 3");
		return [true, 3];
	}
	//点击右下角
	else if(dx > dx2 && dy > dy2) {
		console.log("return 4");
		return [true, 4];
	} else {
		console.log("return qita");
		return [false, 0];
	}
};

function getMousePos(event) {
	var e = event || window.event;
	var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	var x = e.pageX || e.clientX + scrollX;
	var y = e.pageY || e.clientY + scrollY;
	return {
		'x': x,
		'y': y
	};
}

var changeColor = function(index) {
	objectIndex = index;
	fillColor = getRGBA(index);
	tempFill = fillColor;
	console.log("执行到变换颜色了");

};

var setNum = function(nums) {
	num = nums;
};