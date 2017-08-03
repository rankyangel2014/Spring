package com.jsjn.jnf.panda.withhold;

import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.dto.withhold.CardInfoDto;
import com.jsjn.jnf.integration.realname.CardBinInterface;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

@PandaService(serviceName = "PandaCardInfoQueryService", serviceType = ServiceType.CommonBean)
public class PandaBankCardInfoQueryService {

	private CardBinInterface ci = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");

	/**
	 * 根据银行卡号查询银行名称
	 * 
	 * @throws Exception
	 */
	@PandaMethod(mName = "cardInfoQuery", dscrpt = "查询卡Bin信息", RegID = "cardInfoQuery")
	public CardBinRspDto cardInfoQuery(CardInfoDto dto) throws Exception {
		CardBinRspDto cardbinObj = ci.query(dto.getCardNo());
		return cardbinObj;
	}

}
