package com.jsjn.skylark.ex;

public class LinkQHandlerException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	//异常消息
	private String errMsg="";
	
	
	public LinkQHandlerException(String errMsg) {
		super(errMsg);
		this.errMsg=errMsg;
	}
	
	public String getErrorMsg() {
		return errMsg;
	}
	
}
