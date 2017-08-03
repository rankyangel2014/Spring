package com.jsjn.jnf.bean.bo.signWithhold;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * 签代扣协议
 * 
 * @author xiekx
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SignWithholdResBO extends BaseOpenResBO<SignWithholdResDataBO> {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;

	/**
	 * 接口响应具体参数(一条)
	 */
	private SignWithholdResDataBO resData;

	public SignWithholdResDataBO getResData() {
		return resData;
	}

	public void setResData(SignWithholdResDataBO resData) {
		this.resData = resData;
	}

}
