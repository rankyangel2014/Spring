package com.jsjn.skylark.common.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.panda.client.Result;
import com.jsjn.skylark.format.AjaxResp;

/**
 * @author think
 * 响应格式转换工具。将各类请求的响应格式转为通用响应格式。使前端代码可以统一。
 */
public class FormatUtil {
	
	/**由HttpServletRequest的getParameterMap得到的Map<String, String[]>转为Map<String, String>
	 * @return
	 */
	public static Map getParamMap(HttpServletRequest req) {
		Map<String, String[]> paramMap = req.getParameterMap();
		Set<String> keySet = paramMap.keySet();
		Map map = new HashMap();
		for(String key : keySet) {
			map.put(key, paramMap.get(key)[0]);
		}
		return map;
	}

	/**
	 * 将panda 服务的响应转为通用响应
	 * @param pandaResp
	 * @return
	 */
	public static AjaxResp panda2Ajax(JSONObject pandaResp) {
		/*
		 * panda 服务的响应格式为:
		 * 交易执行成功：{"_result":}
		 * 						交易执行成功时，_result是一个JSONObject，格式和AjaxResp相同。
		 * 交易执行失败：抛出异常。该方法中不做处理。
		 */
		AjaxResp r = new AjaxResp();
		r.setSuccess(true);
		r.setRspMsg("成功");
		if(pandaResp.get("_result") == null) {
			//data为空
		} else {
			/*
			String _result = pandaResp.getString("_result");
			if(_result.startsWith("{") && _result.endsWith("}")) {
				//可以转为jsonobject的情况
				JSONObject jo = JSONObject.parseObject(_result);
				if(jo.containsKey("total") && jo.containsKey("root")) {
					//分页查询类型的请求
					r.setTotal(jo.getString("total"));
					r.setRoot(jo.getString("root"));
				} else {
					//单个查询类型的请求
					r.setData(jo);
				}
			} else if(_result.startsWith("[") && _result.endsWith("]")) {
				//能转为JSONArray的情况
				r.setData(_result);
			} else {
				r.setData(_result);
			}
			*/
			JSONObject result = JSONObject.parseObject(pandaResp.getString("_result"));
			r = JSONObject.toJavaObject(result, AjaxResp.class);
		}
		return r;
	}
	
	public static AjaxResp result2Ajax(Result result) {
		AjaxResp r = new AjaxResp();
		if("0".equals(result.getState())) {
			r.setSuccess(true);
			r.setRspMsg("成功");
			if(result.getResult() == null) {
				//data为空
			} else {
				JSONObject jsonResult = JSONObject.parseObject(result.getResult());
				r = JSONObject.toJavaObject(jsonResult, AjaxResp.class);
			}
		} else {
			r.setSuccess(false);
			r.setErrMsg(result.getException());
		}
		return r;
	}
}
