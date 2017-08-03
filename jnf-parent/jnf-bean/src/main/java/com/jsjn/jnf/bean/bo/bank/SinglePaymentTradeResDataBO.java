package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 查询账号实时余额    商户返回报文    
 * @author yincy
 *
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
		    "serialNo",
			"stat",
			"tranNo"})
public class SinglePaymentTradeResDataBO{
	
	/**
	 * 业务编号
	 */
	private String serialNo;
	
	/**
	 * 流水状态
	 * 
	 * 9-交易成功
	 * 6－交易失败
	 * 8－交易结果未知
	 * 3－银行落地处理中
	 */
	private String stat;
	
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

	public String getStat() {
		return stat;
	}

	public void setStat(String stat) {
		this.stat = stat;
	} 
	
}
