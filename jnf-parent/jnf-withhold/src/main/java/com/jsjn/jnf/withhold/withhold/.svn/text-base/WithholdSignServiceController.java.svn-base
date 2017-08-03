package com.jsjn.jnf.withhold.withhold;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.panda.client.PandaClient2;
import com.jsjn.jnf.withhold.controller.BaseController;
import com.jsjn.panda.client.Result;

@Controller
@RequestMapping(value = "/jnf/sign.do")
public class WithholdSignServiceController extends BaseController {

	private final static Logger logger = Logger.getLogger(SignTempInfoDto.class);

	/**
	 * 解约
	 * 
	 * @param inDto
	 * @param req
	 * @param rsp
	 * @throws Exception
	 */
	@RequestMapping(params = "method=cancel")
	public void cancel(SignTempInfoDto inDto, HttpServletRequest req, HttpServletResponse resp) throws Exception {

		logger.info("[调用开始] " + "method:cancel" + "==>Parameters:" + JSONObject.toJSONString(inDto));
		JSONObject json = new JSONObject();
		try {
			Result result = PandaClient2.invoke(Global.SERVICE_PANDA_ID, "cancel", inDto);
			JSONObject jsonResult = JSONObject.parseObject(result.getResult());
			String resCode = jsonResult.getString("resCode");
			String resMsg = jsonResult.getString("resMsg");
			if (!"000000".equals(resCode)) {
				json.put("success", Boolean.FALSE);
				json.put("errMsg", resMsg);
			} else {
				json.put("success", Boolean.TRUE);
				json.put("errMsg", "解约成功！");
			}
			logger.info("[调用结束] " + "method:cancel" + "==>result:" + json.toJSONString());
		} catch (Exception e) {
			logger.error("Panda远程调用代扣解约接口失败！,", e);
			json.put("errMsg", "解约接口出错！请联系管理员");
			json.put("success", false);
		}
		writeRespToPage(json, req, resp);
	}
}
