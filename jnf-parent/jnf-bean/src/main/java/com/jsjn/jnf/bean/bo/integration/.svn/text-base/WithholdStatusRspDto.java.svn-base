package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 卡BIN查询响应对象
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class WithholdStatusRspDto extends CommonMessageRsp {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String status; // 代扣返回状态

	/**
	 * 默认构造函数
	 */
	public WithholdStatusRspDto() {
	}

	@Override
	public String toString() {
		return " [resCode=" + super.getResCode() + ", resMsg="
				+ super.getResMsg() + ", status=" + status + "]";
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
