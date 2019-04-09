var rate = 0;//图片缩放比例
var num = 0;//标注问题总数
var tagResultId;
var projectId;
function initRect(taskId) {
    var url;
    projectId = taskId;
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
    img.onload = function () {
        var imgW = img.width;
        var imgH = img.height;

        rate = getRate(imgW,imgH);
        canvas.height = imgH*rate;
        canvas.width = imgW*rate;

        $("#canvas").css("background-image", "url(" + url + ")");
        $("#canvas").css("background-size", imgW*rate+"px "+imgH*rate+"px");
        $("#canvas").css("background-repeat", "no-repeat");
    };

    $('#submit').click(function () {
        var result = "";
        for (var i=0;i<num;i++){
            var options=$("#select"+i+" option:selected");  //获取选中的项
            console.log(options.val());   //拿到选中项的值
            var value = options.val();
            result = result+value;
            if (i != num-1){
                result = result+"next";
            }
        }

        var input = document.getElementById("description");
        var description = input.value;

        var postData = {
            "projectId":projectId,
            "tagResultId":tagResultId,
            "result":result,
            "description":description

        };

        $.ajax({
            async : false,
            cache : false,
            type : 'POST',
            url : '/saveClassify',
            dataType : "json",
            data : postData,
            error : function() {
                alert('请求失败 ');
            },
            success : function(data) {
                var result = data
                console.log("result is "+ result);
                if(result == "1"){
                    alert("提交成功");
                    location.reload();
                }
                else{
                    alert(data);
                }
            }

        });
        console.log(result);
    });

    $('#back').click(function () {
        window.location.href="/toProjectCenterPage";
    });
}


var getRate = function (W,H) {
    var bigger = W>H? W:H;
    console.log(bigger+","+W+","+H);
    var result = 1;
    if (bigger > 800){
        result = 800/bigger;
    }
    if(bigger < 600){
        result = 600/bigger;
    }
    return result;
};

var setNum = function (number) {
    num = number;
    console.log(number);
};