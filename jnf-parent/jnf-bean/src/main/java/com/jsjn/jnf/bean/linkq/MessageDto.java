package com.jsjn.jnf.bean.linkq;

import com.jsjn.jnf.common.linkq.LinkQBaseDTO;

/**
 * 消息表
 * 
 * @author xiekx
 * 
 */
public class MessageDto extends LinkQBaseDTO {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7318287853695708178L;

	private String pushId;//主键
	private String mid;//商户号
	private String pushContent;//消息的内容报文：如xml，json等
	private String pushType;//消息类型  1推送  2短信
	private String pushState;//消息状态 1-等待发送   2-发送成功 3-送失败 

	public MessageDto() {
	}

	public String getPushId() {
		return pushId;
	}

	public void setPushId(String pushId) {
		this.pushId = pushId;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getPushContent() {
		return pushContent;
	}

	public void setPushContent(String pushContent) {
		this.pushContent = pushContent;
	}

	public String getPushType() {
		return pushType;
	}

	public void setPushType(String pushType) {
		this.pushType = pushType;
	}

	public String getPushState() {
		return pushState;
	}

	public void setPushState(String pushState) {
		this.pushState = pushState;
	}
}
