package com.jsjn.jnf.common.config;

/**
 * 渠道类型 枚举类
 * 
 * 字段：code：对应渠道编号 对应T23.C1 describe：描述
 * 
 * @author yincy
 * 
 */
public enum ChannelCode {

	/**
	 * 苏宁易付宝
	 */
	CHANNEL_SUNNING_YFB("CH10", "苏宁易付宝"),

	/**
	 * 宏图三胞天下支付天付宝
	 */
	CHANNEL_GUOCAI_TFB("CH11", "宏图三胞天下支付天付宝"),

	/**
	 * 金农征信
	 */
	CHANNEL_JN_ZX("CH12", "金农征信"),
	/**
	 * 金农征信
	 */
	CHANNEL_BOJSCNBN_DF("CH13", "江苏银行代付")

	;

	private String code;
	private String describe;

	private ChannelCode(String code, String describe) {
		this.setCode(code);
		this.setDescribe(describe);
	}

	/**
	 * 获取接口描述
	 * 
	 * @param code
	 * @return
	 */
	public static String getDescribe(String code) {
		for (ChannelCode c : ChannelCode.values()) {
			if (c.getCode().equals(code)) {
				return c.describe;
			}
		}
		return null;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescribe() {
		return this.describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}
}
