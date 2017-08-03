package com.jsjn.jnf.bean.bo.base;

import java.io.Serializable;

/**
 * 和openapi交互的bean的基类
 * 
 * @author majian
 * 
 */
public class BaseOpenReqBO implements Serializable {

	private static final long serialVersionUID = 1L;

	/**
	 * 商户的appkey
	 */
	private String appkey;

	/**
	 * 接口调用时间
	 */
	private String timeStamp;

	/**
	 * 调用的openapi接口名称
	 */
	private String service;

	/**
	 * 商户签名字符串
	 */
	private String sign ;
	
	
	/**
	 * 字符集	现只支持UTF-8
	 */
	private String charset;
	
	/**
	 * 签名方式	现只支持RSA
	 */
	private String signType;
	
	/**
	 * 商户传递过来的完整报文
	 */
	private String xml ;
	
	/**
	 * 商户编号
	 */
	private String mid ;

	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

	public String getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(String timeStamp) {
		this.timeStamp = timeStamp;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getXml() {
		return xml;
	}

	public void setXml(String xml) {
		this.xml = xml;
	}

	public String getCharset() {
		return charset;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}

	public String getSignType() {
		return signType;
	}

	public void setSignType(String signType) {
		this.signType = signType;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}
	

}