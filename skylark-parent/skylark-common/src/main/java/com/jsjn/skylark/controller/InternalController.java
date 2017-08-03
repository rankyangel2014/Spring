package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.rmi.SkylarkWSUtil;

/**
 * @author think
 * 供内网系统使用，不经过filter验证是否登录。
 */
@Controller("com.jsjn.skylark.service.InternalController")
@RequestMapping("/skylark/InternalService.do")  
public class InternalController {

	@RequestMapping(params = "method=register")
	public void register(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		String userId = request.getParameter("userId");
		String deviceId = request.getParameter("deviceId");
		String deviceType = request.getParameter("deviceType");
		String token = request.getParameter("token");
		String sysId = request.getParameter("sysId");
		//向公共平台登记
		
		String newDeviceId = sysId + "-" + deviceId;
		
		String r = SkylarkWSUtil.register(userId, newDeviceId, deviceType, token, sysId);
		resp.getWriter().println(r);
		resp.getWriter().flush();
	}
	
	@RequestMapping(params = "method=feedback")
	public void feedback(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		String recId = request.getParameter("recId");
		String userId = request.getParameter("userId");
		String topicId = request.getParameter("topicId");
		String period = request.getParameter("period");
		
		SkylarkWSUtil.feedback(recId, userId, topicId, period);
		resp.getWriter().println("{\"_rspCode\":\"000000\"}");
		resp.getWriter().flush();
	}
}
