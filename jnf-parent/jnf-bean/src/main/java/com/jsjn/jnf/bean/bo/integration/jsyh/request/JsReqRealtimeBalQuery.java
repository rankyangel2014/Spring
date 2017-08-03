package com.jsjn.jnf.bean.bo.integration.jsyh.request;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机    账号实时余额查询  请求报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsReqRealtimeBalQuery extends JsReqBase<JsReqRealtimeBalQueryBody>{
	private JsReqRealtimeBalQueryBody body;
	
	public JsReqRealtimeBalQuery(){
		super();
		this.body = new JsReqRealtimeBalQueryBody();
	}
	
	@Override
	public JsReqRealtimeBalQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsReqRealtimeBalQueryBody body) {
		this.body = body;
	}
}
