package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;


/**
 * 单笔对外支付    返回报文类
 * @author yincy
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglePaymentTradeResBO extends BaseOpenResBO<SinglePaymentTradeResDataBO> {

	private static final long serialVersionUID = 1L;
	
	private SinglePaymentTradeResDataBO resData;

	public SinglePaymentTradeResDataBO getResData() {
		return resData;
	}

	public void setResData(SinglePaymentTradeResDataBO resData) {
		this.resData = resData;
	}
}
