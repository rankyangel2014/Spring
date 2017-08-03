package com.jsjn.jnf.bean.bo.paymentTransaction;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * 银行代付
 * 
 * @author xiekx
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class PaymentTransactionReqBO extends BaseOpenReqBO {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;

	/**
	 * 接口请求具体参数(请求)
	 */
	private PaymentTransactionReqDataBO reqData;

	public PaymentTransactionReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(PaymentTransactionReqDataBO reqData) {
		this.reqData = reqData;
	}

}
