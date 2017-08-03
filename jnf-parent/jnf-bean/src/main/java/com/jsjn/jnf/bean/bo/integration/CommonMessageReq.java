package com.jsjn.jnf.bean.bo.integration;

import java.io.Serializable;

/**
 * 公共请求报文
 * @author xiekx
 *
 */
public class CommonMessageReq implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6768122176730314654L;

	// 交易码 1、白名单签约7820  2、单笔代扣 7826  3、卡BIN查询 7830  4、代扣交易查询 7840
	private String tranCd;
	// 小贷公司机构码
	private String orgNo;
	// 交易日期(yyyyMMdd)
	private String tranDt;

	// 默认构造函数
	public CommonMessageReq() {
	}

	public String getTranCd() {
		return tranCd;
	}

	public void setTranCd(String tranCd) {
		this.tranCd = tranCd;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public String getTranDt() {
		return tranDt;
	}

	public void setTranDt(String tranDt) {
		this.tranDt = tranDt;
	}

}
