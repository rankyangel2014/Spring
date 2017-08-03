package com.jsjn.jnf.panda.admin.trade;

import java.util.List;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.bussiness.trade.TradeService;
import com.jsjn.panda.annotation.PandaMethod;
import com.jsjn.panda.annotation.PandaService;
import com.jsjn.panda.annotation.ServiceType;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 交易panda服务类
 * 
 * @author ZSMJ
 * 
 */
@PandaService(serviceName = "pandaTradeService", serviceType = ServiceType.CommonBean)
public class PandaTradeService {

	
	private TradeService ts = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
	

	@PandaMethod(mName = "queryTransactionByCondition", dscrpt = "交易信息查询", RegID = "queryTransactionByCondition")
	public List<TransactionDto> queryTransactionByCondition(TransactionDto dto) throws Exception {
		return ts.queryTransactionByCondition(dto);
	}
	
}
