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
import com.jsjn.jnf.bean.dto.assist.FeeConfigDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value = "/jnf/feeConfigService.do")
public class FeeConfigController {

	private final static Logger logger = Logger.getLogger(FeeConfigDto.class);

	/**
	 * 查询计费信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=qryFeeConfig")
	public void qryFeeConfigList(FeeConfigDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:qryFeeConfigList" + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"qryFeeConfigList", dto);
			String str = result.getResult();
			JSONArray jsonArray = JSONArray.parseArray(str);
			jsonObject.put("root", jsonArray);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, req, rsp);

			logger.info("[调用结束] " + "method:qryFeeConfigList" + "==>result:"
					+ str);

		} catch (Exception e) {
			logger.error("Panda远程调用qryFeeConfigList接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 新增计费信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=addFeeConfig")
	public void addFeeConfig(FeeConfigDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:addFeeConfig " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"addFeeConfig", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, req, rsp);

			logger.info("[调用结束] " + "method:addFeeConfig " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用addFeeConfig接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 修改计费信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=updateFeeConfig")
	public void updateFeeConfig(FeeConfigDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:updateFeeConfig " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"updateFeeConfig", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, req, rsp);

			logger.info("[调用结束] " + "method:updateFeeConfig " + "==>result:"
					+ str);

		} catch (Exception e) {
			logger.error("Panda远程调用updateFeeConfig接口失败！,", e);
			jsonObject.put("root", "");
			jsonObject.put("resMsg", e.getMessage());
			jsonObject.put("success", false);
			writeRespToPage(jsonObject, req, rsp);
		}
	}

	/**
	 * 删除计费信息
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=delFeeConfig")
	public void delFeeConfig(FeeConfigDto dto, HttpServletRequest req,
			HttpServletResponse rsp) throws Exception {

		logger.info("[调用开始] " + "method:delFeeConfig " + "==>Parameters:"
				+ JSONObject.toJSONString(dto));

		Result result = null;
		JSONObject jsonObject = new JSONObject();
		try {
			result = PandaClient2.invoke(Global.SERVICE_PANDA_ID,
					"delFeeConfig", dto);
			String str = result.getResult();
			jsonObject.put("root", str);
			jsonObject.put("resMsg", "");
			jsonObject.put("success", true);
			writeRespToPage(jsonObject, req, rsp);

			logger.info("[调用结束] " + "method:delFeeConfig " + "==>result:" + str);

		} catch (Exception e) {
			logger.error("Panda远程调用delFeeConfig接口失败！,", e);
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
