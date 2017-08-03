package com.jsjn.jnf.bean.dto.withhold;

import java.util.Date;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.security.Digests;

/**
 * 签约信息表
 * 
 * @author yincy
 * 
 */
public class SignInfoDto extends DigestDto<SignInfoDto> {

	private static final long serialVersionUID = 1L;

	/**
	 * 协议编号
	 */
	private String aid;

	/**
	 * 商户编号
	 */
	private String mId;

	/**
	 * 渠道类型
	 */
	private String bindChannel;

	/**
	 * 收款方用户编号
	 */
	private String payeeUserId;

	/**
	 * 付款方用户编号
	 */
	private String payerUserId;

	/**
	 * 付款方绑定第三方账户编号
	 */
	private String payerBindAccId;

	/**
	 * 协议类型
	 */
	private String type;

	/**
	 * 签约状态(协议状态)
	 */
	private String state;

	/**
	 * 借款人身份证正反面照片路径
	 */
	private String payerIdFiles;

	/**
	 * 投资人借款人协议照片路径
	 */
	private String payerFiles;

	/**
	 * 金农在线签约协议PDF文件hash值
	 */
	private String jnfFileHash;

	/**
	 * 借据号
	 */
	private String loanNo;

	/**
	 * 数据摘要
	 */
	private String digest;

	/**
	 * 用户签约协议编号
	 */
	private String signNo;

	/**
	 * 创建时间
	 */
	private Date created;

	/**
	 * 更新时间
	 */
	private Date modified;

	/**
	 * 外部系统标识
	 */
	private String channelSign;

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getmId() {
		return mId;
	}

	public void setmId(String mId) {
		this.mId = mId;
	}

	public String getBindChannel() {
		return bindChannel;
	}

	public void setBindChannel(String bindChannel) {
		this.bindChannel = bindChannel;
	}

	public String getPayeeUserId() {
		return payeeUserId;
	}

	public void setPayeeUserId(String payeeUserId) {
		this.payeeUserId = payeeUserId;
	}

	public String getPayerUserId() {
		return payerUserId;
	}

	public void setPayerUserId(String payerUserId) {
		this.payerUserId = payerUserId;
	}

	public String getPayerBindAccId() {
		return payerBindAccId;
	}

	public void setPayerBindAccId(String payerBindAccId) {
		this.payerBindAccId = payerBindAccId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPayerIdFiles() {
		return payerIdFiles;
	}

	public void setPayerIdFiles(String payerIdFiles) {
		this.payerIdFiles = payerIdFiles;
	}

	public String getPayerFiles() {
		return payerFiles;
	}

	public void setPayerFiles(String payerFiles) {
		this.payerFiles = payerFiles;
	}

	public String getJnfFileHash() {
		return jnfFileHash;
	}

	public void setJnfFileHash(String jnfFileHash) {
		this.jnfFileHash = jnfFileHash;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	public String getSignNo() {
		return signNo;
	}

	public void setSignNo(String signNo) {
		this.signNo = signNo;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getModified() {
		return modified;
	}

	public void setModified(Date modified) {
		this.modified = modified;
	}

	public String getChannelSign() {
		return channelSign;
	}

	public void setChannelSign(String channelSign) {
		this.channelSign = channelSign;
	}

	@Override
	public String buildDigest() {
		return Digests.md5(this.getAid() + this.getmId() + this.getBindChannel() + this.getPayeeUserId()
				+ this.getPayerUserId() + this.getPayerBindAccId() + this.getState() + SALT);
	}
}
