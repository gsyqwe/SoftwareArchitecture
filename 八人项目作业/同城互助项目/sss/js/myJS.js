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

function submit_uploagNewProject(type, name, file, sumMoney, requirment, kindChoiceList, questionList, startDate, endDate) {

	var form = new FormData();
	form.append("type", type);
	form.append("file", $("#uploadFile")[0].files[0]);
	form.append("testFormData", "fuck");
	form.append("name", name);
	form.append("sumMoney", sumMoney);
	form.append("requirment", requirment);
	form.append("startDate", startDate.getUTCFullYear() + "," + (startDate.getUTCMonth() + 1) + "," + startDate.getUTCDate());
	form.append("endDate", endDate.getUTCFullYear() + "," + (endDate.getUTCMonth() + 1) + "," + endDate.getUTCDate());

	form.append("kindChoiceList", JSON.stringify(kindChoiceList));
	form.append("kindChoiceListSize", kindChoiceList.length);
	form.append("questionList", JSON.stringify(questionList));
	form.append("questionSize", questionList.length);

	$.ajax({
		url: '/uploadNewProject',
		type: "post",
		data: form,
		processData: false,
		contentType: false,
		success: function(data, status) {

			alert(data["message"]);
		},
		error: function(XMLHttpRequest, textStatus,
			errorThrown) {
			console.log(errorThrown);
			alert("网络错误,请稍后再试");
		}
	});

}

function getHistoryProject(userID) {

}

