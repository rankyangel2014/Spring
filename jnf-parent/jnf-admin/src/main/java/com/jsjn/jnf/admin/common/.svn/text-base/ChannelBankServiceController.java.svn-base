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
import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/channelBankService.do")
public class ChannelBankServiceController{
	
	private final static Logger logger = Logger.getLogger(ChannelBankDto.class);
	
	/**
	 * 查询系统所有银行信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryAllBankList")
	public void queryAllBankList(ChannelBankDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:queryAllBankList "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			//设置分页一页显示条数
			inDto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "queryAllBankList",inDto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			if(jsonArray.size() == 0){
				jsonObject.put("total", "0");
			}else{
				jsonObject.put("total", ((JSONObject)jsonArray.get(0)).getString("total"));
			}
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:queryAllBankList "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用queryAllBankList接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 新增系统配置银行信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=addBankInfo")
	public void addBankInfo(ChannelBankDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:addBankInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "addBankInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:addBankInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用addBankInfo接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 修改系统配置银行信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateBankInfo")
	public void updateBankInfo(ChannelBankDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:updateBankInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateBankInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:updateBankInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用updateBankInfo接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 删除系统配置银行信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=delBankInfo")
	public void delBankInfo(ChannelBankDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:delBankInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "delBankInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:delBankInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用delBankInfo接口失败！,",e);
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
