package com.jsjn.jnf.service.trade;

import java.util.List;
import java.util.Map;

import com.jsjn.jnf.bean.dto.trade.TransactionDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 金农付交易服务接口
 * 
 * @author ZSMJ
 * 
 */
public interface TransactionService {

	/**
	 * 根据商户号和tradeNo查询交易信息
	 * 
	 * @param mid
	 * @param tradeNo
	 * @return
	 * @throws BussinessException
	 */
	public TransactionDto queryTransactionByTradeNo(String mid, String tradeNo) throws BussinessException;

	/**
	 * 根据tradeNo查询交易信息
	 * 
	 * @param tradeNo
	 * @return
	 * @throws BussinessException
	 */

	public TransactionDto queryTransactionByTradeNo(String tradeNo) throws BussinessException;

	/**
	 * 根据MID、STARTDT、ENDDT查询交易流水
	 * 
	 * @param mid
	 * @param startDt
	 * @param endDt
	 * @return
	 * @throws BussinessException
	 */
	public List<TransactionDto> tradeFlowQuery(String mid, String startDt, String endDt) throws BussinessException;

	/**
	 * 根据交易编号更新交易状态
	 * 
	 * @param tradeNo
	 *            交易编号
	 * @param state
	 *            状态
	 * @param digest
	 *            摘要
	 * @param failReason
	 *            失败原因
	 * @param exception
	 *            异常
	 * @param modified
	 *            更新时间
	 * @return
	 * @throws BusinessException
	 */
	public int updateTransactionByTradeNo(String tradeNo, String state, String digest, String failReason,
			String exception, String modified) throws BussinessException;

	/**
	 * 新增插入
	 * 
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	int insertTransaction(TransactionDto dto) throws Exception;

	public List<TransactionDto> queryTransactionByCondition(TransactionDto transactionDto);

	public List<TransactionDto> queryExceptionTransaction(TransactionDto transactionDto);

	public int dealException(String tradeNo, String exception, String state, String digest);

	/**
	 * 查询代扣状态信息
	 * 
	 * @param dto
	 * @return
	 */
	Map<String, Object> queryWithHoldStateInfo(TransactionDto dto) throws BussinessException;

	/**
	 * 根据mSerialNo查询交易信息
	 * 
	 * @param mSerialNo
	 * @return
	 * @throws BussinessException
	 */
	public TransactionDto queryTransactionByMSerialNo(String mid, String mSerialNo) throws BussinessException;

}
