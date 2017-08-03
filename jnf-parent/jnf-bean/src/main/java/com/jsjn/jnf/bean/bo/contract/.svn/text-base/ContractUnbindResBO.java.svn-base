/**
 * 
 */
package com.jsjn.jnf.bean.bo.contract;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * @author ZSMJ
 * 代扣签约解绑响应参数
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractUnbindResBO extends BaseOpenResBO<ContractUnbindResDataBO>{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;
	
	/**
	 * 接口响应具体参数(一条)
	 */
	private ContractUnbindResDataBO resData;
	
	public ContractUnbindResBO(){ }
	
	public ContractUnbindResBO(String resCode,String status,String resMsg){
		setResCode(resCode);
		setResMsg(resMsg);
		resData = new ContractUnbindResDataBO();
		resData.setStatus(status);
	}

	public ContractUnbindResDataBO getResData() {
		return resData;
	}

	public void setResData(ContractUnbindResDataBO resData) {
		this.resData = resData;
	}


}
