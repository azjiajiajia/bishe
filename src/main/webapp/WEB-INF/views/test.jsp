<%--
  Created by IntelliJ IDEA.
  User: luan-cang
  Date: 2020/3/17
  Time: 14:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>test</title>

</head>
<body>
<a href="/book/books">无页码查询</a>
<a href="/book/books?pageNum=1">给页码值1查询</a>
<form id="dialog-from-label" action="/book/books">
    页:<input type="text" name="pageNum"/>
    书名:<input type="test" name="bname"/>
    章节数:<input type="test" name="bchapters"/>
    标签:<input type="test" name="tag"/>
    <button type="submit">带参数查询</button>
</form>
</body>
</html>
