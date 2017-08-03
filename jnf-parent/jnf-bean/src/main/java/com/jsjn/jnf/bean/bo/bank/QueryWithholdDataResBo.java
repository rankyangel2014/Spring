package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
"tranNo",
"status",
"failReason"})
public class QueryWithholdDataResBo {


	/**
	 * 订单编号
	 */
	private String tranNo;
	
	/**
	 * 订单状态
	 */
	private String status;
	
	/**
	 * 失败原因
	 */
	private String failReason;

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

	public String getFailReason() {
		return failReason;
	}

	public void setFailReason(String failReason) {
		this.failReason = failReason;
	}
}
