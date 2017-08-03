package com.jsjn.jnf.bean.dto.withhold;

import java.util.List;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.base.BaseDTO;
import com.jsjn.jnf.common.validator.constraints.CheckBankNo;
import com.jsjn.jnf.common.validator.constraints.CheckCustName;
import com.jsjn.jnf.common.validator.constraints.CheckIdNo;
import com.jsjn.jnf.common.validator.constraints.CheckMobileNumber;

/**
 * 代扣签约临时表
 * 
 * @author ThinkPad
 * 
 */
public class SignTempInfoDto extends BaseDTO<SignTempInfoDto> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1710888997778451733L;

	/**
	 * 签约记录编号
	 */
	private String signRecordId;

	/**
	 * 商户编号
	 */
	private String mid;

	/**
	 * 签约协议编号
	 */
	private String aid;

	/**
	 * 签约状态
	 */
	private String state;

	/**
	 * 金农在线签约协议pdf文件Hash
	 */
	private String jnfFileHash;

	/**
	 * 收款方第三方机构号
	 */
	private String insttuId;

	/**
	 * 收款方名称
	 */
	private String insttuName;

	/**
	 * 签约渠道
	 */
	private String channel;

	/**
	 * 协议照片
	 */
	private String signFiles;

	/**
	 * 付款方客户名称
	 */
	@NotBlank(message = "姓名不能为空")
	@CheckCustName(message = "用户名输入不正确")
	private String custName;

	/**
	 * 证件类型
	 */
	private String idType;

	/**
	 * 证件号码
	 */
	@NotBlank(message = "身份证号码不能为空")
	@CheckIdNo(message = "身份证号输入不正确")
	private String idNo;

	/**
	 * 银行卡号
	 */
	@NotBlank(message = "银行卡号不能为空！")
	@CheckBankNo(message = "银行卡号输入错误")
	private String cardNo;

	/**
	 * 手机号码
	 */
	@NotBlank(message = "手机号不能为空！")
	@CheckMobileNumber(message = "手机号码输入错误！")
	private String mobile;

	/**
	 * 身份证正反照
	 */
	private String idFiles;

	/**
	 * 借据号
	 */
	private String loanNo;

	/**
	 * 贷款合同号
	 */
	private String contNo;

	/**
	 * 还款方式
	 */
	private String repayType;

	/**
	 * 贷款本金
	 */
	private String osPrcp;

	/**
	 * 银行编码
	 */
	private String cardBankCode;

	/**
	 * 审批流程id
	 */
	private String flowId;

	/**
	 * 创建时间
	 */
	private String created;

	/**
	 * 更新时间
	 */
	private String modified;

	/**
	 * 短信验证码
	 */
	private String smsVerifyCode;

	/**
	 * 
	 * 
	 * 新增参数
	 * 
	 * @return
	 */

	private String mname;

	private String bankName;

	private String startTime;

	private String endTime;

	private String userName;

	private String type;

	private String bindAccNo;

	/**
	 * 扣款启动日
	 * */
	private String payStartDay;
	/**
	 * 是否参加批量代扣
	 * */
	private String isBatchPay;

	/**
	 * 是否绑定利息保证金代扣
	 * */
	private String recourse;
	/**
	 * 是否支持解约
	 * */
	private String cancelAble;
	/**
	 * 外部系统标识
	 * */
	private String channelSign;

	/**
	 * @return the bindAccNo
	 */
	public String getBindAccNo() {
		return bindAccNo;
	}

	/**
	 * @param bindAccNo
	 *            the bindAccNo to set
	 */
	public void setBindAccNo(String bindAccNo) {
		this.bindAccNo = bindAccNo;
	}

	/**
	 * @return the mname
	 */
	public String getMname() {
		return mname;
	}

	/**
	 * @param mname
	 *            the mname to set
	 */
	public void setMname(String mname) {
		this.mname = mname;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName
	 *            the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the bankName
	 */
	public String getBankName() {
		return bankName;
	}

	/**
	 * @param bankName
	 *            the bankName to set
	 */
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	/**
	 * @return the startTime
	 */
	public String getStartTime() {
		return startTime;
	}

	/**
	 * @param startTime
	 *            the startTime to set
	 */
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	/**
	 * @return the endTime
	 */
	public String getEndTime() {
		return endTime;
	}

	/**
	 * @param endTime
	 *            the endTime to set
	 */
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getSmsVerifyCode() {
		return smsVerifyCode;
	}

	public void setSmsVerifyCode(String smsVerifyCode) {
		this.smsVerifyCode = smsVerifyCode;
	}

	public String getCardBankCode() {
		return cardBankCode;
	}

	public void setCardBankCode(String cardBankCode) {
		this.cardBankCode = cardBankCode;
	}

	public String getFlowId() {
		return flowId;
	}

	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}

	private List<SignTempInfoDto> recList;

	public String getSignRecordId() {
		return signRecordId;
	}

	public void setSignRecordId(String signRecordId) {
		this.signRecordId = signRecordId;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getAid() {
		return aid;
	}

	public void setAid(String aid) {
		this.aid = aid;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getJnfFileHash() {
		return jnfFileHash;
	}

	public void setJnfFileHash(String jnfFileHash) {
		this.jnfFileHash = jnfFileHash;
	}

	public String getInsttuId() {
		return insttuId;
	}

	public void setInsttuId(String insttuId) {
		this.insttuId = insttuId;
	}

	public String getInsttuName() {
		return insttuName;
	}

	public void setInsttuName(String insttuName) {
		this.insttuName = insttuName;
	}

	public String getChannel() {
		return channel;
	}

	public void setChannel(String channel) {
		this.channel = channel;
	}

	public String getSignFiles() {
		return signFiles;
	}

	public void setSignFiles(String signFiles) {
		this.signFiles = signFiles;
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

	public String getIdFiles() {
		return idFiles;
	}

	public void setIdFiles(String idFiles) {
		this.idFiles = idFiles;
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

	public String getRepayType() {
		return repayType;
	}

	public void setRepayType(String repayType) {
		this.repayType = repayType;
	}

	public String getOsPrcp() {
		return osPrcp;
	}

	public void setOsPrcp(String osPrcp) {
		this.osPrcp = osPrcp;
	}

	public String getCreated() {
		return created;
	}

	public void setCreated(String created) {
		this.created = created;
	}

	public String getModified() {
		return modified;
	}

	public void setModified(String modified) {
		this.modified = modified;
	}

	public List<SignTempInfoDto> getRecList() {
		return recList;
	}

	public void setRecList(List<SignTempInfoDto> recList) {
		this.recList = recList;
	}

	public String getPayStartDay() {
		return payStartDay;
	}

	public void setPayStartDay(String payStartDay) {
		this.payStartDay = payStartDay;
	}

	public String getIsBatchPay() {
		return isBatchPay;
	}

	public void setIsBatchPay(String isBatchPay) {
		this.isBatchPay = isBatchPay;
	}

	public String getRecourse() {
		return recourse;
	}

	public void setRecourse(String recourse) {
		this.recourse = recourse;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "SignTempInfoDto [signRecordId=" + signRecordId + ", mid=" + mid + ", aid=" + aid + ", state=" + state
				+ ", jnfFileHash=" + jnfFileHash + ", insttuId=" + insttuId + ", insttuName=" + insttuName
				+ ", channel=" + channel + ", signFiles=" + signFiles + ", custName=" + custName + ", idType=" + idType
				+ ", idNo=" + idNo + ", cardNo=" + cardNo + ", mobile=" + mobile + ", idFiles=" + idFiles + ", loanNo="
				+ loanNo + ", contNo=" + contNo + ", repayType=" + repayType + ", osPrcp=" + osPrcp + ", cardBankCode="
				+ cardBankCode + ", flowId=" + flowId + ", created=" + created + ", modified=" + modified
				+ ", smsVerifyCode=" + smsVerifyCode + ", mName=" + mname + ", bankName=" + bankName + ", startTime="
				+ startTime + ", endTime=" + endTime + ", userName=" + userName + ", type=" + type + ", recList="
				+ recList + "]";
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

}
