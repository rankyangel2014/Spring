package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机    账号实时余额查询  报体
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {
			"acno", 
			"cur_code"})
public class JsReqRealtimeBalQueryBody {
	private String acno; // 账号

	private String cur_code; // 币种

	public String getAcno() {
		return acno;
	}

	public void setAcno(String acno) {
		this.acno = acno;
	}

	public String getCur_code() {
		return cur_code;
	}

	public void setCur_code(String cur_code) {
		this.cur_code = cur_code;
	}
}
