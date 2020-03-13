<%--
  Created by IntelliJ IDEA.
  User: 86156
  Date: 2020/2/29
  Time: 14:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>作者专区</title>
</head>
<body>
<div id="page_tab" class="page_tab">
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <input type="button" id="page_tab_author_login" class="login" value="登录"/>
    <input type="button" id="page_tab_author_register" class="register" value="注册"/>
    <label>作者：</label>
    <div id="author_name" class="author_name">${sessionScope.author.aname}</div>
</div>
<div class="author_works">已有作品</div>
<div class="work_chapters">作品章节</div>
<div id="books_sort" class="books_sort"></div>
<div id="novel_scan" class="novel_scan"></div>
<div id="post_new_book">发布新书</div>
<div id="new_book" class="new_book">
    <div class="coverage">
        封面：<input type="file" name="novel_cover"/>
    </div>
    <div class="novel_name">
        书名：<input type="text" placeholder="请输入书名"/>
    </div>
    <div class="novel_kind_choose">
        分类：<select id="novel_kind">
        <option value="历史">历史</option>
        <option value="言情">言情</option>
        <option value="科幻">科幻</option>
        <option value="玄幻">玄幻</option>
    </select>
    </div>
</div>
<div id="bg" class="bg"></div>
</body>
</html>
