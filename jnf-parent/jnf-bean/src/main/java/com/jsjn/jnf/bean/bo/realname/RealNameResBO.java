/**
 * 
 */
package com.jsjn.jnf.bean.bo.realname;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.jsjn.jnf.bean.bo.base.BaseOpenResBO;

/**
 * @author ZSMJ
 * 实名认证响应报文
 * 采用JAXB注解
 */
@XmlRootElement(name="message")
@XmlAccessorType(XmlAccessType.FIELD)
public class RealNameResBO extends BaseOpenResBO<RealNameResDataBO>{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7859839661256696330L;

	private RealNameResDataBO resData;
	
	public RealNameResBO(){
		
	}

	/**
	 * 实名认证返回
	 * @param resCode
	 * @param token
	 * @param resMsg
	 */
	public RealNameResBO(String resCode,String token,String resMsg){
		setResCode(resCode);
		setResMsg(resMsg);
		resData = new RealNameResDataBO();
		resData.setToken(token);
	}
	
	/**
	 * 短信认证返回
	 * @param resCode
	 * @param aid
	 * @param custId
	 * @param resMsg
	 */
	public RealNameResBO(String resCode,
			String aid,String custId,String resMsg){
		setResCode(resCode);
		setResMsg(resMsg);
		resData = new RealNameResDataBO();
		resData.setAid(aid);
		resData.setCustId(custId);
		
	}

	public RealNameResDataBO getResData() {
		return resData;
	}

	public void setResData(RealNameResDataBO resData) {
		this.resData = resData;
	}
}
