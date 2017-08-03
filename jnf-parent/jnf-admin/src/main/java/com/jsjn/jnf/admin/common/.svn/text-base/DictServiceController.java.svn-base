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
import com.jsjn.jnf.bean.dto.assist.DictDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/dictService.do")
public class DictServiceController{
	
	private final static Logger logger = Logger.getLogger(DictDto.class);
	
	/**
	 * 查询系统所有配置参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=qryDictInfo")
	public void qryDictInfo(DictDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:qryDictInfo "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			//设置分页一页显示条数
			inDto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "qryDictInfo", inDto);
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
			
			logger.info("[调用结束] "+"method:qryDictInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用qryDictInfo接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 新增系统配置参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=addDictInfo")
	public void addDictInfo(DictDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:addDictInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "addDictInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:addDictInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用addDictInfo接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 修改系统配置参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateDictInfo")
	public void updateDictInfo(DictDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:updateDictInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateDictInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:updateDictInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用updateDictInfo接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 删除系统配置参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=delDictInfo")
	public void delDictInfo(DictDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:delDictInfo "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "delDictInfo", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", str == null ? false:true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:delDictInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用delDictInfo接口失败！,",e);
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
