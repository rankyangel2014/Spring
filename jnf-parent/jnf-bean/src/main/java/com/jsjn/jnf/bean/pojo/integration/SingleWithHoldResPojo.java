package com.jsjn.jnf.bean.pojo.integration;

/**
 * 单笔代扣 业务层 --> 集成层 返回参数
 * 
 * @author yincy
 *
 */
public class SingleWithHoldResPojo {

	/**
	 * 交易状态  对应com.jsjn.jnf.common.config.TradeCode中的状态
	 */
	private String tradeCode;
	
	/**
	 * 失败原因  交易失败才有效
	 */
	private String failReason;
	
	public SingleWithHoldResPojo(String tradeCode) {
		this.tradeCode = tradeCode;
	}
	
	public SingleWithHoldResPojo(String tradeCode,String failReason) {
		this.tradeCode = tradeCode;
		this.failReason = failReason;
	}

	public String getTradeCode() {
		return tradeCode;
	}

	public void setTradeCode(String tradeCode) {
		this.tradeCode = tradeCode;
	}

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}
}
