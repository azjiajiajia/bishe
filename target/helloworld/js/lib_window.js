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


