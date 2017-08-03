package com.jsjn.skylark.format;

import java.io.Serializable;

import com.alibaba.fastjson.JSONObject;

public class AjaxResp implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private boolean success;
	private String rspMsg;
	private String errMsg;
	private Object data;
	private String total;
	private Object root;
	
	public String toString() {
		JSONObject r = new JSONObject();
		r.put("success", success);
		if(success) {
			r.put("rspMsg", rspMsg);
			r.put("data", data);
			r.put("total", total);
			r.put("root", root);
		} else {
			r.put("errMsg", errMsg);
		}
		return r.toJSONString();
	}
	
	public AjaxResp() {
		
	}
	public AjaxResp(Exception e) {
		this.success = false;
		String eName = e.getClass().getName();
		this.errMsg = eName.substring(eName.lastIndexOf(".") + 1);
	}

	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getRspMsg() {
		return rspMsg;
	}
	public void setRspMsg(String rspMsg) {
		this.rspMsg = rspMsg;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public Object getRoot() {
		return root;
	}
	public void setRoot(Object root) {
		this.root = root;
	}
}
