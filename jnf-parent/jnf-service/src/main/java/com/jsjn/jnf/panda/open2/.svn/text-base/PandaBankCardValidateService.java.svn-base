package com.jsjn.jnf.panda.open2;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateReqBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateResBO;
import com.jsjn.jnf.bussiness.bankCardInfo.BankCardInfoQueryService;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 四要素认证
 * 
 * @author xiekx
 * 
 */
@PandaService(serviceName = "pandaBankCardValidateService", serviceType = ServiceType.CommonBean)
@Service
public class PandaBankCardValidateService {

	private static final Logger logger = Logger.getLogger(PandaBankCardValidateService.class);
	private BankCardInfoQueryService bankCardInfoQuerySerivce = (BankCardInfoQueryService) ParseSpring.context.getBean("bankCardInfoQueryServiceImpl");

	/**
	 * 四要素认证
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "bankCardValidate", dscrpt = "四要素认证", RegID = "bankCardValidate")
	public BankCardValidateResBO bankCardValidate(BankCardValidateReqBO dto) {
		logger.info("调用panda服务【四要素认证】，请求：" + JSONObject.toJSONString(dto));
		BankCardValidateResBO resDto = new BankCardValidateResBO();
		try {
			resDto = bankCardInfoQuerySerivce.bankCardValidate(dto);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		logger.info("调用panda服务【四要素认证】，响应：" + JSONObject.toJSONString(resDto));
		return resDto;
	}

}
