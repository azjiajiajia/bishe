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
            data:{"login_user_id": $("#login_user_id").val(),"login_pwd": $("#login_pwd").val()},
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
    });

    $("#lib").click(function () {
        if($("#hid").html()==""){
            //还未登录，弹出提示登录，同时弹出登录界面
            alert("还没登录！请先登录");
            $("#bg").css({display:"block"});
            $("#login_window").css({display:"block"});
        }
        else {
            $.ajax({
                url:"/reader/novel_lib",
                type:"post",
                data:{"reader_id":$("#hid").html()},
                dataType:'json',
                async:'false',
                success: function(data){
                    window.parent.location.href = "novel_lib.jsp";
                },
                error:function (data) {
                    alert("出错");
                }
            })
        }

    });
    $("#ds").click(function () {
        var book={};
        book.bname=null;
        book.bcover=null;
        book.bchapters=0;
        book.tag="都市";
        book.aname=null;
        $.ajax({
            url:'/book/books_ajax',
            type: 'post',
            data:{"bname":null,"bcover":null,"bchpters":null,"tag":"都市","aname":null},
            dataType:'json',
            success: function(data){
                $("#books_sort_p").empty();
                $(".italic").remove();
                var string ="";
                for (i = 0; i < data.list.length; i++) {
                    string += "bname: "+data.list[i].bname
                        +"bchapters: "+data.list[i].bchapters
                        +"bcover: "+data.list[i].bcover
                        +"<br>";
                }
                $("#books_sort_p").html(string);
                $("#books_sort_p").append("  当前页:"+data.pageNum)
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
            },
            error:function (data) {
                alert("出错");
            }
        });
    })
    $().moveDivByID("login");
    $().moveDivByID("register");
});

function select(i) {
    $.ajax({
        url:'/book/books_ajax',
        data:{"bname":null,"bcover":null,"bchpters":null,"tag":"都市","aname":null,"pageNum":i},
        success:function (data) {
            $("#books_sort_p").empty();
            $(".italic").remove();
            var string ="";
            for (i = 0; i < data.list.length; i++) {
                string += "bname: "+data.list[i].bname
                    +"bchapters: "+data.list[i].bchapters
                    +"bcover: "+data.list[i].bcover
                    +"<br>";
            }
            $("#books_sort_p").html(string);
            $("#books_sort_p").append("  当前页:"+data.pageNum)
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
        },
    });
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



