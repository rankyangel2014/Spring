/**
 * 
 */
package com.jsjn.jnf.bean.bo.contract;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckCustName;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;



/**
 * @author ZSMJ
 * 代扣签约解绑实体参数
 */
public class ContractUnbindReqDataBO{
	/**
	 * 姓名
	 */
	@NotBlank(message="姓名不能为空")
	@CheckCustName(message="用户名输入不正确")
	private String custName;
	
	/**
	 * 身份证号码
	 */
	@NotBlank(message="身份证号不能为空")
	@CheckIdNo(message="身份证号输入不正确")
	private String idNo;
	
	/**
	 * 银行卡号
	 */
	@NotBlank(message="银行卡号不能为空")
	@CheckBankNo(message="银行卡号输入错误")
	private String bankCardNo;
	
	/**
	 * 手机号
	 */
	@NotBlank(message="手机号码不能为空")
	@CheckMobileNumber(message="手机号码输入错误！")
	private String mobile;
	
	/**
	 * 金农付银行卡绑定签约客户号
	 */
	@NotBlank(message="签约客户号不能为空")
	private String custNo;

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

	public String getCustNo() {
		return custNo;
	}

	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}
	
}
