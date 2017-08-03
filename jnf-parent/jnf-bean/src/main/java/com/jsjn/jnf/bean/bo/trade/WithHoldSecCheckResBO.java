/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;
import com.jsjn.jnf.common.mapper.JaxbMapper;


/**
 * @author ZSMJ
 *
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class WithHoldSecCheckResBO extends BaseOpenResBO<WithHoldSecCheckResDataBO>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3288560274553718518L;
	/**
	 * 相应信息
	 */
	private WithHoldSecCheckResDataBO resData;


	public WithHoldSecCheckResDataBO getResData() {
		return resData;
	}

	public void setResData(WithHoldSecCheckResDataBO resData) {
		this.resData = resData;
	}
	public static void main(String[]args){
		String xml = "<message><resCode>10003</resCode><resMsg>请求验签失败</resMsg></message>";
		
		WithHoldSecCheckResBO dto = new WithHoldSecCheckResBO();
		dto = JaxbMapper.fromXml(xml, dto.getClass());
	}
	
}
