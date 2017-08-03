package com.jsjn.jnf.service.payment;

import java.util.HashMap;
import java.util.List;

import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.common.exception.BussinessException;

/**
 * 金农付支付订单接口
 * @author lilong
 *
 */
public interface PaymentService {

	/**
	 * 创建订单
	 * @param order
	 */
	public int createOrder(PaymentDto dto) throws Exception;
	
	/**
	 * 根据订单号查订单信息
	 * @param orderNo
	 * 			订单号
	 * @return
	 */
	public PaymentDto queryOrderByOrderNo(String orderNo) throws BussinessException;
	
	
	/**
	 * 更新支付表
	 * @param dto
	 * @return
	 */
	public int updatePaymentByOrderNo(String orderNo, String state, String digest, String failReason, String modified);
	/**
	 * 更新支付表
	 * @param dto
	 * @return
	 */
	public int updatePaymentFeeByOrderNo(String orderNo,Double fee);
	
	/**
	 * 支付信息查询
	 * @param paymentDto
	 * @return
	 * @throws Exception
	 */
	public List<PaymentDto> findPaymentInfoByCondition(PaymentDto paymentDto) throws Exception;
	
	/**
	 * 异常支付信息查询
	 * @param paymentDto
	 * @return
	 * @throws Exception
	 */
	public List<PaymentDto> findExceptionPaymentInfo(PaymentDto paymentDto) throws Exception;
	
	/**
	 * 根据订单状态查订单信息
	 * @param status
	 * 			订单状态
	 * @return
	 */
	public List<PaymentDto> queryOrdersByStatus(String status);
	
	/**
	 * 根据【交易订单号】查询支付订单
	 * @param tradeNo
	 * @return
	 * @throws BussinessException 
	 */
	public List<PaymentDto> getOrdersByTradeNo(String tradeNo);
	
	public boolean dealException(String orderNo, String exception, String state) throws Exception;
	
	/**
	 * 根据订单状态查订单以及该订单的收款人账号信息
	 * @param status
	 * @return
	 */
	public List<HashMap<String,String>> queryOrderListByStatus(String status,String orderType);
	
}
