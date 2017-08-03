package com.jsjn.jnf.bean.bo.integration.yfb;

import java.io.Serializable;

/**
 * 
 * 跨行单笔收支付订单返回信息
 * 
 * @author 16060823
 * @see [相关类/方法]（可选）
 * @since [产品/模块版本] （可选）
 */
public class PaymentOrderResBO implements Serializable {

	/**
     */
	private static final long serialVersionUID = -1977137213097841755L;

	private String responseCode;

	private String responseMsg;

	/**
	 * 签名，除 signature、 signAlgorithm 以外所有字段参 与签名。（仅 2.0 及以上版本有签 名）
	 */
	private String signature;
	/**
	 * 签名方式：RSA
	 */
	private String signAlgorithm;
	/**
	 * 易付宝公钥索引号 0002
	 */
	private String keyIndex;
	/**
	 * 支付结果：支付成功“S” ，支付 失败“F” ，支付处理中“P” ， 请通过该字段判断支付结果。 （仅2.0及以上版本返回该字段）
	 */
	private String payResult;//原orderStatus字段

	private String outOrderNo;

	private String orderTime;

	private String orderId;

	private String orderAmount;

	private String payTime;

	private String remark;

	public PaymentOrderResBO() {
	};

	public PaymentOrderResBO(String responseCode, String responseMsg, String signature, String signAlgorithm,
			String keyIndex, String outOrderNo, String orderTime, String orderId, String orderAmount, String payResult,
			String payTime, String remark) {
		super();
		this.responseCode = responseCode;
		this.responseMsg = responseMsg;
		this.signature = signature;
		this.signAlgorithm = signAlgorithm;
		this.keyIndex = keyIndex;
		this.outOrderNo = outOrderNo;
		this.orderTime = orderTime;
		this.orderId = orderId;
		this.orderAmount = orderAmount;
		this.payResult = payResult;
		this.payTime = payTime;
		this.remark = remark;
	}

	public String getResponseCode() {
		return responseCode;
	}

	public void setResponseCode(String responseCode) {
		this.responseCode = responseCode;
	}

	public String getResponseMsg() {
		return responseMsg;
	}

	public void setResponseMsg(String responseMsg) {
		this.responseMsg = responseMsg;
	}

	public String getOutOrderNo() {
		return outOrderNo;
	}

	public void setOutOrderNo(String outOrderNo) {
		this.outOrderNo = outOrderNo;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}

	public String getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(String orderAmount) {
		this.orderAmount = orderAmount;
	}

	public String getPayTime() {
		return payTime;
	}

	public void setPayTime(String payTime) {
		this.payTime = payTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}

	public String getSignAlgorithm() {
		return signAlgorithm;
	}

	public void setSignAlgorithm(String signAlgorithm) {
		this.signAlgorithm = signAlgorithm;
	}

	public String getKeyIndex() {
		return keyIndex;
	}

	public void setKeyIndex(String keyIndex) {
		this.keyIndex = keyIndex;
	}

	public String getPayResult() {
		return payResult;
	}

	public void setPayResult(String payResult) {
		this.payResult = payResult;
	}

}
