package com.jsjn.jnf.bean.bo.base;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

/**
 * 和openapi交互的bean的基类(输出)
 * 
 * @author majian
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { 
			"sign", 
			"resCode",
			"resMsg"})
public class BaseOpenResBO<T> implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String sign;

	/**
	 * 返回码
	 */
	private String resCode;

	/**
	 * 返回信息
	 */
	private String resMsg;
	
	/**
	 * 返回业务数据
	 */
	@XmlTransient
	private T resData;
	
	/**
	 * 返回业务数据集
	 */
	@XmlTransient
	private List<T> resDatas;
	
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

	public T getResData() {
		return resData;
	}

	public void setResData(T resData) {
		this.resData = resData;
	}

	public List<T> getResDatas() {
		return resDatas;
	}

	public void setResDatas(List<T> resDatas) {
		this.resDatas = resDatas;
	}

}