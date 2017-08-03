package com.jsjn.skylark.controller;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.skylark.properties.SkylarkProperties;

/**该controller提供app运行所需的相关配置。如汉王ocr所需要的key。
 * @author think
 *
 */
@Controller("com.jsjn.skylark.service.ConfigController")
@RequestMapping("/skylark/ConfigService.do")
public class ConfigController {
	
	private Logger logger = Logger.getLogger("skylark");
	
	@RequestMapping(params="method=getConfigInfo")
	public void getConfigInfo(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("application/json; charset=UTF-8");  
		//os: android, ios ...   default android
		String os = req.getParameter("os");
		if(os == null || os.length() == 0) {
			os = "android";
		}
		//sysId: mlsp, mloan ...   default mlsp
		String sysId = req.getParameter("sysId");
		if(sysId == null || sysId.length() == 0) {
			sysId = "mlsp";
		}
		
		Map<String, Object> config = SkylarkProperties.getAppConfig2(os, sysId);
		JSONObject r = new JSONObject(config);
		logger.info(r.toJSONString());
		
		resp.getWriter().println(r.toJSONString());
		resp.getWriter().flush();
	}
}
