package com.jsjn.jnf.bean.bo.message;

import java.io.Serializable;

/**
 * 短信dto
 * 
 * @author xiekx
 * 
 */
public class ShortMessageDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7318287853695708178L;

	private String message;//短信类容
	private String mobile;//手机号

	public ShortMessageDto() {
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
