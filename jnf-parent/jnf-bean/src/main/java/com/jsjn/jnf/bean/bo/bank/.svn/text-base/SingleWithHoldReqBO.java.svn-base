package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;


/**
 * 单笔代扣  请求报文 
 * @author yincy
 * 
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SingleWithHoldReqBO extends BaseOpenReqBO{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 接口请求具体参数(请求)
	 */
	private SingleWithHoldReqDataBO reqData;
	
	public SingleWithHoldReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(SingleWithHoldReqDataBO reqData) {
		this.reqData = reqData;
	}
}
