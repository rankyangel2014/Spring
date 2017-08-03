package com.jsjn.jnf.common.config;

/**
 * 调用第三方支付接口后的返回code枚举
 * 
 * 字段：code：返回码
 *      describe：描述
 * @author yincy
 *
 */
public enum TradeCode {
	
	/**
	 * 正在处理中
	 */
	TRADE_DEAL("1","正在处理中"),
	
	/**
	 * 交易成功
	 */
	TRADE_SUCCESS("2","交易成功"),
	
	/**
	 * 交易失败
	 */
	TRADE_ERROR("9","交易失败"),
	
	/**
	 * 网络超时失败
	 */
	TRADE_ERROR_TIMEOUT("901","网络超时失败")
	;
	private String code;
	private String describe;
	
	private TradeCode(String code, String describe){
		this.setCode(code);
		this.setDescribe(describe);
	}
	
    /**
     * 获取接口描述
     * @param code
     * @return
     */
    public static String getDescribe(String code) {
        for (TradeCode c : TradeCode.values()) {
            if (c.getCode().equals(code)) {
                return c.describe;
            }
        }
        return null;
    }
    
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescribe() {
		return describe;
	}

	public void setDescribe(String describe) {
		this.describe = describe;
	}
}
