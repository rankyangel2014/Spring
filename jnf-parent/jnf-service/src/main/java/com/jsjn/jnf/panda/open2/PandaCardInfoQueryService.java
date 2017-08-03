package com.jsjn.jnf.panda.open2;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryReqBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryResBO;
import com.jsjn.jnf.bussiness.bankCardInfo.BankCardInfoQueryService;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 对外提供： 银行卡BIN查询
 * 
 * @author xiekx
 * 
 */
@PandaService(serviceName = "pandaCardInfoQueryService", serviceType = ServiceType.CommonBean)
@Service
public class PandaCardInfoQueryService {

	private static final Logger logger = Logger.getLogger(PandaCardInfoQueryService.class);
	private BankCardInfoQueryService bankCardInfoQueryService = (BankCardInfoQueryService) ParseSpring.context.getBean("bankCardInfoQueryServiceImpl");

	/**
	 * 银行卡BIN查询
	 * 
	 * @param dto
	 * @return
	 */
	@PandaMethod(mName = "bankCardInfoQuery", dscrpt = "银行卡BIN查询", RegID = "bankCardInfoQuery")
	public CardInfoQueryResBO bankCardInfoQuery(CardInfoQueryReqBO dto) {
		logger.info("调用panda服务【银行卡BIN查询】，请求：" + JSONObject.toJSONString(dto));
		CardInfoQueryResBO resDto = new CardInfoQueryResBO();
		try {
			resDto = bankCardInfoQueryService.bankCardInfoQuery(dto);
		} catch (BussinessException e) {
			resDto.setResCode(e.getErrorCode());
			resDto.setResMsg(e.getMessage());
		}
		logger.info("调用panda服务【银行卡BIN查询】，响应：" + JSONObject.toJSONString(resDto));
		return resDto;
	}
}
