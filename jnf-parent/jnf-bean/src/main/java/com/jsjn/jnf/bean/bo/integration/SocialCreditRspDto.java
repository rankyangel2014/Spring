package com.jsjn.jnf.bean.bo.integration;

import java.io.Serializable;

/**
 * 调用社会征信系统webService结果返回
 * 
 * @author xiekx
 * 
 */
public class SocialCreditRspDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String toString() {
		return "[valid=" + valid + ", returnCode="
				+ returnCode + ", returnMsg=" + returnMsg + "]";
	}

	private boolean valid; // 验证通过标识 true/false
	private String returnCode; // 返回码
	private String returnMsg; // 返回结果描述

	/**
	 * 默认构造函数
	 */
	public SocialCreditRspDto() {
	}

	public boolean getValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}

	public String getReturnCode() {
		return returnCode;
	}

	public void setReturnCode(String returnCode) {
		this.returnCode = returnCode;
	}
}
