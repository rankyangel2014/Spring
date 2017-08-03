package com.jsjn.jnf.bean.bo.signWithhold;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckFlag;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;
import com.jsjn.jnf.common.validator.constraints.CheckRange;

/**
 * 签代扣协议/发送实体参数
 * 
 * @author xiekx
 */
public class SignWithholdReqDataBO {
	/**
	 * 机构号
	 */
	@NotBlank(message = "机构号不能为空")
	private String orgNo;
	/**
	 * 借据号
	 */
	@NotBlank(message = "借据号不能为空")
	private String loanNo;

	/**
	 * 贷款合同号
	 */
	@NotBlank(message = "贷款合同号不能为空")
	private String contNo;
	/**
	 * 客户名称
	 */
	@NotBlank(message = "客户名称不能为空")
	private String custName;
	/**
	 * 证件类型
	 */
	private String idType;
	/**
	 * 还款方式
	 */
	private String repayTyp;
	/**
	 * 证件号
	 */
	@CheckIdNo
	private String idNo;
	/**
	 * 银行卡号
	 */
	@CheckBankNo
	private String cardNo;
	/**
	 * 银行卡绑定手机号
	 */
	@CheckMobileNumber
	private String mobile;
	/**
	 * 贷款本金
	 */
	@Pattern(message = "贷款本金格式非法", regexp = "[1-9]{1}[0-9]{0,8}(\\.?\\d{2})")
	@NotBlank(message = "贷款本金不能为空")
	private String osPrcp;

	/**
	 * 协议文件weedfs地址
	 */
	@NotBlank(message = "协议文件weedfs地址不能为空")
	private String signFile;
	/**
	 * 身份证正反面weedfs地址
	 */
	@NotBlank(message = "身份证照片正面weedfs地址不能为空")
	private String idFrontFile;
	/**
	 * 身份证正反面weedfs地址
	 */
	@NotBlank(message = "身份证照片反面weedfs地址不能为空")
	private String idBackFile;
	/**
	 * 是否允许解约
	 */
	private String cancelAble;
	/**
	 * 外部系统标识比如小微贷
	 */
	@NotBlank(message = "渠道标识不能为空")
	private String channelSign;
	/**
	 * 是否参加批量代扣（Y/N）
	 */
	@CheckFlag
	private String isBatchPay;
	/**
	 * 扣款启动日（0-7）
	 */
	@CheckRange
	private String payStartDay;

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getLoanNo() {
		return loanNo;
	}

	public void setLoanNo(String loanNo) {
		this.loanNo = loanNo;
	}

	public String getContNo() {
		return contNo;
	}

	public void setContNo(String contNo) {
		this.contNo = contNo;
	}

	public String getCustName() {
		return custName;
	}

	public void setCustName(String custName) {
		this.custName = custName;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getRepayTyp() {
		return repayTyp;
	}

	public void setRepayTyp(String repayTyp) {
		this.repayTyp = repayTyp;
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

	public String getOsPrcp() {
		return osPrcp;
	}

	public void setOsPrcp(String osPrcp) {
		this.osPrcp = osPrcp;
	}

	public String getSignFile() {
		return signFile;
	}

	public void setSignFile(String signFile) {
		this.signFile = signFile;
	}

	public String getIdFrontFile() {
		return idFrontFile;
	}

	public void setIdFrontFile(String idFrontFile) {
		this.idFrontFile = idFrontFile;
	}

	public String getIdBackFile() {
		return idBackFile;
	}

	public void setIdBackFile(String idBackFile) {
		this.idBackFile = idBackFile;
	}

	public String getCancelAble() {
		return cancelAble;
	}

	public void setCancelAble(String cancelAble) {
		this.cancelAble = cancelAble;
	}

	public String getChannelSign() {
		return channelSign;
	}

	public void setChannelSign(String channelSign) {
		this.channelSign = channelSign;
	}

	public String getIsBatchPay() {
		return isBatchPay;
	}

	public void setIsBatchPay(String isBatchPay) {
		this.isBatchPay = isBatchPay;
	}

	public String getPayStartDay() {
		return payStartDay;
	}

	public void setPayStartDay(String payStartDay) {
		this.payStartDay = payStartDay;
	}
}
