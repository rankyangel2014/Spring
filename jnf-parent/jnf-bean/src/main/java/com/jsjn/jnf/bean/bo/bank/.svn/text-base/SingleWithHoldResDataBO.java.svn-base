package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 单笔单口 商户返回报文
 * 
 * @author yincy
 *
 */
@XmlRootElement(name = "resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "serialNo", "status", "tranNo" })
public class SingleWithHoldResDataBO {

	/**
	 * 业务编号
	 */
	private String serialNo;

	/**
	 * 流水状态
	 * 
	 * 1－交易处理中 2－交易成功 9-交易失败
	 */
	private String status;

	/**
	 * 订单号
	 */
	private String tranNo;

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
