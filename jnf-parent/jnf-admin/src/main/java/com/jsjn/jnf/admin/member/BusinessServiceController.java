package com.jsjn.jnf.admin.member;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.member.UpdateBussinessAuthDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/businessService.do")
public class BusinessServiceController{
	
	private final static Logger logger = Logger.getLogger(BussinessDto.class);
	
	/**
	 * 查询商户信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findBussiness")
	public void findBussiness(BussinessDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findBussiness "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findBussiness", inDto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:findBussiness "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用findBussiness接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 新增商户
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=saveBusinessInfo")
	public void saveBusinessInfo(BussinessDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:saveBusinessInfo "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "saveBusinessInfo", inDto);
			String str = result.getResult();
			JSONObject jsonOb = JSONObject.parseObject(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonOb);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:saveBusinessInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用saveBusinessInfo接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
		
	} 
	
	/**
	 * 修改商户
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateBussinessInfo")
	public void updateBussinessInfo(BussinessDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:updateBussinessInfo "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateBussinessInfo", inDto);
			String str = result.getResult();
			JSONObject jsonOb = JSONObject.parseObject(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonOb);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:updateBussinessInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用updateBussinessInfo接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
		
	} 
	
	/**
	 * 查询商户拥有的权限
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findBussinessAuth")
	public void findBussinessAuth(BussinessDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findBussinessAuth "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findBussinessAuth", inDto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:findBussinessAuth "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用findBussinessAuth接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
		
	} 
	

	/**
	 * 修改商户权限
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateBussinessAuth")
	public void updateBussinessAuth(UpdateBussinessAuthDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:updateBussinessAuth "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateBussinessAuth", inDto);
			String str = result.getResult();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:updateBussinessAuth "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用updateBussinessAuth接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
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
