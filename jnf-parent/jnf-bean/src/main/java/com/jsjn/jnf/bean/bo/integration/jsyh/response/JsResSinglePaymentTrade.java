package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机    单笔对外支付  返回报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsResSinglePaymentTrade extends JsResBase<JsResSinglePaymentTradeBody>{
	private JsResSinglePaymentTradeBody body;
	
	public JsResSinglePaymentTrade(){
		super();
		this.body = new JsResSinglePaymentTradeBody();
	}
	
	@Override
	public JsResSinglePaymentTradeBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsResSinglePaymentTradeBody body) {
		this.body = body;
	}
}
