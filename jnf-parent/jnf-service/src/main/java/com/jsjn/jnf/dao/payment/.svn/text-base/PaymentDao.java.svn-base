package com.jsjn.jnf.dao.payment;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.jsjn.jnf.bean.dto.payment.PaymentDto;
import com.jsjn.jnf.persistence.CrudDao;
import com.jsjn.jnf.persistence.annotation.MyBatisDao;

@MyBatisDao
public interface PaymentDao extends CrudDao<PaymentDto> {
	/**
	 * 根据支付订单编号获取订单信息
	 * 
	 * @param orderNo
	 * @return
	 */
	public PaymentDto getPaymentInfoByOrderNo(
			@Param(value = "orderNo") String orderNo);

	/**
	 * 根据条件查询订单信息列表
	 * 
	 * @return
	 */
	public List<PaymentDto> findPaymentInfoByCondition(PaymentDto paymentDto);

	/**
	 * 异常支付信息查询
	 * 
	 * @return
	 */
	public List<PaymentDto> findExceptionPaymentInfo(PaymentDto paymentDto);

	/**
	 * 根据支付状态查询订单
	 * 
	 * @param status
	 * @return
	 */
	public List<PaymentDto> getOrdersByStatus(
			@Param(value = "status") String status);

	/**
	 * 根据【交易订单号】查询支付订单
	 * 
	 * @param tradeNo
	 * @return
	 */
	public List<PaymentDto> getOrdersByTradeNo(
			@Param(value = "tradeNo") String tradeNo);

	/**
	 * 更新支付状态及原因
	 * 
	 * @param orderNo
	 *            支付号
	 * @param state
	 *            支付状态
	 * @param digest
	 *            摘要
	 * @param failReason
	 *            失败原因
	 * @return
	 */
	public int updatePayment(@Param(value = "orderNo") String orderNo,
			@Param(value = "status") String status,
			@Param(value = "digest") String digest,
			@Param(value = "failReason") String failReason,
			@Param(value = "modified") String modified);

	/**
	 * 更新支费用
	 * 
	 * @param orderNo
	 *            支付号
	 * @param fee
	 *            费用
	 * @return
	 */
	public int updatePaymentFee(@Param(value = "orderNo") String orderNo,
			@Param(value = "fee") Double fee);

	/**
	 * 根据订单状态查订单以及该订单的收款人账号信息
	 * 
	 * @param status
	 * @return
	 */
	public List<HashMap<String, String>> queryOrderListByStatus(
			@Param(value = "status") String status,@Param(value = "orderType") String orderType);

}
