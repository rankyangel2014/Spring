package com.jsjn.jnf.bean.bo.bankCard;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckCustName;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;

/**
 * 四要素认证和OPEN交互对象
 * 
 * @author xiekx
 * 
 */
public class BankCardValidateReqDataBO {
	/**
	 * 机构号
	 */
	@NotBlank(message = "机构号不能为空")
	private String orgNo;

	/**
	 * 用户姓名
	 */
	@CheckCustName(filterSpecialChar = true)
	private String name;

	/**
	 * 身份证号
	 */
	@CheckIdNo(message = "身份证号输入不正确")
	private String idNo;

	/**
	 * 银行卡号
	 */
	@CheckBankNo(message = "银行卡号输入错误")
	private String cardNo;

	/**
	 * 手机号码
	 */
	@CheckMobileNumber(message = "手机号码输入错误！")
	private String mobile;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

}
