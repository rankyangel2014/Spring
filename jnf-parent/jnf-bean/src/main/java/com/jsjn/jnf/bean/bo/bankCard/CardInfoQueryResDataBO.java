/**
 * 
 */
package com.jsjn.jnf.bean.bo.bankCard;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 卡BIN查询
 * 
 * @author xiekx
 * 
 * 
 */
@XmlRootElement(name = "resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "bankCode", "bankName", "maxAmount", "maxAmountDay", "channel" })
public class CardInfoQueryResDataBO {
	/**
	 * 开户行行号(响应)
	 */
	private String bankCode;

	/***
	 * 开户行名称(响应)
	 */
	private String bankName;
	/**
	 * 银行单笔扣款最大限额
	 */
	private String maxAmount;
	/**
	 * 银行单日扣款最大限额
	 */
	private String maxAmountDay;
	/**
	 * 渠道编号
	 */
	private String channel;

	public String getMaxAmount() {
		return maxAmount;
	}

	public void setMaxAmount(String maxAmount) {
		this.maxAmount = maxAmount;
	}

	public String getMaxAmountDay() {
		return maxAmountDay;
	}

	public void setMaxAmountDay(String maxAmountDay) {
		this.maxAmountDay = maxAmountDay;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

}
