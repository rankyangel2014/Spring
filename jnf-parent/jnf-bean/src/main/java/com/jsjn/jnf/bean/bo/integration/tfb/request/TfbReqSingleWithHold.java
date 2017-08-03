package com.jsjn.jnf.bean.bo.integration.tfb.request;

/**
 * 宏图三胞 天付宝 请求报文实体类
 * 
 * @author yincy
 *
 */
public class TfbReqSingleWithHold {
	
	/**
	 * 版本号  默认填写1.0
	 */
	private String ver;
	/**
	 * 收款方商户号   天付宝支付分配的商户号
	 */
	private String spid;
	/**
	 * 商户代扣单号  商户系统内部的订单号 确保在商户系统唯一  必须为数字
	 */
	private String spbillno;
	/**
	 * 业务类型   默认：14901=还贷
	 */
	private String business_type;
	/**
	 * 业务号码 可不填
	 */
	private String business_no;
	/**
	 * 交易金额  没有小数点  交易金额，单位为分
	 */
	private String tran_amt;
	/**
	 * 金额类型  默认1-人民币(单位: 分)
	 */
	private String cur_type;
	/**
	 * 付款人姓名
	 */
	private String true_name;
	/**
	 * 付款人手机号码
	 */
	private String mobile;
	/**
	 * 付款人证件号
	 */
	private String cre_id;
	/**
	 * 付款人证件类型  默认1-身份证
	 */
	private String cre_type;
	/**
	 * 付款人账号
	 */
	private String card_id;
	/**
	 * 账号类型 默认0-借记卡
	 */
	private String card_type;
	/**
	 * 开户行名称
	 */
	private String bank_name;
	/**
	 * 开户行银联机构号
	 */
	private String bank_ins_code;
	/**
	 * 开户行省份  默认：江苏  填错了没关系
	 */
	private String card_prov;
	/**
	 * 用途说明 默认：贷款还款
	 */
	private String purpose;
	/**
	 * 附言说明
	 */
	private String postscript;
	/**
	 * MD5签名
	 */
	private String md5_sign;
	
	
	public String getVer() {
		return ver;
	}
	public void setVer(String ver) {
		this.ver = ver;
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
	public String getBusiness_type() {
		return business_type;
	}
	public void setBusiness_type(String business_type) {
		this.business_type = business_type;
	}
	public String getBusiness_no() {
		return business_no;
	}
	public void setBusiness_no(String business_no) {
		this.business_no = business_no;
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
	public String getTrue_name() {
		return true_name;
	}
	public void setTrue_name(String true_name) {
		this.true_name = true_name;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getCre_id() {
		return cre_id;
	}
	public void setCre_id(String cre_id) {
		this.cre_id = cre_id;
	}
	public String getCre_type() {
		return cre_type;
	}
	public void setCre_type(String cre_type) {
		this.cre_type = cre_type;
	}
	public String getCard_id() {
		return card_id;
	}
	public void setCard_id(String card_id) {
		this.card_id = card_id;
	}
	public String getCard_type() {
		return card_type;
	}
	public void setCard_type(String card_type) {
		this.card_type = card_type;
	}
	public String getBank_name() {
		return bank_name;
	}
	public void setBank_name(String bank_name) {
		this.bank_name = bank_name;
	}
	public String getBank_ins_code() {
		return bank_ins_code;
	}
	public void setBank_ins_code(String bank_ins_code) {
		this.bank_ins_code = bank_ins_code;
	}
	public String getCard_prov() {
		return card_prov;
	}
	public void setCard_prov(String card_prov) {
		this.card_prov = card_prov;
	}
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public String getPostscript() {
		return postscript;
	}
	public void setPostscript(String postscript) {
		this.postscript = postscript;
	}
	public String getMd5_sign() {
		return md5_sign;
	}
	public void setMd5_sign(String md5_sign) {
		this.md5_sign = md5_sign;
	}
}
