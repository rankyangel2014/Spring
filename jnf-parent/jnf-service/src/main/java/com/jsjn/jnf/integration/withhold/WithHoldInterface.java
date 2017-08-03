package com.jsjn.jnf.integration.withhold;

import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;

/**
 * 支付接口
 * @author ZSMJ
 *
 */
public interface WithHoldInterface {
	
	/**
	 * 支付集成层接口
	 * @param orderNo
	 * @param signNo
	 * @param dto
	 * @param orgNo
	 * @throws Exception
	 */
	public void withHolding(String orderNo,String signNo,WithHoldReqBO dto,String orgNo) throws Exception;
	
	
	/**
	 * 完成支付回调函数(作废)
	 * @param orderNo
	 * @throws Exception 
	 */
//	public void withHoldingCallBack(String mid , String orderNo , String tradeNo , String status) throws Exception;
}
