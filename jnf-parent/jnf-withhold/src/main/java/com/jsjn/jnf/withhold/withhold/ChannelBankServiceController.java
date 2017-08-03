package com.jsjn.jnf.withhold.withhold;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value = "/jnf/bankCardInfo.do")
public class ChannelBankServiceController {

	private final static Logger logger = Logger.getLogger(ChannelBankDto.class);

	/**
	 * 查渠道对应银行信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryBankList")
	public void queryBankList(ChannelBankDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:queryBankList " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryBankList", dto);
			// 返回 CardBinQueryResBO
			String str = result.getResult();

			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			rsp.getWriter().print(str);
			rsp.getWriter().flush();
			rsp.getWriter().close();

			logger.info("[调用结束] " + "method:queryBankList " + "==>result:"
					+ str);

		} catch (Exception e) {
			logger.error("Panda远程调用queryBankList接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}
	
	/**
	 * 查渠jnBankCodOde
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=queryJnBankCode")
	public void queryJnBankCode(ChannelBankDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {
		
		logger.info("[调用开始] " + "method:queryJnBankCode " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));
		
		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"queryJnBankCode", dto);
			// 返回 CardBinQueryResBO
			String str = result.getResult();
			JSONObject json = new JSONObject();
			jsonObject = JSONObject.parseObject(str);
			req.setCharacterEncoding("UTF-8");
			rsp.setCharacterEncoding("UTF-8");
			json.put("success", true);
			json.put("errMsg", "交易执行成功");
			json.put("data", jsonObject);
			rsp.getWriter().print(jsonObject.toJSONString());
			rsp.getWriter().flush();
			rsp.getWriter().close();
			
			logger.info("[调用结束] " + "method:queryJnBankCode " + "==>result:"
					+ str);
			
		} catch (Exception e) {
			logger.error("Panda远程调用queryJnBankCode接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 将结果返回到页面
	 * 
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
