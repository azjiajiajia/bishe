$(function () {
    //登录和注册（作者）
    $("#close_btn").click(function () {
        $("#bg").css({display:"none"});
        $("#login_window").css({display:"none"});
        return false;
    });
    $("#page_tab_author_login").click(function () {
        $("#bg").css({display:"block"});
        $("#login_window").css({display:"block"});
        return false;
    });
    $("#page_tab_author_register").click(function () {
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
//发布新书按钮
    $("#new_book_close_btn").click(function () {
        $("#bg").css({display:"none"});
        $("#new_book").css({display:"none"});
        return false;
    });
//关闭发布新书
    $("#post_btn").click(function () {
        $("#bg").css({display:"block"});
        $("#new_book").css({display:"block"});
        return false;
    });

    //登录作者
    $("#login_submit").click(function () {
        var id = $("#login_user_id").val();
        var pwd = $("#login_pwd").val();
        if (id.length == 0 ){
            alert("请输入账号");
        }
        if (pwd.length = 0 ){
            alert("请输入密码");
        }

        $.ajax({
            url:'/author/login',
            type: 'post',
            data:{"aid": $("#login_user_id").val(),"apwd": $("#login_pwd").val(),"aname":null},
            dataType:'json',
            async:'false',
            success: function(data){
                if(data.type == "success"){
                    var aname=data["aname"];
                    alert("登录成功！ 作者："+aname);
                    $("#bg").css({display:"none"});
                    $("#login_window").css({display:"none"});
                    $("#page_tab_author_login").css({display:"none"});
                    $("#page_tab_author_register").css({display:"none"});
                    $("#page_tab_lable").css({display:"block"});
                    $("#author_name").css({display:"block"});
                    $("#author_name").append(aname);
                    $("#hid").append(data["aid"]);
                }
                else if(data.type == "error"){
                    alert(data["msg"]);
                }
            },
            error:function (data) {
                alert("出错");
            }
        });
    });

    //注册作者
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
            return;
        }
        if(sec_pwd.length==0){
            $("#pwd_sec_check").css({display:"block"});
            return;
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
            url:'/author/register',
            type:'post',
            data:{"aid": id,"apwd":pwd,"aname":uname},
            dataType:'json',
            async:'true',
            success: function(data){
                if(data.type == "success"){
                    alert(data["msg"]);
                    $("#bg").css({display:"none"});
                    $("#register_window").css({display:"none"});
                }
                else if(data.type == "aid_error"){
                    $("#userid_check").css({display:"block"});
                }
                else if(data.type == "aname_error"){
                    $("#uername_check").css({display:"block"});
                }
            },
            error:function (data) {
                alert("出错");
            }
        });

    });

    //初始化tab栏
    init_tab();
    $().moveDivByID("login");
    $().moveDivByID("register");
});

function init_tab(){
    if($("#author_name").html()!=""){
        $("#page_tab_author_login").css({display:"none"});
        $("#page_tab_author_register").css({display:"none"});
        $("#page_tab_lable").css({display:"block"});
        $("#author_name").css({display:"block"});
    }
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