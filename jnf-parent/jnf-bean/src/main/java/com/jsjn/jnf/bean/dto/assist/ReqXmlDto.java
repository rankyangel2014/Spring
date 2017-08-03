/**
 * 
 */
package com.jsjn.jnf.bean.dto.assist;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * @author ZSMJ
 * 请求报文表
 */
public class ReqXmlDto extends BaseDTO<ReqXmlDto>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3976292774076654110L;
	
	/**
	 * 请求报文
	 */
	private String reqXml;

	public String getReqXml() {
		return reqXml;
	}

	public void setReqXml(String reqXml) {
		this.reqXml = reqXml;
	}
	
	

}
