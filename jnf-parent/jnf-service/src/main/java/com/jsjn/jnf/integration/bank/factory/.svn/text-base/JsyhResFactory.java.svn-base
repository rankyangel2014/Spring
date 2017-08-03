package com.jsjn.jnf.integration.bank.factory;

import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResCashSweepQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResFlowStateQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResRealtimeBalQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.response.JsResSinglePaymentTrade;
import com.jsjn.jnf.common.config.BankInterfaceCode;

/**
 * 江苏银行CT机 请求报文 工厂类
 * 
 * @author yincy
 * 
 */
public class JsyhResFactory {
	@SuppressWarnings("rawtypes")
	public static JsResBase creatResObj(String bankInterfaceCode) {
		JsResBase ctResDto = null;

		if (bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_REALTIME_QUERY.getCode())) {
			ctResDto = new JsResRealtimeBalQuery();
		} else if (bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_CASHSWEEP_QUERY.getCode())) {
			ctResDto = new JsResCashSweepQuery();
		} else if (bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_SINGLE_PATMENT_TRADE.getCode())) {
			ctResDto = new JsResSinglePaymentTrade();
		} else if (bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_SINGLE_FLOW_STATE_QUERY.getCode())) {
			ctResDto = new JsResFlowStateQuery();
		}
		return ctResDto;
	}
}
