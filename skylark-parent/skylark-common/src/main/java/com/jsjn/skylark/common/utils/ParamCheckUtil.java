package com.jsjn.skylark.common.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.mongodb.util.Hash;

public class ParamCheckUtil {
	
	private static Logger logger = Logger.getLogger("skylark");
	
	private static String errMsg = "请求参数不正确。";
	
	public static String ajaxCheck(HttpServletRequest req, String...requiredParams) {
		if(requiredParams != null) {
			Map<String, String[]> map = req.getParameterMap();
			Set<String> ks = map.keySet();
			Map<String, String> newMap = new HashMap<String, String>();
			for(String key : ks) {
				newMap.put(key, map.get(key)[0]);
			}
			String r = check(newMap, requiredParams);
			if(r != null) {
				logger.error(r + "请求方ip: " + req.getRemoteAddr());
				JSONObject j = new JSONObject();
				j.put("success", false);
				j.put("errMsg", errMsg);
				return j.toString();
			}
		}
		return null;
	}

	public static String check(Map target, String...requiredParams) {
		if(requiredParams != null) {
			for(String param : requiredParams) {
				if(target.get(param) == null || "".equals(target.get(param))) {
					return "请求参数不正确。参数 "+param+" 缺失或为空。";
				}
			}
		}
		return null;
	}
}