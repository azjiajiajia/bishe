<%--
  Created by IntelliJ IDEA.
  User: luan-cang
  Date: 2020/3/17
  Time: 13:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>success</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>
    <script>
        $(function () {
            $("#submit").click(select())
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
                    var string;
                    for (i = 0; i < data.list.length; i++) {
                        string += "   bname: "+data.list[i].bname
                            +"   bchapters: "+data.list[i].bchapters
                            +"   bcover: "+data.list[i].bcover
                            +"<br>";
                    }
                    $("#pageInfo").html( string);
                    $("#pageInfo").append("  当前页:"+data.pageNumber)
                        .append("  总记录:"+data.total)
                        .append("  每页条数:"+data.pageSize)
                        .append("  总页数"+data.pages)
                        .append("  可显示页数:"+data.navigatePages)
                        .append("  起始页码:"+data.navigateFirstPage)
                        .append("  结束页码:"+data.navigateLastPage);
                }
            })
        }
    </script>

</head>
<body>
success
    <a href="/book/books">无页码查询</a>
    <a href="/book/books?pageNum=1">给页码值1查询</a>
    <form id="data" action="/book/books">
        <%--隐藏域:当前页码--%>
        <input type="text" name="pageNum" id="pageNum" value="${pageInfo.pageNum}" disabled hidden/>
        书名:<input type="test" name="bname" id="bname" value="${searchInfo.bname}"/>
        章节数:<input type="test" name="bchapters" id="bchapters" value="${searchInfo.bchapters}"/>
        标签:<input type="test" name="tag" id="tap" value="${searchInfo.tag}"/>
        <button type="submit">同步查询</button>
    </form>
    <button type="button" id="submit">ajax查询</button>
    <p>${pageInfo.list}</p>
<div id="pageInfo">
    <c:forEach items="${pageInfo.list}" var="item">
        <p>book:${item}</p>
    </c:forEach>
</div>
    <nav aria-label="Page navigation">
        <ul class="pagination" >
            <li>
                <a href="javaScript:formFeed(-1)" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <div id="navigatePages">
                <c:forEach  begin="${pageInfo.navigateFirstPage}" end="${pageInfo.navigateLastPage}" var="num">
                <li><a href="javaScript:select(${num})" >${num}</a></li>
                </c:forEach>
            </div>
            <li>
                <a href="javaScript:formFeed(1)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</body>
</html>
