var canX; //画布左上角的x坐标
var canY; //画布左上角y坐标
var rate = 0; //图片缩放比例
var img1 = []; //储存完整区域，用于撤销
var img2 = []; //储存操作顺序，用于撤销
var fillColor = "";
var context;
var result = [];
var objectIndex;
var taskID;
var tagResultId;

function initArea(taskId) {
	taskID = taskId;
	var url;
	console.log("我进入脚本了");

	$.ajax({
		url: "/nextPicture",
		type: "GET",
		data: "taskId=" + taskId,
		async: false,
		success: function(data, status) {

            if(data["successful"]==false) {
                alert(data["message"]);
                window.location.href="/toProjectCenterPage";
            } else {
                url = data["imageUrl"];
                tagResultId = data["tagResultId"];
            }
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("获取下一副图片失败");
			alert("没有更多图片可以标注了!")
            window.location.href="/toProjectCenterPage";
		}
	});
	var img = new Image();
	img.src = url;
	var canvas = document.getElementById("canvas");
	context = canvas.getContext('2d'); //获取context
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

	var paint = Object.create(Area); //定义父类，初始化获取画线条的对象
	paint.draw();

}

var Area = {
	name: "Area",
	draw: function() {
		var painting;
		var onDrawing = false;
		var color = "#000000"; //设置颜色
		var Penwidth = 2; //设置粗细
		var points = [];
		var index = 0;
		$('#canvas').mousedown(function(e) { //当鼠标按下时触发
			if(fillColor === "") {
				$("#alert").css("display", "block");
				painting = false;
			} else {
				$("#alert").css("display", "none");
				painting = true;
			}
			if(painting) {
				var x = e.pageX - canX;
				var y = e.pageY - canY;
				var point = [x, y];
				points.push(point);
				if(img1.length != 0) {
					context.putImageData(img1.pop(), 0, 0);
				}
				//复制图像，为了撤销
				var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
				//加入数组
				img1.push(imgData);
				onDrawing = true;
				for(var i = 0; i < points.length; i++) {
					var tempX = points[i][0];
					var tempY = points[i][1];
					if(i == 0) {
						context.beginPath();
						context.moveTo(tempX, tempY);
					} else {
						context.lineTo(tempX, tempY);
						context.stroke();
					}
				}
				context.fillStyle = fillColor;
				context.fill();
				context.closePath();
				//复制图像，为了撤销
				var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
				//加入数组
				img2.push(imgData);
			}
		});

		$('#canvas').mousemove(function(e) { //当鼠标在画布上移动时执行
			if(painting && onDrawing) {
				if(index != 3) {
					index++;
				} else {
					index = 0;
					var x = e.pageX - canX;
					var y = e.pageY - canY;
					var point = [x, y];
					points.push(point);
					if(img1.length != 0) {
						context.putImageData(img1.pop(), 0, 0);
					}
					//复制图像，为了撤销
					var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
					//加入数组
					img1.push(imgData);
					onDrawing = true;
					for(var i = 0; i < points.length; i++) {
						var tempX = points[i][0];
						var tempY = points[i][1];
						if(i == 0) {
							context.beginPath();
							context.moveTo(tempX, tempY);
						} else {
							context.lineTo(tempX, tempY);
							context.stroke();
						}
					}
					context.fillStyle = fillColor;
					context.fill();
					context.closePath();
					//复制图像，为了撤销
					var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
					//加入数组
					img2.push(imgData);
				}
			}
		});

		$('#canvas').mouseup(function(e) {
			painting = false;
		});
		$('#canvas').dblclick(function() {

			if(img1.length != 0) {
				context.putImageData(img1.pop(), 0, 0);
			}
			//复制图像，为了撤销
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			//加入数组
			img1.push(imgData);

			for(var i = 0; i < points.length; i++) {
				var tempX = points[i][0];
				var tempY = points[i][1];
				if(i == 0) {
					context.beginPath();
					context.moveTo(tempX, tempY);
				} else {
					context.lineTo(tempX, tempY);
					context.stroke();
				}
			}
			context.lineTo(points[0][0], points[0][1]);
			context.stroke();
			context.fillStyle = fillColor;
			context.fill();
			context.closePath();

			onDrawing = false;
			//复制图像，为了撤销
			var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
			//加入数组
			img1.push(imgData);
			var circle = [objectIndex, points];
			result.push(circle);
			console.log("now result is = " + result);
			points = new Array();
			img2 = new Array();

            document.body.onselectstart = function () {
                return false;
            };
		});

		$(document).keydown(function(event) {
			var e = event || window.event;
			var k = e.keyCode || e.which;
			if(k === 90 && (event.ctrlKey)) {
				if(img2.length != 0) {
					context.putImageData(img2.pop(), 0, 0);
					points.pop();
				} else {
					if(img1.length != 0) {
						context.putImageData(img1.pop(), 0, 0);
						result.pop();
					}
				}
			}
		});

		$('#submit').click(function() {

			var map = new Map();
			//初始化map
			for(var i = 1; i <= num; i++) {
				var list = new Array();
				map.set(i, list);
			}

			//将值传入map
			var len = result.length;
			for(var i = 0; i < len; i++) {
				var temp = result[i];
				var tempvalue = map.get(temp[0]);
				tempvalue.push(temp[1]);
				map.set(temp[0], tempvalue);
			}

			//将map转化为String
			var mapString = "";
			for(var i = 1; i <= num; i++) {
				var tempList = map.get(i);
				if(tempList == null || tempList.length == 0) {
					if(i != num) {
						mapString = mapString + "join";
					}
				} else {
					for(var j = 0; j < tempList.length; j++) {
						var tempPoints = tempList[j];
						var pointString = "";
						for(var k = 0; k < tempPoints.length; k++) {
							var tempPoint = tempPoints[k];
							var tempX = tempPoint[0] / rate;
							var tempY = tempPoint[1] / rate;
							if(k != tempPoints.length - 1) {
								pointString = pointString + tempX + "," + tempY + "-";
							} else {
								pointString = pointString + tempX + "," + tempY;
							}
						}
						mapString = mapString + pointString;
						if(j != tempList.length - 1) {
							mapString = mapString + "next";
						}
					}

					if(i != num) {
						mapString = mapString + "join";
					}

				}
			}

			var input = document.getElementById("description");
			var description = input.value;
			var postData = {
				"projectId": taskID,
				"tagResultId": tagResultId,
				"map": mapString,
				"description": description

			};

			$.ajax({
				async: false,
				cache: false,
				type: 'POST',
				url: '/saveArea',
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

var changeColor = function(index) {
	objectIndex = index;
	fillColor = getRGBA(index);
	tempFill = fillColor;
	console.log("执行到变换颜色了" + fillColor);

};

var setNums = function(nums) {
	num = nums;
};