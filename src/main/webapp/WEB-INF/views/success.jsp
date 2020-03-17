<%--
  Created by IntelliJ IDEA.
  User: luan-cang
  Date: 2020/3/17
  Time: 13:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<html>
<head>
    <title>success</title>
</head>
<body>
success
<div>
    <h3>${pageInfo}</h3>
    <h3>
      ${pageInfo.list}
    </h3>
    <h3>
<%--            <c:forEach  items="${pageInfo.list}"  var="info"  varStatus="userStatus">--%>
<%--                ${info}--%>
<%--            </c:forEach>--%>
    </h3>

</div>
</body>
</html>
