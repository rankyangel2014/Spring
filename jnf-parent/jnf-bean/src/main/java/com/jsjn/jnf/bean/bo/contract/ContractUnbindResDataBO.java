/**
 * 
 */
package com.jsjn.jnf.bean.bo.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * @author ZSMJ
 * 代扣签约解绑实体参数
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"status"})
public class ContractUnbindResDataBO{
	/**
	 * 签约解绑状态(1：成功；2：失败)
	 */
	private String status = "";

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
}
