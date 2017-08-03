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
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class WithHoldSecCheckReqBO extends BaseOpenReqBO{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 9052844599486593537L;

	
	/**
	 * 请求信息
	 */
	private WithHoldSecCheckReqDataBO reqData;


	public WithHoldSecCheckReqDataBO getReqData() {
		return reqData;
	}


	public void setReqData(WithHoldSecCheckReqDataBO reqData) {
		this.reqData = reqData;
	}
	
	

}
