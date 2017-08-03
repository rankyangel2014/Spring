/**
	2016年9月2日
 * 
 */
package com.jsjn.jnf.bean.dto.trade;
import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * @author yanhaibo
 *
 * 
 */
public class PushInfoDto extends BaseDTO<PushInfoDto>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 推送编号
	 */
	private 	String pushId;
	
	/**
	 * 商户号
	 */
	private String mId;
	
	/**
	 * 推送内容
	 */
	private String pushContent;
	
	/**
	 * 推送类型
	 */
	private String pushType;
	
	/**
	 * 推送状态
	 */
	private String pushState;

	/**
	 * @return the pushId
	 */
	public String getPushId() {
		return pushId;
	}

	/**
	 * @param pushId the pushId to set
	 */
	public void setPushId(String pushId) {
		this.pushId = pushId;
	}

	/**
	 * @return the mId
	 */
	public String getmId() {
		return mId;
	}

	/**
	 * @param mId the mId to set
	 */
	public void setmId(String mId) {
		this.mId = mId;
	}

	/**
	 * @return the pushContent
	 */
	public String getPushContent() {
		return pushContent;
	}

	/**
	 * @param pushContent the pushContent to set
	 */
	public void setPushContent(String pushContent) {
		this.pushContent = pushContent;
	}

	/**
	 * @return the pushType
	 */
	public String getPushType() {
		return pushType;
	}

	/**
	 * @param pushType the pushType to set
	 */
	public void setPushType(String pushType) {
		this.pushType = pushType;
	}

	/**
	 * @return the pushState
	 */
	public String getPushState() {
		return pushState;
	}

	/**
	 * @param pushState the pushState to set
	 */
	public void setPushState(String pushState) {
		this.pushState = pushState;
	}

	
	
}

