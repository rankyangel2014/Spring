package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.rmi.SkylarkWSUtil;

@Controller("com.jsjn.masp.ajax.SysNoticeController")
@RequestMapping("/skylark/SysNoticeService.do")  
public class SysNoticeController {
	
	Logger logger = Logger.getLogger("skylark");

	@RequestMapping(params = "method=query")
	public void query(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8"); 
		JSONObject req = new JSONObject();
		req.put("start", request.getParameter("start"));
		req.put("pageLimit", request.getParameter("pageLimit"));
		req.put("orgNo", request.getParameter("orgNo"));
		req.put("noticeId", request.getParameter("noticeId"));
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQuerySysNotice, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
}
