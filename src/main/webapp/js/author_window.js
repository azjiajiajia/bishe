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

    //关闭发布新章节
    $("#new_cpt_close_btn").click(function () {
        $("#save_dialog").css({display:"block"});
        return false;
    });

    //发布新章节发布
    $("#new_cpt_submit").click(function () {
        if($("#cpt_name").val()==""){alert("请输入章节名");return false;}
        if($("#cpt_article").html()==""){alert("请输入文章");return false;}
        add_new_cpt($("#hid_cpt").val());
        return false;
    });

    //save提示框关闭按钮
    $("#save_dialog_close").click(function () {
        $("#save_dialog").css({display:"none"});
        return false;
    });
    //save提示框确定按钮
    $("#save_dialog_yes").click(function () {
        $("#save_dialog").css({display:"none"});
        $("#post_new_cpt").css({display:"none"});
        $("#bg").css({display:"none"});
        return false;
    });
    //save提示框取消按钮
    $("#save_dialog_no").click(function () {
        $("#cpt_article").html("");
        $("#cpt_name").val("");
        $("#save_dialog").css({display:"none"});
        $("#post_new_cpt").css({display:"none"});
        $("#bg").css({display:"none"});
        return false;
    });

//关闭发布新书
    $("#new_book_close_btn").click(function () {
        $("#bg").css({display:"none"});
        $("#new_book").css({display:"none"});
        return false;
    });
//发布新书按钮
    $("#post_btn").click(function () {
        if($("#author_name").html()==""){
            alert("请先登录！");
        }
        else {
            $("#bg").css({display:"block"});
            $("#new_book").css({display:"block"});
            return false;
        }
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
                    loadwork();
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
        loadwork();
    }
}


function loadwork(){
    $.ajax({
        url:'/author/find_work',
        type:'post',
        data:{"aname":$("#author_name").html()},
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
                $("#bn"+i).attr("href","javaScript:loadchapter(\""+data.list[i-1]["bname"]+"\")");
                $("#ban"+i).html(data.list[i-1]["aname"]);
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
        },
        error:function () {
            alert("出错");
        }
    });
}

function select(i){
    $.ajax({
        url:'/author/find_work',
        type:'post',
        data:{"aname":$("#author_name").html(),"pageNum":i},
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
                $("#bn"+i).attr("href","javaScript:loadchapter(\""+data.list[i-1]["bname"]+"\")");
                $("#ban"+i).html(data.list[i-1]["aname"]);
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
        },
        error:function () {
            alert("出错");
        }
    });
}

function formFeed(i) {
    select(Number($("#pageNum").val())+i);
}

function loadchapter(bname){
    $("#novel_chapter").html("");
    $.ajax({
        url:'/author/findchapter',
        type:'post',
        data:{"bname":bname},
        dataType:'json',
        success:function (data) {
            if(data.type=="success"){
                var rows=data["rows"];
                var lastcpt;
                for(var i=0;i<rows.length;i++){
                    var name= rows[i]["chaptername"];
                    var ad=rows[i]["chapterad"];
                    var cpt=rows[i]["chapter"];
                    $("#novel_chapter").append("<a class='chapter' href='"+ad+"' target='_blank'>第"+cpt+"话</a>");
                    if(i==(rows.length-1)){
                        lastcpt=cpt+1;
                    }
                }
                $("#hid_cpt").val(lastcpt);
                $("#hid_bname").val(bname);
                $("#novel_chapter").append("<input type='button' class='chapter' onclick='javaScript:post_new_cpt("+lastcpt+")' style='color: #ed9266;font-size: 8px;width: 20%' value='发表最新章节'/>");
            }
        },
        error:function () {
            alert("出错");
        }
    });
}

function post_new_cpt(cpt){
    $("#new_cpt_num").html("第"+cpt+"话");
    $("#post_new_cpt").css({display:"block"});
    $("#bg").css({display:"block"});

}

function add_new_cpt(cpt){
    $.ajax({
        url:'/author/add_cpt',
        type:'post',
        data:{"chapter":cpt,"bname":$("#hid_bname").val(),"article":$("#cpt_article").val(),"title":$("#cpt_name").val()},
        dataType:'json',
        success:function (data) {
            if(data.type=="success"){
                alert("发布成功");
                $("#post_new_cpt").css({display:"none"});
                $("#bg").css({display:"none"});
                loadchapter($("#hid_bname").val());
                $("#cpt_article").val("");
                $("#cpt_name").val("");
            }
            else {
                alert(data["msg"]);
            }
        },
        error:function () {
            alert("出错");
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