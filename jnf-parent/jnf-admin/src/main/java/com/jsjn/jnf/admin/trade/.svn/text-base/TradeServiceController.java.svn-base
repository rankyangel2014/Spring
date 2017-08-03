package com.jsjn.jnf.admin.trade;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value="/jnf/tradeService.do")
public class TradeServiceController{
	
	private final static Logger logger = Logger.getLogger(TransactionDto.class);
	
	/**
	 * 交易信息查询
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryTransactionByCondition")
	public void queryTransactionByCondition(TransactionDto inDto,
			HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] "+"method:queryTransactionByCondition "+"==>Parameters:"+JSONObject.toJSONString(inDto));
		
		Result result = null;
		try {
			//设置分页一页显示条数
			inDto.setLimit(Global.PAGE_SIZE);
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "queryTransactionByCondition", inDto);
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
			
			logger.info("[调用结束] "+"method:queryTransactionByCondition "+"==>result:"+str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用queryTransactionByCondition接口失败！",e);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("root", "");
			jsonObject.put("resMsg", "查询接口出错！请联系管理员");
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
