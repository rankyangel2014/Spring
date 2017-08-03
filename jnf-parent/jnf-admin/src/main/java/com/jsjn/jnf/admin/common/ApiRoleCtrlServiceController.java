package com.jsjn.jnf.admin.common;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.assist.ApiRoleCtrlDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/apiRoleService.do")
public class ApiRoleCtrlServiceController{
	
	private final static Logger logger = Logger.getLogger(BussinessDto.class);
	
	/**
	 * 查询平台所有权限
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findPlatRoles")
	public void findBussiness(ApiRoleCtrlDto apiRoleCtrl,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findPlatRoles "+"==>Parameters:"+JSONObject.toJSONString(apiRoleCtrl));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findPlatRoles", apiRoleCtrl);
		} catch (Exception e) {
			logger.error("Panda远程调用findPlatRoles接口失败！,",e);
		}
		String str = result.getResult();
		JSONArray jsonArray = JSONArray.parseArray(str);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("root", jsonArray);
		jsonObject.put("resMsg", "");
		jsonObject.put("success", true);
		writeRespToPage(jsonObject,req,rsp);
		
		logger.info("[调用结束] "+"method:findPlatRoles "+"==>result:"+str);
		
	} 
	
	
	/**
	 * 将结果返回到页面
	 * @param json
	 * @param req
	 * @param resp
	 * @return
	 * @throws Exception
	 */
	public String writeRespToPage(JSONObject json, HttpServletRequest req,
			HttpServletResponse resp) throws Exception {
		// 将json字符串响应到前台
		try {
			req.setCharacterEncoding("UTF-8");
			resp.setCharacterEncoding("UTF-8");
			resp.getWriter().print(json);
			resp.getWriter().flush();
			resp.getWriter().close();
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage());
			throw e;
		} catch (IOException e) {
			logger.error(e.getMessage());
			throw e;
		}

		return null;
	}

}
