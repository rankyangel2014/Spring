package com.jsjn.jnf.bean.bo.realname;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 * 实名认证响应报文
 * 采用JAXB注解
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"token",
			"aid",
			"custId"})
public class RealNameResDataBO{

	/**
	 * 返回商户验证的唯一标识
	 */
	private String token;
	
	/**
	 * 签约号
	 */
	@XmlElement(name="cardSignNo")
	private String aid;
	
	/**
	 * 客户编号
	 */
	@XmlElement(name="custNo")
	private String custId;

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
}
