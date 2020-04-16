$(function(){
    //登录窗口
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

    //作者窗口
    $("#page_tab_author").click(function () {
        window.open("/author/author_page");
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
       
        $.ajax({
            url:'/system/login',
            type: 'post',
            data:{"rid": $("#login_user_id").val(),"rpwd": $("#login_pwd").val(),"rname":null},
            dataType:'json',
            async:'false',
            success: function(data){
                if(data.type == "success"){
                    var rname=data["reader_name"];
                    alert("登录成功！ 书友："+rname);
                    $("#bg").css({display:"none"});
                    $("#login_window").css({display:"none"});
                    $("#page_tab_reader_login").css({display:"none"});
                    $("#page_tab_reader_register").css({display:"none"});
                    $("#page_tab_lable").css({display:"block"});
                    $("#user_name").css({display:"block"});
                    $("#user_name").html(rname);
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


    $("#lib").click(function () {
        if($("#user_name").html()==""){
            //还未登录，弹出提示登录，同时弹出登录界面
            alert("还没登录！请先登录");
            $("#bg").css({display:"block"});
            $("#login_window").css({display:"block"});
        }
        else {
            window.parent.location.href = "/reader/novel_lib";
        }

    });
    $("#ds").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"都市","aname":null},
            dataType:'json',
            success: function(data){
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("都市");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#ls").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"历史","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("历史");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#xx").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"仙侠","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("仙侠");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#qxs").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"轻小说","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("轻小说");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#xh").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"玄幻","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("玄幻");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#kh").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"科幻","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("科幻");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#js").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"军事","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("军事");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#ty").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"体育","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("体育");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#wx").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"武侠","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("武侠");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#qh").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"奇幻","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("奇幻");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#xy").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"悬疑","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("悬疑");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $("#yx").click(function () {
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"游戏","aname":null},
            dataType:'json',
            success: function(data){
                for(i=1;i<=6;i++){
                    $("#bimg"+i).attr("src",null);
                    $("#bn"+i).html("");
                    $("#ban"+i).html("");
                }
                $(".italic").remove();
                for (i = 1; i <= data.list.length; i++) {
                    $("#bimg"+i).attr("src",data.list[i-1].bcover);
                    $("#bn"+i).html(data.list[i-1].bname);
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("游戏");
            },
            error:function (data) {
                alert("出错");
            }
        });
    });
    $().moveDivByID("login");
    $().moveDivByID("register");

    //初始化检查session中是否有reader.rname
    init_tab();
});

function select(i) {
    if($("#dir").val()=="vague"){
        search_novel(i);
    }
    else {
        $.ajax({
            url:'/book/books_ajax',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":$("#dir").val(),"aname":null,"pageNum":i},
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
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
            }
        });
    }

}


function formFeed(i) {
    select(Number($("#pageNum").val())+i);
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


//初始化tab栏
function init_tab(){
    if($("#user_name").html()!=""){
        $("#page_tab_reader_login").css({display:"none"});
        $("#page_tab_reader_register").css({display:"none"});
        $("#page_tab_lable").css({display:"block"});
        $("#user_name").css({display:"block"});
    }
}


//按书名模糊查询书
function search_novel(i) {
    if($("#book_name").val()!=""){
        $.ajax({
            url:'/book/books_vague',
            type:'post',
            data:{"pageNum":i,"name":$("#book_name").val()},
            dataType:'JSON',
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
                    $("#ban"+i).html(data.list[i-1].aname);
                    $("#bn"+i).attr("href","/book/novel_info/bname="+data.list[i-1].bname);
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
                    var $page = $("<li><a href = 'javaScript:select("+i+")'>"+i+"</a></li>");
                    $page.addClass("italic");
                    $("#last").before($page);
                }
                $("#pageNum").val(data.pageNum);
                $("#dir").val("vague");
            },
            error:function (data) {
                alert("出错");
            }
        });
    }
}


