package com.jsjn.jnf.bean.bo.bank;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * 批量代扣 请求报文
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class BatchWithHoldReqBO extends BaseOpenReqBO {

	private static final long serialVersionUID = 1L;

	/**
	 * 接口请求具体参数(请求)
	 */
	private BatchWithHoldReqDataBO reqData;

	public BatchWithHoldReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(BatchWithHoldReqDataBO reqData) {
		this.reqData = reqData;
	}
}
