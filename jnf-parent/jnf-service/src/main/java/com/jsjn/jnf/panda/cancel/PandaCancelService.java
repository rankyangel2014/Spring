package com.jsjn.jnf.panda.cancel;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.service.cancel.CancelService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "pandaCancelService", serviceType = ServiceType.CommonBean)
public class PandaCancelService {

	private CancelService cancelService = (CancelService) ParseSpring.context.getBean("cancelService");

	@PandaMethod(mName = "cancel", dscrpt = "解约", RegID = "cancel")
	public String cancel(SignTempInfoDto signTempInfoDto) {
		JSONObject result = new JSONObject();
		int res = 0;
		try {
			res = cancelService.cancelSign(signTempInfoDto);
			if (res == 1) {
				result.put("resCode", ReturnCode.SUCCESS);
				result.put("resMsg", "解约成功！");
			} else {
				result.put("resMsg", "解约失败!");
				result.put("resCode", ReturnCode.FAIL);
			}
		} catch (Exception e) {
			result.put("resCode", ReturnCode.FAIL);
			result.put("resMsg", "解约异常，" + e.getMessage());
		}
		return result.toJSONString();
	}

}
