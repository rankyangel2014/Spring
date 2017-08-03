package com.jsjn.jnf.bean.bo.realname;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckCustName;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 实名认证和OPEN交互对象
 * @author 方政
 *
 */
public class RealNameReqDataBO{

	
	/**
	 * 用户姓名
	 */
	@NotBlank(message="姓名不能为空")
	@CheckCustName(message="用户名输入不正确")
	private String custName;	
	
	/**
	 * 身份证号
	 */
	@NotBlank(message="身份证号码不能为空")
	@CheckIdNo(message="身份证号输入不正确")
	private String idNo;		
	
	/**
	 * 银行卡号
	 */
	@NotBlank(message="银行卡号不能为空！")
	@CheckBankNo(message="银行卡号输入错误")
	private String bankCardNo;	
	
	/**
	 * 手机号码
	 */
	@NotBlank(message="手机号不能为空！")
	@CheckMobileNumber(message="手机号码输入错误！")
	private String mobile;
	
	/**
	 * 验证码
	 */
	@NotBlank(message="验证码不能为空！")
	private String code;

	/**
	 * token
	 */
	@NotBlank(message="token不能为空！")
	private String token;
	
	/**
	 * 商户号
	 * @return
	 */
	private String mid;
	
	/**
	 * 是否代扣标志
	 * @return
	 */
	private String flag;
	
	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getIdNo() {
		return idNo;
	}

	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}

	public String getBankCardNo() {
		return bankCardNo;
	}

	public void setBankCardNo(String bankCardNo) {
		this.bankCardNo = bankCardNo;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
}
