package com.jsjn.jnf.bean.pojo.statement;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 对账单记录实体类
 * 
 * @author yincy
 *
 */
public class StatementRecordPOJO {
	/**
	 * 业务编号（商户流水号），唯一
	 */
	@NotBlank(message = "业务编号不能为空")
	private String serialNo;

	/**
	 * 交易订单编号
	 */
	@NotBlank(message = "交易订单编号不能为空")
	private String tranNo;

	/**
	 * 收款方证件号码
	 */
	private String payeeIdNo;

	/**
	 * 收款方名称
	 */
	private String payeeName;

	/**
	 * 付款方证件号码
	 */
	private String payerIdNo;

	/**
	 * 付款方名称
	 */
	private String payerName;

	/**
	 * 交易金额
	 */
	@NotBlank(message = "交易金额不能为空")
	private BigDecimal amount;

	/**
	 * 支付状态(0:扣款未决 1:扣款失败 2:扣款成功，记账成功 3:失败(未决) 4:扣款成功，记账失败)
	 */
	@NotBlank(message = "支付状态不能为空")
	private String payStatus;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getTranNo() {
		return tranNo;
	}

	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}

	public String getPayeeIdNo() {
		return payeeIdNo;
	}

	public void setPayeeIdNo(String payeeIdNo) {
		this.payeeIdNo = payeeIdNo;
	}

	public String getPayeeName() {
		return payeeName;
	}

	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}

	public String getPayerIdNo() {
		return payerIdNo;
	}

	public void setPayerIdNo(String payerIdNo) {
		this.payerIdNo = payerIdNo;
	}

	public String getPayerName() {
		return payerName;
	}

	public void setPayerName(String payerName) {
		this.payerName = payerName;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getPayStatus() {
		return payStatus;
	}

	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}

}
