package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.validator.constraints.Length;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;
import com.jsjn.jnf.common.validator.constraints.CheckBankNo;


/**
 * 查询账号实时余额   商户请求报文 
 * @author yincy
 * 
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class RealtimeBalQueryReqBO extends BaseOpenReqBO{

	private static final long serialVersionUID = -1615512240927540216L;
	
	/**
	 * 接口请求具体参数(请求)
	 */
	private RealtimeBalQueryReqDataBO reqData;
	
	public RealtimeBalQueryReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(RealtimeBalQueryReqDataBO reqData) {
		this.reqData = reqData;
	}
}
