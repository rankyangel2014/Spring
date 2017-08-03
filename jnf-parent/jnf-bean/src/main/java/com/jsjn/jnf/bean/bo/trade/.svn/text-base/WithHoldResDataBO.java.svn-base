/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 * 代扣响应实体参数
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { 
			"serialNo", 
			"tranNo", 
			"status"})
public class WithHoldResDataBO {
	
	/**
	 * 业务编号(响应)
	 */
	private String serialNo="";
	
	/**
	 * 平台交易订单编号(响应)
	 */
	private String tranNo="";
	
	/**
	 * 代扣状态1：支付处理中；2：交易成功；9：交易失败(响应)
	 */
	private String status="";

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
}
