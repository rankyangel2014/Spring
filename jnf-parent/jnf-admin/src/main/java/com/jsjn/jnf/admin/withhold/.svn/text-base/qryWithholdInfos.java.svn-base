package com.jsjn.jnf.admin.withhold;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;
@Controller
@RequestMapping("/qryWithholdInfos.do")  
public class qryWithholdInfos{
	
	private final static Logger logger = Logger.getLogger(qryWithholdInfos.class);
	
	
	/**
	 * 查询商户的信息
	 * @param request
	 * @param response
	 * @param signTempInfoDto
	 */
	@RequestMapping(params="method=qryWithholdInfos")
	public void queryWithholdInfos(HttpServletRequest request,HttpServletResponse response,SignTempInfoDto signTempInfoDto){
		logger.info("[调用开始] "+"qryWithholdInfos "+"==>Parameters:"+JSONObject.toJSONString(signTempInfoDto));
		Result result = null;
		try {
			if(!StringUtils.isBlank(signTempInfoDto.getStartTime())){
				signTempInfoDto.setStartTime(convertTime(signTempInfoDto.getStartTime()));
			}
			if(!StringUtils.isBlank(signTempInfoDto.getEndTime())){
				signTempInfoDto.setEndTime(convertTime(signTempInfoDto.getEndTime()));
			}
			//设置分页一页显示条数
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "queryWithholdInfos", signTempInfoDto);
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
			
			logger.info("[调用结束] "+"qryWithholdInfos "+"==>result:"+str);
			writeRespToPage(jsonObject, request, response);
		} catch (Exception e) {
			logger.error("Panda远程调用qryWithholdInfos接口失败！",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, request, response);
		}
	}
	
	private String convertTime(String str){
		try {
			if(str.indexOf("T")>-1){
				String[] param = str.split("T");
				str = param[0]+" "+param[1];
			}
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			Date  date = simpleDateFormat.parse(str);
			SimpleDateFormat sFormat = new SimpleDateFormat("yyyyMMdd");
			str = sFormat.format(date);
			return str;
		} catch (ParseException e1) {
			e1.printStackTrace();
			return "";
		}
	}
	/**
	 * 查询商户的方法
	 * @param request
	 * @param response
	 */
	@RequestMapping(params="method=getCommercial")
	public void getCommercial(HttpServletRequest request,HttpServletResponse response){
		logger.info("==============getCommercial 进入查询商户的方法");
		Result result = null;
			try {
				result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,"getCommercial");
				String str = result.getResult();
				JSONArray jsonArray = JSONArray.parseArray(str);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("root", jsonArray);
				writeRespToPage(jsonObject, request, response);
			} catch (Exception e) {
				logger.error("==============getCommercial 进入查询商户异常的方法",e);
			} 
	}
	
	@RequestMapping(params="method=geTinstitution")
	public void geTinstitution(HttpServletRequest request,HttpServletResponse response,String mid){
		logger.info("==============getCommercial 进入查询商户的方法");
		Result result = null;
			try {
				result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,"getTnstitution",mid);
				String str = result.getResult();
				JSONArray jsonArray = JSONArray.parseArray(str);
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("root", jsonArray);
				writeRespToPage(jsonObject, request, response);
			} catch (Exception e) {
				e.printStackTrace();
			} 
	}
	
	
	@RequestMapping(params="method=queryWithDetails")
	public void queryWithDetails(HttpServletRequest request,HttpServletResponse response,String signRecordId){
		logger.info("==============queryWithDetails 进入查询商户的方法");
		Result result = null;
			try {
				result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,"queryWithDetails",signRecordId);
				String str = result.getResult();
				JSONObject jsonObject = JSONObject.parseObject(str);
				jsonObject.put("success", true);
				writeRespToPage(jsonObject, request, response);
			} catch (Exception e) {
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
	
	public static void main(String[] args) {
	}
}