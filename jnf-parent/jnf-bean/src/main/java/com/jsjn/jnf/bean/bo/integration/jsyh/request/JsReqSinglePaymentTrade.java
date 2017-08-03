package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机   对外支付接口  请求报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsReqSinglePaymentTrade extends JsReqBase<JsReqSinglePaymentTradeBody>{
	private JsReqSinglePaymentTradeBody body;
	
	public JsReqSinglePaymentTrade(){
		super();
		this.body = new JsReqSinglePaymentTradeBody();
	}
	
	@Override
	public JsReqSinglePaymentTradeBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsReqSinglePaymentTradeBody body) {
		this.body = body;
	}
}
