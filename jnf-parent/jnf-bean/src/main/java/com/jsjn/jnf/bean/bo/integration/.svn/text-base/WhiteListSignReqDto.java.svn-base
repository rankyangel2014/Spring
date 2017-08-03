package com.jsjn.jnf.bean.bo.integration;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * 调用社会征信系统webService结果返回
 * 
 * @author xiekx
 * 
 */
@XmlRootElement(name = "message")
public class WhiteListSignReqDto extends CommonMessageReq {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public String toString() {
		return "[orgNo=" + super.getOrgNo() + ", tranCd=" + super.getTranCd()
				+ ", tranDt=" + super.getTranDt() + "name=" + name + ", idNo="
				+ idNo + ", signFlag=" + signFlag + ", custSignNo="
				+ custSignNo + ", bankCode=" + bankCode + ", bankName="
				+ bankName + ", cardType=" + cardType + ", accountNo="
				+ accountNo + ", idType=" + idType + ", phoneNo=" + phoneNo
				+ ", address=" + address + "]";
	}

	private String name; // 客户姓名
	private String idNo; // 证件号码
	private String signFlag; // 签约标示
	private String custSignNo; // 客户签约号
	private String bankCode; // 开户行行号
	private String bankName; // 开户行名称
	private String cardType; // 卡折标志
	private String accountNo; // 持卡人卡号
	private String idType; // 证件类型
	private String phoneNo; // 联系电话
	private String address; // 联系地址

	/**
	 * 默认构造函数
	 */
	public WhiteListSignReqDto() {
	}

	public String getSignFlag() {
		return signFlag;
	}

	public void setSignFlag(String signFlag) {
		this.signFlag = signFlag;
	}

	public String getCustSignNo() {
		return custSignNo;
	}

	public void setCustSignNo(String custSignNo) {
		this.custSignNo = custSignNo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
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

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public static void main(String[] args) {
		WhiteListSignReqDto dto = new WhiteListSignReqDto();
		dto.setAccountNo("600236211235756467");
		dto.setAddress("江苏南京");
		dto.setBankCode("7006");
		dto.setBankName("中国银行");
		dto.setCardType("借记卡");
		dto.setName("张三");
		dto.setIdNo("320821198608092358");
		dto.setIdType("身份证");
		dto.setCustSignNo("123323");
		dto.setPhoneNo("17012345676");
		dto.setSignFlag("1");
	}
}
