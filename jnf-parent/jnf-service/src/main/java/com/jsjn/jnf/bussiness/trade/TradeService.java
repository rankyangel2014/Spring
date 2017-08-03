package com.jsjn.jnf.bussiness.trade;

import java.util.List;

import com.jsjn.jnf.bean.bo.contract.ContractUnbindReqBO;
import com.jsjn.jnf.bean.bo.contract.ContractUnbindResBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusReqBO;
import com.jsjn.jnf.bean.bo.trade.SinglPayStatusResBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowReqBO;
import com.jsjn.jnf.bean.bo.trade.TradeFlowResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldReqBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResBO;
import com.jsjn.jnf.bean.bo.trade.WithHoldResDataBO;
import com.jsjn.jnf.bean.dto.trade.TransactionDto;

/**
 * 金农付交易服务接口
 * 
 * @author ZSMJ
 * 
 */
public interface TradeService {
	/***
	 * 代扣（对外接口）
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	public WithHoldResBO withHolding(WithHoldReqBO dto);

	/**
	 * 单笔支付状态查询接口（对外接口交易表）
	 * 
	 * @param dto
	 * @return
	 */
	public SinglPayStatusResBO singlePaymentQuery(SinglPayStatusReqBO dto);

	/**
	 * 查询交易流水（对外接口交易表）
	 * 
	 * @param dto
	 * @return
	 */
	public TradeFlowResBO tradeFlowQuery(TradeFlowReqBO dto);

	/**
	 * 代扣（代扣业务主体，封装了对事物的控制部分）
	 * @param reqDto
	 * @return
	 * @throws Exception
	 */
	public WithHoldResDataBO getSinglPayResData(WithHoldReqBO reqDto) throws Exception;
	
	/**
	 * 查询代扣状态定时任务(内部调用接口)
	 */
	public void withHoldingTimerTask();

	/**
	 * 查询代扣状态后回调（单笔代扣回调，封装了对事物的控制部分）
	 */
	public void withHoldingCallBack(String orderNo,String tradeNo,String orgNo) throws Exception;
	
	/**
	 * 代扣签约：解约
	 */
	public ContractUnbindResBO releaseSign(ContractUnbindReqBO dto);

	public List<TransactionDto> queryTransactionByCondition(TransactionDto transactionDto) throws Exception;
	
}
