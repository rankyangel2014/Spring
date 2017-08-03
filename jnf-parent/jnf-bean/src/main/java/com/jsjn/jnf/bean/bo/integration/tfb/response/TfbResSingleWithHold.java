package com.jsjn.jnf.bean.bo.integration.tfb.response;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 宏图三胞 天付宝 返回报文
 * 
 * @author yincy
 *
 */
@XmlRootElement(name = "root")
@XmlAccessorType(XmlAccessType.FIELD)
public class TfbResSingleWithHold {
	/**
	* 结果
	*/
	private String retcode;

	/**
	 * 结果描述 错误信息描述
	 */
	private String retmsg;
	
	/**
	 * 收款方商户号
	 */
	private String spid;
	
	/**
	 * 商户代扣单号
	 */
	private String spbillno;
	
	/**
	 * 天付宝代扣单号
	 */
	private String tfb_acp_listid;
	
	/**
	 * 结算日期
	 */
	private String settle_date;
	
	/**
	 * 交易金额，单位为分
	 */
	private String tran_amt;
	
	/**
	 * 金额类型 1-人民币(单位: 分)
	 */
	private String cur_type;
	
	/**
	 * 交易结果 1-处理成功 2-处理中 3-处理失败
	 */
	private String result;
	
	/**
	 * 签名 用于验签
	 */
	private String md5_sign;


	public String getRetcode() {
		return retcode;
	}

	public void setRetcode(String retcode) {
		this.retcode = retcode;
	}

	public String getRetmsg() {
		return retmsg;
	}

	public void setRetmsg(String retmsg) {
		this.retmsg = retmsg;
	}

	public String getSpid() {
		return spid;
	}

	public void setSpid(String spid) {
		this.spid = spid;
	}

	public String getSpbillno() {
		return spbillno;
	}

	public void setSpbillno(String spbillno) {
		this.spbillno = spbillno;
	}

	public String getTfb_acp_listid() {
		return tfb_acp_listid;
	}

	public void setTfb_acp_listid(String tfb_acp_listid) {
		this.tfb_acp_listid = tfb_acp_listid;
	}

	public String getSettle_date() {
		return settle_date;
	}

	public void setSettle_date(String settle_date) {
		this.settle_date = settle_date;
	}

	public String getTran_amt() {
		return tran_amt;
	}

	public void setTran_amt(String tran_amt) {
		this.tran_amt = tran_amt;
	}

	public String getCur_type() {
		return cur_type;
	}

	public void setCur_type(String cur_type) {
		this.cur_type = cur_type;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getMd5_sign() {
		return md5_sign;
	}

	public void setMd5_sign(String md5_sign) {
		this.md5_sign = md5_sign;
	}
}
