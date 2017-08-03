package com.jsjn.jnf.bean.bo.withhold;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 查询机构提现卡号 响应报文数据类
 * 
 * @author yuh
 * 
 */
@XmlRootElement(name="resData")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"bankCardNo"})
public class QueryOrgCardNoResDataBo {
	private String bankCardNo;

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

}