function showMessageInDiv(message, fatherDiv, sonDiv) {
	fatherDiv.innerHTML = "";
	sonDiv.style = "display:"
	fatherDiv.appendChild(sonDiv);

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

function arrayDuplicateOrHasEmpty(arr) {
	var flag = false;
	var hash = {};
	for(var i in arr) {
		if(hash[arr[i]] || arr[i] == null || arr[i] == undefined || arr[i] == "" || arr[i] == " ") {
			return true;
		}
		// 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
		hash[arr[i]] = true;
	}
	return false;

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

function getSessionID() {
	var form = new FormData();
	var result;
	$.ajaxSetup({
		async: false
	});
	$.ajax({
		url: '/getSessionID',
		type: "POST",
		data: form,
		processData: false,
		contentType: false,
		success: function(data, status) {

			if(data["isSuccess"]) {
				result = data["userid"]
			} else {
				result = null;
			}

		},
		error: function(XMLHttpRequest, textStatus,
			errorThrown) {
			console.log(errorThrown);
			layer.msg("发送失败，网络错误")
		}
	});
	$.ajaxSetup({
		async: true
	});
	return result;

}
G_layim = null;

function initLayIM() {
	if(getSessionID() == null) {
		return;
	}

	layui.use('layim', function(layim) {
		//基础配置
		layim.config({

			init: {
				url: '/queryForMainPane' //接口地址（返回的数据格式见下文）
					,
				type: 'get' //默认get，一般可不填
					,
				data: {} //额外参数
			} //获取主面板列表信息，下文会做进一步介绍

			//获取群员接口（返回的数据格式见下文）
			,
			members: {
				url: '/queryGroupMember' //接口地址（返回的数据格式见下文）
					,
				type: 'get' //默认get，一般可不填
					,
				data: {} //额外参数
			}

			//上传图片接口（返回的数据格式见下文），若不开启图片上传，剔除该项即可
			,
			uploadImage: {
				url: 'http://nvidia.njuftp.org/upload.aspx' //接口地址
					,
				type: 'post' //默认post
			}

			//上传文件接口（返回的数据格式见下文），若不开启文件上传，剔除该项即可
			,
			uploadFile: {
				url: '' //接口地址
					,
				type: 'post' //默认post
			}
			//扩展工具栏，下文会做进一步介绍（如果无需扩展，剔除该项即可）
			,
			tool: [{
					alias: 'code' //工具别名
						,
					title: '代码' //工具名称
						,
					icon: '&#xe64e;' //工具图标，参考图标文档
				}]

				,

			find: '/includeFindFriendPage' //发现页面地址，若不开启，剔除该项即可

		});

		layim.on('ready', function(options) {
			console.log("6666");

			var getting = {
				url: '/queryUnreadMessage',
				dataType: 'json',
				success: function(res) {
					console.log("轮询一次!本次共获得" + res["unreadMessageList"].length + "条数据@", res);
					for(var i in res["unreadMessageList"]) {
						var tpMsg = res["unreadMessageList"][i];

						var obj = {
							username: tpMsg["username"],
							avatar: tpMsg["avatar"],
							id: tpMsg["id"],
							type: tpMsg["type"],
							content: tpMsg["content"],
							timestamp: tpMsg["timestamp"]
						}
						layim.getMessage(obj);
					}

				}
			}
			window.setInterval(function() {
				$.ajax(getting)
			}, 5000);
		});
		//监听发送消息
		layim.on('sendMessage', function(data) {
			console.log(data);
			console.log('data["to"]["id"]', data["to"]["id"]);
			console.log('data["mine"]["content"]', data["mine"]["content"]);
			var form = new FormData();
			form.append("receiverID", data["to"]["id"]);
			form.append("message", data["mine"]["content"]);
			var result;

			$.ajax({
				url: '/querySendMessage',
				type: "POST",
				data: form,
				processData: false,
				contentType: false,
				success: function(data, status) {
					console.log(data);
				},
				error: function(XMLHttpRequest, textStatus,
					errorThrown) {
					console.log(errorThrown);
				}
			});

		});
		//监听修改签名
		layim.on('sign', function(value) {
			console.log(value); //获得新的签名
			var form = new FormData();
			form.append("description", value);
			form.append("fromLayIM", true);
			$.ajaxSetup({
				async: false
			});
			$.ajax({
				url: '/updateWorkerInfo',
				type: "POST",
				data: form,
				processData: false,
				contentType: false,
				success: function(data, status) {

					layer.msg(data["message"], {
						time: 0 //不自动关闭
					});

				},
				error: function(XMLHttpRequest, textStatus,
					errorThrown) {
					console.log(errorThrown);
				}
			});
			$.ajaxSetup({
				async: true
			});
		});

		//外部方法
		//外部自定义我的事件
		my_events = {
			//进入好友的空间
			enterZone: function(othis, e) {
					console.log(othis);
					console.log("进入空间")
					var friend_id = othis.parent().attr('data-id');
					//					window.open("http://www.layui.com/doc/modules/layim.html#init");
					layer.alert('<a href="/toFriendZone/' + friend_id + '"  target="_blank">点击进入他的空间</a>', {
						title: false,
						icon: 6,
						btn: ''
					});
				}

				//将用户加入黑名单
				,
			joinBlack: function(othis, e) {
					var friend_id = othis.parent().attr('data-id');
					//询问框
					layer.confirm('确定要将他加入黑名单？', {
						btn: ['是的', '算了'],
						title: '友情提示',
						icon: 3,
						closeBtn: 0
					}, function() {
						$.getJSON("/index/Tools/joinBlack/fid/" + friend_id, function(res) {
							if(1 == res.code) {
								layer.msg(res.msg, {
									time: 1500
								});
								layim.removeList({
									type: 'friend',
									id: res.data.to_id
								});

								//通知被加入黑名单的用户，删除我
								var black_data = '{"type":"black","to_id":"' + res.data.to_id + '", "del_id":"' + res.data.del_id + '"}';
								socket.send(black_data);
							} else {
								layer.msg(res.msg, {
									time: 1500
								});
							}
						});
					}, function() {

					});
				}

				//改变用户的群组
				,
			changeGroup: function(othis, e) {
					//改变群组模板
					var elemAddTpl = ['<div class="layim-add-box">', '<div class="layim-add-img"><img class="layui-circle" src="{{ d.data.avatar }}"><p>' +
						'{{ d.data.name||"" }}</p></div>', '<div class="layim-add-remark">', '{{# if(d.data.type === "friend" && d.type === "setGroup"){ }}', '<p>选择分组</p>', '{{# } if(d.data.type === "friend"){ }}', '<select class="layui-select" id="LAY_layimGroup">', '{{# layui.each(d.data.group, function(index, item){ }}', '<option value="{{ item.id }}">{{ item.groupname }}</option>', '{{# }); }}', '</select>', '{{# } }}', '{{# if(d.data.type === "group"){ }}', '<p>请输入验证信息</p>', '{{# } if(d.type !== "setGroup"){ }}', '<textarea id="LAY_layimRemark" placeholder="验证信息" class="layui-textarea"></textarea>', '{{# } }}', '</div>', '</div>'
					].join('');

					var friend_id = othis.parent().attr('data-id');
					$.getJSON('/index/Tools/getNowUser/fid/' + friend_id, function(res) {
						if(1 == res.code) {
							var index = layer.open({
								type: 1,
								skin: 'layui-layer-rim', //加上边框
								area: ['430px', '260px'], //宽高
								btn: ['确认', '取消'],
								title: '移动分组',
								content: laytpl(elemAddTpl).render({
									data: {
										name: res.data.user_name,
										avatar: res.data.avatar,
										group: parent.layui.layim.cache().friend,
										type: 'friend'
									},
									type: 'setGroup'
								}),
								yes: function(index, layero) {
									var groupElem = layero.find('#LAY_layimGroup');
									var group_id = groupElem.val(); //群组id
									$.post('/index/Tools/changeGroup', {
											'group_id': group_id,
											'user_id': res.data.id
										},
										function(data) {
											if(1 == data.code) {
												layer.msg(data.msg, {
													time: 1500
												});
												//先从旧组移除，然后加入新组
												layim.removeList({
													type: 'friend',
													id: res.data.id
												});
												//加入新组
												layim.addList({
													type: 'friend',
													avatar: res.data.avatar,
													username: res.data.user_name,
													groupid: group_id,
													id: res.data.id,
													sign: res.data.sign
												});
												layer.close(index);
											} else {
												layer.msg(data.msg, {
													time: 2000
												});
											}
										}, 'json');
								}
							});
						} else {
							layer.msg(res.msg, {
								time: 2000
							});
						}
					});
				}

				//删除好友
				,
			removeFriend: function(othis, e) {
					var friend_id = othis.parent().attr('data-id');
					//询问框
					layer.confirm('确定删除该好友？', {
						btn: ['确定', '取消'],
						title: '友情提示',
						closeBtn: 0,
						icon: 3
					}, function() {
						$.post('/index/Tools/removeFriend', {
							'user_id': friend_id
						}, function(res) {
							if(1 == res.code) {
								layer.msg(res.msg, {
									time: 1500
								});
								layim.removeList({
									type: 'friend',
									id: res.data.to_id
								});
								//通知被删除的用户，删除我
								var black_data = '{"type":"delFriend","to_id":"' + res.data.to_id + '", "del_id":"' + res.data.del_id + '"}';
								socket.send(black_data);
							} else {
								layer.msg(res.msg, {
									time: 1500
								});
							}
						}, 'json');
					}, function() {

					});
				}

				//举报好友
				,
			reportFriend: function(othis, e) {
					var friend_id = othis.parent().attr('data-id');

					layer.open({
						type: 2,
						title: '举报好友',
						shadeClose: true,
						skin: 'layui-layer-molv', //加上边框
						shade: 0.3,
						area: ['400px', '400px'],
						content: '/index/Tools/reportFriend/user_id/' + friend_id
					});
				}

				//退出群组
				,
			leaveOut: function(othis, e) {
				var group_id = othis.parent().attr('data-id');
				var index = layer.confirm('确定退出该群组？', {
					btn: ['确定', '取消'],
					title: '友情提示',
					closeBtn: 0,
					icon: 3
				}, function() {
					$.post('/index/Tools/leaveGroup', {
						'group_id': group_id
					}, function(res) {
						if(1 == res.code) {
							layer.msg(res.msg, {
								time: 1500
							});
							layim.removeList({
								type: 'group',
								id: res.data.group_id
							});

							// 退出讨论组
							var leave_data = '{"type": "leaveGroup", "leave_id":"' + res.data.uid + '", "group_id":"' + res.data.group_id + '"}';
							socket.send(leave_data);
						} else {
							layer.msg(res.msg, {
								time: 1500
							});
						}
						layer.close(index);
					}, 'json');
				}, function() {

				});
			}
		}

	});
	//	layer.msg("layIM已自动开启!")

}