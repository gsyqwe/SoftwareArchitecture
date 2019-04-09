function registerAUser(username, password,email) {
	$.ajax({
		url: '/registerNewOne',
		type: "POST",
		data: {
			name: username,
			password: password,
			email:email
		},
		async: false,

		success: function(data, status) {

			console.log(data);
			register_showMessageInDiv(data);
			

		},
		error: function(XMLHttpRequest, textStatus,
			errorThrown) {
			unknownBUG();
			alert("注册失败，请稍后再试");
		}

	})

}

function tryLogin(username, password) {

	$.ajax({
		url: '/tryLogin',
		type: "POST",
		data: {
			name: username,
			password: password
		},
		async: false,
		success: function(data, status) {
			$.each(data, function(selector, context) {

				console.log(selector);
				console.log(context);

			})
			if(data["isSuccess"]) {
				login_showMessageInDiv(data);
				var url = "/toRequestorCenter"
				setTimeout("top.location.href='" + url + "'", 4000);
			} else {
				login_showMessageInDiv(data);
			}

		},
		error: function(XMLHttpRequest, textStatus,
			errorThrown) {

			console.log("登陆失败");
			alert("登陆失败，请稍后再试");
		}

	})

}