package com.jsjn.jnf.bean.bo.bank;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author yincy
 * 
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglePaymentSecCheckResDataBO {
	
	/**
	 * 业务编号(响应)
	 */
	private String serialNo;
	
	/**
	 * 贷款合同号(响应)
	 */
	private String externLoanNo;
	
	/**
	 * 付款账号 (银行卡卡号)
	 */
	private String payorAccountNo;
	
	/**
	 * 付款户名
	 */
	private String payorAccountName;
	
	/**
	 * 收款账号
	 */
	private String payeeAccountNo;
	
	/**
	 * 收款户名
	 */
	private String payeeAccountName;
	
	/**
	 * 收款账号联行号
	 */
	private String payeeBankNo;
	
	/**
	 * 收款账号银行名称
	 */
	private String payeeBankName;
	
	/**
	 * 交易币种
	 */
	private String curCode;
	
	/**
	 * 交易金额
	 */
	private BigDecimal amount;
	
	/**
	 * 加急标志
	 */
	private String urgencyFlag;
	
	/**
	 * 用途
	 */
	private String purpose;

	
	public String getSerialNo() {
		return serialNo;
	}


	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}


	public String getExternLoanNo() {
		return externLoanNo;
	}


	public void setExternLoanNo(String externLoanNo) {
		this.externLoanNo = externLoanNo;
	}


	public String getPayorAccountNo() {
		return payorAccountNo;
	}


	public void setPayorAccountNo(String payorAccountNo) {
		this.payorAccountNo = payorAccountNo;
	}


	public String getPayorAccountName() {
		return payorAccountName;
	}


	public void setPayorAccountName(String payorAccountName) {
		this.payorAccountName = payorAccountName;
	}


	public String getPayeeAccountNo() {
		return payeeAccountNo;
	}


	public void setPayeeAccountNo(String payeeAccountNo) {
		this.payeeAccountNo = payeeAccountNo;
	}


	public String getPayeeAccountName() {
		return payeeAccountName;
	}


	public void setPayeeAccountName(String payeeAccountName) {
		this.payeeAccountName = payeeAccountName;
	}


	public String getPayeeBankNo() {
		return payeeBankNo;
	}


	public void setPayeeBankNo(String payeeBankNo) {
		this.payeeBankNo = payeeBankNo;
	}


	public String getPayeeBankName() {
		return payeeBankName;
	}


	public void setPayeeBankName(String payeeBankName) {
		this.payeeBankName = payeeBankName;
	}


	public String getCurCode() {
		return curCode;
	}


	public void setCurCode(String curCode) {
		this.curCode = curCode;
	}


	public BigDecimal getAmount() {
		return amount;
	}


	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}


	public String getUrgencyFlag() {
		return urgencyFlag;
	}


	public void setUrgencyFlag(String urgencyFlag) {
		this.urgencyFlag = urgencyFlag;
	}


	public String getPurpose() {
		return purpose;
	}


	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}


	//比较数据
	public String secCheckString() {
		return this.getSerialNo() + "|" + this.getExternLoanNo() + "|" + this.getPayorAccountNo() + "|" + this.getPayorAccountName() + "|"
				+ this.getPayeeAccountNo() + this.getPayeeAccountName() + "|" + this.getPayeeBankNo() + "|" + this.getPayeeBankName() + "|" 
				+ this.getCurCode() + "|" + this.getAmount() + "|" + this.getUrgencyFlag() + "|" + this.getPurpose();
	}
	
}
