/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * @author ZSMJ
 * 单笔支付交易状态查询
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglPayStatusReqBO extends BaseOpenReqBO{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;

	/**
	 * 接口请求具体参数(请求)
	 */
	private SinglPayStatusDataBO reqData;
	
	public SinglPayStatusDataBO getReqData() {
		return reqData;
	}

	public void setReqData(SinglPayStatusDataBO reqData) {
		this.reqData = reqData;
	}

	
}
