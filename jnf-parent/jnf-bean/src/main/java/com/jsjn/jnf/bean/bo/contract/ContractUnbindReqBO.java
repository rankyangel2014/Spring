/**
 * 
 */
package com.jsjn.jnf.bean.bo.contract;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenReqBO;

/**
 * @author ZSMJ
 * 代扣签约解绑请求参数
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractUnbindReqBO extends BaseOpenReqBO{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;

	/**
	 * 接口请求具体参数(请求)
	 */
	private ContractUnbindReqDataBO reqData;
	
	public ContractUnbindReqDataBO getReqData() {
		return reqData;
	}

	public void setReqData(ContractUnbindReqDataBO reqData) {
		this.reqData = reqData;
	}

	
}
