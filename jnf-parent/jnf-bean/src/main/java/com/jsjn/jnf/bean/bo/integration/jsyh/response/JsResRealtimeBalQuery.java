package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机    账号实时余额查询  返回报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsResRealtimeBalQuery extends JsResBase<JsResRealtimeBalQueryBody>{
	private JsResRealtimeBalQueryBody body;
	
	public JsResRealtimeBalQuery(){
		super();
		this.body = new JsResRealtimeBalQueryBody();
	}
	
	@Override
	public JsResRealtimeBalQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsResRealtimeBalQueryBody body) {
		this.body = body;
	}
}
