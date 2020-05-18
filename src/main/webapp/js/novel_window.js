$(function(){
    $("#close_btn").click(function () {
        $("#bg").css({display:"none"});
        $("#login_window").css({display:"none"});
        return false;
    });
    $("#page_tab_reader_login").click(function () {
        $("#bg").css({display:"block"});
        $("#login_window").css({display:"block"});
        return false;
    });
    $("#page_tab_reader_register").click(function () {
        $("#bg").css({display:"block"});
        $("#register_window").css({display:"block"});
        $("#register_window_register").css({"margin-bottom":"0px","margin-left":"200px","height":"25px","width":"100px" });
        return false;
    });
    $("#register_close_btn").click(function () {
        $("#bg").css({display:"none"});
        $("#register_window").css({display:"none"});
        return false;
    });
    $("#login_window_register").click(function () {
        $("#login_window").css({display:"none"});
        $("#register_window").css({display:"block"});
        $("#register_window_register").css({"margin-bottom":"0px","margin-left":"200px","height":"25px","width":"100px" });
        return false;
    });

    //登录按钮
    $("#login_submit").click(function () {

        var id = $("#login_user_id").val();
        var pwd = $("#login_pwd").val();
        if (id.length == 0 ){
            alert("请输入账号");
        }
        if (pwd.length = 0 ){
            alert("请输入密码");
        }
        var rname;
        $.ajax({
            url:'/system/login',
            type: 'post',
            data:{"rid": $("#login_user_id").val(),"rpwd": $("#login_pwd").val(),"rname":null},
            dataType:'json',
            async:'false',
            success: function(data){
                if(data.type == "success"){
                    rname=data["reader_name"];
                    $("#bg").css({display:"none"});
                    $("#login_window").css({display:"none"});
                    $("#page_tab_reader_login").css({display:"none"});
                    $("#page_tab_reader_register").css({display:"none"});
                    $("#page_tab_lable").css({display:"block"});
                    $("#user_name").css({display:"block"});
                    $("#user_name").append(rname);
                    $("#hid").append(data["reader_id"]);
                }
                else if(data.type == "error"){
                    alert(data["msg"]);
                }
            },
            error:function (data) {
                alert("出错");
            }
        });
        rname=$("#user_name").html();
        alert("登录成功!");
        $.ajax({
            url:'/reader/have_read',
            type:'post',
            data:{"rname":rname,"bname":$("#bname").val()},
            dataType:'JSON',
            async:'false',
            success:function (data) {
                if(data["result"]=="empty"){
                    $("#reading").click(function () {
                        alert("没有章节");
                    });
                }
                else if(data["result"]=="no_record"){
                    $("#reading").click(function () {
                        window.open(data["chapterad"]);
                        add_to_record(1,true);
                    });
                }
                else {
                    $("#reading").val("继续阅读第"+data["chapter"]+"话");
                    $("#reading").click(function () {
                        window.open(data["chapterad"]) ;
                    });
                }
            },
            error:function (data) {
                alert("出错");
            }
        });
    });

    //注册按钮
    $("#register_window_register").click(function () {
        $("#pwd_check").css({display:"none"});
        $("#uername_check").css({display:"none"});
        $("#userid_check").css({display:"none"});
        $("#pwd_sec_check").css({display:"none"});
        var id = $("#register_user_id").val();
        var pwd = $("#register_user_pwd").val();
        var sec_pwd=$("#register_user_sec_pwd").val();
        var uname=$("#register_user_name").val();
        if (id.length == 0 ){
            alert("请输入账号");
            return;
        }
        if (pwd.length == 0 ){
            alert("请输入密码");
            return;;
        }
        if(sec_pwd.length==0){
            $("#pwd_sec_check").css({display:"block"});
        }
        else if(sec_pwd!=pwd){
            $("#pwd_check").css({display:"block"});
            return;
        }
        if(uname.length==0){
            alert("请输入昵称！");
            return;
        }
        $.ajax({
            url:'/system/register',
            type:'post',
            data:{"rid": id,"rpwd":pwd,"rname":uname},
            dataType:'json',
            async:'true',
            success: function(data){
                if(data.type == "success"){
                    alert(data["msg"]);
                    $("#bg").css({display:"none"});
                    $("#register_window").css({display:"none"});
                }
                else if(data.type == "rid_error"){
                    $("#userid_check").css({display:"block"});
                }
                else if(data.type == "rname_error"){
                    $("#uername_check").css({display:"block"});
                }
            },
            error:function (data) {
                alert("出错");
            }
        });

    });

    //作者窗口
    $("#page_tab_author").click(function () {
        window.open("/author/author_page");
    });

    $().moveDivByID("login");
    $().moveDivByID("register");


    init_tab();
    init_chapter();
    init_btn();
    init_chat();

});

