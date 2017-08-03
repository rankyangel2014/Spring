package com.jsjn.jnf.bean.dto.payment;

import java.math.BigDecimal;
import java.text.DecimalFormat;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;

/**
 * 支付订单类
 * 
 * @author ZSMJ
 * 
 */
public class PaymentDto extends DigestDto<PaymentDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 支付订单编号
	 */
	@NotBlank(message = "支付订单编号不能为空")
	private String orderNo;

	/**
	 * 支付订单类型
	 */
	@NotBlank(message = "支付订单类型不能为空")
	private String orderType;

	/**
	 * 交易订单编号
	 */
	@NotBlank(message = "交易订单编号不能为空")
	private String tradeNo;

	/**
	 * 付款人
	 */
	@NotBlank(message = "付款人客户编号不能为空")
	private String payer;

	/**
	 * 付款银行/渠道
	 */
	@NotBlank(message = "付款银行不能为空")
	private String payBank;

	/**
	 * 付款账号
	 */
	@NotBlank(message = "付款账号不能为空")
	private String payAccount;

	/**
	 * 收款人
	 */
	@NotBlank(message = "收款人客户编号不能为空")
	private String payee;

	/**
	 * 收款银行/渠道
	 */
	private String collBank;

	/**
	 * 收款账号
	 */
	private String collAccount;

	/**
	 * 支付订单金额
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;

	/**
	 * 支付状态
	 */
	@NotBlank(message = "支付状态不能为空")
	private String status;

	/**
	 * 失败原因
	 */
	private String failReason;

	/**
	 * 支付通道
	 */
	@NotBlank(message = "支付通道不能为空")
	private String channel;

	/**
	 * 支付开始时间
	 */
	private String created;

	/**
	 * 支付结束时间
	 */
	private String modified;

	/**
	 * 商户号
	 */
	private String mid;

	/**
	 * 机构号
	 */
	private String orgNo;

	/**
	 * 超时天数
	 */
	private String day;

	/**
	 * 查询条件，金额（起）
	 */
	private String amountMin;

	/**
	 * 查询条件，金额（止）
	 */
	private String amountMax;

	/**
	 * 查询条件，支付时间（起）
	 */
	private String modifiedMin;

	/**
	 * 查询条件，支付时间（止）
	 */
	private String modifiedMax;

	/**
	 * 金农付每笔支付收费
	 */
	private Long fee;

	/**
	 * 
	 * 是否为批量代扣( 1/0)
	 */
	private String isBatch;
	/**
	 * 付款人身份证号
	 */
	private String idNo;
	/**
	 * 付款人手机号
	 */
	private String mobile;
	/**
	 * 贷款借据号（银行代付业务）
	 */
	private String loanNo;

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getAmountMin() {
		return amountMin;
	}

	public void setAmountMin(String amountMin) {
		this.amountMin = amountMin;
	}

	public String getAmountMax() {
		return amountMax;
	}

	public void setAmountMax(String amountMax) {
		this.amountMax = amountMax;
	}

	public String getModifiedMin() {
		return modifiedMin;
	}

	public void setModifiedMin(String modifiedMin) {
		this.modifiedMin = modifiedMin;
	}

	public String getModifiedMax() {
		return modifiedMax;
	}

	public void setModifiedMax(String modifiedMax) {
		this.modifiedMax = modifiedMax;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getTradeNo() {
		return tradeNo;
	}

	public void setTradeNo(String tradeNo) {
		this.tradeNo = tradeNo;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public String getPayBank() {
		return payBank;
	}

	public void setPayBank(String payBank) {
		this.payBank = payBank;
	}

	public String getPayAccount() {
		return payAccount;
	}

	public void setPayAccount(String payAccount) {
		this.payAccount = payAccount;
	}

	public String getPayee() {
		return payee;
	}

	public void setPayee(String payee) {
		this.payee = payee;
	}

	public String getCollBank() {
		return collBank;
	}

	public void setCollBank(String collBank) {
		this.collBank = collBank;
	}

	public String getCollAccount() {
		return collAccount;
	}

	public void setCollAccount(String collAccount) {
		this.collAccount = collAccount;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}

	public Long getFee() {
		return fee;
	}

	public void setFee(Long fee) {
		this.fee = fee;
	}

	@Override
	public String buildDigest() {
		DecimalFormat df = new DecimalFormat("0.00");
		String amount = this.getAmount() != null ? df.format(this.getAmount()) : "";
		return Digests.md5(this.getOrderNo() + this.getOrderType() + this.getTradeNo() + this.getPayer()
				+ this.getPayBank() + this.getPayAccount() + this.getPayee() + amount + this.getStatus()
				+ this.getChannel() + SALT);
	}

	@Override
	public String toString() {
		DecimalFormat df = new DecimalFormat("0.00");
		String amount = this.getAmount() != null ? df.format(this.getAmount()) : "";
		return "支付订单号" + this.orderNo + "订单类型" + this.orderType + "交易编号" + this.tradeNo + "付款人客户编号" + this.payer
				+ "付款银行" + this.payBank + "付款账户" + this.payAccount + "收款人客户编号" + this.payee + "支付金额" + amount + "支付状态"
				+ this.status + "支付渠道" + this.channel;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getIsBatch() {
		return isBatch;
	}

	public void setIsBatch(String isBatch) {
		this.isBatch = isBatch;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

}
