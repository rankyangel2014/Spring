package com.jsjn.skylark.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.rmi.SkylarkWSUtil;

@Controller("com.jsjn.masp.ajax.MaspController")
@RequestMapping("/skylark/MaspService.do")
public class MaspController {
	private Logger logger = Logger.getLogger("skylark");

	@RequestMapping(params = "method=aboutUs")
	public void aboutUs(HttpServletRequest request, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json; charset=UTF-8");

		String insttuId = request.getParameter("insttuId").toString();
		String userId = request.getParameter("userId").toString();

		String rsp = SkylarkWSUtil.getWDJGInfo(insttuId);
		String rsp2 = SkylarkWSUtil.getWDUserInfo(userId);
		if (rsp == null || rsp2 == null) {
			resp.getWriter().println("{'success':false,'errMsg':'获取数据失败'}");
			resp.getWriter().flush();
			return;
		}

		JSONObject insttuInfo = JSONObject.fromObject(rsp);
		JSONObject userInfo = JSONObject.fromObject(rsp2);
		insttuInfo.remove("CUST_MANAGERS");
		insttuInfo.put("CUST_MANAGER", userInfo);

		JSONObject r = new JSONObject();
		r.put("success", true);
		r.put("rspMsg", "交易执行成功");
		r.put("aboutUs", insttuInfo);
		resp.getWriter().println(r.toString());
		resp.getWriter().flush();
	}

	/**
	 * 登录时获得代办和提醒的有效数量
	 */
	@RequestMapping(params = "method=getCount")
	public void getCount(HttpServletRequest request, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json; charset=UTF-8");

		JSONObject req = new JSONObject();
		req.put("userId", request.getParameter("userId"));
		req.put("stationId", request.getParameter("stationId"));
		req.put("zwrq", request.getParameter("zwrq"));
		String result = SkylarkWSUtil.sqlCommand(SkylarkWSUtil.SqlQueryCount,
				req.toString());
		resp.getWriter().println(result);
		resp.getWriter().flush();
	}

	@RequestMapping(params = "method=removeDeviceId")
	public void removeDeviceId(HttpServletRequest request,
			HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		String userId = request.getParameter("userId");
		String r = SkylarkWSUtil.removeDeviceId(userId);
		logger.warn("用户 " + userId + " 点击\"切换设备\"，操作结果: " + r);
		resp.getWriter().println(r);
		resp.getWriter().flush();

		request.getSession().invalidate();
	}

	@RequestMapping(params = "method=setTop")
	public void setTop(HttpServletRequest request, HttpServletResponse resp)
			throws Exception {
		resp.setContentType("application/json; charset=UTF-8");
		String userId = request.getParameter("userId");
		String msgId = request.getParameter("msgId");
		String msgTy = request.getParameter("msgTy");
		String operFlag = request.getParameter("operFlag");
		String r = SkylarkWSUtil.setTop(userId, msgId, msgTy, operFlag);
		logger.warn("用户 " + userId + " 进行消息置顶操作，userId: " + userId
				+ ", msgId: " + msgId + ", msgTy: " + msgTy + ", operFlag: "
				+ operFlag + "，操作结果: " + r);
		resp.getWriter().println(r);
		resp.getWriter().flush();
	}
}
