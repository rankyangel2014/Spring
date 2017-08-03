/**
 * 
 */
package com.jsjn.jnf.bean.bo.cardBin;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 * 卡BIN查询请求/发送实体参数
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"bankCode", 
			"bankName"})
public class CardBinQueryResDataBO{
	/**
	 * 开户行行号(响应)
	 */
	private String bankCode = "";
	
	/***
	 * 开户行名称(响应)
	 */
	private String bankName = "";

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
