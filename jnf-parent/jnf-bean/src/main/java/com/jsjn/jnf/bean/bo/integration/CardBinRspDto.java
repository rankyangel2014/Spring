package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 卡BIN查询响应对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class CardBinRspDto extends CommonMessageRsp {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String toString() {
		return " [resCode=" + super.getResCode() + ", resMsg="
				+ super.getResMsg() + ", bankCode=" + bankCode + ", bankName="
				+ bankName +",cardKind="+cardKind+ "]";
	}

	private String bankCode; // 开户行行号
	private String bankName; // 开户行名称
	private String cardKind; // 卡类型

	/**
	 * 默认构造函数
	 */
	public CardBinRspDto() {
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

	public String getCardKind() {
		return cardKind;
	}

	public void setCardKind(String cardKind) {
		this.cardKind = cardKind;
	}
	
}
