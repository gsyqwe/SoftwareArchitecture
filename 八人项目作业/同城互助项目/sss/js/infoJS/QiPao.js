function showShortQP(message) {

	var hidvalue_str = $('#hidvalue').val();
	var divWidth = 100;
	var divHeight = 80;
	var iLeft = ($(window).width() - divWidth) / 2;
	var iTop = ($(window).height() - divHeight) / 2 + $(document).scrollTop();
	
	
	var divhtml = $("<div style='color:white;line-height:80px;font-weight:blod;text-align:center;-moz-border-radius: 15px;-webkit-border-radius: 15px;border-radius:15px;letter-spacing:2px;font-size:20px'><strong>" + message + "</div>").css({
		position: 'absolute',
		top: iTop + 'px',
		left: iLeft + 'px',
		display: 'none',
		width: divWidth + 'px',
		height: divHeight + 'px',
		background: '#222222',
		opacity:0.96
	});
	divhtml.appendTo('body').fadeIn();
	divhtml.appendTo('body').fadeOut(1500);//消失时间
}

function showBigQP() {

}

//private
function changeBackground(color, op) {
	var backgroundDiv = document.createElement("div");
	backgroundDiv.style = "color:#222";
	document.getElementById("mainDiv").appendChild(backgroundDiv)

}

function deleteBackground() {}