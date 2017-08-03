package com.jsjn.jnf.withhold.payment;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/paymentService.do")
public class PaymentServiceController{
	
	private final static Logger logger = Logger.getLogger(PaymentDto.class);
	
	/**
	 * 支付信息查询
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findPaymentInfoByCondition")
	public void findPaymentInfoByCondition(PaymentDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findPaymentInfoByCondition "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			//设置分页一页显示条数
			inDto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findPaymentInfoByCondition", inDto);
			String str = result.getResult();
			System.out.println("=========="+str);
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
			
			logger.info("[调用结束] "+"method:findPaymentInfoByCondition "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用findPaymentInfoByCondition接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 异常支付信息查询
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=findExceptionPaymentInfo")
	public void findExceptionPaymentInfo(PaymentDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:findExceptionPaymentInfo "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			//设置分页一页显示条数
			inDto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "findExceptionPaymentInfo", inDto);
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
			
			logger.info("[调用结束] "+"method:findExceptionPaymentInfo "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用findExceptionPaymentInfo接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
			jsonObject.put("success", false);
			writeRespToPage(jsonObject,req,rsp);
		}
	} 
	
	/**
	 * 处理异常信息
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=dealException")
	public void dealException(PaymentDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:dealException "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "dealException", inDto);
			String str = result.getResult();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", result);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject,req,rsp);
			
			logger.info("[调用结束] "+"method:dealException "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用dealException接口失败！,",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "处理异常信息出错，请联系管理员！");
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
