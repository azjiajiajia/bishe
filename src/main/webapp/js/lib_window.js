$(function(){
    init_tab();
    init_sort();


    $("#recent_read").click(function () {
        alert("1");
    });
    $("#left_sort_lib").click(function () {
        alert("2");
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
function init_sort() {

}


