package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;


/**
 * 查询账号实时余额    商户返回报文    
 * @author yincy
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class RealtimeBalQueryResBO extends BaseOpenResBO<RealtimeBalQueryResDataBO> {

	private static final long serialVersionUID = 1L;
	
	private RealtimeBalQueryResDataBO resData;

	public RealtimeBalQueryResDataBO getResData() {
		return resData;
	}

	public void setResData(RealtimeBalQueryResDataBO resData) {
		this.resData = resData;
	}
}
