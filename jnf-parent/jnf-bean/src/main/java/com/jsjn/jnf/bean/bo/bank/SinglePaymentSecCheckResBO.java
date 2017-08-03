package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;


/**
 * @author yincy
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglePaymentSecCheckResBO extends BaseOpenResBO<SinglePaymentSecCheckResDataBO>{
	
	private static final long serialVersionUID = 1L;
	/**
	 * 相应信息
	 */
	private SinglePaymentSecCheckResDataBO resData;


	public SinglePaymentSecCheckResDataBO getResData() {
		return resData;
	}

	public void setResData(SinglePaymentSecCheckResDataBO resData) {
		this.resData = resData;
	}
	
}
