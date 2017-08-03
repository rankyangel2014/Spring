package com.jsjn.jnf.bean.dto.account;

import java.util.Date;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.bean.dto.assist.DigestDto;
import com.jsjn.jnf.common.security.Digests;

/**
 * 会员绑定银行卡
 * @author qiangl
 *
 */
public class BindCardDto extends DigestDto<BindCardDto> {

    /**
     *
     */
    private static final long serialVersionUID = -1075735185309526598L;

    /**
     * 协议号
     */
    private String aid;
    /**
     * 用户编号
     */
    private String custId;
    /**
     * 商户编号
     */
    @NotBlank(message = "商户编号不能为空")
    private String mId;
    
    /**
	 * 商户名称
	 */
	private String mName;
    
    /**
     * 协议类型
     */
    private String type;
    /**
     * 银行卡所属银行
     */
    @NotBlank(message = "所属银行银行名称不能为空")
    private String bankName;
    /**
     * 银行卡号
     */
    @NotBlank(message = "银行卡号不能为空")
    private String bankCardNo;
    /**
     * 代收协议状态
     */
    private String state;
    /**
     * 手机号码
     */
    @NotBlank(message = "预留手机号码不能为空")
    @Pattern(regexp = "1[3578][\\d]{9}", message = "手机号码格式不正确")
    private String mobile;
    /**
     * 协议PDF文件hash值
     */
    private String agreementHash;
    /**
     * 备注
     */
    private String remark;
    /**
     * 创建时间
     */
    private Date created;
    /**
     * 更新时间
     */
    private Date modified;

    /**
     * 白名单签约后用户签约协议号
     */
    private String signNo;

    /**
     * 用户名称
     */
    @NotBlank(message = "用户名称不能为空")
    private String custName;

    /**
     * 身份证号码
     */
    @NotBlank(message = "身份证号码不能为空")
    private String idNo;
    
    
    public String getMName() {
		return mName;
	}

	public void setMName(String mName) {
		this.mName = mName;
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

    public String getAid() {
        return aid;
    }

    public void setAid(String aid) {
        this.aid = aid;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getMId() {
        return mId;
    }

    public void setMId(String mId) {
        this.mId = mId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankCardNo() {
        return bankCardNo;
    }

    public void setBankCardNo(String bankCardNo) {
        this.bankCardNo = bankCardNo;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getAgreementHash() {
        return agreementHash;
    }

    public void setAgreementHash(String agreementHash) {
        this.agreementHash = agreementHash;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public String getSignNo() {
        return signNo;
    }

    public void setSignNo(String signNo) {
        this.signNo = signNo;
    }

    /*
     * (non-Javadoc)
     *
     * @see com.jsjn.jnf.bean.assist.dto.DigestDto#buildDigest()
     */
    @Override
    public String buildDigest() {
        // md5(协议号+用户编号+商户编号+协议类型+银行卡号+协议状态+手机号码+盐)
        return Digests.md5(this.aid + this.custId + this.mId + this.type + this.bankCardNo + this.state + this.mobile + SALT);
    }

}
