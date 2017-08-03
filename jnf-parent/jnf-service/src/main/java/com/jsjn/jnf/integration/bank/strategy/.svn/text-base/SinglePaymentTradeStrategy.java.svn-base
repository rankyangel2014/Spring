package com.jsjn.jnf.integration.bank.strategy;

import java.util.HashMap;

import com.jsjn.jnf.bean.bo.bank.SinglePaymentTradeReqBO;
import com.jsjn.jnf.bean.pojo.integration.SinglePaymentResPojo;
import com.jsjn.jnf.integration.bank.SinglePaymentTradeInterface;

/**
 * 单笔支付 策略类
 * 
 * @author yincy
 * 
 */
public class SinglePaymentTradeStrategy {

	private SinglePaymentTradeInterface impl;

	public SinglePaymentTradeStrategy(SinglePaymentTradeInterface impl) {
		this.impl = impl;
	}

	public SinglePaymentResPojo trade(SinglePaymentTradeReqBO req, HashMap<String, String> map) {
		return this.impl.singlePaymentTrade(req, map);
	}
}
