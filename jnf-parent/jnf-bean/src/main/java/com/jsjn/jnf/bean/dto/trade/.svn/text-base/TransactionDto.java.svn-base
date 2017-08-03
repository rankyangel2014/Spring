package com.jsjn.jnf.bean.dto.trade;

import java.math.BigDecimal;
import java.text.DecimalFormat;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.validator.constraints.CheckAmount;

/**
 * 交易实体类
 * 
 * @author lilong
 * 
 */
public class TransactionDto extends DigestDto<TransactionDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 交易订单编号
	 */
	@NotBlank(message="交易订单编号不能为空")
	private String tradeNo;

	/**
	 * 交易批次号
	 */
	@NotBlank(message="交易批次号不能为空")
	private String bNo;

	/**
	 * 交易类型
	 */
	@NotBlank(message="交易类型不能为空")
	private String tradeType;

	/**
	 * 商户编号
	 */
	@NotBlank(message="商户编号不能为空")
	private String mid;

	/**
	 * 商户订单流水号
	 */
	@NotBlank(message="商户订单流水号不能为空")
	private String mSerialNo;
	
	
	/**
	 * 外部合同号
	 */
	@NotBlank(message="外部合同号不能为空")
	private String externLoanNo;

	/**
	 * 付款人
	 */
	@NotBlank(message="付款人编号不能为空")
	private String payer;
	
	/**
	 * 付款人姓名
	 */
	@NotBlank(message="付款人姓名不能为空")
	private String payerName;
	
	/**
	 * 付款人银行账号
	 */
	@NotBlank(message="付款人银行账号不能为空")
	private String payerBankCardNo;
	
	/**
	 * 收款人
	 */
	@NotBlank(message="收款人编号不能为空")
	private String payee;

	/**
	 * 收款人姓名
	 */
	@NotBlank(message="收款人姓名不能为空")
	private String payeeName;
	
	/**
	 * 交易金额
	 */
	@CheckAmount(min = Global.AMT_MIN, max = Global.AMT_MAX)
	private BigDecimal amount;

	/**
	 * 交易状态
	 */
	@NotBlank(message="交易状态不能为空")
	private String status;

	/**
	 * 失敗說明
	 */
	private String failReason;
	
	/**
	 * 交易说明
	 */
	@NotBlank(message="交易说明不能为空")
	private String desc;

	/**
	 * 交易开始时间 格式：yyyyMMddHHmmss
	 */
	private String created;

	/**
	 * 交易结束时间 格式：yyyyMMddHHmmss
	 */
	private String modified;
	
	/**
	 * 异常原因
	 */
	private String exception;
	
	/**
	 * 机构号
	 */
	private String orgNo;
	
	/**
	 * 查询类型标志，0：查询所有。1：查询异常
	 */
	private String qryFlag;
	
	/**
	 * 查询条件：金额（起）
	 */
	private String amountMin;
	
	/**
	 * 查询条件：金额（止）
	 */
	private String amountMax;
	
	/**
	 * 查询条件：交易时间（起）
	 */
	private String modifiedMin;
	
	/**
	 * 查询条件：交易时间（止）
	 */
	private String modifiedMax;
	
	/**
	 * 查询条件：天数
	 */
	private String day;
	/**
	 * 付款人四要素--身份证号
	 */
//	@NotBlank(message="付款人身份证号不能为空")
	private String idNo;
	/**
	 * 付款人四要素--手机号
	 */
//	@NotBlank(message="付款人手机号不能为空")
	private String mobile;
	/**
	 * 代扣成功后短信发送模板
	 */
	private String message;
	
	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getException() {
		return exception;
	}

	public void setException(String exception) {
		this.exception = exception;
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

	public String getQryFlag() {
		return qryFlag;
	}

	public void setQryFlag(String qryFlag) {
		this.qryFlag = qryFlag;
	}

	public String getTradeNo() {
		return tradeNo;
	}

	public void setTradeNo(String tradeNo) {
		this.tradeNo = tradeNo;
	}

	public String getTradeType() {
		return tradeType;
	}

	public void setTradeType(String tradeType) {
		this.tradeType = tradeType;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getMSerialNo() {
		return mSerialNo;
	}

	public void setMSerialNo(String mSerialNo) {
		this.mSerialNo = mSerialNo;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public String getPayerName() {
		return payerName;
	}

	public void setPayerName(String payerName) {
		this.payerName = payerName;
	}

	public String getPayee() {
		return payee;
	}

	public void setPayee(String payee) {
		this.payee = payee;
	}

	public String getPayeeName() {
		return payeeName;
	}

	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
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

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getbNo() {
		return bNo;
	}

	public void setbNo(String bNo) {
		this.bNo = bNo;
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

	public String getExternLoanNo() {
		return externLoanNo;
	}

	public void setExternLoanNo(String externLoanNo) {
		this.externLoanNo = externLoanNo;
	}
	
	

	public String getPayerBankCardNo() {
		return payerBankCardNo;
	}

	public void setPayerBankCardNo(String payerBankCardNo) {
		this.payerBankCardNo = payerBankCardNo;
	}

	@Override
	public String buildDigest() {
		DecimalFormat df = new DecimalFormat("0.00");
		return Digests.md5(this.getStatus(), this.getAmount() != null ? df.format(this
				.getAmount()) : "", this.getPayee(), this.getPayer(),
				this.getMSerialNo(), this.getMid(), this.getTradeNo(), this.getTradeType(), SALT);
	}
	
	@Override
	public String toString() {
		DecimalFormat df = new DecimalFormat("0.00");
		String amount = this.getAmount() != null ? df.format(this.getAmount()) : "";
		return "交易订单编号" + this.tradeNo + "商户编号" + this.mid + "商户订单流水号" + this.mSerialNo + "付款人" + this.payer + "收款人"
				+ this.payee + "交易金额" + amount + "交易状态" + this.status;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
