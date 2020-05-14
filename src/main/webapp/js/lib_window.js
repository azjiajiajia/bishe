$(function(){
    init_tab();
    sort_lib();


    $("#recent_read").click(function () {

        sort_recent();
        $("#r_chosen").css({border:"2px solid black"});
        $("#l_chosen").css({border:"2px solid white"});
    });
    $("#left_sort_lib").click(function () {
        sort_lib();
        $("#r_chosen").css({border:"2px solid white"});
        $("#l_chosen").css({border:"2px solid black"});
    })
});

//初始化tab
function init_tab(){
    if($("#user_name").html()!=""){
        $("#page_tab_lable").css({display:"block"});
        $("#user_name").css({display:"block"});
        getsocket();
    }
}

//初始化书架内容，选项框停在书架
function sort_lib() {
    $.ajax({
        url:'/reader/sort_lib',
        type:'post',
        data:{"rname":$("#user_name").html()},
        dataType:'json',
        success:function (data) {
            for(i=1;i<=6;i++){
                $("#bimg"+i).attr("src",null);
                $("#bn"+i).html("");
                $("#ban"+i).html("");
            }
            $(".italic").remove();
            for (i = 1; i <= data.list.length; i++) {
                $("#bimg"+i).attr("src",data.list[i-1].bcover);
                $("#bn"+i).html(data.list[i-1].bname);
                $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
                $("#ban"+i).html(data.list[i-1].aname);
            }
            $("#page_sort_guide").html("");
            $("#page_sort_guide").append("  当前页:"+data.pageNum)
                .append("  总记录:"+data.total)
                .append("  每页条数:"+data.pageSize)
                .append("  总页数"+data.pages)
                .append("  可显示页数:"+data.navigatePages)
                .append("  起始页码:"+data.navigateFirstPage)
                .append("  结束页码:"+data.navigateLastPage);
            for (i=data.navigateFirstPage; i <= data.navigateLastPage; i++){
                var $page = $("<li><a href = 'javaScript:select_lib("+i+")'>"+i+"</a></li>");
                $page.addClass("italic");
                $("#last").before($page);
            }
            $("#pageNum").val(data.pageNum);
            $("#dir").val("lib");
        },
        error:function (data) {
            alert("出错");
        }
    });
}

function sort_recent() {
    $.ajax({
        url:'/reader/sort_recent',
        type:'post',
        data:{"rname":$("#user_name").html()},
        dataType:'json',
        success:function (data) {
            for(i=1;i<=6;i++){
                $("#bimg"+i).attr("src",null);
                $("#bn"+i).html("");
                $("#ban"+i).html("");
            }
            $(".italic").remove();
            for (i = 1; i <= data.list.length; i++) {
                $("#bimg"+i).attr("src",data.list[i-1]["bcover"]);
                $("#bn"+i).html(data.list[i-1]["bname"]);
                $("#bn"+i).attr("href","");
                $("#ban"+i).html("看到第"+data.list[i-1]["chapter"]+"话");
            }
            $("#page_sort_guide").html("");
            $("#page_sort_guide").append("  当前页:"+data.pageNum)
                .append("  总记录:"+data.total)
                .append("  每页条数:"+data.pageSize)
                .append("  总页数"+data.pages)
                .append("  可显示页数:"+data.navigatePages)
                .append("  起始页码:"+data.navigateFirstPage)
                .append("  结束页码:"+data.navigateLastPage);
            for (i=data.navigateFirstPage; i <= data.navigateLastPage; i++){
                var $page = $("<li><a href = 'javaScript:select_rct("+i+")'>"+i+"</a></li>");
                $page.addClass("italic");
                $("#last").before($page);
            }
            $("#pageNum").val(data.pageNum);
            $("#dir").val("rct");
        },
        error:function (data) {
            alert("出错");
        }
    });
}

