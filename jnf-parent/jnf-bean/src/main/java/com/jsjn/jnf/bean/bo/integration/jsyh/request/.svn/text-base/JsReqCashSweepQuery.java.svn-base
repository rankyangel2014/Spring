package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机     资金归集上存余额查询  请求报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsReqCashSweepQuery extends JsReqBase<JsReqCashSweepQueryBody>{
	private JsReqCashSweepQueryBody body;
	
	public JsReqCashSweepQuery(){
		super();
		this.body = new JsReqCashSweepQueryBody();
	}
	
	@Override
	public JsReqCashSweepQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsReqCashSweepQueryBody body) {
		this.body = body;
	}
}
