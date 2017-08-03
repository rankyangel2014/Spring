package com.jsjn.jnf.bean.dto.withhold;

import java.util.Date;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.security.Digests;

/**
 * 用户绑定第三方账户表
 * @author yincy
 *
 */
public class UserThirdAccountDto extends DigestDto<UserThirdAccountDto> {

	private static final long serialVersionUID = 1L;

	/**
	 * 用户绑定第三方账户编号
	 */
	private String accNo;

	/**
	 * 账户状态
	 */
	private String status;

	/**
	 * 用户编号
	 */
	private String custId;

	/**
	 * 商户编号
	 */
	private String mId;

	/**
	 * 账户类型
	 */
	private String bindAccType;

	/**
	 * 银行卡号/账户号码
	 */
	private String bindAccNo;

	/**
	 * 用户名称
	 */
	private String custName;

	/**
	 * 证件号码
	 */
	private String custIdNo;

	/**
	 * 手机号码
	 */
	private String mobile;

	/**
	 * 银行卡所属银行编码
	 */
	private String cardBankCode;

	/**
	 * 联行号
	 */
	private String cardRegBankNo;

	/**
	 * 联行名称
	 */
	private String cardRegBankName;

	/**
	 * 备注
	 */
	private String remark;

	/**
	 * 摘要
	 */
	private String digest;

	/**
	 * 创建时间
	 */
	private Date created;

	/**
	 * 更新时间
	 */
	private Date modified;

	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getmId() {
		return mId;
	}

	public void setmId(String mId) {
		this.mId = mId;
	}

	public String getBindAccType() {
		return bindAccType;
	}

	public void setBindAccType(String bindAccType) {
		this.bindAccType = bindAccType;
	}

	public String getBindAccNo() {
		return bindAccNo;
	}

	public void setBindAccNo(String bindAccNo) {
		this.bindAccNo = bindAccNo;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getCustIdNo() {
		return custIdNo;
	}

	public void setCustIdNo(String custIdNo) {
		this.custIdNo = custIdNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCardBankCode() {
		return cardBankCode;
	}

	public void setCardBankCode(String cardBankCode) {
		this.cardBankCode = cardBankCode;
	}

	public String getCardRegBankNo() {
		return cardRegBankNo;
	}

	public void setCardRegBankNo(String cardRegBankNo) {
		this.cardRegBankNo = cardRegBankNo;
	}

	public String getCardRegBankName() {
		return cardRegBankName;
	}

	public void setCardRegBankName(String cardRegBankName) {
		this.cardRegBankName = cardRegBankName;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
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

	@Override
	public String buildDigest() {
		return Digests.md5(this.getAccNo()+this.getCustId()+this.getmId()
		      +this.getBindAccNo()+this.getCustName()+this.getCustIdNo()+this.getMobile()+SALT);
	}

}
