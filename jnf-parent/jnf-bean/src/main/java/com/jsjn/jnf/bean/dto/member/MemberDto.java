package com.jsjn.jnf.bean.dto.member;

import java.util.Date;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.annotation.SensitiveInfoAnnotation;
import com.jsjn.jnf.common.security.Digests;
import com.jsjn.jnf.common.utils.SensitiveInfoUtils.SensitiveType;
import com.jsjn.jnf.common.validator.constraints.*;

/**
 * 会员实体
 * @author qiangl
 *
 */
public class MemberDto extends DigestDto<MemberDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8708863461597579167L;

	/**
	 * 用户编号
	 */
	private String custId;
	/**
	 * 用户名称
	 */
	@NotBlank(message = "用户名称不能为空")
	@Size(min = 2, message = "用户名称长度不符!")
	@SensitiveInfoAnnotation(type = SensitiveType.CHINESE_NAME)
	private String custName;
	/**
	 * 商户编号
	 */
	@NotBlank(message = "商户号不能为空")
	private String mId;
	
	/**
	 * 商户名称
	 */
	private String mName;

	/**
	 * 客户类型
	 */
	private String custType;
	/**
	 * 手机号码
	 */
	@NotBlank(message = "手机号码不能为空")
	@CheckMobileNumber(message = "你的手机号号不正确")
	private String mobile;
	/**
	 * 账号状态
	 */
	private String state;
	/**
	 * 是否实名认证
	 */
	private String isReal;
	/**
	 * 备注
	 */
	private String remark;
	/**
	 * 证件类型  1=身份证
	 */
	@NotBlank(message = "证件类型不能为空")
	private String idType;
	/**
	 * 证件号码
	 */
	@NotBlank(message = "证件号码不能为空")
	private String idNo;
	/**
	 * 第三方系统客户号
	 */
	private String extCustId;
	/**
	 * 投资人机构号
	 */
	private String insttuId;
	/**
	 * 创建时间
	 */
	private Date created;
	/**
	 * 更新时间
	 */
	private Date modified;
	
	/**
	 * 临时参数1
	 */
	private String beginTime;
	
	/**
	 * 临时参数1
	 */
	private String endTime;
	
	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getCustId() {
		return custId;
	}

	public void setCustId(String custId) {
		this.custId = custId;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getMId() {
		return mId;
	}

	public void setMId(String mId) {
		this.mId = mId;
	}

	public String getCustType() {
		return custType;
	}

	public void setCustType(String custType) {
		this.custType = custType;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getIsReal() {
		return isReal;
	}

	public void setIsReal(String isReal) {
		this.isReal = isReal;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getExtCustId() {
		return extCustId;
	}

	public void setExtCustId(String extCustId) {
		this.extCustId = extCustId;
	}

	public String getInsttuId() {
		return insttuId;
	}

	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
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
	
	
	public String getMName() {
		return mName;
	}


	public void setmName(String mName) {
		this.mName = mName;
	}

	
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jsjn.jnf.bean.assist.dto.DigestDto#buildDigest()
	 */
	@Override
	public String buildDigest() {
		// md5(用户编号+商户编号+证件类型+证件号码+手机号码+用户名称+盐)
		return Digests.md5(this.custId + this.mId + this.idType + this.idNo + this.mobile + this.custName + SALT);
	}

}
