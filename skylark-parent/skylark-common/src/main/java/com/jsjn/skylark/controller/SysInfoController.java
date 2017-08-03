package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.rmi.SkylarkWSUtil;
import com.jsjn.skylark.session.SessionContext;
import com.jsjn.skylark.session.UserInfo;

@Controller("com.jsjn.masp.ajax.SysInfoController")
@RequestMapping("/skylark/SysInfoService.do")  
public class SysInfoController {
	
	Logger logger = Logger.getLogger("skylark");

	/**分组查询。按类型分组，返回类型名称、已读/未读数量。
	 */
	@RequestMapping(params = "method=queryGroup")
	public void queryGroup(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8"); 
		UserInfo ui = (UserInfo)SessionContext.getAttribute(SessionContext.USER_INFO);
		JSONObject req = new JSONObject();
		req.put("orgNo", ui.getInsttuId());
		req.put("userId", ui.getUserId());
		req.put("orgType",ui.getInsttuTy());
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQuerySysinfoGroup, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
	
	/**针对某一具体类型的提醒，根据已读/未读状态，分页查询提醒的标题、时间、内容。
	 */
	@RequestMapping(params = "method=queryList")
	public void queryList(HttpServletRequest request, HttpServletResponse resp) throws IOException { 
		resp.setContentType("application/json; charset=UTF-8"); 
		UserInfo ui = (UserInfo)SessionContext.getAttribute(SessionContext.USER_INFO);
		JSONObject req = new JSONObject();
		req.put("userId", ui.getUserId());
		req.put("orgNo", ui.getInsttuId());
		req.put("orgType", ui.getInsttuTy());
		req.put("messageType", request.getParameter("messageType"));
		req.put("stat", request.getParameter("stat"));//状态0：已读	1：未读		2：全部
		req.put("start", request.getParameter("start"));
		req.put("pageLimit", request.getParameter("pageLimit"));
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQuerySysinfoList, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
	
	/**将提醒的状态设置为已读（作废）。支持批量操作。
	 */
	@RequestMapping(params = "method=setIsRead")
	public void setIsRead(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8"); 
		JSONObject req = new JSONObject();
		req.put("messageId", request.getParameter("messageId"));
		req.put("operType", request.getParameter("operType"));
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlUpdateSysinfoStat, req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}
}