function select_lib(i) {
    $.ajax({
        url:'/reader/sort_lib',
        type:'post',
        data:{"rname":$("#user_name").html(),"pageNum":i},
        dataType:'json',
        success:function (data) {
            for(i=1;i<=6;i++){
                $("#bimg"+i).attr("src",null);
                $("#bn"+i).html("");
                $("#ban"+i).html("");
            }
            $(".italic").remove();
            for (i = 1; i <= data.list.length; i++) {
                $("#bimg"+i).attr("src",data.list[i-1].bcover);
                $("#bn"+i).html(data.list[i-1].bname);
                $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
                $("#ban"+i).html(data.list[i-1].aname);
            }
            $("#page_sort_guide").html("");
            $("#page_sort_guide").append("  当前页:"+data.pageNum)
                .append("  总记录:"+data.total)
                .append("  每页条数:"+data.pageSize)
                .append("  总页数"+data.pages)
                .append("  可显示页数:"+data.navigatePages)
                .append("  起始页码:"+data.navigateFirstPage)
                .append("  结束页码:"+data.navigateLastPage);
            for (i=data.navigateFirstPage; i <= data.navigateLastPage; i++){
                var $page = $("<li><a href = 'javaScript:select_lib("+i+")'>"+i+"</a></li>");
                $page.addClass("italic");
                $("#last").before($page);
            }
            $("#pageNum").val(data.pageNum);
        },
        error:function (data) {
            alert("出错");
        }
    });
}


function select_rct(i){
    $.ajax({
        url:'/reader/sort_recent',
        type:'post',
        data:{"rname":$("#user_name").html(),"pageNum":i},
        dataType:'json',
        success:function (data) {
            for(i=1;i<=6;i++){
                $("#bimg"+i).attr("src",null);
                $("#bn"+i).html("");
                $("#ban"+i).html("");
            }
            $(".italic").remove();
            for (i = 1; i <= data.list.length; i++) {
                $("#bimg"+i).attr("src",data.list[i-1]["bcover"]);
                $("#bn"+i).html(data.list[i-1]["bname"]);
                $("#bn"+i).attr("href","");
                $("#ban"+i).html("看到第"+data.list[i-1]["chapter"]+"话");
            }
            $("#page_sort_guide").html("");
            $("#page_sort_guide").append("  当前页:"+data.pageNum)
                .append("  总记录:"+data.total)
                .append("  每页条数:"+data.pageSize)
                .append("  总页数"+data.pages)
                .append("  可显示页数:"+data.navigatePages)
                .append("  起始页码:"+data.navigateFirstPage)
                .append("  结束页码:"+data.navigateLastPage);
            for (i=data.navigateFirstPage; i <= data.navigateLastPage; i++){
                var $page = $("<li><a href = 'javaScript:select_rct("+i+")'>"+i+"</a></li>");
                $page.addClass("italic");
                $("#last").before($page);
            }
            $("#pageNum").val(data.pageNum);
        },
        error:function (data) {
            alert("出错");
        }
    });
}



function formFeed(i) {
    if($("#dir").val()=="lib"){
        select_lib(Number($("#pageNum").val())+i);
    }
    else if($("#dir").val()=="rct"){
        select_rct(Number($("#pageNum").val())+i);
    }

}

//对所有已登录的用户建立websocket连接
function getsocket() {
    var websocket = null;
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket?"+$.cookie('sessionId'));
    }
    else {
        alert('当前浏览器 Not support websocket')
    }
    //连接发生错误的回调方法
    websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function () {
        setMessageInnerHTML("WebSocket连接成功");
    }

    //接收到消息的回调方法
    websocket.onmessage = function (event) {
        alert("您的账号在别处登录，该网页将退出登录");
        $.cookie('sessionId','',{ expires: -1 });
        websocket.close();
        window.parent.location.href="/system/delete_session";

        //setMessageInnerHTML(event.data);
    }

    //连接关闭的回调方法
    websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
        closeWebSocket();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(text) {
        alert(text);
        //$("#message-box").html($("#message-box").html()+text+'<br>');
    }

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send() {
    }
}

