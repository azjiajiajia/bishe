<%--
  Created by IntelliJ IDEA.
  User: 86156
  Date: 2020/2/29
  Time: 14:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/css/ui.css"/>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <title>我的书架</title>
</head>
<body>
<div id="page_tab" class="page_tab">
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <label>书友：</label>
    <div id="user_name" class="user_name">${sessionScope.reader.rname}</div>
</div>
<div id="left_sort" class="left_sort">
    <ul class="recent_read">最近阅读</ul>
    <ul class="novel_lib">书&nbsp;&nbsp;架</ul>
</div>
<div id="books_sort" class="books_sort"></div>

</body>
</html>
