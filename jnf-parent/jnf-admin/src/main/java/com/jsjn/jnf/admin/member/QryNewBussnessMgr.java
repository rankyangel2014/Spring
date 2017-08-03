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
import com.jsjn.jnf.bean.dto.assist.BizConfigDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;
import com.jsjn.panda.exception.NoServiceException;
import com.jsjn.panda.exception.PandaRemoteException;
import com.jsjn.panda.exception.TimeoutException;
@Controller
@RequestMapping("/jnf/qryNewBusness.do")  
public class QryNewBussnessMgr{
	private final static Logger logger = Logger.getLogger(QryNewBussnessMgr.class);
	/**
	 * 根据条件查询商户的信息
	 * @param request
	 * @param response
	 * @param dto
	 */
	@RequestMapping(params="method=qryBusness")
	public void qryBusness(HttpServletRequest request,HttpServletResponse response,BussinessDto dto){
		logger.info("==============qryBusness 进入根据条件查询商户的方法");
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,"findBussiness", dto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,request,response);
		} catch (Exception e) {
			logger.error("===================qryBusness 查询失败商户异常",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,request,response);
		} 
	}
	@RequestMapping(params="method=qryBusnessAll")
	public void qryBusnessAll(HttpServletRequest request,HttpServletResponse response,String mid){
		logger.info("==============qryBusnessAll 进入查询关联商户所有信息查询");
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "qryBusnessAll",mid );
			String str = result.getResult();
			JSONObject jsonObject = JSONObject.parseObject(str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,request,response);
		} catch (Exception e) {
			logger.error("===================qryBusnessAll 进入查询关联商户所有信息查询",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,request,response);
		} 
	}
	
	/**
	 * 根据mid修改商户的信息
	 * @param request
	 * @param response
	 * @param bussinessDto
	 * @param bizConfigDto
	 * @param role
	 */
	@RequestMapping(params="method=amendBusness")
	public void amendBusness(HttpServletRequest request,HttpServletResponse response,BussinessDto bussinessDto,BizConfigDto bizConfigDto,String roles){
		logger.info("==============amendBusness 进入查询关联商户所有信息查询");
		Result result = null;
			try {
				String[] role = roles.split(",");
				result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "amendBusness",bussinessDto,bizConfigDto,role );
				String str = result.getResult();
				JSONObject jsonObject = JSONObject.parseObject(str);
				writeRespToPage(jsonObject, request, response);
			} catch (Exception e) {
				logger.error("==============修改商户信息失败amendBusness",e);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("success", false);
				jsonObject.put("infoMsg", e.getMessage());
				writeRespToPage(jsonObject, request, response);
			} 
	}
	
	/**
	 * 新建商户信息
	 * @param request
	 * @param response
	 * @param bussinessDto
	 * @param bizConfigDto
	 * @param roles
	 */
	@RequestMapping(params="method=createBusness")
	public void createBusness(HttpServletRequest request,HttpServletResponse response,BussinessDto bussinessDto,BizConfigDto bizConfigDto,String roles){
		logger.info("==============createBusness 创建商户信息");
		Result result = null;
		String role[] = roles.split(",");
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "createBusness", bussinessDto, bizConfigDto,role);
			String str = result.getResult();
			JSONObject jsonObject = JSONObject.parseObject(str);
			writeRespToPage(jsonObject, request, response);
		} catch (Exception e) {
			logger.error("===========创建商户异常 createBusness error",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("success", false);
			jsonObject.put("infoMsg", e.getMessage());
			writeRespToPage(jsonObject, request, response);
		} 
	}
	
	/**
	 * 查询接入配置信息
	 * @param request
	 * @param response
	 */
	@RequestMapping(params="method=qryRoleAll")
	public void qryRoleAll(HttpServletRequest request,HttpServletResponse response){
		logger.info("==============qryRoleAll 进入查询接入配置信息");
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "qryRoleAll");
			String str = result.getResult();
			JSONObject jsonObject = JSONObject.parseObject(str);
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, request, response);
		} catch (Exception e) {
			logger.error("qryRoleAll 查询接入配置信息 error",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, request, response);
		} 
	}

	/**
	 * @param jsonObject
	 * @param request
	 * @param response
	 */
	private void writeRespToPage(JSONObject jsonObject,
			HttpServletRequest request, HttpServletResponse response) {
		try {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().print(jsonObject);
			response.getWriter().flush();
			response.getWriter().close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}