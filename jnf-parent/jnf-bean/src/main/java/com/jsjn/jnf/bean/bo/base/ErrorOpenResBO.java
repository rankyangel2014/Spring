/**
 * 
 */
package com.jsjn.jnf.bean.bo.base;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { 
		"sign", 
		"resCode",
		"resMsg",
		"resData"})
public class ErrorOpenResBO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2131462968114254852L;
	
	
	private String sign;

	/**
	 * 返回码
	 */
	private String resCode;

	/**
	 * 返回信息
	 */
	private String resMsg;
	
	private String resData;

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getResCode() {
		return resCode;
	}

	public void setResCode(String resCode) {
		this.resCode = resCode;
	}

	public String getResMsg() {
		return resMsg;
	}

	public void setResMsg(String resMsg) {
		this.resMsg = resMsg;
	}

	public String getResData() {
		return resData;
	}

	public void setResData(String resData) {
		this.resData = resData;
	}

	
}
