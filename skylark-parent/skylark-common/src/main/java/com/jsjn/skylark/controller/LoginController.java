package com.jsjn.skylark.controller;

import java.io.IOException;
import java.net.URLDecoder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.rmi.SkylarkWSUtil;
import com.jsjn.skylark.session.SessionContext;
import com.jsjn.skylark.session.UserInfo;
import com.jsjn.skylark.common.utils.CookieUtils;
import com.jsjn.skylark.common.utils.IPUtil;

@Controller("com.jsjn.skylark.service.LoginController")
@RequestMapping("/skylark/LoginService.do")
public class LoginController extends AbstractBaseController {

	Logger logger = Logger.getLogger("skylark");

	@RequestMapping(params = "method=login")
	public void login(HttpServletRequest request, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("application/json; charset=UTF-8");
		resp.setCharacterEncoding("utf-8");
		String deviceId = request.getParameter("deviceId");
		String smcode = request.getParameter("smcode");
		String loginId = request.getParameter("loginId");
		loginId = URLDecoder.decode(loginId, "utf-8");
		String password = request.getParameter("password");
		// 若type=0，password是密码；若type=1，password是手势密码。
		String type = request.getParameter("type");
		String modId = request.getParameter("modId");
		/* 登录改造 2016-05-31 start */
		String smsFlag = request.getParameter("smsFlag");
		String token = request.getParameter("token");
		String IPAddress = IPUtil.getIpAddr(request);
		/* 登录改造 2016-05-31 end */

		if (!"0".equals(type) && !"1".equals(type)) {
			JSONObject jo = JSONObject
					.fromObject("{_rspCode:'100000', _rspMsg:'请求参数不正确。'}");
			resp.getWriter().println(jo.toString());
			resp.getWriter().flush();
			return;
		}
		String newDeviceId = modId + "-" + deviceId;

		/* 登录改造 2016-05-31 start */
		String sessionId = request.getSession().getId();
		String rsp = SkylarkWSUtil.login2(loginId, password, smcode,
				newDeviceId, type, modId, smsFlag, token, IPAddress, sessionId);
		/* 登录改造 2016-05-31 end */
		JSONObject jo = JSONObject.fromObject(rsp);
		JSONObject result = new JSONObject();
		if (jo.getString("_rspCode").equals("000000")) {
			// 登录成功
			JSONObject _rspMsg = jo.getJSONObject("_rspMsg");
			JSONObject userInfo = _rspMsg.getJSONObject("userInfo");
			JSONObject stationInfo = _rspMsg.getJSONObject("stationInfo");
			JSONObject insttuInfo = _rspMsg.getJSONObject("insttuInfo");
			JSONObject pubssoInfo = _rspMsg.getJSONObject("pubssoInfo");
			result.put("_rspCode", "000000");
			JSONObject rm = new JSONObject();
			rm.put("userId", userInfo.getJSONObject("id").getString("userId"));
			rm.put("userName", userInfo.getString("userName"));
			rm.put("mobile", userInfo.getString("mobile"));
			rm.put("loginId", userInfo.getString("loginId"));
			rm.put("insttuId",
					insttuInfo.getJSONObject("id").getString("insttuId"));
			rm.put("insttuName", insttuInfo.getString("cname"));
			rm.put("insttuTy",
					userInfo.getJSONObject("id").getString("insttuTy"));
			rm.put("stationId", stationInfo.getString("id"));
			rm.put("stationName", stationInfo.getString("name"));
			rm.put("deptId", userInfo.getString("deptId"));
			rm.put("jyrq", userInfo.getString("jyrq"));
			rm.put("modId", modId); // 将登陆成功后的modid写入session中
			// GET ticket success

			if (pubssoInfo != null && !pubssoInfo.isNullObject()
					&& pubssoInfo.has("ticket")
					&& StringUtils.isNotBlank(pubssoInfo.getString("ticket"))) {
				CookieUtils.setCookie(resp, "ticket",
						pubssoInfo.getString("ticket"), "/");
			}
			result.put("_rspMsg", rm);
			UserInfo ui = (UserInfo) JSONObject.toBean(rm, UserInfo.class);
			SessionContext.getSession().setAttribute(SessionContext.USER_INFO,
					ui);

			resp.getWriter().println(result.toString());
			resp.getWriter().flush();
		} else {
			// 登录失败
			resp.getWriter().println(jo.toString());
			resp.getWriter().flush();
		}
	}

	@RequestMapping(params = "method=logout")
	public void logout(HttpServletRequest request, HttpServletResponse resp)
			throws Exception {
		HttpSession session = request.getSession();
		String userId = null;
		JSONObject r = new JSONObject();
		if (session != null) {
			UserInfo userInfo = (UserInfo) session
					.getAttribute(SessionContext.USER_INFO);
			if (userInfo != null) {
				userId = userInfo.getUserId();
			}
			session.invalidate();
			Cookie cookie = new Cookie("ticket", null);
			cookie.setMaxAge(0);
			cookie.setPath("/");
			resp.addCookie(cookie);
		}
		r.put("_rspCode", "000000");
		r.put("_rspMsg", "退出登录成功。");
		logger.info(userId + " 退出登录");
		writeRespToPage(r, request, resp);
	}

}
