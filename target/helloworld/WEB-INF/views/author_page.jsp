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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/css/ui.css"/>
    <link rel="stylesheet" type="text/css" href="/css/author_ui.css"/>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/author_window.js"></script>

    <title>作者专区</title>
</head>
<body>
<div id="page_tab" class="page_tab">
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <input type="button" id="page_tab_author_login" class="login" value="登录"/>
    <input type="button" id="page_tab_author_register" class="register" value="注册"/>
    <label id="page_tab_lable">作者：</label>
    <div id="author_name" class="author_name">${sessionScope.author.aname}</div>
</div>
<div id="books_sort" class="books_sort">
    <div style="text-align: center;color: tomato;background-color: #adcced;font-size: 18px;width: 100%;height: 30px">已有作品</div>
</div>
<div id="novel_scan" class="novel_scan">
    <div style="text-align: center;color: tomato;background-color: #adcced;font-size: 18px;width: 100%;height: 30px">作品章节</div>
</div>

<div id="new_book" class="new_book">
    <div id="new_book_title" class="new_book_title" style="color: #00ccff">
        发布新书
        <span><a id="new_book_close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="book_input">
        <label>封面:</label>
        <input type="file" name="novel_cover"/>
        <label id="none_cover">请设置封面</label>
    </div>
    <div class="book_input">
        <label>书名:</label>
        <input type="text" placeholder="请输入书名"/>
        <label id="bname_already_has">书名已存在</label>
    </div>
    <div class="book_input">
        <label>分类:</label>
        <select id="novel_kind">
            <option value="历史">历史</option>
            <option value="都市">都市</option>
            <option value="仙侠">仙侠</option>
            <option value="轻小说">轻小说</option>
            <option value="军事">军事</option>
            <option value="体育">体育</option>
            <option value="科幻">科幻</option>
            <option value="玄幻">玄幻</option>
            <option value="武侠">武侠</option>
            <option value="奇幻">奇幻</option>
            <option value="游戏">游戏</option>
            <option value="悬疑">悬疑</option>
        </select>
    </div>
    <input type="submit" id="post_submit" value="发布" class="post_submit"/>
</div>
<div id="post_new_book"><input type="button" id="post_btn" style="height: 50px;width: 80%;margin-left: 0px;position: absolute;left:0 ;right:0;bottom: 0;top:0;margin: auto;color: tomato" value="发布新书"></div>



<div id="login_window" class="login_window">
    <div id="login_title" class="login_title">
        登录
        <span><a id="close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="login_input">
        <label>用户名：</label>
        <input type="text" id="login_user_id" name="login_user_id" placeholder="请输入用户名" class="list_input"/>
    </div>
    <div class="login_input">
        <label>密码:</label>
        <input type="password" id="login_pwd" name="login_pwd" placeholder="请输入密码" class="list_input"/>
    </div>
    <input type="submit" id="login_submit" value="登录" class="login_submit"/>
    <input type="submit" id="login_window_register" value="注册" class="login_register"/>
</div>
<div id="register_window" class="register_window">
    <div id="register_title" class="register_title">
        注册
        <span><a id="register_close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="register_input">
        <label>用户名：</label>
        <input id="register_user_id" type="text" placeholder="请输入用户名" class="list_input"/>
        <label id="userid_check">用户名已存在</label>
    </div>
    <div class="register_input">
        <label>密码:</label>
        <input id="register_user_pwd" type="password" placeholder="请输入密码" class="list_input"/>
        <label id="pwd_check">两次输入密码不一致</label>
    </div>
    <div class="register_input">
        <label>确认密码:</label>
        <input id="register_user_sec_pwd" type="password" placeholder="请再次输入密码" class="list_input"/>
        <label id="pwd_sec_check">请再次输入密码</label>
    </div>
    <div class="register_input">
        <label>昵称：</label>
        <input id="register_user_name" type="text" placeholder="请输入昵称" class="list_input"/>
        <label id="uername_check">昵称已存在</label>
    </div>
    <input type="submit" id="register_window_register" value="注册" class="commit_register"/>
</div>
<div id="bg" class="bg"></div>
</body>
</html>
