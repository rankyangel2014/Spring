package com.jsjn.jnf.panda.open2;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdReqBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdResBO;
import com.jsjn.jnf.bussiness.signWithhold.SignWithholdService;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 代扣协议签订
 * 
 * @author xiekx
 * 
 */
@PandaService(serviceName = "pandaSignWithholdService", serviceType = ServiceType.CommonBean)
@Service
public class PandaSignWithholdService {

	private static final Logger logger = Logger.getLogger(PandaSignWithholdService.class);
	private SignWithholdService signWithholdSerivce = (SignWithholdService) ParseSpring.context.getBean("signWithholdServiceImpl");

	@PandaMethod(mName = "signWithhold", dscrpt = "代扣签约", RegID = "signWithhold")
	public SignWithholdResBO signWithhold(SignWithholdReqBO dto) {
		logger.info("调用panda服务【代扣签约】，请求：" + JSONObject.toJSONString(dto));
		SignWithholdResBO resDto = new SignWithholdResBO();
		try {
			resDto = signWithholdSerivce.signWithhold(dto);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		logger.info("调用panda服务【代扣签约】，响应：" + JSONObject.toJSONString(resDto));
		return resDto;
	}

}
