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
        url:''
    });
}

function sort_recent() {

}


