package com.jsjn.jnf.bean.dto.statement;

import java.math.BigDecimal;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 对账单DTO
 * 
 * @author yincy
 *
 */
public class StatementDTO extends BaseDTO<StatementDTO> {

	private static final long serialVersionUID = 1L;

	private String id; //对账编号
	private String verifyDate; //对账日期
	private String serialNo; //业务编号
	private String tranNo; //支付编号
	private String channel; //支付渠道
	private String payeeIdNo; //收款方证件号码
	private String payeeName; //收款方名称
	private String payeeAcctNo; //收款方账户
	private String payerIdNo; //付款方证件号码
	private String payerName; //付款方名称
	private String payerAcctNo; //付款方账户
	private String payerMobile; //付款方手机号码
	private BigDecimal amount; //金额
	private String mPayStatus; //商户支付状态
	private String jnfPayStatus; //金农付支付状态
	private String dealTime; //成交时间
	private String isMECRecord; //商户是否有该笔记录
	private String isJNFRecord; //金农付是否有该笔记录
	private String mid; //商户号

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVerifyDate() {
		return verifyDate;
	}

	public void setVerifyDate(String verifyDate) {
		this.verifyDate = verifyDate;
	}

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

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
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

	public String getPayeeAcctNo() {
		return payeeAcctNo;
	}

	public void setPayeeAcctNo(String payeeAcctNo) {
		this.payeeAcctNo = payeeAcctNo;
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

	public String getPayerAcctNo() {
		return payerAcctNo;
	}

	public void setPayerAcctNo(String payerAcctNo) {
		this.payerAcctNo = payerAcctNo;
	}

	public String getPayerMobile() {
		return payerMobile;
	}

	public void setPayerMobile(String payerMobile) {
		this.payerMobile = payerMobile;
	}

	public String getmPayStatus() {
		return mPayStatus;
	}

	public void setmPayStatus(String mPayStatus) {
		this.mPayStatus = mPayStatus;
	}

	public String getJnfPayStatus() {
		return jnfPayStatus;
	}

	public void setJnfPayStatus(String jnfPayStatus) {
		this.jnfPayStatus = jnfPayStatus;
	}

	public String getDealTime() {
		return dealTime;
	}

	public void setDealTime(String dealTime) {
		this.dealTime = dealTime;
	}

	public String getIsMECRecord() {
		return isMECRecord;
	}

	public void setIsMECRecord(String isMECRecord) {
		this.isMECRecord = isMECRecord;
	}

	public String getIsJNFRecord() {
		return isJNFRecord;
	}

	public void setIsJNFRecord(String isJNFRecord) {
		this.isJNFRecord = isJNFRecord;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

}
