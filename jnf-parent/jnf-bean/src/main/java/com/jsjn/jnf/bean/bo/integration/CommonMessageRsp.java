package com.jsjn.jnf.bean.bo.integration;

import java.io.Serializable;

/**
 * 公共响应报文
 * 
 * @author xiekx
 * 
 */
public class CommonMessageRsp implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7258300235943889060L;
	// 响应编码
	private String resCode;
	// 响应说明
	private String resMsg;

	// 默认构造函数
	public CommonMessageRsp() {
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

}
