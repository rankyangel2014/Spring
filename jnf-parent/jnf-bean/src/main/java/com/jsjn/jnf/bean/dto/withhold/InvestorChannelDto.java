package com.jsjn.jnf.bean.dto.withhold;

import java.util.List;

import com.jsjn.jnf.bean.dto.base.BaseDTO;

/**
 * 投资人与渠道关系表
 * 
 * @author Ghost
 * 
 */
public class InvestorChannelDto extends BaseDTO<InvestorChannelDto> {

	private static final long serialVersionUID = 1L;
	private String id;// ID
	private String recId;// ID
	private String mId;// mid
	private String custId;// 投资人用户编号
	private String custName;// 投资人用户名称
	private String channelId;// 渠道编号
	private String channelName;// 渠道名称
	private String state;// 状态
	private String bindAccNo;// 绑定账户号码
	private String key;// 秘钥
	private String created;// 创建时间
	private String modified;// 更新时间
	private String cardNo;// 提现卡号
	private String businessType;//业务类型 1：代扣，2：代付
	private String transCardNo;// 转账卡号
	private String transCardName;// 转账户名
	private List<InvestorChannelDto> recList;

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

	public String getChannelId() {
		return channelId;
	}

	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getBindAccNo() {
		return bindAccNo;
	}

	public void setBindAccNo(String bindAccNo) {
		this.bindAccNo = bindAccNo;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
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

	public List<InvestorChannelDto> getRecList() {
		return recList;
	}

	public void setRecList(List<InvestorChannelDto> recList) {
		this.recList = recList;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public String getRecId() {
		return recId;
	}

	public void setRecId(String recId) {
		this.recId = recId;
	}

	public String getMId() {
		return mId;
	}

	public void setMId(String mId) {
		this.mId = mId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTransCardNo() {
		return transCardNo;
	}

	public void setTransCardNo(String transCardNo) {
		this.transCardNo = transCardNo;
	}

	public String getTransCardName() {
		return transCardName;
	}

	public void setTransCardName(String transCardName) {
		this.transCardName = transCardName;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

	public String getChannelName() {
		return channelName;
	}

	public void setChannelName(String channelName) {
		this.channelName = channelName;
	}

}
