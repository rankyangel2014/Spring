package com.jsjn.jnf.integration.bank.factory;

import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqBase;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqCashSweepQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqFlowStateQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqRealtimeBalQuery;
import com.jsjn.jnf.bean.bo.integration.jsyh.request.JsReqSinglePaymentTrade;
import com.jsjn.jnf.common.config.BankInterfaceCode;

/**
 * 江苏银行CT机   请求报文   工厂类
 * @author yincy
 *
 */
public class JsyhReqFactory {
	@SuppressWarnings("rawtypes")
	public static JsReqBase creatReqObj(String bankInterfaceCode){
    	JsReqBase ctReqDto = null;
    	
    	if(bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_REALTIME_QUERY.getCode())){
    		ctReqDto = new JsReqRealtimeBalQuery();
    	}else if(bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_CASHSWEEP_QUERY.getCode())){
    		ctReqDto = new JsReqCashSweepQuery();
    	}else if(bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_SINGLE_PATMENT_TRADE.getCode())){
    		ctReqDto = new JsReqSinglePaymentTrade();
    	}else if(bankInterfaceCode.equalsIgnoreCase(BankInterfaceCode.JSYH_SINGLE_FLOW_STATE_QUERY.getCode())){
    		ctReqDto = new JsReqFlowStateQuery();
    	}
    	
    	return ctReqDto;
    }
}
