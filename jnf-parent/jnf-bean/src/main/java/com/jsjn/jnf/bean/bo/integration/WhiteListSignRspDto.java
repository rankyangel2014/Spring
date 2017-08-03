package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 调用社会征信系统webService结果返回
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class WhiteListSignRspDto extends CommonMessageRsp {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String signNo; // 签名

	/**
	 * 默认构造函数
	 */
	public WhiteListSignRspDto() {
	}

	@Override
	public String toString() {
		return " [resCode=" + super.getResCode() + ", resMsg="
				+ super.getResMsg() + ", signNo=" + signNo + "]";
	}

	public String getSignNo() {
		return signNo;
	}

	public void setSignNo(String signNo) {
		this.signNo = signNo;
	}

}
