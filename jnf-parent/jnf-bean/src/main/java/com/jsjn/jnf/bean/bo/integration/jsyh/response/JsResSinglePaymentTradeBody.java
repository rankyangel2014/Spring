package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlType;

/**
 * 江苏银行CT机  单笔对外支付  返回报文报体
 * @author yincy
 *
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"stat"})
public class JsResSinglePaymentTradeBody {
	
	private String stat; // 9-交易成功 6－交易失败8－交易结果未知3－银行落地处理中

	public String getStat() {
		return stat;
	}

	public void setStat(String stat) {
		this.stat = stat;
	}
}
