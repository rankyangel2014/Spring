package com.jsjn.jnf.panda.open;

import com.jsjn.jnf.bean.bo.contract.ContractUnbindReqBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindResBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusReqBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusResBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowReqBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResBO;
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
@PandaService(serviceName = "transactionPandaService", serviceType = ServiceType.CommonBean)
public class PandaTransactionService {

	
	private TradeService ts = (TradeService) ParseSpring.context.getBean("tradeServiceImpl");
	

	@PandaMethod(mName = "singlePaymentQuery", dscrpt = "单笔支付状态查询", RegID = "singlePaymentQuery")
	public SinglPayStatusResBO singlePaymentQuery(SinglPayStatusReqBO dto) {
		return ts.singlePaymentQuery(dto);
	}
	
	@PandaMethod(mName = "tradeFlowQuery", dscrpt = "交易流水查询", RegID = "tradeFlowQuery")
	public TradeFlowResBO tradeFlowQuery(TradeFlowReqBO dto) {
		return ts.tradeFlowQuery(dto);
	}
	
	@PandaMethod(mName = "withHolding", dscrpt = "代扣", RegID = "withHolding")
	public WithHoldResBO withHolding(WithHoldReqBO dto) {
		return ts.withHolding(dto);
	}
	
	@PandaMethod(mName = "withHoldingTimerTask", dscrpt = "代扣", RegID = "withHoldingTimerTask")
	public void withHoldingTimerTask() {
		ts.withHoldingTimerTask();
	}
	
	@PandaMethod(mName = "contractUnbinding", dscrpt = "解约", RegID = "contractUnbinding")
	public ContractUnbindResBO contractUnbinding(ContractUnbindReqBO dto) {
		return ts.releaseSign(dto);
	}
}
