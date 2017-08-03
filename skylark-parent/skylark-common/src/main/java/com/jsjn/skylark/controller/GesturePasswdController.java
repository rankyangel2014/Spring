package com.jsjn.skylark.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.jsjn.skylark.common.utils.IPUtil;
import com.jsjn.skylark.rmi.SkylarkWSUtil;

@Controller
public class GesturePasswdController extends AbstractBaseController {

	private final static Logger LOGGER = Logger
			.getLogger(GesturePasswdController.class);

	/**
	 * 设置手势密码
	 * 
	 * @param request
	 * @param resp
	 * @param modId
	 * @param userId
	 * @param deviceId
	 * @param ipAddress
	 * @param sessionId
	 * @param graphicPwd
	 * @throws Exception
	 */
	@RequestMapping("/common/setGraphicPwd.do")
	public void setGraphicPwd2(HttpServletRequest request,
			HttpServletResponse resp,
			@RequestParam(required = true) String modId,
			@RequestParam(required = true) String userId,
			@RequestParam(required = true) String deviceId,
			@RequestParam(required = true) String graphicPwd) throws Exception {

		JSONObject json = null;
		if (StringUtils.isEmpty(modId) || StringUtils.isEmpty(userId)
				|| StringUtils.isEmpty(deviceId)
				|| StringUtils.isEmpty(graphicPwd)) {
			json = new JSONObject();
			json.put("_rspCode", "004500");
			json.put("_rspMsg", "接口参数不合法。");
		} else {
			String ipAddress = IPUtil.getIpAddr(request);
			String sessionId = request.getSession().getId();
			try {
				String newDeviceId = modId + "-" + deviceId;
				String jsonStr = SkylarkWSUtil.setGraphicPwd2(userId,
						newDeviceId, ipAddress, sessionId, graphicPwd);
				json = JSONObject.fromObject(jsonStr);
			} catch (Exception e) {
				LOGGER.error(e.getMessage());
				json = new JSONObject();
				json.put("_rspCode", "999999");
				json.put("_rspMsg", "服务访问异常，请稍后再试。");
			}
		}
		writeRespToPage(json, request, resp);

	}
	
	public static void main(String[] args) {
		JSONObject j = new JSONObject();
		j.put("a", null);
		System.out.println(j.keys().hasNext());
		System.out.println(j.toString());
	}
}
