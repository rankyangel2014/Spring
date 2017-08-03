package com.jsjn.jnf.bean.bo.orgBusiness;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * 机构支持业务查询
 * 
 * @author xiekx
 * 
 * 
 */
@XmlRootElement(name = "resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = { "enableWithhold", "enablePay" })
public class OrgBusinessResDataBO {
	/**
	 * 是否支持代扣(响应) Y/N
	 */
	private String enableWithhold;

	/**
	 * 是否支持代付(响应) Y/N
	 */
	private String enablePay;

	public String getEnableWithhold() {
		return enableWithhold;
	}

	public void setEnableWithhold(String enableWithhold) {
		this.enableWithhold = enableWithhold;
	}

	public String getEnablePay() {
		return enablePay;
	}

	public void setEnablePay(String enablePay) {
		this.enablePay = enablePay;
	}

}
