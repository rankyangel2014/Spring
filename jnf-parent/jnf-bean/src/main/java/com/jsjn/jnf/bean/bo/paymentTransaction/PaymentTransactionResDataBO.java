package com.jsjn.jnf.bean.bo.paymentTransaction;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 银行代付
 * 
 * @author xiekx
 */
@XmlRootElement(name = "resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "tranNo" })
public class PaymentTransactionResDataBO {
	/**
	 * 交易订单号
	 */
	private String tranNo;

	public String getTranNo() {
		return tranNo;
	}

	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}

}
