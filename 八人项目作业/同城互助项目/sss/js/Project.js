/**
 * @author Jeven
 * @date 2018/4/12
 * 该js负责任务中心界面与服务器的交互逻辑
 */
function showProjectInfo(id) {
    alert("a;;a;a;a");
    $.ajax({
        url: '/ProjectInfo',
        type: "GET",
        data: {
            id: id,
        },
        async: false,
        success: function(data, status) {
            console.log(data);
            console.log("成功");
        },
        error: function(XMLHttpRequest, textStatus,
                        errorThrown) {
            console.log("跳转失败");
        }

    })
}