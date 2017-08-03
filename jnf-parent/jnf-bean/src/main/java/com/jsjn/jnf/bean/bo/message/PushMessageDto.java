package com.jsjn.jnf.bean.bo.message;

import com.jsjn.jnf.common.linkq.LinkQBaseDTO;

/**
 * 推送消息dto
 * 
 * @author xiekx
 * 
 */
public class PushMessageDto extends LinkQBaseDTO {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7318287853695708178L;

	private String serialNo;//业务编号
	private String tranNo;//交易订单编号
	private String dealTime;//成交时间
	private String payStatus;//代扣状态
	private String resMsg;//错误描述
	private String remarkBuff;//防止LINKQ报错 无实际意义

	public PushMessageDto() {
	}

	public String getSerialNo() {
		return serialNo;
	}

	public void setSerialNo(String serialNo) {
		this.serialNo = serialNo;
	}

	public String getTranNo() {
		return tranNo;
	}

	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}

	public String getDealTime() {
		return dealTime;
	}

	public void setDealTime(String dealTime) {
		this.dealTime = dealTime;
	}

	public String getPayStatus() {
		return payStatus;
	}

	public void setPayStatus(String payStatus) {
		this.payStatus = payStatus;
	}

	public String getResMsg() {
		return resMsg;
	}

	public void setResMsg(String resMsg) {
		this.resMsg = resMsg;
	}

	public String getRemarkBuff() {
		return remarkBuff;
	}

	public void setRemarkBuff(String remarkBuff) {
		this.remarkBuff = remarkBuff;
	}

}
