package com.jsjn.jnf.bean.bo.bank;

import org.hibernate.validator.constraints.NotBlank;

/**
 * 单笔支付流水状态查询 商户请求报文数据类
 * 
 * @author yincy
 * 
 */
public class SingleFlowStateQueryReqDataBO {
	/**
	 * 平台交易订单编号
	 */
	@NotBlank(message = "交易订单编号不能为空")
	private String tranNo;
	/**
	 * 平台交易日期
	 */
	@NotBlank(message = "交易日期不能为空")
	private String tranDt;

	public String getTranNo() {
		return tranNo;
	}

	public void setTranNo(String tranNo) {
		this.tranNo = tranNo;
	}

	public String getTranDt() {
		return tranDt;
	}

	public void setTranDt(String tranDt) {
		this.tranDt = tranDt;
	}
}