//初始化聊天栏
function init_chat(){
    var websocket = null;
    var user;
    var color=randomColor1();
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://localhost:8080/websocket_chat?"+$("#bname").val());
        user=Math.random()*1000000;
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
        setMessageInnerHTML(event.data);
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
        $("#chat_msg").html($("#chat_msg").html()+text+'<br/>');
    }

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send() {
        var msg=$("#chat_text").val();
        var username;
        if($("#user_name").html()=="")
            username="游客"+user;
        else
            username=$("#user_name").html();
        websocket.send("<label style='color: "+color+"'>"+username+"</label>"+":"+msg);
        $("#chat_text").val("");
    }


    $("#chat_submit").click(function () {
        if($("#chat_text").val()==""){alert("请输入内容");}
        else {
            send();
        }
    });
    $("#chat_close").click(function () {
        if($("#chat_close").val()=="关闭聊天窗口"){
            closeWebSocket();
            $("#chat_close").val("开启聊天窗口");
            $("#chat_text").css({display:"none"});
            $("#chat_msg").css({display:"none"});
            $("#chat_submit").css({display:"none"});
        }
        else if($("#chat_close").val()=="开启聊天窗口"){
            websocket = new WebSocket("ws://localhost:8080/websocket_chat?"+$("#bname").val());
            $("#chat_close").val("关闭聊天窗口");
            $("#chat_text").css({display:"block"});
            $("#chat_msg").css({display:"block"});
            $("#chat_submit").css({display:"block"});
        }
    });

}



//初始化tab栏
function init_tab(){
    if($("#user_name").html()!=""){
        $("#page_tab_reader_login").css({display:"none"});
        $("#page_tab_reader_register").css({display:"none"});
        $("#page_tab_lable").css({display:"block"});
        $("#user_name").css({display:"block"});
    }
}
//初始化 小说信息中的俩按钮
function init_btn(){
    if($("#user_name").html()!=""){
        //先用ajax请求到数据库 读者小说浏览表 中找浏览记录，找到的话就改继续阅读，并且指定章节数，若没有就默认第一章，跳入小说阅读页面
        $.ajax({
            url:'/reader/have_read',
            type:'post',
            data:{"rname":$("#user_name").html(),"bname":$("#bname").val()},
            dataType:'JSON',
            success:function (data) {
                if(data["result"]=="empty"){
                    $("#reading").click(function () {
                        alert("没有章节");
                    });
                }
                else if(data["result"]=="no_record"){
                    $("#reading").click(function () {
                        window.open(data["chapterad"]);
                        add_to_record(1,true);
                    });
                }
                else {
                    $("#reading").val("继续阅读第"+data["chapter"]+"话");
                    $("#reading").click(function () {
                        window.open(data["chapterad"]) ;
                    });
                }
            },
            error:function (data) {
                alert("出错");
            }
        });
        $("#add_to_lib").click(function () {
            add_to_lib();
        });
    }
    //未登录
    else {
        $("#add_to_lib").click(function () {
            alert("请先登录");
        });
        $.ajax({
            url:'/reader/fst_ad',
            type:'post',
            data:{"bname":$("#bname").val()},
            dataType:'JSON',
            success:function (data) {
                if(data["result"]=="success"){
                    $("#reading").click(function () {
                        window.open(data["chapterad"]);
                    });
                }
                else{
                    $("#reading").click(function () {
                        alert("没有章节");
                    });
                }
            }
        });

    }
}

