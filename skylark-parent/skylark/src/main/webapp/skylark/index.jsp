<%@page
	import="com.jsjn.skylark.listener.StartupListener, java.util.*, com.jsjn.skylark.combination.Combination"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		Map<String, Combination> map = StartupListener.combs;
		Set<String> set = map.keySet();
		StringBuffer sb = new StringBuffer();
		int index = 1;
		sb.append("<h2>skylark平台集成的应用如下：</h2>");
		sb.append("<table>");
		sb.append("<tr><th style='width:50px'></th><th style='width:200px'>应用名</th><th style='width:200px'>版本</th></tr>");
		for(String appName : set) {
			sb.append("<tr>");
			sb.append("<td align='center'>"+index++ +".</td>");
			sb.append("<td align='center'>"+appName+"</td>");
			sb.append("<td align='center'>"+map.get(appName).getVersion()+"</td>");
		}
		sb.append("</table>");
		out.write(sb.toString());
	%>
</body>
</html>