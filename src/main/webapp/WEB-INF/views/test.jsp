<%--
  Created by IntelliJ IDEA.
  User: luan-cang
  Date: 2020/3/17
  Time: 14:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>

<html>
<head>
    <title>test</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.js"></script>

    <script>
        $(function () {
            $("#submit").click(function () {
                $.ajax({
                    url:"/book/books_ajax",
                    data:$("#data").serialize(),
                    datatype:"json",
                    success(data){
                        alert("接受数据");
                        alert(data);
                    }
                })
            })
        })
    </script>

</head>
<body>
<a href="/book/books">无页码查询</a>
<a href="/book/books?pageNum=1">给页码值1查询</a>
<form id="data" action="/book/books">
    页:<input type="text" name="pageNum"/>
    书名:<input type="test" name="bname"/>
    章节数:<input type="test" name="bchapters"/>
    标签:<input type="test" name="tag"/>
    <button type="submit" >带参数查询</button>
</form>
<button type="button" id="submit">ajax带参数查询</button>


</body>
</html>
