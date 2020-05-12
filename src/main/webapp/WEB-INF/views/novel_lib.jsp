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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/css/ui.css"/>
    <link rel="stylesheet" type="text/css" href="/css/lib_ui.css"/>
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
    <script type="text/javascript" src="/js/lib_window.js"></script>
    <title>我的书架</title>
</head>
<body>
<div id="page_tab" class="page_tab">
    <div id="page_tab_title" class="tab_title">jcc小说网</div>
    <label id="page_tab_lable">书友：</label>
    <div id="user_name" class="user_name">${sessionScope.reader.rname}</div>
</div>
<div id="left_sort" class="left_sort">
    <div id="r_chosen"><input type="button" class="recent_read" id="recent_read" value="最近阅读"/></div>
    <div id="l_chosen"><input type="button" class="novel_lib" id="left_sort_lib" value="书&nbsp;&nbsp;架"></div>
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

</body>
</html>
