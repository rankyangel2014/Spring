package com.jsjn.jnf.bean.dto.assist;

import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.security.Digests;

/**
 * 商户接入配置类
 * 
 * @author lilong
 * 
 */
public class BizConfigDto extends DigestDto<BizConfigDto> {

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
	 * 安全校验码
	 */
	@NotBlank(message="安全校验码不能为空")
	private String appkey;

	/**
	 * IP白名单
	 */
	@NotBlank(message="IP白名单不能为空")
	@Pattern(regexp="^\\S{1,160}$",message="IP白名单长度过长")
	private String whiteList;

	/**
	 * 商户RSA公钥
	 */
	@NotBlank(message="商户RSA公钥不能为空")
	@Pattern(regexp="^\\S{1,1024}$",message="商户RSA公钥长度过长")
	private String rsaPubKey;

	/**
	 * 商户加密KEY
	 */
	private String aesKey;
	
	private String digest;
	
	

	/**
	 * @return the digest
	 */
	public String getDigest() {
		return digest;
	}

	/**
	 * @param digest the digest to set
	 */
	public void setDigest(String digest) {
		this.digest = digest;
	}

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getAppkey() {
		return appkey;
	}

	public void setAppkey(String appkey) {
		this.appkey = appkey;
	}

	public String getWhiteList() {
		return whiteList;
	}

	public void setWhiteList(String whiteList) {
		this.whiteList = whiteList;
	}

	public String getRsaPubKey() {
		return rsaPubKey;
	}

	public void setRsaPubKey(String rsaPubKey) {
		this.rsaPubKey = rsaPubKey;
	}

	public String getAesKey() {
		return aesKey;
	}

	public void setAesKey(String aesKey) {
		this.aesKey = aesKey;
	}

	@Override
	public String buildDigest() {

		return Digests.md5(this.getWhiteList() + this.getAppkey()
				+ this.getRsaPubKey() + SALT);
	}
	

}
