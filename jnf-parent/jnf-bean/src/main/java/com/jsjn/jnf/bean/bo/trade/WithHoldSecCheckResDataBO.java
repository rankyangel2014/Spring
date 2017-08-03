/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import java.math.BigDecimal;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author ZSMJ
 * 代扣二次握手请求
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
public class WithHoldSecCheckResDataBO {
	
	/**
	 * 业务编号(响应)
	 */
	private String serialNo;
	
	/**
	 * 贷款合同号(响应)
	 */
	private String loanNo;
	
	/**
	 * 金农付银行卡绑定签约序号(响应)
	 */
	private String cardSignNo;
	
	/**
	 * 金农付客户编号(响应)
	 */
	private String custNo;
	
	
	/**
	 * 姓名(响应)
	 */
	private String custName;
	
	/**
	 * 银行名称(响应)
	 */
	private String bankName;
	
	/**
	 * 银行卡号(响应)
	 */
	private String bankCardNo;
	
	/**
	 * 代扣金额(响应)
	 */
	private BigDecimal amount;
	

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getCardSignNo() {
		return cardSignNo;
	}

	public void setCardSignNo(String cardSignNo) {
		this.cardSignNo = cardSignNo;
	}

	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	//比较数据
	public String secCheckString() {
		return this.getSerialNo() + "|" + this.getLoanNo() + "|" + this.getCardSignNo() + "|" + this.getCustNo() + "|"
				+ this.getCustName() + this.getBankName() + "|" + this.getBankCardNo() + "|" + this.getAmount();
	}
	
}
