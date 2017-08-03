/**
 * 
 */
package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 转账二次握手请求报文报体
 * @author yincy
 * 
 */
@XmlRootElement(name="reqData")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglePaymentSecCheckReqDataBO {
	
	/**
	 * 业务编号(请求)
	 */
	private String serialNo;

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}
}
