package com.jsjn.jnf.bean.bo.signWithhold;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 签代扣协议/发送实体参数
 * 
 * @author xiekx
 * 
 * 
 */
@XmlRootElement(name = "resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "aid", "payChannel" })
public class SignWithholdResDataBO {
	/**
	 * 签约协议编号
	 */
	private String aid;
	/**
	 * 代扣渠道
	 */
	private String payChannel;

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getPayChannel() {
		return payChannel;
	}

	public void setPayChannel(String payChannel) {
		this.payChannel = payChannel;
	}

}
