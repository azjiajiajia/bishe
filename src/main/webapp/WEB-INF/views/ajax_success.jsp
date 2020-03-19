<%--
  Created by IntelliJ IDEA.
  User: luan-cang
  Date: 2020/3/17
  Time: 13:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>
    <script>
        $(function () {
            select(1);
            $("#submit").click(function () {
                select(1);
            });
        })

        function select(i) {
            $.ajax({
                url:"/book/books_ajax",
                data:{"pageNum":i,
                    "bname":$("#bname").val(),
                    "tap":$("#tap").val(),
                    "bchapters":$("#bchapters").val(),
                },
                success(data){
                    $("#pageInfo").empty();
                    $(".italic").remove();
                    var string ="";
                    for (i = 0; i < data.list.length; i++) {
                        string += "bname: "+data.list[i].bname
                            +"bchapters: "+data.list[i].bchapters
                            +"bcover: "+data.list[i].bcover
                            +"<br>";
                    }
                    $("#pageInfo").html(string);
                    $("#pageInfo").append("  当前页:"+data.pageNum)
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
            })
        }

        function formFeed(i) {
            select(Number($("#pageNum").val())+i);
        }
    </script>

</head>
<body>
success_ajax
        <%--隐藏域:当前页码--%>
        <input type="text" name="pageNum" id="pageNum" value="1" disabled hidden/>
        书名:<input type="test" name="bname" id="bname" />
        章节数:<input type="test" name="bchapters" id="bchapters" />
        标签:<input type="test" name="tag" id="tap" />
            <button type="button" id="submit">ajax查询</button>


<div id="pageInfo">

</div>

<nav aria-label="Page navigation" id="navigatePages">
    <ul class="pagination" >
        <li >
            <a href="javaScript:formFeed(-1)" aria-label="Previous" >
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>


        <li id="last">
            <a href="javaScript:formFeed(1)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>

</nav>
</body>
</html>
