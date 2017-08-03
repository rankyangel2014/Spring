/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * @author ZSMJ
 * 交易流水查询请求/响应报文参数
 * 采用JAXB注解
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class TradeFlowResBO extends BaseOpenResBO<TradeFlowResDataBO>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3631548729245224666L;

	/**
	 * 接口请求具体参数(数组型)
	 */
	@XmlElementWrapper(name="resDatas")  
    @XmlElement(name="resData")
	private List<TradeFlowResDataBO> resDatas;

	public List<TradeFlowResDataBO> getResDatas() {
		return resDatas;
	}

	public void setResDatas(List<TradeFlowResDataBO> resDatas) {
		this.resDatas = resDatas;
	}

	
}
