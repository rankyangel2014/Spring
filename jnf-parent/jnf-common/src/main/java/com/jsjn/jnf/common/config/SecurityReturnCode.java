package com.jsjn.jnf.common.config;

/**
 * 全局返回码/错误码
 * 
 * @author ZSMJ
 * 
 */
public enum SecurityReturnCode {

	/**
	 * 成功
	 */
	SUCCESS("000000", "成功"),

	/**
	 * 商户未接入或非法
	 */
	INVALID_BUSINESS("999991", "商户未接入或非法"),

	/**
	 * IP访问来源非法
	 */
	INVALID_IP("999992", "IP访问来源非法"),

	/**
	 * 接口无访问权限
	 */
	INVALID_ROLE_CTRL("999993", "接口无访问权限"),

	/**
	 * 接口不存在
	 */
	INVALID_SERVICE("999994", "接口不存在"),

	/**
	 * 接口请求数据非法
	 */
	INVALID_PARAMS("999995", "接口请求数据非法"),

	/**
	 * 接口请求验签失败
	 */
	INVALID_SIGN("999996", "接口请求验签失败"),

	/**
	 * 非工作时间
	 */
	INVALID_WORKING_TIME("999997", "非工作时间"),

	/**
	 * 服务异常无法响应
	 */
	SYS_BUSY("999998", "服务繁忙暂时无法响应"),

	/**
	 * 时间戳认证失败
	 */
	INVALID_TIMESTAMP("999999", "时间戳认证失败"),

	/**
	 * 系统关闭
	 */
	SYSTEM_POWER_OFF("999981", "系统当前关闭"),
	/**
	 * 获取商户配置信息失败
	 */
	ERR_BUSINESS_CONFIG("999982", "获取商户配置信息失败，请检查appkey或mid是否正确");

	private String code;
	private String msg;

	private SecurityReturnCode(String code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	//获取响应信息
	public static String getMsg(String code) {
		for (SecurityReturnCode c : SecurityReturnCode.values()) {
			if (c.getCode().equals(code)) {
				return c.msg;
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

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
