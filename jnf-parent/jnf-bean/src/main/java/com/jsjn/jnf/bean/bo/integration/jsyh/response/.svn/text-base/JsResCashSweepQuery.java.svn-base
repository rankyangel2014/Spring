package com.jsjn.jnf.bean.bo.integration.jsyh.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 江苏银行CT机      资金归集上存余额查询  返回报文
 * @author yincy
 *
 */
@XmlRootElement(name="ap")
@XmlAccessorType(XmlAccessType.FIELD)
public class JsResCashSweepQuery extends JsResBase<JsResCashSweepQueryBody>{
	private JsResCashSweepQueryBody body;
	
	public JsResCashSweepQuery(){
		super();
		this.body = new JsResCashSweepQueryBody();
	}
	
	@Override
	public JsResCashSweepQueryBody getBody() {
		return body;
	}

	@Override
	public void setBody(JsResCashSweepQueryBody body) {
		this.body = body;
	}
}
