<%--
  Created by IntelliJ IDEA.
  User: 86156
  Date: 2020/3/27
  Time: 16:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/css/ui.css"/>
    <link rel="stylesheet" type="text/css" href="/css/novel_ui.css"/>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/novel_window.js"></script>
    <title>小说</title>
</head>
<body>
<div id="page_tab" class="page_tab">
    <input type="button" id="page_tab_author" class="author" value="作者专区"/>
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <input type="button" id="page_tab_reader_login" class="login" value="登录"/>
    <input type="button" id="page_tab_reader_register" class="register" value="注册"/>
    <label id="page_tab_lable">书友：</label>
    <div id="user_name" class="user_name">${sessionScope.reader.rname}</div>
</div>
<div id="novel_info" class="novel_info">
    <input type="text" id="bname" disabled hidden value="${sessionScope.bname}"/>
    <div class="nr">
        <div class="ncover">
            <img id="novel_bcover" src="" alt="xx" style="width: 100%;height: 100%"/>
        </div>
        <div class="ns">
            <h2 id="novel_bname" style="font-size: 18px;"></h2><br/>
            <h3 id="novel_aname" style="font-size: 16px;"></h3><br/>
            <h4 id="novel_tag" style="border: 1px solid darkgrey;width: 50px;height:20px;background-color:lightcyan;color:chocolate;font-size: 12px;border-radius:2em;margin-left:10px;text-align: center "></h4>
            <div class="nk">
                <h3 id="novel_c_num"></h3>
                <input type="button" id="add_to_lib" value="&nbsp;加&nbsp;入&nbsp;书&nbsp;架&nbsp;"/>
                <input type="button" id="reading" value="&nbsp;开&nbsp;始&nbsp;阅&nbsp;读&nbsp;"/>
            </div>
        </div>
    </div>
    <div id="novel_chapter" class="chapters">
    </div>
</div>



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
