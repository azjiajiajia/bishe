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

</head>
<body>
success
<div>
    <a href="/book/books">无页码查询</a>
    <a href="/book/books?pageNum=1">给页码值1查询</a>
    <form id="data" action="/book/books">
        页:<input type="text" name="pageNum" value="${pageInfo.pageNum}"/>
        书名:<input type="test" name="bname" value="${bookInfo.bname}"/>
        章节数:<input type="test" name="bchapters" value="${bookInfo.bchapters}"/>
        标签:<input type="test" name="tag" value="${bookInfo.tag}"/>
        <button type="submit" id="submit">带参数查询</button>
    </form>

    <p>${pageInfo.list}</p>

    <c:forEach items="${pageInfo.list}" var="item">
        <p>book:${item}</p>
    </c:forEach>

    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li>
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <c:forEach   begin="${pageInfo.navigateFirstPage}" end="${pageInfo.navigateLastPage}" var="num">
            <li><a href="">${num}</a></li>
            </c:forEach>
            <li>
                <a href="" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</body>
</html>
