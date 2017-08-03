package com.jsjn.jnf.common.config;

/**
 * 调用银行接口code定义
 * 
 * 定义规则：
 * 名称：银行首字母简拼 + 交易名称
 * 字段：code：银行首字母简拼  + 对应银行的接口编号      唯一性
 *     trcode：银行接口编号
 *     describe：接口描述
 * @author yincy
 *
 */
public enum BankInterfaceCode {
	
	/**
	 * 江苏银行    查询账户实时余额
	 */
	JSYH_REALTIME_QUERY("JSYH200108","200108","江苏银行查询账户实时余额"),
	
	/**
	 * 资金归集上存余额查询(220203交易)
	 */
	JSYH_CASHSWEEP_QUERY("JSYH220203","220203","江苏银行资金归集上存余额查询"),
	
	/**
	 * 江苏银行对外支付交易(300001交易)
	 */
	JSYH_SINGLE_PATMENT_TRADE("JSYH300001","300001","江苏银行对外支付"),
	
	/**
	 * 江苏银行流水状态查询(200205交易)
	 */
	JSYH_SINGLE_FLOW_STATE_QUERY("JSYH200205","200205","江苏银行流水状态查询")
	;
	private String code;
	private String trcode;
	private String describe;
	
	private BankInterfaceCode(String code ,String trcode, String describe){
		this.setCode(code);
		this.setTrcode(trcode);
		this.setDescribe(describe);
	}
	
    /**
     * 获取接口描述
     * @param code
     * @return
     */
    public static String getDescribe(String code) {
        for (BankInterfaceCode c : BankInterfaceCode.values()) {
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

	public String getTrcode() {
		return trcode;
	}

	public void setTrcode(String trcode) {
		this.trcode = trcode;
	}
}
