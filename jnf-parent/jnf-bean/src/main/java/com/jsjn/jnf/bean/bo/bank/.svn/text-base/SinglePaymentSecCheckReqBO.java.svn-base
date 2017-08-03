package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * 转账二次握手请求报文  金农付-->商户
 * @author yincy
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglePaymentSecCheckReqBO extends BaseOpenReqBO{
	
	private static final long serialVersionUID = 1L;
	/**
	 * 请求信息
	 */
	private SinglePaymentSecCheckReqDataBO reqData;


	public SinglePaymentSecCheckReqDataBO getReqData() {
		return reqData;
	}


	public void setReqData(SinglePaymentSecCheckReqDataBO reqData) {
		this.reqData = reqData;
	}

}