//初始化 小说章节和一共多少章
function init_chapter(){
    var bname=$("#bname").val();
    $.ajax({
        url:'/book/chapters',
        type:'post',
        dataType:'JSON',
        data:{"bname":bname},
        success:function (data) {
            if(data.type=="success"){
                $("#novel_bname").html(bname);
                $("#novel_bcover").attr("src",data["bcover"]);
                $("#novel_c_num").html("总共"+data["bchpaters"].toString()+"话");
                $("#novel_aname").html(data["aname"]);
                $("#novel_tag").html(data["tag"]);
                var rows=data["rows"];
                for(var i=0;i<rows.length;i++){
                    var name= rows[i]["chaptername"];
                    var ad=rows[i]["chapterad"];
                    var cpt=rows[i]["chapter"];
                    if($("#user_name").html()==""){
                        $("#novel_chapter").append("<a class='chapter' href='"+ad+"' target='_blank'>"+name+"</a>");
                    }
                    else {
                        $("#novel_chapter").append("<a class='chapter' href='javaScript:st_reading(\""+ad+"\","+
                            cpt+")'>"+name+"</a>");
                    }
                }
            }
            else
            {
                alert("error");
            }
        },
        error:function (data) {
            alert("出错！");
        }
    });
}

function add_to_lib(){
    $.ajax({
        url:'/reader/add_to_lib',
        type:'post',
        data:{"bname":$("#bname").val(),"rname":$("#user_name").html()},
        dataType:'JSON',
        success:function (data) {
            if(data["type"]=="success"){alert("添加成功");}
            else {alert("已经在书架");}
        },
        error:function (data) {
            alert("登录超时");
            window.parent.location.href="/system/principal_sheet";
        }
    });
}


function st_reading(ad,chapter) {
    add_to_record(chapter,false);
    window.open(ad);
}


function add_to_record(chapter,isEmpty){
    //isEmpty若为true表示没记录，false表示不知道
    $.ajax({
        url:'/reader/add_to_record',
        type:'post',
        data:{"rname":$("#user_name").html(),"bname":$("#bname").val(),"chapter":chapter,"isEmpty":isEmpty},
        dataType:'JSON',
        success:function (data) {
        },
        error:function () {
            alert("登录超时");
            window.parent.location.href="/system/principal_sheet";
        }
    });

}


jQuery.fn.moveDivByID= function (id){
    $("#"+id+"_title").mousedown(function(e){
        $(this).css("cursor","move");
        var offset= $(this).offset();
        var x= e.clientX-offset.left;
        var y= e.clientY-offset.top;

        $(document).bind("mousemove",function(ev) {
            var ev=ev||window.event;
            var _x= ev.clientX-x;
            var _y= ev.clientY-y;
            $("#"+id+"_window").css({"left":_x+120+"px","top":_y+"px"});
        });
    });

    $(document).mouseup(function(){
        $("#"+id+"_window").css("cursor","default");
        $(this).unbind("mousemove");
    });
};


//获取十六进制颜色
function randomColor1(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    if(r < 16){
        r = "0"+r.toString(16);
    }else{
        r = r.toString(16);
    }
    if(g < 16){
        g = "0"+g.toString(16);
    }else{
        g = g.toString(16);
    }
    if(b < 16){
        b = "0"+b.toString(16);
    }else{
        b = b.toString(16);
    }
    return "#"+r+g+b;
}