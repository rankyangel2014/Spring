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
import com.jsjn.jnf.bean.dto.assist.MenuDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/menuConfigService.do")
public class MenuConfigController{
	
	private final static Logger logger = Logger.getLogger(MenuDto.class);
	
	/**
	 * 查询所有下拉参数配置
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findAllMenuByCode")
	public void findAllMenuByCode(MenuDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findAllMenuByCode "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			//设置分页一页显示条数
			dto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findAllMenuByCode", dto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			if(jsonArray.size() == 0){
				jsonObject.put("total", "0");
			}else{
				jsonObject.put("total", ((JSONObject)jsonArray.get(0)).getString("total"));
			}
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:findAllMenuByCode "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用findAllMenuByCode接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 新增下拉参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=addMenu")
	public void addMenu(MenuDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:addMenu "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "addMenu", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:addMenu "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用addMenu接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 修改下拉参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateMenu")
	public void updateMenu(MenuDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:updateMenu "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "updateMenu", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:updateMenu "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用updateMenu接口失败！,",e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 删除下拉参数
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=delMenu")
	public void delMenu(MenuDto dto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:delMenu "+"==>Parameters:"+JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "delMenu", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success",true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:delMenu "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用delMenu接口失败！,",e);
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
