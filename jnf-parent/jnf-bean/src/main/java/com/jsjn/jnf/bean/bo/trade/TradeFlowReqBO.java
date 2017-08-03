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
 * 交易流水查询请求/响应报文参数
 * 采用JAXB注解
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class TradeFlowReqBO extends BaseOpenReqBO{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3631548729245224666L;

	/**
	 * 接口请求具体参数(请求/响应)
	 */
	private TradeFlowReqDataBO	reqData;
	

	public TradeFlowReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(TradeFlowReqDataBO reqData) {
		this.reqData = reqData;
	}

	
}
