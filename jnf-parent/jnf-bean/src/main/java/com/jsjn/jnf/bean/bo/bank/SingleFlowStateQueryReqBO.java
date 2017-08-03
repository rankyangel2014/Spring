package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;


/**
 * 单笔支付流水状态查询  商户请求报文 
 * @author yincy
 * 
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SingleFlowStateQueryReqBO extends BaseOpenReqBO{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 接口请求具体参数(请求)
	 */
	private SingleFlowStateQueryReqDataBO reqData;
	
	public SingleFlowStateQueryReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(SingleFlowStateQueryReqDataBO reqData) {
		this.reqData = reqData;
	}
}
