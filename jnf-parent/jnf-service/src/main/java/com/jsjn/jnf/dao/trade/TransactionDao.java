package com.jsjn.jnf.dao.trade;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface TransactionDao extends CrudDao<TransactionDto>{
	
	/**
	 * 单笔支付状态查询
	 * @param mid
	 * 			商户号
	 * @param tradeNo
	 * 			交易编号
	 * @return
	 */
	public TransactionDto queryTransactionByTradeNo(
			@Param(value="mid")String mid , 
			@Param(value="tradeNo")String tradeNo);
	
	/**
	 * 查询代扣状态
	 * @param dto
	 * @return
	 */
	public Map<String, Object>  queryWithHolds(TransactionDto dto);
	/**
	 * 查询交易流水
	 * @param mid
	 * 			商户号
	 * @param startDt
	 * 			起始日期
	 * @param endDt
	 * 			终止日期
	 * @return
	 */
	public List<TransactionDto> tradeFlowQuery(
			@Param(value="mid")String mid,
			@Param(value="startDt")String startDt , 
			@Param(value="endDt")String endDt);
	
	
	/**
	 * 根据状态查询交易
	 * @param status
	 * @return
	 */
	public List<TransactionDto> queryTransactionByTradeStatus(@Param(value="status")String status);
	
	/**
	 * 根据查询条件查询交易信息
	 * @param tradeNo
	 * @param tradeType
	 * @param mid
	 * @param mSerialNo
	 * @param externLoanNo
	 * @param amountMin
	 * @param amountMax
	 * @param modifiedMin
	 * @param modifiedMax
	 * @param state
	 * @return
	 */
	public List<TransactionDto> queryTransactionByCondition(TransactionDto transactionDto);
	
	/**
	 * 根据查询条件查询异常交易信息
	 * @param tradeNo
	 * @param tradeType
	 * @param mid
	 * @param mSerialNo
	 * @param externLoanNo
	 * @param amountMin
	 * @param amountMax
	 * @param modifiedMin
	 * @param modifiedMax
	 * @return
	 */
	public List<TransactionDto> queryExceptionTransaction(TransactionDto transactionDto);
	
	/**
	 * 异常信息处理
	 * @param tradeNo
	 * @param exception
	 * @param state
	 * @return
	 */
	public int dealException(
			@Param(value="tradeNo")String tradeNo,
			@Param(value="exception")String exception, 
			@Param(value="status")String status,
			@Param(value="digest")String digest);
	
	
	/**
	 * 更新交易状态及原因
	 * @param tradeNo
	 * 				交易号
	 * @param state
	 * 				交易状态
	 * @param digest
	 * 				摘要
	 * @param failReason
	 * 				失败原因
	 * @param exception
	 * 				异常原因
	 * @return
	 */
	public int updateTrans(
			@Param(value = "tradeNo") String tradeNo, 
			@Param(value = "status") String status,
			@Param(value = "digest") String digest,
			@Param(value = "failReason") String failReason,
			@Param(value = "exception") String exception,
			@Param(value = "modified") String modified);
	
	/**
	 * 单笔支付信息查询
	 * @param mSerialNo
	 * 			商户交易流水号
	 * @return
	 */
	public TransactionDto queryTransactionByMSerialNo(
			@Param(value="mid")String mid , 
			@Param(value="mSerialNo")String mSerialNo);
}
