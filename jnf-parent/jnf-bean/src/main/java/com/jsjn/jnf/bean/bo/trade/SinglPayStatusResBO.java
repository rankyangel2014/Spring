/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * @author ZSMJ
 * 单笔支付交易状态查询
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class SinglPayStatusResBO extends BaseOpenResBO<SinglPayStatusDataBO>{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3504326484984717203L;
	
	/**
	 * 接口响应具体参数(一条)
	 */
	private SinglPayStatusDataBO resData;
	
	public SinglPayStatusDataBO getResData() {
		return resData;
	}

	public void setResData(SinglPayStatusDataBO resData) {
		this.resData = resData;
	}

}
