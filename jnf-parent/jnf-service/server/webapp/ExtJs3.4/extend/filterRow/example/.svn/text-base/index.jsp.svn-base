<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%
	String server = request.getServerName().toString();
	int port = request.getServerPort();
	String scheme = request.getScheme().toString();
	String path= request.getServletPath().toString();
	String url = request.getRequestURI().toString();
	String sysName = url.replace(path,"");
	String baseUrl = scheme+"://"+server+":"+port+sysName;
%>


<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/ExtJs3.4/resources/css/ext-all-notheme.css" />
	<link rel="stylesheet" type="text/css" href="<%=baseUrl%>/ExtJs3.4/resources/css/xtheme-gray.css" />
	<script type="text/javascript">
		appConfig={};
		appConfig.baseUrl = "<%=baseUrl%>";
	</script>
	<script type="text/javascript" src="<%=baseUrl%>/ExtJs3.4/adapter/ext/ext-base-debug.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/ExtJs3.4/ext-all-debug.js"></script>
	<script type="text/javascript" src="<%=baseUrl%>/ExtJs3.4/src/locale/ext-lang-zh_CN.js"></script>
	
	<!-- 引入表格数据行过滤的插件js文件 -->
	<script type="text/javascript" src="<%=baseUrl%>/ExtJs3.4/extend/filterRow/filterRow.js"></script>

	<script type="text/javascript" src="<%=baseUrl%>/ExtJs3.4/extend/filterRow/example/demo.js"></script>

	<title>template</title>
</head>
<body>
<div id=filterRowGridExample></div>
</body>
</html>

