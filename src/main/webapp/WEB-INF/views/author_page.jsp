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
    <input type="text" name="pageNum" id="pageNum" value="1" disabled hidden/>
    <input type="text" name="dir" id="dir" value="" disabled hidden/>
    <div id="books_sort_p">
        <ul>
            <li>
                <img id="bimg1" class="book_img" src="" onclick="javascript:void(0)">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn1" href=""></a>
                    </h4>
                    <p id="ban1"></p>
                </div>
            </li>
            <li>
                <img id="bimg2" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn2" href="javascript:void(0)"></a>
                    </h4>
                    <p id="ban2"></p>
                </div>
            </li>
            <li>
                <img id="bimg3" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn3" href="javascript:void(0)"></a>
                    </h4>
                    <p id="ban3"></p>
                </div>
            </li>
        </ul>
        <ul>
            <li>
                <img id="bimg4" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn4" href="javascript:void(0)"></a>
                    </h4>
                    <p id="ban4"></p>
                </div>
            </li>
            <li>
                <img id="bimg5" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn5" href="javascript:void(0)"></a>
                    </h4>
                    <p id="ban5"></p>
                </div>
            </li>
            <li>
                <img id="bimg6" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn6" href="javascript:void(0)"></a>
                    </h4>
                    <p id="ban6"></p>
                </div>
            </li>
        </ul>
        <div id="page_sort_guide"></div>
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
</div>
<div id="novel_scan" class="novel_scan">
    <div style="text-align: center;color: tomato;background-color: #adcced;font-size: 18px;width: 100%;height: 30px">作品章节</div>
    <div id="novel_chapter" class="chapters">
    </div>
</div>

<div id="new_book" class="new_book">
    <div id="new_book_title" class="new_book_title" style="color: #00ccff">
        发布新书
        <span><a id="new_book_close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="book_input">
        <label>封面:</label>
        <input type="file" name="novel_cover" id="input_img"/>
        <label id="none_cover">请设置封面</label>
    </div>
    <div class="book_input">
        <label>书名:</label>
        <input type="text" placeholder="请输入书名" id="input_bname"/>
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

<div id="post_new_cpt" class="login_window" style="width:80%;left: 10%;height: 100%;top:10%">
    <div id="cpt_title" class="login_title">
        <div id="new_cpt_num">第几话</div>
        <span><a id="new_cpt_close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="login_input">
        <label>章节名字：</label>
        <input type="text" id="cpt_name" name="login_user_id"  class="list_input"/>
    </div>
    <div class="login_input" style="height: 70%">
        <label>章节内容:</label><br>
        <textarea id="cpt_article" placeholder="请在此输入" style="height: 90%;width: 80%"></textarea>
    </div>
    <input type="submit" id="new_cpt_submit" value="发布" class="login_submit" style="margin-left: 40%"/>
</div>
<div id="save_dialog">
    <input type="button" id="save_dialog_close" value="X" >
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;是否保存文本
    <br>
    <br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="save_dialog_yes" value="确定">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="button" id="save_dialog_no" value="取消">
</div>
<div id="bg" class="bg"></div>
<input type="text" name="cpt" id="hid_cpt" value="" disabled hidden/>
<input type="text" name="cpt" id="hid_bname" value="" disabled hidden/>
<input type="text" id="hid" value="" disabled hidden/>
</body>
</html>
