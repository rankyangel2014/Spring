package com.jsjn.jnf.bean.dto.assist;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.base.BaseDTO;


/**
 * 交易锁
 * @author lilong
 *
 */
public class LockDto extends BaseDTO<LockDto>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * 商户号
	 */
	@NotBlank(message="商户号不能为空")
	private String mid;
	
	/**
	 * 锁类型
	 */
	@NotBlank(message="锁类型不能为空")
	private String lockType;
	
	/**
	 * 业务防重复流水号
	 */
	@NotBlank(message="防重复流水号不能为空")
	private String lockNo;
	
	public String getLockType() {
		return lockType;
	}

	public void setLockType(String lockType) {
		this.lockType = lockType;
	}

	public String getLockNo() {
		return lockNo;
	}

	public void setLockNo(String lockNo) {
		this.lockNo = lockNo;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

}
