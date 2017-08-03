/**
 * 
 */
package com.jsjn.jnf.bean.bo.trade;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import org.hibernate.validator.constraints.NotBlank;

import com.jsjn.jnf.common.validator.constraints.CheckDate;

/**
 * @author ZSMJ
 * 交易流水查询请求/响应数据
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class TradeFlowReqDataBO {
	
	/**
	 * 开始日期(请求)
	 */
	@NotBlank(message="查询开始日期不能为空")
	@CheckDate(pattern="yyyyMMdd")
	private String startDt;
	
	/**
	 * 结束日期(请求)
	 */
	@NotBlank(message="查询终止日期不能为空")
	@CheckDate(pattern="yyyyMMdd")
	private String endDt;

	public String getStartDt() {
		return startDt;
	}

	public void setStartDt(String startDt) {
		this.startDt = startDt;
	}

	public String getEndDt() {
		return endDt;
	}

	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
	
	
	
}
