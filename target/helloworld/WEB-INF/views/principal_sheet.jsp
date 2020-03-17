<%--
  Created by IntelliJ IDEA.
  User: 86156
  Date: 2020/2/26
  Time: 19:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="/css/ui.css"/>
    <link rel="stylesheet" type="text/css" href="/css/slide.css"/>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/window.js"></script>
    <script src="/js/slide.js"></script>
    <title>jcc小说网</title>
</head>
<body>
<div id="hid" style="display: none;height: 0;width: 0;"></div>
<div id="page_tab" class="page_tab">
    <input type="button" id="page_tab_author" class="author" value="作者专区"/>
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <input type="button" id="page_tab_reader_login" class="login" value="登录"/>
    <input type="button" id="page_tab_reader_register" class="register" value="注册"/>
    <label id="page_tab_lable">书友：</label>
    <div id="user_name" class="user_name"></div>
</div>
<div id="guide" class="guide">
    <img src="/images/logo.JPG" alt="logo" class="logo"/>
    <div id="search" class="search">
        <input type="text" name="book_name" id="book_name"/>
        <img src="/images/search.jpg" alt="search" id="search_button" onclick="" style="cursor: pointer"/>
    </div>
    <img src="/images/logo_left.JPG" alt="logo_left" class="logo_left"/>
    <input type="button" id="lib" class="lib" value="&nbsp;书&nbsp;&nbsp;架&nbsp;"/>
</div>
<div id="sort" class="sort">
    <ul class="top">
        <li>
            <span class="icon_menu"></span>
        </li>
        <li style="font-size: 25px;font-weight:bolder">
            作品分类
        </li>
    </ul>
    <ul class="jishu">
        <li class="left">
            <a href="/book/test">
                <cite>
                    <span>言情</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="">
                <cite>
                    <span>科幻</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="oushu">
        <li class="left">
            <a href="">
                <cite>
                    <span>玄幻</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="">
                <cite>
                    <span>都市</span>
                </cite>
            </a>
        </li>
    </ul>

</div>
<div id="books_sort" class="books_sort">
    <h1><a href="/book/test">测试</a></h1>
</div>
<div id="person_intst" class="person_intst">
    <label style="font-size: 16px;font-weight: bold">猜您喜欢</label>
    <div id="show" rel="autoPlay">
        <div class="img">
          <span>
              <a href="http://www.bootstrapmb.com" id="inst_1" target="_blank"><img src="/images/1.jpg" alt="1"/></a>
              <a href="http://www.bootstrapmb.com" id="inst_2" target="_blank"><img src="/images/2.jpg" alt="2"/></a>
              <a href="http://www.bootstrapmb.com" id="inst_3" target="_blank"><img src="/images/3.jpg" alt="3"/></a>
              <a href="http://www.bootstrapmb.com" id="inst_4" target="_blank"><img src="/images/4.jpg" alt="4"/></a>
              <a href="http://www.bootstrapmb.com" id="inst_5" target="_blank"><img src="/images/5.jpg" alt="5"/></a>
          </span>
            <div class="masks mk1"></div>
            <div class="masks mk2"></div>
        </div>
    </div>
</div>
<div id="recent_repost" class="recent_repost">
    <label style="font-size: 16px;font-weight: bold">最近更新</label>
    <div class="left">
        <ul>
            <li style="margin-top: 10px">
                <a href="" id="recent_1" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/1.jpg" id="recent_img_1" alt="1" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_1" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
            <li style="margin-top: 10px">
                <a href="" id="recent_4" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/2.jpg" id="recent_img_4" alt="3" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_4" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
        </ul>
    </div>
    <div class="center">
        <ul>
            <li style="margin-top: 10px">
                <a href="" id="recent_2" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/3.jpg" id="recent_img_2" alt="2" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_2" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
            <li style="margin-top: 10px">
                <a href="" id="recent_5" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/4.jpg" id="recent_img_5" alt="5" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_5" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
        </ul>
    </div>
    <div class="right">
        <ul>
            <li style="margin-top: 10px">
                <a href="" id="recent_3" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/5.jpg" id="recent_img_3" alt="3" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_3" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
            <li style="margin-top: 10px">
                <a href="" id="recent_6" target="_blank">
                    <cite>
                        <span>
                            <img src="/images/6.jpg" id="recent_img_6" alt="6" style="width: 150px;height: 180px"/>
                            <i id="recent_bname_6" class="recent_bname">书名</i>
                        </span>
                    </cite>
                </a>
            </li>
        </ul>
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
<div id="register_window" class="login_window">
    <div id="register_title" class="login_title">
        注册
        <span><a id="register_close_btn" href="javascript:void(0)">关闭</a></span>
    </div>
    <div class="login_input">
        <label>用户名：</label>
        <input type="text" placeholder="请输入用户名" class="list_input"/>
    </div>
    <div class="login_input">
        <label>密码:</label>
        <input type="password" placeholder="请输入密码" class="list_input"/>
    </div>
    <div class="login_input">
        <label>昵称：</label>
        <input type="password" placeholder="请输入昵称" class="list_input"/>
    </div>
    <input type="submit" id="register_window_register" value="注册" class="login_register"/>
</div>
<div id="bg" class="bg"></div>
</body>
</html>
