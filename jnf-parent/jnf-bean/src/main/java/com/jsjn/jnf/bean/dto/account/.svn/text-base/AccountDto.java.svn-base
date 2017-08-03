package com.jsjn.jnf.bean.dto.account;

import java.math.BigDecimal;
import java.util.Date;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.security.Digests;

/**
 * 会员内部虚拟户
 * @author qiangl
 *
 */
public class AccountDto extends DigestDto<AccountDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4710888997778451733L;
	
	/**
	 * 账户号
	 */
	private String accNo;
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
	private String accType;
	/**
	 * 余额
	 */
	private BigDecimal balance;
	/**
	 * 状态
	 */
	private String state;
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


	public String getAccType() {
		return accType;
	}


	public void setAccType(String accType) {
		this.accType = accType;
	}


	public BigDecimal getBalance() {
		return balance;
	}


	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
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


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	/* (non-Javadoc)
	 * @see com.jsjn.jnf.bean.assist.dto.DigestDto#buildDigest()
	 * 
	 */
	@Override
	public String buildDigest() {
		// md5(账户号+用户编号+商户编号+账户类型+状态+余额+盐)
		return Digests.md5(this.accNo+this.custId+this.mId+this.accType+
				this.state+this.balance+SALT);
	}

}
