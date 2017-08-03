/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.hibernate.validator.constraints.NotBlank;


/**
 * @author ZSMJ
 * 单笔支付状态查询请求/发送实体参数
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"tranNo", 
			"status", 
			"failReason"})
public class SinglPayStatusDataBO{
	/**
	 * 平台交易订单编号(请求/响应)
	 */
	@NotBlank(message="交易订单编号不能为空")
	private String tranNo="";
	
	/***
	 * 订单状态 0 ：未知，1：成功,2:失败;(响应)
	 */
	private String status=""; 
	
	/**
	 * 失败原因(响应)
	 */
	private String failReason="";

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
