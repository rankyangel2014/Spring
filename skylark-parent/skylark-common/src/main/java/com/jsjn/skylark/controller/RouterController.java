package com.jsjn.skylark.controller;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;

import org.apache.commons.lang.StringUtils;
import org.apache.http.cookie.Cookie;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jsjn.skylark.combination.Combination;
import com.jsjn.skylark.ex.HttpRomteAccessException;
import com.jsjn.skylark.listener.StartupListener;
import com.jsjn.skylark.common.utils.CookieUtils;
import com.jsjn.skylark.common.utils.HttpClientUtil;
import com.jsjn.skylark.common.utils.HttpResult;

@Controller
public class RouterController {

	private static final Logger LOGGER = Logger.getLogger(RouterController.class);

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/{modId}/router/rest/{action:.+}")
	public void urlRest(HttpServletRequest req, HttpServletResponse resp,
			@PathVariable String modId, @PathVariable String action)
			throws Exception {
		Object json = null;
		Map<String, Object> rspMap = new HashMap<String, Object>();
		try {
			Combination combination = StartupListener.combs.get(modId);
			if (combination == null) {
				throw new HttpRomteAccessException("请求的应用不存在");
			}
			String url = combination.getAppWebServer() + action;
			Map<String, String[]> map = req.getParameterMap();
			LOGGER.debug("component " +modId+" ,request url : "+url);
			LOGGER.debug("component " +modId+" ,request data : "+JSONObject.fromObject(map));
			String cookie = "JSESSIONID={0}; ticket={1}";
			String ticket = CookieUtils.getCookie(req, "ticket");
			String jsessionid = CookieUtils.getCookie(req, "APPJSESSIONID");
			if(StringUtils.isEmpty(jsessionid)){
				jsessionid =  CookieUtils.getCookie(req, "JSESSIONID");
			}
			cookie = MessageFormat.format(cookie, jsessionid,ticket);
			HttpResult httpResult = HttpClientUtil.doPost(url, map, "UTF-8",
					cookie);
			//添加服务返回的cookie信息
			for (Cookie cookie2 : httpResult.getCookies()) {
				String cookieName = cookie2.getName().equals("JSESSIONID")? "APPJSESSIONID" : cookie2.getName();
				CookieUtils.setCookie(resp,cookieName, cookie2.getValue(),"/");
			}
			String content = httpResult.getContent();
			if(StringUtils.isEmpty(content)){
				throw new HttpRomteAccessException("当前请求访问响应内容为空");
			}
			// 未登录，访问
			if (content.indexOf("top.location") > -1) {
				throw new HttpRomteAccessException("当前请求访问无权限");
			}
			JsonConfig jsonConfig = new JsonConfig();
			// 设置循环检测策略
			jsonConfig
					.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
			jsonConfig.setJsonPropertyFilter(buildFilter());
			// 返回序列化结果集
			if (content.startsWith("[")) {
				json = JSONArray.fromObject(content, jsonConfig);
			} else {
				json = JSONObject.fromObject(content, jsonConfig);
			}
			LOGGER.debug("component " +modId+" ,response data: "+json);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			rspMap.put("success", false);
			rspMap.put("rspMsg", e.getMessage());
			rspMap.put("errMsg", e.getMessage());
			rspMap.put("rspCode", "999999");
			json = JSONObject.fromObject(rspMap);
		}
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("application/json; charset=UTF-8");  
		resp.getWriter().print(json);
		resp.getWriter().flush();
		resp.getWriter().close();

	}

	private PropertyFilter buildFilter() {
		return new PropertyFilter() {
			// 重写内部的允许字段通过的方法
			public boolean apply(Object source, String name, Object value) {
				// 排除的字段名字（属性名）
				if (name.equals("_SQL_CODE") || name.equals("_areaId")
						|| name.equals("_fileName") || name.equals("_insttuId")
						|| name.equals("_isUnLoad") || name.equals("_accDate")
						|| name.equals("_id") || name.equals("_sqlListName")
						|| name.equals("_sqlTxt") || name.equals("_transCode")
						|| name.equals("_userId") || name.equals("_uuid")
						|| name.equals("modId") || name.equals("_pageLimit")
						|| name.equals("_pageStart") || name.equals("_total")) {
					return true;
				} else {
					return false;
				}
			}
		};
	}
}
