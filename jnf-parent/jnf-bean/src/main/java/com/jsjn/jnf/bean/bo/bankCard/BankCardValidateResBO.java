/**
 * 
 */
package com.jsjn.jnf.bean.bo.bankCard;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * 四要素认证响应报文
 * 
 * @author xiekx
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class BankCardValidateResBO extends BaseOpenResBO<BankCardValidateResDataBO> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7859839661256696330L;

	private BankCardValidateResDataBO resData;

	public BankCardValidateResBO() {

	}

	public BankCardValidateResDataBO getResData() {
		return resData;
	}

	public void setResData(BankCardValidateResDataBO resData) {
		this.resData = resData;
	}
}
