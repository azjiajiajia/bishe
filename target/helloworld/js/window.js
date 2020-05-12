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
                    window.parent.location.href="/system/principal/rname="+rname;
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
    init_recent_post();
    init_person_intst();
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


//初始化tab栏,同时建立websocket连接
function init_tab(){
    if($("#user_name").html()!=""){
        $("#page_tab_reader_login").css({display:"none"});
        $("#page_tab_reader_register").css({display:"none"});
        $("#page_tab_lable").css({display:"block"});
        $("#user_name").css({display:"block"});
        getsocket();
    }
}

//初始化最近更新
function init_recent_post() {
    $.ajax({
        url:'/book/recent_post',
        type:'post',
        data:{},
        dataType:'json',
        success:function (books) {
            for(var i=1;i<=books.length;i++){
                $("#recent_bname_"+i).html(books[i-1].bname);
                $("#recent_img_"+i).attr("src",books[i-1].bcover);
                $("#recent_"+i).attr("href","/book/novel_info/bname="+books[i-1].bname);
            }
        },
        error:function () {
            alert("出错");
        }
    });
}


//加载个人推荐栏
function init_person_intst() {
    if($("#user_name").html()!=""){
        $("#person_intst").css({display:"block"});
        $.ajax({
            url:'/reader/person_intst',
            type:'post',
            data:{"rname":$("#user_name").html()},
            dataType:'json',
            async:'false',
            success:function (books) {
                for(var i=1;i<=books.length;i++){
                    $("#inst_"+i).attr("href","/book/novel_info/bname="+books[i-1].bname);
                    $("#intst_img_"+i).attr("src",books[i-1].bcover);
                }
            },
            error:function () {
                alert("出错");
            }
        });
        intst_show();
    }
    else {
        $("#person_intst").css({display:"none"});
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



//负责推荐栏的显示样式

function intst_show() {
    var $root = $('#show'),
        root_w = $root.width();
    var p = $root.find('> div.img > span'),
        n = p.children().length;
    p.children().eq(0).clone().appendTo(p);
    function onoff(on, off) {
        (on !== -1) && btns.eq(on).addClass('on');
        (off !== -1) && btns.eq(off).removeClass('on');
    }
    function dgo(n, comp) {
        var idx = n > max ? 0 : n;
        onoff(idx, cur);
        cur = idx;
        p.stop().animate({left: -1 * root_w * n}, {duration: dur, complete: comp});
        if(idx == 0 ){p.children().eq(n-1).clone().appendTo('.mk1');}else{$('.mk1').empty()};
    }
    // slast -> 如果播放完最后1张，要如何处理
    //    true 平滑切换到第1张
    var cur = 0,
        max = n - 1,
        pt = 0,
        stay = 5 * 1000, /* ms */
        dur = .6 * 1000, /* ms */
        btns;
    function go(dir, slast) {
        pt = +new Date();
        if (dir === 0) {
            onoff(cur, -1);
            p.css({left: -1 * root_w * cur});
            return;
        }
        var t;
        if (dir > 0) {
            t = cur + 1;
            if (t > max && !slast) {
                t = 0;
            }
            if (t <= max) {
                return dgo(t);
            }
            return dgo(t, function(){
                p.css({left: 0});
            });
        } else {
            t = cur - 1;
            if (t < 0) {
                t = max;
                p.css({left: -1 * root_w * (max + 1)});
                return dgo(t);
            } else {
                return dgo(t);
            }
        }
    }
    btns = $((new Array(n + 1)).join('<i></i>'))
        .each(function(idx, el) {
            $(el).data({idx: idx});
        });
    var pn_btn = $('<s class="prev"><i></i></s><s class="next"><i></i></s>');
    $('<div class="btns"/ >')
        .append(
            $('<b/>')
                .append(btns)
                .delegate('i', 'click', function(ev) {
                    dgo($(this).data('idx'));
                })
                .css({width: n * 20, marginLeft: -10 * n})
        )
        .delegate('s', 'click', function(ev) {
            go($(this).is('.prev') ? -1 : 1, true);
        })
        .append(pn_btn)
        .appendTo($root);

    go(1);
    // 自动播放
    var ie6 = $.browser.msie && $.browser.version < '7.0';
    $root.hover(function(ev) {
        // $root[(ev.type == 'mouseenter' ? 'add' : 'remove') + 'Class']('show-hover');
        if (ie6) {
            pn_btn[ev.type == 'mouseenter' ? 'show' : 'hide']();
        } else {
            pn_btn.stop()['fade' + (ev.type == 'mouseenter' ? 'In' : 'Out')]('fast');
        }
    });
    if ($root.attr('rel') == 'autoPlay') {
        var si = setInterval(function(){
            var now = +new Date();
            if (now - pt < stay) {
                return;
            }
            go(1, true);
        }, 5000);
        p.mouseover(function(){ clearInterval(si);})
        p.mouseout(function(){
            si = setInterval(function(){
                var now = +new Date();
                if (now - pt < stay) {
                    return;
                }
                go(1, true);
            }, 5000);})
    }
    var wid = $(document.body).width();
    var swid = (wid-960)/2;
    var bwid = root_w * n;
    $('#show').css('width',wid);$('#show .img').css('width',wid);
    $('#show .btns').css('left',swid)
    $('.masks').css('width',swid);$('.mk2').css('right',0);
    $('#show .img span').css(({paddingLeft: swid }))
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
        $.cookie('sessionId',null);
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

