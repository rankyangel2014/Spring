package com.jsjn.jnf.admin.common;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/bussinessConfigService.do")
public class BussinessConfigController{
	
	private final static Logger logger = Logger.getLogger(BussinessDto.class);
	
	/**
	 * 查询商户配置信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryBussinessConfigByMid")
	public void queryBussinessConfigByMid(BizConfigDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:queryBussinessConfigByMid "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "queryBussinessConfigByMid", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);//有结果和无结果都当做修改处理
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:queryBussinessConfigByMid "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用queryBussinessConfigByMid接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 保存商户配置信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=saveBussinessConfig")
	public void saveBussinessConfig(BizConfigDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:saveBussinessConfig "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "saveBussinessConfig", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:saveBussinessConfig "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用saveBussinessConfig接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
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
