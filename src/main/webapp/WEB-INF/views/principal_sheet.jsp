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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet"/>
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
        <li style="font-size: 25px;font-weight:bolder">
            作品分类
        </li>
    </ul>
    <ul class="jishu">
        <li class="left">
            <a href="javascript:void(0)">

                <cite>
                    <span id="ds">都市</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="ls">历史</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="oushu">
        <li class="left">
            <a href="javascript:void(0)">
                <cite>
                    <span id="xx">仙侠</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="qxs">轻小说</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="jishu">
        <li class="left">
            <a href="javascript:void(0)">

                <cite>
                    <span id="xh">玄幻</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="kh">科幻</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="oushu">
        <li class="left">
            <a href="javascript:void(0)">
                <cite>
                    <span id="js">军事</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="ty">体育</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="jishu">
        <li class="left">
            <a href="javascript:void(0)">

                <cite>
                    <span id="wx">武侠</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="qh">奇幻</span>
                </cite>
            </a>
        </li>
    </ul>
    <ul class="oushu">
        <li class="left">
            <a href="javascript:void(0)">
                <cite>
                    <span id="xy">悬疑</span>
                </cite>
            </a>
        </li>
        <li class="right">
            <a href="javascript:void(0)">
                <cite>
                    <span id="yx">游戏</span>
                </cite>
            </a>
        </li>
    </ul>

</div>
<div id="books_sort" class="books_sort">
    <input type="text" name="pageNum" id="pageNum" value="1" disabled hidden/>
    <input type="text" name="dir" id="dir" value="" disabled hidden/>
    <div id="books_sort_p">
        <ul>
            <li>
                <img id="bimg1" class="book_img" src="" onclick="javascript:void(0)">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn1" href="" target="_blank"></a>
                    </h4>
                    <p id="ban1"></p>
                </div>
            </li>
            <li>
                <img id="bimg2" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn2" href="javascript:void(0)" target="_blank"></a>
                    </h4>
                    <p id="ban2"></p>
                </div>
            </li>
            <li>
                <img id="bimg3" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn3" href="javascript:void(0)" target="_blank"></a>
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
                        <a id="bn4" href="javascript:void(0)" target="_blank"></a>
                    </h4>
                    <p id="ban4"></p>
                </div>
            </li>
            <li>
                <img id="bimg5" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn5" href="javascript:void(0)" target="_blank"></a>
                    </h4>
                    <p id="ban5"></p>
                </div>
            </li>
            <li>
                <img id="bimg6" class="book_img" src="">
                </img>
                <div class="book_info">
                    <h4>
                        <a id="bn6" href="javascript:void(0)" target="_blank"></a>
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
