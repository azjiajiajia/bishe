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
        
    });

    $().moveDivByID("login");
    $().moveDivByID("register");
});

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