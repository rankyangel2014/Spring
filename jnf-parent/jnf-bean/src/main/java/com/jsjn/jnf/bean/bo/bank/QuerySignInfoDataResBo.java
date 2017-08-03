package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"signStatus",
			"bankCardNo",
			"cardSignNo"})
public class QuerySignInfoDataResBo {

	/**
	 * 签约状态
	 */
	private String signStatus;
	
	/**
	 * 银行账号
	 */
	private String bankCardNo;
	
	/**
	 * 协议编号
	 */
	private String cardSignNo;

	public String getSignStatus() {
		return signStatus;
	}

	public void setSignStatus(String signStatus) {
		this.signStatus = signStatus;
	}

	/**
	 * @return the bankCardNo
	 */
	public String getBankCardNo() {
		return bankCardNo;
	}

	/**
	 * @param bankCardNo the bankCardNo to set
	 */
	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	/**
	 * @return the cardSignNo
	 */
	public String getCardSignNo() {
		return cardSignNo;
	}

	/**
	 * @param cardSignNo the cardSignNo to set
	 */
	public void setCardSignNo(String cardSignNo) {
		this.cardSignNo = cardSignNo;
	}

	
	
	
	
}
