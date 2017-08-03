package com.jsjn.jnf.integration.bank.strategy;

import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryReqBO;
import com.jsjn.jnf.bean.bo.bank.RealtimeBalQueryResBO;
import com.jsjn.jnf.integration.bank.RealtimeBalQueryInterface;

/**
 * 银行查询类交易     实时余额查询    策略类
 * @author yincy
 *
 */
public class RealtimeBalQueryStrategy {
	
	private RealtimeBalQueryInterface impl;
	
	public RealtimeBalQueryStrategy(RealtimeBalQueryInterface impl){
		this.impl = impl;
	}
	
	public RealtimeBalQueryResBO query(RealtimeBalQueryReqBO req){
		return this.impl.realTimeBalQuery(req);
	}
}
